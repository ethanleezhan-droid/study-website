/* Your module: Topics 5–7. Section numbers follow the student notes. */
ECON.lessons.push(
  {
    id: 'm-elasticity',
    unit: 'm',
    title: 'Elasticity',
    summary: 'Price, income and cross price elasticity of demand: the formulas, what the numbers mean, and the link to total revenue.',
    minutes: 20,
    body: `
<h2>5.1 What elasticity measures</h2>
<p><strong>Elasticity of demand</strong> measures how sensitive, or responsive, quantity demanded is to a change in the good’s own price, in income, or in the price of another good.</p>
<p>When the price rises, it isn’t enough to know that quantity demanded fell. Firms and governments also need to know <strong>by how much</strong> it fell. That is what elasticity tells us.</p>
<div class="table-wrap"><table>
  <thead><tr><th>Type</th><th>Measures the response of quantity demanded to…</th><th>Formula used</th></tr></thead>
  <tbody>
    <tr><td>Price elasticity of demand (Price Ed)</td><td>A change in the good’s <strong>own price</strong></td><td>Midpoint formula</td></tr>
    <tr><td>Income elasticity of demand (Y Ed)</td><td>A change in <strong>income</strong></td><td>Simple formula</td></tr>
    <tr><td>Cross price elasticity of demand (XP Ed)</td><td>A change in the <strong>price of another good</strong></td><td>Simple formula</td></tr>
  </tbody>
</table></div>

<h2>5.2 Price elasticity of demand</h2>
<p><strong>Price elasticity of demand</strong> measures the responsiveness of quantity demanded to a change in the good’s own price. It describes a <em>movement along</em> a given demand curve.</p>
<div class="formula">Price Ed = %ΔQ ÷ %ΔP = [(Q<sub>new</sub> − Q<sub>old</sub>) ÷ ((Q<sub>new</sub> + Q<sub>old</sub>) ÷ 2)] ÷ [(P<sub>new</sub> − P<sub>old</sub>) ÷ ((P<sub>new</sub> + P<sub>old</sub>) ÷ 2)]</div>
<p>Price Ed always comes out <strong>negative</strong>, because of the law of demand: when price goes up, quantity goes down, so the top and bottom of the fraction have opposite signs. Negative numbers are awkward to compare, so economists drop the sign and use the <strong>absolute value</strong>.</p>

<h3>Why the midpoint formula?</h3>
<p>Concert ticket prices rise from $25 to $30, and seats sold fall from 20,000 to 10,000 (point A to point B). Using the simple percentage-change formula:</p>
<ul>
  <li><strong>A to B</strong> (price rises): %ΔQ = −10,000 ÷ 20,000 = −50%; %ΔP = 5 ÷ 25 = 20%. Price Ed = <strong>2.5</strong>.</li>
  <li><strong>B to A</strong> (price falls): %ΔQ = +10,000 ÷ 10,000 = +100%; %ΔP = −5 ÷ 30 = −16.7%. Price Ed = <strong>6.0</strong> (your notes round %ΔP to 17% and get 5.9).</li>
</ul>
<p>Same stretch of the demand curve, two different answers, because each calculation uses a different base. The midpoint formula fixes this by using the <strong>average</strong> quantity and price as the base:</p>
<ul>
  <li>%ΔQ = −10,000 ÷ 15,000 = −66.7%</li>
  <li>%ΔP = 5 ÷ 27.5 = 18.2%</li>
  <li>Price Ed = 66.7 ÷ 18.2 = <strong>3.7</strong>, whichever direction you go.</li>
</ul>
<div class="note key">
  <p class="note-label">Exam tip</p>
  <p>Use the <strong>midpoint</strong> formula for price elasticity of demand. Use the <strong>simple</strong> formula for income elasticity and cross price elasticity. Your notes are specific about this.</p>
</div>

<h3>5.2.1 What the coefficient means</h3>
<p>The coefficient ranges from zero to infinity. The bigger the number, the more responsive quantity demanded is to price.</p>
<div class="table-wrap"><table>
  <thead><tr><th>Price Ed</th><th>Name</th><th>Meaning</th><th>Demand curve</th></tr></thead>
  <tbody>
    <tr><td>&gt; 1</td><td>Elastic</td><td>%ΔQ &gt; %ΔP: quantity changes more than proportionately</td><td>Relatively flat</td></tr>
    <tr><td>&lt; 1</td><td>Inelastic</td><td>%ΔQ &lt; %ΔP: quantity changes less than proportionately</td><td>Relatively steep</td></tr>
    <tr><td>= 1</td><td>Unitary elastic</td><td>%ΔQ = %ΔP: quantity changes proportionately</td><td>In between</td></tr>
    <tr><td>= ∞</td><td>Perfectly elastic</td><td>Any price change makes quantity demanded fall to zero; unlimited amounts demanded at one price</td><td>Horizontal</td></tr>
    <tr><td>= 0</td><td>Perfectly inelastic</td><td>Quantity demanded doesn’t change at all when price changes</td><td>Vertical</td></tr>
  </tbody>
</table></div>

<h3>5.2.2 Price elasticity and total revenue</h3>
<p><strong>Total revenue</strong> (TR) is the total amount a firm earns from selling a good:</p>
<div class="formula"><strong>TR = P × Q</strong></div>
<p>Price and quantity move in opposite directions, so what happens to TR depends on which one changes by more. That is exactly what price elasticity tells you.</p>
<div class="table-wrap"><table>
  <thead><tr><th></th><th>Inelastic (0 &lt; Ed &lt; 1)</th><th>Unitary elastic (Ed = 1)</th><th>Elastic (Ed &gt; 1)</th></tr></thead>
  <tbody>
    <tr><td>When price falls</td><td>%ΔQd &lt; %ΔP, so <strong>TR falls</strong></td><td>%ΔQd = %ΔP, so <strong>TR unchanged</strong></td><td>%ΔQd &gt; %ΔP, so <strong>TR rises</strong></td></tr>
    <tr><td>When price rises</td><td><strong>TR rises</strong></td><td><strong>TR unchanged</strong></td><td><strong>TR falls</strong></td></tr>
  </tbody>
</table></div>
<ul>
  <li><strong>Elastic:</strong> TR and P are <em>inversely</em> related. TR rises when P falls.</li>
  <li><strong>Inelastic:</strong> TR and P are <em>directly</em> related. TR rises when P rises.</li>
  <li><strong>Unitary elastic:</strong> TR stays the same whether P rises or falls.</li>
</ul>
<div class="note example">
  <p class="note-label">Worked example</p>
  <p>Concert tickets: at $25, TR = $25 × 20,000 = $500,000. At $30, TR = $30 × 10,000 = $300,000. The price rise cut revenue, which fits demand being elastic (3.7). This matters to firms, because profit = TR − TC. Knowing elasticity helps a firm decide whether raising or cutting its price will increase revenue.</p>
</div>

<h3>5.2.3 What determines price elasticity of demand?</h3>
<p><strong>(i) Availability of substitutes.</strong> The more substitutes there are, and the closer they are, the more elastic demand is, because it’s easy to switch when the price rises. If Coke’s price rises, people switch to Pepsi, so demand for Coke is <strong>price elastic</strong>. Tobacco has no close substitutes and smokers are addicted, so demand for tobacco is <strong>price inelastic</strong>.</p>
<p>It also depends on how the good is defined. The narrower the definition, the more substitutes, so demand is more elastic. Demand for laptops as a whole is inelastic, but demand for one brand (Apple, Dell, Acer, Asus) is elastic, because buyers can switch brands.</p>
<p><strong>(ii) Share of the budget.</strong> A good that takes up a small part of your budget tends to have inelastic demand. If salt goes from $1.00 to $1.10 a kilo (+10%), you barely notice, so demand for salt is <strong>inelastic</strong>. A good that takes up a large part of the budget tends to have elastic demand. A 10% rise on a $170,000 Mercedes-Benz is $17,000, so demand is <strong>elastic</strong>.</p>
<p><strong>(iii) Time.</strong> Demand becomes more elastic over time, because more substitutes appear and people have time to switch. During the OPEC oil price shock of the early 1970s, demand for petrol was inelastic, since there were no alternatives. Over the long run, it becomes <strong>more elastic</strong> as people switch to fuel-efficient or electric cars, public transport and carpooling.</p>
<p><strong>(iv) Luxury or necessity.</strong> Demand for luxuries tends to be elastic; demand for necessities tends to be inelastic.</p>
<div class="table-wrap"><table>
  <thead><tr><th>Inelastic demand</th><th>Elastic demand</th></tr></thead>
  <tbody>
    <tr><td>Few substitutes</td><td>Many substitutes</td></tr>
    <tr><td>Small share of the budget</td><td>Large share of the budget</td></tr>
    <tr><td>Shorter time period</td><td>Longer time period</td></tr>
    <tr><td>Necessity</td><td>Luxury</td></tr>
  </tbody>
</table></div>
<div data-widget="elasticity" data-preset="module"></div>

<h2>5.3 Income elasticity of demand</h2>
<p><strong>Income elasticity of demand</strong> measures the responsiveness of quantity demanded to a change in income. Use the <strong>simple formula</strong>, not the midpoint formula:</p>
<div class="formula">Y Ed = %ΔQ ÷ %ΔY = [(Q<sub>new</sub> − Q<sub>old</sub>) ÷ Q<sub>old</sub>] ÷ [(Y<sub>new</sub> − Y<sub>old</sub>) ÷ Y<sub>old</sub>]</div>
<ul>
  <li><strong>Negative Y Ed:</strong> income and quantity demanded move in opposite directions. The good is an <strong>inferior good</strong>.</li>
  <li><strong>Positive Y Ed:</strong> income and quantity demanded move in the same direction. The good is a <strong>normal good</strong>.</li>
</ul>
<p>Normal goods can be split further (your notes mark this <em>not tested</em>): <em>luxuries</em> have Y Ed &gt; 1 (income elastic), and <em>necessities</em> have Y Ed between 0 and 1 (income inelastic).</p>
<div class="note example">
  <p class="note-label">Worked examples</p>
  <p>Monthly income rises from $2,000 to $2,200 (+10%). Bubble tea bought rises from 20 to 23 cups (+15%). Y Ed = 15% ÷ 10% = <strong>+1.5</strong>, so it’s a normal good.</p>
  <p>With the same income rise, instant noodle purchases fall from 30 to 27 packets (−10%). Y Ed = −10% ÷ 10% = <strong>−1.0</strong>, so it’s an inferior good.</p>
</div>
<p><strong>Why it’s useful:</strong> it helps firms predict sales. If income rises 5% and a good’s Y Ed is 1.5, then %ΔQ = 1.5 × 5% = 7.5%, so <strong>sales rise by 7.5%</strong>.</p>

<h2>5.4 Cross price elasticity of demand</h2>
<p><strong>Cross price elasticity of demand</strong> measures the responsiveness of demand for one good (a <em>shift</em> of its demand curve) to a change in the price of another related good. It also uses the <strong>simple formula</strong>:</p>
<div class="formula">XP Ed = %ΔQ<sub>A</sub> ÷ %ΔP<sub>B</sub> = [(Q<sub>A new</sub> − Q<sub>A old</sub>) ÷ Q<sub>A old</sub>] ÷ [(P<sub>B new</sub> − P<sub>B old</sub>) ÷ P<sub>B old</sub>]</div>
<div class="table-wrap"><table>
  <thead><tr><th>XP Ed</th><th>Relationship</th><th>Chain of events</th></tr></thead>
  <tbody>
    <tr><td>Positive</td><td>A and B are <strong>substitutes</strong> in consumption</td><td>P<sub>B</sub> ↑ → Qd<sub>B</sub> ↓ → D<sub>A</sub> ↑</td></tr>
    <tr><td>Negative</td><td>A and B are <strong>complements</strong> in consumption</td><td>P<sub>B</sub> ↑ → Qd<sub>B</sub> ↓ → D<sub>A</sub> ↓</td></tr>
    <tr><td>Zero</td><td>A and B are <strong>unrelated</strong></td><td>A change in P<sub>B</sub> has no effect on demand for A</td></tr>
  </tbody>
</table></div>
<div class="note example">
  <p class="note-label">Worked examples</p>
  <p>Pepsi’s price rises from $1.00 to $1.10 (+10%) and Coke sales rise from 1,000 to 1,080 (+8%). XP Ed = 8% ÷ 10% = <strong>+0.8</strong>, so they’re substitutes.</p>
  <p>Handphone prices rise 20% and charger sales fall 10%. XP Ed = −10% ÷ 20% = <strong>−0.5</strong>, so they’re complements.</p>
</div>
`,
    terms: [
      ['Elasticity of demand', 'A measure of how responsive quantity demanded is to a change in the good’s own price, income, or the price of another good.'],
      ['Price elasticity of demand', 'The responsiveness of quantity demanded to a change in the good’s own price, calculated with the midpoint formula.'],
      ['Midpoint formula', 'A way to calculate percentage changes using the average of the old and new values as the base, so the answer is the same in both directions.'],
      ['Elastic demand', 'Price Ed greater than 1: quantity demanded changes by a larger percentage than price.'],
      ['Inelastic demand', 'Price Ed less than 1: quantity demanded changes by a smaller percentage than price.'],
      ['Unitary elastic demand', 'Price Ed equal to 1: quantity demanded changes by the same percentage as price.'],
      ['Perfectly elastic demand', 'Price Ed equal to infinity: any price change makes quantity demanded fall to zero. The demand curve is horizontal.'],
      ['Perfectly inelastic demand', 'Price Ed equal to 0: quantity demanded does not change when price changes. The demand curve is vertical.'],
      ['Total revenue', 'The total amount a firm earns from sales: price × quantity sold.'],
      ['Income elasticity of demand', 'The responsiveness of quantity demanded to a change in income, calculated with the simple formula. Negative for inferior goods, positive for normal goods.'],
      ['Cross price elasticity of demand', 'The responsiveness of demand for one good to a change in the price of another, calculated with the simple formula. Positive for substitutes, negative for complements, zero for unrelated goods.']
    ],
    review: [
      ['How would you describe the concept of elasticity in general?', '<p>A measure of how responsive quantity demanded is to a change in its own price, in income, or in the price of another good. It tells you not just the direction of the change, but its size.</p>'],
      ['What does price elasticity of demand measure?', '<p>The responsiveness of quantity demanded to a change in the good’s own price: a movement along one demand curve.</p>'],
      ['How do you apply the price elasticity formula?', '<p>Use the midpoint formula: %ΔQ = (Q<sub>new</sub> − Q<sub>old</sub>) ÷ average Q, and %ΔP = (P<sub>new</sub> − P<sub>old</sub>) ÷ average P. Divide %ΔQ by %ΔP and take the absolute value. Concert example: 66.7% ÷ 18.2% = 3.7.</p>'],
      ['Why do we take the absolute value of the price elasticity coefficient?', '<p>Because of the law of demand, price and quantity move in opposite directions, so the coefficient is always negative. Dropping the sign makes the numbers easier to compare.</p>'],
      ['How do you interpret the price elasticity coefficient?', '<p>&gt; 1 is elastic, &lt; 1 inelastic, = 1 unitary elastic, ∞ perfectly elastic (horizontal curve), 0 perfectly inelastic (vertical curve).</p>'],
      ['What are the determinants of price elasticity of demand?', '<p>Availability of substitutes (including how narrowly the good is defined), share of the budget, time, and whether the good is a luxury or a necessity.</p>'],
      ['What is the relationship between price elasticity and total revenue?', '<p>Elastic: P and TR move in opposite directions. Inelastic: P and TR move in the same direction. Unitary: TR doesn’t change.</p>'],
      ['What does income elasticity of demand measure?', '<p>The responsiveness of quantity demanded to a change in income.</p>'],
      ['How do you apply the income elasticity formula?', '<p>Use the simple formula: %ΔQ = (Q<sub>new</sub> − Q<sub>old</sub>) ÷ Q<sub>old</sub>, and %ΔY = (Y<sub>new</sub> − Y<sub>old</sub>) ÷ Y<sub>old</sub>. Then Y Ed = %ΔQ ÷ %ΔY.</p>'],
      ['How do you interpret the income elasticity coefficient?', '<p>Negative means an inferior good; positive means a normal good. (Not tested: above 1 is a luxury, between 0 and 1 a necessity.)</p>'],
      ['What does cross price elasticity of demand measure?', '<p>The responsiveness of demand for good A (a shift of A’s demand curve) to a change in the price of good B.</p>'],
      ['How do you apply the cross price elasticity formula?', '<p>Use the simple formula: XP Ed = [(Q<sub>A new</sub> − Q<sub>A old</sub>) ÷ Q<sub>A old</sub>] ÷ [(P<sub>B new</sub> − P<sub>B old</sub>) ÷ P<sub>B old</sub>].</p>'],
      ['How do you interpret the cross price elasticity coefficient?', '<p>Positive means substitutes, negative means complements, zero means unrelated goods.</p>']
    ],
    blanks: [
      ['5.1', 'It is important to not only know that quantity demanded fell…', '…but also by how much it fell.'],
      ['5.2.1', 'Note (coefficients)', 'The coefficient is stated as an absolute value, so the larger the number, the more responsive (elastic) quantity demanded is to price.'],
      ['5.2.2', 'Formula of total revenue', 'TR = P × Q'],
      ['5.2.2', 'Elastic / inelastic / unit elastic: a 1% decrease in price… total revenue…', 'Elastic: TR increases. Inelastic: TR decreases. Unit elastic: TR is unchanged.'],
      ['5.2.2', 'Table: TR when price falls / rises', 'Price falls: inelastic TR ↓, unitary unchanged, elastic TR ↑. Price rises: inelastic TR ↑, unitary unchanged, elastic TR ↓.'],
      ['5.2.2', 'Key points: elastic, TR ↑ when P… / inelastic, TR ↑ when P…', 'Elastic: TR ↑ when P ↓. Inelastic: TR ↑ when P ↑.'],
      ['5.2.3 (i)', 'Coke and Pepsi / tobacco', 'Demand for Coke is price elastic. Demand for tobacco is price inelastic.'],
      ['5.2.3 (ii)', 'Salt from $1 to $1.10 / Mercedes-Benz from $170,000 to $187,000', 'Demand for salt is price inelastic. Demand for the Mercedes is price elastic.'],
      ['5.2.3 (iii)', 'The demand for petrol is…', 'More price elastic in the long run, as people switch to fuel-efficient or electric cars, public transport or carpooling.'],
      ['5.3', 'Y Ed = 1.5 and income rises 5%: sales of this good…', 'Rise by 7.5% (1.5 × 5%).'],
      ['5.4', 'Positive XP Ed: P<sub>B</sub> … Qd<sub>B</sub> … D<sub>A</sub>', 'P<sub>B</sub> ↑ → Qd<sub>B</sub> ↓ → D<sub>A</sub> ↑ (substitutes).'],
      ['5.4', 'Negative XP Ed: P<sub>B</sub> … Qd<sub>B</sub> … D<sub>A</sub>', 'P<sub>B</sub> ↑ → Qd<sub>B</sub> ↓ → D<sub>A</sub> ↓ (complements).']
    ],
    quiz: [
      {
        q: 'The price of a good rises from $10 to $12 and quantity demanded falls from 50 to 40. Using the midpoint formula, Price Ed is about:',
        options: ['0.82', '1.0', '1.22', '2.0'],
        answer: 2,
        why: '%ΔQ = −10 ÷ 45 = −22.2%. %ΔP = 2 ÷ 11 = 18.2%. 22.2 ÷ 18.2 ≈ 1.22, which is elastic.'
      },
      {
        q: 'A good has a price elasticity of demand of 0.4. Its demand is:',
        options: ['Elastic', 'Inelastic', 'Unitary elastic', 'Perfectly elastic'],
        answer: 1,
        why: 'Less than 1 means quantity demanded changes by a smaller percentage than price.'
      },
      {
        q: 'Demand for a firm’s product is inelastic. If the firm raises its price, total revenue will:',
        options: ['Rise', 'Fall', 'Stay the same', 'Fall to zero'],
        answer: 0,
        why: 'With inelastic demand, quantity falls by a smaller percentage than price rises, so P × Q goes up.'
      },
      {
        q: 'A perfectly elastic demand curve is:',
        options: ['Vertical', 'Horizontal', 'Downward sloping and steep', 'Upward sloping'],
        answer: 1,
        why: 'Perfectly elastic (Ed = ∞) means any price rise drops quantity demanded to zero, which gives a horizontal line.'
      },
      {
        q: 'Which of these probably has the most price-elastic demand?',
        options: ['Laptops as a whole', 'One particular brand of laptop', 'Salt', 'Tobacco'],
        answer: 1,
        why: 'A narrowly defined good has many close substitutes, since buyers can switch to other brands.'
      },
      {
        q: 'Income rises by 10% and quantity demanded of a good falls by 5%. The good is:',
        options: [
          'A normal good with Y Ed = 0.5',
          'An inferior good with Y Ed = −0.5',
          'A luxury with Y Ed = 2',
          'Unrelated to income'
        ],
        answer: 1,
        why: 'Y Ed = −5% ÷ 10% = −0.5. A negative sign means an inferior good.'
      },
      {
        q: 'The cross price elasticity of demand between goods A and B is +0.8. A and B are:',
        options: ['Complements', 'Substitutes', 'Unrelated', 'Inferior goods'],
        answer: 1,
        why: 'A positive coefficient means a rise in B’s price increases demand for A, so they’re substitutes.'
      },
      {
        q: 'According to your notes, which formula should you use for income elasticity of demand?',
        ref: 6, // 5.3 Income elasticity of demand
        options: [
          'The midpoint formula',
          'The simple formula, using the old values as the base',
          'Either, since they always give the same answer',
          'TR = P × Q'
        ],
        answer: 1,
        why: 'The notes say income and cross price elasticity use the simple formula. Only price elasticity uses the midpoint formula.'
      }
    ]
  },

  {
    id: 'm-costs',
    unit: 'm',
    title: 'Production and Its Costs',
    summary: 'Short-run production (TP, AP, MP and diminishing returns), short-run cost curves, and long-run economies of scale.',
    minutes: 22,
    body: `
<h2>6.1 Decision time frames</h2>
<p>Economists look at production over two time frames:</p>
<ul>
  <li><strong>Short run:</strong> a period so short that there is at least one <strong>fixed input</strong>.</li>
  <li><strong>Long run:</strong> a period so long that <strong>all inputs are variable</strong>. There are no fixed inputs.</li>
</ul>
<p>In the short run, a firm has two kinds of input:</p>
<ul>
  <li>A <strong>variable input</strong> can be changed during the period, for example the number of workers, raw materials or electricity.</li>
  <li>A <strong>fixed input</strong> can’t be changed during the period, for example the factory building, land or large machinery.</li>
</ul>
<p>These are not set lengths of time. The short run for a food stall might be a week; for a chip factory, several years.</p>

<h2>6.2 Short-run production</h2>
<p>There are three product curves in the short run: total product, average product and marginal product. Here is the wheat farm from your notes, where workers (the variable input) are added to a fixed amount of land and equipment:</p>
<div class="table-wrap"><table class="num">
  <thead><tr><th>Workers per day</th><th>Total product (bushels)</th><th>Marginal product</th><th>Average product</th></tr></thead>
  <tbody>
    <tr><td>0</td><td>0</td><td>–</td><td>–</td></tr>
    <tr><td>1</td><td>10</td><td>10</td><td>10</td></tr>
    <tr><td>2</td><td>22</td><td>12</td><td>11</td></tr>
    <tr><td>3</td><td>33</td><td>11</td><td>11</td></tr>
    <tr><td>4</td><td>42</td><td>9</td><td>10.5</td></tr>
    <tr><td>5</td><td>48</td><td>6</td><td>9.6</td></tr>
    <tr><td>6</td><td>50</td><td>2</td><td>8.3</td></tr>
    <tr><td>7</td><td>48</td><td>−2</td><td>6.9</td></tr>
  </tbody>
</table></div>
<div data-widget="production"></div>

<h3>Total product and marginal product</h3>
<p><strong>Total product</strong> (TP) is the output produced as more units of the variable input are added to the fixed input.</p>
<p><strong>Marginal product</strong> (MP) is the change in total output from adding one more unit of the variable input:</p>
<div class="formula"><strong>MP = ΔTP ÷ ΔVI</strong></div>
<p>On a graph, MP is the <strong>slope of the TP curve</strong> (the gradient of a tangent to it), because slope = Δ vertical ÷ Δ horizontal = ΔTP ÷ ΔVI.</p>
<p>The shape of the TP curve comes from the <strong>law of diminishing returns</strong>: <em>beyond some point, marginal product decreases as more units of a variable input are added to a fixed input.</em> Follow the table:</p>
<ul>
  <li><strong>Workers 1 to 2: MP rises</strong> (10, then 12). With only one worker, the land and equipment are under-used. A second worker allows <em>specialisation</em> and better use of the fixed input, so output increases at an <em>increasing</em> rate.</li>
  <li><strong>Workers 3 to 6: MP falls</strong> (11, 9, 6, 2). Diminishing returns have set in. Each new worker has less of the fixed input to work with, so each adds less than the one before. Output still increases, but at a <em>decreasing</em> rate.</li>
  <li><strong>Worker 6: TP is at its maximum</strong> (50 bushels).</li>
  <li><strong>Worker 7: MP is negative</strong> (−2), so TP falls. There are now too many variable inputs for too little fixed input, and workers get in each other’s way.</li>
</ul>

<h3>Average product</h3>
<p><strong>Average product</strong> (AP) is total output divided by the number of units of variable input:</p>
<div class="formula"><strong>AP = TP ÷ VI</strong></div>
<p>Like MP, AP rises, reaches a maximum, then falls. <strong>MP determines what happens to AP:</strong></p>
<ul>
  <li>When MP &gt; AP, MP pulls AP <strong>up</strong>.</li>
  <li>When MP &lt; AP, MP pulls AP <strong>down</strong>.</li>
  <li>So MP = AP when AP is at its <strong>maximum</strong>. In the table, the 3rd worker’s MP (11) equals AP (11), the highest AP reaches.</li>
</ul>
<p>Think of your grade average: if your next test score is above your average, your average rises; if it’s below, your average falls.</p>

<h2>6.3 Short-run cost curves</h2>
<p>In the short run a firm has fixed and variable inputs, so it has fixed and variable costs.</p>
<h3>6.3.1 Total cost curves</h3>
<ul>
  <li><strong>Total fixed cost (TFC)</strong> is the cost of the fixed inputs. It doesn’t change with output and must be paid even when output is zero, for example rent, insurance, loan interest and salaries of permanent staff. The TFC curve is a <strong>horizontal line</strong>. It shifts up or down only if the fixed input (such as plant size) changes.</li>
  <li><strong>Total variable cost (TVC)</strong> is the cost of the variable inputs, for example wages of hourly workers, raw materials and electricity. It is zero when output is zero and rises as output rises, because more variable input is needed. The TVC curve <strong>starts at the origin</strong> and slopes upward.</li>
  <li><strong>Total cost (TC)</strong> is the sum of the two: <strong>TC = TFC + TVC</strong>. At zero output, TC = TFC. The vertical gap between TC and TVC is always TFC.</li>
</ul>
<h3>6.3.2 Average cost curves</h3>
<div class="table-wrap"><table>
  <thead><tr><th>Cost</th><th>Formula</th><th>Meaning</th><th>Shape</th></tr></thead>
  <tbody>
    <tr><td>Average fixed cost</td><td>AFC = TFC ÷ Q</td><td>Fixed cost per unit</td><td>Falls continuously as output rises: the same fixed cost is spread over more units</td></tr>
    <tr><td>Average variable cost</td><td>AVC = TVC ÷ Q</td><td>Variable cost per unit</td><td>U-shaped</td></tr>
    <tr><td>Average total cost</td><td>ATC = TC ÷ Q = AFC + AVC</td><td>Total cost per unit</td><td>U-shaped</td></tr>
    <tr><td>Marginal cost</td><td>MC = ΔTC ÷ ΔQ</td><td>Cost of producing one more unit</td><td>U-shaped</td></tr>
  </tbody>
</table></div>
<p>ATC is always above AVC, and the <strong>gap between them is AFC</strong>. The gap gets smaller as output rises, because AFC keeps falling as fixed cost is spread over more units.</p>

<h3>Why MC is U-shaped: it mirrors MP</h3>
<p>The MC curve is a mirror image of the MP curve. Suppose each worker is paid $10. The first worker produces 10 bushels, so each bushel costs $10 ÷ 10 = $1.00. The second worker produces 12 bushels, so each extra bushel costs $10 ÷ 12 = $0.83. While workers are getting more productive (MP rising), MC falls. Once diminishing returns set in (MP falling), each extra bushel costs more, so MC rises.</p>
<div class="note key">
  <p class="note-label">Key principle linking product and cost curves</p>
  <p><strong>MC = wage ÷ MP</strong> and <strong>AVC = wage ÷ AP</strong>. When MP rises, MC falls. When MP is at its maximum, MC is at its minimum. When AP is at its maximum, AVC is at its minimum.</p>
</div>
<div class="table-wrap"><table class="num">
  <thead><tr><th>Workers</th><th>TP</th><th>MP</th><th>MC per bushel (wage $60 ÷ MP)</th><th>AVC per bushel ($60 × workers ÷ TP)</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>10</td><td>10</td><td>$6.00</td><td>$6.00</td></tr>
    <tr><td>2</td><td>22</td><td>12</td><td>$5.00</td><td>$5.45</td></tr>
    <tr><td>3</td><td>33</td><td>11</td><td>$5.45</td><td>$5.45</td></tr>
    <tr><td>4</td><td>42</td><td>9</td><td>$6.67</td><td>$5.71</td></tr>
    <tr><td>5</td><td>48</td><td>6</td><td>$10.00</td><td>$6.25</td></tr>
    <tr><td>6</td><td>50</td><td>2</td><td>$30.00</td><td>$7.20</td></tr>
  </tbody>
</table></div>
<p>MC is lowest ($5.00) where MP is highest (the 2nd worker), and AVC is lowest ($5.45) where AP is highest (2 to 3 workers).</p>

<h3>6.3.3 How MC relates to the average costs</h3>
<p>MC determines what happens to AVC and ATC:</p>
<ul>
  <li>When MC &lt; AVC (or ATC), AVC (or ATC) <strong>falls</strong>.</li>
  <li>When MC &gt; AVC (or ATC), AVC (or ATC) <strong>rises</strong>.</li>
  <li>So <strong>MC cuts AVC and ATC at their minimum points</strong>.</li>
</ul>
<p>MC is <em>not</em> related to AFC. MC is the change in total cost from one more unit, and fixed cost doesn’t change with output, so fixed cost never enters MC.</p>
<p>That tells you which curves move when costs change:</p>
<div class="table-wrap"><table>
  <thead><tr><th>If this rises…</th><th>These curves shift up</th><th>These don’t move</th></tr></thead>
  <tbody>
    <tr><td>A fixed cost (such as rent)</td><td>TFC, TC, AFC, ATC</td><td>TVC, AVC, MC</td></tr>
    <tr><td>A variable cost (such as the wage rate)</td><td>TVC, TC, AVC, ATC, MC</td><td>TFC, AFC</td></tr>
  </tbody>
</table></div>
<p>Try it with the sliders:</p>
<div data-widget="costs"></div>

<h2>6.4 Production in the long run</h2>
<p>In the long run there are no fixed inputs, so there are no fixed costs. Given enough time, a firm can change everything, including its factory size. That means it can choose the <strong>best input combination</strong>: the one that produces its output at the lowest possible cost.</p>
<p>The law of diminishing returns doesn’t apply in the long run, because it needs a fixed input. Long-run production depends instead on <strong>returns to scale</strong>: what happens to output when <em>all</em> inputs are increased in the same proportion.</p>

<h3>6.4.1 The long-run average cost (LRAC) curve</h3>
<div data-widget="lrac"></div>
<ul>
  <li><strong>Increasing returns to scale (economies of scale).</strong> Output increases <em>more than proportionately</em> to the increase in all inputs, so long-run average cost falls. If a firm doubles all its inputs, its costs double but its output more than doubles, so cost per unit falls. The main reason is <em>specialisation</em>: as the wheat farm grows, it can have dedicated teams for harvesting, sorting and packing. Each team gets faster, so productivity rises and average cost falls.</li>
  <li><strong>Constant returns to scale.</strong> Output increases <em>in the same proportion</em> as inputs. Productivity doesn’t change, so average cost stays constant.</li>
  <li><strong>Decreasing returns to scale (diseconomies of scale).</strong> Output increases <em>less than proportionately</em> to inputs, so average cost rises. When a firm gets too big, red tape and management problems appear: coordination gets harder, communication slows, and decisions take longer.</li>
</ul>
<div class="note example">
  <p class="note-label">Worked example</p>
  <p>A firm doubles all its inputs, so its costs double from $100,000 to $200,000. If output rises from 10,000 to <strong>25,000</strong> units, average cost falls from $10 to $8 (economies of scale). If output rises to exactly <strong>20,000</strong>, average cost stays at $10 (constant returns). If output rises only to <strong>16,000</strong>, average cost rises to $12.50 (diseconomies of scale).</p>
</div>
`,
    terms: [
      ['Short run', 'A period so short that at least one input is fixed.'],
      ['Long run', 'A period so long that all inputs are variable.'],
      ['Variable input', 'An input whose quantity can be changed during the period being considered, such as labour or raw materials.'],
      ['Fixed input', 'An input whose quantity cannot be changed during the period being considered, such as a factory building.'],
      ['Total product', 'The total output produced as units of a variable input are added to a fixed input.'],
      ['Marginal product', 'The change in total output from adding one more unit of variable input: ΔTP ÷ ΔVI.'],
      ['Average product', 'Total output divided by the number of units of variable input: TP ÷ VI.'],
      ['Law of diminishing returns', 'Beyond some point, marginal product decreases as more units of a variable input are added to a fixed input.'],
      ['Total fixed cost', 'The cost of fixed inputs. It does not vary with output and must be paid even when output is zero.'],
      ['Total variable cost', 'The cost of variable inputs. It is zero at zero output and rises as output rises.'],
      ['Total cost', 'The sum of total fixed cost and total variable cost at each level of output.'],
      ['Average fixed cost', 'Total fixed cost divided by output. It falls continuously as output rises.'],
      ['Average variable cost', 'Total variable cost divided by output. It is U-shaped.'],
      ['Average total cost', 'Total cost divided by output, equal to AFC + AVC. It is U-shaped.'],
      ['Marginal cost', 'The change in total cost when one more unit of output is produced: ΔTC ÷ ΔQ.'],
      ['Returns to scale', 'What happens to output when all inputs are increased in the same proportion (a long-run concept).'],
      ['Economies of scale', 'When output increases more than proportionately to the increase in all inputs, so long-run average cost falls.'],
      ['Constant returns to scale', 'When output increases in the same proportion as all inputs, so long-run average cost stays constant.'],
      ['Diseconomies of scale', 'When output increases less than proportionately to the increase in all inputs, so long-run average cost rises.']
    ],
    review: [
      ['How do you differentiate between the short run and the long run?', '<p>In the short run at least one input is fixed. In the long run all inputs are variable.</p>'],
      ['What is the difference between a variable input and a fixed input?', '<p>A variable input can be changed during the period (workers, raw materials). A fixed input can’t (factory building, large machinery).</p>'],
      ['What determines the shapes of the TP, AP and MP curves?', '<p>The law of diminishing returns. MP rises at first (specialisation and better use of the fixed input), then falls as each worker has less fixed input to work with, and eventually turns negative. TP rises at an increasing rate, then at a decreasing rate, peaks, then falls. AP rises then falls.</p>'],
      ['How do you calculate AP and MP?', '<p>AP = TP ÷ VI. MP = ΔTP ÷ ΔVI. For example, going from 3 to 4 workers raises TP from 33 to 42, so MP = 9. AP at 4 workers = 42 ÷ 4 = 10.5.</p>'],
      ['What is the relationship between AP and MP?', '<p>When MP &gt; AP, AP rises. When MP &lt; AP, AP falls. MP = AP at AP’s maximum.</p>'],
      ['What links the product curves and the cost curves?', '<p>MC = wage ÷ MP and AVC = wage ÷ AP. MC is a mirror image of MP (MC is lowest where MP is highest), and AVC is a mirror image of AP.</p>'],
      ['What explains the shapes of the cost curves?', '<p>TFC is horizontal (fixed). TVC starts at the origin and rises. TC = TFC + TVC. AFC falls continuously as fixed cost is spread over more units. MC, AVC and ATC are U-shaped because of the law of diminishing returns.</p>'],
      ['What is the key principle linking product and cost curves?', '<p>When productivity (MP or AP) rises, the matching cost (MC or AVC) falls, and the reverse. Diminishing returns in production cause rising costs.</p>'],
      ['How do you calculate AVC, ATC, AFC and MC?', '<p>AFC = TFC ÷ Q, AVC = TVC ÷ Q, ATC = TC ÷ Q (= AFC + AVC), MC = ΔTC ÷ ΔQ.</p>'],
      ['What is the relationship between MC, AVC and ATC?', '<p>When MC is below them, they fall. When MC is above them, they rise. MC cuts AVC and ATC at their minimum points.</p>'],
      ['Which cost curves move when variable cost changes, and which move when fixed cost changes?', '<p>A change in fixed cost moves TFC, TC, AFC and ATC, but not TVC, AVC or MC. A change in variable cost moves TVC, TC, AVC, ATC and MC, but not TFC or AFC.</p>'],
      ['What determines the shape of the LRAC curve?', '<p>Returns to scale. Economies of scale make it fall, constant returns keep it flat, and diseconomies of scale make it rise, which gives a U shape (often with a flat bottom).</p>'],
      ['Explain economies of scale, diseconomies of scale and constant returns to scale with examples.', '<p>Economies: doubling inputs more than doubles output, as when a growing farm sets up specialised teams for harvesting, sorting and packing. Constant: doubling inputs exactly doubles output. Diseconomies: doubling inputs less than doubles output, as when a very large firm suffers red tape and management problems.</p>']
    ],
    blanks: [
      ['6.1', 'Variable input, e.g.… / fixed input, e.g.…', 'Variable: workers (labour), raw materials, electricity. Fixed: factory building, land, large machinery.'],
      ['6.2', 'Formula for MP', 'MP = ΔTP ÷ ΔVI'],
      ['6.2', 'Why is MP the slope of the tangent to TP?', 'Slope = Δ vertical ÷ Δ horizontal = ΔTP ÷ ΔVI, which is MP.'],
      ['6.2', 'Why does MP rise between 1 and 2 workers?', 'With few workers the fixed input is under-used. Adding a worker allows specialisation and better use of the fixed input.'],
      ['6.2', 'Why does MP fall from 3 to 6 workers?', 'Law of diminishing returns: each extra worker has less of the fixed input to work with, so adds less output.'],
      ['6.2', 'Total output falls after the 6th worker because…', 'There are too many variable inputs and too little fixed input to work with, so MP turns negative.'],
      ['6.2', 'Formula for AP', 'AP = TP ÷ VI'],
      ['6.3.1', 'TFC example / TVC example', 'TFC: rent, insurance, loan interest. TVC: wages of hourly workers, raw materials, electricity.'],
      ['6.3.1', 'TC =', 'TFC + TVC'],
      ['6.3.2', 'AFC = / AVC = / ATC =', 'TFC ÷ Q / TVC ÷ Q / TC ÷ Q (= AFC + AVC)'],
      ['6.3.2', 'Why does the gap between ATC and AVC get smaller as output increases?', 'The gap is AFC, which falls as output rises because the fixed cost is spread over more units.'],
      ['6.3.2', 'Formula for MC', 'MC = ΔTC ÷ ΔQ (which also equals ΔTVC ÷ ΔQ)'],
      ['6.3.3', 'When MC &lt; AVC/ATC… / When MC &gt; AVC/ATC…', 'AVC and ATC fall. / AVC and ATC rise.'],
      ['6.3.3', 'Why is MC not related to AFC?', 'MC is the change in total cost from one more unit. Fixed cost doesn’t change with output, so it doesn’t affect MC.'],
      ['6.3.3', 'Key principles', 'MC = wage ÷ MP and AVC = wage ÷ AP. When MP (AP) rises, MC (AVC) falls. MC is at its minimum where MP is at its maximum, and AVC is at its minimum where AP is at its maximum.'],
      ['6.4', 'What is the best input combination?', 'The combination of inputs that produces a given output at the lowest possible cost.'],
      ['6.4.1', 'Economies / diseconomies / constant returns (in symbols)', 'Output rises by more than inputs (%Δoutput &gt; %Δinputs). / Output rises by less than inputs. / Output rises by the same proportion as inputs.']
    ],
    quiz: [
      {
        q: 'The short run is a period in which:',
        options: [
          'All inputs are variable',
          'At least one input is fixed',
          'Output is fixed',
          'Firms make no profit'
        ],
        answer: 1,
        why: 'If at least one input can’t be changed, it’s the short run. The long run has no fixed inputs.'
      },
      {
        q: 'Marginal product is calculated as:',
        options: ['TP ÷ VI', 'ΔTP ÷ ΔVI', 'TC ÷ Q', 'ΔTC ÷ ΔQ'],
        answer: 1,
        why: 'MP is the change in total product from one more unit of variable input. TP ÷ VI is average product.'
      },
      {
        q: 'On the wheat farm, what is the marginal product of the 4th worker? (TP: 3 workers = 33, 4 workers = 42)',
        options: ['9', '10.5', '42', '11'],
        answer: 0,
        why: 'MP = 42 − 33 = 9. The average product at 4 workers would be 42 ÷ 4 = 10.5.'
      },
      {
        q: 'The law of diminishing returns states that:',
        options: [
          'Average cost always falls as output rises',
          'Beyond some point, MP decreases as more variable input is added to a fixed input',
          'Output falls whenever a worker is added',
          'Doubling all inputs doubles output'
        ],
        answer: 1,
        why: 'It is a short-run law about adding a variable input to a fixed input. Output can still rise; it just rises by less each time.'
      },
      {
        q: 'When marginal product is greater than average product:',
        options: ['AP falls', 'AP rises', 'AP is at its minimum', 'TP falls'],
        answer: 1,
        why: 'An extra unit that’s above the average pulls the average up.'
      },
      {
        q: 'Which cost curve falls continuously as output increases?',
        options: ['AVC', 'MC', 'AFC', 'ATC'],
        answer: 2,
        why: 'AFC = TFC ÷ Q. The same fixed cost spread over more units always gets smaller.'
      },
      {
        q: 'A factory’s rent goes up. Which curves shift up?',
        options: [
          'MC and AVC',
          'TFC, TC, AFC and ATC',
          'All cost curves',
          'Only TVC'
        ],
        answer: 1,
        why: 'Rent is a fixed cost. It doesn’t change with output, so it doesn’t affect TVC, AVC or MC.'
      },
      {
        q: 'A firm doubles all its inputs and its output more than doubles. It is experiencing:',
        options: [
          'Diminishing returns',
          'Economies of scale, so LRAC falls',
          'Diseconomies of scale, so LRAC rises',
          'Constant returns to scale'
        ],
        answer: 1,
        why: 'Output rising more than proportionately to all inputs means increasing returns to scale, so cost per unit falls.'
      }
    ]
  },

  {
    id: 'm-structures',
    unit: 'm',
    title: 'Market Structure',
    summary: 'Firms and industries, barriers to entry, the three kinds of profit, and the four market structures with their demand curves.',
    minutes: 18,
    body: `
<h2>7.1 Firm and industry</h2>
<ul>
  <li>A <strong>firm</strong> is an organisation that produces goods and services. Every producer is a firm, whatever its size or product.</li>
  <li>An <strong>industry</strong> is a group of firms that sell a well-defined product or a closely related set of products.</li>
</ul>
<p>Gardenia is a firm. Gardenia, Sunshine, Hi-5 and Bonjour together make up the bread industry.</p>

<h2>7.2 What market structure means</h2>
<p><strong>Market structure</strong> is a way of classifying markets by their key characteristics. There are three main ones:</p>
<ol>
  <li><strong>The number of firms:</strong> only one firm, many firms, or a few big firms.</li>
  <li><strong>The type of product:</strong> <em>homogeneous</em> (identical, so customers don’t care which firm they buy from) or <em>differentiated</em> (different, so customers will pay different prices).</li>
  <li><strong>The ease of entry into and exit from the market:</strong> whether there are barriers.</li>
</ol>
<p>Together these decide a firm’s <strong>market power</strong>: its ability to change the market price of its good or service.</p>

<h3>Barriers to entry</h3>
<p><strong>Barriers to entry</strong> are factors that make it difficult or impossible for new firms to enter a market.</p>
<ul>
  <li><strong>Legal barriers.</strong>
    <ul>
      <li><em>Government licensing</em> restricts entry into some industries and occupations.</li>
      <li>A <em>franchise</em> gives the holder the sole legal right to supply a good or service under a brand, as with Subway sandwiches.</li>
      <li>A <em>patent</em> stops other firms from selling an invention for a number of years (10 to 25). Apple has patents on the iPhone’s basic shape and some of its interface, and sued Samsung in 2011 over similarities.</li>
    </ul>
  </li>
  <li><strong>Natural barriers.</strong>
    <ul>
      <li><em>Control of an essential input</em> needed to make the product.</li>
      <li><em>Economies of scale</em> (Topic 6): one big firm can produce at a lower average cost than several small ones, so it can supply the whole market. This is a <em>natural monopoly</em>.</li>
    </ul>
  </li>
</ul>

<h3>The four market structures</h3>
<p>From left to right, market power increases. The three on the right are called <strong>imperfect competition</strong>.</p>
<div class="table-wrap"><table>
  <thead><tr><th></th><th>Perfect competition</th><th>Monopolistic competition</th><th>Oligopoly</th><th>Monopoly</th></tr></thead>
  <tbody>
    <tr><td>Number of sellers</td><td>Very many, small</td><td>Many, relatively small</td><td>A few, large</td><td>One</td></tr>
    <tr><td>Type of product</td><td>Homogeneous</td><td>Differentiated</td><td>Homogeneous or differentiated</td><td>Unique, no close substitutes</td></tr>
    <tr><td>Barriers to entry</td><td>None</td><td>Low</td><td>Strong</td><td>Very strong</td></tr>
    <tr><td>Market power</td><td>None (price taker)</td><td>Some</td><td>Substantial, but mutually interdependent</td><td>Great (price maker)</td></tr>
    <tr><td>Firm’s demand curve</td><td>Horizontal (perfectly elastic)</td><td>Downward sloping, fairly elastic</td><td>Kinked</td><td>Downward sloping (the market demand)</td></tr>
    <tr><td>Long-run profit</td><td>Normal only</td><td>Normal only</td><td>Normal or economic</td><td>Normal or economic</td></tr>
    <tr><td>Examples</td><td>Farm products, stock market, foreign exchange (close to it)</td><td>Hair salons, hotels, shampoo and T-shirt shops</td><td>Bread, cars, oil, airlines</td><td>Singapore Post</td></tr>
  </tbody>
</table></div>

<h3>Three kinds of profit</h3>
<p><strong>Profit = total revenue − total cost</strong>, where total cost includes all opportunity costs (including a normal return to the owner).</p>
<ul>
  <li><strong>Economic (supernormal) profit:</strong> TR &gt; TC. The firm earns more than it needs to stay in the industry.</li>
  <li><strong>Normal profit (zero economic profit):</strong> TR = TC. The firm earns just enough to keep it in the industry.</li>
  <li><strong>Economic loss (subnormal profit):</strong> TR &lt; TC.</li>
</ul>
<p>In the <strong>short run</strong>, a firm in any market structure can make any of the three. The long run is where the structures differ: where entry is free, new firms arrive whenever there are economic profits, and those profits get competed away.</p>
<p>Explore each structure and its demand curve here:</p>
<div data-widget="structures"></div>

<h2>7.3 Perfect competition</h2>
<ol>
  <li><strong>A large number of small firms.</strong> Each has a tiny share of the market, so changing its own output can’t affect the price. Each firm acts independently.</li>
  <li><strong>A homogeneous product.</strong> Every firm sells an identical product, so there’s no point advertising against rivals, and buyers don’t care which seller they buy from.</li>
  <li><strong>No barriers to entry.</strong> Firms and resources can freely enter or leave. This keeps the number of firms large, and means firms can earn only <strong>normal profit in the long run</strong>.</li>
  <li><strong>Perfect knowledge.</strong> Buyers and sellers know all prices.</li>
</ol>
<p>No real market is perfectly competitive, but farm products, the stock market and the foreign exchange market come close.</p>
<h3>The perfectly competitive firm’s demand curve</h3>
<p>A perfectly competitive firm is a <strong>price taker</strong>: a firm that can’t influence the market price and must accept it. The price is set by <strong>market demand and supply</strong> for the whole industry. If the market price is $1, the firm can sell as much as it likes at $1, so its demand curve is <strong>horizontal (perfectly elastic)</strong> at $1. This line is labelled <strong>D = P = AR = MR</strong>: every unit sells for the same price, so average revenue and marginal revenue both equal the price.</p>
<ul>
  <li><strong>Why not charge more?</strong> It would lose all its customers, since many other firms sell the identical product at $1.</li>
  <li><strong>Why not charge less?</strong> It can already sell everything it wants at $1, so a lower price would only reduce revenue and profit.</li>
</ul>

<h2>7.4 Monopoly</h2>
<ol>
  <li><strong>A single firm.</strong> Singapore Post is the only national postal service for physical mail, and the only one with access to all local mailboxes.</li>
  <li><strong>A unique product</strong> with no close substitutes.</li>
  <li><strong>Very strong barriers to entry.</strong> Singapore Post holds the exclusive licence to run the local postal service. Barriers like this mean a monopolist can keep making <strong>economic profit even in the long run</strong>.</li>
</ol>
<h3>The monopolist’s demand curve</h3>
<p>Because the monopolist is the only seller, <strong>its demand curve is the market demand curve</strong>, which slopes downward (D = AR). It is a <strong>price maker</strong>: it can choose the price or the quantity, but not both, because it still has to stay on the demand curve.</p>
<p>Its market power comes from (1) being the only seller of a product with no close substitutes and (2) strong barriers to entry. The more market power it has, the more inelastic its demand curve.</p>

<h2>7.5 Monopolistic competition</h2>
<ol>
  <li><strong>A large number of relatively small firms.</strong> Each has a small share of the market, so its market power is limited and it acts independently, without worrying about how rivals will react.</li>
  <li><strong>Differentiated products.</strong> Products are close but not perfect substitutes, which gives each firm some market power. <em>Product differentiation</em> means creating real or perceived differences between products. Whether real or just perceived, what matters is that consumers will pay different prices. This structure is common in retail (shampoo, T-shirts) and services (hotels, hairstylists).</li>
  <li><strong>Minimal barriers to entry and exit.</strong> Firms enter easily when there are profits, so each firm earns only <strong>normal profit in the long run</strong>.</li>
</ol>
<p>Because products are differentiated, these firms use <strong>non-price competition</strong>, such as packaging and advertising, to create a distinct positive image. The aim is to <strong>increase demand</strong> for their product (shift its demand curve right) and to make demand <strong>more inelastic</strong> by building customer loyalty.</p>
<h3>Demand curve</h3>
<p>It slopes downward, since the firm has some market power, but it is <strong>more elastic than a monopolist’s</strong>, since it has less power. If the firm raises its price, it loses <em>some</em> customers, not all. If it cuts its price, it draws some customers away from competitors.</p>

<h2>7.6 Oligopoly</h2>
<ol>
  <li><strong>A small number of relatively large firms.</strong> A few firms supply most of the market. This gives each firm substantial market power and creates <strong>mutual interdependence</strong>: each firm’s decisions affect its rivals, so each must consider how the others will react. When Gardenia considers a price rise or a new style, it has to predict how Sunshine, Hi-5 and Bonjour will respond.</li>
  <li><strong>Homogeneous or differentiated products.</strong> Oil, zinc, copper and aluminium are identical whoever makes them. Cars, tyres and bread are differentiated. Oligopolists often compete through non-price competition, such as advertising and product differentiation, to win business from rivals.</li>
  <li><strong>Strong barriers to entry</strong>, as with monopoly. This means oligopolies can earn <strong>economic profit in the long run</strong>.</li>
</ol>
<h3>The kinked demand curve</h3>
<p>Because of mutual interdependence, each firm’s demand depends on how rivals react. The <strong>kinked demand curve</strong> model assumes that <strong>rivals will match a price cut but ignore a price increase</strong>.</p>
<ul>
  <li><strong>Above the current price, demand is highly elastic.</strong> If the firm raises its price, rivals don’t follow, so it loses many customers to them.</li>
  <li><strong>Below the current price, demand is very inelastic.</strong> If the firm cuts its price, rivals match the cut, so it doesn’t gain market share.</li>
</ul>
<p>Either way the firm loses out by changing its price, which is why prices in oligopolies tend to stay stable.</p>
`,
    terms: [
      ['Firm', 'An organisation that produces goods and services.'],
      ['Industry', 'A group of firms that sell a well-defined product or a closely related set of products.'],
      ['Market structure', 'A classification of markets by the number of firms, the type of product and the ease of entry and exit.'],
      ['Market power', 'A firm’s ability to change the market price of its good or service.'],
      ['Barriers to entry', 'Factors that make it difficult or impossible for new firms to enter a market, such as licences, patents, franchises, control of inputs or economies of scale.'],
      ['Economic profit', 'Profit when total revenue exceeds total cost, including opportunity costs. Also called supernormal profit.'],
      ['Normal profit', 'Zero economic profit (TR = TC): just enough to keep the firm in the industry.'],
      ['Economic loss', 'When total revenue is less than total cost. Also called subnormal profit.'],
      ['Perfect competition', 'A market with many small firms selling a homogeneous product, no barriers to entry and perfect knowledge.'],
      ['Price taker', 'A firm that cannot influence the market price and must accept it.'],
      ['Monopoly', 'A market with a single firm selling a unique product, protected by very strong barriers to entry.'],
      ['Price maker', 'A firm with market power that can set its own price (though it must stay on its demand curve).'],
      ['Monopolistic competition', 'A market with many relatively small firms selling differentiated products, with minimal barriers to entry.'],
      ['Product differentiation', 'Creating real or perceived differences between similar goods so consumers will pay different prices for them.'],
      ['Non-price competition', 'Competing through advertising, packaging, branding and product features rather than price.'],
      ['Oligopoly', 'A market with a few large firms selling homogeneous or differentiated products, protected by strong barriers to entry.'],
      ['Mutual interdependence', 'A situation where each firm’s actions affect its rivals, so each must consider how the others will react.'],
      ['Kinked demand curve', 'An oligopolist’s demand curve that assumes rivals match price cuts but ignore price increases. It is elastic above the current price and inelastic below it.']
    ],
    review: [
      ['What is the difference between a firm and an industry?', '<p>A firm is a single organisation producing goods or services, such as Gardenia. An industry is the group of firms selling a well-defined product, such as the bread industry.</p>'],
      ['What characteristics define a market structure?', '<p>The number of firms, the type of product (homogeneous or differentiated) and the ease of entry and exit (barriers).</p>'],
      ['What are the implications of each characteristic?', '<p>More firms means less market power per firm. Differentiated products give some market power and lead to non-price competition. Barriers to entry protect profits: with no barriers, only normal profit is possible in the long run; with strong barriers, economic profit can last.</p>'],
      ['What types of barriers to entry are there?', '<p>Legal: government licensing, franchises, patents. Natural: control of an essential input, economies of scale (natural monopoly).</p>'],
      ['What are the types of profit?', '<p>Economic (supernormal) profit: TR &gt; TC. Normal profit: TR = TC. Economic loss (subnormal profit): TR &lt; TC.</p>'],
      ['What are the characteristics and examples of the four market structures?', '<p>Perfect competition: many small firms, identical product, no barriers, perfect knowledge (farm products). Monopolistic competition: many small firms, differentiated products, low barriers (hair salons). Oligopoly: a few large firms, homogeneous or differentiated products, strong barriers (bread, cars, oil). Monopoly: one firm, unique product, very strong barriers (Singapore Post).</p>'],
      ['How do you describe and explain the demand curve of a firm in each market structure?', '<p>Perfect competition: horizontal (D = P = AR = MR), because the firm is a price taker. Monopolistic competition: downward sloping but fairly elastic, because of close substitutes. Oligopoly: kinked, elastic above the current price (rivals ignore rises) and inelastic below (rivals match cuts). Monopoly: the downward-sloping market demand curve (D = AR), more inelastic the more market power it has.</p>']
    ],
    blanks: [
      ['7.2', 'Market structure is a classification system for the key characteristics of a market, including…', 'The number of firms, the type of product sold, and the ease of entry into and exit from the market.'],
      ['7.2', 'What are barriers to entry?', 'Factors that make it difficult or impossible for new firms to enter a market.'],
      ['7.2', 'Imperfect competition table', 'Perfect competition (not imperfect), then the imperfect structures: monopolistic competition, oligopoly, monopoly. Sellers: very many / many / few / one. Product: homogeneous / differentiated / either / unique. Barriers: none / low / strong / very strong.'],
      ['7.2', 'Profits of a firm', 'Profit = total revenue − total cost (including opportunity costs).'],
      ['7.2', 'Economic (supernormal) profit', 'TR &gt; TC: the firm earns more than the minimum needed to stay in the industry.'],
      ['7.2', 'Normal (zero economic) profit', 'TR = TC: just enough to keep the firm in the industry.'],
      ['7.2', 'Economic loss (subnormal profit)', 'TR &lt; TC.'],
      ['7.3', 'What is a price taker?', 'A firm that cannot influence the market price and must accept it.'],
      ['7.3', 'What determines the price at which the perfectly competitive firm sells?', 'Market (industry) demand and supply.'],
      ['7.3', 'Why can’t a firm set a different price from the market price?', 'If it charged more, it would lose all its customers to the many firms selling the identical product.'],
      ['7.4', 'A monopolist’s market power is derived from…', '(1) being the only seller of a product with no close substitutes; (2) strong barriers to entry.'],
      ['7.5', 'Large number of relatively small firms: implication', 'Each firm has a small market share and limited market power, and acts independently without worrying about rivals’ reactions.'],
      ['7.6', 'What is mutual interdependence?', 'A situation where each firm’s actions affect its rivals, so each must consider how the others will react.'],
      ['7.6', 'The kinked demand curve is a demand curve facing an oligopolist that…', 'Assumes rivals will match any price decrease but ignore any price increase.'],
      ['7.6', 'Reason the demand curve is highly elastic above the current price', 'Rivals don’t follow the price increase, so the firm loses many customers to them.']
    ],
    quiz: [
      {
        q: 'Which of these is NOT one of the main characteristics used to classify market structures?',
        options: [
          'The number of firms',
          'The type of product',
          'The ease of entry and exit',
          'Where the firms are located'
        ],
        answer: 3,
        why: 'Market structures are classified by number of firms, type of product and barriers to entry.'
      },
      {
        q: 'The demand curve facing a perfectly competitive firm is:',
        options: [
          'Downward sloping',
          'Horizontal (perfectly elastic)',
          'Vertical (perfectly inelastic)',
          'Kinked'
        ],
        answer: 1,
        why: 'The firm is a price taker and can sell any amount at the market price: D = P = AR = MR.'
      },
      {
        q: 'Why won’t a perfectly competitive firm charge more than the market price?',
        options: [
          'The government forbids it',
          'It would lose all its customers to firms selling the identical product',
          'Its costs would rise',
          'It would earn economic profit'
        ],
        answer: 1,
        why: 'With a homogeneous product and many sellers, buyers simply switch to another firm.'
      },
      {
        q: 'Singapore Post, with an exclusive licence for local postal services, is an example of:',
        options: ['Perfect competition', 'Monopolistic competition', 'Oligopoly', 'Monopoly'],
        answer: 3,
        why: 'A single firm with a unique service, protected by a legal barrier to entry.'
      },
      {
        q: 'A firm’s total revenue exactly equals its total cost (including opportunity costs). It is earning:',
        options: ['Economic profit', 'Normal profit', 'An economic loss', 'Supernormal profit'],
        answer: 1,
        why: 'TR = TC is zero economic profit, known as normal profit: just enough to stay in the industry.'
      },
      {
        q: 'Hair salons are best described as:',
        options: ['Perfect competition', 'Monopolistic competition', 'Oligopoly', 'Monopoly'],
        answer: 1,
        why: 'Many relatively small firms selling differentiated services, with low barriers to entry.'
      },
      {
        q: 'The kinked demand curve assumes that rival firms will:',
        options: [
          'Match both price increases and price cuts',
          'Match price cuts but ignore price increases',
          'Ignore both',
          'Match price increases but ignore price cuts'
        ],
        answer: 1,
        why: 'That is why demand is elastic above the kink (a rise isn’t followed) and inelastic below it (a cut is matched).'
      },
      {
        q: 'Which market structures can earn economic profit in the long run?',
        options: [
          'Perfect competition and monopolistic competition',
          'Oligopoly and monopoly',
          'All four',
          'None of them'
        ],
        answer: 1,
        why: 'Strong barriers to entry protect their profits. With free entry, new firms compete profits down to normal.'
      }
    ]
  }
);
