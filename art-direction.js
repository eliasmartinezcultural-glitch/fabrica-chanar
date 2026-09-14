/* FÁBRICA CHAÑAR · DIRECCIÓN ARTÍSTICA V1
   Capa visual sobre el único motor existente.
   No fabrica ni duplica runtime: mejora presentación, tarjeta y reverso.
*/
(()=>{'use strict';
const PALETTES={
 arena:{paper:'#fbf5e9',ink:'#2d2822',accent:'#806b52',gold:'#b58a4f',soft:'#eee5d7'},
 vid:{paper:'#faf8ef',ink:'#20231e',accent:'#49634d',gold:'#a88b55',soft:'#e7e3d8'},
 rio:{paper:'#f8fbf8',ink:'#1f2c2b',accent:'#3d6d6a',gold:'#b99a62',soft:'#dfe9e5'},
 terracota:{paper:'#fbf5e9',ink:'#30241d',accent:'#9a5637',gold:'#c49a5a',soft:'#efe2d2'},
 noche:{paper:'#33342d',ink:'#f6f0e3',accent:'#c19a5b',gold:'#d5b36e',soft:'#24251f'},
 ciruela:{paper:'#fff8f3',ink:'#35252d',accent:'#70475a',gold:'#bd9562',soft:'#eee2e6'},
 arcilla:{paper:'#fbf3eb',ink:'#3b2b24',accent:'#a46348',gold:'#c29a62',soft:'#eadbd0'},
 oliva:{paper:'#faf9ed',ink:'#303327',accent:'#68704b',gold:'#a48b50',soft:'#e7e7d8'}
};
const style=document.createElement('style');style.id='fabricaArtDirection';style.textContent=`
/* ART DIRECTION LOCK — tarjetas con identidad local */
.art-tools{display:flex;justify-content:center;gap:7px;flex-wrap:wrap;margin:0 0 8px}
.art-tools .btn{font-size:10px}
.art-tools .btn.active{background:#171713;color:#fff}
.piece.art-card{border:1px solid var(--art-accent,#806b52);background:var(--art-paper,#fff);box-shadow:0 22px 55px #0004;isolation:isolate}
.piece.art-card:before{content:'';position:absolute;inset:10px;border:1px solid color-mix(in srgb,var(--art-accent,#806b52) 45%,transparent);pointer-events:none;z-index:8}
.piece.art-card:after{content:'';position:absolute;width:58px;height:58px;right:-28px;bottom:-28px;border-radius:50%;border:1px solid var(--art-gold,#b58a4f);opacity:.6;pointer-events:none;z-index:8}
.art-badges{position:absolute;left:18px;top:18px;display:flex;gap:5px;flex-wrap:wrap;max-width:68%;z-index:9;pointer-events:none}
.art-badge{padding:6px 8px;border:1px solid var(--art-gold,#b58a4f);background:color-mix(in srgb,var(--art-paper,#fff) 88%,transparent);color:var(--art-ink,#2d2822);font:900 7px/1 system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;box-shadow:0 3px 8px #0002}
.art-badge.local{border-radius:999px}.art-badge.hand{border-radius:2px;transform:rotate(-1.5deg)}.art-badge.tour{border-radius:2px;transform:rotate(1.2deg)}
.art-badge.stamp{border-width:2px;border-radius:50%;padding:9px 7px;transform:rotate(-5deg);font-size:6px}
.piece.is-back>.art-badges,.piece.is-back>.prototype-mark{display:none}
.piece.is-back>.image,.piece.is-back>.body{visibility:hidden}
.art-back{position:absolute;inset:0;z-index:7;display:none;padding:36px;background:var(--art-paper,#fff);color:var(--art-ink,#2d2822);overflow:hidden}
.piece.is-back>.art-back{display:flex;flex-direction:column;justify-content:space-between}
.art-back:before{content:'';position:absolute;inset:14px;border:1px solid var(--art-accent,#806b52);opacity:.45;pointer-events:none}
.art-back .back-head,.art-back .back-main,.art-back .back-foot{position:relative;z-index:1}
.back-kicker{font:900 8px/1 system-ui,sans-serif;letter-spacing:.18em;color:var(--art-accent,#806b52);text-transform:uppercase}
.back-title{font:700 clamp(24px,4vw,38px)/1 Georgia,serif;margin:10px 0 5px;max-width:88%}
.back-sub{font:800 11px/1.35 system-ui,sans-serif;color:color-mix(in srgb,var(--art-ink,#2d2822) 78%,transparent);max-width:85%}
.back-rule{width:58px;height:2px;background:var(--art-gold,#b58a4f);margin:16px 0}
.back-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;margin:12px 0}
.back-chip{border:1px solid color-mix(in srgb,var(--art-accent,#806b52) 35%,transparent);padding:8px;background:color-mix(in srgb,var(--art-soft,#eee5d7) 55%,transparent);font:900 7px/1.2 system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase}
.back-copy{font:11px/1.45 system-ui,sans-serif;max-width:88%;color:color-mix(in srgb,var(--art-ink,#2d2822) 84%,transparent)}
.back-source{font:8px/1.35 system-ui,sans-serif;opacity:.68;max-width:88%;overflow-wrap:anywhere}
.back-sign{font:900 8px/1 system-ui,sans-serif;letter-spacing:.14em;color:var(--art-accent,#806b52)}
.photo-bank{border:1px solid #d4c8b6;border-radius:10px;background:#f8f3e9;margin-top:7px;overflow:hidden}
.photo-bank>summary{cursor:pointer;list-style:none;padding:9px 10px;font:900 9px/1.2 system-ui,sans-serif;letter-spacing:.09em;text-transform:uppercase;color:#315d65}
.photo-bank>summary::-webkit-details-marker{display:none}.photo-bank>summary:after{content:' +';float:right;font-size:13px}.photo-bank[open]>summary:after{content:' −'}
.photo-bank .photos{padding:8px;max-height:210px}.photo-bank .photo.pending{display:none}.photo-bank[open] .photo.pending{display:block}
.photo-bank-note{padding:0 10px 8px;font-size:8px;color:#746d63}
.photo-upload-title{display:block;font:900 9px/1.2 system-ui,sans-serif;letter-spacing:.09em;text-transform:uppercase;color:#315d65;margin-bottom:5px}
@media(max-width:520px){.art-back{padding:27px}.back-grid{grid-template-columns:1fr}.back-title{font-size:25px}.art-badges{left:15px;top:15px}}
`;document.head.appendChild(style);
function $(id){return document.getElementById(id)}
function selectedPhoto(){const b=document.querySelector('#photos .photo.active');if(b)return b;return null}
function photoInfo(){const b=selectedPhoto();return {id:b?.dataset?.photo||'',label:b?.title||'',src:b?.querySelector('span')?.textContent||''}}
function palette(){const t=($('previewTitle')?.textContent||'').toLowerCase();if(/pelón|fiesta|cosecha|tiempo/.test(t))return PALETTES.terracota;if(/vino|malma|schroeder|patritti|vendimia/.test(t))return PALETTES.vid;if(/río|sabores|turismo|explorá/.test(t))return PALETTES.rio;return PALETTES.arena}
function ensureTools(){const stage=document.querySelector('.stage');if(!stage||$('artTools'))return;const tools=document.createElement('div');tools.id='artTools';tools.className='art-tools';tools.innerHTML='<button class="btn" id="frontView">Frente</button><button class="btn" id="backView">Reverso</button><span class="status">Vista en tiempo real</span>';stage.parentElement.insertBefore(tools,stage);$('frontView').onclick=()=>setBack(false);$('backView').onclick=()=>setBack(true)}
function ensureBadges(){const piece=$('piece');if(!piece||$('artBadges'))return;const b=document.createElement('div');b.id='artBadges';b.className='art-badges';b.innerHTML='<span class="art-badge local">Muy local</span><span class="art-badge hand">Artesanal</span><span class="art-badge tour">Turismo Chañar</span>';piece.appendChild(b)}
function ensureBack(){const piece=$('piece');if(!piece||$('artBack'))return;const b=document.createElement('div');b.id='artBack';b.className='art-back';b.innerHTML='<div class="back-head"><div class="back-kicker">Fábrica Chañar · reverso editorial</div><div class="back-title" id="backTitle"></div><div class="back-sub" id="backSub"></div><div class="back-rule"></div></div><div class="back-main"><div class="back-grid"><div class="back-chip">San Patricio del Chañar</div><div class="back-chip">Identidad local</div><div class="back-chip">Turismo · Cultura</div></div><div class="back-copy" id="backCopy"></div></div><div class="back-foot"><div class="back-source" id="backSource"></div><div class="back-sign">OCARINA · HISTORIAS, PERSONAS Y TERRITORIO</div></div>';piece.appendChild(b)}
function setBack(on){const piece=$('piece');if(!piece)return;piece.classList.toggle('is-back',!!on);$('frontView')?.classList.toggle('active',!on);$('backView')?.classList.toggle('active',!!on);update()} 
function update(){ensureTools();ensureBadges();ensureBack();const piece=$('piece');if(!piece)return;const p=palette();piece.classList.add('art-card');piece.style.setProperty('--art-paper',p.paper);piece.style.setProperty('--art-ink',p.ink);piece.style.setProperty('--art-accent',p.accent);piece.style.setProperty('--art-gold',p.gold);piece.style.setProperty('--art-soft',p.soft);const title=$('previewTitle')?.textContent||'Pieza local';const sub=$('previewSubtitle')?.textContent||'';const body=$('previewBody')?.textContent||'';$('backTitle').textContent=title;$('backSub').textContent=sub;$('backCopy').textContent=body||'Una pieza editorial para reconocer San Patricio del Chañar desde su identidad local, su cultura, su producción y su vocación turística.';const meta=$('photoMeta')?.textContent||'';$('backSource').textContent=meta.replace(/\s+/g,' ').trim().slice(0,260)+' · Pieza diseñada en Fábrica Chañar.'}
function reorganizePhotos(){const upload=document.querySelector('.upload'),photos=$('photos'),count=$('photoCount');if(!upload||!photos||$('photoBank'))return;const title=document.createElement('span');title.className='photo-upload-title';title.textContent='Ingresá tu foto local';upload.prepend(title);const d=document.createElement('details');d.id='photoBank';d.className='photo-bank';const s=document.createElement('summary');s.textContent='Banco fotográfico local · referencias y fotos pendientes';d.appendChild(s);const n=document.createElement('div');n.className='photo-bank-note';n.textContent='Las referencias sirven para explorar; las fotos pendientes permanecen fuera de la fabricación comercial.';d.appendChild(n);if(count)d.appendChild(count);d.appendChild(photos);upload.insertAdjacentElement('afterend',d)}
function boot(){reorganizePhotos();ensureTools();ensureBadges();ensureBack();update();const mo=new MutationObserver(()=>{reorganizePhotos();update()});mo.observe(document.body,{subtree:true,childList:true});['input','change'].forEach(ev=>document.addEventListener(ev,e=>{if(e.target.matches('#title,#subtitle,#body,#category,#localPhoto'))setTimeout(update,20)}));document.addEventListener('click',e=>{if(e.target.closest('[data-photo],[data-template],[data-pilot],.curated-card'))setTimeout(update,80)});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else setTimeout(boot,30);
window.FABRICA_ART_DIRECTION={version:'1.0',rule:'arte local + turismo + reverso vivo'};
})();