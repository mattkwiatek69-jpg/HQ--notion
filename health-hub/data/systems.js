/* Primal Health Hub — body systems as do / don't lists. Source: OP 1 + OP 2.
   Each topic: { id, name, icon, key:[headline numbers], dont:[], do:[], more:[{ h, items:[] }] } */
(function (P) {
  P.systems = [
    {
      id: "mitochondria", name: "Mitochondria & energy", icon: "sun",
      key: ["Fasted sprints 2–3× a week", "Creatine: 5 g a day from rare red meat", "Heart & liver 2–3× a week"],
      dont: ["Seed oils and PUFAs", "Heavy metals: mercury, lead, aluminium, cadmium", "EMFs, especially at night", "Pesticides: eat organic, wash produce, filter water", "Fully cooking all your meat (creatine drops with cooking)"],
      do: ["Morning sunlight, midday UVB and sunset light", "Ground barefoot when possible", "Sleep deeply: this is when mitochondria repair", "Fasted morning sprints 2–3× a week", "Saturated fats, ideally raw", "Structured, low-deuterium water", "Release fascia, eat well, move"],
      more: [
        { h: "What they need, and where to get it", items: ["CoQ10: raw beef or lamb heart, taken with shilajit", "Magnesium: liquid nano magnesium in the evening, mineral water, organ meats", "Creatine: rare red meat, 5 g daily", "B vitamins: grass-fed heart and liver 2–3× a week, pasture eggs daily, raw dairy, avocados, grass-fed beef", "Antioxidants: organic blueberries, dark grapes, pomegranates, fresh orange juice, raw cacao", "Taurine and glycine: bone broth, raw dairy, heart, liver, gelatinous cuts", "Copper: oysters, bee pollen, beef liver"] },
        { h: "Structured water", items: ["Glacial meltwater, Icelandic spring water, high-altitude spring water", "Leave water in a glass container in sunlight"] },
      ],
    },
    {
      id: "testosterone", name: "Testosterone & DHT", icon: "liver",
      key: ["Body fat 8–12%", "Carbs 220–250 g minimum", "Weights ≤ 4× and sprints ≤ 4× a week"],
      dont: ["Exogenous testosterone or prohormones (they shut down natural production)", "Xenoestrogens: plastics, receipts, synthetic fragrance, polyester", "Seed oils and processed food", "Fluoride: tap water, toothpaste, non-stick pans", "Chronic stress, overtraining, poor sleep (pregnenolone steal)", "Alcohol", "Pornography and digital overstimulation", "High body fat", "Low-fat, low-cholesterol or low-carb eating", "Blocking DHT"],
      do: ["Eat cholesterol: grass-fed beef, pasture egg yolks, raw dairy, organ meats, tallow", "Midday sun for UVB", "Deep sleep, every night", "Sprint and lift with short, intense sessions", "Zinc from oysters and red meat", "Boron (lowers SHBG and oestradiol)", "Keep thyroid and liver working (see those topics)", "Manage cortisol daily", "Get lean without chronic dieting"],
      more: [
        { h: "Worth knowing", items: ["Only unbound (free) testosterone is active", "DHT is 3–5× more potent than testosterone and does not convert to oestrogen", "Cortisol and testosterone share one precursor, pregnenolone", "5-alpha reductase needs NADPH, which needs carbs and thyroid output"] },
      ],
    },
    {
      id: "oestrogen", name: "Oestrogen control", icon: "pomegranate",
      key: ["1 raw carrot daily", "Pomegranate juice: 300 ml cold-pressed daily"],
      dont: ["Alcohol, entirely", "Soy, flaxseeds, sesame seeds, beer", "Plastics touching food or water", "Carrying excess body fat (more aromatase)", "Tap water"],
      do: ["Raw carrot salad daily on an empty stomach", "Pomegranate juice, 300 ml cold-pressed daily", "Seeded grapes (resveratrol) or grapeseed extract", "White button mushrooms, well cooked", "Citrus: oranges, lemons, grapefruit", "Boron", "More saturated fat (bile carries oestrogen out)"],
      more: [
        { h: "Liver clearance", items: ["Bile flow: taurine, choline from egg yolks, TUDCA before meals", "Antioxidants: vitamin C, vitamin E, polyphenol-rich foods", "No alcohol"] },
        { h: "Raw carrot salad", items: ["Grate one raw carrot finely", "Dress with apple cider vinegar and coconut oil (the thyroid page says EVOO)", "Eat daily on an empty stomach"] },
      ],
    },
    {
      id: "thyroid", name: "Thyroid", icon: "oyster",
      key: ["Carbs 220–250 g minimum daily", "From fruit, raw honey, raw dairy"],
      dont: ["Low-carb dieting", "Seed oils", "Fluoride", "Goitrogens: broccoli, kale, cauliflower", "Chronic cortisol", "A leaky gut (endotoxins)", "Chronic calorie deficits"],
      do: ["Selenium: pasture eggs, organ meats", "Iodine: oysters, wild-caught fish", "Zinc: oysters, red meat", "Magnesium", "Carbohydrates from fruit, raw honey, raw dairy", "Saturated fat: tallow, butter, coconut oil", "Bone broth, raw colostrum, daily raw carrot salad for the gut", "Morning light (TSH responds to it)"],
      more: [
        { h: "Signs it is running low", items: ["Persistent fatigue despite sleep", "Unexplained weight gain or trouble getting lean", "Cold hands and feet", "Dry skin, brittle hair, slow beard growth, hair thinning", "Constipation, slow digestion", "Brain fog, poor concentration and memory", "Low mood, drive and motivation", "Slow resting heart rate", "Puffy face around eyes and jaw", "Trouble building muscle despite training and protein"] },
      ],
    },
    {
      id: "cortisol", name: "Cortisol & stress", icon: "heart",
      key: ["Sodium 3–5 g a day", "Calcium 1 g a day", "Carbs ≥ 200 g a day"],
      dont: ["Overtraining: weights more than 4×, sprints more than 4× a week", "Under-eating carbs or salt", "Blue light in the evening", "Irregular sleep", "Chronic calorie restriction"],
      do: ["Clean carbs after training: fruit, raw honey, raw dairy", "Celtic sea salt, especially around exercise", "Magnesium: raw goat cheese, wild fish, raw cacao, dates; liquid nano magnesium or topical spray (the doc says scrotum for best absorption)", "Breathwork daily: Buteyko or box breathing", "Meditation, breathwork or qi gong", "Calcium from dairy and eggshell powder", "Ground daily", "Morning sunlight and as much natural light as possible", "Glycine from bone broth", "Protect deep sleep above everything", "Adaptogens named in the docs: rhodiola rosea, holy basil"],
      more: [],
    },
    {
      id: "nervous-system", name: "Nervous system", icon: "brain",
      key: ["CO₂ hold: 30–40 s is well regulated, 40+ excellent", "Resting heart rate above 75 = low vagal tone"],
      dont: ["Doomscrolling, constant screens and digital novelty", "Phone during meals or first thing in the morning", "Mouth breathing and over-breathing", "Shallow chest breathing"],
      do: ["Slow nasal breathing; build CO₂ tolerance", "Cold face dunk 15–30 s", "Gargle 30–60 s", "Chew mastic gum 5–10 min daily", "Sunlight, grounding, time in nature", "Release the psoas; TRE; bar hang 30–60 s daily", "Replace cheap dopamine: get outside, train, build something, read", "Settle first, then listen to what your body is asking for"],
      more: [
        { h: "Minerals", items: ["Magnesium: liquid nano magnesium in the evening; magnesium chloride spray on neck and chest", "Sodium and potassium: coconut water with Celtic sea salt, bone broth", "Glycine and taurine: bone broth, raw dairy, beef heart, liver", "Raw saturated fats: egg yolks, grass-fed butter, beef tallow"] },
        { h: "Signs of low vagal tone", items: ["Resting heart rate above 75", "Poor digestion and bloating", "Cold hands and feet", "Shallow chest breathing", "Jaw tension, teeth grinding", "Low stress resilience, brain fog", "Slow recovery from training"] },
      ],
    },
    {
      id: "sleep", name: "Sleep", icon: "moon",
      key: ["7–9 hours", "In bed before 11 pm", "No food 3 h before", "Screens off 60–90 min before"],
      dont: ["Eating within 3 hours of bed", "Screens in the last 60–90 minutes", "Any light in the room: LEDs, curtain gaps", "Sleeping on your back", "A soft mattress", "Working, scrolling or watching in bed", "Shifting your schedule at weekends", "WiFi on, phone near your body"],
      do: ["Side sleep: feet crossed, shoulder back and up, tongue suctioned, hips back, head slightly forward", "Zygotape on", "Firm surface: futon or floor (work up to it)", "Room fully dark, cool and quiet", "Same bed and wake time every day", "A few minutes of breathwork before bed", "Blue-light blockers after sundown", "Liquid nano magnesium (plus glycine if needed)", "Chamomile tea with raw honey", "If you need something: a little raw milk and unheated raw honey", "1.5–3 Hz sound before bed (puberty protocol)", "Morning and sunset light to set the clock"],
      more: [],
    },
    {
      id: "light", name: "Sunlight", icon: "sunrise",
      key: ["Outside within 20–30 min of waking", "10–20 min morning", "20–45 min midday"],
      dont: ["Sunglasses, especially in the morning", "Chemical sunscreens", "Burning", "Artificial blue light after sunset"],
      do: ["Morning light 10–20 min, even when cloudy", "Do your routines outside, grounded", "Midday sun with as much skin as is comfortable; build up gradually", "Move to shade when your skin tingles", "Non-nano zinc oxide if you want protection", "Be outside as the sun sets", "Vitamin D3 3,000–4,000 IU in winter"],
      more: [],
    },
    {
      id: "grounding", name: "Grounding, nature & EMF", icon: "tree",
      key: ["A few minutes barefoot daily", "30 min minimum on Sunday"],
      dont: ["Phone on your body while you sleep", "WiFi on overnight", "Constant Bluetooth, WiFi and phone exposure"],
      do: ["Barefoot on grass, sand or soil every day", "Combine with morning or midday sun", "Turn WiFi off at night", "Keep the phone away from your body in bed", "Time in a forest or park, away from stimulation"],
      more: [],
    },
    {
      id: "lean", name: "Getting lean", icon: "tape",
      key: ["Target 8–12% body fat", "One 24–36 h fast a week", "10,000 steps daily"],
      dont: ["A daily 300–500 kcal deficit for weeks", "Steady-state cardio", "A large deficit plus high-volume cardio", "Under-sleeping", "Seed oils, refined sugar, processed food"],
      do: ["Fast 24–36 hours once a week; full maintenance every other day", "Sprint 2–3× a week, fasted, in the morning", "Walk 10,000 steps outdoors", "2–3 progressive strength sessions a week", "Prioritise cholesterol and saturated fat on eating days", "Sleep 7–9 hours", "Morning, midday and evening sun", "Raw carrot salad daily", "Manage cortisol as a non-negotiable", "Gua sha routine and Big 6 so results show"],
      more: [
        { h: "Gut foods for fat loss", items: ["Bone broth daily", "Raw colostrum", "Raw carrot salad daily", "No seed oils, refined sugar or processed food"] },
        { h: "The weekly-fast maths from the doc", items: ["Maintenance 3,500 kcal a day", "One fasting day = a 3,500 kcal weekly deficit = about one pound of fat"] },
      ],
    },
    {
      id: "bone", name: "Bone density", icon: "milk",
      key: ["Calcium ≥ 1.5 g a day", "Protocol 2–3× a week"],
      dont: ["Fluoride: tap water, fluoride toothpaste", "Glyphosate: wheat, oats, corn, soy", "Seed oils"],
      do: ["Calcium: raw A2 dairy, hard raw cheeses, eggshell powder", "Collagen: bone broth, slow-cooked collagenous cuts, grass-fed gelatin powder, with whole-food vitamin C", "K2: hard raw A2 cheese, grass-fed butter, pasture egg yolks", "D3: midday sunlight", "Magnesium: liquid nano magnesium in the evening", "Boron: organic raisins, dates, avocados, boron glycinate", "Zinc and copper: oysters and red meat", "Silica: peeled cucumber, high-silica mineral water, nettle tea", "Sprints, heavy carries, Reeves deadlifts, plyometrics", "Deep sleep and enough carbs for IGF-1"],
      more: [],
    },
    {
      id: "tendons", name: "Tendon health", icon: "foot",
      key: ["Vitamin C 30 min before training", "Ball work 2–3 min per area"],
      dont: ["Loading tendons with no recovery", "Seed oils and chronic inflammation", "Dehydrated, restricted fascia"],
      do: ["Whole-food vitamin C 30 minutes before training", "Bone broth for glycine, proline and hydroxyproline", "Magnesium", "Fascial ball around every loaded tendon, before and after training", "Isometrics → slow eccentrics → plyometrics, 2–3× a week"],
      more: [],
    },
    {
      id: "gut-liver", name: "Gut & liver", icon: "apple",
      key: ["Bone broth daily", "Raw carrot salad daily"],
      dont: ["Seed oils, processed food, refined sugar", "Alcohol", "Rushed eating and poor chewing", "Eating in a stressed state"],
      do: ["Bone broth daily", "Raw colostrum", "Raw carrot salad daily", "L-glutamine", "Apple cider vinegar before meals", "Copper-rich foods: oysters, liver, bee pollen", "Taurine, egg yolks, TUDCA for bile", "Chew thoroughly", "Digestion fascia release on waking and before sleep", "Breathe 4 in / 6 out before meals"],
      more: [],
    },
    {
      id: "fascia-health", name: "Fascia health", icon: "glass",
      key: ["Feet and tongue are the two key points", "Two longer sessions a day"],
      dont: ["Seed oils and processed food", "Overtraining", "Long sitting in standard chairs", "Mouth breathing", "Well-done everything (prefer rare or raw where reasonable)", "Chasing one body part in isolation", "Forcing pressure or rushing reps"],
      do: ["Move daily in spiral, multi-directional patterns", "Release the whole body, not just the face", "Activate feet and tongue together", "Drain lymph after release", "Rare steak, sashimi, raw dairy, raw egg yolks", "Bone broth, organ meats, fruit for collagen building blocks", "Sunlight, grounding, deep sleep", "Listen to which exercises your body responds to"],
      more: [],
    },
  ];

  /* ───────────── BONUS EXTRAS ───────────── */
  P.extras = [
    {
      id: "toxins", name: "Toxin avoidance", icon: "leaf",
      intro: "Removing what works against you is 80% of the progress.",
      groups: [
        { h: "Plastics", dont: ["Heating food or drink in plastic", "Plastic cutting boards, cups, plates, cutlery, storage", "Canned food unless confirmed BPA-free", "Touching receipts (BPA)"], do: ["Glass or stainless steel for bottles and storage"] },
        { h: "Cookware", dont: ["Non-stick pans (PFAS, fluoride compounds)", "Any scratched or damaged non-stick, replace at once"], do: ["Stainless steel, cast iron or ceramic", "Cook only with tallow, butter, ghee or coconut oil"] },
        { h: "Seed oils", dont: ["Canola, rapeseed, sunflower, safflower, soybean, corn, cottonseed, peanut, vegetable oil", "All processed food"], do: ["Read every label", "At restaurants ask for butter or animal fat (the doc's tactic: say you are allergic to seed oils)"] },
        { h: "Water & fluoride", dont: ["Tap water", "Fluoride toothpaste"], do: ["Spring water in glass bottles, or reverse-osmosis filtered", "Shower filter", "Hydroxyapatite toothpaste, or baking soda and coconut oil", "Tamarind fruit, tea or paste (binds fluoride)", "Boron and silica"] },
        { h: "Food", dont: ["Soy in all forms: soy protein, tofu, soy milk", "Flaxseeds, sesame seeds, beer", "Conventional thin-skinned produce", "Conventional dairy and meat raised with hormones", "Wheat, oats, corn, soy (glyphosate)"], do: ["Organic at minimum for berries, grapes, apples, leafy greens", "Grass-fed and pasture-raised", "Wash produce thoroughly"] },
        { h: "Personal care & cleaning", dont: ["Parabens, phthalates, synthetic fragrance, aluminium", "Air fresheners", "Standard laundry detergent, hand wash, dishwasher tablets, surface cleaners", "Chemical sunscreen"], do: ["Aluminium-free deodorant: baking soda with coconut oil to start", "Tallow-based skincare", "Baking soda and apple cider vinegar for cleaning", "Non-nano zinc oxide"] },
        { h: "Clothing", dont: ["Polyester, especially underwear"], do: ["Linen or 100% organic cotton"] },
        { h: "EMF & heavy metals", dont: ["WiFi on at night, phone on your body", "Mercury, lead, aluminium, cadmium exposure"], do: ["WiFi off overnight", "Phone away from the bed"] },
      ],
    },
    {
      id: "allergy", name: "Allergy guide", icon: "apple",
      intro: "Treat the gut, the liver and the nervous system; the reaction follows.",
      groups: [
        { h: "Gut", dont: ["Seed oils, processed food, refined sugar"], do: ["Bone broth daily", "Raw colostrum daily", "L-glutamine"] },
        { h: "Liver", dont: [], do: ["Raw carrot salad daily", "Apple cider vinegar before meals", "Copper-rich foods: oysters, liver, bee pollen"] },
        { h: "Environment", dont: ["Phone and WiFi exposure during sleep", "Non-organic, glyphosate-heavy produce"], do: ["Eat organic for the highest pesticide-exposure produce", "Regulate the nervous system"] },
        { h: "Mast cell stabilisers", dont: [], do: ["Quercetin daily: onions, capers, apples, dark berries", "Whole-food vitamin C", "Rosemary"] },
        { h: "Herbs", dont: [], do: ["Nettle tea, 2–3 cups daily in high-symptom periods", "Tulsi (holy basil)", "Ginkgo biloba", "Chamomile", "Ginger"] },
      ],
    },
    {
      id: "hair", name: "Hair health", icon: "leaf",
      intro: "Fix the environment around the follicle; don't block DHT.",
      groups: [
        { h: "Daily", dont: ["Blocking DHT", "Seed oils", "Processed food and refined sugar", "Unmanaged stress"], do: ["Scalp massage 5 min, firm circles with the fingertips", "Zinc-rich foods: oysters, red meat, pumpkin seeds", "Nettle tea", "Midday sunlight (D3 3,000–4,000 IU in winter)", "Eggs", "Thumbpull consistently"] },
        { h: "Weekly", dont: [], do: ["Grass-fed liver 2–3× a week", "Bone broth regularly", "Silica: cucumber, nettle tea, high-silica mineral water", "Scalp release and hair pulls in the full body release", "Support the gut"] },
      ],
    },
    {
      id: "height", name: "Puberty & height protocol", icon: "chart",
      intro: "GH and IGF-1 axis. Sleep and recovery first.",
      groups: [
        { h: "Every morning", dont: [], do: ["10–20 min direct sunlight plus the fascia activation routine, no sunglasses", "Dead hang: 2–4 sets of 30–60 s, lower back and ribs relaxed", "Cobra + thoracic extension: 2 sets of 30–45 s", "Posture correction routine for your weak spots"] },
        { h: "Twice a week: height spike workout", dont: ["Overtraining"], do: ["6–8 fasted weighted sprints, 15–20 s / 100 m, 3–4 min rest", "Then the IGF-1 Igniter: high carb, high leucine, high calcium", "Simple version: raw or quality dairy, honey or fruit, red meat or eggs"] },
        { h: "2–3× a week", dont: [], do: ["Fasted sprints", "Heavy lower-body compound lifts", "Hanging and extensions"] },
        { h: "Sleep", dont: ["Food or drink in the 3 hours before bed (2–3 h minimum)", "Blue light after sundown"], do: ["Asleep before 11 pm", "Completely dark, cool, quiet room", "Blue-light blockers after sundown; watch sunrise and sunset", "Nano magnesium; magnesium + glycine if needed", "1.5–3 Hz sound before bed", "Same bed and wake time"] },
        { h: "Cortisol", dont: ["Excess training volume"], do: ["Meditation, breathwork or qi gong daily", "At least 200 g carbs and 3–5 g sodium a day", "Rhodiola rosea, holy basil"] },
        { h: "Oestrogen (boys lower it, girls balance it)", dont: ["BPA, plastic kitchenware, polyester, non-organic produce, toxic cleaning and hygiene products"], do: ["Raw carrot daily", "Seeded grapes or grapeseed extract, well-cooked white button mushrooms, oranges and lemons", "More saturated fat"] },
        { h: "Height micronutrients", dont: [], do: ["Calcium, K2, D3 from sunlight", "Raw cheese, ideally aged", "Clabbered milk", "Raw unsalted butter", "Raw goose or ox liver"] },
        { h: "Eating enough", dont: ["Processed food", "Chronic under-eating"], do: ["Size shake daily after training if you struggle to gain", "Liver and eggs a few times a week plus dairy", "Buy cheaper cuts from a butcher"] },
        { h: "Daily mitochondria list", dont: ["Seed oils", "EMFs at night"], do: ["Morning sunlight", "Saturated fats, ideally raw", "Ground barefoot"] },
      ],
    },
    {
      id: "progress", name: "Measuring progress", icon: "target",
      intro: "Once a month. How you feel counts as much as the photos.",
      groups: [
        { h: "Monthly photos", dont: [], do: ["Palate: head back, mouth wide, shoot straight up at the roof of the mouth", "Front and side profile: neutral expression, same spot and lighting", "Posture: side-on at 90°, standing naturally"] },
        { h: "Palate measurement (optional)", dont: [], do: ["Bite gently on an index card or dental wax to mark the molars", "Measure between the first molars in millimetres", "Myobrace sizing: below 34 mm = A1 Medium, 34 mm and above = A1 Large"] },
      ],
    },
    {
      id: "mindset", name: "Intuition & approach", icon: "book",
      intro: "The programme's own ground rules.",
      groups: [
        { h: "How to work", dont: ["Jumping ahead before the foundation habits are in place", "Waiting to execute perfectly", "Expecting instant results", "Trading your intuition for someone else's ideology"], do: ["Start, and let consistency carry it", "Settle the nervous system before deciding what your body needs", "Lean into the exercises your body responds to", "Two longer sessions a day, morning and evening", "Treat the body as one system"] },
        { h: "Eating on a budget", dont: [], do: ["Butcher over supermarket for cheaper cuts", "Liver and eggs are the cheapest dense foods", "Organic and cookware upgrades are the last 20%"] },
      ],
    },
  ];
})(window.PHH);
