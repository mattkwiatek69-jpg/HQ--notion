const { chromium } = require('playwright');
const S=process.env.PHH_OUT||require('os').tmpdir(), U=process.env.PHH_URL||'http://localhost:8765/index.html';
const ok=(c,m)=>console.log((c?'PASS ':'FAIL ')+m);
(async()=>{
  const b=await chromium.launch(); const errs=[];
  const mk=async(w,h,dark)=>{const c=await b.newContext({viewport:{width:w,height:h},colorScheme:dark?'dark':'light'});const p=await c.newPage();p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push('PAGEERR '+e.message));return p;};
  const ovf=async(p,n)=>{const o=await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);ok(o<=0,n+' no horizontal overflow ('+o+')');};
  let p=await mk(1440,900);
  // seed a v1-shaped save to prove old data survives
  await p.goto(U); await p.evaluate(()=>{const d=new Date();d.setDate(d.getDate()-1);const k=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');localStorage.setItem('phh:v1',JSON.stringify({days:{[k]:{d:{'w-sun':1,'d-airofit':1},pct:.9}},weeks:{},months:{},owned:{'Zygotape':1,'Froggy Mouth':1},ui:{}}))});
  await p.reload(); await p.waitForTimeout(400);
  const st0=()=>p.evaluate(()=>JSON.parse(localStorage.getItem('phh:v1')||'{}'));
  ok(await p.isVisible('#v-week')&&!(await p.$('#railStreak'))&&!(await p.$('.tick'))&&!(await p.$('[data-nextdone]'))&&!(await p.$('#v-progress')),'opens on the week planner; no ticks, streak, Next up or Progress');
  ok(Object.keys((await st0()).days).length===1&&(await st0()).owned.Zygotape===1,'old saved history and lists stay in storage');
  ok((await p.$$eval('.pcol',e=>e.length))===7&&(await p.$$eval('.pcol.now',e=>e.length))===1,'planner: 7 days, today marked');
  ok((await p.$$eval('.pchip[data-insp="full-body-release"]',e=>e.length))===2&&(await p.$$eval('.pchip[data-insp^="workout-"]',e=>e.length))===3&&(await p.$$eval('.pchip[data-insp="sprints"]',e=>e.length))===2,'week: full release 2x, 3 workouts, 2 sprint sessions');
  ok((await p.textContent('.pcheck')).includes('2 things')&&await p.isDisabled('#v-week [data-undo2]'),'supplied week: two notes to look at, nothing to undo');
  await p.screenshot({path:S+'/n-week.png',fullPage:true}); await ovf(p,'week desktop');
  await p.click('.pcol[aria-label="Monday"] .pchip[data-insp="hollow-cheeks"]');
  ok((await p.textContent('#sheet')).includes('What is in it')&&(await p.$$eval('#sheet .iparts li',e=>e.length))>3&&(await p.$$eval('#sheet [data-tog][aria-pressed="true"]',e=>e.length))===1&&(await p.textContent('#sheet .ifacts')).includes('Daily'),'routine panel shows what is in it, what the source says and where it sits');
  await p.click('#sheet [data-step="imin"][data-v="1"]'); ok((await p.textContent('.pcol[aria-label="Monday"] .pchip[data-insp="hollow-cheeks"]')).includes('25 min')&&(await p.textContent('#imin'))==='25','minutes stepper changes that session');
  await p.click('#sheet [data-tog="3|pm"]'); ok((await p.$$eval('#sheet [data-tog][aria-pressed="true"]',e=>e.length))===2&&(await p.$$eval('.pchip[data-insp="hollow-cheeks"]',e=>e.length))===2,'choosing a square adds the routine to that day');
  await p.click('#sheet [data-tog="3|pm"]'); ok((await p.$$eval('.pchip[data-insp="hollow-cheeks"]',e=>e.length))===1,'choosing it again removes it');
  await p.click('#sheet [data-step="iaim"][data-v="1"]'); await p.click('#sheet [data-step="iaim"][data-v="1"]'); await p.click('#sheetClose');
  ok((await st0()).freq['hollow-cheeks']===2&&(await p.textContent('.pcheck')).includes('3 things'),'an aim of 2 a week is saved and the planner notes the routine is under it');
  await p.click('[data-pick="1|pm"]'); await p.fill('#pkQ','vagus'); ok((await p.$$eval('#pkList .prow:not([hidden])',e=>e.length))===1,'picker filters'); await p.click('#pkList [data-pickrid="vagus"]');
  ok(await p.isHidden('#sheet')&&(await p.$$eval('.pcol[aria-label="Monday"] .pchip[data-insp="vagus"]',e=>e.length))===1,'picker adds a routine to the chosen slot');
  await p.click('[data-pick="1|am"]'); await p.click('#pkList [data-pickrid="ultimate"]'); await p.click('[data-pick="1|am"]'); await p.click('#pkList [data-pickrid="workout-1"]');
  ok(await p.isVisible('.pcol[aria-label="Monday"] .pover')&&(await p.textContent('.pcheck')).includes('not fit')&&(await st0()).plan[1].am.length===5,'an overfull morning is saved but flagged as not fitting'); await p.screenshot({path:S+'/n-editor.png'});
  await p.click('#v-week [data-undo2]'); await p.click('#v-week [data-undo2]'); ok(!(await p.$('.pover'))&&(await p.$$eval('.pchip[data-insp="vagus"]',e=>e.length))===1,'Undo steps back one change at a time');
  await p.click('#v-week [data-redo2]'); ok((await p.$$eval('.pcol[aria-label="Monday"] .pchip[data-insp="ultimate"]',e=>e.length))===1,'Redo puts a change back'); await p.click('#v-week [data-undo2]');
  await p.dragAndDrop('.pcol[aria-label="Monday"] .pchip[data-insp="vagus"]','.pcell[data-cell="2|bed"]'); ok((await p.$$eval('.pcell[data-cell="2|bed"] .pchip[data-insp="vagus"]',e=>e.length))===1&&(await p.$$eval('.pcol[aria-label="Monday"] .pchip[data-insp="vagus"]',e=>e.length))===0,'drag and drop moves a routine to another day and slot');
  await p.evaluate(()=>document.activeElement&&document.activeElement.blur()); await p.keyboard.press('Control+z'); ok((await p.$$eval('.pcol[aria-label="Monday"] .pchip[data-insp="vagus"]',e=>e.length))===1,'Ctrl+Z undoes the move');
  await p.reload(); await p.waitForTimeout(300); ok((await st0()).plan[1].pm.some(x=>x[0]==='vagus'),'edited day persists after reload');
  await p.click('.pcol[aria-label="Monday"] [data-openday]'); await p.waitForTimeout(250);
  ok((await p.evaluate(()=>location.hash))==='#today'&&/Monday|Today/.test(await p.textContent('#v-today h1'))&&(await p.$$eval('#v-today .trow',e=>e.length))>15&&(await p.textContent('#v-today .tblock time'))==='06:30','day view lists the whole day in clock order');
  await p.click('#dayEdit'); await p.fill('[data-attime="morning"]','07:15'); await p.waitForTimeout(100); ok((await st0()).plan[1].at.morning==='07:15'&&(await p.textContent('#v-today')).includes('07:15'),'a start time can be changed for the day');
  await p.click('#v-today [data-hide="i:w-sun"]'); ok(!(await p.textContent('#v-today')).includes('morning sun')&&(await st0()).hide['i:w-sun']===1,'a supplied daily habit can be deleted');
  await p.click('#toast [data-undo]'); await p.waitForTimeout(150); ok((await p.textContent('#v-today')).includes('morning sun'),'and brought straight back with Undo'); await p.click('#dayEdit');
  await p.screenshot({path:S+'/n-today.png'}); await ovf(p,'day desktop');
  await p.goto(U+'#nutrition'); await p.waitForTimeout(200); await p.fill('#nSearch','oyster'); ok((await p.$$eval('#nutPanel .food:not([hidden])',e=>e.length))===1,'food filter "oyster" leaves 1 tile'); await p.fill('#nSearch','');
  await p.click('#nutPanel [data-add="food"]'); await p.click('#addForm [type=submit]'); ok(await p.isVisible('#addErr'),'add form: empty name is refused');
  await p.fill('#addForm [data-f="n"]','Raw kefir'); await p.click('#addForm [type=submit]'); ok((await p.textContent('#nutPanel')).includes('Raw kefir')&&await p.isVisible('[data-add="food"][data-id]'),'added food shows with an Edit button');
  await p.click('.rail [data-manage]'); await p.click('#xExport'); const ex=await p.inputValue('#xBox'); ok(ex.includes('Raw kefir')&&ex.includes('vagus'),'export holds the added food and the edited day');
  await p.fill('#xBox','nonsense'); await p.click('#xImport'); ok((await p.textContent('#xMsg')).includes('not a Primal'),'bad import is refused');
  await p.fill('#xBox',JSON.stringify({phh:1,adds:[{k:'product',id:'utest1',n:'Test roller',g:'tools',src:'x',who:'Coach',u:'javascript:alert(1)'},{k:'evil',id:'u2',n:'x'}]})); await p.click('#xImport'); ok((await p.textContent('#xMsg')).includes('1 additions')&&await p.isVisible('#xApply'),'import shows what will change before applying'); await p.click('#xApply');
  await p.goto(U+'#products'); await p.waitForTimeout(300); await p.fill('#pSearch','Test roller');
  ok((await p.$$eval('#pList .sbox.s-x',e=>e.length))===1&&!(await p.content()).includes('javascript:alert')&&await p.isVisible('.rail .src.x'),'import: someone else\'s product gets a dashed frame + key line; unsafe link dropped; unknown kind ignored');
  await p.fill('#pSearch',''); await p.evaluate(()=>{const f=JSON.parse(localStorage.getItem('phh:v1'));f.adds=[];f.plan={};localStorage.setItem('phh:v1',JSON.stringify(f))}); await p.reload(); await p.waitForTimeout(300);

  // compare: routines, gym, exercises, side by side
  await p.goto(U+'#compare'); await p.waitForTimeout(300); const snapC=await p.evaluate(()=>localStorage.getItem('phh:v1'));
  ok((await p.$$eval('#cmpBody .crow',e=>e.length))>35&&(await p.textContent('#cmpBody .crow:has([data-insp="full-body-release"]) .ccount b'))==='2','compare lists every non-gym routine with its times a week');
  await p.click('[data-cday="full-body-release|4"]'); ok((await p.textContent('#cmpBody .crow:has([data-insp="full-body-release"]) .ccount')).includes('3')&&(await p.evaluate(()=>JSON.parse(localStorage.getItem('phh:v1')).plan[4].pm.some(x=>x[0]==='full-body-release'))),'a day letter adds the routine to that day in its usual slot; the count shows it is over its aim');
  await p.click('[data-cday="full-body-release|4"]'); ok((await p.textContent('#cmpBody .crow:has([data-insp="full-body-release"]) .ccount b'))==='2','the same letter removes it');
  await p.check('[data-csel="full-body-release"]'); await p.check('[data-csel="fascia-activation"]'); ok((await p.$$eval('.cside-col',e=>e.length))===2&&(await p.$$eval('.cside .iparts li',e=>e.length))>20,'two ticked routines show side by side with their exercises');
  await p.selectOption('#cmpSort','most'); ok(+(await p.textContent('#cmpBody .crow .ccount b'))>=7,'sort by most often'); await p.selectOption('#cmpSort','group');
  await p.click('[data-ctab="gym"]'); const gy=await p.$$eval('#cmpBody .linkname',e=>e.map(x=>x.dataset.insp)); ok(gy.includes('workout-1')&&gy.includes('apt')&&!gy.includes('sprints')&&!gy.includes('groundwork'),'Gym holds strength sessions and routines that need gym equipment ('+gy.length+')');
  await p.click('[data-cday="bone-density|4"]'); await p.goto(U+'#week'); await p.waitForTimeout(200); ok((await p.$$eval('.pcell[data-cell="4|train"] .pchip[data-insp="bone-density"]',e=>e.length))===1,'a gym change in Compare lands in the Training slot of the week'); await p.goto(U+'#compare'); await p.waitForTimeout(200);
  await p.click('[data-ctab="ex"]'); ok((await p.$$eval('#cmpBody .crow.ex',e=>e.length))>150&&+(await p.textContent('#cmpBody .crow.ex .ccount b'))>=10,'exercises: every exercise with how many times a week it comes up'); await p.screenshot({path:S+'/n-compare.png'}); await ovf(p,'compare desktop');
  await p.click('[data-ctab="rt"]'); await p.evaluate(j=>localStorage.setItem('phh:v1',j),snapC); await p.reload(); await p.waitForTimeout(300);

  // v7: navigation, old links, library, add form, skip/undo, core plan, find, guard, backup round trip
  ok((await p.$$eval('.rail [data-nav]',e=>e.length))===4,'rail has 4 main sections');
  for(const h of ['routines','nutrition','systems','extras','products','week','today','library']){ await p.goto(U+'#'+h); await p.waitForTimeout(150); ok(await p.isVisible('#v-'+h)&&(await p.$$eval('.rail [aria-current="page"]',e=>e.length))===1,'link #'+h+' opens; nav highlights '+await p.getAttribute('.rail [aria-current="page"]','data-nav')); }
  await p.goto(U+'#progress'); await p.waitForTimeout(150); ok(await p.isVisible('#v-week'),'the old #progress link lands on the week');
  await p.goto(U+'#library'); await p.waitForTimeout(200); ok((await p.$$eval('#v-library .lgroup',e=>e.length))===6,'library: nutrition + 5 topic groups');
  await p.click('#v-library [data-add="topic"]'); await p.fill('#addForm [data-f="n"]','Cold exposure'); await p.selectOption('#addForm [data-f="g"]','sleep'); await p.fill('#addForm [data-f="steps"]','Finish showers cold\nStart at 30 seconds'); await p.click('#addForm [type=submit]');
  ok((await p.textContent('#v-library')).includes('Cold exposure')&&await p.isVisible('#toast'),'new topic appears in its Library group, with save feedback');
  await p.click('#v-library .topic:has-text("Cold exposure")'); await p.waitForTimeout(250); ok((await p.evaluate(()=>location.hash))==='#extras'&&(await p.textContent('#v-extras')).includes('Finish showers cold')&&(await p.textContent('#v-extras .srcline')).includes('my notes'),'new topic opens in the standard detail template with a text source line');
  await p.click('#v-extras a[href="#library"]'); await p.waitForTimeout(200); ok(await p.isVisible('#v-library'),'detail back link returns to Library');
  await p.click('#v-library [data-id="sleep"]'); await p.waitForTimeout(250); ok((await p.$$eval('#v-systems .relblock [data-go]',e=>e.length))===3,'sleep topic links to 3 related routines'); await p.screenshot({path:S+'/n-topic.png',fullPage:true});
  await p.goto(U+'#products'); await p.waitForTimeout(200); await p.click('[data-add="product"]'); await p.fill('#addForm [data-f="n"]','Keep me'); await p.selectOption('[data-addkind]','routine'); ok(await p.inputValue('#addForm [data-f="n"]')==='Keep me'&&await p.isVisible('#addForm [data-f="steps"]'),'one add form: switching type keeps the title'); await p.click('#sheetClose');
  await p.goto(U+'#today'); await p.waitForTimeout(200); await p.keyboard.press('/'); await p.fill('#fInput','sleep'); const heads=await p.$$eval('#fRes h3',e=>e.map(x=>x.textContent)); const fb=await p.$$eval('#fRes [data-findgo]',e=>e.length);
  ok(heads[0]==='Best match'&&await p.isVisible('[data-fmore]'),'find "sleep": best match first, capped groups offer Show all'); await p.screenshot({path:S+'/n-find.png'});
  const allN=+(await p.textContent('#fFilt [data-fk=""]')).replace(/\D/g,''); for(;;){ const m=await p.$('[data-fmore]'); if(!m) break; await m.click(); }
  const fa=await p.$$eval('#fRes [data-findgo]',e=>e.length); ok(fa>fb&&fa>=allN&&fa<=allN+3,'find: every one of the '+allN+' matches reachable ('+fb+' rows before, '+fa+' after Show all)');
  const fk=await p.getAttribute('#fFilt [data-fk]:nth-child(2)','data-fk'); await p.click('#fFilt [data-fk]:nth-child(2)'); ok((await p.$$eval('#fRes h3',e=>e.length))<=2,'find: type filter narrows to '+fk);
  await p.click('#fRes [data-findgo]'); await p.waitForTimeout(300); if(await p.$('#libClose')) await p.click('#libClose'); await p.keyboard.press('/'); ok(await p.inputValue('#fInput')==='sleep'&&(await p.getAttribute('#fFilt [aria-pressed="true"]','data-fk'))===fk,'find reopens with the query and filter kept'); await p.keyboard.press('Escape');
  await p.click('.rail [data-manage]'); await p.click('#xFull'); const fullJ=await p.inputValue('#xBox'); await p.click('#sheetClose');
  const pick=o=>JSON.stringify(['days','weeks','months','owned','wish','fav','recent','sessions','plan','adds','core'].map(k=>o[k]));
  const beforeS=await p.evaluate(()=>JSON.parse(localStorage.getItem('phh:v1')));
  await p.evaluate(()=>localStorage.clear()); await p.reload(); await p.waitForTimeout(300);
  await p.click('.rail [data-manage]'); await p.fill('#xBox',fullJ); await p.click('#xImport'); ok((await p.textContent('#xMsg')).includes('Full backup')&&await p.isVisible('#xReplace')&&(await p.evaluate(()=>(JSON.parse(localStorage.getItem('phh:v1')||'{}').adds||[]).length))===0,'full import asks before replacing; nothing changed yet');
  await p.click('#xReplace'); await p.waitForTimeout(250); const afterS=await p.evaluate(()=>JSON.parse(localStorage.getItem('phh:v1')));
  ok(pick(afterS)===pick(beforeS)&&afterS.adds.length>=1,'full backup > clean browser > restore: history, lists, timetable, and additions identical');
  ok(await p.evaluate(()=>!!localStorage.getItem('phh:v1:backup')),'recovery copy of the pre-import state kept'); await p.click('#toast [data-undo]'); await p.waitForTimeout(250); ok((await p.evaluate(()=>(JSON.parse(localStorage.getItem('phh:v1')||'{}').adds||[]).length))===0,'undo puts back the state from before the import');
  await p.evaluate(j=>{const f=JSON.parse(j);f.adds=[];f.plan={};f.core={};f.ui.pick=false;f.ui.fq='';f.ui.fk='';Object.keys(f.days).forEach(k=>delete f.days[k].s);localStorage.setItem('phh:v1',JSON.stringify(f));localStorage.removeItem('phh:v1:backup')},JSON.stringify(beforeS)); await p.reload(); await p.waitForTimeout(300);

  // v8: personal edits, relations, equipment, saved + collections, quick notes, library browsing, schema
  const snap8=await p.evaluate(()=>localStorage.getItem('phh:v1')); const st8=()=>p.evaluate(()=>JSON.parse(localStorage.getItem('phh:v1')));
  await p.goto(U+'#routines'); await p.waitForTimeout(250); await p.click('#r-groundwork summary h3'); await p.click('#r-groundwork [data-ov]');
  await p.fill('#ovForm [name="n"]','Floor reset'); await p.fill('#ovForm [name="note"]','Do it on the rug'); await p.fill('#ovForm [name="tags"]','Morning, floor'); await p.click('#ovForm [type=submit]');
  let s8=await st8(); ok(s8.ov['r:groundwork'].n==='Floor reset'&&s8.ov['r:groundwork'].t>1e12&&s8.tags['r:groundwork'].join()==='morning,floor'&&(await p.textContent('#r-groundwork h3'))==='Floor reset','routine edit stored as an override on the stable id, with a real timestamp');
  await p.click('#r-groundwork summary h3'); ok((await p.textContent('#r-groundwork')).includes('Do it on the rug')&&(await p.textContent('#r-groundwork .srcline')).includes('Edited by you'),'routine page shows My note and Edited by you');
  await p.goto(U+'#week'); await p.waitForTimeout(250); const wkN=await p.$$eval('.pchip[data-insp="groundwork"]',e=>e.filter(x=>x.textContent.includes('Floor reset')).length); await p.goto(U+'#today'); await p.waitForTimeout(200);
  ok(wkN>=5&&(await p.textContent('#v-today')).includes('Floor reset'),'edited title shows in the planner ('+wkN+' places) and in the day view');
  await p.keyboard.press('/'); await p.fill('#fInput','floor reset'); const f1=await p.textContent('#fRes'); await p.fill('#fInput','rug'); const f2=await p.textContent('#fRes'); await p.fill('#fInput',''); await p.keyboard.press('Escape');
  ok(f1.includes('Floor reset')&&f2.includes('My notes'),'search finds the edited title and the personal note');
  await p.goto(U+'#routines'); await p.waitForTimeout(200); await p.click('#r-groundwork summary h3'); await p.click('#r-groundwork [data-ov]'); ok((await p.textContent('#ovForm .orig')).includes('Groundwork'),'View original shows the supplied title'); await p.click('#ovRestore');
  s8=await st8(); ok(!s8.ov['r:groundwork']&&s8.tags['r:groundwork'].length===2&&(await p.textContent('#r-groundwork h3')).includes('Groundwork'),'Restore original removes only that override; tags stay');
  await p.click('#toast [data-undo]'); await p.waitForTimeout(150); ok((await st8()).ov['r:groundwork'].n==='Floor reset','undo brings the edit back');
  await p.goto(U+'#library'); await p.waitForTimeout(250); await p.click('#v-library [data-id="sleep"]'); await p.waitForTimeout(250); await p.click('#v-systems [data-ov="t:sleep"]'); await p.fill('#ovForm [name="intro"]','My sleep rules'); await p.click('#ovForm [data-reldel]'); await p.selectOption('#ovForm [data-reladd]','r:vagus'); await p.click('#ovForm [type=submit]');
  ok((await p.$$eval('#v-systems .relblock [data-go]',e=>e.length))===3&&(await p.textContent('#v-systems .relblock')).includes('Linked by you')&&(await p.textContent('#v-systems .relblock')).includes('not confirmed'),'topic links: one suggestion removed, one added by you, suggestions labelled unconfirmed');
  await p.click('#v-systems [data-fav="t:sleep"]'); await p.goto(U+'#routines'); await p.waitForTimeout(200); await p.fill('#rSearch',''); await p.click('[data-cat="nervous"]'); await p.click('#r-vagus summary h3'); ok((await p.textContent('#r-vagus .relblock')).includes('Linked from'),'backlink: the routine shows the topic that links to it'); await p.click('[data-cat=""]');
  await p.click('[data-cat="tape"]'); await p.click('#r-zygotape summary h3'); const eqT=await p.textContent('#r-zygotape .eqlist'); ok(eqT.includes('Owned')&&eqT.includes('Facial oil'),'equipment: Zygotape shows Owned from the product list; unmatched Facial oil stays plain text'); await p.click('[data-cat=""]');
  await p.goto(U+'#products'); await p.waitForTimeout(250); await p.fill('#pSearch','Foam roller'); ok((await p.$$eval('#pList .usedin [data-go]',e=>e.length))>=3,'product row lists the routines that use it'); await p.click('#pList [data-wish="Foam roller"]');
  await p.click('#pList [data-ov]'); await p.fill('#ovForm [name="note"]','Borrowed one'); await p.click('#ovForm [type=submit]'); ok((await p.textContent('#pList')).includes('Borrowed one'),'product note saved'); await p.fill('#pSearch','');
  await p.goto(U+'#routines'); await p.waitForTimeout(200); await p.click('#r-full-body-release summary h3'); ok((await p.textContent('#r-full-body-release .eqlist')).includes('Wishlist'),'equipment status follows the wishlist');
  await p.click('.rail [data-saved]'); ok((await p.textContent('#sheet')).includes('My sleep rules')===false&&(await p.$$eval('#sheet [data-topic][data-id="sleep"]',e=>e.length))===1,'Saved lists the starred topic'); await p.fill('#colName','To research'); await p.click('#colNew'); await p.click('#sheetClose');
  await p.goto(U+'#nutrition'); await p.waitForTimeout(200); await p.click('[data-nut="approved"]'); await p.click('#nutPanel [data-ov^="f:"]'); await p.fill('#ovForm [name="note"]','Local farm'); await p.check('#ovForm [name^="col-"]'); await p.click('#ovForm [type=submit]');
  s8=await st8(); ok((await p.textContent('#nutPanel')).includes('My note: Local farm')&&s8.cols[0].items.length===1&&s8.cols[0].items[0].startsWith('f:'),'food note saved and the food joined the collection by reference');
  await p.goto(U+'#library'); await p.waitForTimeout(250); await p.click('#v-library .head-side [data-add="note"]'); await p.fill('#addForm [data-f="n"]','Check magnesium types'); await p.fill('#addForm [data-f="steps"]','Glycinate vs citrate'); await p.fill('#addForm [data-f="u"]','https://example.org/mg'); await p.click('#addForm [type=submit]');
  ok(await p.isVisible('#lg-inbox')&&(await p.textContent('#lg-inbox')).includes('Check magnesium types'),'quick note lands in the Library Inbox'); await p.click('#lg-inbox [data-add="note"]'); await p.selectOption('#addForm [data-f="g"]','sleep'); await p.click('#addForm [type=submit]'); ok(!(await p.$('#lg-inbox')),'filing the note empties the Inbox');
  ok((await p.$$eval('#v-library .jump [data-anchor]',e=>e.length))===6,'library jump bar reaches all 6 groups'); await p.click('[data-lview="list"]'); ok((await p.$$eval('#v-library .lrow',e=>e.length))===20,'compact list shows 20 topics'); await p.reload(); await p.waitForTimeout(300); ok((await p.$$eval('#v-library .lrow',e=>e.length))===20,'layout choice survives reload');
  await p.fill('#libQ','thyr'); ok((await p.$$eval('#v-library .lrow',e=>e.length))===1,'local filter narrows to 1'); await p.fill('#libQ',''); await p.selectOption('#libSort','mine'); ok((await p.textContent('#v-library .lrow b'))==='Sleep','Mine first puts the edited topic on top'); await p.selectOption('#libSort','group'); await p.click('[data-lview="cards"]');
  await p.evaluate(()=>window.scrollTo(0,700)); await p.click('#v-library [data-id="thyroid"]'); await p.waitForTimeout(250); await p.click('#v-systems a[href="#library"]'); await p.waitForTimeout(300); const sy=await p.evaluate(()=>Math.round(scrollY)); ok(sy>600&&sy<800,'back to Library returns to the same scroll position ('+sy+')');
  await p.goto(U+'#routines'); await p.waitForTimeout(250); await p.click('[data-cat="nervous"]'); await p.click('#r-lajin summary h3'); await p.click('#r-lajin [data-ov]'); await p.click('#ovForm [data-hide]');
  ok(!(await p.$('#r-lajin'))&&(await st8()).hide['r:lajin']===1,'a supplied routine can be deleted');
  await p.click('.rail [data-manage]'); ok((await p.textContent('#sheet')).includes('Lajin')); await p.click('#sheet [data-unhide="r:lajin"]'); await p.click('#sheetClose'); ok(!!(await p.$('#r-lajin'))&&!(await st8()).hide['r:lajin'],'and restored from My edits');
  await p.click('[data-cat=""]'); await p.click('#r-groundwork summary h3'); await p.click('#r-groundwork [data-ov]'); await p.click('#ovForm [data-dup]'); await p.waitForTimeout(150);
  const stp=await p.inputValue('#addForm [data-f="steps"]'); await p.fill('#addForm [data-f="n"]','My floor flow'); await p.fill('#addForm [data-f="steps"]',stp+'\nMy extra stretch'); await p.click('#addForm [type=submit]');
  const nid=(await st8()).adds.filter(a=>a.k==='routine').pop().id; await p.click('#r-'+nid+' summary h3');
  ok(stp.split('\n').length>=5&&(await p.textContent('#r-'+nid+' h3'))==='My floor flow'&&(await p.textContent('#r-'+nid)).includes('My extra stretch')&&(await p.$$eval('#r-'+nid+' .exthumb',e=>e.length))>=3,'Duplicate and edit makes an editable copy that keeps the pictures of unchanged steps');
  await p.goto(U+'#products'); await p.waitForTimeout(250); await p.fill('#pSearch','Marbles'); await p.click('#pList [data-ov]'); await p.fill('#ovForm [name="n"]','Glass marbles'); await p.fill('#ovForm [name="p"]','3.5'); await p.click('#ovForm [type=submit]');
  ok((await p.textContent('#pList')).includes('Glass marbles')&&(await p.textContent('#pList')).includes('£3.50')&&(await st8()).ov['p:Marbles'].p==='3.5','a supplied product can be renamed and priced; its record key is unchanged'); await p.fill('#pSearch','');
  await p.goto(U+'#nutrition'); await p.waitForTimeout(200); await p.click('[data-nut="approved"]'); const fN=await p.$$eval('#nutPanel .food',e=>e.length); await p.click('#nutPanel .fgroup:nth-of-type(2) [data-ov^="f:"]'); await p.fill('#ovForm [name="n"]','Raw butter only'); await p.click('#ovForm [type=submit]');
  ok((await p.textContent('#nutPanel')).includes('Raw butter only'),'a supplied food can be reworded'); await p.click('#nutPanel .fgroup:nth-of-type(3) [data-ov^="f:"]'); await p.click('#ovForm [data-hide]');
  ok((await p.$$eval('#nutPanel .food',e=>e.length))===fN-1&&Object.keys((await st8()).hide).some(k=>k[0]==='f'),'and a food can be deleted');
  await p.goto(U+'#today'); await p.waitForTimeout(200); await p.click('.rail [data-manage]'); await p.click('#xFull'); const full8=await p.inputValue('#xBox'); await p.click('#sheetClose'); const before8=await st8();
  const pick8=o=>JSON.stringify(['days','weeks','months','owned','wish','fav','recent','sessions','plan','adds','core','ov','tags','links','cols','hide','freq'].map(k=>o[k]));
  ok(JSON.parse(full8).schema===3&&Object.keys(before8.ov).length>=3&&Object.keys(before8.links).length===1&&before8.cols.length===1&&Object.keys(before8.hide).length>=1&&Object.keys(before8.freq).length>=1,'export carries schema 3 and the new fields');
  await p.evaluate(()=>localStorage.clear()); await p.reload(); await p.waitForTimeout(300); await p.click('.rail [data-manage]'); await p.fill('#xBox',full8); await p.click('#xImport'); await p.click('#xReplace'); await p.waitForTimeout(250);
  ok(pick8(await st8())===pick8(before8),'schema 3 round trip: overrides, tags, links, collections, deleted items, aims, saved refs and all earlier fields identical');
  await p.click('.rail [data-manage]'); await p.fill('#xBox',JSON.stringify({phh:1,schema:99,days:{}})); await p.click('#xImport'); ok((await p.textContent('#xMsg')).includes('newer backup format')&&pick8(await st8())===pick8(before8),'future-format import refused, data untouched');
  const v7={phh:1,exported:'2026-11-13',days:{'2026-11-10':{d:{'w-sun':1},pct:.5}},weeks:{},months:{},owned:{Zygotape:1},wish:{},fav:{groundwork:1},recent:[],sessions:[],ui:{},core:{'w-sun':0},plan:{},adds:[]};
  await p.fill('#xBox',JSON.stringify(v7)); await p.click('#xImport'); await p.click('#xReplace'); await p.waitForTimeout(250); s8=await st8();
  ok(s8.days['2026-11-10'].pct===.5&&s8.core['w-sun']===0&&s8.fav.groundwork===1&&JSON.stringify([s8.ov,s8.tags,s8.links,s8.cols])==='[{},{},{},[]]','version 7 backup restores with empty defaults for the new fields');
  const many=Array.from({length:100},(_,i)=>({k:'topic',id:'ubulk'+i,n:'Bulk topic '+i,g:['move','sleep','energy','env','ref'][i%5],note:'Summary '+i,steps:'Line',src:'me',tags:i%2?'even':'odd'}));
  await p.evaluate(a=>{const f=JSON.parse(localStorage.getItem('phh:v1'));f.adds=a;localStorage.setItem('phh:v1',JSON.stringify(f))},many); await p.goto(U+'#library'); await p.reload(); await p.waitForTimeout(400);
  const perf=await p.evaluate(()=>{const i=document.getElementById('libQ');const t=performance.now();i.value='bulk topic 7';i.dispatchEvent(new Event('input',{bubbles:true}));return [Math.round(performance.now()-t),document.querySelectorAll('#v-library .topic').length]});
  ok(perf[1]===11&&perf[0]<120,'100 added topics use the same templates; filtering 120 takes '+perf[0]+' ms'); await p.fill('#libQ',''); ok((await p.$$eval('#v-library .topic',e=>e.length))===120&&(await p.$$eval('#v-library [data-ltag]',e=>e.length))===2,'120 topics, tag chips appear');
  await p.evaluate(()=>document.activeElement.blur()); await p.keyboard.press('/'); const ft=await p.evaluate(()=>{const i=document.getElementById('fInput');const t=performance.now();i.value='bulk';i.dispatchEvent(new Event('input',{bubbles:true}));return Math.round(performance.now()-t)}); const fn=+(await p.textContent('#fFilt [data-fk=""]')).replace(/\D/g,''); ok(ft<300&&fn>=100,'global search reindexed after the bulk add: '+fn+' matches for "bulk" in '+ft+' ms'); await p.fill('#fInput',''); await p.keyboard.press('Escape');
  // focus containment + return
  await p.goto(U+'#library'); await p.waitForTimeout(300); await p.focus('#v-library [data-add="topic"]'); await p.keyboard.press('Enter'); let inside=true; for(let i=0;i<30;i++){ await p.keyboard.press('Tab'); inside=inside&&await p.evaluate(()=>!!document.activeElement.closest('#sheet')); }
  await p.keyboard.press('Escape'); ok(inside&&await p.isHidden('#sheet')&&await p.evaluate(()=>document.activeElement.dataset.add==='topic'),'dialog keeps Tab focus inside; Escape closes and returns focus to the opener');
  await p.evaluate(j=>{localStorage.setItem('phh:v1',j);localStorage.removeItem('phh:v1:backup')},snap8); await p.reload(); await p.waitForTimeout(300);
  // routines filter + fav + player
  await p.goto(U+'#routines'); await p.waitForTimeout(300);
  await p.fill('#rSearch','vortex'); let n=await p.$$eval('.rt',e=>e.length); ok(n>=2&&n<10,'search "vortex" → '+n+' routines');
  await p.fill('#rSearch','zzzz'); ok(await p.isVisible('#rClear'),'no-result empty state with clear button'); await p.click('#rClear');
  await p.click('[data-cat="gym"]'); n=await p.$$eval('.rt',e=>e.length); ok(n===8,'Gym filter → '+n+' routines'); await p.click('[data-cat=""]');
  await p.click('[data-fav="groundwork"]'); ok(await p.isVisible('#rStrips [data-go="groundwork"]'),'favourite appears in strip');
  await p.screenshot({path:S+'/n-routines.png'});
  await p.click('#r-apt summary h3'); await p.click('[data-play="apt"]'); await p.waitForTimeout(200);
  ok(await p.textContent('#plState')==='Ready','player ready state');
  await p.click('#plRun'); await p.waitForTimeout(1300); ok(await p.textContent('#plState')==='Running'&&await p.textContent('#plClock')!=='0:00','player running, clock '+await p.textContent('#plClock'));
  await p.click('#plRun'); const c1=await p.textContent('#plClock'); await p.waitForTimeout(700); ok(await p.textContent('#plState')==='Paused'&&await p.textContent('#plClock')===c1,'player paused holds '+c1);
  ok(await p.isDisabled('#plPrev'),'Back disabled on step 1');
  for(let i=0;i<4;i++) await p.click('#plNext'); ok((await p.textContent('#plName')).includes('Dead Bugs')&&await p.isVisible('.libfig svg.pic'),'step 5 Dead Bugs shows library illustration');
  await p.screenshot({path:S+'/n-player.png'});
  await p.click('#plPrev'); ok((await p.textContent('#plName')).includes('Psoas'),'Back goes to Psoas Release');
  for(let i=0;i<20;i++){ if(await p.$('#plNext')) await p.click('#plNext'); else break; }
  ok(await p.isVisible('#plDone'),'finished state shown'); await p.screenshot({path:S+'/n-finish.png'}); await p.click('#plDone');
  ok(await p.evaluate(()=>JSON.parse(localStorage.getItem('phh:v1')).sessions.length===1&&JSON.parse(localStorage.getItem('phh:v1')).recent[0]==='apt'),'session logged, routine in recents');
  // pacer still works
  await p.click('[data-cat="breath"]'); await p.click('#r-vortex summary h3'); await p.click('[data-pacer="vortex"]'); await p.click('#pcRun'); await p.waitForTimeout(1200); ok(await p.textContent('#pcCount')==='20'||await p.textContent('#pcCount')==='19','breath pacer counts down ('+await p.textContent('#pcCount')+')'); await p.click('#pcClose');
  // library
  await p.goto(U+'#routines'); await p.click('#v-routines [data-rtab="lib"]'); await p.waitForTimeout(300);
  let lc=await p.$$eval('.libcard',e=>e.length); ok(lc===274,'library grid shows '+lc);
  await p.fill('#lSearch','thumbpull'); lc=await p.$$eval('.libcard',e=>e.length); ok(lc>=5&&lc<20,'library search "thumbpull" → '+lc);
  await p.fill('#lSearch',''); await p.click('[data-ltype="movement"]'); lc=await p.$$eval('.libcard',e=>e.length); ok(lc===57,'movement filter → '+lc);
  await p.screenshot({path:S+'/n-lib.png'});
  await p.click('.libcard'); ok(await p.isVisible('#libClose'),'library detail opens'); await p.screenshot({path:S+'/n-libdlg.png'});
  await p.keyboard.press('Escape'); ok(await p.isHidden('#libdlg'),'Escape closes library detail');
  await p.click('#v-routines [data-rtab=""]'); await p.click('[data-cat=""]'); ok(await p.isVisible('#rSearch'),'back to routines tab');
  const thumbs=await p.$$eval('.exthumb',e=>e.length); ok(thumbs>150,'routine rows carry '+thumbs+' thumbnails');
  const broken=await p.evaluate(()=>[...new Set([...document.querySelectorAll('image')].map(i=>i.getAttribute('href')))]);
  const st=await Promise.all(broken.map(u=>p.evaluate(u=>fetch(u).then(r=>r.status),u))); ok(st.every(x=>x===200),'all '+st.length+' sheet files load');
  // find anything + source key
  await p.goto(U+'#today'); await p.waitForTimeout(200); await p.keyboard.press('/'); ok(await p.isVisible('#fInput'),'find anything opens with /');
  await p.fill('#fInput','thyroid'); let fr=await p.$$eval('#fRes button',e=>e.length); ok(fr>3,'find "thyroid" → '+fr+' results'); await p.screenshot({path:S+'/n-find.png'});
  await p.fill('#fInput','oyster'); await p.click('#fRes button'); await p.waitForTimeout(300); ok(await p.isHidden('#find'),'result click closes search → '+await p.evaluate(()=>location.hash));
  await p.keyboard.press('/'); await p.fill('#fInput','seiza position'); await p.keyboard.press('Enter'); await p.waitForTimeout(400); ok((await p.evaluate(()=>location.hash))==='#routines','Enter opens first hit ('+await p.evaluate(()=>location.hash)+')');
  if(await p.$('#libClose')) await p.click('#libClose');
  ok((await p.$$eval('.rail .key .src:not([hidden])',e=>e.length))===3,'source key in rail has 3 entries'); await p.click('.rail [data-srctoggle]'); ok(await p.evaluate(()=>document.documentElement.classList.contains('plain')),'colour switch turns panels plain'); await p.reload(); ok(await p.evaluate(()=>document.documentElement.classList.contains('plain')),'plain mode survives reload'); await p.click('.rail [data-srctoggle]');
  await p.goto(U+'#nutrition'); await p.waitForTimeout(300); await p.click('[data-nut="approved"]'); ok((await p.$$eval('#v-nutrition .sbox.s-me',e=>e.length))>=4&&(await p.$$eval('#v-nutrition .sbox.s-op',e=>e.length))>=1&&(await p.$$eval('#v-nutrition .food',e=>e.length))>=40&&(await p.$$eval('#v-nutrition .food img',e=>e.length))>=25,'nutrition marks mine vs OP; '+(await p.$$eval('#v-nutrition .food img',e=>e.length))+' of '+(await p.$$eval('#v-nutrition .food',e=>e.length))+' foods have a picture'); await p.screenshot({path:S+'/n-nut.png'});
  // products
  await p.goto(U+'#products'); await p.waitForTimeout(300); ok((await p.$$eval('#v-products .sbox.s-me',e=>e.length))>10&&(await p.$$eval('#v-products .sbox.s-both',e=>e.length))>5,'products carry source marks');
  const counts=async()=>p.$$eval('#v-products .tabs .badge',e=>e.map(x=>+x.textContent));
  let c=await counts(); ok(c[1]===0&&c[2]===2,'wishlist starts empty ('+c[1]+'), owned from old save kept ('+c[2]+')');
  await p.click('[data-wish="Mastic gum"]'); await p.click('[data-wish="Froggy Mouth"]').catch(()=>{}); await p.click('[data-wish="Kinesiology tape"]'); c=await counts(); ok(c[1]===2,'wishlist now '+c[1]);
  await p.click('[data-ptab="wishlist"]'); await p.click('[data-pri="Mastic gum"][data-v="1"]'); ok((await p.textContent('#pList')).includes('High priority')&&(await p.textContent('#pList')).includes('£25.99'),'priority set; known cost £25.99');
  await p.screenshot({path:S+'/n-wishlist.png'});
  await p.click('[data-own="Mastic gum"]'); c=await counts(); ok(c[1]===1&&c[2]===3,'mark owned moves it: wishlist '+c[1]+', owned '+c[2]);
  // systems
  await p.goto(U+'#library'); await p.waitForTimeout(300); ok((await p.$$eval('#v-library .topic:not(.ncard)',e=>e.length))===20,'20 topic cards in the library'); await p.screenshot({path:S+'/n-systems.png'});
  await p.click('#v-library [data-id="thyroid"]'); await p.waitForTimeout(300); ok((await p.$$eval('.anchors .chip',e=>e.length))>=3,'thyroid detail has section anchors'); await p.screenshot({path:S+'/n-thyroid.png'});
  await p.goto(U+'#nutrition'); await p.click('[data-nut="plate"]'); await p.click('[data-macro="b"]'); ok((await p.textContent('#nutPanel')).includes('Your target'),'macro target selectable'); await p.screenshot({path:S+'/n-plate.png',fullPage:true}); await ovf(p,'nutrition desktop');
  // mobile
  p=await mk(400,860,true); await p.goto(U+'#routines'); await p.waitForTimeout(400);
  ok(await p.isVisible('#rSearch')&&await p.isVisible('[data-sheet="rcat"]')&&!(await p.isVisible('[data-cat="gym"]')),'mobile: search + Groups button visible, chips hidden');
  await p.click('[data-sheet="rcat"]'); await p.screenshot({path:S+'/m-sheet.png'}); await p.click('[data-sheetpick="lymph"]'); ok(await p.textContent('#rcatLabel')==='Lymphatic drainage'&&(await p.$$eval('.rt',e=>e.length))===4,'mobile drawer filter → label + 4 routines'); await ovf(p,'routines mobile');
  await p.click('#r-big6 summary h3'); await p.click('[data-play="big6"]'); await p.screenshot({path:S+'/m-player.png'}); await ovf(p,'player mobile'); await p.click('#plClose');
  for(const v of ['today','week','library','nutrition','systems','products','extras']){ await p.goto(U+'#'+v); await p.waitForTimeout(250); await ovf(p,v+' mobile'); if(v==='today') await p.screenshot({path:S+'/m-today.png'}); }
  const small=await p.evaluate(()=>[...document.querySelectorAll('#v-extras button, .nav a, .nav button.more')].filter(e=>e.offsetParent&&(e.getBoundingClientRect().height<44)).length); ok(small===0,'touch targets ≥44px on last view + nav ('+small+' under)');

  for(const [w,h] of [[360,640],[390,844],[768,1024]]){ const q=await mk(w,h); for(const v of ['today','week','compare','routines','library','nutrition','systems','products','extras']){ await q.goto(U+'#'+v); await q.waitForTimeout(200); await ovf(q,v+' @'+w); }
    await q.goto(U+'#week'); await q.waitForTimeout(250); const r=await q.evaluate(()=>{const c=document.querySelector('.pcol.sel .pchip').getBoundingClientRect(),s=document.querySelector('.pstrip').getBoundingClientRect(),n=document.querySelector('.rail').getBoundingClientRect();return [Math.round(s.top),Math.round(c.top),Math.round(n.top)]}); ok(r[0]<r[2]&&r[1]<r[2],'day strip and the first routine sit inside the first viewport @'+w+'x'+h+' (strip '+r[0]+', routine '+r[1]+', nav '+r[2]+')');
    if(w===360){ await q.screenshot({path:S+'/m360-week.png'}); await q.click('.nav .more'); ok(await q.isVisible('#sheet [data-srctoggle]')&&await q.isVisible('#sheet [data-manage]')&&(await q.$$eval('.topbar .src',e=>e.length))===0,'phone: sources, My edits and backup live under More; header carries no legend'); await q.screenshot({path:S+'/m360-more.png'}); } }

  { const q=await mk(390,844); await q.addInitScript(()=>{document.addEventListener('DOMContentLoaded',()=>{document.documentElement.style.fontSize='125%'})}); for(const v of ['today','week','library','nutrition','products','routines']){ await q.goto(U+'#'+v); await q.waitForTimeout(250); await ovf(q,v+' @390 with text at 125%'); } await q.screenshot({path:S+'/m-big.png'});
    const c=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}); const r=await c.newPage(); await r.goto(U+'#today'); await r.waitForTimeout(300); await r.click('.pstrip button'); ok(await r.evaluate(()=>[...document.querySelectorAll('.view.enter > *, #toast, .pchip, .sheet')].every(e=>getComputedStyle(e).animationName==='none')),'reduced motion: no animations run'); }
  console.log(errs.length?errs:'no console errors'); await b.close();
})();
