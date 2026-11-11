"""Builds seed.json (the hub's cards) from the diet framework, 'Max - 4', the 'Max' doc export
and the Skool course export. Usage: python3 build_seed.py <max_doc_export.txt> <skool_export.md> > seed.json"""
import re, json, sys

cards = []
def slug(s): return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')[:40]
def card(area, group, title, kind, items, doc, sec, note='', days=None):
    cid = slug(doc.split()[0] + '-' + title) + '-' + str(len(cards))
    its = []
    for n, it in enumerate(items):
        if isinstance(it, str): it = {'t': it}
        elif isinstance(it, tuple):
            d = {'t': it[0], 'd': it[1]}
            if len(it) > 2: d['tier'] = it[2]
            it = d
        it['id'] = 'i%d' % n
        its.append(it)
    cards.append({'id': cid, 'area': area, 'group': group, 'title': title, 'kind': kind, 'note': note,
                  'items': its, 'src': {'doc': doc, 'sec': sec}, 'ord': len(cards), 'days': days or []})

ALL = [0, 1, 2, 3, 4, 5, 6]  # 0 = Monday
# ---------------- Max - 4 : current routines ----------------
M4, RX = 'Max - 4', 'Routine exercises'
card('routines', 'Fascia & release', 'Full body fascia and stretches', 'routine', [
 'Fascia pulling', 'Seiza position', 'Fascia hops', 'Foot release', 'Calf release', 'Hamstring release', 'Psoas release',
 'Glute release', 'Quad release', 'Ribcage release', 'Chest gua sha and ball', 'Ribcage', 'Traps', 'Back of neck', 'Base of skull',
 'Elevated towel scrunches', 'Marble carry with slant board', 'Slant board single leg hold', 'Calf taps',
 'Ribcage hold with trunk rotation', 'Crawl position isometric hold', ('Macebell or club swings', 'Optional'), 'Fascia hops (second round)',
 'Deep squat', 'Light child-pose rocking', 'Cobra + thoracic extension', 'Pec stretch', 'Neck rotations'], M4, RX, days=ALL)
card('routines', 'Face & myo', 'Face fascia', 'routine', ['SCM + gua sha', 'Floor of mouth', 'Temporalis / temples release', 'Scalp',
 'Hair pull fascia mobilisation', 'Base of skull with ball on floor'], M4, RX, days=ALL)
card('routines', 'Face & myo', 'Myo face', 'routine', [('Cheek puff and suck', '7 reps'), 'Tongue resistance stretch',
 ('Buccinator-masseter corridor release', '5 reps'), 'Palate massage', ('Light one-sided thumbpulling', 'Both sides'), 'Zygo-massaging',
 'One-sided zygopulling', 'T-spot tongue hold', 'Tongue pulls with a towel'], M4, RX, days=ALL)
card('routines', 'Breath & nervous system', 'Breathwork', 'routine', ['Buteyko breathing', 'Nasal reset breathing', 'Vortex breath', 'Wim Hof'], M4, RX, days=ALL)
card('routines', 'Lymphatic', 'Lymphatic drainage: face', 'routine', ['Zygopushing + drain downwards', 'Maxilla release', 'Neck drainage',
 'Neck glides', 'Digastric glide'], M4, RX, days=ALL)
card('routines', 'Lymphatic', 'Lymphatic drainage: body Big 6', 'routine', ['Collarbone', 'Behind jaw', 'Armpit', 'Abdomen', 'Groin',
 'Behind knees', 'Bounces'], M4, RX, days=ALL)
card('routines', 'Training', 'Sprints', 'routine', [('6-8 sprints', '15-20 seconds / 100m each'), ('Rest 3-4 min between sprints', ''),
 ('Weighted', '')], M4, RX, note='2 x a week, in the morning.', days=[1, 4])
card('routines', 'Training', 'Gym', 'routine', [('Hanging', '2 sets'), 'Pull-ups', 'Dips', 'Barbell row', 'Overhead press', 'Macebell swings',
 'Half kneeling cable rotation', 'Cable pull to push', 'Hip thrust on toes', 'Turkish get-up (kettlebell)', 'Rotational medicine ball lunge',
 'Rotator cuff rotations', 'SLRDL', 'Squat', 'Back extensions'], M4, RX, days=[0, 3, 5])
card('routines', 'Fascia & release', 'Other movements', 'routine', ['GOATA hip rockers', 'Trevor full body waves', '90 90 10 10', 'Couch stretch',
 'Pigeon stretch', 'Behind-back scapular rotations in seiza', 'Seated leg raises over a tall object'], M4, RX + ' > Other')
card('library', 'Focus & plans', 'Max 2 focus', 'list', ['Whole body fascia and face', 'Mobility and movement', 'Myo', 'Functional muscle', 'Posture',
 'GOATA movement', 'Breathwork, meditation and nervous system regulation', 'Pelvic floor and back-chain dominance', 'Calisthenics'], M4, 'Max 2 Focus')
card('library', 'Focus & plans', 'Courses', 'list', [{'t': 'Oscar Patel', 'x': True}, {'t': 'Face IQ', 'x': True}, 'Erik',
 {'t': 'Excellent health', 'x': True}, 'Trevor'], M4, 'Courses', note='Struck-through = already done in the source doc.')
card('library', 'Focus & plans', 'Health to-dos', 'list', ['Weekly mobility routine: a different focus area each day', 'Books',
 'Routine + hobby, learn-new-skill day + clean day', 'New gym compound',
 'Diet update: iodine / sea moss', ('Optimal morning routine', 'Positive affirmations and manifestations on the "I have" and "I am", journal, breathwork, sun, mobility, shadow work, qi gong'),
 'Apply for GP', 'Research natural cleaning supplies', 'Health dashboard'], M4, 'To Do', note='Health-related items only; money and admin to-dos were left in the doc.')

# ---------------- Diet framework ----------------
DF = 'Diet framework'
card('food', 'Approved foods', 'Protein', 'list', [
 ('Grass-fed ruminant muscle meat', 'Beef, lamb, bison. Ideally raw or rare/seared.', 'S'),
 ('Raw milk', 'Aspirational: not sold in UK supermarkets, so currently out on sourcing grounds only.', 'S'),
 ('Bone broth / gelatin', 'Collagen source for the glycine:methionine target.', 'S'), ('Oysters', 'Zinc, copper, selenium, B12.', 'S'),
 ('Liver (beef/lamb, grass-fed)', '100g, 1-2x per week. More risks vitamin A toxicity.', 'A'),
 ('Raw grass-fed cheese and yogurt', '', 'A'), ('Collagen peptides', '', 'A'),
 ('Eggs (whole, pastured)', 'Cook the whites, keep the yolk runny.', 'A'),
 ('Shrimp, scallops, clams', '', 'B'), ('Cod and sole (white fish)', '', 'B')], DF, 'Protein tiers')
card('food', 'Approved foods', 'Cheese', 'list', [
 ('Comté, Gruyère AOP, Pecorino Romano, Taleggio, Reblochon, Roquefort', 'Raw A2 cheeses. Roquefort: sheep milk, mould-fermented, so some histamine load.', 'S'),
 ('West Country Cheddar, Emmental, sheep/goat feta', 'Pasteurised A2 or high-quality alternatives.', 'A'),
 ('Mass-market cheddar, processed cheese, cream cheese', 'Avoid.', 'D')], DF, 'Protein tiers > Cheese hierarchy',
 note='40-60g a day as a nutrient and fat component, not a main protein.')
card('food', 'Approved foods', 'Carbohydrates', 'list', [
 ('Fresh-squeezed orange juice', 'Same day.', 'S'), ('Ripe papaya', '', 'S'), ('Ripe mango', '', 'S'), ('Raw honey', 'Unheated, unfiltered.', 'S'), ('Ripe grapes', '', 'S'),
 ('Tangerines / mandarins', '', 'A'), ('Watermelon', '', 'A'), ('Pineapple', '', 'A'), ('Banana', 'Fully ripe, spotted.', 'A'), ('Dates', '', 'A'),
 ('Well-cooked potatoes', 'Pair with saturated fat.', 'A'), ('Cherries', 'Listed A-tier in the approved-foods list only, not in the tier summary.', 'A'),
 ('Cantaloupe', '', 'B'), ('Honeydew', '', 'B'), ('Well-cooked sweet potato', '', 'B')], DF, 'Carbohydrate tiers')
card('food', 'Approved foods', 'Fats', 'list', [
 ('Grass-fed butter', 'Preferably raw.', 'S'), ('Ghee', '', 'S'), ('Coconut oil', 'Virgin, unrefined.', 'S'), ('Raw cream', '', 'S'), ('Beef tallow / lamb fat', 'Grass-fed.', 'S'),
 ('Egg yolks (pastured)', '', 'A'), ('Cocoa butter', '', 'A'), ('Macadamia nut oil', 'Lowest-PUFA nut oil, about 2%.', 'A'),
 ('Duck fat', 'About 13% PUFA. Occasional use only.', 'B')], DF, 'Fat tiers')
card('food', 'Excluded', 'Excluded and minimised', 'list', [
 ('All PUFAs and seed oils', 'Soybean, canola, sunflower, safflower, corn, grapeseed, cottonseed, rice bran oil, margarine, shortening. No exceptions.', 'D'),
 ('Extra virgin olive oil', 'About 10% PUFA plus adulteration risk. The approved list says "on occasion"; the tier rules say excluded.', 'D'),
 ('Most vegetables and mushrooms', 'Oxalates, phytates, goitrogens, lectins, chitin. Only romaine / iceberg lettuce is near-neutral.', 'D'),
 ('Oats, carrots, onions, garlic, all brassicas', 'Carrots: beta-carotene masking. Onion/garlic: quercetin. Brassicas: goitrogens.', 'D'),
 ('Nightshades other than well-cooked potato / sweet potato', 'Alkaloids.', 'D'),
 ('Apples, pears, berries, pomegranate, apple/pear juice, dried fruit, white rice', 'Fructose:glucose ratio and/or antinutrient load.', 'D'),
 ('Fermented plant foods', 'Sauerkraut, kimchi, tempeh, miso. Antinutrients persist; histamine load.', 'D'),
 ('Chicken, turkey, pork', 'PUFA too high vs ruminant meat. The approved list allows chicken and turkey "occasionally".', 'C'),
 ('Fatty fish', 'Salmon, mackerel, tuna.', 'D'), ('Processed meats', 'Bacon, sausage, deli meat.', 'D'),
 ('Plant proteins', 'Tofu, tempeh, seitan, legumes, soy/pea/hemp powders.', 'D')], DF, 'Excluded / minimised')
card('food', 'Daily targets', 'Ratio and micronutrient targets', 'list', [
 ('Zinc : copper 10:1', ''), ('Calcium : phosphorus 1:1 or higher', '1,200-1,500mg calcium a day from food. Dairy offsets phosphorus-heavy muscle meat.'),
 ('Fructose : glucose 1:1 in sugar sources', 'Honey, oranges, grapes, mango, papaya sit near this naturally.'),
 ('One third of protein from collagen', 'At 160g protein a day, 40-50g from gelatin, bone broth or collagen peptides.'),
 ('No iron supplements', 'Prioritise copper + preformed vitamin A instead: liver, oysters, egg yolks, butter.'),
 ('Potassium about 3,000mg a day', 'OJ + mango + raw milk.'), ('Selenium', 'Powers the T4 to T3 deiodinase enzymes. Oysters.'),
 ('B12 saturation', 'Ruminant meat, dairy, oysters, clams.'), ('Retinol, not beta-carotene', 'Milk fat, liver, egg yolk, butter.'),
 ('Carbs: 120g floor, 200-300g target', ''), ('Fat: 30-40% of calories', ''), ('A2 dairy preferred', 'Or goat / sheep / buffalo. Not a hard requirement.')],
 DF, 'Ratio and micronutrient targets')
card('food', 'Protocols', 'Meal timing', 'list', [
 ('Eat within 1-2 hours of waking', 'Fruit, juice, honey, or a yolk + dairy + honey shake.'), ('Eat every 4-5 hours', 'Do not skip meals.'),
 ('Front-load easy carbs', 'Juice, fruit, honey, dairy earlier; denser protein-and-fat meals midday and evening.'),
 ('Small sweet serving before bed', 'Honey, milk + honey, or fruit.'),
 ('Training days', 'Carbs before; carbs + protein within an hour after.')], DF, 'Meal timing protocol')
card('food', 'Protocols', 'Raw vs cooked', 'list', [
 ('Always raw', 'Dairy, meat (raw / rare), fruit, fresh-squeezed juice, raw honey.'),
 ('Always cooked: egg whites', 'Cooking neutralises avidin and trypsin inhibitors.'),
 ('Always cooked: starches / potato family', 'Pair cooked starch with saturated fat.'),
 ('When cooking', 'Lowest effective temperature. Never char, blacken or deep-fry. Never seed oils.')], DF, 'Raw vs cooked')
card('food', 'Protocols', 'Temp and pulse tracking', 'list', [
 ('Waking temperature', 'Before rising. Target 97.8-98.0F.'), ('Midday temperature', 'About 20 min after lunch. Target 98.6F.'),
 ('Resting pulse at both times', 'Target 75-85 BPM.'), ('Note hand/foot warmth, energy, mood, digestion', 'Fast pulse + warm reading with cold hands and anxiety is an adrenaline false positive.'),
 ('Track 2+ weeks before acting', 'If low, check in order: total food, macros, meal frequency, sleep, selenium / iodine / vitamin A.')],
 DF, 'Metabolic self-tracking')
card('food', 'Protocols', 'Dining out and PUFA damage limitation', 'list', [
 ('Chain order of preference', 'Vietnamese > Zizzi > Pizza Express > Subway. Vietnamese beef broth dishes top out around 85-90% compliance.'),
 ('Modify the order', 'Real butter instead of seed oils, skin-on / full-fat cuts, discard bread and pasta bases, processed meat only as a last resort.'),
 ('Repair stack on exposure days', 'Vitamin E (mixed tocopherols) 200-400 IU around the meal; vitamin C 500mg twice daily; NAC 600mg on an empty stomach.'),
 ('AGE-reduction marinade for cooked meat', 'Per ~500g: 2 tbsp lemon juice or ACV, 1 tsp sea salt, 1 tbsp melted ghee/butter, 30-60 min before. Reverse-sear or moist heat.')],
 DF, 'Damage-limitation protocols')
card('food', 'Example days', 'Optimal day of eating', 'list', ['300g raw grass-fed ribeye', '12 raw oysters', '80g raw organic honey', '1 mango',
 '32 oz fresh orange juice', '30g beef gelatin powder', '24 fl oz whole raw milk', '5 raw eggs'], DF, 'Optimal day of eating',
 note='About 2,500 kcal. The source gives two macro lines: P 170 / F 120 / C 185 and P 160 / F 106 / C 283.')
card('food', 'Example days', 'Alternative day of eating', 'list', ['16 fl oz whole raw milk', '1 litre fresh-squeezed orange juice',
 '6 whole eggs (cooked whites, runny yolk)', '4 raw egg yolks', '10 oz grass-fed ribeye', '12 raw oysters', '2.5 oz raw honey',
 '1 oz raw A2 butter or ghee'], DF, 'Alternative day of eating')
card('library', 'Diet principles', 'Objective and core method', 'note', [
 ('Raise', 'T3, testosterone, progesterone, pregnenolone, growth hormone, steady moderate insulin, leptin.'),
 ('Lower', 'Cortisol, adrenaline, reverse T3, excess estrogen, glucagon dominance.'),
 ('Method', 'PUFA / seed-oil elimination, antinutrient avoidance, raw-food preference where safe, scored with S/A/B/C/D tiers.')], DF, 'Objective')
card('library', 'Diet principles', 'Key learnings', 'note', [
 ('Glycine gap is the dominant failure mode', 'High meat without collagen is the worst-ranked violation.'),
 ('Beta-carotene masks retinol deficiency', ''), ('Lean protein fails the fat floor', '5% mince and skinless poultry undercut the 30-40% fat target.'),
 ('PUFA disqualifies otherwise good proteins', 'Mackerel, standard chicken thigh.'), ('Restaurant compliance is rare', ''),
 ('Safe vegetable additions are nearly zero', 'Only romaine / iceberg lettuce.'), ('Buy yield-adjusted', 'Raw weights must allow for cooking shrinkage and prep losses.'),
 ('Fermented dairy only if grass-fed and unpasteurised', 'Raw kefir, raw yogurt, cheese.'),
 ('Exclusions stay strict', 'Apples, pears, berries, white rice, EVOO and dried fruit stay out despite the more permissive Ray Peat-style source.')], DF, 'Key learnings')
card('library', 'Diet principles', 'Why the plate works', 'note', [
 ('T4 to T3 conversion', 'Carbs keep insulin present for DIO2; selenium from oysters powers DIO1/DIO2.'),
 ('Steroid cascade', 'Carb-driven T3 maintains cholesterol to pregnenolone conversion.'),
 ('Vitamin C pairing', 'With iron sources for absorption, and with gelatin.'),
 ('Gelatin offsets muscle meat', 'About 1:3 gelatin to muscle meat; gelatin has no tryptophan.'),
 ('Raw preparation', 'Keeps B vitamins, CoQ10, glutathione, creatine, enzymes; avoids lipid peroxidation.'),
 ('Raw milk and honey', 'Lactoferrin, lactase, lipase, immunoglobulins; honey enzymes stay active.'),
 ('Carb ranking criteria', 'Glucose:fructose ratio, digestibility, antinutrients, micronutrients, hydration, usability, no artificial ingredients.')],
 DF, 'Optimized principles')

# ---------------- Max : automatic import, one or more cards per heading ----------------
MAP = {  # heading prefix -> (area, group, kind)
 'Diet & Food': ('library', 'Diet archive', 'note'), 'DAILY TARGET': ('library', 'Diet archive', 'list'),
 'Holistic': ('library', 'Diet archive', 'list'), 'Supplements': ('food', 'Supplements', 'list'),
 'Raw primal': ('library', 'Diet archive', 'note'), 'rp diet': ('library', 'Diet archive', 'note'),
 'Optimised Daily Plate': ('library', 'Diet archive', 'note'), 'Products to buy': ('library', 'Products', 'list'),
 'Max Week Lifestyle': ('library', 'Lifestyle', 'note'), 'M/N Routine': ('routines', 'Daily rhythm', 'routine'),
 'Most Optimal': ('routines', 'Daily rhythm', 'routine'), 'Bad habits': ('methods', 'Habits', 'list'),
 'FULL ROUTINE': ('routines', 'Fascia & release', 'routine'), 'Methods / Facial': ('methods', 'Face methods', 'list'),
 'Misc Methods': ('methods', 'Misc methods', 'list'), 'Active Methods': ('methods', 'Face methods', 'list'),
 'Hard maxxs': ('methods', 'Hard maxx', 'list'), 'Physical / Recovery': ('library', 'Lifestyle', 'list'),
 'Stretching': ('routines', 'Fascia & release', 'routine'), 'Gym': ('routines', 'Training', 'routine'),
 'Yo talks': ('routines', 'Training', 'routine'), 'Sprints': ('routines', 'Training', 'routine'),
 'Meditation': ('routines', 'Breath & nervous system', 'routine'), 'Sleep': ('routines', 'Daily rhythm', 'routine'),
 'Surgery': ('methods', 'Surgery & peptides', 'list'), 'Professional health': ('library', 'Professional help', 'list'),
 'Charisma': ('library', 'Mindset & productivity', 'list'), 'Productivity': ('library', 'Mindset & productivity', 'note'),
 'The 1-Week Dopamine': ('library', 'Mindset & productivity', 'note'), 'Post-Detox': ('library', 'Mindset & productivity', 'note'),
 'Final Notes': ('library', 'Mindset & productivity', 'note'), 'Books': ('library', 'Books', 'list'),
 'o YT': ('library', 'Course notes', 'note'), 'O Course info': ('library', 'Course notes', 'note'),
 'Recipes': ('food', 'Recipes', 'list'), 'Notes': ('library', 'Hormones & detox notes', 'note'),
 'The Diet Protocol': ('library', 'Hormones & detox notes', 'note'), '2. Bentonite': ('library', 'Hormones & detox notes', 'note'),
 '3. Zeolite': ('library', 'Hormones & detox notes', 'note'), 'Phase 1': ('methods', 'Phase 1 protocol', 'list'),
 'j': ('library', 'Course notes', 'note'),
}
def clean(s):
    x = '~~' in s
    s = re.sub(r'~+', '', s); s = re.sub(r'\*+', '', s); s = s.replace('\\', '')
    s = re.sub(r'!\[[^\]]*\]\([^)]*\)', '', s); s = re.sub(r'\[([^\]]*)\]\((http[^)]*)\)', r'\1 (\2)', s)
    return re.sub(r'\s+', ' ', s).strip(), x
def split_item(t):
    for sep in (' -> ', ' - ', ': ', ' = ', ' – '):
        if sep in t:
            a, b = t.split(sep, 1)
            if 3 <= len(a) <= 70 and b.strip(): return a.strip(), b.strip()
    m = re.match(r'^(.{3,70}?)\s*\((.+)\)\s*$', t)
    if m: return m.group(1), m.group(2)
    if len(t) > 110:
        cut = t.rfind(' ', 0, 80); return t[:cut] + ' …', t
    return t, ''
def import_max(path):
    """One card per '# ' heading. Sub-headings become heading rows ('h') inside the card;
    nested bullets become the detail of the item above."""
    raw = open(path, encoding='utf8').read().split('\n')
    lines = [l.rstrip() for l in raw if l.strip() and '<!-- end list' not in l and not re.match(r'^\s*-{3,}\s*$', l)]
    bullet = re.compile(r'^(\s*)(?:-|\d+\.)\s+(.*)$')
    sec = key = cur = None
    def flush():
        if cur and any(not i.get('h') for i in cur):
            area, group, kind = MAP[key]
            card(area, group, sec, kind, cur, 'Max', sec)
    for n, l in enumerate(lines):
        h = re.match(r'^(#{1,4})\s+(.*)$', l)
        if h:
            name = re.sub(r'^[^A-Za-z0-9]+', '', clean(h.group(2))[0]).strip(': ')
            k = next((p for p in MAP if name.startswith(p)), None) if h.group(1) == '#' else None
            if k:
                flush(); sec, key, cur = name, k, []
            elif cur is not None and name:
                cur.append({'t': name, 'h': True})
            continue
        if cur is None: continue
        b = bullet.match(l)
        txt, x = clean(b.group(2) if b else l)
        if key == 'Recipes': txt = re.sub(r'^\d+\.\s*', '', txt) if False else txt
        txt = re.sub(r'^#+\s*', '', txt)
        if not re.search(r'[A-Za-z0-9]', txt): continue
        nxt = lines[n + 1] if n + 1 < len(lines) else ''
        if key == 'Recipes':
            if txt.lower().startswith('recipes:'):
                if len(txt) > 9: cur.append({'t': txt[8:].strip(), 'h': True})
            elif re.match(r'^\d+\.\s', l.replace(chr(92), '')): cur.append({'t': txt, 'd': ''})
            elif cur and not cur[-1].get('h'): cur[-1]['d'] = (cur[-1]['d'] + '\n' + txt).strip()
            continue
        indent = len(b.group(1)) if b else 0
        if b and indent >= 4 and cur and not cur[-1].get('h'):
            cur[-1]['d'] = ((cur[-1].get('d') or '') + '\n' + txt).strip(); continue
        if not b and txt.lower().strip(': ') == sec.lower(): continue
        if not b and len(txt) <= 60 and bullet.match(nxt):
            cur.append({'t': txt.strip(': '), 'h': True}); continue
        t, d = split_item(txt)
        it = {'t': t, 'd': d}
        if x: it['x'] = True
        cur.append(it)
    flush()
import_max(sys.argv[1])

# ---------------- Skool course: one card per lesson, in course order ----------------
SK = 'Skool: Health IS Looks'
GENERIC = {'Routine', 'Importance', 'Introduction', 'Daily Routine', 'Daily Rhythm', 'Sleep'}
def lesson_group(title, sec, ch):
    s = (title + ' ' + sec).lower()
    if 'posture' in ch.lower(): return 'Posture'
    if 'lymph' in s: return 'Lymphatic'
    if re.search(r'breath|pandicul|lajin|fascial endpoints', s): return 'Breath & nervous system'
    if re.search(r'workout|tendon|bone density', s): return 'Training'
    if re.search(r'facial|zygotape|myo|tongue|hollow cheeks|double chin|tmj', s): return 'Face & myo'
    if re.search(r'daily r|morning|midday|evening|puberty', s): return 'Daily rhythm'
    return 'Fascia & release'
def is_routine(title, sec):
    if re.search(r'importance|understanding|why |how to achieve|what |introduction|problems|philosophy', title, re.I): return False
    return bool(re.search(r'routine|workout|reset|drainage|full body release|breathwork|vortex breathing|pandiculation|lajin|'
                          r'how to walk|how to fix flat feet|tendon training|bone density training|the protocol|engaging fascial|daily rhythm',
                          title + ' ' + (sec if title == 'Routine' else ''), re.I))
def ctext(s):
    s = re.sub(r'\[\d+:\d+\]\(#t=[^)]*\)(\s*-\s*)?', '', s)
    s = re.sub(r'!\[[^\]]*\]\([^)]*\)', '', s)
    s = re.sub(r'\[([^\]]+)\]\((https?://[^)]+)\)', r'\1 (\2)', s)
    return re.sub(r'\s+', ' ', s.replace('**', '')).strip()
def import_course(path):
    t = open(path, encoding='utf8').read().split('\nTab Context:')[0]
    parts = re.split(r'^=====FILE: (.*?)=====\n', t, flags=re.M)[1:]
    n = 0
    for fpath, body in zip(parts[::2], parts[1::2]):
        if 'README' in fpath: continue
        n += 1
        title = re.search(r'^# (.*)$', body, re.M).group(1).strip()
        m = re.search(r'^\*(.+?) › (.+?)\*$', body, re.M)
        ch = re.sub(r'\s+', ' ', m.group(1)).strip(); sec = m.group(2).strip()
        sec = '' if sec == '(lessons)' else re.sub(r'^\d+-\s*', '', sec)
        title = re.sub(r'^\d+-\s*', '', title)
        shown = sec if title == 'Release Routine' and sec else title
        if title in GENERIC:
            if title.startswith('Daily R'): shown = title + ' (' + ch + ')'
            elif title == 'Routine' and sec: shown = sec if 'routine' in sec.lower() else sec + ' routine'
            elif sec: shown = sec + ': ' + title
            else: shown = title + ' (' + ch + ')'
        url = re.search(r'^Source: (\S+)', body, re.M); dur = re.search(r'Duration: (\d+)s', body)
        items, cur = [], None
        for l in body.split('\n'):
            raw = l.strip()
            if not raw or raw.startswith(('# ', 'Source:', '**Video', '*Duration')) or re.match(r'^\*.+ › .+\*$', raw): continue
            if re.match(r'^-{3,}$', raw): cur = None; continue
            h = re.match(r'^#{2,4}\s+(.*)$', raw)
            if h: items.append({'t': ctext(h.group(1)), 'h': True}); cur = None; continue
            x = ctext(raw)
            if not x: continue
            st = re.match(r'^\*\*(.+?)\*\*\s*(\([^)]*\))?$', re.sub(r'\[\d+:\d+\]\(#t=[^)]*\)(\s*-\s*)?', '', raw).strip())
            if st and '](' not in st.group(1):
                name = re.sub(r'^\d+\.\s*', '', ctext(st.group(1)))
                if name.endswith(':'): items.append({'t': name.strip(':'), 'h': True}); cur = None; continue
                meas = (st.group(2) or '').strip('()')
                mm = re.match(r'^(.*?)\s+-\s+(\d[^-]*)$', name) or re.match(r'^(.*?)\s*\(([^)]*)\)$', name)
                if mm and not meas: name, meas = mm.group(1), mm.group(2)
                cur = {'t': name, 'd': ''}
                if meas: cur['m'] = meas
                items.append(cur); continue
            b = re.match(r'^-\s+(.*)$', raw)
            if b:
                x = ctext(b.group(1))
                if cur is not None: cur['d'] = (cur['d'] + '\n• ' + x).strip()
                else:
                    mm = re.match(r'^(.*?)\s*\((https?://[^)]+)\)\s*(.*)$', x)
                    items.append({'t': mm.group(1), 'd': (mm.group(2) + ' ' + mm.group(3)).strip()} if mm else {'t': x})
                continue
            x = re.sub(r'^\*(.*)\*$', r'\1', x)
            if cur is not None: cur['d'] = (cur['d'] + '\n' + x).strip()
            else: items.append({'t': x, 'p': True})
        routine = is_routine(title, sec) and 'Products' not in ch and 'Puberty' not in sec
        if title == 'Diet': area, group = 'food', 'Course guide'
        elif routine: area, group = 'routines', lesson_group(title, sec, ch)
        else: area, group = 'library', ch
        card(area, group, shown, 'routine' if routine else 'note', items, SK, ch + (' › ' + sec if sec else ''))
        c = cards[-1]
        c['id'] = 'hil-%03d' % n
        c['course'] = {'ch': ch, 'sec': sec, 'n': n}
        if url: c['url'] = url.group(1)
        if dur: c['dur'] = int(dur.group(1))
        if title in ('The Ultimate Routine (Routine Only)', 'Facial Routine', 'Zygotape Routine'): c['days'] = ALL
if len(sys.argv) > 2: import_course(sys.argv[2])
json.dump(cards, sys.stdout, ensure_ascii=False)
