# HQ--notion

## Primal Health Hub

`health-hub/` is a single-page health dashboard compiled from the OP 1 and OP 2 docs, the Approved Foods list and the product list in the Max doc.

| Path | What it holds |
|---|---|
| `health-hub/index.html` | Layout, styles and app logic (tracker, follow-along player, breath pacer) |
| `health-hub/data/today.js` | The combined daily routine, weekly and monthly targets |
| `health-hub/data/routines-a.js`, `routines-b.js` | All routines and exercise how-tos, by group |
| `health-hub/data/systems.js` | Body-system do / don't lists and the bonus extras |
| `health-hub/data/nutrition.js` | Approved foods, avoid list, plates, targets, recipes, nutrient map |
| `health-hub/data/products.js` | Every product, with source, price and link |
| `health-hub/data/meta.js` | Equipment per routine, topic icons, metric portions, coverage-review additions |
| `health-hub/data/library.js` | 274 exercise illustrations: crop rectangles, picture type, source notes, and the map from routine steps to illustrations |
| `health-hub/assets/` | Icons, the 18 cleaned exercise-library sheets (`assets/library/`), the nutrition banner |

To add content, edit the matching file in `health-hub/data/`; each is a plain list. Ticks, streaks, favourites, wishlist and owned products are saved in the browser (`localStorage`) on the device you use.
