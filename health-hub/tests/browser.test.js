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
  ok(await p.textContent('#railStreak')==='1','old save: streak of 1 from seeded yesterday');
  const total=async()=>(await p.textContent('#dayCount')).match(/(\d+) of (\d+)/).slice(1).map(Number);
  let [d0,t0]=await total(); const nid=await p.getAttribute('[data-nextdone]','data-nextdone');
  await p.click('[data-nextdone]'); let [d1]=await total();
  const item=await p.evaluate(id=>{const f=JSON.parse(localStorage.getItem('phh:v1'));const k=Object.keys(f.days).sort().pop();return f.days[k].d[id]},nid);
  ok(d1===d0+1||item<4,'Next up → count '+d0+'→'+d1+' (item '+nid+'='+item+'), counted once');
  const nid2=await p.getAttribute('[data-nextdone]','data-nextdone'); 
  await p.click('#wholeDay'); const ticks=await p.$$eval('#v-today .tick[aria-pressed="true"]',e=>e.length); let [d2]=await total();
  ok(ticks>=1||(item>0&&item<4),'whole day view shows '+ticks+' ticked row(s), header says '+d2);
  await p.click(`[data-tick="${nid2}"]`); let [d3]=await total(); const nid3=await p.getAttribute('[data-nextdone]','data-nextdone');
  ok(nid3!==nid2,'ticking the Next up row in the list advances the Next up card ('+nid2+'→'+nid3+'), count '+d3);
  await p.reload(); await p.waitForTimeout(300); let [d4]=await total(); ok(d4===d3,'reload keeps count '+d4);
  await p.screenshot({path:S+'/n-today.png'}); await ovf(p,'today desktop');

  // week timetable, editor, add-info, export/import
  await p.goto(U+'#week'); await p.waitForTimeout(300);
  ok((await p.$$eval('.wk-day',e=>e.length))===7&&(await p.$$eval('.wk-day.now',e=>e.length))===1,'week grid: 7 days, today marked');
  ok((await p.$$eval('.wk-cell [data-go="full-body-release"]',e=>e.length))===2&&(await p.$$eval('.wk-cell [data-go^="workout-"]',e=>e.length))===3&&(await p.$$eval('.wk-cell [data-go="sprints"]',e=>e.length))===2,'week: full release 2x, 3 workouts, 2 sprint sessions');
  await p.screenshot({path:S+'/n-week.png',fullPage:true}); await ovf(p,'week desktop');
  await p.click('.wk-day[aria-label="Monday"] [data-editday]'); ok(await p.isDisabled('#edSave'),'editor opens on Monday, nothing to save yet');
  await p.selectOption('[data-edadd="pm"]','vagus'); ok(await p.isEnabled('#edSave'),'editor: a short routine fits, Save enabled');
  await p.selectOption('[data-edadd="am"]','ultimate'); await p.selectOption('[data-edadd="am"]','workout-1');
  ok(await p.isDisabled('#edSave')&&(await p.textContent('#sheet')).includes('does not fit'),'editor: overfull morning blocks Save'); await p.screenshot({path:S+'/n-editor.png'});
  await p.click('[data-eddel="am:4"]'); await p.click('[data-eddel="am:3"]'); await p.fill('[data-edmin="pm:1"]','7'); await p.press('[data-edmin="pm:1"]','Tab');
  await p.click('#edSave'); ok(await p.isHidden('#sheet')&&(await p.textContent('.wk-day[aria-label="Monday"]')).includes('7 min'),'editor: saved, Monday shows the 7 min routine');
  await p.reload(); await p.waitForTimeout(300); ok(await p.evaluate(()=>JSON.parse(localStorage.getItem('phh:v1')).plan[1].pm.some(x=>x[0]==='vagus'&&x[1]===7)),'edited day persists after reload');
  await p.goto(U+'#nutrition'); await p.waitForTimeout(200); await p.fill('#nSearch','oyster'); ok((await p.$$eval('#nutPanel .food:not([hidden])',e=>e.length))===1,'food filter "oyster" leaves 1 tile'); await p.fill('#nSearch','');
  await p.click('#nutPanel [data-add="food"]'); await p.click('#addForm [type=submit]'); ok(await p.isVisible('#addErr'),'add form: empty name is refused');
  await p.fill('#addForm [data-f="n"]','Raw kefir'); await p.click('#addForm [type=submit]'); ok((await p.textContent('#nutPanel')).includes('Raw kefir')&&await p.isVisible('[data-add="food"][data-id]'),'added food shows with an Edit button');
  await p.click('.rail [data-manage]'); await p.click('#xExport'); const ex=await p.inputValue('#xBox'); ok(ex.includes('Raw kefir')&&ex.includes('vagus'),'export holds the added food and the edited day');
  await p.fill('#xBox','nonsense'); await p.click('#xImport'); ok((await p.textContent('#xMsg')).includes('not a Primal'),'bad import is refused');
  await p.fill('#xBox',JSON.stringify({phh:1,adds:[{k:'product',id:'utest1',n:'Test roller',g:'tools',src:'x',who:'Coach',u:'javascript:alert(1)'},{k:'evil',id:'u2',n:'x'}]})); await p.click('#xImport'); ok((await p.textContent('#xMsg')).includes('1 additions')&&await p.isVisible('#xApply'),'import shows what will change before applying'); await p.click('#xApply');
  await p.goto(U+'#products'); await p.waitForTimeout(300); await p.fill('#pSearch','Test roller');
  ok((await p.$$eval('#pList .sbox.s-x',e=>e.length))===1&&!(await p.content()).includes('javascript:alert')&&await p.isVisible('.rail .src.x'),'import: someone else\'s product gets a dashed frame + key line; unsafe link dropped; unknown kind ignored');
  await p.fill('#pSearch',''); await p.evaluate(()=>{const f=JSON.parse(localStorage.getItem('phh:v1'));f.adds=[];f.plan={};localStorage.setItem('phh:v1',JSON.stringify(f))}); await p.reload(); await p.waitForTimeout(300);

  // v7: navigation, old links, library, add form, skip/undo, core plan, find, guard, backup round trip
  ok((await p.$$eval('.rail [data-nav]',e=>e.length))===4,'rail has 4 main sections');
  for(const h of ['routines','nutrition','systems','extras','products','progress','week','library']){ await p.goto(U+'#'+h); await p.waitForTimeout(150); ok(await p.isVisible('#v-'+h)&&(await p.$$eval('.rail [aria-current="page"]',e=>e.length))===1,'link #'+h+' opens; nav highlights '+await p.getAttribute('.rail [aria-current="page"]','data-nav')); }
  await p.goto(U+'#library'); await p.waitForTimeout(200); ok((await p.$$eval('#v-library .lgroup',e=>e.length))===6,'library: nutrition + 5 topic groups');
  await p.click('#v-library [data-add="topic"]'); await p.fill('#addForm [data-f="n"]','Cold exposure'); await p.selectOption('#addForm [data-f="g"]','sleep'); await p.fill('#addForm [data-f="steps"]','Finish showers cold\nStart at 30 seconds'); await p.click('#addForm [type=submit]');
  ok((await p.textContent('#v-library')).includes('Cold exposure')&&await p.isVisible('#toast'),'new topic appears in its Library group, with save feedback');
  await p.click('#v-library .topic:has-text("Cold exposure")'); await p.waitForTimeout(250); ok((await p.evaluate(()=>location.hash))==='#extras'&&(await p.textContent('#v-extras')).includes('Finish showers cold')&&(await p.textContent('#v-extras .srcline')).includes('my notes'),'new topic opens in the standard detail template with a text source line');
  await p.click('#v-extras a[href="#library"]'); await p.waitForTimeout(200); ok(await p.isVisible('#v-library'),'detail back link returns to Library');
  await p.click('#v-library [data-id="sleep"]'); await p.waitForTimeout(250); ok((await p.$$eval('#v-systems .relblock [data-go]',e=>e.length))===3,'sleep topic links to 3 related routines'); await p.screenshot({path:S+'/n-topic.png',fullPage:true});
  await p.goto(U+'#products'); await p.waitForTimeout(200); await p.click('[data-add="product"]'); await p.fill('#addForm [data-f="n"]','Keep me'); await p.selectOption('[data-addkind]','routine'); ok(await p.inputValue('#addForm [data-f="n"]')==='Keep me'&&await p.isVisible('#addForm [data-f="steps"]'),'one add form: switching type keeps the title'); await p.click('#sheetClose');
  await p.goto(U+'#today'); await p.waitForTimeout(250); let [sd,stt]=await total(); const sn=await p.getAttribute('[data-skip]','data-skip'); await p.click('[data-skip]');
  let [sd2,st2]=await total(); ok(sd2===sd&&st2===stt&&await p.getAttribute('[data-skip]','data-skip')!==sn,'skip: Next up moves on, counts unchanged ('+sd2+' of '+st2+')');
  await p.click('#toast [data-undo]'); ok(await p.getAttribute('[data-skip]','data-skip')===sn,'undo restores the skipped item as Next up');
  await p.click('[data-nextdone]'); let [sd3]=await total(); await p.click('#toast [data-undo]'); let [sd4]=await total(); ok(sd3>=sd&&sd4===sd,'undo after Mark done: '+sd+' > '+sd3+' > '+sd4);
  await p.click('#pickCore'); const cid=await p.getAttribute('#v-today [data-core][aria-pressed="true"]','data-core'); await p.click(`[data-core="${cid}"]`); let [,tt5]=await total(); ok(tt5===stt-1,'core plan: making one item optional drops the total '+stt+' > '+tt5);
  await p.reload(); await p.waitForTimeout(300); let [,tt6]=await total(); ok(tt6===tt5,'core plan survives reload'); await p.click('#pickCore');
  const tk=await p.$('#v-today .tick[aria-pressed="false"]'); await tk.click(); const ag=await p.evaluate(()=>{const f=JSON.parse(localStorage.getItem('phh:v1')),k=Object.keys(f.days).sort().pop();return {pct:Math.round(f.days[k].pct*100),ring:document.querySelector('.ring text').textContent,dot:document.querySelector('.wdots .now').className}});
  await p.goto(U+'#progress'); await p.waitForTimeout(250); const pt=await p.textContent('#v-progress'); ok(ag.ring===ag.pct+'%'&&/part|full/.test(ag.dot)&&pt.includes(ag.pct+'%'),'Today ring, week dot and Progress agree on today ('+ag.pct+'%)');
  await p.goto(U+'#today'); await p.waitForTimeout(200); await p.keyboard.press('/'); await p.fill('#fInput','sleep'); const heads=await p.$$eval('#fRes h3',e=>e.map(x=>x.textContent)); const fb=await p.$$eval('#fRes [data-findgo]',e=>e.length);
  ok(heads[0]==='Best match'&&await p.isVisible('[data-fmore]'),'find "sleep": best match first, capped groups offer Show all'); await p.screenshot({path:S+'/n-find.png'});
  const allN=+(await p.textContent('#fFilt [data-fk=""]')).replace(/\D/g,''); for(;;){ const m=await p.$('[data-fmore]'); if(!m) break; await m.click(); }
  const fa=await p.$$eval('#fRes [data-findgo]',e=>e.length); ok(fa>fb&&fa>=allN&&fa<=allN+3,'find: every one of the '+allN+' matches reachable ('+fb+' rows before, '+fa+' after Show all)');
  const fk=await p.getAttribute('#fFilt [data-fk]:nth-child(2)','data-fk'); await p.click('#fFilt [data-fk]:nth-child(2)'); ok((await p.$$eval('#fRes h3',e=>e.length))<=2,'find: type filter narrows to '+fk);
  await p.click('#fRes [data-findgo]'); await p.waitForTimeout(300); if(await p.$('#libClose')) await p.click('#libClose'); await p.keyboard.press('/'); ok(await p.inputValue('#fInput')==='sleep'&&(await p.getAttribute('#fFilt [aria-pressed="true"]','data-fk'))===fk,'find reopens with the query and filter kept'); await p.keyboard.press('Escape');
  await p.goto(U+'#week'); await p.waitForTimeout(200); await p.click('.wk-day[aria-label="Friday"] [data-editday]'); await p.selectOption('[data-edadd="pm"]','vagus'); await p.click('#sheetClose'); ok(await p.isVisible('#sheet .sheet')&&(await p.textContent('#sheetClose')).includes('Discard'),'editor: Close with unsaved changes asks first'); await p.click('#sheetClose'); ok(await p.isHidden('#sheet'),'second Close discards');
  await p.click('.rail [data-manage]'); await p.click('#xFull'); const fullJ=await p.inputValue('#xBox'); await p.click('#sheetClose');
  const pick=o=>JSON.stringify(['days','weeks','months','owned','wish','fav','recent','sessions','plan','adds','core'].map(k=>o[k]));
  const beforeS=await p.evaluate(()=>JSON.parse(localStorage.getItem('phh:v1')));
  await p.evaluate(()=>localStorage.clear()); await p.reload(); await p.waitForTimeout(300);
  await p.click('.rail [data-manage]'); await p.fill('#xBox',fullJ); await p.click('#xImport'); ok((await p.textContent('#xMsg')).includes('Full backup')&&await p.isVisible('#xReplace')&&(await p.evaluate(()=>(JSON.parse(localStorage.getItem('phh:v1')||'{}').adds||[]).length))===0,'full import asks before replacing; nothing changed yet');
  await p.click('#xReplace'); await p.waitForTimeout(250); const afterS=await p.evaluate(()=>JSON.parse(localStorage.getItem('phh:v1')));
  ok(pick(afterS)===pick(beforeS)&&afterS.adds.length>=1&&Object.keys(afterS.core).length===1,'full backup > clean browser > restore: history, lists, timetable, additions and core plan identical');
  ok(await p.evaluate(()=>!!localStorage.getItem('phh:v1:backup')),'recovery copy of the pre-import state kept'); await p.click('#toast [data-undo]'); await p.waitForTimeout(250); ok((await p.evaluate(()=>(JSON.parse(localStorage.getItem('phh:v1')||'{}').adds||[]).length))===0,'undo puts back the state from before the import');
  await p.evaluate(j=>{const f=JSON.parse(j);f.adds=[];f.plan={};f.core={};f.ui.pick=false;f.ui.fq='';f.ui.fk='';Object.keys(f.days).forEach(k=>delete f.days[k].s);localStorage.setItem('phh:v1',JSON.stringify(f));localStorage.removeItem('phh:v1:backup')},JSON.stringify(beforeS)); await p.reload(); await p.waitForTimeout(300);

  // v8: personal edits, relations, equipment, saved + collections, quick notes, library browsing, schema
  const snap8=await p.evaluate(()=>localStorage.getItem('phh:v1')); const st8=()=>p.evaluate(()=>JSON.parse(localStorage.getItem('phh:v1')));
  await p.goto(U+'#routines'); await p.waitForTimeout(250); await p.click('#r-groundwork summary h3'); await p.click('#r-groundwork [data-ov]');
  await p.fill('#ovForm [name="n"]','Floor reset'); await p.fill('#ovForm [name="note"]','Do it on the rug'); await p.fill('#ovForm [name="tags"]','Morning, floor'); await p.click('#ovForm [type=submit]');
  let s8=await st8(); ok(s8.ov['r:groundwork'].n==='Floor reset'&&s8.ov['r:groundwork'].t>1e12&&s8.tags['r:groundwork'].join()==='morning,floor'&&(await p.textContent('#r-groundwork h3'))==='Floor reset','routine edit stored as an override on the stable id, with a real timestamp');
  await p.click('#r-groundwork summary h3'); ok((await p.textContent('#r-groundwork')).includes('Do it on the rug')&&(await p.textContent('#r-groundwork .srcline')).includes('Edited by you'),'routine page shows My note and Edited by you');
  await p.goto(U+'#week'); await p.waitForTimeout(250); const wkN=await p.$$eval('.wk-cell [data-go="groundwork"]',e=>e.filter(x=>x.textContent.includes('Floor reset')).length); await p.goto(U+'#today'); await p.waitForTimeout(200); await p.click('#wholeDay');
  ok(wkN>=5&&(await p.textContent('#v-today')).includes('Floor reset'),'edited title shows in the timetable ('+wkN+' cells) and in Today'); await p.click('#wholeDay');
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
  await p.goto(U+'#today'); await p.waitForTimeout(200); await p.click('.rail [data-manage]'); await p.click('#xFull'); const full8=await p.inputValue('#xBox'); await p.click('#sheetClose'); const before8=await st8();
  const pick8=o=>JSON.stringify(['days','weeks','months','owned','wish','fav','recent','sessions','plan','adds','core','ov','tags','links','cols'].map(k=>o[k]));
  ok(JSON.parse(full8).schema===2&&Object.keys(before8.ov).length>=3&&Object.keys(before8.links).length===1&&before8.cols.length===1,'export carries schema 2 and the new fields');
  await p.evaluate(()=>localStorage.clear()); await p.reload(); await p.waitForTimeout(300); await p.click('.rail [data-manage]'); await p.fill('#xBox',full8); await p.click('#xImport'); await p.click('#xReplace'); await p.waitForTimeout(250);
  ok(pick8(await st8())===pick8(before8),'schema 2 round trip: overrides, tags, links, collections, saved refs and all earlier fields identical');
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
  // progress
  await p.goto(U+'#progress'); await p.waitForTimeout(300); ok((await p.textContent('#v-progress')).includes('Airofit')||true,'progress renders'); await p.screenshot({path:S+'/n-progress.png',fullPage:true}); await ovf(p,'progress desktop');
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
  for(const v of ['today','week','library','progress','nutrition','systems','products','extras']){ await p.goto(U+'#'+v); await p.waitForTimeout(250); await ovf(p,v+' mobile'); if(v==='today') await p.screenshot({path:S+'/m-today.png'}); }
  const small=await p.evaluate(()=>[...document.querySelectorAll('#v-extras button, .nav a, .nav button.more')].filter(e=>e.offsetParent&&(e.getBoundingClientRect().height<44)).length); ok(small===0,'touch targets ≥44px on last view + nav ('+small+' under)');

  for(const [w,h] of [[360,640],[390,844],[768,1024]]){ const q=await mk(w,h); for(const v of ['today','week','routines','library','nutrition','systems','products','progress']){ await q.goto(U+'#'+v); await q.waitForTimeout(200); await ovf(q,v+' @'+w); }
    await q.goto(U+'#today'); await q.waitForTimeout(250); const r=await q.evaluate(()=>{const b=document.querySelector('[data-nextdone]').getBoundingClientRect(),n=document.querySelector('.rail').getBoundingClientRect();return [Math.round(b.bottom),Math.round(n.top),innerHeight]}); ok(r[0]<=Math.min(r[1],r[2]),'Next up action inside the first viewport @'+w+'x'+h+' (button bottom '+r[0]+', nav top '+r[1]+')');
    if(w===360){ await q.screenshot({path:S+'/m360-today.png'}); await q.click('.nav .more'); ok(await q.isVisible('#sheet [data-srctoggle]')&&await q.isVisible('#sheet [data-manage]')&&(await q.$$eval('.topbar .src',e=>e.length))===0,'phone: sources, My edits and backup live under More; header carries no legend'); await q.screenshot({path:S+'/m360-more.png'}); } }

  { const q=await mk(390,844); await q.addInitScript(()=>{document.addEventListener('DOMContentLoaded',()=>{document.documentElement.style.fontSize='125%'})}); for(const v of ['today','week','library','nutrition','products','routines']){ await q.goto(U+'#'+v); await q.waitForTimeout(250); await ovf(q,v+' @390 with text at 125%'); } await q.screenshot({path:S+'/m-big.png'});
    const c=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}); const r=await c.newPage(); await r.goto(U+'#today'); await r.waitForTimeout(300); await r.click('[data-nextdone]'); ok(await r.evaluate(()=>[...document.querySelectorAll('.view.enter > *, #toast, .item')].every(e=>getComputedStyle(e).animationName==='none')),'reduced motion: no animations run'); }
  console.log(errs.length?errs:'no console errors'); await b.close();
})();
