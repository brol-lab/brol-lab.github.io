async function loadNews(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("news.json must be an array");
  return data;
}

function formatWhen(dateStr) {
  // dateStr: YYYY-MM-DD
  const d = new Date(dateStr + "T00:00:00");
  const month = d.toLocaleString("en-US", { month: "short" });
  return `${month} ${d.getFullYear()}`;
}

function escapeHtml(s) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderTimeline(items, mountEl) {
  const html = items.map(item => {
    const links = (item.links || [])
      .map(l => `<a class="link" href="${escapeHtml(l.url)}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a>`)
      .join(" · ");

    return `
      <div class="item">
        <div class="when">${escapeHtml(formatWhen(item.date))}</div>
        <div class="card">
          <div class="meta-row">
            <span class="tag">${escapeHtml(item.tag)}</span>
            <span>${escapeHtml(item.venue)}</span>
          </div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.summary)}</p>
          ${links ? `<div style="margin-top:10px;">${links}</div>` : ""}
        </div>
      </div>
    `;
  }).join("");

  mountEl.innerHTML = html || `<div class="card">No news items found.</div>`;
}

(async function main() {
  const homeMount = document.getElementById("home-news");     // Home: top 3
  const newsMount = document.getElementById("news-list");     // News page: all
  const errEl = document.getElementById("news-error");

  if (!homeMount && !newsMount) return;

  try {
    const data = await loadNews("news.json");

    // Sort newest first
    data.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

    if (homeMount) {
      renderTimeline(data.slice(0, 3), homeMount);
    }
    if (newsMount) {
      renderTimeline(data, newsMount);
    }
  } catch (e) {
    console.error(e);
    if (errEl) errEl.textContent = e.message;
  }
})();
