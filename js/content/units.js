/* Course structure. The module unit ('m') follows the course notes (module-a.js, module-b.js);
   the other units are the wider course (u1.js … u5.js). */
window.ECON = window.ECON || {};

ECON.units = [
  {
    id: 'm',
    module: true,
    title: 'Microeconomics',
    blurb: 'Basic concepts, demand, supply, market equilibrium, elasticity, production and costs, and market structure.'
  },
  {
    id: 'u1',
    title: 'Thinking Like an Economist',
    blurb: 'Scarcity, trade-offs and the logic behind every choice people make.'
  },
  {
    id: 'u2',
    title: 'Supply & Demand',
    blurb: 'How markets set prices, and what happens when something changes.'
  },
  {
    id: 'u3',
    title: 'Firms & Market Outcomes',
    blurb: 'Costs, competition, and the cases where markets get it wrong.'
  },
  {
    id: 'u4',
    title: 'The Macroeconomy',
    blurb: 'GDP, inflation, unemployment, growth, and the model that ties them together.'
  },
  {
    id: 'u5',
    title: 'Policy & the Global Economy',
    blurb: 'Money, central banks, government budgets, trade and exchange rates.'
  }
];

ECON.lessons = [];
