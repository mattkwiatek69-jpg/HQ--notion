# HQ--notion: working rules

## Primal Health Hub (`health-hub/`)

### Rule: every piece of information is marked with where it came from

Before adding any new information to the hub, **ask the owner whose it is**: their own, or someone else's (and whose). Do not guess from the file name. Then mark it so the on-page key stays true.

Each block of information sits in a **source panel**: a plain card that ends with a quiet text label saying where it came from. In lists, where a label per row would be noise, a small shape beside the row says the same thing. Source marking never uses colour: colour belongs to the action accent and to the kinds of routine.

| Source | `src` value | Shape in lists | Label |
|---|---|---|---|
| OP docs (OP 1, OP 2) | `"op"` (default when unmarked) | filled circle | OP docs |
| The owner's own notes (Approved Foods - MK, Max doc) | `"me"` (products also accept `"max"`) | diamond | My notes |
| In both | `"both"` | half-filled circle | OP docs + mine |
| Someone else, added inside the hub | `"x"` plus `who` (their name) | ring | their name |
| A suggestion where the OP docs are silent (written by Claude, never the owner's) | `"ai"` | square outline | Suggested |

- A new outside source gets its own `src` value, its own entry in `SRCN` and `sb()`, its own `.src.<value>` shape in `health-hub/index.html`, and a line in the key (rail footer and the More panel). Give it a shape that differs from the four above.
- Set `src` on the item or group in `health-hub/data/*.js`. Wrap each block in a panel with `class="... ${sb(src)}"` (add `slim` for list rows). Lists of the owner's notes render gold diamond bullets with `ul(items, "me")`.
- Keep the Source labels switch working: under `html.plain` the labels and shapes are hidden.
- Four main sections: **Week** (the planner, which is the main page, and Day), **Routines** (Routines, Exercise library), **Library** (Nutrition plus every topic, grouped), **Products**. Saved, My edits, backup and the source key live in the utility area (rail footer on desktop, More on phones). New information goes into an existing template, never into the main menu. Old links (`#today`, `#week`, `#routines`, `#nutrition`, `#systems`, `#extras`, and `#progress`, which now lands on the week) must keep working.
- The hub plans; it does not track. There are no ticks, streaks, skips or progress pages, and none should be added unless the owner asks. The saved fields from the tracking era (`days`, `weeks`, `months`, `core`, `sessions`) stay in storage and in backups untouched.
- A new Library topic needs `grp` (`move`, `sleep`, `energy`, `env`, `ref`; set in `health-hub/data/meta.js`). Routines related to a topic go in `P.related` there.
- Look: Apple-level restraint in the primal palette. Ivory page `#F6F3EA`, near-white cards `#FFFEFA` with a hairline edge and soft shadow, ink `#1D231C`, an olive rail `#2C3F2D` with a sage pill for the current item, and one action colour, olive `#3F5A38` (tinted `#E2E9D9` for secondary buttons and selection). Clay is for deleting and for things that do not fit; gold is for key points and personal notes. The only other colour is one hue per kind of routine (`[data-kind]`, set in the stylesheet), used as a dot and a light tint in the planner. Large Cormorant Garamond page titles with no label above them, Manrope for everything else, sentence case throughout. `health-hub/design-system/tokens.json` is generated from the stylesheet.
- Do not draw or generate artwork. Use what is in `health-hub/assets/` and list anything missing in `health-hub/assets/ASSET-REQUESTS.md` with a prompt the owner can paste into an image tool.
- Saved browser data uses the key `phh:v1`. Only add fields; never rename or remove existing ones.

### Rule: the week timetable has to fit

- The timetable lives in `health-hub/data/schedule.js` (`P.plan`): wake 06:30, bed 22:30, gym Mon / Wed / Fri / Sun, sprints Tue / Sat. A slot is a list of `[routine id, minutes]`. It is marked `"both"`: OP routines, the owner's times.
- After changing it, run `node health-hub/tests/schedule.test.js`. It fails if any block runs into the next one, or if the weekly balance drifts (full body release 2x, lymph drainage 3x, breathwork and fascia work every day).
- The week planner is the main page (`#week`); `#today` shows one day of it. Edits are direct and saved at once: a day that runs over is allowed and flagged, never blocked.
- Routines and gym are kept apart everywhere by one rule, `isGym()`: the gym kind, or a routine whose equipment matches `GYMRX`. One switch (`S.ui.lens`: everything, routines or gym) filters Week, Day and Compare together; it is also the legend. Gym sessions show a steel-blue tint and a dumbbell; routines keep their kind dot. Each day header carries a bar of routine minutes (green `--rt`) then gym minutes (blue `--gym`), scaled to the busiest day; both colours passed the dataviz palette validator in light and dark. The Routines section has separate Routines and Gym tabs.
- Compare (`#compare`, the third tab of Week) lists routines and gym as two groups, each row with its week as seven day letters and each group ending in a minutes-per-day row, and a By exercise view that counts each exercise across the placed routines. All three edit the same `S.plan` through `editDay()`; a day letter adds to the routine's usual slot (`usualSlot()`).
- The Guide (`#guide`, fourth tab of Week) and `health-hub/data/guide.js` (`P.guide`) say when (`t`), how often (`f`) and in what order (`r`) each routine fits. Each entry carries a source for its timing (`ts`) and its frequency (`fs`): `"op"` only when the OP docs say it, and then `why` must start with "Docs:" and quote them; otherwise `"ai"`, shown as Suggested. `tests/schedule.test.js` enforces this. Never present a suggestion as the docs, and never make a health claim beyond general training practice.
- `P.sched.review()` compares the week with the guide: order within a part of the day, time of day, frequency (with the minutes it would cost) and the gym rules (release before lifting, at most 4 weight and 4 sprint sessions, long release after lifting). Routines covered by a daily habit (`h`) count as daily; fixes for a specific problem (`c`) are only judged once placed. Nothing moves until the owner chooses Apply, and each Apply is one undo step.
- `P.sched.checks()` reports what the week contains: parts of a day that do not fit, strength or sprints on back-to-back days, one day much heavier than the rest, and routines off their weekly aim (`P.aims`, overridden by the owner in `S.freq`). The checks describe the plan; they are not advice.

### Rule: edits made inside the hub

- Saved additively under `phh:v1`: `plan` (edited weekdays, same shape as `P.plan.week`), `adds` (foods, products, notes, routines, daily habits, topics; each has `src` and, for `"x"`, `who`; a routine copied from a supplied one carries `base`), `hide` (refs the owner deleted, plus `i:<habit id>`) and `freq` (weekly aim per routine id).
- Undo and redo are global: `save()` snapshots the editable fields (`EDITK`) whenever they change. Add any new editable field to `EDITK`. Deleting supplied content only ever sets `hide`; the supplied lists are kept in `BASE` and rebuilt by `applyAdds()`.
- Personal layer over supplied records (never rewrite the supplied data for a personal change). A ref is `<kind>:<stable id>`: `r:` routine id, `t:` topic id, `p:` product name, `f:` food text. Saved fields: `ov` (overrides: `n` title and `intro` summary for routines / topics, `note` for all four, `t` = the real edit time), `tags`, `links` (`add` / `del` against the suggested `P.related`), `cols` (named collections of refs) and `fav` (routine ids as before, plus refs). `applyOv()` is the only place an override becomes the effective record; `ORIG` keeps the supplied text for View original / Restore original.
- An edit date is the owner's edit date. Never show it, or anything else, as a clinical or source review date.
- Links in `P.related` are name-matched suggestions and must stay labelled as unconfirmed. Equipment only links to a product through an explicit entry in `P.equipProd` (`health-hub/data/meta.js`); leave ambiguous equipment as plain text.
- Backups carry `schema` (now 3: 2 added `ov`, `tags`, `links`, `cols`; 3 adds `hide`, `freq`; a backup without it is schema 1). Bump `SCHEMA` only when the saved shape changes, give every new field an explicit default in `cleanState`, and add it to the round-trip test. Imports with a higher schema are refused.
- Import is two-step (summary, then apply) and always stores a recovery copy under `phh:v1:backup` first. A full backup is rebuilt through `cleanState`; add any new saved field there or it will be dropped on restore.
- The add form always asks whose the information is. Imported data goes through `cleanAdds` / `cleanPlan`; links must start with `http`.
- When the owner sends an export to be made permanent, move each entry into the matching `health-hub/data/*.js` file with the same `src`, then tell them to delete the in-hub copy.
- Artwork: functional symbols are inline SVG in the nav icon family (`G` in `index.html`; `icon: "g:<name>"` on a topic uses one). Do not use a food picture for a hormone or body-system topic. Painted art is listed in `health-hub/assets/manifest.json`; what is still missing, with ready prompts, is in `health-hub/assets/ASSET-REQUESTS.md`.
- Approved foods render as picture tiles. A food gets its picture from the `FOOD_IC` keyword list in `health-hub/index.html`; foods with no match show the bowl symbol. New food pictures go in `health-hub/assets/icons/` (128px transparent webp) plus one line in `FOOD_IC` and `FOODIC`. Product pictures come from the `P.prodPic` map in `health-hub/data/meta.js` first, then the `PROD_IC` keyword list; a name containing `/` (such as `illus/equipment-kettlebell`) is read from `assets/` directly. Line icons from the pack are in `assets/line/primal-icons.js` (`li("name")`). Pictures for product groups (`PGART`), parts of the day (`BLOCKART`), planner slots (`SLOTIC`) and empty states also come from the owner's packs in `assets/illus/`; reuse those before asking for new art.

### Checks to run after any change

- `node health-hub/tests/schedule.test.js` (timetable fits), `node health-hub/tests/contrast.js` (every colour pair in light and dark; no line may say LOW).
- `sh health-hub/tests/serve.sh` in one shell, then `node health-hub/tests/browser.test.js` (Playwright, isolated storage; needs the `playwright` package).
