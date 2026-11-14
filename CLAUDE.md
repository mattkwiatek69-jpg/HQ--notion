# HQ--notion: working rules

## Primal Health Hub (`health-hub/`)

### Rule: every piece of information is marked with where it came from

Before adding any new information to the hub, **ask the owner whose it is**: their own, or someone else's (and whose). Do not guess from the file name. Then mark it so the on-page key stays true.

Each block of information sits in a **source panel**: a neutral rounded frame with a dark name tab in the corner. The name tab carries the source and the border style repeats it (OP docs solid, my notes double, both solid top and bottom with double sides, someone else dashed). Source panels carry no colour of their own: colour belongs to the four sections. The soft faded gold highlight is reserved for the current action (the Next up row) and a topic's key points. The key swatches are miniature panels.

| Source | `src` value | Panel frame / tint tokens | Tab label |
|---|---|---|---|
| OP docs (OP 1, OP 2) | `"op"` (default when unmarked) | olive `--op-line` / `--op-tint` | OP docs |
| The owner's own notes (Approved Foods - MK, Max doc) | `"me"` (products also accept `"max"`) | gold `--me-line` / `--me-tint` | My notes |
| In both | `"both"` | split olive-to-gold frame | OP docs + mine |
| Someone else, added inside the hub | `"x"` plus `who` (their name) | dashed charcoal `--ink-2` / `--sunk` | their name |

- A new outside source gets its own `src` value, its own entry in `SRCN`, `sb()`, the `.sbox.s-<value>` panel CSS and the `.src` key swatch CSS in `health-hub/index.html`, and a line in the key (rail footer and phone top bar). Pick its colour from the Primal palette only (ivory, olive, sage, clay, gold, charcoal); pair the colour with a distinct shape so it never relies on colour alone. Clay and sage already mean don't / do, so avoid them for sources.
- Set `src` on the item or group in `health-hub/data/*.js`. Wrap each block in a panel with `class="... ${sb(src)}"` (add `slim` for list rows). Lists of the owner's notes render gold diamond bullets with `ul(items, "me")`.
- Keep the Source colours switch working: anything source-coloured must fall back to a neutral card under `html.plain`.
- Four main sections: **Today** (Today, Progress), **Plan** (Timetable, Routines, Exercise library), **Library** (Nutrition plus every topic, grouped), **Products**. Saved routines, My edits, backup and the source key live in the utility area (rail footer on desktop, More on phones). New information goes into an existing template, never into the main menu. Old links (`#routines`, `#nutrition`, `#systems`, `#extras`, `#week`, `#progress`) must keep working.
- A new Library topic needs `grp` (`move`, `sleep`, `energy`, `env`, `ref`; set in `health-hub/data/meta.js`). Routines related to a topic go in `P.related` there.
- Look: near-black text `#141914` on bright cream `#F8F5EC`, cards `#FFFEFA`. Each section owns one solid colour for its header band, current nav item, buttons and selected chips: Today olive `#2F4A2B`, Plan terracotta `#A8452A`, Library ochre `#E0A82E` (dark text on it), Products teal-moss `#1E5B57`. They arrive through `--sec`, `--sec-on`, `--sec-ink`, set from `html[data-sec]` by `route()`. Every page opens with the same `.view-head` band, then tabs, then content. Cormorant Garamond for titles and Manrope for everything else. `health-hub/design-system/tokens.json` is generated from the stylesheet.
- Do not draw or generate artwork. Use what is in `health-hub/assets/` and list anything missing in `health-hub/assets/ASSET-REQUESTS.md` with a prompt the owner can paste into an image tool.
- Saved browser data uses the key `phh:v1`. Only add fields; never rename or remove existing ones.

### Rule: the week timetable has to fit

- The timetable lives in `health-hub/data/schedule.js` (`P.plan`): wake 06:30, bed 22:30, gym Mon / Wed / Fri / Sun, sprints Tue / Sat. A slot is a list of `[routine id, minutes]`. It is marked `"both"`: OP routines, the owner's times.
- After changing it, run `node health-hub/tests/schedule.test.js`. It fails if any block runs into the next one, or if the weekly balance drifts (full body release 2x, lymph drainage 3x, breathwork and fascia work every day).
- The timetable is the first tab of Plan (`#week`).

### Rule: edits made inside the hub

- Saved additively under `phh:v1`: `plan` (edited weekdays, same shape as `P.plan.week`), `adds` (foods, products, notes, routines, daily habits, topics; each has `src` and, for `"x"`, `who`), `core` (the owner's choice of which daily items count: `{ item id: 1 | 0 }`) and, per day, `s` (items skipped that day).
- Streak rule: a day counts at 80% of core items. A skipped core item still counts as not done; skipping only takes it off Next up. Do not change the threshold or what a skip means without the owner asking.
- Personal layer over supplied records (never rewrite the supplied data for a personal change). A ref is `<kind>:<stable id>`: `r:` routine id, `t:` topic id, `p:` product name, `f:` food text. Saved fields: `ov` (overrides: `n` title and `intro` summary for routines / topics, `note` for all four, `t` = the real edit time), `tags`, `links` (`add` / `del` against the suggested `P.related`), `cols` (named collections of refs) and `fav` (routine ids as before, plus refs). `applyOv()` is the only place an override becomes the effective record; `ORIG` keeps the supplied text for View original / Restore original.
- An edit date is the owner's edit date. Never show it, or anything else, as a clinical or source review date.
- Links in `P.related` are name-matched suggestions and must stay labelled as unconfirmed. Equipment only links to a product through an explicit entry in `P.equipProd` (`health-hub/data/meta.js`); leave ambiguous equipment as plain text.
- Backups carry `schema` (now 2; a backup without it is schema 1). Bump `SCHEMA` only when the saved shape changes, give every new field an explicit default in `cleanState`, and add it to the round-trip test. Imports with a higher schema are refused.
- Import is two-step (summary, then apply) and always stores a recovery copy under `phh:v1:backup` first. A full backup is rebuilt through `cleanState`; add any new saved field there or it will be dropped on restore.
- The add form always asks whose the information is. Imported data goes through `cleanAdds` / `cleanPlan`; links must start with `http`.
- When the owner sends an export to be made permanent, move each entry into the matching `health-hub/data/*.js` file with the same `src`, then tell them to delete the in-hub copy.
- Artwork: functional symbols are inline SVG in the nav icon family (`G` in `index.html`; `icon: "g:<name>"` on a topic uses one). Do not use a food picture for a hormone or body-system topic. Painted art is listed in `health-hub/assets/manifest.json`; what is still missing, with ready prompts, is in `health-hub/assets/ASSET-REQUESTS.md`.
- Approved foods render as picture tiles. A food gets its picture from the `FOOD_IC` keyword list in `health-hub/index.html`; foods with no match show the bowl symbol. New food pictures go in `health-hub/assets/icons/` (128px transparent webp) plus one line in `FOOD_IC` and `FOODIC`. Product pictures work the same way through `PROD_IC`; a name containing `/` (such as `illus/equipment-kettlebell`) is read from `assets/` directly. Line icons from the pack are in `assets/line/primal-icons.js` (`li("name")`).

### Checks to run after any change

- `node health-hub/tests/schedule.test.js` (timetable fits), `node health-hub/tests/contrast.js` (every colour pair in light and dark; no line may say LOW).
- `sh health-hub/tests/serve.sh` in one shell, then `node health-hub/tests/browser.test.js` (Playwright, isolated storage; needs the `playwright` package).
