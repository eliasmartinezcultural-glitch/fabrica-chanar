/* FÁBRICA CHAÑAR — DIRECCIÓN DE PRODUCTO CERRADA v7
   UNA COLECCIÓN / CUATRO PRODUCTOS / UNA SUPERFICIE
   Este módulo pertenece exclusivamente al flujo de PRODUCTOS MAESTROS.
   No interviene en la fabricación central de piezas.
*/
(function(){
  const RECIPES={
    'mp-puerta-chanar':{family:'welcome',format:'POSTAL 10×15',paper:'algodón cálido',product:'postal'},
    'mp-vinedos-estepa':{family:'landscape',format:'POSTAL 10×15',paper:'papel natural',product:'postal'},
    'mp-tiempo-cosecha':{family:'harvest',format:'POSTAL 10×15',paper:'papel cálido',product:'postal'},
    'mp-fiestas-raices':{family:'roots',format:'POSTAL 10×15',paper:'fibra suave',product:'postal'},
    'mp-pequenas-historias':{family:'document',format:'FICHA 10×15',paper:'archivo contemporáneo',product:'ficha'},
    'mp-pedacitos-territorio':{family:'territory',format:'GUÍA 10×15',paper:'papel natural',product:'guide'}
  };
  const $=s=>document.querySelector(s),esc=v=>String(v??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[c]));
  function master(){const id=typeof state!=='undefined'?state.factoryMeta?.masterProduct?.id:null;return id?window.FabricaMasterProducts?.find?.(id):null}
  function recipe(m){return RECIPES[m?.id]||null}
  function law(m){return window.FabricaProductLaws?.master?.(m?.id)||null}
  function ensure(box){let shell=box.querySelector('.master-product-skin');if(!shell){shell=document.createElement('div');shell.className='master-product-skin';box.appendChild(shell)}return shell}
  function removeLegacy(box){box.querySelectorAll('.piece,.master-product-preview-overlay,.master-badge,.master-seal,.master-mark,.master-stamp,.master-decoration,.product-template-stamp,.product-template-structure').forEach(n=>n.remove());const shells=[...box.querySelectorAll('.master-product-skin')];shells.slice(0,-1).forEach(n=>n.remove())}
  function cleanClasses(box){[...box.classList].filter(c=>/^master-product-(postal|ficha|guide|infographic)$/.test(c)).forEach(c=>box.classList.remove(c));[...box.classList].filter(c=>/^master-(welcome|landscape|harvest|roots|document|territory)$/.test(c)).forEach(c=>box.classList.remove(c))}
  function front(m,l){return `<div class="master-skin-title"><span class="master-skin-kicker">${esc(l?.concept||'PIEZA LOCAL')}</span><h2>${esc(m.title||m.name||'Pieza de Chañar')}</h2>${m.subtitle?`<p>${esc(m.subtitle)}</p>`:''}</div><div class="master-fact-plaque"><span>${esc(m.factLabel||'DATO LOCAL')}</span><b>${esc(m.fact||'')}</b></div>`}
  function reverse(m,l){const body=m.body||m.promise||'';return `<div class="master-reverse-head"><span>${esc(m.collectionName||'Colección local')}</span><b>${esc(m.name||'Pieza de Chañar')}</b></div><div class="master-reverse-body"><p>${esc(body)}</p><p class="master-reverse-fact"><strong>${esc(m.factLabel||'DATO')}</strong>${esc(m.fact||'')}</p>${l?.reverseLaw?`<p class="master-reverse-law"><strong>LECTURA</strong>${esc(l.reverseLaw)}</p>`:''}</div><div class="master-reverse-source">${esc(m.source||'')}</div>`}
  function clear(){const box=$('#canvasPreview');if(!box)return;box.classList.remove('master-product-preview','master-show-reverse');box.removeAttribute('data-master-id');box.removeAttribute('data-master-format');box.querySelectorAll('.master-product-skin,.piece,.master-product-preview-overlay,.master-badge,.master-seal,.master-mark,.master-stamp,.master-decoration,.product-template-stamp,.product-template-structure').forEach(n=>n.remove());$('#btnMasterFlip')?.remove()}
  function apply(){const box=$('#canvasPreview'),m=master(),r=recipe(m);if(!box||!m||!r){clear();return}removeLegacy(box);cleanClasses(box);const shell=ensure(box),l=law(m);shell.innerHTML=`<div class="master-front">${front(m,l)}<div class="master-photo-stage" data-role="master-photo-stage"></div></div><div class="master-reverse" aria-hidden="true">${reverse(m,l)}</div>`;box.classList.add('master-product-preview','master-product-'+r.product,'master-'+r.family);box.dataset.masterId=m.id;box.dataset.masterFormat=r.format;let toggle=$('#btnMasterFlip');if(!toggle){toggle=document.createElement('button');toggle.id='btnMasterFlip';toggle.type='button';toggle.className='master-flip';const host=box.closest('.preview-panel')?.querySelector('.preview-head');host?.appendChild(toggle)}toggle.textContent='↻ Ver reverso';toggle.onclick=()=>{const rev=box.classList.toggle('master-show-reverse');toggle.textContent=rev?'↻ Ver frente':'↻ Ver reverso'};if(typeof state!=='undefined')state.factoryMeta={...(state.factoryMeta||{}),masterVisual:{version:7,locked:true,scope:'masters-only',recipe:r,format:r.format,reverse:true,identity:'clean',decorations:false}}}
  function boot(){
    /* BLOQUEO DE ALCANCE: este runtime NO escucha fabrica:ready ni fabrica:working.
       Esos eventos pertenecen al motor central. Escuchar allí podía borrar una pieza
       central al no existir masterProduct. */
    ['fabrica:masters-ready'].forEach(ev=>document.addEventListener(ev,()=>setTimeout(apply,60)));
    document.getElementById('btnGenerate')?.addEventListener('click',()=>setTimeout(()=>{if(master())apply()},160));
    setTimeout(()=>{if(master())apply()},900);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaMasterVisuals={version:7,locked:true,scope:'masters-only',apply,clear,recipes:RECIPES,products:['postal','ficha','guide','infographic']};
})();
