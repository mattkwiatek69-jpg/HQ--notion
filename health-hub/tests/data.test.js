/* Self-check for the data files and the source registry. Run: node health-hub/tests/data.test.js
   Catches a mistyped or unregistered src when new documents are added, so nothing silently shows as "OP docs". */
const assert = require("assert"), path = require("path"), fs = require("fs");
global.window = { PHH: {} };
const DATA = path.join(__dirname, "../data");
["sources", "routines-a", "routines-b", "systems", "nutrition", "products", "today", "meta", "schedule", "guide", "areas"].forEach((f) => require(path.join(DATA, f + ".js")));
const P = window.PHH, SRC = P.sources, HEX = /^#[0-9A-Fa-f]{6}$/, ALIAS = { max: "me", mention: "op" };

/* the registry: every source has a label, a known shape and a light and dark colour; named sources say whose and from what */
Object.keys(SRC).forEach((k) => {
  const s = SRC[k];
  assert(/^[a-z][a-z0-9-]{0,30}$/.test(k), k + ": an id is lowercase letters, digits and dashes");
  assert(s.n && s.n.length <= 30, k + " has a short label");
  assert(P.srcShapes.indexOf(s.shape) > -1, k + " has a known shape");
  assert(Array.isArray(s.c) && s.c.length === 2 && s.c.every((c) => HEX.test(c)), k + " has a light and a dark colour");
  assert(/^(me|x|both|ai)$/.test(s.whose) && s.doc, k + " says whose it is and what it came from");
});
assert(!ALIAS[Object.keys(SRC).find((k) => ALIAS[k])], "a registry id never reuses an alias");
const labels = Object.keys(SRC).map((k) => SRC[k].n.toLowerCase());
assert.strictEqual(new Set(labels).size, labels.length, "no two sources share a label");

/* every src written in a data file is registered (or one of the old aliases) */
const used = {};
fs.readdirSync(DATA).filter((f) => f.endsWith(".js") && f !== "sources.js").forEach((f) => {
  const txt = fs.readFileSync(path.join(DATA, f), "utf8");
  for (const m of txt.matchAll(/\bsrc:\s*"([^"]+)"/g)) { used[m[1]] = (used[m[1]] || 0) + 1; assert(SRC[m[1]] || ALIAS[m[1]], `${f}: src "${m[1]}" is not in data/sources.js`); }
});
/* and the loaded records agree, including ones built in code */
const recs = [].concat(P.products, P.routines, P.systems, P.extras, P.cats, P.nutrition.approved, P.nutrition.approved.reduce((a, g) => a.concat(g.items.filter((i) => typeof i !== "string")), []));
recs.forEach((r) => { if (r && r.src) assert(SRC[r.src] || ALIAS[r.src], `${r.name || r.n || r.h || r.id}: src "${r.src}" is not registered`); });
console.log("sources:", Object.keys(SRC).join(", "), "· used in data:", JSON.stringify(used));

/* the docs: every doc names its hub; every link from a record points at a real section; every OP section is linked from something */
["docindex", "docrefs"].forEach((f) => require(path.join(DATA, f + ".js")));
/* the owner's own docs' index is private (never committed); without it, links into those docs cannot be checked here */
const PRIV = fs.existsSync(path.join(DATA, "docs-private.js")); if (PRIV) require(path.join(DATA, "docs-private.js"));
const SEC = {}; P.docs.forEach((d) => { assert(SRC[d.src] && d.url && /^https:\/\/docs\.google\.com\//.test(d.url), d.n + ": a doc has a registered src and its Google link"); d.secs.forEach((x) => { assert(!SEC[x.id], "section ids are unique: " + x.id); SEC[x.id] = d; }); });
const linked = new Set();
Object.keys(P.docRefs).forEach((ref) => { assert(/^[rtinpw]:/.test(ref), ref + ": a ref starts with r:, t:, i:, n:, p: or w:"); P.docRefs[ref].forEach((id) => { if (!PRIV && /^max-/.test(id)) return; assert(SEC[id], `${ref}: section "${id}" is not in data/docindex.js`); linked.add(id); }); });
P.docs.filter((d) => d.src === "op").forEach((d) => d.secs.forEach((x) => assert(linked.has(x.id), `${d.n} › ${x.h} is not linked from any record (data/docrefs.js)`)));
P.routines.forEach((r) => assert(P.docRefs["r:" + r.id], "routine " + r.id + " says where in the docs it comes from"));
P.systems.concat(P.extras).forEach((t) => assert(P.docRefs["t:" + t.id], "topic " + t.id + " says where in the docs it comes from"));
/* Daily items: a known group, a registered source, and where the docs say it */
const DG = new Set(P.dailyGroups.map((g) => g[0])); let nd = 0;
P.blocks.forEach((b) => b.items.forEach((i) => { if (!i.k) return; nd++; assert(DG.has(i.k), i.id + ": daily group " + i.k + " is in P.dailyGroups"); assert(SRC[i.src], i.id + ": daily item has a registered src"); assert(P.docRefs["i:" + i.id], i.id + ": daily item says where the docs say it"); }));
assert(nd >= 30, "the daily items are all there (" + nd + ")");
console.log("docs:", P.docs.map((d) => d.n + " " + d.secs.length).join(", "), "· sections linked:", linked.size, "· daily items:", nd);
console.log("data ok");
