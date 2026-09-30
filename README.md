# Marginal Notes

A self-paced introductory economics course that runs in the browser. It covers the material of a typical first-year micro and macro course (or AP Economics) in 22 short lessons.

## What's inside

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
index.html            page shell: header, footer, script tags
css/styles.css        all styles (light and dark themes)
js/content/units.js   the list of units
js/content/u1.js …    lesson text, key terms and quiz questions, one file per unit
js/widgets.js         the interactive graphs and calculators
js/app.js             routing, quizzes, flashcards, glossary, exam, progress
```

### Adding or editing a lesson

Each lesson is a plain object in one of the `js/content/u*.js` files:

```js
{
  id: 'demand',                 // used in the URL: #lesson-demand
  unit: 'u2',
  title: 'Demand',
  summary: 'One-sentence description shown on the course page.',
  minutes: 12,
  body: `<h2>…</h2><p>…</p>`,    // lesson HTML
  terms: [['Term', 'Definition'], …],   // feeds the glossary and flashcards
  quiz: [{ q: 'Question?', options: ['…', '…', '…', '…'], answer: 1, why: 'Explanation.' }]
}
```

To embed a lab inside a lesson, add a placeholder to the body, for example `<div data-widget="market" data-preset="equilibrium"></div>`. The available widgets are `market` (presets `equilibrium`, `surplus`, `controls`, `externality`, `full`), `ppf`, `advantage`, `elasticity`, `inflation`, and `adas` (presets `adas`, `monetary`, `fiscal`).

Answer options are shuffled each time a quiz is shown (lists made up only of numbers stay in order), so `answer` always refers to the option's position in the file.
