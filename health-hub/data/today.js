/* Primal Health Hub — the one combined daily routine.
   Merged from: OP 1 Ch. I "Daily Routine", Ch. II "Daily Rhythm", Ch. III "Daily Routine", the puberty "Routine",
   sleep / sunlight / posture pages, and OP 2 "Daily Routine" + "Training Week".
   Item: { id, t text, d detail, opt optional (not counted), go routine id, n repeat count, days [0=Sun…6=Sat] } */
(function (P) {
  P.blocks = [
    {
      id: "wake", name: "Wake", span: "First 30 minutes", items: [
        { id: "w-pand", t: "Full-body pandiculation in bed", d: "Inhale and contract everything, exhale and release", go: "pandiculation" },
        { id: "w-sun", t: "Outside within 20–30 min: 10–20 min of morning sun", d: "On skin and eyes, no sunglasses, barefoot on the ground if you can" },
        { id: "w-big6", t: "Quick Lymphatic Reset (Big 6)", d: "≈2 min, rub 10 and tap 10 at each point", go: "big6" },
        { id: "w-tape", t: "Remove Zygotape", d: "Peel in the direction applied. Keep it on through the morning routine if you can", go: "stella-morning" },
        { id: "w-alarm", t: "Woke without an alarm", opt: true },
        { id: "w-digest", t: "Digestion fascia release", d: "If bloated or digestion is slow", opt: true, go: "digestion-release" },
      ],
    },
    {
      id: "morning", name: "Morning session", span: "Longer session one", items: [
        { id: "m-ground", t: "Groundwork", d: "≈5 min: seiza, rocking, deep squat, half-kneel, hops", go: "groundwork" },
        { id: "m-release", t: "Fascia Activation Routine", d: "Swap for the Full Body Release a few times a week", go: "fascia-activation" },
        { id: "m-myo", t: "Myo Routine, finishing with lunge thumbpulling", d: "Or run the full Ultimate Routine. Short on time: Myo only", go: "myo-routine" },
        { id: "m-wall", t: "Wall thumbpulling: front, middle and back palate", d: "Outside in the sun if possible", go: "thumbpulling-daily" },
        { id: "m-carrot", t: "Raw carrot salad", d: "Grated, with apple cider vinegar and coconut oil" },
        { id: "m-breakfast", t: "Breakfast: eggs, raw dairy, grass-fed meat", d: "After training on sprint days" },
        { id: "m-flymph", t: "Facial lymphatic drainage before thumbpulling", opt: true, go: "facial-lymph" },
        { id: "m-face", t: "Stella's morning face routine", d: "Oil massage, zygo pushing, lymph taps, rose water", opt: true, go: "stella-morning" },
      ],
    },
    {
      id: "train", name: "Training", span: "Changes by day", items: [
        { id: "t-w1", t: "Workout 1: Deep Front Line & Superficial Back Line", d: "Release, activate, strengthen", go: "workout-1", days: [1] },
        { id: "t-w2", t: "Workout 2: Superficial Front Line & Lateral Line", d: "Release, activate, strengthen", go: "workout-2", days: [3] },
        { id: "t-w3", t: "Workout 3: Spiral Line & Core Control", d: "Release, activate, strengthen", go: "workout-3", days: [5] },
        { id: "t-sprint", t: "Fasted morning sprints: 4–5 × 100 m", d: "Maximal effort, 2–3 min rest, natural ground, barefoot if possible", go: "sprints", days: [2, 4] },
        { id: "t-bone", t: "Bone density: farmers carries, macebell swings, box jumps or other plyometrics", go: "bone-density", days: [6] },
        { id: "t-tendon", t: "Tendon isometrics for any areas under load", go: "tendon", days: [6] },
        { id: "t-rec1", t: "Full body fascia release with the fascial ball", go: "full-body-release", days: [0] },
        { id: "t-rec2", t: "Bar hang pandiculation", go: "pandiculation", days: [0] },
        { id: "t-rec3", t: "Barefoot grounding outside, 30 min minimum", d: "No structured training today", days: [0] },
        { id: "t-carbs", t: "Carbs after training: fruit, raw honey, raw dairy", days: [1, 2, 3, 4, 5, 6] },
        { id: "t-vitc", t: "Whole-food vitamin C 30 min before training", opt: true, days: [1, 2, 3, 4, 5, 6] },
      ],
    },
    {
      id: "day", name: "Through the day", span: "Between sessions", items: [
        { id: "d-thumb", t: "Thumbpulling, 2–3 min every 1–2 hours", d: "Four sessions minimum", n: 4, go: "thumbpulling-daily" },
        { id: "d-rotate", t: "One extra session of your choice", d: "Breathwork, lymph drainage, tongue-tie release, Midday Reset or face exercises: whichever your body responds to", go: "midday-reset" },
        { id: "d-mastic", t: "Mastic gum, 5–10 min", d: "Masseter drives, both sides evenly", go: "hollow-cheeks" },
        { id: "d-steps", t: "Walk 10,000 steps outdoors", d: "Spiral gait, tongue on the palate", go: "spiral-walking" },
        { id: "d-midsun", t: "Midday sun, 20–45 min", d: "As much skin as is comfortable; shade if it tingles" },
        { id: "d-barefoot", t: "Barefoot on grass, sand or soil", d: "A few minutes, ideally with your sun" },
        { id: "d-hang", t: "Bar hang, 30–60 s", go: "pandiculation" },
        { id: "d-broth", t: "Bone broth" },
        { id: "d-ground", t: "Groundwork reset between long sits", opt: true, go: "groundwork" },
        { id: "d-airofit", t: "Airofit, 5–10 min at F-6", opt: true, go: "airofit" },
        { id: "d-froggy", t: "Froggy Mouth or Myobrace, 30 min", opt: true, go: "froggy" },
        { id: "d-scalp", t: "Scalp massage, 5 min", opt: true },
        { id: "d-pom", t: "Pomegranate juice, 300 ml", opt: true },
        { id: "d-nettle", t: "Nettle tea", opt: true },
      ],
    },
    {
      id: "evening", name: "Evening", span: "Longer session two", items: [
        { id: "e-session", t: "Fascia release + Myo session or the Fasciapulling routine", d: "Stella's thumbpulling routine fits here", go: "ultimate" },
        { id: "e-dinner", t: "Dinner: ancestral plate, finished 3 hours before bed", d: "Organ meats 2–3 times a week" },
        { id: "e-sunset", t: "Outside at sunset" },
        { id: "e-blue", t: "Blue-light blockers on after sundown", d: "Screens off 60–90 min before bed" },
        { id: "e-mag", t: "Liquid nano magnesium" },
        { id: "e-tea", t: "Chamomile tea with raw honey" },
      ],
    },
    {
      id: "bed", name: "Bed", span: "Asleep before 11 pm", items: [
        { id: "b-oil", t: "Facial oil about 40 min before taping" },
        { id: "b-breath", t: "A few minutes of breathwork", d: "Oscar's Buteyko + Vortex routine 2–3 nights a week", go: "oscar-breathwork" },
        { id: "b-tape", t: "Zygotape on: cheeks and chin X", d: "Full set adds forehead, nose and eyes", go: "zygotape" },
        { id: "b-wifi", t: "WiFi off, phone away from the bed" },
        { id: "b-room", t: "Room fully dark, cool and quiet", d: "Same bedtime as yesterday" },
        { id: "b-side", t: "Side sleep: feet crossed, tongue up, hips back, head slightly forward" },
        { id: "b-digest", t: "Digestion fascia release before sleep", opt: true, go: "digestion-release" },
        { id: "b-brace", t: "Myobrace overnight", opt: true, go: "myobrace" },
      ],
    },
  ];

  P.dayFocus = ["Recovery", "Strength: Workout 1", "Sprint and walk", "Strength: Workout 2", "Sprint and walk", "Strength: Workout 3", "Bone density and tendons"];

  P.habits = [
    "Tongue suctioned to the hard palate",
    "Breathe backward, through the nose",
    "Hips back, head slightly forward, shoulders loose",
    "Chew with the masseter, slowly",
    "Swallow with a still face",
    "Seiza or kneeling chair, not a standard chair",
    "Phone at eye level; phone down at meals and first thing",
    "Barefoot or wide flat shoes; big toe down, arch up",
    "Three anchor points in every exercise: tongue, wrists, feet",
  ];

  P.weekly = [
    { id: "wk-fast", t: "24–36 hour fast", n: 1 },
    { id: "wk-organ", t: "Liver or heart", n: 3, range: "2–3×" },
    { id: "wk-strength", t: "Strength and fascia workouts", n: 3 },
    { id: "wk-sprint", t: "Sprint sessions", n: 2, range: "2–3×, never more than 4" },
    { id: "wk-breath", t: "Oscar's breathwork before bed", n: 3, range: "2–3×", go: "oscar-breathwork" },
    { id: "wk-release", t: "Full body release + full lymph drainage", n: 3, range: "a few times", go: "full-body-release" },
    { id: "wk-bone", t: "Bone density protocol", n: 2, range: "2–3×", go: "bone-density" },
    { id: "wk-tendon", t: "Tendon protocol", n: 2, range: "2–3×", go: "tendon" },
  ];

  P.monthly = [
    { id: "mo-photos", t: "Progress photos: palate, front, side, posture" },
    { id: "mo-palate", t: "Palate measurement between first molars (optional)" },
  ];
})(window.PHH);
