// WCAG contrast of the hub's real token pairs, read from index.html (light and dark)
const fs=require('fs'),css=fs.readFileSync(require('path').join(__dirname,'../index.html'),'utf8');
const style=css.slice(css.indexOf('<style>'),css.indexOf('</style>'));
const parse=t=>Object.fromEntries([...t.matchAll(/--([\w-]+):\s*(#[0-9A-Fa-f]{6})\b/g)].map(m=>[m[1],m[2]]));
const light={},dark={};
for(const m of style.matchAll(/(:root[^{]*)\{([^}]*)\}/g)) Object.assign(/data-theme/.test(m[1])?dark:light,parse(m[2]));
const lum=h=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4));return .2126*c[0]+.7152*c[1]+.0722*c[2]};
const cr=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const pairs=[['ink','bg',4.5,'body text'],['ink','surface',4.5,'text on cards'],['ink-2','bg',4.5,'secondary text'],['ink-3','bg',4.5,'muted labels'],['ink-3','surface',4.5,'muted on cards'],['ink-3','sunk',4.5,'muted on sunk/hover'],['clay-ink','bg',4.5,'eyebrow + links'],['link','surface',4.5,'links on cards'],['sage-ink','sage-soft',4.5,'sage badge'],['gold-ink','gold-soft',4.5,'gold badge'],['clay-ink','clay-soft',4.5,'clay badge'],['info-ink','info-soft',4.5,'info badge'],['on-primary','primary',4.5,'primary button / Next up'],['on-sel','sel',4.5,'selected chip'],['rail-ink','rail',4.5,'nav text'],['rail-dim','rail',4.5,'nav muted'],['rail-ink','rail-active',4.5,'nav current'],['focus','bg',3,'focus ring'],['op-line','surface',3,'OP frame'],['me-line','surface',3,'My notes frame'],['primary','bg',3,'checked tick / ring']];
for(const [name,t] of [['light',light],['dark',Object.assign({},light,dark)]]){ console.log('--',name); for(const [f,b,min,what] of pairs){ if(!t[f]||!t[b]){console.log('  ?',f,b,'token not a plain hex');continue} const r=cr(t[f],t[b]); console.log((r>=min?'  ok  ':'  LOW ')+r.toFixed(2).padStart(5)+' (min '+min+')  '+what.padEnd(26)+f+' '+t[f]+' on '+b+' '+t[b]); } }
