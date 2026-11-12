/* Self-check for the week timetable. Run: node health-hub/tests/schedule.test.js */
const assert = require("assert"), path = require("path");
global.window = { PHH: {} };
["routines-a", "routines-b", "systems", "nutrition", "products", "today", "meta", "schedule"].forEach((f) => require(path.join(__dirname, "../data", f + ".js")));
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
console.log("schedule ok");
