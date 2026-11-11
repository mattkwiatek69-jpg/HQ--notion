# Primal Health Hub

Source for the Primal Health Hub artifact.

- `index.html` is the page. It holds no content: every routine, food list, method and note lives in the artifact's database as a card.
- `build_seed.py` turns the diet framework, the "Max - 4" doc, an export of the "Max" doc and the Skool course export into cards (`python3 build_seed.py max_export.txt skool_export.md > seed.json`). Each card records the doc and section it came from; course lessons also carry `course: {ch, sec, n}`, the lesson `url` and the video length `dur`.
- Seed output is git-ignored because it contains personal notes.

Card shape: `{id, area, group, title, note, items:[{id, t, d, h, x, tier}], src:{doc, sec}, days:[0-6], ord}` where `area` is routines, food, methods or library, `h` marks a sub-heading row, `p` a plain paragraph, `m` a measure such as "30 seconds", `x` a struck-through item and `days` uses 0 for Monday.
