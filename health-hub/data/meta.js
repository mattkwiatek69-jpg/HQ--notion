/* Primal Health Hub — presentation metadata and audit additions.
   Equipment per routine, topic icons, metric portions, and a few source items added after the coverage review. */
(function (P) {
  /* equipment per routine id; routines not listed need nothing */
  P.equip = {
    "fascia-activation": ["Fascia ball", "Towel", "Marble", "Macebell (optional)"],
    "full-body-release": ["Fascia ball", "Foam roller"],
    "digestion-release": ["Oil or tallow", "Gua sha"],
    "thumbpulling-daily": ["Wall"], "advanced-15": ["Wall"],
    "stella-morning": ["Facial oil", "Rose water", "Cotton pad"],
    "habit-drills": ["Mastic gum"], "tongue-tie": ["Towel"],
    "hollow-cheeks": ["Mastic gum", "Button and string"],
    zygotape: ["Zygotape", "Facial oil"], myobrace: ["Myobrace"], airofit: ["Airofit"], froggy: ["Froggy Mouth"],
    "double-chin": ["Airofit (optional)"],
    "facial-lymph": ["Castor or coconut oil", "Gua sha"],
    sprints: ["Natural ground"], uphill: ["Grass hill"], "weighted-sprints": ["Weighted vest or ankle weights"],
    "workout-1": ["Foam roller", "Fascia ball", "Pull-up bar", "Marble", "Barbell and plates", "Bench"],
    "workout-2": ["Foam roller", "Fascia ball", "Pull-up bar", "Towel", "Dip bars", "Barbell or dumbbells", "Slant board"],
    "workout-3": ["Fascia ball", "Pull-up bar", "Macebell", "Marble", "Slant board", "Cable machine", "Medicine ball", "Kettlebell (optional)"],
    "exercise-extra": ["Medicine ball", "Slant board"],
    "bone-density": ["Heavy dumbbells or kettlebells", "Barbell and plates", "Plyo box", "Jump rope", "Macebell"],
    tendon: ["Light dumbbell", "Band or cable", "Slam ball", "Step"],
    "posture-positions": ["Kneeling chair or seiza bench"],
    "walking-routine": ["Towel", "Marble", "Balance board (optional)"],
    apt: ["Pull-up bar", "Chair or sofa", "Bench", "Cable machine", "Back extension"],
    "flat-feet": ["Towel", "Marble", "Slant board", "Balance board"],
    "knock-knees": ["Fascia ball", "Foam roller", "Towel", "Resistance band", "Marble", "Slant board"],
    fhp: ["Pull-up bar", "Fascia ball", "Gua sha", "Macebell", "Cable or band"],
    pandiculation: ["Pull-up bar"], lajin: ["Wall"], vagus: ["Bowl of ice water", "Mastic gum"],
    "stored-stress": ["Yoga block or fascia ball", "Pull-up bar"],
  };

  /* topic and group icons from the new icon sheets */
  const icons = {
    mitochondria: "mito", testosterone: "steak", oestrogen: "pomegranate", thyroid: "thyroid", cortisol: "adrenals",
    "nervous-system": "brain", sleep: "pillow", light: "sunrise", grounding: "tree", lean: "scale", bone: "marrow",
    tendons: "tendon", "gut-liver": "gut", "fascia-health": "fascia",
    toxins: "showerfilter", allergy: "leaf", hair: "hairfollicle", height: "chart", progress: "calendar", mindset: "stones",
  };
  (P.systems || []).concat(P.extras || []).forEach((t) => { if (icons[t.id]) t.icon = icons[t.id]; });
  const catIcons = { fascia: "fasciaball", myo: "tooth", face: "tmj", tape: "ktape", breath: "diaphragm", lymph: "lymphnodes", sprint: "shoe", gym: "kettlebell", posture: "spine", nervous: "meditate" };
  (P.cats || []).forEach((c) => { if (catIcons[c.id]) c.icon = catIcons[c.id]; });

  /* where each block came from: "op" = OP docs, "me" = the owner's own notes, "both". Unmarked blocks are "op".
     Rule for new content: ask whose it is, then set src here or on the item (see CLAUDE.md). */
  (P.nutrition.approved || []).forEach((g, i) => { g.src = i < 4 ? "me" : "op"; });

  /* day-of-eating portions in metric, with the unit as the source file wrote it */
  P.portions = [
    {
      name: "Optimal day of eating", icon: "steak",
      items: [["300 g", "Raw grass-fed ribeye"], ["12", "Raw oysters"], ["80 g", "Raw organic honey"], ["1", "Mango"], ["950 ml", "Raw orange juice", "32 oz"], ["30 g", "Beef gelatin powder"], ["710 ml", "Whole raw milk", "24 fl oz"], ["5", "Raw eggs"]],
      totals: [
        { id: "a", label: "First set in the file", rows: [["Calories", "≈2,500"], ["Protein", "≈170 g"], ["Fat", "≈120 g"], ["Carbs", "≈185 g"]], note: "Protein includes 30 g from gelatin." },
        { id: "b", label: "Second set, “Daily totals”", rows: [["Calories", "not given"], ["Protein", "≈160 g"], ["Fat", "≈106 g"], ["Carbs", "≈283 g"]], note: "Listed directly under the first set." },
      ],
    },
    {
      name: "Alternative day of eating", icon: "egg",
      items: [["475 ml", "Whole raw milk", "16 fl oz"], ["1 L", "Fresh-squeezed orange juice"], ["6", "Whole eggs, cooked whites and runny yolk"], ["4", "Raw egg yolks"], ["285 g", "Grass-fed ribeye", "10 oz"], ["12", "Raw oysters"], ["70 g", "Raw honey", "2.5 oz"], ["28 g", "Raw A2 butter or ghee", "1 oz"]],
      totals: [],
    },
  ];
  /* targets: which lines are sourced, and which the sources disagree on */
  P.targetNotes = { Carbs: "differ", Calcium: "differ", Protein: "differ", Fat: "differ" };

  /* ── coverage review additions (items in the docs that the first build left out) ── */
  const byId = {}; (P.routines || []).forEach((r) => (byId[r.id] = r));
  if (byId["tongue-tie"]) byId["tongue-tie"].ex.unshift({ n: "Signs this routine is for you", s: ["You struggle to hold suction while mewing", "You can't engage the back third of your tongue", "Pulling under the tongue or in the cheeks", "Trouble sealing your lips", "Tightness across the floor of the mouth"] });
  if (byId.fhp) byId.fhp.ex.push({ n: "What causes it", s: ["Hours looking down at a phone, laptop or game", "Long periods of sitting", "Stress: shrugged shoulders, clenched jaw, rounded upper back", "A laptop set too low, a chair without support, a screen off to the side", "A pillow that is too high, too low or unsupportive"] });
  if (byId.myobrace) byId.myobrace.ex.push({ n: "Before you start", s: ["Fix posture, tongue position, breathing and swallowing first", "Worn in the day and during sleep", "Combine with thumbpulling and Zygotape"] });
  if (byId.zygotape) byId.zygotape.ex.push({ n: "Later phase", s: ["Extra lines of tape along the nose"] });
  if (byId.ultimate) byId.ultimate.links = [["Full 46-minute follow-along (Skool)", "https://www.skool.com/healthislooks/classroom/5d93b011?md=8a4357918f54407da6733b9c09752559"]];
  if (byId["gym-rules"]) byId["gym-rules"].ex.push({ n: "The five fascial lines", s: ["Deep Front Line: foot arch, inner leg, psoas, diaphragm, hyoid, jaw, tongue", "Superficial Back Line: plantar fascia, calves, hamstrings, spinal erectors, base of skull, over the head", "Superficial Front Line: shin, quads, abs, neck", "Lateral Line: outer foot, IT band, obliques, intercostals, temple", "Spiral Line: right shoulder to left hip and left shoulder to right hip"] });
  const sys = {}; (P.systems || []).forEach((s) => (sys[s.id] = s));
  if (sys["fascia-health"]) sys["fascia-health"].more.push({ h: "Arch mirroring", items: ["Four related arches: foot, pelvic floor, diaphragm, hard palate", "A collapsed foot arch loads the others"] });
  if (sys.testosterone) sys.testosterone.more.push({ h: "What DHT does, per the doc", items: ["Reduces fat storage and promotes fat breakdown", "Antagonises cortisol", "Blocks oestrogenic activity and water retention", "Drives strength, bone density, confidence and libido"] });
  if (sys.thyroid) sys.thyroid.more.push({ h: "What it governs", items: ["Fascial collagen synthesis", "Metabolic rate and fat distribution", "Muscle growth, skin, hair density", "Body temperature, androgen conversion, mental clarity"] });
  if (sys.light) sys.light.more.push({ h: "What each window does", items: ["Morning: sets cortisol, thyroid and appetite hormones", "Midday: UVB for vitamin D3 and testosterone", "Evening: red light starts melatonin and overnight repair"] });
  if (sys.lean) sys.lean.more.push({ h: "The five hormones in play", items: ["Testosterone, DHT, cortisol, thyroid, insulin", "If composition won't respond, check the thyroid first"] });
})(window.PHH);
