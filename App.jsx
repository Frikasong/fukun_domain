// useState, useEffect, useRef provided as globals from index.html

// ─── Storage Keys ───────────────────────────────────────────────────────────
const ENTRIES_KEY = "fukun-portfolio-entries";
const COMMENTS_KEY = "fukun-portfolio-comments";

// ─── Translations ────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    site: { name: "Fukun", tagline: "Law · Technology · Ideas" },
    langToggle: "中文",
    nav: {
      info: "Info", professional: "Work", personal: "Life",
      about: "About", tech: "Tech", law: "Law", investment: "Investment", essays: "Essays",
      music: "Weekly Music", photography: "Photos", contact: "Contact",
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
    contact: { intro: "Let's connect!", email: "Email", linkedin: "LinkedIn", github: "GitHub", instagram: "Instagram" },
    editor: {
      new: "New Post", edit: "Edit Post", back: "← Back",
      titleLabel: "Title", titlePh: "Post title...",
      dateLabel: "Date", contentLabel: "Content", contentPh: "Write your thoughts...",
      importBtn: "📄 Import from PDF/DOCX", importing: "⟳ Importing...",
      addImages: "🖼️ Add Images", addFiles: "📎 Add Files",
      words: "words", save: "Save", publish: "Publish Post", update: "Update Post",
    },
    common: { readMore: "Read more", showLess: "Show less" },
    grid: { newPost: "+ New Post", empty: "No posts yet in this section", createFirst: "Create First Post" },
    footer: "© 2026 Fukun · All Rights Reserved",
    ambient: "Ambient",
  },
  zh: {
    site: { name: "Fukun", tagline: "法律 · 科技 · 思想" },
    langToggle: "EN",
    nav: {
      info: "信息", professional: "工作", personal: "生活",
      about: "关于", tech: "科技", law: "法律", investment: "投资", essays: "文章",
      music: "每周音乐", photography: "照片", contact: "联系",
      techSub: "法律AI · 工具",
      lawSub: "法律研究",
      investmentSub: "市场分析",
      essaysSub: "写作",
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
    contact: { intro: "来联系我吧！", email: "邮箱", linkedin: "领英", github: "GitHub", instagram: "Instagram" },
    editor: {
      new: "新建文章", edit: "编辑文章", back: "← 返回",
      titleLabel: "标题", titlePh: "文章标题...",
      dateLabel: "日期", contentLabel: "内容", contentPh: "写下你的想法...",
      importBtn: "📄 从PDF/DOCX导入", importing: "⟳ 导入中...",
      addImages: "🖼️ 添加图片", addFiles: "📎 添加文件",
      words: "字", save: "保存", publish: "发布文章", update: "更新文章",
    },
    common: { readMore: "阅读更多", showLess: "收起" },
    grid: { newPost: "+ 新建文章", empty: "此栏目暂无文章", createFirst: "创建第一篇" },
    footer: "© 2026 Fukun · 版权所有",
    ambient: "环境音乐",
  },
};

// ─── Section Configuration ──────────────────────────────────────────────────
const SECTIONS = [
  { id: "about", name: "About", icon: "👋", type: "info" },
  { id: "tech", name: "Tech", subtitle: "Legal AI · Tools", icon: "💻", type: "professional" },
  { id: "law", name: "Law", subtitle: "Legal Research", icon: "⚖️", type: "professional" },
  { id: "investment", name: "Investment", subtitle: "Market Analysis", icon: "📈", type: "professional" },
  { id: "essays", name: "Essays", subtitle: "Writing", icon: "✍️", type: "personal" },
  { id: "music", name: "Weekly Music", icon: "🎵", type: "personal" },
  { id: "photography", name: "Photos", icon: "📷", type: "personal" },
  { id: "contact", name: "Contact", icon: "📧", type: "info" },
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

async function loadComments() {
  try {
    const result = await window.storage.get(COMMENTS_KEY, true);
    return result ? JSON.parse(result.value) : {};
  } catch {
    return {};
  }
}

async function saveComments(comments) {
  await window.storage.set(COMMENTS_KEY, JSON.stringify(comments), true);
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════
function App() {
  const [entries, setEntries] = useState([]);
  const [comments, setComments] = useState({});
  const [activeSection, setActiveSection] = useState("about");
  const [view, setView] = useState("grid"); // "grid" | "editor"
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", date: "", body: "", images: [], attachments: [], section: "tech" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const [logoFailed, setLogoFailed] = useState(false);
  const T = TRANSLATIONS[lang];

  // File handling
  const [fileStatus, setFileStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const attachmentInputRef = useRef(null);

  useEffect(() => {
    loadEntries().then(setEntries);
    loadComments().then(setComments);
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
    const { [id]: _, ...remainingComments } = comments;
    setComments(remainingComments);
    await saveComments(remainingComments);
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

  // Comments
  const addComment = async (entryId, name, text) => {
    if (!text.trim()) return;
    const newComment = { id: Date.now(), name: name.trim() || "Anonymous", text, timestamp: new Date().toISOString() };
    const updated = { ...comments, [entryId]: [...(comments[entryId] || []), newComment] };
    setComments(updated);
    await saveComments(updated);
  };

  const deleteComment = async (entryId, commentId) => {
    const updated = { ...comments, [entryId]: comments[entryId].filter((c) => c.id !== commentId) };
    setComments(updated);
    await saveComments(updated);
  };

  // Filtered entries
  const sectionEntries = entries.filter((e) => e.section === activeSection || SECTION_MAP[e.section] === activeSection);
  const currentSection = SECTIONS.find((s) => s.id === activeSection);

  return (
    <div style={styles.root}>
      {/* Background */}
      <div style={styles.bgPattern} />

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft} onClick={() => { setView("grid"); setActiveSection("about"); }}>
            {!logoFailed && (
              <img
                src="logo.png"
                alt={T.site.name}
                style={styles.siteLogo}
                onError={() => setLogoFailed(true)}
              />
            )}
            <p style={styles.tagline}>{T.site.tagline}</p>
          </div>
          <div style={styles.headerControls}>
            <button
              style={styles.langToggle}
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
            >
              {T.langToggle}
            </button>
            <button style={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Nav backdrop */}
      {menuOpen && (
        <div style={styles.navBackdrop} onClick={() => setMenuOpen(false)} />
      )}

      {/* Floating side navigation panel */}
      <nav style={{ ...styles.nav, transform: menuOpen ? "translateX(0)" : "translateX(100%)" }}>
        <button style={styles.navClose} onClick={() => setMenuOpen(false)}>✕</button>
        <div style={styles.navInner}>
          <div style={styles.navGroup}>
            <span style={styles.navGroupTitle}>{T.nav.info}</span>
            {SECTIONS.filter((s) => s.type === "info").map((section) => {
              const label = T.nav[section.id] || section.name;
              return (
                <button
                  key={section.id}
                  style={{ ...styles.navBtn, ...(activeSection === section.id ? styles.navBtnActive : {}) }}
                  onClick={() => { setActiveSection(section.id); setView("grid"); setMenuOpen(false); }}
                >
                  <span style={styles.navIcon}>{section.icon}</span>
                  <span style={styles.navLabel}>{label}</span>
                </button>
              );
            })}
          </div>
          <div style={styles.navGroup}>
            <span style={styles.navGroupTitle}>{T.nav.professional}</span>
            {SECTIONS.filter((s) => s.type === "professional").map((section) => {
              const label = T.nav[section.id] || section.name;
              const subtitle = T.nav[section.id + "Sub"];
              return (
                <button
                  key={section.id}
                  style={{ ...styles.navBtn, ...(activeSection === section.id ? styles.navBtnActive : {}) }}
                  onClick={() => { setActiveSection(section.id); setView("grid"); setMenuOpen(false); }}
                >
                  <span style={styles.navIcon}>{section.icon}</span>
                  <span style={styles.navLabel}>
                    {label}
                    {subtitle && <span style={styles.navSubtitle}>{subtitle}</span>}
                  </span>
                </button>
              );
            })}
          </div>
          <div style={styles.navGroup}>
            <span style={styles.navGroupTitle}>{T.nav.personal}</span>
            {SECTIONS.filter((s) => s.type === "personal").map((section) => {
              const label = T.nav[section.id] || section.name;
              return (
                <button
                  key={section.id}
                  style={{ ...styles.navBtn, ...(activeSection === section.id ? styles.navBtnActive : {}) }}
                  onClick={() => { setActiveSection(section.id); setView("grid"); setMenuOpen(false); }}
                >
                  <span style={styles.navIcon}>{section.icon}</span>
                  <span style={styles.navLabel}>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.main}>
        {view === "grid" ? (
          <GridView
            section={currentSection}
            entries={sectionEntries}
            comments={comments}
            onNew={openNew}
            onEdit={openEdit}
            onDelete={deleteEntry}
            onAddComment={addComment}
            onDeleteComment={deleteComment}
            setActiveSection={setActiveSection}
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
        <div style={styles.footerContent}>
          <span>{T.footer}</span>
          <a href="mailto:frikasong@gmail.com" style={styles.footerLink}>
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
function GridView({ section, entries, comments, onNew, onEdit, onDelete, onAddComment, onDeleteComment, setActiveSection, T, lang }) {
  const sectionLabel = T.nav[section.id] || section.name;
  const sectionSub = T.nav[section.id + "Sub"] || section.subtitle;

  // Special handling for About section
  if (section.id === "about") {
    return (
      <div style={styles.gridContainer}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <span style={styles.sectionIcon}>{section.icon}</span>
            <h2 style={styles.sectionTitle}>{sectionLabel}</h2>
          </div>
        </div>
        <div style={styles.aboutContent}>
          <div style={styles.aboutCard}>
            <h3 style={styles.aboutCardTitle}>{T.about.bg}</h3>
            <p style={styles.aboutText}>{T.about.bg1}</p>
            <p style={styles.aboutText}>{T.about.bg2}</p>
          </div>
          <div style={styles.aboutCard}>
            <h3 style={styles.aboutCardTitle}>{T.about.interests}</h3>
            <p style={styles.aboutText}>{T.about.int1}</p>
            <p style={styles.aboutText}>
              {T.about.int2}{' '}
              <span
                style={styles.aboutConnectLink}
                onClick={() => {
                  setActiveSection("contact");
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {T.about.connect}
              </span>!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Special handling for Tech section (sub-tabs: Insights | Tools | Observations | AI Lab)
  if (section.id === "tech") {
    return <TechView entries={entries} comments={comments} onNew={onNew} onEdit={onEdit} onDelete={onDelete} onAddComment={onAddComment} onDeleteComment={onDeleteComment} setActiveSection={setActiveSection} T={T} lang={lang} />;
  }

  // Special handling for Contact section
  if (section.id === "contact") {
    return (
      <div style={styles.gridContainer}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <span style={styles.sectionIcon}>{section.icon}</span>
            <h2 style={styles.sectionTitle}>{sectionLabel}</h2>
          </div>
        </div>
        <div style={styles.contactContent}>
          <div style={styles.contactCard}>
            <p style={styles.contactIntro}>{T.contact.intro}</p>
            <div style={styles.contactIconsRow}>
              <a 
                href="mailto:frikasong@gmail.com" 
                style={styles.contactIconLink}
                title={`${T.contact.email}: frikasong@gmail.com`}
              >
                <div style={styles.contactIconCircle}>
                  <span style={styles.contactIcon}>✉️</span>
                </div>
                <span style={styles.contactIconLabel}>{T.contact.email}</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/fukun-y-7753a5176/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.contactIconLink}
                title={T.contact.linkedin}
              >
                <div style={styles.contactIconCircle}>
                  <span style={styles.contactIcon}>💼</span>
                </div>
                <span style={styles.contactIconLabel}>{T.contact.linkedin}</span>
              </a>
              <a 
                href="https://instagram.com/frika_song" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.contactIconLink}
                title={`${T.contact.instagram}: @frika_song`}
              >
                <div style={styles.contactIconCircle}>
                  <span style={styles.contactIcon}>📷</span>
                </div>
                <span style={styles.contactIconLabel}>{T.contact.instagram}</span>
              </a>
              <a 
                href="https://github.com/Frikasong" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.contactIconLink}
                title={T.contact.github}
              >
                <div style={styles.contactIconCircle}>
                  <span style={styles.contactIcon}>🐙</span>
                </div>
                <span style={styles.contactIconLabel}>{T.contact.github}</span>
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
            <h2 style={styles.sectionTitle}>{sectionLabel}</h2>
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
          {entries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              comments={comments[entry.id] || []}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddComment={onAddComment}
              onDeleteComment={onDeleteComment}
              T={T}
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
function EntryCard({ entry, comments, onEdit, onDelete, onAddComment, onDeleteComment, T }) {
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  const preview = entry.body.length > 180 ? entry.body.slice(0, 180).replace(/\s+\S*$/, "") + "…" : entry.body;
  const formattedDate = entry.date
    ? new Date(entry.date + "T12:00:00").toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" })
    : "";

  const submitComment = () => {
    onAddComment(entry.id, commentName, commentText);
    setCommentName("");
    setCommentText("");
  };

  return (
    <article style={styles.card}>
      {/* Cover Image */}
      {entry.images && entry.images.length > 0 && (
        <div style={styles.cardCover}>
          <img src={entry.images[0].data} alt={entry.title} style={styles.cardCoverImg} />
          <div style={styles.cardCoverOverlay} />
        </div>
      )}

      <div style={styles.cardContent}>
        {/* Header */}
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>{entry.title}</h3>
          <span style={styles.cardDate}>{formattedDate}</span>
        </div>

        {/* Body Preview */}
        <p style={styles.cardBody}>{expanded ? entry.body : preview}</p>
        {entry.body.length > 180 && (
          <button style={styles.toggleBtn} onClick={() => setExpanded(!expanded)}>
            {expanded ? T.common.showLess : T.common.readMore}
          </button>
        )}

        {/* Additional Images */}
        {entry.images && entry.images.length > 1 && (
          <div style={styles.cardGallery}>
            {entry.images.slice(1).map((img, i) => (
              <img key={i} src={img.data} alt={img.name} style={styles.galleryImg} />
            ))}
          </div>
        )}

        {/* Attachments */}
        {entry.attachments && entry.attachments.length > 0 && (
          <div style={styles.attachmentBox}>
            {entry.attachments.map((att, i) => (
              <a key={i} href={att.data} download={att.name} style={styles.attachmentItem}>
                📎 {att.name}
              </a>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div style={styles.cardFooter}>
          <button style={styles.commentBtn} onClick={() => setShowComments(!showComments)}>
            💬 {comments.length}
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div style={styles.commentsBox}>
            {comments.length > 0 && (
              <div style={styles.commentsList}>
                {comments.map((comment) => (
                  <div key={comment.id} style={styles.comment}>
                    <div style={styles.commentHeader}>
                      <span style={styles.commentAuthor}>{comment.name}</span>
                      <span style={styles.commentTime}>
                        {new Date(comment.timestamp).toLocaleDateString("en-CA", { month: "short", day: "numeric" })}
                      </span>
                      <button style={styles.commentDelete} onClick={() => onDeleteComment(entry.id, comment.id)}>×</button>
                    </div>
                    <p style={styles.commentText}>{comment.text}</p>
                  </div>
                ))}
              </div>
            )}
            <div style={styles.commentForm}>
              <input
                style={styles.commentInput}
                placeholder="Name (optional)"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
              />
              <textarea
                style={styles.commentTextarea}
                placeholder="Leave feedback..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button style={styles.commentSubmit} onClick={submitComment} disabled={!commentText.trim()}>
                Post
              </button>
            </div>
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
function TechView({ entries, comments, onNew, onEdit, onDelete, onAddComment, onDeleteComment, setActiveSection, T, lang }) {
  const [activeTab, setActiveTab] = useState("lab");
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
                <h2 style={styles.sectionTitle}>{T.tech.toolsBuiltLabel}</h2>
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
                <h2 style={styles.sectionTitle}>{T.tech.tab2}</h2>
                <p style={styles.sectionSubtitle}>{T.tech.insightsSub}</p>
              </div>
            </div>
          </div>

          <section style={styles.newsBlock}>
            <div style={styles.newsBlockHeader}>
              <h3 style={styles.newsBlockTitle}>{T.news.autoTitle}</h3>
              <p style={styles.newsBlockSub}>{T.news.autoSub}</p>
            </div>

            <div style={styles.newsGrid}>
              <NewsRadarPanel
                title={T.news.naTitle}
                subtitle={T.news.naSub}
                items={[...(newsHighlights.na || []), ...(newsPanels.na || [])]}
                region="na"
                loading={newsLoading}
                error={newsError}
                T={T}
                lang={lang}
              />
              <NewsRadarPanel
                title={T.news.cnTitle}
                subtitle={T.news.cnSub}
                items={[...(newsHighlights.cn || []), ...(newsPanels.cn || [])]}
                region="cn"
                loading={newsLoading}
                error={newsError}
                T={T}
                lang={lang}
              />
            </div>
          </section>

          <div style={{ ...styles.sectionHeader, marginTop: 24 }}>
            <div style={styles.sectionTitleRow}>
              <span style={styles.sectionIcon}>📰</span>
              <div>
                <h2 style={styles.sectionTitle}>{T.tech.insightsTitle}</h2>
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
              {insightEntries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} comments={comments[entry.id] || []}
                  onEdit={onEdit} onDelete={onDelete} onAddComment={onAddComment} onDeleteComment={onDeleteComment} T={T} />
              ))}
            </div>
          )}

          <div style={{ ...styles.sectionHeader, marginTop: 24 }}>
            <div style={styles.sectionTitleRow}>
              <span style={styles.sectionIcon}>🧭</span>
              <div>
                <h2 style={styles.sectionTitle}>{T.tech.obsTitle}</h2>
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
              {obsEntries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} comments={comments[entry.id] || []}
                  onEdit={onEdit} onDelete={onDelete} onAddComment={onAddComment} onDeleteComment={onDeleteComment} T={T} />
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
    fontFamily: "'Lora', 'Georgia', serif",
    minHeight: "100vh",
    background: "#fafafa",
    color: "#333",
    position: "relative",
  },
  bgPattern: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `
      radial-gradient(circle at 20% 30%, rgba(43, 80, 84, 0.06) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(140, 190, 210, 0.05) 0%, transparent 50%)
    `,
    pointerEvents: "none",
    zIndex: 0,
  },
  // Music Player
  musicToggle: {
    position: "fixed",
    bottom: 24,
    right: 24,
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #D6E4E6 0%, #B8CDD0 100%)",
    border: "1px solid rgba(43, 80, 84, 0.25)",
    color: "#2B5054",
    fontSize: 16,
    cursor: "pointer",
    zIndex: 1000,
    boxShadow: "0 2px 8px rgba(43, 80, 84, 0.15)",
    transition: "all 0.2s",
  },
  musicPlayer: {
    position: "fixed",
    bottom: 80,
    right: 24,
    width: 260,
    background: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(20px)",
    borderRadius: 12,
    padding: 20,
    border: "1px solid rgba(43, 80, 84, 0.2)",
    boxShadow: "0 4px 20px rgba(43, 80, 84, 0.12)",
    zIndex: 1000,
  },
  musicPlayerHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    paddingBottom: 12,
    borderBottom: "1px solid rgba(43, 80, 84, 0.15)",
  },
  musicPlayerTitle: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 10,
    fontWeight: 600,
    color: "#5A8A8E",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  musicClose: {
    background: "none",
    border: "none",
    fontSize: 20,
    color: "#7B8F92",
    cursor: "pointer",
    padding: 0,
    lineHeight: 1,
  },
  trackInfo: {
    marginBottom: 16,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  trackName: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    color: "#2B5054",
    fontWeight: 500,
  },
  trackNumber: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 10,
    color: "#7FA3A7",
    fontWeight: 500,
  },
  musicControls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  musicBtn: {
    background: "transparent",
    border: "none",
    fontSize: 14,
    color: "#5A8A8E",
    cursor: "pointer",
    padding: 8,
    transition: "color 0.2s",
  },
  musicBtnPlay: {
    background: "linear-gradient(135deg, #5A8A8E 0%, #2B5054 100%)",
    border: "none",
    fontSize: 12,
    color: "#fff",
    cursor: "pointer",
    width: 36,
    height: 36,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(42, 123, 189, 0.25)",
    transition: "all 0.2s",
  },
  // Header
  header: {
    background: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(12px)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    padding: "16px 40px 24px",
    borderBottom: "1px solid rgba(43, 80, 84, 0.15)",
  },
  headerContent: {
    maxWidth: 1400,
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  headerLeft: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  headerControls: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  siteLogo: {
    height: 78,
    width: "auto",
    display: "block",
  },
  siteName: {
    fontSize: 28,
    fontWeight: 400,
    margin: 0,
    letterSpacing: "-0.3px",
    color: "#2B5054",
  },
  tagline: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    color: "#5A8A8E",
    margin: "4px 0 0 0",
    letterSpacing: "2px",
    textTransform: "uppercase",
    fontWeight: 500,
  },
  menuToggle: {
    background: "rgba(43, 80, 84, 0.1)",
    border: "1px solid rgba(43, 80, 84, 0.2)",
    color: "#2B5054",
    fontSize: 18,
    padding: "10px 16px",
    borderRadius: 8,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    transition: "all 0.2s",
  },
  langToggle: {
    background: "transparent",
    border: "1px solid rgba(43, 80, 84, 0.3)",
    color: "#2B5054",
    fontSize: 12,
    padding: "8px 14px",
    borderRadius: 20,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    letterSpacing: "0.5px",
    transition: "all 0.2s",
  },
  // Navigation
  navBackdrop: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.25)",
    zIndex: 200,
    backdropFilter: "blur(2px)",
  },
  nav: {
    position: "fixed",
    top: 0,
    right: 0,
    width: 280,
    height: "100vh",
    background: "#fff",
    boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
    zIndex: 201,
    overflowY: "auto",
    transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
    display: "flex",
    flexDirection: "column",
  },
  navInner: {
    padding: "24px 20px 40px",
    display: "flex",
    flexDirection: "column",
    gap: 28,
    flex: 1,
  },
  navClose: {
    background: "transparent",
    border: "none",
    fontSize: 20,
    color: "#999",
    cursor: "pointer",
    alignSelf: "flex-end",
    padding: "12px 16px 4px",
    lineHeight: 1,
  },
  navGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  navGroupTitle: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 10,
    color: "#bbb",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: 12,
    fontWeight: 600,
  },
  navBtn: {
    background: "transparent",
    border: "none",
    color: "#555",
    padding: "12px 16px",
    textAlign: "left",
    cursor: "pointer",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    gap: 12,
    transition: "all 0.2s",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 500,
  },
  navBtnActive: {
    background: "rgba(43, 80, 84, 0.12)",
    color: "#2B5054",
  },
  navIcon: {
    fontSize: 18,
  },
  navLabel: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  navSubtitle: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 10,
    color: "#999",
    letterSpacing: "0.5px",
    fontWeight: 400,
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
    padding: "8px 16px",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    borderRadius: 6,
    background: "#fff",
    color: "#666",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  techSubTabActive: {
    background: "linear-gradient(135deg, #5A8A8E 0%, #2B5054 100%)",
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
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 16,
    color: "#2B5054",
    margin: 0,
    fontWeight: 600,
  },
  newsBlockSub: {
    fontFamily: "'DM Sans', sans-serif",
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
    border: "1px solid rgba(43, 80, 84, 0.18)",
    borderRadius: 10,
    background: "#fff",
    padding: 14,
  },
  newsPanelHeader: {
    marginBottom: 10,
  },
  newsPanelTitle: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    color: "#2B5054",
    margin: 0,
    fontWeight: 600,
  },
  newsPanelSub: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    color: "#5A8A8E",
    margin: "4px 0 0 0",
  },
  newsState: {
    fontFamily: "'DM Sans', sans-serif",
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
    border: "1px solid rgba(43, 80, 84, 0.1)",
    borderRadius: 8,
    padding: 10,
    background: "#fafafa",
  },
  newsMetaRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    gap: 10,
  },
  newsSource: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    color: "#2B5054",
    fontWeight: 600,
  },
  newsDate: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 10,
    color: "#7B8F92",
  },
  newsTitleLink: {
    fontFamily: "'Lora', serif",
    fontSize: 15,
    color: "#2F3F42",
    textDecoration: "none",
    lineHeight: 1.5,
    display: "block",
  },
  newsSummary: {
    fontFamily: "'DM Sans', sans-serif",
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
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 10,
    color: "#2B5054",
    background: "rgba(43, 80, 84, 0.1)",
    border: "1px solid rgba(43, 80, 84, 0.2)",
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
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    color: "#2B5054",
    textDecoration: "none",
    border: "1px solid rgba(43, 80, 84, 0.25)",
    borderRadius: 6,
    padding: "3px 8px",
    background: "#fff",
  },
  // Main
  main: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "48px 32px",
    position: "relative",
    zIndex: 1,
  },
  // Grid View
  gridContainer: {},
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    paddingBottom: 20,
    borderBottom: "1px solid rgba(43, 80, 84, 0.15)",
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
    fontSize: 28,
    fontWeight: 400,
    margin: 0,
    color: "#2B5054",
    letterSpacing: "-0.3px",
  },
  sectionSubtitle: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    color: "#5A8A8E",
    margin: "4px 0 0 0",
    letterSpacing: "1.5px",
    fontWeight: 500,
  },
  newEntryBtn: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    background: "linear-gradient(135deg, #5A8A8E 0%, #2B5054 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "10px 20px",
    cursor: "pointer",
    fontWeight: 600,
    letterSpacing: "0.3px",
    boxShadow: "0 2px 8px rgba(42, 123, 189, 0.2)",
    transition: "all 0.2s",
  },
  // Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: 24,
  },
  // Card
  card: {
    background: "#fff",
    border: "1px solid rgba(43, 80, 84, 0.15)",
    borderRadius: 8,
    overflow: "hidden",
    transition: "all 0.2s",
    boxShadow: "0 1px 4px rgba(43, 80, 84, 0.06)",
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
    fontSize: 18,
    fontWeight: 500,
    margin: "0 0 6px 0",
    color: "#2B5054",
    lineHeight: 1.4,
  },
  cardDate: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    color: "#7FA3A7",
    letterSpacing: "0.5px",
    fontWeight: 500,
  },
  cardBody: {
    fontSize: 14,
    lineHeight: 1.7,
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
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
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
    border: "1px solid rgba(173, 216, 230, 0.25)",
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
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    color: "#333",
    textDecoration: "none",
    fontWeight: 500,
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    paddingTop: 20,
    borderTop: "1px solid rgba(173, 216, 230, 0.15)",
  },
  commentBtn: {
    background: "rgba(173, 216, 230, 0.1)",
    border: "1px solid rgba(173, 216, 230, 0.3)",
    color: "#4F6669",
    fontSize: 13,
    padding: "9px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
  },
  cardActions: {
    display: "flex",
    gap: 8,
    marginTop: 16,
  },
  editBtn: {
    background: "transparent",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    color: "#666",
    fontSize: 11,
    padding: "6px 12px",
    borderRadius: 4,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
  },
  deleteBtn: {
    background: "transparent",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    color: "#999",
    fontSize: 11,
    padding: "6px 12px",
    borderRadius: 4,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
  },
  // Comments
  commentsBox: {
    marginTop: 20,
    padding: 16,
    background: "#fafafa",
    borderRadius: 8,
    border: "1px solid rgba(0, 0, 0, 0.04)",
  },
  commentsList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 14,
  },
  comment: {
    padding: 12,
    background: "#fff",
    borderRadius: 6,
    borderLeft: "2px solid #ddd",
  },
  commentHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  commentAuthor: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    fontWeight: 600,
    color: "#333",
  },
  commentTime: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 10,
    color: "#999",
    fontWeight: 500,
  },
  commentDelete: {
    marginLeft: "auto",
    background: "none",
    border: "none",
    fontSize: 14,
    color: "#ccc",
    cursor: "pointer",
    padding: 0,
  },
  commentText: {
    fontSize: 13,
    lineHeight: 1.6,
    color: "#555",
    margin: 0,
  },
  commentForm: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  commentInput: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    padding: "10px 12px",
    background: "#fff",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    borderRadius: 4,
    color: "#333",
    outline: "none",
    transition: "border-color 0.2s",
  },
  commentTextarea: {
    fontFamily: "'Lora', serif",
    fontSize: 13,
    lineHeight: 1.6,
    padding: "10px 12px",
    background: "#fff",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    borderRadius: 4,
    color: "#333",
    minHeight: 85,
    resize: "vertical",
    outline: "none",
    transition: "border-color 0.2s",
  },
  commentSubmit: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    background: "linear-gradient(135deg, #5A8A8E 0%, #2B5054 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "11px 22px",
    cursor: "pointer",
    alignSelf: "flex-end",
    fontWeight: 700,
    boxShadow: "0 3px 12px rgba(122, 184, 212, 0.25)",
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
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    color: "#999",
    marginBottom: 20,
  },
  emptyBtn: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    background: "linear-gradient(135deg, #5A8A8E 0%, #2B5054 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "10px 20px",
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 2px 8px rgba(42, 123, 189, 0.2)",
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
    fontFamily: "'DM Sans', sans-serif",
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
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    padding: "12px 14px",
    background: "#fff",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    borderRadius: 6,
    color: "#333",
    outline: "none",
    transition: "border-color 0.2s",
  },
  textarea: {
    fontFamily: "'Lora', serif",
    fontSize: 15,
    lineHeight: 1.8,
    padding: "14px",
    background: "#fff",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    borderRadius: 6,
    color: "#333",
    minHeight: 280,
    resize: "vertical",
    outline: "none",
    transition: "border-color 0.2s",
  },
  wordCount: {
    fontFamily: "'DM Sans', sans-serif",
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
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    background: "rgba(173, 216, 230, 0.1)",
    color: "#4F6669",
    border: "1px solid rgba(173, 216, 230, 0.3)",
    borderRadius: 10,
    padding: "12px 20px",
    cursor: "pointer",
    fontWeight: 700,
  },
  importStatus: {
    fontFamily: "'DM Sans', sans-serif",
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
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    background: "rgba(173, 216, 230, 0.1)",
    color: "#4F6669",
    border: "1px solid rgba(173, 216, 230, 0.3)",
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
    border: "1px solid rgba(173, 216, 230, 0.3)",
  },
  removeBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    background: "rgba(255, 255, 255, 0.95)",
    border: "1px solid rgba(173, 216, 230, 0.3)",
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
    background: "rgba(173, 216, 230, 0.06)",
    borderRadius: 10,
    border: "1px solid rgba(173, 216, 230, 0.2)",
    fontFamily: "'DM Sans', sans-serif",
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
    borderTop: "1px solid rgba(173, 216, 230, 0.2)",
  },
  saveBtn: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    background: "linear-gradient(135deg, #5A8A8E 0%, #2B5054 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "12px 28px",
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 2px 8px rgba(42, 123, 189, 0.2)",
  },
  cancelBtn: {
    fontFamily: "'DM Sans', sans-serif",
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
    borderTop: "1px solid rgba(43, 80, 84, 0.15)",
    background: "rgba(248, 252, 255, 0.5)",
    padding: 24,
    marginTop: 80,
  },
  footerContent: {
    maxWidth: 1400,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    color: "#7B8F92",
    fontWeight: 500,
  },
  footerLink: {
    color: "#5A8A8E",
    textDecoration: "none",
    borderBottom: "1px solid rgba(173, 216, 230, 0.4)",
    fontWeight: 600,
    paddingBottom: 2,
  },
  // About Section
  aboutContent: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "40px 0",
  },
  aboutCard: {
    background: "transparent",
    padding: "30px 0",
    borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
  },
  aboutCardTitle: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    color: "#5A8A8E",
    margin: "0 0 16px 0",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  aboutText: {
    fontFamily: "'Lora', serif",
    fontSize: 18,
    lineHeight: 1.8,
    color: "#444",
    margin: "0 0 16px 0",
  },
  aboutConnectLink: {
    color: "#2B5054",
    cursor: "pointer",
    borderBottom: "1px solid rgba(42, 123, 189, 0.3)",
    paddingBottom: 1,
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
    fontFamily: "'Lora', serif",
    fontSize: 24,
    color: "#2B5054",
    margin: 0,
    textAlign: "center",
  },
  contactIconsRow: {
    display: "flex",
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
    fontFamily: "'DM Sans', sans-serif",
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
    fontFamily: "'Lora', serif",
    fontSize: 44,
    fontWeight: 600,
    fontStyle: "italic",
    color: "#2F3F42",
    margin: "0 0 26px",
    lineHeight: 1.25,
    letterSpacing: "-0.5px",
  },
  laiHeroSub: {
    fontFamily: "'Lora', serif",
    fontSize: 18,
    lineHeight: 1.85,
    color: "#4F6669",
    margin: 0,
  },
  laiDivider: {
    height: 1,
    background: "rgba(173, 216, 230, 0.22)",
    margin: "56px 0",
  },
  laiAbout: {
    maxWidth: 700,
    margin: "0 auto",
  },
  laiAboutText: {
    fontFamily: "'Lora', serif",
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
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "2.5px",
    color: "#8EA1A4",
    textTransform: "uppercase",
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
    border: "1px solid rgba(173, 216, 230, 0.2)",
    borderRadius: 16,
    boxShadow: "0 2px 10px rgba(100, 130, 150, 0.05)",
  },
  laiPillarIcon: {
    fontSize: 26,
    flexShrink: 0,
    marginTop: 3,
  },
  laiPillarTitle: {
    fontFamily: "'Lora', serif",
    fontSize: 20,
    fontWeight: 600,
    fontStyle: "italic",
    color: "#2F3F42",
    margin: "0 0 10px",
  },
  laiPillarText: {
    fontFamily: "'Lora', serif",
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
    background: "rgba(173, 216, 230, 0.05)",
    border: "1px solid rgba(173, 216, 230, 0.15)",
    borderRadius: 12,
  },
  laiToolName: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    color: "#3F5F63",
    letterSpacing: "0.3px",
  },
  laiToolDesc: {
    fontFamily: "'Lora', serif",
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
    fontFamily: "'Lora', serif",
    fontSize: 18,
    lineHeight: 1.8,
    color: "#4B5E61",
    fontStyle: "italic",
    margin: 0,
  },
  laiCtaBtn: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    background: "linear-gradient(135deg, #5A8A8E 0%, #2B5054 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "16px 36px",
    cursor: "pointer",
    fontWeight: 700,
    letterSpacing: "0.5px",
    boxShadow: "0 3px 14px rgba(122, 184, 212, 0.25)",
  },
  laiNavBtn: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    background: "rgba(122, 184, 212, 0.1)",
    color: "#2B5054",
    border: "1px solid rgba(122, 184, 212, 0.35)",
    borderRadius: 20,
    padding: "8px 18px",
    cursor: "pointer",
    fontWeight: 600,
    letterSpacing: "0.3px",
  },
  toolCard: {
    background: "#fff",
    border: "1px solid rgba(122, 184, 212, 0.2)",
    borderRadius: 16,
    padding: "24px 28px",
    boxShadow: "0 2px 12px rgba(100, 130, 150, 0.07)",
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
    fontFamily: "'Lora', serif",
    fontSize: 20,
    fontWeight: 700,
    color: "#2B5054",
    margin: 0,
  },
  toolCardTagline: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    color: "#7B8F92",
    fontWeight: 500,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    marginTop: 4,
    display: "block",
  },
  toolCardBadge: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    color: "#2B5054",
    background: "rgba(122, 184, 212, 0.15)",
    border: "1px solid rgba(122, 184, 212, 0.4)",
    borderRadius: 20,
    padding: "3px 10px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  toolCardDesc: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    lineHeight: 1.7,
    color: "#4B5E61",
    margin: 0,
  },
  toolCardBtn: {
    display: "inline-block",
    alignSelf: "flex-start",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    color: "#fff",
    background: "linear-gradient(135deg, #5A8A8E 0%, #2B5054 100%)",
    borderRadius: 10,
    padding: "10px 22px",
    textDecoration: "none",
    letterSpacing: "0.3px",
    boxShadow: "0 3px 10px rgba(122, 184, 212, 0.25)",
  },
  toolCardPlaceholder: {
    background: "rgba(248, 250, 251, 0.8)",
    border: "1px dashed rgba(122, 184, 212, 0.3)",
    borderRadius: 16,
    padding: "24px 28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  toolCardPlaceholderText: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    color: "#8EA1A4",
    fontStyle: "italic",
  },
};

// FONTS
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  const link = document.createElement("link");
  link.href = "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
})();

// ─── Mount ────────────────────────────────────────────────────────────────────
const { StrictMode } = React;
const { createRoot } = ReactDOM;
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
