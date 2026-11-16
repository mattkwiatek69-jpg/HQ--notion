/* Self-check for the week timetable. Run: node health-hub/tests/schedule.test.js */
const assert = require("assert"), path = require("path");
global.window = { PHH: {} };
["sources", "routines-a", "routines-b", "systems", "nutrition", "products", "today", "meta", "schedule", "guide", "areas"].forEach((f) => require(path.join(__dirname, "../data", f + ".js")));
const P = window.PHH, S = P.sched, ids = new Set(P.routines.map((r) => r.id));
const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

for (let d = 0; d < 7; d++) {
  const pl = P.plan.week[d];
  ["am", "train", "pm", "bed"].forEach((k) => (pl[k] || []).forEach((s) => { assert(ids.has(s[0]), `${names[d]} ${k}: unknown routine ${s[0]}`); assert(s[1] > 0, `${names[d]} ${s[0]} has no minutes`); }));
  const rows = S.day(d);
  assert.strictEqual(rows[0].b.id, "wake"); assert.strictEqual(S.C(rows[0].at), "06:30", names[d] + " starts at 06:30");
  rows.forEach((r) => assert.strictEqual(r.over, 0, `${names[d]} ${r.b.id} runs ${r.over} min past the next block (${r.used} of ${r.room})`));
  const seen = new Set(); rows.forEach((r) => r.items.forEach((i) => { assert(!seen.has(i.id), `${names[d]} duplicate item id ${i.id}`); seen.add(i.id); }));
  assert(rows[rows.length - 1].end <= S.T(P.plan.bedtime), names[d] + " ends by bedtime");
  assert((pl.bed || []).some((s) => P.routines.find((r) => r.id === s[0]).cat === "breath"), names[d] + " has breathwork");
  const am = (pl.am || []).reduce((n, s) => n + s[1], 0), pm = (pl.pm || []).reduce((n, s) => n + s[1], 0);
  console.log(names[d].padEnd(4), pl.focus.padEnd(34), "morning", String(am).padStart(2), "min · evening", String(pm).padStart(2), "min ·", rows.map((r) => `${r.b.id} ${S.C(r.at)}–${S.C(r.end)}`).join("  "));
}
const gym = [1, 3, 5, 0].every((d) => P.plan.week[d].kind === "gym"), spr = [2, 6].every((d) => S.plan(d).train.some((s) => s[0] === "sprints"));
assert(gym && spr, "gym Mon/Wed/Fri/Sun, sprints Tue/Sat");
assert.strictEqual(S.count("full-body-release"), 2, "full body release twice a week");
assert.strictEqual(S.count("full-lymph") + S.count("facial-lymph"), 3, "lymph drainage three times a week");
assert.strictEqual(S.count("oscar-breathwork"), 3, "Oscar's breathwork three nights");
assert.strictEqual(S.balance().breath, 7, "breathwork every day"); assert.strictEqual(S.balance().fascia, 7, "fascia work every day");
/* an edited day that does not fit is reported, not hidden */
const ov = { 1: Object.assign({}, P.plan.week[1], { am: [["ultimate", 46], ["full-body-release", 20], ["workout-1", 50]] }) };
assert(S.day(1, ov).find((r) => r.b.id === "morning").over > 0, "overfull morning is flagged");
assert.strictEqual(S.mins("apt"), 20); assert.strictEqual(S.mins("groundwork"), 5);
console.log("balance (days per week):", JSON.stringify(S.balance()));
/* planner checks: the supplied week fits; it reports the known back-to-back strength days and the one aim it misses */
const ck = S.checks(null, P.aims);
assert(!ck.some((c) => c.k === "fit"), "supplied week fits");
assert(ck.some((c) => c.k === "hard" && /Sunday and Monday/.test(c.text)), "strength on Sunday then Monday is reported");
assert(ck.some((c) => c.k === "aim" && c.rid === "bone-density"), "bone density under its aim is reported");
assert(S.checks(ov, {}).some((c) => c.k === "fit" && c.d === 1), "an overfull day is reported as not fitting");
const heavy = { 4: Object.assign({}, P.plan.week[4], { pm: [["ultimate", 46], ["tendon", 20], ["apt", 60]] }) };
assert(S.checks(heavy, {}).some((c) => c.k === "load" && c.d === 4), "a lopsided day is reported");
assert.strictEqual(S.day(1)[1].items[0].pi, 0, "plan items carry their position");
/* guide: every routine that is a real session has guidance, the supplied week is in order, and the review finds what the docs disagree with */
const habit = (id) => P.blocks.some((b) => b.items.some((i) => i.go === id && !i.opt));
Object.keys(P.guide).forEach((id) => { const x = P.guide[id]; assert(ids.has(id), "guide names an unknown routine " + id); assert(/^(op|ai)$/.test(x.ts) && /^(op|ai)$/.test(x.fs), id + " has a source for timing and frequency"); assert(x.why && x.why.length > 20, id + " explains itself"); if (x.ts === "op" || x.fs === "op") assert(/^Docs:/.test(x.why), id + " quotes the docs when it relies on them"); });
const rv = S.review(null, habit);
assert.strictEqual(rv.order.length, 0, "supplied week is already in the suggested order");
assert(rv.time.some((x) => x.rid === "tmj" && x.d === 5 && x.to === "am"), "TMJ on Friday evening is flagged for the morning (docs: before the first thumbpulling)");
assert(rv.gym.some((x) => x.kind === "warmup" && x.rid === "bone-density" && x.d === 0), "bone density without release first is flagged (training rules)");
assert(!rv.freq.some((x) => x.rid === "knock-knees"), "an unplaced condition-specific fix is not pushed");
assert(rv.freq.some((x) => x.rid === "apt" && x.delta === 6), "pelvic tilt, placed once, is flagged against the docs' daily");
assert(!rv.freq.some((x) => x.rid === "big6" || x.rid === "pandiculation"), "routines covered by daily habits count as daily");
assert(rv.perDayTarget > rv.perDay, "the cost of following every frequency is reported");
const lifted = S.sortSlot([["workout-1", 50], ["full-body-release", 20], ["groundwork", 5]]).map((x) => x[0]).join();
assert.strictEqual(lifted, "groundwork,workout-1,full-body-release", "next to lifting: warm-up, lift, then long release");
const mix = { 1: Object.assign({}, P.plan.week[1], { train: [["full-body-release", 20], ["workout-1", 50]], pm: [["oscar-breathwork", 10]] }) };
const rm = S.review(mix, habit);
assert(rm.gym.some((x) => x.kind === "late") && rm.order.some((x) => x.d === 1 && x.k === "train") && rm.time.some((x) => x.rid === "oscar-breathwork"), "release before lifting, wrong order and breathwork outside bedtime are all reported");
console.log("guide: " + rv.time.length + " time, " + rv.freq.length + " frequency, " + rv.gym.length + " gym; " + rv.perDay + " → " + rv.perDayTarget + " min a day");
/* body areas: tags are suggestions, weightings come from the guide, cover counts the week and the spread moves help */
const rt = (id) => P.routines.find((r) => r.id === id), aOf = (id) => P.rtAreas(rt(id)), W = {};
P.areas.forEach((a) => { const w = P.areaWeight[a.id]; assert(w.days >= 1 && w.days <= 7 && /^(op|ai)$/.test(w.src), a.id + " has a weighting and a source"); W[a.id] = w.days; });
assert.strictEqual(P.areaWeight.strength.days, 4, "strength is capped at the docs' 4 weight sessions"); assert.strictEqual(P.areaWeight.power.days, 4, "power is capped at 4 sprint sessions");
assert.deepStrictEqual(aOf("myo-routine"), ["tongue", "face"], "a routine is tagged with its main areas, not every passing touch");
assert(aOf("oscar-breathwork").indexOf("breath") > -1 && aOf("workout-1").indexOf("strength") > -1 && aOf("big6").indexOf("lymph") > -1, "breathwork, lifting and lymph are tagged");
assert(["fascia-activation", "full-body-release", "full-lymph"].every((id) => aOf(id).length), "whole-body routines still have main areas");
assert.deepStrictEqual(P.exAreas("Calf Release"), ["calves"]); assert(P.exAreas("SCM Release").indexOf("neck") > -1 && P.exAreas("Seiza breath").indexOf("hips") < 0, "exercise names map to areas");
const cv = S.cover(null, aOf, W);
assert.strictEqual(cv.rows.length, P.areas.length);
cv.rows.forEach((r) => { assert.strictEqual(r.per.length, 7); assert.strictEqual(r.days, r.per.filter(Boolean).length); });
assert(cv.rows.find((r) => r.a === "tongue").days === 7, "daily habits (thumbpulling) count every day");
assert(cv.twice.some((x) => x.n === "Fascia Hops" && x.d === 1), "the same exercise in two routines on one day is found");
assert(cv.spread.length > 0, "the supplied week has doubled-up work that can spread");
cv.spread.forEach((m) => { assert(!/^(workout-\d|bone-density|sprints)$/.test(m.rid), "strength and sprints never move"); assert(m.gain.indexOf(m.a) > -1, "a move brings its area to the new day");
  const ov = {}; for (let d = 0; d < 7; d++) ov[d] = JSON.parse(JSON.stringify(P.plan.week[d])); const l = ov[m.d][m.k], i = l.findIndex((x) => x[0] === m.rid); ov[m.to][m.k].push(l.splice(i, 1)[0]);
  const after = S.cover(ov, aOf, W).rows.find((r) => r.a === m.a), before = cv.rows.find((r) => r.a === m.a); assert(after.days > before.days, m.rid + " → " + m.to + " adds a day of " + m.a); });
assert(S.cover(null, aOf, W, (id) => /^workout/.test(id)).rows.find((r) => r.a === "tongue").days === 0, "the lens filter counts only what it keeps");
console.log("areas: " + cv.rows.filter((r) => r.state === "under").length + " under, " + cv.spread.length + " moves, " + cv.twice.length + " repeats");
console.log("schedule ok");
