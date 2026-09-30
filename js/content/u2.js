/* Unit 2: Supply & Demand */
ECON.lessons.push(
  {
    id: 'demand',
    unit: 'u2',
    title: 'Demand',
    summary: 'The law of demand, and the difference between moving along the curve and shifting it.',
    minutes: 12,
    body: `
<h2>What demand means</h2>
<p><strong>Demand</strong> is the relationship between the price of a good and the quantity buyers are willing <em>and able</em> to buy over a period of time, holding everything else constant. Wanting a sports car isn’t demand unless you can pay for one.</p>

<h2>The law of demand</h2>
<p>Other things equal, when the price of a good rises, the quantity demanded falls. When the price falls, the quantity demanded rises. Three reasons:</p>
<ul>
  <li><strong>Substitution effect.</strong> When coffee gets pricier, some people switch to tea.</li>
  <li><strong>Income effect.</strong> A higher price means your income buys less, so you buy less.</li>
  <li><strong>Diminishing marginal benefit.</strong> Each extra cup is worth a bit less to you, so you’ll only buy more at a lower price.</li>
</ul>

<h2>The demand schedule and curve</h2>
<p>A demand schedule lists the quantity demanded at each price. Here is weekly coffee demand in a small town:</p>
<div class="table-wrap"><table class="num">
  <thead><tr><th>Price per cup</th><th>Cups demanded per week</th></tr></thead>
  <tbody>
    <tr><td>$1</td><td>1,000</td></tr>
    <tr><td>$2</td><td>800</td></tr>
    <tr><td>$3</td><td>600</td></tr>
    <tr><td>$4</td><td>400</td></tr>
    <tr><td>$5</td><td>200</td></tr>
  </tbody>
</table></div>
<p>Plot those points with price on the vertical axis and quantity on the horizontal axis, and you get a downward-sloping demand curve. Economists put price on the vertical axis by convention, even though price is the cause.</p>
<p><strong>Market demand</strong> is the sum of every buyer’s demand: at each price, add up the quantities all buyers want.</p>

<h2>Movement along the curve, or a shift of the curve?</h2>
<p>This is the distinction students mix up most.</p>
<div class="table-wrap"><table>
  <thead><tr><th>What changed</th><th>On the graph</th><th>What we call it</th></tr></thead>
  <tbody>
    <tr><td>The good’s own price</td><td>Movement along the curve</td><td>A change in <strong>quantity demanded</strong></td></tr>
    <tr><td>Anything else that affects buyers</td><td>The whole curve shifts</td><td>A change in <strong>demand</strong></td></tr>
  </tbody>
</table></div>

<h2>What shifts demand</h2>
<p>A handy memory aid is <strong>TRIBE</strong>:</p>
<ul>
  <li><strong>Tastes.</strong> A health study praising coffee increases demand for it.</li>
  <li><strong>Related goods.</strong> <em>Substitutes</em> are used instead of each other: if tea gets more expensive, demand for coffee increases. <em>Complements</em> are used together: if printers get cheaper, demand for ink increases.</li>
  <li><strong>Income.</strong> For a <em>normal good</em>, demand rises when income rises. For an <em>inferior good</em>, like instant noodles, demand falls as income rises because people switch to things they like better.</li>
  <li><strong>Buyers.</strong> More buyers in the market means more demand. A new university campus increases demand for nearby apartments.</li>
  <li><strong>Expectations.</strong> If people expect a price rise next month, they buy more now.</li>
</ul>
<p>An increase in demand shifts the curve to the <strong>right</strong>: buyers want more at every price. A decrease shifts it to the <strong>left</strong>.</p>
<div class="note pitfall">
  <p class="note-label">Common mistake</p>
  <p>“The price of coffee went up, so demand for coffee fell.” Not quite. A higher price reduces the <em>quantity demanded</em>, a move along the curve. Demand only changes when something other than the price changes.</p>
</div>
`,
    terms: [
      ['Demand', 'The relationship between the price of a good and the quantity buyers are willing and able to purchase, other things equal.'],
      ['Law of demand', 'Other things equal, when the price of a good rises, the quantity demanded falls.'],
      ['Quantity demanded', 'The amount of a good buyers are willing and able to buy at one particular price.'],
      ['Substitutes', 'Goods used in place of each other; when the price of one rises, demand for the other increases.'],
      ['Complements', 'Goods used together; when the price of one rises, demand for the other decreases.'],
      ['Normal good', 'A good for which demand increases when income rises.'],
      ['Inferior good', 'A good for which demand decreases when income rises.']
    ],
    quiz: [
      {
        q: 'The price of gasoline rises sharply. What happens to demand for large, fuel-hungry SUVs?',
        options: [
          'Demand increases (shifts right)',
          'Demand decreases (shifts left)',
          'Quantity demanded falls along the curve',
          'Nothing changes'
        ],
        answer: 1,
        why: 'Gasoline and SUVs are complements. A higher price for gasoline makes owning an SUV more expensive, so the whole demand curve for SUVs shifts left.'
      },
      {
        q: 'What causes a movement along a demand curve?',
        options: [
          'A change in consumers’ incomes',
          'A change in the price of a substitute',
          'A change in the good’s own price',
          'A change in tastes'
        ],
        answer: 2,
        why: 'Only a change in the good’s own price moves you along the curve. Everything else shifts the curve.'
      },
      {
        q: 'As people’s incomes rise, they buy fewer long-distance bus tickets. For these buyers, bus tickets are:',
        options: ['A normal good', 'An inferior good', 'A complement', 'A luxury'],
        answer: 1,
        why: 'Demand falling as income rises is the definition of an inferior good. Here, people switch to trains, planes or cars as they can afford them.'
      },
      {
        q: 'The price of tea rises. In the market for coffee:',
        options: [
          'Demand for coffee increases',
          'Demand for coffee decreases',
          'The supply of coffee increases',
          'The quantity of coffee demanded falls'
        ],
        answer: 0,
        why: 'Tea and coffee are substitutes. When tea becomes more expensive, some tea drinkers switch, so demand for coffee shifts right.'
      }
    ]
  },

  {
    id: 'supply',
    unit: 'u2',
    title: 'Supply',
    summary: 'Why sellers offer more at higher prices, and the costs and conditions that shift supply.',
    minutes: 10,
    body: `
<h2>What supply means</h2>
<p><strong>Supply</strong> is the relationship between the price of a good and the quantity sellers are willing and able to offer for sale, holding everything else constant.</p>

<h2>The law of supply</h2>
<p>Other things equal, when the price of a good rises, the quantity supplied rises. Two reasons:</p>
<ul>
  <li>A higher price makes producing the good more profitable, so existing sellers produce more and new sellers join in.</li>
  <li>Producing more usually costs more per extra unit: overtime pay, older machines brought back into use, less suitable land. Producers need a higher price to cover those rising marginal costs.</li>
</ul>

<h2>The supply schedule</h2>
<p>Here are the coffee shops in the same town from the last lesson:</p>
<div class="table-wrap"><table class="num">
  <thead><tr><th>Price per cup</th><th>Cups supplied per week</th></tr></thead>
  <tbody>
    <tr><td>$1</td><td>200</td></tr>
    <tr><td>$2</td><td>400</td></tr>
    <tr><td>$3</td><td>600</td></tr>
    <tr><td>$4</td><td>800</td></tr>
    <tr><td>$5</td><td>1,000</td></tr>
  </tbody>
</table></div>
<p>Plotted, these points form an upward-sloping supply curve. Compare it with the demand schedule: at $3, buyers want 600 cups and sellers offer 600 cups. Keep that in mind for the next lesson.</p>

<h2>What shifts supply</h2>
<p>As with demand, a change in the good’s own price moves you <em>along</em> the supply curve. A change in anything else that affects sellers shifts the whole curve.</p>
<ul>
  <li><strong>Input prices.</strong> If coffee beans or baristas’ wages get more expensive, supply decreases.</li>
  <li><strong>Technology.</strong> A faster espresso machine lowers costs and increases supply.</li>
  <li><strong>Prices of other goods the seller could make.</strong> If soybean prices jump, some farmers switch fields from corn to soy, and the supply of corn decreases.</li>
  <li><strong>Number of sellers.</strong> More sellers means more supply.</li>
  <li><strong>Expectations.</strong> If sellers expect higher prices next month, they may hold back some supply now.</li>
  <li><strong>Government.</strong> A tax on each unit sold decreases supply. A <em>subsidy</em> (a payment for each unit produced) increases it. Regulations that raise costs decrease it.</li>
  <li><strong>Nature.</strong> Droughts, floods and frosts reduce the supply of farm goods.</li>
</ul>
<div class="note pitfall">
  <p class="note-label">Common mistake</p>
  <p>A decrease in supply shifts the curve to the <strong>left</strong>, which on the graph also looks <strong>up</strong>. It’s tempting to read “up” as “more”, but a supply curve that moves up means sellers need a higher price to offer the same quantity. That is less supply, not more.</p>
</div>
`,
    terms: [
      ['Supply', 'The relationship between the price of a good and the quantity sellers are willing and able to offer, other things equal.'],
      ['Law of supply', 'Other things equal, when the price of a good rises, the quantity supplied rises.'],
      ['Quantity supplied', 'The amount of a good sellers are willing and able to sell at one particular price.'],
      ['Subsidy', 'A government payment to producers or consumers for each unit of a good, which increases supply or demand.']
    ],
    quiz: [
      {
        q: 'A new manufacturing process cuts the cost of making solar panels. In the solar panel market:',
        options: [
          'Supply increases (shifts right)',
          'Supply decreases (shifts left)',
          'Demand increases',
          'Quantity supplied falls'
        ],
        answer: 0,
        why: 'Lower costs make every price more profitable, so sellers offer more at every price. The supply curve shifts right.'
      },
      {
        q: 'Farmers can grow either wheat or barley on the same land. The price of wheat rises. What happens to the supply of barley?',
        options: ['It increases', 'It decreases', 'It doesn’t change', 'Quantity supplied rises along the curve'],
        answer: 1,
        why: 'Wheat is now more profitable, so farmers shift land away from barley. The supply of barley shifts left.'
      },
      {
        q: 'A rise in the price of a good, with nothing else changing, causes:',
        options: [
          'An increase in supply',
          'A decrease in supply',
          'An increase in quantity supplied',
          'A decrease in quantity supplied'
        ],
        answer: 2,
        why: 'A change in the good’s own price moves along the supply curve. Sellers offer a larger quantity; the curve itself stays put.'
      },
      {
        q: 'The government puts a $1 tax on every unit producers sell. This:',
        options: [
          'Increases supply',
          'Decreases supply',
          'Increases demand',
          'Has no effect on the market'
        ],
        answer: 1,
        why: 'The tax works like a higher cost per unit, so sellers need $1 more to offer any given quantity. The supply curve shifts up, which means left.'
      }
    ]
  },

  {
    id: 'equilibrium',
    unit: 'u2',
    title: 'Market Equilibrium',
    summary: 'Where supply meets demand, how markets fix shortages and surpluses, and how to predict price changes.',
    minutes: 14,
    body: `
<h2>Where supply meets demand</h2>
<p>A market is in <strong>equilibrium</strong> at the price where the quantity demanded equals the quantity supplied. At that price, every buyer who wants to buy can find a seller and every seller who wants to sell can find a buyer. In the coffee example, that happens at $3 a cup and 600 cups a week.</p>
<p>The lab below uses a general market with prices from $0 to $20. Try the events, or drag the sliders yourself.</p>
<div data-widget="market" data-preset="equilibrium"></div>

<h2>Surpluses and shortages push the price toward equilibrium</h2>
<ul>
  <li><strong>Price above equilibrium.</strong> Sellers offer more than buyers want, a <em>surplus</em>. Unsold stock piles up, so sellers cut prices.</li>
  <li><strong>Price below equilibrium.</strong> Buyers want more than sellers offer, a <em>shortage</em>. Shelves empty and lines form, so sellers raise prices.</li>
</ul>
<p>In the coffee market at $4, buyers want 400 cups but sellers offer 800, a surplus of 400. At $2, buyers want 800 but sellers offer 400, a shortage of 400. Either way, the price is pushed back toward $3. Nobody has to coordinate this; it happens through millions of individual decisions. Adam Smith called it the “invisible hand”.</p>

<h2>When one curve shifts</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Change</th><th>Equilibrium price</th><th>Equilibrium quantity</th></tr></thead>
  <tbody>
    <tr><td>Demand increases</td><td>Rises</td><td>Rises</td></tr>
    <tr><td>Demand decreases</td><td>Falls</td><td>Falls</td></tr>
    <tr><td>Supply increases</td><td>Falls</td><td>Rises</td></tr>
    <tr><td>Supply decreases</td><td>Rises</td><td>Falls</td></tr>
  </tbody>
</table></div>

<h2>A three-step method</h2>
<ol>
  <li>Decide whether the event shifts demand, supply, or both.</li>
  <li>Decide which direction each curve shifts.</li>
  <li>Compare the old and new equilibrium on a graph.</li>
</ol>
<div class="note example">
  <p class="note-label">Worked example</p>
  <p>A frost destroys much of Florida’s orange crop. (1) Weather affects sellers, so supply shifts. (2) Fewer oranges means supply decreases, a shift left. (3) The new equilibrium has a higher price and a lower quantity. Orange juice gets more expensive and people drink less of it.</p>
</div>

<h2>When both curves shift</h2>
<p>When demand and supply both shift, you can predict one of price or quantity for certain. The other depends on which shift is bigger.</p>
<div class="table-wrap"><table>
  <thead><tr><th>Changes</th><th>Price</th><th>Quantity</th></tr></thead>
  <tbody>
    <tr><td>Demand ↑, supply ↑</td><td>Ambiguous</td><td>Rises</td></tr>
    <tr><td>Demand ↓, supply ↓</td><td>Ambiguous</td><td>Falls</td></tr>
    <tr><td>Demand ↑, supply ↓</td><td>Rises</td><td>Ambiguous</td></tr>
    <tr><td>Demand ↓, supply ↑</td><td>Falls</td><td>Ambiguous</td></tr>
  </tbody>
</table></div>
<p>For example, a cold winter increases demand for heating oil while a refinery outage decreases its supply. The price certainly rises. Whether more or less oil is sold depends on which shift is larger.</p>
`,
    terms: [
      ['Equilibrium', 'The price and quantity at which the quantity demanded equals the quantity supplied.'],
      ['Surplus', 'A situation in which quantity supplied exceeds quantity demanded, usually because the price is above equilibrium. Also called excess supply.'],
      ['Shortage', 'A situation in which quantity demanded exceeds quantity supplied, usually because the price is below equilibrium. Also called excess demand.']
    ],
    quiz: [
      {
        q: 'If the market price is above the equilibrium price, there will be:',
        options: ['A shortage', 'A surplus', 'Equilibrium', 'An increase in demand'],
        answer: 1,
        why: 'At a high price, sellers want to sell more than buyers want to buy. The unsold surplus pushes the price down.'
      },
      {
        q: 'A report says beef is healthier than people thought, and at the same time the cost of cattle feed falls. In the beef market:',
        options: [
          'Price rises; quantity is ambiguous',
          'Price falls; quantity is ambiguous',
          'Quantity rises; price is ambiguous',
          'Both price and quantity rise'
        ],
        answer: 2,
        why: 'Demand increases (health news) and supply increases (cheaper feed). Both shifts raise quantity, but they push price in opposite directions, so the price change depends on which shift is bigger.'
      },
      {
        q: 'A frost destroys half of Florida’s orange crop. What happens in the orange juice market?',
        options: [
          'Price rises and quantity falls',
          'Price falls and quantity rises',
          'Price and quantity both rise',
          'Price and quantity both fall'
        ],
        answer: 0,
        why: 'The frost decreases supply, shifting it left. Moving up along the demand curve, the price rises and the quantity falls.'
      },
      {
        q: 'Using this unit’s coffee schedules, what happens if the price is $2 a cup?',
        options: [
          'A surplus of 400 cups',
          'A shortage of 400 cups',
          'A shortage of 800 cups',
          'The market is in equilibrium'
        ],
        answer: 1,
        why: 'At $2, buyers want 800 cups and sellers offer 400. The 400-cup shortage will push the price up toward $3.'
      }
    ]
  },

  {
    id: 'elasticity',
    unit: 'u2',
    title: 'Elasticity',
    summary: 'How strongly buyers and sellers react to price changes, and what that means for revenue.',
    minutes: 14,
    body: `
<h2>Measuring responsiveness</h2>
<p>The law of demand says quantity falls when price rises, but not by how much. <strong>Price elasticity of demand</strong> measures it:</p>
<div class="formula">Price elasticity of demand = <strong>% change in quantity demanded ÷ % change in price</strong></div>
<p>The result is negative because price and quantity move in opposite directions. Economists usually drop the minus sign and talk about the absolute value.</p>

<h2>The midpoint method</h2>
<p>A price rise from $4 to $5 is a 25% increase, but a fall from $5 to $4 is only 20%. To get the same answer in both directions, divide each change by the <em>average</em> of the two values:</p>
<div class="formula">% change in Q = (Q<sub>2</sub> − Q<sub>1</sub>) ÷ [(Q<sub>1</sub> + Q<sub>2</sub>) ÷ 2]</div>
<div class="note example">
  <p class="note-label">Worked example</p>
  <p>The price of a sandwich rises from $4 to $5 and daily sales fall from 100 to 70.</p>
  <ul>
    <li>% change in quantity = −30 ÷ 85 = −35.3%</li>
    <li>% change in price = 1 ÷ 4.5 = 22.2%</li>
    <li>Elasticity = 35.3 ÷ 22.2 ≈ <strong>1.59</strong>. Demand is elastic.</li>
  </ul>
</div>

<h2>Classifying elasticity</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Elasticity (absolute value)</th><th>Name</th><th>What it means</th></tr></thead>
  <tbody>
    <tr><td>Greater than 1</td><td>Elastic</td><td>Quantity changes by a larger % than price</td></tr>
    <tr><td>Exactly 1</td><td>Unit elastic</td><td>Quantity changes by the same % as price</td></tr>
    <tr><td>Less than 1</td><td>Inelastic</td><td>Quantity changes by a smaller % than price</td></tr>
    <tr><td>0</td><td>Perfectly inelastic</td><td>Quantity doesn’t change at all (a vertical curve)</td></tr>
    <tr><td>Infinite</td><td>Perfectly elastic</td><td>Any price rise drops quantity to zero (a horizontal curve)</td></tr>
  </tbody>
</table></div>

<h2>What makes demand elastic?</h2>
<ul>
  <li><strong>Close substitutes.</strong> The more there are, the more elastic demand is. One brand of cereal is very elastic; food as a whole is not.</li>
  <li><strong>Necessity or luxury.</strong> Insulin is inelastic; cruises are elastic.</li>
  <li><strong>Share of the budget.</strong> People barely notice the price of salt, but they notice the price of rent.</li>
  <li><strong>Time.</strong> Demand gets more elastic over time. When gas prices jump, people can’t change much this week, but over years they buy more efficient cars or move closer to work.</li>
  <li><strong>How narrowly the market is defined.</strong> “Brand X jeans” is more elastic than “clothing”.</li>
</ul>

<h2>Elasticity and total revenue</h2>
<p>A seller’s <strong>total revenue</strong> is price × quantity. Elasticity tells you what a price change does to it.</p>
<div class="table-wrap"><table>
  <thead><tr><th>If demand is…</th><th>Raising the price…</th><th>Lowering the price…</th></tr></thead>
  <tbody>
    <tr><td>Elastic</td><td>Lowers revenue</td><td>Raises revenue</td></tr>
    <tr><td>Unit elastic</td><td>Leaves revenue unchanged</td><td>Leaves revenue unchanged</td></tr>
    <tr><td>Inelastic</td><td>Raises revenue</td><td>Lowers revenue</td></tr>
  </tbody>
</table></div>
<p>This explains a puzzle: a bumper harvest can leave farmers worse off. Demand for food is inelastic, so a big increase in supply pushes the price down a lot, and total revenue falls.</p>
<div data-widget="elasticity"></div>

<h2>Other elasticities</h2>
<ul>
  <li><strong>Income elasticity of demand</strong> = % change in quantity demanded ÷ % change in income. Positive for normal goods, negative for inferior goods, and greater than 1 for luxuries.</li>
  <li><strong>Cross-price elasticity</strong> = % change in quantity demanded of good X ÷ % change in the price of good Y. Positive for substitutes, negative for complements.</li>
  <li><strong>Price elasticity of supply</strong> = % change in quantity supplied ÷ % change in price. Supply is more elastic when producers have spare capacity and more time to adjust.</li>
</ul>
`,
    terms: [
      ['Price elasticity of demand', 'The percentage change in quantity demanded divided by the percentage change in price.'],
      ['Midpoint method', 'A way of calculating percentage changes using the average of the starting and ending values, so the result is the same in either direction.'],
      ['Elastic', 'Describes demand or supply whose quantity changes by a larger percentage than the price (elasticity greater than 1).'],
      ['Inelastic', 'Describes demand or supply whose quantity changes by a smaller percentage than the price (elasticity less than 1).'],
      ['Total revenue', 'The amount a seller receives from sales, equal to price times quantity sold.'],
      ['Income elasticity of demand', 'The percentage change in quantity demanded divided by the percentage change in income.'],
      ['Cross-price elasticity', 'The percentage change in quantity demanded of one good divided by the percentage change in the price of another good.'],
      ['Price elasticity of supply', 'The percentage change in quantity supplied divided by the percentage change in price.']
    ],
    quiz: [
      {
        q: 'The price of a good rises 10% and the quantity demanded falls 5%. Demand is:',
        options: ['Elastic, 2.0', 'Inelastic, 0.5', 'Unit elastic, 1.0', 'Perfectly inelastic'],
        answer: 1,
        why: '5% ÷ 10% = 0.5, which is less than 1, so demand is inelastic.'
      },
      {
        q: 'A theatre wants to increase its ticket revenue, and demand for its tickets is elastic. It should:',
        options: ['Raise its prices', 'Lower its prices', 'Keep prices the same', 'Stop selling tickets'],
        answer: 1,
        why: 'With elastic demand, a price cut raises quantity by a larger percentage than the price falls, so total revenue rises.'
      },
      {
        q: 'Which of these probably has the most elastic demand?',
        options: [
          'Insulin',
          'Table salt',
          'One particular brand of bottled water',
          'Gasoline, in the short run'
        ],
        answer: 2,
        why: 'A single brand has many close substitutes: other brands, and tap water. The other three are necessities, a tiny share of the budget, or hard to replace quickly.'
      },
      {
        q: 'The cross-price elasticity between hot dogs and hot dog buns is negative. The two goods are:',
        options: ['Substitutes', 'Complements', 'Inferior goods', 'Unrelated'],
        answer: 1,
        why: 'Negative means that when the price of one rises, people buy less of the other. Goods used together behave this way.'
      }
    ]
  },

  {
    id: 'price-controls',
    unit: 'u2',
    title: 'Price Ceilings, Price Floors & Taxes',
    summary: 'What happens when governments override the market price, and who really pays a tax.',
    minutes: 14,
    body: `
<h2>When governments set prices</h2>
<p>Sometimes governments decide the market price is unfair and set a legal limit. A <strong>price ceiling</strong> is a maximum price. A <strong>price floor</strong> is a minimum price. Either one only matters if it is <strong>binding</strong>: a ceiling must be set below the equilibrium price, and a floor above it. A ceiling of $30 in a market where the price is $20 changes nothing.</p>

<h2>Price ceilings create shortages</h2>
<p>Rent control is the classic example. If the maximum rent is set below equilibrium, more people want apartments than landlords offer. The result is a shortage, and some predictable side effects:</p>
<ul>
  <li>Long waiting lists, and apartments going to whoever hears about them first.</li>
  <li>Side payments and black markets, such as “key money” paid under the table.</li>
  <li>Lower quality, since landlords have less reason to maintain buildings when they can fill them anyway.</li>
  <li>People staying in apartments that no longer suit them, because moving means losing a cheap rent.</li>
</ul>
<p>The shortage usually grows over time. In the long run, supply is more elastic: fewer new apartments get built, and some existing ones are converted to condos or other uses.</p>

<h2>Price floors create surpluses</h2>
<p>Agricultural price supports are one example. If the government guarantees farmers a price above equilibrium, farmers grow more than consumers want, and the government often ends up buying and storing the surplus.</p>
<p>The minimum wage is a price floor on labor. In the simplest competitive model, a binding minimum wage creates a surplus of labor, meaning unemployment. The real-world evidence is more mixed. Many studies of moderate increases find small effects on employment, partly because some employers have enough market power to hold wages below the competitive level. Economists still debate how large increases play out.</p>

<h2>Try it: controls and taxes</h2>
<p>Choose a price ceiling, a price floor or a tax, and move the slider. The gray triangle is the deadweight loss.</p>
<div data-widget="market" data-preset="controls"></div>

<h2>Taxes drive a wedge</h2>
<p>A tax of $t per unit creates a gap between the price buyers pay and the price sellers keep. Fewer units are traded, and some trades that would have benefited both sides no longer happen. The value lost from those missing trades is the <strong>deadweight loss</strong> of the tax.</p>
<p><strong>Tax incidence</strong> is about who actually bears the tax. It doesn’t depend on who hands the money to the government. It depends on elasticity: <strong>the less elastic side of the market bears more of the tax.</strong> If buyers can’t easily do without the good, sellers can pass most of the tax on to them.</p>
<div class="note example">
  <p class="note-label">Worked example</p>
  <p>In the lab, choose Tax and set it to $3. Buyers now pay $11.50 instead of $10, and sellers keep $8.50. Each side bears $1.50 of the tax because the two curves are equally steep. Quantity falls from 50 to 37.5 units. The government collects $3 × 37.5 = $112.50, and the deadweight loss is ½ × $3 × 12.5 = $18.75.</p>
</div>
`,
    terms: [
      ['Price ceiling', 'A legal maximum price; it causes a shortage if set below the equilibrium price.'],
      ['Price floor', 'A legal minimum price; it causes a surplus if set above the equilibrium price.'],
      ['Binding', 'Describes a price control that actually changes the market outcome: a ceiling below equilibrium or a floor above it.'],
      ['Deadweight loss', 'The loss of total surplus that results when the quantity traded is below or above the efficient level.'],
      ['Tax incidence', 'How the burden of a tax is divided between buyers and sellers; the less elastic side bears more.']
    ],
    quiz: [
      {
        q: 'A price ceiling set below the equilibrium price will cause:',
        options: ['A surplus', 'A shortage', 'No change', 'An increase in supply'],
        answer: 1,
        why: 'At the lower legal price, buyers want more and sellers offer less, so quantity demanded exceeds quantity supplied.'
      },
      {
        q: 'The equilibrium price of milk is $4. The government sets a price floor of $3. What happens?',
        options: [
          'A surplus of milk',
          'A shortage of milk',
          'Nothing, because the floor is not binding',
          'The price falls to $3'
        ],
        answer: 2,
        why: 'A floor only binds if it is above equilibrium. The market price of $4 is already above the $3 minimum.'
      },
      {
        q: 'Demand for cigarettes is very inelastic and supply is fairly elastic. A new cigarette tax will be paid mostly by:',
        options: [
          'Sellers',
          'Buyers',
          'Split equally',
          'Whoever sends the tax to the government'
        ],
        answer: 1,
        why: 'The less elastic side bears more of the tax. Smokers don’t cut back much, so sellers can raise prices by nearly the full tax.'
      },
      {
        q: 'The deadweight loss of a tax is:',
        options: [
          'The revenue the government collects',
          'The total surplus lost from trades that no longer happen',
          'The increase in the price buyers pay',
          'The profit sellers lose'
        ],
        answer: 1,
        why: 'Tax revenue moves from buyers and sellers to the government; it isn’t lost. The deadweight loss is the value of trades that would have benefited both sides but no longer happen.'
      }
    ]
  }
);
