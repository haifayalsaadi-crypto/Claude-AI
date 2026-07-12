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
  var STORE_C = "clauses";
  var STORE_T = "templates";
  var VERSION = 3;

  function openDB() {
    return new Promise(function (resolve, reject) {
      if (!global.indexedDB) { reject(new Error("NO_INDEXEDDB")); return; }
      var req = global.indexedDB.open(DB_NAME, VERSION);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
        if (!db.objectStoreNames.contains(STORE_C)) db.createObjectStore(STORE_C, { keyPath: "id" });
        if (!db.objectStoreNames.contains(STORE_T)) db.createObjectStore(STORE_T, { keyPath: "id" });
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

  /* ===================== Clause Library ===================== */
  function cAll() {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var rq = db.transaction(STORE_C, "readonly").objectStore(STORE_C).getAll();
        rq.onsuccess = function () { resolve(rq.result || []); };
        rq.onerror = function () { reject(rq.error); };
      });
    });
  }
  function cGet(cid) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var rq = db.transaction(STORE_C, "readonly").objectStore(STORE_C).get(cid);
        rq.onsuccess = function () { resolve(rq.result || null); };
        rq.onerror = function () { reject(rq.error); };
      });
    });
  }
  function cTx(mode, fn) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var t = db.transaction(STORE_C, mode); fn(t.objectStore(STORE_C));
        t.oncomplete = function () { resolve(); }; t.onerror = function () { reject(t.error); };
      });
    });
  }

  var HIST_CTX = ["كراسة خدمات تقنية المعلومات المُدارة", "نطاق عمل الأمن السيبراني", "مواصفات المنصة السحابية", "مراجعة لجنة الحوكمة", "كراسة خدمات مُدارة"];
  var CSEED = [
    { title: "توافر النظام الشهري", category: "kpi", type: "mandatory", version: "V2", status: "active", usageCount: 21, updatedAgo: 12, approvedBy: "لجنة الحوكمة", tags: ["توافر", "KPI"], textAr: "يلتزم المورّد بتحقيق توافر شهري للنظام لا يقل عن 99.9%، ويُقاس شهريًا مع تطبيق غرامات عند الإخلال بالمستوى المتفق عليه.", textEn: "The supplier shall achieve a minimum monthly system availability of 99.9%, measured monthly, with service credits applied for any breach." },
    { title: "مستويات خدمة الاستجابة للحوادث", category: "sla", type: "mandatory", version: "V1", status: "active", usageCount: 34, updatedAgo: 5, approvedBy: "إدارة تقنية المعلومات", tags: ["SLA", "حوادث"], textAr: "يلتزم المورّد بأزمنة استجابة متدرجة: الحوادث الحرجة (P1) استجابة خلال 15 دقيقة وحل خلال 4 ساعات، و(P2) استجابة خلال ساعة وحل خلال 8 ساعات.", textEn: "The supplier shall meet tiered response times: P1 response ≤ 15 min / resolution ≤ 4 h; P2 response ≤ 1 h / resolution ≤ 8 h." },
    { title: "إطار الحوكمة والمراجعة الدورية", category: "governance", type: "recommended", version: "V1", status: "active", usageCount: 12, updatedAgo: 20, approvedBy: "لجنة الحوكمة", tags: ["حوكمة", "إشراف"], textAr: "تُعقد مراجعة خدمة شهرية تضم ممثلي الطرفين، مع مصفوفة تصعيد واضحة وأدوار ومسؤوليات محددة وتقارير التزام دورية.", textEn: "" },
    { title: "الضوابط الأمنية الأساسية", category: "cyber", type: "mandatory", version: "V3", status: "active", usageCount: 28, updatedAgo: 3, approvedBy: "الأمن السيبراني", tags: ["أمن", "تشفير", "MFA"], textAr: "يلتزم المورّد بتطبيق المصادقة متعددة العوامل، وتشفير البيانات أثناء التخزين والنقل، والتحكم في الوصول حسب الأدوار، وتقييمات ثغرات ربع سنوية.", textEn: "The supplier shall implement multi-factor authentication, encryption at rest and in transit, role-based access control, and quarterly vulnerability assessments." },
    { title: "المخرجات والتسليمات الدورية", category: "deliverables", type: "standard", version: "V1", status: "active", usageCount: 9, updatedAgo: 25, approvedBy: "إدارة المشاريع", tags: ["مخرجات"], textAr: "يقدّم المورّد خطة تنفيذ ومخرجات تشغيلية دورية وتقارير أداء شهرية وخطة خروج ونقل معرفة عند نهاية العقد.", textEn: "" },
    { title: "معايير قبول المخرجات", category: "acceptance", type: "mandatory", version: "V2", status: "active", usageCount: 15, updatedAgo: 8, approvedBy: "لجنة الاستلام", tags: ["قبول", "اعتماد"], textAr: "لكل مخرج رئيسي معايير قبول قابلة للقياس وإجراء اعتماد وتوقيع رسمي قبل القبول النهائي، مع التحقق من استيفاء المتطلبات الفنية والأمنية.", textEn: "" },
    { title: "إدارة المخاطر واستمرارية الأعمال", category: "risks", type: "recommended", version: "V1", status: "active", usageCount: 7, updatedAgo: 30, approvedBy: "إدارة المخاطر", tags: ["مخاطر"], textAr: "يحتفظ المورّد بسجل مخاطر محدّث مع إجراءات تخفيف وخطة استمرارية أعمال وخطة تعافٍ معتمدة.", textEn: "" },
    { title: "توثيق الاعتماديات", category: "dependencies", type: "optional", version: "V1", status: "inactive", usageCount: 3, updatedAgo: 60, approvedBy: "إدارة التخطيط", tags: ["اعتماديات"], textAr: "يوثّق المورّد الاعتماديات على أنظمة الوزارة والاتفاقيات الإطارية القائمة وأي أطراف ثالثة ذات علاقة.", textEn: "" },
    { title: "متطلبات الدعم والتشغيل", category: "support", type: "mandatory", version: "V2", status: "active", usageCount: 18, updatedAgo: 10, approvedBy: "إدارة تقنية المعلومات", tags: ["دعم", "تشغيل"], textAr: "دعم تشغيلي على مدار الساعة طوال أيام الأسبوع مع فريق مسمّى وأدوار ومسؤوليات واضحة وحضور ميداني عند الحاجة.", textEn: "" },
    { title: "متطلبات الاستضافة السحابية", category: "cloud", type: "mandatory", version: "V1", status: "active", usageCount: 11, updatedAgo: 14, approvedBy: "الأمن السيبراني", tags: ["سحابة", "توطين"], textAr: "تلتزم الخدمات السحابية بمتطلبات توطين البيانات داخل المملكة والمعايير الأمنية المعتمدة وضوابط مزوّد الخدمة السحابية.", textEn: "" },
    { title: "متطلبات مراكز الاستضافة", category: "hosting", type: "standard", version: "V1", status: "active", usageCount: 6, updatedAgo: 40, approvedBy: "إدارة البنية التحتية", tags: ["استضافة", "DR"], textAr: "تُستضاف الأنظمة في مراكز بيانات معتمدة مع خطة تعافٍ من الكوارث وأهداف زمنية محددة للاسترجاع (RTO/RPO).", textEn: "" },
    { title: "متطلبات التقارير", category: "reporting", type: "standard", version: "V1", status: "active", usageCount: 8, updatedAgo: 18, approvedBy: "إدارة المشاريع", tags: ["تقارير"], textAr: "تقارير أداء شهرية وربع سنوية وفق قوالب معتمدة مع لوحات مؤشرات ومراجعة دورية مع الوزارة.", textEn: "" },
    { title: "شروط الدفع", category: "payment", type: "mandatory", version: "V2", status: "active", usageCount: 14, updatedAgo: 9, approvedBy: "الإدارة المالية", tags: ["دفع", "ضمان"], textAr: "ترتبط الدفعات بتحقق المخرجات ومستويات الخدمة، مع احتجاز نسبة ضمان حتى القبول النهائي وإجراءات واضحة للاعتماد.", textEn: "" },
    { title: "معايير تقييم العروض", category: "evaluation", type: "mandatory", version: "V1", status: "active", usageCount: 10, updatedAgo: 22, approvedBy: "لجنة المشتريات", tags: ["تقييم", "أوزان"], textAr: "تُقيّم العروض وفق معايير فنية ومالية معلنة مسبقًا مع أوزان محددة ومنهجية تقييم شفافة وموثّقة.", textEn: "" }
  ];

  function buildHistory(count, updatedAgo) {
    var n = Math.min(3, Math.floor(count / 8) + (count > 0 ? 1 : 0));
    var out = [];
    for (var i = 0; i < n; i++) {
      out.push({ date: daysAgo(updatedAgo + i * 9 + 2), ctx: HIST_CTX[(i + count) % HIST_CTX.length] });
    }
    return out;
  }
  function ensureSeedC() {
    return cAll().then(function (rows) {
      if (rows && rows.length) return rows;
      return cTx("readwrite", function (store) {
        CSEED.forEach(function (s) {
          store.add({
            id: "cl_" + Math.random().toString(36).slice(2, 9), title: s.title, category: s.category,
            type: s.type, textAr: s.textAr, textEn: s.textEn || "", version: s.version, status: s.status,
            tags: s.tags || [], approvedBy: s.approvedBy || "", lastUpdated: daysAgo(s.updatedAgo),
            usageCount: s.usageCount || 0, usageHistory: buildHistory(s.usageCount || 0, s.updatedAgo)
          });
        });
      }).then(cAll);
    });
  }

  var CLAUSES = {
    init: function () { return ensureSeedC(); },
    list: function () {
      return ensureSeedC().then(function (rows) {
        return rows.sort(function (a, b) { return (b.lastUpdated || "").localeCompare(a.lastUpdated || ""); });
      });
    },
    get: cGet,
    add: function (obj) {
      var rec = Object.assign({
        id: "cl_" + Math.random().toString(36).slice(2, 9), title: "", category: "kpi", type: "standard",
        textAr: "", textEn: "", version: "V1", status: "active", tags: [], approvedBy: "",
        lastUpdated: now(), usageCount: 0, usageHistory: []
      }, obj || {});
      rec.lastUpdated = now();
      return cTx("readwrite", function (s) { s.add(rec); }).then(function () { return rec; });
    },
    update: function (cid, patch) {
      return cGet(cid).then(function (rec) {
        if (!rec) throw new Error("NOT_FOUND");
        var next = Object.assign({}, rec, patch, { id: cid, lastUpdated: now() });
        return cTx("readwrite", function (s) { s.put(next); }).then(function () { return next; });
      });
    },
    remove: function (cid) { return cTx("readwrite", function (s) { s.delete(cid); }); },
    setStatus: function (cid, status) {
      return cGet(cid).then(function (rec) {
        var next = Object.assign({}, rec, { status: status, lastUpdated: now() });
        return cTx("readwrite", function (s) { s.put(next); }).then(function () { return next; });
      });
    },
    addUsage: function (cid, ctx) {
      return cGet(cid).then(function (rec) {
        if (!rec) return null;
        var hist = (rec.usageHistory || []).concat([{ date: now(), ctx: ctx || "" }]);
        var next = Object.assign({}, rec, { usageCount: (rec.usageCount || 0) + 1, usageHistory: hist });
        return cTx("readwrite", function (s) { s.put(next); }).then(function () { return next; });
      });
    }
  };

  global.MOTClauses = CLAUSES;

  /* ===================== Template Manager ===================== */
  function tAll() {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var rq = db.transaction(STORE_T, "readonly").objectStore(STORE_T).getAll();
        rq.onsuccess = function () { resolve(rq.result || []); };
        rq.onerror = function () { reject(rq.error); };
      });
    });
  }
  function tGet(tid2) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var rq = db.transaction(STORE_T, "readonly").objectStore(STORE_T).get(tid2);
        rq.onsuccess = function () { resolve(rq.result || null); };
        rq.onerror = function () { reject(rq.error); };
      });
    });
  }
  function tTx(mode, fn) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var t = db.transaction(STORE_T, mode); fn(t.objectStore(STORE_T));
        t.oncomplete = function () { resolve(); }; t.onerror = function () { reject(t.error); };
      });
    });
  }
  function tid() { return "tpl_" + Math.random().toString(36).slice(2, 9); }
  function parsePH(buf) {
    try { return (global.MOTTemplate && global.MOTTemplate.parsePlaceholders) ? global.MOTTemplate.parsePlaceholders(buf) : []; }
    catch (e) { return []; }
  }

  function seedTemplates() {
    return tAll().then(function (rows) {
      if (rows && rows.length) return rows;
      var fetchBuf = (typeof fetch === "function")
        ? fetch("assets/templates/ministry-sow-template.docx").then(function (r) { return r.ok ? r.arrayBuffer() : null; }).catch(function () { return null; })
        : Promise.resolve(null);
      return fetchBuf.then(function (buf) {
        var ph = buf ? parsePH(buf) : [];
        var blob = buf ? new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }) : null;
        var base = { name: "قالب المواصفات المعتمد", docType: "sow", department: "procurement", language: "ar", fileName: "ministry-sow-template.docx" };
        var recs = [
          Object.assign({}, base, { id: tid(), version: "V1", status: "archived", isCurrent: false, notes: "الإصدار الأول", uploadDate: daysAgo(160), hasFile: false, fileBlob: null, placeholders: ph }),
          Object.assign({}, base, { id: tid(), version: "V2", status: "archived", isCurrent: false, notes: "تحديث التنسيق والهوية", uploadDate: daysAgo(70), hasFile: !!blob, fileBlob: blob, placeholders: ph }),
          Object.assign({}, base, { id: tid(), version: "V3", status: "active", isCurrent: true, notes: "الإصدار المعتمد الحالي", uploadDate: daysAgo(14), hasFile: !!blob, fileBlob: blob, placeholders: ph })
        ];
        return tTx("readwrite", function (store) { recs.forEach(function (r) { store.add(r); }); }).then(tAll);
      });
    });
  }

  var TEMPLATES = {
    init: seedTemplates,
    list: function () { return seedTemplates().then(function (rows) { return rows.sort(function (a, b) { return (b.uploadDate || "").localeCompare(a.uploadDate || ""); }); }); },
    get: tGet,
    getCurrent: function () { return tAll().then(function (rows) { return rows.filter(function (r) { return r.isCurrent; })[0] || null; }); },
    add: function (obj) {
      var rec = Object.assign({ id: tid(), name: "", version: "V1", docType: "sow", department: "procurement", language: "ar", status: "active", notes: "", isCurrent: false, uploadDate: now(), fileName: "", fileBlob: null, hasFile: false, placeholders: [] }, obj || {});
      var doAdd = function (ph) { if (ph) rec.placeholders = ph; return tTx("readwrite", function (s) { s.add(rec); }).then(function () { return rec; }); };
      if (rec.fileBlob && rec.fileBlob.arrayBuffer) { return rec.fileBlob.arrayBuffer().then(parsePH).then(doAdd); }
      return doAdd(null);
    },
    update: function (tid2, patch) {
      return tGet(tid2).then(function (rec) { if (!rec) throw new Error("NOT_FOUND"); var next = Object.assign({}, rec, patch, { id: tid2 }); return tTx("readwrite", function (s) { s.put(next); }).then(function () { return next; }); });
    },
    remove: function (tid2) { return tTx("readwrite", function (s) { s.delete(tid2); }); },
    setCurrent: function (tid2) {
      return tAll().then(function (rows) {
        return tTx("readwrite", function (store) {
          rows.forEach(function (r) {
            var mk = (r.id === tid2);
            store.put(Object.assign({}, r, { isCurrent: mk, status: mk ? "active" : (r.status === "active" ? "inactive" : r.status) }));
          });
        });
      });
    },
    setStatus: function (tid2, status) { return TEMPLATES.update(tid2, { status: status }); },
    replaceFile: function (tid2, blob, fileName) {
      var apply = function (ph) { return TEMPLATES.update(tid2, { fileBlob: blob, fileName: fileName, hasFile: true, placeholders: ph, uploadDate: now() }); };
      if (blob && blob.arrayBuffer) return blob.arrayBuffer().then(parsePH).then(apply);
      return apply([]);
    }
  };

  global.MOTTemplates = TEMPLATES;
})(window);
