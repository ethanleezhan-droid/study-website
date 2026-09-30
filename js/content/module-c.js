/* Your module: Topics 8–10. Section numbers follow the student notes. */
ECON.lessons.push(
  {
    id: 'm-profit',
    unit: 'm',
    title: 'Profit Maximisation and Shutdown',
    summary: 'Total, average and marginal revenue, the MR = MC rule, and how a firm decides whether to keep producing or shut down.',
    minutes: 16,
    body: `
<h2>8.1 Profit maximisation in a firm</h2>
<h3>Total, average and marginal revenue</h3>
<p>Take the simplest case: a <strong>price taker</strong> (Topic 7) that can sell as much as it wants at a constant price, say $5 each.</p>
<div class="table-wrap"><table>
  <thead><tr><th>Measure</th><th>Meaning</th><th>Formula</th></tr></thead>
  <tbody>
    <tr><td>Total revenue (TR)</td><td>Total receipts from the sale of output</td><td>TR = P × Q</td></tr>
    <tr><td>Average revenue (AR)</td><td>Revenue per unit sold</td><td>AR = TR ÷ Q</td></tr>
    <tr><td>Marginal revenue (MR)</td><td>The addition to total revenue from selling one more unit</td><td>MR = ΔTR ÷ ΔQ</td></tr>
  </tbody>
</table></div>
<div class="table-wrap"><table class="num">
  <thead><tr><th>Quantity</th><th>Price</th><th>TR</th><th>AR</th><th>MR</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>$5</td><td>$5</td><td>$5</td><td>$5</td></tr>
    <tr><td>2</td><td>$5</td><td>$10</td><td>$5</td><td>$5</td></tr>
    <tr><td>3</td><td>$5</td><td>$15</td><td>$5</td><td>$5</td></tr>
  </tbody>
</table></div>
<p>For a price taker, every extra unit sells at the same price, so <strong>MR = AR = P</strong>. The TR curve is a straight line from the origin, and MR is a horizontal line at $5. That’s why Topic 7 labels the perfectly competitive firm’s demand curve D = P = AR = MR.</p>

<h3>The profit maximisation rule</h3>
<p>Because resources are scarce, a firm’s objective is to <strong>maximise profit</strong>, where <strong>profit = TR − TC</strong>. There are two ways to find the output that does this.</p>
<ul>
  <li><strong>TR − TC method.</strong> Profit is greatest where TR − TC is at a maximum: on a graph, where the <em>vertical distance</em> between the TR curve (above) and the TC curve (below) is greatest.</li>
  <li><strong>MR = MC method.</strong> Compare what each extra unit adds to revenue (MR) with what it adds to cost (MC).</li>
</ul>
<p>With the price at $5:</p>
<ul>
  <li>At <strong>6 units</strong>, MR ($5) &gt; MC ($3). One more unit adds more to revenue than to cost, so it <em>raises</em> profit. The firm should <strong>increase</strong> output.</li>
  <li>At <strong>12 units</strong>, MR ($5) &lt; MC ($7). One more unit adds more to cost than to revenue, so it <em>reduces</em> profit. The firm should <strong>decrease</strong> output.</li>
  <li>At <strong>9 units</strong>, MR = MC = $5. There’s no reason to change output: profit is maximised.</li>
</ul>
<div class="formula">Profit-maximising output is where <strong>MR = MC</strong></div>
<p>If the firm is already making a loss, the same rule gives the output where the loss is as small as possible, called the <strong>loss-minimising</strong> output.</p>
<div data-widget="profitmax"></div>

<h2>Keep producing, or shut down?</h2>
<p>Even at its best output, a firm can make a loss. To decide what to do, it looks at its profit or loss at that output. Remember:</p>
<ul>
  <li>TR = P × Q, and TC = ATC × Q (or TFC + TVC).</li>
  <li>So TR &gt; TC is the same as <strong>P &gt; ATC</strong>.</li>
</ul>
<div class="note example">
  <p class="note-label">Example from your notes: a sweet drinks stall</p>
  <p>You sell 100 cups a day. Stall rental is $100 a day: that’s your <strong>total fixed cost</strong>, since you pay it whether or not you open. If you open, a part-time worker, lights, water and ingredients cost $75 a day: your <strong>total variable cost</strong>, which you avoid if you don’t open.</p>
  <p>AFC = $100 ÷ 100 = <strong>$1.00</strong>. AVC = $75 ÷ 100 = <strong>$0.75</strong>. ATC = <strong>$1.75</strong>.</p>
</div>
<div class="table-wrap"><table>
  <thead><tr><th>Price per cup</th><th>TR</th><th>TC</th><th>Profit</th><th>Outcome</th><th>Decision</th></tr></thead>
  <tbody>
    <tr><td>$2.00</td><td>$200</td><td>$175</td><td>+$25</td><td>Economic profit (P &gt; ATC)</td><td>Produce: the stall earns more than it could elsewhere</td></tr>
    <tr><td>$1.75</td><td>$175</td><td>$175</td><td>$0</td><td>Normal profit (P = ATC)</td><td>Produce: all costs, including opportunity costs, are covered</td></tr>
    <tr><td>$1.00</td><td>$100</td><td>$175</td><td>−$75</td><td>Economic loss, but P &gt; AVC</td><td>Produce in the short run: losing $75 beats losing $100</td></tr>
    <tr><td>$0.50</td><td>$50</td><td>$175</td><td>−$125</td><td>Economic loss and P &lt; AVC</td><td>Shut down: losing $100 beats losing $125</td></tr>
  </tbody>
</table></div>
<p>When the firm makes a loss, don’t shut down straight away. Ask: <strong>can the price cover average variable cost?</strong></p>
<ul>
  <li><strong>Scenario 1: shut down.</strong> You don’t open, but you still pay the rent. Your loss = TFC = <strong>$100</strong>.</li>
  <li><strong>Scenario 2: P &gt; AVC</strong> ($1 per cup). TR = $100, TVC = $75. After paying the variable costs, $25 is left to put toward the rent, so your loss is only <strong>$75</strong>. Keep operating.</li>
  <li><strong>Scenario 3: P &lt; AVC</strong> ($0.50 per cup). TR = $50, which doesn’t even cover the $75 TVC. You lose $25 on operating plus the $100 rent: <strong>$125</strong>. Shut down and lose only $100.</li>
</ul>
<div data-widget="stall"></div>

<h3>Summary: the production decision</h3>
<div class="table-wrap"><table>
  <thead><tr><th>TR and TC</th><th>P and average cost</th><th>Outcome</th></tr></thead>
  <tbody>
    <tr><td>TR &gt; TC</td><td>P &gt; ATC</td><td>Economic profit: produce</td></tr>
    <tr><td>TR = TC</td><td>P = minimum ATC</td><td>Normal profit (the <strong>breakeven point</strong>): produce</td></tr>
    <tr><td>TR &lt; TC</td><td>P &lt; ATC but P &gt; AVC</td><td>Economic loss: <strong>continue to produce</strong> (loss minimisation)</td></tr>
    <tr><td>TR &lt; TC</td><td>P &lt; ATC and P = minimum AVC</td><td><strong>Indifferent</strong> (the <strong>shutdown point</strong>): the firm loses its full fixed cost either way</td></tr>
    <tr><td>TR &lt; TC</td><td>P &lt; ATC and P &lt; AVC</td><td><strong>Shut down</strong> (loss minimisation)</td></tr>
  </tbody>
</table></div>
`,
    terms: [
      ['Average revenue', 'Revenue per unit sold: TR ÷ Q. For a price taker it equals the price.'],
      ['Marginal revenue', 'The addition to total revenue from selling one more unit: ΔTR ÷ ΔQ. For a price taker it equals the price.'],
      ['Profit maximisation rule', 'A firm maximises profit (or minimises loss) by producing the output where marginal revenue equals marginal cost.'],
      ['Loss-minimising output', 'The output where MR = MC when the firm is making a loss: the loss is as small as it can be.'],
      ['Breakeven point', 'The point where price equals minimum average total cost, so TR = TC and the firm earns normal profit.'],
      ['Shutdown point', 'The point where price equals minimum average variable cost. Below it, a firm should stop producing in the short run.']
    ],
    review: [
      ['How do you calculate TR, AR and MR?', '<p>TR = P × Q. AR = TR ÷ Q. MR = ΔTR ÷ ΔQ. For a price taker selling at $5, TR rises by $5 per unit, so AR = MR = P = $5.</p>'],
      ['What are the two ways to find the profit-maximising output?', '<p>The TR − TC method (choose the output where the gap between TR and TC is largest) and the MR = MC method (expand while MR &gt; MC, cut back while MR &lt; MC, and stop where MR = MC).</p>'],
      ['How does a firm decide whether to keep operating or shut down?', '<p>Look at profit at the MR = MC output. If P ≥ ATC, produce. If P &lt; ATC but P &gt; AVC, keep producing in the short run, since revenue covers variable costs and part of fixed costs, so the loss is less than TFC. If P &lt; AVC, shut down: the loss is then just TFC. At P = minimum AVC the firm is indifferent (the shutdown point).</p>']
    ],
    blanks: [
      ['8.1', 'Total revenue formula', 'TR = P × Q'],
      ['8.1', 'Average revenue formula', 'AR = TR ÷ Q (for a price taker, AR = P)'],
      ['8.1', 'Marginal revenue formula', 'MR = ΔTR ÷ ΔQ (for a price taker, MR = P)'],
      ['8.1', 'Profit maximisation rule', 'Profit = TR − TC. The firm produces the output that makes TR − TC as large as possible, which is where MR = MC.'],
      ['8.1', 'At which output does the firm have no more reason to adjust output?', 'Where MR = MC (9 units in the example).'],
      ['8.1', 'Economic profit: produce or shut down? Reason', 'Produce. TR is more than TC, so the firm earns more than it could elsewhere.'],
      ['8.1', 'Normal profit: produce or shut down? Reason', 'Produce. TR covers all costs, including the opportunity cost of the owner’s resources, so the firm does as well as in its next best alternative.'],
      ['8.1', 'Economic loss: produce or shut down?', 'It depends on whether price covers average variable cost.'],
      ['8.1', 'Price can cover AVC: produce. Why?', 'Revenue pays all the variable costs and part of the fixed cost, so the loss is smaller than TFC, which is what the firm would lose by shutting down.'],
      ['8.1', 'Price cannot cover AVC: shut down. Why?', 'Operating would lose all of TFC plus the part of TVC that revenue can’t cover. Shutting down limits the loss to TFC.']
    ],
    quiz: [
      {
        q: 'A price taker sells 40 units at $5 each. Its total revenue and marginal revenue are:',
        options: ['TR $200, MR $5', 'TR $45, MR $5', 'TR $200, MR $40', 'TR $8, MR $200'],
        answer: 0,
        why: 'TR = P × Q = $5 × 40 = $200. For a price taker, each extra unit adds the price to revenue, so MR = $5.'
      },
      {
        q: 'Average revenue is calculated as:',
        options: ['ΔTR ÷ ΔQ', 'TR ÷ Q', 'TR − TC', 'P × Q'],
        answer: 1,
        why: 'AR is revenue per unit: TR ÷ Q. ΔTR ÷ ΔQ is marginal revenue.'
      },
      {
        q: 'At its current output, a firm’s MR is $5 and its MC is $3. To increase profit, it should:',
        options: ['Increase output', 'Decrease output', 'Keep output the same', 'Shut down'],
        answer: 0,
        why: 'The next unit adds $5 to revenue but only $3 to cost, so producing it raises profit.'
      },
      {
        q: 'A profit-maximising firm produces where:',
        options: ['TR is highest', 'MR = MC', 'ATC is lowest', 'Price is highest'],
        answer: 1,
        why: 'At MR = MC, one more unit would add no more to revenue than to cost, so profit (TR − TC) is at its maximum.'
      },
      {
        q: 'Price is $1.75 and ATC at the profit-maximising output is $1.75. The firm earns:',
        options: ['Economic profit', 'Normal profit', 'An economic loss', 'Supernormal profit'],
        answer: 1,
        why: 'P = ATC means TR = TC: normal profit, the breakeven point.'
      },
      {
        q: 'A firm’s price is below ATC but above AVC. In the short run it should:',
        options: [
          'Shut down immediately',
          'Keep producing, because its loss is smaller than its fixed cost',
          'Raise its price above the market price',
          'Double its output'
        ],
        answer: 1,
        why: 'Revenue covers all variable costs and part of the fixed costs, so producing loses less than shutting down (which loses all of TFC).'
      },
      {
        q: 'The sweet drinks stall has TFC = $100 and TVC = $75 for 100 cups. At $0.50 a cup, what should it do?',
        options: [
          'Open: it makes a profit',
          'Open: it loses $75',
          'Shut down: opening loses $125, shutting loses $100',
          'Shut down: opening loses $50'
        ],
        answer: 2,
        why: 'TR = $50, which doesn’t cover the $75 TVC. Opening loses $25 + $100 = $125; shutting down loses only the $100 rent.'
      },
      {
        q: 'The shutdown point is where price equals:',
        options: ['Minimum ATC', 'Minimum AVC', 'Minimum AFC', 'Maximum MR'],
        answer: 1,
        why: 'At P = minimum AVC, the firm loses its full fixed cost whether it produces or not, so it is indifferent. Below it, it should shut down.'
      }
    ]
  },

  {
    id: 'm-unemployment',
    unit: 'm2',
    title: 'Unemployment and Inflation',
    summary: 'The labour force, the unemployment rate, types of unemployment, full employment, the causes and costs of inflation, and the CPI.',
    minutes: 20,
    body: `
<h2>Introduction</h2>
<p>Every economy has ups and downs. To judge how healthy an economy is, we look at <strong>economic indicators</strong>. Three of the most important are the unemployment rate, the inflation rate (this topic) and gross domestic product (Topic 10).</p>

<h2>9.1 Unemployment</h2>
<p><strong>Unemployment</strong> is when a person who is actively searching for a job is unable to find work. To measure it, the population is divided up like this:</p>
<div class="table-wrap"><table>
  <thead><tr><th colspan="3">Total population</th></tr></thead>
  <tbody>
    <tr><td><strong>Under 15 and institutionalised</strong><br>Not working because they are underage, or mentally or physically unable to work</td><td colspan="2"><strong>Working-age population (15 and above)</strong></td></tr>
    <tr><td></td><td><strong>Economically inactive</strong><br>Can work but are neither working nor looking for work, such as retirees and students<br><em>Outside the labour force</em></td><td><strong>Economically active</strong><br>Either employed, or unemployed (not working but actively looking for work)<br><em>The labour force</em></td></tr>
  </tbody>
</table></div>

<h3>9.1.1 The unemployment rate and the labour force participation rate</h3>
<div class="formula">Unemployment rate = <strong>number unemployed ÷ labour force × 100%</strong></div>
<div class="formula">Labour force participation rate = <strong>labour force ÷ working-age population (15 and above) × 100%</strong></div>
<div class="note example">
  <p class="note-label">Example from your notes: Singapore, 2016</p>
  <p>Employed: 3,570,000. Unemployed: 102,800. Labour force: 3,672,800.</p>
  <p>Unemployment rate = 102.8 ÷ 3,672.8 × 100% = <strong>2.8%</strong>.</p>
  <p>To get the participation rate you’d need the population aged 15 and above, not the total population (5,607,300), because children aren’t part of the working-age population.</p>
</div>
<div data-widget="labour"></div>

<h3>9.1.2 Types of unemployment</h3>
<div class="table-wrap"><table>
  <thead><tr><th>Type</th><th>Cause</th><th>Key features</th><th>Solution</th></tr></thead>
  <tbody>
    <tr><td><strong>Frictional</strong></td><td>The normal search time for people changing jobs, entering the labour force for the first time, or re-entering it. Search takes time because job information is imperfect.</td><td>Temporary and voluntary. There are enough jobs; it just takes time to match workers to them. Leads to better matches.</td><td>Better ways of spreading job information, such as online job listings</td></tr>
    <tr><td><strong>Structural</strong></td><td>A mismatch between the skills of unemployed workers and the skills needed for the jobs available. Caused by technological change, or by changes in demand as new industries grow and old ones disappear.</td><td>Long term. There are enough jobs, but workers don’t have the right skills.</td><td>Retraining and re-education; relocating to where the skills are needed</td></tr>
    <tr><td><strong>Cyclical</strong></td><td>A lack of jobs caused by a downturn in the business cycle. In a recession, spending falls, less is produced and fewer workers are needed.</td><td>Unpredictable and involuntary. There aren’t enough jobs because output is low.</td><td>Government action to bring the economy out of recession (Topics 12 and 13)</td></tr>
    <tr><td><strong>Seasonal</strong></td><td>Seasonal changes in employment, as in crop growing or skiing</td><td>Unavoidable in some industries; workers must look for new jobs when the season ends. Often counted as a kind of frictional unemployment.</td><td>–</td></tr>
  </tbody>
</table></div>

<h3>9.1.3 Limitations of the official unemployment rate</h3>
<p>The unemployment rate is the best-known measure of the labour market and moves closely with the business cycle. But some people don’t fit neatly into the definition of unemployed:</p>
<ul>
  <li><strong>Underemployment:</strong> resources working below their capacity. For example, a person who takes a job far below what they are trained for, or who wants to work full time but can only get a shorter work week.</li>
  <li><strong>Discouraged workers:</strong> people who were unemployed but have given up looking after repeatedly failing to find a job. They drop out of the official unemployed <em>and</em> out of the labour force.</li>
</ul>
<p>So the official unemployment rate <strong>understates</strong> the real problem when there are underemployed and discouraged workers.</p>

<h3>9.1.4 Full employment and the natural rate of unemployment</h3>
<p>In Topic 1, full employment meant producing on the PPC with all resources in use. Here we refine it, because it isn’t realistic for everyone who wants to work to be employed at every moment.</p>
<p>An economy is at <strong>full employment</strong> when anyone who wants to work a full-time week can find work. Unemployment is <strong>not zero</strong>: the unemployment rate at full employment is called the <strong>natural rate of unemployment</strong>.</p>
<p>At full employment, only <strong>frictional and structural</strong> unemployment exist, because both happen even when there are enough jobs. (Seasonal unemployment is usually counted as part of frictional unemployment here.) <strong>Cyclical unemployment must be zero.</strong></p>

<h2>9.2 Inflation</h2>
<p><strong>Inflation</strong> is a sustained and continuous increase in the general (average) level of prices of goods and services. Not every price has to rise at the same time. <strong>Deflation</strong> is a decrease in the general price level.</p>

<h3>9.2.1 Causes of inflation</h3>
<p>Inflation is classified by whether prices are rising because aggregate demand (AD) rose or aggregate supply (AS) fell.</p>
<ul>
  <li>The <strong>AD curve</strong> shows total spending in the country. It has four components: <strong>AD = C + I + G + (X − M)</strong>, meaning consumption, investment, government spending, and exports minus imports.</li>
  <li>The <strong>AS curve</strong> shows total production in the country at each price level.</li>
</ul>
<p><strong>A. Demand-pull inflation</strong> is a rise in the general price level caused by an excess of total spending. AD shifts right, giving a higher price level and higher output. It usually happens when the economy is close to full employment, so firms can’t raise output fast enough to meet the extra spending.</p>
<p><strong>B. Cost-push inflation</strong> is a rise in the general price level caused by a rise in production costs. AS shifts left, giving a higher price level and <em>lower</em> output. Costs can rise because of higher wages, higher rents, dearer raw materials such as coal, petroleum and natural gas, or a weaker exchange rate, which makes imported inputs more expensive.</p>
<div data-widget="adas" data-preset="m-inflation"></div>

<h3>9.2.2 Measuring inflation: the Consumer Price Index</h3>
<p>The <strong>Consumer Price Index (CPI)</strong> measures changes in the average prices of consumer goods and services. It is sometimes called the cost-of-living index. It includes only consumer goods and services, so it shows how rising prices affect consumers’ incomes. It is calculated by comparing the cost of a fixed <em>basket</em> of goods in the current year with its cost in a chosen <em>base year</em>.</p>
<div class="formula">CPI = <strong>cost of basket in current year ÷ cost of the same basket in base year × 100</strong></div>
<div class="note example">
  <p class="note-label">Example from your notes: oranges and haircuts</p>
  <div class="table-wrap"><table class="num">
    <thead><tr><th>Item</th><th>Quantity</th><th>2014 price</th><th>2014 cost</th><th>2015 price</th><th>2015 cost</th></tr></thead>
    <tbody>
      <tr><td>Oranges</td><td>10</td><td>$1.00</td><td>$10</td><td>$2.00</td><td>$20</td></tr>
      <tr><td>Haircuts</td><td>5</td><td>$8.00</td><td>$40</td><td>$10.00</td><td>$50</td></tr>
      <tr><td><strong>Total</strong></td><td></td><td></td><td><strong>$50</strong></td><td></td><td><strong>$70</strong></td></tr>
    </tbody>
  </table></div>
  <p>2014 is the base year, and the quantities are held at base-year levels.</p>
  <p>CPI 2014 = $50 ÷ $50 × 100 = <strong>100</strong>. CPI 2015 = $70 ÷ $50 × 100 = <strong>140</strong>.</p>
</div>
<p><strong>Reading an index:</strong> the base year is always 100. Above 100 means prices are higher than in the base year; below 100 means they’re lower.</p>
<div class="formula">Inflation rate = <strong>(CPI current year − CPI previous year) ÷ CPI previous year × 100%</strong></div>
<p>Here, (140 − 100) ÷ 100 × 100% = <strong>40%</strong>.</p>
<div data-widget="inflation" data-preset="basket"></div>

<h3>9.2.3 Consequences of inflation</h3>
<p>Inflation reduces the <strong>purchasing power</strong> of money, and so a person’s standard of living. The higher the inflation rate, the less a given money income can buy. Purchasing power is measured by <strong>real income</strong>:</p>
<div class="formula">Real income = <strong>money income ÷ CPI × 100</strong></div>
<p>For example, with a money income of $40,000 and a CPI of 167, real income = $40,000 ÷ 1.67 = <strong>$23,952</strong> in base-year dollars.</p>
<div class="table-wrap"><table>
  <thead><tr><th>Inflation penalises…</th><th>Why</th></tr></thead>
  <tbody>
    <tr><td>Fixed-income earners, such as pensioners</td><td>Their money income stays the same, so when prices rise their real income definitely falls.</td></tr>
    <tr><td>Savers</td><td>Especially when the interest they earn is below the inflation rate.</td></tr>
    <tr><td>Creditors (lenders)</td><td>If they didn’t anticipate inflation and charged a low interest rate, the money they’re repaid is worth less than the money they lent.</td></tr>
  </tbody>
</table></div>
<div class="table-wrap"><table>
  <thead><tr><th>Inflation benefits…</th><th>Why</th></tr></thead>
  <tbody>
    <tr><td>Debtors (borrowers)</td><td>They repay loans with money that has less purchasing power than when they borrowed it.</td></tr>
    <tr><td>Flexible-income earners, such as unionised workers whose pay is indexed to inflation</td><td>Their income rises with prices.</td></tr>
  </tbody>
</table></div>

<h3>9.2.4 Limitations of the CPI</h3>
<p>The CPI isn’t a perfect measure of the cost of living. It can overstate or understate inflation:</p>
<ul>
  <li><strong>It ignores substitution.</strong> The basket is fixed at base-year quantities, but in reality people buy more of goods that have become relatively cheaper and less of those that are dearer. So the CPI tends to <strong>overstate</strong> inflation.</li>
  <li><strong>It ignores quality improvements.</strong> A new computer may cost more but be much better. Part of the higher price reflects better quality, not just a price rise, so the CPI tends to <strong>overstate</strong> inflation.</li>
  <li><strong>It isn’t fully representative.</strong> Your own basket may differ from the typical one. If the prices of what you buy rise faster than the CPI basket, the CPI <strong>understates</strong> your inflation; if they rise more slowly, it <strong>overstates</strong> it.</li>
</ul>
`,
    terms: [
      ['Unemployment', 'The situation when a person who is actively searching for a job is unable to find work.'],
      ['Labour force', 'The economically active population: everyone aged 15 and above who is employed or unemployed (actively looking for work).'],
      ['Economically inactive population', 'People of working age who can work but are neither working nor looking for work, such as retirees and students.'],
      ['Unemployment rate', 'The proportion of the labour force that is unemployed: unemployed ÷ labour force × 100%.'],
      ['Labour force participation rate', 'The proportion of the population aged 15 and above that is in the labour force.'],
      ['Frictional unemployment', 'Temporary, voluntary unemployment during the normal search for a job, caused by imperfect job information.'],
      ['Structural unemployment', 'Long-term unemployment caused by a mismatch between workers’ skills and the skills needed for available jobs.'],
      ['Cyclical unemployment', 'Involuntary unemployment caused by a lack of jobs during a downturn in the business cycle.'],
      ['Seasonal unemployment', 'Unemployment caused by seasonal changes in employment, as in crop growing or skiing.'],
      ['Underemployment', 'When resources work below their capacity, such as a worker in a job far below their training or working fewer hours than they want.'],
      ['Discouraged worker', 'Someone who has given up looking for work after repeatedly failing to find a job, and so is no longer counted in the labour force.'],
      ['Full employment', 'When anyone who wants to work a full-time week can find work. Only frictional and structural unemployment exist.'],
      ['Natural rate of unemployment', 'The unemployment rate at full employment, made up of frictional and structural unemployment.'],
      ['Inflation', 'A sustained and continuous increase in the general (average) level of prices of goods and services.'],
      ['Deflation', 'A decrease in the general (average) price level of goods and services.'],
      ['Demand-pull inflation', 'A rise in the general price level caused by an excess of total spending (AD shifts right).'],
      ['Cost-push inflation', 'A rise in the general price level caused by a rise in the cost of production (AS shifts left).'],
      ['Consumer Price Index', 'An index of the average prices of a fixed basket of consumer goods and services, compared with a base year (base year = 100).'],
      ['Base year', 'The year chosen as the reference point for an index. Its index value is always 100.'],
      ['Real income', 'Income adjusted for inflation, measuring purchasing power: money income ÷ CPI × 100.']
    ],
    review: [
      ['Who makes up a country’s labour force?', '<p>The economically active population aged 15 and above: the employed plus the unemployed who are actively looking for work.</p>'],
      ['How do you calculate the unemployment rate and the labour force participation rate?', '<p>Unemployment rate = unemployed ÷ labour force × 100%. Participation rate = labour force ÷ population aged 15 and above × 100%. Singapore 2016: 102.8 ÷ 3,672.8 = 2.8%.</p>'],
      ['How do you identify the types of unemployment, and what are their solutions?', '<p>Frictional: between jobs because of imperfect information (fix: better job information). Structural: skills mismatch from technological or demand changes (fix: retraining, relocation). Cyclical: too few jobs in a recession (fix: government policy to raise AD). Seasonal: work that ends with the season.</p>'],
      ['What are the limitations of the official unemployment rate?', '<p>It misses underemployed workers (in jobs below their skills, or part time when they want full time) and discouraged workers (who have stopped looking and left the labour force), so it understates the real problem.</p>'],
      ['What does full employment mean?', '<p>Anyone who wants a full-time job can find one. Unemployment is at its natural rate, made up only of frictional and structural unemployment; cyclical unemployment is zero.</p>'],
      ['How do you compute a CPI?', '<p>Cost of the base-year basket at current-year prices ÷ its cost at base-year prices × 100. Oranges and haircuts: $70 ÷ $50 × 100 = 140.</p>'],
      ['How do you calculate the inflation rate?', '<p>(CPI this year − CPI last year) ÷ CPI last year × 100%. From 100 to 140 is 40%.</p>'],
      ['Who gains and who loses from inflation?', '<p>Losers: fixed-income earners, savers (especially if interest is below inflation) and creditors. Winners: debtors and flexible-income earners whose pay is indexed to inflation.</p>'],
      ['What are the limitations of the CPI?', '<p>It ignores substitution (overstates), ignores quality improvements (overstates), and isn’t representative of everyone’s basket (can over- or understate).</p>']
    ],
    blanks: [
      ['9.1.1', 'Formula for the unemployment rate', 'Unemployment rate = number unemployed ÷ labour force × 100%'],
      ['9.1.1', 'Calculate Singapore’s unemployment rate in 2016', '102.8 ÷ 3,672.8 × 100% = 2.8%'],
      ['9.1.1', 'Formula for the labour force participation rate', 'Labour force ÷ working-age population (15 and above) × 100%'],
      ['9.1.4', 'In full employment, cyclical unemployment must be…', 'Zero.'],
      ['9.2.1', 'Note (demand-pull inflation)', 'It usually happens when the economy is near full employment, so output can’t rise fast enough to meet the extra spending, and prices are pulled up.'],
      ['9.2.2', 'What the CPI is used for', 'To measure changes in the cost of living, and to calculate the inflation rate.'],
      ['9.2.2', 'CPI formula', 'CPI = cost of basket in current year ÷ cost of basket in base year × 100'],
      ['9.2.2', 'CPI for 2014', '$50 ÷ $50 × 100 = 100'],
      ['9.2.2', 'CPI for 2015', '$70 ÷ $50 × 100 = 140'],
      ['9.2.2', 'Inflation rate formula', '(CPI current year − CPI previous year) ÷ CPI previous year × 100%. Here: (140 − 100) ÷ 100 × 100% = 40%.'],
      ['9.2.3', 'Real income =', 'Money income ÷ CPI × 100 (for example, $40,000 ÷ 1.67 = $23,952)']
    ],
    quiz: [
      {
        q: 'A retiree who is not looking for work is:',
        options: ['Unemployed', 'Economically inactive (outside the labour force)', 'A discouraged worker', 'Underemployed'],
        answer: 1,
        why: 'They can work but are neither working nor looking, so they’re outside the labour force.'
      },
      {
        q: 'A country has 3,000 employed and 150 unemployed (figures in thousands). Its unemployment rate is:',
        options: ['4.8%', '5.0%', '5.3%', '150%'],
        answer: 0,
        why: 'Labour force = 3,000 + 150 = 3,150. Unemployment rate = 150 ÷ 3,150 × 100% ≈ 4.8%.'
      },
      {
        q: 'Bank tellers lose their jobs as banking moves online and their skills aren’t needed elsewhere. This is:',
        options: ['Frictional unemployment', 'Structural unemployment', 'Cyclical unemployment', 'Seasonal unemployment'],
        answer: 1,
        why: 'Technological change has created a mismatch between their skills and the jobs available. The solution is retraining.'
      },
      {
        q: 'Which type of unemployment is zero at full employment?',
        options: ['Frictional', 'Structural', 'Cyclical', 'All of them'],
        answer: 2,
        why: 'Frictional and structural unemployment exist even when there are enough jobs. Cyclical unemployment only happens in downturns.'
      },
      {
        q: 'Discouraged workers cause the official unemployment rate to:',
        options: ['Overstate unemployment', 'Understate unemployment', 'Be perfectly accurate', 'Fall to zero'],
        answer: 1,
        why: 'They have stopped looking, so they aren’t counted as unemployed, even though they want jobs.'
      },
      {
        q: 'A sharp rise in world oil prices raises firms’ costs. The resulting inflation is:',
        options: ['Demand-pull, with higher output', 'Cost-push, with lower output', 'Demand-pull, with lower output', 'Deflation'],
        answer: 1,
        why: 'Higher costs shift AS left: the price level rises and output falls.'
      },
      {
        q: 'A basket costs $50 in the base year and $60 this year. The CPI this year is:',
        options: ['60', '110', '120', '83'],
        answer: 2,
        why: 'CPI = $60 ÷ $50 × 100 = 120. Prices are 20% higher than in the base year.'
      },
      {
        q: 'Unexpected inflation tends to benefit:',
        options: ['Pensioners on fixed incomes', 'Savers', 'Creditors', 'Debtors'],
        answer: 3,
        why: 'Debtors repay their loans with money that buys less than when they borrowed it.'
      }
    ]
  },

  {
    id: 'm-gdp',
    unit: 'm2',
    title: 'GDP and Business Cycles',
    summary: 'What GDP counts and leaves out, nominal and real GDP, the three approaches, per capita GDP, and the phases of the business cycle.',
    minutes: 20,
    body: `
<h2>Introduction</h2>
<p>Every government wants to know whether its economy is growing or slowing down. That is usually measured by the country’s output of goods and services, and the value of that output is its <strong>gross domestic product</strong> (GDP).</p>

<h2>10.1 The concept of GDP</h2>
<p><strong>GDP is the total market value of all final goods and services produced within a country’s borders in a given period, usually a year.</strong> Five points follow from this definition.</p>
<h3>(a) Only final goods count</h3>
<p><em>Intermediate goods</em> are bought for further processing, as inputs to make other goods. <em>Final goods</em> are goods bought by the end user for consumption, not for further processing. We count the finished cake, not the eggs, flour and sugar that went into it. Adding both would be <strong>double counting</strong> and would overstate GDP.</p>
<h3>(b) Only new, current output counts</h3>
<p>These are excluded because there is no current output:</p>
<ul>
  <li><strong>Old output</strong>, such as the sale of a resale HDB flat or a second-hand car. It was already counted when it was produced.</li>
  <li><strong>Paper transactions</strong>, such as buying and selling shares and bonds. Only ownership changes.</li>
  <li><strong>Purely financial transactions</strong>, such as monetary gifts between a government and its people, or between governments. Funds are just transferred.</li>
</ul>
<p>The <em>services</em> of banks, second-hand car dealers and brokers in these deals <strong>are</strong> included, because their commissions and fees pay for a service produced this year.</p>
<h3>(c) Some current output is left out</h3>
<ul>
  <li><strong>Illegal activities</strong> in the underground economy, such as illegal gambling and drug trafficking, because they are impossible to track.</li>
  <li><strong>Non-marketed activities</strong>, such as housework and do-it-yourself jobs, because there’s no market price to value them with.</li>
</ul>
<h3>(d) GDP counts output by all factors of production in the country</h3>
<p>GDP counts what is produced <strong>in</strong> the country, whether by locals or foreigners: it is a <em>geographical</em> measure. <strong>Gross national product</strong> (GNP) counts what is produced by the country’s <strong>residents</strong>, wherever they are: it is a <em>residential</em> measure.</p>
<div class="formula"><strong>GNP = GDP + net factor receipts</strong>, where net factor receipts = earnings of residents from abroad − earnings of non-residents in the country</div>
<p>For Singapore: GNP = GDP + (Singaporeans’ earnings abroad) − (foreigners’ earnings in Singapore).</p>
<h3>(e) GDP is valued at current market prices</h3>
<p>Output in each year is valued at that year’s actual prices. This is <strong>money GDP</strong> (also called nominal GDP, or GDP at current market prices):</p>
<div class="formula">Money GDP<sub>2015</sub> = P<sub>2015</sub> × Q<sub>2015</sub></div>
<p>The problem: if money GDP changes, you can’t tell whether prices changed, output changed, or both.</p>
<div class="table-wrap"><table class="num">
  <thead><tr><th>Year</th><th>Price of chicken rice</th><th>Plates produced</th><th>Money GDP</th></tr></thead>
  <tbody>
    <tr><td>2015</td><td>$4</td><td>100,000</td><td>$400,000</td></tr>
    <tr><td>2016</td><td>$6</td><td>80,000</td><td>$480,000</td></tr>
  </tbody>
</table></div>
<p>Money GDP rose, but output actually <em>fell</em>. Society is better off only if GDP rises because <strong>output</strong> rises. Real GDP solves this.</p>

<h2>10.2 Real GDP</h2>
<p><strong>Real GDP</strong> measures a nation’s output valued at <strong>base-year prices</strong>.</p>
<p><strong>Method 1: using base-year prices.</strong></p>
<div class="formula">Real GDP<sub>current year</sub> = P<sub>base year</sub> × Q<sub>current year</sub></div>
<p>With 2015 as the base year, real GDP in 2016 = $4 × 80,000 = <strong>$320,000</strong>. Because price is held at $4, the fall from $400,000 to $320,000 must be a fall in output.</p>
<p><strong>Method 2: using the GDP deflator.</strong> The <strong>GDP deflator</strong> is a price index for all new, domestically produced, final goods and services. It is broader than the CPI, which covers only consumer goods.</p>
<div class="formula">Real GDP = <strong>money GDP ÷ GDP deflator × 100</strong> &nbsp;·&nbsp; GDP deflator = <strong>money GDP ÷ real GDP × 100</strong></div>
<p>Singapore, 2015: money GDP $402.5 billion, deflator 103.5, so real GDP = $402.5b ÷ 1.035 = <strong>$388.89 billion</strong>.</p>
<p><strong>The economic growth rate</strong> compares real GDP over time:</p>
<div class="formula">Economic growth rate = <strong>(real GDP<sub>current year</sub> − real GDP<sub>previous year</sub>) ÷ real GDP<sub>previous year</sub> × 100%</strong></div>
<div data-widget="gdp"></div>

<h2>10.3 Three approaches to estimating GDP</h2>
<ul>
  <li><strong>Output (product) approach:</strong> add up the value of goods and services produced by each industry, using the value-added method.</li>
  <li><strong>Income approach:</strong> add up all incomes earned by the factors of production: wages and salaries (labour), rent (land), interest (capital) and profit (entrepreneurship).</li>
  <li><strong>Expenditure approach</strong> (the focus of this module): add up total spending on goods and services:
    <ul>
      <li><strong>C, consumption:</strong> household spending on durable goods (except houses), perishables and services.</li>
      <li><strong>I, investment:</strong> spending on residential property (houses), non-residential property (factories, machinery) and changes in inventories.</li>
      <li><strong>G, government expenditure</strong> on goods and services.</li>
      <li><strong>X − M, net exports:</strong> the foreign sector.</li>
    </ul>
  </li>
</ul>
<div class="formula">GDP (national expenditure) = <strong>C + I + G + (X − M)</strong></div>
<p>All three methods give the same value, because whatever is spent is received as income by someone else. That’s why income (Y) and output (Q) are used interchangeably: <strong>output = income = expenditure</strong>.</p>

<h2>10.4 Limitations of GDP</h2>
<p>GDP measures output. It is often used as a measure of living standards, but it is <strong>not</strong> a good indicator of quality of life:</p>
<ol type="a">
  <li><strong>It isn’t a complete measure of output.</strong> Illegal and non-marketed activities are left out, and some countries have a large informal sector.</li>
  <li><strong>It ignores leisure.</strong> If GDP rises because people work longer hours, they may be worse off.</li>
  <li><strong>It ignores the costs of growth.</strong> More output can mean more pollution and other social problems.</li>
  <li><strong>It ignores quality.</strong> The portion of chicken rice could be shrinking while its price stays the same.</li>
  <li><strong>It ignores how income is distributed.</strong> If the gains go to a small group, most people aren’t better off.</li>
  <li><strong>It is measured at current market prices.</strong> A rise could be purely inflation (use real GDP instead).</li>
  <li><strong>It ignores population growth.</strong> If population grows faster than GDP, the average person is worse off.</li>
</ol>
<h3>Per capita GDP</h3>
<div class="formula">Per capita GDP = <strong>GDP ÷ population</strong></div>
<p>Per capita GDP is output per person, which makes it a better measure of living standards than total GDP. Between 2003 and 2008, America’s real GDP grew faster than Japan’s (2.9% vs 2.1% a year), but America’s population grew much faster, so Japan’s GDP per person grew slightly faster (2.1% vs 1.9%).</p>
<p>It still has limitations. It’s only an <strong>average</strong>, so some people earn much more and others much less. And because it’s built from GDP, it shares limitations (a) to (f); it fixes only (g).</p>

<h2>10.5 Business cycles</h2>
<p>A <strong>business cycle</strong> is the periodic but irregular up-and-down movement in economic activity that goes with rises and falls in real GDP. Every cycle has four phases, always in this order:</p>
<div data-widget="cycle"></div>
<div class="table-wrap"><table>
  <thead><tr><th></th><th>Recession</th><th>Trough</th><th>Recovery</th><th>Peak</th></tr></thead>
  <tbody>
    <tr><td>Features</td><td>The declining phase. A <strong>technical recession</strong> means 2 consecutive quarters of negative economic growth.</td><td>The lowest point. The contraction bottoms out and turns around.</td><td>The expanding phase.</td><td>The highest point.</td></tr>
    <tr><td>Implications</td><td>Real GDP falls; unemployment rises.</td><td>Real GDP at its minimum; unemployment at its highest compared with recent years.</td><td>Real GDP rises; unemployment falls.</td><td>Real GDP at its highest compared with recent years; the economy is close to full employment.</td></tr>
  </tbody>
</table></div>
<h3>Causes of a recession</h3>
<ul>
  <li><strong>A fall in AD</strong> (C, I, G or X − M). AD shifts left: output and employment fall, and the price level falls too.</li>
  <li><strong>A fall in AS</strong> because production costs rise. AS shifts left: output and employment fall, but the price level <em>rises</em>. High unemployment and high prices together is called <strong>stagflation</strong>.</li>
</ul>
<h3>Recovery</h3>
<p>Recovery is the expanding phase: output, employment and income rise again. It should target the cause of the recession: if AD fell, raise AD; if AS fell, raise AS.</p>
<ul>
  <li><strong>A rise in AD</strong>, usually through higher I or G. Output, employment and income rise, and demand-pull inflation can follow.</li>
  <li><strong>A rise in AS</strong>, from lower factor prices or higher productivity that cut production costs. Output and employment rise and the price level falls.</li>
</ul>
<div data-widget="adas" data-preset="m-cycle"></div>
<div class="note example">
  <p class="note-label">Singapore, 2008–09 (from your notes)</p>
  <p>The US subprime crisis pushed Singapore into recession. Firms cut jobs, froze wages and hiring, and shortened working hours. The government responded on both sides. To raise <strong>AD</strong>, the Resilience Package included spending on infrastructure, health and education. To raise <strong>AS</strong>, the Jobs Credit scheme paid employers a share of their local workers’ wages, cutting their costs of production.</p>
</div>
`,
    terms: [
      ['Gross domestic product', 'The total market value of all final goods and services produced within a country’s borders in a given period, usually a year.'],
      ['Final goods', 'Goods bought by the end user for consumption, not for further processing.'],
      ['Intermediate goods', 'Goods bought as inputs for further processing into other goods; not counted separately in GDP.'],
      ['Double counting', 'Counting the value of intermediate goods as well as final goods, which overstates GDP.'],
      ['Gross national product', 'The value of output produced by a country’s residents, wherever it is produced: GDP + net factor receipts.'],
      ['Net factor receipts', 'Earnings of residents from abroad minus earnings of non-residents in the country.'],
      ['Money GDP', 'GDP valued at current market prices (also called nominal GDP).'],
      ['Real GDP', 'GDP valued at base-year prices, so it changes only when output changes.'],
      ['GDP deflator', 'A price index for all new, domestically produced final goods and services: money GDP ÷ real GDP × 100.'],
      ['Economic growth rate', 'The percentage change in real GDP from the previous year.'],
      ['Per capita GDP', 'GDP divided by the population: output per person.'],
      ['Business cycle', 'The periodic but irregular up-and-down movement in economic activity, with four phases: recession, trough, recovery and peak.'],
      ['Technical recession', 'Two consecutive quarters of negative economic growth.'],
      ['Stagflation', 'High unemployment and a rising price level at the same time, caused by a fall in aggregate supply.']
    ],
    review: [
      ['What is the definition of GDP?', '<p>The total market value of all final goods and services produced within a country’s borders in a given period, usually a year.</p>'],
      ['What is excluded and included when estimating GDP?', '<p>Included: new final goods and services, including output by foreigners in the country, and the services of brokers and dealers. Excluded: intermediate goods (double counting), old or second-hand goods, paper transactions (shares, bonds), purely financial transfers, illegal activities and non-marketed work such as housework.</p>'],
      ['What are the formulas for GNP, money GDP, real GDP, the GDP deflator, the growth rate and per capita GDP?', '<p>GNP = GDP + net factor receipts. Money GDP = P<sub>cy</sub> × Q<sub>cy</sub>. Real GDP = P<sub>by</sub> × Q<sub>cy</sub>, or money GDP ÷ deflator × 100. Deflator = money GDP ÷ real GDP × 100. Growth rate = (real GDP<sub>cy</sub> − real GDP<sub>py</sub>) ÷ real GDP<sub>py</sub> × 100%. Per capita GDP = GDP ÷ population.</p>'],
      ['Can you describe the three approaches to estimating GDP?', '<p>Output: add the value added by every industry. Income: add wages, rent, interest and profit. Expenditure: add C + I + G + (X − M). All three give the same answer.</p>'],
      ['What are the limitations of GDP as a measure of living standards?', '<p>It leaves out illegal and non-marketed output, ignores leisure, the costs of growth (such as pollution), quality and income distribution, can rise just from inflation, and ignores population growth. Per capita GDP fixes only the last.</p>'],
      ['What is a business cycle, and what are its phases?', '<p>The periodic but irregular ups and downs in economic activity. Its four phases, in order, are recession, trough, recovery and peak.</p>'],
      ['How do you illustrate the causes of a recession and a recovery on an AD-AS diagram?', '<p>Recession: AD shifts left (output and price level fall), or AS shifts left (output falls, price level rises: stagflation). Recovery: AD shifts right (output and price level rise), or AS shifts right (output rises, price level falls).</p>']
    ],
    blanks: [
      ['10.1', 'Definition of GDP', 'The total market value of all final goods and services produced within a country’s borders in a given period (usually a year).'],
      ['10.1 (a)', 'Final goods?', 'Goods bought by the end user for consumption, not for further processing.'],
      ['10.1 (b)', 'The services provided by banks, second-hand car dealers and brokers…', '…are included in GDP, because they are current productive services (paid for by fees and commissions).'],
      ['10.1 (d)', 'GNP formula', 'GNP = GDP + net factor receipts'],
      ['10.1 (e)', 'Money GDP formula', 'Money GDP = current-year price × current-year quantity (P<sub>cy</sub> × Q<sub>cy</sub>)'],
      ['10.2', 'Real GDP (method 1)', 'Real GDP<sub>cy</sub> = base-year price × current-year quantity (P<sub>by</sub> × Q<sub>cy</sub>)'],
      ['10.2', 'Real GDP (method 2)', 'Real GDP = money GDP ÷ GDP deflator × 100'],
      ['10.2', 'GDP deflator formula', 'GDP deflator = money GDP ÷ real GDP × 100'],
      ['10.2', 'Economic growth rate formula', '(Real GDP<sub>cy</sub> − real GDP<sub>py</sub>) ÷ real GDP<sub>py</sub> × 100%'],
      ['10.3', 'GDP (national expenditure) =', 'C + I + G + (X − M)'],
      ['10.3', 'Output, income and expenditure', 'Output = income = expenditure (all three approaches give the same GDP).'],
      ['10.4', 'Per capita GDP formula', 'Per capita GDP = GDP ÷ population'],
      ['10.5', 'Recovery', 'The expanding phase of the business cycle: output (real GDP), employment and income rise.']
    ],
    quiz: [
      {
        q: 'Which of these is included in this year’s GDP?',
        options: [
          'The sale of a resale HDB flat',
          'A broker’s commission on selling shares',
          'Buying shares on the stock exchange',
          'A monetary gift from the government to citizens'
        ],
        answer: 1,
        why: 'The broker produced a service this year. The flat is old output, shares are a paper transaction, and the gift is a purely financial transfer.'
      },
      {
        q: 'Why are intermediate goods not counted separately in GDP?',
        options: [
          'They are too hard to value',
          'Counting them would double count, since their value is already in the final good',
          'They are always imported',
          'They are illegal'
        ],
        answer: 1,
        why: 'The flour’s value is already part of the cake’s price.'
      },
      {
        q: 'Singapore’s GNP differs from its GDP because GNP:',
        options: [
          'Counts only goods, not services',
          'Adds residents’ earnings abroad and subtracts non-residents’ earnings in Singapore',
          'Uses base-year prices',
          'Excludes government spending'
        ],
        answer: 1,
        why: 'GNP = GDP + net factor receipts. It measures output by residents, wherever they are.'
      },
      {
        q: 'Chicken rice: 2015 (base year) $4 × 100,000; 2016 $6 × 80,000. What is real GDP in 2016?',
        options: ['$480,000', '$400,000', '$320,000', '$600,000'],
        answer: 2,
        why: 'Real GDP uses base-year prices: $4 × 80,000 = $320,000.'
      },
      {
        q: 'Money GDP is $500b and the GDP deflator is 125. Real GDP is:',
        options: ['$625b', '$400b', '$375b', '$500b'],
        answer: 1,
        why: 'Real GDP = money GDP ÷ deflator × 100 = $500b ÷ 1.25 = $400b.'
      },
      {
        q: 'Real GDP grew from $200b to $210b. The economic growth rate is:',
        options: ['10%', '5%', '4.8%', '2.1%'],
        answer: 1,
        why: '($210b − $200b) ÷ $200b × 100% = 5%.'
      },
      {
        q: 'An economy is in a technical recession after:',
        options: [
          'One month of falling prices',
          'Two consecutive quarters of negative economic growth',
          'A year of rising unemployment',
          'Any fall in money GDP'
        ],
        answer: 1,
        why: 'That is the standard definition used in your notes.'
      },
      {
        q: 'A rise in production costs causes a recession. On the AD-AS diagram:',
        options: [
          'AD shifts left and the price level falls',
          'AS shifts left, output falls and the price level rises (stagflation)',
          'AS shifts right and output rises',
          'AD shifts right and prices rise'
        ],
        answer: 1,
        why: 'Higher costs reduce AS. Output and employment fall while prices rise.'
      }
    ]
  }
);
