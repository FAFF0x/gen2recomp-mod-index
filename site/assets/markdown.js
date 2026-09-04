// A small markdown renderer. Deliberately not a full one: descriptions come
// from pull requests, so everything is HTML-escaped first and raw HTML is
// never passed through. Supported: headings, bold/italic/code, fenced code,
// links, images, lists, blockquotes, rules, paragraphs.

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Only ever emit links we would follow ourselves.
const safeUrl = (url) => (/^(https?:|mailto:|#|\.?\/)/i.test(url.trim()) ? url.trim() : '#');

function inline(text) {
  let out = escapeHtml(text);
  // Park code spans behind a sentinel that cannot survive markdown syntax,
  // so emphasis rules never chew through `*not_emphasis*`.
  const codes = [];
  out = out.replace(/`([^`]+)`/g, (_, code) => `\u0000${codes.push(code) - 1}\u0000`);
  out = out.replace(/!\[([^\]]*)\]\(([^)\s]+)[^)]*\)/g, (_, alt, src) => `<img src="${safeUrl(src)}" alt="${alt}">`);
  out = out.replace(
    /\[([^\]]+)\]\(([^)\s]+)[^)]*\)/g,
    (_, label, href) => `<a href="${safeUrl(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`,
  );
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(^|\W)_([^_]+)_(?=\W|$)/g, '$1<em>$2</em>');
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  out = out.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[Number(i)]}</code>`);
  return out;
}

export function renderMarkdown(source) {
  const lines = String(source).replace(/\r\n?/g, '\n').split('\n');
  const html = [];
  let list = null; // 'ul' | 'ol'
  let inFence = false;
  let fence = [];

  const closeList = () => {
    if (list) {
      html.push(`</${list}>`);
      list = null;
    }
  };

  for (const line of lines) {
    if (/^```/.test(line)) {
      if (inFence) {
        html.push(`<pre><code>${escapeHtml(fence.join('\n'))}</code></pre>`);
        fence = [];
        inFence = false;
      } else {
        closeList();
        inFence = true;
      }
      continue;
    }
    if (inFence) {
      fence.push(line);
      continue;
    }

    if (!line.trim()) {
      closeList();
      continue;
    }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      closeList();
      html.push('<hr>');
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      closeList();
      const level = Math.min(heading[1].length + 1, 6); // page owns <h1>
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }

    const quote = /^>\s?(.*)$/.exec(line);
    if (quote) {
      closeList();
      html.push(`<blockquote>${inline(quote[1])}</blockquote>`);
      continue;
    }

    const bullet = /^\s*[-*+]\s+(.*)$/.exec(line);
    const numbered = /^\s*\d+[.)]\s+(.*)$/.exec(line);
    if (bullet || numbered) {
      const want = bullet ? 'ul' : 'ol';
      if (list !== want) {
        closeList();
        html.push(`<${want}>`);
        list = want;
      }
      html.push(`<li>${inline((bullet || numbered)[1])}</li>`);
      continue;
    }

    closeList();
    html.push(`<p>${inline(line)}</p>`);
  }

  if (inFence) html.push(`<pre><code>${escapeHtml(fence.join('\n'))}</code></pre>`);
  closeList();
  return html.join('\n');
}
