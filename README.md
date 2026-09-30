# Marginal Notes

A self-paced economics course that runs in the browser. It has two tracks:

- **Your module:** seven topics that follow the Topics 1–7 microeconomics course notes section by section.
- **Go further:** a wider 22-lesson introductory course covering micro and macro.

## Your module (Topics 1–7)

| Topic | Covers |
|---|---|
| 1. Basic Concepts | Micro vs macro, scarcity, the three economic questions, factors of production, opportunity cost, the PPC, economic systems |
| 2. Demand | Law of demand, substitution and income effects, movement along vs shift, the five non-price determinants |
| 3. Supply | Law of supply, why supply slopes up, the six non-price determinants, substitutes and complements in production |
| 4. Market Equilibrium | Surplus and shortage, the chocolate bar market, price ceilings and floors, single and double shifts (ΔD vs ΔS) |
| 5. Elasticity | Price elasticity (midpoint formula), total revenue, determinants, income and cross price elasticity (simple formula) |
| 6. Production and Its Costs | TP, MP, AP and diminishing returns, TFC/TVC/TC, AFC/AVC/ATC/MC, economies and diseconomies of scale |
| 7. Market Structure | Firm vs industry, barriers to entry, the three kinds of profit, the four structures and each firm's demand curve (including the kinked demand curve) |

Each topic keeps the notes' section numbers and examples, and adds:

- an interactive graph or calculator for the topic
- **Fill in your notes:** model answers for every blank (*) in the student notes, with an option to hide them and test yourself
- **Do you know?:** the notes' revision questions, with answers you can reveal one at a time
- a key-terms list and an 8-question quiz (pass it to complete the topic)

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
js/content/units.js     the list of units ('m' is the module)
js/content/module-a.js  module Topics 1–4
js/content/module-b.js  module Topics 5–7
js/content/u1.js …      wider-course lessons, one file per unit
js/widgets.js           the interactive graphs and calculators
js/app.js               routing, quizzes, flashcards, glossary, exam, progress
```

### Adding or editing a lesson

Each lesson is a plain object in one of the `js/content/` files (`module-a.js`/`module-b.js` for the module, `u*.js` for the wider course):

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
  // module topics only (unit: 'm'):
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
- `advantage`, `inflation`, and `adas` (presets `adas`, `monetary`, `fiscal`)

Answer options are shuffled each time a quiz is shown (lists made up only of numbers stay in order), so `answer` always refers to the option's position in the file.
