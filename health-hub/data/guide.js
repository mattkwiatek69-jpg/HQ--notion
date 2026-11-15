/* Primal Health Hub — when, how often and in what order each routine fits, and a review of the week against it.
   Every entry says where it comes from: "op" = the OP docs say it (the quoted phrase is in `why`),
   "ai" = the docs are silent, so this is a suggestion from general training practice, labelled "Suggested" in the hub.
   t: parts of the day it suits (am morning, train training, pm evening, bed before bed), first = best.
   f: [fewest, most] times a week; null = as needed or a reference page, so no number is suggested.
   r: order within a part of the day (lower comes first). h: also done as a daily habit, so it counts every day.
   c: a fix for a specific problem, so its number only applies once you have put it in your week. */
(function (P) {
  const g = (t, ts, f, fs, r, why, h) => ({ t, ts, f, fs, r, why, h: !!h, c: false });
  const AM = ["am"], PM = ["pm"], BED = ["bed"], TRAIN = ["train"];
  P.guide = {
    /* wake the body */
    pandiculation: g(AM, "op", [7, 7], "op", 4, "Docs: on waking and whenever the body asks. It is already in your wake-up habits.", 1),
    "digestion-release": g(["am", "bed"], "op", null, "op", 6, "Docs: on waking and before sleep, if bloated or digestion is slow."),
    big6: g(AM, "op", [7, 7], "op", 8, "Docs: every morning, before Groundwork or Fascia Activation. It is in your wake-up habits.", 1),
    groundwork: g(["am", "train"], "op", [7, 7], "op", 10, "Docs: first thing in the morning, and between long sits. The training rules also ask for 2 to 3 minutes of fascia hops before training."),
    /* breathe, release and drain */
    "short-breaths": g(["bed", "pm"], "op", null, "op", 12, "Docs: before bed, before meals and before release work, so it goes first in an evening of release."),
    "facial-lymph": g(AM, "op", [2, 7], "ai", 14, "Docs: before your first thumbpulling session. They give no number, so anything from twice a week to daily fits."),
    tmj: g(AM, "op", [3, 7], "ai", 16, "Docs: before your first thumbpulling session, which is a morning job. No number is given; 3 or more a week is suggested."),
    "fascia-activation": g(AM, "op", [5, 7], "op", 20, "Docs: morning, before thumbpulling, swapped for the Full Body Release a few times a week."),
    "full-body-release": g(PM, "ai", [2, 3], "op", 22, "Docs: a few times a week, with breathwork first. Suggested for the evening: a long, slow release suits winding down and keeps it after training rather than before."),
    ultimate: g(["pm", "am"], "op", [1, 7], "op", 24, "Docs: morning and/or evening; build up to daily, or pair it with groundwork, breathwork or a full release for one longer session."),
    "full-lymph": g(["pm", "am"], "op", [2, 3], "op", 26, "Docs: a few times a week, straight after a full fascia release."),
    /* tongue, face and jaw */
    "myo-routine": g(AM, "op", [7, 7], "op", 30, "Docs: after the Fascia Activation Routine, or alone if short on time."),
    "stella-morning": g(AM, "op", null, "op", 32, "Docs: a morning face routine; an optional alternative, so no number is set."),
    "thumbpulling-daily": g(AM, "op", [7, 7], "op", 34, "Docs: every 1 to 2 hours, at least four sessions a day. It is in your daily habits.", 1),
    "advanced-15": g(["am", "pm"], "ai", null, "ai", 36, "A longer follow-along to use in place of the Myo Routine when you have time."),
    "facial-routine": g(["am", "pm"], "op", null, "op", 38, "Docs: through the day, when short on time or after a Fascia Activation."),
    "midday-reset": g(["am", "pm"], "op", null, "op", 38, "Docs: midday. It is in your daily habits as the extra session of your choice."),
    "tongue-tie": g(["am", "pm"], "ai", [7, 7], "op", 40, "Docs: daily, if suction, lip seal or the back third of the tongue is a struggle. Suggested after release work, morning or evening."),
    "hollow-cheeks": g(PM, "ai", [7, 7], "op", 42, "Docs: daily. Suggested for the evening so the 20 minutes do not crowd the morning; mastic chewing can run through the day."),
    "double-chin": g(PM, "ai", [7, 7], "op", 44, "Docs: daily, plus the Zygotape chin X at night. Suggested in the evening, close to taping."),
    patel: g(["am", "pm"], "ai", null, "ai", 46, "Habit strengtheners to add when a habit slips; no number needed."),
    airofit: g(["am", "pm"], "ai", [7, 7], "op", 70, "Docs: daily, 5 to 10 minutes at F-6. Suggested at the end of a session, any time of day."),
    /* posture, after release */
    "walking-routine": g(["am", "pm"], "op", [2, 3], "ai", 50, "Docs: after a fascia release or groundwork. No number is given; 2 to 3 a week is suggested."),
    "flat-feet": g(["am", "pm"], "op", [2, 3], "ai", 52, "Docs: after a quick fascia release or groundwork. No number is given; 2 to 3 a week is suggested."),
    "knock-knees": g(["am", "pm"], "op", [2, 3], "ai", 54, "Docs: after a fascia release and groundwork. No number is given; 2 to 3 a week is suggested."),
    apt: g(["pm", "am"], "ai", [7, 7], "op", 56, "Docs: daily. Suggested for the evening: it opens with its own release and uses gym kit, so it sits well after training."),
    fhp: g(["am", "pm"], "op", [2, 3], "ai", 58, "Docs: after a fascia release. No number is given; 2 to 3 a week is suggested."),
    /* training */
    sprints: g(TRAIN, "op", [2, 3], "op", 60, "Docs: morning, fasted, 2 to 3 times a week and never more than 4."),
    "workout-1": g(TRAIN, "op", [1, 1], "op", 62, "Docs: one of the 2 to 3 strength sessions a week. It opens with its own release."),
    "workout-2": g(TRAIN, "op", [1, 1], "op", 62, "Docs: one of the 2 to 3 strength sessions a week. It opens with its own release."),
    "workout-3": g(TRAIN, "op", [1, 1], "op", 62, "Docs: one of the 2 to 3 strength sessions a week. It opens with its own release."),
    "bone-density": g(TRAIN, "op", [2, 3], "op", 64, "Docs: 2 to 3 times a week on top of training."),
    tendon: g(["train", "pm"], "op", [2, 3], "op", 66, "Docs: 2 to 3 times a week, on rest days or after a fascia session."),
    /* settle the nervous system */
    "stored-stress": g(PM, "ai", [2, 3], "op", 78, "Docs: a few times a week. Suggested for the evening: psoas release and shaking work suit winding down."),
    lajin: g(PM, "ai", [1, 2], "ai", 80, "Docs: for deep tension. Suggested once or twice a week in the evening, when long holds are easier to relax into."),
    vagus: g(["pm", "bed"], "op", null, "op", 82, "Docs: any time stress is high, so no number is set."),
    /* breathe down */
    "oscar-breathwork": g(BED, "op", [2, 3], "op", 90, "Docs: 2 to 3 times a week, ideally before bed."),
    vortex: g(BED, "ai", null, "op", 91, "Docs: an advanced reset to calm the body. Suggested before bed, seated or lying down."),
    "co2-test": g(["am", "bed"], "op", null, "op", 92, "Docs: check occasionally."),
    zygotape: g(BED, "op", [7, 7], "op", 95, "Docs: every night. It is in your before-bed habits.", 1),
    "spiral-walking": g(["am", "pm"], "op", [7, 7], "op", 50, "Docs: every step, every day. It is in your daily habits as the 10,000 steps.", 1),
  };

  ["tongue-tie", "hollow-cheeks", "double-chin", "tmj", "apt", "flat-feet", "knock-knees", "fhp"].forEach((id) => (P.guide[id].c = true));
  const S = P.sched, SL = ["am", "train", "pm", "bed"], N = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], ORD = [1, 2, 3, 4, 5, 6, 0];
  const byId = (id) => (P.routines || []).find((r) => r.id === id);
  const gOf = (id) => { const r = byId(id); return P.guide[id] || (r && r.base && P.guide[r.base]) || null; };
  const rank = (id) => { const x = gOf(id); return x ? x.r : 50; };
  const LONG = { "full-body-release": 1, ultimate: 1, lajin: 1, "stored-stress": 1 }, STRENGTH = { "workout-1": 1, "workout-2": 1, "workout-3": 1, "bone-density": 1 }, SPRINT = { sprints: 1, uphill: 1, "weighted-sprints": 1 };
  const opensWithRelease = (id) => { const r = byId(id); return !!r && typeof r.ex[0] === "string" && /release/i.test(r.ex[0]); };
  S.guideOf = gOf; S.rank = rank;
  /* sort one part of the day into the suggested order; items without guidance keep their place relative to each other */
  /* next to a strength session, long release moves after it (suggested), so the slot reads warm-up, lift, release */
  S.sortSlot = (list) => { const lift = list.some((x) => STRENGTH[x[0]]), rk = (id) => rank(id) + (lift && LONG[id] ? 100 : 0); return list.map((x, i) => [x, i]).sort((a, b) => rk(a[0][0]) - rk(b[0][0]) || a[1] - b[1]).map((x) => x[0]); };
  /* compare the week with the guide. habit(id) says whether a daily habit already covers the routine. */
  S.review = function (ov, habit) {
    const out = { order: [], time: [], freq: [], gym: [], perDay: 0, perDayTarget: 0 };
    let total = 0, strength = 0, sprint = 0;
    ORD.forEach((d) => {
      const pl = this.plan(d, ov);
      SL.forEach((k) => {
        const list = (pl[k] || []).filter((x) => byId(x[0]));
        list.forEach((x, i) => {
          total += +x[1] || 0; if (STRENGTH[x[0]]) strength++; if (SPRINT[x[0]]) sprint++;
          const gd = gOf(x[0]); if (gd && gd.t && gd.t.indexOf(k) < 0) out.time.push({ d, k, rid: x[0], to: gd.t[0], src: gd.ts, why: gd.why });
        });
        const ids = list.map((x) => x[0]), want = S.sortSlot(list).map((x) => x[0]);
        if (ids.join() !== want.join()) out.order.push({ d, k, now: ids, want });
      });
      /* around the gym: release before training (docs), long release after it (suggested) */
      const tr = (pl.train || []).filter((x) => byId(x[0]));
      tr.forEach((x, i) => {
        if (!STRENGTH[x[0]] || opensWithRelease(x[0])) return;
        const before = tr.slice(0, i).some((y) => y[0] === "groundwork" || y[0] === "fascia-activation");
        if (!before) out.gym.push({ kind: "warmup", d, rid: x[0], src: "op", text: `${N[d]}: ${byId(x[0]).name} does not open with release work. The training rules ask for 2 to 3 minutes of fascia hops, bar hangs or ball work first; Groundwork covers it.` });
      });
      const li = tr.findIndex((y) => STRENGTH[y[0]]);
      tr.forEach((x, i) => { if (li > -1 && LONG[x[0]] && i < li) out.gym.push({ kind: "late", d, rid: x[0], src: "ai", text: `${N[d]}: ${byId(x[0]).name} comes before ${byId(tr[li][0]).name}. Suggested after it, so long holds do not take the edge off the lifting.` }); });
    });
    if (strength > 4) out.gym.push({ kind: "limit", src: "op", text: `${strength} weight sessions this week. The training rules say no more than 4.` });
    if (sprint > 4) out.gym.push({ kind: "limit", src: "op", text: `${sprint} sprint sessions this week. The docs say never more than 4.` });
    let extra = 0;
    Object.keys(P.guide).forEach((id) => {
      const gd = P.guide[id], r = byId(id); if (!r || !gd.f) return;
      const placedN = this.count(id, ov), n = gd.h && habit && habit(id) ? Math.max(7, placedN) : placedN;
      if ((n >= gd.f[0] && n <= gd.f[1]) || (gd.c && !n)) return;
      const mins = this.mins(id), to = n < gd.f[0] ? gd.f[0] : gd.f[1];
      extra += (to - n) * mins;
      out.freq.push({ rid: id, n, f: gd.f, src: gd.fs, why: gd.why, mins, delta: to - n });
    });
    out.perDay = Math.round(total / 7); out.perDayTarget = Math.round((total + extra) / 7);
    return out;
  };
})(window.PHH);
