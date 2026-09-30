/* Unit 5: Policy & the Global Economy */
ECON.lessons.push(
  {
    id: 'money',
    unit: 'u5',
    title: 'Money & Banking',
    summary: 'What money does, why paper has value, and how ordinary banks create new money when they lend.',
    minutes: 13,
    body: `
<h2>What money does</h2>
<p>Without money, you would have to barter, and barter needs a <em>double coincidence of wants</em>: a baker who wants shoes must find a shoemaker who happens to want bread. Money solves this. It has three functions:</p>
<ul>
  <li><strong>Medium of exchange.</strong> People accept it in payment for goods and services.</li>
  <li><strong>Unit of account.</strong> Prices and debts are measured in it, so different goods are easy to compare.</li>
  <li><strong>Store of value.</strong> It holds its purchasing power over time. Not perfectly, since inflation erodes it, but well enough to let people save.</li>
</ul>

<h2>Commodity money and fiat money</h2>
<p><strong>Commodity money</strong> has value in itself, as gold and silver coins did. Today’s dollars, euros and yen are <strong>fiat money</strong>: they have no value of their own and are valuable because the government declares them legal tender and people trust that others will accept them. That trust depends on the currency keeping its value, which is one reason central banks focus so much on inflation.</p>

<h2>Measuring the money supply</h2>
<p>The money supply is measured in layers. <strong>M1</strong> is the most liquid money: currency plus checking deposits (in the US, savings deposits have also been included since 2020). <strong>M2</strong> adds less liquid assets such as small time deposits and retail money market funds.</p>

<h2>How banks create money</h2>
<p>Banks don’t keep all their deposits in the vault. Under <strong>fractional reserve banking</strong>, they hold a fraction as <strong>reserves</strong> and lend out the rest. When a loan is spent, the money ends up deposited in another bank, which lends out part of it again.</p>
<div class="note example">
  <p class="note-label">Worked example</p>
  <p>You deposit $1,000. Suppose banks keep 10% as reserves.</p>
  <ul>
    <li>Bank A keeps $100 and lends $900. The borrower pays a supplier, who deposits $900 in Bank B.</li>
    <li>Bank B keeps $90 and lends $810, which gets deposited in Bank C.</li>
    <li>Bank C keeps $81 and lends $729, and so on.</li>
  </ul>
  <p>In total, deposits can grow to $1,000 ÷ 0.10 = <strong>$10,000</strong>.</p>
</div>
<div class="formula">Simple money multiplier = <strong>1 ÷ reserve ratio</strong></div>
<p>The real-world multiplier is smaller. People keep some money as cash, banks choose to hold extra reserves, and lending depends on how many creditworthy borrowers want loans. In the US, the Federal Reserve cut reserve requirements to zero in 2020. Banks are now limited mainly by capital requirements and by how much lending is profitable.</p>

<h2>A bank’s balance sheet</h2>
<div class="table-wrap"><table class="matrix">
  <thead><tr><th>Assets (what the bank owns)</th><th>Liabilities and equity (what it owes)</th></tr></thead>
  <tbody>
    <tr><td>Reserves: $10 million</td><td>Deposits: $90 million</td></tr>
    <tr><td>Loans: $70 million</td><td>Owners’ equity (capital): $10 million</td></tr>
    <tr><td>Securities: $20 million</td><td></td></tr>
  </tbody>
</table></div>
<p>Your deposit is an asset to you but a liability to the bank: it owes you that money.</p>

<h2>Bank runs and deposit insurance</h2>
<p>Because banks lend out most of their deposits, they can’t repay every depositor at once. If people fear a bank is in trouble, they all rush to withdraw, and even a sound bank can fail. This is a <strong>bank run</strong>. To prevent runs, governments insure deposits; in the US, the FDIC covers up to $250,000 per depositor, per bank, for each type of account. Central banks also act as <em>lenders of last resort</em>. The rapid collapse of Silicon Valley Bank in March 2023, where most deposits were above the insured limit, showed how fast a modern run can happen.</p>
`,
    terms: [
      ['Money', 'Any asset that is generally accepted in exchange for goods and services.'],
      ['Medium of exchange', 'Something people accept as payment for goods and services.'],
      ['Unit of account', 'A standard measure used to state prices and record debts.'],
      ['Store of value', 'Something that holds its purchasing power over time.'],
      ['Fiat money', 'Money with no intrinsic value that has value because of government decree and public trust.'],
      ['Money supply', 'The total quantity of money in an economy, measured as M1 (currency and checkable deposits) or M2 (M1 plus less liquid deposits).'],
      ['Fractional reserve banking', 'A banking system in which banks hold only a fraction of deposits as reserves and lend out the rest.'],
      ['Reserves', 'Deposits that banks hold as cash in their vaults or as balances at the central bank, rather than lending out.'],
      ['Money multiplier', 'The maximum amount of money the banking system can create from each dollar of reserves; in the simple model, 1 ÷ reserve ratio.']
    ],
    quiz: [
      {
        q: 'You compare two phones priced at $799 and $999. Which function of money are you using?',
        options: ['Medium of exchange', 'Unit of account', 'Store of value', 'Standard of deferred payment'],
        answer: 1,
        why: 'Using dollars as a common measuring stick to compare values is the unit-of-account function.'
      },
      {
        q: 'If banks hold 20% of deposits as reserves, the simple money multiplier is:',
        options: ['0.2', '2', '5', '20'],
        answer: 2,
        why: 'Multiplier = 1 ÷ 0.20 = 5, so each $1 of new reserves can support up to $5 of deposits.'
      },
      {
        q: 'Fiat money has value because:',
        options: [
          'It is backed by gold',
          'Of government decree and public trust that others will accept it',
          'The paper it is printed on is valuable',
          'Banks hold 100% reserves'
        ],
        answer: 1,
        why: 'Modern currencies aren’t backed by a commodity. They work because people expect others to accept them.'
      },
      {
        q: 'The main purpose of deposit insurance is to:',
        options: [
          'Raise interest rates for savers',
          'Prevent bank runs by reassuring depositors',
          'Increase bank profits',
          'Replace the central bank'
        ],
        answer: 1,
        why: 'If insured depositors know their money is safe, they have no reason to rush to withdraw it, and runs become much less likely.'
      }
    ]
  },

  {
    id: 'monetary-policy',
    unit: 'u5',
    title: 'Monetary Policy',
    summary: 'How central banks use interest rates to fight recessions and inflation, and where their power runs out.',
    minutes: 14,
    body: `
<h2>Central banks</h2>
<p>A <strong>central bank</strong> manages a country’s money supply and interest rates. Examples include the Federal Reserve (the Fed) in the US, the European Central Bank, the Bank of England and the Bank of Japan. Most are independent of day-to-day politics, so they can make unpopular decisions such as raising rates before an election.</p>
<p>The Fed has a <strong>dual mandate</strong> from Congress: maximum employment and stable prices. It interprets stable prices as inflation of 2% a year on average.</p>

<h2>The main tool: a short-term interest rate</h2>
<p>The Fed sets a target range for the <strong>federal funds rate</strong>, the interest rate banks charge each other for overnight loans of reserves. Changes in that rate spread to other interest rates across the economy, including those on mortgages, car loans and business loans.</p>
<p>To keep the rate in its target range, the Fed uses:</p>
<ul>
  <li><strong>Interest on reserves.</strong> The rate the Fed pays banks on reserves they hold with it. Banks won’t lend to each other for much less than they can earn risk-free from the Fed.</li>
  <li><strong>Open market operations.</strong> Buying or selling government bonds to add or drain reserves.</li>
  <li><strong>The discount rate.</strong> The rate at which banks can borrow directly from the Fed.</li>
</ul>
<p>When short-term rates are already near zero, central banks can buy large amounts of longer-term bonds to push long-term rates down too. This is called <strong>quantitative easing</strong> (QE). Letting those bonds run off, which does the reverse, is called quantitative tightening.</p>

<h2>How rate changes reach the economy</h2>
<p>When the central bank lowers rates:</p>
<ol>
  <li>Borrowing becomes cheaper, so firms invest more and households buy more homes, cars and appliances.</li>
  <li>Stock and house prices tend to rise, making households feel wealthier.</li>
  <li>The currency tends to weaken, making exports cheaper for foreigners.</li>
  <li>All of this raises spending, so aggregate demand shifts right.</li>
</ol>
<p>Raising rates works the other way and cools inflation. The effects take time, often a year or more, and the delay is hard to predict. Milton Friedman described the lags as “long and variable”.</p>

<h2>Expansionary and contractionary policy</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Problem</th><th>Policy</th><th>Actions</th><th>Effect on AD</th></tr></thead>
  <tbody>
    <tr><td>Recession, high unemployment</td><td>Expansionary (“easy”)</td><td>Cut rates; buy bonds (QE)</td><td>Shifts right</td></tr>
    <tr><td>High inflation</td><td>Contractionary (“tight”)</td><td>Raise rates; shrink bond holdings</td><td>Shifts left</td></tr>
  </tbody>
</table></div>
<div data-widget="adas" data-preset="monetary"></div>
<div class="note example">
  <p class="note-label">A recent example</p>
  <p>After inflation surged in 2021 and 2022, the Fed raised its target range from near zero in early 2022 to 5.25–5.50% by July 2023, one of its fastest tightening cycles in decades. Inflation fell substantially over the following two years.</p>
</div>

<h2>The limits of monetary policy</h2>
<ul>
  <li><strong>The zero lower bound.</strong> Interest rates can’t go far below zero, so in a deep recession the main tool can run out.</li>
  <li><strong>Supply shocks.</strong> Monetary policy works through demand. Against stagflation, it can fight inflation or unemployment but not both at once.</li>
  <li><strong>Credibility.</strong> Much of the policy’s power comes from expectations. If people trust the central bank to keep inflation near 2%, they set wages and prices accordingly, and inflation is easier to control.</li>
</ul>
`,
    terms: [
      ['Central bank', 'The institution that oversees the banking system and controls monetary policy, such as the Federal Reserve.'],
      ['Dual mandate', 'The Federal Reserve’s goals of maximum employment and stable prices.'],
      ['Federal funds rate', 'The interest rate at which US banks lend reserves to each other overnight; the Fed’s main policy target.'],
      ['Open market operations', 'The central bank’s purchases and sales of government bonds to change reserves and interest rates.'],
      ['Quantitative easing', 'Large-scale purchases of longer-term bonds by a central bank to lower long-term interest rates when short-term rates are near zero.'],
      ['Expansionary monetary policy', 'Lowering interest rates or buying bonds to increase aggregate demand.'],
      ['Contractionary monetary policy', 'Raising interest rates or reducing bond holdings to decrease aggregate demand and reduce inflation.']
    ],
    quiz: [
      {
        q: 'To fight high inflation, a central bank would most likely:',
        options: [
          'Lower its policy interest rate',
          'Raise its policy interest rate',
          'Buy large amounts of government bonds',
          'Cut taxes'
        ],
        answer: 1,
        why: 'Higher rates discourage borrowing and spending, shifting AD left and easing pressure on prices. Cutting taxes is fiscal policy, set by the government.'
      },
      {
        q: 'When the central bank buys government bonds from banks:',
        options: [
          'Bank reserves fall and interest rates rise',
          'Bank reserves rise and interest rates tend to fall',
          'The government’s budget deficit shrinks',
          'Nothing changes in the banking system'
        ],
        answer: 1,
        why: 'The central bank pays for the bonds by crediting banks’ reserve accounts. More reserves, and more demand for bonds, push interest rates down.'
      },
      {
        q: 'The Federal Reserve’s dual mandate is:',
        options: [
          'Low taxes and balanced budgets',
          'Maximum employment and stable prices',
          'A strong dollar and high exports',
          'High stock prices and low interest rates'
        ],
        answer: 1,
        why: 'Congress directs the Fed to pursue maximum employment and stable prices.'
      },
      {
        q: 'Why can monetary policy struggle in a very deep recession?',
        options: [
          'Interest rates may already be near zero',
          'Central banks can’t buy bonds',
          'Inflation is always too high in recessions',
          'Banks are required to hold 100% reserves'
        ],
        answer: 0,
        why: 'Once rates are near zero, the central bank can’t cut much further. That’s when tools like quantitative easing, or fiscal policy, come in.'
      }
    ]
  },

  {
    id: 'fiscal-policy',
    unit: 'u5',
    title: 'Fiscal Policy',
    summary: 'Government spending and taxes as tools, the multiplier, and the debate over deficits and debt.',
    minutes: 14,
    body: `
<h2>The government budget as a policy tool</h2>
<p><strong>Fiscal policy</strong> is the use of government spending and taxes to influence the economy. It is decided by elected officials; in the US, that means Congress and the President. Monetary policy is run by the central bank.</p>
<ul>
  <li><strong>Expansionary fiscal policy</strong> increases government spending, cuts taxes or raises transfers. It shifts AD right and is used to fight recessions.</li>
  <li><strong>Contractionary fiscal policy</strong> cuts spending or raises taxes. It shifts AD left and is used to cool an overheating economy or reduce a deficit.</li>
</ul>
<div data-widget="adas" data-preset="fiscal"></div>

<h2>The multiplier</h2>
<p>A dollar of government spending becomes someone’s income. They spend part of it, which becomes someone else’s income, and so on. How much people spend out of each extra dollar is the <strong>marginal propensity to consume</strong> (MPC).</p>
<div class="formula">Spending multiplier = <strong>1 ÷ (1 − MPC)</strong></div>
<div class="note example">
  <p class="note-label">Worked example</p>
  <p>The government spends $20 billion on roads and the MPC is 0.75. The multiplier is 1 ÷ 0.25 = 4, so total spending could rise by up to $20 billion × 4 = <strong>$80 billion</strong>.</p>
</div>
<p>A tax cut has a smaller effect than the same amount of spending, because people save part of it before spending anything. The simple <em>tax multiplier</em> is −MPC ÷ (1 − MPC), which is −3 in this example.</p>
<p>Real-world multipliers are much smaller than the simple formula suggests. Some spending goes on imports, taxes take a cut of each round, and interest rates may rise. Estimates vary widely, often between about 0.5 and 2, and multipliers tend to be larger in deep recessions when interest rates are near zero.</p>

<h2>Automatic stabilizers</h2>
<p>Some fiscal policy happens without any new law. In a recession, incomes fall, so income tax revenue falls. More people qualify for unemployment benefits and other support, so transfers rise. Both cushion the drop in spending. In a boom, the reverse happens. These <strong>automatic stabilizers</strong> act immediately, avoiding the delays of passing new laws.</p>

<h2>Deficits and debt</h2>
<p>A <strong>budget deficit</strong> is the amount by which government spending exceeds revenue in a year. The <strong>national debt</strong> is the total of all past deficits minus surpluses. The deficit is a flow; the debt is a stock, like water running into a bathtub.</p>
<p>Governments finance deficits by borrowing. That can push up interest rates and reduce private investment, an effect called <strong>crowding out</strong>. Whether a debt is sustainable depends mostly on how fast it grows compared with the economy. If the interest rate on the debt is below the economy’s growth rate, the debt-to-GDP ratio can be stable even with modest deficits; if it is above, debt becomes harder to manage.</p>

<h2>Why fiscal policy is hard</h2>
<ul>
  <li><strong>Lags.</strong> It takes time to recognize a recession, pass a law, and actually spend the money. By then the economy may have recovered.</li>
  <li><strong>Politics.</strong> Tax cuts and new spending are popular; spending cuts and tax rises aren’t. That makes it easier to run deficits in bad times than surpluses in good times.</li>
  <li><strong>Crowding out</strong>, as above.</li>
</ul>
<div class="table-wrap"><table>
  <thead><tr><th></th><th>Monetary policy</th><th>Fiscal policy</th></tr></thead>
  <tbody>
    <tr><td>Who decides</td><td>Central bank</td><td>Legislature and government</td></tr>
    <tr><td>Main tools</td><td>Interest rates, bond purchases</td><td>Government spending, taxes, transfers</td></tr>
    <tr><td>Speed of decision</td><td>Fast: committees meet regularly</td><td>Slow: requires new laws</td></tr>
    <tr><td>Can target specific groups?</td><td>Not really</td><td>Yes, such as the unemployed or particular regions</td></tr>
  </tbody>
</table></div>
`,
    terms: [
      ['Fiscal policy', 'The use of government spending and taxation to influence the economy.'],
      ['Marginal propensity to consume', 'The fraction of each additional dollar of income that households spend rather than save.'],
      ['Spending multiplier', 'The ratio of the total change in spending to the initial change in government spending; in the simple model, 1 ÷ (1 − MPC).'],
      ['Automatic stabilizers', 'Taxes and transfers that automatically rise or fall with the business cycle, cushioning it without new legislation.'],
      ['Budget deficit', 'The amount by which government spending exceeds tax revenue in a given year.'],
      ['National debt', 'The total amount the government owes; the accumulation of past deficits minus surpluses.'],
      ['Crowding out', 'The reduction in private investment that occurs when government borrowing drives up interest rates.']
    ],
    quiz: [
      {
        q: 'If the marginal propensity to consume is 0.9, the simple spending multiplier is:',
        options: ['0.9', '1.9', '9', '10'],
        answer: 3,
        why: '1 ÷ (1 − 0.9) = 1 ÷ 0.1 = 10.'
      },
      {
        q: 'Which of these is an automatic stabilizer?',
        options: [
          'A new highway bill passed by Congress',
          'Unemployment insurance',
          'A central bank rate cut',
          'A one-time stimulus check'
        ],
        answer: 1,
        why: 'Unemployment payments rise automatically when people lose their jobs, with no new law needed. The highway bill and stimulus checks require new legislation, and a rate cut is monetary policy.'
      },
      {
        q: 'Crowding out happens when:',
        options: [
          'Government borrowing raises interest rates and reduces private investment',
          'Imports replace domestic goods',
          'Too many firms enter a market',
          'The central bank buys government bonds'
        ],
        answer: 0,
        why: 'Government borrowing competes with firms for savings, which pushes interest rates up and makes private investment more expensive.'
      },
      {
        q: 'Which statement about deficits and debt is correct?',
        options: [
          'They are two names for the same thing',
          'The deficit is the yearly shortfall; the debt is the accumulated total',
          'The debt is the yearly shortfall; the deficit is the accumulated total',
          'A deficit always reduces the debt'
        ],
        answer: 1,
        why: 'Each year’s deficit adds to the debt, just as water flowing into a tub raises the water level.'
      }
    ]
  },

  {
    id: 'international',
    unit: 'u5',
    title: 'Trade Policy & Exchange Rates',
    summary: 'Tariffs, quotas, exchange rates and the balance of payments.',
    minutes: 14,
    body: `
<h2>Trade policy</h2>
<p>Lesson 3 showed why trade creates overall gains. Governments still restrict it, mainly through two tools:</p>
<ul>
  <li>A <strong>tariff</strong> is a tax on imports.</li>
  <li>An <strong>import quota</strong> is a limit on the quantity that can be imported.</li>
</ul>
<p>Either one raises the domestic price of the good. Domestic producers gain, since they sell more at a higher price. Domestic consumers lose, since they pay more and buy less. A tariff also raises government revenue. Consumers lose more than producers and the government gain, so the country as a whole bears a deadweight loss. Tariffs also raise costs for businesses that use the imported goods; a steel tariff hurts carmakers, for example.</p>
<div class="note example">
  <p class="note-label">A real case</p>
  <p>When the US put tariffs on imported washing machines in 2018, studies found that washer prices rose substantially. So did the price of dryers, which weren’t tariffed, because they are usually bought together with washers. The cost to consumers for each factory job created was very high.</p>
</div>
<p>Common arguments for protection include shielding <em>infant industries</em> until they can compete, national security, and responding to unfair trade practices. Most economists accept that these can apply in specific cases. They are much more skeptical that tariffs increase total employment.</p>

<h2>Exchange rates</h2>
<p>An <strong>exchange rate</strong> is the price of one currency in terms of another. When a currency buys more foreign currency than before, it has <strong>appreciated</strong>. When it buys less, it has <strong>depreciated</strong>.</p>
<div class="note example">
  <p class="note-label">Worked example</p>
  <p>The exchange rate moves from €1 = $1.10 to €1 = $1.20. The euro has appreciated against the dollar, and the dollar has depreciated against the euro.</p>
  <p>A €50 sweater used to cost an American $55. It now costs $60. Meanwhile, American goods have become cheaper for Europeans.</p>
</div>
<div class="table-wrap"><table>
  <thead><tr><th>When a country’s currency…</th><th>Its exports become…</th><th>Its imports become…</th></tr></thead>
  <tbody>
    <tr><td>Appreciates</td><td>More expensive for foreigners</td><td>Cheaper at home</td></tr>
    <tr><td>Depreciates</td><td>Cheaper for foreigners</td><td>More expensive at home</td></tr>
  </tbody>
</table></div>
<p>With a <em>floating</em> exchange rate, supply and demand in currency markets set the price. Things that make a currency appreciate include:</p>
<ul>
  <li>Higher interest rates, which attract foreign savers.</li>
  <li>Lower inflation than trading partners.</li>
  <li>Strong demand for the country’s exports.</li>
  <li>Investors’ expectations about the future.</li>
</ul>
<p>Some countries instead <em>fix</em> or peg their currency to another, and their central bank buys and sells currency to hold the rate.</p>

<h2>The balance of payments</h2>
<p>The <strong>balance of payments</strong> records all transactions between a country and the rest of the world. It has two main parts:</p>
<ul>
  <li>The <strong>current account</strong>: trade in goods and services, plus income and transfers from abroad.</li>
  <li>The <strong>financial account</strong>: purchases and sales of assets such as stocks, bonds, property and businesses.</li>
</ul>
<p>The two must balance. A country with a current account deficit, buying more from abroad than it sells, pays for it by selling assets to foreigners or borrowing from them, which is a financial account surplus. The US has run current account deficits for decades, matched by foreign purchases of US assets.</p>

<h2>Purchasing power parity</h2>
<p>The theory of <strong>purchasing power parity</strong> says that in the long run, exchange rates should move so that the same basket of goods costs the same in every country. It holds loosely over long periods but often fails in the short run. The Economist’s <em>Big Mac Index</em> compares burger prices across countries as a lighthearted test of it.</p>
`,
    terms: [
      ['Tariff', 'A tax on imported goods.'],
      ['Import quota', 'A legal limit on the quantity of a good that can be imported.'],
      ['Exchange rate', 'The price of one currency in terms of another.'],
      ['Appreciation', 'An increase in the value of a currency relative to another currency.'],
      ['Depreciation', 'A decrease in the value of a currency relative to another currency.'],
      ['Balance of payments', 'A record of all economic transactions between a country and the rest of the world.'],
      ['Current account', 'The part of the balance of payments that records trade in goods and services, income from abroad and transfers.'],
      ['Purchasing power parity', 'The theory that exchange rates adjust in the long run so that identical goods cost the same in different countries.']
    ],
    quiz: [
      {
        q: 'A country puts a tariff on imported steel. Which result is most likely?',
        options: [
          'Lower domestic steel prices',
          'Higher steel prices, which help domestic steelmakers and hurt steel-using industries',
          'More steel imports',
          'No change in steel prices'
        ],
        answer: 1,
        why: 'The tariff raises the price of imported steel, letting domestic producers charge more. Industries that buy steel, like carmakers, face higher costs.'
      },
      {
        q: 'The US dollar appreciates against the Japanese yen. What happens to US exports to Japan?',
        options: [
          'They become cheaper for Japanese buyers',
          'They become more expensive for Japanese buyers',
          'They are unaffected',
          'They are banned'
        ],
        answer: 1,
        why: 'Each dollar now costs more yen, so American goods cost more for Japanese buyers.'
      },
      {
        q: 'The euro moves from $1.10 to $1.25. The dollar has:',
        options: [
          'Appreciated against the euro',
          'Depreciated against the euro',
          'Stayed the same',
          'Become fixed to the euro'
        ],
        answer: 1,
        why: 'It now takes more dollars to buy one euro, so each dollar is worth less in euros.'
      },
      {
        q: 'A country runs a current account deficit. It must also have:',
        options: [
          'A budget surplus',
          'A financial account surplus: net sales of assets to foreigners',
          'A trade surplus',
          'Deflation'
        ],
        answer: 1,
        why: 'The balance of payments balances. Buying more goods and services than you sell must be paid for by selling assets or borrowing from abroad.'
      }
    ]
  }
);
