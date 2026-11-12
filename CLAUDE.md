# HQ--notion: working rules

## Primal Health Hub (`health-hub/`)

### Rule: every piece of information is marked with where it came from

Before adding any new information to the hub, **ask the owner whose it is**: their own, or someone else's (and whose). Do not guess from the file name. Then mark it so the on-page key stays true.

Each block of information sits in a **source panel**: a thick rounded frame in the source colour, a tint pooling at the edges, and a name tab in the corner. The key swatches are miniature panels.

| Source | `src` value | Panel frame / tint tokens | Tab label |
|---|---|---|---|
| OP docs (OP 1, OP 2) | `"op"` (default when unmarked) | olive `--op-line` / `--op-tint` | OP docs |
| The owner's own notes (Approved Foods - MK, Max doc) | `"me"` (products also accept `"max"`) | gold `--me-line` / `--me-tint` | My notes |
| In both | `"both"` | split olive-to-gold frame | OP docs + mine |

- A new outside source gets its own `src` value, its own entry in `SRCN`, `sb()`, the `.sbox.s-<value>` panel CSS and the `.src` key swatch CSS in `health-hub/index.html`, and a line in the key (rail footer and phone top bar). Pick its colour from the Primal palette only (ivory, olive, sage, clay, gold, charcoal); pair the colour with a distinct shape so it never relies on colour alone. Clay and sage already mean don't / do, so avoid them for sources.
- Set `src` on the item or group in `health-hub/data/*.js`. Wrap each block in a panel with `class="... ${sb(src)}"` (add `slim` for list rows). Lists of the owner's notes render gold diamond bullets with `ul(items, "me")`.
- Keep the Source colours switch working: anything source-coloured must fall back to a neutral card under `html.plain`.
- Keep the six main sections, the ivory / olive / sage identity, Cormorant Garamond for titles and Manrope for everything else.
- Saved browser data uses the key `phh:v1`. Only add fields; never rename or remove existing ones.
