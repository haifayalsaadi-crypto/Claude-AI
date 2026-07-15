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

  var ROLES = ["admin", "manager", "reviewer", "editor", "viewer"];

  var PERMS = {
    admin: "ALL",
    manager: ["upload", "download", "improve", "create", "kc", "book.add", "book.edit", "book.delete", "reindex", "clause", "clause.manage", "template", "tpl.upload", "tpl.replace", "reports"],
    editor: ["upload", "download", "improve", "create", "kc", "book.add", "book.edit", "reindex", "clause", "clause.manage", "reports"],
    reviewer: ["download", "kc", "clause", "reports"],
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

  global.MOTAuth = {
    ROLES: ROLES, PERMS: PERMS,
    getRole: getRole, setRole: setRole, can: can, department: department
  };
})(window);
