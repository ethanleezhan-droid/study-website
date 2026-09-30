/* Unit 3: Firms & Market Outcomes */
ECON.lessons.push(
  {
    id: 'surplus',
    unit: 'u3',
    title: 'Consumer & Producer Surplus',
    summary: 'Measuring what buyers and sellers gain from trade, and why competitive markets maximize it.',
    minutes: 11,
    body: `
<h2>Willingness to pay</h2>
<p>Every buyer has a maximum price they would pay for something: their <strong>willingness to pay</strong>. If the market price is below it, they buy and come out ahead. That gain is their <strong>consumer surplus</strong>:</p>
<div class="formula">Consumer surplus = <strong>willingness to pay − price paid</strong></div>
<div class="note example">
  <p class="note-label">Worked example</p>
  <p>Four fans want a concert ticket. Ava would pay up to $100, Ben $80, Cal $70 and Dee $50. Tickets sell for $60.</p>
  <p>Ava, Ben and Cal buy; Dee doesn’t. Their consumer surplus is $40 + $20 + $10 = <strong>$70</strong>.</p>
</div>
<p>Line up every buyer from highest willingness to pay to lowest and you get the demand curve. That means consumer surplus is the area <em>below the demand curve and above the price</em>.</p>

<h2>Producer surplus</h2>
<p>Sellers have a minimum price they’d accept, usually their cost of producing the good. <strong>Producer surplus</strong> is what they receive above that:</p>
<div class="formula">Producer surplus = <strong>price received − seller’s cost</strong></div>
<p>The supply curve traces sellers’ costs, so producer surplus is the area <em>above the supply curve and below the price</em>.</p>

<h2>Total surplus and efficiency</h2>
<p><strong>Total surplus</strong> is consumer surplus plus producer surplus. It equals the value buyers place on the goods minus what it costs sellers to make them, so it measures the total gain from trade.</p>
<div data-widget="market" data-preset="surplus"></div>
<div class="note example">
  <p class="note-label">Worked example</p>
  <p>With the lab’s default curves, the equilibrium is 50 units at $10. The demand curve reaches the price axis at $16, so consumer surplus is the triangle ½ × 50 × ($16 − $10) = <strong>$150</strong>. The supply curve starts at $4, so producer surplus is ½ × 50 × ($10 − $4) = <strong>$150</strong>. Total surplus is $300.</p>
</div>
<p>A competitive market in equilibrium makes total surplus as large as it can be. Any unit beyond the equilibrium quantity would cost more to make than a buyer thinks it’s worth. Stopping short of equilibrium would leave out trades that would have helped both sides. Economists call this outcome <strong>efficient</strong>.</p>
<p>This result depends on some conditions: many buyers and sellers, no one else harmed or helped by the trades, and people knowing what they are buying. Lessons 12 and 13 show what happens when these conditions fail.</p>

<h2>Efficiency is not the same as fairness</h2>
<p>Efficiency is about the size of the pie. <strong>Equity</strong> is about how the pie is divided. A market can be perfectly efficient and still produce outcomes many people consider unfair; it serves those with the most willingness to pay, which partly reflects their ability to pay. Many policy debates are about how much efficiency to give up for a fairer split.</p>
`,
    terms: [
      ['Willingness to pay', 'The maximum amount a buyer would pay for a good.'],
      ['Consumer surplus', 'The difference between what buyers are willing to pay and what they actually pay; on a graph, the area below demand and above the price.'],
      ['Producer surplus', 'The difference between the price sellers receive and their cost; on a graph, the area above supply and below the price.'],
      ['Total surplus', 'Consumer surplus plus producer surplus; the total gain from trade in a market.'],
      ['Equity', 'Fairness in how economic benefits are distributed among members of society.']
    ],
    quiz: [
      {
        q: 'You would pay up to $50 for a pair of sneakers and buy them on sale for $35. Your consumer surplus is:',
        options: ['$15', '$35', '$50', '$85'],
        answer: 0,
        why: 'Consumer surplus = willingness to pay − price = $50 − $35 = $15.'
      },
      {
        q: 'A potter’s cost of making a mug is $20 and she sells it for $32. Her producer surplus is:',
        options: ['$20', '$12', '$32', '$52'],
        answer: 1,
        why: 'Producer surplus = price − cost = $32 − $20 = $12.'
      },
      {
        q: 'On a supply-and-demand graph, consumer surplus is the area:',
        options: [
          'Above the supply curve and below the price',
          'Below the demand curve and above the price',
          'Between the two curves beyond equilibrium',
          'Under the supply curve'
        ],
        answer: 1,
        why: 'The demand curve shows what buyers would pay; the price is what they do pay. The gap between them, summed over all units bought, is consumer surplus.'
      },
      {
        q: 'In a competitive market with no externalities, total surplus is largest at:',
        options: [
          'The highest price buyers will pay',
          'The equilibrium quantity',
          'Any quantity above equilibrium',
          'The quantity where price is lowest'
        ],
        answer: 1,
        why: 'At equilibrium, every unit whose value exceeds its cost is traded, and no unit whose cost exceeds its value is traded.'
      }
    ]
  },

  {
    id: 'costs',
    unit: 'u3',
    title: 'Costs of Production',
    summary: 'Economic profit, fixed and variable costs, marginal cost, and the rule every firm uses to choose output.',
    minutes: 15,
    body: `
<h2>Accounting profit and economic profit</h2>
<p>Profit is total revenue minus total cost, but which costs? <strong>Accounting profit</strong> subtracts only explicit costs. <strong>Economic profit</strong> also subtracts implicit costs, such as the salary the owner gave up to run the business.</p>
<div class="note example">
  <p class="note-label">Worked example</p>
  <p>Priya’s bakery brings in $200,000 a year and has $140,000 in explicit costs. To run it, she left a job paying $70,000.</p>
  <ul>
    <li>Accounting profit = $200,000 − $140,000 = <strong>$60,000</strong></li>
    <li>Economic profit = $60,000 − $70,000 = <strong>−$10,000</strong></li>
  </ul>
  <p>The bakery looks profitable on paper, but Priya would be $10,000 better off in her old job.</p>
</div>
<p>An economic profit of zero is called <strong>normal profit</strong>. It means the owner earns exactly what their resources could earn elsewhere, which is enough to keep them in the business.</p>

<h2>Short run and long run</h2>
<p>In the <strong>short run</strong>, at least one input is fixed: a bakery can hire more workers this month but can’t build a bigger kitchen. In the <strong>long run</strong>, every input can change.</p>
<p>In the short run, firms run into <strong>diminishing marginal returns</strong>. Adding workers to a fixed kitchen raises output, but each extra worker adds less than the last as they start getting in each other’s way.</p>

<h2>The cost family</h2>
<ul>
  <li><strong>Fixed cost (FC)</strong> doesn’t change with output: rent, insurance, loan payments.</li>
  <li><strong>Variable cost (VC)</strong> rises with output: ingredients, hourly wages, packaging.</li>
  <li><strong>Total cost (TC)</strong> = FC + VC.</li>
  <li><strong>Marginal cost (MC)</strong> is the extra cost of one more unit: the change in TC ÷ the change in Q.</li>
  <li><strong>Average total cost (ATC)</strong> = TC ÷ Q. Average variable cost (AVC) = VC ÷ Q.</li>
</ul>
<p>Here are a cupcake shop’s costs per hour, with a fixed cost of $30:</p>
<div class="table-wrap"><table class="num">
  <thead><tr><th>Batches (Q)</th><th>FC</th><th>VC</th><th>TC</th><th>MC</th><th>ATC</th><th>AVC</th></tr></thead>
  <tbody>
    <tr><td>0</td><td>$30</td><td>$0</td><td>$30</td><td>–</td><td>–</td><td>–</td></tr>
    <tr><td>1</td><td>$30</td><td>$10</td><td>$40</td><td>$10</td><td>$40.00</td><td>$10.00</td></tr>
    <tr><td>2</td><td>$30</td><td>$18</td><td>$48</td><td>$8</td><td>$24.00</td><td>$9.00</td></tr>
    <tr><td>3</td><td>$30</td><td>$24</td><td>$54</td><td>$6</td><td>$18.00</td><td>$8.00</td></tr>
    <tr><td>4</td><td>$30</td><td>$32</td><td>$62</td><td>$8</td><td>$15.50</td><td>$8.00</td></tr>
    <tr><td>5</td><td>$30</td><td>$44</td><td>$74</td><td>$12</td><td>$14.80</td><td>$8.80</td></tr>
    <tr><td>6</td><td>$30</td><td>$60</td><td>$90</td><td>$16</td><td>$15.00</td><td>$10.00</td></tr>
  </tbody>
</table></div>
<p>Marginal cost falls at first, then rises as diminishing returns set in. Notice how MC and ATC relate: while MC is below ATC, ATC falls; once MC is above ATC, ATC rises. So <strong>MC crosses ATC at its lowest point</strong> (here, between 5 and 6 batches). Your grades work the same way: if your next test score is below your average, your average falls.</p>

<h2>How firms choose output</h2>
<p>A firm maximizes profit by producing every unit whose extra revenue covers its extra cost, and stopping there:</p>
<div class="formula">Produce where <strong>marginal revenue = marginal cost</strong></div>
<div class="note example">
  <p class="note-label">Worked example: the shutdown rule</p>
  <p>The cupcake shop can sell each batch for $12. The first five batches each cost $12 or less to make; the sixth costs $16. So it makes <strong>5 batches</strong>.</p>
  <p>Profit = 5 × $12 − $74 = <strong>−$14</strong>. It’s losing money. Should it close for the day? If it closes, it still pays the $30 fixed cost and loses $30. Staying open loses only $14, so it should keep producing in the short run.</p>
  <p>The rule: <strong>shut down in the short run only if the price is below average variable cost.</strong> Here the price ($12) is above AVC ($8.80). In the long run, if losses continue, the firm should leave the industry.</p>
</div>

<h2>The long run: economies of scale</h2>
<p>When a firm can change everything, its average cost may fall as it grows. These <strong>economies of scale</strong> come from spreading fixed costs over more units, specialized workers and machines, and bulk buying. Beyond some size, very large firms can face <em>diseconomies of scale</em>, as coordination and management get harder.</p>
`,
    terms: [
      ['Accounting profit', 'Total revenue minus explicit costs.'],
      ['Economic profit', 'Total revenue minus both explicit and implicit costs.'],
      ['Normal profit', 'Zero economic profit: the return just sufficient to keep resources in their current use.'],
      ['Diminishing marginal returns', 'When adding more of a variable input to a fixed input eventually yields smaller and smaller increases in output.'],
      ['Fixed cost', 'A cost that does not vary with the quantity produced, such as rent.'],
      ['Variable cost', 'A cost that rises as output rises, such as raw materials.'],
      ['Average total cost', 'Total cost divided by the quantity of output.'],
      ['Shutdown rule', 'In the short run, a firm should stop producing only if the price is below its average variable cost.'],
      ['Economies of scale', 'The fall in long-run average total cost that occurs as a firm increases its scale of production.']
    ],
    quiz: [
      {
        q: 'A firm has revenue of $500,000, explicit costs of $400,000 and implicit costs of $150,000. Its economic profit is:',
        options: ['$100,000', '$50,000', '−$50,000', '$250,000'],
        answer: 2,
        why: 'Economic profit = $500,000 − $400,000 − $150,000 = −$50,000, even though accounting profit is $100,000.'
      },
      {
        q: 'Which is a fixed cost for a restaurant in the short run?',
        options: [
          'Food ingredients',
          'The monthly lease on the building',
          'Wages for extra weekend servers',
          'Takeaway containers'
        ],
        answer: 1,
        why: 'The lease is owed whether the restaurant serves 10 meals or 1,000. The others rise with the number of meals.'
      },
      {
        q: 'If marginal cost is below average total cost, average total cost is:',
        options: ['Rising', 'Falling', 'At its minimum', 'Equal to marginal cost'],
        answer: 1,
        why: 'Adding a unit that costs less than the current average pulls the average down.'
      },
      {
        q: 'A profit-maximizing firm chooses the output where:',
        options: [
          'Total revenue is largest',
          'Average total cost is lowest',
          'Marginal revenue equals marginal cost',
          'Price equals average fixed cost'
        ],
        answer: 2,
        why: 'Below that point, one more unit adds more revenue than cost. Above it, one more unit adds more cost than revenue.'
      }
    ]
  },

  {
    id: 'market-structures',
    unit: 'u3',
    title: 'Market Structures',
    summary: 'From perfect competition to monopoly: how the number of firms shapes prices, output and strategy.',
    minutes: 16,
    body: `
<h2>Four kinds of market</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Structure</th><th>Firms</th><th>Product</th><th>Barriers to entry</th><th>Control over price</th><th>Examples</th></tr></thead>
  <tbody>
    <tr><td>Perfect competition</td><td>Many</td><td>Identical</td><td>None</td><td>None</td><td>Wheat, many farm goods</td></tr>
    <tr><td>Monopolistic competition</td><td>Many</td><td>Differentiated</td><td>Low</td><td>Some</td><td>Restaurants, hair salons, clothing brands</td></tr>
    <tr><td>Oligopoly</td><td>A few</td><td>Identical or differentiated</td><td>High</td><td>Significant, but depends on rivals</td><td>Airlines, mobile networks, aircraft makers</td></tr>
    <tr><td>Monopoly</td><td>One</td><td>No close substitutes</td><td>Very high</td><td>Substantial</td><td>Local water utility, a patented drug</td></tr>
  </tbody>
</table></div>

<h2>Perfect competition</h2>
<p>With many sellers of an identical product, no single firm can affect the price. Each is a <strong>price taker</strong>: if it charged a cent more, buyers would go elsewhere. For a price taker, the revenue from one more unit is simply the price, so it produces where <strong>price = marginal cost</strong>.</p>
<p>If firms are earning economic profits, new firms enter, supply increases and the price falls. If they are making losses, some leave. In the long run, economic profit is driven to zero and the price settles at the minimum of average total cost. Goods are made at the lowest possible cost, and exactly the quantity society values most is produced.</p>

<h2>Monopoly</h2>
<p>A monopoly is the only seller of a product with no close substitutes. It survives because of <strong>barriers to entry</strong>:</p>
<ul>
  <li>Control of a key resource.</li>
  <li>Legal barriers such as patents, copyrights and licenses.</li>
  <li>Economies of scale so large that one firm can serve the whole market more cheaply than two could. This is a <em>natural monopoly</em>, like a water network.</li>
  <li>Network effects, where a product becomes more valuable the more people use it.</li>
</ul>
<p>A monopolist faces the whole downward-sloping market demand curve, so to sell one more unit it must lower the price on <em>every</em> unit. That makes <strong>marginal revenue less than price</strong>.</p>
<div class="note example">
  <p class="note-label">Worked example</p>
  <p>A monopolist can sell 10 units at $20 each (revenue $200) or 11 units at $19 each (revenue $209). The 11th unit sells for $19 but adds only $9 to revenue, because the first 10 units now sell for $1 less.</p>
</div>
<p>The monopolist still produces where MR = MC, then charges the highest price buyers will pay for that quantity. Compared with a competitive market, the price is higher, the quantity is lower, and there is a deadweight loss. That’s why governments regulate natural monopolies and use <em>antitrust</em> (competition) law to block mergers and practices that reduce competition.</p>

<h2>Monopolistic competition</h2>
<p>Many firms sell products that are similar but not identical: every pizza place has a slightly different menu and location. That gives each some control over its price. Entry is easy, though, so if one kind of restaurant becomes very profitable, new ones open and profits get competed away in the long run. Firms compete through branding, quality and advertising as well as price.</p>

<h2>Oligopoly and game theory</h2>
<p>In an oligopoly, a few large firms dominate, and each one’s best move depends on what the others do. <strong>Game theory</strong> studies these strategic situations. The most famous game is the prisoner’s dilemma.</p>
<div class="note example">
  <p class="note-label">Two airlines choosing prices</p>
  <p>Each airline can charge a high or a low fare. Profits in $ millions are shown as (Airline A, Airline B).</p>
  <div class="table-wrap"><table class="matrix">
    <thead><tr><th></th><th>B charges high</th><th>B charges low</th></tr></thead>
    <tbody>
      <tr><th>A charges high</th><td>10, 10</td><td>2, 14</td></tr>
      <tr><th>A charges low</th><td>14, 2</td><td><strong>5, 5</strong></td></tr>
    </tbody>
  </table></div>
  <p>Look at it from A’s side. If B charges high, A earns more by charging low (14 beats 10). If B charges low, A still earns more by charging low (5 beats 2). Charging low is A’s <strong>dominant strategy</strong>, the best choice whatever the rival does. The same holds for B.</p>
  <p>Both end up charging low and earning 5 each, even though both would earn 10 by charging high. Neither wants to change on its own, so (low, low) is a <strong>Nash equilibrium</strong>.</p>
</div>
<p>This is why cartels like OPEC find it hard to stick to agreed output limits: each member is tempted to cheat. It’s also why price-fixing agreements are illegal in most countries.</p>
`,
    terms: [
      ['Perfect competition', 'A market with many buyers and sellers of an identical product, free entry and exit, and no single firm able to affect the price.'],
      ['Price taker', 'A buyer or seller that must accept the market price because it is too small to influence it.'],
      ['Barriers to entry', 'Obstacles that make it difficult for new firms to enter a market, such as patents, high start-up costs or control of resources.'],
      ['Monopoly', 'A market with a single seller of a product that has no close substitutes.'],
      ['Marginal revenue', 'The additional revenue from selling one more unit of output.'],
      ['Monopolistic competition', 'A market with many firms selling differentiated products and low barriers to entry.'],
      ['Oligopoly', 'A market dominated by a few interdependent firms.'],
      ['Game theory', 'The study of strategic decision-making when each player’s outcome depends on the choices of others.'],
      ['Dominant strategy', 'A strategy that is best for a player regardless of what other players do.'],
      ['Nash equilibrium', 'A set of strategies in which no player can do better by changing their own strategy while the others keep theirs.']
    ],
    quiz: [
      {
        q: 'A firm in a perfectly competitive market:',
        options: [
          'Sets its own price',
          'Is a price taker',
          'Faces a downward-sloping demand curve',
          'Earns economic profits in the long run'
        ],
        answer: 1,
        why: 'With many sellers of an identical product, each firm has to accept the market price.'
      },
      {
        q: 'A monopolist’s marginal revenue is less than its price because:',
        options: [
          'Its costs are higher than a competitive firm’s',
          'To sell one more unit it must lower the price on all units',
          'The government taxes monopoly profits',
          'Demand for its product is perfectly elastic'
        ],
        answer: 1,
        why: 'The extra unit brings in its price, but the price cut on every other unit subtracts from revenue.'
      },
      {
        q: 'In this lesson’s airline pricing game, the Nash equilibrium is:',
        options: [
          'Both charge high',
          'Both charge low',
          'A charges high, B charges low',
          'There is no equilibrium'
        ],
        answer: 1,
        why: 'Charging low is each airline’s dominant strategy, so both charge low and earn 5, even though both charging high would earn them 10 each.'
      },
      {
        q: 'Which market is the best example of monopolistic competition?',
        options: [
          'Local coffee shops',
          'A city’s water supply',
          'Wheat farming',
          'Commercial aircraft manufacturing'
        ],
        answer: 0,
        why: 'Many coffee shops sell similar but differentiated products, and it’s relatively easy to open a new one.'
      },
      {
        q: 'In the long run, firms in perfect competition earn:',
        options: [
          'Large economic profits',
          'Zero economic profit',
          'Negative economic profit',
          'Monopoly profits'
        ],
        answer: 1,
        why: 'Profits attract new firms and losses drive firms out, until price equals minimum average total cost and economic profit is zero.'
      }
    ]
  },

  {
    id: 'market-failure',
    unit: 'u3',
    title: 'Externalities & Public Goods',
    summary: 'Pollution, free riders and overfishing: the main ways markets fail, and the tools used to fix them.',
    minutes: 15,
    body: `
<h2>When markets get it wrong</h2>
<p>A <strong>market failure</strong> is a situation where the market outcome is inefficient: a different allocation would make society better off. The main causes are externalities, public goods, common resources, market power (Lesson 12) and asymmetric information.</p>

<h2>Externalities</h2>
<p>An <strong>externality</strong> is a cost or benefit that falls on people outside a transaction.</p>
<ul>
  <li><strong>Negative externalities</strong> include pollution, noise and traffic congestion. Producers don’t pay the full cost to society, so the market produces <em>too much</em>.</li>
  <li><strong>Positive externalities</strong> include vaccination, education and research. People don’t capture all the benefits, so the market produces <em>too little</em>.</li>
</ul>
<p>For a polluting product, the true cost to society of each unit is the producer’s own cost plus the damage to others:</p>
<div class="formula">Marginal social cost = <strong>marginal private cost + marginal external cost</strong></div>
<p>The efficient quantity is where demand meets marginal social cost, not the supply curve. Move the slider to change how much damage each unit does.</p>
<div data-widget="market" data-preset="externality"></div>

<h2>Fixing externalities</h2>
<ul>
  <li><strong>Pigouvian tax.</strong> A tax equal to the external cost per unit makes producers pay the full social cost. A carbon tax is one example.</li>
  <li><strong>Tradable permits (cap and trade).</strong> The government caps total pollution and lets firms buy and sell permits. Firms that can cut pollution cheaply do so and sell their spare permits. The US Acid Rain Program used this approach for sulfur dioxide, and the EU Emissions Trading System uses it for carbon.</li>
  <li><strong>Regulation.</strong> Rules and standards, such as limits on emissions or required equipment.</li>
  <li><strong>Subsidies</strong> for goods with positive externalities, such as free vaccinations or public funding for research.</li>
  <li><strong>Private bargaining.</strong> The <em>Coase theorem</em> says that if property rights are clear and bargaining is cheap, the parties can negotiate an efficient outcome on their own. It works for a few neighbors, but rarely when millions of people are affected.</li>
</ul>

<h2>Public goods</h2>
<p>Goods differ in two ways. A good is <strong>excludable</strong> if people who don’t pay can be kept from using it. It is <strong>rival</strong> if one person’s use leaves less for others.</p>
<div class="table-wrap"><table class="matrix">
  <thead><tr><th></th><th>Rival</th><th>Non-rival</th></tr></thead>
  <tbody>
    <tr><th>Excludable</th><td><strong>Private goods</strong><br>pizza, clothes, a car</td><td><strong>Club goods</strong><br>streaming services, an uncrowded toll road</td></tr>
    <tr><th>Non-excludable</th><td><strong>Common resources</strong><br>ocean fish, groundwater</td><td><strong>Public goods</strong><br>national defense, street lighting, flood defenses</td></tr>
  </tbody>
</table></div>
<p>A <strong>public good</strong> is both non-excludable and non-rival. Because people can enjoy it without paying, each person is tempted to let others pay. This is the <strong>free-rider problem</strong>, and it means private markets provide too little. That’s why public goods are usually paid for with taxes.</p>

<h2>The tragedy of the commons</h2>
<p><strong>Common resources</strong> are rival but non-excludable. Each fishing boat gains the full value of its catch but bears only a sliver of the cost of a depleted fishery, so the resource gets overused. This is the <strong>tragedy of the commons</strong>. Fixes include catch limits, clearer property rights, and tradable fishing quotas.</p>

<h2>Asymmetric information</h2>
<p>Markets also struggle when one side knows more than the other. In the used-car market, sellers know which cars are “lemons”; buyers don’t, so they won’t pay much for any car, which drives good cars out of the market. This is <em>adverse selection</em>. After someone is insured, they may take more risks because the insurer bears the cost. This is <em>moral hazard</em>. Warranties, inspections, reputation and regulation all help.</p>
`,
    terms: [
      ['Market failure', 'A situation in which a market left on its own fails to allocate resources efficiently.'],
      ['Externality', 'A cost or benefit of an activity that falls on people not directly involved in it.'],
      ['Pigouvian tax', 'A tax on an activity equal to the external cost it imposes, designed to correct a negative externality.'],
      ['Coase theorem', 'The idea that if property rights are well defined and bargaining costs are low, private parties can reach an efficient outcome on their own.'],
      ['Public good', 'A good that is both non-excludable and non-rival, such as national defense.'],
      ['Free rider', 'Someone who benefits from a good without paying for it.'],
      ['Common resource', 'A good that is rival but non-excludable, such as fish in the ocean.'],
      ['Tragedy of the commons', 'The overuse of a common resource because each user ignores the cost their use imposes on others.'],
      ['Asymmetric information', 'A situation in which one party to a transaction knows more than the other.']
    ],
    quiz: [
      {
        q: 'A factory dumps waste into a river used by downstream towns. Compared with the efficient quantity, the market produces:',
        options: ['Too little', 'Too much', 'Exactly the efficient amount', 'Nothing at all'],
        answer: 1,
        why: 'The factory ignores the cost it imposes on the towns, so its costs look lower than society’s true costs, and it produces more than is efficient.'
      },
      {
        q: 'A public good is:',
        options: [
          'Rival and excludable',
          'Rival and non-excludable',
          'Non-rival and excludable',
          'Non-rival and non-excludable'
        ],
        answer: 3,
        why: 'Nobody can be kept from using it, and one person’s use doesn’t reduce anyone else’s. Think of national defense.'
      },
      {
        q: 'Which of these is a common resource?',
        options: [
          'A slice of pizza',
          'Fish in the open ocean',
          'A streaming subscription',
          'A lighthouse’s beam'
        ],
        answer: 1,
        why: 'Anyone can fish in the open ocean (non-excludable), but each fish caught is one fewer for others (rival).'
      },
      {
        q: 'To correct a negative externality, a Pigouvian tax should be set equal to:',
        options: [
          'The firm’s profit per unit',
          'The marginal external cost',
          'The market price',
          'The firm’s fixed cost'
        ],
        answer: 1,
        why: 'Taxing each unit by the harm it causes makes the producer face the full social cost, which moves output to the efficient level.'
      },
      {
        q: 'Getting a flu vaccine creates:',
        options: [
          'A negative externality',
          'A positive externality',
          'A public good',
          'No externality'
        ],
        answer: 1,
        why: 'Being vaccinated makes you less likely to infect others. They benefit even though they didn’t pay, so the market alone provides too few vaccinations.'
      }
    ]
  }
);
