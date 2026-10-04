# Ethan Economics

A self-paced economics course that runs in the browser. It has two tracks:

- **Your module:** 13 topics that follow the course notes section by section: microeconomics (Topics 1–8) and macroeconomics (Topics 9–13).
- **Go further:** a wider 22-lesson introductory course covering micro and macro.

## Your module (Topics 1–13)

| Topic | Covers |
|---|---|
| 1. Basic Concepts | Micro vs macro, scarcity, the three economic questions, factors of production, opportunity cost, the PPC, economic systems |
| 2. Demand | Law of demand, substitution and income effects, movement along vs shift, the five non-price determinants |
| 3. Supply | Law of supply, why supply slopes up, the six non-price determinants, substitutes and complements in production |
| 4. Market Equilibrium | Surplus and shortage, the chocolate bar market, price ceilings and floors, single and double shifts (ΔD vs ΔS) |
| 5. Elasticity | Price elasticity (midpoint formula), total revenue, determinants, income and cross price elasticity (simple formula) |
| 6. Production and Its Costs | TP, MP, AP and diminishing returns, TFC/TVC/TC, AFC/AVC/ATC/MC, economies and diseconomies of scale |
| 7. Market Structure | Firm vs industry, barriers to entry, the three kinds of profit, the four structures and each firm's demand curve (including the kinked demand curve) |
| 8. Profit Maximisation and Shutdown | TR, AR and MR, the MR = MC rule, profit and loss, the breakeven and shutdown points, the drinks stall example |
| 9. Unemployment and Inflation | Measuring unemployment, the participation rate, types of unemployment, CPI, inflation and its causes and costs, real income |
| 10. GDP and Business Cycles | The three approaches to GDP, money vs real GDP, the GDP deflator, growth, per capita GDP, GNP, the limits of GDP, the business cycle |
| 11. Aggregate Demand and Supply | Consumption, saving, MPC and MPS, investment, AD and AS, equilibrium, recessionary and inflationary situations, the multiplier |
| 12. Fiscal Policy | Taxes and government spending, the budget, the spending and tax multipliers, discretionary policy and automatic stabilisers |
| 13. Monetary Policy | Money and its functions, credit creation and the money multiplier, the MAS, monetary tools, the money market and the exchange rate policy |

Each topic keeps the notes' section numbers and examples, and adds:

- an interactive graph or calculator for the topic
- **Fill in your notes:** model answers for every blank (*) in the student notes, with an option to hide them and test yourself
- **Do you know?:** the notes' revision questions, with answers you can reveal one at a time
- **pictures that explain the ideas:** flow charts (e.g. money supply ↑ → interest rate ↓ → AD ↑ → output ↑), side-by-side comparisons, scales (what a PED number means), labelled formulas, decision ladders (the shutdown rule) and breakdowns (who counts as unemployed): 57 diagrams across the 13 topics
- a **roadmap** at the top showing every section, the key terms, the blanks, the revision questions and the pop quiz, with the section you're reading highlighted
- a key-terms list
- a **pop quiz** at the end: 10 questions one at a time (the topic's 8 quiz questions plus 2 made from the notes' blanks), with a progress bar and a score at the end. Get 8 right to complete the topic.
- **wrong answers point to the notes:** a wrong answer shows exactly which section of the notes the answer comes from, with a *Show me* button that jumps there and highlights it, and a *Back to the pop quiz* button to return. The score screen lists every missed question with a link to its section, and the practice exam does the same.

## Study helper

An **Ask about your notes** button sits in the corner of every page. It opens a side panel where you can ask questions about Topics 1–13. Each answer gives:

- the direct answer
- **What it means:** the idea in plain words, with an example (and the working, for calculations)
- **Where this is in your notes:** numbered links to the sections, key terms, blanks or revision questions the answer came from. Click one to jump to that part of the lesson; it's highlighted when you get there.

The helper first searches the notes for the sections that best match the question (a keyword search that runs in the browser), then sends those sections and the question to Claude. It works in one of three ways:

1. **Inside claude.ai** (when the site is published as an artifact): it uses your own Claude account. Claude asks for permission the first time, and questions count toward your Claude usage.
2. **Anywhere else** (on your computer or GitHub Pages): paste a Claude API key into the helper's settings. The key is saved only in your browser and sent only to Anthropic, and questions are billed to your Anthropic account. It uses Claude Opus 5.5 with server-side refusal fallback turned on: if Opus declines a question, the API automatically retries it on a fallback model.
3. **With neither:** it still searches your notes and shows the passages that match best, with links.

Answers are written by AI, so check anything important against your notes and lecturer.

## Go further (the wider course)

- **22 lessons in 5 units**
  1. Thinking Like an Economist: scarcity, opportunity cost, the PPF, comparative advantage, marginal thinking
  2. Supply & Demand: demand, supply, equilibrium, elasticity, price controls and taxes
  3. Firms & Market Outcomes: surplus, costs of production, market structures and game theory, externalities and public goods
  4. The Macroeconomy: GDP, inflation, unemployment, long-run growth, AD-AS
  5. Policy & the Global Economy: money and banking, monetary policy, fiscal policy, trade and exchange rates
- **Interactive labs** built into the lessons:
  - a supply and demand simulator with events, price ceilings and floors, taxes and pollution
  - a production possibilities frontier you can click to test points
  - an AD-AS model with shocks and policy responses
  - comparative advantage, elasticity and inflation (CPI) calculators
- **A quiz at the end of every lesson** (90 questions), with an explanation for each answer. Pass the quiz to complete the lesson.
- **Flashcards** for all 158 key terms, using spaced repetition: cards you miss come back sooner.
- **A searchable glossary** and a **practice exam** that draws a random mix of questions from the course.
- **Progress tracking**, saved in your browser's local storage. There's no account and no server.

## Using it

There's no build step and nothing to install.

- **On your computer:** open `index.html` in a browser.
- **Online with GitHub Pages:** in the repository, go to *Settings → Pages*, set the source to *Deploy from a branch*, choose `main` and `/ (root)`, and save. The site will appear at `https://<your-username>.github.io/study-website/`.

Fonts load from Google Fonts. Offline, the site falls back to system fonts and still works.

## Project layout

```
index.html              page shell: header, footer, script tags
css/styles.css          all styles (light and dark themes)
js/content/units.js     the list of units ('m' and 'm2' are the module)
js/content/module-a.js  module Topics 1–4
js/content/module-b.js  module Topics 5–7
js/content/module-c.js  module Topics 8–10
js/content/module-d.js  module Topics 11–13
js/content/visuals.js   the diagrams for each topic (which heading each goes after)
js/content/u1.js …      wider-course lessons, one file per unit
js/widgets.js           the interactive graphs and calculators
js/visuals.js           draws the diagrams (flow, cards, compare, scale, equation, decide, tree)
js/app.js               routing, quizzes, flashcards, glossary, exam, progress
js/helper.js            the study helper panel (notes search, Claude, citations)
```

### Adding or editing a lesson

Each lesson is a plain object in one of the `js/content/` files (`module-a.js` to `module-d.js` for the module, `u*.js` for the wider course):

```js
{
  id: 'demand',                 // used in the URL: #lesson-demand
  unit: 'u2',
  title: 'Demand',
  summary: 'One-sentence description shown on the course page.',
  minutes: 12,
  body: `<h2>…</h2><p>…</p>`,    // lesson HTML
  terms: [['Term', 'Definition'], …],   // feeds the glossary and flashcards
  quiz: [{ q: 'Question?', options: ['…', '…', '…', '…'], answer: 1, why: 'Explanation.' }],
  // module topics only (unit: 'm' or 'm2'):
  review: [['Revision question?', '<p>Model answer.</p>'], …],   // "Do you know?"
  blanks: [['4.1', 'Prompt from the notes', 'Model answer'], …]   // "Fill in your notes"
}
```

To embed a lab inside a lesson, add a placeholder to the body, for example `<div data-widget="market" data-preset="equilibrium"></div>`. The available widgets are:

- `market` (presets `equilibrium`, `surplus`, `controls`, `controls-basic`, `shifts`, `externality`, `full`)
- `ppf` (presets `robots`, `laptops`)
- `shifter` (presets `demand`, `supply`), `schedule` (the chocolate bar market)
- `elasticity` (preset `module` adds income and cross price elasticity)
- `production`, `costs`, `lrac`, `structures`
- `profitmax`, `stall` (Topic 8)
- `labour`, `inflation` (preset `basket` is the notes' CPI basket), `gdp`, `cycle` (Topics 9–10)
- `multiplier`, `fiscal`, `credit`, `moneymarket` (Topics 11–13)
- `advantage`, and `adas` (presets `adas`, `monetary`, `fiscal`, and `m-inflation`, `m-cycle`, `m-adas`, `m-fiscal` for the module)

Answer options are shuffled each time a quiz is shown (lists made up only of numbers stay in order), so `answer` always refers to the option's position in the file.
