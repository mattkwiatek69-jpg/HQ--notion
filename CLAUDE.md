# HQ--notion: working rules

## Primal Health Hub (`health-hub/`)

### Rule: every piece of information is marked with where it came from

Before adding any new information to the hub, **ask the owner whose it is**: their own, or someone else's (and whose). Do not guess from the file name. Then mark it so the on-page key stays true.

| Source | `src` value | Mark | Colour token |
|---|---|---|---|
| OP docs (OP 1, OP 2) | `"op"` (default when unmarked) | round dot | olive `--primary` |
| The owner's own notes (Approved Foods - MK, Max doc) | `"me"` (products also accept `"max"`) | diamond | gold `--gold` |
| In both | `"both"` | split dot | olive + gold |

- A new outside source gets its own `src` value, its own entry in `SRCN` and the `.src` CSS in `health-hub/index.html`, and a line in the key (rail footer and phone top bar). Pick its colour from the Primal palette only (ivory, olive, sage, clay, gold, charcoal); pair the colour with a distinct shape so it never relies on colour alone. Clay and sage already mean don't / do, so avoid them for sources.
- Set `src` on the item or group in `health-hub/data/*.js`. Lists render gold diamond bullets with `ul(items, "me")`; headings take `srcTag(src)`.
- Keep the six main sections, the ivory / olive / sage identity, Cormorant Garamond for titles and Manrope for everything else.
- Saved browser data uses the key `phh:v1`. Only add fields; never rename or remove existing ones.
