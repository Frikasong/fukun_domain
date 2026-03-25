// useState, useEffect, useRef provided as globals from index.html

// ─── Storage Keys ───────────────────────────────────────────────────────────
const ENTRIES_KEY = "fukun-portfolio-entries";

// ─── Translations ────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    site: { name: "Fukun", tagline: "Law · Technology · Ideas" },
    langToggle: "中文",
    nav: {
      info: "About", professional: "Work", personal: "Life",
      projects: "Projects", share: "Share", hobbies: "Hobbies",
      about: "About", tech: "Legal AI Lab", law: "Law", investment: "Investment", essays: "Essays",
      music: "Music", photography: "Photos", contact: "Contact",
      taglineLaw: "Law", taglineTech: "Technology", taglineIdeas: "Ideas",
      techSub: "Legal AI · Tools",
      lawSub: "Legal Research",
      investmentSub: "Market Analysis",
      essaysSub: "Writing",
    },
    about: {
      bg: "Background",
      bg1: "Fukun is a J.D. student at Osgoode Hall Law School, Class of 2027. She is interested in the intersection of law and technology, especially the rapid development of legal tech. She is also keen on investing and broader technology topics.",
      bg2: "She graduated from Tsinghua University with a Bachelor of Science in Psychology and a Juris Master degree. She has also worked on legal matters at a private equity firm.",
      interests: "Interests",
      int1: "In her spare time, she enjoys tennis, listening to all kinds of music (especially jazz), photography, reading, and pottery.",
      int2: "She is always happy to connect with people from different backgrounds, so feel free to",
      connect: "connect",
    },
    tech: {
      tab1: "Legal Tech Lab",
      tab2: "Tech Observations & Insights",
      labHero: "What does AI reveal about how lawyers think?",
      labHeroSub: "This lab tracks the collision between artificial intelligence and legal practice — not as hype, but as a structural shift.",
      labLensesLabel: "THREE LENSES",
      lenses: [
        { icon: "🧠", title: "The Reasoning Layer", text: "What legal AI reveals about how lawyers actually think — cognitive patterns, heuristics, and the biases that shape legal judgment." },
        { icon: "💼", title: "The Transaction Question", text: "Who captures value when legal work gets automated? The economics of AI adoption in law firms, the restructuring of deal teams." },
        { icon: "⚖️", title: "Two Systems, One Problem", text: "Comparative analysis of how Chinese and Canadian legal systems approach AI governance, legal technology regulation." },
      ],
      toolsWatchLabel: "TOOLS I'M WATCHING",
      toolsBuiltLabel: "My Built Tools",
      toolsComingSoon: "More tools coming soon...",
      housekeeper: {
        tagline: "Evidence Brief Generator",
        desc: "Automatically structures uploaded evidence images into a formatted PDF brief — organized with tab dividers, thumbnails, and page numbers. Built for Ontario LTB hearings.",
        status: "Live",
        btn: "Open Tool →",
      },
      radarTool: {
        name: "Auto News Radar",
        tagline: "Legal tech intelligence tracker",
        desc: "A standalone scanner for legal tech and AI developments. Browse North America and China focus streams, filter by category, and open instant translations.",
        status: "Live",
        btn: "Open Tool →",
      },
      insightsTitle: "Legal Tech & Insights",
      insightsSub: "News · Updates · Analysis",
      obsTitle: "Tech Observations",
      obsSub: "Thoughts · Patterns · Trends",
      ctaText: "Thinking about legal AI too? I'm always up for an honest conversation — across law, tech, or anything in between.",
      ctaBtn: "Get in touch →",
      newPost: "+ New Post",
      empty: "No posts yet",
      createFirst: "Create First Post",
    },
    news: {
      autoTitle: "Auto News Radar",
      autoSub: "Continuously updated from public sources",
      naTitle: "North America Radar",
      naSub: "Legal tech products, skills, and influential articles",
      cnTitle: "China Focus",
      cnSub: "China Focus · Legal tech and policy developments",
      read: "Read",
      translate: "Translate",
      loading: "Loading latest updates...",
      empty: "No updates yet. Check back soon.",
      error: "Could not load the news feed right now.",
      categories: {
        tools: "Tools",
        skills: "Skills",
        articles: "Influential Articles",
        updates: "Updates",
      },
    },
    law: { newPost: "+ New Post", empty: "No posts yet in this section", createFirst: "Create First Post" },
    investment: { newPost: "+ New Post", empty: "No posts yet in this section", createFirst: "Create First Post" },
    essays: { newPost: "+ New Post", empty: "No posts yet in this section", createFirst: "Create First Post" },
    contact: { intro: "Let's connect!", email: "Email", linkedin: "LinkedIn", github: "GitHub", instagram: "Instagram", rednote: "Rednote" },
    editor: {
      new: "New Post", edit: "Edit Post", back: "← Back",
      titleLabel: "Title", titlePh: "Post title...",
      dateLabel: "Date", contentLabel: "Content", contentPh: "Write your thoughts...",
      importBtn: "📄 Import from PDF/DOCX", importing: "⟳ Importing...",
      addImages: "🖼️ Add Images", addFiles: "📎 Add Files",
      words: "words", save: "Save", publish: "Publish Post", update: "Update Post",
    },
    common: { readMore: "Read more", showLess: "Show less" },
    grid: { newPost: "+ New Post", empty: "No posts yet in this section", createFirst: "Create First Post", by: "by" },
    footer: "© 2026 Fukun · All Rights Reserved",
  },
  zh: {
    site: { name: "Fukun", tagline: "法律 · 科技 · 思想" },
    langToggle: "EN",
    nav: {
      info: "关于", professional: "工作", personal: "生活",
      projects: "项目", share: "分享", hobbies: "爱好",
      about: "关于", tech: "法律AI实验室", law: "法律", investment: "投资", essays: "文章",
      music: "音乐", photography: "照片", contact: "联系",
      techSub: "法律AI · 工具",
      lawSub: "法律研究",
      investmentSub: "市场分析",
      essaysSub: "写作",
      taglineLaw: "法律", taglineTech: "科技", taglineIdeas: "思想",
    },
    about: {
      bg: "背景",
      bg1: "Fukun是Osgoode Hall Law School 2027届法律博士（J.D.）在读生，专注于法律与科技的交叉领域，尤其关注法律科技的前沿发展，同时热衷于投资与通用科技议题。",
      bg2: "她毕业于清华大学，获心理学理学学士及法律硕士学位，并曾在私募股权机构从事法务工作。",
      interests: "兴趣爱好",
      int1: "业余时间，她热爱网球、各类音乐（尤钟爵士乐）、摄影、阅读与陶艺。",
      int2: "她非常乐意与来自不同背景的人交流，欢迎随时",
      connect: "联系她",
    },
    tech: {
      tab1: "法律科技实验室",
      tab2: "科技观察与洞见",
      labHero: "AI究竟揭示了律师怎样的思维方式？",
      labHeroSub: "本实验室追踪人工智能与法律实践的碰撞——不是炒作，而是一场结构性变革。",
      labLensesLabel: "三个视角",
      lenses: [
        { icon: "🧠", title: "推理之维", text: "法律AI揭示了律师真正的思维方式——认知模式、启发法则，以及塑造法律判断的偏见。" },
        { icon: "💼", title: "交易之问", text: "当法律工作被自动化，谁将获益？AI在律师事务所的经济学，交易团队的重组与演变。" },
        { icon: "⚖️", title: "双轨之道", text: "比较分析中加两国法律体系如何应对AI治理与法律科技监管，以及法律现代化的不同路径。" },
      ],
      toolsWatchLabel: "我关注的工具",
      toolsBuiltLabel: "我开发的工具",
      toolsComingSoon: "更多工具即将上线...",
      housekeeper: {
        tagline: "证据摘要生成器",
        desc: "自动将上传的证据图片整理为格式化PDF摘要——含分栏标签、缩略图与页码。专为安大略省LTB庭审设计。",
        status: "上线中",
        btn: "打开工具 →",
      },
      radarTool: {
        name: "自动新闻雷达",
        tagline: "法律科技情报追踪器",
        desc: "独立使用的法律科技与AI动态扫描工具。可查看北美与中国焦点，按类别筛选，并一键打开翻译。",
        status: "上线中",
        btn: "打开工具 →",
      },
      insightsTitle: "法律科技与洞见",
      insightsSub: "新闻 · 更新 · 分析",
      obsTitle: "科技观察",
      obsSub: "思考 · 规律 · 趋势",
      ctaText: "也在思考法律AI？欢迎交流——无论是法律、科技，还是任何感兴趣的话题。",
      ctaBtn: "联系我 →",
      newPost: "+ 新建文章",
      empty: "暂无文章",
      createFirst: "创建第一篇",
    },
    news: {
      autoTitle: "自动新闻雷达",
      autoSub: "基于公开来源持续更新",
      naTitle: "北美雷达",
      naSub: "法律科技产品、技能与影响力文章",
      cnTitle: "中国焦点",
      cnSub: "China Focus · 法律科技与政策动态",
      read: "阅读",
      translate: "翻译",
      loading: "正在加载最新动态...",
      empty: "暂时没有更新，稍后再看。",
      error: "当前无法加载新闻源。",
      categories: {
        tools: "工具",
        skills: "技能",
        articles: "影响力文章",
        updates: "动态",
      },
    },
    law: { newPost: "+ 新建文章", empty: "此栏目暂无文章", createFirst: "创建第一篇" },
    investment: { newPost: "+ 新建文章", empty: "此栏目暂无文章", createFirst: "创建第一篇" },
    essays: { newPost: "+ 新建文章", empty: "此栏目暂无文章", createFirst: "创建第一篇" },
    contact: { intro: "来联系我吧！", email: "邮箱", linkedin: "领英", github: "GitHub", instagram: "Instagram", rednote: "小红书" },
    editor: {
      new: "新建文章", edit: "编辑文章", back: "← 返回",
      titleLabel: "标题", titlePh: "文章标题...",
      dateLabel: "日期", contentLabel: "内容", contentPh: "写下你的想法...",
      importBtn: "📄 从PDF/DOCX导入", importing: "⟳ 导入中...",
      addImages: "🖼️ 添加图片", addFiles: "📎 添加文件",
      words: "字", save: "保存", publish: "发布文章", update: "更新文章",
    },
    common: { readMore: "阅读更多", showLess: "收起" },
    grid: { newPost: "+ 新建文章", empty: "此栏目暂无文章", createFirst: "创建第一篇", by: "作者" },
    footer: "© 2026 Fukun · 版权所有",
  },
};

// ─── Section Configuration ──────────────────────────────────────────────────
const SECTIONS = [
  // Top-level nav pages
  { id: "about",    name: "About",    icon: "👋", type: "nav" },
  { id: "projects", name: "Projects", icon: "🛠️", type: "nav" },
  { id: "share",    name: "Share",    icon: "✍️", type: "nav" },
  { id: "hobbies",  name: "Hobbies",  icon: "🎵", type: "nav" },
  // Internal data sections (not in main nav, used for entry tagging)
  { id: "tech",        name: "Legal AI Lab", icon: "⚖️", type: "hidden" },
  { id: "law",         name: "Law",          icon: "📚", type: "hidden" },
  { id: "investment",  name: "Investment",   icon: "📈", type: "hidden" },
  { id: "essays",      name: "Essays",       icon: "✍️", type: "hidden" },
  { id: "music",       name: "Music",        icon: "🎵", type: "hidden" },
  { id: "photography", name: "Photos",       icon: "📷", type: "hidden" },
  { id: "insights",    name: "Insights",     icon: "💡", type: "hidden" },
  { id: "contact",     name: "Contact",      icon: "📧", type: "hidden" },
];

// Maps old section IDs to new consolidated sections (for localStorage backwards compat)
const SECTION_MAP = {
  "legal-ai": "tech",
  "tools": "tech",
  "legal-tech": "tech",
  "tech-obs": "tech",
  "admin-law": "law",
  "comparative": "law",
};

// ─── Utility Functions ──────────────────────────────────────────────────────
async function extractDocx(file) {
  const mammoth = await import("mammoth");
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

async function extractPdf(file) {
  if (!window.pdfjsLib) {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    };
    document.head.appendChild(script);
    await new Promise((r) => (script.onload = r));
  }
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item) => item.str).join(" ") + "\n";
  }
  return text.trim();
}

async function extractText(file) {
  const name = file.name.toLowerCase();
  if (name.endsWith(".docx")) return await extractDocx(file);
  if (name.endsWith(".pdf")) return await extractPdf(file);
  throw new Error("Unsupported file type");
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── Storage Helpers ────────────────────────────────────────────────────────
async function loadEntries() {
  // Preferred source: Notion-synced static feed (auto-updated by GitHub Actions)
  try {
    const res = await fetch(`notion-posts.json?t=${Date.now()}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.entries)) {
        // Deduplicate by notionPageId (UUID), falling back to computed id
        const seen = new Set();
        return data.entries.filter((e) => {
          const k = e.notionPageId || e.id;
          if (seen.has(k)) return false;
          seen.add(k);
          return true;
        });
      }
    }
  } catch {
    // Fallback to local storage below
  }

  // Fallback source: legacy local storage
  try {
    const result = await window.storage.get(ENTRIES_KEY);
    return result ? JSON.parse(result.value) : [];
  } catch {
    return [];
  }
}

async function saveEntries(entries) {
  await window.storage.set(ENTRIES_KEY, JSON.stringify(entries));
}


// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════
function App() {
  const [entries, setEntries] = useState([]);
  const [activeSection, setActiveSection] = useState("about");
  const [view, setView] = useState("grid"); // "grid" | "editor"
  const [editing, setEditing] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [form, setForm] = useState({ title: "", date: "", body: "", images: [], attachments: [], section: "tech" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const [techTab, setTechTab] = useState("lab");
  const [logoFailed, setLogoFailed] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  const T = TRANSLATIONS[lang];

  const isMobile = viewportWidth <= 768;
  const isTablet = viewportWidth > 768 && viewportWidth < 1100;
  const isWideDesktop = viewportWidth >= 1400;

  // Navigation hover
  const [hoveredGroup, setHoveredGroup] = useState(null);

  // File handling
  const [fileStatus, setFileStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const attachmentInputRef = useRef(null);

  useEffect(() => {
    loadEntries().then(setEntries);
  }, []);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Entry management
  const openNew = (sectionOverride) => {
    setForm({ title: "", date: new Date().toISOString().slice(0, 10), body: "", images: [], attachments: [], section: sectionOverride || activeSection });
    setEditing(null);
    setFileStatus("");
    setView("editor");
  };

  const openEdit = (entry) => {
    setForm({
      title: entry.title,
      date: entry.date,
      body: entry.body,
      images: entry.images || [],
      attachments: entry.attachments || [],
      section: entry.section,
    });
    setEditing(entry);
    setFileStatus("");
    setView("editor");
  };

  const openPost = (entry) => {
    setSelectedEntry(entry);
    setView("post");
  };

  const saveEntry = async () => {
    if (!form.body.trim()) return;
    let updated;
    if (editing) {
      updated = entries.map((e) => (e.id === editing.id ? { ...e, ...form } : e));
    } else {
      const newEntry = { id: Date.now(), ...form };
      updated = [...entries, newEntry];
    }
    updated.sort((a, b) => new Date(b.date) - new Date(a.date));
    setEntries(updated);
    await saveEntries(updated);
    setView("grid");
  };

  const deleteEntry = async (id) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    await saveEntries(updated);
    if (editing && editing.id === id) setView("grid");
  };

  // File handling
  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    setFileStatus("Extracting text…");
    try {
      const text = await extractText(file);
      setForm((prev) => ({ ...prev, body: text }));
      setFileStatus(`✓ Imported from "${file.name}"`);
    } catch (e) {
      setFileStatus(`✗ ${e.message}`);
    }
    setUploading(false);
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];
    for (const file of files) {
      if (file.type.startsWith("image/")) {
        const base64 = await fileToBase64(file);
        newImages.push({ name: file.name, data: base64 });
      }
    }
    setForm((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
  };

  const handleAttachmentUpload = async (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = [];
    for (const file of files) {
      const base64 = await fileToBase64(file);
      newAttachments.push({ name: file.name, data: base64, size: file.size });
    }
    setForm((prev) => ({ ...prev, attachments: [...prev.attachments, ...newAttachments] }));
  };

  const removeImage = (index) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const removeAttachment = (index) => {
    setForm((prev) => ({ ...prev, attachments: prev.attachments.filter((_, i) => i !== index) }));
  };

  // Filtered entries per nav page
  const sectionEntries = (() => {
    if (activeSection === "share") {
      const seen = new Set();
      return entries.filter((e) => {
        const s = SECTION_MAP[e.section] || e.section;
        const k = e.notionPageId || e.id;
        if (["tech", "law", "essays"].includes(s) && !seen.has(k)) { seen.add(k); return true; }
        return false;
      }).sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    if (activeSection === "hobbies") {
      return entries.filter((e) => {
        const s = SECTION_MAP[e.section] || e.section;
        return ["music", "photography"].includes(s);
      }).sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    if (activeSection === "insights") {
      const seen = new Set();
      return entries.filter((e) => {
        const s = SECTION_MAP[e.section] || e.section;
        const k = e.notionPageId || e.id;
        if ((s === "tech" || s === "law") && !seen.has(k)) { seen.add(k); return true; }
        return false;
      }).sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return entries.filter((e) => e.section === activeSection || SECTION_MAP[e.section] === activeSection);
  })();
  const currentSection = SECTIONS.find((s) => s.id === activeSection);

  return (
    <div style={styles.root} data-lang={lang}>
      {lang === "zh" && (
        <style>{`[data-lang='zh'] * { font-style: normal !important; }`}</style>
      )}
      {/* Background */}
      <div style={styles.bgPattern} />

      {/* Header — chester.how pill nav */}
      <header style={{ ...styles.header, padding: isMobile ? "12px 16px" : "13px 32px" }}>
        <div style={styles.headerContent}>

          {/* Left: pill nav (desktop) or brand (mobile) */}
          {!isMobile ? (
            <nav style={styles.pillNav}>
              <button style={styles.pillNavBrand} onClick={() => { setView("grid"); setActiveSection("about"); }}>
                Fukun
              </button>
              <span style={styles.pillNavDivider}>|</span>
              {[
                { id: "about",    label: T.nav.info     },
                { id: "projects", label: T.nav.projects  },
                { id: "share",    label: T.nav.share     },
                { id: "hobbies",  label: T.nav.hobbies   },
              ].map(item => (
                <button
                  key={item.id}
                  className="pill-nav-btn"
                  style={{ ...styles.pillNavLink, ...(activeSection === item.id ? styles.pillNavLinkActive : {}) }}
                  onClick={() => { setActiveSection(item.id); setView("grid"); }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          ) : (
            <button style={styles.pillNavBrand} onClick={() => { setView("grid"); setActiveSection("about"); }}>
              Fukun
            </button>
          )}

          {/* Right: links + lang (desktop) / hamburger (mobile) */}
          {!isMobile ? (
            <div style={styles.headerRight}>
              <a href="https://www.linkedin.com/in/fukun-y-7753a5176/" target="_blank" rel="noopener noreferrer" className="hdr-link" style={styles.headerRightLink}>LinkedIn</a>
              <a href="https://github.com/Frikasong" target="_blank" rel="noopener noreferrer" className="hdr-link" style={styles.headerRightLink}>GitHub</a>
              <button style={styles.langToggleNew} onClick={() => setLang(lang === "en" ? "zh" : "en")}>
                {T.langToggle}
              </button>
            </div>
          ) : (
            <button style={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
      </header>

      {/* Nav backdrop */}
      {isMobile && menuOpen && (
        <div style={styles.navBackdrop} onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile side panel */}
      {isMobile && (
        <nav style={{ ...styles.mobileSidePanel, transform: menuOpen ? "translateX(0)" : "translateX(100%)" }}>
          <button style={styles.mobilePanelClose} onClick={() => setMenuOpen(false)}>✕</button>
          <div style={styles.mobilePanelContent}>
            <div style={styles.mobilePanelGroup}>
              <div style={styles.mobilePanelGroupHeader}>{T.nav.info}</div>
              <button style={{ ...styles.mobilePanelItem, ...(activeSection === "about" ? styles.mobilePanelItemActive : {}) }} onClick={() => { setActiveSection("about"); setView("grid"); setMenuOpen(false); }}>
                👋 {T.nav.about}
              </button>
            </div>
            <div style={styles.mobilePanelGroup}>
              <div style={styles.mobilePanelGroupHeader}>{T.nav.projects}</div>
              {SECTIONS.filter((s) => s.type === "projects").map((section) => {
                const label = T.nav[section.id] || section.name;
                return (
                  <button key={section.id} style={{ ...styles.mobilePanelItem, ...(activeSection === section.id ? styles.mobilePanelItemActive : {}) }} onClick={() => { setActiveSection(section.id); setView("grid"); setMenuOpen(false); }}>
                    <span>{section.icon}</span>
                    <span style={styles.mobilePanelItemText}>{label}</span>
                  </button>
                );
              })}
            </div>
            <div style={styles.mobilePanelGroup}>
              <div style={styles.mobilePanelGroupHeader}>{T.nav.writing}</div>
              {SECTIONS.filter((s) => s.type === "writing").map((section) => {
                const label = T.nav[section.id] || section.name;
                return (
                  <button key={section.id} style={{ ...styles.mobilePanelItem, ...(activeSection === section.id ? styles.mobilePanelItemActive : {}) }} onClick={() => { setActiveSection(section.id); setView("grid"); setMenuOpen(false); }}>
                    <span>{section.icon}</span>
                    <span style={styles.mobilePanelItemText}>{label}</span>
                  </button>
                );
              })}
            </div>
            <div style={styles.mobilePanelGroup}>
              <div style={styles.mobilePanelGroupHeader}>{T.nav.hobbies}</div>
              {SECTIONS.filter((s) => s.type === "hobbies").map((section) => {
                const label = T.nav[section.id] || section.name;
                return (
                  <button key={section.id} style={{ ...styles.mobilePanelItem, ...(activeSection === section.id ? styles.mobilePanelItemActive : {}) }} onClick={() => { setActiveSection(section.id); setView("grid"); setMenuOpen(false); }}>
                    <span>{section.icon}</span>
                    <span style={styles.mobilePanelItemText}>{label}</span>
                  </button>
                );
              })}
            </div>
            <div style={styles.mobilePanelLang}>
              <button style={styles.mobilePanelLangBtn} onClick={() => setLang(lang === "en" ? "zh" : "en")}>
                {T.langToggle}
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main style={{
        ...styles.main,
        maxWidth: isMobile ? "100%" : (isWideDesktop ? 1600 : 1280),
        padding: isMobile ? "28px 14px 44px" : (isTablet ? "40px 18px 56px" : "56px 24px 68px")
      }}>
        {view === "grid" ? (
          <GridView
            section={currentSection}
            entries={sectionEntries}
            onNew={openNew}
            onEdit={openEdit}
            onDelete={deleteEntry}
            onOpenPost={openPost}
            setActiveSection={setActiveSection}
            setView={setView}
            setTechTab={setTechTab}
            techTab={techTab}
            T={T}
            lang={lang}
          />
        ) : view === "post" ? (
          <PostView
            entry={selectedEntry}
            onBack={() => setView("grid")}
            T={T}
            lang={lang}
          />
        ) : (
          <EditorView
            form={form}
            setForm={setForm}
            onSave={saveEntry}
            onCancel={() => setView("grid")}
            onFileInput={(e) => e.target.files[0] && handleFile(e.target.files[0])}
            fileInputRef={fileInputRef}
            imageInputRef={imageInputRef}
            attachmentInputRef={attachmentInputRef}
            onImageUpload={handleImageUpload}
            onAttachmentUpload={handleAttachmentUpload}
            removeImage={removeImage}
            removeAttachment={removeAttachment}
            fileStatus={fileStatus}
            uploading={uploading}
            isEditing={!!editing}
            T={T}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={{ ...styles.footerContent, flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 10 : 0 }}>
          <span>{T.footer}</span>
          <a href="mailto:frikasong@gmail.com" className="footer-link-a" style={styles.footerLink}>
            frikasong@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// GRID VIEW
// ═══════════════════════════════════════════════════════════════════════════
function GridView({ section, entries, onNew, onEdit, onDelete, onOpenPost, setActiveSection, setView, setTechTab, techTab, T, lang }) {
  const sectionLabel = T.nav[section.id] || section.name;
  const sectionSub = T.nav[section.id + "Sub"] || section.subtitle;

  // Special handling for About section — hub layout
  if (section.id === "about") {
    const scrollToConnect = () => {
      document.getElementById("hub-connect")?.scrollIntoView({ behavior: "smooth" });
    };

    const tiles = [
      {
        key: "legal-ai-lab",
        category: lang === "zh" ? "项目" : "Projects",
        label: lang === "zh" ? "法律AI实验室" : "Legal AI Lab",
        sub: lang === "zh" ? "法律科技工具" : "Tools at the frontier of law & AI",
        onClick: () => { setActiveSection("projects"); setView("grid"); },
      },
      {
        key: "share",
        category: lang === "zh" ? "分享" : "Share",
        label: lang === "zh" ? "文章与洞见" : "Writing & Insights",
        sub: lang === "zh" ? "法律 · 科技 · 随笔" : "Law · Tech · Essays",
        onClick: () => { setActiveSection("share"); setView("grid"); },
      },
      {
        key: "tech-brew",
        category: lang === "zh" ? "项目" : "Projects",
        label: lang === "zh" ? "科技资讯" : "Tech Updates",
        sub: lang === "zh" ? "自动新闻雷达" : "Auto news radar",
        href: "news-radar.html",
      },
      {
        key: "music",
        category: lang === "zh" ? "爱好" : "Hobbies",
        label: lang === "zh" ? "音乐" : "Music",
        sub: lang === "zh" ? "每周精选" : "Weekly picks",
        onClick: () => { setActiveSection("hobbies"); setView("grid"); },
      },
      {
        key: "photos",
        category: lang === "zh" ? "爱好" : "Hobbies",
        label: lang === "zh" ? "照片" : "Photos",
        sub: lang === "zh" ? "摄影" : "Photography",
        onClick: () => { setActiveSection("hobbies"); setView("grid"); },
      },
      {
        key: "essays",
        category: lang === "zh" ? "分享" : "Share",
        label: lang === "zh" ? "随笔" : "Essays",
        sub: lang === "zh" ? "思考与记录" : "Thoughts & reflections",
        onClick: () => { setActiveSection("share"); setView("grid"); },
      },
    ];

    const isNarrow = typeof window !== "undefined" && window.innerWidth <= 860;
    return (
      <div style={styles.aboutHub}>
        <div style={{ ...styles.aboutTwoCol, flexDirection: isNarrow ? "column" : "row" }}>

          {/* ── Left column: hero text + bio + portrait + connect ── */}
          <div style={isNarrow ? { width: "100%" } : styles.aboutLeft}>

            {/* Hero greeting */}
            <h1 style={{ ...styles.aboutHero, fontSize: isNarrow ? 38 : 52 }}>
              {lang === "zh" ? (
                <>嗨，我是{"\n"}<span style={styles.aboutHeroAccent}>Fukun</span> 👋</>
              ) : (
                <>Hey there, I'm{"\n"}<span style={styles.aboutHeroAccent}>Fukun</span> 👋</>
              )}
            </h1>

            {/* Bio paragraphs */}
            <p style={styles.aboutText}>{T.about.bg1}</p>
            <p style={{ ...styles.aboutText, marginBottom: 28 }}>{T.about.bg2}</p>

            {/* Portrait */}
            <div style={{ ...styles.aboutPortraitCard, width: 185, marginBottom: 28, borderRadius: 16 }}>
              <img src="portrait.jpg?v=7" alt="Fukun Yang" style={{ ...styles.aboutPortraitImg, aspectRatio: "3/4", objectPosition: "center 22%" }} />
              <div style={styles.aboutPortraitGlass} />
            </div>

            {/* Interests */}
            <p style={styles.aboutText}>{T.about.int1}</p>
            <p style={{ ...styles.aboutText, marginBottom: 36 }}>
              {T.about.int2}{' '}
              <span className="about-connect-sp" style={styles.aboutConnectLink} onClick={scrollToConnect}>{T.about.connect}</span>!
            </p>

            {/* Connect links */}
            <div id="hub-connect" style={{ marginTop: 4 }}>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: 20, color: "#2B5054", margin: "0 0 14px" }}>
                {lang === "zh" ? "欢迎联系~" : "Let's connect!"}
              </p>
              <div style={styles.hubConnectLinks}>
                <a href="mailto:frikasong@gmail.com" className="hub-link" style={styles.hubConnectLink}>{T.contact.email}</a>
                <span style={styles.hubConnectDot}>·</span>
                <a href="https://www.linkedin.com/in/fukun-y-7753a5176/" target="_blank" rel="noopener noreferrer" className="hub-link" style={styles.hubConnectLink}>{T.contact.linkedin}</a>
                <span style={styles.hubConnectDot}>·</span>
                <a href="https://instagram.com/frika_song" target="_blank" rel="noopener noreferrer" className="hub-link" style={styles.hubConnectLink}>{T.contact.instagram}</a>
                <span style={styles.hubConnectDot}>·</span>
                <a href="https://github.com/Frikasong" target="_blank" rel="noopener noreferrer" className="hub-link" style={styles.hubConnectLink}>{T.contact.github}</a>
                <span style={styles.hubConnectDot}>·</span>
                <a href="https://www.xiaohongshu.com/user/profile/5d8eece70000000001009e90" target="_blank" rel="noopener noreferrer" className="hub-link" style={styles.hubConnectLink}>{T.contact.rednote}</a>
              </div>
            </div>
          </div>

          {/* ── Right column: bento section cards ── */}
          <div style={isNarrow ? { width: "100%", marginTop: 48 } : styles.aboutRight}>
            <div style={styles.bentoGrid}>
              {tiles.map((tile) =>
                tile.href ? (
                  <a
                    key={tile.key}
                    href={tile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bento-card-el"
                    style={styles.bentoCard}
                  >
                    <div style={styles.bentoCardTop}>
                      <span style={styles.bentoCardCategory}>{tile.category}</span>
                      <span style={styles.bentoCardArrow}>↗</span>
                    </div>
                    <p style={styles.bentoCardName}>{tile.label}</p>
                    <p style={styles.bentoCardDesc}>{tile.sub}</p>
                  </a>
                ) : (
                  <button key={tile.key} className="bento-card-el" style={styles.bentoCard} onClick={tile.onClick}>
                    <div style={styles.bentoCardTop}>
                      <span style={styles.bentoCardCategory}>{tile.category}</span>
                      <span style={styles.bentoCardArrow}>→</span>
                    </div>
                    <p style={styles.bentoCardName}>{tile.label}</p>
                    <p style={styles.bentoCardDesc}>{tile.sub}</p>
                  </button>
                )
              )}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ── PROJECTS page — chester card gallery with the two tools ──
  if (section.id === "projects") {
    const tools = [
      {
        id: "housekeeper",
        label: lang === "zh" ? "项目 · 工具" : "Projects · Tools",
        name: "Housekeeper",
        tagline: T.tech.housekeeper.tagline,
        desc: T.tech.housekeeper.desc,
        href: "https://housekeeper-2kp7.onrender.com/",
        emoji: "🏛️",
        grad: "linear-gradient(145deg, #0f2e31 0%, #2B5054 100%)",
      },
      {
        id: "radar",
        label: lang === "zh" ? "项目 · 工具" : "Projects · Tools",
        name: T.tech.radarTool.name,
        tagline: T.tech.radarTool.tagline,
        desc: T.tech.radarTool.desc,
        href: "news-radar.html",
        emoji: "📡",
        grad: "linear-gradient(145deg, #1a3e42 0%, #35666a 100%)",
      },
    ];
    return (
      <div style={styles.chesterPage}>
        <div style={styles.chesterGrid}>
          {tools.map(tool => (
            <a key={tool.id} href={tool.href} target="_blank" rel="noopener noreferrer" className="chester-tool-a" style={styles.chesterToolCard}>
              <div style={styles.chesterCardMeta}>
                <span style={styles.chesterCardLabel}>{tool.label}</span>
                <span style={styles.chesterCardArrowIcon}>↗</span>
              </div>
              <div style={{ ...styles.chesterToolPreview, background: tool.grad }}>
                <span style={styles.chesterToolEmoji}>{tool.emoji}</span>
                <div>
                  <p style={styles.chesterToolTagline}>{tool.tagline}</p>
                  <span style={styles.chesterToolLiveBadge}>{lang === "zh" ? "已上线" : "Live"}</span>
                </div>
              </div>
              <div style={styles.chesterCardBody}>
                <h3 style={styles.chesterToolTitle}>{tool.name}</h3>
                <p style={styles.chesterToolDesc}>{tool.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  // ── SHARE page — chester post cards (law + tech + essays combined) ──
  if (section.id === "share") {
    const sectionMeta = {
      law:    { label: lang === "zh" ? "法律"   : "Law",   color: "#2B5054" },
      tech:   { label: lang === "zh" ? "科技"   : "Tech",  color: "#35666a" },
      essays: { label: lang === "zh" ? "随笔"   : "Essays",color: "#7a5c42" },
    };
    return (
      <div style={styles.chesterPage}>
        {entries.length === 0 ? (
          <div style={styles.emptyState}><p style={styles.emptyText}>{T.grid.empty}</p></div>
        ) : (
          <div style={styles.chesterPostGrid}>
            {entries.map((entry, i) => {
              const sid = SECTION_MAP[entry.section] || entry.section;
              const meta = sectionMeta[sid] || { label: "Share", color: "#2B5054" };
              const excerpt = entry.body ? entry.body.replace(/[#*`\[\]]/g, "").trim().slice(0, 110) : "";
              return (
                <button
                  key={`${entry.notionPageId || entry.id}-${i}`}
                  className="chester-post-btn"
                  style={styles.chesterPostCard}
                  onClick={() => onOpenPost(entry)}
                >
                  <div style={styles.chesterCardMeta}>
                    <span style={{ ...styles.chesterCardLabel, color: meta.color }}>Share · {meta.label}</span>
                    <span style={styles.chesterCardArrowIcon}>→</span>
                  </div>
                  <div style={{ height: 3, background: meta.color, margin: "0 18px 0", borderRadius: 2 }} />
                  <div style={styles.chesterCardBody}>
                    <h3 style={styles.chesterPostTitle}>{entry.title}</h3>
                    {excerpt && <p style={styles.chesterPostExcerpt}>{excerpt}{entry.body?.length > 110 ? "…" : ""}</p>}
                    <span style={styles.chesterPostDate}>{entry.date}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ── HOBBIES page — photos gallery + music cards ──
  if (section.id === "hobbies") {
    const photoEntries = entries.filter(e => (SECTION_MAP[e.section] || e.section) === "photography");
    const musicEntries = entries.filter(e => (SECTION_MAP[e.section] || e.section) === "music");
    return (
      <div style={styles.chesterPage}>
        {/* Photos */}
        {photoEntries.length > 0 && (
          <div style={styles.chesterHobbiesSection}>
            <p style={styles.chesterSectionHeading}>📷 {lang === "zh" ? "照片" : "Photos"}</p>
            <div style={styles.chesterPhotoGrid}>
              {photoEntries.map((entry, i) => (
                <button key={i} style={styles.chesterPhotoCard} onClick={() => onOpenPost(entry)}>
                  <div style={{ ...styles.chesterCardMeta, paddingBottom: 8 }}>
                    <span style={styles.chesterCardLabel}>Hobbies · Photos</span>
                    <span style={styles.chesterCardArrowIcon}>→</span>
                  </div>
                  {entry.images && entry.images[0]
                    ? <img src={entry.images[0]} alt={entry.title} style={styles.chesterPhotoImg} />
                    : <div style={styles.chesterPhotoPlaceholder}>📷</div>
                  }
                  <div style={{ padding: "10px 14px 14px" }}>
                    <p style={{ ...styles.chesterPostTitle, fontSize: 15, margin: 0 }}>{entry.title}</p>
                    <span style={styles.chesterPostDate}>{entry.date}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Music */}
        {musicEntries.length > 0 && (
          <div style={styles.chesterHobbiesSection}>
            <p style={styles.chesterSectionHeading}>🎵 {lang === "zh" ? "音乐" : "Music"}</p>
            <div style={styles.chesterMusicGrid}>
              {musicEntries.map((entry, i) => (
                <button key={i} style={styles.chesterMusicCard} onClick={() => onOpenPost(entry)}>
                  <div style={styles.chesterCardMeta}>
                    <span style={styles.chesterCardLabel}>Hobbies · Music</span>
                    <span style={styles.chesterCardArrowIcon}>→</span>
                  </div>
                  <div style={styles.chesterMusicBody}>
                    <span style={styles.chesterMusicNote}>♪</span>
                    <div>
                      <p style={{ ...styles.chesterPostTitle, fontSize: 16, margin: "0 0 4px" }}>{entry.title}</p>
                      <span style={styles.chesterPostDate}>{entry.date}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {entries.length === 0 && (
          <div style={styles.emptyState}><p style={styles.emptyText}>{T.grid.empty}</p></div>
        )}
      </div>
    );
  }

  // Insights: combined law + tech posts (entries already filtered+deduped in App)
  if (section.id === "insights") {
    const label = lang === "zh" ? "洞见" : "Insights";
    const sub = lang === "zh" ? "法律 · 科技 · 分析" : "Law · Tech · Analysis";
    return (
      <div style={styles.gridContainer}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <div>
              <h2 style={{ ...styles.sectionTitle, ...(lang === "zh" ? styles.noItalic : {}) }}>{label}</h2>
              <p style={styles.sectionSubtitle}>{sub}</p>
            </div>
          </div>
        </div>
        {entries.length === 0 ? (
          <div style={styles.emptyState}><p style={styles.emptyText}>{T.grid.empty}</p></div>
        ) : (
          <div style={styles.grid}>
            {entries.map((entry, i) => (
              <EntryCard key={`${entry.notionPageId || entry.id}-${i}`} entry={entry} onEdit={onEdit} onDelete={onDelete} onOpenPost={onOpenPost} T={T} lang={lang} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Special handling for Tech section (sub-tabs: Insights | Tools | Observations | AI Lab)
  if (section.id === "tech") {
    return <TechView entries={entries} onNew={onNew} onEdit={onEdit} onDelete={onDelete} onOpenPost={onOpenPost} setActiveSection={setActiveSection} techTab={techTab} setTechTab={setTechTab} T={T} lang={lang} />;
  }

  // Special handling for Contact section
  if (section.id === "contact") {
    return (
      <div style={styles.gridContainer}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <span style={styles.sectionIcon}>{section.icon}</span>
            <h2 style={{ ...styles.sectionTitle, ...(lang === "zh" ? styles.noItalic : {}) }}>{sectionLabel}</h2>
          </div>
        </div>
        <div style={styles.contactContent}>
          <div style={styles.contactCard}>
            <p style={styles.contactIntro}>{T.contact.intro}</p>
            <div style={styles.contactIconsRow}>
              <a href="mailto:frikasong@gmail.com" style={styles.contactIconLink} title={`${T.contact.email}`}>
                <div style={styles.contactIconCircle}><span style={styles.contactIcon}>✉️</span></div>
                <span style={styles.contactIconLabel}>{T.contact.email}</span>
              </a>
              <a href="https://www.linkedin.com/in/fukun-y-7753a5176/" target="_blank" rel="noopener noreferrer" style={styles.contactIconLink} title={T.contact.linkedin}>
                <div style={styles.contactIconCircle}><span style={styles.contactIcon}>💼</span></div>
                <span style={styles.contactIconLabel}>{T.contact.linkedin}</span>
              </a>
              <a href="https://instagram.com/frika_song" target="_blank" rel="noopener noreferrer" style={styles.contactIconLink} title={T.contact.instagram}>
                <div style={styles.contactIconCircle}><span style={styles.contactIcon}>📷</span></div>
                <span style={styles.contactIconLabel}>{T.contact.instagram}</span>
              </a>
              <a href="https://github.com/Frikasong" target="_blank" rel="noopener noreferrer" style={styles.contactIconLink} title={T.contact.github}>
                <div style={styles.contactIconCircle}><span style={styles.contactIcon}>🐙</span></div>
                <span style={styles.contactIconLabel}>{T.contact.github}</span>
              </a>
              <a href="https://www.xiaohongshu.com/user/profile/5d8eece70000000001009e90" target="_blank" rel="noopener noreferrer" style={styles.contactIconLink} title={T.contact.rednote}>
                <div style={styles.contactIconCircle}><span style={styles.contactIcon}>📕</span></div>
                <span style={styles.contactIconLabel}>{T.contact.rednote}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular content sections
  return (
    <div style={styles.gridContainer}>
      {/* Section Header */}
      <div style={styles.sectionHeader}>
        <div style={styles.sectionTitleRow}>
          <span style={styles.sectionIcon}>{section.icon}</span>
          <div>
            <h2 style={{ ...styles.sectionTitle, ...(lang === "zh" ? styles.noItalic : {}) }}>{sectionLabel}</h2>
            {sectionSub && <p style={styles.sectionSubtitle}>{sectionSub}</p>}
          </div>
        </div>
      </div>

      {/* Entries Grid */}
      {entries.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>{section.icon}</div>
          <p style={styles.emptyText}>{T.grid.empty}</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {entries.map((entry, i) => (
            <EntryCard
              key={`${entry.notionPageId || entry.id}-${i}`}
              entry={entry}
              onEdit={onEdit}
              onDelete={onDelete}
              onOpenPost={onOpenPost}
              T={T}
              lang={lang}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ENTRY CARD
// ═══════════════════════════════════════════════════════════════════════════
function EntryCard({ entry, onEdit, onDelete, onOpenPost, T, lang }) {
  const cleanBody = (entry.summary || entry.body || "").replace(/§§\w+§§/g, "").replace(/\s+/g, " ").trim();
  const preview = cleanBody.length > 180 ? cleanBody.slice(0, 180).replace(/\s+\S*$/, "") + "…" : cleanBody;
  const formattedDate = entry.date
    ? new Date(entry.date + "T12:00:00").toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" })
    : "";

  return (
    <article style={styles.card}>
      {entry.images && entry.images.length > 0 && (
        <div style={styles.cardCover}>
          <img src={entry.images[0].data} alt={entry.title} style={styles.cardCoverImg} />
          <div style={styles.cardCoverOverlay} />
        </div>
      )}

      <div style={styles.cardContent}>
        <div style={styles.cardHeader}>
          <h3 style={{ ...styles.cardTitle, ...(lang === "zh" ? styles.noItalic : {}) }}>{entry.title}</h3>
          <div style={styles.cardMeta}>
            <span style={styles.cardDate}>{formattedDate}</span>
            {entry.author && entry.author.length > 0 && (
              <span style={styles.cardAuthor}>{T.grid.by} {entry.author.join(", ")}</span>
            )}
          </div>
        </div>

        <p style={styles.cardBody}>{preview}</p>

        {entry.tags && entry.tags.length > 0 && (
          <div style={styles.cardTags}>
            {entry.tags.map((tag) => (
              <span key={tag} style={styles.cardTag}>{tag}</span>
            ))}
          </div>
        )}

        {entry.body.length > 180 && (
          <button style={styles.toggleBtn} onClick={() => onOpenPost(entry)}>
            {T.common.readMore}
          </button>
        )}

        {entry.images && entry.images.length > 1 && (
          <div style={styles.cardGallery}>
            {entry.images.slice(1).map((img, i) => (
              <img key={i} src={img.data} alt={img.name} style={styles.galleryImg} />
            ))}
          </div>
        )}

        {entry.attachments && entry.attachments.length > 0 && (
          <div style={styles.attachmentBox}>
            {entry.attachments.map((att, i) => (
              <a key={i} href={att.data} download={att.name} style={styles.attachmentItem}>
                📎 {att.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function buildTranslateUrl(url, lang, region) {
  const targetLang = region === "cn" ? "en" : (lang === "zh" ? "zh-CN" : "en");
  return `https://translate.google.com/translate?sl=auto&tl=${encodeURIComponent(targetLang)}&u=${encodeURIComponent(url)}`;
}

function PostView({ entry, onBack, T, lang }) {
  const [translatedLines, setTranslatedLines] = useState(null);
  const [translatedTitle, setTranslatedTitle] = useState(null);
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    if (lang !== "zh" || !entry) { setTranslatedLines(null); setTranslatedTitle(null); return; }
    // Strip §§MARKER§§ tokens and collapse each line to plain text
    const lines = (entry.body || "")
      .split("\n")
      .map(l => l.replace(/\u00a7\u00a7\w+\u00a7\u00a7/g, "").replace(/^---$/, "").trim())
      .filter(Boolean);
    if (lines.length === 0) return;
    setTranslating(true);
    setTranslatedLines(null);
    // Batch lines into chunks ≤1500 chars, translate via Google unofficial API
    const chunks = [];
    let cur = "";
    for (const line of lines) {
      if (cur.length + line.length > 1500 && cur) { chunks.push(cur); cur = line; }
      else { cur = cur ? cur + "\n" + line : line; }
    }
    if (cur) chunks.push(cur);
    const translateChunk = chunk =>
      fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q=" + encodeURIComponent(chunk))
        .then(r => r.json())
        .then(data => data[0].map(item => item[0]).join(""))
        .catch(() => chunk);

    Promise.all([
      translateChunk(entry.title || ""),
      ...chunks.map(translateChunk)
    ]).then(([ttitle, ...parts]) => {
      setTranslatedTitle(ttitle);
      setTranslatedLines(parts.join("\n").split("\n").filter(Boolean));
      setTranslating(false);
    }).catch(() => setTranslating(false));
  }, [lang, entry && entry.id]);

  if (!entry) {
    return (
      <div style={styles.postWrap}>
        <button style={styles.postBackBtn} onClick={onBack}>{T.editor.back}</button>
      </div>
    );
  }

  const formattedDate = entry.date
    ? new Date(entry.date + "T12:00:00").toLocaleDateString(lang === "zh" ? "zh-CN" : "en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const galleryLabel = lang === "zh" ? "图片" : "Gallery";
  const attachmentsLabel = lang === "zh" ? "附件" : "Attachments";

  // Renders annotated rich text spans (bold, italic, code, links, etc.)
  const renderRichText = (spans, key) => {
    if (!spans || spans.length === 0) return null;
    return spans.map((s, i) => {
      let node = s.text;
      if (s.code) node = <code key={i} style={styles.postInlineCode}>{node}</code>;
      if (s.bold) node = <strong key={i}>{node}</strong>;
      if (s.italic) node = <em key={i}>{node}</em>;
      if (s.strike) node = <s key={i}>{node}</s>;
      if (s.underline) node = <u key={i}>{node}</u>;
      if (s.href) node = <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={styles.postLink}>{node}</a>;
      return <span key={i}>{node}</span>;
    });
  };

  // Renders structured Notion blocks (used when entry.blocks is available)
  const renderBlocks = (blocks) => {
    if (!blocks || blocks.length === 0) return null;
    const els = [];
    let i = 0;
    while (i < blocks.length) {
      const b = blocks[i];
      const rt = b.rich_text || [];
      switch (b.type) {
        case "paragraph":
          if (rt.length > 0)
            els.push(<p key={i} style={styles.postParagraph}>{renderRichText(rt)}</p>);
          break;
        case "heading_1":
          els.push(<h2 key={i} style={styles.postH1}>{renderRichText(rt)}</h2>);
          break;
        case "heading_2":
          els.push(<h3 key={i} style={styles.postH2}>{renderRichText(rt)}</h3>);
          break;
        case "heading_3":
          els.push(<h4 key={i} style={styles.postH3}>{renderRichText(rt)}</h4>);
          break;
        case "bulleted_list_item": {
          const items = [];
          while (i < blocks.length && blocks[i].type === "bulleted_list_item") {
            items.push(<li key={i} style={styles.postLi}>{renderRichText(blocks[i].rich_text)}</li>);
            i++;
          }
          els.push(<ul key={`ul-${i}`} style={styles.postUl}>{items}</ul>);
          continue;
        }
        case "numbered_list_item": {
          const items = [];
          while (i < blocks.length && blocks[i].type === "numbered_list_item") {
            items.push(<li key={i} style={styles.postLi}>{renderRichText(blocks[i].rich_text)}</li>);
            i++;
          }
          els.push(<ol key={`ol-${i}`} style={styles.postOl}>{items}</ol>);
          continue;
        }
        case "quote":
          els.push(<blockquote key={i} style={styles.postQuote}>{renderRichText(rt)}</blockquote>);
          break;
        case "divider":
          els.push(<hr key={i} style={styles.postHr} />);
          break;
        case "callout":
          els.push(
            <div key={i} style={styles.postCallout}>
              {b.icon && <span style={{marginRight: 8}}>{b.icon}</span>}
              {renderRichText(rt)}
            </div>
          );
          break;
        case "code":
          els.push(<pre key={i} style={styles.postCodeBlock}><code>{rt.map(r => r.text).join("")}</code></pre>);
          break;
        case "image":
          if (b.url) els.push(<figure key={i} style={styles.postFigure}><img src={b.url} alt="" style={{maxWidth:"100%"}} /></figure>);
          break;
        case "to_do":
          els.push(<p key={i} style={styles.postParagraph}><input type="checkbox" readOnly checked={!!b.checked} style={{marginRight:6}} />{renderRichText(rt)}</p>);
          break;
        default:
          if (rt.length > 0)
            els.push(<p key={i} style={styles.postParagraph}>{renderRichText(rt)}</p>);
      }
      i++;
    }
    return els.length > 0 ? els : null;
  };

  const renderBody = (text) => {
    if (!text) return null;
    const lines = text.split("\n");
    const els = [];
    let i = 0;

    const isMarker = (s, tag) => s === "\u00a7\u00a7" + tag + "\u00a7\u00a7" || s.startsWith("\u00a7\u00a7" + tag + "\u00a7\u00a7");
    const afterMarker = (s, tag) => s.slice(("\u00a7\u00a7" + tag + "\u00a7\u00a7").length).trim();
    const isListLine = (s) =>
      isMarker(s, "BULLET") || isMarker(s, "NUMBER") ||
      s.startsWith("- ") || s.startsWith("* ") || /^\d+\. /.test(s);

    while (i < lines.length) {
      const trimmed = lines[i].trim();
      if (!trimmed) { i++; continue; }

      // divider
      if (trimmed === "\u00a7\u00a7DIVIDER\u00a7\u00a7" || trimmed === "---") {
        els.push(<hr key={i} style={styles.postHr} />); i++; continue;
      }

      // headings
      if (isMarker(trimmed, "H1") || trimmed.startsWith("# ")) {
        const t = isMarker(trimmed, "H1") ? afterMarker(trimmed, "H1") : trimmed.slice(2);
        els.push(<h2 key={i} style={styles.postH1}>{t}</h2>); i++; continue;
      }
      if (isMarker(trimmed, "H2") || trimmed.startsWith("## ")) {
        const t = isMarker(trimmed, "H2") ? afterMarker(trimmed, "H2") : trimmed.slice(3);
        els.push(<h3 key={i} style={styles.postH2}>{t}</h3>); i++; continue;
      }
      if (isMarker(trimmed, "H3") || trimmed.startsWith("### ")) {
        const t = isMarker(trimmed, "H3") ? afterMarker(trimmed, "H3") : trimmed.slice(4);
        els.push(<h4 key={i} style={styles.postH3}>{t}</h4>); i++; continue;
      }

      // quote
      if (isMarker(trimmed, "QUOTE") || trimmed.startsWith("> ")) {
        const t = isMarker(trimmed, "QUOTE") ? afterMarker(trimmed, "QUOTE") : trimmed.slice(2);
        els.push(<blockquote key={i} style={styles.postQuote}>{t}</blockquote>); i++; continue;
      }

      // bullet list — group consecutive items (may be separated by blank lines)
      if (isMarker(trimmed, "BULLET") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const bullets = [];
        while (i < lines.length) {
          const t2 = lines[i].trim();
          if (isMarker(t2, "BULLET")) { bullets.push(afterMarker(t2, "BULLET")); i++; }
          else if (t2.startsWith("- ") || t2.startsWith("* ")) { bullets.push(t2.slice(2)); i++; }
          else if (!t2 && i + 1 < lines.length && isListLine(lines[i + 1].trim())) { i++; } // skip blank between list items
          else break;
        }
        els.push(<ul key={i} style={styles.postUl}>{bullets.map((b, j) => <li key={j} style={styles.postLi}>{b}</li>)}</ul>);
        continue;
      }

      // numbered list
      if (isMarker(trimmed, "NUMBER") || /^\d+\. /.test(trimmed)) {
        const nums = [];
        while (i < lines.length) {
          const t2 = lines[i].trim();
          if (isMarker(t2, "NUMBER")) { nums.push(afterMarker(t2, "NUMBER")); i++; }
          else if (/^\d+\. /.test(t2)) { nums.push(t2.replace(/^\d+\. /, "")); i++; }
          else if (!t2 && i + 1 < lines.length && isListLine(lines[i + 1].trim())) { i++; }
          else break;
        }
        els.push(<ol key={i} style={styles.postOl}>{nums.map((n, j) => <li key={j} style={styles.postLi}>{n}</li>)}</ol>);
        continue;
      }

      // paragraph
      const paragraphs = [];
      while (i < lines.length) {
        const t2 = lines[i].trim();
        if (!t2) break;
        if (t2 === "---" || t2 === "\u00a7\u00a7DIVIDER\u00a7\u00a7") break;
        if (/^\u00a7\u00a7(H1|H2|H3|QUOTE|BULLET|NUMBER)\u00a7\u00a7/.test(t2)) break;
        if (t2.startsWith("# ") || t2.startsWith("## ") || t2.startsWith("### ") || t2.startsWith("> ")) break;
        if (isListLine(t2)) break;
        paragraphs.push(lines[i]); i++;
      }
      if (paragraphs.length > 0) {
        els.push(<p key={i} style={styles.postParagraph}>{paragraphs.join(" ")}</p>);
      }
    }

    return els.length > 0 ? els : null;
  };

  return (
    <article style={styles.postWrap}>
      <button style={styles.postBackBtn} onClick={onBack}>{T.editor.back}</button>

      {entry.images && entry.images.length > 0 && (
        <div style={styles.postHero}>
          <img src={entry.images[0].data} alt={entry.title} style={styles.postHeroImg} />
        </div>
      )}

      <header style={styles.postHeader}>
        <h1 style={{ ...styles.postTitle, ...(lang === "zh" ? styles.noItalic : {}) }}>{lang === "zh" && translatedTitle ? translatedTitle : entry.title}</h1>
        {formattedDate && <p style={styles.postDate}>{formattedDate}</p>}
        {entry.author && entry.author.length > 0 && (
          <p style={styles.postAuthor}>{T.grid.by} {entry.author.join(", ")}</p>
        )}
      </header>

      {entry.tags && entry.tags.length > 0 && (
        <div style={styles.postTags}>
          {entry.tags.map((tag) => (
            <span key={tag} style={styles.postTag}>{tag}</span>
          ))}
        </div>
      )}

      <div style={styles.postBody}>
        {lang === "zh" && translating && (
          <p style={{color:"#888",fontStyle:"normal",fontSize:16}}>翻译中…</p>
        )}
        {lang === "zh" && translatedLines
          ? translatedLines.map((line, i) => <p key={i} style={styles.postParagraph}>{line}</p>)
          : (!translating && (entry.blocks ? renderBlocks(entry.blocks) : renderBody(entry.body)))
        }
      </div>

      {entry.images && entry.images.length > 1 && (
        <section style={styles.postSection}>
          <h3 style={styles.postSectionTitle}>{galleryLabel}</h3>
          <div style={styles.postGallery}>
            {entry.images.slice(1).map((img, i) => (
              <img key={i} src={img.data} alt={img.name} style={styles.postGalleryImg} />
            ))}
          </div>
        </section>
      )}

      {entry.attachments && entry.attachments.length > 0 && (
        <section style={styles.postSection}>
          <h3 style={styles.postSectionTitle}>{attachmentsLabel}</h3>
          <div style={styles.postAttachmentList}>
            {entry.attachments.map((att, i) => (
              <a key={i} href={att.data} download={att.name} style={styles.postAttachmentItem}>
                📎 {att.name}
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function NewsRadarPanel({ title, subtitle, items, region, loading, error, T, lang }) {
  const shown = (items || []).slice(0, 12);

  return (
    <section style={styles.newsPanel}>
      <div style={styles.newsPanelHeader}>
        <h3 style={styles.newsPanelTitle}>{title}</h3>
        <p style={styles.newsPanelSub}>{subtitle}</p>
      </div>

      {loading && <p style={styles.newsState}>{T.news.loading}</p>}
      {!loading && error && <p style={styles.newsState}>{T.news.error}</p>}
      {!loading && !error && shown.length === 0 && <p style={styles.newsState}>{T.news.empty}</p>}

      {!loading && !error && shown.length > 0 && (
        <div style={styles.newsList}>
          {shown.map((item) => {
            const date = item.publishedAt
              ? new Date(item.publishedAt).toLocaleDateString(lang === "zh" ? "zh-CN" : "en-CA", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "";

            const categoryLabel = T.news.categories[item.category] || item.category;

            return (
              <article key={item.id || item.url} style={styles.newsItem}>
                <div style={styles.newsMetaRow}>
                  <span style={styles.newsSource}>{item.source}</span>
                  {date && <span style={styles.newsDate}>{date}</span>}
                </div>
                <a href={item.url} target="_blank" rel="noopener noreferrer" style={styles.newsTitleLink}>
                  {item.title}
                </a>
                {item.summary && <p style={styles.newsSummary}>{item.summary}</p>}
                <div style={styles.newsFooterRow}>
                  <span style={styles.newsCategory}>{categoryLabel}</span>
                  <div style={styles.newsLinks}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" style={styles.newsLinkBtn}>{T.news.read}</a>
                    <a href={buildTranslateUrl(item.url, lang, region)} target="_blank" rel="noopener noreferrer" style={styles.newsLinkBtn}>{T.news.translate}</a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TECH VIEW (2 sub-tabs: Legal Tech Lab | Observations & Insights)
// ═══════════════════════════════════════════════════════════════════════════
function TechView({ entries, onNew, onEdit, onDelete, onOpenPost, setActiveSection, T, lang, techTab, setTechTab }) {
  const activeTab = techTab || "lab";
  const setActiveTab = setTechTab || (() => {});
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState("");
  const [newsPanels, setNewsPanels] = useState({ na: [], cn: [] });
  const [newsHighlights, setNewsHighlights] = useState({ na: [], cn: [] });

  const insightEntries = entries.filter((e) => ["legal-tech", "legal-ai", "tech"].includes(e.section));
  const obsEntries = entries.filter((e) => e.section === "tech-obs");

  useEffect(() => {
    let canceled = false;

    async function loadNewsFeed() {
      setNewsLoading(true);
      setNewsError("");
      try {
        const res = await fetch(`news-feed.json?t=${Date.now()}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (canceled) return;
        setNewsPanels(data.panels || { na: [], cn: [] });
        setNewsHighlights(data.highlights || { na: [], cn: [] });
      } catch (err) {
        if (canceled) return;
        setNewsError(String(err));
      } finally {
        if (!canceled) setNewsLoading(false);
      }
    }

    loadNewsFeed();
    return () => {
      canceled = true;
    };
  }, []);

  return (
    <div>
      {/* Sub-navigation: 2 tabs */}
      <div style={styles.techSubNav}>
        {[
          { id: "lab", label: T.tech.tab1, icon: "⚖️" },
          { id: "insights", label: T.tech.tab2, icon: "💡" },
        ].map((tab) => (
          <button
            key={tab.id}
            style={{ ...styles.techSubTab, ...(activeTab === tab.id ? styles.techSubTabActive : {}) }}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab 1: Legal Tech Lab (Tools only) ── */}
      {activeTab === "lab" && (
        <div style={styles.gridContainer}>
          {/* Tools Section */}
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitleRow}>
              <span style={styles.sectionIcon}>🔧</span>
              <div>
                <h2 style={{ ...styles.sectionTitle, ...(lang === "zh" ? styles.noItalic : {}) }}>{T.tech.toolsBuiltLabel}</h2>
              </div>
            </div>
          </div>
          <div style={styles.toolCard}>
            <div style={styles.toolCardHeader}>
              <div>
                <h3 style={styles.toolCardName}>Housekeeper</h3>
                <span style={styles.toolCardTagline}>{T.tech.housekeeper.tagline}</span>
              </div>
              <span style={styles.toolCardBadge}>{T.tech.housekeeper.status}</span>
            </div>
            <p style={styles.toolCardDesc}>{T.tech.housekeeper.desc}</p>
            <a href="https://housekeeper-2kp7.onrender.com/" target="_blank" rel="noopener noreferrer" style={styles.toolCardBtn}>
              {T.tech.housekeeper.btn}
            </a>
          </div>

          <div style={{ ...styles.toolCard, marginTop: 14 }}>
            <div style={styles.toolCardHeader}>
              <div>
                <h3 style={styles.toolCardName}>{T.tech.radarTool.name}</h3>
                <span style={styles.toolCardTagline}>{T.tech.radarTool.tagline}</span>
              </div>
              <span style={styles.toolCardBadge}>{T.tech.radarTool.status}</span>
            </div>
            <p style={styles.toolCardDesc}>{T.tech.radarTool.desc}</p>
            <a href="news-radar.html" target="_blank" rel="noopener noreferrer" style={styles.toolCardBtn}>
              {T.tech.radarTool.btn}
            </a>
          </div>
        </div>
      )}

      {/* ── Tab 2: Observations & Insights ── */}
      {activeTab === "insights" && (
        <div style={styles.gridContainer}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitleRow}>
              <span style={styles.sectionIcon}>💡</span>
              <div>
                <h2 style={{ ...styles.sectionTitle, ...(lang === "zh" ? styles.noItalic : {}) }}>{T.tech.tab2}</h2>
                <p style={styles.sectionSubtitle}>{T.tech.insightsSub}</p>
              </div>
            </div>
          </div>


          <div style={{ ...styles.sectionHeader, marginTop: 24 }}>
            <div style={styles.sectionTitleRow}>
              <span style={styles.sectionIcon}>📰</span>
              <div>
                <h2 style={{ ...styles.sectionTitle, ...(lang === "zh" ? styles.noItalic : {}) }}>{T.tech.insightsTitle}</h2>
                <p style={styles.sectionSubtitle}>{T.tech.insightsSub}</p>
              </div>
            </div>
          </div>
          {insightEntries.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>{T.tech.empty}</p>
            </div>
          ) : (
            <div style={styles.grid}>
              {insightEntries.map((entry, i) => (
                <EntryCard key={`${entry.notionPageId || entry.id}-${i}`} entry={entry}
                  onEdit={onEdit} onDelete={onDelete} onOpenPost={onOpenPost} T={T} lang={lang} />
              ))}
            </div>
          )}

          <div style={{ ...styles.sectionHeader, marginTop: 24 }}>
            <div style={styles.sectionTitleRow}>
              <span style={styles.sectionIcon}>🧭</span>
              <div>
                <h2 style={{ ...styles.sectionTitle, ...(lang === "zh" ? styles.noItalic : {}) }}>{T.tech.obsTitle}</h2>
                <p style={styles.sectionSubtitle}>{T.tech.obsSub}</p>
              </div>
            </div>
          </div>
          {obsEntries.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>{T.tech.empty}</p>
            </div>
          ) : (
            <div style={styles.grid}>
              {obsEntries.map((entry, i) => (
                <EntryCard key={`${entry.notionPageId || entry.id}-${i}`} entry={entry}
                  onEdit={onEdit} onDelete={onDelete} onOpenPost={onOpenPost} T={T} lang={lang} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EDITOR VIEW
// ═══════════════════════════════════════════════════════════════════════════
function EditorView({
  form,
  setForm,
  onSave,
  onCancel,
  onFileInput,
  fileInputRef,
  imageInputRef,
  attachmentInputRef,
  onImageUpload,
  onAttachmentUpload,
  removeImage,
  removeAttachment,
  fileStatus,
  uploading,
  isEditing,
  T,
}) {
  const wordCount = form.body.trim() ? form.body.trim().split(/\s+/).length : 0;

  return (
    <div style={styles.editorWrap}>
      <div style={styles.editorHeader}>
        <h2 style={styles.editorTitle}>{isEditing ? T.editor.edit : T.editor.new}</h2>
        <button style={styles.cancelBtn} onClick={onCancel}>{T.editor.back}</button>
      </div>

      <div style={styles.editorForm}>
        {/* Title */}
        <label style={styles.label}>
          {T.editor.titleLabel}
          <input
            style={styles.input}
            type="text"
            placeholder={T.editor.titlePh}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </label>

        {/* Date */}
        <label style={styles.label}>
          {T.editor.dateLabel}
          <input
            style={styles.input}
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </label>

        {/* Import Text */}
        <div style={styles.importBox}>
          <input ref={fileInputRef} type="file" accept=".pdf,.docx" onChange={onFileInput} style={{ display: "none" }} />
          <button style={styles.importBtn} onClick={() => fileInputRef.current?.click()}>
            {uploading ? T.editor.importing : T.editor.importBtn}
          </button>
          {fileStatus && <span style={styles.importStatus}>{fileStatus}</span>}
        </div>

        {/* Body */}
        <label style={styles.label}>
          {T.editor.contentLabel}
          <textarea
            style={styles.textarea}
            placeholder={T.editor.contentPh}
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
          <span style={styles.wordCount}>{wordCount} {T.editor.words}</span>
        </label>

        {/* Images */}
        <div style={styles.mediaSection}>
          <input ref={imageInputRef} type="file" accept="image/*" multiple onChange={onImageUpload} style={{ display: "none" }} />
          <button style={styles.mediaBtn} onClick={() => imageInputRef.current?.click()}>
            {T.editor.addImages}
          </button>
          {form.images.length > 0 && (
            <div style={styles.previewGrid}>
              {form.images.map((img, i) => (
                <div key={i} style={styles.previewItem}>
                  <img src={img.data} alt={img.name} style={styles.previewImg} />
                  <button style={styles.removeBtn} onClick={() => removeImage(i)}>×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Attachments */}
        <div style={styles.mediaSection}>
          <input ref={attachmentInputRef} type="file" multiple onChange={onAttachmentUpload} style={{ display: "none" }} />
          <button style={styles.mediaBtn} onClick={() => attachmentInputRef.current?.click()}>
            {T.editor.addFiles}
          </button>
          {form.attachments.length > 0 && (
            <div style={styles.attachmentPreview}>
              {form.attachments.map((att, i) => (
                <div key={i} style={styles.attachmentPreviewItem}>
                  <span>📎 {att.name}</span>
                  <button style={styles.removeAttachmentBtn} onClick={() => removeAttachment(i)}>×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save */}
        <div style={styles.editorFooter}>
          <button style={styles.saveBtn} onClick={onSave} disabled={!form.body.trim() || !form.title.trim()}>
            {isEditing ? T.editor.update : T.editor.publish}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════════════════════
// Start of styles
const styles = {
  root: {
    fontFamily: "'Public Sans', sans-serif",
    minHeight: "100vh",
    background: "#faf7f3",
    color: "#1c1c1c",
    position: "relative",
  },
  bgPattern: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `
      radial-gradient(circle at 18% 20%, rgba(255,248,244,0.8) 0%, transparent 52%),
      radial-gradient(circle at 84% 78%, rgba(201,131,106,0.05) 0%, transparent 50%)
    `,
    pointerEvents: "none",
    zIndex: 0,
  },
  // Header — chester.how-inspired pill nav
  header: {
    background: "rgba(250,247,243,0.95)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    borderBottom: "1px solid rgba(0,0,0,0.07)",
  },
  headerContent: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLogoArea: { display: "none" },
  headerLogoWrap: { display: "none" },
  headerLang: { display: "none" },
  mobileControls: { display: "none" },
  siteLogo: { display: "none" },
  tagline: { display: "none" },
  taglineBtn: { display: "none" },
  taglineDot: { display: "none" },
  // Pill nav
  pillNav: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.88)",
    border: "1px solid rgba(0,0,0,0.09)",
    borderRadius: 50,
    padding: "5px 8px 5px 18px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
    gap: 0,
  },
  pillNavBrand: {
    fontFamily: "'Newsreader', serif",
    fontSize: 17,
    fontWeight: 600,
    color: "#2B5054",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    letterSpacing: "-0.2px",
  },
  pillNavDivider: {
    color: "rgba(0,0,0,0.18)",
    fontSize: 13,
    margin: "0 10px",
    userSelect: "none",
  },
  pillNavLink: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 14,
    fontWeight: 500,
    color: "#666",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "5px 12px",
    borderRadius: 30,
    transition: "background 0.15s, color 0.15s",
    position: "relative",
  },
  pillNavLinkActive: {
    color: "#fff",
    background: "#2B5054",
    fontWeight: 600,
  },
  pillNavDropdown: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 12px 40px rgba(0,0,0,0.11), 0 4px 10px rgba(0,0,0,0.06)",
    border: "1px solid rgba(0,0,0,0.07)",
    padding: "8px 0",
    minWidth: 190,
    zIndex: 200,
  },
  pillNavDropItem: {
    display: "block",
    width: "100%",
    background: "none",
    border: "none",
    padding: "10px 20px",
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 14,
    color: "#333",
    textAlign: "left",
    cursor: "pointer",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  headerRightLink: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 13,
    color: "#888",
    textDecoration: "none",
    letterSpacing: "0.1px",
    transition: "color 0.15s",
  },
  langToggleNew: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 13,
    color: "#888",
    background: "none",
    border: "1px solid rgba(0,0,0,0.14)",
    borderRadius: 20,
    padding: "4px 12px",
    cursor: "pointer",
  },
  // navBar hidden — nav integrated into header pill
  navBar: { display: "none" },
  navBarInner: { display: "none" },
  navItem: { display: "none" },
  navItemActive: {},
  navDropdownWrap: {
    position: "relative",
  },
  navDropdown: {
    position: "absolute",
    top: "calc(100% + 2px)",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 24px 64px rgba(26,28,28,0.22), 0 8px 24px rgba(26,28,28,0.1)",
    border: "1px solid rgba(43,80,84,0.1)",
    padding: "10px 0",
    minWidth: 240,
    zIndex: 200,
  },
  navDropdownItem: {
    background: "transparent",
    border: "none",
    color: "#2f3335",
    padding: "12px 22px",
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 14,
    fontFamily: "'Newsreader', serif",
    fontSize: 15,
    fontWeight: 400,
    fontStyle: "italic",
    transition: "all 0.15s",
  },
  navDropdownItemActive: {
    color: "#2B5054",
    background: "rgba(43,80,84,0.06)",
  },
  navDropdownItemText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  navDropdownItemSub: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 10,
    color: "#7B8F92",
    letterSpacing: "0.4px",
    fontStyle: "normal",
    fontWeight: 500,
  },
  headerControls: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  langToggle: {
    background: "transparent",
    border: "1px solid rgba(192, 200, 201, 0.22)",
    color: "rgba(255,255,255,0.82)",
    fontSize: 11,
    padding: "7px 16px",
    borderRadius: 20,
    cursor: "pointer",
    fontFamily: "'Newsreader', serif",
    fontWeight: 400,
    fontStyle: "italic",
    letterSpacing: "0.5px",
    transition: "all 0.2s",
  },
  langToggleNormal: {
    fontStyle: "normal",
    fontWeight: 500,
  },
  menuToggle: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(192, 200, 201, 0.22)",
    color: "rgba(255,255,255,0.85)",
    fontSize: 15,
    padding: "8px 16px",
    borderRadius: 8,
    cursor: "pointer",
    fontFamily: "'Newsreader', serif",
    fontStyle: "italic",
    transition: "all 0.2s",
  },
  // Mobile side panel
  navBackdrop: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.3)",
    zIndex: 200,
    backdropFilter: "blur(2px)",
  },
  mobileSidePanel: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "85vw",
    height: "100vh",
    background: "rgba(43, 80, 84, 0.95)",
    backdropFilter: "blur(20px)",
    zIndex: 201,
    overflowY: "auto",
    transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
    display: "flex",
    flexDirection: "column",
  },
  mobilePanelClose: {
    background: "transparent",
    border: "none",
    fontSize: 20,
    color: "rgba(255,255,255,0.6)",
    cursor: "pointer",
    alignSelf: "flex-end",
    padding: "16px 20px 8px",
    lineHeight: 1,
  },
  mobilePanelContent: {
    padding: "0 16px 40px",
    display: "flex",
    flexDirection: "column",
    gap: 24,
    flex: 1,
  },
  mobilePanelGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  mobilePanelGroupHeader: {
    fontFamily: "'Newsreader', serif",
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    fontWeight: 400,
    fontStyle: "italic",
    marginBottom: 8,
    paddingBottom: 6,
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  mobilePanelItem: {
    background: "transparent",
    border: "none",
    color: "rgba(245,247,247,0.82)",
    padding: "12px 14px",
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontFamily: "'Newsreader', serif",
    fontSize: 16,
    fontWeight: 400,
    fontStyle: "italic",
    borderRadius: 8,
    transition: "all 0.15s",
    width: "100%",
  },
  mobilePanelItemActive: {
    color: "#ffffff",
    background: "rgba(255,255,255,0.12)",
  },
  mobilePanelItemText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  mobilePanelItemSub: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 10,
    color: "rgba(255,255,255,0.55)",
    letterSpacing: "0.3px",
    fontStyle: "normal",
  },
  mobilePanelLang: {
    marginTop: "auto",
    paddingTop: 16,
    borderTop: "1px solid rgba(255,255,255,0.1)",
  },
  mobilePanelLangBtn: {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(192,200,201,0.25)",
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    padding: "10px 16px",
    borderRadius: 20,
    cursor: "pointer",
    fontFamily: "'Newsreader', serif",
    fontStyle: "italic",
    width: "100%",
  },
  techSubNav: {
    display: "flex",
    gap: 8,
    marginBottom: 32,
  },
  techSubTab: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "7px 18px",
    border: "1px solid rgba(43,80,84,0.18)",
    borderRadius: 30,
    background: "rgba(250,247,243,0.9)",
    color: "#2B5054",
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  techSubTabActive: {
    background: "#2B5054",
    borderColor: "#2B5054",
    color: "#fff",
  },
  newsBlock: {
    marginBottom: 34,
  },
  newsBlockHeader: {
    marginBottom: 14,
  },
  newsBlockTitle: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 16,
    color: "#2B5054",
    margin: 0,
    fontWeight: 600,
  },
  newsBlockSub: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 12,
    color: "#5A8A8E",
    margin: "6px 0 0 0",
  },
  newsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 16,
  },
  newsPanel: {
    border: "none",
    borderRadius: 4,
    background: "#f3f3f3",
    padding: 14,
  },
  newsPanelHeader: {
    marginBottom: 10,
  },
  newsPanelTitle: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 14,
    color: "#2B5054",
    margin: 0,
    fontWeight: 600,
  },
  newsPanelSub: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 11,
    color: "#5A8A8E",
    margin: "4px 0 0 0",
  },
  newsState: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 12,
    color: "#5A8A8E",
    margin: "8px 0",
  },
  newsList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  newsItem: {
    border: "none",
    borderRadius: 4,
    padding: 10,
    background: "#ffffff",
  },
  newsMetaRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    gap: 10,
  },
  newsSource: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 11,
    color: "#2B5054",
    fontWeight: 600,
  },
  newsDate: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 10,
    color: "#7B8F92",
  },
  newsTitleLink: {
    fontFamily: "'Newsreader', serif",
    fontSize: 15,
    color: "#2F3F42",
    textDecoration: "none",
    lineHeight: 1.5,
    display: "block",
  },
  newsSummary: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 12,
    color: "#4B5E61",
    lineHeight: 1.6,
    margin: "7px 0 8px",
  },
  newsFooterRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  newsCategory: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 10,
    color: "#2B5054",
    background: "rgba(43, 80, 84, 0.12)",
    border: "none",
    borderRadius: 999,
    padding: "2px 8px",
    whiteSpace: "nowrap",
  },
  newsLinks: {
    display: "flex",
    gap: 6,
    alignItems: "center",
  },
  newsLinkBtn: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 11,
    color: "#2B5054",
    textDecoration: "none",
    border: "1px solid rgba(192, 200, 201, 0.2)",
    borderRadius: 6,
    padding: "3px 8px",
    background: "#fff",
  },
  // Main
  main: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "56px 24px 68px",
    position: "relative",
    zIndex: 1,
  },
  // Grid View
  gridContainer: {},
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
    paddingBottom: 0,
    borderBottom: "none",
  },
  sectionTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  sectionIcon: {
    fontSize: 28,
    opacity: 0.8,
  },
  sectionTitle: {
    fontFamily: "'DM Serif Display', 'Newsreader', serif",
    fontSize: "clamp(28px, 4vw, 46px)",
    fontWeight: 400,
    fontStyle: "italic",
    margin: 0,
    color: "#2B5054",
    letterSpacing: "-0.3px",
    lineHeight: 1.1,
  },
  noItalic: {
    fontStyle: "normal",
  },
  sectionSubtitle: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 11,
    color: "#35666a",
    margin: "4px 0 0 0",
    letterSpacing: "1.5px",
    fontWeight: 500,
  },
  newEntryBtn: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 12,
    background: "linear-gradient(135deg, #5A8A8E 0%, #2B5054 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "10px 20px",
    cursor: "pointer",
    fontWeight: 600,
    letterSpacing: "0.3px",
    boxShadow: "0 2px 8px rgba(26, 28, 28, 0.2)",
    transition: "all 0.2s",
  },
  // Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 20,
  },
  // Card
  card: {
    background: "#ffffff",
    border: "none",
    borderRadius: 4,
    overflow: "hidden",
    transition: "all 0.2s",
    boxShadow: "0 40px 40px -10px rgba(26, 28, 28, 0.04)",
  },
  cardCover: {
    position: "relative",
    width: "100%",
    height: 200,
    overflow: "hidden",
  },
  cardCoverImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  cardCoverOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "40%",
    background: "linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 100%)",
  },
  cardContent: {
    padding: 24,
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: "'Newsreader', serif",
    fontSize: "clamp(20px, 2.8vw, 28px)",
    fontWeight: 500,
    fontStyle: "italic",
    margin: "0 0 6px 0",
    color: "#13181a",
    lineHeight: 1.05,
  },
  cardDate: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 11,
    color: "#7FA3A7",
    letterSpacing: "0.5px",
    fontWeight: 500,
  },
  cardMeta: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
  },
  cardAuthor: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 11,
    color: "#5A8A8E",
    fontWeight: 600,
    letterSpacing: "0.3px",
  },
  cardTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 10,
  },
  cardTag: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 10,
    color: "#2B5054",
    background: "rgba(43, 80, 84, 0.1)",
    border: "none",
    borderRadius: 999,
    padding: "2px 8px",
    fontWeight: 600,
    letterSpacing: "0.3px",
  },
  cardBody: {
    fontSize: 13,
    lineHeight: 1.6,
    color: "#555",
    margin: "0 0 12px 0",
    whiteSpace: "pre-wrap",
  },
  toggleBtn: {
    background: "transparent",
    border: "none",
    color: "#2B5054",
    fontSize: 12,
    cursor: "pointer",
    padding: 0,
    fontFamily: "'Public Sans', sans-serif",
    fontWeight: 500,
  },
  postWrap: {
    maxWidth: 920,
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: 6,
    padding: "22px 24px 34px",
    boxShadow: "0 40px 40px -10px rgba(26, 28, 28, 0.04)",
  },
  postBackBtn: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 12,
    background: "transparent",
    color: "#2B5054",
    border: "1px solid rgba(53, 102, 106, 0.3)",
    borderRadius: 20,
    padding: "8px 14px",
    cursor: "pointer",
    marginBottom: 14,
  },
  postHero: {
    width: "100%",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 18,
  },
  postHeroImg: {
    width: "100%",
    maxHeight: 420,
    objectFit: "cover",
    display: "block",
  },
  postHeader: {
    marginBottom: 16,
  },
  postTitle: {
    fontFamily: "'Newsreader', serif",
    fontSize: "clamp(20px, 2.5vw, 26px)",
    fontWeight: 500,
    fontStyle: "italic",
    margin: "0 0 8px 0",
    color: "#13181a",
    lineHeight: 1.1,
  },
  postDate: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 12,
    color: "#7FA3A7",
    margin: 0,
  },
  postAuthor: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 12,
    color: "#5A8A8E",
    margin: "4px 0 0 0",
    fontWeight: 600,
  },
  postTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 16,
  },
  postTag: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 11,
    color: "#2B5054",
    background: "rgba(43, 80, 84, 0.1)",
    border: "none",
    borderRadius: 999,
    padding: "3px 10px",
    fontWeight: 600,
    letterSpacing: "0.3px",
  },
  postBody: {
    fontFamily: "'Newsreader', serif",
    fontSize: 20,
    lineHeight: 1.9,
    color: "#2f3335",
  },
  postParagraph: {
    fontFamily: "'Newsreader', serif",
    fontSize: 20,
    lineHeight: 1.9,
    color: "#2f3335",
    margin: "0 0 18px 0",
    whiteSpace: "pre-wrap",
  },
  postH1: {
    fontFamily: "'Newsreader', serif",
    fontSize: "clamp(24px, 3vw, 32px)",
    fontWeight: 500,
    fontStyle: "italic",
    color: "#13181a",
    margin: "32px 0 12px 0",
    lineHeight: 1.15,
    letterSpacing: "-0.3px",
  },
  postH2: {
    fontFamily: "'Newsreader', serif",
    fontSize: "clamp(20px, 2.5vw, 26px)",
    fontWeight: 500,
    fontStyle: "italic",
    color: "#13181a",
    margin: "24px 0 10px 0",
    lineHeight: 1.2,
  },
  postH3: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 15,
    fontWeight: 700,
    color: "#2B5054",
    margin: "20px 0 8px 0",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
  },
  postQuote: {
    fontFamily: "'Newsreader', serif",
    fontSize: 21,
    fontStyle: "italic",
    color: "#35666a",
    borderLeft: "3px solid #2B5054",
    paddingLeft: 20,
    margin: "20px 0",
    lineHeight: 1.75,
  },
  postHr: {
    border: "none",
    borderTop: "1px solid rgba(43,80,84,0.15)",
    margin: "28px 0",
  },
  postUl: {
    margin: "0 0 18px 0",
    paddingLeft: 28,
  },
  postOl: {
    margin: "0 0 18px 0",
    paddingLeft: 28,
  },
  postLi: {
    fontFamily: "'Newsreader', serif",
    fontSize: 20,
    lineHeight: 1.9,
    color: "#2f3335",
    marginBottom: 6,
  },
  postInlineCode: {
    fontFamily: "monospace",
    fontSize: "0.88em",
    background: "rgba(43,80,84,0.08)",
    borderRadius: 3,
    padding: "1px 5px",
    color: "#2B5054",
  },
  postLink: {
    color: "#2B5054",
    textDecoration: "underline",
    textUnderlineOffset: 3,
  },
  postCallout: {
    background: "rgba(43,80,84,0.06)",
    borderLeft: "3px solid #2B5054",
    borderRadius: 4,
    padding: "12px 16px",
    margin: "16px 0",
    fontFamily: "'Newsreader', serif",
    fontSize: 19,
    lineHeight: 1.75,
    color: "#2f3335",
  },
  postCodeBlock: {
    background: "#1e2426",
    color: "#e8edee",
    fontFamily: "monospace",
    fontSize: 14,
    lineHeight: 1.6,
    borderRadius: 6,
    padding: "16px 20px",
    margin: "16px 0",
    overflowX: "auto",
    whiteSpace: "pre",
  },
  postFigure: {
    margin: "20px 0",
    textAlign: "center",
  },
  postSection: {
    marginTop: 24,
  },
  postSectionTitle: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 11,
    color: "#35666a",
    margin: "0 0 10px 0",
    letterSpacing: "1.8px",
    textTransform: "uppercase",
    fontWeight: 700,
  },
  postGallery: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: 12,
  },
  postGalleryImg: {
    width: "100%",
    height: 140,
    objectFit: "cover",
    borderRadius: 4,
  },
  postAttachmentList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  postAttachmentItem: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 13,
    color: "#2B5054",
    textDecoration: "none",
  },
  cardGallery: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
    gap: 8,
    marginTop: 14,
  },
  galleryImg: {
    width: "100%",
    height: 80,
    objectFit: "cover",
    borderRadius: 6,
    border: "1px solid rgba(53, 102, 106, 0.25)",
  },
  attachmentBox: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginTop: 14,
    padding: 12,
    background: "#fafafa",
    borderRadius: 6,
    border: "1px solid rgba(0, 0, 0, 0.04)",
  },
  attachmentItem: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 12,
    color: "#333",
    textDecoration: "none",
    fontWeight: 500,
  },
  // Empty State
  emptyState: {
    textAlign: "center",
    padding: "80px 0",
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 16,
    opacity: 0.3,
  },
  emptyText: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 13,
    color: "#999",
    marginBottom: 20,
  },
  emptyBtn: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 12,
    background: "linear-gradient(135deg, #5A8A8E 0%, #2B5054 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "10px 20px",
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 2px 8px rgba(26, 28, 28, 0.2)",
  },
  // Editor
  editorWrap: {
    maxWidth: 720,
    margin: "0 auto",
  },
  editorHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  editorTitle: {
    fontSize: 24,
    fontWeight: 500,
    margin: 0,
    color: "#222",
  },
  editorForm: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  label: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 11,
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "#999",
    fontWeight: 600,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  input: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 15,
    padding: "12px 14px",
    background: "#e8e8e8",
    border: "none",
    borderBottom: "2px solid rgba(192, 200, 201, 0.7)",
    borderRadius: 0,
    color: "#333",
    outline: "none",
    transition: "border-color 0.2s",
  },
  textarea: {
    fontFamily: "'Newsreader', serif",
    fontSize: 15,
    lineHeight: 1.8,
    padding: "14px",
    background: "#e8e8e8",
    border: "none",
    borderBottom: "2px solid rgba(192, 200, 201, 0.7)",
    borderRadius: 0,
    color: "#333",
    minHeight: 280,
    resize: "vertical",
    outline: "none",
    transition: "border-color 0.2s",
  },
  wordCount: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 12,
    color: "#8EA1A4",
    marginTop: 8,
    fontWeight: 500,
  },
  importBox: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  importBtn: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 12,
    background: "rgba(53, 102, 106, 0.1)",
    color: "#4F6669",
    border: "1px solid rgba(53, 102, 106, 0.3)",
    borderRadius: 10,
    padding: "12px 20px",
    cursor: "pointer",
    fontWeight: 700,
  },
  importStatus: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 12,
    color: "#7B8F92",
    fontWeight: 500,
  },
  mediaSection: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  mediaBtn: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 12,
    background: "rgba(53, 102, 106, 0.1)",
    color: "#4F6669",
    border: "1px solid rgba(53, 102, 106, 0.3)",
    borderRadius: 10,
    padding: "12px 20px",
    cursor: "pointer",
    alignSelf: "flex-start",
    fontWeight: 700,
  },
  previewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))",
    gap: 14,
  },
  previewItem: {
    position: "relative",
  },
  previewImg: {
    width: "100%",
    height: 135,
    objectFit: "cover",
    borderRadius: 12,
    border: "1px solid rgba(53, 102, 106, 0.3)",
  },
  removeBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    background: "rgba(255, 255, 255, 0.95)",
    border: "1px solid rgba(53, 102, 106, 0.3)",
    color: "#4F6669",
    borderRadius: "50%",
    width: 28,
    height: 28,
    cursor: "pointer",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    fontWeight: 700,
  },
  attachmentPreview: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  attachmentPreviewItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "13px 16px",
    background: "rgba(53, 102, 106, 0.06)",
    borderRadius: 10,
    border: "1px solid rgba(53, 102, 106, 0.2)",
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 12,
    color: "#4F6669",
    fontWeight: 600,
  },
  removeAttachmentBtn: {
    background: "none",
    border: "none",
    color: "#A3B5B8",
    fontSize: 18,
    cursor: "pointer",
    padding: 0,
  },
  editorFooter: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: 28,
    borderTop: "none",
  },
  saveBtn: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 13,
    background: "linear-gradient(135deg, #5A8A8E 0%, #2B5054 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "12px 28px",
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 2px 8px rgba(26, 28, 28, 0.2)",
  },
  cancelBtn: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 13,
    background: "transparent",
    color: "#5A8A8E",
    border: "1px solid rgba(43, 80, 84, 0.3)",
    borderRadius: 6,
    padding: "12px 24px",
    cursor: "pointer",
    fontWeight: 500,
  },
  // Footer
  footer: {
    borderTop: "1px solid rgba(0,0,0,0.07)",
    background: "transparent",
    padding: "24px 32px",
    marginTop: 80,
  },
  footerContent: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 12,
    color: "#aaa",
    fontWeight: 400,
  },
  footerLink: {
    color: "#888",
    textDecoration: "none",
    borderBottom: "1px solid rgba(0,0,0,0.2)",
    fontWeight: 500,
    paddingBottom: 1,
  },
  // About Section
  aboutContent: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "40px 0",
  },
  aboutCard: {
    background: "#f3f3f3",
    padding: "26px 24px",
    marginBottom: 20,
    borderRadius: 4,
  },
  aboutCardTitle: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    color: "#35666a",
    margin: "0 0 16px 0",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  aboutText: {
    fontFamily: "'Newsreader', serif",
    fontSize: 18,
    lineHeight: 1.8,
    color: "#444",
    margin: "0 0 16px 0",
  },
  aboutConnectLink: {
    color: "#12393d",
    cursor: "pointer",
    borderBottom: "2px solid rgba(53, 102, 106, 0.6)",
    paddingBottom: 0,
    transition: "all 0.2s",
  },
  // Contact Section
  contactContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: "40px 0",
  },
  contactCard: {
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 32,
  },
  contactIntro: {
    fontFamily: "'Newsreader', serif",
    fontSize: 24,
    color: "#2B5054",
    margin: 0,
    textAlign: "center",
  },
  contactIconsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  contactIconLink: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    transition: "transform 0.2s",
    cursor: "pointer",
  },
  contactIconCircle: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #D6E4E6 0%, #B8CDD0 100%)",
    border: "1px solid rgba(43, 80, 84, 0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  contactIcon: {
    fontSize: 22,
  },
  contactIconLabel: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 12,
    color: "#666",
    fontWeight: 500,
    letterSpacing: "0.3px",
  },
  // Legal AI Section
  laiHero: {
    maxWidth: 760,
    margin: "0 auto 56px",
    textAlign: "center",
    padding: "36px 0 0",
  },
  laiHeroHeadline: {
    fontFamily: "'Newsreader', serif",
    fontSize: 44,
    fontWeight: 600,
    fontStyle: "italic",
    color: "#2F3F42",
    margin: "0 0 26px",
    lineHeight: 1.25,
    letterSpacing: "-0.5px",
  },
  laiHeroSub: {
    fontFamily: "'Newsreader', serif",
    fontSize: 18,
    lineHeight: 1.85,
    color: "#4F6669",
    margin: 0,
  },
  laiDivider: {
    height: 1,
    background: "rgba(53, 102, 106, 0.22)",
    margin: "56px 0",
  },
  laiAbout: {
    maxWidth: 700,
    margin: "0 auto",
  },
  laiAboutText: {
    fontFamily: "'Newsreader', serif",
    fontSize: 17,
    lineHeight: 1.9,
    color: "#4B5E61",
    margin: 0,
    textAlign: "center",
  },
  laiSection: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  laiLabel: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "#2B5054",
  },
  laiPillars: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  laiPillar: {
    display: "flex",
    alignItems: "flex-start",
    gap: 24,
    padding: "28px 32px",
    background: "#fff",
    border: "1px solid rgba(53, 102, 106, 0.2)",
    borderRadius: 16,
    boxShadow: "0 2px 10px rgba(100, 130, 150, 0.05)",
  },
  laiPillarIcon: {
    fontSize: 26,
    flexShrink: 0,
    marginTop: 3,
  },
  laiPillarTitle: {
    fontFamily: "'Newsreader', serif",
    fontSize: 20,
    fontWeight: 600,
    fontStyle: "italic",
    color: "#2F3F42",
    margin: "0 0 10px",
  },
  laiPillarText: {
    fontFamily: "'Newsreader', serif",
    fontSize: 15,
    lineHeight: 1.82,
    color: "#4F6669",
    margin: 0,
  },
  laiTools: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 12,
  },
  laiTool: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    padding: "18px 22px",
    background: "rgba(53, 102, 106, 0.05)",
    border: "1px solid rgba(53, 102, 106, 0.15)",
    borderRadius: 12,
  },
  laiToolName: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    color: "#3F5F63",
    letterSpacing: "0.3px",
  },
  laiToolDesc: {
    fontFamily: "'Newsreader', serif",
    fontSize: 13,
    color: "#7B8F92",
    fontStyle: "italic",
  },
  laiCta: {
    maxWidth: 580,
    margin: "0 auto",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 28,
    padding: "0 0 48px",
  },
  laiCtaText: {
    fontFamily: "'Newsreader', serif",
    fontSize: 18,
    lineHeight: 1.8,
    color: "#4B5E61",
    fontStyle: "italic",
    margin: 0,
  },
  laiCtaBtn: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 14,
    background: "linear-gradient(135deg, #5A8A8E 0%, #2B5054 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "16px 36px",
    cursor: "pointer",
    fontWeight: 700,
    letterSpacing: "0.5px",
    boxShadow: "0 3px 14px rgba(53, 102, 106, 0.25)",
  },
  laiNavBtn: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 13,
    background: "rgba(53, 102, 106, 0.1)",
    color: "#2B5054",
    border: "1px solid rgba(53, 102, 106, 0.35)",
    borderRadius: 20,
    padding: "8px 18px",
    cursor: "pointer",
    fontWeight: 600,
    letterSpacing: "0.3px",
  },
  toolCard: {
    background: "linear-gradient(135deg, #12393d 0%, #2b5054 100%)",
    border: "none",
    borderRadius: 4,
    padding: "24px 28px",
    boxShadow: "0 40px 40px -10px rgba(26, 28, 28, 0.04)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  toolCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  toolCardName: {
    fontFamily: "'Newsreader', serif",
    fontSize: 20,
    fontWeight: 700,
    color: "#ffffff",
    margin: 0,
  },
  toolCardTagline: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 12,
    color: "rgba(255,255,255,0.72)",
    fontWeight: 500,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    marginTop: 4,
    display: "block",
  },
  toolCardBadge: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    color: "#ffffff",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(192, 200, 201, 0.2)",
    borderRadius: 20,
    padding: "3px 10px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  toolCardDesc: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 15,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.85)",
    margin: 0,
  },
  toolCardBtn: {
    display: "inline-block",
    alignSelf: "flex-start",
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    color: "#12393d",
    background: "#ffffff",
    borderRadius: 4,
    padding: "10px 22px",
    textDecoration: "none",
    letterSpacing: "0.3px",
    boxShadow: "none",
  },
  toolCardPlaceholder: {
    background: "rgba(248, 250, 251, 0.8)",
    border: "1px dashed rgba(53, 102, 106, 0.3)",
    borderRadius: 16,
    padding: "24px 28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  toolCardPlaceholderText: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 14,
    color: "#8EA1A4",
    fontStyle: "italic",
  },
  // Hub (About page) — chester.how two-column layout
  aboutHub: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "60px 0 88px",
  },
  aboutTwoCol: {
    display: "flex",
    gap: 60,
    alignItems: "flex-start",
  },
  aboutLeft: {
    flex: "0 0 52%",
    maxWidth: "52%",
  },
  aboutRight: {
    flex: 1,
    minWidth: 0,
    paddingTop: 6,
  },
  aboutHero: {
    fontFamily: "'DM Serif Display', 'Newsreader', serif",
    fontSize: 52,
    fontWeight: 400,
    lineHeight: 1.18,
    color: "#1c1c1c",
    margin: "0 0 30px",
    letterSpacing: "-0.5px",
    whiteSpace: "pre-line",
  },
  aboutHeroAccent: {
    borderBottom: "2.5px solid #2B5054",
    paddingBottom: 2,
  },
  // Bento section cards (chester.how style)
  bentoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  bentoCard: {
    background: "#ffffff",
    borderRadius: 14,
    padding: "18px 20px 16px",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    cursor: "pointer",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    textAlign: "left",
    transition: "box-shadow 0.18s, transform 0.18s",
    width: "100%",
  },
  bentoCardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  bentoCardCategory: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 10,
    fontWeight: 700,
    color: "#2B5054",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  bentoCardArrow: {
    fontSize: 13,
    color: "#ccc",
    marginTop: -1,
  },
  bentoCardName: {
    fontFamily: "'Newsreader', serif",
    fontSize: 17,
    fontWeight: 500,
    color: "#1c1c1c",
    lineHeight: 1.3,
    margin: 0,
  },
  bentoCardDesc: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 12,
    color: "#999",
    lineHeight: 1.5,
    margin: 0,
  },

  // ── Chester gallery card styles ───────────────────────────────────────────
  chesterPage: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "8px 0 64px",
  },
  // 2-col grid for tool cards
  chesterGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
    gap: 16,
  },
  chesterToolCard: {
    background: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.07)",
    boxShadow: "0 2px 14px rgba(0,0,0,0.06)",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
  },
  chesterCardMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "13px 18px 10px",
  },
  chesterCardLabel: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 10,
    fontWeight: 700,
    color: "#2B5054",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  chesterCardArrowIcon: {
    fontSize: 14,
    color: "#ccc",
  },
  chesterToolPreview: {
    height: 190,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    padding: "0 28px",
    flexShrink: 0,
  },
  chesterToolEmoji: {
    fontSize: 40,
    flexShrink: 0,
  },
  chesterToolTagline: {
    fontFamily: "'Newsreader', serif",
    fontStyle: "italic",
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    margin: "0 0 10px",
    lineHeight: 1.5,
  },
  chesterToolLiveBadge: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 10,
    fontWeight: 700,
    color: "#fff",
    background: "rgba(255,255,255,0.18)",
    borderRadius: 20,
    padding: "3px 10px",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
  },
  chesterCardBody: {
    padding: "14px 18px 20px",
    flex: 1,
  },
  chesterToolTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 24,
    fontWeight: 400,
    color: "#1c1c1c",
    margin: "0 0 8px",
    letterSpacing: "-0.2px",
  },
  chesterToolDesc: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 13,
    color: "#888",
    lineHeight: 1.65,
    margin: 0,
  },
  // Post cards (Share page)
  chesterPostGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
    gap: 12,
  },
  chesterPostCard: {
    background: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.07)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    cursor: "pointer",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  chesterPostTitle: {
    fontFamily: "'Newsreader', serif",
    fontSize: 18,
    fontWeight: 500,
    color: "#1c1c1c",
    lineHeight: 1.35,
    margin: "0 0 8px",
  },
  chesterPostExcerpt: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 12,
    color: "#aaa",
    lineHeight: 1.6,
    margin: "0 0 12px",
  },
  chesterPostDate: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 11,
    color: "#bbb",
    fontWeight: 500,
    letterSpacing: "0.3px",
    display: "block",
  },
  // Hobbies page
  chesterHobbiesSection: {
    marginBottom: 52,
  },
  chesterSectionHeading: {
    fontFamily: "'DM Serif Display', 'Newsreader', serif",
    fontSize: 28,
    fontWeight: 400,
    fontStyle: "italic",
    color: "#2B5054",
    margin: "0 0 18px",
  },
  chesterPhotoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
    gap: 12,
  },
  chesterPhotoCard: {
    background: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.07)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    cursor: "pointer",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  chesterPhotoImg: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    display: "block",
  },
  chesterPhotoPlaceholder: {
    height: 150,
    background: "#f0ede8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 32,
  },
  chesterMusicGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 10,
  },
  chesterMusicCard: {
    background: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.07)",
    cursor: "pointer",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  chesterMusicBody: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "10px 18px 16px",
  },
  chesterMusicNote: {
    fontSize: 28,
    color: "#2B5054",
    flexShrink: 0,
    lineHeight: 1,
  },
  aboutBioRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 28,
    marginBottom: 40,
  },
  aboutBioText: {
    flex: 1,
    minWidth: 0,
  },
  aboutPortraitCard: {
    position: "relative",
    width: 160,
    flexShrink: 0,
    borderRadius: 14,
    overflow: "hidden",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.55)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
  },
  aboutPortraitImg: {
    display: "block",
    width: "100%",
    aspectRatio: "2/3",
    objectFit: "cover",
    objectPosition: "center top",
  },
  aboutPortraitGlass: {
    position: "absolute",
    inset: 0,
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.35)",
    pointerEvents: "none",
  },
  aboutBioSection: {
    marginBottom: 40,
  },
  aboutSectionLabel: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 10,
    fontWeight: 700,
    color: "#8EA1A4",
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    margin: "0 0 18px 0",
  },
  hubDivider: {
    height: 1,
    background: "rgba(43,80,84,0.1)",
    margin: "48px 0",
  },
  hubTilesSection: {},
  hubTilesLabel: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 10,
    fontWeight: 700,
    color: "#2B5054",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    margin: "0 0 4px 0",
  },
  hubTilesList: {
    display: "flex",
    flexDirection: "column",
  },
  hubTileRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 0",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(43,80,84,0.08)",
    cursor: "pointer",
    textAlign: "left",
    textDecoration: "none",
    width: "100%",
    transition: "opacity 0.15s",
  },
  hubTileRowName: {
    fontFamily: "'Newsreader', serif",
    fontSize: 22,
    fontWeight: 400,
    fontStyle: "italic",
    color: "#13181a",
    lineHeight: 1.2,
  },
  hubTileRowRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexShrink: 0,
    marginLeft: 16,
  },
  hubTileRowSub: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 11,
    color: "#8EA1A4",
    letterSpacing: "0.3px",
  },
  hubTileArrow: {
    fontFamily: "'Newsreader', serif",
    fontSize: 18,
    color: "#2B5054",
    opacity: 0.5,
  },
  hubConnect: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    paddingBottom: 16,
  },
  hubConnectHeading: {
    fontFamily: "'Newsreader', serif",
    fontSize: 20,
    fontStyle: "italic",
    color: "#2B5054",
    margin: 0,
  },
  hubConnectLinks: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "4px 2px",
  },
  hubConnectLink: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 13,
    color: "#2B5054",
    textDecoration: "none",
    borderBottom: "1px solid rgba(43,80,84,0.35)",
    paddingBottom: 1,
    fontWeight: 500,
  },
  hubConnectDot: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 13,
    color: "#8EA1A4",
    margin: "0 6px",
    userSelect: "none",
  },
};

// FONTS + HOVER CSS
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  const link = document.createElement("link");
  link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Public+Sans:wght@400;500;600;700&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);

  const css = document.createElement("style");
  css.textContent = `
    /* ── Nav pill link hover ── */
    .pill-nav-btn:not([style*="background: rgb(43"]):hover {
      color: #2B5054 !important;
      background: rgba(43,80,84,0.07) !important;
    }

    /* ── Header links: animated sliding underline ── */
    .hdr-link {
      position: relative;
      text-decoration: none !important;
    }
    .hdr-link::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1.5px;
      background: #2B5054;
      transition: width 0.22s ease;
    }
    .hdr-link:hover { color: #2B5054 !important; }
    .hdr-link:hover::after { width: 100%; }

    /* ── About connect inline link: wavy underline ── */
    .about-connect-sp:hover {
      text-decoration: underline wavy #2B5054 !important;
      text-underline-offset: 3px;
      border-bottom-color: transparent !important;
    }

    /* ── Hub connect links: morph to wavy on hover ── */
    .hub-link { text-decoration: none !important; }
    .hub-link:hover {
      color: #12393d !important;
      text-decoration: underline wavy #2B5054 !important;
      text-underline-offset: 4px;
      border-bottom-color: transparent !important;
    }

    /* ── Bento cards: lift + teal border ── */
    .bento-card-el {
      transition: box-shadow 0.18s, transform 0.18s, border-color 0.18s !important;
    }
    .bento-card-el:hover {
      transform: translateY(-3px) !important;
      box-shadow: 0 10px 28px rgba(43,80,84,0.13) !important;
      border-color: rgba(43,80,84,0.28) !important;
    }

    /* ── Chester tool cards: lift + teal glow ── */
    .chester-tool-a {
      transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s !important;
    }
    .chester-tool-a:hover {
      transform: translateY(-4px) !important;
      box-shadow: 0 14px 40px rgba(43,80,84,0.18) !important;
      border-color: rgba(43,80,84,0.3) !important;
    }

    /* ── Chester post cards: soft lift ── */
    .chester-post-btn {
      transition: box-shadow 0.15s, border-color 0.15s, transform 0.15s !important;
    }
    .chester-post-btn:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 20px rgba(43,80,84,0.12) !important;
      border-color: rgba(43,80,84,0.22) !important;
    }

    /* ── Footer link: wavy underline on hover ── */
    .footer-link-a { transition: color 0.15s !important; }
    .footer-link-a:hover {
      color: #2B5054 !important;
      text-decoration: underline wavy #2B5054 !important;
      text-underline-offset: 3px;
      border-bottom-color: transparent !important;
    }
  `;
  document.head.appendChild(css);
})();

// ─── Mount ────────────────────────────────────────────────────────────────────
const { StrictMode } = React;
const { createRoot } = ReactDOM;
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
