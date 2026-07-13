/* =====================================================================
   Ministry of Tourism — AI Knowledge Engine (Retrieval-Augmented)
   ---------------------------------------------------------------------
   Fully client-side RAG retrieval (no external API):
   - Parses reference books and segments them into standard sections.
   - Chunks + builds hashed embedding vectors (256-dim, signed hashing,
     section-vocabulary boosted), L2-normalized.
   - Persists vectors in IndexedDB (MOTVectorStore) so retrieval reads
     lightweight vectors, never the whole library each time.
   - Semantic / similarity search via cosine similarity.
   - Returns top-K references + score + matched sections + reason,
     and derives missing requirements + suggested improvements.
   References are used as GUIDANCE only — never copied verbatim.
   ===================================================================== */
(function (global) {
  "use strict";

  var DIM = 256;

  var STOP = {};
  ("من في على الى عن مع ان إن ما لا هذا هذه ذلك التي الذي و او ثم قد كل بعض غير بين عند وفق حسب هو هي عند اي " +
   "the a an of to in on for and or with by is are be as at that this these those from shall will must its it")
    .split(/\s+/).forEach(function (s) { if (s) STOP[s] = 1; });

  function normalize(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/[ً-ْٰ]/g, "")     // tashkeel
      .replace(/[إأآا]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/ؤ/g, "و").replace(/ئ/g, "ي")
      .replace(/[^؀-ۿa-z0-9\s]/g, " ")
      .replace(/\s+/g, " ").trim();
  }
  function stripAl(tok) { return (tok.length > 4 && tok.indexOf("ال") === 0) ? tok.slice(2) : tok; }
  function tokenize(normText) {
    var out = [];
    (normText.match(/[؀-ۿa-z0-9]+/g) || []).forEach(function (tk) {
      if (tk.length < 2) return; tk = stripAl(tk); if (tk.length < 2 || STOP[tk]) return; out.push(tk);
    });
    return out;
  }

  /* Standard sections + bilingual keyword vocabulary (normalized at load) */
  var SECT_RAW = {
    scope: ["نطاق", "نطاق العمل", "scope"],
    objectives: ["اهداف", "اهداف المشروع", "غايات", "objective", "objectives", "goals"],
    deliverables: ["مخرجات", "تسليمات", "deliverable", "deliverables"],
    kpis: ["مؤشرات", "مؤشرات الاداء", "kpi", "kpis"],
    acceptance: ["معايير القبول", "قبول", "اعتماد", "acceptance"],
    governance: ["حوكمة", "اشراف", "مساءله", "governance"],
    cyber: ["امن", "سيبراني", "تشفير", "cyber", "cybersecurity", "security"],
    sla: ["مستوى الخدمه", "اتفاقيه مستوى", "sla", "service level"],
    risks: ["مخاطر", "risk", "risks"],
    dependencies: ["اعتماديات", "تبعيات", "dependency", "dependencies"],
    pricing: ["تسعير", "التكلفه", "سعر", "pricing", "cost", "price"],
    technical: ["فني", "تقني", "مواصفات", "متطلبات فنيه", "technical", "requirements"]
  };
  var SECT = {}, BOOST = {};
  Object.keys(SECT_RAW).forEach(function (code) {
    SECT[code] = SECT_RAW[code].map(normalize);
    SECT[code].forEach(function (kw) { tokenize(kw).forEach(function (tk) { BOOST[tk] = 2.0; }); });
  });
  var SECTION_CODES = Object.keys(SECT);

  function hash(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = (h * 16777619) >>> 0; } return h; }

  function embed(tokens) {
    var v = new Array(DIM); for (var i = 0; i < DIM; i++) v[i] = 0;
    tokens.forEach(function (tk) {
      var idx = hash(tk) % DIM;
      var sign = (hash(tk + "#") & 1) ? 1 : -1;
      v[idx] += sign * (BOOST[tk] || 1);
    });
    var n = 0; for (i = 0; i < DIM; i++) n += v[i] * v[i]; n = Math.sqrt(n) || 1;
    for (i = 0; i < DIM; i++) v[i] /= n;
    return v;
  }
  function cosine(a, b) { var d = 0; for (var i = 0; i < DIM; i++) d += a[i] * b[i]; return d; }

  function sectionScores(normText) {
    var out = {};
    SECTION_CODES.forEach(function (code) {
      var c = 0;
      SECT[code].forEach(function (kw) {
        if (!kw) return; var from = 0, idx;
        while ((idx = normText.indexOf(kw, from)) !== -1) { c++; from = idx + kw.length; }
      });
      if (c > 0) out[code] = c;
    });
    return out;
  }
  function topTokens(tokens, k) {
    var f = {}; tokens.forEach(function (t) { f[t] = (f[t] || 0) + 1; });
    return Object.keys(f).sort(function (a, b) { return f[b] - f[a]; }).slice(0, k || 14);
  }

  /* ---- text extraction (DOCX via PizZip; else metadata) ---- */
  function extractDocxText(buf) {
    try {
      var zip = new global.PizZip(buf);
      var xml = zip.file("word/document.xml") ? zip.file("word/document.xml").asText() : "";
      return xml.replace(/<[^>]+>/g, " ");
    } catch (e) { return ""; }
  }
  function bookText(book) {
    var meta = [book.name, (book.keywords || []).join(" "), book.description || "", book.category || ""].join(" \n ");
    if (book.hasFile && book.fileBlob && /docx$/i.test(book.fileName || "") && book.fileBlob.arrayBuffer) {
      return book.fileBlob.arrayBuffer().then(function (buf) { return meta + " \n " + extractDocxText(buf); });
    }
    return Promise.resolve(meta);
  }

  /* ---- indexing ---- */
  function indexBook(book) {
    return bookText(book).then(function (raw) {
      var norm = normalize(raw);
      var toks = tokenize(norm);
      var rec = {
        id: book.id, name: book.name, category: book.category, status: book.status,
        embedding: embed(toks), sections: sectionScores(norm), tokens: topTokens(toks),
        indexedAt: new Date().toISOString()
      };
      return global.MOTVectorStore.put(rec).then(function () { return rec; });
    });
  }
  function ensureIndex() {
    if (!global.MOTKnowledge || !global.MOTVectorStore) return Promise.resolve([]);
    return Promise.all([global.MOTKnowledge.list(), global.MOTVectorStore.all()]).then(function (r) {
      var books = r[0], vecs = r[1];
      var byId = {}; vecs.forEach(function (v) { byId[v.id] = v; });
      var todo = books.filter(function (b) { return !byId[b.id]; });
      // remove vectors for deleted books
      var liveIds = {}; books.forEach(function (b) { liveIds[b.id] = 1; });
      var stale = vecs.filter(function (v) { return !liveIds[v.id]; });
      return Promise.all(stale.map(function (v) { return global.MOTVectorStore.del(v.id); }))
        .then(function () { return sequential(todo, indexBook); })
        .then(global.MOTVectorStore.all);
    });
  }
  function reindexAll() {
    if (!global.MOTKnowledge) return Promise.resolve([]);
    return global.MOTVectorStore.clear().then(function () { return global.MOTKnowledge.list(); })
      .then(function (books) { return sequential(books, indexBook); });
  }
  function sequential(arr, fn) {
    return arr.reduce(function (p, item) { return p.then(function () { return fn(item); }); }, Promise.resolve());
  }

  /* ---- retrieval ---- */
  function search(queryText, topK) {
    var qNorm = normalize(queryText);
    var qToks = tokenize(qNorm);
    var qVec = embed(qToks);
    var qSet = {}; qToks.forEach(function (t) { qSet[t] = 1; });
    return ensureIndex().then(function () { return global.MOTVectorStore.all(); }).then(function (vecs) {
      var scored = vecs.map(function (v) {
        var sim = cosine(qVec, v.embedding);
        var overlap = (v.tokens || []).filter(function (t) { return qSet[t]; });
        var matched = Object.keys(v.sections || {}).sort(function (a, b) { return v.sections[b] - v.sections[a]; });
        return { id: v.id, name: v.name, category: v.category, score: sim, matchedSections: matched, overlap: overlap, sections: v.sections || {} };
      }).sort(function (a, b) { return b.score - a.score; });
      return scored.slice(0, topK || 4);
    });
  }

  function analyze(queryText, opts) {
    opts = opts || {};
    var qNorm = normalize(queryText);
    var qSections = sectionScores(qNorm);
    return search(queryText, opts.topK || 4).then(function (refs) {
      // coverage across retrieved refs
      var coverage = {};
      refs.forEach(function (r) { Object.keys(r.sections).forEach(function (c) { coverage[c] = (coverage[c] || 0) + 1; }); });
      var required = opts.required || SECTION_CODES;
      var missing = required.filter(function (c) { return !qSections[c] && coverage[c]; });
      var suggestions = missing.map(function (c) {
        var support = refs.filter(function (r) { return r.sections[c]; })[0];
        return { section: c, refName: support ? support.name : "" };
      });
      return { references: refs, missing: missing, suggestions: suggestions, querySections: Object.keys(qSections), sectionCodes: SECTION_CODES };
    });
  }

  function status() {
    if (!global.MOTVectorStore) return Promise.resolve({ indexed: 0 });
    return global.MOTVectorStore.all().then(function (v) { return { indexed: v.length }; });
  }

  global.MOTRag = {
    indexBook: indexBook, ensureIndex: ensureIndex, reindexAll: reindexAll,
    search: search, analyze: analyze, status: status, SECTION_CODES: SECTION_CODES, DIM: DIM
  };
})(window);
