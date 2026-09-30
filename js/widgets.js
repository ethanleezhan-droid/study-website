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
  const money = v => (v < 0 ? '−$' : '$') + Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
      const y0 = o.yMin || 0;
      c.y0 = y0;
      c.X = v => m.l + (v / o.xMax) * (w - m.l - m.r);
      c.Y = v => hgt - m.b - ((v - y0) / (o.yMax - y0)) * (hgt - m.t - m.b);
      c.toData = (px, py) => [
        ((px - m.l) / (w - m.l - m.r)) * o.xMax,
        y0 + ((hgt - m.b - py) / (hgt - m.t - m.b)) * (o.yMax - y0)
      ];

      const grid = s('g', { class: 'c-grid' }, root);
      const xFmt = o.xFmt || (v => trim(v));
      const yFmt = o.yFmt || (v => trim(v));
      if (!o.bare) {
        const xSkip = (c.X(o.xStep) - c.X(0)) < 34 ? 2 : 1;
        let i = 0;
        for (let v = 0; v <= o.xMax + 1e-9; v += o.xStep, i++) {
          const x = c.X(v);
          if (v > 0) s('line', { x1: x, x2: x, y1: c.Y(y0), y2: c.Y(o.yMax), class: 'gridline' }, grid);
          if (i % xSkip === 0) stext(grid, x, c.Y(y0) + 17, xFmt(v), { class: 'tick', 'text-anchor': 'middle' });
        }
        for (let v = y0; v <= o.yMax + 1e-9; v += o.yStep) {
          const y = c.Y(v);
          if (v !== y0) s('line', { x1: c.X(0), x2: c.X(o.xMax), y1: y, y2: y, class: 'gridline' }, grid);
          stext(grid, c.X(0) - 8, y + 4, yFmt(v), { class: 'tick', 'text-anchor': 'end' });
        }
      }
      const axisY = y0 <= 0 ? 0 : y0;
      s('line', { x1: c.X(0), x2: c.X(o.xMax), y1: c.Y(axisY), y2: c.Y(axisY), class: 'axis' }, grid);
      s('line', { x1: c.X(0), x2: c.X(0), y1: c.Y(y0), y2: c.Y(o.yMax), class: 'axis' }, grid);
      stext(grid, (c.X(0) + c.X(o.xMax)) / 2, hgt - 6, o.xLabel, { class: 'axis-label', 'text-anchor': 'middle' });
      stext(grid, c.X(0) + 8, m.t - 12, o.yLabel, { class: 'axis-label', 'text-anchor': 'start' });

      ['area', 'lines', 'marks', 'labels'].forEach(k => { c.layers[k] = s('g', { class: 'c-' + k }, root); });
    };
    c.clear = () => Object.values(c.layers).forEach(g => { g.textContent = ''; });

    /* Straight line P = a + kQ clipped to the plot box. Returns [[q,p],[q,p]] or null. */
    c.clip = (a, k) => {
      const o = c.opts;
      const y0 = o.yMin || 0;
      let lo = 0, hi = o.xMax;
      if (k === 0) { if (a < y0 || a > o.yMax) return null; }
      else {
        const q0 = (y0 - a) / k, q1 = (o.yMax - a) / k;
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
      s('line', { x1: c.X(q), x2: c.X(q), y1: c.Y(c.y0), y2: c.Y(c.opts.yMax), class: cls }, c.layers.lines);
      if (label) stext(c.layers.labels, c.X(q) + 5, c.Y(c.opts.yMax) + 13, label, { class: 'curve-label ' + cls.replace(/\bcurve\b/g, '').trim() });
    };
    c.hline = (p, cls, label) => {
      s('line', { x1: c.X(0), x2: c.X(c.opts.xMax), y1: c.Y(p), y2: c.Y(p), class: cls }, c.layers.lines);
      if (label) stext(c.layers.labels, c.X(c.opts.xMax) - 4, c.Y(p) - 6, label, { class: 'curve-label ' + cls.replace(/\bcurve\b/g, '').trim(), 'text-anchor': 'end' });
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
    /* Arrow from one data point to another, trimmed so it doesn't cover the dots. */
    c.arrow = (q1, p1, q2, p2, cls) => {
      const x1 = c.X(q1), y1 = c.Y(p1), x2 = c.X(q2), y2 = c.Y(p2);
      const len = Math.hypot(x2 - x1, y2 - y1);
      if (len < 22) return;
      const ux = (x2 - x1) / len, uy = (y2 - y1) / len;
      const sx = x1 + ux * 9, sy = y1 + uy * 9, ex = x2 - ux * 10, ey = y2 - uy * 10;
      const g = s('g', { class: 'arrow ' + (cls || '') }, c.layers.marks);
      s('line', { x1: sx, y1: sy, x2: ex, y2: ey }, g);
      const hl = 8, hw = 4.5;
      s('polygon', { points: [[ex + ux * 2, ey + uy * 2], [ex - ux * hl - uy * hw, ey - uy * hl + ux * hw], [ex - ux * hl + uy * hw, ey - uy * hl - ux * hw]].map(pt => pt.join(',')).join(' ') }, g);
    };
    /* Free text placed at a data coordinate. */
    c.text = (q, p, str, cls, anchor, dy) => stext(c.layers.labels, c.X(q), c.Y(p) + (dy || 0), str, { class: 'chart-note ' + (cls || ''), 'text-anchor': anchor || 'middle' });
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
    'controls-basic': {
      title: 'Price ceilings and floors',
      desc: 'The market clears at $10. Choose a ceiling or a floor and move it above and below that price.',
      shifts: [], modes: ['ceiling', 'floor'], mode: 'ceiling', simple: true
    },
    shifts: {
      title: 'When demand and supply both shift',
      desc: 'Choose which way each curve shifts, then which shift is bigger. Faded lines show where the market started.',
      shifts: [], modes: ['none'], picker: true, simple: true
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
    if (P.simple) f.plot.appendChild(legend([['demand', 'Demand'], ['supply', 'Supply']]));
    else if (!P.compact) {
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

    /* "Both shift" picker: direction of each curve plus which shift is bigger. */
    const pick = { d: 0, s: 0, big: 'equal' };
    let bigSeg = null;
    function applyPick() {
      const both = pick.d !== 0 && pick.s !== 0;
      const size = both ? ({ d: [25, 10], s: [10, 25], equal: [20, 20] })[pick.big] : [20, 20];
      st.d = pick.d * size[0];
      st.s = pick.s * size[1];
      bigSeg.el.classList.toggle('is-disabled', !both);
      bigSeg.el.querySelectorAll('button').forEach(b => { b.disabled = !both; });
      update();
    }
    if (P.picker) {
      const dirs = [[-1, 'Decrease'], [0, 'No change'], [1, 'Increase']];
      const dSeg = segmented('Demand', dirs, 0, v => { pick.d = v; applyPick(); });
      const sSeg = segmented('Supply', dirs, 0, v => { pick.s = v; applyPick(); });
      bigSeg = segmented('Which shift is bigger', [['d', 'Demand (ΔD > ΔS)'], ['equal', 'Equal'], ['s', 'Supply (ΔD < ΔS)']], 'equal', v => { pick.big = v; applyPick(); });
      panel.append(
        h('p', { class: 'panel-label', text: 'Demand' }), dSeg.el,
        h('p', { class: 'panel-label', text: 'Supply' }), sSeg.el,
        h('p', { class: 'panel-label', text: 'Which shift is bigger?' }), bigSeg.el
      );
      bigSeg.el.classList.add('is-disabled');
      bigSeg.el.querySelectorAll('button').forEach(b => { b.disabled = true; });
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
    if (!P.compact && !P.picker) {
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
      const showSurplus = st.surplus && st.mode !== 'externality' && !P.simple;

      if (showSurplus && r.qt > 0) {
        chart.poly([[0, r.a], [r.qt, r.D(r.qt)], [r.qt, r.pb], [0, r.pb]], 'fill-cs');
        chart.poly([[0, r.pSel], [r.qt, r.pSel], [r.qt, r.S(r.qt)], [0, r.c]], 'fill-ps');
      }
      if (st.mode === 'tax' && st.tax > 0 && r.qt > 0) {
        chart.poly([[0, r.pSel], [r.qt, r.pSel], [r.qt, r.pb], [0, r.pb]], 'fill-rev');
      }
      if (r.dwl > 0.001 && !P.simple) {
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

      if (P.picker && shifted) chart.arrow((A0 - C0) / (2 * B), 10, r.qe, r.pe);
      const eqIsOutcome = !r.binding && !(st.mode === 'tax' && st.tax > 0);
      if (eqIsOutcome) chart.guides(r.qe, r.pe, trim(r.qe, 1), money(r.pe));
      chart.dot(r.qe, r.pe, eqIsOutcome ? 'eq' : 'eq faded');

      renderText(r);
    }

    function renderText(r) {
      const m = st.mode;
      const surplusRows = P.simple ? [] : [['Consumer surplus', money(r.cs), 'k-cs'], ['Producer surplus', money(r.ps), 'k-ps']];
      const dwlRow = P.simple ? [] : [['Deadweight loss', money(r.dwl), 'k-dwl']];
      if (P.picker) { pickerText(r); return; }
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
          ...dwlRow
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

    function pickerText(r) {
      const dir = v => Math.abs(v) < 1e-6 ? 'stays the same' : v > 0 ? 'rises' : 'falls';
      const arrow = v => Math.abs(v) < 1e-6 ? '→ unchanged' : v > 0 ? '↑ rises' : '↓ falls';
      const dp = r.pe - 10, dq = r.qe - 50;
      readout(dl, [
        ['Price', `$10.00 → ${money(r.pe)}`],
        ['Quantity', `50 → ${trim(r.qe, 1)}`],
        ['Equilibrium price', arrow(dp), dp > 1e-6 ? 'k-hot' : dp < -1e-6 ? 'k-good' : ''],
        ['Equilibrium quantity', arrow(dq), dq > 1e-6 ? 'k-good' : dq < -1e-6 ? 'k-hot' : '']
      ]);
      const word = v => v > 0 ? 'increases' : 'decreases';
      const bigText = ({ d: 'the demand shift is bigger (ΔD > ΔS)', s: 'the supply shift is bigger (ΔD < ΔS)', equal: 'the two shifts are equal (ΔD = ΔS)' })[pick.big];
      let txt;
      if (!pick.d && !pick.s) txt = 'Choose a change for demand, supply or both.';
      else if (!pick.s) txt = `Only demand ${word(pick.d)}, so price and quantity both move the same way as demand: price ${dir(dp)} and quantity ${dir(dq)}.`;
      else if (!pick.d) txt = `Only supply ${word(pick.s)}. Price moves the opposite way to supply and quantity moves the same way: price ${dir(dp)} and quantity ${dir(dq)}.`;
      else if (pick.d === pick.s) txt = `Demand and supply both ${pick.d > 0 ? 'increase' : 'decrease'}, so quantity certainly ${dir(dq)}. Price is indeterminate: it depends on the sizes of the shifts. Here ${bigText}, so price ${dir(dp)}.`;
      else txt = `Demand ${word(pick.d)} and supply ${word(pick.s)}, so price certainly ${dir(dp)}. Quantity is indeterminate: it depends on the sizes of the shifts. Here ${bigText}, so quantity ${dir(dq)}.`;
      note.textContent = txt;
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
  const PPF_PRESETS = {
    robots: { title: 'Production possibilities: pizzas or robots', x: 'Pizzas', y: 'Robots', curve: 'PPF', where: 'the frontier', whereNew: 'the new frontier' },
    laptops: { title: 'Production possibility curve: laptops or pizzas', x: 'Pizzas', y: 'Laptops', curve: 'PPC', where: 'the PPC', whereNew: 'the new PPC' }
  };
  function ppf(host, presetName) {
    const N = PPF_PRESETS[presetName] || PPF_PRESETS.robots;
    const xs = N.x.toLowerCase(), ys = N.y.toLowerCase();
    const XM = 100, YM = 50, G = 1.2;
    const fy = (x, g) => YM * g * Math.sqrt(Math.max(0, 1 - Math.pow(x / (XM * g), 2)));
    const st = { x: 40, util: 100, growth: false, test: null };
    const f = frame(N.title, 'Move along the curve, leave resources idle, or grow the economy. Click the graph to test any point.', 'lab-ppf');
    const chart = Chart(f.plot, {
      xMax: 130, yMax: 65, xStep: 20, yStep: 10, xLabel: N.x, yLabel: N.y, left: 46, label: N.title
    });
    f.plot.appendChild(legend([['frontier', N.curve], ['frontier-grown', 'After growth'], ['point', 'Current output']]));

    const xSl = slider({ name: 'pizzas', label: N.x + ' produced', min: 0, max: 100, step: 10, value: st.x, onInput: v => { st.x = v; draw(); } });
    const us = slider({ name: 'util', label: 'Resources in use', min: 50, max: 100, step: 10, value: 100, fmt: v => v + '%', onInput: v => { st.util = v; draw(); } });
    const gid = id('growth');
    const gBox = h('input', { type: 'checkbox', id: gid });
    gBox.addEventListener('change', () => { st.growth = gBox.checked; draw(); });
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    const testNote = h('p', { class: 'lab-note lab-test', 'aria-live': 'polite', text: 'Click anywhere on the graph to test a point.' });
    f.panel.append(xSl.row, us.row, h('div', { class: 'check' }, [gBox, h('label', { for: gid, text: 'Show economic growth (+20%)' })]), dl, note, testNote);

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
      chart.label(chart.X(XM * 0.72), chart.Y(fy(XM * 0.72, 1)), N.curve, 'frontier');

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
        const where = st.growth ? N.whereNew : N.where;
        testNote.textContent = `Test point: ${trim(tx, 0)} ${xs} and ${trim(ty, 0)} ${ys}. ` + ({
          inside: `It’s inside ${where}: attainable, but some resources would be idle or wasted.`,
          on: `It’s on ${where}: attainable and efficient.`,
          outside: `It’s outside ${where}: unattainable with the resources and technology available.`
        })[cls];
      }

      const rows = [[N.x, trim(px, 1)], [N.y, trim(py, 1)]];
      if (k === 1 && st.x < XM) rows.push([`Cost of 10 more ${xs}`, trim(fy(st.x, 1) - fy(st.x + 10, 1), 1) + ' ' + ys, 'k-warn']);
      readout(dl, rows);
      if (k < 1) {
        note.textContent = `Only ${st.util}% of resources are in use, so the economy is inside ${N.where}, as in a recession. It could have more ${xs} and more ${ys} at no cost by putting idle resources back to work.`;
      } else if (st.x >= XM) {
        note.textContent = `All resources go to ${xs}. The last 10 ${xs} cost the most ${ys} of all, because they use the resources worst suited to making ${xs}.`;
      } else {
        note.textContent = `On ${N.where}, so production is efficient. Making 10 more ${xs} would mean giving up ${trim(fy(st.x, 1) - fy(st.x + 10, 1), 1)} ${ys}, and each further 10 costs more than the last.`;
      }
      if (st.growth) note.textContent += ` With growth, ${N.where} shifts out by 20%, and combinations between the two curves become possible.`;
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

  /* Module presets follow the notes' diagram: one upward-sloping AS curve, with full employment
     output Yf marked, and "recessionary / inflationary situation" wording. */
  Object.assign(ADAS_PRESETS, {
    'm-inflation': {
      module: true, title: 'Demand-pull or cost-push?', desc: 'Pick a cause of inflation and watch what happens to the price level and output.',
      scenarios: [
        { label: 'Demand-pull inflation', set: { ad: 15, as: 0 }, text: 'Total spending rises, for example a surge in consumption or government spending. AD shifts right: the price level rises and output rises. This is demand-pull inflation.' },
        { label: 'Cost-push inflation', set: { ad: 0, as: -15 }, text: 'Production costs rise: higher wages, rents or oil prices, or a weaker exchange rate. AS shifts left: the price level rises and output falls. This is cost-push inflation.' }
      ]
    },
    'm-cycle': {
      module: true, title: 'Causes of recession and recovery', desc: 'Start a recession, then try a recovery that matches its cause.',
      scenarios: [
        { label: 'Recession: AD falls', set: { ad: -15, as: 0 }, text: 'Spending (C, I, G or X − M) falls. AD shifts left: output and employment fall, and the price level falls.' },
        { label: 'Recession: AS falls', set: { ad: 0, as: -15 }, text: 'Production costs rise. AS shifts left: output and employment fall while the price level rises. High unemployment with rising prices is stagflation.' },
        { label: 'Recovery: raise AD', add: { ad: 15 }, text: 'Spending rises, usually through investment or government spending. AD shifts right: output, employment and income rise, and prices rise too (demand-pull inflation).' },
        { label: 'Recovery: raise AS', add: { as: 15 }, text: 'Costs fall, from lower factor prices or higher productivity. AS shifts right: output and employment rise and the price level falls.' }
      ]
    },
    'm-adas': {
      module: true, title: 'Where is equilibrium, compared with Yf?', desc: 'Equilibrium output Ye is where AD = AS. Compare it with full employment output Yf.',
      scenarios: [
        { label: 'Recessionary situation', set: { ad: -15, as: 0 }, text: 'Spending is too low, so equilibrium output is below full employment.' },
        { label: 'Inflationary situation', set: { ad: 15, as: 0 }, text: 'Spending is too high, so equilibrium output is above full employment.' },
        { label: 'Shift AD to reach Yf', toYf: true, text: 'AD is shifted just enough for equilibrium output to equal full employment output.' }
      ]
    },
    'm-fiscal': {
      module: true, title: 'Fiscal policy on the AD-AS diagram', desc: 'Pick a situation, then respond with government spending (G) or taxes (T).',
      scenarios: [
        { label: 'Recessionary situation', set: { ad: -15, as: 0 }, text: 'Output is below full employment, so there is cyclical unemployment.' },
        { label: 'Inflationary situation', set: { ad: 15, as: 0 }, text: 'Output is above full employment, so the economy is overheating.' },
        { label: 'Raise G', add: { ad: 12 }, text: 'Expansionary: higher government spending raises AD directly, and the multiplier spreads the extra income. AD shifts right.' },
        { label: 'Cut taxes', add: { ad: 9 }, text: 'Expansionary: T ↓ → disposable income ↑ → C ↑ → AD shifts right. The shift is smaller than for the same rise in G, because part of the tax cut is saved.' },
        { label: 'Cut G', add: { ad: -12 }, text: 'Contractionary: lower government spending reduces AD. AD shifts left.' },
        { label: 'Raise taxes', add: { ad: -9 }, text: 'Contractionary: T ↑ → disposable income ↓ → C ↓ → AD shifts left.' }
      ]
    }
  });

  function adas(host, presetName) {
    const P = ADAS_PRESETS[presetName] || ADAS_PRESETS.adas;
    const M = !!P.module;
    const st = { ad: 0, as: 0, lr: 0, scenario: null };
    const LIM = { ad: [-30, 30], as: [-50, 50], lr: [-10, 20] };
    const f = frame(P.title, P.desc, 'lab-adas');
    const chart = Chart(f.plot, {
      xMax: 100, yMax: 200, xStep: 20, yStep: 40, xLabel: 'Real GDP', yLabel: 'Price level', left: 50, label: 'Aggregate demand and aggregate supply graph'
    });
    f.plot.appendChild(legend(M
      ? [['demand', 'Aggregate demand (AD)'], ['supply', 'Aggregate supply (AS)'], ['yf', 'Full employment output (Yf)']]
      : [['demand', 'Aggregate demand'], ['supply', 'Short-run supply'], ['lras', 'Long-run supply']]));

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
        if (sc.toYf) st.ad = clamp((4 * (50 + st.lr) - 2 * st.as - 200) / 2, ...LIM.ad);
        st.scenario = i;
        sync(); draw();
      });
      chips.appendChild(b);
      return b;
    });
    const fmt = v => v === 0 ? 'No shift' : signed(v);
    const adS = slider({ name: 'ad', label: 'Aggregate demand', min: LIM.ad[0], max: LIM.ad[1], step: 5, value: 0, fmt, hint: ['← decrease', 'increase →'], onInput: v => { st.ad = v; st.scenario = null; draw(); } });
    const asS = slider({ name: 'sras', label: M ? 'Aggregate supply' : 'Short-run aggregate supply', min: LIM.as[0], max: LIM.as[1], step: 5, value: 0, fmt, hint: ['← decrease', 'increase →'], onInput: v => { st.as = v; st.scenario = null; draw(); } });
    const lrS = slider({ name: 'lras', label: 'Potential output (LRAS)', min: LIM.lr[0], max: LIM.lr[1], step: 5, value: 0, fmt, onInput: v => { st.lr = v; st.scenario = null; draw(); } });
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    const reset = h('button', { type: 'button', class: 'btn btn-quiet', text: 'Reset' });
    reset.addEventListener('click', () => { Object.assign(st, { ad: 0, as: 0, lr: 0, scenario: null }); sync(); draw(); });
    f.panel.append(h('p', { class: 'panel-label', text: P.scenarios.some(x => x.add) ? (M ? 'Situations and responses' : 'Shocks and policy responses') : (M ? 'Try it' : 'Try a shock') }), chips, adS.row, asS.row);
    if (!M) f.panel.appendChild(lrS.row);
    f.panel.append(dl, note, reset);

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
      chart.vline(yp, M ? 'curve yf' : 'curve lras', M ? 'Yf' : 'LRAS');
      chart.line(a, -2, 'curve demand', 'AD', 'end');
      chart.line(c, 2, 'curve supply', M ? 'AS' : 'SRAS', 'end');
      chart.guides(Y, Pl, trim(Y, 1), trim(Pl, 1));
      chart.dot(Y, Pl, 'eq');

      if (M) {
        const sit = Math.abs(gap) <= 0.5 ? ['At full employment (Ye = Yf)', 'k-good'] : gap < 0 ? ['Recessionary situation (Ye < Yf)', 'k-warn'] : ['Inflationary situation (Ye > Yf)', 'k-hot'];
        readout(dl, [
          ['Equilibrium output (Ye)', trim(Y, 1)],
          ['Price level', trim(Pl, 1)],
          ['Full employment output (Yf)', trim(yp, 1)],
          ['Ye − Yf', signed(gap)],
          ['Situation', sit[0], sit[1] + ' k-wide']
        ]);
        const sum = Math.abs(gap) <= 0.5
          ? 'Equilibrium output equals full employment output: unemployment is at its natural rate.'
          : gap < 0
            ? `Ye is ${trim(-gap, 1)} below Yf: a recessionary situation with cyclical unemployment. AD needs to increase.`
            : `Ye is ${trim(gap, 1)} above Yf: an inflationary situation. AD needs to decrease.`;
        note.textContent = (st.scenario != null ? P.scenarios[st.scenario].text + ' ' : '') + sum;
        return;
      }
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

  /* ======================================================================
     SHIFTER — movement along a curve vs a shift of the curve (Topics 2–3)
     Pizzas: D: P = 25 − 0.5Q, S: P = −5 + 0.5Q (Q in millions per year)
     ====================================================================== */
  const SHIFTER_PRESETS = {
    demand: {
      title: 'Movement along demand, or a shift of demand?',
      desc: 'Change the price of pizza to move along the curve. Pick an event to see whether it shifts the curve, and which way. Predict before you click.',
      kind: 'demand', a: 25, k: -0.5, qWord: 'Quantity demanded', curve: 'D',
      events: [
        { label: 'Population grows', shift: 10, det: 'Number of buyers', text: 'More people means more buyers. Demand increases: the curve shifts right, so more pizzas are demanded at every price.' },
        { label: 'Pizza becomes a trend on social media', shift: 10, det: 'Tastes and preferences', text: 'Tastes move in favour of pizza. Demand increases: the curve shifts right.' },
        { label: 'Buyers expect pizza prices to rise next month', shift: 10, det: 'Expectations of buyers', text: 'People buy now before the price goes up. Today’s demand increases: the curve shifts right.' },
        { label: 'Incomes fall (pizza is a normal good)', shift: -10, det: 'Income', text: 'For a normal good, lower incomes mean lower demand. The curve shifts left.' },
        { label: 'Burgers (a substitute) get cheaper', shift: -10, det: 'Price of a related good (substitute)', text: 'Some buyers switch to the cheaper substitute. Demand for pizza decreases: the curve shifts left.' },
        { label: 'Soft drinks (a complement) get more expensive', shift: -10, det: 'Price of a related good (complement)', text: 'Pizza and soft drinks are bought together, so a dearer complement makes the pair less attractive. Demand for pizza decreases: the curve shifts left.' }
      ]
    },
    supply: {
      title: 'Movement along supply, or a shift of supply?',
      desc: 'Change the price of pizza to move along the curve. Pick an event to see whether it shifts the curve, and which way. Predict before you click.',
      kind: 'supply', a: -5, k: 0.5, qWord: 'Quantity supplied', curve: 'S',
      events: [
        { label: 'More pizza shops open', shift: 10, det: 'Number of sellers', text: 'More sellers means more pizzas offered at every price. Supply increases: the curve shifts right.' },
        { label: 'Faster ovens are invented', shift: 10, det: 'Technology', text: 'Better technology lowers the cost of making each pizza. Supply increases: the curve shifts right.' },
        { label: 'The price of cheese rises', shift: -10, det: 'Resource prices', text: 'A key input costs more, so production costs rise. Supply decreases: the curve shifts left.' },
        { label: 'The government taxes each pizza sold', shift: -10, det: 'Taxes and subsidies', text: 'A tax raises the cost of production. Supply decreases: the curve shifts left.' },
        { label: 'The government subsidises pizza makers', shift: 10, det: 'Taxes and subsidies', text: 'A subsidy lowers the cost of production. Supply increases: the curve shifts right.' },
        { label: 'Pasta prices rise (same ovens and cooks)', shift: -10, det: 'Price of a substitute in production', text: 'Pasta competes for the same ovens and cooks and is now more profitable, so shops switch resources to pasta. Supply of pizza decreases: the curve shifts left.' }
      ]
    }
  };

  function shifter(host, presetName) {
    const P = SHIFTER_PRESETS[presetName] || SHIFTER_PRESETS.demand;
    const st = { price: 15, shift: 0, event: null, moved: false };
    const f = frame(P.title, P.desc, 'lab-shifter');
    const chart = Chart(f.plot, {
      xMax: 60, yMax: 25, xStep: 10, yStep: 5, xLabel: 'Pizzas (millions per year)', yLabel: 'Price', yFmt: v => '$' + v,
      ratio: 0.72, label: 'Pizza ' + P.kind + ' curve'
    });
    f.plot.appendChild(legend([[P.kind, P.kind === 'demand' ? 'Demand' : 'Supply'], ['point', 'Where the market is']]));
    const q = (price, shift) => (price - P.a) / P.k + shift;

    const prSl = slider({
      name: 'price', label: 'Price of a pizza', min: 5, max: 20, step: 1, value: st.price, fmt: v => '$' + v,
      onInput: v => { st.price = v; st.moved = v !== 15; draw(); }
    });
    const chips = h('div', { class: 'chips', role: 'group', 'aria-label': 'Events' });
    const btns = P.events.map((ev, i) => {
      const b = h('button', { type: 'button', class: 'chip', 'aria-pressed': 'false', text: ev.label });
      b.addEventListener('click', () => { st.event = st.event === i ? null : i; st.shift = st.event == null ? 0 : ev.shift; draw(); });
      chips.appendChild(b);
      return b;
    });
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    const reset = h('button', { type: 'button', class: 'btn btn-quiet', text: 'Reset' });
    reset.addEventListener('click', () => { Object.assign(st, { price: 15, shift: 0, event: null, moved: false }); prSl.set(15); draw(); });
    f.panel.append(prSl.row, h('p', { class: 'panel-label', text: 'Something else changes' }), chips, dl, note, reset);

    function draw() {
      btns.forEach((b, i) => b.setAttribute('aria-pressed', String(st.event === i)));
      chart.clear();
      const shifted = st.shift !== 0;
      const cls = 'curve ' + P.kind;
      const a1 = P.a - P.k * st.shift; // intercept of the shifted curve: P = a1 + kQ
      const at = P.kind === 'demand' ? 'start' : 'end';
      if (shifted) {
        chart.line(P.a, P.k, cls + ' ghost', P.curve, at);
        chart.line(a1, P.k, cls, P.curve + '₁', at);
      } else chart.line(P.a, P.k, cls, P.curve, at);

      const q0 = q(15, 0), qNow = q(st.price, st.shift), qBase = q(st.price, 0);
      if (st.moved && !shifted) {
        chart.dot(q0, 15, 'ghost');
        chart.arrow(q0, 15, qNow, st.price);
      }
      if (shifted) {
        chart.dot(qBase, st.price, 'ghost');
        chart.arrow(qBase, st.price, qNow, st.price);
      }
      chart.guides(qNow, st.price, trim(qNow, 0), '$' + st.price, 'point');
      chart.dot(qNow, st.price, 'point');

      const ev = st.event != null ? P.events[st.event] : null;
      const change = shifted ? (P.kind === 'demand' ? 'Change in demand' : 'Change in supply')
        : st.moved ? 'Change in ' + P.qWord.toLowerCase() : 'None yet';
      readout(dl, [
        ['Price', '$' + st.price],
        [P.qWord, trim(qNow, 0) + 'm'],
        ['What changed', change, 'k-wide' + (shifted ? ' k-hot' : st.moved ? ' k-good' : '')],
        ...(ev ? [['Determinant', ev.det, 'k-wide']] : [])
      ]);
      let txt;
      if (ev) {
        txt = ev.text + ` At $${st.price}, ${P.qWord.toLowerCase()} goes from ${trim(qBase, 0)}m to ${trim(qNow, 0)}m, even though the price of pizza didn’t change.`;
        if (st.moved) txt += ' (You also changed the price, which is a movement along the new curve.)';
      } else if (st.moved) {
        const up = st.price > 15;
        txt = `Only the pizza’s own price changed, from $15 to $${st.price}. That’s a ${up ? 'upward' : 'downward'} movement along the same ${P.kind} curve: ${P.qWord.toLowerCase()} ${(P.kind === 'demand') === up ? 'falls' : 'rises'} from ${trim(q0, 0)}m to ${trim(qNow, 0)}m. The curve itself doesn’t move.`;
      } else {
        txt = `At $15, ${P.qWord.toLowerCase()} is ${trim(q0, 0)}m pizzas a year. Move the price, or pick an event.`;
      }
      note.textContent = txt;
    }
    host.appendChild(f.fig);
    autosize(chart, f.plot, draw);
  }

  /* ======================================================================
     SCHEDULE — the chocolate bar market from Topic 4
     ====================================================================== */
  function schedule(host) {
    const rows = [[0.5, 22, 0], [1, 15, 6], [1.5, 10, 10], [2, 7, 13], [2.5, 5, 15]];
    const st = { i: 3 };
    const f = frame('The chocolate bar market', 'Pick a price to see the surplus or shortage, then step the price toward equilibrium.', 'lab-schedule');
    const chart = Chart(f.plot, {
      xMax: 25, yMax: 3, xStep: 5, yStep: 0.5, xLabel: 'Chocolate bars', yLabel: 'Price', yFmt: v => '$' + v.toFixed(2),
      left: 60, ratio: 0.72, label: 'Chocolate bar demand and supply schedule'
    });
    f.plot.appendChild(legend([['demand', 'Demand'], ['supply', 'Supply']]));
    const seg = segmented('Price', rows.map((r, i) => [i, '$' + r[0].toFixed(2)]), st.i, v => { st.i = v; draw(); });
    const table = h('div', { class: 'table-wrap' });
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    const step = h('button', { type: 'button', class: 'btn', text: 'Let the market adjust one step' });
    step.addEventListener('click', () => {
      if (st.i === 2) return;
      st.i += st.i > 2 ? -1 : 1;
      seg.select(st.i);
      draw();
    });
    f.panel.append(h('p', { class: 'panel-label', text: 'Price per bar' }), seg.el, table, dl, note, step);

    function draw() {
      const [p, qd, qs] = rows[st.i];
      chart.clear();
      chart.path(rows.map(r => [r[1], r[0]]), 'curve demand');
      chart.path(rows.map(r => [r[2], r[0]]), 'curve supply');
      rows.forEach(r => { chart.dot(r[1], r[0], 'demand-dot small'); chart.dot(r[2], r[0], 'supply-dot small'); });
      chart.label(chart.X(rows[4][1]), chart.Y(rows[4][0]), 'D', 'demand');
      chart.label(chart.X(rows[4][2]), chart.Y(rows[4][0]), 'S', 'supply');
      chart.hline(p, 'control' + (st.i === 2 ? ' slack' : ''));
      chart.dot(10, 1.5, 'eq');
      if (st.i !== 2) {
        const lo = Math.min(qd, qs), hi = Math.max(qd, qs);
        chart.bracket(lo, hi, p, (qs > qd ? 'Surplus ' : 'Shortage ') + (hi - lo), 'gap');
        chart.arrow(hi + 3, p, hi + 3, p + (qs > qd ? -0.42 : 0.42), 'pressure');
      }
      chart.guides(10, 1.5, '10', '$1.50');
      table.innerHTML = `<table class="num"><thead><tr><th>Price</th><th>Qd</th><th>Qs</th><th>Qs − Qd</th></tr></thead><tbody>${
        rows.map((r, i) => `<tr${i === st.i ? ' class="is-sel"' : ''}><td>$${r[0].toFixed(2)}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[2] - r[1] > 0 ? '+' : ''}${r[2] - r[1]}</td></tr>`).join('')
      }</tbody></table>`;
      const gap = qs - qd;
      readout(dl, [
        ['Quantity demanded', String(qd)],
        ['Quantity supplied', String(qs)],
        [gap > 0 ? 'Surplus' : gap < 0 ? 'Shortage' : 'Surplus or shortage', gap === 0 ? 'None' : String(Math.abs(gap)), gap === 0 ? 'k-good' : 'k-warn']
      ]);
      if (gap > 0) note.textContent = `At $${p.toFixed(2)}, sellers offer ${qs} bars but buyers want only ${qd}: a surplus of ${gap}. Firms cut the price to sell their stock. As the price falls, quantity demanded rises and quantity supplied falls.`;
      else if (gap < 0) note.textContent = `At $${p.toFixed(2)}, buyers want ${qd} bars but sellers offer only ${qs}: a shortage of ${-gap}. The price rises. As it rises, quantity demanded falls and quantity supplied rises.`;
      else note.textContent = 'At $1.50, quantity demanded equals quantity supplied (10 bars). The market clears and there is no pressure on the price to change. This is equilibrium.';
      step.disabled = st.i === 2;
    }
    host.appendChild(f.fig);
    autosize(chart, f.plot, draw);
  }

  /* ======================================================================
     ELASTICITY (module) — price (midpoint), income and cross price (simple)
     ====================================================================== */
  function elasticityModule(host) {
    const f = frame('Elasticity calculator', 'Pick an elasticity, enter the old and new values, and read the result. The formulas match your notes.', 'lab-calc lab-elastic');
    f.body.classList.add('lab-body-calc');
    const MODES = {
      price: { name: 'Price elasticity (midpoint)', a: ['Old price', 'New price'], b: ['Old quantity', 'New quantity'], vals: [25, 30, 20000, 10000], prefix: '$' },
      income: { name: 'Income elasticity (simple)', a: ['Old income', 'New income'], b: ['Old quantity', 'New quantity'], vals: [2000, 2200, 20, 23], prefix: '$' },
      cross: { name: 'Cross price elasticity (simple)', a: ['Old price of good B', 'New price of good B'], b: ['Old quantity of good A', 'New quantity of good A'], vals: [1, 1.1, 1000, 1080], prefix: '$' }
    };
    const st = { mode: 'price', v: {} };
    Object.keys(MODES).forEach(k => { st.v[k] = MODES[k].vals.slice(); });
    const seg = segmented('Elasticity type', Object.keys(MODES).map(k => [k, MODES[k].name.split(' (')[0]]), 'price', m => { st.mode = m; build(); });
    const fields = h('div', { class: 'el-grid el-grid-4' });
    const formula = h('p', { class: 'lab-formula' });
    const meter = h('div', { class: 'meter', 'aria-hidden': 'true' }, [
      h('div', { class: 'meter-track' }, [h('span', { class: 'meter-zone inelastic', text: 'Inelastic' }), h('span', { class: 'meter-zone elastic', text: 'Elastic' })]),
      h('div', { class: 'meter-marker' }),
      h('div', { class: 'meter-scale' }, ['0', '1', '2', '3+'].map(t => h('span', { text: t })))
    ]);
    f.plot.append(seg.el, fields, formula, meter);
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    f.panel.append(dl, note);

    function build() {
      const M = MODES[st.mode];
      fields.textContent = '';
      const labels = [M.a[0], M.a[1], M.b[0], M.b[1]];
      labels.forEach((lab, i) => {
        const fid = id('elm-' + st.mode + i);
        const inp = h('input', { type: 'number', id: fid, min: '0', step: 'any', value: st.v[st.mode][i], inputmode: 'decimal' });
        inp.addEventListener('input', () => { st.v[st.mode][i] = parseFloat(inp.value); calc(); });
        const pre = i < 2 ? M.prefix : null;
        fields.appendChild(h('div', { class: 'field' + (pre ? ' has-prefix' : '') }, [h('label', { for: fid, text: lab }), pre ? h('span', { class: 'prefix', text: pre, 'aria-hidden': 'true' }) : null, inp]));
      });
      formula.innerHTML = st.mode === 'price'
        ? 'Price Ed = %ΔQ ÷ %ΔP, with each % change taken from the <strong>average</strong> of old and new.'
        : st.mode === 'income'
          ? 'Y Ed = %ΔQ ÷ %ΔY, with each % change taken from the <strong>old</strong> value.'
          : 'XP Ed = %ΔQ<sub>A</sub> ÷ %ΔP<sub>B</sub>, with each % change taken from the <strong>old</strong> value.';
      meter.hidden = st.mode !== 'price';
      calc();
    }

    function calc() {
      const [a1, a2, b1, b2] = st.v[st.mode];
      if (![a1, a2, b1, b2].every(x => isFinite(x) && x > 0)) {
        readout(dl, []);
        note.textContent = 'Enter numbers greater than zero in every box.';
        return;
      }
      if (a1 === a2) {
        readout(dl, []);
        note.textContent = st.mode === 'price' ? 'The price didn’t change, so there is nothing to measure. Enter two different prices.' : 'The old and new values are the same. Enter two different values.';
        return;
      }
      if (st.mode === 'price') {
        const dq = (b2 - b1) / ((b1 + b2) / 2), dp = (a2 - a1) / ((a1 + a2) / 2);
        const e = Math.abs(dq / dp);
        const simpleAB = Math.abs(((b2 - b1) / b1) / ((a2 - a1) / a1));
        const simpleBA = Math.abs(((b1 - b2) / b2) / ((a1 - a2) / a2));
        const kind = Math.abs(e - 1) < 0.005 ? 'unitary elastic' : e > 1 ? 'elastic' : e === 0 ? 'perfectly inelastic' : 'inelastic';
        const r1 = a1 * b1, r2 = a2 * b2;
        readout(dl, [
          ['% change in quantity', pct(dq)],
          ['% change in price', pct(dp)],
          ['Price Ed (midpoint)', trim(e), 'k-big'],
          ['Demand is', kind, 'k-wide'],
          ['Simple formula, old → new', trim(simpleAB)],
          ['Simple formula, new → old', trim(simpleBA)],
          ['TR before', money(r1)],
          ['TR after', money(r2), r2 > r1 ? 'k-good' : r2 < r1 ? 'k-warn' : '']
        ]);
        meter.style.setProperty('--pos', (Math.min(e, 3) / 3 * 100) + '%');
        let txt = `Demand is ${kind}. Total revenue ${r2 > r1 ? 'rose' : r2 < r1 ? 'fell' : 'stayed the same'} from ${money(r1)} to ${money(r2)}`;
        txt += e > 1.005 ? ', since with elastic demand, price and TR move in opposite directions.' : e < 0.995 ? ', since with inelastic demand, price and TR move in the same direction.' : ', since with unitary elastic demand, TR doesn’t change.';
        if (Math.abs(simpleAB - simpleBA) > 0.01) txt += ` The simple formula gives ${trim(simpleAB)} one way and ${trim(simpleBA)} the other, which is why price elasticity uses the midpoint formula.`;
        if (dq * dp > 0) txt += ' Price and quantity moved the same way, which breaks the law of demand. Check your numbers.';
        note.textContent = txt;
      } else {
        const dq = (b2 - b1) / b1, da = (a2 - a1) / a1;
        const e = dq / da;
        let kind, txt;
        if (st.mode === 'income') {
          kind = Math.abs(e) < 0.005 ? 'Not affected by income' : e > 0 ? 'Normal good' : 'Inferior good';
          txt = Math.abs(e) < 0.005
            ? 'Quantity didn’t respond to income at all.'
            : e > 0
              ? `Y Ed is positive (${trim(e)}): income and quantity demanded move in the same direction, so this is a normal good.${e > 1 ? ' Because it is above 1, it’s also income elastic, a luxury (not tested).' : ' Because it is between 0 and 1, it’s also income inelastic, a necessity (not tested).'}`
              : `Y Ed is negative (${trim(e)}): income and quantity demanded move in opposite directions, so this is an inferior good.`;
        } else {
          kind = Math.abs(e) < 0.005 ? 'Unrelated goods' : e > 0 ? 'Substitutes' : 'Complements';
          txt = Math.abs(e) < 0.005
            ? 'XP Ed is zero: a change in the price of B has no effect on A. The goods are unrelated.'
            : e > 0
              ? `XP Ed is positive (${trim(e)}): when B gets dearer, people buy more A instead. A and B are substitutes.`
              : `XP Ed is negative (${trim(e)}): when B gets dearer, people buy less of A too. A and B are complements.`;
        }
        readout(dl, [
          ['% change in quantity' + (st.mode === 'cross' ? ' of A' : ''), pct(dq)],
          [st.mode === 'income' ? '% change in income' : '% change in price of B', pct(da)],
          [st.mode === 'income' ? 'Y Ed' : 'XP Ed', (e > 0 ? '+' : '') + trim(e), 'k-big'],
          ['Result', kind, 'k-wide']
        ]);
        note.textContent = txt;
      }
    }
    build();
    host.appendChild(f.fig);
  }

  /* ======================================================================
     PRODUCTION — TP, MP and AP from the wheat farm in Topic 6
     ====================================================================== */
  function production(host) {
    const TP = [0, 10, 22, 33, 42, 48, 50, 48];
    const MP = TP.map((t, i) => i ? t - TP[i - 1] : null);
    const AP = TP.map((t, i) => i ? t / i : null);
    const st = { L: 3 };
    const f = frame('Adding workers to a fixed farm', 'Add workers one at a time. Watch how each extra worker changes total output, and why.', 'lab-production');
    const top = h('div', { class: 'plot-stack' });
    const bot = h('div', { class: 'plot-stack' });
    f.plot.append(top, bot);
    const c1 = Chart(top, { xMax: 7, yMax: 60, xStep: 1, yStep: 10, xLabel: 'Workers per day', yLabel: 'Total product (bushels)', left: 44, ratio: 0.5, maxH: 280, label: 'Total product curve' });
    const c2 = Chart(bot, { xMax: 7, yMin: -4, yMax: 14, xStep: 1, yStep: 2, xLabel: 'Workers per day', yLabel: 'MP and AP (bushels)', left: 44, ratio: 0.5, maxH: 280, label: 'Marginal and average product curves' });
    f.plot.appendChild(legend([['tp', 'Total product'], ['supply', 'Marginal product'], ['demand', 'Average product']]));
    const sl = slider({ name: 'workers', label: 'Number of workers', min: 0, max: 7, step: 1, value: st.L, onInput: v => { st.L = v; draw(); } });
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    f.panel.append(sl.row, dl, note);

    function draw() {
      const L = st.L;
      c1.clear(); c2.clear();
      c1.path(TP.map((t, i) => [i, t]), 'curve tp');
      TP.forEach((t, i) => c1.dot(i, t, 'small' + (i === L ? ' point' : ' tp-dot')));
      if (L > 0) {
        c1.path([[L - 1, TP[L - 1]], [L, TP[L - 1]], [L, TP[L]]], 'rise', 'marks');
        c1.text(L + 0.12, (TP[L - 1] + TP[L]) / 2, 'MP ' + (MP[L] > 0 ? '+' : '') + MP[L], 'rise-label', 'start', 4);
        c1.guides(L, TP[L], null, String(TP[L]), 'point');
      }
      c2.path(MP.slice(1).map((m, i) => [i + 1, m]), 'curve supply');
      c2.path(AP.slice(1).map((a, i) => [i + 1, a]), 'curve demand');
      c2.label(c2.X(7), c2.Y(MP[7]), 'MP', 'supply');
      c2.label(c2.X(7), c2.Y(AP[7]), 'AP', 'demand');
      if (L > 0) {
        c2.dot(L, MP[L], 'supply-dot');
        c2.dot(L, AP[L], 'demand-dot');
        s('line', { x1: c2.X(L), x2: c2.X(L), y1: c2.Y(-4), y2: c2.Y(14), class: 'guide' }, c2.layers.marks);
      }
      let stage = '—', cls = '';
      if (L >= 1 && L <= 2) { stage = 'Increasing marginal returns'; cls = 'k-good'; }
      else if (L >= 3 && L <= 6) { stage = 'Diminishing marginal returns'; cls = 'k-warn'; }
      else if (L === 7) { stage = 'Negative marginal returns'; cls = 'k-hot'; }
      readout(dl, [
        ['Workers', String(L)],
        ['Total product', String(TP[L])],
        ['Marginal product', L ? String(MP[L]) : '–'],
        ['Average product', L ? trim(AP[L], 1) : '–'],
        ['Stage', stage, 'k-wide ' + cls]
      ]);
      const cmp = L < 2 ? '' : MP[L] > AP[L - 1] + 1e-9 ? ` MP (${MP[L]}) is above the previous AP (${trim(AP[L - 1], 1)}), so AP rises to ${trim(AP[L], 1)}.`
        : Math.abs(MP[L] - AP[L]) < 1e-9 ? ` MP (${MP[L]}) equals AP (${trim(AP[L], 1)}): AP is at its maximum.`
          : ` MP (${MP[L]}) is below the previous AP (${trim(AP[L - 1], 1)}), so AP falls to ${trim(AP[L], 1)}.`;
      const texts = {
        0: 'No workers, no wheat. Add the first worker.',
        1: 'The first worker produces 10 bushels. One person has far more land and equipment than they can use well.',
        2: 'The second worker adds 12 bushels, more than the first. Two workers can specialise and make better use of the fixed land and equipment, so output increases at an increasing rate.',
        3: 'The third worker adds 11 bushels, less than the second. Diminishing returns have set in: each worker now has less of the fixed input to work with.',
        4: 'The fourth worker adds only 9 bushels. Output is still rising, but at a decreasing rate.',
        5: 'The fifth worker adds 6 bushels. Diminishing returns are getting stronger.',
        6: 'The sixth worker adds just 2 bushels. Total product reaches its maximum of 50.',
        7: 'The seventh worker makes output fall by 2 bushels. There are too many workers for too little land and equipment, and they get in each other’s way.'
      };
      note.textContent = texts[L] + cmp;
    }
    host.appendChild(f.fig);
    const fit2 = () => { c2.build(bot.clientWidth || 480); };
    autosize(c1, top, () => { fit2(); draw(); });
    if ('ResizeObserver' in window) new ResizeObserver(() => { fit2(); draw(); }).observe(bot);
  }

  /* ======================================================================
     COSTS — short-run cost curves: TVC = k(12Q − 1.2Q² + 0.06Q³), TFC = F
     ====================================================================== */
  function costs(host) {
    const st = { q: 8, F: 60, k: 1, view: 'avg', last: null };
    const TVC = (q, k) => k * (12 * q - 1.2 * q * q + 0.06 * q * q * q);
    const MCf = (q, k) => k * (12 - 2.4 * q + 0.18 * q * q);
    const f = frame('Short-run cost curves', 'Move along the output axis, then change fixed and variable costs to see which curves shift.', 'lab-costs');
    const chart = Chart(f.plot, { xMax: 20, yMax: 30, xStep: 2, yStep: 5, xLabel: 'Output (units per day)', yLabel: 'Cost per unit ($)', yFmt: v => '$' + v, left: 50, ratio: 0.72, label: 'Cost curves' });
    const leg = h('div');
    f.plot.appendChild(leg);
    const viewSeg = segmented('Curves shown', [['avg', 'Per-unit costs'], ['tot', 'Total costs']], 'avg', v => { st.view = v; setView(); draw(); });
    const qSl = slider({ name: 'output', label: 'Output', min: 1, max: 20, step: 1, value: st.q, fmt: v => v + ' units', onInput: v => { st.q = v; st.last = 'q'; draw(); } });
    const fSl = slider({ name: 'fixed', label: 'Total fixed cost (e.g. rent)', min: 0, max: 120, step: 10, value: st.F, fmt: v => '$' + v, onInput: v => { st.F = v; st.last = 'F'; draw(); } });
    const kSl = slider({ name: 'variable', label: 'Variable input prices (e.g. wage rate)', min: 0.5, max: 1.5, step: 0.1, value: st.k, fmt: v => Math.round(v * 100) + '%', onInput: v => { st.k = v; st.last = 'k'; draw(); } });
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    const reset = h('button', { type: 'button', class: 'btn btn-quiet', text: 'Reset' });
    reset.addEventListener('click', () => { Object.assign(st, { q: 8, F: 60, k: 1, last: null }); qSl.set(8); fSl.set(60); kSl.set(1); draw(); });
    f.panel.append(h('p', { class: 'panel-label', text: 'Show' }), viewSeg.el, qSl.row, fSl.row, kSl.row, dl, note, reset);

    function setView() {
      leg.textContent = '';
      if (st.view === 'avg') {
        Object.assign(chart.opts, { yMax: 30, yStep: 5, yLabel: 'Cost per unit ($)' });
        leg.appendChild(legend([['mc', 'MC'], ['atc', 'ATC'], ['avc', 'AVC'], ['afc', 'AFC']]));
      } else {
        const top = Math.max(100, Math.ceil((st.F + TVC(20, 1.5)) / 100) * 100);
        Object.assign(chart.opts, { yMax: top, yStep: top / 5, yLabel: 'Total cost ($)' });
        leg.appendChild(legend([['tc', 'TC'], ['tvc', 'TVC'], ['tfc', 'TFC']]));
      }
      chart.build(f.plot.clientWidth || 520);
    }

    function curve(fn, lo, cls, label) {
      const pts = [];
      for (let q = lo; q <= 20.001; q += 0.1) {
        const v = fn(q);
        if (v <= chart.opts.yMax && v >= 0) pts.push([q, v]);
      }
      if (pts.length > 1) {
        chart.path(pts, 'curve ' + cls);
        const end = pts[pts.length - 1];
        chart.label(chart.X(end[0]), chart.Y(end[1]), label, cls);
      }
    }

    function draw() {
      chart.clear();
      const { q, F, k } = st;
      const tvc = TVC(q, k), tc = F + tvc;
      const vals = { AFC: F / q, AVC: tvc / q, ATC: tc / q, MC: MCf(q, k) };
      if (st.view === 'avg') {
        curve(x => F / x, 0.5, 'afc', 'AFC');
        curve(x => TVC(x, k) / x, 0.5, 'avc', 'AVC');
        curve(x => (F + TVC(x, k)) / x, 0.5, 'atc', 'ATC');
        curve(x => MCf(x, k), 0.3, 'mc', 'MC');
        chart.dot(10, TVC(10, k) / 10, 'min-dot');
        s('line', { x1: chart.X(q), x2: chart.X(q), y1: chart.Y(0), y2: chart.Y(30), class: 'guide' }, chart.layers.marks);
        [['AFC', 'afc'], ['AVC', 'avc'], ['ATC', 'atc'], ['MC', 'mc']].forEach(([key, cls]) => { if (vals[key] <= 30) chart.dot(q, vals[key], cls + '-dot'); });
      } else {
        chart.hline(F, 'curve tfc', 'TFC');
        curve(x => TVC(x, k), 0, 'tvc', 'TVC');
        curve(x => F + TVC(x, k), 0, 'tc', 'TC');
        if (F > 0) {
          s('line', { x1: chart.X(q) + 6, x2: chart.X(q) + 6, y1: chart.Y(tvc), y2: chart.Y(tc), class: 'bracket gap-fc' }, chart.layers.marks);
          chart.text(q, (tvc + tc) / 2, ' = TFC', 'gap-fc-label', 'start', 4);
        }
        s('line', { x1: chart.X(q), x2: chart.X(q), y1: chart.Y(0), y2: chart.Y(chart.opts.yMax), class: 'guide' }, chart.layers.marks);
        chart.dot(q, tvc, 'tvc-dot');
        chart.dot(q, tc, 'tc-dot');
      }
      readout(dl, [
        ['TFC', money(F)], ['TVC', money(tvc)], ['TC', money(tc)],
        ['AFC', money(vals.AFC)], ['AVC', money(vals.AVC)], ['ATC', money(vals.ATC)],
        ['MC', money(vals.MC), 'k-hot']
      ]);
      let txt;
      if (st.last === 'F') {
        txt = `Fixed cost is now ${money(F)}. TFC, TC, AFC and ATC move, but TVC, AVC and MC don’t: fixed costs don’t change with output, so they never affect marginal cost.`;
      } else if (st.last === 'k') {
        txt = `Variable input prices are at ${Math.round(k * 100)}% of normal. TVC, TC, AVC, ATC and MC all move, but TFC and AFC don’t.`;
      } else {
        const rel = (a, name) => Math.abs(vals.MC - a) < 0.15 ? `MC ≈ ${name}, so ${name} is at its minimum` : vals.MC < a ? `MC < ${name}, so ${name} is falling` : `MC > ${name}, so ${name} is rising`;
        txt = `At ${q} units: ${rel(vals.AVC, 'AVC')}; ${rel(vals.ATC, 'ATC')}. The gap between ATC and AVC is AFC (${money(vals.AFC)}), which shrinks as output grows.`;
      }
      note.textContent = txt;
    }
    setView();
    host.appendChild(f.fig);
    autosize(chart, f.plot, draw);
  }

  /* ======================================================================
     LRAC — economies, constant returns and diseconomies of scale
     ====================================================================== */
  function lrac(host) {
    const cost = q => q < 35 ? 8 + 0.00889 * (35 - q) * (35 - q) : q > 65 ? 8 + 0.00778 * (q - 65) * (q - 65) : 8;
    const st = { q: 20 };
    const f = frame('The long-run average cost curve', 'Move the firm along its LRAC. In the long run all inputs can change, so the question is what happens when the firm doubles everything.', 'lab-lrac');
    const chart = Chart(f.plot, { xMax: 100, yMax: 25, xStep: 20, yStep: 5, xLabel: 'Output', yLabel: 'Long-run average cost', bare: true, left: 24, ratio: 0.6, label: 'Long-run average cost curve' });
    const sl = slider({ name: 'scale', label: 'Size of the firm (output)', min: 5, max: 95, step: 5, value: st.q, onInput: v => { st.q = v; draw(); } });
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    f.panel.append(sl.row, dl, note);
    function draw() {
      chart.clear();
      chart.poly([[0, 0], [35, 0], [35, 25], [0, 25]], 'fill-eos');
      chart.poly([[65, 0], [100, 0], [100, 25], [65, 25]], 'fill-dos');
      s('line', { x1: chart.X(35), x2: chart.X(35), y1: chart.Y(0), y2: chart.Y(25), class: 'guide' }, chart.layers.lines);
      s('line', { x1: chart.X(65), x2: chart.X(65), y1: chart.Y(0), y2: chart.Y(25), class: 'guide' }, chart.layers.lines);
      [[17.5, 'Economies'], [50, 'Constant'], [82.5, 'Diseconomies']].forEach(([x, t]) => chart.text(x, 23.2, t, 'region-label'));
      [[17.5, 'of scale'], [50, 'returns'], [82.5, 'of scale']].forEach(([x, t]) => chart.text(x, 23.2, t, 'region-label', 'middle', 15));
      const pts = [];
      for (let q = 5; q <= 95; q += 0.5) pts.push([q, cost(q)]);
      chart.path(pts, 'curve lrac');
      chart.text(95, cost(95), 'LRAC', 'lrac-label', 'end', -10);
      chart.dot(st.q, cost(st.q), 'point');
      const q = st.q;
      const region = q < 35 ? 'eos' : q > 65 ? 'dos' : 'crs';
      const R = {
        eos: ['Economies of scale', 'More than doubles', 'Falling', 'k-good', 'The firm is still small enough to gain from growing. More workers and machines allow specialisation, with dedicated teams for each task, so productivity rises and cost per unit falls.'],
        crs: ['Constant returns to scale', 'Exactly doubles', 'Constant', '', 'Growing no longer changes productivity. Output rises in the same proportion as inputs, so average cost stays the same.'],
        dos: ['Diseconomies of scale', 'Less than doubles', 'Rising', 'k-hot', 'The firm has become too big. Red tape, slow communication and management problems mean output rises less than inputs, so cost per unit rises.']
      }[region];
      readout(dl, [
        ['Zone', R[0], 'k-wide ' + R[3]],
        ['If all inputs double, output…', R[1], 'k-wide'],
        ['Long-run average cost', R[2]]
      ]);
      note.textContent = R[4];
    }
    host.appendChild(f.fig);
    autosize(chart, f.plot, draw);
  }

  /* ======================================================================
     STRUCTURES — the four market structures and each firm's demand curve
     ====================================================================== */
  const STRUCTURES = {
    pc: {
      name: 'Perfect competition',
      rows: [['Number of sellers', 'Very many small firms'], ['Type of product', 'Homogeneous (identical)'], ['Barriers to entry', 'None'], ['Market power', 'None: a price taker'], ['Long-run profit', 'Normal profit only'], ['Examples', 'Farm products; close to it: stock and foreign exchange markets']],
      power: 0,
      demand: 'Horizontal (perfectly elastic) at the market price, set by market demand and supply. Raise the price and it loses every customer; there’s no reason to cut it, since it can already sell all it wants.'
    },
    mc: {
      name: 'Monopolistic competition',
      rows: [['Number of sellers', 'Many relatively small firms'], ['Type of product', 'Differentiated (real or perceived)'], ['Barriers to entry', 'Minimal'], ['Market power', 'Some, from differentiation'], ['Long-run profit', 'Normal profit only'], ['Examples', 'Hair salons, hotels, shampoo and T-shirt shops']],
      power: 1,
      demand: 'Downward sloping but fairly elastic, because rivals sell close substitutes. A price rise loses some customers, not all. Advertising and packaging aim to shift this curve right and make it less elastic.'
    },
    ol: {
      name: 'Oligopoly',
      rows: [['Number of sellers', 'A few large firms'], ['Type of product', 'Homogeneous (oil, copper) or differentiated (cars, bread)'], ['Barriers to entry', 'Strong'], ['Market power', 'Substantial, with mutual interdependence'], ['Long-run profit', 'Normal or economic profit'], ['Examples', 'Bread (Gardenia, Sunshine, Hi-5, Bonjour), cars, oil']],
      power: 2,
      demand: 'Kinked at the current price. Above it, demand is elastic because rivals ignore a price rise. Below it, demand is inelastic because rivals match a price cut. So prices tend to stay put.'
    },
    mo: {
      name: 'Monopoly',
      rows: [['Number of sellers', 'One'], ['Type of product', 'Unique, with no close substitutes'], ['Barriers to entry', 'Very strong'], ['Market power', 'Great: a price maker'], ['Long-run profit', 'Normal or economic profit'], ['Examples', 'Singapore Post']],
      power: 3,
      demand: 'The market demand curve itself (D = AR), sloping downward. The more market power, the more inelastic it is.'
    }
  };
  function structures(host) {
    const st = { k: 'pc' };
    const f = frame('Market structure explorer', 'Pick a structure to see its characteristics and the demand curve facing one firm.', 'lab-structures');
    const chart = Chart(f.plot, { xMax: 100, yMax: 20, xStep: 20, yStep: 4, xLabel: 'Quantity (one firm)', yLabel: 'Price', bare: true, left: 30, ratio: 0.7, label: 'Demand curve facing one firm' });
    const seg = segmented('Market structure', Object.keys(STRUCTURES).map(k => [k, STRUCTURES[k].name]), st.k, v => { st.k = v; draw(); });
    f.fig.insertBefore(h('div', { class: 'lab-tabs' }, [seg.el]), f.body);
    const powerBar = h('div', { class: 'power', 'aria-hidden': 'true' });
    const dl = h('dl', { class: 'readout readout-list' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    f.panel.append(h('p', { class: 'panel-label', text: 'Market power' }), powerBar, dl);
    f.plot.appendChild(note);
    function draw() {
      const S = STRUCTURES[st.k];
      chart.clear();
      if (st.k === 'pc') {
        chart.hline(10, 'curve demand', 'D = P = AR = MR');
        chart.text(0, 10, 'P', 'axis-p', 'end', 4);
      } else if (st.k === 'mc') {
        chart.line(16, -0.09, 'curve demand', 'D', 'end');
      } else if (st.k === 'ol') {
        s('line', { x1: chart.X(0), y1: chart.Y(12), x2: chart.X(50), y2: chart.Y(10), class: 'curve demand' }, chart.layers.lines);
        s('line', { x1: chart.X(50), y1: chart.Y(10), x2: chart.X(70), y2: chart.Y(1.5), class: 'curve demand' }, chart.layers.lines);
        chart.guides(50, 10, 'Q', 'P', 'point');
        chart.dot(50, 10, 'point');
        chart.text(24, 12.2, 'Elastic: rivals ignore a price rise', 'kink-note', 'middle', -10);
        chart.text(61, 6, 'Inelastic: rivals', 'kink-note', 'start', 0);
        chart.text(61, 6, 'match a price cut', 'kink-note', 'start', 14);
      } else {
        chart.line(19, -0.2, 'curve demand', 'D = AR', 'end');
      }
      powerBar.innerHTML = ['None', 'Some', 'Substantial', 'Great'].map((t, i) => `<span class="${i <= S.power ? 'on' : ''}">${t}</span>`).join('');
      readout(dl, S.rows.map(r => [r[0], r[1]]));
      note.textContent = S.demand;
    }
    host.appendChild(f.fig);
    autosize(chart, f.plot, draw);
  }

  /* Two charts in one widget: size both to their containers and redraw together. */
  function autosize2(c1, host1, c2, host2, draw) {
    let w1 = 0, w2 = 0;
    const fit = () => {
      const a = host1.clientWidth || 480, b = host2.clientWidth || 480;
      if (Math.abs(a - w1) < 4 && Math.abs(b - w2) < 4) return;
      w1 = a; w2 = b;
      c1.build(a); c2.build(b);
      draw();
    };
    fit();
    if ('ResizeObserver' in window) { const ro = new ResizeObserver(fit); ro.observe(host1); ro.observe(host2); }
    else window.addEventListener('resize', fit);
  }
  function numField(key, label, value, onInput, prefix, attrs) {
    const fid = id('nf-' + key);
    const inp = h('input', Object.assign({ type: 'number', id: fid, step: 'any', value, inputmode: 'decimal' }, attrs || {}));
    inp.addEventListener('input', () => onInput(inp.value === '' ? NaN : parseFloat(inp.value)));
    return h('div', { class: 'field' + (prefix ? ' has-prefix' : '') }, [h('label', { for: fid, text: label }), prefix ? h('span', { class: 'prefix', text: prefix, 'aria-hidden': 'true' }) : null, inp]);
  }
  const num = (v, d = 1) => trim(v, d);
  const bn = v => (v < 0 ? '−$' : '$') + trim(Math.abs(v), 2) + 'b';
  const mn = v => (v < 0 ? '−$' : '$') + trim(Math.abs(v), 1) + 'm';

  /* ======================================================================
     PROFITMAX — a price-taking firm: MR = MC, profit/loss and the shutdown rule (Topic 8)
     Costs: TFC = 60, AVC = 12 − 1.2q + 0.06q², MC = 12 − 2.4q + 0.18q²
     ====================================================================== */
  function profitmax(host) {
    const F = 60;
    const AVC = q => 12 - 1.2 * q + 0.06 * q * q;
    const ATC = q => AVC(q) + F / q;
    const MC = q => 12 - 2.4 * q + 0.18 * q * q;
    let qBE = 1, minATC = Infinity;
    for (let q = 1; q <= 20; q += 0.01) { const v = ATC(q); if (v < minATC) { minATC = v; qBE = q; } }
    const minAVC = AVC(10); // at q = 10
    const qStar = P => { const d = 5.76 - 0.72 * (12 - P); return d < 0 ? null : (2.4 + Math.sqrt(d)) / 0.36; };
    const st = { P: 16, qt: 6 };
    const f = frame('Profit maximisation and the shutdown rule', 'A price taker sells at the market price, so P = MR. Set the price and see the best output, the profit or loss, and whether to keep producing.', 'lab-profitmax');
    const chart = Chart(f.plot, { xMax: 20, yMax: 30, xStep: 2, yStep: 5, xLabel: 'Output (units per day)', yLabel: 'Revenue and cost per unit ($)', yFmt: v => '$' + v, left: 50, ratio: 0.72, label: 'MR, MC, ATC and AVC for a price-taking firm' });
    f.plot.appendChild(legend([['mr', 'P = MR'], ['mc', 'MC'], ['atc', 'ATC'], ['avc', 'AVC'], ['profit', 'Profit'], ['loss', 'Loss']]));
    const pSl = slider({ name: 'price', label: 'Market price (= MR)', min: 3, max: 24, step: 0.5, value: st.P, fmt: money, onInput: v => { st.P = v; draw(); } });
    const tSl = slider({ name: 'testq', label: 'Test an output level', min: 1, max: 20, step: 1, value: st.qt, fmt: v => v + ' units', onInput: v => { st.qt = v; draw(); } });
    const test = h('p', { class: 'lab-note lab-test', 'aria-live': 'polite' });
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    f.panel.append(pSl.row, dl, note, tSl.row, test);

    function curve(fn, lo, cls, label) {
      const pts = [];
      for (let q = lo; q <= 20.001; q += 0.1) { const v = fn(q); if (v <= 30 && v >= 0) pts.push([q, v]); }
      chart.path(pts, 'curve ' + cls);
      const e = pts[pts.length - 1];
      chart.label(chart.X(e[0]), chart.Y(e[1]), label, cls);
    }
    function draw() {
      chart.clear();
      const P = st.P;
      let q = qStar(P);
      const shut = q === null || P < minAVC - 1e-9;
      const atShut = Math.abs(P - minAVC) < 0.26;
      if (!shut && q > 20) q = 20;
      if (!shut) {
        const atc = ATC(q);
        chart.poly([[0, P], [q, P], [q, atc], [0, atc]], P >= atc ? 'fill-profit' : 'fill-loss');
      }
      curve(ATC, 2.2, 'atc', 'ATC');
      curve(AVC, 0.3, 'avc', 'AVC');
      curve(MC, 0.3, 'mc', 'MC');
      chart.hline(P, 'curve mr');
      chart.text(0.4, P, 'P = MR', 'mr-label', 'start', -7);
      chart.dot(qBE, minATC, 'min-dot');
      chart.text(qBE, minATC, 'Breakeven', 'point-note', 'middle', 22);
      chart.dot(10, minAVC, 'min-dot');
      chart.text(10, minAVC, 'Shutdown point', 'point-note', 'middle', 22);
      s('line', { x1: chart.X(st.qt), x2: chart.X(st.qt), y1: chart.Y(0), y2: chart.Y(30), class: 'guide test-line' }, chart.layers.marks);
      if (!shut) { chart.guides(q, P, trim(q, 1), null, 'point'); chart.dot(q, P, 'point'); }

      let rows, txt;
      if (shut) {
        rows = [['Price = MR', money(P)], ['Best output', '0 (shut down)'], ['Loss', money(-F), 'k-hot'], ['Decision', atShut ? 'Indifferent (shutdown point)' : 'Shut down', 'k-wide k-hot']];
        txt = `The price (${money(P)}) is below the lowest AVC (${money(minAVC)}), so revenue can’t even cover variable costs. Shutting down limits the loss to the fixed cost, ${money(F)}.`;
      } else {
        const atc = ATC(q), avc = AVC(q), tr = P * q, tc = atc * q, profit = tr - tc;
        let dec, cls;
        if (Math.abs(profit) < 1.5) { dec = 'Normal profit (breakeven): produce'; cls = 'k-good'; }
        else if (profit > 0) { dec = 'Economic profit: produce'; cls = 'k-good'; }
        else if (atShut) { dec = 'Indifferent (shutdown point)'; cls = 'k-warn'; }
        else { dec = 'Loss, but P > AVC: keep producing'; cls = 'k-warn'; }
        rows = [['Price = MR', money(P)], ['Best output (MR = MC)', trim(q, 1)], ['ATC at that output', money(atc)], ['AVC at that output', money(avc)], ['TR', money(tr)], ['TC', money(tc)], [profit >= 0 ? 'Profit' : 'Loss', money(profit), profit >= 0 ? 'k-good' : 'k-hot'], ['Decision', dec, 'k-wide ' + cls]];
        txt = profit > 1.5 ? `P (${money(P)}) is above ATC (${money(atc)}), so the firm earns economic profit (the green rectangle).`
          : profit > -1.5 ? `P is at the minimum of ATC: TR = TC, so the firm earns normal profit. This is the breakeven point.`
            : `P (${money(P)}) is below ATC (${money(atc)}), so the firm makes a loss (the red rectangle) of ${money(-profit)}. But P is above AVC (${money(avc)}): revenue covers the variable costs and part of the fixed cost, so producing loses less than shutting down (${money(F)}).`;
      }
      readout(dl, rows);
      note.textContent = txt;
      const mcT = MC(st.qt);
      test.textContent = Math.abs(mcT - P) < 0.3
        ? `At ${st.qt} units, MR (${money(P)}) ≈ MC (${money(mcT)}). There’s no reason to change output.`
        : mcT < P
          ? `At ${st.qt} units, MR (${money(P)}) > MC (${money(mcT)}). One more unit adds more to revenue than to cost, so the firm should increase output.`
          : `At ${st.qt} units, MR (${money(P)}) < MC (${money(mcT)}). One more unit adds more to cost than to revenue, so the firm should decrease output.`;
    }
    host.appendChild(f.fig);
    autosize(chart, f.plot, draw);
  }

  /* ======================================================================
     STALL — the sweet drinks example: produce or shut down? (Topic 8)
     ====================================================================== */
  function stall(host) {
    const st = { P: 1, TFC: 100, TVC: 75, Q: 100 };
    const f = frame('Should the drinks stall open today?', 'Your notes’ example: 100 cups a day, $100 stall rental (fixed) and $75 for a worker, lights, water and ingredients (variable). Change the price.', 'lab-calc lab-stall');
    f.body.classList.add('lab-body-calc');
    const pSl = slider({ name: 'cup', label: 'Price per cup', min: 0.25, max: 2.5, step: 0.05, value: st.P, fmt: money, onInput: v => { st.P = v; calc(); } });
    const fields = h('div', { class: 'el-grid el-grid-3' }, [
      numField('tfc', 'Total fixed cost', st.TFC, v => { st.TFC = v; calc(); }, '$', { min: '0' }),
      numField('tvc', 'Total variable cost', st.TVC, v => { st.TVC = v; calc(); }, '$', { min: '0' }),
      numField('cups', 'Cups sold', st.Q, v => { st.Q = v; calc(); }, null, { min: '1' })
    ]);
    const meter = h('div', { class: 'pmeter', 'aria-hidden': 'true' });
    f.plot.append(pSl.row, fields, meter);
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    f.panel.append(dl, note);
    function calc() {
      const { P, TFC, TVC, Q } = st;
      if (![TFC, TVC, Q].every(v => isFinite(v) && v >= 0) || Q <= 0) { readout(dl, []); note.textContent = 'Enter costs of zero or more and at least one cup.'; return; }
      const avc = TVC / Q, afc = TFC / Q, atc = avc + afc, tr = P * Q;
      const open = tr - TVC - TFC, shutLoss = -TFC;
      const max = Math.max(2.5, atc * 1.4);
      const pos = v => Math.min(100, v / max * 100) + '%';
      meter.innerHTML = `<div class="pm-track"><span class="pm-zone shut" style="width:${pos(avc)}">Shut down</span><span class="pm-zone lossopen" style="width:calc(${pos(atc)} - ${pos(avc)})">Loss, stay open</span><span class="pm-zone profit">Profit</span></div>
        <div class="pm-mark" style="left:${pos(avc)}"><span>AVC ${money(avc)}</span></div><div class="pm-mark" style="left:${pos(atc)}"><span>ATC ${money(atc)}</span></div>
        <div class="pm-price" style="left:${pos(P)}"></div>`;
      let dec, cls, txt;
      if (P > atc + 0.005) { dec = 'Economic profit: open'; cls = 'k-good'; txt = `P > ATC. Revenue (${money(tr)}) covers all costs (${money(TFC + TVC)}), leaving ${money(open)} of economic profit.`; }
      else if (Math.abs(P - atc) <= 0.005) { dec = 'Normal profit: open'; cls = 'k-good'; txt = 'P = ATC, so TR = TC: normal profit, the breakeven point.'; }
      else if (P > avc + 0.005) { dec = 'Loss, but open (P > AVC)'; cls = 'k-warn'; txt = `P < ATC, so the stall makes a loss. But P > AVC: after paying the ${money(TVC)} variable costs, ${money(tr - TVC)} is left toward the rent. Opening loses ${money(-open)}; shutting loses the full ${money(TFC)}.`; }
      else if (Math.abs(P - avc) <= 0.005) { dec = 'Indifferent (shutdown point)'; cls = 'k-warn'; txt = 'P = AVC: revenue exactly covers variable costs, so the loss is the full fixed cost whether you open or not.'; }
      else { dec = 'Shut down (P < AVC)'; cls = 'k-hot'; txt = `P < AVC: revenue (${money(tr)}) doesn’t even cover the ${money(TVC)} variable costs. Opening loses ${money(-open)}; shutting down loses only the ${money(TFC)} rent.`; }
      readout(dl, [['AFC', money(afc)], ['AVC', money(avc)], ['ATC', money(atc)], ['TR', money(tr)], ['Profit if open', money(open), open >= 0 ? 'k-good' : 'k-hot'], ['Loss if shut', money(shutLoss), 'k-hot'], ['Decision', dec, 'k-wide ' + cls]]);
      note.textContent = txt;
    }
    calc();
    host.appendChild(f.fig);
  }

  /* ======================================================================
     LABOUR — unemployment rate and participation rate (Topic 9)
     ====================================================================== */
  function labour(host) {
    const st = { E: 3570, U: 102.8, W: NaN, D: 0 };
    const f = frame('Unemployment rate calculator', 'Numbers in thousands. It starts with Singapore’s 2016 figures from your notes. Add the working-age population (15 and above) for the participation rate.', 'lab-calc lab-labour');
    f.body.classList.add('lab-body-calc');
    const fields = h('div', { class: 'el-grid el-grid-2' }, [
      numField('emp', 'Employed', st.E, v => { st.E = v; calc(); }, null, { min: '0' }),
      numField('unemp', 'Unemployed (actively looking)', st.U, v => { st.U = v; calc(); }, null, { min: '0' }),
      numField('wap', 'Population aged 15+ (optional)', '', v => { st.W = v; calc(); }, null, { min: '0', placeholder: 'e.g. 5,000' }),
      numField('disc', 'Discouraged workers (optional)', st.D, v => { st.D = v; calc(); }, null, { min: '0' })
    ]);
    const bar = h('div', { class: 'popbar', 'aria-hidden': 'true' });
    f.plot.append(fields, bar);
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    f.panel.append(dl, note);
    function calc() {
      const { E, U, W } = st, D = isFinite(st.D) ? st.D : 0;
      if (!(isFinite(E) && isFinite(U) && E >= 0 && U >= 0 && E + U > 0)) { readout(dl, []); note.textContent = 'Enter the number employed and unemployed.'; bar.innerHTML = ''; return; }
      const LF = E + U, ur = U / LF;
      const rows = [['Labour force', trim(LF, 1)], ['Unemployment rate', pct(ur), 'k-big']];
      let txt = `Unemployment rate = ${trim(U, 1)} ÷ ${trim(LF, 1)} × 100% = ${pct(ur)}.`;
      const hasW = isFinite(W) && W >= LF;
      if (hasW) {
        rows.push(['Participation rate', pct(LF / W)]);
        rows.push(['Economically inactive', trim(W - LF, 1)]);
        txt += ` Participation rate = ${trim(LF, 1)} ÷ ${trim(W, 1)} × 100% = ${pct(LF / W)}.`;
      } else if (isFinite(W)) {
        txt += ' The working-age population can’t be smaller than the labour force.';
      }
      if (D > 0) {
        const adj = (U + D) / (LF + D);
        rows.push(['If discouraged workers counted', pct(adj), 'k-warn']);
        txt += ` Counting the ${trim(D, 1)} discouraged workers would raise the rate to ${pct(adj)}: the official rate understates the problem.`;
      }
      readout(dl, rows);
      note.textContent = txt;
      const total = hasW ? W : LF + D;
      const seg = (v, cls, label) => v > 0 ? `<span class="pb ${cls}" style="flex:${v}">${v / total > 0.12 ? label : ''}</span>` : '';
      bar.innerHTML = `<div class="pb-track">${seg(E, 'emp', 'Employed')}${seg(U, 'unemp', 'Unemployed')}${seg(D, 'disc', 'Discouraged')}${hasW ? seg(W - LF - D, 'inact', 'Inactive') : ''}</div>
        <ul class="legend"><li><span class="sw pb-emp"></span>Employed</li><li><span class="sw pb-unemp"></span>Unemployed</li>${D > 0 ? '<li><span class="sw pb-disc"></span>Discouraged</li>' : ''}${hasW ? '<li><span class="sw pb-inact"></span>Economically inactive</li>' : ''}</ul>`;
    }
    calc();
    host.appendChild(f.fig);
  }

  /* ======================================================================
     BASKET — CPI from a basket of goods, the inflation rate and real income (Topic 9)
     ====================================================================== */
  function basket(host) {
    const items = [
      { name: 'Oranges', q: 10, p0: 1, p1: 2 },
      { name: 'Haircuts', q: 5, p0: 8, p1: 10 }
    ];
    const st = { income: 40000 };
    const f = frame('CPI and inflation calculator', 'Your notes’ basket: oranges and haircuts, with 2014 as the base year. Change quantities or prices.', 'lab-calc lab-basket');
    f.body.classList.add('lab-body-calc');
    const table = h('div', { class: 'basket-grid' });
    const head = ['Item', 'Quantity', '2014 price', '2015 price'].map(t => h('span', { class: 'bg-head', text: t }));
    table.append(...head);
    items.forEach((it, i) => {
      table.appendChild(h('span', { class: 'bg-name', text: it.name }));
      [['q', ''], ['p0', '$'], ['p1', '$']].forEach(([k, pre]) => {
        const fid = id('bk-' + i + k);
        const inp = h('input', { type: 'number', id: fid, min: '0', step: 'any', value: it[k], inputmode: 'decimal', 'aria-label': `${it.name} ${k === 'q' ? 'quantity' : k === 'p0' ? '2014 price' : '2015 price'}` });
        inp.addEventListener('input', () => { it[k] = parseFloat(inp.value); calc(); });
        table.appendChild(h('span', { class: 'field' + (pre ? ' has-prefix' : '') }, [pre ? h('span', { class: 'prefix', text: pre, 'aria-hidden': 'true' }) : null, inp]));
      });
    });
    f.plot.append(table, h('div', { class: 'el-grid el-grid-1' }, [numField('inc', 'Money income in 2015 (for real income)', st.income, v => { st.income = v; calc(); }, '$', { min: '0' })]));
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    f.panel.append(dl, note);
    function calc() {
      if (!items.every(it => [it.q, it.p0, it.p1].every(v => isFinite(v) && v >= 0))) { readout(dl, []); note.textContent = 'Enter quantities and prices of zero or more.'; return; }
      const c0 = items.reduce((a, it) => a + it.q * it.p0, 0), c1 = items.reduce((a, it) => a + it.q * it.p1, 0);
      if (c0 <= 0) { readout(dl, []); note.textContent = 'The base-year basket must cost more than $0.'; return; }
      const cpi1 = c1 / c0 * 100, infl = (cpi1 - 100) / 100;
      const rows = [['Basket cost, 2014', money(c0)], ['Basket cost, 2015', money(c1)], ['CPI 2014 (base)', '100'], ['CPI 2015', trim(cpi1, 1), 'k-big'], ['Inflation rate', pct(infl), infl > 0 ? 'k-hot' : 'k-good']];
      let txt = `CPI 2015 = ${money(c1)} ÷ ${money(c0)} × 100 = ${trim(cpi1, 1)}. Inflation = (${trim(cpi1, 1)} − 100) ÷ 100 × 100% = ${pct(infl)}.`;
      if (isFinite(st.income) && st.income >= 0 && cpi1 > 0) {
        const real = st.income / cpi1 * 100;
        rows.push(['Real income (2014 dollars)', money(real)]);
        txt += ` A money income of ${money(st.income)} is worth ${money(real)} in base-year dollars (money income ÷ CPI × 100).`;
      }
      readout(dl, rows);
      note.textContent = txt;
    }
    calc();
    host.appendChild(f.fig);
  }

  /* ======================================================================
     GDP — money (nominal) vs real GDP, the deflator and growth (Topic 10)
     ====================================================================== */
  function gdp(host) {
    const st = { p0: 4, q0: 100000, p1: 6, q1: 80000 };
    const f = frame('Money GDP or real GDP?', 'Your notes’ one-product economy that only makes chicken rice. 2015 is the base year.', 'lab-calc lab-gdp');
    f.body.classList.add('lab-body-calc');
    f.plot.append(h('div', { class: 'el-grid' }, [
      h('p', { class: 'adv-name', text: '2015' }), numField('p0', 'Price', st.p0, v => { st.p0 = v; calc(); }, '$', { min: '0' }), numField('q0', 'Plates', st.q0, v => { st.q0 = v; calc(); }, null, { min: '0' }),
      h('p', { class: 'adv-name', text: '2016' }), numField('p1', 'Price', st.p1, v => { st.p1 = v; calc(); }, '$', { min: '0' }), numField('q1', 'Plates', st.q1, v => { st.q1 = v; calc(); }, null, { min: '0' })
    ]));
    const bars = h('div', { class: 'gdp-bars', 'aria-hidden': 'true' });
    f.plot.appendChild(bars);
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    f.panel.append(dl, note);
    function calc() {
      const { p0, q0, p1, q1 } = st;
      if (![p0, q0, p1, q1].every(v => isFinite(v) && v > 0)) { readout(dl, []); note.textContent = 'Enter prices and quantities above zero.'; bars.innerHTML = ''; return; }
      const m0 = p0 * q0, m1 = p1 * q1, r1 = p0 * q1, defl = m1 / r1 * 100;
      const gm = (m1 - m0) / m0, gr = (r1 - m0) / m0;
      readout(dl, [
        ['Money GDP 2015', money(m0)], ['Money GDP 2016', money(m1)],
        ['Real GDP 2016 (2015 prices)', money(r1), 'k-big'], ['GDP deflator 2016', trim(defl, 1)],
        ['Money GDP growth', pct(gm)], ['Economic growth (real)', pct(gr), gr >= 0 ? 'k-good' : 'k-hot']
      ]);
      note.textContent = `Real GDP 2016 = 2015 price × 2016 quantity = ${money(p0)} × ${q1.toLocaleString('en-US')} = ${money(r1)}. `
        + (gm > 0 && gr < 0 ? `Money GDP rose ${pct(gm)}, but real GDP fell ${pct(-gr)}: prices rose while output fell, so society is not better off.`
          : gr > 0 ? `Real GDP rose ${pct(gr)}: the economy produced more, so society is better off (before considering population and the other limits of GDP).`
            : `Real GDP changed by ${pct(gr)}.`);
      const max = Math.max(m0, m1, r1);
      const bar = (label, v, cls) => `<div class="gb-row"><span class="gb-label">${label}</span><span class="gb-track"><span class="gb-fill ${cls}" style="width:${v / max * 100}%"></span></span><span class="gb-val">${money(v)}</span></div>`;
      bars.innerHTML = bar('Money GDP 2015', m0, 'gb-base') + bar('Money GDP 2016', m1, 'gb-money') + bar('Real GDP 2016', r1, 'gb-real');
    }
    calc();
    host.appendChild(f.fig);
  }

  /* ======================================================================
     CYCLE — the four phases of the business cycle (Topic 10)
     ====================================================================== */
  function cycle(host) {
    const Y = t => 40 + 0.22 * t + 9 * Math.sin(2 * Math.PI * (t - 4) / 48);
    const dY = t => (Y(t + 0.05) - Y(t - 0.05)) / 0.1;
    const peaks = [], troughs = [];
    for (let t = 1; t < 100; t += 0.05) {
      if (dY(t - 0.05) > 0 && dY(t) <= 0) peaks.push(t);
      if (dY(t - 0.05) < 0 && dY(t) >= 0) troughs.push(t);
    }
    const st = { t: 22 };
    const f = frame('The business cycle', 'Move through time and watch real GDP rise and fall around its long-run trend.', 'lab-cycle');
    const chart = Chart(f.plot, { xMax: 100, yMax: 80, xStep: 20, yStep: 20, xLabel: 'Time', yLabel: 'Real GDP', bare: true, left: 24, ratio: 0.55, label: 'Business cycle diagram' });
    f.plot.appendChild(legend([['cyc', 'Real GDP'], ['trend', 'Long-run trend'], ['recession', 'Recession']]));
    const sl = slider({ name: 'time', label: 'Time', min: 1, max: 99, step: 1, value: st.t, onInput: v => { st.t = v; draw(); } });
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    f.panel.append(sl.row, dl, note);
    const PH = {
      Recession: ['Real GDP falls', 'Unemployment rises', 'The declining phase. A technical recession is 2 consecutive quarters of negative economic growth.'],
      Trough: ['Real GDP at its lowest', 'Unemployment at its highest', 'The turning point: the contraction bottoms out.'],
      Recovery: ['Real GDP rises', 'Unemployment falls', 'The expanding phase.'],
      Peak: ['Real GDP at its highest', 'Close to full employment', 'The highest point, before the next recession.']
    };
    function phase(t) {
      if (peaks.some(p => Math.abs(p - t) < 2.5)) return 'Peak';
      if (troughs.some(p => Math.abs(p - t) < 2.5)) return 'Trough';
      return dY(t) < 0 ? 'Recession' : 'Recovery';
    }
    function draw() {
      chart.clear();
      peaks.forEach(p => { const tr = troughs.find(x => x > p) || 100; chart.poly([[p, 0], [tr, 0], [tr, 80], [p, 80]], 'fill-recession'); });
      chart.line(40, 0.22, 'curve trend');
      const pts = []; for (let t = 0; t <= 100; t += 0.5) pts.push([t, Y(t)]);
      chart.path(pts, 'curve cyc');
      peaks.forEach(p => chart.text(p, Y(p), 'Peak', 'phase-label', 'middle', -12));
      troughs.forEach(p => chart.text(p, Y(p), 'Trough', 'phase-label', 'middle', 22));
      if (peaks.length > 1) {
        const y = 76;
        s('line', { x1: chart.X(peaks[0]), x2: chart.X(peaks[1]), y1: chart.Y(y), y2: chart.Y(y), class: 'bracket cyc-br' }, chart.layers.marks);
        [peaks[0], peaks[1]].forEach(p => s('line', { x1: chart.X(p), x2: chart.X(p), y1: chart.Y(y) - 5, y2: chart.Y(y) + 5, class: 'bracket cyc-br' }, chart.layers.marks));
        chart.text((peaks[0] + peaks[1]) / 2, y, 'One business cycle', 'cyc-br-label', 'middle', -8);
      }
      s('line', { x1: chart.X(st.t), x2: chart.X(st.t), y1: chart.Y(0), y2: chart.Y(80), class: 'guide' }, chart.layers.marks);
      chart.dot(st.t, Y(st.t), 'point');
      const ph = phase(st.t), info = PH[ph];
      readout(dl, [['Phase', ph, 'k-wide ' + (ph === 'Recession' || ph === 'Trough' ? 'k-warn' : 'k-good')], ['Output', info[0], 'k-text'], ['Unemployment', info[1], 'k-text']]);
      note.textContent = info[2];
    }
    host.appendChild(f.fig);
    autosize(chart, f.plot, draw);
  }

  /* ======================================================================
     MULTIPLIER — rounds of spending (Topic 11)
     ====================================================================== */
  function multiplier(host) {
    const st = { mpc: 0.75, inj: 100 };
    const f = frame('The income multiplier, round by round', 'An injection of spending becomes someone’s income; they spend the MPC share of it, which becomes someone else’s income, and so on.', 'lab-multiplier');
    const chart = Chart(f.plot, { xMax: 11, yMax: 100, xStep: 1, yStep: 20, xLabel: 'Round', yLabel: 'Change in output ($m)', left: 44, ratio: 0.55, label: 'Change in output in each round', xFmt: v => (v >= 1 && v <= 10) ? String(v) : '' });
    const table = h('div', { class: 'table-wrap' });
    f.plot.appendChild(table);
    const mSl = slider({ name: 'mpc', label: 'Marginal propensity to consume (MPC)', min: 0.5, max: 0.9, step: 0.05, value: st.mpc, fmt: v => trim(v, 2), onInput: v => { st.mpc = v; draw(); } });
    const inj = numField('inj', 'Initial change in spending ($m)', st.inj, v => { st.inj = v; draw(); }, '$', { min: '1' });
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    f.panel.append(mSl.row, inj, dl, note);
    function draw() {
      const c = st.mpc, I = isFinite(st.inj) && st.inj > 0 ? st.inj : 100, mps = 1 - c, k = 1 / mps;
      Object.assign(chart.opts, { yMax: Math.ceil(I / 20) * 20, yStep: Math.ceil(I / 20) * 20 / 5 });
      chart.build(f.plot.clientWidth || 520);
      chart.clear();
      for (let r = 1; r <= 10; r++) {
        const v = I * Math.pow(c, r - 1);
        chart.poly([[r - 0.35, 0], [r + 0.35, 0], [r + 0.35, v], [r - 0.35, v]], 'fill-bar');
      }
      const rows = [];
      let tY = 0, tC = 0, tS = 0;
      for (let r = 1; r <= 7; r++) {
        const y = I * Math.pow(c, r - 1);
        rows.push(`<tr><td>${r}</td><td>${r === 1 ? mn(I) : ''}</td><td>${mn(y)}</td><td>${mn(y * c)}</td><td>${mn(y * mps)}</td></tr>`);
        tY += y; tC += y * c; tS += y * mps;
      }
      const TY = I * k, TC = TY * c, TS = TY * mps;
      table.innerHTML = `<table class="num"><thead><tr><th>Round</th><th>Initial change</th><th>Change in output</th><th>Change in C (MPC ${trim(c, 2)})</th><th>Change in S (MPS ${trim(mps, 2)})</th></tr></thead><tbody>${rows.join('')}
        <tr><td>Subtotal 1–7</td><td></td><td>${mn(tY)}</td><td>${mn(tC)}</td><td>${mn(tS)}</td></tr>
        <tr><td>All later rounds</td><td></td><td>${mn(TY - tY)}</td><td>${mn(TC - tC)}</td><td>${mn(TS - tS)}</td></tr>
        <tr><td><strong>Total</strong></td><td><strong>${mn(I)}</strong></td><td><strong>${mn(TY)}</strong></td><td><strong>${mn(TC)}</strong></td><td><strong>${mn(TS)}</strong></td></tr></tbody></table>`;
      readout(dl, [['MPS', trim(mps, 2)], ['Multiplier (1 ÷ MPS)', trim(k, 2), 'k-big'], ['Total change in output', mn(TY), 'k-good'], ['Total saved', mn(TS)]]);
      note.textContent = `ΔY = (1 ÷ ${trim(mps, 2)}) × ${mn(I)} = ${mn(TY)}. Each round is ${trim(c * 100, 0)}% of the one before, because ${trim(mps * 100, 0)}% leaks into saving. The rounds stop growing once everything has been saved, and total saving equals the original injection.`;
    }
    host.appendChild(f.fig);
    autosize(chart, f.plot, draw);
  }

  /* ======================================================================
     FISCAL — the government expenditure and tax multipliers (Topic 12)
     ====================================================================== */
  function fiscalCalc(host) {
    const st = { mpc: 0.75, dG: 50, dT: 0 };
    const f = frame('Government spending and tax multipliers', 'Enter a change in government spending (G) and/or lump sum taxes (T), in $ billions. Use negative numbers for cuts.', 'lab-calc lab-fiscal');
    f.body.classList.add('lab-body-calc');
    const mSl = slider({ name: 'fmpc', label: 'MPC', min: 0.5, max: 0.9, step: 0.05, value: st.mpc, fmt: v => trim(v, 2), onInput: v => { st.mpc = v; calc(); } });
    const gF = numField('dg', 'Change in G ($b)', st.dG, v => { st.dG = v; calc(); });
    const tF = numField('dt', 'Change in T ($b)', st.dT, v => { st.dT = v; calc(); });
    const gIn = gF.querySelector('input'), tIn = tF.querySelector('input');
    const ex = h('div', { class: 'chips' }, [
      h('button', { type: 'button', class: 'chip', text: 'G +$50b', onclick: () => { st.dG = 50; st.dT = 0; gIn.value = 50; tIn.value = 0; calc(); } }),
      h('button', { type: 'button', class: 'chip', text: 'T −$50b', onclick: () => { st.dG = 0; st.dT = -50; gIn.value = 0; tIn.value = -50; calc(); } }),
      h('button', { type: 'button', class: 'chip', text: 'Both +$50b', onclick: () => { st.dG = 50; st.dT = 50; gIn.value = 50; tIn.value = 50; calc(); } })
    ]);
    f.plot.append(mSl.row, h('div', { class: 'el-grid el-grid-2' }, [gF, tF]), h('p', { class: 'panel-label', text: 'Examples' }), ex);
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    f.panel.append(dl, note);
    function calc() {
      const c = st.mpc, mps = 1 - c, dG = isFinite(st.dG) ? st.dG : 0, dT = isFinite(st.dT) ? st.dT : 0;
      const kG = 1 / mps, kT = -c / mps, yG = kG * dG, yT = kT * dT, dB = dT - dG;
      readout(dl, [
        ['Spending multiplier (1 ÷ MPS)', trim(kG, 2)], ['Tax multiplier (−MPC ÷ MPS)', '−' + trim(-kT, 2)],
        ['ΔY from G', bn(yG)], ['ΔY from T', bn(yT)], ['Total ΔY', bn(yG + yT), 'k-big'],
        ['Change in budget (ΔT − ΔG)', bn(dB), dB < 0 ? 'k-hot' : dB > 0 ? 'k-good' : '']
      ]);
      const parts = [];
      if (dG) parts.push(`ΔY = (1 ÷ ${trim(mps, 2)}) × ${bn(dG)} = ${bn(yG)}`);
      if (dT) parts.push(`ΔY = (−${trim(c, 2)} ÷ ${trim(mps, 2)}) × ${bn(dT)} = ${bn(yT)}`);
      let txt = parts.length ? parts.join('; ') + '.' : 'Enter a change in G or T.';
      if (dG && dT && dG === dT) txt += ` Raising G and T by the same amount still raises output by ${bn(yG + yT)}, because the spending counts in full while only the MPC share of the tax is taken out of spending.`;
      else if (dT && !dG) txt += ' A tax change works through disposable income and consumption, so its multiplier is smaller than the spending multiplier.';
      if (dB) txt += ` Starting from a balanced budget, this moves the budget toward a ${dB < 0 ? 'deficit' : 'surplus'} of ${bn(Math.abs(dB))}.`;
      note.textContent = txt;
    }
    calc();
    host.appendChild(f.fig);
  }

  /* ======================================================================
     CREDIT — the credit creation process and the money multiplier (Topic 13)
     ====================================================================== */
  function credit(host) {
    const st = { er: 1000, rrr: 20 };
    const f = frame('Credit creation calculator', 'Bank A lends its excess reserves. Each loan is spent and re-deposited in the next bank, which keeps the required reserves and lends the rest.', 'lab-calc lab-credit');
    f.body.classList.add('lab-body-calc');
    const rSl = slider({ name: 'rrr', label: 'Reserve requirement ratio (RRR)', min: 5, max: 50, step: 5, value: st.rrr, fmt: v => v + '%', onInput: v => { st.rrr = v; calc(); } });
    const eF = numField('er', 'Bank A’s initial excess reserves', st.er, v => { st.er = v; calc(); }, '$', { min: '1' });
    const table = h('div', { class: 'table-wrap' });
    f.plot.append(rSl.row, eF, table);
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    f.panel.append(dl, note);
    function calc() {
      const r = st.rrr / 100, ER = isFinite(st.er) && st.er > 0 ? st.er : 1000, mm = 1 / r, dMS = ER * mm;
      const rows = [`<tr><td>A</td><td></td><td></td><td>${money(ER)}</td></tr>`];
      let dep = ER, sumD = 0, sumR = 0;
      ['B', 'C', 'D'].forEach(b => { rows.push(`<tr><td>${b}</td><td>${money(dep)}</td><td>${money(dep * r)}</td><td>${money(dep * (1 - r))}</td></tr>`); sumD += dep; sumR += dep * r; dep *= (1 - r); });
      rows.push(`<tr><td>All others</td><td>${money(dMS - sumD)}</td><td>${money(ER - sumR)}</td><td></td></tr>`);
      rows.push(`<tr><td><strong>Total</strong></td><td><strong>${money(dMS)}</strong></td><td><strong>${money(ER)}</strong></td><td></td></tr>`);
      table.innerHTML = `<table class="num"><thead><tr><th>Bank</th><th>Deposit</th><th>Required reserves</th><th>Excess reserves (lent)</th></tr></thead><tbody>${rows.join('')}</tbody></table>`;
      readout(dl, [['Money multiplier (1 ÷ RRR)', trim(mm, 2), 'k-big'], ['Increase in money supply', money(dMS), 'k-good']]);
      note.textContent = `ΔMS = IER × (1 ÷ RRR) = ${money(ER)} × ${trim(mm, 2)} = ${money(dMS)}. A lower RRR means banks keep less and lend more at each step, so the multiplier and the money supply grow.`;
    }
    calc();
    host.appendChild(f.fig);
  }

  /* ======================================================================
     MONEYMARKET — MAS tools → money supply → interest rate → C and I → AD → output (Topic 13)
     Money demand: r = 10 − 0.05M. AD shifts by 12 for each 1-point fall in r.
     ====================================================================== */
  const MONEY_TOOLS = [
    { label: 'Lower the RRR', d: 20, why: 'Banks have more excess reserves and a bigger money multiplier, so they lend more.' },
    { label: 'Raise the RRR', d: -20, why: 'Some excess reserves become required reserves and the money multiplier shrinks, so banks lend less.' },
    { label: 'Lower the discount rate', d: 20, why: 'Borrowing reserves from the MAS is cheaper, so banks borrow and lend more.' },
    { label: 'Raise the discount rate', d: -20, why: 'Borrowing reserves from the MAS costs more, so banks lend less.' },
    { label: 'Buy government securities', d: 20, why: 'The MAS pays for the securities, adding to bank reserves, so banks lend more.' },
    { label: 'Sell government securities', d: -20, why: 'Buyers pay with bank deposits, draining bank reserves, so banks lend less.' },
    { label: 'MAS sells S$', d: 20, why: 'More Singapore dollars go into circulation.' },
    { label: 'MAS buys S$', d: -20, why: 'The MAS takes Singapore dollars out of circulation.' }
  ];
  function moneymarket(host) {
    const st = { M: 100, sit: -15, tool: null };
    const f = frame('From the money market to output', 'Pick the economy’s situation, then use one of the MAS’s tools. Follow the chain from the money supply to the interest rate, AD and output.', 'lab-moneymarket');
    const top = h('div', { class: 'plot-stack' }), bot = h('div', { class: 'plot-stack' });
    f.plot.append(top, bot);
    const c1 = Chart(top, { xMax: 200, yMax: 10, xStep: 40, yStep: 2, xLabel: 'Quantity of money ($b)', yLabel: 'Interest rate (%)', yFmt: v => v + '%', left: 44, ratio: 0.5, maxH: 280, label: 'Money market' });
    const c2 = Chart(bot, { xMax: 100, yMax: 200, xStep: 20, yStep: 40, xLabel: 'Output (real GDP)', yLabel: 'Price level', left: 44, ratio: 0.5, maxH: 280, label: 'AD-AS diagram' });
    f.plot.appendChild(legend([['supply', 'Money supply (SM) / AS'], ['demand', 'Money demand (DM) / AD'], ['yf', 'Full employment (Yf)']]));
    const sitSeg = segmented('Situation', [[-15, 'Recession'], [0, 'Full employment'], [15, 'Inflationary']], st.sit, v => { st.sit = v; draw(); });
    const chips = h('div', { class: 'chips', role: 'group', 'aria-label': 'Monetary tools' });
    const btns = MONEY_TOOLS.map((t, i) => {
      const b = h('button', { type: 'button', class: 'chip', text: t.label });
      b.addEventListener('click', () => { st.M = clamp(st.M + t.d, 40, 160); st.tool = i; draw(); });
      chips.appendChild(b);
      return b;
    });
    const reset = h('button', { type: 'button', class: 'btn btn-quiet', text: 'Reset the money supply' });
    reset.addEventListener('click', () => { st.M = 100; st.tool = null; draw(); });
    const dl = h('dl', { class: 'readout' });
    const note = h('p', { class: 'lab-note', 'aria-live': 'polite' });
    f.panel.append(h('p', { class: 'panel-label', text: 'Situation' }), sitSeg.el, h('p', { class: 'panel-label', text: 'MAS tools' }), chips, dl, note, reset);
    function draw() {
      c1.clear(); c2.clear();
      const r = 10 - 0.05 * st.M, r0 = 5;
      if (st.M !== 100) c1.vline(100, 'curve supply ghost');
      c1.line(10, -0.05, 'curve demand', 'DM', 'end');
      c1.vline(st.M, 'curve supply', st.M === 100 ? 'SM' : 'SM₁');
      c1.guides(st.M, r, trim(st.M, 0), trim(r, 1) + '%');
      c1.dot(st.M, r, 'eq');
      if (st.M !== 100) c1.arrow(100, r0, st.M, r);
      const adShift = st.sit + 12 * (r0 - r);
      const a = 200 + 2 * adShift, Yv = a / 4, Pl = a - 2 * Yv, yf = 50, gap = Yv - yf;
      const aBase = 200 + 2 * st.sit;
      if (st.M !== 100) c2.line(aBase, -2, 'curve demand ghost');
      c2.vline(yf, 'curve yf', 'Yf');
      c2.line(a, -2, 'curve demand', st.M !== 100 ? 'AD₁' : 'AD', 'end');
      c2.line(0, 2, 'curve supply', 'AS', 'end');
      c2.guides(Yv, Pl, trim(Yv, 1), trim(Pl, 0));
      c2.dot(Yv, Pl, 'eq');
      if (st.M !== 100) c2.arrow(aBase / 4, aBase / 2, Yv, Pl);
      const sit = Math.abs(gap) < 0.5 ? ['At full employment', 'k-good'] : gap < 0 ? ['Recessionary situation', 'k-warn'] : ['Inflationary situation', 'k-hot'];
      readout(dl, [['Money supply', '$' + trim(st.M, 0) + 'b'], ['Interest rate', trim(r, 1) + '%'], ['Output (Ye)', trim(Yv, 1)], ['Full employment (Yf)', '50'], ['Situation', sit[0], 'k-wide ' + sit[1]]]);
      let txt = '';
      if (st.tool != null) {
        const t = MONEY_TOOLS[st.tool], up = t.d > 0;
        txt = `${t.label}: ${t.why} Money supply ${up ? '↑ (SM shifts right)' : '↓ (SM shifts left)'} → interest rate ${up ? 'falls' : 'rises'} to ${trim(r, 1)}% → borrowing is ${up ? 'cheaper' : 'dearer'}, so C and I ${up ? 'rise' : 'fall'} → AD ${up ? 'shifts right' : 'shifts left'} → output ${up ? 'rises' : 'falls'} by a multiple. `;
        if (st.M === 160 || st.M === 40) txt += 'That’s as far as this model goes. ';
      }
      txt += Math.abs(gap) < 0.5 ? 'Output is at full employment.' : gap < 0 ? `Output is ${trim(-gap, 1)} below Yf: an expansionary policy (more money, lower interest rates) would help.` : `Output is ${trim(gap, 1)} above Yf: a contractionary policy (less money, higher interest rates) would cool the economy.`;
      note.textContent = txt;
    }
    host.appendChild(f.fig);
    autosize2(c1, top, c2, bot, draw);
  }

  /* ---------- registry ---------- */
  const REGISTRY = {
    market, ppf, advantage, adas, shifter, schedule, production, costs, lrac, structures,
    profitmax, stall, labour, gdp, cycle, multiplier, credit, moneymarket, fiscal: fiscalCalc,
    elasticity: (node, preset) => preset === 'module' ? elasticityModule(node) : elasticity(node),
    inflation: (node, preset) => preset === 'basket' ? basket(node) : inflation(node)
  };

  window.ECON = window.ECON || {};
  ECON.widgets = {
    mountAll(root) {
      root.querySelectorAll('[data-widget]').forEach(node => {
        const fn = REGISTRY[node.dataset.widget];
        if (node.dataset.mounted) return;
        if (!fn) {
          console.warn('Unknown widget:', node.dataset.widget);
          node.dataset.mounted = '1';
          node.textContent = 'This interactive is missing. Try reloading the page.';
          return;
        }
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
