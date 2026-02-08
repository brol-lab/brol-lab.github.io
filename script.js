:root{
  --bg: #0b1220;
  --bg2:#0a1630;
  --surface: rgba(255,255,255,0.06);
  --surface2: rgba(255,255,255,0.08);
  --border: rgba(255,255,255,0.12);

  --text: rgba(255,255,255,0.92);
  --muted: rgba(255,255,255,0.70);
  --dim: rgba(255,255,255,0.55);

  --accent: #5eead4; /* teal */
  --accent2:#60a5fa; /* blue */
  --warn:#fbbf24;

  --shadow: 0 18px 40px rgba(0,0,0,0.35);
  --radius: 18px;
  --radius2: 26px;
}

*{ box-sizing:border-box; }
html{ scroll-behavior:smooth; }
body{
  margin:0;
  color:var(--text);
  background:
    radial-gradient(1200px 600px at 10% 0%, rgba(96,165,250,0.18), transparent 60%),
    radial-gradient(900px 600px at 90% 10%, rgba(94,234,212,0.12), transparent 55%),
    radial-gradient(700px 500px at 30% 90%, rgba(96,165,250,0.10), transparent 60%),
    linear-gradient(180deg, var(--bg), var(--bg2));
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
  line-height:1.6;
}

a{ color:inherit; }
img{ max-width:100%; display:block; }

.container{
  width:min(1160px, calc(100% - 44px));
  margin:0 auto;
}

.skip{
  position:absolute;
  left:-999px; top:auto;
  width:1px; height:1px;
  overflow:hidden;
}
.skip:focus{
  left:18px; top:18px;
  width:auto; height:auto;
  padding:10px 12px;
  border-radius:12px;
  background:rgba(255,255,255,0.12);
  border:1px solid var(--border);
  z-index:999;
}

/* Header / Nav */
.site-header{
  position:sticky;
  top:0;
  z-index:50;
  backdrop-filter: blur(10px);
  background: rgba(10,18,32,0.55);
  border-bottom:1px solid var(--border);
}
.header-inner{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:14px 0;
  gap:14px;
}
.brand{
  text-decoration:none;
  display:flex;
  align-items:center;
  gap:10px;
  font-weight:900;
  letter-spacing:0.2px;
}
.brand-badge{
  padding:6px 10px;
  border-radius:999px;
  background: linear-gradient(135deg, rgba(94,234,212,0.22), rgba(96,165,250,0.22));
  border:1px solid rgba(255,255,255,0.14);
  box-shadow: 0 10px 30px rgba(0,0,0,0.25);
}
.brand small{
  display:block;
  font-weight:700;
  color:var(--muted);
  letter-spacing:0.4px;
}
.brand strong{
  display:block;
  font-size:16px;
}
.nav-toggle{
  display:none;
  width:44px;
  height:40px;
  border-radius:14px;
  background:rgba(255,255,255,0.06);
  border:1px solid var(--border);
  cursor:pointer;
}
.nav-toggle span{
  display:block;
  width:18px; height:2px;
  background:var(--text);
  margin:4px auto;
  border-radius:2px;
  opacity:0.9;
}
.site-nav{
  display:flex;
  align-items:center;
  gap:10px;
}
.site-nav a{
  text-decoration:none;
  color:var(--muted);
  font-weight:800;
  padding:10px 12px;
  border-radius:14px;
  border:1px solid transparent;
}
.site-nav a:hover{
  color:var(--text);
  background:rgba(255,255,255,0.06);
  border-color:rgba(255,255,255,0.10);
}
.site-nav a.active{
  color:var(--text);
  background:rgba(255,255,255,0.08);
  border-color:rgba(255,255,255,0.14);
}

/* Hero */
.hero{
  padding:48px 0 18px;
}
.hero-card{
  position:relative;
  border-radius:var(--radius2);
  border:1px solid rgba(255,255,255,0.14);
  background:
    radial-gradient(900px 400px at 20% 0%, rgba(96,165,250,0.16), transparent 60%),
    radial-gradient(700px 420px at 85% 20%, rgba(94,234,212,0.14), transparent 60%),
    rgba(255,255,255,0.06);
  box-shadow: var(--shadow);
  overflow:hidden;
}
.hero-card::before{
  content:"";
  position:absolute;
  inset:-2px;
  background:
    radial-gradient(closest-side at 30% 20%, rgba(94,234,212,0.16), transparent 70%),
    radial-gradient(closest-side at 80% 30%, rgba(96,165,250,0.16), transparent 70%);
  filter: blur(20px);
  opacity:0.8;
  pointer-events:none;
}
.hero-grid{
  position:relative;
  display:grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap:22px;
  padding:28px;
  align-items:center;
}
.kicker{
  display:inline-flex;
  gap:8px;
  align-items:center;
  font-weight:900;
  color:var(--muted);
  letter-spacing:0.7px;
  text-transform:uppercase;
  font-size:12px;
}
.dot{
  width:8px; height:8px; border-radius:999px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  box-shadow: 0 0 0 6px rgba(94,234,212,0.08);
}
.hero h1{
  margin:10px 0 10px;
  font-size: clamp(34px, 4.2vw, 56px);
  line-height:1.06;
  letter-spacing:-0.02em;
}
.hero p{
  margin:0;
  color:var(--muted);
  font-size: 18px;
}
.hero-meta{
  margin-top:12px;
  color:var(--dim);
  font-weight:800;
}
.pills{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  margin-top:16px;
}
.pill{
  padding:8px 10px;
  border-radius:999px;
  border:1px solid rgba(255,255,255,0.14);
  background:rgba(255,255,255,0.06);
  color:rgba(255,255,255,0.80);
  font-weight:800;
  font-size:13px;
}
.hero-actions{
  display:flex;
  gap:10px;
  margin-top:18px;
}
.btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:10px 14px;
  border-radius:14px;
  border:1px solid rgba(255,255,255,0.14);
  background:rgba(255,255,255,0.06);
  text-decoration:none;
  font-weight:900;
  color:var(--text);
}
.btn.primary{
  border:none;
  background: linear-gradient(135deg, rgba(94,234,212,0.92), rgba(96,165,250,0.92));
  color:#07101c;
}
.hero-media{
  border-radius:22px;
  border:1px solid rgba(255,255,255,0.14);
  background:rgba(255,255,255,0.05);
  overflow:hidden;
  height: 290px;
}
.hero-media img{
  width:100%;
  height:100%;
  object-fit:cover;
  opacity:0.92;
}

/* Sections */
.section{
  padding:40px 0;
}
.section-head{
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap:12px;
  margin-bottom:16px;
}
.section-head h2{
  margin:0;
  font-size:26px;
  letter-spacing:-0.01em;
}
.section-head p{
  margin:0;
  color:var(--muted);
  font-weight:700;
}

.surface{
  border-radius: var(--radius2);
  border:1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  box-shadow: var(--shadow);
  overflow:hidden;
}
.pad{ padding:20px; }

.grid-2{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:14px;
}
.grid-3{
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap:14px;
}

/* Cards */
.card{
  border-radius: var(--radius);
  border:1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  padding:16px;
  box-shadow: 0 12px 28px rgba(0,0,0,0.25);
  transition: transform .18s ease, border-color .18s ease, background .18s ease;
}
.card:hover{
  transform: translateY(-2px);
  border-color: rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.08);
}
.card h3{
  margin:8px 0 8px;
  font-size:18px;
}
.card p{ margin:0; color:var(--muted); }
.meta-row{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  color:var(--dim);
  font-weight:800;
  font-size:13px;
}
.tag{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:6px 10px;
  border-radius:999px;
  border:1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.82);
  font-weight:900;
  font-size:12px;
}

/* Home: about split */
.split{
  display:grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap:14px;
  align-items:start;
}
.lead{
  font-size:16px;
  color:var(--muted);
}
.kv{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:12px;
}
.kv .card{ padding:14px; }
.kv strong{ display:block; font-size:13px; letter-spacing:0.2px; }
.kv span{ display:block; color:var(--muted); margin-top:6px; font-weight:700; }

.timeline{
  display:grid;
  gap:12px;
}
.item{
  display:grid;
  grid-template-columns: 84px 1fr;
  gap:12px;
  align-items:start;
}
.when{
  font-weight:900;
  color:rgba(255,255,255,0.78);
  font-size:13px;
  padding-top:8px;
}
.item .card{ padding:14px; }

/* People */
.person{
  display:grid;
  grid-template-columns: 220px 1fr;
  gap:16px;
  align-items:stretch;
}
.avatar{
  border-radius: 22px;
  border:1px solid rgba(255,255,255,0.14);
  overflow:hidden;
  background: rgba(255,255,255,0.04);
}
.avatar img{
  width:100%;
  height:100%;
  object-fit:cover;
}
.person h3{ margin:0; }
.person .role{
  margin-top:4px;
  color:var(--dim);
  font-weight:900;
}
.person .bio{
  margin-top:10px;
  color:var(--muted);
}
.person ul{
  margin:12px 0 0;
  padding-left:18px;
  color:var(--muted);
}
.people-grid{
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap:14px;
}
.mini{
  display:flex;
  gap:12px;
  align-items:flex-start;
}
.mini .ph{
  width:46px; height:46px;
  border-radius:16px;
  border:1px solid rgba(255,255,255,0.14);
  background: linear-gradient(135deg, rgba(94,234,212,0.18), rgba(96,165,250,0.18));
}
.mini .name{
  font-weight:950;
  margin:0;
}
.mini .small{
  margin-top:4px;
  color:var(--muted);
  font-weight:700;
  font-size:13px;
}

/* Research */
.feature{
  display:grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap:16px;
  align-items:center;
}
.feature .shot{
  border-radius:22px;
  border:1px solid rgba(255,255,255,0.14);
  overflow:hidden;
  height:220px;
  background: rgba(255,255,255,0.05);
}
.feature .shot img{
  width:100%; height:100%;
  object-fit:cover;
  opacity:0.92;
}
.feature h3{ margin:0 0 8px; }
.feature p{ margin:0; color:var(--muted); }
.feature .pills{ margin-top:12px; }

/* Publications */
.controls{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  align-items:center;
  justify-content:space-between;
  margin: 10px 0 16px;
}
.search{
  flex: 1;
  min-width: 240px;
  display:flex;
  align-items:center;
  gap:10px;
  padding:10px 12px;
  border-radius:14px;
  border:1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
}
.search input{
  width:100%;
  border:none;
  outline:none;
  background:transparent;
  color:var(--text);
  font-weight:800;
}
.chips{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
}
.chip{
  cursor:pointer;
  padding:8px 12px;
  border-radius:999px;
  border:1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
  color:var(--muted);
  font-weight:900;
}
.chip.active{
  color:#07101c;
  border:none;
  background: linear-gradient(135deg, rgba(94,234,212,0.92), rgba(96,165,250,0.92));
}
.pub{
  display:grid;
  gap:12px;
}
.pub .title{ font-weight:950; margin:0; }
.pub .authors{ color:var(--muted); margin-top:6px; font-weight:700; }
.pub .links{
  display:flex;
  flex-wrap:wrap;
  gap:12px;
  margin-top:10px;
}
.link{
  text-decoration:none;
  font-weight:900;
  color: rgba(96,165,250,0.95);
}
.link:hover{ text-decoration:underline; }

/* Gallery */
.masonry{
  display:grid;
  grid-template-columns: repeat(12, 1fr);
  gap:12px;
}
.tile{
  border-radius:22px;
  border:1px solid rgba(255,255,255,0.14);
  overflow:hidden;
  background: rgba(255,255,255,0.05);
  height: 220px;
}
.tile img{ width:100%; height:100%; object-fit:cover; opacity:0.92; }
.span-4{ grid-column: span 4; }
.span-5{ grid-column: span 5; }
.span-7{ grid-column: span 7; }

/* Join */
.callout{
  border-radius: var(--radius2);
  border:1px dashed rgba(94,234,212,0.35);
  background: rgba(94,234,212,0.06);
  padding:16px;
}
.callout code{
  padding:2px 8px;
  border-radius:10px;
  background: rgba(255,255,255,0.08);
  border:1px solid rgba(255,255,255,0.14);
}

/* Footer */
.footer{
  border-top:1px solid rgba(255,255,255,0.10);
  padding:26px 0;
  margin-top: 18px;
}
.footer-grid{
  display:flex;
  justify-content:space-between;
  gap:16px;
  align-items:flex-start;
  flex-wrap:wrap;
}
.footer a{
  color:var(--muted);
  text-decoration:none;
  font-weight:900;
}
.footer a:hover{ color:var(--text); }

/* Responsive */
@media (max-width: 980px){
  .hero-grid{ grid-template-columns:1fr; }
  .hero-media{ height:260px; }
  .split{ grid-template-columns:1fr; }
  .grid-2{ grid-template-columns:1fr; }
  .grid-3{ grid-template-columns:1fr; }
  .person{ grid-template-columns:1fr; }
  .people-grid{ grid-template-columns:1fr; }
  .feature{ grid-template-columns:1fr; }
  .masonry{ grid-template-columns: repeat(6, 1fr); }
  .span-7{ grid-column: span 6; }
  .span-5{ grid-column: span 6; }
  .span-4{ grid-column: span 6; }

  .nav-toggle{ display:inline-block; }
  .site-nav{
    position:absolute;
    right:22px;
    top:66px;
    display:none;
    flex-direction:column;
    align-items:stretch;
    gap:6px;
    min-width: 240px;
    padding:10px;
    border-radius:18px;
    background: rgba(10,18,32,0.78);
    border:1px solid rgba(255,255,255,0.14);
    box-shadow: var(--shadow);
  }
  .site-nav.open{ display:flex; }
}

// Mobile nav
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Active nav based on body[data-page]
const page = document.body?.dataset?.page;
if (page) {
  document.querySelectorAll("[data-nav]").forEach(a => {
    if (a.dataset.nav === page) a.classList.add("active");
  });
}

// Footer year
const y = document.getElementById("year");
if (y) y.textContent = String(new Date().getFullYear());

// Publications: filter + search (only runs if elements exist)
const pubWrap = document.querySelector("[data-pubs]");
const chips = document.querySelectorAll(".chip");
const searchInput = document.querySelector("[data-search]");
const items = document.querySelectorAll("[data-pub]");

function applyPubFilter() {
  if (!items.length) return;
  const activeChip = document.querySelector(".chip.active");
  const filter = activeChip ? activeChip.dataset.filter : "all";
  const q = (searchInput?.value || "").trim().toLowerCase();

  items.forEach(el => {
    const tags = (el.dataset.tags || "").split(/\s+/);
    const text = (el.innerText || "").toLowerCase();
    const okTag = filter === "all" ? true : tags.includes(filter);
    const okQ = q ? text.includes(q) : true;
    el.style.display = (okTag && okQ) ? "block" : "none";
  });
}

if (pubWrap && chips.length) {
  chips.forEach(c => {
    c.addEventListener("click", () => {
      chips.forEach(x => x.classList.remove("active"));
      c.classList.add("active");
      applyPubFilter();
    });
  });
  searchInput?.addEventListener("input", applyPubFilter);
  applyPubFilter();
}
