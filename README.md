# HQ--notion

## Primal Health Hub

Four sections: Today (next action, session, progress), Plan (week timetable, routines, exercise library), Library (nutrition and every topic, grouped) and Products. Run the checks with `node health-hub/tests/schedule.test.js`.

`health-hub/` is a single-page health dashboard compiled from the OP 1 and OP 2 docs, the Approved Foods list and the product list in the Max doc.

| Path | What it holds |
|---|---|
| `health-hub/index.html` | Layout, styles and app logic (tracker, follow-along player, breath pacer) |
| `health-hub/data/today.js` | The combined daily routine, weekly and monthly targets |
| `health-hub/data/routines-a.js`, `routines-b.js` | All routines and exercise how-tos, by group |
| `health-hub/data/systems.js` | Body-system do / don't lists and the bonus extras |
| `health-hub/data/nutrition.js` | Approved foods, avoid list, plates, targets, recipes, nutrient map |
| `health-hub/data/products.js` | Every product, with source, price and link |
| `health-hub/data/schedule.js` | The week timetable: which routine runs on which day, at what time, for how long |
| `health-hub/tests/schedule.test.js` | Self-check that every day of the timetable fits (`node health-hub/tests/schedule.test.js`) |
| `health-hub/tests/browser.test.js`, `contrast.js`, `serve.sh` | Playwright regression suite, colour-contrast check, and the local server they use |
| `health-hub/assets/manifest.json`, `ASSET-REQUESTS.md` | Inventory of the artwork, and the pictures still to be made with ready prompts |
| `health-hub/data/meta.js` | Equipment per routine, topic icons, metric portions, coverage-review additions |
| `health-hub/data/library.js` | 274 exercise illustrations: crop rectangles, picture type, source notes, and the map from routine steps to illustrations |
| `health-hub/assets/` | Icons, the 18 cleaned exercise-library sheets (`assets/library/`), the nutrition banner |

To add content, use the Add buttons inside the hub (foods, products, notes, routines, daily habits) or Edit my day for the timetable; these are saved in the browser and can be exported from My edits. To make something permanent, edit the matching file in `health-hub/data/`; each is a plain list. Ticks, streaks, favourites, wishlist and owned products are saved in the browser (`localStorage`) on the device you use.

## Source key

Every block is marked with where it came from: a round olive dot for the OP docs, a gold diamond for the owner's own notes, a split dot for both. The rule for adding new information is in `CLAUDE.md`.
