/* Your module: Topics 11–13. Section numbers follow the student notes. */
ECON.lessons.push(
  {
    id: 'm-adas',
    unit: 'm2',
    title: 'Aggregate Demand and Supply: Consumption and Investment',
    summary: 'Macroeconomic equilibrium, recessionary and inflationary situations, the income multiplier, and what drives consumption and investment.',
    minutes: 18,
    body: `
<h2>11.1 Equilibrium in the economy</h2>
<p>In microeconomics, a market is in equilibrium when quantity demanded equals quantity supplied (Topic 4). In macroeconomics, we look at the whole economy: it is in equilibrium when <strong>aggregate demand equals aggregate supply</strong>.</p>
<div class="formula"><strong>AD = AS</strong>, where AD = C + I + G + (X − M)</div>
<p>A country’s output and employment depend on how much is spent. Equilibrium output (Ye) is where the AD and AS curves cross. It can be:</p>
<ul>
  <li><strong>at</strong> the full employment output level (Yf),</li>
  <li><strong>below</strong> full employment, or</li>
  <li><strong>above</strong> full employment.</li>
</ul>
<p><strong>Full employment output (Yf)</strong> is where all resources are fully employed: the output level at the natural rate of unemployment (Topic 9). It is also called <strong>potential GDP</strong>.</p>
<h3>11.1.1 Recessionary situation</h3>
<p>If equilibrium is <strong>below</strong> full employment (Ye &lt; Yf), the economy is in a <strong>recessionary situation</strong>: there is cyclical unemployment. To reach Yf, <strong>AD must be increased</strong> (shifted right).</p>
<h3>11.1.2 Inflationary situation</h3>
<p>If equilibrium is <strong>above</strong> full employment (Ye &gt; Yf), the economy is in an <strong>inflationary situation</strong>: spending is running ahead of what the economy can sustainably produce. To reach Yf, <strong>AD must be decreased</strong> (shifted left).</p>
<div data-widget="adas" data-preset="m-adas"></div>

<h2>11.2 Components of aggregate demand</h2>
<div class="formula"><strong>AD = C + I + G + (X − M)</strong>: consumption, investment, government spending, and exports minus imports</div>
<p>Changing any of these components shifts AD and can move the economy toward full employment. But when a component changes, output changes by <strong>more</strong> than the initial change, because of the income multiplier.</p>

<h2>11.3 The income multiplier effect</h2>
<p>The <strong>multiplier</strong> tells us how many times output changes when AD changes:</p>
<div class="formula">Multiplier = <strong>ΔY ÷ ΔAD</strong> (change in output ÷ change in aggregate demand)</div>
<p><strong>Why is there a multiplier?</strong> Because an initial change in spending causes further rounds of spending: one person’s spending is another person’s income.</p>
<h3>Consumption and saving</h3>
<p>Keynesian economics assumes people can do only two things with their income: spend it or save it.</p>
<div class="formula"><strong>Y = C + S</strong></div>
<ul>
  <li><strong>Marginal propensity to consume (MPC)</strong> = ΔC ÷ ΔY: the fraction of extra income that is spent.</li>
  <li><strong>Marginal propensity to save (MPS)</strong> = ΔS ÷ ΔY: the fraction of extra income that is saved.</li>
</ul>
<p>Income can only be spent or saved, so the two must add up to 1: <strong>MPC + MPS = 1</strong>, or MPS = 1 − MPC. If MPC = 0.75, then MPS = 0.25: out of every extra $1, you spend 75 cents and save 25 cents.</p>
<div class="note example">
  <p class="note-label">How the multiplier works (from your notes)</p>
  <p>Investment rises by <strong>$100 million</strong>: a firm builds a hotel. That $100m becomes the income of the construction firm and its workers. With MPC = 0.75, they spend $75m (say, at restaurants) and save $25m. The $75m becomes the restaurant owners’ income; they spend 75% of it ($56.3m) and save the rest. And so on, until there is nothing left to spend.</p>
  <p>Add up every round and output rises by <strong>$400 million</strong>: four times the initial $100m. The multiplier is 4.</p>
</div>
<div data-widget="multiplier"></div>
<div class="formula">Multiplier = <strong>1 ÷ MPS</strong> = <strong>1 ÷ (1 − MPC)</strong></div>

<h2>11.4 How much will output change when AD changes?</h2>
<div class="formula"><strong>ΔY = multiplier × ΔAD</strong> = (1 ÷ MPS) × ΔAD, where ΔAD can be a change in C, I, G or (X − M)</div>
<p>With MPC = 0.75, a $100m rise in I (or C, G or X − M) raises AD by $100m, so output rises by ΔY = (1 ÷ 0.25) × $100m = <strong>$400m</strong>.</p>
<div class="note pitfall">
  <p class="note-label">Read this yourself</p>
  <p>The multiplier formula assumes prices don’t change. In the AD-AS model, prices can rise as AD shifts right, so the change in equilibrium output on the diagram (Y1 − Y0) is usually a bit smaller than the formula’s ΔY. The flatter the AS curve, the closer the two are. For exams, focus on the multiplier formula and the rounds table.</p>
</div>

<h2>11.5 Determinants of consumption (C)</h2>
<ul>
  <li><strong>Expectations.</strong> Consumers’ optimism or pessimism about the future changes spending now. If households expect prices to be much higher next year, they buy now and consumption rises (AD shifts right). If they expect a recession, they cut back now and consumption falls (AD shifts left).</li>
  <li><strong>Wealth.</strong> A rise in financial wealth (money, savings, shares) raises consumption; a fall lowers it.</li>
  <li><strong>Interest rate.</strong> Durable goods such as cars, furniture and appliances are often bought with borrowed money. A lower interest rate encourages borrowing and consumption; a higher rate discourages them.</li>
</ul>

<h2>11.6 Investment (I)</h2>
<p><strong>Investment</strong> is firms’ spending on capital goods (machinery, equipment, factories and other buildings), new residential property, and changes in inventories. It adds to the economy’s stock of capital.</p>
<h3>Determinants of investment</h3>
<ul>
  <li><strong>Expectations.</strong> If firms expect the economy to expand, they invest more (AD shifts right). If they expect a downturn, they invest less (AD shifts left).</li>
  <li><strong>Technological change.</strong> New technology brings new products and makes old equipment obsolete, so firms invest to keep up.</li>
  <li><strong>Interest rate.</strong> Capital goods are usually bought with borrowed money. A higher interest rate raises the cost of borrowing, so investment falls; a lower rate makes investment rise.</li>
  <li><strong>Government policies.</strong> Higher business taxes cut profitability and reduce investment. A tax credit for new investment encourages it.</li>
  <li><strong>Depreciation.</strong> Capital wears out. The more capital a country has, and the older it is, the more investment is needed to replace it.</li>
</ul>
`,
    terms: [
      ['Aggregate demand', 'Total spending in the economy at each price level: C + I + G + (X − M).'],
      ['Aggregate supply', 'The total output firms produce and supply at each price level over a period of time.'],
      ['Macroeconomic equilibrium', 'The output level where aggregate demand equals aggregate supply.'],
      ['Full employment output', 'The output level (Yf) at which all resources are fully employed and unemployment is at its natural rate. Also called potential GDP.'],
      ['Recessionary situation', 'When equilibrium output is below full employment output (Ye < Yf). AD needs to increase.'],
      ['Inflationary situation', 'When equilibrium output is above full employment output (Ye > Yf). AD needs to decrease.'],
      ['Income multiplier', 'The number of times output changes when aggregate demand changes: ΔY ÷ ΔAD = 1 ÷ MPS.'],
      ['Marginal propensity to consume', 'The fraction of each extra dollar of income that is spent: ΔC ÷ ΔY.'],
      ['Marginal propensity to save', 'The fraction of each extra dollar of income that is saved: ΔS ÷ ΔY. MPC + MPS = 1.'],
      ['Investment', 'Firms’ spending on capital goods such as machinery and factories, new housing, and changes in inventories.'],
      ['Depreciation', 'The wearing out of existing capital equipment, which has to be replaced through investment.']
    ],
    review: [
      ['How do you illustrate an economy at equilibrium?', '<p>Draw the price level on the vertical axis and output on the horizontal axis. Equilibrium output Ye is where the downward-sloping AD curve crosses the upward-sloping AS curve. Mark Yf, full employment output, to show whether Ye is at, below or above it.</p>'],
      ['What is an inflationary situation, and what is a recessionary situation?', '<p>Recessionary: Ye &lt; Yf, so there is cyclical unemployment and AD needs to rise. Inflationary: Ye &gt; Yf, so the economy is overheating and AD needs to fall.</p>'],
      ['What are the components of aggregate demand?', '<p>Consumption (C), investment (I), government spending (G) and net exports (X − M).</p>'],
      ['Why does a change in AD change output by a multiple?', '<p>Because spending creates income, and part of that income is spent again, round after round. Each round is smaller because part is saved, but the rounds add up to a total change bigger than the first injection.</p>'],
      ['How do you use the income multiplier to find the change in output?', '<p>Multiplier = 1 ÷ MPS = 1 ÷ (1 − MPC). ΔY = multiplier × ΔAD. With MPC = 0.75, a $100m rise in AD gives ΔY = 4 × $100m = $400m.</p>'],
      ['What factors affect consumption and investment?', '<p>Consumption: expectations, wealth and the interest rate. Investment: expectations, technological change, the interest rate, government policies and depreciation.</p>']
    ],
    blanks: [
      ['11.3', 'The multiplier tells us the number of times output changes whenever AD changes:', 'Multiplier = ΔY ÷ ΔAD'],
      ['11.3', 'Income can either be consumed or saved, i.e.', 'Y = C + S'],
      ['11.3', 'MPC =', 'ΔC ÷ ΔY: the change in consumption from an extra dollar of income.'],
      ['11.3', 'MPS =', 'ΔS ÷ ΔY: the change in saving from an extra dollar of income.'],
      ['11.3', 'The multiplier formula can also be written as:', 'Multiplier = 1 ÷ MPS = 1 ÷ (1 − MPC)'],
      ['11.4', 'How much will output change when AD changes?', 'ΔY = multiplier × ΔAD = (1 ÷ MPS) × ΔAD'],
      ['11.4', 'MPC = 0.75, AD rises by $100m: output changes by…', 'ΔY = (1 ÷ 0.25) × $100m = $400m'],
      ['11.6', 'Definition of investment', 'Firms’ spending on capital goods (machinery, equipment, factories and buildings), new residential property and changes in inventories.']
    ],
    quiz: [
      {
        q: 'In macroeconomics, the economy is in equilibrium when:',
        options: [
          'Government spending equals taxes',
          'Aggregate demand equals aggregate supply',
          'Exports equal imports',
          'Unemployment is zero'
        ],
        answer: 1,
        why: 'Equilibrium output is where AD = AS. It may be at, below or above full employment.'
      },
      {
        q: 'Equilibrium output is below full employment output (Ye < Yf). The economy is in:',
        options: [
          'An inflationary situation, so AD should fall',
          'A recessionary situation, so AD should rise',
          'Full employment',
          'A budget surplus'
        ],
        answer: 1,
        why: 'Output below Yf means idle resources and cyclical unemployment, so AD must increase.'
      },
      {
        q: 'If the MPC is 0.8, the MPS is:',
        options: ['0.2', '0.8', '1.25', '5'],
        answer: 0,
        why: 'MPC + MPS = 1, so MPS = 1 − 0.8 = 0.2.'
      },
      {
        q: 'If the MPS is 0.25, the multiplier is:',
        options: ['0.25', '1.33', '4', '25'],
        answer: 2,
        why: 'Multiplier = 1 ÷ MPS = 1 ÷ 0.25 = 4.'
      },
      {
        q: 'MPC is 0.75 and investment rises by $100m. By how much does output rise?',
        options: ['$75m', '$100m', '$133m', '$400m'],
        answer: 3,
        why: 'Multiplier = 1 ÷ 0.25 = 4. ΔY = 4 × $100m = $400m.'
      },
      {
        q: 'Why does output change by more than the initial change in spending?',
        options: [
          'Because prices always rise',
          'Because each round of spending becomes someone else’s income, and part of it is spent again',
          'Because the government matches private spending',
          'Because saving increases output'
        ],
        answer: 1,
        why: 'Spending creates income, which creates more spending. The rounds shrink as part is saved, but they add up.'
      },
      {
        q: 'Which of these would most likely increase consumption?',
        options: [
          'Households expect a recession',
          'Interest rates rise',
          'Share prices rise, making households wealthier',
          'Households decide to save more'
        ],
        answer: 2,
        why: 'Greater wealth raises consumption. Recession fears, higher interest rates and more saving all reduce it.'
      },
      {
        q: 'A rise in interest rates tends to:',
        options: [
          'Increase investment',
          'Decrease investment, because borrowing is more expensive',
          'Have no effect on investment',
          'Increase depreciation'
        ],
        answer: 1,
        why: 'Capital goods are usually bought with borrowed money, so higher interest rates make investment less attractive.'
      }
    ]
  },

  {
    id: 'm-fiscal',
    unit: 'm2',
    title: 'Fiscal Policy',
    summary: 'The government’s budget, expansionary and contractionary fiscal policy, the spending and tax multipliers, the limits of fiscal policy, and automatic stabilisers.',
    minutes: 17,
    body: `
<h2>12.1 What role does the government play in an economy?</h2>
<p>Households and firms (C and I) make their decisions based on their own interests. Together, their spending may be too little, leading to unemployment, or too much, leading to inflation. And C and I can’t be counted on to spend more when AD is too low, or less when it is too high.</p>
<p>So the government steps in to stabilise the economy at or near full employment, using <strong>fiscal policy</strong> (this topic) and monetary policy (Topic 13).</p>
<p><strong>Fiscal policy</strong> is the use of changes in government spending (G) or taxes (T) to reach the full employment income level (Yf). Changing G or T changes AD, which changes the income level. When the government deliberately decides to make these changes, it is called <strong>discretionary fiscal policy</strong>.</p>

<h2>12.2 Sources of government revenue</h2>
<ul>
  <li><strong>Taxes</strong>, the main source: <em>direct taxes</em> such as income tax and property tax, and <em>indirect taxes</em> such as GST.</li>
  <li><strong>Non-tax revenue</strong>: investment income, income from selling goods and services, and repayments of government loans.</li>
</ul>

<h2>12.3 Areas of government expenditure</h2>
<p>Defence and justice, social and community services, economic services, and servicing its public debt.</p>

<h2>12.4 The government budget</h2>
<p>The government’s budget shows its expenditure and revenue for a particular year.</p>
<div class="formula"><strong>Budget = revenue (T) − expenditure (G)</strong></div>
<ul>
  <li><strong>T &gt; G:</strong> budget surplus</li>
  <li><strong>T &lt; G:</strong> budget deficit</li>
  <li><strong>T = G:</strong> balanced budget</li>
</ul>

<h2>12.5 Discretionary fiscal policy</h2>
<h3>Expansionary fiscal policy</h3>
<p>Expansionary fiscal policy means <strong>raising G and/or lowering taxes</strong>. It is used when the economy is in a <strong>recession</strong> (a recessionary situation). It increases AD, which increases output.</p>
<ul>
  <li><strong>Using G:</strong> when G increases, AD shifts right.</li>
  <li><strong>Using T:</strong> the income households actually receive after tax is <em>disposable income</em> (Yd = Y − T). Assume T is a <strong>lump sum tax</strong>: a fixed amount that doesn’t change with income. Lower the lump sum tax, and the chain is:</li>
</ul>
<div class="formula">T ↓ → disposable income (Yd) ↑ → C ↑ → AD shifts right → output (Y) ↑</div>
<h3>Contractionary fiscal policy</h3>
<p>Contractionary fiscal policy means <strong>lowering G and/or raising taxes</strong>. It is used when the economy is in an <strong>inflationary situation</strong>. It decreases AD, which decreases output.</p>
<div class="formula">G ↓ → AD shifts left → Y ↓ &nbsp;·&nbsp; T ↑ → Yd ↓ → C ↓ → AD shifts left → Y ↓</div>
<div data-widget="adas" data-preset="m-fiscal"></div>

<h2>12.6 Calculating the effects of a change in G and T</h2>
<p>Use MPC = 0.75, so MPS = 0.25.</p>
<div class="formula">Government expenditure multiplier: <strong>ΔY = (1 ÷ MPS) × ΔG</strong></div>
<p>G rises by $50b: ΔY = (1 ÷ 0.25) × $50b = <strong>+$200b</strong>.</p>
<div class="formula">Tax multiplier: <strong>ΔY = (−MPC ÷ MPS) × ΔT</strong></div>
<p>T falls by $50b: ΔY = (−0.75 ÷ 0.25) × (−$50b) = <strong>+$150b</strong>.</p>
<p>The same $50b has a smaller effect as a tax cut than as spending. Government spending enters AD in full straight away, but households save part of a tax cut (here 25%) before any of it is spent.</p>
<div data-widget="fiscal"></div>

<h3>Summary</h3>
<div class="table-wrap"><table>
  <thead><tr><th></th><th>Expansionary fiscal policy</th><th>Contractionary fiscal policy</th></tr></thead>
  <tbody>
    <tr><td>Action</td><td>G ↑ and/or T ↓</td><td>G ↓ and/or T ↑</td></tr>
    <tr><td>Objective</td><td>AD ↑ → Q (Y) ↑: AD shifts right and the economy grows</td><td>AD ↓ → Q (Y) ↓: AD shifts left and the economy contracts</td></tr>
    <tr><td>Effect on a balanced budget (B = T − G)</td><td>Budget deficit</td><td>Budget surplus</td></tr>
    <tr><td>When is it adopted?</td><td>During a <strong>recession</strong></td><td>When the economy is overheated: during an <strong>inflationary</strong> period</td></tr>
  </tbody>
</table></div>

<h2>12.7 Evaluation of fiscal policy</h2>
<p>It is hard to use fiscal policy to reach and stay at full employment, because of these drawbacks:</p>
<ul>
  <li><strong>Timing problems.</strong>
    <ul>
      <li><em>Recognition lag:</em> it takes time to identify what stage of the business cycle the economy is in.</li>
      <li><em>Administrative lag:</em> it takes time to get approval to change taxes or spending.</li>
      <li><em>Operational lag:</em> once enacted, the policy takes time to work through the economy via the multiplier. By then, conditions may have changed so that the opposite policy is needed.</li>
    </ul>
  </li>
  <li><strong>Political considerations.</strong> Raising G and cutting T make a government popular, so fiscal policy tends to be expansionary even when that isn’t the right policy.</li>
  <li><strong>Crowding-out effect.</strong> If the government borrows to spend more, demand for funds rises and pushes up interest rates. Higher interest rates reduce investment and consumption, pushing AD back to the left and weakening the policy.</li>
  <li><strong>Inflation.</strong> Expansionary policy raises AD and Y, which may lead to inflation.</li>
</ul>

<h2>12.8 Automatic stabilisers</h2>
<p><strong>Automatic stabilisers</strong> are items in the budget that change automatically when economic conditions change. They reduce fluctuations in AD without any new decision by the government.</p>
<h3>Unemployment compensation</h3>
<p>In welfare states such as the US, unemployed people receive unemployment benefits; once employed, they contribute to the benefits fund through their employer.</p>
<ul>
  <li><strong>During a recession:</strong> people who lose their jobs still receive some income, so their spending falls by less. The multiplier that shrinks income is weaker, so <strong>AD falls by less</strong> and the recession is less severe.</li>
  <li><strong>During inflation:</strong> employed people must pay into the fund, which leaves them less income to spend, so <strong>AD rises by less</strong> and inflationary pressure is dampened.</li>
</ul>
<h3>Progressive income tax</h3>
<p>A progressive income tax has tax rates that rise with higher income brackets, so the amount of tax paid rises as income rises.</p>
<ul>
  <li><strong>During a recession:</strong> as incomes fall, people pay less tax, which stops disposable income from falling too far. Consumption and AD fall by less.</li>
  <li><strong>During an expansion:</strong> people pay more tax, which stops disposable income from rising too fast. Consumption and AD rise by less, easing inflationary pressure.</li>
</ul>
`,
    terms: [
      ['Fiscal policy', 'Changes in government spending (G) or taxes (T) to steer the economy toward full employment income (Yf).'],
      ['Discretionary fiscal policy', 'Deliberate decisions by the government to change G or T.'],
      ['Direct tax', 'A tax on income or property, such as income tax or property tax.'],
      ['Indirect tax', 'A tax on spending, such as GST.'],
      ['Government budget', 'A statement of the government’s revenue and expenditure for a year: budget = T − G.'],
      ['Budget surplus', 'When government revenue exceeds expenditure (T > G).'],
      ['Budget deficit', 'When government expenditure exceeds revenue (T < G).'],
      ['Balanced budget', 'When government revenue equals expenditure (T = G).'],
      ['Expansionary fiscal policy', 'Raising G and/or lowering taxes to increase AD, used in a recession.'],
      ['Contractionary fiscal policy', 'Lowering G and/or raising taxes to decrease AD, used in an inflationary situation.'],
      ['Disposable income', 'Income after tax: Yd = Y − T.'],
      ['Lump sum tax', 'A tax of a fixed amount that doesn’t change with the level of income.'],
      ['Tax multiplier', 'How much output changes when taxes change: ΔY = (−MPC ÷ MPS) × ΔT.'],
      ['Crowding-out effect', 'When government borrowing raises interest rates and reduces private investment and consumption, weakening fiscal policy.'],
      ['Automatic stabilisers', 'Budget items, such as unemployment compensation and progressive income tax, that change automatically with economic conditions and reduce fluctuations in AD.'],
      ['Progressive income tax', 'An income tax whose rates rise with higher income brackets.']
    ],
    review: [
      ['What is fiscal policy?', '<p>The use of changes in government spending (G) and taxes (T) to influence AD and steer the economy toward full employment income (Yf).</p>'],
      ['What are the major aims of fiscal policy?', '<p>To stabilise the economy at or near full employment: bring it out of recession (cyclical unemployment) and counter inflation when it overheats.</p>'],
      ['How do expansionary and contractionary fiscal policies stabilise the economy?', '<p>In a recession, raise G and/or cut T: AD shifts right and output and employment rise. When overheating, cut G and/or raise T: AD shifts left, easing inflation. A tax change works through disposable income and consumption.</p>'],
      ['What is the government budget?', '<p>Revenue minus expenditure for the year: B = T − G. T &gt; G is a surplus, T &lt; G a deficit, T = G a balanced budget.</p>'],
      ['How do you use the government expenditure multiplier and the tax multiplier?', '<p>ΔY = (1 ÷ MPS) × ΔG, and ΔY = (−MPC ÷ MPS) × ΔT. With MPC = 0.75: +$50b in G gives +$200b; −$50b in T gives +$150b.</p>'],
      ['What are the limitations of fiscal policy?', '<p>Timing lags (recognition, administrative, operational), political bias toward expansion, crowding out (higher interest rates reduce C and I), and the risk of inflation.</p>'],
      ['What are automatic stabilisers, and how do they help?', '<p>Budget items that change automatically with the economy. Unemployment compensation props up spending in recessions and takes money out in booms. Progressive income tax takes less in recessions and more in booms. Both reduce swings in AD.</p>']
    ],
    blanks: [
      ['12.1', 'How does the government stabilise the economy?', 'Through fiscal policy (changing government spending and taxes) and monetary policy.'],
      ['12.4', 'T = G', 'Balanced budget'],
      ['12.5', 'Use an expansionary fiscal policy when the economy is in a…', 'Recession (a recessionary situation, with cyclical unemployment).'],
      ['12.5', 'Lump sum tax?', 'A tax of a fixed amount that doesn’t change with the level of income.'],
      ['12.5', 'Lower lump sum tax: after-tax income will… C will…', 'Rise… rise. (AD shifts right, and output rises.)'],
      ['12.5', 'Raise tax: after-tax income will… C will…', 'Fall… fall. (AD shifts left, and output falls.)'],
      ['Summary', 'Fiscal policy table headings', 'Expansionary fiscal policy (left) and contractionary fiscal policy (right).'],
      ['Summary', 'Expansionary: when is it adopted?', 'During a recession.'],
      ['12.8', 'Unemployment compensation during recession: result', 'Spending falls by less, so the fall in AD (and in income through the multiplier) is smaller, cushioning the recession.'],
      ['12.8', 'Unemployment compensation during inflation: result', 'Contributions reduce spendable income, so AD rises by less, dampening inflation.'],
      ['12.8', 'Progressive income tax during recession: result', 'Disposable income, consumption and AD fall by less, cushioning the recession.'],
      ['12.8', 'Progressive income tax during expansion: result', 'Disposable income, consumption and AD rise by less, easing inflationary pressure.']
    ],
    quiz: [
      {
        q: 'Fiscal policy refers to changes in:',
        options: [
          'The money supply and interest rates',
          'Government spending and taxes',
          'Exchange rates',
          'Wages and prices'
        ],
        answer: 1,
        why: 'Fiscal policy uses G and T. Money supply and interest rates are monetary policy.'
      },
      {
        q: 'A government collects $80b in taxes and spends $95b. Its budget is in:',
        options: ['Surplus of $15b', 'Deficit of $15b', 'Balance', 'Surplus of $175b'],
        answer: 1,
        why: 'Budget = T − G = $80b − $95b = −$15b, a deficit.'
      },
      {
        q: 'Which is an expansionary fiscal policy?',
        options: [
          'Cutting government spending',
          'Raising income tax',
          'Lowering taxes',
          'Raising interest rates'
        ],
        answer: 2,
        why: 'Lower taxes raise disposable income, consumption and AD. The others reduce AD, and interest rates are monetary policy.'
      },
      {
        q: 'MPS is 0.25 and government spending rises by $50b. Output rises by:',
        options: ['$12.5b', '$50b', '$150b', '$200b'],
        answer: 3,
        why: 'ΔY = (1 ÷ MPS) × ΔG = 4 × $50b = $200b.'
      },
      {
        q: 'MPC is 0.75 and the government cuts lump sum taxes by $50b. Output rises by:',
        options: ['$37.5b', '$50b', '$150b', '$200b'],
        answer: 2,
        why: 'ΔY = (−MPC ÷ MPS) × ΔT = (−0.75 ÷ 0.25) × (−$50b) = +$150b.'
      },
      {
        q: 'Why does a tax cut raise output by less than the same increase in government spending?',
        options: [
          'Tax cuts take longer to pass',
          'Households save part of a tax cut before spending the rest',
          'Tax cuts reduce the money supply',
          'Government spending is never saved'
        ],
        answer: 1,
        why: 'G enters AD in full; only the MPC share of a tax cut is spent in the first round.'
      },
      {
        q: 'The government borrows to spend more, interest rates rise, and private investment falls. This is:',
        options: ['The multiplier effect', 'The crowding-out effect', 'An automatic stabiliser', 'A recognition lag'],
        answer: 1,
        why: 'Government borrowing competes for funds, raising interest rates and crowding out private C and I.'
      },
      {
        q: 'Which of these is an automatic stabiliser?',
        options: [
          'A new highway project approved by parliament',
          'A one-off cash handout',
          'Progressive income tax',
          'A cut in the discount rate'
        ],
        answer: 2,
        why: 'Tax collected changes automatically as incomes rise and fall, with no new decision needed.'
      }
    ]
  },

  {
    id: 'm-monetary',
    unit: 'm2',
    title: 'Monetary Policy',
    summary: 'The functions of money, how banks create money, the central bank and its four tools, the money market, and how monetary policy reaches output.',
    minutes: 22,
    body: `
<h2>13.1 What is money?</h2>
<p><strong>Money</strong> is anything that is generally accepted as payment for goods and services, and for settling debts.</p>
<h3>13.1.1 Functions of money</h3>
<p>To work as money, something must perform four functions.</p>
<ul>
  <li><strong>Medium of exchange (means of payment).</strong> Money is accepted to settle all transactions. Without it, we would need <em>barter</em>, swapping goods for goods, which requires a <strong>double coincidence of wants</strong>: I have to find someone who has what I want <em>and</em> wants what I have. Money removes that problem, so it acts as a lubricant that makes exchange easier.</li>
  <li><strong>Unit of account (standard of value).</strong> Under barter, every good has a price in terms of every other good, which means far too many relative prices. Money gives one consistent way to measure value, since every price is stated in dollars.</li>
  <li><strong>Store of value.</strong> Money can be kept and used later, because people know it will still be accepted. Antiques and bonds also store value, but they aren’t as <em>liquid</em>, meaning as easily spent, as money.</li>
  <li><strong>Standard of deferred payment.</strong> Contracts for future payments, such as a loan to be repaid next year, can be written in money. Inflation weakens this function, since it reduces the value of money over time.</li>
</ul>
<p>Demand deposits in banks can perform all four functions (you can pay by cheque or transfer), so they count as money, along with notes and coins.</p>

<h2>13.2 The creation of money</h2>
<p><strong>Money creation</strong> is the process by which banks increase demand deposits when they use their excess reserves to make loans. When a bank lends, it opens a deposit for the borrower. That deposit is new money, and when it is spent it gets deposited in another bank, which can lend part of it again.</p>
<p>Banks can lend because depositors don’t all withdraw their money at the same time. So banks keep only a fraction of deposits as reserves: the <strong>fractional reserve banking system</strong>. They lend out the rest, and the money supply increases.</p>
<h3>Types of reserves</h3>
<ul>
  <li><strong>Required reserves (RR)</strong> are the minimum amount of deposits that banks must hold as reserves and cannot lend out. The amount depends on the <strong>reserve requirement ratio (RRR)</strong> set by the central bank: <strong>RR = RRR × deposits</strong>.</li>
  <li><strong>Excess reserves (ER)</strong> are reserves above the required amount: <strong>ER = total reserves − RR</strong>. Banks can lend out their ER, which earns them interest.</li>
</ul>
<h3>13.2.2 The credit creation process</h3>
<p>Assume Bank A has $1,000 in excess reserves, all other banks have none, banks lend out all their ER, the RRR is 20%, all payments are made by cheque, and no cash leaks out of the banking system.</p>
<div class="table-wrap"><table class="num">
  <thead><tr><th>Bank</th><th>Deposit</th><th>Required reserves</th><th>Excess reserves (lent out)</th></tr></thead>
  <tbody>
    <tr><td>A</td><td></td><td></td><td>$1,000</td></tr>
    <tr><td>B</td><td>$1,000</td><td>$200</td><td>$800</td></tr>
    <tr><td>C</td><td>$800</td><td>$160</td><td>$640</td></tr>
    <tr><td>D</td><td>$640</td><td>$128</td><td>$512</td></tr>
    <tr><td>All others</td><td>$2,560</td><td>$512</td><td>$2,048</td></tr>
    <tr><td><strong>Total</strong></td><td><strong>$5,000</strong></td><td><strong>$1,000</strong></td><td></td></tr>
  </tbody>
</table></div>
<p>Bank A lends its $1,000, which is spent and deposited in Bank B. Bank B keeps $200 and lends $800, which ends up in Bank C, and so on until no excess reserves are left. The money supply rises by a total of <strong>$5,000</strong>.</p>
<div class="formula">Money multiplier (MM) = <strong>1 ÷ RRR</strong> &nbsp;·&nbsp; Change in money supply: <strong>ΔMS = IER × MM = IER × (1 ÷ RRR)</strong></div>
<p>Here, MM = 1 ÷ 0.2 = 5, and ΔMS = $1,000 × 5 = $5,000. (IER is the initial excess reserves.)</p>
<div data-widget="credit"></div>

<h2>13.3 The role of the central bank</h2>
<p>A <strong>central bank</strong> provides financial and banking services to its government and commercial banks, carries out the government’s monetary policy, and issues currency. Singapore’s central bank is the <strong>Monetary Authority of Singapore (MAS)</strong>.</p>
<p>The MAS conducts monetary and exchange rate policy to promote steady, non-inflationary economic growth. It also regulates and supervises financial institutions (every bank, finance company and insurer needs an MAS licence), acts as the government’s banker, and manages part of Singapore’s official foreign reserves. Your notes mark the detail of these functions as “read this yourself (not tested)”.</p>
<p><strong>Monetary policy</strong> is the central bank’s use of changes in the money supply, and so in interest rates, to influence AD and achieve steady growth, full employment and stable prices.</p>

<h2>13.4 Monetary tools</h2>
<h3>Tool 1: reserve requirements</h3>
<p>The central bank sets the reserve requirement ratio, the percentage of deposits banks must hold as reserves.</p>
<ul>
  <li><strong>Raising the RRR:</strong> money that was excess reserves becomes required reserves, and the money multiplier (1 ÷ RRR) shrinks. Banks lend less, the <strong>money supply falls</strong>, and interest rates are pushed up.</li>
  <li><strong>Lowering the RRR:</strong> banks immediately have more excess reserves to lend, the multiplier grows, and the <strong>money supply rises</strong>.</li>
</ul>
<div class="note example">
  <p class="note-label">Worked example</p>
  <p>Initial excess reserves are $1,000. The RRR is cut from 20% to 10%, so the multiplier rises from 5 to 10. ΔMS = $1,000 × 10 = <strong>$10,000</strong>, double the $5,000 before.</p>
</div>
<p>Required reserves aren’t changed often, because even a small change in the RRR causes a large change in the money supply through the multiplier. Banks would have to keep adjusting their lending, which is disruptive.</p>
<h3>Tool 2: the discount rate (bank rate)</h3>
<p>The <strong>discount rate</strong> is the interest rate the central bank charges commercial banks when they borrow reserves from it. The name comes from charging the interest in advance: borrowing $100 at a 10% discount, a bank receives $90 and repays $100.</p>
<ul>
  <li><strong>Raising the discount rate</strong> makes borrowing reserves more costly, so banks become less aggressive about lending, and the <strong>money supply falls</strong>.</li>
  <li><strong>Lowering the discount rate</strong> encourages banks to borrow reserves and lend more, so the <strong>money supply rises</strong>.</li>
</ul>
<p>The MAS uses discount rate changes more as a <strong>signal</strong> of its policy direction than as a way to change the money supply. A higher rate tells banks not to let their reserves run low; a lower rate tells them borrowing is acceptable.</p>
<h3>Tool 3: open market operations</h3>
<p><strong>Open market operations</strong> are the central bank’s purchases and sales of government securities in the open market.</p>
<ul>
  <li><strong>Selling securities:</strong> buyers pay with bank deposits, so bank reserves fall. Banks cut lending and the <strong>money supply falls</strong>.</li>
  <li><strong>Buying securities:</strong> the central bank pays sellers, adding to bank reserves. Banks lend more and the <strong>money supply rises</strong>.</li>
</ul>
<p>Your notes say the MAS doesn’t use this tool because Singapore doesn’t have an active secondary market for securities.</p>
<h3>Tool 4: exchange rate policy</h3>
<p>The MAS buys and sells Singapore dollars to keep the money supply at the right level.</p>
<ul>
  <li><strong>MAS buys S$:</strong> more S$ is held by MAS and taken out of circulation, so the <strong>money supply falls</strong>.</li>
  <li><strong>MAS sells S$:</strong> more S$ goes into circulation, so the <strong>money supply rises</strong>.</li>
</ul>
<p>In practice, the exchange rate is the MAS’s main monetary policy tool: it manages the value of the Singapore dollar against a basket of currencies.</p>

<h2>13.5 The money market</h2>
<p>The <strong>money market</strong> brings together the demand for money and the supply of money. They set the <strong>interest rate</strong>, which is the price of money.</p>
<div class="table-wrap"><table>
  <thead><tr><th>Demand for money</th><th>Supply of money</th></tr></thead>
  <tbody>
    <tr><td>Individuals and firms (the non-bank public) who want to hold cash or deposits</td><td>The central bank (MAS), together with commercial banks’ credit creation</td></tr>
  </tbody>
</table></div>
<ul>
  <li>The <strong>demand for money</strong> curve slopes downward. The higher the interest rate, the less cash people want to hold, since they would rather put their wealth in interest-bearing assets such as bonds. The lower the rate, the more cash they hold.</li>
  <li>The <strong>money supply</strong> is the stock of money available at a particular time. It is set by the central bank’s policy, not by the interest rate, so the money supply curve is <strong>vertical</strong>.</li>
</ul>
<p>Equilibrium in the money market is where the demand for money curve crosses the money supply curve, giving the equilibrium interest rate.</p>

<h2>13.6 Monetary policy</h2>
<h3>13.6.1 Expansionary and contractionary monetary policy</h3>
<p>When the money supply changes, the interest rate changes.</p>
<div class="table-wrap"><table>
  <thead><tr><th></th><th>Expansionary monetary policy</th><th>Contractionary (restrictive) monetary policy</th></tr></thead>
  <tbody>
    <tr><td>Tools</td><td>RRR ↓, discount rate ↓, buy securities, sell S$</td><td>RRR ↑, discount rate ↑, sell securities, buy S$</td></tr>
    <tr><td>Chain</td><td>MS curve shifts right → interest rate ↓ → C and I ↑ → AD ↑ → output ↑ by a multiple</td><td>MS curve shifts left → interest rate ↑ → C and I ↓ → AD ↓ → output ↓ by a multiple</td></tr>
    <tr><td>When</td><td>During a recession</td><td>During an inflationary period</td></tr>
  </tbody>
</table></div>
<h3>13.6.2 How a change in the interest rate affects output</h3>
<p>Recall AD = C + I + G + (X − M). When the money supply rises and the interest rate falls:</p>
<ul>
  <li><strong>Investment</strong> rises, because borrowing for capital goods is cheaper: I ↑ → AD ↑ → output ↑.</li>
  <li><strong>Consumption</strong> rises, because consumers who buy on credit find it cheaper to borrow: C ↑ → AD ↑ → output ↑.</li>
</ul>
<p>Try the whole chain: pick a situation, then use one of the MAS’s tools.</p>
<div data-widget="moneymarket"></div>
`,
    terms: [
      ['Money', 'Anything generally accepted as payment for goods and services and for settling debts.'],
      ['Medium of exchange', 'The function of money as something accepted in payment for all transactions.'],
      ['Double coincidence of wants', 'The barter problem that a trade needs two people who each have what the other wants.'],
      ['Unit of account', 'The function of money as a common measure of the value of goods and services.'],
      ['Store of value', 'The function of money as something that can be kept and used to buy things later.'],
      ['Standard of deferred payment', 'The function of money as the measure in which future payments and debts are stated.'],
      ['Fractional reserve banking', 'A system in which banks keep only a fraction of deposits as reserves and lend out the rest.'],
      ['Required reserves', 'The minimum reserves banks must hold and cannot lend out: RRR × deposits.'],
      ['Reserve requirement ratio', 'The percentage of deposits banks must hold as reserves, set by the central bank.'],
      ['Excess reserves', 'Reserves above the required amount, which banks can lend out.'],
      ['Money multiplier', 'The number of times an increase in excess reserves is multiplied into deposits: 1 ÷ RRR.'],
      ['Central bank', 'A national bank that provides banking services to the government and commercial banks, carries out monetary policy and issues currency. In Singapore, the MAS.'],
      ['Monetary policy', 'The central bank’s use of changes in the money supply and interest rates to influence AD, output and prices.'],
      ['Discount rate', 'The interest rate the central bank charges commercial banks for borrowing reserves.'],
      ['Open market operations', 'The central bank’s buying and selling of government securities to change bank reserves and the money supply.'],
      ['Exchange rate policy', 'The central bank buying or selling its own currency to influence the money supply (and the exchange rate).'],
      ['Money market', 'Where the demand for money and the supply of money set the interest rate.'],
      ['Demand for money', 'The amount of money people want to hold as cash or deposits. It falls as the interest rate rises.'],
      ['Expansionary monetary policy', 'Increasing the money supply so interest rates fall, raising C, I, AD and output.'],
      ['Contractionary monetary policy', 'Reducing the money supply so interest rates rise, lowering C, I, AD and output.']
    ],
    review: [
      ['What are the four functions of money?', '<p>Medium of exchange, unit of account, store of value, and standard of deferred payment.</p>'],
      ['How are banks able to create money?', '<p>Under fractional reserve banking, banks keep only the required reserves and lend their excess reserves. Each loan is spent and deposited in another bank, which lends part of it again, so deposits (money) grow by a multiple of the original excess reserves.</p>'],
      ['What are the formulas for the money multiplier and the change in money supply?', '<p>MM = 1 ÷ RRR. ΔMS = IER × MM. With $1,000 of excess reserves and a 20% RRR: MM = 5 and ΔMS = $5,000.</p>'],
      ['What are the four monetary tools the central bank uses?', '<p>Reserve requirements (change the RRR), the discount rate, open market operations (buy or sell government securities) and exchange rate policy (buy or sell S$). Raising the RRR or discount rate, selling securities and buying S$ all cut the money supply; the opposite actions raise it.</p>'],
      ['What do the money demand and money supply curves look like, and what sets the interest rate?', '<p>Money demand slopes downward (people hold less cash when interest rates are high). Money supply is vertical, since the central bank fixes it regardless of the interest rate. The equilibrium interest rate is where they cross.</p>'],
      ['How does an expansionary or contractionary monetary policy affect the economy?', '<p>Expansionary: MS ↑ → interest rate ↓ → C and I ↑ → AD ↑ → output ↑ by a multiple (used in recessions). Contractionary: MS ↓ → interest rate ↑ → C and I ↓ → AD ↓ → output ↓ (used against inflation).</p>']
    ],
    blanks: [
      ['13.1', 'Basic idea of what money is', 'Anything generally accepted as payment for goods and services (and for settling debts).'],
      ['13.2.1', 'How do banks create money?', 'By lending out their excess reserves. The loans are spent and re-deposited in other banks, creating new deposits.'],
      ['13.2.1', 'As a result, money supply increases…', 'Money is created each time excess reserves are lent out and re-deposited (credit creation).'],
      ['13.2.1', 'Required reserves', 'The minimum amount of deposits banks must hold as reserves and cannot lend out.'],
      ['13.2.1', 'Required reserves formula', 'RR = RRR × deposits'],
      ['13.2.1', 'Excess reserves', 'ER = total reserves − required reserves'],
      ['13.2.2', 'Total increase in money supply', '$5,000 = $1,000 × (1 ÷ 0.2)'],
      ['13.2.2', 'Money multiplier formula', 'MM = 1 ÷ RRR'],
      ['13.2.2', 'Change in money supply formula', 'ΔMS = IER × MM = IER × (1 ÷ RRR)'],
      ['13.3', 'The Central Bank of Singapore: MAS', 'The MAS conducts monetary and exchange rate policy, issues currency, regulates and supervises financial institutions, and is banker to the government.'],
      ['13.3', 'Monetary policy', 'The central bank’s use of changes in the money supply (and so interest rates) to influence AD, and achieve steady, non-inflationary growth and full employment.'],
      ['13.4', 'Tool 1: reserve requirements', 'The central bank sets the RRR: the percentage of deposits banks must hold as reserves.'],
      ['13.4', 'Increasing RRR: result', 'ER ↓ and the money multiplier ↓ → bank lending ↓ → money supply ↓ → interest rate ↑'],
      ['13.4', 'RRR cut from 20% to 10%, IER $1,000', 'ΔMS = $1,000 × 10 = $10,000'],
      ['13.4', 'Why are required reserves not varied much?', 'Even a small change in the RRR causes a large change in the money supply through the multiplier.'],
      ['13.4', 'Tool 2: discount rate', 'The interest rate the central bank charges commercial banks when they borrow reserves from it.'],
      ['13.4', 'Increasing the discount rate: result', 'Borrowing reserves costs more → banks lend less → money supply ↓ → interest rate ↑'],
      ['13.4', 'Decreasing the discount rate: result', 'Borrowing reserves costs less → banks lend more → money supply ↑ → interest rate ↓'],
      ['13.4', 'The discount rate as a signal', 'Changes in the discount rate mainly signal the direction of monetary policy (an announcement effect).'],
      ['13.4', 'Tool 3: open market operations', 'The central bank’s buying and selling of government securities in the open market.'],
      ['13.4', 'Selling government securities: result', 'Bank reserves ↓ → lending ↓ → money supply ↓ → interest rate ↑'],
      ['13.4', 'Buying government securities: result', 'Bank reserves ↑ → lending ↑ → money supply ↑ → interest rate ↓'],
      ['13.4', 'MAS buys S$ / MAS sells S$', 'Buys: money supply ↓. Sells: money supply ↑.'],
      ['13.5', 'Connecting the sections', 'The demand for money and the supply of money (set by the central bank) together determine the interest rate: the price of money.'],
      ['13.5.1', 'Supply of money: who?', 'The central bank (MAS), together with commercial banks through credit creation.'],
      ['13.5.1', 'Price of money', 'The interest rate'],
      ['13.5.1', 'Recall (money supply)', 'The money supply is set by the central bank’s policy, not by the interest rate, so its curve is vertical.'],
      ['13.6.1', 'Contractionary monetary policy: after the interest rate rises…', 'C and I fall → AD falls → output falls by a multiple.'],
      ['13.6.2', 'Effect on investment', 'Interest rate ↓ → I ↑ → AD ↑ → output ↑ (by a multiple)'],
      ['13.6.2', 'Effect on consumption', 'Interest rate ↓ → C ↑ → AD ↑ → output ↑']
    ],
    quiz: [
      {
        q: 'Barter requires a double coincidence of wants. Which function of money solves this?',
        options: ['Store of value', 'Medium of exchange', 'Standard of deferred payment', 'Unit of account'],
        answer: 1,
        why: 'Because everyone accepts money in payment, you don’t need to find someone who wants exactly what you have.'
      },
      {
        q: 'Banks can lend out most of their deposits because:',
        options: [
          'The government guarantees all loans',
          'Depositors don’t all withdraw their money at the same time',
          'Banks print their own money',
          'Deposits are not money'
        ],
        answer: 1,
        why: 'That’s why banks only need to hold a fraction of deposits as reserves: fractional reserve banking.'
      },
      {
        q: 'The reserve requirement ratio is 20%. The money multiplier is:',
        options: ['0.2', '2', '5', '20'],
        answer: 2,
        why: 'MM = 1 ÷ RRR = 1 ÷ 0.2 = 5.'
      },
      {
        q: 'A bank has $2,000 of excess reserves and the RRR is 10%. The maximum increase in the money supply is:',
        options: ['$200', '$2,000', '$10,000', '$20,000'],
        answer: 3,
        why: 'ΔMS = IER × (1 ÷ RRR) = $2,000 × 10 = $20,000.'
      },
      {
        q: 'Which action by the central bank increases the money supply?',
        options: [
          'Raising the reserve requirement ratio',
          'Raising the discount rate',
          'Buying government securities',
          'Buying Singapore dollars'
        ],
        answer: 2,
        why: 'Buying securities pays money into the banking system, raising reserves and lending. The other three reduce the money supply.'
      },
      {
        q: 'The money supply curve is drawn vertical because:',
        options: [
          'People always want the same amount of money',
          'The money supply is set by the central bank, not by the interest rate',
          'Interest rates never change',
          'Banks refuse to lend when rates are low'
        ],
        answer: 1,
        why: 'At any moment the stock of money is fixed by policy, whatever the interest rate.'
      },
      {
        q: 'In an expansionary monetary policy, the correct order of effects is:',
        options: [
          'Interest rate ↑ → I ↓ → AD ↓ → output ↓',
          'Money supply ↑ → interest rate ↓ → C and I ↑ → AD ↑ → output ↑',
          'Taxes ↓ → disposable income ↑ → AD ↑',
          'Money supply ↓ → interest rate ↓ → output ↑'
        ],
        answer: 1,
        why: 'More money lowers the interest rate, which encourages borrowing for consumption and investment, so AD and output rise by a multiple.'
      },
      {
        q: 'To fight inflation, a central bank would most likely:',
        options: [
          'Lower the reserve requirement ratio',
          'Sell Singapore dollars',
          'Raise the discount rate',
          'Buy government securities'
        ],
        answer: 2,
        why: 'A higher discount rate makes borrowing reserves costlier, so banks lend less, the money supply falls and interest rates rise, cooling AD.'
      }
    ]
  }
);
