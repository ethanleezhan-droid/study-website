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

  function render(v) {
    const body = R[v.type] ? R[v.type](v) : '';
    if (!body) return '';
    return `<figure class="vis vis-${v.type}">
      ${v.title ? `<figcaption class="vis-cap"><span class="vis-kicker">${esc(v.kicker || 'In a picture')}</span>${rich(v.title)}</figcaption>` : ''}
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
