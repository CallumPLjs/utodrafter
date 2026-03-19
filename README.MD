# Utodrafter

A browser-based planning and simulation tool for [Project Utopia](https://www.projectutopia.com/), built to solve two of the most parameter-heavy decisions in the game: post-war military recovery and long-term science optimisation.

Live: [utodrafter.w3spaces.com](https://utodrafter.w3spaces.com/drafter/)

---

## What it does

Project Utopia requires players to manage provinces with interdependent variables — population, land, military, science output, and resource flows — across time-based ticks. Small differences in input parameters compound significantly over an age. Manual calculation is tedious and error-prone.

Utodrafter simulates outcomes tick by tick, presenting multiple scenarios side by side so you can compare the effect of different decisions before committing resources.

---

## Modules

### Drafter
Models post-war military recovery across a specified number of ticks.

**Inputs:** Land, current military, total population, peons, future homes percentage, draft science multiplier, population science multiplier, ritual strength (with per-tick decay), net guilds, ticks available, patriotism status, draft rate (restricted / normal / aggressive / emergency), honor rank.

**Simulation:** Runs tick by tick — each tick calculates soldiers drafted from the current peon pool, applies ritual strength decay, subtracts drafted soldiers and wizard production from peons, and accumulates totals. Results are written to a live table row by row.

**Outputs:** Per-tick breakdown of peons, people per acre, soldiers drafted, total military, draft percentage, military per acre. Summary result card showing final state.

The multi-scenario comparison is intentional — each form submission appends a new result card without clearing previous ones, so you can compare the outcome of different parameter combinations side by side.

---

### Science Simulator
Models book generation across a full age using an object-oriented scientist simulation.

**Inputs:** Universities percentage, age length (days), bonus books, Fountain of Knowledge, Revelation, other book bonuses (Sage etc.), estimated spell uptime.

**The Scientist class:** Each scientist is a stateful object tracking individual experience, rank, and book production rate. Scientists promote through ranks — recruit → novice → graduate → professor — as experience thresholds are reached, with production increasing at each rank (70 → 80 → 90 → 100 books per tick). Experience compounds with the book bonus multiplier each tick.

**Simulation:** Runs tick by tick across the full age. Science generation accumulates each tick; when it crosses 100, a new scientist spawns and joins the roster. Every existing scientist gains experience and produces books independently each tick. New scientists are added to the output table dynamically as they appear.

**University bonus formula:** Implements a quadratic curve — bonus peaks at 50% universities and falls off toward both extremes — matching the actual game mechanic rather than a linear approximation.

**Outputs:** Per-tick breakdown of total books and per-scientist experience. Summary result card showing total scientists, total ticks, and final book count. Expandable section for detailed science category planning.

---

### Food *(in development)*
Recipe planning module. Schema complete. Planned functionality: input available ingredients, receive matched recipes based on what you have.

---

## Design notes

**Tick-based simulation, not snapshot calculation.** Both modules simulate state evolving over time rather than applying a single formula. This captures compounding effects — ritual decay in the drafter, scientist experience and rank progression in the science module — that static calculations miss.

**Multi-scenario comparison.** Result cards accumulate rather than replace, allowing direct comparison of different parameter combinations in a single session. The goal is decision support, not just output.

**Stateful agent simulation.** The Scientist class is a proper OOP implementation — each scientist maintains independent state across hundreds of ticks. This architecture correctly models the emergent behaviour of a growing science team over an age.

---

## Technical

Built with vanilla JavaScript, HTML, and CSS. No frameworks or dependencies.

**Architecture:**
- `Scientist` class — stateful OOP agent with experience tracking, rank promotion, and production scaling
- Tick-based simulation loops with live DOM table generation
- Dynamic result card creation via JavaScript DOM manipulation
- AutoFill for rapid iteration with typical province values
- Input validation across multiple field types

---

## Status

Drafter and Science modules: functional and live.  
Food module: schema and data structure complete, front end in development.
