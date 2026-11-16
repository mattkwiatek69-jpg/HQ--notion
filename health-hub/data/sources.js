/* Primal Health Hub — where information comes from.
   Every item in data/*.js carries `src`: one of the ids below. Anything without a src is "op".
   Each source has a label, a shape and a colour (light, dark). The shape carries the meaning on its own
   (the Source labels switch hides labels and shapes); the colour only makes long lists faster to scan.

   Adding a new document or person (when the owner sends one):
   1. Ask whose it is: the owner's own, or someone else's (and whose). Never guess from the file name.
   2. Add an entry here: an id (lowercase, dashes), `n` the label shown in the hub, `whose` ("me" or "x"),
      `doc` the title of what it came from, `shape` and `c`. The owner's own docs use the diamond;
      someone else's use the ring unless a shape below is still free. Take the next colour from P.srcPalette.
   3. Put `src: "<id>"` on every product, topic, routine, food group or food from that document. */
(function (P) {
  P.sources = {
    op: { n: "OP docs", whose: "x", doc: "OP 1 and OP 2", shape: "dot", c: ["#4C5BA6", "#9AA6E0"] },
    me: { n: "My notes", whose: "me", doc: "Approved Foods - MK, the Max doc", shape: "diamond", c: ["#AE8328", "#C6A25A"] },
    both: { n: "OP docs + mine", whose: "both", doc: "In the OP docs and the owner's notes", shape: "half", c: ["#4C5BA6", "#9AA6E0"], c2: ["#AE8328", "#C6A25A"] },
    x: { n: "Someone else", whose: "x", doc: "Added in the hub, with a name", shape: "ring", c: ["#A8457A", "#D98CB5"] },
    ai: { n: "Suggested", whose: "ai", doc: "Claude's suggestion where the OP docs are silent, never the owner's", shape: "square", c: ["#7C817A", "#9CA299"] },
  };
  /* colours for named sources, in order; each passed 3:1 against the cards in light and dark (tests/contrast.js) */
  P.srcPalette = [["#1F7A93", "#6FC0D6"], ["#7B52AE", "#B597E0"], ["#9C3D8F", "#D88ACB"], ["#5E6B2E", "#B4C27A"]];
  /* shapes a named source can take besides the five above */
  P.srcShapes = ["dot", "diamond", "half", "ring", "square", "triangle", "bar"];
})(window.PHH);
