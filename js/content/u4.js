/* Unit 4: The Macroeconomy */
ECON.lessons.push(
  {
    id: 'gdp',
    unit: 'u4',
    title: 'Measuring the Economy: GDP',
    summary: 'What gross domestic product counts, what it leaves out, and how to strip out inflation.',
    minutes: 14,
    body: `
<h2>What GDP measures</h2>
<p><strong>Gross domestic product</strong> (GDP) is the market value of all final goods and services produced within a country in a given period. Each part of that definition matters:</p>
<ul>
  <li><strong>Market value.</strong> Goods are added up using their prices, so apples and haircuts can be combined in one number.</li>
  <li><strong>Final.</strong> Only goods sold to their end user count. The flour a bakery buys is an <em>intermediate good</em>; counting it and the bread would count the flour twice.</li>
  <li><strong>Produced.</strong> Only new production counts. Selling a used car or an existing house isn’t production (though the dealer’s or agent’s service is).</li>
  <li><strong>Within a country.</strong> What matters is location, not ownership. A Japanese-owned car plant in Kentucky adds to US GDP.</li>
  <li><strong>In a given period.</strong> Usually a quarter or a year.</li>
</ul>

<h2>The expenditure approach: GDP = C + I + G + NX</h2>
<p>Everything produced is bought by someone, so GDP can be measured by adding up spending on final goods and services:</p>
<div class="formula"><strong>GDP = C + I + G + NX</strong></div>
<ul>
  <li><strong>C, consumption.</strong> Household spending on goods and services. In the US, it is roughly two-thirds of GDP.</li>
  <li><strong>I, investment.</strong> Business spending on equipment and buildings, construction of new homes, and changes in inventories.</li>
  <li><strong>G, government purchases.</strong> Government spending on goods and services, such as roads, teachers’ salaries and military equipment. <em>Transfer payments</em> like pensions and unemployment benefits are not included, because the government isn’t buying anything with them.</li>
  <li><strong>NX, net exports.</strong> Exports minus imports. Imports are subtracted because they are already counted in C, I or G but weren’t produced at home.</li>
</ul>
<div class="note pitfall">
  <p class="note-label">Common mistake</p>
  <p>In economics, “investment” doesn’t mean buying stocks. Buying a share only changes who owns an existing company. Investment means building new capital: a factory, a machine, a house.</p>
</div>

<h2>Value added</h2>
<p>Another way to avoid double counting is to add up the <em>value added</em> at each stage of production.</p>
<div class="table-wrap"><table class="num">
  <thead><tr><th>Stage</th><th>Sale price</th><th>Value added</th></tr></thead>
  <tbody>
    <tr><td>Farmer grows wheat, sells to miller</td><td>$1.00</td><td>$1.00</td></tr>
    <tr><td>Miller makes flour, sells to baker</td><td>$3.00</td><td>$2.00</td></tr>
    <tr><td>Baker makes bread, sells to you</td><td>$6.00</td><td>$3.00</td></tr>
    <tr><td><strong>Total</strong></td><td></td><td><strong>$6.00</strong></td></tr>
  </tbody>
</table></div>
<p>The total value added equals the price of the final good. Adding up all three sale prices ($10) would overstate GDP.</p>

<h2>Nominal GDP and real GDP</h2>
<p><strong>Nominal GDP</strong> uses the prices of the year the goods were produced. It can rise just because prices rose. <strong>Real GDP</strong> values output at the prices of a fixed base year, so it only rises when the economy actually produces more.</p>
<div class="note example">
  <p class="note-label">Worked example</p>
  <p>A tiny economy makes only pizza. In Year 1 it makes 100 pizzas at $10 each. In Year 2 it makes 110 pizzas at $12.</p>
  <ul>
    <li>Nominal GDP: $1,000 in Year 1, $1,320 in Year 2 (up 32%).</li>
    <li>Real GDP in Year 1 prices: $1,000, then 110 × $10 = $1,100 (up 10%).</li>
    <li>The <strong>GDP deflator</strong> for Year 2 = nominal ÷ real × 100 = 1,320 ÷ 1,100 × 100 = 120. Prices rose 20%.</li>
  </ul>
</div>

<h2>What GDP misses</h2>
<p>GDP per person is the most widely used measure of living standards, and it is closely linked to health, education and life expectancy. It still leaves a lot out:</p>
<ul>
  <li>Unpaid work at home, like cooking, cleaning and childcare.</li>
  <li>The informal and underground economy.</li>
  <li>Leisure time: a country that works fewer hours for the same output is better off.</li>
  <li>Environmental damage and resource depletion.</li>
  <li>How income is distributed.</li>
</ul>
<p>Alternatives such as the UN’s Human Development Index combine income with health and education.</p>
`,
    terms: [
      ['Gross domestic product', 'The market value of all final goods and services produced within a country in a given period.'],
      ['Final goods', 'Goods and services sold to their end users.'],
      ['Intermediate goods', 'Goods used up in producing other goods, such as flour bought by a bakery; not counted separately in GDP.'],
      ['Consumption', 'Household spending on goods and services (C in GDP).'],
      ['Investment', 'Spending on new capital goods, new housing and inventories (I in GDP); not the purchase of stocks or bonds.'],
      ['Government purchases', 'Government spending on goods and services (G in GDP), excluding transfer payments.'],
      ['Transfer payment', 'A payment from the government for which no good or service is received in return, such as a pension or unemployment benefit.'],
      ['Net exports', 'The value of a country’s exports minus the value of its imports (NX in GDP).'],
      ['Nominal GDP', 'GDP measured using current prices.'],
      ['Real GDP', 'GDP measured using the prices of a fixed base year, removing the effect of inflation.'],
      ['GDP deflator', 'A measure of the price level: nominal GDP divided by real GDP, times 100.']
    ],
    quiz: [
      {
        q: 'Which of these is counted in this year’s GDP?',
        options: [
          'A used car sold this year',
          'Shares of stock bought this year',
          'A new house built this year',
          'Pension payments made this year'
        ],
        answer: 2,
        why: 'The new house is new production (investment). The used car was produced in an earlier year, shares are a change in ownership, and pensions are transfer payments.'
      },
      {
        q: 'Flour bought by a bakery to make bread is:',
        options: [
          'Counted as consumption',
          'An intermediate good, not counted separately',
          'Counted as investment',
          'Counted as a government purchase'
        ],
        answer: 1,
        why: 'The flour’s value is already included in the price of the bread. Counting it separately would count it twice.'
      },
      {
        q: 'Nominal GDP grew 6% this year while prices rose 4%. Real GDP grew by about:',
        options: ['10%', '6%', '4%', '2%'],
        answer: 3,
        why: 'Real growth ≈ nominal growth − inflation = 6% − 4% = 2%.'
      },
      {
        q: 'A German-owned car factory operates in Ohio. Its output counts toward:',
        options: ['German GDP', 'US GDP', 'Both', 'Neither'],
        answer: 1,
        why: 'GDP counts production by location. The cars are made in the United States, so they count in US GDP.'
      }
    ]
  },

  {
    id: 'inflation',
    unit: 'u4',
    title: 'Inflation & the Price Level',
    summary: 'How inflation is measured, what causes it, and who wins and loses when prices rise.',
    minutes: 14,
    body: `
<h2>What inflation is</h2>
<p><strong>Inflation</strong> is a sustained rise in the general level of prices. As prices rise, each dollar buys less, so its purchasing power falls. The opposite, a sustained fall in prices, is <strong>deflation</strong>. <strong>Disinflation</strong> means inflation is slowing down: prices are still rising, just more slowly.</p>

<h2>Measuring inflation with the CPI</h2>
<p>The <strong>Consumer Price Index</strong> (CPI) tracks the cost of a fixed basket of goods and services bought by a typical household, compared with a base period. In the US it is published monthly by the Bureau of Labor Statistics.</p>
<div class="formula">CPI = (cost of basket this year ÷ cost of basket in base year) × 100</div>
<div class="formula">Inflation rate = (CPI this year − CPI last year) ÷ CPI last year × 100</div>
<div class="note example">
  <p class="note-label">Worked example</p>
  <p>A basket costs $500 in the base year and $540 a year later. The CPI goes from 100 to 108, so inflation was <strong>8%</strong>.</p>
</div>
<p>The CPI is thought to overstate the true rise in the cost of living slightly. People switch to cheaper substitutes when prices rise, product quality improves over time, and new products take a while to enter the basket.</p>

<h2>Real and nominal values</h2>
<p>A <em>nominal</em> amount is measured in dollars of the day. A <em>real</em> amount is adjusted for inflation. The same idea applies to interest rates:</p>
<div class="formula">Real interest rate ≈ <strong>nominal interest rate − inflation rate</strong></div>
<p>If your savings account pays 5% and inflation is 3%, your purchasing power grows by only about 2% a year. Use the calculator to see what past prices are worth today.</p>
<div data-widget="inflation"></div>

<h2>What causes inflation?</h2>
<ul>
  <li><strong>Demand-pull.</strong> Total spending grows faster than the economy’s capacity to produce: “too much money chasing too few goods.”</li>
  <li><strong>Cost-push.</strong> A jump in costs, such as the oil price shocks of 1973 and 1979, pushes prices up across the economy.</li>
  <li><strong>Money growth.</strong> The <em>quantity theory of money</em> (MV = PY) says that over the long run, if the money supply grows much faster than output, prices rise. Extreme cases become <strong>hyperinflation</strong>, as in Germany in 1923, Zimbabwe in 2008 and Venezuela in the late 2010s, usually when governments print money to pay their bills.</li>
  <li><strong>Expectations.</strong> If workers and firms expect inflation, they ask for higher wages and set higher prices, which makes the expectation come true.</li>
</ul>

<h2>Who is hurt by inflation?</h2>
<ul>
  <li><strong>Unexpected</strong> inflation shifts wealth from lenders to borrowers, because loans are repaid in dollars that buy less. It also hurts people on fixed incomes.</li>
  <li>High and variable inflation makes planning harder and blurs the price signals markets rely on.</li>
  <li>Firms have to change prices more often (<em>menu costs</em>), and people spend effort avoiding holding cash (<em>shoe-leather costs</em>).</li>
</ul>
<p>Deflation has problems of its own: people put off purchases, and debts get harder to repay. Most major central banks, including the Federal Reserve, the European Central Bank and the Bank of England, aim for inflation of about <strong>2%</strong> a year. That is low enough to keep prices stable and leaves some distance from deflation.</p>
`,
    terms: [
      ['Inflation', 'A sustained increase in the general price level, reducing the purchasing power of money.'],
      ['Deflation', 'A sustained decrease in the general price level.'],
      ['Disinflation', 'A fall in the rate of inflation; prices still rise, but more slowly.'],
      ['Consumer Price Index', 'A measure of the overall cost of a fixed basket of goods and services bought by a typical consumer, relative to a base period.'],
      ['Purchasing power', 'The quantity of goods and services a unit of money can buy.'],
      ['Nominal interest rate', 'The interest rate as stated, not adjusted for inflation.'],
      ['Real interest rate', 'The interest rate adjusted for inflation; approximately the nominal rate minus the inflation rate.'],
      ['Quantity theory of money', 'The theory that the money supply times its velocity equals the price level times real output (MV = PY), implying that rapid money growth causes inflation in the long run.'],
      ['Hyperinflation', 'Extremely rapid inflation, often defined as more than 50% per month.']
    ],
    quiz: [
      {
        q: 'The CPI rises from 250 to 260 over a year. The inflation rate is:',
        options: ['10%', '4%', '2.6%', '0.4%'],
        answer: 1,
        why: '(260 − 250) ÷ 250 × 100 = 4%.'
      },
      {
        q: 'A bank pays 6% interest and inflation is 4%. The real interest rate is about:',
        options: ['10%', '6%', '4%', '2%'],
        answer: 3,
        why: 'Real rate ≈ nominal rate − inflation = 6% − 4% = 2%.'
      },
      {
        q: 'Inflation turns out much higher than anyone expected. Who tends to benefit?',
        options: [
          'Savers holding cash',
          'Borrowers with fixed-rate loans',
          'Lenders who made fixed-rate loans',
          'Retirees on fixed pensions'
        ],
        answer: 1,
        why: 'Borrowers repay loans in dollars that are worth less than expected, so part of the real value of their debt disappears. Lenders lose that value.'
      },
      {
        q: 'Which of these describes disinflation?',
        options: [
          'Prices fall by 2% over a year',
          'Inflation drops from 6% to 3%',
          'Inflation rises from 2% to 5%',
          'Prices double in a month'
        ],
        answer: 1,
        why: 'Prices are still rising, but at a slower rate. A fall in prices would be deflation.'
      }
    ]
  },

  {
    id: 'unemployment',
    unit: 'u4',
    title: 'Unemployment',
    summary: 'Who counts as unemployed, the different kinds of unemployment, and what “full employment” means.',
    minutes: 12,
    body: `
<h2>Who counts as unemployed?</h2>
<p>You are <strong>unemployed</strong> if you don’t have a job, are available to work, and have actively looked for work in the past four weeks. Everyone who is either employed or unemployed makes up the <strong>labor force</strong>. People who are neither, such as retirees, full-time students who aren’t job-hunting, and full-time caregivers, are <em>not in the labor force</em>.</p>
<div class="formula">Unemployment rate = <strong>unemployed ÷ labor force × 100</strong></div>
<div class="formula">Labor force participation rate = <strong>labor force ÷ adult population × 100</strong></div>
<div class="note example">
  <p class="note-label">Worked example</p>
  <p>A country has 200 million adults. 120 million are employed and 6 million are unemployed.</p>
  <ul>
    <li>Labor force = 120 + 6 = 126 million</li>
    <li>Unemployment rate = 6 ÷ 126 = <strong>4.8%</strong></li>
    <li>Participation rate = 126 ÷ 200 = <strong>63%</strong></li>
  </ul>
</div>

<h2>What the headline number misses</h2>
<ul>
  <li><strong>Discouraged workers</strong> want a job but have stopped looking because they think none are available. They drop out of the labor force, which can make the unemployment rate <em>fall</em> in bad times.</li>
  <li><strong>Underemployment.</strong> Someone working part-time who wants full-time work counts as employed.</li>
</ul>
<p>In the US, the Bureau of Labor Statistics publishes a broader measure, U-6, that includes both groups.</p>

<h2>Three kinds of unemployment</h2>
<ul>
  <li><strong>Frictional.</strong> The time it takes to find a new job, like a graduate searching for a first role or someone moving cities. Some of this is healthy, since it helps match people to jobs that suit them.</li>
  <li><strong>Structural.</strong> A mismatch between workers’ skills or location and the jobs available, often caused by new technology or the decline of an industry. It can last a long time and usually requires retraining or moving.</li>
  <li><strong>Cyclical.</strong> Unemployment caused by recessions, when total spending falls and firms cut jobs.</li>
</ul>
<p>Some economists also count <em>seasonal</em> unemployment separately, such as ski instructors in summer.</p>

<h2>The natural rate of unemployment</h2>
<p>Even a healthy economy has some frictional and structural unemployment. Together they make up the <strong>natural rate of unemployment</strong>. When cyclical unemployment is zero and actual unemployment equals the natural rate, the economy is at “full employment”. Full employment doesn’t mean zero unemployment. For the US, most estimates put the natural rate somewhere around 4 to 5%.</p>

<h2>The costs of unemployment</h2>
<p>Unemployment means lost output the economy never gets back, and lost income for families. Long spells out of work can erode skills and make people less employable, an effect called <em>hysteresis</em>. It is also linked to worse physical and mental health. A rough rule of thumb, <strong>Okun’s law</strong>, says each percentage point of cyclical unemployment goes with output about 2% below its potential.</p>
`,
    terms: [
      ['Labor force', 'All people who are either employed or unemployed (actively seeking work).'],
      ['Unemployment rate', 'The percentage of the labor force that is unemployed.'],
      ['Labor force participation rate', 'The percentage of the adult population that is in the labor force.'],
      ['Discouraged worker', 'Someone who wants a job but has stopped looking, and so is not counted in the labor force.'],
      ['Frictional unemployment', 'Unemployment from the normal time it takes workers to search for and move between jobs.'],
      ['Structural unemployment', 'Unemployment caused by a mismatch between workers’ skills or locations and the jobs available.'],
      ['Cyclical unemployment', 'Unemployment caused by a fall in overall spending during a recession.'],
      ['Natural rate of unemployment', 'The unemployment rate when there is no cyclical unemployment; the sum of frictional and structural unemployment.'],
      ['Okun’s law', 'A rule of thumb linking unemployment to output: each percentage point of cyclical unemployment corresponds to output roughly 2% below potential.']
    ],
    quiz: [
      {
        q: 'A full-time university student who isn’t looking for work is:',
        options: ['Unemployed', 'Employed', 'Not in the labor force', 'A discouraged worker'],
        answer: 2,
        why: 'To be unemployed you must be actively looking for work. The student isn’t looking, so they are outside the labor force.'
      },
      {
        q: 'A coal miner loses his job as mines close and his skills aren’t needed in the growing industries nearby. This is:',
        options: ['Frictional unemployment', 'Structural unemployment', 'Cyclical unemployment', 'Seasonal unemployment'],
        answer: 1,
        why: 'His skills no longer match the jobs available, which is structural unemployment. It would be cyclical only if caused by a general recession.'
      },
      {
        q: 'In a town of 100 adults, 57 are employed and 3 are unemployed. The unemployment rate is:',
        options: ['3%', '5%', '5.3%', '43%'],
        answer: 1,
        why: 'Labor force = 57 + 3 = 60. Unemployment rate = 3 ÷ 60 = 5%. The other 40 adults aren’t in the labor force.'
      },
      {
        q: 'During a long recession, many unemployed people give up looking for work. What happens to the measured unemployment rate?',
        options: ['It rises', 'It falls', 'It stays the same', 'It becomes negative'],
        answer: 1,
        why: 'Discouraged workers leave the labor force. The number of unemployed shrinks faster than the labor force, so the rate falls, even though nothing has improved.'
      }
    ]
  },

  {
    id: 'growth',
    unit: 'u4',
    title: 'Long-Run Economic Growth',
    summary: 'Why some countries are rich and others poor, and why small growth rates add up to huge differences.',
    minutes: 12,
    body: `
<h2>Why growth matters</h2>
<p>The best single measure of average living standards is <strong>real GDP per capita</strong>: real GDP divided by population. Small differences in its growth rate compound into enormous differences over time.</p>
<div class="formula">Rule of 70: years to double ≈ <strong>70 ÷ annual growth rate (%)</strong></div>
<ul>
  <li>At 1% a year, income doubles in about 70 years.</li>
  <li>At 2%, it doubles in about 35 years, roughly once a generation.</li>
  <li>At 7%, it doubles in about 10 years. Economies such as South Korea and China grew at rates like this for decades.</li>
</ul>
<p>Over 70 years, 1% growth doubles income, while 3% growth multiplies it about eight times.</p>

<h2>Productivity is the key</h2>
<p>A country’s living standards depend on its <strong>productivity</strong>: how much it produces per worker or per hour worked. Productivity depends on:</p>
<ul>
  <li><strong>Physical capital.</strong> Machines, tools, buildings and infrastructure per worker.</li>
  <li><strong>Human capital.</strong> Workers’ knowledge, skills and health, built through education, training and experience.</li>
  <li><strong>Natural resources.</strong> Helpful, but neither necessary nor sufficient. Japan has few natural resources and is rich; some resource-rich countries remain poor.</li>
  <li><strong>Technology.</strong> Knowledge about the best ways to produce things, from crop rotation to software.</li>
</ul>

<h2>Institutions</h2>
<p>People invest, save and invent when they expect to keep the rewards. That requires secure <strong>property rights</strong>, the rule of law, stable government, low corruption and working markets. North and South Korea are a striking natural experiment. They shared a culture, a language and similar incomes when the peninsula was divided after World War II. Under very different institutions, South Korea is now many times richer.</p>

<h2>Diminishing returns and catching up</h2>
<p>Giving a worker their first tractor raises output enormously; the tenth tractor adds far less. Because capital has diminishing returns, poorer countries can often grow faster than rich ones by adding capital and adopting existing technologies. This is the <strong>catch-up effect</strong>. It isn’t automatic, though, and depends on the institutions above.</p>
<p>Diminishing returns also mean a country can’t grow forever just by piling up more machines. In the <em>Solow growth model</em>, sustained growth in output per worker ultimately comes from <strong>technological progress</strong>.</p>

<h2>Policies that promote growth</h2>
<ul>
  <li>Encouraging saving and investment, both domestic and foreign.</li>
  <li>Investing in education and health.</li>
  <li>Supporting research and development.</li>
  <li>Keeping markets open to trade and ideas.</li>
  <li>Protecting property rights and maintaining political stability.</li>
  <li>Building infrastructure: roads, ports, power and internet.</li>
</ul>
`,
    terms: [
      ['Real GDP per capita', 'Real GDP divided by the population; the standard measure of average living standards.'],
      ['Rule of 70', 'A shortcut for doubling time: a quantity growing at x% per year doubles in about 70 ÷ x years.'],
      ['Productivity', 'The quantity of goods and services produced per worker or per hour worked.'],
      ['Human capital', 'The knowledge, skills and health that workers gain through education, training and experience.'],
      ['Property rights', 'The legal right to own, use and sell resources and to keep the income they earn.'],
      ['Catch-up effect', 'The tendency for poorer countries to grow faster than richer ones because capital has higher returns where it is scarce.']
    ],
    quiz: [
      {
        q: 'Using the rule of 70, an economy growing at 5% a year doubles its output in about:',
        options: ['5 years', '14 years', '35 years', '70 years'],
        answer: 1,
        why: '70 ÷ 5 = 14 years.'
      },
      {
        q: 'The most important determinant of a country’s long-run living standards is:',
        options: ['Its money supply', 'Its productivity', 'Its population size', 'Its exchange rate'],
        answer: 1,
        why: 'A country can only consume what it produces, so output per worker largely determines living standards.'
      },
      {
        q: 'Human capital refers to:',
        options: [
          'The number of people in the workforce',
          'Machines that replace human labor',
          'The knowledge and skills of workers',
          'Money invested in companies'
        ],
        answer: 2,
        why: 'Human capital is the knowledge, skills and health people build through education, training and experience.'
      },
      {
        q: 'According to the Solow growth model, sustained long-run growth in output per worker requires:',
        options: [
          'Ever-increasing amounts of capital',
          'Technological progress',
          'A growing population',
          'Rising inflation'
        ],
        answer: 1,
        why: 'Diminishing returns mean more capital alone eventually adds little. Only new technology keeps output per worker growing indefinitely.'
      }
    ]
  },

  {
    id: 'ad-as',
    unit: 'u4',
    title: 'Aggregate Demand & Aggregate Supply',
    summary: 'The workhorse model of recessions, booms, inflation and stagflation.',
    minutes: 16,
    body: `
<h2>Supply and demand for the whole economy</h2>
<p>The <strong>AD-AS model</strong> plots the overall <em>price level</em> against <em>real GDP</em>. It helps explain short-run fluctuations: why economies sometimes fall into recession, sometimes overheat, and sometimes suffer rising prices and falling output together.</p>

<h2>Aggregate demand</h2>
<p><strong>Aggregate demand</strong> (AD) is the total quantity of goods and services that households, firms, the government and foreigners want to buy at each price level: C + I + G + NX. It slopes downward for three reasons:</p>
<ul>
  <li><strong>Wealth effect.</strong> A higher price level makes people’s savings worth less in real terms, so they spend less.</li>
  <li><strong>Interest-rate effect.</strong> Higher prices raise the demand for money, which pushes up interest rates and reduces borrowing for investment and big purchases.</li>
  <li><strong>Exchange-rate effect.</strong> Higher domestic prices make exports less competitive and imports more attractive.</li>
</ul>
<p><strong>AD shifts</strong> when anything other than the price level changes spending: consumer and business confidence, household wealth, interest rates set by the central bank, government spending and taxes, and incomes abroad.</p>

<h2>Short-run aggregate supply</h2>
<p><strong>Short-run aggregate supply</strong> (SRAS) slopes upward. Many wages and prices are fixed by contracts or change slowly, so when the prices firms can charge rise, producing more becomes more profitable in the short run. SRAS shifts when production costs change, for example oil prices, wages, productivity, or expectations of future inflation.</p>

<h2>Long-run aggregate supply</h2>
<p>In the long run, wages and prices fully adjust, and output depends only on the economy’s resources and technology. <strong>Long-run aggregate supply</strong> (LRAS) is a vertical line at <strong>potential output</strong>: what the economy produces at the natural rate of unemployment. Economic growth shifts it to the right.</p>
<div data-widget="adas" data-preset="adas"></div>

<h2>Four kinds of shock</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Shock</th><th>Output</th><th>Price level</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>AD falls</td><td>Falls (recession)</td><td>Falls</td><td>The 2008–09 financial crisis</td></tr>
    <tr><td>AD rises</td><td>Rises (boom)</td><td>Rises</td><td>A surge in government or consumer spending</td></tr>
    <tr><td>SRAS falls</td><td>Falls</td><td>Rises</td><td>The oil shocks of the 1970s</td></tr>
    <tr><td>SRAS rises</td><td>Rises</td><td>Falls</td><td>A productivity boom, like the late 1990s</td></tr>
  </tbody>
</table></div>
<p>When output is below potential, there is a <strong>recessionary gap</strong> and unemployment is above its natural rate. When output is above potential, there is an <strong>inflationary gap</strong>: the economy is running hot and prices tend to rise.</p>
<p>A fall in SRAS causes <strong>stagflation</strong>, meaning stagnant output with rising prices. It is especially painful for policymakers, because boosting demand to fight unemployment makes inflation worse, while cutting demand to fight inflation deepens the slump.</p>

<h2>Does the economy fix itself?</h2>
<p>In the model, yes, eventually. In a recession, unemployment puts downward pressure on wages. As costs fall, SRAS shifts right until output is back at potential. Try “Let wages adjust” in the lab above. That process can be slow and painful, though, which is the main argument for using monetary and fiscal policy to speed things up. As John Maynard Keynes put it: “In the long run we are all dead.”</p>
`,
    terms: [
      ['Aggregate demand', 'The total quantity of goods and services demanded in an economy at each price level: C + I + G + NX.'],
      ['Short-run aggregate supply', 'The total quantity of output firms will produce at each price level in the short run, while some wages and prices are fixed.'],
      ['Long-run aggregate supply', 'The economy’s output when all prices and wages have adjusted; a vertical line at potential output.'],
      ['Potential output', 'The level of real GDP an economy produces when unemployment is at its natural rate.'],
      ['Recessionary gap', 'The amount by which real GDP falls short of potential output.'],
      ['Inflationary gap', 'The amount by which real GDP exceeds potential output.'],
      ['Stagflation', 'A combination of stagnant or falling output and rising prices, usually caused by a negative supply shock.'],
      ['Supply shock', 'An event that suddenly changes production costs, shifting the short-run aggregate supply curve.']
    ],
    quiz: [
      {
        q: 'A sharp rise in world oil prices shifts:',
        options: [
          'AD right, causing a boom',
          'SRAS left, causing stagflation',
          'LRAS right, causing growth',
          'AD left, causing deflation'
        ],
        answer: 1,
        why: 'Oil is a key input, so costs rise across the economy. SRAS shifts left, output falls and the price level rises.'
      },
      {
        q: 'A stock market crash wipes out a large share of household wealth. In the AD-AS model:',
        options: ['AD shifts left', 'AD shifts right', 'SRAS shifts right', 'LRAS shifts left'],
        answer: 0,
        why: 'Less wealth means households spend less at every price level. This is the wealth effect shifting AD left.'
      },
      {
        q: 'The long-run aggregate supply curve is vertical because:',
        options: [
          'Prices never change in the long run',
          'In the long run, output depends on resources and technology, not the price level',
          'The government fixes output in the long run',
          'Aggregate demand is vertical in the long run'
        ],
        answer: 1,
        why: 'Once wages and prices have fully adjusted, a higher price level doesn’t make firms produce more. Output is set by the economy’s real productive capacity.'
      },
      {
        q: 'An economy producing below its potential output has:',
        options: [
          'An inflationary gap',
          'A recessionary gap',
          'Unemployment below its natural rate',
          'Stagflation by definition'
        ],
        answer: 1,
        why: 'Output below potential means resources are idle and cyclical unemployment is present. That’s a recessionary gap.'
      }
    ]
  }
);
