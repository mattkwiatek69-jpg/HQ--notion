# HQ--notion: working rules

## Primal Health Hub (`health-hub/`)

### Rule: every piece of information is marked with where it came from

Before adding any new information to the hub, **ask the owner whose it is**: their own, or someone else's (and whose). Do not guess from the file name. Then mark it so the on-page key stays true.

Each block of information sits in a **source panel**: a 2px rounded frame in the source colour, a flat light tint of that colour, and a name tab in the corner. The key swatches are miniature panels.

| Source | `src` value | Panel frame / tint tokens | Tab label |
|---|---|---|---|
| OP docs (OP 1, OP 2) | `"op"` (default when unmarked) | olive `--op-line` / `--op-tint` | OP docs |
| The owner's own notes (Approved Foods - MK, Max doc) | `"me"` (products also accept `"max"`) | gold `--me-line` / `--me-tint` | My notes |
| In both | `"both"` | split olive-to-gold frame | OP docs + mine |
| Someone else, added inside the hub | `"x"` plus `who` (their name) | dashed charcoal `--ink-2` / `--sunk` | their name |

- A new outside source gets its own `src` value, its own entry in `SRCN`, `sb()`, the `.sbox.s-<value>` panel CSS and the `.src` key swatch CSS in `health-hub/index.html`, and a line in the key (rail footer and phone top bar). Pick its colour from the Primal palette only (ivory, olive, sage, clay, gold, charcoal); pair the colour with a distinct shape so it never relies on colour alone. Clay and sage already mean don't / do, so avoid them for sources.
- Set `src` on the item or group in `health-hub/data/*.js`. Wrap each block in a panel with `class="... ${sb(src)}"` (add `slim` for list rows). Lists of the owner's notes render gold diamond bullets with `ul(items, "me")`.
- Keep the Source colours switch working: anything source-coloured must fall back to a neutral card under `html.plain`.
- Keep the six main sections, the ivory / olive / sage identity, Cormorant Garamond for titles and Manrope for everything else.
- Saved browser data uses the key `phh:v1`. Only add fields; never rename or remove existing ones.

### Rule: the week timetable has to fit

- The timetable lives in `health-hub/data/schedule.js` (`P.plan`): wake 06:30, bed 22:30, gym Mon / Wed / Fri / Sun, sprints Tue / Sat. A slot is a list of `[routine id, minutes]`. It is marked `"both"`: OP routines, the owner's times.
- After changing it, run `node health-hub/tests/schedule.test.js`. It fails if any block runs into the next one, or if the weekly balance drifts (full body release 2x, lymph drainage 3x, breathwork and fascia work every day).
- Today, Week and Progress are sub-views of the Today section (`#today`, `#week`, `#progress`); the six main sections stay.

### Rule: edits made inside the hub

- Saved additively under `phh:v1`: `plan` (edited weekdays, same shape as `P.plan.week`) and `adds` (foods, products, notes, routines, daily habits; each has `src` and, for `"x"`, `who`).
- The add form always asks whose the information is. Imported data goes through `cleanAdds` / `cleanPlan`; links must start with `http`.
- When the owner sends an export to be made permanent, move each entry into the matching `health-hub/data/*.js` file with the same `src`, then tell them to delete the in-hub copy.
- Approved foods render as picture tiles. A food gets its picture from the `FOOD_IC` keyword list in `health-hub/index.html`; foods with no match show their initial. New food pictures go in `health-hub/assets/icons/` (128px transparent webp) plus one line in `FOOD_IC` and `FOODIC`.
