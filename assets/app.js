/* ===== Procurement Governance Platform — prototype (EN / AR) ===== */
(function () {
  "use strict";

  /* ---------------- i18n strings ---------------- */
  const I18N = {
    en: {
      "brand.title": "Procurement Governance Platform",
      "brand.ai": "AI Powered",
      "user.name": "Procurement Specialist",
      "user.role": "Governance & Tendering",
      "hdr.search": "Ask the assistant or search specification books…",
      "hdr.engine": "AI Engine", "hdr.library": "Knowledge Library",
      "hdr.template": "Approved Template", "hdr.index": "Library Index",
      "hdr.ready": "Ready", "hdr.work": "Ready to work",
      "hdr.notif": "Notifications", "hdr.admin": "Administrator menu",
      "cmd.new": "New Specification", "cmd.library": "Reference Library",
      "cmd.template": "Template Manager", "cmd.addbook": "Add Reference Book",
      "cmd.reindex": "Reindex Library", "cmd.reports": "Reports", "cmd.settings": "Settings",
      "lib.title": "Smart Reference Library", "lib.search": "Search the library",
      "lib.categories": "Categories", "lib.recent": "Recently added",
      "lib.totalBooks": "Total books", "lib.cats": "Categories",
      "rcat.cyber": "Cybersecurity", "rcat.digital": "Digital Transformation",
      "rcat.infra": "Infrastructure", "rcat.managed": "Managed Services",
      "rcat.ai": "Artificial Intelligence", "rcat.apps": "Applications & Systems",
      "rb.1": "Cloud Platform Specification", "rb.2": "Cybersecurity Operations SOW",
      "rb.3": "Managed IT Services RFP",
      "tpl.current": "Approved template", "tpl.version": "Version",
      "tpl.updated": "Updated", "tpl.replace": "Replace template",
      "pipe.title": "AI processing pipeline",
      "stg.1": "Document structure", "stg.2": "Requirement extraction",
      "stg.3": "Knowledge matching", "stg.4": "Content enhancement",
      "stg.5": "Template generation", "stg.6": "Executive report",
      "dash.title": "Knowledge Dashboard", "dash.type": "Document type",
      "dash.lang": "Language", "dash.cat": "Category", "dash.pages": "Pages",
      "dash.refs": "Reference books found", "dash.tpl": "Current template",
      "dash.out": "Expected output", "dash.outVal": "Improved SoW + report",
      "dash.await": "Awaiting upload",
      "ov.title": "Library overview", "ov.updated": "Last update", "ov.index": "Index status",
      "phase.soon": "This capability arrives in a later phase.",
      "search.soon": "AI search arrives in a later phase.",
      "step.setup": "Setup", "step.setup.d": "Mode & document",
      "step.proc": "AI Processing", "step.proc.d": "Knowledge pipeline",
      "step.results": "Results", "step.results.d": "Tabs & exports",
      "mode.eyebrow": "Step 1 · Operation mode",
      "mode.title": "What would you like to do?",
      "mode.lead": "Choose how the AI assistant should work with your specification book.",
      "mode.improve": "Improve Existing Specification Book",
      "mode.improveD": "Upload an existing document — the AI reviews it, enhances the content, and regenerates it from the approved template.",
      "mode.create": "Create New Specification Book",
      "mode.createD": "Generate a brand-new specification from the approved template and the Ministry reference library.",
      "mode.select": "Select →", "mode.hint": "Select an operation mode above to begin.",
      "create.eyebrow": "Create new", "create.title": "Create a new specification book",
      "create.sub": "Generate a new Ministry specification from the approved template and the reference library.",
      "create.name": "Specification title", "create.namePh": "e.g. Managed Cloud Services",
      "create.cat": "Category", "create.tpl": "Approved template",
      "create.generate": "Generate specification",
      "res.eyebrow": "Results", "res.title": "AI results",
      "tab.overview": "Overview", "tab.improvements": "AI Improvements",
      "tab.differences": "Differences", "tab.references": "Knowledge References",
      "tab.report": "Executive Report",
      "ref.sub": "Reference books matched from the Ministry knowledge library.",
      "ref.1": "Cybersecurity Operations Framework", "ref.2": "Managed Services SLA Standards",
      "ref.3": "Cloud Infrastructure Baseline", "ref.4": "Digital Governance Guide",
      "ref.5": "KPI & Acceptance Criteria Library",
      "step.upload": "Upload", "step.analysis": "Analysis", "step.findings": "Recommendations",
      "step.improve": "Improved Document", "step.report": "Executive Report",
      "step.upload.d": "Add your document", "step.analysis.d": "AI reviews quality & gaps",
      "step.findings.d": "Prioritised fixes", "step.improve.d": "Enhanced version",
      "step.report.d": "Summary for leadership",
      "up.eyebrow": "Step 1 of 5",
      "eyebrow.analysis": "Step 2 of 5", "eyebrow.findings": "Step 3 of 5",
      "eyebrow.improve": "Step 4 of 5", "eyebrow.report": "Step 5 of 5",
      "hero.h1": "Review and improve procurement documents <span class=\"accent\">before they go to tender.</span>",
      "hero.lead": "Upload an RFP, Statement of Work or technical specification. The platform analyses it, flags quality and governance gaps, and produces a higher-quality, tender-ready version.",
      "up.title": "Upload your procurement document",
      "up.drag": "Drag & drop your file here, or",
      "dz.browse": "browse files",
      "up.fmt": "PDF or DOCX", "up.size": "Up to 25 MB", "up.secure": "Secure & confidential",
      "state.uploading": "Uploading…", "state.success": "Uploaded successfully",
      "state.continue": "Starting analysis…",
      "state.error.title": "We couldn't read that file",
      "state.error.msg": "Please upload a PDF or DOCX up to 25 MB.",
      "btn.tryagain": "Try again",
      "after.summary": "What happens after upload?",
      "after.analyse": "The AI analyses your document",
      "after.recommend": "You get prioritised recommendations",
      "after.improve": "An improved, tender-ready version is produced",
      "type.q": "What type of document is this?", "type.opt": "(optional)",
      "chip.rfp": "RFP", "chip.sow": "Statement of Work", "chip.spec": "Technical Specification",
      "chip.framework": "Framework Agreement", "chip.scope": "Service Scope",
      "chip.managed": "Managed Services", "chip.tech": "Technology Procurement",
      "samples.title": "Or start from a sample document",
      "samples.sub": "No upload needed — load a representative document to see the platform in action.",
      "sample.use": "Use this →",
      "an.analysing": "Analysing document…",
      "an.prefix": "Analysing: ",
      "an.parse": "Document structure",
      "an.dup": "Requirement extraction",
      "an.req": "Knowledge matching",
      "an.gap": "Content enhancement",
      "an.gov": "Template generation",
      "an.gen": "Executive report",
      "an.summary": "Analysis summary",
      "score.desc": "Overall document quality before improvement. Reflects clarity, completeness, measurability and governance.",
      "tag.needs": "Needs improvement", "tag.ok": "Acceptable — improvable", "tag.strong": "Strong",
      "stat.issues": "Issues found", "stat.dup": "Duplicated scope items",
      "stat.missing": "Missing elements", "stat.cost": "Cost opportunities",
      "btn.viewrec": "View recommendations →",
      "cat.section": "Findings by category",
      "prio.high": "High priority", "prio.medium": "Medium priority", "prio.low": "Opportunity",
      "fnd.title": "Recommendations",
      "fnd.sub": "Prioritised findings with recommended actions. Every change is explained and reversible.",
      "btn.seeimproved": "See improved document →",
      "flt.all": "All", "flt.high": "High", "flt.medium": "Medium", "flt.low": "Low",
      "sev.high": "high", "sev.medium": "medium", "sev.low": "low",
      "fnd.rec": "Recommended action:",
      "fnd.none": "No findings at this severity.",
      "imp.title": "Improved document",
      "imp.sub": "Weak content rewritten, measurable outcomes added, missing elements supplied.",
      "btn.download": "Download improved version",
      "diff.original": "Original", "diff.improved": "Improved by AI",
      "rpt.title": "Executive report",
      "rc.uplift": "Quality uplift", "rc.outof": "out of 100",
      "rc.resolved": "Issues resolved", "rc.resolvedsub": "91% addressed automatically",
      "rc.cost": "Est. cost optimisation", "rc.costsub": "opportunities flagged for review",
      "rc.gov": "Governance coverage", "rc.govsub": "KPIs, SLAs & acceptance criteria present",
      "rpt.summaryTitle": "Summary for leadership",
      "rpt.p1": "The submitted document was assessed as <strong>needs improvement</strong> prior to tendering, with 34 issues identified across scope quality, requirement strength, performance measures and governance. The platform detected 6 duplicated scope items and overlap with two previous procurements, 9 weak or vague requirements, and 11 missing elements — including absent KPIs, SLAs and acceptance criteria that would have made supplier performance difficult to enforce.",
      "rpt.p2": "An improved, tender-ready version was generated automatically: weak scope items and requirements were rewritten, measurable outcomes and governance provisions were added, and missing content was supplied. The document's quality score rose from <strong>58</strong> to <strong>86</strong>, with 91% of issues resolved without manual rework, while five cost-optimisation opportunities were flagged for specialist review. Each change is fully traceable, and the specialist retains final control over the document released to the market.",
      "btn.export": "Export report (PDF)", "btn.backanalysis": "Back to analysis",
      "btn.review": "Review another document",
      "ft.left": "Ministry of Tourism · Procurement Governance Platform",
      "ft.right": "Prototype · Demonstration data · Confidential",
      "toast.first": "Upload or load a document first",
      "toast.download": "Improved document prepared (prototype)",
      "toast.export": "Executive report exported (prototype)",
      "admin.open": "⚙ Template",
      "admin.title": "Approved Ministry template",
      "admin.intro": "Upload one official Ministry Word template (.docx). It is stored in the app and used for every generated document until replaced. Fixed formatting, branding, headers, footers and legal clauses are never modified by AI.",
      "admin.upload": "Upload approved template (.docx)",
      "admin.reset": "Restore default template",
      "admin.detected": "Detected placeholders",
      "admin.cur.default": "Using the bundled default Ministry template",
      "admin.cur.custom": "Approved template:",
      "admin.processing": "Processing template…",
      "admin.saved": "Template saved successfully. Placeholders detected:",
      "admin.reset.done": "Restored to the default Ministry template.",
      "admin.err.notdocx": "Please choose a Word .docx file.",
      "admin.err.parse": "Couldn't read that template. Make sure it is a valid Word .docx.",
      "gen.docx": "Generating document…",
      "gen.pdf": "Generating PDF…",
      "done.docx": "Word document downloaded.",
      "done.pdf": "PDF report downloaded.",
      "err.libs": "Export tools failed to load. Check your connection and try again.",
      "err.template": "No approved template found. Upload one from the ⚙ Template button.",
      "err.docx": "Couldn't generate the Word file. Please try again.",
      "err.pdf": "Couldn't generate the PDF. Please try again.",
      "pdf.generatedBy": "Generated by the Procurement Governance Platform — Ministry of Tourism",
      "st.uploaded": "Document uploaded. Starting analysis.",
      "st.error": "Unsupported file. Please use a PDF or DOCX up to 25 MB.",
      "langName": "العربية"
    },
    ar: {
      "brand.title": "منصة حوكمة المشتريات",
      "brand.ai": "مدعوم بالذكاء الاصطناعي",
      "user.name": "أخصائي مشتريات",
      "user.role": "الحوكمة والمنافسات",
      "hdr.search": "اسأل المساعد أو ابحث في الكراسات المرجعية…",
      "hdr.engine": "محرك الذكاء الاصطناعي", "hdr.library": "المكتبة المرجعية",
      "hdr.template": "القالب المعتمد", "hdr.index": "فهرس المكتبة",
      "hdr.ready": "جاهز", "hdr.work": "جاهز للعمل",
      "hdr.notif": "الإشعارات", "hdr.admin": "قائمة المدير",
      "cmd.new": "كراسة جديدة", "cmd.library": "المكتبة المرجعية",
      "cmd.template": "إدارة القوالب", "cmd.addbook": "إضافة كراسة مرجعية",
      "cmd.reindex": "إعادة فهرسة المكتبة", "cmd.reports": "التقارير", "cmd.settings": "الإعدادات",
      "lib.title": "المكتبة المرجعية الذكية", "lib.search": "ابحث داخل المكتبة",
      "lib.categories": "التصنيفات", "lib.recent": "أحدث الكراسات المضافة",
      "lib.totalBooks": "إجمالي الكراسات", "lib.cats": "التصنيفات",
      "rcat.cyber": "الأمن السيبراني", "rcat.digital": "التحول الرقمي",
      "rcat.infra": "البنية التحتية", "rcat.managed": "الخدمات المُدارة",
      "rcat.ai": "الذكاء الاصطناعي", "rcat.apps": "التطبيقات والأنظمة",
      "rb.1": "مواصفات المنصة السحابية", "rb.2": "نطاق عمل عمليات الأمن السيبراني",
      "rb.3": "كراسة شروط خدمات تقنية المعلومات المُدارة",
      "tpl.current": "القالب المعتمد", "tpl.version": "الإصدار",
      "tpl.updated": "آخر تحديث", "tpl.replace": "استبدال القالب",
      "pipe.title": "مسار المعالجة بالذكاء الاصطناعي",
      "stg.1": "تحليل هيكل المستند", "stg.2": "استخراج المتطلبات",
      "stg.3": "مطابقة المكتبة المرجعية", "stg.4": "تحسين المحتوى",
      "stg.5": "إنشاء المستند من القالب", "stg.6": "إعداد التقرير التنفيذي",
      "dash.title": "لوحة المعرفة", "dash.type": "نوع المستند",
      "dash.lang": "اللغة", "dash.cat": "التصنيف", "dash.pages": "عدد الصفحات",
      "dash.refs": "الكراسات المرجعية المطابقة", "dash.tpl": "القالب الحالي",
      "dash.out": "المخرجات المتوقعة", "dash.outVal": "كراسة محسّنة + تقرير تنفيذي",
      "dash.await": "بانتظار رفع مستند",
      "ov.title": "نظرة عامة على المكتبة", "ov.updated": "آخر تحديث", "ov.index": "حالة الفهرسة",
      "phase.soon": "تتوفر هذه الميزة في مرحلة لاحقة.",
      "search.soon": "بحث الذكاء الاصطناعي يتوفر في مرحلة لاحقة.",
      "step.setup": "الإعداد", "step.setup.d": "الوضع والمستند",
      "step.proc": "المعالجة", "step.proc.d": "مسار المعرفة",
      "step.results": "النتائج", "step.results.d": "التبويبات والتصدير",
      "mode.eyebrow": "الخطوة 1 · وضع التشغيل",
      "mode.title": "ماذا تريد أن تفعل؟",
      "mode.lead": "اختر كيف يعمل مساعد الذكاء الاصطناعي مع كراسة المواصفات.",
      "mode.improve": "تحسين كراسة مواصفات قائمة",
      "mode.improveD": "ارفع مستندًا قائمًا — يراجعه الذكاء الاصطناعي ويحسّن محتواه ويعيد إنشاءه من القالب المعتمد.",
      "mode.create": "إنشاء كراسة مواصفات جديدة",
      "mode.createD": "أنشئ كراسة جديدة كليًا من القالب المعتمد ومكتبة الوزارة المرجعية.",
      "mode.select": "اختيار ←", "mode.hint": "اختر وضع التشغيل بالأعلى للبدء.",
      "create.eyebrow": "إنشاء جديد", "create.title": "إنشاء كراسة مواصفات جديدة",
      "create.sub": "أنشئ كراسة مواصفات جديدة من القالب المعتمد والمكتبة المرجعية.",
      "create.name": "عنوان الكراسة", "create.namePh": "مثال: خدمات سحابية مُدارة",
      "create.cat": "التصنيف", "create.tpl": "القالب المعتمد",
      "create.generate": "إنشاء الكراسة",
      "res.eyebrow": "النتائج", "res.title": "نتائج الذكاء الاصطناعي",
      "tab.overview": "نظرة عامة", "tab.improvements": "تحسينات الذكاء الاصطناعي",
      "tab.differences": "الفروقات", "tab.references": "المراجع المعرفية",
      "tab.report": "التقرير التنفيذي",
      "ref.sub": "كراسات مرجعية مطابقة من مكتبة الوزارة المعرفية.",
      "ref.1": "إطار عمليات الأمن السيبراني", "ref.2": "معايير اتفاقيات مستوى الخدمة المُدارة",
      "ref.3": "الخط الأساس للبنية التحتية السحابية", "ref.4": "دليل الحوكمة الرقمية",
      "ref.5": "مكتبة مؤشرات الأداء ومعايير القبول",
      "step.upload": "رفع المستند", "step.analysis": "التحليل", "step.findings": "التوصيات",
      "step.improve": "المستند المُحسّن", "step.report": "التقرير التنفيذي",
      "step.upload.d": "أضف مستندك", "step.analysis.d": "فحص الجودة والفجوات",
      "step.findings.d": "إصلاحات حسب الأولوية", "step.improve.d": "النسخة المُحسّنة",
      "step.report.d": "ملخص للقيادة",
      "up.eyebrow": "الخطوة 1 من 5",
      "eyebrow.analysis": "الخطوة 2 من 5", "eyebrow.findings": "الخطوة 3 من 5",
      "eyebrow.improve": "الخطوة 4 من 5", "eyebrow.report": "الخطوة 5 من 5",
      "hero.h1": "راجع وحسّن مستندات المشتريات <span class=\"accent\">قبل طرحها في المنافسة.</span>",
      "hero.lead": "ارفع كراسة شروط أو نطاق عمل أو مواصفات فنية. تحلّلها المنصة وترصد فجوات الجودة والحوكمة، وتنتج نسخة أعلى جودة وجاهزة للطرح.",
      "up.title": "ارفع مستند المشتريات",
      "up.drag": "اسحب وأفلت ملفك هنا، أو",
      "dz.browse": "تصفّح الملفات",
      "up.fmt": "PDF أو DOCX", "up.size": "حتى 25 ميجابايت", "up.secure": "آمن وسري",
      "state.uploading": "جارٍ الرفع…", "state.success": "تم الرفع بنجاح",
      "state.continue": "جارٍ بدء التحليل…",
      "state.error.title": "تعذّرت قراءة هذا الملف",
      "state.error.msg": "يرجى رفع ملف PDF أو DOCX بحجم لا يتجاوز 25 ميجابايت.",
      "btn.tryagain": "حاول مرة أخرى",
      "after.summary": "ماذا يحدث بعد الرفع؟",
      "after.analyse": "يحلّل الذكاء الاصطناعي مستندك",
      "after.recommend": "تحصل على توصيات مرتبة حسب الأولوية",
      "after.improve": "تُنتَج نسخة مُحسّنة جاهزة للطرح",
      "type.q": "ما نوع هذا المستند؟", "type.opt": "(اختياري)",
      "chip.rfp": "كراسة الشروط (RFP)", "chip.sow": "نطاق العمل", "chip.spec": "المواصفات الفنية",
      "chip.framework": "اتفاقية إطارية", "chip.scope": "نطاق الخدمة",
      "chip.managed": "الخدمات المُدارة", "chip.tech": "المشتريات التقنية",
      "samples.title": "أو ابدأ بمستند نموذجي",
      "samples.sub": "بدون رفع — حمّل مستندًا تمثيليًا لرؤية المنصة أثناء العمل.",
      "sample.use": "استخدم هذا ←",
      "an.analysing": "جارٍ تحليل المستند…",
      "an.prefix": "جارٍ التحليل: ",
      "an.parse": "تحليل هيكل المستند",
      "an.dup": "استخراج المتطلبات",
      "an.req": "مطابقة المكتبة المرجعية",
      "an.gap": "تحسين المحتوى",
      "an.gov": "إنشاء المستند من القالب",
      "an.gen": "إعداد التقرير التنفيذي",
      "an.summary": "ملخص التحليل",
      "score.desc": "الجودة الإجمالية للمستند قبل التحسين. تعكس الوضوح والاكتمال وقابلية القياس والحوكمة.",
      "tag.needs": "بحاجة إلى تحسين", "tag.ok": "مقبول — قابل للتحسين", "tag.strong": "قوي",
      "stat.issues": "إجمالي الملاحظات", "stat.dup": "بنود نطاق مكررة",
      "stat.missing": "عناصر مفقودة", "stat.cost": "فرص توفير التكلفة",
      "btn.viewrec": "عرض التوصيات ←",
      "cat.section": "الملاحظات حسب الفئة",
      "prio.high": "أولوية عالية", "prio.medium": "أولوية متوسطة", "prio.low": "فرصة",
      "fnd.title": "التوصيات",
      "fnd.sub": "ملاحظات مرتبة حسب الأولوية مع الإجراءات الموصى بها. كل تغيير موضّح وقابل للتراجع.",
      "btn.seeimproved": "عرض المستند المُحسّن ←",
      "flt.all": "الكل", "flt.high": "عالية", "flt.medium": "متوسطة", "flt.low": "منخفضة",
      "sev.high": "عالية", "sev.medium": "متوسطة", "sev.low": "منخفضة",
      "fnd.rec": "الإجراء الموصى به:",
      "fnd.none": "لا توجد ملاحظات بهذا المستوى.",
      "imp.title": "المستند المُحسّن",
      "imp.sub": "إعادة صياغة المحتوى الضعيف، وإضافة مخرجات قابلة للقياس، واستكمال العناصر المفقودة.",
      "btn.download": "تنزيل النسخة المُحسّنة",
      "diff.original": "النص الأصلي", "diff.improved": "النسخة المُحسّنة بالذكاء الاصطناعي",
      "rpt.title": "التقرير التنفيذي",
      "rc.uplift": "تحسّن الجودة", "rc.outof": "من 100",
      "rc.resolved": "ملاحظات تمت معالجتها", "rc.resolvedsub": "تمت معالجة 91% تلقائيًا",
      "rc.cost": "تقدير فرص تحسين التكلفة", "rc.costsub": "فرص تم رصدها للمراجعة",
      "rc.gov": "تغطية الحوكمة", "rc.govsub": "اكتمال مؤشرات الأداء واتفاقيات الخدمة ومعايير القبول",
      "rpt.summaryTitle": "ملخص للقيادة",
      "rpt.p1": "قُيّم المستند المُقدَّم بأنه <strong>بحاجة إلى تحسين</strong> قبل الطرح، مع رصد 34 ملاحظة تشمل جودة النطاق وقوة المتطلبات ومقاييس الأداء والحوكمة. اكتشفت المنصة 6 بنود نطاق مكررة وتداخلًا مع عمليتي شراء سابقتين، و9 متطلبات ضعيفة أو غامضة، و11 عنصرًا مفقودًا — من بينها غياب مؤشرات الأداء واتفاقيات مستوى الخدمة ومعايير القبول التي كانت ستجعل إنفاذ أداء المورّد صعبًا.",
      "rpt.p2": "أُنشئت تلقائيًا نسخة مُحسّنة جاهزة للطرح: أُعيدت صياغة بنود النطاق والمتطلبات الضعيفة، وأُضيفت مخرجات قابلة للقياس وأحكام حوكمة، واستُكمل المحتوى المفقود. وارتفعت درجة جودة المستند من <strong>58</strong> إلى <strong>86</strong>، مع معالجة 91% من الملاحظات دون تدخل يدوي، فيما رُصدت خمس فرص لتحسين التكلفة للمراجعة. وكل تغيير قابل للتتبع، ويحتفظ الأخصائي بالقرار النهائي بشأن المستند المطروح في المنافسة.",
      "btn.export": "تصدير التقرير (PDF)", "btn.backanalysis": "العودة إلى التحليل",
      "btn.review": "مراجعة مستند آخر",
      "ft.left": "وزارة السياحة · منصة حوكمة المشتريات",
      "ft.right": "نموذج أولي · بيانات توضيحية · سري",
      "toast.first": "يرجى رفع أو تحميل مستند أولًا",
      "toast.download": "تم تجهيز المستند المُحسّن (نموذج أولي)",
      "toast.export": "تم تصدير التقرير التنفيذي (نموذج أولي)",
      "admin.open": "⚙ القالب",
      "admin.title": "قالب الوزارة المعتمد",
      "admin.intro": "ارفع قالب Word رسميًا معتمدًا من الوزارة (بصيغة .docx). يُخزَّن في التطبيق ويُستخدم لكل مستند يُنشأ حتى استبداله. لا يُعدّل الذكاء الاصطناعي التنسيقات الثابتة والهوية والرؤوس والتذييلات والبنود النظامية إطلاقًا.",
      "admin.upload": "رفع قالب معتمد (.docx)",
      "admin.reset": "استعادة القالب الافتراضي",
      "admin.detected": "الحقول المتغيّرة المكتشفة",
      "admin.cur.default": "يُستخدم القالب الافتراضي المضمّن للوزارة",
      "admin.cur.custom": "القالب المعتمد:",
      "admin.processing": "جارٍ معالجة القالب…",
      "admin.saved": "تم حفظ القالب بنجاح. عدد الحقول المكتشفة:",
      "admin.reset.done": "تمت الاستعادة إلى القالب الافتراضي للوزارة.",
      "admin.err.notdocx": "يرجى اختيار ملف Word بصيغة .docx.",
      "admin.err.parse": "تعذّرت قراءة هذا القالب. تأكد أنه ملف Word صالح بصيغة .docx.",
      "gen.docx": "جارٍ إنشاء المستند…",
      "gen.pdf": "جارٍ إنشاء ملف PDF…",
      "done.docx": "تم تنزيل مستند Word.",
      "done.pdf": "تم تنزيل تقرير PDF.",
      "err.libs": "تعذّر تحميل أدوات التصدير. تحقق من الاتصال وحاول مجددًا.",
      "err.template": "لا يوجد قالب معتمد. ارفع قالبًا من زر ⚙ القالب.",
      "err.docx": "تعذّر إنشاء ملف Word. حاول مرة أخرى.",
      "err.pdf": "تعذّر إنشاء ملف PDF. حاول مرة أخرى.",
      "pdf.generatedBy": "صادر عن منصة حوكمة المشتريات — وزارة السياحة",
      "st.uploaded": "تم رفع المستند. جارٍ بدء التحليل.",
      "st.error": "ملف غير مدعوم. استخدم PDF أو DOCX حتى 25 ميجابايت.",
      "langName": "English"
    }
  };

  /* ---------------- bilingual data ---------------- */
  const SAMPLES = {
    it:    { score: 58, from: 58, to: 86, type: "RFP", pages: 42, catKey: "rcat.managed", refs: 7,
             name: { en: "Managed IT Services RFP", ar: "كراسة شروط خدمات تقنية المعلومات المُدارة" },
             desc: { en: "Standard RFP for outsourced, managed IT operations.", ar: "كراسة شروط نموذجية لعمليات تقنية معلومات مُدارة ومُسندة." },
             meta: { en: "42 pages · 18 scope items", ar: "42 صفحة · 18 بند نطاق" } },
    cyber: { score: 61, from: 61, to: 88, type: "SOW", pages: 27, catKey: "rcat.cyber", refs: 9,
             name: { en: "Cybersecurity Operations SOW", ar: "نطاق عمل عمليات الأمن السيبراني" },
             desc: { en: "Scope of work for a security operations centre (SOC).", ar: "نطاق عمل لمركز عمليات أمن سيبراني (SOC)." },
             meta: { en: "27 pages · 12 scope items", ar: "27 صفحة · 12 بند نطاق" } },
    cloud: { score: 54, from: 54, to: 84, type: "SPEC", pages: 35, catKey: "rcat.infra", refs: 6,
             name: { en: "Cloud Platform Technical Spec", ar: "المواصفات الفنية لمنصة سحابية" },
             desc: { en: "Technical specification for a cloud hosting platform.", ar: "مواصفات فنية لمنصة استضافة سحابية." },
             meta: { en: "35 pages · 21 scope items", ar: "35 صفحة · 21 بند نطاق" } }
  };

  const CATEGORIES = [
    { sev: "high", ico: "⧉", name: { en: "Duplicated scope items", ar: "بنود نطاق مكررة" } },
    { sev: "high", ico: "≈", name: { en: "Overlap with previous docs", ar: "تداخل مع مستندات سابقة" } },
    { sev: "high", ico: "▤", name: { en: "Weak requirements", ar: "متطلبات ضعيفة" } },
    { sev: "medium", ico: "✎", name: { en: "Vague / unclear wording", ar: "صياغة غامضة أو غير واضحة" } },
    { sev: "medium", ico: "⊘", name: { en: "Unnecessary activities", ar: "أنشطة غير ضرورية" } },
    { sev: "high", ico: "＋", name: { en: "Missing requirements", ar: "متطلبات مفقودة" } },
    { sev: "medium", ico: "▣", name: { en: "Missing deliverables", ar: "مخرجات مفقودة" } },
    { sev: "high", ico: "📈", name: { en: "Missing KPIs", ar: "مؤشرات أداء مفقودة" } },
    { sev: "high", ico: "⏱", name: { en: "Missing SLAs", ar: "اتفاقيات مستوى خدمة مفقودة" } },
    { sev: "medium", ico: "✓", name: { en: "Missing acceptance criteria", ar: "معايير قبول مفقودة" } },
    { sev: "medium", ico: "⚖", name: { en: "Governance gaps", ar: "فجوات حوكمة" } },
    { sev: "low", ico: "₵", name: { en: "Cost optimisation", ar: "تحسين التكلفة" } }
  ];
  const CAT_COUNTS = [6, 2, 5, 4, 3, 3, 2, 3, 2, 1, 3, 5];

  const FINDINGS = [
    { sev: "high",
      cat: { en: "Missing SLA", ar: "اتفاقية مستوى خدمة مفقودة" },
      loc: { en: "Section 6.2 — Service Levels", ar: "البند 6.2 — مستويات الخدمة" },
      title: { en: "No service level agreement defined for incident response", ar: "لا توجد اتفاقية مستوى خدمة محددة للاستجابة للحوادث" },
      desc: { en: "The document requires the supplier to 'respond promptly to incidents' but defines no measurable response or resolution times, severity tiers, or service credits.", ar: "يتطلب المستند من المورّد «الاستجابة الفورية للحوادث» دون تحديد أزمنة استجابة أو حلّ قابلة للقياس، أو مستويات خطورة، أو غرامات." },
      rec: { en: "Add tiered SLAs (e.g. P1 response ≤ 15 min, resolution ≤ 4 h) with measurement method and service credits for breaches.", ar: "أضف اتفاقيات مستوى خدمة متدرجة (مثل: استجابة P1 خلال 15 دقيقة، والحل خلال 4 ساعات) مع طريقة القياس وغرامات عند الإخلال." } },
    { sev: "high",
      cat: { en: "Duplicated scope", ar: "بنود نطاق مكررة" },
      loc: { en: "Sections 4.1 & 4.6", ar: "البندان 4.1 و4.6" },
      title: { en: "Backup and disaster-recovery scope is specified twice", ar: "نطاق النسخ الاحتياطي والتعافي من الكوارث مذكور مرتين" },
      desc: { en: "Near-identical backup and DR responsibilities appear in both the infrastructure and operations sections, creating ambiguity over ownership and risk of double-charging.", ar: "تتكرر مسؤوليات النسخ الاحتياطي والتعافي من الكوارث بصيغة شبه متطابقة في قسمي البنية التحتية والتشغيل، مما يسبب غموضًا في الملكية واحتمال ازدواج التكلفة." },
      rec: { en: "Consolidate into a single Disaster Recovery scope item and cross-reference, removing the duplicate in 4.6.", ar: "ادمج البندين في بند واحد للتعافي من الكوارث مع إحالة مرجعية، وأزل التكرار في 4.6." } },
    { sev: "high",
      cat: { en: "Missing KPI", ar: "مؤشرات أداء مفقودة" },
      loc: { en: "Section 5 — Performance", ar: "القسم 5 — الأداء" },
      title: { en: "No KPIs for system availability or service quality", ar: "لا توجد مؤشرات أداء لتوافر النظام أو جودة الخدمة" },
      desc: { en: "The scope describes the service but sets no measurable performance targets, making objective supplier accountability impossible.", ar: "يصف النطاق الخدمة دون تحديد أهداف أداء قابلة للقياس، مما يجعل مساءلة المورّد بموضوعية متعذّرة." },
      rec: { en: "Define KPIs such as ≥ 99.9% monthly availability, ≤ 2% change failure rate, and ≥ 95% CSAT, each with a reporting cadence.", ar: "حدّد مؤشرات أداء مثل توافر شهري لا يقل عن 99.9%، ومعدل فشل تغييرات لا يتجاوز 2%، ورضا مستفيدين لا يقل عن 95%، مع دورية للتقارير." } },
    { sev: "high",
      cat: { en: "Overlap (previous docs)", ar: "تداخل مع مستندات سابقة" },
      loc: { en: "Section 4.3", ar: "البند 4.3" },
      title: { en: "Network monitoring overlaps with Framework Agreement FA-2024-019", ar: "مراقبة الشبكة تتداخل مع الاتفاقية الإطارية FA-2024-019" },
      desc: { en: "The network monitoring scope substantially overlaps with services already contracted under an existing framework agreement.", ar: "يتداخل نطاق مراقبة الشبكة بشكل كبير مع خدمات متعاقد عليها مسبقًا ضمن اتفاقية إطارية قائمة." },
      rec: { en: "Reuse the existing framework where possible and narrow this scope to avoid duplicate procurement and spend.", ar: "أعد استخدام الاتفاقية الإطارية القائمة قدر الإمكان وقلّص هذا النطاق لتجنّب ازدواج الشراء والإنفاق." } },
    { sev: "high",
      cat: { en: "Weak requirement", ar: "متطلب ضعيف" },
      loc: { en: "Section 4.4", ar: "البند 4.4" },
      title: { en: "'Provide adequate security' is not enforceable", ar: "عبارة «توفير أمن كافٍ» غير قابلة للإنفاذ" },
      desc: { en: "The requirement is subjective and cannot be evaluated or tested at acceptance.", ar: "المتطلب غير موضوعي ولا يمكن تقييمه أو اختباره عند القبول." },
      rec: { en: "Replace with specific, testable controls (e.g. alignment to a named security standard, MFA, encryption at rest and in transit).", ar: "استبدله بضوابط محددة وقابلة للاختبار (مثل الالتزام بمعيار أمني محدد، والمصادقة متعددة العوامل، والتشفير أثناء التخزين والنقل)." } },
    { sev: "medium",
      cat: { en: "Vague wording", ar: "صياغة غامضة" },
      loc: { en: "Section 3.2", ar: "البند 3.2" },
      title: { en: "Undefined term 'business hours'", ar: "مصطلح «ساعات العمل» غير مُعرّف" },
      desc: { en: "'Support during business hours' is used without defining the hours, time zone, or public-holiday treatment.", ar: "تُستخدم عبارة «الدعم خلال ساعات العمل» دون تحديد الساعات أو المنطقة الزمنية أو معاملة العطل الرسمية." },
      rec: { en: "Specify exact coverage windows, time zone and holiday handling to prevent disputes.", ar: "حدّد نوافذ التغطية بدقة والمنطقة الزمنية ومعالجة الإجازات لتفادي النزاعات." } },
    { sev: "medium",
      cat: { en: "Missing deliverable", ar: "مخرج مفقود" },
      loc: { en: "Section 7 — Transition", ar: "القسم 7 — الانتقال" },
      title: { en: "No transition-out / exit deliverables", ar: "لا توجد مخرجات للخروج/نقل المعرفة" },
      desc: { en: "The document covers onboarding but omits exit and knowledge-transfer deliverables at contract end.", ar: "يغطي المستند مرحلة التهيئة لكنه يغفل مخرجات الخروج ونقل المعرفة عند انتهاء العقد." },
      rec: { en: "Add an exit plan, data return/destruction, and knowledge-transfer deliverables with timelines.", ar: "أضف خطة خروج، وإعادة/إتلاف البيانات، ومخرجات لنقل المعرفة بجداول زمنية." } },
    { sev: "medium",
      cat: { en: "Governance gap", ar: "فجوة حوكمة" },
      loc: { en: "Section 8 — Governance", ar: "القسم 8 — الحوكمة" },
      title: { en: "No defined governance forum or reporting cadence", ar: "لا يوجد إطار حوكمة أو دورية للتقارير" },
      desc: { en: "Roles, escalation paths and review meetings are not specified, weakening oversight of supplier performance.", ar: "لم تُحدّد الأدوار ومسارات التصعيد واجتماعات المراجعة، مما يضعف الإشراف على أداء المورّد." },
      rec: { en: "Define a governance structure with monthly service reviews, escalation matrix and named accountable roles.", ar: "حدّد هيكل حوكمة يتضمن مراجعات خدمة شهرية، ومصفوفة تصعيد، وأدوارًا مسؤولة محددة." } },
    { sev: "medium",
      cat: { en: "Unnecessary activity", ar: "نشاط غير ضروري" },
      loc: { en: "Section 4.7", ar: "البند 4.7" },
      title: { en: "Weekly on-site presence not justified by scope", ar: "الحضور الأسبوعي في الموقع لا يبرره النطاق" },
      desc: { en: "A mandatory weekly on-site requirement adds cost without a clear operational need for a largely remote service.", ar: "اشتراط الحضور الأسبوعي الإلزامي في الموقع يضيف تكلفة دون حاجة تشغيلية واضحة لخدمة معظمها عن بُعد." },
      rec: { en: "Make on-site attendance event-driven rather than fixed weekly, reducing cost.", ar: "اجعل الحضور في الموقع مرتبطًا بالحاجة بدلًا من جدول أسبوعي ثابت لخفض التكلفة." } },
    { sev: "low",
      cat: { en: "Cost optimisation", ar: "تحسين التكلفة" },
      loc: { en: "Section 4.2", ar: "البند 4.2" },
      title: { en: "Consolidate licensing across lots", ar: "توحيد التراخيص عبر الحزم" },
      desc: { en: "Licensing is procured separately per lot; volume consolidation is likely to reduce unit cost.", ar: "تُشترى التراخيص بشكل منفصل لكل حزمة؛ ويُرجّح أن يخفّض توحيد الكميات تكلفة الوحدة." },
      rec: { en: "Aggregate licensing volumes across lots and request tiered pricing from bidders.", ar: "وحّد كميات التراخيص عبر الحزم واطلب تسعيرًا متدرجًا من المتنافسين." } },
    { sev: "low",
      cat: { en: "Missing acceptance criteria", ar: "معايير قبول مفقودة" },
      loc: { en: "Section 9 — Acceptance", ar: "القسم 9 — القبول" },
      title: { en: "Deliverable acceptance criteria not stated", ar: "لم تُحدّد معايير قبول المخرجات" },
      desc: { en: "Deliverables are listed without objective criteria for acceptance or rejection.", ar: "أُدرجت المخرجات دون معايير موضوعية للقبول أو الرفض." },
      rec: { en: "Add measurable acceptance criteria and a sign-off process for each major deliverable.", ar: "أضف معايير قبول قابلة للقياس وإجراء اعتماد لكل مخرج رئيسي." } }
  ];

  const DIFFS = [
    { label: { en: "Scope item · Incident management", ar: "بند النطاق · إدارة الحوادث" },
      before: { en: "The supplier shall respond promptly to incidents and resolve issues in a timely manner to keep systems running.",
                ar: "يلتزم المورّد بالاستجابة الفورية للحوادث وحلّ المشكلات في الوقت المناسب لإبقاء الأنظمة تعمل." },
      after: { en: 'The supplier shall operate a 24×7 incident management service with the following service levels: <span class="add">P1 response ≤ 15 minutes, resolution ≤ 4 hours</span>; <span class="add">P2 response ≤ 1 hour, resolution ≤ 8 hours</span>. Performance shall be measured monthly, reported in the service review, and <span class="add">service credits shall apply for any breach</span>.',
               ar: 'يلتزم المورّد بتشغيل خدمة إدارة حوادث على مدار الساعة طوال الأسبوع وفق مستويات الخدمة التالية: <span class="add">استجابة P1 خلال 15 دقيقة، والحل خلال 4 ساعات</span>؛ <span class="add">استجابة P2 خلال ساعة، والحل خلال 8 ساعات</span>. ويُقاس الأداء شهريًا ويُعرض في مراجعة الخدمة، <span class="add">وتُطبّق غرامات عند أي إخلال</span>.' } },
    { label: { en: "Requirement · Security", ar: "متطلب · الأمن" },
      before: { en: "The supplier must provide adequate security for all systems and data.",
                ar: "يجب على المورّد توفير أمن كافٍ لجميع الأنظمة والبيانات." },
      after: { en: 'The supplier shall implement security controls aligned to <span class="add">the Ministry\'s information-security standard</span>, including <span class="add">multi-factor authentication, encryption of data at rest and in transit, role-based access control, and quarterly vulnerability assessments</span>. Compliance shall be <span class="add">evidenced at acceptance and audited annually</span>.',
               ar: 'يلتزم المورّد بتطبيق ضوابط أمنية متوافقة مع <span class="add">معيار أمن المعلومات لدى الوزارة</span>، تشمل <span class="add">المصادقة متعددة العوامل، وتشفير البيانات أثناء التخزين والنقل، والتحكم في الوصول حسب الأدوار، وتقييمات ثغرات ربع سنوية</span>. ويُثبَت الالتزام <span class="add">عند القبول ويُدقّق سنويًا</span>.' } },
    { label: { en: "Performance · Added KPIs (new content)", ar: "الأداء · مؤشرات مضافة (محتوى جديد)" },
      before: { en: "— No measurable performance targets were defined in the original document. —",
                ar: "— لم تُحدَّد أي أهداف أداء قابلة للقياس في المستند الأصلي. —" },
      after: { en: 'Added measurable KPIs: <span class="add">system availability ≥ 99.9% per month</span>, <span class="add">change failure rate ≤ 2%</span>, <span class="add">customer satisfaction ≥ 95%</span>, and <span class="add">monthly KPI reporting with a defined remediation process</span> where targets are missed.',
               ar: 'أُضيفت مؤشرات أداء قابلة للقياس: <span class="add">توافر النظام لا يقل عن 99.9% شهريًا</span>، <span class="add">ومعدل فشل التغييرات لا يتجاوز 2%</span>، <span class="add">ورضا المستفيدين لا يقل عن 95%</span>، <span class="add">وتقارير شهرية للمؤشرات مع إجراء معالجة</span> عند عدم تحقيق الأهداف.' } }
  ];

  /* ---------------- helpers ---------------- */
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.prototype.slice.call((c || document).querySelectorAll(s));
  let lang = localStorage.getItem("mot_lang") || "ar";
  const t = (k) => (I18N[lang] && I18N[lang][k] != null) ? I18N[lang][k] : (I18N.en[k] || k);

  const steps = $$(".step");
  const views = { upload:"view-upload", analysing:"view-analysing", results:"view-results" };
  const stepOrder = ["upload","analysing","results"];
  let analysed = false;
  let activeSample = SAMPLES.it;
  let currentFilter = "all";
  let currentScore = 58;

  const dz = $("#dropzone");

  /* ---------------- language ---------------- */
  function applyLang(next) {
    lang = next;
    localStorage.setItem("mot_lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", lang === "ar");

    $$("[data-i18n]").forEach(el => { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.getAttribute("data-i18n-html")); });
    $$("[data-i18n-ph]").forEach(el => { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph"))); });
    $$("[data-i18n-title]").forEach(el => { el.setAttribute("title", t(el.getAttribute("data-i18n-title"))); });

    // sample cards
    $$(".scard").forEach(b => {
      const s = SAMPLES[b.dataset.sample];
      $("[data-sname]", b).textContent = s.name[lang];
      $("[data-sdesc]", b).textContent = s.desc[lang];
      $("[data-smeta]", b).textContent = s.meta[lang];
    });

    $("#langToggle").textContent = t("langName");

    var rn = document.getElementById("resDocName");
    if (rn) rn.textContent = activeSample.name[lang];
    updateScoreTag(currentScore);

    buildCategories();
    if (analysed) { buildFindings(currentFilter); buildDiff(); buildRefs(); }
    updateFilterCounts();
    if (dashReady) updateDashboard();
  }

  /* ---------- Knowledge Dashboard (Phase 1 UI) ---------- */
  var dashReady = false;
  function setTxt(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }
  function updateDashboard() {
    var s = activeSample || SAMPLES.it;
    setTxt("dashType", s.type || "—");
    setTxt("dashLang", lang === "ar" ? "العربية" : "Arabic");
    setTxt("dashCat", s.catKey ? t(s.catKey) : "—");
    setTxt("dashPages", s.pages ? String(s.pages) : "—");
    setTxt("dashRefs", s.refs != null ? String(s.refs) : "—");
  }
  function resetDashboard() {
    dashReady = false;
    setTxt("dashType", t("dash.await"));
    ["dashLang", "dashCat", "dashPages", "dashRefs"].forEach(function (id) { setTxt(id, "—"); });
  }

  function updateFilterCounts() {
    const counts = { all: FINDINGS.length, high: 0, medium: 0, low: 0 };
    FINDINGS.forEach(f => { counts[f.sev]++; });
    $$(".filter").forEach(b => {
      const sev = b.dataset.sev;
      b.textContent = t("flt." + sev) + " (" + counts[sev] + ")";
    });
  }

  /* ---------------- view nav ---------------- */
  function showView(key, opts) {
    opts = opts || {};
    $$(".view").forEach(v => v.classList.remove("is-active"));
    const el = document.getElementById(views[key]);
    if (el) el.classList.add("is-active");
    const idx = stepOrder.indexOf(key);
    steps.forEach(s => {
      const si = stepOrder.indexOf(s.dataset.view);
      const active = s.dataset.view === key;
      s.classList.toggle("is-active", active);
      s.classList.toggle("is-done", idx > -1 && si > -1 && si < idx);
      if (active) s.setAttribute("aria-current", "step"); else s.removeAttribute("aria-current");
    });
    if (!opts.noScroll) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toast(msg) {
    const el = $("#toast"); el.textContent = msg; el.classList.add("show");
    clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("show"), 2600);
  }
  function announce(msg) { const s = $("#dzStatus"); if (s) s.textContent = msg; }

  /* ---------------- upload state machine ---------------- */
  function setDzState(state) { dz.dataset.state = state; }

  function validFile(file) {
    if (!file) return false;
    const name = (file.name || "").toLowerCase();
    const okExt = name.endsWith(".pdf") || name.endsWith(".docx");
    const okSize = file.size <= 25 * 1024 * 1024;
    return okExt && okSize;
  }

  function handleFile(file) {
    if (!validFile(file)) { setDzState("error"); announce(t("st.error")); return; }
    $("#upFileName").textContent = file.name;
    $("#okFileName").textContent = file.name;
    setDzState("uploading");
    const bar = $("#upBar"), pct = $("#upPct");
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(100, p + Math.max(4, Math.round((100 - p) * 0.18)));
      bar.style.width = p + "%"; pct.textContent = p;
      if (p >= 100) {
        clearInterval(iv);
        setDzState("success"); announce(t("st.uploaded"));
        setTimeout(() => {
          startAnalysisDoc({
            name: { en: file.name, ar: file.name },
            score: 57, from: 57, to: 85
          });
        }, 950);
      }
    }, 120);
  }

  /* ---------------- analysis ---------------- */
  function runAnalysing() {
    dashReady = true; updateDashboard();
    $("#analysingDoc").textContent = t("an.prefix") + activeSample.name[lang];
    const items = $$("#analysingSteps li");
    items.forEach(i => { i.classList.remove("active","done"); var p = i.querySelector(".stg-pct"); if (p) p.textContent = ""; });
    showView("analysing");
    let i = 0;
    const tick = () => {
      if (i > 0) {
        const prev = items[i-1]; prev.classList.remove("active"); prev.classList.add("done");
        const pp = prev.querySelector(".stg-pct"); if (pp) pp.textContent = "100%";
      }
      if (i < items.length) {
        items[i].classList.add("active");
        const cp = items[i].querySelector(".stg-pct"); if (cp) cp.textContent = (25 + Math.floor(Math.random()*55)) + "%";
        i++; setTimeout(tick, 600);
      } else finishAnalysis();
    };
    setTimeout(tick, 400);
  }
  function startAnalysisSample(key) { activeSample = SAMPLES[key]; runAnalysing(); }
  function startAnalysisDoc(obj) { activeSample = obj; runAnalysing(); }

  function finishAnalysis() {
    analysed = true;
    currentScore = activeSample.score;
    setTxt("resDocName", activeSample.name[lang]);
    $("#upFrom").textContent = activeSample.from;
    $("#upTo").textContent = activeSample.to;
    buildCategories();
    buildFindings("all");
    buildDiff();
    buildRefs();
    showResults("overview");
  }

  /* ---------- Results tabs ---------- */
  function activateTab(tab) {
    $$(".rtab").forEach(b => b.classList.toggle("is-active", b.dataset.tab === tab));
    $$(".tabpanel").forEach(p => p.classList.toggle("is-active", p.id === "tab-" + tab));
    if (tab === "overview") animateScores();
  }
  function showResults(tab) { showView("results"); activateTab(tab || "overview"); }

  const REFS = [
    { key: "ref.1", cat: "rcat.cyber", rel: 92 },
    { key: "ref.2", cat: "rcat.managed", rel: 88 },
    { key: "ref.3", cat: "rcat.infra", rel: 84 },
    { key: "ref.4", cat: "rcat.digital", rel: 79 },
    { key: "ref.5", cat: "rcat.ai", rel: 74 }
  ];
  function buildRefs() {
    var wrap = document.getElementById("refList");
    if (!wrap) return;
    wrap.innerHTML = REFS.map(function (r) {
      return '<div class="ref-item"><div class="ref-top"><span class="ref-ico">▤</span>'
        + '<span class="ref-name">' + t(r.key) + '</span><span class="ref-cat">' + t(r.cat) + '</span></div>'
        + '<div class="ref-rel"><span class="ref-bar"><span style="width:' + r.rel + '%"></span></span>'
        + '<span class="ref-pct">' + r.rel + '%</span></div></div>';
    }).join("");
  }

  function updateScoreTag(score) {
    const tag = $("#scoreTag");
    if (!tag) return;
    if (score < 65) tag.textContent = t("tag.needs");
    else if (score < 80) tag.textContent = t("tag.ok");
    else tag.textContent = t("tag.strong");
  }

  function animateScores(score) {
    if (typeof score !== "number") score = currentScore;
    currentScore = score;
    const circ = 2 * Math.PI * 52;
    const fg = $("#gaugeFg");
    fg.style.strokeDashoffset = circ;
    requestAnimationFrame(() => { fg.style.strokeDashoffset = circ * (1 - score/100); });
    countTo($("#scoreNum"), score, 1100);
    updateScoreTag(score);
    $$(".stat-num").forEach(el => countTo(el, parseInt(el.dataset.count,10), 1000));
  }

  function countTo(el, target, dur) {
    const start = performance.now();
    function frame(now) {
      const p = Math.min(1, (now - start)/dur);
      const eased = 1 - Math.pow(1-p, 3);
      el.textContent = Math.round(target*eased);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------------- builders ---------------- */
  function buildCategories() {
    const grid = $("#catGrid");
    if (!grid) return;
    const map = { high:"sev-high", medium:"sev-med", low:"sev-low" };
    const prio = { high:"prio.high", medium:"prio.medium", low:"prio.low" };
    grid.innerHTML = CATEGORIES.map((c, idx) => `
      <div class="cat ${map[c.sev]}" data-sev="${c.sev}">
        <div class="cat-ico">${c.ico}</div>
        <div class="cat-body">
          <div class="cat-name">${c.name[lang]}</div>
          <div class="cat-meta">${t(prio[c.sev])}</div>
        </div>
        <div class="cat-count">${CAT_COUNTS[idx]}</div>
      </div>`).join("");
    $$("#catGrid .cat").forEach(card => card.addEventListener("click", () => {
      showView("findings"); setFilter(card.dataset.sev);
    }));
  }

  function buildFindings(sev) {
    currentFilter = sev;
    const wrap = $("#findings");
    if (!wrap) return;
    const list = sev === "all" ? FINDINGS : FINDINGS.filter(f => f.sev === sev);
    wrap.innerHTML = list.map(f => `
      <div class="finding ${f.sev}">
        <div class="finding-top">
          <span class="sev-badge ${f.sev}">${t("sev."+f.sev)}</span>
          <span class="finding-cat">${f.cat[lang]}</span>
          <span class="finding-loc">${f.loc[lang]}</span>
        </div>
        <div class="finding-title">${f.title[lang]}</div>
        <div class="finding-desc">${f.desc[lang]}</div>
        <div class="finding-rec"><b>${t("fnd.rec")}</b> ${f.rec[lang]}</div>
      </div>`).join("") || `<p class="muted">${t("fnd.none")}</p>`;
  }

  function setFilter(sev) {
    $$(".filter").forEach(f => f.classList.toggle("is-active", f.dataset.sev === sev));
    buildFindings(sev);
  }

  function buildDiff() {
    const wrap = $("#diff");
    if (!wrap) return;
    wrap.innerHTML = DIFFS.map(d => `
      <div class="diff-card">
        <div class="diff-head">${d.label[lang]}</div>
        <div class="diff-cols">
          <div class="diff-col diff-before"><h4>${t("diff.original")}</h4><div class="diff-box">${d.before[lang]}</div></div>
          <div class="diff-col diff-after"><h4>${t("diff.improved")}</h4><div class="diff-box">${d.after[lang]}</div></div>
        </div>
      </div>`).join("");
  }

  /* ---------------- wiring ---------------- */
  $("#langToggle").addEventListener("click", () => applyLang(lang === "en" ? "ar" : "en"));

  steps.forEach(s => s.addEventListener("click", () => {
    const v = s.dataset.view;
    if (v === "upload") { showView("upload"); return; }
    if (!analysed) { toast(t("toast.first")); return; }
    showResults("overview");
  }));
  $$(".rtab").forEach(b => b.addEventListener("click", () => activateTab(b.dataset.tab)));

  // Operation mode selection
  var selectedMode = null;
  function resetMode() {
    selectedMode = null;
    var ws = document.querySelector(".workspace"); if (ws) ws.setAttribute("data-mode", "");
    $$(".opcard").forEach(c => c.setAttribute("aria-pressed", "false"));
  }
  function selectMode(mode) {
    selectedMode = mode;
    var ws = document.querySelector(".workspace"); if (ws) ws.setAttribute("data-mode", mode);
    $$(".opcard").forEach(c => c.setAttribute("aria-pressed", c.dataset.mode === mode ? "true" : "false"));
    if (ws && ws.scrollIntoView) ws.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  $$(".opcard").forEach(c => c.addEventListener("click", () => selectMode(c.dataset.mode)));

  // Create New Specification — generate (reuses the AI pipeline)
  var cg = document.getElementById("createGenBtn");
  if (cg) cg.addEventListener("click", function () {
    var nameEl = document.getElementById("createName");
    var catEl = document.getElementById("createCat");
    var nm = (nameEl && nameEl.value.trim()) || (lang === "ar" ? "كراسة مواصفات جديدة" : "New Specification Book");
    var catKey = (catEl && catEl.value) || "rcat.managed";
    startAnalysisDoc({ name: { en: nm, ar: nm }, score: 64, from: 64, to: 90, type: "SPEC", pages: 0, catKey: catKey, refs: 8 });
  });

  // upload interactions
  const fileInput = $("#fileInput");
  function openPicker() { if (dz.dataset.state === "idle") fileInput.click(); }
  dz.addEventListener("click", e => {
    if (e.target.closest("#browseBtn") || e.target.closest("#retryBtn")) return;
    openPicker();
  });
  dz.addEventListener("keydown", e => {
    if ((e.key === "Enter" || e.key === " ") && dz.dataset.state === "idle") { e.preventDefault(); fileInput.click(); }
  });
  document.addEventListener("click", e => {
    if (e.target.closest("#browseBtn")) { e.preventDefault(); fileInput.click(); }
    if (e.target.closest("#retryBtn")) { e.preventDefault(); setDzState("idle"); }
  });
  fileInput.addEventListener("change", e => {
    if (e.target.files && e.target.files.length) handleFile(e.target.files[0]);
    e.target.value = "";
  });
  ["dragenter","dragover"].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); if (dz.dataset.state === "idle") dz.classList.add("drag"); }));
  ["dragleave","dragend"].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.remove("drag"); }));
  dz.addEventListener("drop", e => {
    e.preventDefault(); dz.classList.remove("drag");
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) handleFile(f);
  });

  // sample cards
  $$(".scard").forEach(b => {
    b.setAttribute("role", "button");
    b.setAttribute("tabindex", "0");
    b.addEventListener("click", () => startAnalysisSample(b.dataset.sample));
    b.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); startAnalysisSample(b.dataset.sample); } });
  });

  // document-type chips (single select, optional)
  $$("#docChips .chip").forEach(c => c.addEventListener("click", () => {
    const wasOn = c.getAttribute("aria-pressed") === "true";
    $$("#docChips .chip").forEach(o => { o.classList.remove("is-selected"); o.setAttribute("aria-pressed","false"); });
    if (!wasOn) { c.classList.add("is-selected"); c.setAttribute("aria-pressed","true"); }
  }));

  /* ---------- exports: approved-template DOCX + branded PDF ---------- */
  function buildContentMap() {
    var s = activeSample || SAMPLES.it;
    var name = (s.name && s.name.ar) ? s.name.ar : ((s.name && s.name.en) || "مستند المشتريات");
    return {
      ProjectName: name,
      InitiativeName: "مبادرة تطوير حوكمة المشتريات وتحسين جودة كراسات الشروط",
      Scope: "يهدف نطاق العمل إلى تقديم الخدمة المطلوبة وفق أفضل الممارسات، مع تحديد واضح للمسؤوليات والمخرجات ومستويات الخدمة. أُعيدت صياغة النطاق ليكون قابلًا للقياس والإنفاذ، مع إزالة التكرار والتداخل مع الأعمال المتعاقد عليها سابقًا.",
      Objectives: "• رفع جودة الخدمة وموثوقيتها.\n• ضمان قابلية قياس الأداء ومساءلة المورّد.\n• تحقيق كفاءة الإنفاق وتفادي ازدواج النطاق.\n• الالتزام بمتطلبات الحوكمة والأمن.",
      Deliverables: "• خطة تنفيذ ومخرجات تشغيلية دورية.\n• تقارير أداء شهرية.\n• خطة انتقال وخروج ونقل معرفة عند نهاية العقد.\n• توثيق فني وتشغيلي محدّث.",
      KPIs: "• توافر النظام لا يقل عن 99.9% شهريًا.\n• معدل فشل التغييرات لا يتجاوز 2%.\n• رضا المستفيدين لا يقل عن 95%.\n• تقارير شهرية للمؤشرات مع إجراءات معالجة عند عدم التحقق.",
      SLAs: "• استجابة الحوادث الحرجة (P1) خلال 15 دقيقة والحل خلال 4 ساعات.\n• استجابة (P2) خلال ساعة والحل خلال 8 ساعات.\n• تُطبّق غرامات عند الإخلال بمستويات الخدمة.",
      AcceptanceCriteria: "• معايير قبول قابلة للقياس لكل مخرج رئيسي.\n• إجراء اعتماد وتوقيع رسمي قبل القبول النهائي.\n• التحقق من استيفاء المتطلبات الفنية والأمنية.",
      Timeline: "مدة التنفيذ 12 شهرًا قابلة للتجديد، وفق خطة زمنية بمراحل ومعالم رئيسية متفق عليها.",
      SupportModel: "دعم تشغيلي على مدار الساعة طوال أيام الأسبوع، مع حضور ميداني عند الحاجة بدلًا من جدول ثابت، وفريق مسمّى بأدوار ومسؤوليات واضحة.",
      SecurityRequirements: "• الالتزام بمعيار أمن المعلومات لدى الوزارة.\n• المصادقة متعددة العوامل وتشفير البيانات أثناء التخزين والنقل.\n• التحكم في الوصول حسب الأدوار وتقييمات ثغرات ربع سنوية.",
      Governance: "إطار حوكمة يتضمن مراجعات خدمة شهرية، ومصفوفة تصعيد، وأدوارًا مسؤولة محددة، وتقارير التزام دورية.",
      Assumptions: "• توفير الوزارة للوصول والصلاحيات اللازمة.\n• استقرار المتطلبات الأساسية خلال فترة التنفيذ.",
      Risks: "• الاعتماد المفرط على مورّد واحد — يُخفَّف بخطة استمرارية ونقل معرفة.\n• تغيّر النطاق — يُدار عبر ضبط التغييرات.",
      Dependencies: "• الاتفاقيات الإطارية القائمة ذات العلاقة.\n• الأنظمة والبنية التحتية للوزارة.",
      Pricing: "يُقدَّم التسعير وفق بنود واضحة قابلة للمقارنة، مع توحيد التراخيص عبر الحزم للحصول على تسعير متدرّج يحقق كفاءة التكلفة."
    };
  }

  function saveBlob(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = filename; a.rel = "noopener";
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1500);
  }

  function downloadImprovedDocx() {
    var btn = $("#downloadBtn");
    if (!window.MOTTemplate || !window.PizZip || !(window.docxtemplater || window.Docxtemplater)) { toast(t("err.libs")); return; }
    var orig = btn.textContent; btn.disabled = true; btn.textContent = t("gen.docx");
    window.MOTTemplate.renderDocx(buildContentMap()).then(function (blob) {
      if (!blob || blob.size < 1000) throw new Error("EMPTY");
      saveBlob(blob, "الكراسة_المحسنة.docx");
      toast(t("done.docx"));
    }).catch(function (e) {
      var msg = (e && e.message === "DEFAULT_TEMPLATE_MISSING") ? t("err.template") : t("err.docx");
      toast(msg); if (window.console) console.error("DOCX error:", e);
    }).then(function () { btn.disabled = false; btn.textContent = orig; });
  }

  function buildReportNode() {
    var s = activeSample || SAMPLES.it;
    var name = (s.name && s.name[lang]) ? s.name[lang] : ((s.name && s.name.ar) || "");
    var dir = (lang === "ar") ? "rtl" : "ltr";
    var today = new Date().toLocaleDateString(lang === "ar" ? "ar" : "en-GB",
      { year: "numeric", month: "long", day: "numeric", calendar: "gregory", numberingSystem: "latn" });
    function card(lbl, val, sub) {
      return '<div style="flex:1;border:1px solid #e3e9ea;border-radius:12px;padding:14px">'
        + '<div style="font-size:11px;color:#566472;font-weight:700">' + lbl + '</div>'
        + '<div style="font-size:24px;font-weight:700;color:#007846;margin:6px 0 2px">' + val + '</div>'
        + '<div style="font-size:11px;color:#566472">' + sub + '</div></div>';
    }
    var w = document.createElement("div");
    w.style.cssText = "position:fixed;top:0;left:-11000px;width:794px;background:#fff;font-family:'FS Albert Arabic','Segoe UI',sans-serif;color:#1f2d2c;direction:" + dir + ";";
    w.innerHTML =
      '<div style="background:#003232;color:#fff;padding:26px 34px;display:flex;align-items:center;gap:18px">'
      + '<img src="assets/logo-white.svg" style="height:40px;width:auto">'
      + '<div style="flex:1"><div style="font-size:22px;font-weight:700">' + t("rpt.title") + '</div>'
      + '<div style="font-size:13px;opacity:.85">' + name + ' · ' + today + '</div></div></div>'
      + '<div style="padding:28px 34px">'
      + '<div style="display:flex;gap:12px;margin-bottom:22px">'
      + card(t("rc.uplift"), s.from + ' → ' + s.to, t("rc.outof"))
      + card(t("rc.resolved"), '31 / 34', t("rc.resolvedsub"))
      + card(t("rc.cost"), '5', t("rc.costsub"))
      + card(t("rc.gov"), '100%', t("rc.govsub"))
      + '</div>'
      + '<h2 style="color:#003232;font-size:18px;margin:0 0 10px;border-bottom:2px solid #009696;padding-bottom:6px">' + t("rpt.summaryTitle") + '</h2>'
      + '<p style="font-size:14px;line-height:1.7;color:#33433f;margin:0 0 12px">' + t("rpt.p1") + '</p>'
      + '<p style="font-size:14px;line-height:1.7;color:#33433f;margin:0 0 12px">' + t("rpt.p2") + '</p>'
      + '<div style="margin-top:26px;border-top:1px solid #e3e9ea;padding-top:10px;font-size:11px;color:#566472">' + t("pdf.generatedBy") + '</div>'
      + '</div>';
    return w;
  }

  function exportReportPdf() {
    var btn = $("#exportReport");
    if (!window.html2canvas || !(window.jspdf && window.jspdf.jsPDF)) { toast(t("err.libs")); return; }
    var orig = btn.textContent; btn.disabled = true; btn.textContent = t("gen.pdf");
    var node = buildReportNode();
    document.body.appendChild(node);
    var imgs = [].slice.call(node.querySelectorAll("img"));
    Promise.all(imgs.map(function (im) { return im.complete ? Promise.resolve() : new Promise(function (r) { im.onload = im.onerror = r; }); }))
      .then(function () { return window.html2canvas(node, { scale: 2, backgroundColor: "#ffffff", useCORS: true, logging: false }); })
      .then(function (canvas) {
        try { node.remove(); } catch (_) {}
        var JsPDF = window.jspdf.jsPDF;
        var pdf = new JsPDF("p", "pt", "a4");
        var pw = pdf.internal.pageSize.getWidth(), ph = pdf.internal.pageSize.getHeight();
        var imgH = canvas.height * pw / canvas.width;
        var img = canvas.toDataURL("image/png");
        var pos = 0, left = imgH;
        pdf.addImage(img, "PNG", 0, pos, pw, imgH); left -= ph;
        while (left > 0) { pos -= ph; pdf.addPage(); pdf.addImage(img, "PNG", 0, pos, pw, imgH); left -= ph; }
        pdf.save("التقرير_التنفيذي.pdf");
        toast(t("done.pdf"));
      }).catch(function (e) {
        try { node.remove(); } catch (_) {}
        toast(t("err.pdf")); if (window.console) console.error("PDF error:", e);
      }).then(function () { btn.disabled = false; btn.textContent = orig; });
  }

  /* ---------- admin: approved template management ---------- */
  function refreshAdmin() {
    var badge = $("#tplBadge"), nameEl = $("#tplName"), list = $("#tplPhList");
    badge.textContent = "●"; badge.className = "tpl-badge"; nameEl.textContent = "…"; list.innerHTML = "";
    if (!window.MOTTemplate) { nameEl.textContent = t("err.libs"); return; }
    window.MOTTemplate.getStatus().then(function (st) {
      badge.className = "tpl-badge " + (st.source === "custom" ? "custom" : "default");
      nameEl.textContent = (st.source === "custom") ? (t("admin.cur.custom") + " " + st.name) : t("admin.cur.default");
      list.innerHTML = (st.placeholders || []).map(function (p) { return '<span class="ph-chip">{{' + p + '}}</span>'; }).join("");
    }).catch(function (e) { nameEl.textContent = t("admin.err.parse"); if (window.console) console.error(e); });
  }
  function openAdmin() { $("#adminModal").hidden = false; document.body.style.overflow = "hidden"; $("#tplMsg").textContent = ""; refreshAdmin(); }
  function closeAdmin() { $("#adminModal").hidden = true; document.body.style.overflow = ""; }

  $("#adminBtn").addEventListener("click", openAdmin);
  $("#adminClose").addEventListener("click", closeAdmin);
  $("#adminModal").addEventListener("click", function (e) { if (e.target.id === "adminModal") closeAdmin(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !$("#adminModal").hidden) closeAdmin(); });
  $("#tplUploadBtn").addEventListener("click", function () { $("#tplInput").click(); });
  $("#tplResetBtn").addEventListener("click", function () {
    if (!window.MOTTemplate) { $("#tplMsg").textContent = t("err.libs"); return; }
    window.MOTTemplate.resetToDefault().then(function () { $("#tplMsg").textContent = t("admin.reset.done"); refreshAdmin(); })
      .catch(function (e) { $("#tplMsg").textContent = t("admin.err.parse"); if (window.console) console.error(e); });
  });
  $("#tplInput").addEventListener("change", function (e) {
    var f = e.target.files && e.target.files[0]; e.target.value = "";
    if (!f) return;
    if (!/\.docx$/i.test(f.name)) { $("#tplMsg").textContent = t("admin.err.notdocx"); return; }
    $("#tplMsg").textContent = t("admin.processing");
    window.MOTTemplate.saveApprovedTemplate(f).then(function (res) {
      $("#tplMsg").textContent = t("admin.saved") + " " + res.placeholders.length;
      refreshAdmin();
    }).catch(function (err) {
      var msg = (err && err.message === "NOT_DOCX") ? t("admin.err.notdocx") : t("admin.err.parse");
      $("#tplMsg").textContent = msg; if (window.console) console.error(err);
    });
  });

  $("#downloadBtn").addEventListener("click", downloadImprovedDocx);
  $("#exportReport").addEventListener("click", exportReportPdf);
  $("#restartBtn").addEventListener("click", () => { analysed = false; setDzState("idle"); resetDashboard(); resetMode(); showView("upload"); });
  $$(".filter").forEach(f => f.addEventListener("click", () => setFilter(f.dataset.sev)));

  /* ---------- Enterprise command bar / header wiring (Phase 1) ---------- */
  function phaseToast() { toast(t("phase.soon")); }
  function scrollToLibrary() {
    var el = document.querySelector(".ws-left");
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function cmdAction(cmd) {
    switch (cmd) {
      case "new": analysed = false; if (typeof setDzState === "function") setDzState("idle"); resetDashboard(); resetMode(); showView("upload"); window.scrollTo({ top: 0, behavior: "smooth" }); break;
      case "template":
      case "settings": openAdmin(); break;
      case "reports": if (analysed) showResults("report"); else toast(t("toast.first")); break;
      case "library": scrollToLibrary(); break;
      default: phaseToast(); // addbook, reindex — later phases
    }
  }
  document.addEventListener("click", function (e) {
    var c = e.target.closest("[data-cmd]");
    if (c) { e.preventDefault(); cmdAction(c.getAttribute("data-cmd")); }
  });
  var gs = document.getElementById("globalSearch");
  if (gs) gs.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); toast(t("search.soon")); } });
  var nb = document.getElementById("notifBtn");
  if (nb) nb.addEventListener("click", phaseToast);
  var am = document.getElementById("adminMenuBtn");
  if (am) am.addEventListener("click", phaseToast);
  var tr = document.getElementById("tplReplaceBtn");
  if (tr) tr.addEventListener("click", function (e) { e.preventDefault(); openAdmin(); });

  // init
  applyLang(lang);
  showView("upload", { noScroll: true });
})();
