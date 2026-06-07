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
      "step.upload": "Upload", "step.analysis": "Analysis", "step.findings": "Recommendations",
      "step.improve": "Improved Document", "step.report": "Executive Report",
      "hero.h1": "Review and improve procurement documents <span class=\"accent\">before they go to tender.</span>",
      "hero.lead": "Upload an RFP, Statement of Work or technical specification. The platform analyses it against good-practice standards and the Ministry's historical procurement knowledge, flags quality and governance gaps, and produces a higher-quality, tender-ready version.",
      "dz.title": "Drag & drop a document here",
      "dz.or": "or ", "dz.browse": "browse your files", "dz.formats": " · PDF, DOCX up to 25 MB",
      "types.label": "Supported document types",
      "chip.rfp": "RFP", "chip.sow": "Statement of Work", "chip.spec": "Technical Specification",
      "chip.framework": "Framework Agreement", "chip.scope": "Service Scope",
      "chip.managed": "Managed Services", "chip.tech": "Technology Procurement",
      "samples.title": "Try a sample document",
      "samples.sub": "No upload needed — load a representative document to see the platform in action.",
      "an.analysing": "Analysing document…",
      "an.prefix": "Analysing: ",
      "an.parse": "Reading and structuring the document",
      "an.dup": "Detecting duplicated and overlapping scope",
      "an.req": "Assessing requirement strength and clarity",
      "an.gap": "Checking deliverables, KPIs, SLAs & acceptance criteria",
      "an.gov": "Evaluating governance and cost optimisation",
      "an.gen": "Generating recommendations & improved version",
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
      "langName": "العربية"
    },
    ar: {
      "brand.title": "منصة حوكمة المشتريات",
      "brand.ai": "مدعوم بالذكاء الاصطناعي",
      "user.name": "أخصائي مشتريات",
      "user.role": "الحوكمة والمنافسات",
      "step.upload": "رفع المستند", "step.analysis": "التحليل", "step.findings": "التوصيات",
      "step.improve": "المستند المُحسّن", "step.report": "التقرير التنفيذي",
      "hero.h1": "راجع وحسّن مستندات المشتريات <span class=\"accent\">قبل طرحها في المنافسة.</span>",
      "hero.lead": "ارفع كراسة شروط أو نطاق عمل أو مواصفات فنية. تحلّلها المنصة وفق أفضل الممارسات ومعرفة الوزارة التراكمية في المشتريات، وترصد فجوات الجودة والحوكمة، وتنتج نسخة أعلى جودة وجاهزة للطرح.",
      "dz.title": "اسحب وأفلت المستند هنا",
      "dz.or": "أو ", "dz.browse": "تصفّح ملفاتك", "dz.formats": " · ملفات PDF أو DOCX حتى 25 ميجابايت",
      "types.label": "أنواع المستندات المدعومة",
      "chip.rfp": "كراسة الشروط (RFP)", "chip.sow": "نطاق العمل", "chip.spec": "المواصفات الفنية",
      "chip.framework": "اتفاقية إطارية", "chip.scope": "نطاق الخدمة",
      "chip.managed": "الخدمات المُدارة", "chip.tech": "المشتريات التقنية",
      "samples.title": "جرّب مستندًا نموذجيًا",
      "samples.sub": "بدون رفع — حمّل مستندًا تمثيليًا لرؤية المنصة أثناء العمل.",
      "an.analysing": "جارٍ تحليل المستند…",
      "an.prefix": "جارٍ التحليل: ",
      "an.parse": "قراءة المستند وهيكلته",
      "an.dup": "اكتشاف التكرار والتداخل في النطاق",
      "an.req": "تقييم قوة المتطلبات ووضوحها",
      "an.gap": "فحص المخرجات ومؤشرات الأداء واتفاقيات مستوى الخدمة ومعايير القبول",
      "an.gov": "تقييم الحوكمة وفرص تحسين التكلفة",
      "an.gen": "إنشاء التوصيات والنسخة المُحسّنة",
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
      "langName": "English"
    }
  };

  /* ---------------- bilingual data ---------------- */
  const SAMPLES = {
    it:    { score: 58, from: 58, to: 86,
             name: { en: "Managed IT Services RFP", ar: "كراسة شروط خدمات تقنية المعلومات المُدارة" },
             meta: { en: "42 pages · 18 scope items", ar: "42 صفحة · 18 بند نطاق" } },
    cyber: { score: 61, from: 61, to: 88,
             name: { en: "Cybersecurity Operations SOW", ar: "نطاق عمل عمليات الأمن السيبراني" },
             meta: { en: "27 pages · 12 scope items", ar: "27 صفحة · 12 بند نطاق" } },
    cloud: { score: 54, from: 54, to: 84,
             name: { en: "Cloud Platform Technical Spec", ar: "المواصفات الفنية لمنصة سحابية" },
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
    { sev: "low", ico: "₵", name: { en: "Cost optimisation", ar: "تحسين التكلفة" } },
    // counts (parallel)
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
  let lang = localStorage.getItem("mot_lang") || "en";
  const t = (k) => (I18N[lang] && I18N[lang][k] != null) ? I18N[lang][k] : (I18N.en[k] || k);

  const steps = $$(".step");
  const views = { upload:"view-upload", analysing:"view-analysing", analysis:"view-analysis",
                  findings:"view-findings", improve:"view-improve", report:"view-report" };
  let current = "upload";
  let analysed = false;
  let activeSample = SAMPLES.it;
  let currentFilter = "all";
  let currentScore = 58;

  /* ---------------- language ---------------- */
  function applyLang(next) {
    lang = next;
    localStorage.setItem("mot_lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", lang === "ar");

    $$("[data-i18n]").forEach(el => { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.getAttribute("data-i18n-html")); });

    // sample buttons
    $$(".sample").forEach(b => {
      const s = SAMPLES[b.dataset.sample];
      $("[data-sname]", b).textContent = s.name[lang];
      $("[data-smeta]", b).textContent = s.meta[lang];
    });

    // language toggle label shows the OTHER language
    $("#langToggle").textContent = t("langName");

    // dynamic doc names + tag
    $("#analysisDocName").textContent = activeSample.name[lang];
    $("#reportDocName").textContent = activeSample.name[lang];
    updateScoreTag(currentScore);

    // rebuild dynamic lists if present
    buildCategories();
    if (analysed) { buildFindings(currentFilter); buildDiff(); }
  }

  /* ---------------- view nav ---------------- */
  function showView(key, opts) {
    opts = opts || {};
    $$(".view").forEach(v => v.classList.remove("is-active"));
    const el = document.getElementById(views[key]);
    if (el) el.classList.add("is-active");
    const stepKey = key === "analysing" ? "upload" : key;
    const order = ["upload","analysis","findings","improve","report"];
    const idx = order.indexOf(stepKey);
    steps.forEach(s => {
      const si = order.indexOf(s.dataset.view);
      s.classList.toggle("is-active", s.dataset.view === stepKey);
      s.classList.toggle("is-done", idx > -1 && si > -1 && si < idx);
    });
    if (!opts.noScroll) window.scrollTo({ top: 0, behavior: "smooth" });
    current = key;
  }

  function toast(msg) {
    const el = $("#toast"); el.textContent = msg; el.classList.add("show");
    clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("show"), 2600);
  }

  /* ---------------- analysis ---------------- */
  function startAnalysis(key) {
    activeSample = SAMPLES[key];
    $("#analysingDoc").textContent = t("an.prefix") + activeSample.name[lang];
    const items = $$("#analysingSteps li");
    items.forEach(i => i.classList.remove("active","done"));
    showView("analysing");
    let i = 0;
    const tick = () => {
      if (i > 0) { items[i-1].classList.remove("active"); items[i-1].classList.add("done"); }
      if (i < items.length) { items[i].classList.add("active"); i++; setTimeout(tick, 600); }
      else finishAnalysis();
    };
    setTimeout(tick, 400);
  }

  function finishAnalysis() {
    analysed = true;
    currentScore = activeSample.score;
    $("#analysisDocName").textContent = activeSample.name[lang];
    $("#reportDocName").textContent = activeSample.name[lang];
    $("#upFrom").textContent = activeSample.from;
    $("#upTo").textContent = activeSample.to;
    buildCategories();
    buildFindings("all");
    buildDiff();
    showView("analysis");
    animateScores(activeSample.score);
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
    if (v !== "upload" && !analysed) { toast(t("toast.first")); return; }
    showView(v);
    if (v === "analysis") animateScores();
  }));
  $$("[data-goto]").forEach(b => b.addEventListener("click", () => {
    showView(b.dataset.goto);
    if (b.dataset.goto === "analysis") animateScores();
  }));

  // upload (event delegation for browse so innerHTML swaps don't break it)
  document.addEventListener("click", e => {
    if (e.target && e.target.id === "browseBtn") $("#fileInput").click();
  });
  $("#fileInput").addEventListener("change", e => {
    if (e.target.files && e.target.files.length) startAnalysis("it");
  });
  const dz = $("#dropzone");
  ["dragenter","dragover"].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.add("drag"); }));
  ["dragleave","drop"].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.remove("drag"); }));
  dz.addEventListener("drop", () => startAnalysis("it"));
  $$(".sample").forEach(b => b.addEventListener("click", () => startAnalysis(b.dataset.sample)));

  $("#downloadBtn").addEventListener("click", () => toast(t("toast.download")));
  $("#exportReport").addEventListener("click", () => toast(t("toast.export")));
  $("#restartBtn").addEventListener("click", () => { analysed = false; showView("upload"); });

  $$(".filter").forEach(f => f.addEventListener("click", () => setFilter(f.dataset.sev)));

  // init
  applyLang(lang);
  showView("upload", { noScroll: true });
})();
