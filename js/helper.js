/* Study helper: a side panel for asking questions about the module notes.
   It finds the sections of Topics 1–13 that best match a question with a small keyword
   search, sends them to Claude with the question, and links the answer back to the
   sections it used. It answers in one of three ways:
   1. Inside claude.ai: the artifact's `sample` capability, on the viewer's own Claude account.
   2. Anywhere else: the viewer's own Claude API key, kept in this browser only.
   3. With neither: it shows the passages of the notes that best match the question. */
(function () {
  'use strict';
  const app = ECON.app;
  if (!app) return;

  const KEY_STORE = 'marginal-notes-api-key';
  const SDK_URL = 'https://cdn.jsdelivr.net/npm/@anthropic-ai/sdk@0.129.0/+esm';
  const MODEL = 'claude-opus-5-5';
  const inClaude = !!(window.claude && typeof window.claude.use === 'function');

  const esc = str => String(str).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  const clean = s => String(s).replace(/\s+/g, ' ').trim();
  const smooth = () => (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');
  const parser = new DOMParser();
  const plain = html => clean(parser.parseFromString('<div>' + html + '</div>', 'text/html').body.textContent);

  /* ======================================================================
     Search: split the lessons into sections and rank them with BM25
     ====================================================================== */
  const STOP = new Set(('a an and are as at be been but by can could did do does doing for from had has have how i if in into is it its ' +
    'me my of on or our so than that the their them then there these they this those to too us was we were what when where which while ' +
    'who why will with would you your about also any both each more most other some such only own same just very should please tell ' +
    'explain explained explaining meaning mean means define definition describe give example examples note notes topic topics lesson ' +
    'help understand know get got really want need like go does whats hows').split(' '));
  const ABBR = {
    ped: 'price elasticity demand', pes: 'price elasticity supply', yed: 'income elasticity demand', xed: 'cross elasticity demand',
    mc: 'marginal cost', mr: 'marginal revenue', ar: 'average revenue', tr: 'total revenue', tc: 'total cost',
    atc: 'average total cost', avc: 'average variable cost', afc: 'average fixed cost', tfc: 'total fixed cost', tvc: 'total variable cost',
    mp: 'marginal product', ap: 'average product', tp: 'total product', lrac: 'long run average cost', srac: 'short run average cost',
    ppc: 'production possibility curve', ppf: 'production possibility curve', gdp: 'gross domestic product', gnp: 'gross national product',
    cpi: 'consumer price index', mpc: 'marginal propensity consume', mps: 'marginal propensity save', rrr: 'reserve requirement ratio',
    mas: 'monetary authority singapore', ad: 'aggregate demand', lras: 'long run aggregate supply', sras: 'short run aggregate supply',
    yf: 'full employment output', ms: 'money supply', md: 'money demand', dwl: 'deadweight loss', cs: 'consumer surplus',
    ps: 'producer surplus', eos: 'economies scale', dos: 'diseconomies scale', gst: 'goods services tax', ier: 'initial excess reserves',
    labor: 'labour'
  };
  function stem(w) {
    if (w.length <= 3 || /\d/.test(w)) return w;
    w = w.replace(/iz(e|es|ed|ing|ation|ations)$/, 'is$1');
    if (/isations?$/.test(w)) w = w.replace(/isations?$/, 'is');
    else if (/ies$/.test(w)) w = w.slice(0, -3) + 'y';
    else if (/(sses|xes|ches|shes)$/.test(w)) w = w.slice(0, -2);
    else if (/[^su]s$/.test(w)) w = w.slice(0, -1);
    if (/ied$/.test(w)) w = w.slice(0, -3) + 'y';
    else if (/ing$/.test(w) && w.length > 5) w = w.slice(0, -3);
    else if (/ed$/.test(w) && w.length > 4) w = w.slice(0, -2);
    if (/ment$/.test(w) && w.length > 6) w = w.slice(0, -4);
    else if (/ity$/.test(w) && w.length > 5) w = w.slice(0, -3);
    else if (/ary$/.test(w) && w.length > 6) w = w.slice(0, -3);
    else if (/ness$/.test(w) && w.length > 6) w = w.slice(0, -4);
    else if (/ly$/.test(w) && w.length > 5) w = w.slice(0, -2);
    if (/e$/.test(w) && w.length > 4) w = w.slice(0, -1);
    return w;
  }
  function tokens(text) {
    const out = [];
    String(text).replace(/[’']/g, '').split(/[^A-Za-z0-9]+/).forEach(r => {
      if (!r) return;
      const w = r.toLowerCase();
      const ex = r === 'AS' ? 'aggregate supply' : ABBR[w];
      if (ex) ex.split(' ').forEach(x => out.push(stem(x)));
      if (STOP.has(w) || (w.length < 2 && !/\d/.test(w)) || w === 'labor') return;
      out.push(ex ? w : stem(w));
    });
    return out;
  }
  const bigrams = ts => { const b = new Set(); for (let i = 1; i < ts.length; i++) b.add(ts[i - 1] + ' ' + ts[i]); return b; };

  /* Lesson HTML → plain text that keeps list items and table rows readable. */
  const BLOCK = /^(P|DIV|UL|OL|TABLE|THEAD|TBODY|TR|H[1-6]|FIGURE|SECTION|BLOCKQUOTE|DL)$/;
  function flat(node) {
    let s = '';
    node.childNodes.forEach(n => {
      if (n.nodeType === 3) { s += n.nodeValue; return; }
      if (n.nodeType !== 1 || n.hasAttribute('data-widget')) return;
      const t = n.tagName;
      if (t === 'TD' || t === 'TH') s += clean(flat(n)) + ' | ';
      else if (t === 'LI' || t === 'DT') s += '\n- ' + clean(flat(n));
      else if (t === 'DD') s += ': ' + clean(flat(n));
      else if (t === 'BR') s += '\n';
      else if (BLOCK.test(t)) s += '\n' + flat(n) + '\n';
      else s += flat(n);
    });
    return s;
  }
  const tidy = s => s.split('\n').map(x => clean(x).replace(/\s*\|\s*$/, '')).filter(Boolean).join('\n');
  function pieces(text, max) {
    if (text.length <= max * 1.3) return [text];
    const out = [];
    let cur = '';
    text.split('\n').forEach(line => {
      if (cur && cur.length + line.length > max) { out.push(cur); cur = ''; }
      cur += (cur ? '\n' : '') + line;
    });
    if (cur) out.push(cur);
    return out;
  }

  let INDEX = null;
  function buildIndex() {
    const chunks = [];
    const add = (l, where, text, target, boost, kind) => {
      if (!text || text.length < 12) return;
      chunks.push({ lesson: l, where, text, target: Object.assign({ lessonId: l.id }, target), boost, kind });
    };
    ECON.lessons.forEach(l => {
      const tag = l.module ? `Topic ${l.n}` : `Go further · Lesson ${l.n}`;
      const w = l.module ? 1 : 0.55;
      /* The lesson text, one chunk per heading. Headings are counted in page order so a
         chunk can point at the same heading in the rendered lesson. */
      const root = parser.parseFromString('<div id="r">' + l.body + '</div>', 'text/html').getElementById('r');
      let sec = { title: l.title, target: { kind: 'top' }, parts: [] }, h2 = null, hIndex = -1;
      const flush = () => pieces(tidy(sec.parts.join('\n')), 1100).forEach(t =>
        add(l, `${tag} · ${sec.parent ? sec.parent + ' › ' : ''}${sec.title}`, sec.title + '\n' + t, sec.target, w, 'section'));
      [...root.children].forEach(el => {
        if (el.tagName === 'H2' || el.tagName === 'H3') {
          flush();
          hIndex++;
          const title = clean(el.textContent);
          sec = { title, parent: el.tagName === 'H3' ? h2 : null, target: { kind: 'heading', index: hIndex }, parts: [] };
          if (el.tagName === 'H2') h2 = title;
        } else sec.parts.push(flat(el));
      });
      flush();
      (l.terms || []).forEach(([t, d], i) => add(l, `${tag} · Key term: ${t}`, `${t}: ${d}`, { kind: 'term', index: i }, w * 1.1, 'term'));
      (l.review || []).forEach(([q, a], i) => add(l, `${tag} · Do you know? Q${i + 1}`, `${q}\n${plain(a)}`, { kind: 'review', index: i }, w, 'review'));
      if (l.blanks) {
        let group = null;
        const done = () => { if (group) add(l, `${tag} · Fill in your notes: ${group.sec}`, group.rows.join('\n'), { kind: 'blank', index: group.first }, w * 0.9, 'blank'); };
        l.blanks.forEach(([s, p, a], i) => {
          const secName = plain(s);
          if (!group || group.sec !== secName) { done(); group = { sec: secName, first: i, rows: [] }; }
          group.rows.push(`${plain(p)} → ${plain(a)}`);
        });
        done();
      }
      (l.quiz || []).forEach(q => add(l, `${tag} · Quiz`, `${q.q}\nAnswer: ${q.options[q.answer]}\n${plain(q.why || '')}`, { kind: 'section', id: '#quiz-host' }, w * 0.7, 'quiz'));
    });
    const df = new Map();
    let total = 0;
    chunks.forEach(c => {
      const head = tokens(c.where.split(' · ').slice(1).join(' '));
      const ts = head.concat(head, tokens(c.text));
      c.len = ts.length;
      total += ts.length;
      c.tf = new Map();
      ts.forEach(t => c.tf.set(t, (c.tf.get(t) || 0) + 1));
      c.bi = bigrams(ts);
      c.tf.forEach((_, t) => df.set(t, (df.get(t) || 0) + 1));
    });
    return { chunks, df, avg: total / chunks.length };
  }
  const index = () => INDEX || (INDEX = buildIndex());

  function search(question, k = 6) {
    const idx = index();
    const qTokens = tokens(question);
    const qt = [...new Set(qTokens)];
    const qb = bigrams(qTokens);
    const tm = question.match(/\btopic\s*(\d{1,2})\b/i);
    const topicN = tm ? +tm[1] : null;
    const cur = app.currentLesson();
    const N = idx.chunks.length, K1 = 1.2, B = 0.75;
    const scored = [];
    idx.chunks.forEach(c => {
      let s = 0;
      qt.forEach(t => {
        const f = c.tf.get(t);
        if (!f) return;
        const d = idx.df.get(t);
        s += Math.log(1 + (N - d + 0.5) / (d + 0.5)) * (f * (K1 + 1)) / (f + K1 * (1 - B + B * c.len / idx.avg));
      });
      if (!s) return;
      qb.forEach(b => { if (c.bi.has(b)) s += 1.5; });
      s *= c.boost;
      if (topicN && c.lesson.module && c.lesson.n === topicN) s *= 1.8;
      if (cur && c.lesson === cur) s *= 1.25;
      scored.push({ c, s });
    });
    scored.sort((a, b) => b.s - a.s);
    /* One result per place in the notes: when both halves of a long section match, join them. */
    const top = [], byKey = new Map();
    const best = scored.length ? scored[0].s : 0;
    for (const x of scored) {
      if (x.s < best * 0.22) break;
      const key = x.c.lesson.id + JSON.stringify(x.c.target);
      const have = byKey.get(key);
      if (have) {
        if (have.text.length < 2400) have.text += '\n' + x.c.text.split('\n').slice(1).join('\n');
        continue;
      }
      if (top.length >= k) continue;
      const r = Object.assign({}, x.c);
      byKey.set(key, r);
      top.push(r);
    }
    /* "Summarise topic 8" or "explain this page": fall back to that lesson's own sections. */
    const here = !qt.length || /\b(this|page|lesson|here)\b/i.test(question);
    const l = topicN ? ECON.lessons.find(x => x.module && x.n === topicN) : here ? cur : null;
    if (top.length < 2 && l) {
      idx.chunks.filter(c => c.lesson === l && c.kind === 'section' && !byKey.has(c.lesson.id + JSON.stringify(c.target)))
        .forEach(c => {
          const key = c.lesson.id + JSON.stringify(c.target);
          if (top.length >= k || byKey.has(key)) return;
          const r = Object.assign({}, c);
          byKey.set(key, r);
          top.push(r);
        });
    }
    return top;
  }

  /* The lines of a chunk that best match the question, with matching words marked. */
  function excerpt(c, question, max = 420) {
    const q = new Set(tokens(question));
    const lines = c.text.split('\n');
    let bestI = 0, bestS = -1;
    lines.forEach((line, i) => {
      const s = tokens(line).filter(t => q.has(t)).length;
      if (s > bestS) { bestS = s; bestI = i; }
    });
    let out = lines[bestI];
    for (let i = bestI + 1; i < lines.length && out.length < max * 0.7; i++) out += '\n' + lines[i];
    if (out.length > max) out = out.slice(0, max).replace(/\s+\S*$/, '') + '…';
    return esc(out).replace(/^- /gm, '• ').replace(/[A-Za-z][A-Za-z’']*/g, w => q.has(stem(w.toLowerCase().replace(/[’']/g, ''))) ? `<mark>${w}</mark>` : w).replace(/\n/g, '<br>');
  }

  /* ======================================================================
     Asking Claude
     ====================================================================== */
  const RULES = `You are the study helper on "Marginal Notes", a revision website for a student's economics module. The module has 13 topics: microeconomics (Topics 1–8: scarcity and the PPC, demand, supply, market equilibrium, elasticity, costs of production, market structures, profit maximisation and shutdown) and macroeconomics (Topics 9–13: unemployment and inflation, GDP and business cycles, aggregate demand and supply, fiscal policy, monetary policy in Singapore).

The student asks questions about their notes. Each question comes with numbered excerpts from the notes that a search picked out. Excerpts marked "Go further" come from the website's extra lessons, not the student's own notes.

How to answer:
- Start with the direct answer in one to three sentences.
- Then add a section headed "What it means" that explains the idea in plain words, as a patient tutor would, with one short concrete example (everyday or Singapore examples suit the notes).
- For a calculation, add a section headed "Working" and show each step using the formula from the notes.
- Use the notes' own terms, formulas and abbreviations (for example P = MR, AVC, multiplier = 1 ÷ MPS).
- Cite the excerpts you rely on by number in square brackets, like [1] or [2][4], straight after the sentence they support. Cite only excerpts that really support the sentence. If you use a "Go further" excerpt, say it is extra material rather than from their notes.
- If the excerpts don't cover the question, say "Your notes don't cover this directly." Then give a short general answer and say it isn't from the notes. If the question isn't about economics or this module, say briefly what you can help with.
- Keep answers under about 250 words unless the student asks for more. Use short paragraphs, "- " bullet points, **bold** for key terms and "### " for section headings. No tables and no LaTeX: write formulas in plain text, like PED = %ΔQd ÷ %ΔP.
- Earlier answers in the conversation cited earlier excerpts, so their numbers don't match this question's excerpts.`;

  function finalTurn(question, sources) {
    const cur = app.currentLesson();
    const ex = sources.length
      ? sources.map((c, i) => `[${i + 1}] ${c.where}\n${c.text.slice(0, 1600)}`).join('\n\n')
      : '(The search found nothing in the notes for this question.)';
    return `Excerpts from the notes:\n\n${ex}\n\n${cur ? `The student is reading ${cur.label}: ${cur.title}.\n\n` : ''}Question: ${question}`;
  }
  const history = []; // earlier turns: {role, content}, question text only on user turns
  function pastTurns() {
    return history.slice(-6).map(t => ({ role: t.role, content: t.content.length > 1800 ? t.content.slice(0, 1800) + '…' : t.content }));
  }

  let sample = null;
  let mode = 'pending'; // claude | key | notes
  const getKey = () => { try { return localStorage.getItem(KEY_STORE) || ''; } catch (e) { return ''; } };
  const setKey = v => { try { if (v) localStorage.setItem(KEY_STORE, v); else localStorage.removeItem(KEY_STORE); } catch (e) { /* storage blocked */ } };
  let ready = null; // resolves once we know which way the helper can answer (set up after the panel exists)

  const HIDE = new Set(['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed']);
  async function viaSample(question, sources, onText, signal) {
    const input = [{ role: 'user', content: RULES }, ...pastTurns(), { role: 'user', content: finalTurn(question, sources) }];
    try {
      const r = await sample(input, { onText: ({ text }) => onText(text), signal, cache: false });
      return { text: r.text, note: r.truncated ? 'The answer was cut short. Try asking about one part at a time.' : '' };
    } catch (e) {
      const code = e && e.code;
      if (code === 'cancelled') return { text: e.text || '', stopped: true };
      if (HIDE.has(code)) { sample = null; mode = 'notes'; renderMode(); return { error: 'Claude isn’t available in this view, so here’s what your notes say instead.', fallback: true }; }
      if (code === 'refused') return { error: 'Claude couldn’t answer that one. Try asking it a different way.', text: '' };
      if (code === 'rate_limited') return { error: 'You’ve reached a Claude usage limit for now. Try again in a little while.', text: e.text || '' };
      if (code === 'session_expired') return { error: 'Your Claude session has expired. Sign in again, then retry.', text: e.text || '' };
      return { error: 'Something went wrong while Claude was answering.', text: e.text || '', retry: true };
    }
  }

  let sdkPromise = null;
  const loadSdk = () => sdkPromise || (sdkPromise = import(SDK_URL).then(m => m.default || m.Anthropic).catch(err => { sdkPromise = null; throw err; }));
  async function viaKey(question, sources, onText, signal) {
    let Anthropic;
    try { Anthropic = await loadSdk(); }
    catch (e) { return { error: 'Couldn’t load the Claude library. Check your internet connection and try again.', retry: true }; }
    const client = new Anthropic({ apiKey: getKey(), dangerouslyAllowBrowser: true });
    let text = '';
    try {
      /* Claude Opus 5.5 with server-side refusal fallback: if Opus declines a request,
         the API re-runs it on Anthropic's recommended fallback model inside the same call. */
      const stream = client.beta.messages.stream({
        model: MODEL,
        max_tokens: 16000,
        betas: ['server-side-fallback-2026-07-01'],
        fallbacks: 'default',
        output_config: { effort: 'medium' },
        system: RULES,
        messages: [...pastTurns(), { role: 'user', content: finalTurn(question, sources) }]
      });
      signal.addEventListener('abort', () => stream.abort(), { once: true });
      stream.on('text', delta => { text += delta; onText(text); });
      const msg = await stream.finalMessage();
      if (msg.stop_reason === 'refusal') return { error: 'Claude couldn’t answer that one. Try asking it a different way.', text: '' };
      return { text, note: msg.stop_reason === 'max_tokens' ? 'The answer was cut short. Try asking about one part at a time.' : '' };
    } catch (err) {
      if (signal.aborted) return { text, stopped: true };
      const is = name => Anthropic[name] && err instanceof Anthropic[name];
      if (is('AuthenticationError')) return { error: 'That API key didn’t work. Check it in the helper settings.', text, settings: true };
      if (is('PermissionDeniedError')) return { error: 'That API key isn’t allowed to use this model. Check your Anthropic account.', text, settings: true };
      if (is('RateLimitError')) return { error: 'Your API key hit a rate limit. Wait a moment and try again.', text, retry: true };
      if (is('APIConnectionError')) return { error: 'Couldn’t reach Claude. Check your internet connection and try again.', text, retry: true };
      if (is('APIError') && err.status >= 500) return { error: 'Claude is busy or having problems right now. Try again shortly.', text, retry: true };
      return { error: 'Something went wrong: ' + (err && err.message ? err.message : 'unknown error') + '.', text, retry: true };
    }
  }

  /* ======================================================================
     Rendering answers: a small, safe Markdown subset with clickable citations
     ====================================================================== */
  function md(src, nSources) {
    const inline = s => s
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[(\d{1,2}(?:\s*,\s*\d{1,2})*)\]/g, (m, g) => g.split(/\s*,\s*/).map(n =>
        +n >= 1 && +n <= nSources ? `<button type="button" class="cite" data-n="${+n}" aria-label="Go to source ${+n} in your notes">${+n}</button>` : `[${n}]`).join(''));
    let html = '', para = [], list = null;
    const flushP = () => { if (para.length) { html += '<p>' + inline(para.join(' ')) + '</p>'; para = []; } };
    const flushL = () => { if (list) { html += `<${list.t}>${list.items.map(i => '<li>' + inline(i) + '</li>').join('')}</${list.t}>`; list = null; } };
    esc(src).split('\n').forEach(raw => {
      const line = raw.trim();
      let m;
      if (!line) { flushP(); flushL(); return; }
      if ((m = line.match(/^#{1,6}\s+(.+)$/)) || (m = line.match(/^\*\*([^*]+)\*\*:?$/))) { flushP(); flushL(); html += '<h3>' + inline(m[1].replace(/\*\*/g, '')) + '</h3>'; return; }
      if ((m = line.match(/^[-*•]\s+(.+)$/))) { flushP(); if (!list || list.t !== 'ul') { flushL(); list = { t: 'ul', items: [] }; } list.items.push(m[1]); return; }
      if ((m = line.match(/^\d{1,2}[.)]\s+(.+)$/))) { flushP(); if (!list || list.t !== 'ol') { flushL(); list = { t: 'ol', items: [] }; } list.items.push(m[1]); return; }
      if (list && /^\s{2,}/.test(raw)) { list.items[list.items.length - 1] += ' ' + line; return; }
      flushL();
      para.push(line);
    });
    flushP(); flushL();
    return html;
  }
  const cited = (text, n) => {
    const order = [];
    (text.match(/\[(\d{1,2}(?:\s*,\s*\d{1,2})*)\]/g) || []).forEach(m => m.slice(1, -1).split(/\s*,\s*/).forEach(x => {
      const i = +x;
      if (i >= 1 && i <= n && !order.includes(i)) order.push(i);
    }));
    return order;
  };

  /* ======================================================================
     The panel
     ====================================================================== */
  const fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'helper-fab';
  fab.setAttribute('aria-controls', 'helper');
  fab.setAttribute('aria-expanded', 'false');
  fab.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.6c-.5.4-1.3.1-1.3-.6V16A2.5 2.5 0 0 1 4 13.5z"/><path class="q" d="M9.6 7.6a2.4 2.4 0 1 1 3.3 2.2c-.6.3-.9.7-.9 1.3v.3M12 13.6v.1"/></svg><span class="fab-long">Ask about your notes</span><span class="fab-short">Ask</span>`;

  const panel = document.createElement('aside');
  panel.id = 'helper';
  panel.className = 'helper';
  panel.setAttribute('aria-label', 'Study helper');
  panel.hidden = true;
  panel.innerHTML = `
    <header class="hp-head">
      <div class="hp-title"><p class="hp-kicker">Study helper</p><h2>Ask about your notes</h2></div>
      <button type="button" class="hp-icon" data-act="clear" aria-label="Start a new conversation" title="New conversation" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4"/></svg></button>
      <button type="button" class="hp-icon" data-act="settings" aria-label="Helper settings" aria-expanded="false" aria-controls="hp-settings" title="Settings"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg></button>
      <button type="button" class="hp-icon" data-act="close" aria-label="Close the study helper" title="Close"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
    </header>
    <div class="hp-settings" id="hp-settings" hidden></div>
    <div class="hp-log"></div>
    <p class="hp-sr" aria-live="polite"></p>
    <form class="hp-form">
      <label class="hp-sr" for="hp-input">Your question</label>
      <textarea id="hp-input" rows="1" placeholder="Ask a question about Topics 1–13" autocomplete="off"></textarea>
      <div class="hp-form-row">
        <p class="hp-mode"></p>
        <button type="button" class="btn btn-small" data-act="stop" hidden>Stop</button>
        <button type="submit" class="btn btn-primary btn-small" data-act="ask">Ask</button>
      </div>
    </form>`;
  document.body.append(fab, panel);

  const $ = sel => panel.querySelector(sel);
  const log = $('.hp-log'), input = $('#hp-input'), form = $('.hp-form'), sr = $('p.hp-sr');
  const askBtn = $('[data-act="ask"]'), stopBtn = $('[data-act="stop"]'), clearBtn = $('[data-act="clear"]');
  const settingsBtn = $('[data-act="settings"]'), settings = $('#hp-settings'), modeLine = $('.hp-mode');
  const sourcesOf = new WeakMap();
  const wide = matchMedia('(min-width: 1180px)');
  let busy = false, ctl = null;

  function open() {
    panel.hidden = false;
    fab.setAttribute('aria-expanded', 'true');
    document.body.classList.add('helper-open');
    if (!log.children.length) renderEmpty();
    setTimeout(() => index(), 0);
    input.focus();
  }
  function close() {
    panel.hidden = true;
    fab.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('helper-open');
    fab.focus();
  }
  fab.addEventListener('click', () => (panel.hidden ? open() : close()));
  $('[data-act="close"]').addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !panel.hidden) {
      e.preventDefault();
      close();
    }
  });

  function suggestions() {
    const l = app.currentLesson();
    if (l && l.review && l.review.length) {
      const pool = l.review.map(r => r[0]).filter(q => q.length < 110);
      for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
      return { from: `From ${l.label}’s “Do you know?” questions`, list: pool.slice(0, 3) };
    }
    return {
      from: 'Try asking',
      list: [
        'When should a firm shut down in the short run?',
        'What’s the difference between a change in demand and a change in quantity demanded?',
        'How do I calculate the multiplier, and what does it mean?',
        'Why does the MAS use the exchange rate instead of interest rates?'
      ]
    };
  }
  function renderEmpty() {
    const s = suggestions();
    log.innerHTML = `
      <div class="hp-empty">
        <p>Ask anything about Topics 1–13. You’ll get the answer, what it means in plain words, and links to the parts of your notes it came from.</p>
        <p class="hp-label">${esc(s.from)}</p>
        <div class="hp-suggest">${s.list.map(q => `<button type="button" class="hp-chip">${esc(q)}</button>`).join('')}</div>
      </div>`;
  }
  window.addEventListener('hashchange', () => { if (!panel.hidden && log.querySelector('.hp-empty')) renderEmpty(); });

  function renderMode() {
    const txt = {
      pending: 'Connecting…',
      claude: 'Answers by Claude, using your Claude account.',
      key: 'Answers by Claude, using your API key.',
      notes: inClaude ? 'Search only: Claude isn’t available in this view.' : 'Search only. Add a Claude API key in settings for full answers.'
    }[mode];
    modeLine.textContent = txt;
    settingsBtn.hidden = inClaude;
    if (!settings.hidden) renderSettings();
  }
  function renderSettings() {
    const has = !!getKey();
    settings.innerHTML = `
      <p class="hp-label">Claude API key</p>
      <p class="hp-small">Outside claude.ai, the helper answers with your own key from <a href="https://platform.claude.com/" target="_blank" rel="noopener">the Claude Developer Platform</a>. Without one it only searches your notes.</p>
      <form class="hp-keyform">
        <div class="field"><label for="hp-key">${has ? 'Replace your saved key' : 'Paste your API key'}</label><input id="hp-key" type="password" autocomplete="off" spellcheck="false" placeholder="${has ? 'Key saved' : 'sk-ant-…'}"></div>
        <div class="actions"><button type="submit" class="btn btn-primary btn-small">Save key</button>${has ? '<button type="button" class="btn btn-small" data-act="forget">Remove key</button>' : ''}</div>
      </form>
      <p class="hp-small">The key is saved only in this browser and sent only to Anthropic. Anyone who uses this browser could read it, so don’t save it on a shared computer. Questions are billed to your Anthropic account. The helper uses Claude Opus 5.5; if Opus declines a question, the API automatically retries it on a fallback model.</p>`;
    settings.querySelector('.hp-keyform').addEventListener('submit', e => {
      e.preventDefault();
      const v = settings.querySelector('#hp-key').value.trim();
      if (!v) return;
      setKey(v);
      mode = 'key';
      renderMode();
      renderSettings();
      sr.textContent = 'API key saved.';
    });
    const forget = settings.querySelector('[data-act="forget"]');
    if (forget) forget.addEventListener('click', () => { setKey(''); mode = 'notes'; renderMode(); renderSettings(); sr.textContent = 'API key removed.'; });
  }
  settingsBtn.addEventListener('click', () => {
    const show = settings.hidden;
    settings.hidden = !show;
    settingsBtn.setAttribute('aria-expanded', String(show));
    if (show) { renderSettings(); settings.querySelector('input').focus(); }
  });

  clearBtn.addEventListener('click', () => {
    if (busy && ctl) ctl.abort();
    history.length = 0;
    renderEmpty();
    clearBtn.hidden = true;
    input.focus();
  });

  /* Keep the newest message in view unless the student has scrolled up to read. */
  let stick = true;
  log.addEventListener('scroll', () => { stick = log.scrollHeight - log.scrollTop - log.clientHeight < 60; });
  const toBottom = () => { if (stick) log.scrollTop = log.scrollHeight; };

  function sourceList(el, sources, order, label) {
    if (!sources.length) return;
    const nums = order.length ? order : sources.slice(0, 3).map((_, i) => i + 1);
    const box = document.createElement('div');
    box.className = 'hp-sources';
    box.innerHTML = `<p class="hp-label">${label || (order.length ? 'Where this is in your notes' : 'Related parts of your notes')}</p>` +
      nums.map(n => {
        const c = sources[n - 1];
        return `<button type="button" class="hp-src" data-n="${n}"><span class="hp-src-n">${n}</span><span class="hp-src-body"><span class="hp-src-where">${esc(c.where)}</span><span class="hp-src-snip">${esc(c.text.split('\n').slice(1).join(' ').slice(0, 150) || c.text.slice(0, 150))}</span></span><span class="hp-src-go" aria-hidden="true">Open</span></button>`;
      }).join('');
    el.appendChild(box);
  }

  function openFrom(msg, n) {
    const c = (sourcesOf.get(msg) || [])[n - 1];
    if (!c) return;
    if (!wide.matches) close();
    app.openSource(c.target);
  }
  log.addEventListener('click', e => {
    const chip = e.target.closest('.hp-chip');
    if (chip) { ask(chip.textContent); return; }
    const src = e.target.closest('.cite, .hp-src');
    if (src) { openFrom(src.closest('.hp-msg'), +src.dataset.n); return; }
    const retry = e.target.closest('[data-retry]');
    if (retry && !busy) { const q = retry.dataset.retry; retry.closest('.hp-msg').remove(); ask(q, true); }
  });

  function addMsg(cls, html) {
    const el = document.createElement('div');
    el.className = 'hp-msg ' + cls;
    el.innerHTML = html;
    log.appendChild(el);
    stick = true;
    toBottom();
    return el;
  }

  function notesAnswer(msg, question, sources, lead) {
    sourcesOf.set(msg, sources);
    if (!sources.length) {
      msg.innerHTML = `${lead ? `<p class="hp-note">${esc(lead)}</p>` : ''}<p>I couldn’t find that in your notes. Try different words, or name the topic, like “Topic 8 shutdown point”.</p>`;
      return;
    }
    const top = sources.slice(0, 3);
    msg.innerHTML = `${lead ? `<p class="hp-note">${esc(lead)}</p>` : ''}<p>These parts of your notes match your question best:</p>
      <ol class="hp-found">${top.map((c, i) => `<li><button type="button" class="hp-src" data-n="${i + 1}"><span class="hp-src-n">${i + 1}</span><span class="hp-src-body"><span class="hp-src-where">${esc(c.where)}</span></span><span class="hp-src-go" aria-hidden="true">Open</span></button><p class="hp-excerpt">${excerpt(c, question)}</p></li>`).join('')}</ol>`;
  }

  async function ask(question, isRetry) {
    question = clean(question);
    if (!question || busy) return;
    if (panel.hidden) open();
    busy = true;
    askBtn.disabled = true;
    input.value = '';
    fitInput();
    const empty = log.querySelector('.hp-empty');
    if (empty) empty.remove();
    clearBtn.hidden = false;
    if (!isRetry || !log.lastElementChild || !log.lastElementChild.classList.contains('hp-user')) addMsg('hp-user', `<p>${esc(question)}</p>`);
    const msg = addMsg('hp-bot', `<p class="hp-thinking">Searching your notes<span class="dots" aria-hidden="true"></span></p>`);
    sr.textContent = 'Searching your notes.';
    await ready;
    const sources = search(question);
    sourcesOf.set(msg, sources);

    if (mode === 'notes' || mode === 'pending') {
      notesAnswer(msg, question, sources);
      sr.textContent = 'Search results ready.';
      finish();
      return;
    }

    const topics = [...new Set(sources.map(c => c.lesson.module ? c.lesson.n : null).filter(Boolean))].sort((a, b) => a - b);
    msg.innerHTML = `<p class="hp-thinking">${sources.length ? `Reading ${sources.length} section${sources.length === 1 ? '' : 's'} of your notes${topics.length ? ` (Topic${topics.length > 1 ? 's' : ''} ${topics.join(', ')})` : ''}` : 'Thinking'}<span class="dots" aria-hidden="true"></span></p><div class="hp-answer" hidden></div>`;
    sr.textContent = 'Claude is thinking.';
    const answer = msg.querySelector('.hp-answer');
    let pending = '', raf = 0;
    const paint = text => {
      pending = text;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const th = msg.querySelector('.hp-thinking');
        if (th) th.remove();
        answer.hidden = false;
        answer.innerHTML = md(pending, sources.length);
        toBottom();
      });
    };
    ctl = new AbortController();
    stopBtn.hidden = false;
    const r = mode === 'claude'
      ? await viaSample(question, sources, paint, ctl.signal)
      : await viaKey(question, sources, paint, ctl.signal);
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    const th = msg.querySelector('.hp-thinking');
    if (th) th.remove();

    if (r.fallback) {
      notesAnswer(msg, question, sources, r.error);
      sr.textContent = 'Search results ready.';
      finish();
      return;
    }
    const text = r.text || '';
    if (text) { answer.hidden = false; answer.innerHTML = md(text, sources.length); }
    else answer.remove();
    if (text && !r.error) {
      history.push({ role: 'user', content: question }, { role: 'assistant', content: text });
      sourceList(msg, sources, cited(text, sources.length));
    }
    const notes = [];
    if (r.stopped) notes.push('<p class="hp-meta">Stopped.</p>');
    if (r.note) notes.push(`<p class="hp-note">${esc(r.note)}</p>`);
    if (r.error) {
      notes.push(`<div class="hp-error"><p>${esc(r.error)}</p>${r.retry ? `<button type="button" class="btn btn-small" data-retry="${esc(question)}">Try again</button>` : ''}${r.settings ? '<button type="button" class="btn btn-small" data-open-settings>Open settings</button>' : ''}</div>`);
      if (!text) sourceList(msg, sources, [], 'Meanwhile, these parts of your notes match');
    }
    msg.insertAdjacentHTML('beforeend', notes.join(''));
    const os = msg.querySelector('[data-open-settings]');
    if (os) os.addEventListener('click', () => { if (settings.hidden) settingsBtn.click(); });
    sr.textContent = r.error ? r.error : r.stopped ? 'Stopped.' : 'Answer ready.';
    finish();
  }
  function finish() {
    busy = false;
    ctl = null;
    askBtn.disabled = false;
    stopBtn.hidden = true;
    toBottom();
  }
  stopBtn.addEventListener('click', () => { if (ctl) ctl.abort(); });

  function fitInput() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight + 2, 160) + 'px';
  }
  input.addEventListener('input', fitInput);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); form.requestSubmit ? form.requestSubmit() : ask(input.value); }
  });
  form.addEventListener('submit', e => { e.preventDefault(); ask(input.value); });

  ready = (async () => {
    if (inClaude) {
      try { sample = await window.claude.use('sample'); } catch (e) { sample = null; }
    }
    mode = sample ? 'claude' : (!inClaude && getKey() ? 'key' : 'notes');
    renderMode();
  })();
  renderMode();

  ECON.helper = { open, close, ask, search, tokens, stem, md, get mode() { return mode; } };
})();
