/* Primal Health Hub — what each routine and exercise works, and how the week covers it.
   The area tags are Claude's reading of the exercise names (src "ai", shown as Suggested); the OP docs do not tag them.
   The default weighting of each area comes from how often the OP docs ask for the routines that work it
   (daily = high, a few times a week = normal, less = low); where no docs number exists it is marked Suggested.
   The owner can change any tag (S.atag) and any weighting (S.aw) in the hub. Nothing here is a health claim. */
(function (P) {
  P.areas = [
    { id: "feet", n: "Feet", does: "Arches, toes and the small muscles of the foot" },
    { id: "calves", n: "Calves", does: "Calves, ankles and the spring in each step" },
    { id: "hips", n: "Hips and psoas", does: "Hips, glutes, psoas, quads and hamstrings" },
    { id: "spine", n: "Spine and back", does: "Back, ribcage, rotation and posture" },
    { id: "chest", n: "Chest and shoulders", does: "Chest, shoulders, arms and grip" },
    { id: "neck", n: "Neck", does: "Neck, SCM, base of the skull and under the chin" },
    { id: "jaw", n: "Jaw", does: "Masseter, temporalis, TMJ and chewing" },
    { id: "tongue", n: "Tongue and palate", does: "Tongue posture, the palate and swallowing" },
    { id: "face", n: "Face", does: "Cheeks, zygomatic area and facial fascia" },
    { id: "breath", n: "Breath", does: "Nasal and slow breathing practice" },
    { id: "lymph", n: "Lymph", does: "Drainage strokes and lymph points" },
    { id: "nerves", n: "Nervous system", does: "Settling and down-regulating work" },
    { id: "strength", n: "Strength", does: "Loaded lifts and holds" },
    { id: "power", n: "Power", does: "Sprints, jumps, swings and throws" },
  ];
  /* exercise name → areas; a routine works the union of its exercises plus P.areaAdd */
  const RX = {
    feet: /\bfoot\b|feet|towel scrunch|marble|toes|slant ?board|balance board|barefoot|tiptoe|footwear/,
    calves: /calf|calves|tiptoe|hops\b|jump|bounds|rope|sprint/,
    hips: /psoas|glute|\bhip|quad|hamstring|lunge|squat|child (rock|pose)|seiza(?! breath)|half-kneel|rocking|deadlift|inguinal|groin|static back|dead bug|leg stretch|outer hip/,
    spine: /spine|back extension|\brow\b|deadlift|ribcage|crawl|bar hang|latissimus|middle & lower trap|static back|spiral|twist|rotation|turkish|side plank|oblique|posture/,
    chest: /chest|pec|shoulder|overhead|push-up|dips|pull-up|latissimus|rotator|handstand|wall hold|arm transfer|axillary|armpit|bicep|tricep|wrist|cable pull|clavicle|sternum|thumb twisting|farmers/,
    neck: /neck|\bscm\b|platysma|suboccipital|skull|trapezius|hyoid|digastric|ceiling kiss|collarbone|behind the ears|back of the head/,
    jaw: /jaw|masseter|tmj|temporalis|chew|buccinator|mastic|incisor/,
    tongue: /tongue|palate|frenulum|t-spot|thumbpull|swallow|papilla|crescent|sphere|lip tie|cheek tie/,
    face: /face|facial|cheek|zygo|maxilla|forehead|nose|eyes|gua sha|button hold|thumb suck|temples|ceiling kiss|chin/,
    breath: /breath|buteyko|vortex|nasal|airofit|co₂|4 in/,
    lymph: /lymph|drain|collarbone|axillary|abdomen|inguinal|popliteal|rebound|clavicle|under the jaw|behind the (jaw|ears)|zygopushing|zygo pushing/,
    nerves: /pandiculat|vagus|\btre\b|cold face|gargl|sunlight|stored stress|seiza breath/,
    strength: /pull-ups|deadlift|barbell|curls?\b|dips|press|push-ups|hip thrust|farmers|side plank|turkish|cable|nordic|back extensions|dead bugs|resisted|isometric|banded squat|romanian/,
    power: /sprint|jump|bounds|swings|slam|throw|box/,
  };
  /* areas a routine works as a whole that its exercise names do not show */
  P.areaAdd = {
    "oscar-breathwork": ["nerves"], vortex: ["nerves"], "short-breaths": ["nerves"], "co2-test": ["breath"], "backward-breathing": ["breath"],
    "stored-stress": ["nerves", "hips"], lajin: ["nerves"], groundwork: ["feet"], "core-habits": ["tongue", "breath"], zygotape: ["face"],
    myobrace: ["tongue", "jaw"], airofit: ["breath"], froggy: ["face", "tongue"], "spiral-walking": ["feet", "spine"], walk: ["feet", "calves"],
    "thumbpulling-daily": ["face"], "double-chin": ["neck"], "posture-positions": ["spine"], endpoints: ["tongue", "feet", "chest"],
    sprints: ["power", "calves", "hips"], uphill: ["power", "calves", "hips"], "weighted-sprints": ["power", "calves", "hips"],
    tendon: ["strength", "chest"], "bone-density": ["strength", "power"],
    /* whole-body routines: their main areas, read from where most of their steps go */
    "fascia-activation": ["feet", "calves", "hips"], "full-body-release": ["hips", "spine", "chest", "neck"], "full-lymph": ["lymph"], "lymph-when": ["lymph"],
    "stella-morning": ["lymph"], "workout-2": ["chest"], fhp: ["spine"], ultimate: ["jaw"],
  };
  const exName = (e) => (Array.isArray(e) ? ((P.X || {})[e[0]] || { n: e[0] }).n : e.n);
  const IDS = P.areas.map((a) => a.id);
  P.exAreas = (name) => { const s = String(name || "").toLowerCase(); return IDS.filter((a) => RX[a].test(s)); };
  /* the supplied tags of one routine: the areas at least a quarter of its exercises work (its main areas), plus P.areaAdd.
     A long routine touches nearly everything, so counting every passing touch would make every area look covered. The hub layers S.atag over this. */
  P.rtShare = (r) => { const n = {}, ex = (r && r.ex || []).filter((e) => typeof e !== "string"); ex.forEach((e) => P.exAreas(exName(e)).forEach((a) => (n[a] = (n[a] || 0) + 1))); Object.keys(n).forEach((a) => (n[a] /= ex.length)); return n; };
  P.rtAreas = (r) => { if (!r) return []; const sh = P.rtShare(r), add = P.areaAdd[r.base || r.id] || []; return IDS.filter((a) => add.indexOf(a) > -1 || sh[a] >= 0.25); };

  /* weighting: the days a week an area should get, 0 to 7. 1 reads as low, 2–4 normal, 5–7 high.
     Default: the highest weekly number the guide gives any routine whose main areas include the area (fixes for a specific problem left out).
     Strength and power add up their sessions instead, capped at 4, because the docs' training rules allow at most 4 weight and 4 sprint sessions a week.
     Marked "op" only when the number used is from the docs. */
  const SUM = { strength: 4, power: 4 };
  P.areaLevel = (n) => (!n ? "Off" : n <= 1 ? "Low" : n <= 4 ? "Normal" : "High");
  P.areaWeight = (function () {
    const out = {};
    IDS.forEach((a) => {
      let n = 0, src = "ai";
      (P.routines || []).forEach((r) => { const g = (P.guide || {})[r.id]; if (!g || !g.f || g.c || P.rtAreas(r).indexOf(a) < 0) return; const f = g.f[0];
        if (SUM[a]) { n += f; src = g.fs === "op" && (n === f || src === "op") ? "op" : "ai"; } else if (f > n || (f === n && g.fs === "op")) { n = f; src = g.fs; } });
      out[a] = { days: Math.max(1, Math.min(SUM[a] || 7, n)), src: n ? src : "ai" };
    });
    return out;
  })();

  /* how the week covers each area. areasOf(rid) → areas, keep(rid) → counted (the lens), weights { area: days a week 0..7 }.
     Daily habits in P.blocks count every day they run. Returns { rows, spread, twice }. */
  P.sched.cover = function (ov, areasOf, weights, keep, pinned) {
    const byId = {}; (P.routines || []).forEach((r) => (byId[r.id] = r));
    const SL = ["am", "train", "pm", "bed"], ORD = [1, 2, 3, 4, 5, 6, 0], ok = (rid) => byId[rid] && (!keep || keep(rid));
    const HARD = /^(workout-\d|bone-density|sprints|uphill|weighted-sprints)$/;
    const days = {}, mins = {}; /* days[d] = [{ rid, k, i, habit }] */
    ORD.forEach((d) => {
      const pl = this.plan(d, ov); days[d] = []; mins[d] = 0;
      SL.forEach((k) => (pl[k] || []).forEach((s, i) => { if (!byId[s[0]]) return; mins[d] += +s[1] || 0; if (ok(s[0])) days[d].push({ rid: s[0], k, i, min: +s[1] || 0 }); }));
      (P.blocks || []).forEach((b) => b.items.forEach((it) => { if (it.go && !it.opt && ok(it.go) && (!it.days || it.days.indexOf(d) > -1) && !days[d].some((x) => x.rid === it.go)) days[d].push({ rid: it.go, habit: 1 }); }));
    });
    const hit = (d, a) => days[d].filter((x) => areasOf(x.rid).indexOf(a) > -1);
    const rows = IDS.map((a) => {
      const w = +weights[a] || 0, want = w, per = ORD.map((d) => hit(d, a).length), n = per.filter(Boolean).length;
      return { a, w, want, per, days: n, sessions: per.reduce((x, y) => x + y, 0), state: !w ? "off" : n < want ? "under" : n > want ? "over" : "ok", doubled: per.filter((c) => c > 1).length };
    });
    /* spread: a routine on a day where its area is already doubled, moved to the quietest day that has none of it.
       Only movable routines: not strength or sprints, not daily habits, not something the guide wants daily. */
    const spread = [], used = {};
    rows.filter((r) => r.w && r.days < 7 && r.per.some((c) => c > 1)).sort((x, y) => y.w - x.w || x.days / (x.want || 1) - y.days / (y.want || 1)).forEach((row) => {
      let best = null;
      ORD.forEach((d) => {
        const here = hit(d, row.a); if (here.length < 2) return;
        here.forEach((x) => {
          const g = (P.guide || {})[x.rid]; if (x.habit || HARD.test(x.rid) || used[d + x.rid] || (g && g.f && g.f[0] >= 7) || (pinned && pinned(d, x.k, x.rid))) return;
          const ar = areasOf(x.rid);
          ORD.forEach((t) => {
            if (t === d || days[t].some((y) => y.rid === x.rid) || hit(t, row.a).length) return;
            /* what the move gains (areas the target day lacks) and loses (areas only this routine covers on its day), by weight */
            const gain = ar.filter((b) => weights[b] && !hit(t, b).length), lose = ar.filter((b) => weights[b] && hit(d, b).length === 1);
            const score = gain.reduce((s, b) => s + weights[b], 0) - lose.reduce((s, b) => s + weights[b], 0) * 2;
            if (score > 0 && (!best || score > best.score || (score === best.score && mins[t] < mins[best.to]))) best = { a: row.a, rid: x.rid, d, k: x.k, to: t, gain, lose, score, min: x.min };
          });
        });
      });
      if (best) { used[best.d + best.rid] = 1; spread.push(best); }
    });
    /* the same exercise in two routines on the same day */
    const twice = [];
    ORD.forEach((d) => { const seen = {}; days[d].forEach((x) => { const r = byId[x.rid]; [...new Set((r.ex || []).filter((e) => typeof e !== "string").map(exName))].forEach((n) => (seen[n] = (seen[n] || []).concat([x.rid]))); }); Object.keys(seen).forEach((n) => { const l = [...new Set(seen[n])]; if (l.length > 1) twice.push({ d, n, rids: l }); }); });
    return { rows, spread, twice, mins };
  };
})(window.PHH);
