/* =====================================================================
   Ministry of Tourism — Roles & Permissions (RBAC)
   ---------------------------------------------------------------------
   Client-side authorization enforced at TWO levels:
   - UI: elements with data-perm are hidden when the role lacks it, and
     dynamically-rendered action buttons are omitted (see the modules).
   - Action: every data-mutating entry point calls MOTAuth.can(...) before
     acting, so an action cannot run even if its control is reached.
   Roles come from a demo role switcher here; in production they would come
   from authenticated SSO. Default role = admin (full access) so existing
   behaviour is unchanged until a role is selected.
   ===================================================================== */
(function (global) {
  "use strict";

  /* Compatibility: Blob/File.arrayBuffer polyfill (older Safari) so DOCX
     parsing, template rendering and downloads work across browsers. */
  if (global.Blob && !global.Blob.prototype.arrayBuffer) {
    global.Blob.prototype.arrayBuffer = function () {
      var blob = this;
      return new Promise(function (resolve, reject) {
        var fr = new FileReader();
        fr.onload = function () { resolve(fr.result); };
        fr.onerror = function () { reject(fr.error); };
        fr.readAsArrayBuffer(blob);
      });
    };
  }

  var ROLES = ["admin", "manager", "reviewer", "editor", "viewer"];

  var PERMS = {
    admin: "ALL",
    manager: ["upload", "download", "improve", "create", "kc", "book.add", "book.edit", "book.delete", "reindex", "clause", "clause.manage", "template", "tpl.upload", "tpl.replace", "reports", "comment"],
    editor: ["upload", "download", "improve", "create", "kc", "book.add", "book.edit", "reindex", "clause", "clause.manage", "reports", "comment"],
    reviewer: ["download", "kc", "clause", "reports", "comment"],
    viewer: ["kc", "clause", "reports"]
  };

  // Department scope (for "Department Manager sees department items only, if filtering exists")
  var DEPARTMENT = { manager: "it" };

  var KEY = "mot_role";
  function getRole() {
    var r = null; try { r = global.localStorage.getItem(KEY); } catch (e) {}
    return (r && ROLES.indexOf(r) !== -1) ? r : "admin";
  }
  function setRole(role) {
    if (ROLES.indexOf(role) === -1) return;
    try { global.localStorage.setItem(KEY, role); } catch (e) {}
    try { document.dispatchEvent(new CustomEvent("mot:rolechange", { detail: { role: role } })); } catch (e) {}
  }
  function can(perm) {
    var role = getRole();
    var set = PERMS[role];
    if (set === "ALL") return true;
    if (!set) return false;
    return set.indexOf(perm) !== -1;
  }
  function department() {
    var role = getRole();
    return DEPARTMENT[role] || null; // null => no department filtering
  }

  /* ------------------------------------------------------------------
     Action layer: wrap every data-mutating API so an unauthorized call is
     rejected even if it bypasses the UI (console, stale handler, etc.).
     Installed after all modules have loaded. Seeding uses the raw stores,
     so it is unaffected.
     NOTE: with no server this is not tamper-proof; apply the same matrix
     server-side once a backend exists.
  ------------------------------------------------------------------ */
  function denyToast() {
    var el = document.getElementById("toast");
    var msg = (document.documentElement.lang === "ar")
      ? "ليس لديك صلاحية لتنفيذ هذا الإجراء."
      : "You don't have permission to perform this action.";
    if (el) { el.textContent = msg; el.classList.add("show"); clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove("show"); }, 2800); }
  }
  function guard(objName, method, perm) {
    var obj = global[objName];
    if (!obj || typeof obj[method] !== "function" || obj[method].__guarded) return;
    var orig = obj[method];
    var wrapped = function () {
      if (!can(perm)) { denyToast(); return Promise.reject(new Error("PERM_DENIED")); }
      return orig.apply(obj, arguments);
    };
    wrapped.__guarded = true;
    obj[method] = wrapped;
  }
  function installGuards() {
    guard("MOTKnowledge", "add", "book.add");
    guard("MOTKnowledge", "update", "book.edit");
    guard("MOTKnowledge", "remove", "book.delete");
    guard("MOTKnowledge", "reindex", "reindex");
    guard("MOTClauses", "add", "clause.manage");
    guard("MOTClauses", "update", "clause.manage");
    guard("MOTClauses", "setStatus", "clause.manage");
    guard("MOTClauses", "remove", "clause.manage");
    guard("MOTTemplates", "add", "tpl.upload");
    guard("MOTTemplates", "replaceFile", "tpl.replace");
    guard("MOTTemplates", "setCurrent", "tpl.replace");
    guard("MOTTemplates", "setStatus", "tpl.replace");
    guard("MOTTemplates", "remove", "tpl.replace");
    // MOTRag.indexBook is intentionally NOT guarded: it runs as a consequence
    // of an already-authorized add/edit. The explicit re-index is gated below.
    guard("MOTRag", "reindexAll", "reindex");
  }

  global.MOTAuth = {
    ROLES: ROLES, PERMS: PERMS,
    getRole: getRole, setRole: setRole, can: can, department: department,
    installGuards: installGuards
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", installGuards);
  else installGuards();
  global.addEventListener("load", installGuards);
})(window);
