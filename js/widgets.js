/* Interactive labs: SVG charts and calculators. Each widget is mounted on an element
   with data-widget="name" (and optionally data-preset="…"). */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  let uid = 0;

  /* ---------- small helpers ---------- */
  function h(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        const v = attrs[k];
        if (v == null || v === false) continue;
        if (k === 'text') node.textContent = v;
        else if (k === 'html') node.innerHTML = v;
        else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? '' : v);
      }
    }
    (children || []).forEach(c => c && node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return node;
  }
  function s(tag, attrs, parent) {
    const node = document.createElementNS(NS, tag);
    for (const k in attrs || {}) node.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(node);
    return node;
  }
  function stext(parent, x, y, str, attrs) {
    const t = s('text', Object.assign({ x, y }, attrs || {}), parent);
    t.textContent = str;
    return t;
  }
  const id = p => `${p}-${++uid}`;
  const money = v => (v < 0 ? '−$' : '$') + Math.abs(v).toFixed(2);
  const trim = (v, d = 2) => {
    const r = Number(v.toFixed(d));
    return (Object.is(r, -0) ? 0 : r).toLocaleString('en-US', { maximumFractionDigits: d });
  };
  const signed = (v, unit) => (v > 0 ? '+' : v < 0 ? '−' : '') + trim(Math.abs(v)) + (unit ? ' ' + unit : '');
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const pct = v => trim(v * 100, 1) + '%';

  /* ---------- chart scaffold ---------- */
  function Chart(host, opts) {
    const root = s('svg', { class: 'chart', role: 'img', 'aria-label': opts.label || '' });
    host.appendChild(root);
    const c = { root, opts, layers: {} };
    c.build = function (w) {
      const o = c.opts;
      w = Math.round(clamp(w, 260, 720));
      const hgt = Math.round(clamp(w * (o.ratio || 0.7), 220, o.maxH || 420));
      const m = { t: 30, r: 20, b: 46, l: o.left || 56 };
      Object.assign(c, { w, h: hgt, m });
      root.setAttribute('viewBox', `0 0 ${w} ${hgt}`);
      root.textContent = '';
      c.X = v => m.l + (v / o.xMax) * (w - m.l - m.r);
      c.Y = v => hgt - m.b - (v / o.yMax) * (hgt - m.t - m.b);
      c.toData = (px, py) => [
        ((px - m.l) / (w - m.l - m.r)) * o.xMax,
        ((hgt - m.b - py) / (hgt - m.t - m.b)) * o.yMax
      ];

      const grid = s('g', { class: 'c-grid' }, root);
      const xFmt = o.xFmt || (v => trim(v));
      const yFmt = o.yFmt || (v => trim(v));
      const xSkip = (c.X(o.xStep) - c.X(0)) < 34 ? 2 : 1;
      let i = 0;
      for (let v = 0; v <= o.xMax + 1e-9; v += o.xStep, i++) {
        const x = c.X(v);
        if (v > 0) s('line', { x1: x, x2: x, y1: c.Y(0), y2: c.Y(o.yMax), class: 'gridline' }, grid);
        if (i % xSkip === 0) stext(grid, x, c.Y(0) + 17, xFmt(v), { class: 'tick', 'text-anchor': 'middle' });
      }
      for (let v = 0; v <= o.yMax + 1e-9; v += o.yStep) {
        const y = c.Y(v);
        if (v > 0) s('line', { x1: c.X(0), x2: c.X(o.xMax), y1: y, y2: y, class: 'gridline' }, grid);
        stext(grid, c.X(0) - 8, y + 4, yFmt(v), { class: 'tick', 'text-anchor': 'end' });
      }
      s('line', { x1: c.X(0), x2: c.X(o.xMax), y1: c.Y(0), y2: c.Y(0), class: 'axis' }, grid);
      s('line', { x1: c.X(0), x2: c.X(0), y1: c.Y(0), y2: c.Y(o.yMax), class: 'axis' }, grid);
      stext(grid, (c.X(0) + c.X(o.xMax)) / 2, hgt - 6, o.xLabel, { class: 'axis-label', 'text-anchor': 'middle' });
      stext(grid, c.X(0) + 8, m.t - 12, o.yLabel, { class: 'axis-label', 'text-anchor': 'start' });

      ['area', 'lines', 'marks', 'labels'].forEach(k => { c.layers[k] = s('g', { class: 'c-' + k }, root); });
    };
    c.clear = () => Object.values(c.layers).forEach(g => { g.textContent = ''; });

    /* Straight line P = a + kQ clipped to the plot box. Returns [[q,p],[q,p]] or null. */
    c.clip = (a, k) => {
      const o = c.opts;
      let lo = 0, hi = o.xMax;
      if (k === 0) { if (a < 0 || a > o.yMax) return null; }
      else {
        const q0 = -a / k, q1 = (o.yMax - a) / k;
        lo = Math.max(lo, Math.min(q0, q1));
        hi = Math.min(hi, Math.max(q0, q1));
      }
      return lo < hi ? [[lo, a + k * lo], [hi, a + k * hi]] : null;
    };
    c.line = (a, k, cls, label, labelAt) => {
      const seg = c.clip(a, k);
      if (!seg) return;
      const [[q1, p1], [q2, p2]] = seg;
      s('line', { x1: c.X(q1), y1: c.Y(p1), x2: c.X(q2), y2: c.Y(p2), class: cls }, c.layers.lines);
      if (label) {
        const [q, p] = labelAt === 'start' ? seg[0] : seg[1];
        c.label(c.X(q), c.Y(p), label, cls.replace(/\bcurve\b/g, '').trim());
      }
    };
    c.vline = (q, cls, label) => {
      s('line', { x1: c.X(q), x2: c.X(q), y1: c.Y(0), y2: c.Y(c.opts.yMax), class: cls }, c.layers.lines);
      if (label) stext(c.layers.labels, c.X(q) + 5, c.Y(c.opts.yMax) + 13, label, { class: 'curve-label ' + cls.replace(/\bcurve\b/g, '').trim() });
    };
    c.hline = (p, cls, label) => {
      s('line', { x1: c.X(0), x2: c.X(c.opts.xMax), y1: c.Y(p), y2: c.Y(p), class: cls }, c.layers.lines);
      if (label) stext(c.layers.labels, c.X(c.opts.xMax) - 4, c.Y(p) - 6, label, { class: 'curve-label ' + cls, 'text-anchor': 'end' });
    };
    c.label = (x, y, str, cls) => {
      const nearRight = x > c.w - c.m.r - 40;
      const nearTop = y < c.m.t + 12;
      stext(c.layers.labels, nearRight ? x - 6 : x + 6, nearTop ? y + 14 : y - 6, str, {
        class: 'curve-label ' + (cls || ''),
        'text-anchor': nearRight ? 'end' : 'start'
      });
    };
    c.poly = (pts, cls) => {
      if (pts.length < 3) return;
      s('polygon', { points: pts.map(([q, p]) => `${c.X(q)},${c.Y(p)}`).join(' '), class: cls }, c.layers.area);
    };
    c.path = (pts, cls, layer) => {
      s('polyline', { points: pts.map(([q, p]) => `${c.X(q)},${c.Y(p)}`).join(' '), class: cls, fill: 'none' }, c.layers[layer || 'lines']);
    };
    c.dot = (q, p, cls) => s('circle', { cx: c.X(q), cy: c.Y(p), r: 5.5, class: 'dot ' + (cls || '') }, c.layers.marks);
    /* Dashed guides from a point to both axes, with value tags on the axes. */
    c.guides = (q, p, xTxt, yTxt, cls) => {
      const g = c.layers.marks;
      s('polyline', { points: `${c.X(0)},${c.Y(p)} ${c.X(q)},${c.Y(p)} ${c.X(q)},${c.Y(0)}`, class: 'guide ' + (cls || ''), fill: 'none' }, g);
      if (yTxt) c.tag(c.X(0) - 4, c.Y(p), yTxt, 'end', cls);
      if (xTxt) c.tag(c.X(q), c.Y(0) + 17, xTxt, 'middle', cls);
    };
    c.tag = (x, y, str, anchor, cls) => {
      const g = s('g', { class: 'tag ' + (cls || '') }, c.layers.labels);
      const wEst = str.length * 7.4 + 10;
      const x0 = Math.max(1, anchor === 'end' ? x - wEst : anchor === 'middle' ? x - wEst / 2 : x);
      s('rect', { x: x0, y: y - 10, width: wEst, height: 18, rx: 3 }, g);
      stext(g, x0 + wEst / 2, y + 3.5, str, { 'text-anchor': 'middle' });
    };
    c.bracket = (q1, q2, p, str, cls) => {
      const y = c.Y(p) + 16;
      const g = c.layers.marks;
      s('line', { x1: c.X(q1), x2: c.X(q2), y1: y, y2: y, class: 'bracket ' + (cls || '') }, g);
      s('line', { x1: c.X(q1), x2: c.X(q1), y1: y - 5, y2: y + 5, class: 'bracket ' + (cls || '') }, g);
      s('line', { x1: c.X(q2), x2: c.X(q2), y1: y - 5, y2: y + 5, class: 'bracket ' + (cls || '') }, g);
      stext(c.layers.labels, (c.X(q1) + c.X(q2)) / 2, y + 16, str, { class: 'bracket-label ' + (cls || ''), 'text-anchor': 'middle' });
    };
    return c;
  }

  /* Keeps a chart sized to its container and redraws on resize. */
  function autosize(chart, host, draw) {
    let last = 0;
    const fit = () => {
      const w = host.clientWidth || 520;
      if (Math.abs(w - last) < 4) return;
      last = w;
      chart.build(w);
      draw();
    };
    fit();
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(host);
    else window.addEventListener('resize', fit);
  }

  /* ---------- form controls ---------- */
  function slider(o) {
    const inputId = id(o.name);
    const out = h('output', { for: inputId });
    const input = h('input', {
      type: 'range', id: inputId, min: o.min, max: o.max, step: o.step, value: o.value,
      'aria-describedby': o.hint ? inputId + '-hint' : null
    });
    const row = h('div', { class: 'ctl' }, [
      h('div', { class: 'ctl-top' }, [h('label', { for: inputId, text: o.label }), out]),
      input,
      o.hint ? h('div', { class: 'ctl-hint', id: inputId + '-hint' }, o.hint.map(t => h('span', { text: t }))) : null
    ]);
    const show = () => { out.textContent = o.fmt ? o.fmt(Number(input.value)) : input.value; };
    input.addEventListener('input', () => { show(); o.onInput(Number(input.value)); });
    show();
    return {
      row, input,
      set(v) { input.value = v; show(); },
      get value() { return Number(input.value); }
    };
  }

  function segmented(label, options, value, onChange) {
    const wrap = h('div', { class: 'seg', role: 'radiogroup', 'aria-label': label });
    const buttons = options.map(([val, text]) => {
      const b = h('button', { type: 'button', role: 'radio', 'aria-checked': String(val === value), text });
      b.addEventListener('click', () => { select(val); onChange(val); });
      b.addEventListener('keydown', e => {
        const i = options.findIndex(o => o[0] === val);
        let j = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % options.length;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + options.length) % options.length;
        if (j != null) { e.preventDefault(); buttons[j].click(); buttons[j].focus(); }
      });
      wrap.appendChild(b);
      return b;
    });
    function select(val) {
      options.forEach(([v], i) => {
        buttons[i].setAttribute('aria-checked', String(v === val));
        buttons[i].tabIndex = v === val ? 0 : -1;
      });
    }
    select(value);
    return { el: wrap, select };
  }

  function readout(dl, rows) {
    dl.textContent = '';
    rows.forEach(([k, v, cls]) => {
      dl.appendChild(h('div', { class: 'ro' + (cls ? ' ' + cls : '') }, [h('dt', { text: k }), h('dd', { text: v })]));
    });
  }

  function frame(title, desc, extraClass) {
    const fig = h('figure', { class: 'lab ' + (extraClass || '') });
    if (title) {
      fig.appendChild(h('figcaption', { class: 'lab-head' }, [
        h('p', { class: 'lab-kicker', text: 'Interactive' }),
        h('h3', { text: title }),
        desc ? h('p', { class: 'lab-desc', text: desc }) : null
      ]));
    }
    const body = h('div', { class: 'lab-body' });
    const plot = h('div', { class: 'lab-plot' });
    const panel = h('div', { class: 'lab-panel' });
    body.append(plot, panel);
    fig.appendChild(body);
    return { fig, body, plot, panel };
  }

  function legend(items) {
    return h('ul', { class: 'legend' }, items.map(([cls, text]) =>
      h('li', null, [h('span', { class: 'sw ' + cls, 'aria-hidden': 'true' }), document.createTextNode(text)])));
  }

  /* ======================================================================
     MARKET LAB — linear supply and demand
     Demand: P = a − bQ, Supply: P = c + bQ, with b = 0.12.
     Default: a = 16, c = 4 → equilibrium Q = 50, P = $10.
     ====================================================================== */
  const MARKET_PRESETS = {
    hero: { shifts: ['d'], modes: ['none'], compact: true },
    equilibrium: {
      title: 'Market lab: equilibrium',
      desc: 'Pick an event, or drag the sliders to shift the curves. Faded lines show where the market started.',
      shifts: ['d', 's'], scenarios: true, modes: ['none'], surplusToggle: true
    },
    surplus: {
      title: 'Market lab: consumer and producer surplus',
      desc: 'Blue is consumer surplus and orange is producer surplus. Shift the curves and watch the areas change.',
      shifts: ['d', 's'], modes: ['none'], surplus: true, surplusToggle: true
    },
    controls: {
      title: 'Market lab: price controls and taxes',
      desc: 'Choose a policy, then move its slider. Gray marks the deadweight loss.',
      shifts: ['d', 's'], modes: ['ceiling', 'floor', 'tax'], mode: 'ceiling', surplus: true, surplusToggle: true
    },
    externality: {
      title: 'Market lab: pollution',
      desc: 'Each unit produced causes damage to people outside the market. Set how much.',
      shifts: [], modes: ['externality'], mode: 'externality'
    },
    full: {
      title: 'Market lab',
      desc: 'Shift supply and demand, try real-world events, and test price controls, taxes and pollution.',
      shifts: ['d', 's'], scenarios: true, modes: ['none', 'ceiling', 'floor', 'tax', 'externality'], surplusToggle: true
    }
  };
  const MODE_NAMES = { none: 'Free market', ceiling: 'Price ceiling', floor: 'Price floor', tax: 'Tax', externality: 'Pollution' };
  const SCENARIOS = [
    { label: 'Incomes rise', d: 20, s: 0, text: 'For a normal good, higher incomes raise demand at every price. Demand shifts right, so price and quantity both rise.' },
    { label: 'A substitute gets cheaper', d: -20, s: 0, text: 'Some buyers switch to the cheaper substitute. Demand shifts left, so price and quantity both fall.' },
    { label: 'Better technology', d: 0, s: 20, text: 'Lower production costs mean sellers offer more at every price. Supply shifts right: the price falls and quantity rises.' },
    { label: 'A drought hits', d: 0, s: -20, text: 'The drought destroys part of the crop. Supply shifts left: the price rises and quantity falls.' },
    { label: 'Incomes rise and costs fall', d: 20, s: 20, text: 'Both curves shift right. Quantity rises for certain. The shifts here are equal, so the price ends up unchanged; with a bigger demand shift it would rise.' }
  ];

  function market(host, presetName) {
    const P = MARKET_PRESETS[presetName] || MARKET_PRESETS.full;
    const B = 0.12, A0 = 16, C0 = 4;
    const st = {
      d: 0, s: 0, mode: P.mode || 'none', ceiling: 7, floor: 13, tax: 3, ext: 4,
      surplus: !!P.surplus, scenario: null
    };
    const f = frame(P.title, P.desc, 'lab-market' + (P.compact ? ' lab-compact' : ''));
    const chart = Chart(f.plot, {
      xMax: 100, yMax: 20, xStep: 20, yStep: 4, xLabel: 'Quantity', yLabel: 'Price',
      yFmt: v => '$' + v, ratio: P.compact ? 0.66 : 0.72, maxH: P.compact ? 340 : 420,
      label: 'Supply and demand graph'
    });
    if (!P.compact) {
      f.plot.appendChild(legend([['demand', 'Demand'], ['supply', 'Supply'], ['cs', 'Consumer surplus'], ['ps', 'Producer surplus'], ['dwl', 'Deadweight loss']]));
    }

    const panel = f.panel;
    let scenarioBtns = [];
    if (P.scenarios) {
      const wrap = h('div', { class: 'chips', role: 'group', 'aria-label': 'Events' });
      scenarioBtns = SCENARIOS.map((sc, i) => {
        const b = h('button', { type: 'button', class: 'chip', 'aria-pressed': 'false', text: sc.label });
        b.addEventListener('click', () => {
          st.d = sc.d; st.s = sc.s; st.scenario = i;
          if (dSl) dSl.set(st.d);
          if (sSl) sSl.set(st.s);
          update();
        });
        wrap.appendChild(b);
        return b;
      });
      panel.append(h('p', { class: 'panel-label', text: 'Try an event' }), wrap);
    }

    const shiftFmt = v => v === 0 ? 'No shift' : signed(v, 'units');
    let dSl = null, sSl = null;
    if (P.shifts.includes('d')) {
      dSl = slider({
        name: 'demand', label: P.compact ? 'Shift demand' : 'Demand', min: -25, max: 25, step: 5, value: 0, fmt: shiftFmt,
        hint: ['← decrease', 'increase →'], onInput: v => { st.d = v; st.scenario = null; update(); }
      });
      panel.appendChild(dSl.row);
    }
    if (P.shifts.includes('s')) {
      sSl = slider({
        name: 'supply', label: 'Supply', min: -25, max: 25, step: 5, value: 0, fmt: shiftFmt,
        hint: ['← decrease', 'increase →'], onInput: v => { st.s = v; st.scenario = null; update(); }
      });
      panel.appendChild(sSl.row);
    }

    let seg = null;
    const modeCtl = h('div', { class: 'mode-ctl' });
    if (P.modes.length > 1) {
      seg = segmented('Policy', P.modes.map(m => [m, MODE_NAMES[m]]), st.mode, m => { st.mode = m; buildModeSlider(); update(); });
      panel.append(h('p', { class: 'panel-label', text: 'Policy' }), seg.el);
    }
    panel.appendChild(modeCtl);
    function buildModeSlider() {
      modeCtl.textContent = '';
      const m = st.mode;
      if (m === 'ceiling') modeCtl.appendChild(slider({ name: 'ceiling', label: 'Maximum legal price', min: 1, max: 19, step: 0.5, value: st.ceiling, fmt: money, onInput: v => { st.ceiling = v; update(); } }).row);
      if (m === 'floor') modeCtl.appendChild(slider({ name: 'floor', label: 'Minimum legal price', min: 1, max: 19, step: 0.5, value: st.floor, fmt: money, onInput: v => { st.floor = v; update(); } }).row);
      if (m === 'tax') modeCtl.appendChild(slider({ name: 'tax', label: 'Tax per unit', min: 0, max: 8, step: 0.5, value: st.tax, fmt: money, onInput: v => { st.tax = v; update(); } }).row);
      if (m === 'externality') modeCtl.appendChild(slider({ name: 'ext', label: 'Pollution damage per unit', min: 0, max: 8, step: 0.5, value: st.ext, fmt: money, onInput: v => { st.ext = v; update(); } }).row);
    }
    buildModeSlider();

    let surplusBox = null;
    if (P.surplusToggle) {
      const cid = id('surplus');
      surplusBox = h('input', { type: 'checkbox', id: cid });
      surplusBox.checked = st.surplus;
      surplusBox.addEventListener('change', () => { st.surplus = surplusBox.checked; update(); });
      panel.appendChild(h('div', { class: 'check' }, [surplusBox, h('label', { for: cid, text: 'Shade consumer and producer surplus' })]));
    }

    const dl = h('dl', { class: 'readout' + (P.compact ? ' readout-mini' : '') });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    panel.append(dl, note);
    if (!P.compact) {
      const reset = h('button', { type: 'button', class: 'btn btn-quiet', text: 'Reset' });
      reset.addEventListener('click', () => {
        Object.assign(st, { d: 0, s: 0, scenario: null, ceiling: 7, floor: 13, tax: 3, ext: 4, surplus: !!P.surplus, mode: P.mode || 'none' });
        if (dSl) dSl.set(0);
        if (sSl) sSl.set(0);
        if (seg) seg.select(st.mode);
        if (surplusBox) surplusBox.checked = st.surplus;
        buildModeSlider();
        update();
      });
      panel.appendChild(reset);
    }

    function compute() {
      const a = A0 + B * st.d, c = C0 - B * st.s;
      const D = q => a - B * q, S = q => c + B * q;
      const qe = (a - c) / (2 * B), pe = D(qe);
      const r = { a, c, D, S, qe, pe, qt: qe, pb: pe, pSel: pe, qd: qe, qs: qe, gap: 0, rev: 0, dwl: 0, binding: false };
      if (st.mode === 'ceiling' && st.ceiling < pe) {
        const p = st.ceiling;
        r.binding = true; r.qd = (a - p) / B; r.qs = Math.max(0, (p - c) / B);
        r.qt = r.qs; r.pb = r.pSel = p; r.gap = r.qd - r.qs;
      } else if (st.mode === 'floor' && st.floor > pe) {
        const p = st.floor;
        r.binding = true; r.qd = Math.max(0, (a - p) / B); r.qs = (p - c) / B;
        r.qt = r.qd; r.pb = r.pSel = p; r.gap = r.qs - r.qd;
      } else if (st.mode === 'tax' && st.tax > 0) {
        r.qt = Math.max(0, (a - c - st.tax) / (2 * B));
        r.pb = D(r.qt); r.pSel = r.pb - st.tax; r.rev = st.tax * r.qt;
        r.dwl = 0.5 * st.tax * (qe - r.qt);
      } else if (st.mode === 'externality') {
        r.qo = Math.max(0, (a - c - st.ext) / (2 * B));
        r.po = D(r.qo);
        r.dwl = 0.5 * st.ext * (qe - r.qo);
      }
      if (r.binding) r.dwl = 0.5 * (D(r.qt) - S(r.qt)) * (qe - r.qt);
      r.cs = (a - r.pb) * r.qt - 0.5 * B * r.qt * r.qt;
      r.ps = (r.pSel - c) * r.qt - 0.5 * B * r.qt * r.qt;
      return r;
    }

    function draw() {
      const r = compute();
      chart.clear();
      const shifted = st.d !== 0 || st.s !== 0;
      const showSurplus = st.surplus && st.mode !== 'externality';

      if (showSurplus && r.qt > 0) {
        chart.poly([[0, r.a], [r.qt, r.D(r.qt)], [r.qt, r.pb], [0, r.pb]], 'fill-cs');
        chart.poly([[0, r.pSel], [r.qt, r.pSel], [r.qt, r.S(r.qt)], [0, r.c]], 'fill-ps');
      }
      if (st.mode === 'tax' && st.tax > 0 && r.qt > 0) {
        chart.poly([[0, r.pSel], [r.qt, r.pSel], [r.qt, r.pb], [0, r.pb]], 'fill-rev');
      }
      if (r.dwl > 0.001) {
        if (st.mode === 'externality') chart.poly([[r.qo, r.po], [r.qe, r.c + st.ext + B * r.qe], [r.qe, r.pe]], 'fill-dwl');
        else chart.poly([[r.qt, r.D(r.qt)], [r.qe, r.pe], [r.qt, r.S(r.qt)]], 'fill-dwl');
      }

      if (shifted) {
        if (st.d !== 0) chart.line(A0, -B, 'curve demand ghost', 'D₀', 'end');
        if (st.s !== 0) chart.line(C0, B, 'curve supply ghost', 'S₀', 'end');
        chart.dot((A0 - C0) / (2 * B), 10, 'ghost');
      }
      chart.line(r.a, -B, 'curve demand', shifted && st.d !== 0 ? 'D₁' : 'D', 'end');
      chart.line(r.c, B, 'curve supply', shifted && st.s !== 0 ? 'S₁' : 'S', 'end');

      if (st.mode === 'ceiling' || st.mode === 'floor') {
        const p = st.mode === 'ceiling' ? st.ceiling : st.floor;
        chart.hline(p, 'control' + (r.binding ? '' : ' slack'), (st.mode === 'ceiling' ? 'Ceiling ' : 'Floor ') + money(p));
        if (r.binding) {
          chart.dot(r.qs, p, 'supply-dot');
          chart.dot(r.qd, p, 'demand-dot');
          const lo = Math.min(r.qd, r.qs), hi = Math.max(r.qd, r.qs);
          if (hi - lo > 4) chart.bracket(lo, hi, p, (st.mode === 'ceiling' ? 'Shortage ' : 'Surplus ') + trim(r.gap, 1), 'gap');
          chart.guides(r.qt, p, trim(r.qt, 1), null, 'hot');
        }
      }
      if (st.mode === 'tax' && st.tax > 0) {
        chart.line(r.c + st.tax, B, 'curve supply taxed', 'S + tax', 'end');
        if (r.qt > 0) {
          chart.guides(r.qt, r.pb, trim(r.qt, 1), money(r.pb), 'hot');
          const roomy = chart.Y(r.pSel) - chart.Y(r.pb) >= 20;
          chart.guides(r.qt, r.pSel, null, roomy ? money(r.pSel) : null, 'hot');
          chart.dot(r.qt, r.pb, 'hot');
          chart.dot(r.qt, r.pSel, 'hot');
        }
      }
      if (st.mode === 'externality') {
        chart.line(r.c + st.ext, B, 'curve supply social', 'Social cost', 'end');
        if (st.ext > 0) {
          chart.guides(r.qo, r.po, trim(r.qo, 1), null, 'good');
          chart.dot(r.qo, r.po, 'good');
        }
      }

      const eqIsOutcome = !r.binding && !(st.mode === 'tax' && st.tax > 0);
      if (eqIsOutcome) chart.guides(r.qe, r.pe, trim(r.qe, 1), money(r.pe));
      chart.dot(r.qe, r.pe, eqIsOutcome ? 'eq' : 'eq faded');

      renderText(r);
    }

    function renderText(r) {
      const m = st.mode;
      const surplusRows = [['Consumer surplus', money(r.cs), 'k-cs'], ['Producer surplus', money(r.ps), 'k-ps']];
      if (P.compact) {
        readout(dl, [['Price', money(r.pe)], ['Quantity', trim(r.qe, 1)]]);
        note.textContent = st.d === 0
          ? 'Drag the slider: when demand rises, price and quantity both rise.'
          : `Price ${st.d > 0 ? 'rose' : 'fell'} from $10.00 to ${money(r.pe)} and quantity ${st.d > 0 ? 'rose' : 'fell'} from 50 to ${trim(r.qe, 1)}.`;
        return;
      }
      if (m === 'none') {
        readout(dl, [['Price', money(r.pe)], ['Quantity', trim(r.qe, 1)], ...surplusRows, ['Total surplus', money(r.cs + r.ps)]]);
        const moved = st.d !== 0 || st.s !== 0;
        let txt = moved
          ? `The price moved from $10.00 to ${money(r.pe)}, and quantity from 50 to ${trim(r.qe, 1)}.`
          : `At ${money(r.pe)}, buyers want exactly as many units as sellers offer: ${trim(r.qe, 1)}. At any higher price there would be a surplus; at any lower price, a shortage.`;
        if (st.scenario != null) txt = SCENARIOS[st.scenario].text + ' ' + txt;
        note.textContent = txt;
      } else if (m === 'ceiling' || m === 'floor') {
        const isC = m === 'ceiling';
        const p = isC ? st.ceiling : st.floor;
        readout(dl, [
          ['Price', money(r.binding ? p : r.pe)],
          ['Quantity demanded', trim(r.qd, 1)],
          ['Quantity supplied', trim(r.qs, 1)],
          [isC ? 'Shortage' : 'Surplus', trim(r.gap, 1), r.gap > 0 ? 'k-warn' : ''],
          ...surplusRows,
          ['Deadweight loss', money(r.dwl), 'k-dwl']
        ]);
        note.textContent = r.binding
          ? (isC
            ? `The ceiling of ${money(p)} is below the equilibrium price of ${money(r.pe)}, so it binds. Buyers want ${trim(r.qd, 1)} units but sellers offer only ${trim(r.qs, 1)}: a shortage of ${trim(r.gap, 1)}. Only ${trim(r.qt, 1)} units change hands.`
            : `The floor of ${money(p)} is above the equilibrium price of ${money(r.pe)}, so it binds. Sellers offer ${trim(r.qs, 1)} units but buyers want only ${trim(r.qd, 1)}: a surplus of ${trim(r.gap, 1)}. Only ${trim(r.qt, 1)} units are sold.`)
          : `A ${isC ? 'ceiling' : 'floor'} of ${money(p)} is ${isC ? 'above' : 'below'} the equilibrium price of ${money(r.pe)}, so it doesn’t bind and the market is unaffected. Move it ${isC ? 'below' : 'above'} ${money(r.pe)}.`;
      } else if (m === 'tax') {
        readout(dl, [
          ['Buyers pay', money(r.pb)],
          ['Sellers keep', money(r.pSel)],
          ['Quantity', trim(r.qt, 1)],
          ['Tax revenue', money(r.rev), 'k-rev'],
          ...surplusRows,
          ['Deadweight loss', money(r.dwl), 'k-dwl']
        ]);
        note.textContent = st.tax === 0
          ? 'Raise the tax to see the wedge it drives between what buyers pay and what sellers keep.'
          : r.qt === 0
            ? 'The tax is so high that no trades happen at all. It raises no revenue, and all the surplus is lost.'
            : `A ${money(st.tax)} tax per unit: buyers pay ${money(r.pb)} and sellers keep ${money(r.pSel)}. Buyers bear ${money(r.pb - r.pe)} of it and sellers ${money(r.pe - r.pSel)}. Quantity falls from ${trim(r.qe, 1)} to ${trim(r.qt, 1)}.`;
      } else if (m === 'externality') {
        readout(dl, [
          ['Market quantity', trim(r.qe, 1)],
          ['Efficient quantity', trim(r.qo, 1), 'k-good'],
          ['Market price', money(r.pe)],
          ['Deadweight loss', money(r.dwl), 'k-dwl']
        ]);
        note.textContent = st.ext === 0
          ? 'With no pollution, the market outcome is efficient. Raise the damage per unit.'
          : `Each unit causes ${money(st.ext)} of damage to people outside the market. Sellers ignore it and produce ${trim(r.qe, 1)} units, but the efficient quantity is ${trim(r.qo, 1)}, where demand meets the social cost curve. A Pigouvian tax of ${money(st.ext)} per unit would get the market there.`;
      }
    }

    function update() {
      scenarioBtns.forEach((b, i) => b.setAttribute('aria-pressed', String(st.scenario === i)));
      draw();
    }

    host.appendChild(f.fig);
    autosize(chart, f.plot, draw);
  }

  /* ======================================================================
     PPF — pizzas vs robots, bowed-out frontier (quarter ellipse)
     ====================================================================== */
  function ppf(host) {
    const XM = 100, YM = 50, G = 1.2;
    const fy = (x, g) => YM * g * Math.sqrt(Math.max(0, 1 - Math.pow(x / (XM * g), 2)));
    const st = { x: 40, util: 100, growth: false, test: null };
    const f = frame('Production possibilities: pizzas or robots', 'Move along the frontier, leave resources idle, or grow the economy. Click the graph to test any point.', 'lab-ppf');
    const chart = Chart(f.plot, {
      xMax: 130, yMax: 65, xStep: 20, yStep: 10, xLabel: 'Pizzas', yLabel: 'Robots', left: 46, label: 'Production possibilities frontier'
    });
    f.plot.appendChild(legend([['frontier', 'Frontier'], ['frontier-grown', 'After growth'], ['point', 'Current output']]));

    const xs = slider({ name: 'pizzas', label: 'Pizzas produced', min: 0, max: 100, step: 10, value: st.x, onInput: v => { st.x = v; draw(); } });
    const us = slider({ name: 'util', label: 'Resources in use', min: 50, max: 100, step: 10, value: 100, fmt: v => v + '%', onInput: v => { st.util = v; draw(); } });
    const gid = id('growth');
    const gBox = h('input', { type: 'checkbox', id: gid });
    gBox.addEventListener('change', () => { st.growth = gBox.checked; draw(); });
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    const testNote = h('p', { class: 'lab-note lab-test', 'aria-live': 'polite', text: 'Click anywhere on the graph to test a point.' });
    f.panel.append(xs.row, us.row, h('div', { class: 'check' }, [gBox, h('label', { for: gid, text: 'Show economic growth (+20%)' })]), dl, note, testNote);

    chart.root.addEventListener('click', e => {
      const pt = chart.root.createSVGPoint();
      pt.x = e.clientX; pt.y = e.clientY;
      const loc = pt.matrixTransform(chart.root.getScreenCTM().inverse());
      const [x, y] = chart.toData(loc.x, loc.y);
      if (x < 0 || y < 0 || x > 130 || y > 65) return;
      st.test = [x, y];
      draw();
    });
    chart.root.classList.add('clickable');

    function draw() {
      chart.clear();
      const pts = g => { const out = []; for (let i = 0; i <= 90; i++) { const t = (Math.PI / 2) * (1 - i / 90); out.push([XM * g * Math.cos(t), YM * g * Math.sin(t)]); } return out; };
      chart.poly([[0, 0], ...pts(1), [XM, 0]], 'fill-attainable');
      if (st.growth) {
        chart.path(pts(G), 'curve frontier grown');
        chart.label(chart.X(XM * G * 0.72), chart.Y(fy(XM * G * 0.72, G)), 'After growth', 'frontier grown');
      }
      chart.path(pts(1), 'curve frontier');
      chart.label(chart.X(XM * 0.72), chart.Y(fy(XM * 0.72, 1)), 'PPF', 'frontier');

      const k = st.util / 100;
      const px = st.x * k, py = fy(st.x, 1) * k;
      chart.guides(px, py, trim(px, 1), trim(py, 1), 'point');
      chart.dot(px, py, 'point');

      if (st.test) {
        const [tx, ty] = st.test;
        const g = st.growth ? G : 1;
        const r = Math.pow(tx / (XM * g), 2) + Math.pow(ty / (YM * g), 2);
        const cls = r <= 0.95 ? 'inside' : r < 1.05 ? 'on' : 'outside';
        const X = chart.X(tx), Y = chart.Y(ty);
        const gm = s('g', { class: 'test-mark ' + cls }, chart.layers.marks);
        s('line', { x1: X - 6, y1: Y - 6, x2: X + 6, y2: Y + 6 }, gm);
        s('line', { x1: X - 6, y1: Y + 6, x2: X + 6, y2: Y - 6 }, gm);
        const where = st.growth ? 'the new frontier' : 'the frontier';
        testNote.textContent = `Test point: ${trim(tx, 0)} pizzas and ${trim(ty, 0)} robots. ` + ({
          inside: `It’s inside ${where}: attainable, but some resources would be idle or wasted.`,
          on: `It’s on ${where}: attainable and efficient.`,
          outside: `It’s outside ${where}: unattainable with the resources and technology available.`
        })[cls];
      }

      const rows = [['Pizzas', trim(px, 1)], ['Robots', trim(py, 1)]];
      if (k === 1 && st.x < XM) rows.push(['Cost of 10 more pizzas', trim(fy(st.x, 1) - fy(st.x + 10, 1), 1) + ' robots', 'k-warn']);
      readout(dl, rows);
      if (k < 1) {
        note.textContent = `Only ${st.util}% of resources are in use, so the economy is inside its frontier, as in a recession. It could have more pizzas and more robots at no cost by putting idle resources back to work.`;
      } else if (st.x >= XM) {
        note.textContent = 'All resources go to pizza. The last 10 pizzas cost the most robots of all, because they use the resources worst suited to making pizza.';
      } else {
        note.textContent = `On the frontier, so production is efficient. Making 10 more pizzas would mean giving up ${trim(fy(st.x, 1) - fy(st.x + 10, 1), 1)} robots, and each further 10 costs more than the last.`;
      }
      if (st.growth) note.textContent += ' With growth, the frontier shifts out by 20%, and combinations between the two curves become possible.';
    }

    host.appendChild(f.fig);
    autosize(chart, f.plot, draw);
  }

  /* ======================================================================
     COMPARATIVE ADVANTAGE calculator
     ====================================================================== */
  function advantage(host) {
    const f = frame('Comparative advantage calculator', 'Enter what each person can make in a week if they spend all their time on one good.', 'lab-calc');
    f.body.classList.add('lab-body-calc');
    const vals = { mb: 80, ms: 40, lb: 20, ls: 20 };
    const inputs = {};
    const field = (key, label) => {
      const fid = id('adv-' + key);
      const inp = h('input', { type: 'number', id: fid, min: '0.1', step: 'any', value: vals[key], inputmode: 'decimal' });
      inp.addEventListener('input', () => { vals[key] = parseFloat(inp.value); calc(); });
      inputs[key] = inp;
      return h('div', { class: 'field' }, [h('label', { for: fid, text: label }), inp]);
    };
    const grid = h('div', { class: 'adv-grid' }, [
      h('div', { class: 'adv-row' }, [h('p', { class: 'adv-name', text: 'Maya' }), field('mb', 'Loaves'), field('ms', 'Shirts')]),
      h('div', { class: 'adv-row' }, [h('p', { class: 'adv-name', text: 'Leo' }), field('lb', 'Loaves'), field('ls', 'Shirts')])
    ]);
    f.plot.appendChild(grid);
    const table = h('div', { class: 'table-wrap' });
    const out = h('div', { class: 'adv-out', 'aria-live': 'polite' });
    f.plot.appendChild(table);
    f.panel.appendChild(out);

    function calc() {
      const { mb, ms, lb, ls } = vals;
      if (![mb, ms, lb, ls].every(v => isFinite(v) && v > 0)) {
        table.innerHTML = '';
        out.innerHTML = '<p class="lab-note">Enter a number greater than zero in every box.</p>';
        return;
      }
      const mLoaf = ms / mb, lLoaf = ls / lb, mShirt = mb / ms, lShirt = lb / ls;
      table.innerHTML = `<table class="num"><thead><tr><th></th><th>1 loaf costs</th><th>1 shirt costs</th></tr></thead><tbody>
        <tr><td>Maya</td><td>${trim(mLoaf)} shirts</td><td>${trim(mShirt)} loaves</td></tr>
        <tr><td>Leo</td><td>${trim(lLoaf)} shirts</td><td>${trim(lShirt)} loaves</td></tr></tbody></table>`;
      const abs = (a, b) => a > b ? 'Maya' : b > a ? 'Leo' : 'Neither (a tie)';
      let html = `<dl class="readout">
        <div class="ro"><dt>Absolute advantage, bread</dt><dd>${abs(mb, lb)}</dd></div>
        <div class="ro"><dt>Absolute advantage, shirts</dt><dd>${abs(ms, ls)}</dd></div>`;
      if (Math.abs(mLoaf - lLoaf) < 1e-9) {
        html += `</dl><p class="lab-note">Their opportunity costs are identical, so neither has a comparative advantage and specializing wouldn’t create any gains from trade.</p>`;
      } else {
        const breadWho = mLoaf < lLoaf ? 'Maya' : 'Leo';
        const shirtWho = breadWho === 'Maya' ? 'Leo' : 'Maya';
        const lo = Math.min(mShirt, lShirt), hi = Math.max(mShirt, lShirt);
        html += `<div class="ro k-good"><dt>Comparative advantage, bread</dt><dd>${breadWho}</dd></div>
          <div class="ro k-good"><dt>Comparative advantage, shirts</dt><dd>${shirtWho}</dd></div></dl>
          <p class="lab-note">${breadWho} should specialize in bread and ${shirtWho} in shirts. Both gain if a shirt trades for between <strong>${trim(lo)}</strong> and <strong>${trim(hi)}</strong> loaves.</p>`;
      }
      out.innerHTML = html;
    }
    calc();
    host.appendChild(f.fig);
  }

  /* ======================================================================
     ELASTICITY calculator (midpoint method)
     ====================================================================== */
  function elasticity(host) {
    const f = frame('Elasticity calculator', 'Enter two prices and the quantity demanded at each. The calculator uses the midpoint method.', 'lab-calc');
    f.body.classList.add('lab-body-calc');
    const vals = { p1: 4, q1: 100, p2: 5, q2: 70 };
    const field = (key, label, prefix) => {
      const fid = id('el-' + key);
      const inp = h('input', { type: 'number', id: fid, min: '0', step: 'any', value: vals[key], inputmode: 'decimal' });
      inp.addEventListener('input', () => { vals[key] = parseFloat(inp.value); calc(); });
      return h('div', { class: 'field' + (prefix ? ' has-prefix' : '') }, [h('label', { for: fid, text: label }), prefix ? h('span', { class: 'prefix', text: prefix, 'aria-hidden': 'true' }) : null, inp]);
    };
    f.plot.appendChild(h('div', { class: 'el-grid' }, [
      h('p', { class: 'adv-name', text: 'Before' }), field('p1', 'Price', '$'), field('q1', 'Quantity'),
      h('p', { class: 'adv-name', text: 'After' }), field('p2', 'Price', '$'), field('q2', 'Quantity')
    ]));
    const meter = h('div', { class: 'meter', 'aria-hidden': 'true' }, [
      h('div', { class: 'meter-track' }, [h('span', { class: 'meter-zone inelastic', text: 'Inelastic' }), h('span', { class: 'meter-zone elastic', text: 'Elastic' })]),
      h('div', { class: 'meter-marker' }),
      h('div', { class: 'meter-scale' }, ['0', '1', '2', '3+'].map(t => h('span', { text: t })))
    ]);
    f.plot.appendChild(meter);
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    f.panel.append(dl, note);

    function calc() {
      const { p1, q1, p2, q2 } = vals;
      if (![p1, q1, p2, q2].every(v => isFinite(v) && v >= 0) || p1 + p2 === 0 || q1 + q2 === 0) {
        readout(dl, []);
        note.textContent = 'Enter prices and quantities of zero or more (they can’t both be zero).';
        meter.classList.add('off');
        return;
      }
      const dq = (q2 - q1) / ((q1 + q2) / 2), dp = (p2 - p1) / ((p1 + p2) / 2);
      if (dp === 0) {
        readout(dl, [['% change in quantity', pct(dq)], ['% change in price', '0%']]);
        note.textContent = 'The price didn’t change, so price elasticity can’t be calculated. Enter two different prices.';
        meter.classList.add('off');
        return;
      }
      const e = Math.abs(dq / dp);
      const kind = Math.abs(e - 1) < 0.005 ? 'unit elastic' : e > 1 ? 'elastic' : e === 0 ? 'perfectly inelastic' : 'inelastic';
      const r1 = p1 * q1, r2 = p2 * q2;
      readout(dl, [
        ['% change in quantity', pct(dq)],
        ['% change in price', pct(dp)],
        ['Elasticity', trim(e), 'k-big'],
        ['Demand is', kind, 'k-wide'],
        ['Revenue before', money(r1)],
        ['Revenue after', money(r2), r2 > r1 ? 'k-good' : r2 < r1 ? 'k-warn' : '']
      ]);
      meter.classList.remove('off');
      meter.style.setProperty('--pos', (Math.min(e, 3) / 3 * 100) + '%');
      const effect = dq === 0 ? 'left quantity unchanged' : `${dq < 0 ? 'cut' : 'raised'} quantity by ${pct(Math.abs(dq))}`;
      let txt = `A ${pct(Math.abs(dp))} ${dp > 0 ? 'rise' : 'fall'} in price ${effect}, so demand is ${kind}. Revenue ${r2 > r1 ? 'rose' : r2 < r1 ? 'fell' : 'stayed the same'} (${money(r1)} → ${money(r2)}).`;
      if (dq * dp > 0) txt += ' Price and quantity moved in the same direction, which breaks the law of demand. That usually means demand itself shifted, rather than buyers moving along one demand curve.';
      note.textContent = txt;
    }
    calc();
    host.appendChild(f.fig);
  }

  /* ======================================================================
     INFLATION calculator — US CPI-U annual averages (1982–84 = 100), BLS
     ====================================================================== */
  const CPI = {
    1950: 24.1, 1955: 26.8, 1960: 29.6, 1965: 31.5, 1970: 38.8, 1975: 53.8, 1980: 82.4, 1985: 107.6,
    1990: 130.7, 1995: 152.4, 2000: 172.2, 2005: 195.3, 2010: 218.056, 2015: 237.017, 2019: 255.657,
    2020: 258.811, 2021: 270.970, 2022: 292.655, 2023: 304.702, 2024: 313.689
  };
  function inflation(host) {
    const years = Object.keys(CPI).map(Number);
    const f = frame('What is money from the past worth today?', 'Adjust an amount for US consumer price inflation between two years.', 'lab-calc lab-inflation');
    const st = { amt: 100, from: 1990, to: 2024 };
    const aid = id('inf-amt'), fid = id('inf-from'), tid = id('inf-to');
    const amt = h('input', { type: 'number', id: aid, min: '0', step: 'any', value: st.amt, inputmode: 'decimal' });
    const sel = (sid, val) => {
      const el = h('select', { id: sid });
      years.forEach(y => el.appendChild(h('option', { value: y, text: String(y), selected: y === val })));
      return el;
    };
    const from = sel(fid, st.from), to = sel(tid, st.to);
    amt.addEventListener('input', () => { st.amt = parseFloat(amt.value); draw(); });
    from.addEventListener('change', () => { st.from = Number(from.value); draw(); });
    to.addEventListener('change', () => { st.to = Number(to.value); draw(); });
    const form = h('div', { class: 'inf-form' }, [
      h('div', { class: 'field has-prefix' }, [h('label', { for: aid, text: 'Amount' }), h('span', { class: 'prefix', text: '$', 'aria-hidden': 'true' }), amt]),
      h('div', { class: 'field' }, [h('label', { for: fid, text: 'In the year' }), from]),
      h('div', { class: 'field' }, [h('label', { for: tid, text: 'Is worth, in' }), to])
    ]);
    const big = h('p', { class: 'inf-big', 'aria-live': 'polite' });
    const dl = h('dl', { class: 'readout' });
    f.panel.append(form, big, dl, h('p', { class: 'lab-source', text: 'Source: US Bureau of Labor Statistics, CPI-U annual averages (1982–84 = 100). Years between those listed are left out.' }));

    const chart = Chart(f.plot, {
      xMax: 75, yMax: 350, xStep: 15, yStep: 50, xLabel: 'Year', yLabel: 'Consumer Price Index',
      xFmt: v => String(1950 + v), left: 50, ratio: 0.62, label: 'US Consumer Price Index since 1950'
    });

    function draw() {
      chart.clear();
      const pts = years.map(y => [y - 1950, CPI[y]]);
      chart.poly([[0, 0], ...pts, [74, 0]], 'fill-cpi');
      chart.path(pts, 'curve cpi');
      [st.from, st.to].forEach((y, i) => {
        chart.guides(y - 1950, CPI[y], null, null, 'point');
        chart.dot(y - 1950, CPI[y], i ? 'eq' : 'point');
      });
      if (!isFinite(st.amt) || st.amt < 0) {
        big.textContent = 'Enter an amount of zero or more.';
        readout(dl, []);
        return;
      }
      const ratio = CPI[st.to] / CPI[st.from];
      const yrs = st.to - st.from;
      big.innerHTML = `<span class="inf-from">${money(st.amt)} in ${st.from}</span> buys about as much as <strong>${money(st.amt * ratio)}</strong> in ${st.to}.`;
      const rows = [
        ['CPI in ' + st.from, trim(CPI[st.from], 1)],
        ['CPI in ' + st.to, trim(CPI[st.to], 1)],
        ['Change in prices', signed((ratio - 1) * 100, '%').replace(' %', '%')]
      ];
      if (yrs !== 0) rows.push(['Average per year', pct(Math.pow(ratio, 1 / yrs) - 1)]);
      readout(dl, rows);
    }
    host.appendChild(f.fig);
    autosize(chart, f.plot, draw);
  }

  /* ======================================================================
     AD-AS model
     AD: P = a − 2Y (a = 200 + 2·ad), SRAS: P = c + 2Y (c = −2·as), LRAS at Y = 50 + lr
     ====================================================================== */
  const ADAS_PRESETS = {
    adas: {
      title: 'AD-AS lab',
      desc: 'Hit the economy with a shock, then let wages adjust. Watch output and the price level.',
      scenarios: [
        { label: 'Confidence collapses', set: { ad: -15, as: 0, lr: 0 }, text: 'Households and firms grow pessimistic and cut spending. AD shifts left: output falls below potential, unemployment rises and the price level falls.' },
        { label: 'Spending boom', set: { ad: 15, as: 0, lr: 0 }, text: 'A surge in spending shifts AD right. Output rises above potential and the price level rises, an inflationary gap.' },
        { label: 'Oil price shock', set: { ad: 0, as: -15, lr: 0 }, text: 'Higher energy costs shift SRAS left. Output falls while prices rise: stagflation.' },
        { label: 'Productivity boom', set: { ad: 0, as: 10, lr: 10 }, text: 'New technology lowers costs and raises capacity. SRAS and LRAS both shift right: more output at a lower price level.' },
        { label: 'Let wages adjust', selfCorrect: true, text: 'Over time, wages and other costs adjust and SRAS shifts until output is back at potential. After a recession, costs fall; after a boom, they rise.' }
      ]
    },
    monetary: {
      title: 'Monetary policy lab',
      desc: 'Start with a shock, then use the central bank’s interest rate to respond.',
      scenarios: [
        { label: 'Recession hits', set: { ad: -15, as: 0, lr: 0 }, text: 'Spending falls and AD shifts left. Output is below potential and unemployment is rising.' },
        { label: 'Inflation surge', set: { ad: 15, as: 0, lr: 0 }, text: 'Spending runs ahead of capacity. AD shifts right and the price level climbs.' },
        { label: 'Oil price shock', set: { ad: 0, as: -15, lr: 0 }, text: 'SRAS shifts left: output falls and prices rise. Cutting rates would help output but add to inflation; raising rates would do the opposite.' },
        { label: 'Cut interest rates', add: { ad: 15 }, text: 'Cheaper borrowing encourages investment and big purchases, and the currency weakens. AD shifts right.' },
        { label: 'Raise interest rates', add: { ad: -15 }, text: 'Dearer borrowing discourages spending. AD shifts left, easing the pressure on prices.' }
      ]
    },
    fiscal: {
      title: 'Fiscal policy lab',
      desc: 'Start with a shock, then use government spending or taxes to respond.',
      scenarios: [
        { label: 'Recession hits', set: { ad: -15, as: 0, lr: 0 }, text: 'Spending falls and AD shifts left. Output is below potential and unemployment is rising.' },
        { label: 'Economy overheats', set: { ad: 15, as: 0, lr: 0 }, text: 'Spending runs ahead of capacity. AD shifts right and the price level climbs.' },
        { label: 'Increase government spending', add: { ad: 15 }, text: 'The government buys more goods and services, and the multiplier spreads the new income through the economy. AD shifts right.' },
        { label: 'Cut taxes', add: { ad: 10 }, text: 'Households keep more of their income and spend part of it. AD shifts right, but less than for the same amount of spending, because some of the tax cut is saved.' },
        { label: 'Cut spending or raise taxes', add: { ad: -15 }, text: 'Less government spending or higher taxes reduce total spending. AD shifts left and the economy cools.' }
      ]
    }
  };

  function adas(host, presetName) {
    const P = ADAS_PRESETS[presetName] || ADAS_PRESETS.adas;
    const st = { ad: 0, as: 0, lr: 0, scenario: null };
    const LIM = { ad: [-30, 30], as: [-50, 50], lr: [-10, 20] };
    const f = frame(P.title, P.desc, 'lab-adas');
    const chart = Chart(f.plot, {
      xMax: 100, yMax: 200, xStep: 20, yStep: 40, xLabel: 'Real GDP', yLabel: 'Price level', left: 50, label: 'Aggregate demand and aggregate supply graph'
    });
    f.plot.appendChild(legend([['demand', 'Aggregate demand'], ['supply', 'Short-run supply'], ['lras', 'Long-run supply']]));

    const chips = h('div', { class: 'chips', role: 'group', 'aria-label': 'Events and policies' });
    const btns = P.scenarios.map((sc, i) => {
      const b = h('button', { type: 'button', class: 'chip' + (sc.add ? ' chip-policy' : ''), 'aria-pressed': 'false', text: sc.label });
      b.addEventListener('click', () => {
        if (sc.set) Object.assign(st, sc.set);
        if (sc.add) for (const k in sc.add) st[k] = clamp(st[k] + sc.add[k], ...LIM[k]);
        if (sc.selfCorrect) {
          const a = 200 + 2 * st.ad, yp = 50 + st.lr;
          st.as = clamp((4 * yp - a) / 2, ...LIM.as);
        }
        st.scenario = i;
        sync(); draw();
      });
      chips.appendChild(b);
      return b;
    });
    const fmt = v => v === 0 ? 'No shift' : signed(v);
    const adS = slider({ name: 'ad', label: 'Aggregate demand', min: LIM.ad[0], max: LIM.ad[1], step: 5, value: 0, fmt, hint: ['← decrease', 'increase →'], onInput: v => { st.ad = v; st.scenario = null; draw(); } });
    const asS = slider({ name: 'sras', label: 'Short-run aggregate supply', min: LIM.as[0], max: LIM.as[1], step: 5, value: 0, fmt, hint: ['← decrease', 'increase →'], onInput: v => { st.as = v; st.scenario = null; draw(); } });
    const lrS = slider({ name: 'lras', label: 'Potential output (LRAS)', min: LIM.lr[0], max: LIM.lr[1], step: 5, value: 0, fmt, onInput: v => { st.lr = v; st.scenario = null; draw(); } });
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    const reset = h('button', { type: 'button', class: 'btn btn-quiet', text: 'Reset' });
    reset.addEventListener('click', () => { Object.assign(st, { ad: 0, as: 0, lr: 0, scenario: null }); sync(); draw(); });
    f.panel.append(h('p', { class: 'panel-label', text: P.scenarios.some(x => x.add) ? 'Shocks and policy responses' : 'Try a shock' }), chips, adS.row, asS.row, lrS.row, dl, note, reset);

    function sync() {
      adS.set(st.ad); asS.set(st.as); lrS.set(st.lr);
      btns.forEach((b, i) => b.setAttribute('aria-pressed', String(st.scenario === i)));
    }

    function draw() {
      btns.forEach((b, i) => b.setAttribute('aria-pressed', String(st.scenario === i)));
      chart.clear();
      const a = 200 + 2 * st.ad, c = -2 * st.as, yp = 50 + st.lr;
      const Y = (a - c) / 4, Pl = a - 2 * Y;
      const gap = Y - yp;
      if (Math.abs(gap) > 0.5) chart.poly([[Math.min(Y, yp), 0], [Math.max(Y, yp), 0], [Math.max(Y, yp), 200], [Math.min(Y, yp), 200]], gap < 0 ? 'fill-gap-rec' : 'fill-gap-inf');
      if (st.ad !== 0) chart.line(200, -2, 'curve demand ghost');
      if (st.as !== 0) chart.line(0, 2, 'curve supply ghost');
      if (st.lr !== 0) chart.vline(50, 'curve lras ghost');
      chart.vline(yp, 'curve lras', 'LRAS');
      chart.line(a, -2, 'curve demand', 'AD', 'end');
      chart.line(c, 2, 'curve supply', 'SRAS', 'end');
      chart.guides(Y, Pl, trim(Y, 1), trim(Pl, 1));
      chart.dot(Y, Pl, 'eq');

      const status = Math.abs(gap) <= 0.5 ? ['At potential output', 'k-good'] : gap < 0 ? ['Recessionary gap', 'k-warn'] : ['Inflationary gap', 'k-hot'];
      readout(dl, [
        ['Real GDP', trim(Y, 1)],
        ['Price level', trim(Pl, 1)],
        ['Potential output', trim(yp, 1)],
        ['Output gap', signed(gap)],
        ['Status', status[0], status[1] + ' k-wide']
      ]);
      const summary = Math.abs(gap) <= 0.5
        ? 'Output equals potential, so unemployment is at its natural rate.'
        : gap < 0
          ? `Output is ${trim(-gap, 1)} below potential: a recessionary gap, with unemployment above its natural rate.`
          : `Output is ${trim(gap, 1)} above potential: an inflationary gap, with unemployment below its natural rate and upward pressure on wages.`;
      note.textContent = (st.scenario != null ? P.scenarios[st.scenario].text + ' ' : '') + summary;
    }

    host.appendChild(f.fig);
    autosize(chart, f.plot, draw);
  }

  /* ---------- registry ---------- */
  const REGISTRY = { market, ppf, advantage, elasticity, inflation, adas };

  window.ECON = window.ECON || {};
  ECON.widgets = {
    mountAll(root) {
      root.querySelectorAll('[data-widget]').forEach(node => {
        const fn = REGISTRY[node.dataset.widget];
        if (!fn || node.dataset.mounted) return;
        node.dataset.mounted = '1';
        node.classList.add('widget-host');
        try { fn(node, node.dataset.preset); }
        catch (err) {
          console.error(err);
          node.textContent = 'This interactive failed to load. Try reloading the page.';
        }
      });
    },
    resetIds() { uid = 0; }
  };
})();
