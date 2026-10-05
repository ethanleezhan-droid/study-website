/* Visual explainers for the module topics. `at` is the position of the heading in the
   lesson (0 = the first h2 or h3); the diagram goes just after that heading's first
   paragraph. Rendered by js/visuals.js. */
window.ECON = window.ECON || {};
ECON.visualData = {
  'm-basic': [
    { at: 1, type: 'flow', title: 'Why economics exists', steps: [
      { i: '🛍️', t: 'Unlimited wants' }, { i: '⚖️', t: 'Limited resources' }, { i: '⏳', t: 'Scarcity', tone: 'gold' },
      { i: '👉', t: 'We must choose' }, { i: '💸', t: 'Every choice has an opportunity cost', tone: 'bad' }] },
    { at: 1, type: 'cards', title: 'The four factors of production and what each earns', items: [
      { i: '🌾', t: 'Land', d: 'Natural resources', tag: 'earns rent' },
      { i: '👷', t: 'Labour', d: 'Human effort', tag: 'earns wages' },
      { i: '🏭', t: 'Capital', d: 'Man-made tools, machines, buildings', tag: 'earns interest' },
      { i: '💡', t: 'Entrepreneurship', d: 'Organises the rest and takes the risk', tag: 'earns profit' }] },
    { at: 2, type: 'cards', title: 'The three questions every economy must answer', items: [
      { i: '❓', t: 'What to produce?', d: 'Which goods and services, and how much of each' },
      { i: '🛠️', t: 'How to produce?', d: 'Which mix of resources and methods' },
      { i: '🙋', t: 'For whom to produce?', d: 'Who gets the output, depending on incomes' }] },
    { at: 6, type: 'compare', title: 'Opportunity cost is the next best thing you give up', vs: 'gives up', sides: [
      { i: '📚', h: 'You choose: study tonight', tone: 'good', rows: ['What you actually do'] },
      { i: '💵', h: 'Next best alternative: the $40 shift', tone: 'bad', rows: ['This is the opportunity cost', 'Only the single next best option counts, not everything you could have done'] }] },
    { at: 11, type: 'scale', title: 'Economic systems: who makes the decisions?', ends: ['Government decides', 'Markets decide'], zones: [
      { i: '', t: 'Command economy', d: 'The government answers the three questions', tone: 'demand' },
      { t: 'Mixed economy', d: 'Markets and government share the decisions', tone: 'gold' },
      { t: 'Market economy', d: 'Buyers and sellers answer them through prices', tone: 'supply' }] }
  ],
  'm-demand': [
    { at: 0, type: 'flow', title: 'The law of demand: price and quantity demanded move in opposite directions', steps: [
      { i: '🏷️', t: 'Price', s: '↑', tone: 'bad' }, { i: '🛒', t: 'Quantity demanded', s: '↓', tone: 'bad' }],
      note: 'And the other way: price ↓ → quantity demanded ↑. Ceteris paribus: everything else held constant.' },
    { at: 1, type: 'compare', title: 'Two reasons people buy less when the price rises', vs: '+', sides: [
      { i: '🔄', h: 'Substitution effect', tone: 'demand', rows: ['The good is now dearer than its substitutes', 'People switch to the substitutes', 'e.g. apples cost more, so you buy oranges'] },
      { i: '👛', h: 'Income effect', tone: 'gold', rows: ['The same budget now buys fewer units', 'Your real income (purchasing power) has fallen', 'So you buy less'] }] },
    { at: 3, type: 'compare', title: 'Movement along the curve, or a shift of the curve?', sides: [
      { i: '↕️', h: 'Change in quantity demanded', tone: 'demand', rows: ['Caused by a change in the good’s own price', 'A movement along the same demand curve', 'Price ↓ → move down the curve to a bigger quantity'] },
      { i: '↔️', h: 'Change in demand', tone: 'supply', rows: ['Caused by a non-price determinant', 'The whole curve shifts', 'Right = increase in demand, left = decrease'] }] },
    { at: 4, type: 'cards', title: 'The five non-price determinants of demand (each one shifts the curve)', cols: 5, items: [
      { i: '👥', t: 'Number of buyers', d: 'More buyers → demand ↑' },
      { i: '❤️', t: 'Tastes and preferences', d: 'More popular → demand ↑' },
      { i: '🔮', t: 'Expectations', d: 'Price expected to rise → buy now, demand ↑' },
      { i: '💰', t: 'Income', d: 'Normal good: income ↑ → demand ↑. Inferior good: income ↑ → demand ↓' },
      { i: '🔗', t: 'Prices of related goods', d: 'Substitute dearer → demand ↑. Complement dearer → demand ↓' }] }
  ],
  'm-supply': [
    { at: 0, type: 'flow', title: 'The law of supply: price and quantity supplied move in the same direction', steps: [
      { i: '🏷️', t: 'Price', s: '↑', tone: 'good' }, { i: '📦', t: 'Quantity supplied', s: '↑', tone: 'good' }],
      note: 'A higher price makes producing more worthwhile. Ceteris paribus.' },
    { at: 2, type: 'compare', title: 'Movement along the supply curve, or a shift?', sides: [
      { i: '↕️', h: 'Change in quantity supplied', tone: 'supply', rows: ['Caused by a change in the good’s own price', 'A movement along the same supply curve'] },
      { i: '↔️', h: 'Change in supply', tone: 'demand', rows: ['Caused by a non-price determinant', 'The whole curve shifts: right = increase, left = decrease'] }] },
    { at: 3, type: 'cards', title: 'The six non-price determinants of supply', cols: 3, items: [
      { i: '🏪', t: 'Number of sellers', d: 'More sellers → supply ↑' },
      { i: '⚙️', t: 'Technology', d: 'Better technology lowers costs → supply ↑' },
      { i: '🧱', t: 'Resource prices', d: 'Inputs dearer → costs ↑ → supply ↓' },
      { i: '🧾', t: 'Taxes and subsidies', d: 'Tax → supply ↓. Subsidy → supply ↑' },
      { i: '🔮', t: 'Expectations of producers', d: 'Expect higher prices: oil producers held oil back (supply ↓); many manufacturers expand (supply ↑)' },
      { i: '🔀', t: 'Prices of other goods', d: 'A substitute in production pays more → supply ↓. A joint product pays more → supply ↑' }] }
  ],
  'm-equilibrium': [
    { at: 0, type: 'equation', title: 'Equilibrium: where the market clears', parts: [
      { v: 'Quantity demanded', l: 'what buyers want', tone: 'demand' }, '=', { v: 'Quantity supplied', l: 'what sellers offer', tone: 'supply' }, '→', { v: 'P* and Q*', l: 'equilibrium price and quantity', tone: 'gold' }] },
    { at: 1, type: 'compare', title: 'How the market gets back to equilibrium', vs: '', sides: [
      { i: '📦', h: 'Price too high → surplus', tone: 'supply', rows: ['Quantity supplied > quantity demanded', 'Unsold goods pile up', 'Sellers cut prices → price falls to equilibrium'] },
      { i: '🏃', h: 'Price too low → shortage', tone: 'demand', rows: ['Quantity demanded > quantity supplied', 'Buyers compete for too few goods', 'Price is pushed up → price rises to equilibrium'] }] },
    { at: 4, type: 'compare', title: 'Price ceilings and price floors', vs: '', sides: [
      { i: '⬇️', h: 'Price ceiling: a legal maximum', tone: 'demand', rows: ['Only effective if set BELOW equilibrium', 'Result: a shortage (Qd > Qs)'] },
      { i: '⬆️', h: 'Price floor: a legal minimum', tone: 'supply', rows: ['Only effective if set ABOVE equilibrium', 'Result: a surplus (Qs > Qd)'] }] },
    { at: 7, type: 'cards', title: 'One curve shifts: what happens to price (P) and quantity (Q)', cols: 4, items: [
      { i: '📈', t: 'Demand increases', d: 'P ↑   Q ↑', tone: 'demand' },
      { i: '📉', t: 'Demand decreases', d: 'P ↓   Q ↓', tone: 'demand' },
      { i: '📈', t: 'Supply increases', d: 'P ↓   Q ↑', tone: 'supply' },
      { i: '📉', t: 'Supply decreases', d: 'P ↑   Q ↓', tone: 'supply' }],
      note: 'When both curves shift, one of P or Q is certain and the other depends on which shift is bigger (ΔD vs ΔS).' }
  ],
  'm-elasticity': [
    { at: 1, type: 'equation', title: 'Price elasticity of demand', parts: [
      { v: 'PED', l: 'price elasticity of demand', tone: 'gold' }, '=', { v: '% change in Qd', l: 'midpoint formula', tone: 'demand' }, '÷', { v: '% change in P', l: 'midpoint formula', tone: 'supply' }],
      note: 'Ignore the minus sign: the size of the number is what matters.' },
    { at: 3, type: 'scale', title: 'What the PED number means', ends: ['Not responsive', 'Very responsive'], zones: [
      { v: '0', t: 'Perfectly inelastic', d: 'Vertical demand curve' },
      { v: 'below 1', t: 'Inelastic', d: '%ΔQd < %ΔP', tone: 'demand' },
      { v: '= 1', t: 'Unit elastic', d: '%ΔQd = %ΔP', tone: 'gold' },
      { v: 'above 1', t: 'Elastic', d: '%ΔQd > %ΔP', tone: 'supply' },
      { v: '∞', t: 'Perfectly elastic', d: 'Horizontal demand curve' }] },
    { at: 4, type: 'cards', title: 'Price changes and total revenue (TR = P × Q)', cols: 2, items: [
      { i: '🧂', t: 'Inelastic demand', d: 'P ↑ → TR ↑ and P ↓ → TR ↓. Price and TR move the same way.', tone: 'demand' },
      { i: '🚗', t: 'Elastic demand', d: 'P ↑ → TR ↓ and P ↓ → TR ↑. Price and TR move opposite ways.', tone: 'supply' }] },
    { at: 5, type: 'compare', title: 'What makes demand elastic or inelastic', vs: '', sides: [
      { i: '🧱', h: 'Inelastic demand', tone: 'demand', rows: ['Few substitutes', 'Small share of the budget', 'Shorter time period', 'Necessity'] },
      { i: '🌊', h: 'Elastic demand', tone: 'supply', rows: ['Many substitutes', 'Large share of the budget', 'Longer time period', 'Luxury'] }] },
    { at: 6, type: 'scale', title: 'Income elasticity of demand: the sign tells you the type of good', zones: [
      { v: 'negative', t: 'Inferior good', d: 'Income ↑ → buy less', tone: 'bad' },
      { v: 'positive', t: 'Normal good', d: 'Income ↑ → buy more', tone: 'good' }] },
    { at: 7, type: 'scale', title: 'Cross price elasticity of demand: how two goods are related', zones: [
      { v: 'negative', t: 'Complements', d: 'Bought together, e.g. handphones and chargers', tone: 'demand' },
      { v: 'zero', t: 'Unrelated', d: 'No effect on each other' },
      { v: 'positive', t: 'Substitutes', d: 'Used instead of each other, e.g. Coke and Pepsi', tone: 'supply' }] }
  ],
  'm-costs': [
    { at: 0, type: 'compare', title: 'Short run vs long run', sides: [
      { i: '⏱️', h: 'Short run', tone: 'demand', rows: ['At least one input is fixed', 'e.g. the factory can’t be changed, but workers can'] },
      { i: '📅', h: 'Long run', tone: 'supply', rows: ['All inputs are variable', 'No fixed inputs: the firm can change its scale'] }] },
    { at: 2, type: 'flow', title: 'Adding workers to a fixed farm: the three stages', steps: [
      { i: '📈', t: 'Increasing marginal returns', d: 'MP rises: workers specialise', tone: 'good' },
      { i: '📉', t: 'Diminishing marginal returns', d: 'MP falls but is still positive', tone: 'gold' },
      { i: '⛔', t: 'Negative marginal returns', d: 'MP below zero: total product falls', tone: 'bad' }] },
    { at: 5, type: 'equation', title: 'Total cost', parts: [
      { v: 'TC', l: 'total cost', tone: 'demand' }, '=', { v: 'TFC', l: 'fixed: doesn’t change with output', tone: 'gold' }, '+', { v: 'TVC', l: 'variable: rises with output', tone: 'good' }] },
    { at: 6, type: 'cards', title: 'The average and marginal costs', cols: 4, items: [
      { t: 'AFC = TFC ÷ Q', d: 'Falls continuously as output rises', tone: 'gold' },
      { t: 'AVC = TVC ÷ Q', d: 'U-shaped', tone: 'good' },
      { t: 'ATC = TC ÷ Q', d: 'Also = AFC + AVC. U-shaped', tone: 'demand' },
      { t: 'MC = ΔTC ÷ ΔQ', d: 'Cuts AVC and ATC at their lowest points', tone: 'supply' }] },
    { at: 10, type: 'scale', title: 'The LRAC curve as the firm grows', ends: ['Small scale', 'Large scale'], zones: [
      { t: 'Economies of scale', d: 'LRAC falls', tone: 'good' },
      { t: 'Constant returns to scale', d: 'LRAC flat', tone: 'gold' },
      { t: 'Diseconomies of scale', d: 'LRAC rises', tone: 'bad' }] }
  ],
  'm-structures': [
    { at: 3, type: 'scale', title: 'The four market structures, from no market power to the most', ends: ['Very many sellers', 'One seller'], zones: [
      { v: 'Very many, small', t: 'Perfect competition', d: 'Identical products. Price taker. e.g. farm products', tone: 'good' },
      { v: 'Many', t: 'Monopolistic competition', d: 'Differentiated products. e.g. hair salons', tone: 'demand' },
      { v: 'A few, large', t: 'Oligopoly', d: 'Interdependent. Kinked demand. e.g. cars, airlines', tone: 'gold' },
      { v: 'One', t: 'Monopoly', d: 'No close substitutes. Price maker. e.g. Singapore Post', tone: 'bad' }] },
    { at: 4, type: 'cards', title: 'The three kinds of profit', cols: 3, items: [
      { i: '🎉', t: 'Economic profit', d: 'TR > TC', tone: 'good' },
      { i: '🤝', t: 'Normal profit', d: 'TR = TC (opportunity costs covered: just enough to stay)', tone: 'gold' },
      { i: '🔻', t: 'Economic loss', d: 'TR < TC', tone: 'bad' }] }
  ],
  'm-profit': [
    { at: 1, type: 'cards', title: 'Three ways to measure revenue', cols: 3, items: [
      { i: '💰', t: 'TR = P × Q', d: 'Total revenue' },
      { i: '➗', t: 'AR = TR ÷ Q', d: 'Average revenue (= price)' },
      { i: '➕', t: 'MR = ΔTR ÷ ΔQ', d: 'Marginal revenue: from one more unit' }],
      note: 'For a price taker, P = AR = MR.' },
    { at: 2, type: 'cards', title: 'The profit maximisation rule: compare MR with MC', cols: 3, items: [
      { i: '⬆️', t: 'MR > MC', d: 'One more unit adds more to revenue than to cost → produce more', tone: 'good' },
      { i: '🎯', t: 'MR = MC', d: 'Profit is maximised (or loss minimised) → stay here', tone: 'gold' },
      { i: '⬇️', t: 'MR < MC', d: 'The last unit cost more than it earned → produce less', tone: 'bad' }] },
    { at: 3, type: 'decide', title: 'Keep producing, or shut down? (look at the MR = MC output)', steps: [
      { q: 'Is P ≥ ATC?', yes: 'Produce: economic profit (or normal profit at P = ATC)', tone: 'good' },
      { q: 'Is P ≥ AVC?', yes: 'Produce at a loss: revenue covers variable costs and part of fixed costs', tone: 'gold' }],
      final: { t: 'P < AVC: shut down. The loss is just the fixed cost (TFC).', tone: 'bad' } }
  ],
  'm-unemployment': [
    { at: 2, type: 'tree', title: 'Who counts as unemployed?', root: { t: 'Population aged 15 and over', kids: [
      { t: 'Labour force', tone: 'demand', kids: [
        { t: 'Employed', tone: 'good' }, { t: 'Unemployed', d: 'no job but actively looking', tone: 'bad' }] },
      { t: 'Not in the labour force', d: 'e.g. retirees, full-time students, discouraged workers' }] } },
    { at: 2, type: 'equation', parts: [
      { v: 'Unemployment rate', tone: 'bad' }, '=', { v: 'Unemployed', l: 'actively looking' }, '÷', { v: 'Labour force', l: 'employed + unemployed', tone: 'demand' }, '× 100%'] },
    { at: 3, type: 'cards', title: 'The four types of unemployment', cols: 4, items: [
      { i: '🔎', t: 'Frictional', d: 'Searching between jobs. Temporary and voluntary', tag: 'Fix: better job information' },
      { i: '🧩', t: 'Structural', d: 'Skills don’t match the jobs available. Long term', tag: 'Fix: retraining' },
      { i: '📉', t: 'Cyclical', d: 'Not enough jobs in a recession. Involuntary', tag: 'Fix: fiscal or monetary policy', tone: 'bad' },
      { i: '🏖️', t: 'Seasonal', d: 'Jobs that end with the season, like crop growing', tag: 'Often counted as frictional' }] },
    { at: 7, type: 'compare', title: 'Two causes of inflation', vs: '', sides: [
      { i: '🛒', h: 'Demand-pull inflation', tone: 'demand', rows: ['Too much total spending', 'AD shifts right', 'Price level ↑ and output ↑'] },
      { i: '🏭', h: 'Cost-push inflation', tone: 'supply', rows: ['Production costs rise (wages, oil, raw materials)', 'AS shifts left', 'Price level ↑ and output ↓'] }] },
    { at: 8, type: 'equation', title: 'Measuring inflation', parts: [
      { v: 'CPI', tone: 'gold' }, '=', { v: 'Basket cost this year' }, '÷', { v: 'Basket cost in the base year' }, '× 100'],
      note: 'Inflation rate = (CPI this year − CPI last year) ÷ CPI last year × 100%.' },
    { at: 9, type: 'compare', title: 'Who wins and who loses from inflation?', vs: '', sides: [
      { i: '😟', h: 'Penalised', tone: 'bad', rows: ['Fixed-income earners, such as pensioners', 'Savers (when interest is below inflation)', 'Creditors (lenders) who didn’t expect it'] },
      { i: '🙂', h: 'Benefits', tone: 'good', rows: ['Debtors (borrowers): they repay with money that’s worth less'] }] }
  ],
  'm-gdp': [
    { at: 1, type: 'cards', title: 'What counts in GDP?', cols: 3, items: [
      { i: '✅', t: 'Final goods only', d: 'Not intermediate goods, to avoid double counting', tone: 'good' },
      { i: '🆕', t: 'New, current output', d: 'Not second-hand goods or financial deals', tone: 'good' },
      { i: '🚫', t: 'Some output is left out', d: 'e.g. unpaid housework and illegal activities', tone: 'bad' },
      { i: '📍', t: 'Made inside the country', d: 'By local or foreign factors. GNP counts what a country’s own people produce' },
      { i: '🏷️', t: 'At current market prices', d: 'That’s why we need real GDP' }] },
    { at: 7, type: 'compare', title: 'Money GDP or real GDP?', sides: [
      { i: '💵', h: 'Money (nominal) GDP', tone: 'gold', rows: ['Current-year prices × current-year quantity', 'Rises if prices rise, even when output doesn’t'] },
      { i: '📦', h: 'Real GDP', tone: 'good', rows: ['Base-year prices × current-year quantity', 'Only changes when output changes', 'Real GDP = money GDP ÷ GDP deflator × 100'] }] },
    { at: 8, type: 'equation', title: 'The expenditure approach', parts: [
      { v: 'GDP', tone: 'gold' }, '=', { v: 'C', l: 'consumption', tone: 'demand' }, '+', { v: 'I', l: 'investment', tone: 'good' }, '+', { v: 'G', l: 'government spending', tone: 'supply' }, '+', { v: '(X − M)', l: 'net exports' }] },
    { at: 11, type: 'flow', title: 'The four phases of the business cycle', steps: [
      { i: '📈', t: 'Recovery', d: 'Real GDP rises, unemployment falls', tone: 'good' },
      { i: '⛰️', t: 'Peak', d: 'Highest point, close to full employment', tone: 'gold' },
      { i: '📉', t: 'Recession', d: 'Real GDP falls, unemployment rises', tone: 'bad' },
      { i: '🕳️', t: 'Trough', d: 'Lowest point' }], loop: 'then recovery starts again' }
  ],
  'm-adas': [
    { at: 0, type: 'compare', title: 'Is the economy too cold or too hot?', vs: '', sides: [
      { i: '🥶', h: 'Recessionary situation', tone: 'demand', rows: ['Equilibrium output below full employment: Ye < Yf', 'Unemployment is high'] },
      { i: '🔥', h: 'Inflationary situation', tone: 'bad', rows: ['Spending pushes output past full employment: Ye > Yf', 'The price level rises'] }] },
    { at: 3, type: 'equation', title: 'Aggregate demand: total spending in the economy', parts: [
      { v: 'AD', tone: 'gold' }, '=', { v: 'C', l: 'consumption', tone: 'demand' }, '+', { v: 'I', l: 'investment', tone: 'good' }, '+', { v: 'G', l: 'government', tone: 'supply' }, '+', { v: '(X − M)', l: 'net exports' }] },
    { at: 4, type: 'flow', title: 'The multiplier: one person’s spending is another’s income', steps: [
      { i: '💸', t: 'Spending', s: '↑', d: 'e.g. investment rises by $100m' },
      { i: '👛', t: 'Incomes', s: '↑', d: 'whoever is paid earns $100m' },
      { i: '🛍️', t: 'Consumption', s: '↑', d: 'they spend the MPC share and save the rest' },
      { i: '👛', t: 'More incomes', s: '↑', d: 'and the rounds continue, smaller each time' }],
      note: 'Multiplier = 1 ÷ MPS = 1 ÷ (1 − MPC). With MPC 0.75, the multiplier is 4: output rises by $400m.' },
    { at: 7, type: 'cards', title: 'What changes consumption (C)?', cols: 3, items: [
      { i: '🔮', t: 'Expectations', d: 'Optimistic → spend more now' },
      { i: '🏦', t: 'Wealth', d: 'More savings and shares → spend more' },
      { i: '％', t: 'Interest rate', d: 'Lower rate → borrow and buy more durables' }] },
    { at: 9, type: 'cards', title: 'What changes investment (I)?', cols: 5, items: [
      { i: '🔮', t: 'Expectations', d: 'Expect growth → invest more' },
      { i: '🤖', t: 'Technology', d: 'New tech → invest to keep up' },
      { i: '％', t: 'Interest rate', d: 'Higher rate → borrowing costs more → invest less' },
      { i: '🏛️', t: 'Government policies', d: 'Business taxes ↓ or tax credits → invest more' },
      { i: '🔧', t: 'Depreciation', d: 'Worn-out capital needs replacing' }] }
  ],
  'm-fiscal': [
    { at: 1, type: 'compare', title: 'Where the government’s money comes from and goes', vs: '→', sides: [
      { i: '📥', h: 'Revenue (T)', tone: 'good', rows: ['Direct taxes: income tax, property tax', 'Indirect taxes: GST', 'Non-tax revenue: investment income, sales, loan repayments'] },
      { i: '📤', h: 'Expenditure (G)', tone: 'supply', rows: ['Defence and justice', 'Social and community services', 'Economic services', 'Servicing public debt'] }] },
    { at: 3, type: 'scale', title: 'The government budget = T − G', zones: [
      { v: 'T < G', t: 'Budget deficit', tone: 'bad' },
      { v: 'T = G', t: 'Balanced budget', tone: 'gold' },
      { v: 'T > G', t: 'Budget surplus', tone: 'good' }] },
    { at: 4, type: 'flow', title: 'Expansionary fiscal policy (to fight a recession)', steps: [
      { i: '🏛️', t: 'G ↑ or T ↓' }, { i: '🛒', t: 'AD shifts right', tone: 'demand' }, { i: '📈', t: 'Output ↑, unemployment ↓', tone: 'good' }] },
    { at: 4, type: 'flow', title: 'Contractionary fiscal policy (to fight inflation)', steps: [
      { i: '🏛️', t: 'G ↓ or T ↑' }, { i: '🛒', t: 'AD shifts left', tone: 'demand' }, { i: '🧊', t: 'Price level ↓ (inflation eases)', tone: 'gold' }] },
    { at: 7, type: 'cards', title: 'The two multipliers', cols: 2, items: [
      { i: '🏗️', t: 'ΔY = ΔG × (1 ÷ MPS)', d: 'Government spending multiplier: all of the new spending counts', tone: 'supply' },
      { i: '🧾', t: 'ΔY = ΔT × (−MPC ÷ MPS)', d: 'Tax multiplier: smaller, because people save part of a tax cut', tone: 'good' }] },
    { at: 10, type: 'cards', title: 'Automatic stabilisers: work without any new decision', cols: 2, items: [
      { i: '🛟', t: 'Unemployment compensation', d: 'In a recession more people claim it, which props up spending' },
      { i: '📊', t: 'Progressive income tax', d: 'In a boom incomes rise and tax takes a bigger share, which cools spending' }] }
  ],
  'm-monetary': [
    { at: 1, type: 'cards', title: 'The four functions of money', cols: 4, items: [
      { i: '🤝', t: 'Medium of exchange', d: 'Accepted for payment, so no need for barter' },
      { i: '📏', t: 'Unit of account', d: 'One way to measure value: every price is in dollars' },
      { i: '🏺', t: 'Store of value', d: 'Can be kept and spent later' },
      { i: '📝', t: 'Standard of deferred payment', d: 'Used for payments in the future, like loans' }] },
    { at: 4, type: 'flow', title: 'How banks create money', steps: [
      { i: '🏦', t: 'A deposit comes in' }, { i: '🔒', t: 'Bank keeps the required reserves', d: 'RRR × deposit' },
      { i: '💳', t: 'Lends the excess reserves' }, { i: '🔁', t: 'The loan is spent and deposited in another bank' }],
      loop: 'and each round is smaller', note: 'Money multiplier = 1 ÷ RRR. Increase in money supply = initial excess reserves × (1 ÷ RRR).' },
    { at: 6, type: 'cards', title: 'The central bank’s tools: to increase the money supply…', cols: 4, items: [
      { i: '🔓', t: 'Lower the RRR', d: 'Banks can lend more of each deposit' },
      { i: '％', t: 'Lower the discount rate', d: 'Borrowing reserves from the central bank is cheaper' },
      { i: '📜', t: 'Buy government securities', d: 'Open market operations add reserves to banks' },
      { i: '💱', t: 'Exchange rate policy', d: 'The MAS’s main tool in Singapore' }],
      note: 'To decrease the money supply, do the opposite.' },
    { at: 12, type: 'flow', title: 'Expansionary monetary policy, step by step', steps: [
      { i: '💵', t: 'Money supply', s: '↑' }, { i: '％', t: 'Interest rate', s: '↓' },
      { i: '🛍️', t: 'C and I', s: '↑' }, { i: '🛒', t: 'AD shifts right', tone: 'demand' }, { i: '📈', t: 'Output', s: '↑', tone: 'good' }],
      note: 'Contractionary policy runs the same chain the other way, to fight inflation.' }
  ]
};
