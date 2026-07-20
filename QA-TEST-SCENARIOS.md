# QA Test Scenarios — AI Procurement Governance Platform

Live: https://procurement-prototype-sigma.vercel.app
Scope: manual acceptance tests for the two workflows, the knowledge modules, exports, and the permissions system. Default role is **System Administrator**. Switch roles via the user chip (top of the header).

> Tip: to reset seeded demo data, clear the site's IndexedDB (DevTools → Application → IndexedDB → `motKnowledgeDB` → Delete) and reload. To reset the role, clear `localStorage` key `mot_role`.

---

## 1. Improve Existing Specification Book
**Pre:** role = Admin / Editor / Manager.
1. On the setup screen choose **تحسين كراسة مواصفات قائمة / Improve Existing**.
2. Drag-drop or browse a real **`.docx`** file into the upload card.
3. Watch: upload progress → success → AI processing stages → Results.
4. Open the result tabs (Overview, AI Improvements, Differences, Knowledge References, Executive Report).
5. Click **تنزيل النسخة المحسنة / Download improved version**.
- **Expected:** downloads `الكراسة_المحسنة.docx`. Opening it shows **your original document unchanged** (structure/tables/formatting/branding) with an appended "التحسينات والإضافات" section. **Never the blank template.**

## 2. Create New Specification Book
**Pre:** role = Admin / Editor / Manager.
1. Choose **إنشاء كراسة مواصفات جديدة / Create New**.
2. Fill the project fields (name, description, objectives, scope, deliverables, KPIs, acceptance, timeline, governance, security, support, risks, dependencies, pricing).
3. Click **إنشاء الكراسة / Generate** → processing → Results.
4. Click the download button (labelled **Download new document**).
- **Expected:** downloads `الكراسة_الجديدة.docx` built from the **current approved template** with the project fields filling the `{{placeholders}}` (0 placeholders left). Opens in Word cleanly.

## 3. Upload Reference Book
**Pre:** role = Admin / Editor / Manager.
1. Command bar → **إضافة كراسة مرجعية / Add Reference Book** (or Reference Library → Upload).
2. Fill name, category, department, project type, year, version, keywords, description, confidentiality, status; attach a DOCX/PDF.
3. Save.
- **Expected:** the book appears in the Reference Books table; stats increase; the book is auto-indexed for AI retrieval.

## 4. Re-index Library
**Pre:** role = Admin / Editor / Manager.
1. Reference Books table → a book's **↻ Re-index** action.
- **Expected:** "Re-indexed" toast; the book's *Last indexed* date updates; its vector is rebuilt (reflected in later analysis retrieval).

## 5. Upload Template (Template Manager)
**Pre:** role = Admin / Manager.
1. Command bar → **إدارة القوالب / Template Manager** (or ⚙).
2. **Upload New Version** → fill metadata + attach a `.docx` → save (optionally "set as current").
3. Confirm the version appears in **Template history**; detected `{{placeholders}}` show on the current-template card.
4. Test **Set as current**, **Rollback**, **Replace**, **Preview**, **Download**.
- **Expected:** exactly one Current template at a time; rollback promotes the previous version; Create New then uses the current template.

## 6. Download Word
1. After any analysis (scenario 1 or 2) click the download button.
- **Expected:** direct download of a valid, non-empty `.docx` that opens in Word. Improve ⇒ improved original; Create ⇒ templated new doc.

## 7. Export PDF
1. Results → Executive Report tab → **تصدير التقرير (PDF)**.
- **Expected:** direct download of `التقرير_التنفيذي.pdf`, branded (Ministry green header + logo), Arabic RTL correct, containing the score, before/after, resolved observations, cost opportunities, governance coverage, and executive summary. Not empty/broken.

## 8. Permission Restrictions (general)
1. Switch role via the user chip.
2. Confirm unauthorized command-bar items, mode cards, upload zone, and buttons are **hidden**.
3. Confirm attempting a disallowed action (if reachable) shows the Arabic access-denied toast.
- **Expected:** UI hides controls AND actions are blocked at the handler level.

## 9. Viewer role (read-only)
1. Switch to **مطّلع / Viewer**.
- **Expected:** New Specification, Add Reference Book, Template Manager, Settings, User Management, Download and Export are **hidden**; both operation-mode cards hidden with a read-only notice. Reference Library and Clause Library open **view-only** (no Add/Edit/Delete/Archive; Preview/Copy/History available on clauses).

## 10. Editor role
1. Switch to **محرّر / Editor**.
- **Expected:** can Improve, Create, upload/edit reference books, manage clauses, re-index, download, export. **Cannot** delete books, open Template Manager, Settings, or User Management.

## 11. Admin role
1. Switch to **مدير النظام / System Administrator** (default).
- **Expected:** full access to every page and action, including Template Manager, Settings, and User Management.

### Extra — Reviewer & Manager
- **Reviewer:** read-only on KC/Clauses, can Download and Export reports; cannot upload/create/improve or edit content.
- **Department Manager:** operational access; the Reference Books table is **filtered to the manager's department** (department filtering).

---

## Cross-cutting checks
- **RTL & Arabic font:** every screen renders right-to-left in Arabic with FS Albert Arabic; toggle EN/العربية and confirm layout mirrors and text stays legible.
- **Empty states:** empty book/clause tables and no-match filters show a message; no results with no strong references show a "no matches" note.
- **Loading states:** upload progress bar, AI processing stages with %, "retrieving references…" placeholder, and disabled buttons with "Generating…" during export.
- **Error states:** invalid upload (non-DOCX/PDF or >25 MB) shows the error card; export failures show an Arabic error toast; the app never crashes.
- **Responsive:** verify desktop / tablet / mobile — header wraps, workspace collapses to one column, tables scroll horizontally, forms go single-column.
- **Browser compatibility:** Chrome/Edge/Firefox/Safari (a Blob.arrayBuffer polyfill covers older Safari).
- **Stability after deploy:** reload the live URL; confirm no console errors and the same link always serves the latest version.

## Acceptance summary
- [ ] No blank Word files (Improve = original + improvements; Create = filled template).
- [ ] No broken/empty PDFs.
- [ ] No broken navigation.
- [ ] No mixed workflows (Improve never uses the template; Create always does).
- [ ] No unauthorized access (UI hidden + action-level guards).
- [ ] Ministry-branded throughout (palette, logo, FS Albert Arabic, RTL).
- [ ] Stable after deployment.
