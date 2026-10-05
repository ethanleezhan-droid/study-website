/* Visual explainers: small diagrams placed inside the lessons so the key ideas can be
   seen at a glance. Each one is plain data (js/content/visuals.js) turned into HTML here.
   Types: flow, cards, compare, scale, equation, decide, tree. */
(function () {
  'use strict';
  const esc = str => String(str).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  /* Text may carry <sub>/<sup>/<strong>/<em> only. */
  const rich = str => esc(str).replace(/&lt;(\/?)(sub|sup|strong|em)&gt;/g, '<$1$2>');
  const tone = t => (t ? ' t-' + t : '');

  const R = {
    flow(v) {
      return `<ol class="vf${v.vertical ? ' vf-v' : ''}">${v.steps.map((s, i) => `
        <li class="vf-step${tone(s.tone)}">
          ${s.i ? `<span class="v-ico" aria-hidden="true">${s.i}</span>` : ''}
          <span class="vf-t">${rich(s.t)}${s.s ? ` <span class="vf-s">${rich(s.s)}</span>` : ''}</span>
          ${s.d ? `<span class="vf-d">${rich(s.d)}</span>` : ''}
        </li>${i < v.steps.length - 1 ? '<li class="vf-arrow" aria-hidden="true"></li>' : ''}`).join('')}
        ${v.loop ? `<li class="vf-loop" aria-hidden="false">↺ ${rich(v.loop)}</li>` : ''}</ol>`;
    },
    cards(v) {
      return `<ul class="vc" style="--cols:${v.cols || Math.min(v.items.length, 4)}">${v.items.map(c => `
        <li class="vc-card${tone(c.tone)}">
          ${c.i ? `<span class="v-ico" aria-hidden="true">${c.i}</span>` : ''}
          <span class="vc-t">${rich(c.t)}</span>
          ${c.d ? `<span class="vc-d">${rich(c.d)}</span>` : ''}
          ${c.tag ? `<span class="vc-tag">${rich(c.tag)}</span>` : ''}
        </li>`).join('')}</ul>`;
    },
    compare(v) {
      return `<div class="vcmp">${v.sides.map((s, i) => `
        ${i ? `<div class="vcmp-vs" aria-hidden="true">${esc(v.vs || 'vs')}</div>` : ''}
        <div class="vcmp-side${tone(s.tone)}">
          <p class="vcmp-h">${s.i ? `<span class="v-ico" aria-hidden="true">${s.i}</span>` : ''}${rich(s.h)}</p>
          <ul>${s.rows.map(r => `<li>${rich(r)}</li>`).join('')}</ul>
        </div>`).join('')}</div>`;
    },
    scale(v) {
      return `<div class="vs">
        ${v.ends ? `<div class="vs-ends"><span>${rich(v.ends[0])}</span><span>${rich(v.ends[1])}</span></div>` : ''}
        <ol class="vs-bar" style="--n:${v.zones.length}">${v.zones.map(z => `
          <li class="vs-zone${tone(z.tone)}">
            ${z.v ? `<span class="vs-v">${rich(z.v)}</span>` : ''}
            <span class="vs-t">${rich(z.t)}</span>
            ${z.d ? `<span class="vs-d">${rich(z.d)}</span>` : ''}
          </li>`).join('')}</ol></div>`;
    },
    equation(v) {
      return `<div class="ve">${v.parts.map(p => typeof p === 'string'
        ? `<span class="ve-op" aria-hidden="false">${rich(p)}</span>`
        : `<span class="ve-term${tone(p.tone)}"><span class="ve-v">${rich(p.v)}</span>${p.l ? `<span class="ve-l">${rich(p.l)}</span>` : ''}</span>`).join('')}</div>`;
    },
    decide(v) {
      return `<ol class="vd">${v.steps.map(s => `
        <li class="vd-row">
          <span class="vd-q">${rich(s.q)}</span>
          <span class="vd-yes" aria-hidden="true">Yes →</span>
          <span class="vd-out${tone(s.tone)}">${rich(s.yes)}</span>
        </li>
        <li class="vd-no" aria-hidden="true">No ↓</li>`).join('')}
        <li class="vd-row vd-last"><span class="vd-out${tone(v.final.tone)}">${rich(v.final.t)}</span></li></ol>`;
    },
    tree(v) {
      const node = n => `<li><span class="vt-node${tone(n.tone)}">${rich(n.t)}${n.d ? `<span class="vt-d">${rich(n.d)}</span>` : ''}</span>${n.kids ? `<ul>${n.kids.map(node).join('')}</ul>` : ''}</li>`;
      return `<ul class="vt">${node(v.root)}</ul>`;
    }
  };

  /* Mini graphs: small, labelled economics diagrams on a 0–100 grid (no numbers on the
     axes, since they show the idea rather than data). One or more panels side by side. */
  const GW = 260, GH = 200, GL = 30, GR = 248, GT = 22, GB = 170;
  const gx = x => GL + x / 100 * (GR - GL), gy = y => GB - y / 100 * (GB - GT);
  const pts = p => p.map(([x, y]) => `${gx(x).toFixed(1)},${gy(y).toFixed(1)}`).join(' ');
  const t = (x, y, s, cls, anchor) => `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" class="${cls}" text-anchor="${anchor || 'middle'}">${rich(s)}</text>`;
  function arrowSvg(a, b, cls) {
    const x1 = gx(a[0]), y1 = gy(a[1]), x2 = gx(b[0]), y2 = gy(b[1]);
    const len = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / len, uy = (y2 - y1) / len, hl = 7, hw = 4;
    const ex = x2 - ux * 2, ey = y2 - uy * 2;
    return `<g class="g-arrow ${cls || ''}"><line x1="${x1}" y1="${y1}" x2="${ex - ux * 5}" y2="${ey - uy * 5}"/><polygon points="${ex},${ey} ${ex - ux * hl - uy * hw},${ey - uy * hl + ux * hw} ${ex - ux * hl + uy * hw},${ey - uy * hl - ux * hw}"/></g>`;
  }
  function panel(p) {
    let s = '';
    (p.areas || []).forEach(a => { s += `<polygon class="g-area g-${a.c || 'gold'}" points="${pts(a.p)}"/>`; if (a.l) s += t(gx(a.at[0]), gy(a.at[1]), a.l, 'g-area-l'); });
    s += `<line class="g-axis" x1="${GL}" y1="${GT - 6}" x2="${GL}" y2="${GB}"/><line class="g-axis" x1="${GL}" y1="${GB}" x2="${GR + 4}" y2="${GB}"/>`;
    s += t(GL - 4, GT - 10, p.y || 'Price', 'g-axl', 'start') + t(GR + 4, GB + 24, p.x || 'Quantity', 'g-axl', 'end');
    (p.guides || []).forEach(g => {
      const [x, y] = g.at;
      s += `<polyline class="g-guide" points="${gx(0)},${gy(y)} ${gx(x)},${gy(y)} ${gx(x)},${gy(0)}"/>`;
      if (g.yl) s += t(GL - 4, gy(y) + 4, g.yl, 'g-tick', 'end');
      if (g.xl) s += t(gx(x), GB + 12, g.xl, 'g-tick');
    });
    (p.hlines || []).forEach(h => { s += `<line class="g-line g-${h.c || 'ink'}${h.dash ? ' g-dash' : ''}" x1="${GL}" y1="${gy(h.y)}" x2="${GR}" y2="${gy(h.y)}"/>`; if (h.l) { const o = h.lo || [0, -5]; s += t(h.lp === 'start' ? GL + 4 + o[0] : GR + o[0], gy(h.y) + o[1], h.l, `g-lab g-${h.c || 'ink'}`, h.lp === 'start' ? 'start' : 'end'); } });
    (p.vlines || []).forEach(h => { s += `<line class="g-line g-${h.c || 'ink'}${h.dash ? ' g-dash' : ''}" x1="${gx(h.x)}" y1="${GT}" x2="${gx(h.x)}" y2="${GB}"/>`; if (h.l) s += t(gx(h.x) + 4, GT + 4, h.l, `g-lab g-${h.c || 'ink'}`, 'start'); });
    (p.lines || []).forEach(l => {
      if (l.p.length > 2) l = Object.assign({}, l, { p: l.p.filter(([, y]) => y >= -1 && y <= 101) });
      s += `<polyline class="g-line g-${l.c || 'ink'}${l.dash ? ' g-dash' : ''}${l.ghost ? ' g-ghost' : ''}" points="${pts(l.p)}"/>`;
      if (l.l) {
        const e = l.lp === 'start' ? l.p[0] : l.p[l.p.length - 1];
        const off = l.lo || [4, -5];
        s += t(gx(e[0]) + off[0], gy(e[1]) + off[1], l.l, `g-lab g-${l.c || 'ink'}${l.ghost ? ' g-ghost' : ''}`, off[0] < 0 ? 'end' : 'start');
      }
    });
    (p.brackets || []).forEach(b => {
      const y = gy(b.y) + (b.below === false ? -8 : 8);
      s += `<g class="g-brk g-${b.c || 'bad'}"><line x1="${gx(b.x1)}" y1="${y}" x2="${gx(b.x2)}" y2="${y}"/><line x1="${gx(b.x1)}" y1="${y - 4}" x2="${gx(b.x1)}" y2="${y + 4}"/><line x1="${gx(b.x2)}" y1="${y - 4}" x2="${gx(b.x2)}" y2="${y + 4}"/></g>`;
      s += t((gx(b.x1) + gx(b.x2)) / 2, y + (b.below === false ? -5 : 13), b.l, `g-brk-l g-${b.c || 'bad'}`);
    });
    (p.arrows || []).forEach(a => { s += arrowSvg(a.from, a.to, a.c ? 'g-' + a.c : ''); });
    (p.dots || []).forEach(d => {
      s += `<circle class="g-dot${d.c ? ' g-' + d.c : ''}${d.hollow ? ' g-hollow' : ''}" cx="${gx(d.at[0])}" cy="${gy(d.at[1])}" r="4"/>`;
      if (d.l) { const o = d.o || [6, -6]; s += t(gx(d.at[0]) + o[0], gy(d.at[1]) + o[1], d.l, 'g-dot-l', o[0] < 0 ? 'end' : 'start'); }
    });
    (p.texts || []).forEach(x => { s += t(gx(x.at[0]), gy(x.at[1]), x.t, 'g-note' + (x.c ? ' g-' + x.c : ''), x.a || 'middle'); });
    return `<div class="vg-panel">
      ${p.cap ? `<p class="vg-cap">${rich(p.cap)}</p>` : ''}
      <svg viewBox="0 0 ${GW} ${GH}" class="vg-svg" role="img" aria-label="${esc((p.cap || '') + (p.alt ? '. ' + p.alt : ''))}">${s}</svg>
      ${p.sub ? `<p class="vg-sub">${rich(p.sub)}</p>` : ''}
    </div>`;
  }
  R.graph = v => `<div class="vg" style="--cols:${v.cols || Math.min(v.panels.length, 3)}">${v.panels.map(panel).join('')}</div>`;

  function render(v) {
    const body = R[v.type] ? R[v.type](v) : '';
    if (!body) return '';
    return `<figure class="vis vis-${v.type}">
      ${v.title ? `<figcaption class="vis-cap"><span class="vis-kicker">${esc(v.kicker || (v.type === 'graph' ? 'On the graph' : 'In a picture'))}</span>${rich(v.title)}</figcaption>` : ''}
      ${body}
      ${v.note ? `<p class="vis-note">${rich(v.note)}</p>` : ''}
    </figure>`;
  }

  /* Put a lesson's visuals into its rendered text, each just after the given heading
     (and the paragraph that introduces it). Headings are counted the same way as the
     jump-to-source links, so adding visuals never moves them. */
  function place(prose, lessonId) {
    const list = (ECON.visualData || {})[lessonId];
    if (!list) return;
    const heads = [...prose.querySelectorAll(':scope > h2, :scope > h3')];
    list.forEach(v => {
      const h = heads[v.at];
      if (!h) { console.warn('Visual has no heading', lessonId, v.at); return; }
      let anchor = h;
      if (!v.right && anchor.nextElementSibling && anchor.nextElementSibling.tagName === 'P') anchor = anchor.nextElementSibling;
      /* several visuals after the same heading keep their order */
      while (anchor.nextElementSibling && anchor.nextElementSibling.classList.contains('vis') && anchor.nextElementSibling.dataset.at === String(v.at)) anchor = anchor.nextElementSibling;
      anchor.insertAdjacentHTML('afterend', render(v));
      anchor.nextElementSibling.dataset.at = String(v.at);
    });
  }

  window.ECON = window.ECON || {};
  ECON.visual = { render, place };
})();
