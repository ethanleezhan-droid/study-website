/* More visual explainers: small graphs of the key diagrams in the notes, plus pictures for
   the sections that had none. Each list is added after the diagrams in visuals.js. Graph
   coordinates run from 0 to 100 on both axes. */
(function () {
  const V = ECON.visualData = ECON.visualData || {};
  const add = (id, list) => { V[id] = (V[id] || []).concat(list); };
  /* Straight curves used again and again: demand y = a − x, supply y = x + b. */
  const D = (a, from, to) => [[from, a - from], [to, a - to]];
  const S = (b, from, to) => [[from, from + b], [to, to + b]];
  const curve = (f, a, b, n) => { const out = []; n = n || 40; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; out.push([x, f(x)]); } return out; };
  const arc = r => curve(x => Math.sqrt(Math.max(0, r * r - x * x)), 0, r, 48);
  const AD_AS = { x: 'Real GDP (output)', y: 'Price level' };

  add('m-basic', [
    { at: 7, type: 'cards', title: 'When we draw a PPC, we assume…', cols: 4, items: [
      { i: '📦', t: 'Fixed resources', d: 'The amount of land, labour, capital and enterprise doesn’t change' },
      { i: '✅', t: 'Full employment', d: 'All resources are being used' },
      { i: '⚙️', t: 'Fixed technology', d: 'No new ways of producing' },
      { i: '2️⃣', t: 'Only two goods', d: 'Here laptops and pizzas, standing for any pair' }] },
    { at: 8, type: 'graph', title: 'Reading the PPC', panels: [
      { cap: 'Inside, on and outside the curve', x: 'Pizzas', y: 'Laptops', lines: [{ p: arc(82), c: 'accent', l: 'PPC', lo: [-4, -8] }],
        dots: [{ at: [32, 32], l: 'A: inefficient', o: [6, 4], c: 'gold' }, { at: [58, 58], l: 'B: efficient', o: [6, -6], c: 'good' }, { at: [80, 72], l: 'C: unattainable', o: [-6, -8], c: 'bad', hollow: true }],
        sub: 'A wastes resources, B uses them all, C needs more resources or better technology.' },
      { cap: 'Moving along the curve', x: 'Pizzas', y: 'Laptops', lines: [{ p: arc(82), c: 'accent', l: 'PPC', lo: [-4, -8] }],
        dots: [{ at: [25, 78], l: 'X' }, { at: [58, 58], l: 'Y' }], arrows: [{ from: [28, 77], to: [55, 60.5] }],
        sub: 'More pizzas means giving up some laptops: that’s the opportunity cost.' }] },
    { at: 9, type: 'flow', title: 'Why the curve bows outward', steps: [
      { i: '🍕', t: 'Make more pizzas' }, { i: '👩‍🍳', t: 'First use cooks and ovens', d: 'the resources best at pizzas' },
      { i: '👨‍💻', t: 'Then engineers and chip factories', d: 'resources poor at pizzas' }, { i: '📈', t: 'Each pizza costs more laptops', d: 'increasing opportunity cost', tone: 'bad' }] },
    { at: 10, type: 'graph', title: 'Shifting the PPC', panels: [
      { cap: 'Economic growth: the PPC shifts out', x: 'Pizzas', y: 'Laptops',
        lines: [{ p: arc(62), c: 'accent', ghost: true, l: 'PPC', lo: [-2, -6] }, { p: arc(88), c: 'accent', l: 'PPC₁', lo: [-2, -6] }],
        arrows: [{ from: [46, 46], to: [60, 60] }],
        sub: 'More resources or better technology let the economy produce more of both goods.' }] }
  ]);

  add('m-demand', [
    { at: 2, type: 'graph', title: 'A demand curve slopes downward', panels: [
      { cap: 'The law of demand on a graph', lines: [{ p: D(100, 10, 90), c: 'demand', l: 'D' }],
        dots: [{ at: [30, 70], l: 'High price, small quantity', o: [7, -4] }, { at: [70, 30], l: 'Low price, large quantity', o: [7, -6] }],
        guides: [{ at: [30, 70], xl: 'Q₁', yl: 'P₁' }, { at: [70, 30], xl: 'Q₂', yl: 'P₂' }] }] },
    { at: 3, type: 'graph', title: 'See the difference on the graph', panels: [
      { cap: 'Price changes: move along D', lines: [{ p: D(100, 10, 90), c: 'demand', l: 'D' }],
        dots: [{ at: [30, 70], l: 'A' }, { at: [70, 30], l: 'B' }], arrows: [{ from: [33, 63], to: [64, 32] }],
        sub: 'Price falls: quantity demanded rises from A to B.' },
      { cap: 'Demand increases: shift right', lines: [{ p: D(100, 10, 90), c: 'demand', ghost: true, dash: true, l: 'D' }, { p: D(120, 30, 100), c: 'demand', l: 'D₁' }],
        arrows: [{ from: [45, 55], to: [62, 55] }], sub: 'More is demanded at every price.' },
      { cap: 'Demand decreases: shift left', lines: [{ p: D(100, 10, 90), c: 'demand', ghost: true, dash: true, l: 'D' }, { p: D(80, 10, 70), c: 'demand', l: 'D₂' }],
        arrows: [{ from: [55, 45], to: [38, 45] }], sub: 'Less is demanded at every price.' }] }
  ]);

  add('m-supply', [
    { at: 2, type: 'graph', title: 'See the difference on the graph', panels: [
      { cap: 'Price changes: move along S', lines: [{ p: S(0, 10, 90), c: 'supply', l: 'S' }],
        dots: [{ at: [30, 30], l: 'A', o: [6, 10] }, { at: [70, 70], l: 'B', o: [6, 10] }], arrows: [{ from: [33, 37], to: [64, 68] }],
        sub: 'Price rises: quantity supplied rises from A to B.' },
      { cap: 'Supply increases: shift right', lines: [{ p: S(0, 10, 90), c: 'supply', ghost: true, dash: true, l: 'S' }, { p: S(-20, 30, 100), c: 'supply', l: 'S₁' }],
        arrows: [{ from: [50, 50], to: [67, 50] }], sub: 'More is supplied at every price.' },
      { cap: 'Supply decreases: shift left', lines: [{ p: S(0, 10, 90), c: 'supply', ghost: true, dash: true, l: 'S' }, { p: S(20, 10, 75), c: 'supply', l: 'S₂' }],
        arrows: [{ from: [50, 50], to: [33, 50] }], sub: 'Less is supplied at every price.' }] }
  ]);

  const market = extra => Object.assign({ lines: [{ p: D(100, 10, 90), c: 'demand', l: 'D' }, { p: S(0, 10, 90), c: 'supply', l: 'S' }] }, extra);
  add('m-equilibrium', [
    { at: 0, type: 'graph', title: 'Equilibrium on the graph', panels: [
      market({ cap: 'Where demand meets supply', dots: [{ at: [50, 50], l: 'E', c: 'ink' }], guides: [{ at: [50, 50], xl: 'Q*', yl: 'P*' }],
        sub: 'At P*, the quantity buyers want equals the quantity sellers offer.' })] },
    { at: 1, type: 'graph', title: 'Surplus and shortage on the graph', panels: [
      market({ cap: 'Price above P*: surplus', hlines: [{ y: 70, c: 'gold', dash: true, l: 'P > P*' }], dots: [{ at: [30, 70] }, { at: [70, 70] }],
        brackets: [{ y: 70, x1: 30, x2: 70, l: 'Surplus', c: 'supply', below: false }],
        sub: 'Qs > Qd, so sellers cut the price.' }),
      market({ cap: 'Price below P*: shortage', hlines: [{ y: 30, c: 'gold', dash: true, l: 'P < P*', lo: [0, 14] }], dots: [{ at: [30, 30] }, { at: [70, 30] }],
        brackets: [{ y: 30, x1: 30, x2: 70, l: 'Shortage', c: 'demand' }],
        sub: 'Qd > Qs, so the price is pushed up.' })] },
    { at: 4, type: 'graph', title: 'Ceilings and floors on the graph', panels: [
      market({ cap: 'Price ceiling below P*', hlines: [{ y: 30, c: 'bad', l: 'Ceiling', lo: [0, 14] }], dots: [{ at: [30, 30] }, { at: [70, 30] }],
        brackets: [{ y: 30, x1: 30, x2: 70, l: 'Shortage', c: 'demand' }], sub: 'The price can’t rise to clear the market.' }),
      market({ cap: 'Price floor above P*', hlines: [{ y: 70, c: 'bad', l: 'Floor' }], dots: [{ at: [30, 70] }, { at: [70, 70] }],
        brackets: [{ y: 70, x1: 30, x2: 70, l: 'Surplus', c: 'supply', below: false }], sub: 'The price can’t fall to clear the market.' })] },
    { at: 8, type: 'graph', title: 'Demand shifts: follow the equilibrium', panels: [
      { cap: 'Demand increases', lines: [{ p: D(100, 10, 90), c: 'demand', ghost: true, dash: true, l: 'D' }, { p: D(120, 30, 100), c: 'demand', l: 'D₁' }, { p: S(0, 10, 90), c: 'supply', l: 'S' }],
        dots: [{ at: [50, 50], l: 'E', o: [-8, -4], c: 'ink' }, { at: [60, 60], l: 'E₁', o: [-10, -6], c: 'ink' }], guides: [{ at: [50, 50], xl: 'Q', yl: 'P' }, { at: [60, 60], xl: 'Q₁', yl: 'P₁' }],
        sub: 'Price ↑ and quantity ↑.' },
      { cap: 'Demand decreases', lines: [{ p: D(100, 10, 90), c: 'demand', ghost: true, dash: true, l: 'D' }, { p: D(80, 10, 70), c: 'demand', l: 'D₂' }, { p: S(0, 10, 90), c: 'supply', l: 'S' }],
        dots: [{ at: [50, 50], l: 'E', c: 'ink' }, { at: [40, 40], l: 'E₂', o: [-10, -6], c: 'ink' }], guides: [{ at: [50, 50], xl: 'Q', yl: 'P' }, { at: [40, 40], xl: 'Q₂', yl: 'P₂' }],
        sub: 'Price ↓ and quantity ↓.' }] },
    { at: 9, type: 'graph', title: 'Supply shifts: follow the equilibrium', panels: [
      { cap: 'Supply increases', lines: [{ p: D(100, 10, 90), c: 'demand', l: 'D' }, { p: S(0, 10, 90), c: 'supply', ghost: true, dash: true, l: 'S' }, { p: S(-20, 30, 100), c: 'supply', l: 'S₁' }],
        dots: [{ at: [50, 50], l: 'E', o: [-10, -4], c: 'ink' }, { at: [60, 40], l: 'E₁', o: [6, 10], c: 'ink' }], guides: [{ at: [50, 50], xl: 'Q', yl: 'P' }, { at: [60, 40], xl: 'Q₁', yl: 'P₁' }],
        sub: 'Price ↓ and quantity ↑.' },
      { cap: 'Supply decreases', lines: [{ p: D(100, 10, 90), c: 'demand', l: 'D' }, { p: S(0, 10, 90), c: 'supply', ghost: true, dash: true, l: 'S' }, { p: S(20, 10, 75), c: 'supply', l: 'S₂' }],
        dots: [{ at: [50, 50], l: 'E', o: [6, 10], c: 'ink' }, { at: [40, 60], l: 'E₂', o: [-10, -6], c: 'ink' }], guides: [{ at: [50, 50], xl: 'Q', yl: 'P' }, { at: [40, 60], xl: 'Q₂', yl: 'P₂' }],
        sub: 'Price ↑ and quantity ↓.' }] }
  ]);

  add('m-elasticity', [
    { at: 3, type: 'graph', title: 'What each kind of demand curve looks like', cols: 4, panels: [
      { cap: 'Perfectly inelastic', vlines: [{ x: 50, c: 'demand', l: 'D' }], sub: 'PED = 0' },
      { cap: 'Inelastic', lines: [{ p: [[38, 95], [62, 5]], c: 'demand', l: 'D' }], sub: 'PED < 1: steep' },
      { cap: 'Elastic', lines: [{ p: [[5, 64], [95, 36]], c: 'demand', l: 'D' }], sub: 'PED > 1: flat' },
      { cap: 'Perfectly elastic', hlines: [{ y: 50, c: 'demand', l: 'D' }], sub: 'PED = ∞' }] },
    { at: 4, type: 'graph', title: 'Total revenue is the rectangle under the price', panels: [
      { cap: 'TR = P × Q', lines: [{ p: D(100, 10, 90), c: 'demand', l: 'D' }], areas: [{ p: [[0, 0], [40, 0], [40, 60], [0, 60]], c: 'gold', l: 'TR', at: [20, 28] }],
        dots: [{ at: [40, 60] }], guides: [{ at: [40, 60], xl: 'Q', yl: 'P' }],
        sub: 'Raise the price and the rectangle gets taller but narrower. Whether TR rises depends on elasticity.' }] }
  ]);

  const AP = x => 60 * Math.exp(-Math.pow((x - 45) / 45, 2));
  const MP = x => AP(x) * (1 - 2 * x * (x - 45) / 2025);
  add('m-costs', [
    { at: 3, type: 'graph', title: 'How MP pulls AP up and down', panels: [
      { cap: 'Marginal and average product', x: 'Workers (variable input)', y: 'Output per worker',
        lines: [{ p: curve(MP, 3, 61), c: 'supply', l: 'MP', lp: 'start', lo: [-4, -4] }, { p: curve(AP, 3, 97), c: 'demand', l: 'AP' }],
        dots: [{ at: [45, AP(45)], l: 'MP = AP at AP’s highest', o: [7, -8], c: 'ink' }],
        sub: 'While MP is above AP, AP rises. Once MP is below AP, AP falls.' }] }
  ]);

  add('m-structures', [
    { at: 2, type: 'compare', title: 'Barriers to entry keep new firms out', vs: '', sides: [
      { i: '📜', h: 'Legal barriers', tone: 'demand', rows: ['Government licensing', 'Franchises, e.g. Subway', 'Patents, e.g. Apple’s iPhone design'] },
      { i: '⛰️', h: 'Natural barriers', tone: 'gold', rows: ['Control of an essential input', 'Economies of scale: one big firm is cheapest (a natural monopoly)'] }] },
    { at: 6, type: 'graph', title: 'Why a perfectly competitive firm is a price taker', panels: [
      market({ cap: 'The market sets the price', dots: [{ at: [50, 50], c: 'ink' }], guides: [{ at: [50, 50], yl: 'P*' }], x: 'Market quantity' }),
      { cap: 'Each firm sells at that price', x: 'Firm’s output', hlines: [{ y: 50, c: 'demand', l: 'D = AR = MR' }], guides: [{ at: [0.01, 50], yl: 'P*' }],
        sub: 'Its demand curve is horizontal: it can sell all it wants at P*, and nothing above it.' }] },
    { at: 8, type: 'graph', title: 'The monopolist’s demand curve', panels: [
      { cap: 'The firm is the whole market', lines: [{ p: D(100, 10, 90), c: 'demand', l: 'D (market demand)', lo: [-6, -6] }],
        dots: [{ at: [35, 65], l: 'Higher price, sells less', o: [7, -4] }, { at: [65, 35], l: 'Lower price, sells more', o: [7, -4] }],
        sub: 'It slopes downward, so the monopolist is a price maker: to sell more it must lower its price.' }] },
    { at: 12, type: 'graph', title: 'The kinked demand curve', panels: [
      { cap: 'Oligopoly: rivals react', lines: [{ p: [[8, 78], [45, 62]], c: 'demand' }, { p: [[45, 62], [58, 6]], c: 'demand', l: 'D' }],
        dots: [{ at: [45, 62], l: 'Current price', o: [7, -8], c: 'ink' }], guides: [{ at: [45, 62] }],
        texts: [{ at: [55, 96], t: 'Price rise: rivals ignore it' }, { at: [55, 88], t: 'so demand is very elastic', c: 'demand' }, { at: [80, 42], t: 'Price cut: rivals match it' }, { at: [80, 34], t: 'so very inelastic', c: 'demand' }],
        sub: 'Changing price loses out either way, so oligopoly prices tend to stay stable.' }] }
  ]);

  /* Same costs as the Topic 8 interactive (TFC 60, output 0–20, $0–30), scaled to the grid. */
  const AVCf = q => 12 - 1.2 * q + 0.06 * q * q, ATCf = q => AVCf(q) + 60 / q, MCf = q => 12 - 2.4 * q + 0.18 * q * q;
  const qAt = P => (2.4 + Math.sqrt(5.76 - 0.72 * (12 - P))) / 0.36;
  const sx = q => q * 5, sy = v => v / 30 * 100;
  const costLines = withAvc => [
    { p: curve(q => sy(ATCf(q / 5)), 13, 100), c: 'demand', l: 'ATC' },
    { p: curve(q => sy(MCf(q / 5)), 3, 96), c: 'supply', l: 'MC' }
  ].concat(withAvc ? [{ p: curve(q => sy(AVCf(q / 5)), 3, 100), c: 'accent', l: 'AVC', lo: [4, 10] }] : []);
  const rect = P => { const q = qAt(P), a = ATCf(q); return { q: sx(q), p: sy(P), a: sy(a) }; };
  const r1 = rect(20), r2 = rect(9);
  add('m-profit', [
    { at: 3, type: 'graph', title: 'Profit and loss as rectangles', panels: [
      { cap: 'P above ATC: economic profit', x: 'Output', y: 'Cost and revenue per unit', hlines: [{ y: r1.p, c: 'demand', l: 'P = MR' }], lines: costLines(false),
        areas: [{ p: [[0, r1.p], [r1.q, r1.p], [r1.q, r1.a], [0, r1.a]], c: 'good', l: 'Profit', at: [r1.q / 2, (r1.p + r1.a) / 2 - 2] }],
        dots: [{ at: [r1.q, r1.p], c: 'ink' }], guides: [{ at: [r1.q, r1.p], xl: 'MR = MC' }],
        sub: 'At the MR = MC output, (P − ATC) × output is the profit.' },
      { cap: 'P below ATC: a loss', x: 'Output', y: 'Cost and revenue per unit', hlines: [{ y: r2.p, c: 'demand', l: 'P = MR', lo: [0, 14] }], lines: costLines(true),
        areas: [{ p: [[0, r2.a], [r2.q, r2.a], [r2.q, r2.p], [0, r2.p]], c: 'bad' }],
        dots: [{ at: [r2.q, r2.p], c: 'ink' }], guides: [{ at: [r2.q, r2.p], xl: 'MR = MC' }], texts: [{ at: [r2.q / 2, r2.a + 6], t: 'Loss', c: 'bad' }],
        sub: 'ATC is above P, but P is still above AVC, so producing loses less than shutting down.' }] }
  ]);

  add('m-unemployment', [
    { at: 4, type: 'cards', title: 'Why the official rate can understate the problem', cols: 2, items: [
      { i: '⬇️', t: 'Underemployment', d: 'Working below capacity: a job far below your training, or part time when you want full time', tone: 'gold' },
      { i: '😞', t: 'Discouraged workers', d: 'Gave up looking, so they leave the labour force and aren’t counted', tone: 'bad' }] },
    { at: 7, type: 'graph', title: 'The two causes of inflation on the AD-AS diagram', panels: [
      Object.assign({ cap: 'Demand-pull: AD shifts right', lines: [{ p: D(100, 10, 90), c: 'demand', ghost: true, dash: true, l: 'AD' }, { p: D(120, 30, 100), c: 'demand', l: 'AD₁' }, { p: S(0, 10, 90), c: 'supply', l: 'AS' }],
        dots: [{ at: [50, 50], c: 'ink' }, { at: [60, 60], c: 'ink' }], guides: [{ at: [50, 50], xl: 'Y', yl: 'P' }, { at: [60, 60], xl: 'Y₁', yl: 'P₁' }], sub: 'Price level ↑ and output ↑.' }, AD_AS),
      Object.assign({ cap: 'Cost-push: AS shifts left', lines: [{ p: D(100, 10, 90), c: 'demand', l: 'AD' }, { p: S(0, 10, 90), c: 'supply', ghost: true, dash: true, l: 'AS' }, { p: S(20, 10, 75), c: 'supply', l: 'AS₁' }],
        dots: [{ at: [50, 50], c: 'ink' }, { at: [40, 60], c: 'ink' }], guides: [{ at: [50, 50], xl: 'Y', yl: 'P' }, { at: [40, 60], xl: 'Y₁', yl: 'P₁' }], sub: 'Price level ↑ but output ↓.' }, AD_AS)] },
    { at: 10, type: 'cards', title: 'Why the CPI isn’t a perfect measure', cols: 3, items: [
      { i: '🔄', t: 'Ignores substitution', d: 'People switch to goods that got relatively cheaper', tag: 'overstates inflation' },
      { i: '✨', t: 'Ignores quality', d: 'A dearer computer may also be a better one', tag: 'overstates inflation' },
      { i: '🧺', t: 'Not fully representative', d: 'Your own basket may differ from the typical one', tag: 'could go either way' }] }
  ]);

  add('m-gdp', [
    { at: 8, type: 'cards', title: 'Three ways to measure GDP, one answer', cols: 3, items: [
      { i: '🏭', t: 'Output approach', d: 'Add the value added by each industry' },
      { i: '👛', t: 'Income approach', d: 'Add wages, rent, interest and profit' },
      { i: '🛒', t: 'Expenditure approach', d: 'Add C + I + G + (X − M). The focus of this module', tone: 'gold' }],
      note: 'They give the same total, because whatever is spent is received as someone’s income.' },
    { at: 9, type: 'cards', title: 'Why GDP isn’t a measure of quality of life', cols: 4, items: [
      { i: '🕵️', t: 'Incomplete', d: 'Illegal and non-marketed activities are left out' },
      { i: '🏖️', t: 'Ignores leisure', d: 'Working longer hours raises GDP' },
      { i: '🏭', t: 'Ignores costs of growth', d: 'Such as pollution' },
      { i: '🍛', t: 'Ignores quality', d: 'A smaller portion at the same price' },
      { i: '⚖️', t: 'Ignores distribution', d: 'Gains may go to a few people' },
      { i: '🏷️', t: 'Current prices', d: 'A rise could just be inflation: use real GDP' },
      { i: '👨‍👩‍👧', t: 'Ignores population', d: 'Use per capita GDP' }] },
    { at: 12, type: 'graph', title: 'Two ways into a recession', panels: [
      Object.assign({ cap: 'AD falls', lines: [{ p: D(100, 10, 90), c: 'demand', ghost: true, dash: true, l: 'AD' }, { p: D(80, 10, 70), c: 'demand', l: 'AD₁' }, { p: S(0, 10, 90), c: 'supply', l: 'AS' }],
        dots: [{ at: [50, 50], c: 'ink' }, { at: [40, 40], c: 'ink' }], guides: [{ at: [50, 50], xl: 'Y', yl: 'P' }, { at: [40, 40], xl: 'Y₁', yl: 'P₁' }], sub: 'Output ↓ and the price level ↓.' }, AD_AS),
      Object.assign({ cap: 'AS falls (costs rise)', lines: [{ p: D(100, 10, 90), c: 'demand', l: 'AD' }, { p: S(0, 10, 90), c: 'supply', ghost: true, dash: true, l: 'AS' }, { p: S(20, 10, 75), c: 'supply', l: 'AS₁' }],
        dots: [{ at: [50, 50], c: 'ink' }, { at: [40, 60], c: 'ink' }], guides: [{ at: [50, 50], xl: 'Y', yl: 'P' }, { at: [40, 60], xl: 'Y₁', yl: 'P₁' }], sub: 'Output ↓ but the price level ↑: stagflation.' }, AD_AS)] }
  ]);

  add('m-adas', [
    { at: 0, type: 'graph', title: 'Recessionary and inflationary situations on the graph', panels: [
      Object.assign({ cap: 'Ye < Yf: recessionary', lines: [{ p: D(90, 10, 85), c: 'demand', l: 'AD' }, { p: S(0, 10, 90), c: 'supply', l: 'AS' }], vlines: [{ x: 62, c: 'ink', dash: true, l: 'Yf' }],
        dots: [{ at: [45, 45], c: 'ink' }], guides: [{ at: [45, 45], xl: 'Ye' }], brackets: [{ y: 80, x1: 45, x2: 62, l: 'unemployment', c: 'demand', below: false }], sub: 'Output falls short of full employment.' }, AD_AS),
      Object.assign({ cap: 'Ye > Yf: inflationary', lines: [{ p: D(130, 40, 100), c: 'demand', l: 'AD' }, { p: S(0, 10, 90), c: 'supply', l: 'AS' }], vlines: [{ x: 48, c: 'ink', dash: true, l: 'Yf' }],
        dots: [{ at: [65, 65], c: 'ink' }], guides: [{ at: [65, 65], xl: 'Ye' }], brackets: [{ y: 15, x1: 48, x2: 65, l: 'pressure on prices', c: 'bad', below: false }], sub: 'Spending pushes past full employment and prices rise.' }, AD_AS)] }
  ]);

  add('m-fiscal', [
    { at: 5, type: 'graph', panels: [
      Object.assign({ cap: 'Expansionary: AD shifts right to Yf', lines: [{ p: D(90, 10, 85), c: 'demand', ghost: true, dash: true, l: 'AD' }, { p: D(112, 22, 100), c: 'demand', l: 'AD₁' }, { p: S(0, 10, 90), c: 'supply', l: 'AS' }],
        vlines: [{ x: 56, c: 'ink', dash: true, l: 'Yf' }], dots: [{ at: [45, 45], c: 'ink' }, { at: [56, 56], c: 'ink' }], arrows: [{ from: [36, 54], to: [48, 64] }], guides: [{ at: [45, 45], xl: 'Ye' }],
        sub: 'G ↑ or T ↓ closes the recessionary gap.' }, AD_AS)] },
    { at: 6, type: 'graph', panels: [
      Object.assign({ cap: 'Contractionary: AD shifts left to Yf', lines: [{ p: D(122, 32, 100), c: 'demand', ghost: true, dash: true, l: 'AD' }, { p: D(100, 10, 90), c: 'demand', l: 'AD₁' }, { p: S(0, 10, 90), c: 'supply', l: 'AS' }],
        vlines: [{ x: 50, c: 'ink', dash: true, l: 'Yf' }], dots: [{ at: [61, 61], c: 'ink' }, { at: [50, 50], c: 'ink' }], arrows: [{ from: [60, 70], to: [48, 60] }], guides: [{ at: [61, 61], xl: 'Ye' }],
        sub: 'G ↓ or T ↑ cools an inflationary situation.' }, AD_AS)] },
    { at: 9, type: 'cards', title: 'Why fiscal policy is hard to get right', cols: 4, items: [
      { i: '⏳', t: 'Timing problems', d: 'Recognition, administrative and operational lags: by the time it works, conditions may have changed' },
      { i: '🗳️', t: 'Political considerations', d: 'Spending more and taxing less is popular, so policy leans expansionary' },
      { i: '🏦', t: 'Crowding out', d: 'Government borrowing pushes up interest rates, cutting I and C' },
      { i: '🔥', t: 'Inflation', d: 'Raising AD and output may lead to inflation' }] }
  ]);

  add('m-monetary', [
    { at: 3, type: 'equation', title: 'Two kinds of bank reserves', parts: [
      { v: 'Total reserves', tone: 'gold' }, '=', { v: 'Required reserves', l: 'RRR × deposits: must be kept', tone: 'demand' }, '+', { v: 'Excess reserves', l: 'can be lent out, earning interest', tone: 'good' }] },
    { at: 11, type: 'graph', title: 'The money market', panels: [
      { cap: 'Demand and supply of money set the interest rate', x: 'Quantity of money', y: 'Interest rate', lines: [{ p: D(100, 10, 90), c: 'demand', l: 'Dm' }], vlines: [{ x: 50, c: 'supply', l: 'Sm' }],
        dots: [{ at: [50, 50], c: 'ink' }], guides: [{ at: [50, 50], yl: 'r*' }],
        sub: 'Sm is vertical: the central bank sets it, whatever the interest rate.' }] },
    { at: 13, type: 'graph', title: 'Changing the money supply moves the interest rate', panels: [
      { cap: 'Expansionary: Sm shifts right', x: 'Quantity of money', y: 'Interest rate', lines: [{ p: D(100, 10, 90), c: 'demand', l: 'Dm' }],
        vlines: [{ x: 45, c: 'supply', dash: true, l: 'Sm' }, { x: 65, c: 'supply', l: 'Sm₁' }], dots: [{ at: [45, 55], c: 'ink' }, { at: [65, 35], c: 'ink' }],
        guides: [{ at: [45, 55], yl: 'r' }, { at: [65, 35], yl: 'r₁' }], arrows: [{ from: [47, 80], to: [62, 80] }], sub: 'Interest rate ↓ → C and I ↑ → AD ↑.' },
      { cap: 'Contractionary: Sm shifts left', x: 'Quantity of money', y: 'Interest rate', lines: [{ p: D(100, 10, 90), c: 'demand', l: 'Dm' }],
        vlines: [{ x: 55, c: 'supply', dash: true, l: 'Sm' }, { x: 35, c: 'supply', l: 'Sm₁' }], dots: [{ at: [55, 45], c: 'ink' }, { at: [35, 65], c: 'ink' }],
        guides: [{ at: [55, 45], yl: 'r' }, { at: [35, 65], yl: 'r₁' }], arrows: [{ from: [53, 85], to: [38, 85] }], sub: 'Interest rate ↑ → C and I ↓ → AD ↓.' }] }
  ]);
})();
