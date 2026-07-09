/* =====================================================================
   Ministry of Tourism — Reference Knowledge Center (storage layer)
   ---------------------------------------------------------------------
   Client-side storage & management for REFERENCE specification books.
   This is a KNOWLEDGE SOURCE only — NOT the output template.
   No AI/RAG here; just a durable, structured store + CRUD + stats.
   Persists in IndexedDB (db: motKnowledgeDB, store: refbooks).
   ===================================================================== */
(function (global) {
  "use strict";

  var DB_NAME = "motKnowledgeDB";
  var STORE = "refbooks";
  var VERSION = 1;

  function openDB() {
    return new Promise(function (resolve, reject) {
      if (!global.indexedDB) { reject(new Error("NO_INDEXEDDB")); return; }
      var req = global.indexedDB.open(DB_NAME, VERSION);
      req.onupgradeneeded = function () {
        if (!req.result.objectStoreNames.contains(STORE)) {
          req.result.createObjectStore(STORE, { keyPath: "id" });
        }
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  }
  function tx(mode, fn) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var t = db.transaction(STORE, mode);
        var store = t.objectStore(STORE);
        var out = fn(store);
        t.oncomplete = function () { resolve(out && out.result !== undefined ? out.result : out); };
        t.onerror = function () { reject(t.error); };
      });
    });
  }
  function getAll() {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var t = db.transaction(STORE, "readonly");
        var rq = t.objectStore(STORE).getAll();
        rq.onsuccess = function () { resolve(rq.result || []); };
        rq.onerror = function () { reject(rq.error); };
      });
    });
  }

  var now = function () { return new Date().toISOString(); };
  function id() { return "rb_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function daysAgo(n) { var d = new Date(); d.setDate(d.getDate() - n); return d.toISOString(); }

  /* Seed reference books (codes are translated in the UI; names are free text) */
  var SEED = [
    { name: "إطار عمليات الأمن السيبراني", category: "cyber", department: "cyber", projectType: "managed", year: 2025, version: "V2", keywords: ["أمن", "SOC", "حوكمة"], description: "مرجع لممارسات مركز عمليات الأمن السيبراني ومتطلبات الاستجابة للحوادث.", confidentiality: "restricted", status: "active", pages: 48, timesUsed: 34, uploadedAgo: 40, indexedAgo: 3 },
    { name: "معايير اتفاقيات مستوى الخدمة المُدارة", category: "managed", department: "it", projectType: "managed", year: 2024, version: "V1", keywords: ["SLA", "مستوى الخدمة", "غرامات"], description: "معايير وأمثلة لاتفاقيات مستوى الخدمة في عقود الخدمات المُدارة.", confidentiality: "internal", status: "active", pages: 32, timesUsed: 18, uploadedAgo: 65, indexedAgo: 6 },
    { name: "الخط الأساس للبنية التحتية السحابية", category: "infra", department: "tech", projectType: "infra", year: 2025, version: "V3", keywords: ["سحابة", "بنية تحتية", "أمن"], description: "الخط الأساس الفني والأمني لمنصات الاستضافة السحابية.", confidentiality: "restricted", status: "active", pages: 55, timesUsed: 22, uploadedAgo: 20, indexedAgo: 2 },
    { name: "دليل الحوكمة الرقمية", category: "digital", department: "planning", projectType: "consulting", year: 2023, version: "V1", keywords: ["حوكمة", "تحول رقمي"], description: "دليل حوكمة المبادرات الرقمية وأطر الإشراف والمساءلة.", confidentiality: "internal", status: "inactive", pages: 27, timesUsed: 12, uploadedAgo: 120, indexedAgo: 30 },
    { name: "مكتبة مؤشرات الأداء ومعايير القبول", category: "ai", department: "tech", projectType: "analytics", year: 2025, version: "V2", keywords: ["KPI", "معايير قبول", "قياس"], description: "مكتبة مؤشرات أداء ومعايير قبول قابلة لإعادة الاستخدام.", confidentiality: "public", status: "active", pages: 40, timesUsed: 9, uploadedAgo: 15, indexedAgo: 1 },
    { name: "كراسة شروط خدمات تقنية المعلومات المُدارة", category: "apps", department: "it", projectType: "managed", year: 2024, version: "V1", keywords: ["تقنية المعلومات", "كراسة", "مشتريات"], description: "كراسة مرجعية لخدمات تقنية المعلومات المُدارة.", confidentiality: "confidential", status: "active", pages: 42, timesUsed: 27, uploadedAgo: 80, indexedAgo: 9 }
  ];

  function ensureSeed() {
    return getAll().then(function (rows) {
      if (rows && rows.length) return rows;
      return openDB().then(function (db) {
        return new Promise(function (resolve, reject) {
          var t = db.transaction(STORE, "readwrite");
          var store = t.objectStore(STORE);
          SEED.forEach(function (s) {
            store.add({
              id: id(), name: s.name, category: s.category, department: s.department,
              projectType: s.projectType, year: s.year, version: s.version,
              keywords: s.keywords, description: s.description, confidentiality: s.confidentiality,
              status: s.status, fileName: "", fileType: "", hasFile: false,
              pages: s.pages, uploadDate: daysAgo(s.uploadedAgo),
              lastIndexed: daysAgo(s.indexedAgo), timesUsed: s.timesUsed
            });
          });
          t.oncomplete = function () { resolve(); };
          t.onerror = function () { reject(t.error); };
        });
      }).then(getAll);
    });
  }

  var API = {
    init: function () { return ensureSeed(); },
    list: function () {
      return ensureSeed().then(function (rows) {
        return rows.sort(function (a, b) { return (b.uploadDate || "").localeCompare(a.uploadDate || ""); });
      });
    },
    get: function (bid) {
      return openDB().then(function (db) {
        return new Promise(function (resolve, reject) {
          var rq = db.transaction(STORE, "readonly").objectStore(STORE).get(bid);
          rq.onsuccess = function () { resolve(rq.result || null); };
          rq.onerror = function () { reject(rq.error); };
        });
      });
    },
    add: function (obj) {
      var rec = Object.assign({
        id: id(), name: "", category: "cyber", department: "it", projectType: "managed",
        year: new Date().getFullYear(), version: "V1", keywords: [], description: "",
        confidentiality: "internal", status: "active", fileName: "", fileType: "", hasFile: false,
        pages: 0, uploadDate: now(), lastIndexed: now(), timesUsed: 0
      }, obj || {});
      return tx("readwrite", function (s) { s.add(rec); }).then(function () { return rec; });
    },
    update: function (bid, patch) {
      return API.get(bid).then(function (rec) {
        if (!rec) throw new Error("NOT_FOUND");
        var next = Object.assign({}, rec, patch, { id: bid });
        return tx("readwrite", function (s) { s.put(next); }).then(function () { return next; });
      });
    },
    remove: function (bid) { return tx("readwrite", function (s) { s.delete(bid); }); },
    reindex: function (bid) { return API.update(bid, { lastIndexed: now() }); },
    setStatus: function (bid, status) { return API.update(bid, { status: status }); },
    incUsage: function (bid) {
      return API.get(bid).then(function (r) { return API.update(bid, { timesUsed: (r ? r.timesUsed : 0) + 1 }); });
    },
    stats: function () {
      return API.list().then(function (rows) {
        var cats = {}; var pages = 0; var active = 0; var last = null;
        rows.forEach(function (r) {
          cats[r.category] = (cats[r.category] || 0) + 1;
          pages += (r.pages || 0);
          if (r.status === "active") active++;
          if (r.lastIndexed && (!last || r.lastIndexed > last)) last = r.lastIndexed;
        });
        return { total: rows.length, active: active, categories: Object.keys(cats).length,
                 lastIndexed: last, totalPages: pages, categoryCounts: cats };
      });
    }
  };

  global.MOTKnowledge = API;
})(window);
