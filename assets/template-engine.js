/* =====================================================================
   Ministry of Tourism — Approved Word Template Engine
   ---------------------------------------------------------------------
   A reusable, extensible template engine for the procurement platform.
   - Persists ONE approved Ministry .docx template in IndexedDB.
   - Parses {{placeholders}} from the template (config-free, extensible).
   - Renders an improved document by populating ONLY mapped placeholders
     via docxtemplater, preserving all fixed formatting / branding.
   Business logic (what content fills each placeholder) lives elsewhere;
   this module only stores, parses and renders.
   ===================================================================== */
(function (global) {
  "use strict";

  var DB_NAME = "motTemplateDB";
  var STORE = "templates";
  var KEY = "approved";
  var DB_VERSION = 1;
  var DEFAULT_TEMPLATE_URL = "assets/templates/ministry-sow-template.docx";
  var DELIMS = { start: "{{", end: "}}" };
  var PLACEHOLDER_RE = /\{\{\s*([A-Za-z0-9_]+)\s*\}\}/g;

  var _defaultBufferCache = null; // cache approved default template for performance

  /* ---------------- IndexedDB helpers ---------------- */
  function openDB() {
    return new Promise(function (resolve, reject) {
      if (!global.indexedDB) { reject(new Error("NO_INDEXEDDB")); return; }
      var req = global.indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = function () {
        if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  }
  function idbPut(value) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(STORE, "readwrite");
        tx.objectStore(STORE).put(value, KEY);
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { reject(tx.error); };
      });
    });
  }
  function idbGet() {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(STORE, "readonly");
        var rq = tx.objectStore(STORE).get(KEY);
        rq.onsuccess = function () { resolve(rq.result || null); };
        rq.onerror = function () { reject(rq.error); };
      });
    });
  }
  function idbClear() {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(STORE, "readwrite");
        tx.objectStore(STORE).delete(KEY);
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { reject(tx.error); };
      });
    });
  }

  /* ---------------- library guard ---------------- */
  function getDocxtemplater() {
    var D = global.docxtemplater || global.Docxtemplater;
    if (!D) throw new Error("LIB_DOCXTEMPLATER_MISSING");
    if (!global.PizZip) throw new Error("LIB_PIZZIP_MISSING");
    return D;
  }

  /* ---------------- placeholder parsing ---------------- */
  // Detect placeholders across document body, headers and footers.
  // Uses tag-stripped text so tags split across runs are still detected.
  function parsePlaceholders(arrayBuffer) {
    var PizZip = global.PizZip;
    if (!PizZip) throw new Error("LIB_PIZZIP_MISSING");
    var zip = new PizZip(arrayBuffer);
    var found = {};
    Object.keys(zip.files).forEach(function (name) {
      if (!/word\/(document|header\d*|footer\d*)\.xml$/.test(name)) return;
      var xml = zip.files[name].asText();
      var stripped = xml.replace(/<[^>]+>/g, "");
      var m;
      PLACEHOLDER_RE.lastIndex = 0;
      while ((m = PLACEHOLDER_RE.exec(stripped)) !== null) { found[m[1]] = true; }
    });
    return Object.keys(found);
  }

  /* ---------------- template buffers ---------------- */
  function fetchDefaultBuffer() {
    if (_defaultBufferCache) return Promise.resolve(_defaultBufferCache.slice(0));
    return fetch(DEFAULT_TEMPLATE_URL, { cache: "force-cache" }).then(function (r) {
      if (!r.ok) throw new Error("DEFAULT_TEMPLATE_MISSING");
      return r.arrayBuffer();
    }).then(function (buf) {
      _defaultBufferCache = buf;
      return buf.slice(0);
    });
  }
  function getActiveBuffer() {
    return idbGet().then(function (rec) {
      if (rec && rec.buf) return rec.buf.slice(0);
      return fetchDefaultBuffer();
    }).catch(function () {
      return fetchDefaultBuffer(); // storage failure -> fall back to bundled template
    });
  }

  /* ---------------- admin: save / status / reset ---------------- */
  function saveApprovedTemplate(file) {
    if (!file) return Promise.reject(new Error("NO_FILE"));
    if (!/\.docx$/i.test(file.name)) return Promise.reject(new Error("NOT_DOCX"));
    return file.arrayBuffer().then(function (buf) {
      var placeholders;
      try { placeholders = parsePlaceholders(buf); }
      catch (e) { throw new Error("PARSE_FAILED"); }
      return idbPut({ name: file.name, buf: buf, placeholders: placeholders, savedAt: Date.now() })
        .then(function () { return { name: file.name, placeholders: placeholders, savedAt: Date.now() }; });
    });
  }
  function getStatus() {
    return idbGet().then(function (rec) {
      if (rec && rec.buf) {
        return { source: "custom", name: rec.name, placeholders: rec.placeholders || [], savedAt: rec.savedAt };
      }
      // default template placeholders
      return fetchDefaultBuffer().then(function (buf) {
        return { source: "default", name: "ministry-sow-template.docx", placeholders: parsePlaceholders(buf), savedAt: null };
      });
    });
  }
  function resetToDefault() { return idbClear(); }

  /* ---------------- render ---------------- */
  // dataMap: plain object { PlaceholderName: "value", ... }
  function renderDocx(dataMap) {
    return getActiveBuffer().then(function (buf) {
      var PizZip = global.PizZip;
      var Docxtemplater = getDocxtemplater();
      var zip = new PizZip(buf);
      var doc = new Docxtemplater(zip, {
        delimiters: DELIMS,
        paragraphLoop: true,
        linebreaks: true,
        nullGetter: function () { return ""; } // missing/unmapped -> empty, never crash
      });
      try {
        doc.render(dataMap || {});
      } catch (e) {
        var err = new Error("RENDER_FAILED");
        err.detail = (e && e.message) || String(e);
        throw err;
      }
      return doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        compression: "DEFLATE"
      });
    });
  }

  global.MOTTemplate = {
    parsePlaceholders: parsePlaceholders,
    saveApprovedTemplate: saveApprovedTemplate,
    getStatus: getStatus,
    resetToDefault: resetToDefault,
    getActiveBuffer: getActiveBuffer,
    renderDocx: renderDocx,
    DEFAULT_TEMPLATE_URL: DEFAULT_TEMPLATE_URL
  };
})(window);
