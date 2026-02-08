async function loadBibtex(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

// A minimal BibTeX parser that handles nested braces reasonably well (static-site friendly).
function parseBibtex(text) {
  // remove % comments
  const cleaned = text.replace(/^\s*%.*$/gm, "").trim();
  const entries = [];

  let i = 0;
  while (i < cleaned.length) {
    const at = cleaned.indexOf("@", i);
    if (at === -1) break;
    i = at + 1;

    // read type
    let type = "";
    while (i < cleaned.length && /[A-Za-z]/.test(cleaned[i])) {
      type += cleaned[i++];
    }
    type = type.toLowerCase();

    // skip spaces
    while (i < cleaned.length && /\s/.test(cleaned[i])) i++;

    // opening brace/paren
    const open = cleaned[i];
    if (open !== "{" && open !== "(") { i++; continue; }
    const close = open === "{" ? "}" : ")";
    i++;

    // read key until first comma at depth 0
    let key = "";
    while (i < cleaned.length && cleaned[i] !== ",") {
      key += cleaned[i++];
    }
    key = key.trim();
    if (cleaned[i] === ",") i++;

    // read body until matching close with brace depth
    let depth = 1;
    let body = "";
    while (i < cleaned.length && depth > 0) {
      const ch = cleaned[i++];
      if (ch === open) depth++;
      if (ch === close) depth--;
      if (depth > 0) body += ch;
    }

    const fields = parseFields(body);
    entries.push({ type, key, fields });
  }

  return entries;
}

function parseFields(body) {
  const out = {};
  let token = "";
  let depth = 0;
  let inQuote = false;

  const pushToken = () => {
    const t = token.trim();
    token = "";
    if (!t) return;
    const eq = t.indexOf("=");
    if (eq === -1) return;
    const k = t.slice(0, eq).trim().toLowerCase();
    let v = t.slice(eq + 1).trim();

    // remove trailing comma
    v = v.replace(/,\s*$/, "").trim();

    // strip braces/quotes (outer)
    v = stripOuter(v);

    out[k] = v;
  };

  for (let i = 0; i < body.length; i++) {
    const ch = body[i];

    if (ch === '"' && depth === 0) inQuote = !inQuote;
    if (!inQuote) {
      if (ch === "{") depth++;
      if (ch === "}") depth = Math.max(0, depth - 1);
    }

    if (ch === "," && depth === 0 && !inQuote) {
      pushToken();
    } else {
      token += ch;
    }
  }
  pushToken();
  return out;
}

function stripOuter(v) {
  let s = v.trim();
  // { ... }
  if (s.startsWith("{") && s.endsWith("}")) {
    s = s.slice(1, -1).trim();
  }
  // " ... "
  if (s.startsWith('"') && s.endsWith('"')) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

function splitAuthors(authorStr) {
  if (!authorStr) return [];
  return authorStr
    .split(/\s+and\s+/i)
    .map(s => s.trim())
    .filter(Boolean);
}

function guessVenue(fields) {
  return fields.booktitle || fields.journal || fields.howpublished || fields.publisher || fields.institution || "";
}

function guessPaperUrl(fields) {
  if (fields.paperurl) return fields.paperurl;
  if (fields.pdf) return fields.pdf;
  if (fields.url) return fields.url;
  if (fields.doi) return `https://doi.org/${fields.doi}`;
  return "";
}

function guessProjectUrl(fields) {
  return fields.projecturl || fields.project || fields.code || fields.website || fields.homepage || "";
}

function humanType(t) {
  switch (t) {
    case "inproceedings": return "Conference";
    case "article": return "Journal";
    case "misc": return "Preprint";
    case "techreport": return "Tech Report";
    case "phdthesis": return "Thesis";
    default: return (t || "Paper").replace(/^\w/, c => c.toUpperCase());
  }
}

function escapeHtml(s) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderPublications(entries, mountEl) {
  // sort by year desc, then title
  const normalized = entries.map(e => {
    const f = e.fields || {};
    const year = parseInt(f.year || "0", 10) || 0;
    const title = f.title || e.key || "Untitled";
    return { ...e, year, title };
  }).sort((a, b) => (b.year - a.year) || (a.title.localeCompare(b.title)));

  let currentYear = null;
  let html = "";

  for (const e of normalized) {
    const f = e.fields || {};
    const title = f.title || e.key || "Untitled";
    const authors = splitAuthors(f.author).join(", ");
    const venue = guessVenue(f);
    const year = e.year || "";
    const paperUrl = guessPaperUrl(f);
    const projectUrl = guessProjectUrl(f);

    if (year && year !== currentYear) {
      currentYear = year;
      html += `<div class="year-label">${escapeHtml(year)}</div>`;
    }

    html += `
      <div class="card pub-card">
        <div class="meta-row">
          <span class="tag">${escapeHtml(humanType(e.type))}${year ? ` · ${escapeHtml(year)}` : ""}</span>
          <span>${escapeHtml(venue)}</span>
        </div>

        <h3 class="pub-title">${escapeHtml(title)}</h3>
        <div class="pub-authors">${escapeHtml(authors)}</div>

        <div class="pub-actions">
          ${paperUrl ? `<a class="btn primary small" href="${escapeHtml(paperUrl)}" target="_blank" rel="noopener">Paper</a>` : ""}
          ${projectUrl ? `<a class="btn small" href="${escapeHtml(projectUrl)}" target="_blank" rel="noopener">Project Page</a>` : ""}
        </div>
      </div>
    `;
  }

  mountEl.innerHTML = html || `<div class="card">No publications found in <code>publications.bib</code>.</div>`;
}

(async function main() {
  const mount = document.getElementById("pub-list");
  const err = document.getElementById("pub-error");
  if (!mount) return;

  try {
    const bib = await loadBibtex("publications.bib");
    const entries = parseBibtex(bib);
    renderPublications(entries, mount);
  } catch (e) {
    console.error(e);
    if (err) err.textContent = `Failed to load publications.bib. ${e.message}`;
  }
})();
