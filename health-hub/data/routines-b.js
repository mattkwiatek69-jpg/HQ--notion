/* Primal Health Hub — routines, part B: sprints & walking, gym & strength, posture correction, nervous system.
   Source: OP 1 + OP 2. Same entry format as routines-a.js. */
(function (P) {
  P.routines.push(
    /* ───────────── SPRINTS & WALKING ───────────── */
    {
      id: "sprints", cat: "sprint", name: "Sprint Session", when: "Tue & Thu morning, fasted · 2–3 times a week", dur: "≈20 min",
      note: "Barefoot or in barefoot shoes where possible.",
      ex: [
        { n: "Set up", s: ["Find natural ground: grass, dirt or sand", "Warm up with 5–10 minutes of light movement"] },
        { n: "Sprints", d: "4–5 × 100 m or 20 s", s: ["Maximal effort", "Rest 2–3 minutes between sprints, full recovery", "Knee tracks slightly outward, toes don't flare"] },
        { n: "After", s: ["Clean carbs: fruit, raw honey, raw dairy"] },
      ],
      tips: ["Never more than 4 sprint sessions a week", "Flat feet or still building the pattern: 2–3 × 100 m, twice a week"],
    },
    {
      id: "uphill", cat: "sprint", name: "Uphill Sprints", when: "Bonus variation", dur: "≈15 min",
      ex: [
        { n: "Uphill sprints", d: "4 × ≈100 m", s: ["Moderate grass hill", "Stay on the balls of your feet", "Toes slightly inward, knees tracking outward", "Drive the ground backward", "Full recovery between each"] },
      ],
    },
    {
      id: "weighted-sprints", cat: "sprint", name: "Fasted Weighted Sprints (Height Spike)", when: "2× per week · sleep and recovery come first", dur: "≈35 min",
      note: "From the puberty protocol. Follow with the IGF-1 Igniter meal (Nutrition → Recipes).",
      ex: [
        { n: "Weighted sprints", d: "6–8 sprints · 15–20 s / 100 m", s: ["Weighted vest or ankle weights", "Ideally fasted", "Rest 3–4 minutes between sets"] },
      ],
    },
    {
      id: "walk", cat: "sprint", name: "Daily Walk", when: "Every day, regardless of training", dur: "10,000 steps",
      ex: [
        { n: "10,000 steps, outdoors", s: ["Use spiral walking mechanics (Posture → Spiral Walking)", "Tongue on the palate while you walk", "Barefoot or wide, flat shoes"] },
        { n: "Why not steady-state cardio", s: ["Sprint + walk replaces it; skip long steady cardio"] },
      ],
    },

    /* ───────────── GYM & STRENGTH ───────────── */
    {
      id: "gym-rules", cat: "gym", name: "Training Rules", when: "Every session", dur: "",
      ex: [
        { n: "Mew-Lift Method", s: ["Mew on every exercise", "On as many lifts as possible: chin tuck and hard mew together, squeezing neck and cranium muscles"] },
        { n: "Three anchor points, all at once", s: ["Tongue suctioned to the palate", "Wrists contracted", "Anterior tibial tendon engaged: press through the big toe and lift the arch"] },
        { n: "Seven principles", s: ["Release fascia first: 2–3 min of fascia hops, bar hang pandiculation or ball work", "High intensity: stay 1–2 reps from failure", "Short rest periods", "Low volume: maximum 12 sets per muscle group per week", "Rep quality over load and speed", "Progressive overload: more reps, better form, better tempo or more weight each session", "Dynamic stability: rotational, lateral and spiral movement, not only up and down"] },
        { n: "Weekly limits", s: ["Weights no more than 4× a week", "Sprints no more than 4× a week", "Two to three strength sessions is the plan", "Balance push with pull"] },
        { n: "Around training", s: ["Protein 1–1.5 g per pound of bodyweight daily", "7–9 hours of sleep", "Carbs after training: fruit, raw honey or raw dairy", "Vitamin C from whole food 30 min before training (tendons)", "Fascial ball 2–3 min per loaded tendon area before and after"] },
        { n: "For women", s: ["Stop 2–3 reps from failure", "Reduce volume in the second half of the cycle (luteal phase)"] },
        { n: "Five movement patterns", s: ["Push: presses (front line)", "Pull: rows, pull-ups, chin-ups (back line)", "Hinge: RDLs, single-leg RDLs, back extensions", "Squat: split, pistol, sissy squats; slow eccentric", "Carry: farmers carries, Reeves deadlift", "Rotation: macebell swings, cable chops, landmine presses, rotational slams", "Anti-rotation: Pallof press, single-arm carries, plank variations"] },
      ],
    },
    {
      id: "workout-1", cat: "gym", name: "Workout 1: Deep Front Line & Superficial Back Line", when: "Monday", dur: "≈50 min",
      note: "Back-breathe and apply the Mew-Lift method.",
      ex: [
        "#Release",
        { n: "Foam Roll Calves and Hamstrings", d: "1 min per side", s: ["Roller under the leg, slow passes ankle to glute", "Pause 5–10 s on dense or tender areas"] },
        { n: "Foot Release", d: "1 min per foot", s: ["Stand on a fascial ball", "Sustained pressure into tight spots along the arch; hold rather than roll quickly"] },
        ["barhang", "2 sets of 30–60 s"],
        "#Activate",
        ["hops", "30 s"],
        ["childrock", "10 reps per side"],
        ["marble", "2 min per side"],
        "#Strengthen",
        { n: "Weighted Pull-ups", d: "2 sets: 1×5–7, 1×8–10", s: ["Hands slightly wider than shoulders, palms away", "Chin above the bar, no swinging", "Lower with control", "Add weight by dip belt or vest; assisted if needed"] },
        { n: "Reeves Deadlift Hold", d: "3 holds, as long as possible", s: ["Barbell loaded with plates you can grip by the edges", "Grip the plate edges, arms straight and wide", "Chest up, thoracic spine extended", "Hold standing upright; rest fully between sets"] },
        { n: "Barbell Row", d: "3 × 6–8", s: ["Hinge at the hips, flat back", "Pull to lower ribs or upper abs", "Core tight, lower with control"] },
        { n: "Nordic Hamstring Curls", d: "3 × 6–8", s: ["Lower as slowly as possible", "Catch with your hands if needed"] },
        { n: "Hip Thrust on Tiptoes", d: "3 × 10–12", s: ["Upper back on a bench, feet flat", "Drive through the feet to thrust the hips up", "At the top rise onto tiptoes and squeeze the glutes hard", "Hold briefly, lower with control"] },
      ],
    },
    {
      id: "workout-2", cat: "gym", name: "Workout 2: Superficial Front Line & Lateral Line", when: "Wednesday", dur: "≈50 min",
      ex: [
        "#Release",
        ["quadrel", "1 min per side"],
        { n: "Outer Hip Release", d: "1 min per side", s: ["Lie on your side, fascial ball under the outer hip", "Sustained pressure into glute med and piriformis", "Rotate the hip slowly to find restriction"] },
        ["barhang", "2 sets of 30–60 s"],
        "#Activate",
        ["hops", "30 s"],
        { n: "Child Pose into Lunge", d: "10 reps per side", s: ["Flow from child pose into a lunge and back"] },
        { n: "Calf Raise on Tiptoe", d: "30 reps", s: ["Barefoot, rise slowly onto tiptoes pressing through the big toe", "Feel tension travel up the shin into the quad", "Don't let weight shift to the outer foot"] },
        ["towel", "20 reps per foot"],
        "#Strengthen",
        { n: "Weighted Dips", d: "2 sets: 1×5–7, 1×8–10", s: ["Parallel bars, arms straight, slight forward lean", "Lower until upper arms are parallel to the ground", "Press back up; add weight as you progress"] },
        { n: "Overhead Press", d: "3 × 10–12", s: ["Bar or dumbbells at shoulder height, palms forward, tendon engaged", "Brace the core fully", "Press overhead, wrists stacked over elbows, exhaling", "Chin tucked, no lower-back arch", "Lower with control, inhaling"] },
        { n: "Push-ups on Fingertips", d: "3 × 10–15", s: ["Plank on fingertips, wrists extended, fingers spread", "Chest nearly to the ground, press up", "Fewer reps if form breaks"] },
        { n: "Deep Squat Hold", d: "2 sets, close to 1 min", s: ["Feet straight, heels down", "Relax hips and spine completely", "Sink deeper with each exhale"] },
        { n: "Slantboard Lateral Lunges", d: "3 × 10 per side", s: ["Front foot on the slant board, turned slightly outward", "Step to the side and lower, knee travelling over the toes", "Torso upright, tendon active", "Drive back up through the front foot"] },
        { n: "Side Plank", d: "2 × 60 s per side", s: ["Feet stacked, elbow under the shoulder", "Straight line head to feet", "Top hip pushed forward to stop rotation"] },
      ],
    },
    {
      id: "workout-3", cat: "gym", name: "Workout 3: Spiral Line & Core Control", when: "Friday", dur: "≈45 min",
      ex: [
        "#Release",
        ["cheststretch", "1 min"],
        ["midtrap", "1 min per side"],
        ["barhang", "2 sets of 30–60 s"],
        "#Activate",
        ["hops", "30 s"],
        ["mace", "3 × 10–15 swings per direction"],
        ["marble", "On a slant board · 2 min per side"],
        "#Strengthen",
        { n: "Cable Pull to Push", d: "3 × 10 per side (8–10 to start, light)", s: ["Cable at low to mid height", "Base position: front foot toes slightly inward, knee over foot, back foot on the ball", "Pull the cable toward the body", "Without stopping, flow into a push, one continuous arc", "Neck straight, bum tucked, abs on", "Tongue up, tendon active on both feet"] },
        { n: "Rotating Medicine Ball Lunge", d: "3 × 10–12 per side", s: ["Lunge, both feet straight, back heel flicking slightly out", "Light medicine ball, arms as straight as possible", "Rotate the ball slowly side to side in a full arc, like a tennis backhand", "Tongue up, tendon active, breathe backward", "As light as possible: feel, not load"] },
        { n: "Half Kneeling Cable Rotation", d: "2 × 10 per side", s: ["One knee down, side-on to the cable", "Handle in both hands at chest height", "Hips square; rotate through the thoracic spine only", "Control the return"] },
        { n: "Turkish Get Up", d: "Optional · 2 × 3–5 per side", s: ["On your back, kettlebell extended over the shoulder", "Drive through the opposite hand and foot to seated", "Push into a lunge, then stand", "Reverse the steps, controlling the bell"] },
      ],
    },
    {
      id: "exercise-extra", cat: "gym", name: "Exercise Library: Extras", when: "Swap-ins from the movement guide", dur: "",
      ex: [
        { n: "Reverse Lunge with Rotation", s: ["Hold a medicine ball or weight in both hands", "Step back into a lunge", "Rotate the torso toward the lead leg", "Return and repeat on the other leg"] },
        { n: "Marble Carry with Slantboard", s: ["Standard marble carry, standing foot on the slant board"] },
        { n: "On every exercise", s: ["Three anchor points active: tongue on palate, wrists contracted, anterior tibial tendon engaged"] },
      ],
    },
    {
      id: "bone-density", cat: "gym", name: "Bone Density Protocol", when: "2–3× a week on top of training · Saturday focus", dur: "≈40 min",
      ex: [
        { n: "Sprints", d: "4–5 × 100 m, full recovery", s: ["See Sprint Session"], go: "sprints" },
        { n: "Heavy Farmers Carries", d: "4 × 30 s · rest 60–90 s", s: ["Heaviest dumbbells or kettlebells you can hold with good posture", "Stand tall, shoulders retracted, core braced", "Walk 30 seconds; you should be unable to continue after"] },
        { n: "Reeves Deadlift", d: "3 × 6–8", s: ["Grip the plate edges, arms straight and wide", "Chest up, thoracic spine extended", "Hinge at the hips and lower", "4-second eccentric on the way down", "Drive through the feet, squeeze the glutes at the top"] },
        "#Plyometrics: pick one or two",
        { n: "Box Jumps", d: "3 × 5–6", s: ["Start with a low box, increase progressively", "Drive through the big toe, tendon active", "Soft, controlled landing"] },
        { n: "Single Leg Bounds", d: "3 × 5 per leg", s: ["Push off one leg explosively", "Land on the opposite leg and bound again immediately"] },
        { n: "Jump Rope", d: "3 rounds of 2–3 min · rest 60 s", s: ["Lower-impact entry point", "Jump continuously"] },
        { n: "Macebell Swings", d: "4 × 12 per side", s: ["Full controlled arc"] },
      ],
    },
    {
      id: "tendon", cat: "gym", name: "Tendon Training Protocol", when: "2–3× a week on rest days or after a fascia session", dur: "≈20 min",
      note: "Pick the joints that matter to you. Order per joint: isometric, slow eccentric, then plyometric. Add plyometrics only after 2–3 weeks of the first two.",
      ex: [
        "#Wrists and forearms",
        { n: "Wrist Holds (isometric)", d: "30–60 s · 2 sets each side", s: ["Light dumbbell, wrist flexed or extended", "Palm up and palm down"] },
        { n: "Slow Wrist Curls (eccentric)", d: "10–12 reps · 2 sets", s: ["Curl up, lower over 3–5 seconds", "Palm up and palm down"] },
        { n: "Ball Slams (plyometric)", d: "5–8 reps · 2 sets", s: ["Light slam ball, raise overhead and slam explosively"] },
        "#Elbows",
        { n: "Resisted Bicep and Tricep Holds (isometric)", d: "30–60 s · 2 sets", s: ["Band or cable", "90° for biceps, near lockout for triceps"] },
        { n: "Slow Curls and Tricep Extensions (eccentric)", d: "10–12 reps · 2 sets", s: ["3–5 seconds down"] },
        { n: "Overhead Medicine Ball Throws (plyometric)", d: "5–8 reps · 2 sets", s: ["Light ball, throw overhead or against a wall"] },
        "#Shoulders",
        { n: "Wall Hold or Handstand Hold (isometric)", d: "20–60 s · 2 sets", s: ["Press against a wall in a static push-up or handstand position"] },
        { n: "Rotator Cuff Band Rotations (eccentric)", d: "10–12 reps · 2 sets", s: ["Internal and external rotation", "3–5 second lowering phase"] },
        { n: "Explosive Push-ups (plyometric)", d: "5–8 reps · 2 sets", s: ["Hands leave the ground at the top, land softly"] },
        "#Knees",
        { n: "Wall Sit and Leg Extension Hold (isometric)", d: "2–3 sets each", s: ["Wall sit, thighs parallel: 30–60 s", "Leg extension hold on a machine: 10–20 s"] },
        { n: "Single Leg Squat Descent (eccentric)", d: "6–10 reps · 2 sets each side", s: ["Lower over 3–5 seconds, support if needed"] },
        { n: "Box Jumps (plyometric)", d: "3–5 jumps · 2–3 sets", s: ["Start low, land softly, raise the height over time"] },
        "#Achilles",
        { n: "Calf Raise Hold (isometric)", d: "20–60 s · 2–3 sets", s: ["On the balls of your feet; add weight over time"] },
        { n: "Heel Drops off a Step (eccentric)", d: "10–12 reps · 2–3 sets", s: ["Heels off the edge, lower over 3–5 seconds"] },
        { n: "High Skips and Sprint Drills (plyometric)", d: "10–20 s · 3 rounds", s: ["Short explosive bursts, quick push-off"] },
        "#Tissue care",
        { n: "Fascia release around loaded tendons", d: "2–3 min per area, before and after training", s: ["Calf and Achilles for the lower body", "Forearm and elbow for the upper body", "Posterior shoulder for the rotator cuff"] },
      ],
    },
    {
      id: "week", cat: "gym", name: "Training Week", when: "Weekly plan", dur: "",
      ex: [
        { n: "Monday, Wednesday, Friday: strength and fascia", s: ["Workouts 1, 2 and 3"] },
        { n: "Tuesday, Thursday: sprint and walk", s: ["Fasted morning sprints: 4–5 maximal 100 m, full recovery", "10,000 steps"] },
        { n: "Saturday: bone density and tendons", s: ["Farmers carries, macebell swings, box jumps or other plyometrics", "Tendon isometrics for any areas under load"] },
        { n: "Sunday: recovery", s: ["Full body fascia release with the fascial ball", "Bar hang pandiculation", "Barefoot grounding outside, 30 minutes minimum", "No structured training"] },
        { n: "Once a week", s: ["One 24–36 hour fast, full maintenance on other days"] },
      ],
    },

    /* ───────────── POSTURE ───────────── */
    {
      id: "posture-positions", cat: "posture", name: "Posterior-Chain Positions", when: "Between sessions, all day", dur: "Always on",
      ex: [
        { n: "Standing", s: ["Hips slightly back, never tucked under", "Weight through heels and midfoot, not the toes", "Let shoulders settle back and down by breathing backward; don't force the blades together"] },
        { n: "Sitting", s: ["Avoid a standard chair where you can", "Kneeling chair, seiza, or a small seiza bench at a coffee table", "On a sofa: one leg up, keep glutes and spine engaged"] },
        { n: "Eating", s: ["Eat in seiza, or at least hips back rather than hunched over the plate"] },
        { n: "Sleeping", s: ["On your side, on a firm surface: futon or floor", "Feet crossed, shoulder back, tongue up, hips back, head slightly forward"] },
        { n: "Footwear", s: ["Barefoot when you reasonably can", "Otherwise flat, minimal, wide-toe-box shoes", "No cushioned soles or raised heels"] },
        { n: "Phone", s: ["Bring it up to eye level instead of dropping your head"] },
      ],
    },
    {
      id: "spiral-walking", cat: "posture", name: "Spiral Walking", when: "Every step", dur: "Always on",
      note: "Picture a tiger or leopard moving.",
      ex: [
        { n: "The sequence", s: ["Heel touches first: light, deliberate, not a stomp", "Weight transfers into the midfoot; the arch loads like a spring", "Toes land a few degrees inward; the anterior tibial tendon starts to activate", "Knee points slightly outward, a subtle bow from foot to hip. Never let the knee cave in", "Big toe presses down, arch lifts", "Activation travels into hamstring and glute", "Pelvis stays neutral as the legs extend", "Back heel flicks outward as the foot lifts; big toe is the last point of contact"] },
        { n: "Through the day", s: ["Walk barefoot as much as you reasonably can", "Sitting: press the big toe down and lift the arch, hold as long as you like", "Sitting: hold a marble between big and second toe with the arch lifted", "Tongue on the palate while you walk"] },
      ],
    },
    {
      id: "walking-routine", cat: "posture", name: "Walking Biomechanics Routine", when: "After a fascia release or groundwork", dur: "≈15 min",
      ex: [
        ["towel", "2 min per foot"],
        ["marble", "2 min per leg"],
        { n: "Balance Board Hold", d: "Optional · 30–60 s", s: ["Barefoot, feet hip-width, toes slightly inward", "Tongue suctioned", "Big toe down, arch lifted, toes spread", "Knee gently bowed outward"] },
        { n: "Backward Walking", d: "2 min, barefoot", s: ["Slow and controlled", "Toes facing forward, light on your feet", "Arch lifted, knees aligned"] },
        { n: "Barefoot Sprints", d: "3–4 × 100 m · twice a week", s: ["Natural ground", "Warm up 5–10 minutes", "Rest 2–3 minutes between sprints"], go: "sprints" },
      ],
    },
    {
      id: "apt", cat: "posture", name: "Anterior Pelvic Tilt: The Oscar Protocol", when: "Daily", dur: "15–20 min",
      ex: [
        "#Release",
        ["barhang", "2 min", ["Hang completely passive, lower back fully relaxed"]],
        { n: "Static Back", d: "2 min", s: ["On your back, legs up on a chair or sofa, hips and knees at 90°", "Arms 45° from the body, palms up", "Breathe slowly into the abdomen", "Let the lower back settle toward the floor"] },
        ["childrock", "60–90 s"],
        ["psoas", "60–90 s per side"],
        "#Activate",
        { n: "Dead Bugs", d: "2 × 10", s: ["On your back, arms straight up, knees at 90°", "Lower back pressed flat the whole time", "Slowly extend opposite arm and leg", "Return and alternate; add weights if you like"] },
        "#Strengthen",
        { n: "Single Leg Romanian Deadlift", d: "3 × 8–10 per side", s: ["One foot, slight knee bend, toes slightly inward, tendon active", "Hinge at the hip, other leg back", "Spine neutral, standing knee slightly outward", "Lower to hamstring tension, drive the hip forward to stand"] },
        { n: "Hip Thrust", d: "3 × 8–12", s: ["Upper back on a bench, feet flat", "Drive through the heels, big toes pressed down", "Lift until the torso is parallel to the floor", "Squeeze the glutes hard, lower under control"] },
        { n: "Cable Rotation", d: "3 × 10–12 per side", s: ["Cable at chest height, stand side-on", "Front foot toes slightly inward, knee over toes, tendon active", "Arms as straight as possible", "Rotate slowly through the full arc, force from foot through hip", "Tongue up; control, not power"] },
        { n: "Back Extensions", d: "3 × 10–12", s: ["Knees slightly bent, never locked", "Hinge at the hips, spine neutral", "Drive up by squeezing the glutes", "Stop at neutral, no hyperextension"] },
        "#Daily habits",
        { n: "Habits", s: ["Kneeling chair or seiza instead of a standard chair", "Sleep on your side"] },
      ],
    },
    {
      id: "flat-feet", cat: "posture", name: "Flat Feet Fix", when: "After a quick fascia release or groundwork", dur: "≈20 min",
      ex: [
        ["towel", "2 min per foot", ["Retract, don't scrunch: scrunching does almost nothing for the tendon"]],
        ["marble", "2 min per leg"],
        ["childrock", "60–90 s"],
        { n: "Slant Board", d: "2–3 min", s: ["Feet hip-width, toes slightly inward, knees gently bowed out", "Press the big toe into the board and lift the arch", "Single-leg stands 30–60 s per side", "Progress to slow squats on a dual slant board"] },
        { n: "Balance Board", d: "30–60 s · 2–3 rounds", s: ["Barefoot, feet hip-width, toes slightly inward, tongue up", "Big toe down, arch lifted, knee gently out", "Keep the tendon visibly active", "Progress to single-leg holds"] },
        { n: "Fascia Hops", s: ["Feet hip-width, toes slightly inward", "Press through the big toe as you rise; feel the arch lift", "Lower slowly with control", "Advanced: one foot at a time"] },
        { n: "Barefoot Sprints", d: "2–3 × 100 m · twice a week", s: ["Natural ground; warm up five minutes with the work above", "Rest fully between sprints", "Knee slightly outward, toes not flaring. If they flare, the tendon isn't ready yet"], go: "sprints" },
        "#Daily habits",
        { n: "Habits", s: ["Walk barefoot as often as you reasonably can", "Wide-toe-box shoes otherwise", "Work through the walking biomechanics routine"] },
      ],
    },
    {
      id: "knock-knees", cat: "posture", name: "Knock Knees Fix", when: "After a fascia release and groundwork", dur: "≈20 min",
      note: "One focus above all: create and hold the outward bow in your knee. Self-check: watch your knees in a mirror while walking. If they drift inward, some degree of this is present.",
      ex: [
        "#Release",
        ["footrel", "60–90 s per foot"],
        ["calfrel", "60 s per side"],
        ["childrock", "60–90 s"],
        "#Activate",
        ["towel", "2 min per foot"],
        { n: "Standing Hip Abduction with Band", d: "2 × 15 per side", s: ["Band just above the knees", "Stand on one foot, tendon active, big toe down, knee slightly bowed out", "Lift the other leg straight out to the side", "Pelvis level, no hip hike", "Lower with control"] },
        "#Strengthen",
        { n: "Banded Squat", d: "3 × 10–12", s: ["Band just above the knees, feet hip-width, toes slightly inward", "Push the knees out against the band the whole way", "Lower slowly, knees out over the toes", "Chest tall, spine neutral", "Drive through the big toes to stand"] },
        ["marble", "2 min per leg"],
        { n: "Slant Board Single Leg Hold", d: "30–60 s per side", s: ["One foot on the board, toes slightly inward", "Knee bowing slightly outward (most important)", "Big toe down, arch lifted"] },
        "#Daily habits",
        { n: "Habits", s: ["Walk with spiral mechanics, checking the knee bow on every step", "Walk barefoot on natural ground", "Release ankle, calf and hip regularly"] },
      ],
    },
    {
      id: "fhp", cat: "posture", name: "Forward Head Posture Fix", when: "After a fascia release", dur: "≈15 min",
      ex: [
        ["barhang", "2 min", ["Hang completely passive; let the neck release"]],
        ["subocc", "60 s"],
        ["scm", "60 s per side"],
        { n: "Gua Sha Up the Neck and Platysma", d: "60 s per side", s: ["A little tallow or coconut oil on the neck", "Gua sha or knuckles: firm upward strokes from collarbone toward jaw", "Continue under the chin and along the jawline"] },
        { n: "Pec Stretch", d: "30 s", s: ["Face a corner or doorway", "Forearms on the walls at shoulder height, elbows at 90°", "Lean the chest forward gently", "Head slightly tucked"] },
        ["mace", "10 reps per direction · light, 2–3 kg", ["Fluid spirals: front to back, side to side, figure eights"]],
        { n: "Cable Pull to Push", d: "8–10 per side", s: ["Cable or band at low to mid height", "Base position, tendon active", "Pull toward the body, then flow straight into a push", "Neck straight, core engaged"] },
        "#Daily habits",
        { n: "Habits", s: ["Sleep on your side", "Kneeling chair or seiza where possible", "Phone up toward eye level", "Fix the causes: screen height, long sitting, an unsupportive pillow"] },
      ],
    },

    /* ───────────── NERVOUS SYSTEM ───────────── */
    {
      id: "pandiculation", cat: "nervous", name: "Pandiculations", when: "On waking and whenever the body asks", dur: "1–2 min",
      note: "Stop stretching. Contract first, then release.",
      ex: [
        { n: "The principle", s: ["Inhale and deliberately contract the tight muscle or area", "Hold briefly", "Exhale slowly and release, letting it lengthen", "Let go completely"] },
        { n: "Morning Full Body Pandiculation", s: ["On waking, arms overhead, legs long", "Inhale deeply and contract the whole body: arms back, legs away, head slightly back", "Hold a moment, then exhale slowly and release everything", "Follow wherever the movement wants to go"] },
        ["barhang", "30–60 s daily"],
        { n: "Thumbpulling follow-up", s: ["When you step off the wall, let the body spiral and release"] },
      ],
    },
    {
      id: "lajin", cat: "nervous", name: "Lajin: Long Holds", when: "Deep tension", dur: "5–12 min",
      note: "Holding for minutes is the mechanism. Stay with the discomfort and breathe.",
      ex: [
        { n: "Deep Squat Hold", d: "2–3 min", s: ["Full deep squat, heels down if possible", "Toes slightly inward, anterior tibial tendon active", "Relax hips and spine", "Push the knees outward", "Heels won't go down yet? Use a wall behind you"] },
        { n: "Reclining Leg Stretch", d: "2–5 min per side", s: ["On your back, one leg straight up against a wall", "Other leg flat on the floor", "Relax completely; don't force", "Slow, deliberate breathing"] },
      ],
    },
    {
      id: "vagus", cat: "nervous", name: "Vagus Nerve Activation", when: "Any time stress is high", dur: "1–10 min",
      ex: [
        { n: "Cold face dunk", d: "15–30 s", s: ["Bowl of ice water", "Submerge your face"] },
        { n: "Gargling", d: "30–60 s", s: ["Gargle water vigorously until the eyes water"] },
        { n: "Chewing", d: "5–10 min daily", s: ["Mastic gum", "Tough cuts of meat, raw vegetables"] },
        { n: "Sunlight, grounding, time in nature", s: ["Daily"] },
      ],
    },
    {
      id: "stored-stress", cat: "nervous", name: "Stored Stress Release", when: "A few times a week", dur: "10–20 min",
      ex: [
        { n: "Psoas release on a block", d: "2–5 min", s: ["On your back, legs bent at 90° over a couch or bench", "Yoga block or fascial ball under the lower back, just above the pelvis", "Relax completely, slow nasal breathing", "Stand up slowly"] },
        { n: "TRE (tension and trauma release)", d: "1–2 min hold + 5–10 min", s: ["Feet hip-width, knees slightly bent", "Hold a semi-squat 1–2 minutes until the legs shake", "Lie on your back and let the legs tremble without resisting", "Let the shaking spread for 5–10 minutes"] },
        ["barhang", "30–60 s daily"],
      ],
    },
    {
      id: "endpoints", cat: "nervous", name: "Engage All Three Endpoints", when: "In every exercise", dur: "Always on",
      ex: [
        { n: "Tongue", s: ["Suctioned to the palate"] },
        { n: "Wrists", s: ["Actively engaged in thumbpulling and fascia work", "Bar hangs with forearms rotated outward", "Avoid gripping a phone with bent wrists for long stretches"] },
        { n: "Feet", s: ["Arch lifted, big toe down, anterior tibial tendon on"] },
        { n: "Together", s: ["Bring all three into whatever you are doing"] },
      ],
    }
  );
})(window.PHH);
