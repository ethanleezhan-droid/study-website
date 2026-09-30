/* Marginal Notes: routing, views, quizzes, flashcards and progress. */
(function () {
  const units = ECON.units;
  const lessons = ECON.lessons;
  const unitById = Object.fromEntries(units.map(u => [u.id, u]));
  let unitN = 0;
  units.forEach(u => { if (!u.module) u.n = ++unitN; });
  /* Two tracks: "Your module" (Topics 1–13, following the course notes) and the wider course. */
  let topicN = 0, lessonN = 0;
  lessons.forEach(l => {
    l.module = !!unitById[l.unit].module;
    if (l.module) { l.n = ++topicN; l.label = 'Topic ' + l.n; }
    else { l.n = ++lessonN; l.label = 'Lesson ' + l.n; }
  });
  const moduleLessons = lessons.filter(l => l.module);
  const introLessons = lessons.filter(l => !l.module);
  const moduleUnits = units.filter(u => u.module);
  const byId = Object.fromEntries(lessons.map(l => [l.id, l]));
  const lessonsIn = u => lessons.filter(l => l.unit === u.id);
  const topicRange = ls => ls.length === 1 ? `Topic ${ls[0].n}` : `Topics ${ls[0].n}–${ls[ls.length - 1].n}`;
  const moduleRange = topicRange(moduleLessons);

  /* Key terms for a set of lessons, one entry per term. Module lessons are ranked first, so the
     module's wording wins wherever both tracks define a term, whatever order the scripts load in. */
  function termsFor(ls) {
    const seen = new Set(), out = [];
    const ranked = ls.filter(l => l.module).concat(ls.filter(l => !l.module));
    ranked.forEach(l => l.terms.forEach(([term, def]) => {
      const k = term.toLowerCase();
      if (seen.has(k)) return;
      seen.add(k);
      out.push({ term, def, lesson: l, key: l.id + ':' + term });
    }));
    return out.sort((a, b) => a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }));
  }
  const glossary = termsFor(lessons);

  const main = document.getElementById('main');
  let cleanup = null;
  let firstRender = true;
  let pendingTarget = null; // {lessonId, kind: 'heading'|'section', index|id} to scroll to after render

  /* ---------- progress storage (per browser) ---------- */
  const KEY = 'marginal-notes-v1';
  const blank = () => ({ done: {}, quiz: {}, cards: {}, exams: {} });
  let data = blank();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) data = Object.assign(blank(), JSON.parse(raw));
  } catch (e) { /* storage unavailable: progress lasts for this visit only */ }
  if (!data.exams) data.exams = {};
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* ignore */ }
    updateHeader();
  }
  const doneIn = ls => ls.filter(l => data.done[l.id]).length;
  const nextLesson = () => moduleLessons.find(l => !data.done[l.id]) || introLessons.find(l => !data.done[l.id]);

  /* ---------- helpers ---------- */
  const esc = str => String(str).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  const shuffle = arr => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  const passMark = n => Math.ceil(n * 0.75);
  /* Shuffle answer options each time a question is shown, so the right answer isn't always
     in the same spot. Lists that are all numbers are sorted smallest to largest instead. */
  const isNumeric = o => /^[−\-+]?\$?[\d.,]+\s*(%|years?|[bm])?$/.test(o.trim());
  const numValue = o => {
    const neg = /^[−\-]/.test(o.trim());
    const v = parseFloat(o.replace(/[^\d.]/g, ''));
    return neg ? -v : v;
  };
  function prepare(q) {
    const idx = q.options.map((_, i) => i);
    const order = q.options.every(isNumeric)
      ? idx.sort((a, b) => numValue(q.options[a]) - numValue(q.options[b]))
      : shuffle(idx);
    return { q: q.q, why: q.why, options: order.map(i => q.options[i]), answer: order.indexOf(q.answer) };
  }
  const LETTERS = 'ABCDEFG';
  const smooth = () => (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');

  function statusChip(l) {
    if (data.done[l.id]) return '<span class="status is-done">Complete</span>';
    const q = data.quiz[l.id];
    if (q) return `<span class="status is-tried">Quiz ${q.best}/${q.total}</span>`;
    return '<span class="status">Not started</span>';
  }

  function updateHeader() {
    const n = doneIn(moduleLessons), total = moduleLessons.length;
    const t = document.getElementById('progress-text');
    if (t) t.textContent = `${n} of ${total} topics`;
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = (n / total * 100) + '%';
    const meter = document.getElementById('progress-meter');
    if (meter) { meter.setAttribute('aria-valuenow', String(n)); meter.setAttribute('aria-valuemax', String(total)); }
  }

  /* ---------- router ---------- */
  function route() {
    const hash = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (cleanup) { cleanup(); cleanup = null; }
    ECON.widgets.resetIds();
    let view = 'home';
    if (hash.startsWith('lesson-') && byId[hash.slice(7)]) { view = 'lesson'; renderLesson(byId[hash.slice(7)]); }
    else if (hash === 'labs') { view = 'labs'; renderLabs(); }
    else if (hash === 'flashcards' || hash.startsWith('flashcards-')) { view = 'flashcards'; renderFlashcards(hash.slice(11)); }
    else if (hash === 'glossary') { view = 'glossary'; renderGlossary(); }
    else if (hash === 'exam') { view = 'exam'; renderExam(); }
    else renderHome();

    document.querySelectorAll('[data-nav]').forEach(a => {
      const on = a.dataset.nav === view || (view === 'lesson' && a.dataset.nav === 'home');
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    ECON.widgets.mountAll(main);
    updateHeader();
    if (!firstRender && !(pendingTarget && view === 'lesson')) {
      window.scrollTo(0, 0);
      const h1 = main.querySelector('h1');
      if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
    }
    firstRender = false;
    if (pendingTarget && view === 'lesson') { scrollToTarget(pendingTarget); pendingTarget = null; }
  }

  /* Scroll to a part of a lesson and flash it: a top-level heading in the lesson text
     (by position), one key term, blank or review question (by position), or a whole
     section such as the quiz. */
  function scrollToTarget(t) {
    let el = null;
    if (t.kind === 'heading') el = main.querySelectorAll('.prose > h2, .prose > h3')[t.index];
    else if (t.kind === 'term') el = main.querySelectorAll('.term-list > div')[t.index];
    else if (t.kind === 'blank') el = main.querySelectorAll('.blanks-table tbody tr')[t.index];
    else if (t.kind === 'review') { el = main.querySelectorAll('.review .rv')[t.index]; if (el) el.open = true; }
    else if (t.kind === 'section') el = main.querySelector(t.id);
    else if (t.kind === 'top') el = main.querySelector('.lesson-head');
    if (!el) return;
    el.scrollIntoView({ behavior: smooth(), block: 'start' });
    el.classList.remove('flash');
    void el.offsetWidth;
    el.classList.add('flash');
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }
  function openSource(t) {
    const here = location.hash.replace(/^#/, '') === 'lesson-' + t.lessonId;
    if (here) { scrollToTarget(t); return; }
    pendingTarget = t;
    location.hash = 'lesson-' + t.lessonId;
  }
  function currentLesson() {
    const h = location.hash.replace(/^#/, '');
    return h.startsWith('lesson-') ? byId[h.slice(7)] || null : null;
  }

  function setTitle(t) { document.title = t ? `${t} · Marginal Notes` : 'Marginal Notes'; }

  /* ---------- home ---------- */
  function lessonRows(ls) {
    return ls.map(l => `
          <li><a class="lesson-row${data.done[l.id] ? ' is-done' : ''}" href="#lesson-${l.id}">
            <span class="ln">${l.n}</span>
            <span class="lt"><span class="lt-title">${esc(l.title)}</span><span class="lt-sum">${esc(l.summary)}</span></span>
            <span class="lm">${l.minutes} min</span>
            ${statusChip(l)}
          </a></li>`).join('');
  }
  function progressLine(ls) {
    const d = doneIn(ls);
    return `<p class="unit-prog"><span class="mini-bar" aria-hidden="true"><span style="width:${d / ls.length * 100}%"></span></span>${d} of ${ls.length} complete</p>`;
  }

  function renderHome() {
    setTitle('');
    const nMod = doneIn(moduleLessons);
    const next = nextLesson();
    let primary;
    if (nMod === 0) primary = `<a class="btn btn-primary" href="#lesson-${moduleLessons[0].id}">Start Topic 1</a>`;
    else if (next) primary = `<a class="btn btn-primary" href="#lesson-${next.id}">Continue: ${next.label}</a>`;
    else primary = '<a class="btn btn-primary" href="#exam">Take the practice exam</a>';

    const moduleHtml = moduleUnits.map(u => {
      const ls = lessonsIn(u);
      return `
        <section class="unit unit-module" aria-labelledby="unit-${u.id}">
          <header class="unit-head">
            <p class="unit-num">${topicRange(ls)}</p>
            <h3 id="unit-${u.id}">${esc(u.title)}</h3>
            <p class="unit-blurb">${esc(u.blurb)}</p>
            ${progressLine(ls)}
          </header>
          <ol class="lesson-list">${lessonRows(ls)}</ol>
        </section>`;
    }).join('');
    const unitHtml = units.filter(u => !u.module).map(u => {
      const ls = lessonsIn(u);
      return `
      <section class="unit" aria-labelledby="unit-${u.id}">
        <header class="unit-head">
          <p class="unit-num">Unit ${u.n}</p>
          <h3 id="unit-${u.id}">${esc(u.title)}</h3>
          <p class="unit-blurb">${esc(u.blurb)}</p>
          ${progressLine(ls)}
        </header>
        <ol class="lesson-list">${lessonRows(ls)}</ol>
      </section>`;
    }).join('');

    const best = data.exams.module;
    main.innerHTML = `
    <div class="wrap">
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">Your economics module, ${moduleRange}</p>
          <h1>Economics is the study of choices made under scarcity.</h1>
          <p class="lede">Everything in your course notes, taught step by step with the same section numbers and examples. Each topic has graphs you can move, answers for the blanks in your notes, the “Do you know?” questions, and a quiz.</p>
          <div class="actions">${primary}<a class="btn" href="#labs">Open the labs</a></div>
          <p class="hero-progress">${nMod === 0 ? 'Your progress is saved in this browser as you go.' : `You’ve completed ${nMod} of ${moduleLessons.length} topics.`}</p>
        </div>
        <div class="hero-demo">
          <p class="demo-label">A live market</p>
          <div data-widget="market" data-preset="hero"></div>
        </div>
      </section>
    </div>
    <canvas class="guilloche" aria-hidden="true"></canvas>
    <div class="wrap">
      <section class="course" aria-labelledby="module-h">
        <div class="section-head">
          <h2 id="module-h">Your module</h2>
          <p>The ${moduleLessons.length} topics in your notes, in order. Pass each topic’s quiz to complete it.</p>
        </div>
        ${moduleHtml}
      </section>
      <section class="tools" aria-labelledby="tools-h">
        <div class="section-head"><h2 id="tools-h">Study tools</h2></div>
        <div class="tool-grid">
          <a class="tool" href="#labs"><span class="tool-title">Labs</span><span class="tool-desc">Every interactive graph and calculator in one place.</span></a>
          <a class="tool" href="#flashcards"><span class="tool-title">Flashcards</span><span class="tool-desc">${termsFor(moduleLessons).length} key terms from your module, with spaced repetition that brings back the ones you miss.</span></a>
          <a class="tool" href="#glossary"><span class="tool-title">Glossary</span><span class="tool-desc">Search every definition, with a link to where it’s taught.</span></a>
          <a class="tool" href="#exam"><span class="tool-title">Practice exam</span><span class="tool-desc">A random mix of questions from all ${moduleLessons.length} topics.${best ? ` Best score: ${best.best}/${best.total}.` : ''}</span></a>
        </div>
      </section>
      <section class="course course-wider" aria-labelledby="course-h">
        <div class="section-head">
          <h2 id="course-h">Go further</h2>
          <p>A wider course of ${introLessons.length} lessons that covers the same ground from a different angle. It adds topics your notes don’t, such as consumer surplus, taxes, game theory, market failure, long-run growth and exchange rates.</p>
        </div>
        ${unitHtml}
      </section>
    </div>`;
    const canvas = main.querySelector('.guilloche');
    drawGuilloche(canvas);
    const redraw = () => drawGuilloche(canvas);
    window.addEventListener('resize', redraw);
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener && mq.addEventListener('change', redraw);
    cleanup = () => {
      window.removeEventListener('resize', redraw);
      mq.removeEventListener && mq.removeEventListener('change', redraw);
    };
  }

  /* A banknote-style guilloche band: interlaced waves drawn in the accent ink. */
  function drawGuilloche(canvas) {
    if (!canvas || !canvas.getContext) return;
    const w = canvas.clientWidth, hgt = canvas.clientHeight;
    if (!w || !hgt) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(hgt * dpr);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, hgt);
    const ink = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#1d6a4c';
    ctx.strokeStyle = ink;
    ctx.lineWidth = 0.7;
    ctx.globalAlpha = 0.55;
    const mid = hgt / 2, amp = hgt * 0.42;
    for (let k = 0; k < 9; k++) {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 1.5) {
        const y = mid + amp * Math.sin(x / 23 + k * 0.7) * Math.cos(x / 131 + k * 0.33);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  /* ---------- lesson ---------- */
  function syllabusHtml(current) {
    const block = (title, ls) => `
      <p class="syl-unit">${esc(title)}</p>
      <ol class="syl-list">
        ${ls.map(l => `
        <li><a class="syl-link${l.id === current.id ? ' is-current' : ''}${data.done[l.id] ? ' is-done' : ''}" href="#lesson-${l.id}"${l.id === current.id ? ' aria-current="page"' : ''}>
          <span class="syl-n">${data.done[l.id] ? '<span class="tick" aria-label="complete">✓</span>' : l.n}</span><span>${esc(l.title)}</span>
        </a></li>`).join('')}
      </ol>`;
    let html = '<p class="syl-track syl-track-first">Your module</p>';
    html += moduleUnits.map(u => block(`${u.title}: ${topicRange(lessonsIn(u))}`, lessonsIn(u))).join('');
    html += '<p class="syl-track">Go further</p>';
    html += units.filter(u => !u.module).map(u => block(`Unit ${u.n}: ${u.title}`, lessonsIn(u))).join('');
    return html;
  }

  function renderLesson(l) {
    setTitle(l.title);
    const u = unitById[l.unit];
    const track = l.module ? moduleLessons : introLessons;
    const idx = track.indexOf(l);
    const prev = track[idx - 1], next = track[idx + 1];
    const eyebrow = l.module ? `Your module · Topic ${l.n} of ${moduleLessons.length}` : `Unit ${u.n} · Lesson ${l.n} of ${introLessons.length}`;
    main.innerHTML = `
    <div class="wrap lesson-layout">
      <aside class="syllabus" aria-label="Course contents">${syllabusHtml(l)}</aside>
      <article class="lesson">
        <details class="syllabus-mobile">
          <summary>All topics and lessons</summary>
          ${syllabusHtml(l)}
        </details>
        <header class="lesson-head">
          <p class="eyebrow">${eyebrow}</p>
          <h1>${esc(l.title)}</h1>
          <p class="lede">${esc(l.summary)}</p>
          <div class="meta"><span>${l.minutes} min read</span>${l.module ? `<span class="from-notes">Matches Topic ${l.n} in your notes</span>` : ''}<span id="lesson-status">${statusChip(l)}</span>
            <button type="button" class="btn btn-quiet btn-small" id="mark-done"></button></div>
        </header>
        <nav class="toc" id="toc" aria-label="On this page" hidden></nav>
        <div class="prose">${l.body}</div>
        <section class="terms" aria-labelledby="terms-h">
          <div class="terms-head">
            <h2 id="terms-h">Key terms</h2>
            <a class="btn btn-small" href="#flashcards-${l.id}">Study as flashcards</a>
          </div>
          <dl class="term-list">
            ${l.terms.map(([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join('')}
          </dl>
        </section>
        ${l.blanks ? blanksHtml(l) : ''}
        ${l.review ? reviewHtml(l) : ''}
        <div id="quiz-host"></div>
        <nav class="pager" aria-label="Lesson navigation">
          ${prev ? `<a class="pager-link" href="#lesson-${prev.id}"><span class="pager-dir">← Previous</span><span class="pager-title">${prev.label}: ${esc(prev.title)}</span></a>` : '<span></span>'}
          ${next ? `<a class="pager-link next" href="#lesson-${next.id}"><span class="pager-dir">Next →</span><span class="pager-title">${next.label}: ${esc(next.title)}</span></a>`
                 : `<a class="pager-link next" href="#exam"><span class="pager-dir">${l.module ? 'Finished the module?' : 'Finished the course?'}</span><span class="pager-title">Take the practice exam</span></a>`}
        </nav>
      </article>
    </div>`;

    const markBtn = main.querySelector('#mark-done');
    const refreshStatus = () => {
      main.querySelector('#lesson-status').innerHTML = statusChip(l);
      markBtn.textContent = data.done[l.id] ? 'Mark as not complete' : 'Mark as complete';
      main.querySelectorAll('.syl-link.is-current').forEach(a => a.classList.toggle('is-done', !!data.done[l.id]));
    };
    markBtn.addEventListener('click', () => {
      if (data.done[l.id]) delete data.done[l.id]; else data.done[l.id] = true;
      save(); refreshStatus();
    });
    refreshStatus();
    wireReview();
    wireBlanks();
    lessonQuiz(main.querySelector('#quiz-host'), l, next, refreshStatus);
    buildToc();
  }

  function blanksHtml(l) {
    return `
        <section class="blanks" aria-labelledby="blanks-h">
          <div class="terms-head">
            <h2 id="blanks-h">Fill in your notes</h2>
            <div class="check"><input type="checkbox" id="blanks-hide"><label for="blanks-hide">Hide answers to test yourself</label></div>
          </div>
          <p class="section-lede">Model answers for the blanks (*) in your Topic ${l.n} notes, in order. Your lecturer’s wording may differ a little; what matters is the idea.</p>
          <div class="table-wrap"><table class="blanks-table">
            <thead><tr><th>Section</th><th>In your notes</th><th>Answer</th></tr></thead>
            <tbody>${l.blanks.map(([sec, prompt, ans]) => `<tr><td class="b-sec">${sec}</td><td class="b-prompt">${prompt}</td><td class="b-ans" tabindex="-1">${ans}</td></tr>`).join('')}</tbody>
          </table></div>
        </section>`;
  }
  function wireBlanks() {
    const box = main.querySelector('#blanks-hide');
    if (!box) return;
    const sec = main.querySelector('.blanks');
    box.addEventListener('change', () => {
      sec.classList.toggle('is-hidden', box.checked);
      sec.querySelectorAll('.b-ans').forEach(td => {
        td.classList.remove('is-revealed');
        if (box.checked) { td.tabIndex = 0; td.setAttribute('role', 'button'); td.setAttribute('aria-label', 'Hidden answer. Press to reveal.'); }
        else { td.tabIndex = -1; td.removeAttribute('role'); td.removeAttribute('aria-label'); }
      });
    });
    sec.querySelectorAll('.b-ans').forEach(td => {
      const reveal = () => {
        if (!sec.classList.contains('is-hidden')) return;
        td.classList.add('is-revealed');
        td.removeAttribute('aria-label');
        td.removeAttribute('role');
      };
      td.addEventListener('click', reveal);
      td.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reveal(); } });
    });
  }

  function reviewHtml(l) {
    return `
        <section class="review" aria-labelledby="review-h">
          <div class="terms-head">
            <h2 id="review-h">Do you know?</h2>
            <button type="button" class="btn btn-small" id="review-all">Show all answers</button>
          </div>
          <p class="section-lede">The revision questions from the end of your Topic ${l.n} notes. Answer each one in your head or on paper first, then open it to check.</p>
          <div class="review-list">
            ${l.review.map(([q, a], i) => `<details class="rv"><summary><span class="rv-n">${i + 1}</span><span class="rv-q">${esc(q)}</span></summary><div class="rv-a">${a}</div></details>`).join('')}
          </div>
        </section>`;
  }
  function wireReview() {
    const btn = main.querySelector('#review-all');
    if (!btn) return;
    const items = [...main.querySelectorAll('.rv')];
    const sync = () => { btn.textContent = items.every(d => d.open) ? 'Hide all answers' : 'Show all answers'; };
    btn.addEventListener('click', () => {
      const open = !items.every(d => d.open);
      items.forEach(d => { d.open = open; });
      sync();
    });
    items.forEach(d => d.addEventListener('toggle', sync));
  }

  /* "On this page" jump list, built from the lesson's section headings. */
  function buildToc() {
    const toc = main.querySelector('#toc');
    const heads = [...main.querySelectorAll('.prose > h2, .lesson > section > .terms-head > h2, .lesson > section > h2, #quiz-host h2')];
    if (heads.length < 5) return;
    heads.forEach((hd, i) => { if (!hd.id) hd.id = 'sec-' + i; });
    toc.innerHTML = `<p class="toc-label">On this page</p><div class="chips">${heads.map(hd => `<button type="button" class="chip" data-target="${hd.id}">${esc(hd.textContent)}</button>`).join('')}</div>`;
    toc.hidden = false;
    toc.querySelectorAll('[data-target]').forEach(b => b.addEventListener('click', () => {
      const t = document.getElementById(b.dataset.target);
      if (!t) return;
      t.scrollIntoView({ behavior: smooth(), block: 'start' });
      t.setAttribute('tabindex', '-1');
      t.focus({ preventScroll: true });
    }));
  }

  function lessonQuiz(host, l, next, onChange) {
    const quiz = l.quiz.map(prepare);
    const total = quiz.length, need = passMark(total);
    let answered = 0, correct = 0;
    host.innerHTML = `
      <section class="quiz" aria-labelledby="quiz-h">
        <div class="quiz-head">
          <h2 id="quiz-h">Check your understanding</h2>
          <p>${total} questions. Get ${need} right to complete the ${l.module ? 'topic' : 'lesson'}. Each answer is explained once you choose.</p>
        </div>
        <ol class="q-list">${quiz.map((q, i) => questionHtml(q, i)).join('')}</ol>
        <div class="quiz-result" aria-live="polite"></div>
      </section>`;
    host.querySelectorAll('.q').forEach((li, qi) => {
      const q = quiz[qi];
      li.querySelectorAll('.opt').forEach((btn, oi) => {
        btn.addEventListener('click', () => {
          if (li.dataset.answered) return;
          li.dataset.answered = '1';
          const ok = oi === q.answer;
          answered++; if (ok) correct++;
          revealQuestion(li, q, oi);
          if (answered === total) finish();
        });
      });
    });
    function finish() {
      const prev = data.quiz[l.id];
      data.quiz[l.id] = { best: Math.max(correct, prev ? prev.best : 0), total };
      const passed = correct >= need;
      if (passed) data.done[l.id] = true;
      save(); onChange();
      const res = host.querySelector('.quiz-result');
      res.className = 'quiz-result ' + (passed ? 'is-pass' : 'is-retry');
      const unit = l.module ? 'topic' : 'lesson';
      res.innerHTML = `
        <p class="score"><strong>${correct}</strong> of ${total} correct</p>
        <p>${passed ? `${unit[0].toUpperCase() + unit.slice(1)} complete. Nice work.` : `You need ${need} to complete the ${unit}. Review the sections behind the questions you missed, then try again.`}</p>
        <div class="actions">
          <button type="button" class="btn${passed ? '' : ' btn-primary'}" data-act="retry">Try the quiz again</button>
          ${passed && next ? `<a class="btn btn-primary" href="#lesson-${next.id}">Next: ${esc(next.title)}</a>` : ''}
          ${passed && !next ? '<a class="btn btn-primary" href="#exam">Take the practice exam</a>' : ''}
        </div>`;
      res.querySelector('[data-act="retry"]').addEventListener('click', () => {
        lessonQuiz(host, l, next, onChange);
        host.querySelector('.quiz').scrollIntoView({ block: 'start' });
      });
    }
  }

  function questionHtml(q, i, extra) {
    return `
      <li class="q">
        ${extra || ''}
        <p class="q-text"><span class="q-n">${i + 1}.</span> ${esc(q.q)}</p>
        <div class="q-opts" role="group" aria-label="Question ${i + 1} options">
          ${q.options.map((o, oi) => `<button type="button" class="opt" aria-pressed="false"><span class="opt-key" aria-hidden="true">${LETTERS[oi]}</span><span class="opt-text">${esc(o)}</span></button>`).join('')}
        </div>
        <div class="q-fb" hidden></div>
      </li>`;
  }

  function revealQuestion(li, q, chosen, lessonLink) {
    const ok = chosen === q.answer;
    li.classList.add(ok ? 'is-right' : 'is-wrong');
    li.querySelectorAll('.opt').forEach((b, i) => {
      b.disabled = true;
      if (i === q.answer) b.classList.add('is-answer');
      if (i === chosen) { b.classList.add(ok ? 'is-correct' : 'is-incorrect'); b.setAttribute('aria-pressed', 'true'); }
      if (i === q.answer || i === chosen) {
        const tag = i === q.answer ? 'correct answer' : 'your answer';
        b.setAttribute('aria-label', `${LETTERS[i]}: ${q.options[i]} (${tag})`);
      }
    });
    const fb = li.querySelector('.q-fb');
    fb.hidden = false;
    const verdict = chosen == null ? 'Not answered' : ok ? 'Correct' : 'Not quite';
    fb.innerHTML = `<p class="fb-verdict">${verdict}${ok ? '' : `. The answer is ${LETTERS[q.answer]}.`}</p><p>${esc(q.why)}</p>${lessonLink || ''}`;
  }

  /* ---------- labs ---------- */
  const LABS = [
    { group: 'module', id: 'ppc', title: 'PPC', lesson: 'm-basic', html: '<div data-widget="ppf" data-preset="laptops"></div>' },
    { group: 'module', id: 'demand', title: 'Demand shifts', lesson: 'm-demand', html: '<div data-widget="shifter" data-preset="demand"></div>' },
    { group: 'module', id: 'supply', title: 'Supply shifts', lesson: 'm-supply', html: '<div data-widget="shifter" data-preset="supply"></div>' },
    { group: 'module', id: 'chocolate', title: 'Chocolate bar market', lesson: 'm-equilibrium', html: '<div data-widget="schedule"></div>' },
    { group: 'module', id: 'controls', title: 'Ceilings and floors', lesson: 'm-equilibrium', html: '<div data-widget="market" data-preset="controls-basic"></div>' },
    { group: 'module', id: 'both', title: 'Both curves shift', lesson: 'm-equilibrium', html: '<div data-widget="market" data-preset="shifts"></div>' },
    { group: 'module', id: 'elasticity-m', title: 'Elasticity', lesson: 'm-elasticity', html: '<div data-widget="elasticity" data-preset="module"></div>' },
    { group: 'module', id: 'production', title: 'TP, MP and AP', lesson: 'm-costs', html: '<div data-widget="production"></div>' },
    { group: 'module', id: 'costs', title: 'Cost curves', lesson: 'm-costs', html: '<div data-widget="costs"></div>' },
    { group: 'module', id: 'lrac', title: 'LRAC', lesson: 'm-costs', html: '<div data-widget="lrac"></div>' },
    { group: 'module', id: 'structures', title: 'Market structures', lesson: 'm-structures', html: '<div data-widget="structures"></div>' },
    { group: 'module', id: 'profitmax', title: 'MR = MC and shutdown', lesson: 'm-profit', html: '<div data-widget="profitmax"></div>' },
    { group: 'module', id: 'stall', title: 'Drinks stall', lesson: 'm-profit', html: '<div data-widget="stall"></div>' },
    { group: 'module', id: 'labour', title: 'Unemployment rate', lesson: 'm-unemployment', html: '<div data-widget="labour"></div>' },
    { group: 'module', id: 'basket', title: 'CPI and inflation', lesson: 'm-unemployment', html: '<div data-widget="inflation" data-preset="basket"></div>' },
    { group: 'module', id: 'inflation-m', title: 'Demand-pull vs cost-push', lesson: 'm-unemployment', html: '<div data-widget="adas" data-preset="m-inflation"></div>' },
    { group: 'module', id: 'gdp', title: 'Nominal vs real GDP', lesson: 'm-gdp', html: '<div data-widget="gdp"></div>' },
    { group: 'module', id: 'cycle', title: 'Business cycle', lesson: 'm-gdp', html: '<div data-widget="cycle"></div>' },
    { group: 'module', id: 'adas-m', title: 'AD = AS', lesson: 'm-adas', html: '<div data-widget="adas" data-preset="m-adas"></div>' },
    { group: 'module', id: 'multiplier', title: 'Income multiplier', lesson: 'm-adas', html: '<div data-widget="multiplier"></div>' },
    { group: 'module', id: 'fiscal-m', title: 'Fiscal policy', lesson: 'm-fiscal', html: '<div data-widget="adas" data-preset="m-fiscal"></div>' },
    { group: 'module', id: 'fiscalcalc', title: 'G and T multipliers', lesson: 'm-fiscal', html: '<div data-widget="fiscal"></div>' },
    { group: 'module', id: 'credit', title: 'Credit creation', lesson: 'm-monetary', html: '<div data-widget="credit"></div>' },
    { group: 'module', id: 'moneymarket', title: 'Money market', lesson: 'm-monetary', html: '<div data-widget="moneymarket"></div>' },
    { group: 'wider', id: 'market', title: 'Full market lab', lesson: 'equilibrium', html: '<div data-widget="market" data-preset="full"></div>' },
    { group: 'wider', id: 'advantage', title: 'Comparative advantage', lesson: 'trade', html: '<div data-widget="advantage"></div>' },
    { group: 'wider', id: 'inflation', title: 'Inflation since 1950', lesson: 'inflation', html: '<div data-widget="inflation"></div>' },
    { group: 'wider', id: 'adas', title: 'AD-AS with LRAS', lesson: 'ad-as', html: '<div data-widget="adas" data-preset="adas"></div>' },
    { group: 'wider', id: 'monetary', title: 'Interest rate policy', lesson: 'monetary-policy', html: '<div data-widget="adas" data-preset="monetary"></div>' },
    { group: 'wider', id: 'fiscal', title: 'Fiscal policy (AD-AS)', lesson: 'fiscal-policy', html: '<div data-widget="adas" data-preset="fiscal"></div>' }
  ];
  function renderLabs() {
    setTitle('Labs');
    const section = x => `
      <section class="lab-section" id="lab-${x.id}" aria-label="${esc(x.title)}">
        <p class="lab-from">From <a href="#lesson-${x.lesson}">${byId[x.lesson].label}: ${esc(byId[x.lesson].title)}</a></p>
        ${x.html}
      </section>`;
    const jump = g => `<div class="chips">${LABS.filter(x => x.group === g).map(x => `<button type="button" class="chip" data-jump="lab-${x.id}">${esc(x.title)}</button>`).join('')}</div>`;
    main.innerHTML = `
    <div class="wrap page">
      <header class="page-head">
        <p class="eyebrow">Study tools</p>
        <h1>Labs</h1>
        <p class="lede">Every interactive model in one place. Change one thing at a time and predict what will happen before you look.</p>
        <nav class="jump" aria-label="Jump to a lab">
          <p class="toc-label">Your module</p>${jump('module')}
          <p class="toc-label">Go further</p>${jump('wider')}
        </nav>
      </header>
      <h2 class="group-title">Your module</h2>
      ${LABS.filter(x => x.group === 'module').map(section).join('')}
      <h2 class="group-title">Go further</h2>
      ${LABS.filter(x => x.group === 'wider').map(section).join('')}
    </div>`;
    main.querySelectorAll('[data-jump]').forEach(b => b.addEventListener('click', () => {
      const t = document.getElementById(b.dataset.jump);
      if (t) t.scrollIntoView({ behavior: smooth(), block: 'start' });
    }));
  }

  /* ---------- flashcards ---------- */
  function renderFlashcards(scope) {
    setTitle('Flashcards');
    const moduleTerms = termsFor(moduleLessons);
    const groups = [
      ['Your module', [['module', `All ${moduleLessons.length} topics (${moduleTerms.length} terms)`]]
        .concat(moduleUnits.map(u => [u.id, `${u.title}: ${topicRange(lessonsIn(u))}`]))
        .concat(moduleLessons.map(l => [l.id, `${l.label}: ${l.title}`]))],
      ['Go further', [['all', `Everything (${glossary.length} terms)`]]
        .concat(units.filter(u => !u.module).map(u => [u.id, `Unit ${u.n}: ${u.title}`]))
        .concat(introLessons.map(l => [l.id, `${l.label}: ${l.title}`]))]
    ];
    const valid = groups.flatMap(g => g[1].map(o => o[0]));
    if (!valid.includes(scope)) scope = 'module';
    const st = { scope, reverse: false, queue: [], i: 0, flipped: false, seen: 0, missed: new Set() };

    main.innerHTML = `
    <div class="wrap page page-narrow">
      <header class="page-head">
        <p class="eyebrow">Study tools</p>
        <h1>Flashcards</h1>
        <p class="lede">Cards you get right come back less often. Cards you miss come back later in the same session.</p>
      </header>
      <div class="fc-controls">
        <div class="field">
          <label for="fc-deck">Deck</label>
          <select id="fc-deck">${groups.map(([label, opts]) => `<optgroup label="${esc(label)}">${opts.map(([v, t]) => `<option value="${v}"${v === scope ? ' selected' : ''}>${esc(t)}</option>`).join('')}</optgroup>`).join('')}</select>
        </div>
        <div class="check"><input type="checkbox" id="fc-reverse"><label for="fc-reverse">Show the definition first</label></div>
      </div>
      <p class="fc-stats" id="fc-stats"></p>
      <div id="fc-stage"></div>
      <p class="fc-keys">Keyboard: <kbd>Space</kbd> flip · <kbd>1</kbd> again · <kbd>2</kbd> got it</p>
    </div>`;

    const stage = main.querySelector('#fc-stage');
    const stats = main.querySelector('#fc-stats');
    const deck = () => {
      if (st.scope === 'module') return moduleTerms;
      if (st.scope === 'all') return glossary;
      if (unitById[st.scope]) return termsFor(lessons.filter(l => l.unit === st.scope));
      return termsFor([byId[st.scope]]);
    };
    const box = g => data.cards[g.key] || 0;

    function start(onlyMissed) {
      let cards = deck();
      if (onlyMissed) cards = cards.filter(g => st.missed.has(g.key));
      const buckets = {};
      cards.forEach(g => { (buckets[box(g)] = buckets[box(g)] || []).push(g); });
      st.queue = Object.keys(buckets).map(Number).sort((a, b) => a - b).flatMap(b => shuffle(buckets[b]));
      st.i = 0; st.flipped = false; st.seen = 0; st.missed = new Set();
      draw();
    }
    function showStats() {
      const d = deck();
      const mastered = d.filter(g => box(g) >= 4).length;
      const learning = d.filter(g => box(g) > 0 && box(g) < 4).length;
      stats.innerHTML = `<span><strong>${d.length - mastered - learning}</strong> new</span><span><strong>${learning}</strong> learning</span><span><strong>${mastered}</strong> mastered</span>`;
    }
    function draw() {
      showStats();
      if (st.i >= st.queue.length) {
        const missed = st.missed.size;
        stage.innerHTML = `
          <div class="fc-done">
            <h2>Deck finished</h2>
            <p>You went through ${st.seen} card${st.seen === 1 ? '' : 's'}${missed ? ` and missed ${missed} at least once` : ', with no misses'}.</p>
            <div class="actions">
              <button type="button" class="btn btn-primary" data-act="again">Study this deck again</button>
              ${missed ? '<button type="button" class="btn" data-act="missed">Only the ones I missed</button>' : ''}
            </div>
          </div>`;
        stage.querySelector('[data-act="again"]').addEventListener('click', () => start(false));
        const m = stage.querySelector('[data-act="missed"]');
        if (m) m.addEventListener('click', () => start(true));
        return;
      }
      const g = st.queue[st.i];
      const front = st.reverse ? `<p class="fc-def">${esc(g.def)}</p>` : `<p class="fc-term">${esc(g.term)}</p>`;
      const back = st.reverse ? `<p class="fc-term">${esc(g.term)}</p>` : `<p class="fc-def">${esc(g.def)}</p>`;
      stage.innerHTML = `
        <p class="fc-count">Card ${st.i + 1} of ${st.queue.length}</p>
        <button type="button" class="fc-card${st.flipped ? ' is-flipped' : ''}" id="fc-card" aria-live="polite">
          <span class="fc-face fc-front">${front}<span class="fc-hint">Tap to flip</span></span>
          <span class="fc-face fc-back">${back}<span class="fc-src">${g.lesson.label}: ${esc(g.lesson.title)}</span></span>
        </button>
        <div class="fc-actions">
          <button type="button" class="btn" data-act="miss" ${st.flipped ? '' : 'disabled'}>Again</button>
          <button type="button" class="btn btn-primary" data-act="hit" ${st.flipped ? '' : 'disabled'}>Got it</button>
        </div>`;
      const card = stage.querySelector('#fc-card');
      card.setAttribute('aria-label', st.flipped ? `${g.term}: ${g.def}` : `${st.reverse ? g.def : g.term}. Press to show the answer.`);
      card.addEventListener('click', flip);
      stage.querySelector('[data-act="miss"]').addEventListener('click', () => grade(false));
      stage.querySelector('[data-act="hit"]').addEventListener('click', () => grade(true));
    }
    function flip() {
      st.flipped = !st.flipped;
      const card = stage.querySelector('#fc-card');
      const g = st.queue[st.i];
      card.classList.toggle('is-flipped', st.flipped);
      card.setAttribute('aria-label', st.flipped ? `${g.term}: ${g.def}` : `${st.reverse ? g.def : g.term}. Press to show the answer.`);
      stage.querySelectorAll('.fc-actions .btn').forEach(b => { b.disabled = !st.flipped; });
    }
    function grade(hit) {
      if (!st.flipped) return;
      const g = st.queue[st.i];
      if (hit) data.cards[g.key] = Math.min(5, box(g) + 1);
      else {
        data.cards[g.key] = 1;
        st.missed.add(g.key);
        st.queue.splice(Math.min(st.queue.length, st.i + 4), 0, g);
      }
      save();
      st.seen++; st.i++; st.flipped = false;
      draw();
      const card = stage.querySelector('#fc-card');
      if (card) card.focus({ preventScroll: true });
    }
    const onKey = e => {
      if (e.target.closest('select, input, textarea')) return;
      if (e.key === ' ' || e.key === 'Enter') {
        if (e.target.closest('#fc-card')) return; // the button handles its own activation
        if (e.target.closest('button, a')) return;
        e.preventDefault(); if (stage.querySelector('#fc-card')) flip();
      } else if (e.key === '1') grade(false);
      else if (e.key === '2') grade(true);
    };
    document.addEventListener('keydown', onKey);
    cleanup = () => document.removeEventListener('keydown', onKey);

    main.querySelector('#fc-deck').addEventListener('change', e => { st.scope = e.target.value; start(false); });
    main.querySelector('#fc-reverse').addEventListener('change', e => { st.reverse = e.target.checked; draw(); });
    start(false);
  }

  /* ---------- glossary ---------- */
  function renderGlossary() {
    setTitle('Glossary');
    main.innerHTML = `
    <div class="wrap page page-narrow">
      <header class="page-head">
        <p class="eyebrow">Study tools</p>
        <h1>Glossary</h1>
        <p class="lede">Every key term, with a link to the topic or lesson that explains it. Where your module defines a term, its wording is used.</p>
      </header>
      <div class="gl-search">
        <label for="gl-q">Search terms and definitions</label>
        <input type="search" id="gl-q" placeholder="Try “elasticity” or “marginal”" autocomplete="off">
        <div class="check"><input type="checkbox" id="gl-module"><label for="gl-module">Only terms from your module</label></div>
        <p class="gl-count" id="gl-count" aria-live="polite"></p>
      </div>
      <nav class="gl-letters" id="gl-letters" aria-label="Jump to letter"></nav>
      <div id="gl-list"></div>
    </div>`;
    const list = main.querySelector('#gl-list');
    const count = main.querySelector('#gl-count');
    const letters = main.querySelector('#gl-letters');
    const input = main.querySelector('#gl-q');
    const onlyModule = main.querySelector('#gl-module');
    function draw() {
      const q = input.value.trim().toLowerCase();
      const base = onlyModule.checked ? glossary.filter(g => g.lesson.module) : glossary;
      const items = base.filter(g => !q || g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q));
      count.textContent = q ? `${items.length} of ${base.length} terms match` : `${base.length} terms`;
      const buckets = {};
      items.forEach(g => { const L = g.term[0].toUpperCase(); (buckets[L] = buckets[L] || []).push(g); });
      const keys = Object.keys(buckets).sort();
      letters.innerHTML = keys.map(L => `<button type="button" data-letter="${L}">${L}</button>`).join('');
      list.innerHTML = keys.length ? keys.map(L => `
        <section class="gl-group" id="gl-${L}" aria-labelledby="gl-h-${L}">
          <h2 id="gl-h-${L}">${L}</h2>
          <dl>${buckets[L].map(g => `<div class="gl-item"><dt>${esc(g.term)}</dt><dd>${esc(g.def)} <a href="#lesson-${g.lesson.id}">${g.lesson.label}</a></dd></div>`).join('')}</dl>
        </section>`).join('') : '<p class="empty">No terms match. Try a shorter word.</p>';
      letters.querySelectorAll('[data-letter]').forEach(b => b.addEventListener('click', () => {
        document.getElementById('gl-' + b.dataset.letter).scrollIntoView({ block: 'start' });
      }));
    }
    input.addEventListener('input', draw);
    onlyModule.addEventListener('change', draw);
    draw();
  }

  /* ---------- practice exam ---------- */
  function renderExam() {
    setTitle('Practice exam');
    const toPool = ls => ls.flatMap(l => l.quiz.map(q => ({ q, l })));
    const pools = {
      module: () => toPool(moduleLessons),
      all: () => toPool(lessons),
      done: () => toPool(lessons.filter(l => data.done[l.id]))
    };
    const st = { scope: 'module', size: 10 };
    main.innerHTML = `
    <div class="wrap page page-narrow">
      <header class="page-head">
        <p class="eyebrow">Study tools</p>
        <h1>Practice exam</h1>
        <p class="lede">A random set of questions from the quizzes. You see the answers only after you submit, as in a real exam.</p>
      </header>
      <div id="exam-stage"></div>
    </div>`;
    const stage = main.querySelector('#exam-stage');
    const bestLine = () => {
      const b = data.exams[st.scope];
      return b ? `Your best so far: ${b.best} of ${b.total} (${Math.round(b.best / b.total * 100)}%).` : '';
    };

    function setup() {
      const nDone = pools.done().length;
      if (nDone < 5 && st.scope === 'done') st.scope = 'module';
      stage.innerHTML = `
        <div class="exam-setup">
          <fieldset>
            <legend>Questions from</legend>
            <div class="radio"><input type="radio" name="scope" id="sc-module" value="module"${st.scope === 'module' ? ' checked' : ''}><label for="sc-module">Your module, ${moduleRange} (${pools.module().length} questions)</label></div>
            <div class="radio"><input type="radio" name="scope" id="sc-all" value="all"${st.scope === 'all' ? ' checked' : ''}><label for="sc-all">Everything: your module and the wider course (${pools.all().length} questions)</label></div>
            <div class="radio"><input type="radio" name="scope" id="sc-done" value="done"${st.scope === 'done' ? ' checked' : ''}${nDone < 5 ? ' disabled' : ''}><label for="sc-done">Only what I’ve completed${nDone < 5 ? ' (complete a topic first)' : ` (${nDone} questions)`}</label></div>
          </fieldset>
          <fieldset>
            <legend>Length</legend>
            <div class="radio"><input type="radio" name="size" id="sz-10" value="10"${st.size === 10 ? ' checked' : ''}><label for="sz-10">10 questions</label></div>
            <div class="radio"><input type="radio" name="size" id="sz-20" value="20"${st.size === 20 ? ' checked' : ''}><label for="sz-20">20 questions</label></div>
          </fieldset>
          <button type="button" class="btn btn-primary" id="exam-start">Start exam</button>
          <p class="exam-best" id="exam-best">${bestLine()}</p>
        </div>`;
      const best = stage.querySelector('#exam-best');
      stage.querySelectorAll('input[name="scope"]').forEach(r => r.addEventListener('change', () => { st.scope = r.value; best.textContent = bestLine(); }));
      stage.querySelectorAll('input[name="size"]').forEach(r => r.addEventListener('change', () => { st.size = Number(r.value); }));
      stage.querySelector('#exam-start').addEventListener('click', run);
    }

    function run() {
      const src = pools[st.scope]();
      const qs = shuffle(src).slice(0, Math.min(st.size, src.length)).map(x => ({ q: prepare(x.q), l: x.l }));
      const picks = new Array(qs.length).fill(null);
      stage.innerHTML = `
        <form class="exam" novalidate>
          <ol class="q-list">${qs.map((x, i) => questionHtml(x.q, i, `<p class="q-from">${x.l.label}: ${esc(x.l.title)}</p>`)).join('')}</ol>
          <div class="exam-bar">
            <p id="exam-count" aria-live="polite">0 of ${qs.length} answered</p>
            <button type="submit" class="btn btn-primary">Submit answers</button>
          </div>
          <p class="exam-msg" id="exam-msg" aria-live="assertive"></p>
        </form>`;
      const form = stage.querySelector('form');
      const counter = stage.querySelector('#exam-count');
      stage.querySelectorAll('.q').forEach((li, qi) => {
        li.querySelectorAll('.opt').forEach((b, oi) => b.addEventListener('click', () => {
          picks[qi] = oi;
          li.querySelectorAll('.opt').forEach((o, j) => {
            o.classList.toggle('is-picked', j === oi);
            o.setAttribute('aria-pressed', String(j === oi));
          });
          counter.textContent = `${picks.filter(p => p != null).length} of ${qs.length} answered`;
        }));
      });
      form.addEventListener('submit', e => {
        e.preventDefault();
        const left = picks.filter(p => p == null).length;
        if (left && !form.dataset.confirm) {
          form.dataset.confirm = '1';
          stage.querySelector('#exam-msg').textContent = `${left} question${left === 1 ? ' is' : 's are'} unanswered and will be marked wrong. Press Submit again to finish anyway.`;
          return;
        }
        grade(qs, picks);
      });
    }

    function grade(qs, picks) {
      let score = 0;
      stage.querySelectorAll('.q').forEach((li, i) => {
        const { q, l } = qs[i];
        if (picks[i] === q.answer) score++;
        revealQuestion(li, q, picks[i], picks[i] === q.answer ? '' : `<p class="fb-link"><a href="#lesson-${l.id}">Review ${l.label}: ${esc(l.title)}</a></p>`);
        li.querySelectorAll('.opt').forEach(o => o.classList.remove('is-picked'));
      });
      const prevBest = data.exams[st.scope] ? data.exams[st.scope].best / data.exams[st.scope].total : -1;
      if (score / qs.length > prevBest) { data.exams[st.scope] = { best: score, total: qs.length }; save(); }
      const pctScore = Math.round(score / qs.length * 100);
      const bar = stage.querySelector('.exam-bar');
      bar.outerHTML = `
        <div class="quiz-result ${pctScore >= 75 ? 'is-pass' : 'is-retry'}">
          <p class="score"><strong>${score}</strong> of ${qs.length} correct (${pctScore}%)</p>
          <p>${pctScore >= 90 ? 'Excellent. You clearly know this material.' : pctScore >= 75 ? 'Solid work. Review the questions you missed below.' : 'Keep going. Each missed question links to the topic or lesson that covers it.'}</p>
          <div class="actions"><button type="button" class="btn btn-primary" data-act="new">New exam</button></div>
        </div>`;
      stage.querySelector('.exam-msg').textContent = '';
      stage.querySelector('[data-act="new"]').addEventListener('click', () => { setup(); window.scrollTo(0, 0); });
      stage.querySelector('.quiz-result').scrollIntoView({ block: 'center' });
    }

    setup();
  }

  /* ---------- global wiring ---------- */
  function wireFooter() {
    const btn = document.getElementById('reset-progress');
    if (!btn) return;
    let armed = null;
    btn.addEventListener('click', () => {
      if (!armed) {
        btn.textContent = 'Click again to erase all progress';
        btn.classList.add('is-armed');
        armed = setTimeout(() => { armed = null; btn.textContent = 'Reset progress'; btn.classList.remove('is-armed'); }, 4000);
        return;
      }
      clearTimeout(armed); armed = null;
      data = blank(); save();
      btn.textContent = 'Progress erased';
      btn.classList.remove('is-armed');
      setTimeout(() => { btn.textContent = 'Reset progress'; }, 2000);
      route();
    });
  }

  ECON.app = { openSource, currentLesson, moduleLessons };
  document.getElementById('skip-link').addEventListener('click', e => {
    e.preventDefault();
    main.focus();
  });
  window.addEventListener('hashchange', route);
  wireFooter();
  route();
})();
