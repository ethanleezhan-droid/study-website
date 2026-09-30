/* Unit 1: Thinking Like an Economist */
ECON.lessons.push(
  {
    id: 'scarcity',
    unit: 'u1',
    title: 'Scarcity, Choice & Opportunity Cost',
    summary: 'Why economics exists: unlimited wants, limited resources, and the real cost of every choice.',
    minutes: 12,
    body: `
<h2>The basic problem</h2>
<p>Every person, business and government runs into the same wall: wants are effectively unlimited, but the resources for meeting them are not. There are only so many hours in a day, so much farmland, so many workers and so many machines. This mismatch is called <strong>scarcity</strong>, and it is the reason economics exists.</p>
<p><strong>Economics</strong> is the study of how people make choices when resources are scarce, and of what happens when millions of those choices interact.</p>
<div class="note key">
  <p class="note-label">Key idea</p>
  <p>Scarcity is not the same as poverty. A billionaire still faces scarcity: they have 24 hours in a day like everyone else and must decide how to spend them.</p>
</div>

<h2>The factors of production</h2>
<p>Economists sort productive resources into four groups. Each one earns a different kind of income.</p>
<div class="table-wrap"><table>
  <thead><tr><th>Factor</th><th>What it includes</th><th>Income it earns</th></tr></thead>
  <tbody>
    <tr><td>Land</td><td>Natural resources: soil, water, forests, oil, minerals</td><td>Rent</td></tr>
    <tr><td>Labor</td><td>Human effort, physical and mental</td><td>Wages</td></tr>
    <tr><td>Capital</td><td>Tools, machines, buildings and equipment used to make other goods</td><td>Interest</td></tr>
    <tr><td>Entrepreneurship</td><td>Combining the other three and taking on the risk of a new venture</td><td>Profit</td></tr>
  </tbody>
</table></div>
<p>Money is not capital in this sense. A delivery van is capital because it helps produce a service. The cash used to buy the van is only a claim on resources.</p>

<h2>Opportunity cost</h2>
<p>Because resources are limited, choosing one thing means giving up something else. The <strong>opportunity cost</strong> of a choice is the value of the next-best alternative you give up.</p>
<p>Say you have a free Saturday. You could work a shift, study for an exam, or go hiking. If you go hiking and studying was your second choice, the opportunity cost of the hike is the studying. It is not the studying plus the shift: you could only have done one of them.</p>
<div class="note example">
  <p class="note-label">Worked example: the real cost of college</p>
  <p>Tuition is $12,000 a year and books are $1,000. Room and board is $10,000. The student could otherwise work full-time for $30,000.</p>
  <ul>
    <li>Tuition and books ($13,000) are paid only because of college, so they count.</li>
    <li>Room and board mostly doesn't count: the student would need food and housing either way.</li>
    <li>The $30,000 in wages they give up does count, even though no money changes hands.</li>
  </ul>
  <p>The economic cost is about <strong>$43,000 a year</strong>. For many students the income they give up is the largest cost of all.</p>
</div>
<div class="note pitfall">
  <p class="note-label">Common mistake</p>
  <p>Opportunity cost is the single next-best alternative, not the total of everything else you could have done.</p>
</div>

<h2>Explicit and implicit costs</h2>
<p>An <strong>explicit cost</strong> requires a direct payment, like tuition. An <strong>implicit cost</strong> is the value of something you already own that you use instead of selling or renting out, like your own time. Economists count both. Accountants usually count only explicit costs, which is why an economist's idea of profit is stricter than an accountant's.</p>

<h2>Positive and normative statements</h2>
<p>A <strong>positive statement</strong> describes how the world is, and it can be tested with evidence: “Raising the tax on cigarettes reduces smoking.” A <strong>normative statement</strong> says how the world should be, and rests on values: “The government should raise the tax on cigarettes.” Data can settle positive disagreements. It can inform normative ones but cannot settle them alone.</p>

<h2>Micro and macro</h2>
<p><strong>Microeconomics</strong> studies individual decision-makers: households, firms and single markets. <strong>Macroeconomics</strong> studies the economy as a whole: total output, unemployment, inflation and growth. Units 1 to 3 of this course are mostly micro; Units 4 and 5 are macro.</p>
`,
    terms: [
      ['Scarcity', 'The condition in which wants exceed the resources available to satisfy them, forcing people to make choices.'],
      ['Economics', 'The study of how individuals, firms and societies make choices when resources are scarce.'],
      ['Opportunity cost', 'The value of the next-best alternative given up when a choice is made.'],
      ['Factors of production', 'The resources used to produce goods and services: land, labor, capital and entrepreneurship.'],
      ['Capital', 'Tools, machines, buildings and equipment used to produce other goods and services.'],
      ['Explicit cost', 'A cost that requires an outlay of money, such as wages paid or rent.'],
      ['Implicit cost', 'The value of resources a person or firm already owns and uses instead of selling or renting them, such as their own time.'],
      ['Positive statement', 'A claim about how the world is that can be tested with evidence.'],
      ['Normative statement', 'A claim about how the world should be, based on values or opinions.'],
      ['Microeconomics', 'The study of individual households, firms and markets.'],
      ['Macroeconomics', 'The study of the economy as a whole, including output, unemployment, inflation and growth.']
    ],
    quiz: [
      {
        q: 'Which statement best describes scarcity?',
        options: [
          'A shortage caused by a government price limit',
          'Limited resources relative to unlimited wants',
          'The poverty found in low-income countries',
          'A good that is no longer being produced'
        ],
        answer: 1,
        why: 'Scarcity applies to everyone, rich or poor, because wants always exceed the resources available. A shortage is a separate idea that applies to a specific market at a specific price.'
      },
      {
        q: 'Jada skips a 3-hour shift that pays $15 an hour to go to a concert. The ticket costs $40, and working was her next-best option. What is the opportunity cost of the concert?',
        options: ['$40', '$45', '$85', '$0, because she enjoyed it'],
        answer: 2,
        why: 'She gives up the $40 she could have spent on something else, plus the $45 in wages she would have earned. $40 + $45 = $85.'
      },
      {
        q: 'Which of these is a normative statement?',
        options: [
          'Unemployment rose by 0.3 percentage points last quarter.',
          'Higher cigarette taxes reduce the number of smokers.',
          'The government should tax sugary drinks.',
          'Inflation reduces the purchasing power of savings.'
        ],
        answer: 2,
        why: '“Should” signals a value judgment. The other three statements could be checked against data, so they are positive statements, whether or not they turn out to be true.'
      },
      {
        q: 'Which is an example of capital as a factor of production?',
        options: [
          '$10,000 in a savings account',
          'A delivery van used by a bakery',
          'An acre of farmland',
          'An hour of a baker’s time'
        ],
        answer: 1,
        why: 'Capital means physical tools used to produce other goods and services. Money is a claim on resources, farmland counts as land, and a baker’s time is labor.'
      }
    ]
  },

  {
    id: 'ppf',
    unit: 'u1',
    title: 'The Production Possibilities Frontier',
    summary: 'A simple graph that shows trade-offs, efficiency and economic growth at a glance.',
    minutes: 12,
    body: `
<h2>A model of choice</h2>
<p>An economy with a fixed amount of resources and technology can produce many different combinations of goods. The <strong>production possibilities frontier</strong> (PPF) shows the maximum combinations of two goods it can produce when all of its resources are used efficiently.</p>
<p>Real economies make millions of goods, of course. Using two keeps the trade-offs visible, and the lessons carry over to the real thing. Below, an imaginary economy makes pizzas and robots.</p>
<div data-widget="ppf"></div>

<h2>Reading the frontier</h2>
<ul>
  <li><strong>Points on the curve</strong> are efficient. You can’t make more of one good without making less of the other.</li>
  <li><strong>Points inside the curve</strong> are attainable but inefficient. Some workers or machines are idle or poorly used, as happens in a recession.</li>
  <li><strong>Points outside the curve</strong> are unattainable with today’s resources and technology.</li>
</ul>
<p>Click anywhere on the graph above to test a point.</p>

<h2>Opportunity cost is the slope</h2>
<p>Moving along the frontier, more pizzas means fewer robots. The number of robots you give up for each extra pizza is the opportunity cost of a pizza, and it is shown by the slope of the curve.</p>
<div class="table-wrap"><table class="num">
  <thead><tr><th>Pizzas</th><th>Robots</th><th>Robots given up for these 20 pizzas</th></tr></thead>
  <tbody>
    <tr><td>0</td><td>50</td><td>–</td></tr>
    <tr><td>20</td><td>49</td><td>1</td></tr>
    <tr><td>40</td><td>45.8</td><td>3.2</td></tr>
    <tr><td>60</td><td>40</td><td>5.8</td></tr>
    <tr><td>80</td><td>30</td><td>10</td></tr>
    <tr><td>100</td><td>0</td><td>30</td></tr>
  </tbody>
</table></div>

<h2>Why the curve bows outward</h2>
<p>Resources are not equally good at everything. When the economy first shifts toward pizza, it moves the resources best suited to pizza: chefs and ovens. As it keeps going, it has to pull in robotics engineers and robot factories, which are terrible at making pizza. Each extra batch of pizzas costs more robots than the last.</p>
<p>This is the <strong>law of increasing opportunity cost</strong>, and it is why the PPF bows outward. If resources were equally good at both tasks, the frontier would be a straight line and the opportunity cost would stay constant.</p>

<h2>Shifting the frontier: economic growth</h2>
<p>The whole frontier shifts outward when the economy gains resources (more workers, more machines) or better technology. Tick “Show economic growth” above to see it.</p>
<p>Today’s choices move tomorrow’s frontier. An economy that puts more resources into capital goods (factories, machines, education) gives up some consumption now, but its frontier grows faster later.</p>
<div class="note pitfall">
  <p class="note-label">Common mistake</p>
  <p>A recession moves the economy to a point <em>inside</em> the PPF. It doesn’t shift the frontier inward, because the workers and factories still exist. The frontier shifts in only when productive capacity is destroyed, for example by war or natural disaster.</p>
</div>
`,
    terms: [
      ['Production possibilities frontier', 'A curve showing the maximum combinations of two goods an economy can produce with its available resources and technology.'],
      ['Efficiency', 'A situation in which resources are used so that no one can be made better off without making someone else worse off; on a PPF, any point on the curve.'],
      ['Law of increasing opportunity cost', 'As production of one good increases, the opportunity cost of producing each additional unit rises, because resources are not equally suited to all uses.'],
      ['Economic growth', 'An increase in an economy’s capacity to produce goods and services, shown by an outward shift of the PPF or a rise in real GDP.']
    ],
    quiz: [
      {
        q: 'A point inside the production possibilities frontier represents:',
        options: [
          'An unattainable combination',
          'An attainable but inefficient combination',
          'The most efficient combination',
          'A combination only possible with trade'
        ],
        answer: 1,
        why: 'Inside the curve, some resources are idle or badly used, so the economy could make more of at least one good without giving up any of the other.'
      },
      {
        q: 'Why is a typical PPF bowed outward?',
        options: [
          'Because prices rise as output rises',
          'Because resources are not equally suited to producing both goods',
          'Because of diminishing demand',
          'Because the economy has unemployment'
        ],
        answer: 1,
        why: 'As you specialize more in one good, you must use resources that are worse at producing it. That raises the opportunity cost of each extra unit.'
      },
      {
        q: 'Which of these would shift the PPF outward?',
        options: [
          'A fall in unemployment',
          'The discovery of a better production technology',
          'Producing more of one good and less of the other',
          'A rise in the general price level'
        ],
        answer: 1,
        why: 'Better technology raises what the economy can make from the same resources. Lower unemployment moves the economy from inside the curve toward it, but doesn’t move the curve itself.'
      },
      {
        q: 'Using the table in this lesson, how many robots does it cost to go from 60 to 80 pizzas?',
        options: ['5.8', '10', '20', '30'],
        answer: 1,
        why: 'Robots fall from 40 to 30, so those 20 pizzas cost 10 robots. The next 20 pizzas cost 30 robots, which is increasing opportunity cost at work.'
      }
    ]
  },

  {
    id: 'trade',
    unit: 'u1',
    title: 'Comparative Advantage & Gains from Trade',
    summary: 'Why two people, or two countries, can both win from trade even when one is better at everything.',
    minutes: 14,
    body: `
<h2>Why trade at all?</h2>
<p>Trade lets people specialize in what they do relatively best and swap for everything else. The surprising part, first set out by David Ricardo in 1817, is that both sides can gain even if one of them is better at producing everything.</p>

<h2>Absolute and comparative advantage</h2>
<p>A producer has an <strong>absolute advantage</strong> in a good if they can make more of it with the same resources. A producer has a <strong>comparative advantage</strong> in a good if they can make it at a lower opportunity cost. Comparative advantage is what matters for trade.</p>
<div class="note example">
  <p class="note-label">Worked example: Maya and Leo</p>
  <p>In a week, Maya can bake 80 loaves of bread <em>or</em> sew 40 shirts. Leo can bake 20 loaves <em>or</em> sew 20 shirts. Maya is better at both, so she has the absolute advantage in both.</p>
  <div class="table-wrap"><table>
    <thead><tr><th></th><th>1 loaf costs</th><th>1 shirt costs</th></tr></thead>
    <tbody>
      <tr><td>Maya</td><td>½ shirt</td><td>2 loaves</td></tr>
      <tr><td>Leo</td><td>1 shirt</td><td>1 loaf</td></tr>
    </tbody>
  </table></div>
  <p>A shirt costs Leo only 1 loaf but costs Maya 2, so <strong>Leo has the comparative advantage in shirts</strong>. A loaf costs Maya only half a shirt, so <strong>Maya has the comparative advantage in bread</strong>.</p>
</div>

<h2>The gains from specializing</h2>
<p>Without trade, suppose each of them splits the week evenly. Maya makes 40 loaves and 20 shirts. Leo makes 10 loaves and 10 shirts.</p>
<p>Now Leo sews full time and makes 20 shirts. Maya spends three-quarters of her week baking and the rest sewing, making 60 loaves and 10 shirts. Then Leo trades 10 shirts to Maya for 15 loaves.</p>
<div class="table-wrap"><table class="num">
  <thead><tr><th></th><th>Without trade</th><th>With specialization and trade</th><th>Gain</th></tr></thead>
  <tbody>
    <tr><td>Maya</td><td>40 loaves, 20 shirts</td><td>45 loaves, 20 shirts</td><td>+5 loaves</td></tr>
    <tr><td>Leo</td><td>10 loaves, 10 shirts</td><td>15 loaves, 10 shirts</td><td>+5 loaves</td></tr>
  </tbody>
</table></div>
<p>Both end up with more than they could make on their own. Nobody worked harder; the gain came entirely from each person doing what they give up least to do.</p>

<h2>The terms of trade</h2>
<p>Trade only helps both sides if the price falls between their two opportunity costs. A shirt costs Leo 1 loaf to make and costs Maya 2 loaves, so a shirt must trade for somewhere between 1 and 2 loaves. Above 2, Maya would rather sew her own. Below 1, Leo would rather bake his own bread. Maya and Leo traded at 1.5 loaves per shirt.</p>
<p>Try your own numbers:</p>
<div data-widget="advantage"></div>

<h2>Countries work the same way</h2>
<p>The same logic explains trade between nations. A country doesn’t need to be the best at anything to gain from trade; it only needs different opportunity costs from its partners.</p>
<div class="note key">
  <p class="note-label">Key idea</p>
  <p>Trade makes a country as a whole better off, but not every person in it. Workers in industries that face new import competition can lose their jobs even while the country gains overall. That is why trade policy is so contested, and it comes back in Lesson 22.</p>
</div>
`,
    terms: [
      ['Absolute advantage', 'The ability to produce more of a good than another producer using the same amount of resources.'],
      ['Comparative advantage', 'The ability to produce a good at a lower opportunity cost than another producer.'],
      ['Specialization', 'Concentrating on producing the goods for which one has a comparative advantage.'],
      ['Terms of trade', 'The rate at which one good is exchanged for another; for trade to benefit both sides it must lie between their opportunity costs.']
    ],
    quiz: [
      {
        q: 'Having a comparative advantage in a good means you can produce it:',
        options: [
          'With fewer total resources than anyone else',
          'At a lower opportunity cost than others',
          'At a higher quality than others',
          'Faster than anyone else'
        ],
        answer: 1,
        why: 'Comparative advantage is about what you give up. Producing with fewer resources describes absolute advantage.'
      },
      {
        q: 'In one hour, Country A makes 10 cars or 20 tons of wheat. Country B makes 2 cars or 10 tons of wheat. Who has the comparative advantage in cars?',
        options: ['Country A', 'Country B', 'Neither', 'Both'],
        answer: 0,
        why: 'A car costs Country A 2 tons of wheat (20 ÷ 10). It costs Country B 5 tons (10 ÷ 2). A gives up less wheat per car, so A has the comparative advantage in cars and B has it in wheat.'
      },
      {
        q: 'In the same example, which price of a car would let both countries gain from trade?',
        options: ['1 ton of wheat', '3 tons of wheat', '6 tons of wheat', '10 tons of wheat'],
        answer: 1,
        why: 'The price must lie between the two opportunity costs: 2 tons (A’s cost) and 5 tons (B’s cost). Only 3 tons is in that range.'
      },
      {
        q: 'If one person has an absolute advantage in producing both goods:',
        options: [
          'There are no gains from trade',
          'Only the more productive person can gain',
          'Both can still gain by specializing according to comparative advantage',
          'The less productive person should produce both goods'
        ],
        answer: 2,
        why: 'As long as their opportunity costs differ, each person has a comparative advantage in something, and both can gain. That was Ricardo’s insight.'
      }
    ]
  },

  {
    id: 'margins',
    unit: 'u1',
    title: 'Marginal Thinking & Incentives',
    summary: 'Good decisions compare one more unit of benefit with one more unit of cost, and ignore what is already spent.',
    minutes: 10,
    body: `
<h2>Thinking at the margin</h2>
<p>Most decisions aren’t all-or-nothing. You aren’t choosing between studying and never studying; you’re choosing whether to study for one more hour. Economists call this <strong>thinking at the margin</strong>: comparing the extra benefit of a small step with its extra cost.</p>
<div class="formula">Keep going while <strong>marginal benefit ≥ marginal cost</strong>. Stop when marginal benefit falls below marginal cost.</div>

<div class="note example">
  <p class="note-label">Worked example: how late should the café stay open?</p>
  <p>A café usually closes at 9 p.m. The owner estimates what each extra hour would bring in and what it would cost in wages and electricity.</p>
  <div class="table-wrap"><table class="num">
    <thead><tr><th>Extra hour</th><th>Marginal benefit (sales)</th><th>Marginal cost</th><th>Stay open?</th></tr></thead>
    <tbody>
      <tr><td>9–10 p.m.</td><td>$180</td><td>$90</td><td>Yes</td></tr>
      <tr><td>10–11 p.m.</td><td>$110</td><td>$90</td><td>Yes</td></tr>
      <tr><td>11 p.m.–midnight</td><td>$70</td><td>$90</td><td>No</td></tr>
    </tbody>
  </table></div>
  <p>The café should close at 11 p.m. The average hour after 9 p.m. still makes money, but the last hour loses $20, so the average is the wrong thing to look at.</p>
</div>

<h2>Diminishing marginal benefit</h2>
<p>Each extra unit of something usually brings less benefit than the one before. The first slice of pizza when you are starving is wonderful; the fifth, much less so. That’s why marginal benefit falls as you do more of something, and why there is usually a sensible stopping point.</p>

<h2>Ignore sunk costs</h2>
<p>A <strong>sunk cost</strong> is a cost you have already paid and cannot get back. Since it is the same whatever you decide next, it should play no part in the decision.</p>
<p>Suppose you paid $60 for a non-refundable concert ticket, but you’re ill and would honestly rather stay home. The $60 is gone either way. Going only makes sense if going is better than staying home <em>right now</em>. Letting past spending push you into a worse choice is called the <strong>sunk cost fallacy</strong>.</p>

<h2>People respond to incentives</h2>
<p>An <strong>incentive</strong> is a reward or penalty that changes the costs and benefits of a choice. When incentives change, behavior changes, and sometimes not in the way anyone intended.</p>
<ul>
  <li>In 1902, the French colonial government in Hanoi paid a bounty for every rat tail handed in. Officials soon saw tailless rats in the streets: people were cutting off tails and releasing the rats to breed.</li>
  <li>Small charges for plastic shopping bags, introduced in many countries, cut their use sharply. A few cents was enough to change a habit.</li>
</ul>

<h2>Rational choice and its limits</h2>
<p>Economic models usually assume people act in their own best interest given what they know. <strong>Behavioral economics</strong> studies the predictable ways people fall short of that: putting off tasks, fearing losses more than they value equal gains, and sticking with whatever option is the default. Automatically enrolling workers in a retirement plan, with the freedom to opt out, raises participation dramatically. These findings refine marginal thinking; they don’t replace it.</p>
`,
    terms: [
      ['Marginal benefit', 'The additional benefit from consuming or producing one more unit of something.'],
      ['Marginal cost', 'The additional cost of producing or doing one more unit of something.'],
      ['Sunk cost', 'A cost that has already been paid and cannot be recovered; it should not affect future decisions.'],
      ['Incentive', 'A reward or penalty that motivates people to act in a particular way.'],
      ['Behavioral economics', 'The field that studies how psychological factors cause people to depart from purely rational decisions.']
    ],
    quiz: [
      {
        q: 'Staying open one extra hour would bring a shop $150 in sales and cost $170 in wages and power. What should the owner do?',
        options: [
          'Stay open, because $150 is a lot of sales',
          'Close, because the marginal cost exceeds the marginal benefit',
          'Stay open if the shop is profitable on average',
          'It depends on how much rent the shop pays'
        ],
        answer: 1,
        why: 'The extra hour loses $20. The shop’s average profit and its rent don’t change that comparison; rent is paid whether or not it stays open.'
      },
      {
        q: 'You have spent $2,000 repairing an old car. It now needs a $1,500 repair, and a comparable replacement car costs $1,000. What should drive your decision?',
        options: [
          'The $2,000 already spent, so you don’t waste it',
          'The $1,500 repair compared with the $1,000 replacement',
          'The total of $3,500 spent on the old car',
          'Whatever you decided last time'
        ],
        answer: 1,
        why: 'The $2,000 is a sunk cost: it’s gone whatever you choose. Only future costs and benefits matter, so compare the repair with the replacement.'
      },
      {
        q: 'A rational decision-maker keeps doing an activity until:',
        options: [
          'Total benefit is at its maximum',
          'Marginal benefit is zero',
          'Marginal benefit no longer exceeds marginal cost',
          'Average benefit equals average cost'
        ],
        answer: 2,
        why: 'Each extra unit is worth doing only if it adds at least as much benefit as cost. Past that point, net benefit starts falling.'
      },
      {
        q: 'A city pays residents a bounty for every rat tail they hand in. What is a likely unintended result?',
        options: [
          'Fewer rats than expected',
          'People breeding rats, or cutting off tails and releasing the rats',
          'Residents ignoring the program',
          'A rise in the price of rat traps only'
        ],
        answer: 1,
        why: 'The bounty rewards tails, not fewer rats. That is exactly what happened in Hanoi in 1902.'
      }
    ]
  }
);
