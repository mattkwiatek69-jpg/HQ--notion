/* Primal Health Hub — the week timetable.
   Routines are from the OP docs; the clock times, gym days and how often each routine runs are the owner's
   (wake 06:30, bed 22:30, gym Mon / Wed / Fri / Sun, sprints Tue / Sat), so the timetable is marked "both".
   A slot is a list of [routine id, minutes]. Edits made inside the hub are stored per weekday and override a whole day. */
(function (P) {
  /* looked up live, because routines added inside the hub join P.routines later */
  const byId = new Proxy({}, { get: (_, id) => (P.routines || []).find((r) => r.id === id) });
  P.plan = {
    src: "both",
    bedtime: "22:30",
    /* default start of each block; a day can override with at: { block: "HH:MM" } */
    times: { wake: "06:30", morning: "07:00", day: "08:30", train: "17:30", evening: "20:00", bed: "21:45" },
    week: {
      1: { focus: "Strength: Workout 1", kind: "gym",
        am: [["groundwork", 5], ["fascia-activation", 18], ["myo-routine", 10]], train: [["workout-1", 50]],
        pm: [["hollow-cheeks", 20]], bed: [["oscar-breathwork", 10]] },
      2: { focus: "Sprints and full release", kind: "sprint", at: { train: "07:00", morning: "07:30" },
        train: [["groundwork", 5], ["sprints", 20]], am: [["myo-routine", 10]],
        pm: [["short-breaths", 5], ["full-body-release", 20], ["full-lymph", 4], ["apt", 18]], bed: [["short-breaths", 5]] },
      3: { focus: "Strength: Workout 2", kind: "gym",
        am: [["groundwork", 5], ["fascia-activation", 18], ["myo-routine", 10]], train: [["workout-2", 50]],
        pm: [["tongue-tie", 15], ["stored-stress", 15]], bed: [["oscar-breathwork", 10]] },
      4: { focus: "Lighter day: long fascia session", kind: "light",
        am: [["groundwork", 5], ["facial-lymph", 8], ["fascia-activation", 18], ["myo-routine", 10]], train: [],
        pm: [["ultimate", 46], ["tendon", 20]], bed: [["vortex", 5]] },
      5: { focus: "Strength: Workout 3", kind: "gym",
        am: [["groundwork", 5], ["fascia-activation", 18], ["myo-routine", 10]], train: [["workout-3", 45]],
        pm: [["tmj", 12], ["double-chin", 8]], bed: [["oscar-breathwork", 10]] },
      6: { focus: "Sprints and full release", kind: "sprint", at: { train: "07:00", morning: "07:30" },
        train: [["groundwork", 5], ["sprints", 20]], am: [["myo-routine", 10], ["stella-morning", 8]],
        pm: [["short-breaths", 5], ["full-body-release", 20], ["full-lymph", 4], ["flat-feet", 20]], bed: [["short-breaths", 5]] },
      0: { focus: "Bone density and tendons", kind: "gym", at: { train: "10:30" },
        am: [["groundwork", 5], ["fascia-activation", 18], ["myo-routine", 10]], train: [["bone-density", 40], ["tendon", 20]],
        pm: [["fhp", 15], ["lajin", 10]], bed: [["vortex", 5]] },
    },
  };
  P.dayFocus = [0, 1, 2, 3, 4, 5, 6].map((d) => P.plan.week[d].focus);

  /* the checklist keeps its fixed habits; the plan now places the routines these rows used to hard-code */
  const gone = ["m-ground", "m-release", "m-myo", "t-w1", "t-w2", "t-w3", "t-sprint", "t-bone", "t-tendon", "t-rec1", "t-rec2", "e-session", "b-breath"];
  const MIN = { "w-pand": 2, "w-sun": 15, "w-big6": 2, "w-tape": 1, "m-wall": 3, "m-carrot": 5, "m-breakfast": 20, "e-dinner": 30, "b-oil": 2, "b-tape": 3 };
  const moved = [];
  (P.blocks || []).forEach((b) => {
    b.items = b.items.filter((i) => { if (i.id === "t-rec3") { moved.push(i); return false; } return gone.indexOf(i.id) < 0; });
    b.items.forEach((i) => { if (MIN[i.id]) i.min = MIN[i.id]; if (b.id === "train") delete i.days; });
  });
  const blk = (id) => P.blocks.find((b) => b.id === id);
  moved.forEach((i) => { i.days = [4]; i.d = "Lighter day"; blk("day").items.push(i); });
  const dinner = blk("evening").items.find((i) => i.id === "e-dinner"); if (dinner) { dinner.at = "19:00"; dinner.pre = 1; }
  const oil = blk("bed").items.find((i) => i.id === "b-oil"); if (oil) oil.pre = 1;
  (P.weekly || []).forEach((w) => { if (w.id === "wk-release") { w.n = 2; w.range = "2×"; } });

  /* one-line descriptions for the rows the plan generates */
  const DESC = {
    groundwork: "Seiza, rocking, deep squat, half-kneel and hops", "fascia-activation": "Open the routine for the full sequence",
    "myo-routine": "Tongue, breathing, chewing and swallowing", sprints: "4–5 × 100 m, maximal effort, 2–3 min rest, fasted",
    "full-body-release": "Fascial ball, head to feet", "full-lymph": "About 10 s per area", "oscar-breathwork": "Buteyko and Vortex, before bed",
    "short-breaths": "Slow nasal breaths to settle", ultimate: "The full 46-minute fasciapulling follow-along", tendon: "Isometrics for any areas under load",
    "bone-density": "Farmers carries, macebell swings, box jumps",
  };
  /* ids the old checklist used, kept so earlier ticks still count */
  const LEG = { "am|groundwork": "m-ground", "am|fascia-activation": "m-release", "am|myo-routine": "m-myo", "train|workout-1": "t-w1", "train|workout-2": "t-w2", "train|workout-3": "t-w3", "train|sprints": "t-sprint", "train|bone-density": "t-bone", "train|tendon": "t-tendon", "pm|full-body-release": "t-rec1" };
  const SLOT = { morning: "am", train: "train", evening: "pm", bed: "bed" };
  const T = (s) => +s.slice(0, 2) * 60 + +s.slice(3), C = (m) => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");

  P.sched = {
    T, C, SLOT,
    /* minutes a routine takes when first placed: the first number in its duration */
    mins(rid) { const m = /(\d+)(?:[–-](\d+))?\s*min/.exec((byId[rid] || {}).dur || ""); return m ? +(m[2] || m[1]) : 10; },
    plan(dow, ov) { return (ov && ov[dow]) || P.plan.week[dow]; },
    at(bid, dow, ov) { const pl = this.plan(dow, ov); return (pl.at && pl.at[bid]) || P.plan.times[bid]; },
    items(b, dow, ov) {
      const pl = this.plan(dow, ov), k = SLOT[b.id], seen = {};
      const gen = ((k && pl[k]) || []).map((s) => {
        const r = byId[s[0]]; if (!r) return null;
        let id = LEG[k + "|" + s[0]] || (k === "bed" && r.cat === "breath" ? "b-breath" : "p-" + k + "-" + s[0]); if (seen[id]) id += "-2"; seen[id] = 1;
        return { id, t: r.name, d: DESC[s[0]] || "", go: s[0], min: +s[1] || 0, plan: 1, cat: r.cat };
      }).filter(Boolean);
      if (b.id === "train" && !gen.length) return [];
      const fixed = b.items.filter((i) => !i.days || i.days.indexOf(dow) > -1);
      return fixed.filter((i) => i.pre).concat(gen, fixed.filter((i) => !i.pre));
    },
    /* the day in clock order: [{ b, at, end, items (each timed item gets .clock), used, room, over }] */
    day(dow, ov) {
      const rows = P.blocks.map((b) => {
        const items = this.items(b, dow, ov).map((i) => Object.assign({}, i)), start = T(this.at(b.id, dow, ov));
        let t = start, first = start, last = start, seenPlan = false;
        items.forEach((i) => {
          if (i.at) t = T(i.at); else if (i.plan && !seenPlan) t = Math.max(t, start);
          if (i.plan) seenPlan = true;
          if (i.min && !i.opt) { i.clock = C(t); first = Math.min(first, t); t += i.min; last = t; }
        });
        return { b, items, at: first, end: last };
      }).filter((r) => r.items.length).sort((a, z) => a.at - z.at);
      rows.forEach((r, n) => { const next = n < rows.length - 1 ? rows[n + 1].at : T(P.plan.bedtime); r.room = next - r.at; r.used = r.end - r.at; r.over = Math.max(0, r.end - next); });
      return rows;
    },
    /* how many days of the week each routine category shows up */
    balance(ov) {
      const days = {};
      for (let d = 0; d < 7; d++) { const pl = this.plan(d, ov), seen = {}; ["am", "train", "pm", "bed"].forEach((k) => (pl[k] || []).forEach((s) => { const r = byId[s[0]]; if (r && !seen[r.cat]) { seen[r.cat] = 1; days[r.cat] = (days[r.cat] || 0) + 1; } })); }
      return days;
    },
    count(rid, ov) { let n = 0; for (let d = 0; d < 7; d++) { const pl = this.plan(d, ov); ["am", "train", "pm", "bed"].forEach((k) => (pl[k] || []).forEach((s) => { if (s[0] === rid) n++; })); } return n; },
  };
})(window.PHH);
