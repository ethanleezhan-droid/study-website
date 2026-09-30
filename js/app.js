/* Marginal Notes: routing, views, quizzes, flashcards and progress. */
(function () {
  const units = ECON.units;
  const lessons = ECON.lessons;
  lessons.forEach((l, i) => { l.n = i + 1; });
  const byId = Object.fromEntries(lessons.map(l => [l.id, l]));
  const unitById = Object.fromEntries(units.map((u, i) => [u.id, Object.assign(u, { n: i + 1 })]));
  const glossary = [];
  lessons.forEach(l => l.terms.forEach(([term, def]) => glossary.push({ term, def, lesson: l, key: l.id + ':' + term })));
  glossary.sort((a, b) => a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }));

  const main = document.getElementById('main');
  let cleanup = null;
  let firstRender = true;

  /* ---------- progress storage (per browser) ---------- */
  const KEY = 'marginal-notes-v1';
  const blank = () => ({ done: {}, quiz: {}, cards: {}, exam: null });
  let data = blank();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) data = Object.assign(blank(), JSON.parse(raw));
  } catch (e) { /* storage unavailable: progress lasts for this visit only */ }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* ignore */ }
    updateHeader();
  }
  const doneCount = () => lessons.filter(l => data.done[l.id]).length;
  const nextLesson = () => lessons.find(l => !data.done[l.id]);

  /* ---------- helpers ---------- */
  const esc = str => String(str).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  const shuffle = arr => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  const passMark = n => Math.ceil(n * 0.75);
  /* Shuffle answer options each time a question is shown, so the right answer isn't always
     in the same spot. Lists that are all numbers stay in their natural order. */
  const isNumeric = o => /^[−\-+$]*[\d.,]+\s*(%|years?)?$/.test(o.trim());
  function prepare(q) {
    if (q.options.every(isNumeric)) return q;
    const order = shuffle(q.options.map((_, i) => i));
    return { q: q.q, why: q.why, options: order.map(i => q.options[i]), answer: order.indexOf(q.answer) };
  }
  const LETTERS = 'ABCDEFG';

  function statusChip(l) {
    if (data.done[l.id]) return '<span class="status is-done">Complete</span>';
    const q = data.quiz[l.id];
    if (q) return `<span class="status is-tried">Quiz ${q.best}/${q.total}</span>`;
    return '<span class="status">Not started</span>';
  }

  function updateHeader() {
    const n = doneCount();
    const t = document.getElementById('progress-text');
    if (t) t.textContent = `${n} of ${lessons.length} lessons`;
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = (n / lessons.length * 100) + '%';
    const meter = document.getElementById('progress-meter');
    if (meter) meter.setAttribute('aria-valuenow', String(n));
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
    if (!firstRender) {
      window.scrollTo(0, 0);
      const h1 = main.querySelector('h1');
      if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
    }
    firstRender = false;
  }

  function setTitle(t) { document.title = t ? `${t} · Marginal Notes` : 'Marginal Notes'; }

  /* ---------- home ---------- */
  function renderHome() {
    setTitle('');
    const n = doneCount();
    const next = nextLesson();
    let primary;
    if (n === 0) primary = `<a class="btn btn-primary" href="#lesson-${lessons[0].id}">Start Lesson 1</a>`;
    else if (next) primary = `<a class="btn btn-primary" href="#lesson-${next.id}">Continue: Lesson ${next.n}</a>`;
    else primary = '<a class="btn btn-primary" href="#exam">Take the practice exam</a>';

    const unitHtml = units.map(u => {
      const ls = lessons.filter(l => l.unit === u.id);
      const d = ls.filter(l => data.done[l.id]).length;
      return `
      <section class="unit" aria-labelledby="unit-${u.id}">
        <header class="unit-head">
          <p class="unit-num">Unit ${u.n}</p>
          <h3 id="unit-${u.id}">${esc(u.title)}</h3>
          <p class="unit-blurb">${esc(u.blurb)}</p>
          <p class="unit-prog"><span class="mini-bar" aria-hidden="true"><span style="width:${d / ls.length * 100}%"></span></span>${d} of ${ls.length} complete</p>
        </header>
        <ol class="lesson-list">
          ${ls.map(l => `
          <li><a class="lesson-row${data.done[l.id] ? ' is-done' : ''}" href="#lesson-${l.id}">
            <span class="ln">${l.n}</span>
            <span class="lt"><span class="lt-title">${esc(l.title)}</span><span class="lt-sum">${esc(l.summary)}</span></span>
            <span class="lm">${l.minutes} min</span>
            ${statusChip(l)}
          </a></li>`).join('')}
        </ol>
      </section>`;
    }).join('');

    main.innerHTML = `
    <div class="wrap">
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">An introductory economics course in ${lessons.length} lessons</p>
          <h1>Economics is the study of choices made under scarcity.</h1>
          <p class="lede">Work through micro and macroeconomics at your own pace. Every lesson has graphs you can move, a quiz that explains each answer, and flashcards for the key terms.</p>
          <div class="actions">${primary}<a class="btn" href="#labs">Open the labs</a></div>
          <p class="hero-progress">${n === 0 ? 'Your progress is saved in this browser as you go.' : `You’ve completed ${n} of ${lessons.length} lessons.`}</p>
        </div>
        <div class="hero-demo">
          <p class="demo-label">A live market</p>
          <div data-widget="market" data-preset="hero"></div>
        </div>
      </section>
    </div>
    <canvas class="guilloche" aria-hidden="true"></canvas>
    <div class="wrap">
      <section class="course" aria-labelledby="course-h">
        <div class="section-head">
          <h2 id="course-h">The course</h2>
          <p>Five units, meant to be taken in order. Each lesson takes 10 to 16 minutes, and you complete it by passing its quiz.</p>
        </div>
        ${unitHtml}
      </section>
      <section class="tools" aria-labelledby="tools-h">
        <div class="section-head"><h2 id="tools-h">Study tools</h2></div>
        <div class="tool-grid">
          <a class="tool" href="#labs"><span class="tool-title">Labs</span><span class="tool-desc">Every interactive graph and calculator in one place.</span></a>
          <a class="tool" href="#flashcards"><span class="tool-title">Flashcards</span><span class="tool-desc">${glossary.length} key terms, with spaced repetition that brings back the ones you miss.</span></a>
          <a class="tool" href="#glossary"><span class="tool-title">Glossary</span><span class="tool-desc">Search every definition in the course.</span></a>
          <a class="tool" href="#exam"><span class="tool-title">Practice exam</span><span class="tool-desc">A random mix of quiz questions from across the course.${data.exam ? ` Best score: ${data.exam.best}/${data.exam.total}.` : ''}</span></a>
        </div>
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
    return units.map(u => `
      <p class="syl-unit">Unit ${u.n}: ${esc(u.title)}</p>
      <ol class="syl-list">
        ${lessons.filter(l => l.unit === u.id).map(l => `
        <li><a class="syl-link${l.id === current.id ? ' is-current' : ''}${data.done[l.id] ? ' is-done' : ''}" href="#lesson-${l.id}"${l.id === current.id ? ' aria-current="page"' : ''}>
          <span class="syl-n">${data.done[l.id] ? '<span class="tick" aria-label="complete">✓</span>' : l.n}</span><span>${esc(l.title)}</span>
        </a></li>`).join('')}
      </ol>`).join('');
  }

  function renderLesson(l) {
    setTitle(l.title);
    const u = unitById[l.unit];
    const prev = lessons[l.n - 2], next = lessons[l.n];
    main.innerHTML = `
    <div class="wrap lesson-layout">
      <aside class="syllabus" aria-label="Course contents">${syllabusHtml(l)}</aside>
      <article class="lesson">
        <details class="syllabus-mobile">
          <summary>All lessons</summary>
          ${syllabusHtml(l)}
        </details>
        <header class="lesson-head">
          <p class="eyebrow">Unit ${u.n} · Lesson ${l.n} of ${lessons.length}</p>
          <h1>${esc(l.title)}</h1>
          <p class="lede">${esc(l.summary)}</p>
          <div class="meta"><span>${l.minutes} min read</span><span id="lesson-status">${statusChip(l)}</span>
            <button type="button" class="btn btn-quiet btn-small" id="mark-done"></button></div>
        </header>
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
        <div id="quiz-host"></div>
        <nav class="pager" aria-label="Lesson navigation">
          ${prev ? `<a class="pager-link" href="#lesson-${prev.id}"><span class="pager-dir">← Previous</span><span class="pager-title">${prev.n}. ${esc(prev.title)}</span></a>` : '<span></span>'}
          ${next ? `<a class="pager-link next" href="#lesson-${next.id}"><span class="pager-dir">Next →</span><span class="pager-title">${next.n}. ${esc(next.title)}</span></a>`
                 : '<a class="pager-link next" href="#exam"><span class="pager-dir">Finished the course?</span><span class="pager-title">Take the practice exam</span></a>'}
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

    lessonQuiz(main.querySelector('#quiz-host'), l, next, refreshStatus);
  }

  function lessonQuiz(host, l, next, onChange) {
    const quiz = l.quiz.map(prepare);
    const total = quiz.length, need = passMark(total);
    let answered = 0, correct = 0;
    host.innerHTML = `
      <section class="quiz" aria-labelledby="quiz-h">
        <div class="quiz-head">
          <h2 id="quiz-h">Check your understanding</h2>
          <p>${total} questions. Get ${need} right to complete the lesson. Each answer is explained once you choose.</p>
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
      res.innerHTML = `
        <p class="score"><strong>${correct}</strong> of ${total} correct</p>
        <p>${passed ? 'Lesson complete. Nice work.' : `You need ${need} to complete the lesson. Review the sections behind the questions you missed, then try again.`}</p>
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
    { id: 'market', title: 'Supply and demand', lesson: 'equilibrium', html: '<div data-widget="market" data-preset="full"></div>' },
    { id: 'ppf', title: 'Production possibilities', lesson: 'ppf', html: '<div data-widget="ppf"></div>' },
    { id: 'advantage', title: 'Comparative advantage', lesson: 'trade', html: '<div data-widget="advantage"></div>' },
    { id: 'elasticity', title: 'Elasticity', lesson: 'elasticity', html: '<div data-widget="elasticity"></div>' },
    { id: 'inflation', title: 'Inflation', lesson: 'inflation', html: '<div data-widget="inflation"></div>' },
    { id: 'adas', title: 'AD-AS model', lesson: 'ad-as', html: '<div data-widget="adas" data-preset="adas"></div>' },
    { id: 'monetary', title: 'Monetary policy', lesson: 'monetary-policy', html: '<div data-widget="adas" data-preset="monetary"></div>' },
    { id: 'fiscal', title: 'Fiscal policy', lesson: 'fiscal-policy', html: '<div data-widget="adas" data-preset="fiscal"></div>' }
  ];
  function renderLabs() {
    setTitle('Labs');
    main.innerHTML = `
    <div class="wrap page">
      <header class="page-head">
        <p class="eyebrow">Study tools</p>
        <h1>Labs</h1>
        <p class="lede">Every interactive model in the course. Change one thing at a time and predict what will happen before you look.</p>
        <nav class="chips jump" aria-label="Jump to a lab">
          ${LABS.map(x => `<button type="button" class="chip" data-jump="lab-${x.id}">${esc(x.title)}</button>`).join('')}
        </nav>
      </header>
      ${LABS.map(x => `
      <section class="lab-section" id="lab-${x.id}" aria-label="${esc(x.title)}">
        <p class="lab-from">From <a href="#lesson-${x.lesson}">Lesson ${byId[x.lesson].n}: ${esc(byId[x.lesson].title)}</a></p>
        ${x.html}
      </section>`).join('')}
    </div>`;
    main.querySelectorAll('[data-jump]').forEach(b => b.addEventListener('click', () => {
      const t = document.getElementById(b.dataset.jump);
      if (t) t.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    }));
  }

  /* ---------- flashcards ---------- */
  function renderFlashcards(scope) {
    setTitle('Flashcards');
    const deckOptions = [['', `All terms (${glossary.length})`]]
      .concat(units.map(u => [u.id, `Unit ${u.n}: ${u.title}`]))
      .concat(lessons.map(l => [l.id, `Lesson ${l.n}: ${l.title}`]));
    if (!deckOptions.some(o => o[0] === scope)) scope = '';
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
          <select id="fc-deck">${deckOptions.map(([v, t]) => `<option value="${v}"${v === scope ? ' selected' : ''}>${esc(t)}</option>`).join('')}</select>
        </div>
        <div class="check"><input type="checkbox" id="fc-reverse"><label for="fc-reverse">Show the definition first</label></div>
      </div>
      <p class="fc-stats" id="fc-stats"></p>
      <div id="fc-stage"></div>
      <p class="fc-keys">Keyboard: <kbd>Space</kbd> flip · <kbd>1</kbd> again · <kbd>2</kbd> got it</p>
    </div>`;

    const stage = main.querySelector('#fc-stage');
    const stats = main.querySelector('#fc-stats');
    const deck = () => glossary.filter(g => !st.scope || g.lesson.id === st.scope || g.lesson.unit === st.scope);
    const box = g => data.cards[g.key] || 0;

    function start(onlyMissed) {
      let cards = deck();
      if (onlyMissed) cards = cards.filter(g => st.missed.has(g.key));
      const groups = {};
      cards.forEach(g => { (groups[box(g)] = groups[box(g)] || []).push(g); });
      st.queue = Object.keys(groups).map(Number).sort((a, b) => a - b).flatMap(b => shuffle(groups[b]));
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
          <span class="fc-face fc-back">${back}<span class="fc-src">Lesson ${g.lesson.n}: ${esc(g.lesson.title)}</span></span>
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
        <p class="lede">Every key term in the course, with a link to the lesson that explains it.</p>
      </header>
      <div class="gl-search">
        <label for="gl-q">Search terms and definitions</label>
        <input type="search" id="gl-q" placeholder="Try “elasticity” or “surplus”" autocomplete="off">
        <p class="gl-count" id="gl-count" aria-live="polite"></p>
      </div>
      <nav class="gl-letters" id="gl-letters" aria-label="Jump to letter"></nav>
      <div id="gl-list"></div>
    </div>`;
    const list = main.querySelector('#gl-list');
    const count = main.querySelector('#gl-count');
    const letters = main.querySelector('#gl-letters');
    const input = main.querySelector('#gl-q');
    function draw() {
      const q = input.value.trim().toLowerCase();
      const items = glossary.filter(g => !q || g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q));
      count.textContent = q ? `${items.length} of ${glossary.length} terms match` : `${glossary.length} terms`;
      const groups = {};
      items.forEach(g => { const L = g.term[0].toUpperCase(); (groups[L] = groups[L] || []).push(g); });
      const keys = Object.keys(groups).sort();
      letters.innerHTML = keys.map(L => `<button type="button" data-letter="${L}">${L}</button>`).join('');
      list.innerHTML = keys.length ? keys.map(L => `
        <section class="gl-group" id="gl-${L}" aria-labelledby="gl-h-${L}">
          <h2 id="gl-h-${L}">${L}</h2>
          <dl>${groups[L].map(g => `<div class="gl-item"><dt>${esc(g.term)}</dt><dd>${esc(g.def)} <a href="#lesson-${g.lesson.id}">Lesson ${g.lesson.n}</a></dd></div>`).join('')}</dl>
        </section>`).join('') : '<p class="empty">No terms match. Try a shorter word.</p>';
      letters.querySelectorAll('[data-letter]').forEach(b => b.addEventListener('click', () => {
        document.getElementById('gl-' + b.dataset.letter).scrollIntoView({ block: 'start' });
      }));
    }
    input.addEventListener('input', draw);
    draw();
  }

  /* ---------- practice exam ---------- */
  function renderExam() {
    setTitle('Practice exam');
    const pool = lessons.flatMap(l => l.quiz.map(q => ({ q, l })));
    const donePool = () => pool.filter(x => data.done[x.l.id]);
    const st = { scope: 'all', size: 10 };
    main.innerHTML = `
    <div class="wrap page page-narrow">
      <header class="page-head">
        <p class="eyebrow">Study tools</p>
        <h1>Practice exam</h1>
        <p class="lede">A random set of questions from the lesson quizzes. You see the answers only after you submit, as in a real exam.</p>
      </header>
      <div id="exam-stage"></div>
    </div>`;
    const stage = main.querySelector('#exam-stage');

    function setup() {
      const nDone = donePool().length;
      if (nDone < 5 && st.scope === 'done') st.scope = 'all';
      stage.innerHTML = `
        <div class="exam-setup">
          <fieldset>
            <legend>Questions from</legend>
            <div class="radio"><input type="radio" name="scope" id="sc-all" value="all"${st.scope === 'all' ? ' checked' : ''}><label for="sc-all">All ${lessons.length} lessons (${pool.length} questions)</label></div>
            <div class="radio"><input type="radio" name="scope" id="sc-done" value="done"${st.scope === 'done' ? ' checked' : ''}${nDone < 5 ? ' disabled' : ''}><label for="sc-done">Only lessons I’ve completed${nDone < 5 ? ' (complete a couple of lessons first)' : ` (${nDone} questions)`}</label></div>
          </fieldset>
          <fieldset>
            <legend>Length</legend>
            <div class="radio"><input type="radio" name="size" id="sz-10" value="10"${st.size === 10 ? ' checked' : ''}><label for="sz-10">10 questions</label></div>
            <div class="radio"><input type="radio" name="size" id="sz-20" value="20"${st.size === 20 ? ' checked' : ''}><label for="sz-20">20 questions</label></div>
          </fieldset>
          <button type="button" class="btn btn-primary" id="exam-start">Start exam</button>
          ${data.exam ? `<p class="exam-best">Your best so far: ${data.exam.best} of ${data.exam.total} (${Math.round(data.exam.best / data.exam.total * 100)}%).</p>` : ''}
        </div>`;
      stage.querySelectorAll('input[name="scope"]').forEach(r => r.addEventListener('change', () => { st.scope = r.value; }));
      stage.querySelectorAll('input[name="size"]').forEach(r => r.addEventListener('change', () => { st.size = Number(r.value); }));
      stage.querySelector('#exam-start').addEventListener('click', run);
    }

    function run() {
      const src = st.scope === 'done' ? donePool() : pool;
      const qs = shuffle(src).slice(0, Math.min(st.size, src.length)).map(x => ({ q: prepare(x.q), l: x.l }));
      const picks = new Array(qs.length).fill(null);
      stage.innerHTML = `
        <form class="exam" novalidate>
          <ol class="q-list">${qs.map((x, i) => questionHtml(x.q, i, `<p class="q-from">Lesson ${x.l.n}: ${esc(x.l.title)}</p>`)).join('')}</ol>
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
        revealQuestion(li, q, picks[i], picks[i] === q.answer ? '' : `<p class="fb-link"><a href="#lesson-${l.id}">Review Lesson ${l.n}: ${esc(l.title)}</a></p>`);
        li.querySelectorAll('.opt').forEach(o => o.classList.remove('is-picked'));
      });
      const prevBest = data.exam ? data.exam.best / data.exam.total : -1;
      if (score / qs.length > prevBest) { data.exam = { best: score, total: qs.length }; save(); }
      const pctScore = Math.round(score / qs.length * 100);
      const bar = stage.querySelector('.exam-bar');
      bar.outerHTML = `
        <div class="quiz-result ${pctScore >= 75 ? 'is-pass' : 'is-retry'}">
          <p class="score"><strong>${score}</strong> of ${qs.length} correct (${pctScore}%)</p>
          <p>${pctScore >= 90 ? 'Excellent. You clearly know this material.' : pctScore >= 75 ? 'Solid work. Review the questions you missed below.' : 'Keep going. Each missed question links to the lesson that covers it.'}</p>
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

  document.getElementById('skip-link').addEventListener('click', e => {
    e.preventDefault();
    main.focus();
  });
  window.addEventListener('hashchange', route);
  wireFooter();
  route();
})();
