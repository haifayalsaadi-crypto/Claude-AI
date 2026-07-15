/* =====================================================================
   Template Manager — UI module (management + placeholder detection only)
   Official Ministry Word templates for the CREATE NEW workflow ONLY.
   Templates are NOT used when improving an uploaded specification book.
   No document generation here.
   ===================================================================== */
(function (global) {
  "use strict";

  var DOCTYPES = ["sow", "spec", "framework", "rfp"];
  var TDEPTS = ["procurement", "it", "tech", "planning", "cyber"];
  var TLANGS = ["ar", "en", "bi"];
  var TSTATUS = ["active", "inactive", "archived"];

  var T = {
    en: {
      title: "Template Manager",
      subtitle: "Manage official Ministry Word templates used to create new specification books, with versioning, history and rollback.",
      note: "Templates are used ONLY for the “Create New Specification Book” workflow — they are never applied when improving an existing uploaded document.",
      back: "← Back to workspace", upload_new: "Upload New Version",
      current: "Current approved template", history: "Template history",
      detected: "Detected placeholders", noph: "No placeholders detected.",
      col_name: "Template name", col_ver: "Version", col_doctype: "Document type", col_dept: "Department",
      col_lang: "Language", col_status: "Status", col_uploaded: "Upload date", col_state: "Current / Archived",
      col_notes: "Notes", col_actions: "Actions",
      st_current: "Current", st_archived: "Archived",
      a_setcurrent: "Set as current", a_preview: "Preview", a_replace: "Replace", a_rollback: "Rollback to previous",
      a_download: "Download", a_archive: "Archive", a_delete: "Delete", a_upload: "Upload new version",
      f_name: "Template name", f_ver: "Version", f_doctype: "Document type", f_dept: "Department",
      f_lang: "Language", f_status: "Status", f_notes: "Notes", f_file: "Word template (DOCX)",
      f_file_hint: "DOCX · placeholders like {{ProjectName}} are detected automatically",
      f_setcurrent: "Set as current approved template after upload",
      f_save: "Save template version", f_cancel: "Cancel", f_req: "Please enter a name and choose a DOCX file.",
      up_title: "Upload new template version", prev_title: "Template preview",
      saved: "Template version saved.", set_ok: "Set as current approved template.",
      rolled: "Rolled back to the previous version.", replaced: "Template file replaced.",
      archived_ok: "Template archived.", deleted_ok: "Template version deleted.",
      del_confirm: "Delete this template version permanently?", nofile: "No file attached to this version.",
      none: "—", uploaded_lbl: "Upload date", notes_lbl: "Notes", denied: "You don't have permission for this action.",
      doctype: { sow: "Statement of Work", spec: "Technical Specification", framework: "Framework Agreement", rfp: "RFP" },
      dept: { procurement: "Procurement", it: "Information Technology", tech: "Technology", planning: "Strategy & Planning", cyber: "Cybersecurity" },
      langv: { ar: "Arabic", en: "English", bi: "Bilingual" },
      status: { active: "Active", inactive: "Inactive", archived: "Archived" }
    },
    ar: {
      title: "إدارة القوالب",
      subtitle: "إدارة قوالب Word الرسمية المعتمدة لإنشاء كراسات المواصفات الجديدة، مع إدارة الإصدارات والسجل والتراجع.",
      note: "تُستخدم القوالب فقط في مسار «إنشاء كراسة مواصفات جديدة» — ولا تُطبَّق إطلاقًا عند تحسين مستند مرفوع قائم.",
      back: "→ العودة إلى مساحة العمل", upload_new: "رفع إصدار جديد",
      current: "القالب المعتمد الحالي", history: "سجل القوالب",
      detected: "الحقول المكتشفة", noph: "لم تُكتشف أي حقول.",
      col_name: "اسم القالب", col_ver: "الإصدار", col_doctype: "نوع المستند", col_dept: "الإدارة",
      col_lang: "اللغة", col_status: "الحالة", col_uploaded: "تاريخ الرفع", col_state: "حالي / مؤرشف",
      col_notes: "ملاحظات", col_actions: "إجراءات",
      st_current: "حالي", st_archived: "مؤرشف",
      a_setcurrent: "تعيين كحالي", a_preview: "معاينة", a_replace: "استبدال", a_rollback: "التراجع للإصدار السابق",
      a_download: "تنزيل", a_archive: "أرشفة", a_delete: "حذف", a_upload: "رفع إصدار جديد",
      f_name: "اسم القالب", f_ver: "الإصدار", f_doctype: "نوع المستند", f_dept: "الإدارة",
      f_lang: "اللغة", f_status: "الحالة", f_notes: "ملاحظات", f_file: "قالب Word (DOCX)",
      f_file_hint: "DOCX · تُكتشف الحقول مثل {{ProjectName}} تلقائيًا",
      f_setcurrent: "تعيينه كالقالب المعتمد الحالي بعد الرفع",
      f_save: "حفظ إصدار القالب", f_cancel: "إلغاء", f_req: "يرجى إدخال الاسم واختيار ملف DOCX.",
      up_title: "رفع إصدار قالب جديد", prev_title: "معاينة القالب",
      saved: "تم حفظ إصدار القالب.", set_ok: "تم التعيين كالقالب المعتمد الحالي.",
      rolled: "تمت العودة إلى الإصدار السابق.", replaced: "تم استبدال ملف القالب.",
      archived_ok: "تمت أرشفة القالب.", deleted_ok: "تم حذف إصدار القالب.",
      del_confirm: "حذف إصدار القالب هذا نهائيًا؟", nofile: "لا يوجد ملف مرفق بهذا الإصدار.",
      none: "—", uploaded_lbl: "تاريخ الرفع", notes_lbl: "ملاحظات", denied: "ليس لديك صلاحية لتنفيذ هذا الإجراء.",
      doctype: { sow: "نطاق عمل", spec: "مواصفات فنية", framework: "اتفاقية إطارية", rfp: "كراسة شروط" },
      dept: { procurement: "المشتريات", it: "تقنية المعلومات", tech: "التقنية", planning: "الاستراتيجية والتخطيط", cyber: "الأمن السيبراني" },
      langv: { ar: "العربية", en: "الإنجليزية", bi: "ثنائية اللغة" },
      status: { active: "نشط", inactive: "غير نشط", archived: "مؤرشف" }
    }
  };

  function lang() { return document.documentElement.lang === "ar" ? "ar" : "en"; }
  function can(p) { return global.MOTAuth ? global.MOTAuth.can(p) : true; }
  function t(k) { var d = T[lang()]; return d[k] != null ? d[k] : (T.en[k] || k); }
  function L(kind, code) { var d = T[lang()][kind] || {}; return d[code] || code; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function fmtDate(iso) {
    if (!iso) return t("none");
    try { return new Date(iso).toLocaleDateString(lang() === "ar" ? "ar" : "en-GB", { year: "numeric", month: "short", day: "numeric", calendar: "gregory", numberingSystem: "latn" }); }
    catch (e) { return String(iso).slice(0, 10); }
  }
  function toast(msg) { var el = document.getElementById("toast"); if (!el) return; el.textContent = msg; el.classList.add("show"); clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove("show"); }, 2600); }
  function optionList(list, kind, sel) { return list.map(function (c) { return '<option value="' + c + '"' + (c === sel ? " selected" : "") + ">" + esc(L(kind, c)) + "</option>"; }).join(""); }
  function phChips(ph) { return (ph && ph.length) ? '<div class="ph-list">' + ph.map(function (p) { return '<span class="ph-chip">{{' + esc(p) + "}}</span>"; }).join("") + "</div>" : '<p class="muted">' + esc(t("noph")) + "</p>"; }

  var state = { editId: null, replaceId: null };

  function openModal(html) { var i = document.getElementById("tmModalInner"); if (!i) return; i.innerHTML = html; document.getElementById("tmModal").hidden = false; document.body.style.overflow = "hidden"; }
  function closeModal() { var m = document.getElementById("tmModal"); if (m) m.hidden = true; document.body.style.overflow = ""; }

  function rowActions(r, isCurrent) {
    var acts = [];
    if (!isCurrent) acts.push(["setcurrent", "a_setcurrent", "★"]);
    acts.push(["preview", "a_preview", "⌕"], ["download", "a_download", "⬇"], ["replace", "a_replace", "⇄"]);
    if (!isCurrent) acts.push(["archive", "a_archive", "▢"], ["delete", "a_delete", "✕"]);
    var permOf = { setcurrent: "tpl.replace", preview: "template", download: "download", replace: "tpl.replace", archive: "tpl.replace", delete: "tpl.replace" };
    acts = acts.filter(function (a) { return can(permOf[a[0]]); });
    return '<div class="kc-actions">' + acts.map(function (a) {
      return '<button class="kc-actbtn' + (a[0] === "delete" ? " danger" : "") + '" data-tm-act="' + a[0] + '" data-id="' + r.id + '" title="' + esc(t(a[1])) + '" aria-label="' + esc(t(a[1])) + '">' + a[2] + "</button>";
    }).join("") + "</div>";
  }

  function render() {
    var root = document.getElementById("view-templates"); if (!root) return;
    Promise.all([MOTTemplates.list(), MOTTemplates.getCurrent()]).then(function (r) {
      var rows = r[0], cur = r[1];
      var rollbackTarget = rows.filter(function (x) { return !x.isCurrent; })[0];
      var cols = ["col_name", "col_ver", "col_doctype", "col_dept", "col_lang", "col_status", "col_uploaded", "col_state", "col_notes", "col_actions"];
      var body =
        '<div class="kc">' +
          '<div class="kc-head"><div><h1>' + esc(t("title")) + '</h1><p class="muted">' + esc(t("subtitle")) + "</p></div>" +
            '<div class="kc-head-actions">' + (can("tpl.upload") ? '<button class="btn btn-primary" data-tm-upload>＋ ' + esc(t("upload_new")) + "</button>" : "") + '<button class="btn btn-ghost" data-tm-back>' + esc(t("back")) + "</button></div></div>" +
          '<div class="tm-note"><span class="tm-note-ico">⚠</span><span>' + esc(t("note")) + "</span></div>" +
          currentCard(cur, rollbackTarget) +
          '<h3 class="section-title">' + esc(t("history")) + "</h3>" +
          '<div class="kc-tablewrap"><table class="kc-table"><thead><tr>' + cols.map(function (c) { return "<th>" + esc(t(c)) + "</th>"; }).join("") + "</tr></thead><tbody>" +
            rows.map(function (x) {
              return "<tr>" +
                '<td class="kc-td-name"><button class="kc-linkbtn" data-tm-act="preview" data-id="' + x.id + '">' + esc(x.name) + "</button></td>" +
                "<td>" + esc(x.version) + "</td><td>" + esc(L("doctype", x.docType)) + "</td><td>" + esc(L("dept", x.department)) + "</td>" +
                "<td>" + esc(L("langv", x.language)) + "</td>" +
                '<td><span class="kc-badge st-' + x.status + '">' + esc(L("status", x.status)) + "</span></td>" +
                "<td>" + fmtDate(x.uploadDate) + "</td>" +
                "<td>" + (x.isCurrent ? '<span class="kc-badge st-active">' + esc(t("st_current")) + "</span>" : '<span class="kc-badge st-archived">' + esc(t("st_archived")) + "</span>") + "</td>" +
                '<td class="tm-notes">' + esc(x.notes || "—") + "</td>" +
                "<td>" + rowActions(x, x.isCurrent) + "</td></tr>";
            }).join("") +
          "</tbody></table></div>" +
          '<div class="modal-overlay" id="tmModal" hidden><div class="modal" id="tmModalInner"></div></div>' +
          '<input type="file" id="tmReplaceInput" accept=".docx" hidden />' +
        "</div>";
      root.innerHTML = body;
    });
  }

  function currentCard(c, rollbackTarget) {
    if (!c) return "";
    var rb = (rollbackTarget && can("tpl.replace")) ? '<button class="btn btn-ghost btn-sm" data-tm-act="rollback" data-id="' + rollbackTarget.id + '">' + esc(t("a_rollback")) + "</button>" : "";
    return '<div class="panel tm-current">' +
      '<div class="tm-current-head"><span class="tm-current-ico">DOCX</span>' +
        '<div class="tm-current-m"><span class="tm-current-lbl">' + esc(t("current")) + '</span>' +
          "<strong>" + esc(c.name) + " · " + esc(c.version) + '</strong>' +
          '<span class="tm-current-meta">' + esc(L("doctype", c.docType)) + " · " + esc(L("dept", c.department)) + " · " + esc(L("langv", c.language)) + " · " + esc(t("uploaded_lbl")) + " " + fmtDate(c.uploadDate) + "</span></div>" +
        '<span class="kc-badge st-active">' + esc(t("st_current")) + "</span></div>" +
      (c.notes ? '<p class="muted tm-current-notes">' + esc(t("notes_lbl")) + ": " + esc(c.notes) + "</p>" : "") +
      '<span class="lib-sub">' + esc(t("detected")) + "</span>" + phChips(c.placeholders) +
      '<div class="tm-current-actions"><button class="btn btn-ghost btn-sm" data-tm-act="preview" data-id="' + c.id + '">' + esc(t("a_preview")) + '</button>' +
        (can("download") ? '<button class="btn btn-ghost btn-sm" data-tm-act="download" data-id="' + c.id + '">' + esc(t("a_download")) + '</button>' : "") +
        (can("tpl.replace") ? '<button class="btn btn-ghost btn-sm" data-tm-act="replace" data-id="' + c.id + '">' + esc(t("a_replace")) + "</button>" : "") + rb + "</div></div>";
  }

  function formModal(rec) {
    var editing = !!rec; rec = rec || {};
    var f = function (id, key, ctrl) { return '<label class="kc-field" for="' + id + '"><span>' + esc(t(key)) + "</span>" + ctrl + "</label>"; };
    openModal(
      '<div class="modal-head"><h2>' + esc(t("up_title")) + '</h2><button class="modal-close" data-tm-close aria-label="Close">×</button></div>' +
      '<div class="modal-body"><form id="tmForm" class="kc-form kc-form-flat" novalidate>' +
        f("tmf-name", "f_name", '<input id="tmf-name" type="text" value="' + esc(rec.name || "قالب المواصفات المعتمد") + '" required />') +
        '<div class="kc-form-row">' + f("tmf-ver", "f_ver", '<input id="tmf-ver" type="text" value="' + esc(rec.version || "V1") + '" />') +
          f("tmf-doctype", "f_doctype", '<select id="tmf-doctype">' + optionList(DOCTYPES, "doctype", rec.docType || "sow") + "</select>") + "</div>" +
        '<div class="kc-form-row">' + f("tmf-dept", "f_dept", '<select id="tmf-dept">' + optionList(TDEPTS, "dept", rec.department || "procurement") + "</select>") +
          f("tmf-lang", "f_lang", '<select id="tmf-lang">' + optionList(TLANGS, "langv", rec.language || "ar") + "</select>") + "</div>" +
        '<div class="kc-form-row">' + f("tmf-status", "f_status", '<select id="tmf-status">' + optionList(TSTATUS, "status", rec.status || "active") + "</select>") +
          f("tmf-notes", "f_notes", '<input id="tmf-notes" type="text" value="' + esc(rec.notes || "") + '" />') + "</div>" +
        f("tmf-file", "f_file", '<input id="tmf-file" type="file" accept=".docx" /><span class="kc-filehint">' + esc(t("f_file_hint")) + "</span>") +
        '<label class="tm-check"><input id="tmf-current" type="checkbox" checked /> <span>' + esc(t("f_setcurrent")) + "</span></label>" +
        '<div class="kc-form-actions"><button type="submit" class="btn btn-primary">' + esc(t("f_save")) + '</button><button type="button" class="btn btn-ghost" data-tm-close>' + esc(t("f_cancel")) + "</button></div>" +
      "</form></div>"
    );
  }

  function previewModal(r) {
    openModal(
      '<div class="modal-head"><h2>' + esc(t("prev_title")) + '</h2><button class="modal-close" data-tm-close aria-label="Close">×</button></div>' +
      '<div class="modal-body"><h3 class="cl-prev-title">' + esc(r.name) + " · " + esc(r.version) + "</h3>" +
        '<div class="cl-prev-meta">' + (r.isCurrent ? '<span class="kc-badge st-active">' + esc(t("st_current")) + "</span>" : '<span class="kc-badge st-' + r.status + '">' + esc(L("status", r.status)) + "</span>") +
          '<span class="chip">' + esc(L("doctype", r.docType)) + '</span><span class="chip">' + esc(L("dept", r.department)) + '</span><span class="chip">' + esc(L("langv", r.language)) + "</span></div>" +
        '<p class="muted">' + esc(t("uploaded_lbl")) + ": " + fmtDate(r.uploadDate) + (r.notes ? " · " + esc(t("notes_lbl")) + ": " + esc(r.notes) : "") + "</p>" +
        '<span class="lib-sub">' + esc(t("detected")) + "</span>" + phChips(r.placeholders) +
        '<div class="kc-form-actions">' + (r.hasFile ? '<button class="btn btn-primary" data-tm-act="download" data-id="' + r.id + '">' + esc(t("a_download")) + "</button>" : "") +
          '<button class="btn btn-ghost" data-tm-act="replace" data-id="' + r.id + '">' + esc(t("a_replace")) + '</button><button class="btn btn-ghost" data-tm-close>' + esc(t("f_cancel")) + "</button></div></div>"
    );
  }

  function saveBlob(blob, filename) { var url = URL.createObjectURL(blob); var a = document.createElement("a"); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1500); }

  function handleAct(act, id) {
    var permOf = { preview: "template", download: "download", replace: "tpl.replace", setcurrent: "tpl.replace", rollback: "tpl.replace", archive: "tpl.replace", delete: "tpl.replace" };
    if (permOf[act] && !can(permOf[act])) { toast(t("denied")); return; }
    MOTTemplates.get(id).then(function (r) {
      if (!r) return;
      switch (act) {
        case "preview": previewModal(r); break;
        case "download": if (r.hasFile && r.fileBlob) saveBlob(r.fileBlob, r.fileName || "template.docx"); else toast(t("nofile")); break;
        case "replace": state.replaceId = id; document.getElementById("tmReplaceInput").click(); break;
        case "setcurrent": MOTTemplates.setCurrent(id).then(function () { toast(t("set_ok")); closeModal(); render(); }); break;
        case "rollback": MOTTemplates.setCurrent(id).then(function () { toast(t("rolled")); closeModal(); render(); }); break;
        case "archive": MOTTemplates.setStatus(id, "archived").then(function () { toast(t("archived_ok")); render(); }); break;
        case "delete": if (global.confirm(t("del_confirm"))) MOTTemplates.remove(id).then(function () { toast(t("deleted_ok")); render(); }); break;
      }
    });
  }

  document.addEventListener("click", function (e) {
    if (!document.getElementById("view-templates")) return;
    if (e.target.closest("[data-tm-back]")) { if (global.MOTApp) global.MOTApp.showView("upload"); return; }
    if (e.target.closest("[data-tm-upload]")) { if (!can("tpl.upload")) { toast(t("denied")); return; } state.editId = null; formModal(null); return; }
    if (e.target.closest("[data-tm-close]")) { closeModal(); return; }
    if (e.target.id === "tmModal") { closeModal(); return; }
    var a = e.target.closest("[data-tm-act]");
    if (a) { e.preventDefault(); handleAct(a.getAttribute("data-tm-act"), a.getAttribute("data-id")); }
  });

  document.addEventListener("change", function (e) {
    if (e.target.id === "tmReplaceInput" && e.target.files && e.target.files[0] && state.replaceId) {
      var f = e.target.files[0]; e.target.value = "";
      if (!can("tpl.replace")) { toast(t("denied")); return; }
      MOTTemplates.replaceFile(state.replaceId, f, f.name).then(function () { toast(t("replaced")); state.replaceId = null; closeModal(); render(); });
    }
  });

  document.addEventListener("submit", function (e) {
    if (e.target.id !== "tmForm") return;
    e.preventDefault();
    if (!can("tpl.upload")) { toast(t("denied")); return; }
    var g = function (id) { var el = document.getElementById(id); return el ? el.value : ""; };
    var name = g("tmf-name").trim();
    var fileEl = document.getElementById("tmf-file");
    var file = fileEl && fileEl.files && fileEl.files[0];
    if (!name || !file) { toast(t("f_req")); return; }
    var setCur = document.getElementById("tmf-current") && document.getElementById("tmf-current").checked;
    MOTTemplates.add({
      name: name, version: g("tmf-ver") || "V1", docType: g("tmf-doctype"), department: g("tmf-dept"),
      language: g("tmf-lang"), status: g("tmf-status"), notes: g("tmf-notes"),
      fileBlob: file, fileName: file.name, hasFile: true
    }).then(function (rec) {
      toast(t("saved"));
      if (setCur) return MOTTemplates.setCurrent(rec.id).then(function () { toast(t("set_ok")); });
    }).then(function () { closeModal(); render(); });
  });

  document.addEventListener("mot:langchange", function () { if (document.body.classList.contains("in-templates")) render(); });

  global.MOTTemplatesUI = {
    open: function () {
      if (global.MOTApp) global.MOTApp.showView("templates");
      MOTTemplates.init().then(render);
    }
  };
})(window);
