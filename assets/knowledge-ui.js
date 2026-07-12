/* =====================================================================
   Reference Knowledge Center — UI module (no AI/RAG)
   Renders the 6 sub-pages and wires management actions to MOTKnowledge.
   Self-contained i18n; re-renders on "mot:langchange".
   ===================================================================== */
(function (global) {
  "use strict";

  var CATS = ["cyber", "digital", "infra", "managed", "ai", "apps"];
  var DEPTS = ["cyber", "it", "tech", "planning", "procurement"];
  var PTYPES = ["managed", "infra", "consulting", "analytics", "apps"];
  var CONF = ["public", "internal", "restricted", "confidential"];
  var STATUS = ["active", "inactive", "archived"];
  var CCATS = ["kpi", "sla", "governance", "cyber", "deliverables", "acceptance", "risks", "dependencies", "support", "cloud", "hosting", "reporting", "payment", "evaluation"];
  var CTYPES = ["mandatory", "recommended", "optional", "standard"];

  var K = {
    en: {
      title: "Reference Knowledge Center",
      subtitle: "Manage the Ministry's reference specification books — the knowledge source used by the AI in later phases. This library is not the output template.",
      back: "← Back to workspace",
      nav_overview: "Overview", nav_books: "Reference Books", nav_categories: "Categories",
      nav_upload: "Upload Reference Book", nav_analytics: "Knowledge Analytics",
      c_total: "Total reference books", c_active: "Active books", c_cats: "Categories",
      c_last: "Last indexed", c_pages: "Total pages", c_ai: "AI knowledge status",
      ai_ready: "Ready", never: "Never",
      col_name: "Name", col_cat: "Category", col_dept: "Department", col_ptype: "Project type",
      col_year: "Year", col_ver: "Version", col_uploaded: "Upload date", col_indexed: "Last indexed",
      col_status: "Status", col_used: "Times used by AI", col_actions: "Actions",
      search: "Search reference books…", all_cats: "All categories", all_status: "All statuses",
      empty: "No reference books match your filters.",
      a_preview: "Preview", a_edit: "Edit metadata", a_replace: "Replace file",
      a_reindex: "Re-index", a_download: "Download", a_archive: "Archive",
      a_unarchive: "Restore", a_delete: "Delete",
      f_name: "Reference book name", f_cat: "Category", f_dept: "Department", f_ptype: "Project type",
      f_year: "Year", f_ver: "Version", f_keywords: "Keywords / tags", f_kw_ph: "comma,separated,tags",
      f_desc: "Description", f_conf: "Confidentiality level", f_status: "Status", f_file: "Upload file (DOCX / PDF)",
      f_file_hint: "PDF or DOCX · up to 25 MB", f_save: "Save reference book", f_saveEdit: "Save changes",
      f_cancel: "Cancel", f_req: "Please enter a name.",
      up_title: "Upload a reference book", up_sub: "Add a specification book to the knowledge library.",
      edit_title: "Edit reference book", uploaded_ok: "Reference book saved.", updated_ok: "Changes saved.",
      reindexed: "Re-indexed.", archived_ok: "Book archived.", restored_ok: "Book restored.",
      deleted_ok: "Book deleted.", nofile: "No file attached to this book.", del_confirm: "Delete this reference book permanently?",
      det_title: "Reference book details", det_meta: "Metadata", det_file: "File", det_usage: "Usage & indexing",
      det_none: "—", det_kw: "Keywords", det_desc: "Description", det_hasfile: "Attached file", det_nofile: "No file attached",
      an_title: "Knowledge analytics", an_bycat: "Books by category", an_bystatus: "By status",
      an_top: "Most used by AI", an_index: "Indexing coverage", an_indexed: "Indexed", an_pending: "Pending",
      cat: { cyber: "Cybersecurity", digital: "Digital Transformation", infra: "Infrastructure", managed: "Managed Services", ai: "Artificial Intelligence", apps: "Applications & Systems" },
      dept: { cyber: "Cybersecurity", it: "Information Technology", tech: "Technology", planning: "Strategy & Planning", procurement: "Procurement" },
      ptype: { managed: "Managed services", infra: "Infrastructure", consulting: "Consulting", analytics: "Analytics", apps: "Applications" },
      conf: { public: "Public", internal: "Internal", restricted: "Restricted", confidential: "Confidential" },
      status: { active: "Active", inactive: "Inactive", archived: "Archived" },
      nav_clauses: "Clause Library",
      cl_add: "Add Clause", cl_edit: "Edit", cl_archive: "Archive", cl_restore: "Restore",
      cl_preview: "Preview", cl_copy: "Copy", cl_history: "Usage history", cl_search: "Search clauses…",
      clc_title: "Clause title", clc_cat: "Category", clc_type: "Type", clc_ver: "Version",
      clc_status: "Status", clc_usage: "Usage count", clc_updated: "Last updated", clc_approved: "Approved by", clc_actions: "Actions",
      clf_title: "Clause title", clf_cat: "Category", clf_type: "Clause type",
      clf_ar: "Arabic text", clf_en: "English text (optional)", clf_ver: "Version",
      clf_status: "Status", clf_tags: "Tags", clf_tags_ph: "comma,separated", clf_approved: "Approved by",
      clf_approved_ph: "e.g. Governance Committee", clf_save: "Save clause", clf_saveEdit: "Save changes",
      cl_empty: "No clauses match your filters.", cl_copied: "Clause copied to clipboard.",
      cl_saved: "Clause added.", cl_updated: "Clause updated.", cl_archived_ok: "Clause archived.", cl_restored_ok: "Clause restored.",
      cl_add_title: "Add clause", cl_edit_title: "Edit clause", cl_preview_title: "Clause preview",
      cl_hist_title: "Usage history", cl_hist_empty: "No usage recorded yet.",
      cl_en_none: "No English text provided.", cl_used: "Used", cl_times: "times",
      ctype: { mandatory: "Mandatory", recommended: "Recommended", optional: "Optional", standard: "Standard" },
      ccat: { kpi: "KPIs", sla: "SLA", governance: "Governance", cyber: "Cybersecurity", deliverables: "Deliverables", acceptance: "Acceptance Criteria", risks: "Risks", dependencies: "Dependencies", support: "Support Requirements", cloud: "Cloud Requirements", hosting: "Hosting Requirements", reporting: "Reporting Requirements", payment: "Payment Terms", evaluation: "Evaluation Criteria" }
    },
    ar: {
      title: "مركز المعرفة المرجعية",
      subtitle: "إدارة الكراسات المرجعية للوزارة — مصدر المعرفة الذي يستخدمه الذكاء الاصطناعي في المراحل اللاحقة. هذه المكتبة ليست قالب المخرجات.",
      back: "→ العودة إلى مساحة العمل",
      nav_overview: "نظرة عامة", nav_books: "الكراسات المرجعية", nav_categories: "التصنيفات",
      nav_upload: "رفع كراسة مرجعية", nav_analytics: "تحليلات المعرفة",
      c_total: "إجمالي الكراسات المرجعية", c_active: "الكراسات النشطة", c_cats: "التصنيفات",
      c_last: "آخر فهرسة", c_pages: "إجمالي الصفحات", c_ai: "حالة معرفة الذكاء الاصطناعي",
      ai_ready: "جاهزة", never: "لم تتم",
      col_name: "الاسم", col_cat: "التصنيف", col_dept: "الإدارة", col_ptype: "نوع المشروع",
      col_year: "السنة", col_ver: "الإصدار", col_uploaded: "تاريخ الرفع", col_indexed: "آخر فهرسة",
      col_status: "الحالة", col_used: "مرات الاستخدام", col_actions: "إجراءات",
      search: "ابحث في الكراسات المرجعية…", all_cats: "كل التصنيفات", all_status: "كل الحالات",
      empty: "لا توجد كراسات مطابقة للتصفية.",
      a_preview: "معاينة", a_edit: "تعديل البيانات", a_replace: "استبدال الملف",
      a_reindex: "إعادة فهرسة", a_download: "تنزيل", a_archive: "أرشفة",
      a_unarchive: "استعادة", a_delete: "حذف",
      f_name: "اسم الكراسة المرجعية", f_cat: "التصنيف", f_dept: "الإدارة", f_ptype: "نوع المشروع",
      f_year: "السنة", f_ver: "الإصدار", f_keywords: "الكلمات المفتاحية / الوسوم", f_kw_ph: "وسوم،مفصولة،بفواصل",
      f_desc: "الوصف", f_conf: "مستوى السرية", f_status: "الحالة", f_file: "رفع الملف (DOCX / PDF)",
      f_file_hint: "PDF أو DOCX · حتى 25 ميجابايت", f_save: "حفظ الكراسة المرجعية", f_saveEdit: "حفظ التغييرات",
      f_cancel: "إلغاء", f_req: "يرجى إدخال الاسم.",
      up_title: "رفع كراسة مرجعية", up_sub: "أضف كراسة مواصفات إلى مكتبة المعرفة.",
      edit_title: "تعديل كراسة مرجعية", uploaded_ok: "تم حفظ الكراسة المرجعية.", updated_ok: "تم حفظ التغييرات.",
      reindexed: "تمت إعادة الفهرسة.", archived_ok: "تمت أرشفة الكراسة.", restored_ok: "تمت استعادة الكراسة.",
      deleted_ok: "تم حذف الكراسة.", nofile: "لا يوجد ملف مرفق بهذه الكراسة.", del_confirm: "حذف هذه الكراسة المرجعية نهائيًا؟",
      det_title: "تفاصيل الكراسة المرجعية", det_meta: "البيانات", det_file: "الملف", det_usage: "الاستخدام والفهرسة",
      det_none: "—", det_kw: "الكلمات المفتاحية", det_desc: "الوصف", det_hasfile: "ملف مرفق", det_nofile: "لا يوجد ملف مرفق",
      an_title: "تحليلات المعرفة", an_bycat: "الكراسات حسب التصنيف", an_bystatus: "حسب الحالة",
      an_top: "الأكثر استخدامًا بالذكاء الاصطناعي", an_index: "تغطية الفهرسة", an_indexed: "مفهرسة", an_pending: "قيد الانتظار",
      cat: { cyber: "الأمن السيبراني", digital: "التحول الرقمي", infra: "البنية التحتية", managed: "الخدمات المُدارة", ai: "الذكاء الاصطناعي", apps: "التطبيقات والأنظمة" },
      dept: { cyber: "الأمن السيبراني", it: "تقنية المعلومات", tech: "التقنية", planning: "الاستراتيجية والتخطيط", procurement: "المشتريات" },
      ptype: { managed: "خدمات مُدارة", infra: "بنية تحتية", consulting: "استشارات", analytics: "تحليلات", apps: "تطبيقات" },
      conf: { public: "عام", internal: "داخلي", restricted: "مقيّد", confidential: "سري" },
      status: { active: "نشطة", inactive: "غير نشطة", archived: "مؤرشفة" },
      nav_clauses: "مكتبة البنود",
      cl_add: "إضافة بند", cl_edit: "تعديل", cl_archive: "أرشفة", cl_restore: "استعادة",
      cl_preview: "معاينة", cl_copy: "نسخ", cl_history: "سجل الاستخدام", cl_search: "ابحث في البنود…",
      clc_title: "عنوان البند", clc_cat: "التصنيف", clc_type: "النوع", clc_ver: "الإصدار",
      clc_status: "الحالة", clc_usage: "عدد الاستخدام", clc_updated: "آخر تحديث", clc_approved: "معتمد من", clc_actions: "إجراءات",
      clf_title: "عنوان البند", clf_cat: "التصنيف", clf_type: "نوع البند",
      clf_ar: "النص العربي", clf_en: "النص الإنجليزي (اختياري)", clf_ver: "الإصدار",
      clf_status: "الحالة", clf_tags: "الوسوم", clf_tags_ph: "وسوم،مفصولة،بفواصل", clf_approved: "معتمد من",
      clf_approved_ph: "مثال: لجنة الحوكمة", clf_save: "حفظ البند", clf_saveEdit: "حفظ التغييرات",
      cl_empty: "لا توجد بنود مطابقة للتصفية.", cl_copied: "تم نسخ البند إلى الحافظة.",
      cl_saved: "تمت إضافة البند.", cl_updated: "تم تحديث البند.", cl_archived_ok: "تمت أرشفة البند.", cl_restored_ok: "تمت استعادة البند.",
      cl_add_title: "إضافة بند", cl_edit_title: "تعديل بند", cl_preview_title: "معاينة البند",
      cl_hist_title: "سجل الاستخدام", cl_hist_empty: "لا يوجد استخدام مُسجّل بعد.",
      cl_en_none: "لا يوجد نص إنجليزي.", cl_used: "استُخدم", cl_times: "مرة",
      ctype: { mandatory: "إلزامي", recommended: "موصى به", optional: "اختياري", standard: "قياسي" },
      ccat: { kpi: "مؤشرات الأداء", sla: "اتفاقيات مستوى الخدمة", governance: "الحوكمة", cyber: "الأمن السيبراني", deliverables: "المخرجات", acceptance: "معايير القبول", risks: "المخاطر", dependencies: "الاعتماديات", support: "متطلبات الدعم", cloud: "المتطلبات السحابية", hosting: "متطلبات الاستضافة", reporting: "متطلبات التقارير", payment: "شروط الدفع", evaluation: "معايير التقييم" }
    }
  };

  function lang() { return document.documentElement.lang === "ar" ? "ar" : "en"; }
  function t(k) { var d = K[lang()]; return d[k] != null ? d[k] : (K.en[k] || k); }
  function L(kind, code) { var d = K[lang()][kind] || {}; return d[code] || code; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function fmtDate(iso) {
    if (!iso) return t("never");
    try { return new Date(iso).toLocaleDateString(lang() === "ar" ? "ar" : "en-GB", { year: "numeric", month: "short", day: "numeric", calendar: "gregory", numberingSystem: "latn" }); }
    catch (e) { return iso.slice(0, 10); }
  }
  function toast(msg) {
    var el = document.getElementById("toast"); if (!el) return;
    el.textContent = msg; el.classList.add("show");
    clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove("show"); }, 2600);
  }

  var state = { sub: "overview", editId: null, replaceId: null, filterCat: "all", filterStatus: "all", q: "",
                clQ: "", clCat: "all", clStatus: "all", clEditId: null };

  function optionList(list, kind, sel) {
    return list.map(function (c) { return '<option value="' + c + '"' + (c === sel ? " selected" : "") + '>' + esc(L(kind, c)) + "</option>"; }).join("");
  }

  /* ---------------- shell ---------------- */
  function renderShell() {
    var root = document.getElementById("view-knowledge");
    if (!root) return;
    var navItems = [["overview", "nav_overview"], ["books", "nav_books"], ["clauses", "nav_clauses"], ["categories", "nav_categories"], ["upload", "nav_upload"], ["analytics", "nav_analytics"]];
    root.innerHTML =
      '<div class="kc">' +
        '<div class="kc-head">' +
          '<div><h1>' + esc(t("title")) + '</h1><p class="muted">' + esc(t("subtitle")) + "</p></div>" +
          '<div class="kc-head-actions">' +
            '<button class="btn btn-primary" data-kc-nav="upload">＋ ' + esc(t("nav_upload")) + "</button>" +
            '<button class="btn btn-ghost" data-kc-back>' + esc(t("back")) + "</button>" +
          "</div>" +
        "</div>" +
        '<nav class="kc-nav">' + navItems.map(function (n) {
          return '<button class="kc-tab' + (state.sub === n[0] ? " is-active" : "") + '" data-kc-nav="' + n[0] + '">' + esc(t(n[1])) + "</button>";
        }).join("") + "</nav>" +
        '<div id="kc-body"></div>' +
      "</div>" +
      '<input type="file" id="kcReplaceInput" accept=".pdf,.docx" hidden />' +
      '<div class="modal-overlay" id="kcModal" hidden><div class="modal" id="kcModalInner"></div></div>';
    renderBody();
  }

  function setSub(sub) { state.sub = sub; renderShell(); }

  function renderBody() {
    var body = document.getElementById("kc-body"); if (!body) return;
    var map = { overview: renderOverview, books: renderBooks, clauses: renderClauses, categories: renderCategories, upload: renderUpload, analytics: renderAnalytics, details: renderDetails };
    (map[state.sub] || renderOverview)(body);
  }

  /* ---------------- Overview ---------------- */
  function renderOverview(body) {
    Promise.all([MOTKnowledge.stats(), MOTKnowledge.list()]).then(function (r) {
      var s = r[0], rows = r[1];
      var cards = [
        ["c_total", s.total, "▤"], ["c_active", s.active, "●"], ["c_cats", s.categories, "▦"],
        ["c_last", fmtDate(s.lastIndexed), "↻"], ["c_pages", s.totalPages, "▧"], ["c_ai", t("ai_ready"), "✦"]
      ];
      var recent = rows.slice(0, 5);
      body.innerHTML =
        '<div class="kc-cards">' + cards.map(function (c) {
          return '<div class="kc-card"><span class="kc-card-ico">' + c[2] + '</span><span class="kc-card-v">' + esc(c[1]) + '</span><span class="kc-card-l">' + esc(t(c[0])) + "</span></div>";
        }).join("") + "</div>" +
        '<h3 class="section-title">' + esc(t("nav_books")) + '</h3>' +
        '<div class="kc-recent">' + recent.map(function (b) {
          return '<button class="kc-recent-i" data-kc-open="' + b.id + '"><span class="rl-ico">▤</span>' +
            '<span class="kc-recent-m"><span class="kc-recent-t">' + esc(b.name) + '</span>' +
            '<span class="kc-recent-d">' + esc(L("cat", b.category)) + " · " + esc(L("status", b.status)) + " · " + fmtDate(b.uploadDate) + "</span></span>" +
            '<span class="scard-use">' + esc(t("a_preview")) + " →</span></button>";
        }).join("") + "</div>";
    });
  }

  /* ---------------- Reference Books table ---------------- */
  function renderBooks(body) {
    MOTKnowledge.list().then(function (rows) {
      var filtered = rows.filter(function (b) {
        if (state.filterCat !== "all" && b.category !== state.filterCat) return false;
        if (state.filterStatus !== "all" && b.status !== state.filterStatus) return false;
        if (state.q) {
          var hay = (b.name + " " + (b.keywords || []).join(" ")).toLowerCase();
          if (hay.indexOf(state.q.toLowerCase()) === -1) return false;
        }
        return true;
      });
      var cols = ["col_name", "col_cat", "col_dept", "col_ptype", "col_year", "col_ver", "col_uploaded", "col_indexed", "col_status", "col_used", "col_actions"];
      var rowsHtml = filtered.map(function (b) {
        return '<tr>' +
          '<td class="kc-td-name"><button class="kc-linkbtn" data-kc-open="' + b.id + '">' + esc(b.name) + "</button></td>" +
          "<td>" + esc(L("cat", b.category)) + "</td>" +
          "<td>" + esc(L("dept", b.department)) + "</td>" +
          "<td>" + esc(L("ptype", b.projectType)) + "</td>" +
          "<td>" + esc(b.year) + "</td>" +
          "<td>" + esc(b.version) + "</td>" +
          "<td>" + fmtDate(b.uploadDate) + "</td>" +
          "<td>" + fmtDate(b.lastIndexed) + "</td>" +
          '<td><span class="kc-badge st-' + b.status + '">' + esc(L("status", b.status)) + "</span></td>" +
          '<td class="kc-td-used">' + esc(b.timesUsed) + "</td>" +
          "<td>" + actionsMenu(b) + "</td>" +
        "</tr>";
      }).join("");
      body.innerHTML =
        '<div class="kc-toolbar">' +
          '<div class="lib-search kc-search"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>' +
            '<input type="search" id="kcSearch" placeholder="' + esc(t("search")) + '" value="' + esc(state.q) + '" /></div>' +
          '<select id="kcFilterCat" class="kc-select"><option value="all">' + esc(t("all_cats")) + "</option>" + optionList(CATS, "cat", state.filterCat === "all" ? "" : state.filterCat) + "</select>" +
          '<select id="kcFilterStatus" class="kc-select"><option value="all">' + esc(t("all_status")) + "</option>" + optionList(STATUS, "status", state.filterStatus === "all" ? "" : state.filterStatus) + "</select>" +
        "</div>" +
        '<div class="kc-tablewrap"><table class="kc-table"><thead><tr>' +
          cols.map(function (c) { return "<th>" + esc(t(c)) + "</th>"; }).join("") +
        "</tr></thead><tbody>" +
        (rowsHtml || '<tr><td colspan="11" class="kc-empty">' + esc(t("empty")) + "</td></tr>") +
        "</tbody></table></div>";
    });
  }

  function actionsMenu(b) {
    var archived = b.status === "archived";
    var items = [
      ["preview", "a_preview", "⌕"], ["edit", "a_edit", "✎"], ["replace", "a_replace", "⇄"],
      ["reindex", "a_reindex", "↻"], ["download", "a_download", "⬇"],
      [archived ? "unarchive" : "archive", archived ? "a_unarchive" : "a_archive", archived ? "▲" : "▢"],
      ["delete", "a_delete", "✕"]
    ];
    return '<div class="kc-actions">' + items.map(function (it) {
      return '<button class="kc-actbtn' + (it[0] === "delete" ? " danger" : "") + '" data-kc-act="' + it[0] + '" data-id="' + b.id + '" title="' + esc(t(it[1])) + '" aria-label="' + esc(t(it[1])) + '">' + it[2] + "</button>";
    }).join("") + "</div>";
  }

  /* ---------------- Categories ---------------- */
  function renderCategories(body) {
    MOTKnowledge.stats().then(function (s) {
      var counts = s.categoryCounts || {};
      body.innerHTML = '<div class="kc-catgrid">' + CATS.map(function (c) {
        return '<button class="kc-catcard" data-kc-cat="' + c + '"><span class="kc-catcard-ico">▦</span>' +
          '<span class="kc-catcard-t">' + esc(L("cat", c)) + "</span>" +
          '<span class="kc-catcard-c">' + (counts[c] || 0) + "</span></button>";
      }).join("") + "</div>";
    });
  }

  /* ---------------- Upload / Edit form ---------------- */
  function renderUpload(body, book) {
    var b = book || {};
    var editing = !!book;
    body.innerHTML =
      '<div class="kc-formhead"><h2>' + esc(editing ? t("edit_title") : t("up_title")) + "</h2><p class=\"muted\">" + esc(t("up_sub")) + "</p></div>" +
      '<form class="kc-form" id="kcForm" novalidate>' +
        field("kcf-name", "f_name", '<input id="kcf-name" type="text" value="' + esc(b.name || "") + '" required />') +
        '<div class="kc-form-row">' +
          field("kcf-cat", "f_cat", '<select id="kcf-cat">' + optionList(CATS, "cat", b.category || "cyber") + "</select>") +
          field("kcf-dept", "f_dept", '<select id="kcf-dept">' + optionList(DEPTS, "dept", b.department || "it") + "</select>") +
        "</div>" +
        '<div class="kc-form-row">' +
          field("kcf-ptype", "f_ptype", '<select id="kcf-ptype">' + optionList(PTYPES, "ptype", b.projectType || "managed") + "</select>") +
          field("kcf-year", "f_year", '<input id="kcf-year" type="number" min="2000" max="2100" value="' + esc(b.year || new Date().getFullYear()) + '" />') +
          field("kcf-ver", "f_ver", '<input id="kcf-ver" type="text" value="' + esc(b.version || "V1") + '" />') +
        "</div>" +
        field("kcf-kw", "f_keywords", '<input id="kcf-kw" type="text" placeholder="' + esc(t("f_kw_ph")) + '" value="' + esc((b.keywords || []).join("، ")) + '" />') +
        field("kcf-desc", "f_desc", '<textarea id="kcf-desc" rows="3">' + esc(b.description || "") + "</textarea>") +
        '<div class="kc-form-row">' +
          field("kcf-conf", "f_conf", '<select id="kcf-conf">' + optionList(CONF, "conf", b.confidentiality || "internal") + "</select>") +
          field("kcf-status", "f_status", '<select id="kcf-status">' + optionList(STATUS, "status", b.status || "active") + "</select>") +
        "</div>" +
        field("kcf-file", "f_file", '<input id="kcf-file" type="file" accept=".pdf,.docx" /><span class="kc-filehint">' + esc(t("f_file_hint")) + (b.hasFile ? " · " + esc(b.fileName) : "") + "</span>") +
        '<div class="kc-form-actions">' +
          '<button type="submit" class="btn btn-primary">' + esc(editing ? t("f_saveEdit") : t("f_save")) + "</button>" +
          '<button type="button" class="btn btn-ghost" data-kc-nav="books">' + esc(t("f_cancel")) + "</button>" +
        "</div>" +
      "</form>";
    state.editId = editing ? b.id : null;
  }
  function field(id, labelKey, control) {
    return '<label class="kc-field" for="' + id + '"><span>' + esc(t(labelKey)) + "</span>" + control + "</label>";
  }

  /* ---------------- Details ---------------- */
  function renderDetails(body) {
    MOTKnowledge.get(state.editId).then(function (b) {
      if (!b) { setSub("books"); return; }
      function row(l, v) { return "<div><dt>" + esc(l) + "</dt><dd>" + esc(v) + "</dd></div>"; }
      body.innerHTML =
        '<div class="kc-dethead"><button class="kc-linkbtn" data-kc-nav="books">← ' + esc(t("nav_books")) + '</button>' +
          '<h2>' + esc(b.name) + '</h2><span class="kc-badge st-' + b.status + '">' + esc(L("status", b.status)) + "</span></div>" +
        '<div class="kc-detgrid">' +
          '<div class="panel"><div class="panel-head"><h3 class="panel-title">' + esc(t("det_meta")) + "</h3></div><dl class=\"kv\">" +
            row(t("col_cat"), L("cat", b.category)) + row(t("col_dept"), L("dept", b.department)) +
            row(t("col_ptype"), L("ptype", b.projectType)) + row(t("col_year"), b.year) +
            row(t("col_ver"), b.version) + row(t("f_conf"), L("conf", b.confidentiality)) +
          "</dl></div>" +
          '<div class="panel"><div class="panel-head"><h3 class="panel-title">' + esc(t("det_usage")) + "</h3></div><dl class=\"kv\">" +
            row(t("col_uploaded"), fmtDate(b.uploadDate)) + row(t("col_indexed"), fmtDate(b.lastIndexed)) +
            row(t("col_used"), b.timesUsed) + row(t("col_status"), L("status", b.status)) +
            row(t("det_file"), b.hasFile ? (b.fileName || t("det_hasfile")) : t("det_nofile")) +
          "</dl></div>" +
        "</div>" +
        '<div class="panel"><div class="panel-head"><h3 class="panel-title">' + esc(t("det_kw")) + "</h3></div>" +
          '<div class="chips">' + (b.keywords || []).map(function (k) { return '<span class="chip">' + esc(k) + "</span>"; }).join("") + "</div>" +
          '<p class="kc-detdesc"><b>' + esc(t("det_desc")) + ":</b> " + esc(b.description || t("det_none")) + "</p></div>" +
        '<div class="kc-form-actions">' +
          '<button class="btn btn-primary" data-kc-act="edit" data-id="' + b.id + '">' + esc(t("a_edit")) + "</button>" +
          '<button class="btn btn-ghost" data-kc-act="reindex" data-id="' + b.id + '">' + esc(t("a_reindex")) + "</button>" +
          '<button class="btn btn-ghost" data-kc-act="download" data-id="' + b.id + '">' + esc(t("a_download")) + "</button>" +
          '<button class="btn btn-ghost" data-kc-act="' + (b.status === "archived" ? "unarchive" : "archive") + '" data-id="' + b.id + '">' + esc(b.status === "archived" ? t("a_unarchive") : t("a_archive")) + "</button>" +
        "</div>";
    });
  }

  /* ---------------- Analytics ---------------- */
  function renderAnalytics(body) {
    Promise.all([MOTKnowledge.stats(), MOTKnowledge.list()]).then(function (r) {
      var s = r[0], rows = r[1];
      var counts = s.categoryCounts || {};
      var maxCat = Math.max(1, Math.max.apply(null, CATS.map(function (c) { return counts[c] || 0; })));
      function bar(label, val, max, cls) {
        return '<div class="an-row"><span class="an-lbl">' + esc(label) + '</span><span class="an-bar"><span class="' + (cls || "") + '" style="width:' + Math.round((val / max) * 100) + '%"></span></span><span class="an-val">' + val + "</span></div>";
      }
      var byStatus = {}; STATUS.forEach(function (st) { byStatus[st] = 0; });
      rows.forEach(function (b) { byStatus[b.status] = (byStatus[b.status] || 0) + 1; });
      var maxSt = Math.max(1, Math.max.apply(null, STATUS.map(function (st) { return byStatus[st]; })));
      var top = rows.slice().sort(function (a, b) { return b.timesUsed - a.timesUsed; }).slice(0, 5);
      var maxUse = Math.max(1, (top[0] || {}).timesUsed || 1);
      var indexed = rows.filter(function (b) { return !!b.lastIndexed; }).length;
      var pct = rows.length ? Math.round((indexed / rows.length) * 100) : 0;
      body.innerHTML =
        '<div class="an-grid">' +
          '<div class="panel"><div class="panel-head"><h3 class="panel-title">' + esc(t("an_bycat")) + "</h3></div>" +
            CATS.map(function (c) { return bar(L("cat", c), counts[c] || 0, maxCat); }).join("") + "</div>" +
          '<div class="panel"><div class="panel-head"><h3 class="panel-title">' + esc(t("an_bystatus")) + "</h3></div>" +
            STATUS.map(function (st) { return bar(L("status", st), byStatus[st], maxSt, "st-fill-" + st); }).join("") + "</div>" +
          '<div class="panel"><div class="panel-head"><h3 class="panel-title">' + esc(t("an_top")) + "</h3></div>" +
            top.map(function (b) { return bar(b.name, b.timesUsed, maxUse); }).join("") + "</div>" +
          '<div class="panel"><div class="panel-head"><h3 class="panel-title">' + esc(t("an_index")) + '</h3></div>' +
            '<div class="an-ring" style="--p:' + pct + '"><div class="an-ring-v">' + pct + '%</div></div>' +
            '<p class="muted an-idxnote">' + indexed + " / " + rows.length + " " + esc(t("an_indexed")) + "</p></div>" +
        "</div>";
    });
  }

  /* ---------------- Clause Library ---------------- */
  function openModal(html) {
    var inner = document.getElementById("kcModalInner"); if (!inner) return;
    inner.innerHTML = html;
    document.getElementById("kcModal").hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    var m = document.getElementById("kcModal"); if (m) m.hidden = true;
    document.body.style.overflow = "";
  }

  function clauseActions(c) {
    var archived = c.status === "archived";
    var items = [["preview", "cl_preview", "⌕"], ["copy", "cl_copy", "⧉"], ["edit", "cl_edit", "✎"],
      [archived ? "restore" : "archive", archived ? "cl_restore" : "cl_archive", archived ? "▲" : "▢"], ["history", "cl_history", "≡"]];
    return '<div class="kc-actions">' + items.map(function (it) {
      return '<button class="kc-actbtn" data-cl-act="' + it[0] + '" data-id="' + c.id + '" title="' + esc(t(it[1])) + '" aria-label="' + esc(t(it[1])) + '">' + it[2] + "</button>";
    }).join("") + "</div>";
  }

  function renderClauses(body) {
    MOTClauses.list().then(function (rows) {
      var filtered = rows.filter(function (c) {
        if (state.clCat !== "all" && c.category !== state.clCat) return false;
        if (state.clStatus !== "all" && c.status !== state.clStatus) return false;
        if (state.clQ) {
          var hay = (c.title + " " + (c.tags || []).join(" ") + " " + (c.textAr || "") + " " + (c.textEn || "")).toLowerCase();
          if (hay.indexOf(state.clQ.toLowerCase()) === -1) return false;
        }
        return true;
      });
      var cols = ["clc_title", "clc_cat", "clc_type", "clc_ver", "clc_status", "clc_usage", "clc_updated", "clc_approved", "clc_actions"];
      var rowsHtml = filtered.map(function (c) {
        return "<tr>" +
          '<td class="kc-td-name"><button class="kc-linkbtn" data-cl-act="preview" data-id="' + c.id + '">' + esc(c.title) + "</button></td>" +
          "<td>" + esc(L("ccat", c.category)) + "</td>" +
          "<td>" + esc(L("ctype", c.type)) + "</td>" +
          "<td>" + esc(c.version) + "</td>" +
          '<td><span class="kc-badge st-' + c.status + '">' + esc(L("status", c.status)) + "</span></td>" +
          '<td class="kc-td-used">' + esc(c.usageCount || 0) + "</td>" +
          "<td>" + fmtDate(c.lastUpdated) + "</td>" +
          "<td>" + esc(c.approvedBy || "—") + "</td>" +
          "<td>" + clauseActions(c) + "</td>" +
        "</tr>";
      }).join("");
      body.innerHTML =
        '<div class="kc-toolbar">' +
          '<div class="lib-search kc-search"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>' +
            '<input type="search" id="clSearch" placeholder="' + esc(t("cl_search")) + '" value="' + esc(state.clQ) + '" /></div>' +
          '<select id="clFilterCat" class="kc-select"><option value="all">' + esc(t("all_cats")) + "</option>" + optionList(CCATS, "ccat", state.clCat === "all" ? "" : state.clCat) + "</select>" +
          '<select id="clFilterStatus" class="kc-select"><option value="all">' + esc(t("all_status")) + "</option>" + optionList(STATUS, "status", state.clStatus === "all" ? "" : state.clStatus) + "</select>" +
          '<button class="btn btn-primary btn-sm" data-cl-add>＋ ' + esc(t("cl_add")) + "</button>" +
        "</div>" +
        '<div class="kc-tablewrap"><table class="kc-table"><thead><tr>' +
          cols.map(function (c) { return "<th>" + esc(t(c)) + "</th>"; }).join("") +
        "</tr></thead><tbody>" +
        (rowsHtml || '<tr><td colspan="9" class="kc-empty">' + esc(t("cl_empty")) + "</td></tr>") +
        "</tbody></table></div>";
    });
  }

  function clauseForm(c) {
    var editing = !!c; c = c || {};
    var html =
      '<div class="modal-head"><h2>' + esc(editing ? t("cl_edit_title") : t("cl_add_title")) + '</h2><button class="modal-close" data-kc-modal-close aria-label="Close">×</button></div>' +
      '<div class="modal-body"><form id="clForm" class="kc-form kc-form-flat" novalidate>' +
        field("clf-title", "clf_title", '<input id="clf-title" type="text" value="' + esc(c.title || "") + '" required />') +
        '<div class="kc-form-row">' +
          field("clf-cat", "clf_cat", '<select id="clf-cat">' + optionList(CCATS, "ccat", c.category || "kpi") + "</select>") +
          field("clf-type", "clf_type", '<select id="clf-type">' + optionList(CTYPES, "ctype", c.type || "standard") + "</select>") +
        "</div>" +
        field("clf-ar", "clf_ar", '<textarea id="clf-ar" rows="4" dir="rtl">' + esc(c.textAr || "") + "</textarea>") +
        field("clf-en", "clf_en", '<textarea id="clf-en" rows="3" dir="ltr">' + esc(c.textEn || "") + "</textarea>") +
        '<div class="kc-form-row">' +
          field("clf-ver", "clf_ver", '<input id="clf-ver" type="text" value="' + esc(c.version || "V1") + '" />') +
          field("clf-status", "clf_status", '<select id="clf-status">' + optionList(STATUS, "status", c.status || "active") + "</select>") +
        "</div>" +
        '<div class="kc-form-row">' +
          field("clf-tags", "clf_tags", '<input id="clf-tags" type="text" placeholder="' + esc(t("clf_tags_ph")) + '" value="' + esc((c.tags || []).join("، ")) + '" />') +
          field("clf-approved", "clf_approved", '<input id="clf-approved" type="text" placeholder="' + esc(t("clf_approved_ph")) + '" value="' + esc(c.approvedBy || "") + '" />') +
        "</div>" +
        '<div class="kc-form-actions"><button type="submit" class="btn btn-primary">' + esc(editing ? t("clf_saveEdit") : t("clf_save")) + '</button><button type="button" class="btn btn-ghost" data-kc-modal-close>' + esc(t("f_cancel")) + "</button></div>" +
      "</form></div>";
    state.clEditId = editing ? c.id : null;
    openModal(html);
  }

  function clausePreview(c) {
    var html =
      '<div class="modal-head"><h2>' + esc(t("cl_preview_title")) + '</h2><button class="modal-close" data-kc-modal-close aria-label="Close">×</button></div>' +
      '<div class="modal-body">' +
        '<h3 class="cl-prev-title">' + esc(c.title) + "</h3>" +
        '<div class="cl-prev-meta"><span class="kc-badge st-' + c.status + '">' + esc(L("status", c.status)) + "</span>" +
          '<span class="chip">' + esc(L("ccat", c.category)) + '</span><span class="chip">' + esc(L("ctype", c.type)) + '</span><span class="chip">' + esc(c.version) + "</span></div>" +
        '<div class="cl-text" dir="rtl">' + esc(c.textAr || "—") + "</div>" +
        (c.textEn ? '<div class="cl-text cl-text-en" dir="ltr">' + esc(c.textEn) + "</div>" : '<p class="muted">' + esc(t("cl_en_none")) + "</p>") +
        '<div class="chips">' + (c.tags || []).map(function (k) { return '<span class="chip">' + esc(k) + "</span>"; }).join("") + "</div>" +
        '<p class="muted cl-prev-foot">' + esc(t("clc_approved")) + ": " + esc(c.approvedBy || "—") + " · " + esc(t("clc_updated")) + ": " + fmtDate(c.lastUpdated) + " · " + esc(t("cl_used")) + " " + (c.usageCount || 0) + " " + esc(t("cl_times")) + "</p>" +
        '<div class="kc-form-actions"><button class="btn btn-primary" data-cl-act="copy" data-id="' + c.id + '">' + esc(t("cl_copy")) + '</button><button class="btn btn-ghost" data-cl-act="edit" data-id="' + c.id + '">' + esc(t("cl_edit")) + '</button><button class="btn btn-ghost" data-kc-modal-close>' + esc(t("f_cancel")) + "</button></div>" +
      "</div>";
    openModal(html);
  }

  function clauseHistory(c) {
    var h = (c.usageHistory || []);
    var list = h.length ? h.slice().reverse().map(function (e) {
      return '<li class="cl-hist-i"><span class="rl-ico">≡</span><span class="kc-recent-m"><span class="kc-recent-t">' + esc(e.ctx || "—") + '</span><span class="kc-recent-d">' + fmtDate(e.date) + "</span></span></li>";
    }).join("") : '<li class="muted cl-hist-empty">' + esc(t("cl_hist_empty")) + "</li>";
    openModal('<div class="modal-head"><h2>' + esc(t("cl_hist_title")) + "</h2><button class=\"modal-close\" data-kc-modal-close aria-label=\"Close\">×</button></div>" +
      '<div class="modal-body"><p class="muted">' + esc(c.title) + '</p><ul class="cl-hist">' + list + "</ul></div>");
  }

  function copyClause(c) {
    var text = c.textAr + (c.textEn ? ("\n\n" + c.textEn) : "");
    var done = function () { MOTClauses.addUsage(c.id, lang() === "ar" ? "نسخ يدوي" : "Manual copy").then(function () { toast(t("cl_copied")); if (state.sub === "clauses") renderBody(); }); };
    try {
      if (global.navigator && global.navigator.clipboard && global.navigator.clipboard.writeText) {
        global.navigator.clipboard.writeText(text).then(done, done); return;
      }
    } catch (e) {}
    try { var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); } catch (e) {}
    done();
  }

  function handleClause(act, cid) {
    MOTClauses.get(cid).then(function (c) {
      if (!c) return;
      switch (act) {
        case "preview": clausePreview(c); break;
        case "edit": clauseForm(c); break;
        case "copy": copyClause(c); break;
        case "history": clauseHistory(c); break;
        case "archive": MOTClauses.setStatus(cid, "archived").then(function () { toast(t("cl_archived_ok")); closeModal(); renderBody(); }); break;
        case "restore": MOTClauses.setStatus(cid, "active").then(function () { toast(t("cl_restored_ok")); closeModal(); renderBody(); }); break;
      }
    });
  }

  /* ---------------- file helpers ---------------- */
  function saveBlob(blob, filename) {
    var url = URL.createObjectURL(blob); var a = document.createElement("a");
    a.href = url; a.download = filename; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1500);
  }
  function doDownload(b) {
    if (!b.hasFile || !b.fileBlob) { toast(t("nofile")); return; }
    saveBlob(b.fileBlob, b.fileName || "reference.docx");
  }
  function doPreview(b) {
    if (b.hasFile && b.fileBlob && /pdf$/i.test(b.fileName || b.fileType || "")) {
      var url = URL.createObjectURL(b.fileBlob); global.open(url, "_blank");
      setTimeout(function () { URL.revokeObjectURL(url); }, 60000); return;
    }
    state.editId = b.id; setSub("details");
  }

  /* ---------------- actions ---------------- */
  function handleAct(act, idv) {
    MOTKnowledge.get(idv).then(function (b) {
      if (!b) return;
      switch (act) {
        case "preview": doPreview(b); break;
        case "edit": state.sub = "upload"; renderShell(); renderUpload(document.getElementById("kc-body"), b); markNav("upload"); break;
        case "download": doDownload(b); break;
        case "reindex": MOTKnowledge.reindex(idv).then(function () { toast(t("reindexed")); renderBody(); }); break;
        case "archive": MOTKnowledge.setStatus(idv, "archived").then(function () { toast(t("archived_ok")); renderBody(); }); break;
        case "unarchive": MOTKnowledge.setStatus(idv, "active").then(function () { toast(t("restored_ok")); renderBody(); }); break;
        case "replace": state.replaceId = idv; document.getElementById("kcReplaceInput").click(); break;
        case "delete": if (global.confirm(t("del_confirm"))) MOTKnowledge.remove(idv).then(function () { toast(t("deleted_ok")); if (state.sub === "details") setSub("books"); else renderBody(); }); break;
      }
    });
  }
  function markNav(sub) { state.sub = sub; Array.prototype.forEach.call(document.querySelectorAll(".kc-tab"), function (b) { b.classList.toggle("is-active", b.dataset.kcNav === sub); }); }

  /* ---------------- events (delegated on document) ---------------- */
  document.addEventListener("click", function (e) {
    var nav = e.target.closest("[data-kc-nav]");
    if (nav && document.getElementById("view-knowledge") && document.getElementById("view-knowledge").contains(nav)) { setSub(nav.getAttribute("data-kc-nav")); return; }
    if (e.target.closest("[data-kc-back]")) { if (global.MOTApp) global.MOTApp.showView("upload"); return; }
    var open = e.target.closest("[data-kc-open]");
    if (open) { state.editId = open.getAttribute("data-kc-open"); setSub("details"); return; }
    var catc = e.target.closest("[data-kc-cat]");
    if (catc) { state.filterCat = catc.getAttribute("data-kc-cat"); setSub("books"); return; }
    if (e.target.closest("[data-cl-add]")) { clauseForm(null); return; }
    if (e.target.closest("[data-kc-modal-close]")) { closeModal(); return; }
    if (e.target.id === "kcModal") { closeModal(); return; }
    var clAct = e.target.closest("[data-cl-act]");
    if (clAct) { e.preventDefault(); handleClause(clAct.getAttribute("data-cl-act"), clAct.getAttribute("data-id")); return; }
    var act = e.target.closest("[data-kc-act]");
    if (act) { e.preventDefault(); handleAct(act.getAttribute("data-kc-act"), act.getAttribute("data-id")); closeMenus(); return; }
    var mbtn = e.target.closest(".kc-menu-btn");
    if (mbtn) { e.stopPropagation(); var m = mbtn.parentNode; var wasOpen = m.classList.contains("open"); closeMenus(); if (!wasOpen) m.classList.add("open"); return; }
    closeMenus();
  });
  function closeMenus() { Array.prototype.forEach.call(document.querySelectorAll(".kc-menu.open"), function (m) { m.classList.remove("open"); }); }

  document.addEventListener("input", function (e) {
    if (e.target.id === "kcSearch") { state.q = e.target.value; renderBooks(document.getElementById("kc-body")); focusEnd("kcSearch"); }
    if (e.target.id === "clSearch") { state.clQ = e.target.value; renderClauses(document.getElementById("kc-body")); focusEnd("clSearch"); }
  });
  document.addEventListener("change", function (e) {
    if (e.target.id === "kcFilterCat") { state.filterCat = e.target.value; renderBooks(document.getElementById("kc-body")); }
    if (e.target.id === "kcFilterStatus") { state.filterStatus = e.target.value; renderBooks(document.getElementById("kc-body")); }
    if (e.target.id === "clFilterCat") { state.clCat = e.target.value; renderClauses(document.getElementById("kc-body")); }
    if (e.target.id === "clFilterStatus") { state.clStatus = e.target.value; renderClauses(document.getElementById("kc-body")); }
    if (e.target.id === "kcReplaceInput" && e.target.files && e.target.files[0] && state.replaceId) {
      var f = e.target.files[0]; e.target.value = "";
      MOTKnowledge.update(state.replaceId, { fileBlob: f, fileName: f.name, fileType: f.type, hasFile: true, lastIndexed: new Date().toISOString() })
        .then(function () { toast(t("updated_ok")); renderBody(); });
      state.replaceId = null;
    }
  });
  function focusEnd(id) { var s = document.getElementById(id); if (s) { s.focus(); var v = s.value; s.value = ""; s.value = v; } }

  document.addEventListener("submit", function (e) {
    if (e.target.id === "clForm") {
      e.preventDefault();
      var gc = function (id) { var el = document.getElementById(id); return el ? el.value : ""; };
      var ctitle = gc("clf-title").trim(); if (!ctitle) { toast(t("f_req")); return; }
      var ctags = gc("clf-tags").split(/[،,]/).map(function (s) { return s.trim(); }).filter(Boolean);
      var cdata = { title: ctitle, category: gc("clf-cat"), type: gc("clf-type"), textAr: gc("clf-ar"), textEn: gc("clf-en"), version: gc("clf-ver") || "V1", status: gc("clf-status"), tags: ctags, approvedBy: gc("clf-approved") };
      var cp = state.clEditId ? MOTClauses.update(state.clEditId, cdata) : MOTClauses.add(cdata);
      cp.then(function () { toast(state.clEditId ? t("cl_updated") : t("cl_saved")); state.clEditId = null; closeModal(); renderBody(); });
      return;
    }
    if (e.target.id !== "kcForm") return;
    e.preventDefault();
    var g = function (id) { var el = document.getElementById(id); return el ? el.value : ""; };
    var name = g("kcf-name").trim();
    if (!name) { toast(t("f_req")); return; }
    var fileEl = document.getElementById("kcf-file");
    var file = fileEl && fileEl.files && fileEl.files[0];
    var kw = g("kcf-kw").split(/[،,]/).map(function (s) { return s.trim(); }).filter(Boolean);
    var data = {
      name: name, category: g("kcf-cat"), department: g("kcf-dept"), projectType: g("kcf-ptype"),
      year: parseInt(g("kcf-year"), 10) || new Date().getFullYear(), version: g("kcf-ver") || "V1",
      keywords: kw, description: g("kcf-desc"), confidentiality: g("kcf-conf"), status: g("kcf-status")
    };
    if (file) { data.fileBlob = file; data.fileName = file.name; data.fileType = file.type; data.hasFile = true; }
    var p = state.editId ? MOTKnowledge.update(state.editId, data) : MOTKnowledge.add(data);
    p.then(function () { toast(state.editId ? t("updated_ok") : t("uploaded_ok")); state.editId = null; setSub("books"); });
  });

  document.addEventListener("mot:langchange", function () {
    if (document.body.classList.contains("in-knowledge")) renderShell();
  });

  global.MOTKnowledgeUI = {
    open: function (sub) {
      state.sub = sub || "overview";
      if (global.MOTApp) global.MOTApp.showView("knowledge");
      MOTKnowledge.init().then(renderShell);
    },
    refresh: renderBody
  };
})(window);
