/* FÁBRICA CHAÑAR — DIRECCIÓN DE PRODUCTO CERRADA v10
   BLOQUEO: el render central de la Fábrica es soberano.
   Este módulo NO puede reemplazar, limpiar ni borrar .piece automáticamente.
   Las visuales master quedan disponibles como capa explícita, pero no se ejecutan
   por temporizador ni por fabrica:ready. Esto evita que una pieza fabricada
   aparezca y sea destruida segundos después.
*/
(function(){
  const RECIPES={
    'mp-puerta-chanar':{family:'welcome',paper:'algodón cálido',product:'postal'},
    'mp-vinedos-estepa':{family:'landscape',paper:'papel natural',product:'postal'},
    'mp-tiempo-cosecha':{family:'harvest',paper:'papel cálido',product:'postal'},
    'mp-fiestas-raices':{family:'roots',paper:'fibra suave',product:'postal'},
    'mp-pequenas-historias':{family:'document',paper:'archivo contemporáneo',product:'ficha'},
    'mp-pedacitos-territorio':{family:'territory',paper:'papel natural',product:'guide'}
  };
  const $=s=>document.querySelector(s),esc=v=>String(v??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[c]));
  function master(){const id=typeof state!=='undefined'?state.factoryMeta?.masterProduct?.id:null;return id?window.FabricaMasterProducts?.find?.(id):null}
  function physical(product){return window.FabricaOutputContract?.specForType?.(product)||window.FabricaOutputContract?.specs?.[product]||null}
  function recipe(m){const r=RECIPES[m?.id];if(!r)return null;const s=physical(r.product);return s?{...r,format:`${s.name.toUpperCase()} ${s.key}`,widthMm:s.widthMm,heightMm:s.heightMm,ratio:`${s.widthMm}/${s.heightMm}`}:r}
  function law(m){return window.FabricaProductLaws?.master?.(m?.id)||null}
  function ensure(box){let shell=box.querySelector('.master-product-skin');if(!shell){shell=document.createElement('div');shell.className='master-product-skin';box.appendChild(shell)}return shell}
  function removeLegacy(box){box.querySelectorAll('.master-product-preview-overlay,.master-badge,.master-seal,.master-mark,.master-stamp,.master-decoration,.product-template-stamp,.product-template-structure').forEach(n=>n.remove())}
  function cleanClasses(box){[...box.classList].filter(c=>/^master-product-(postal|ficha|guide|infographic)$/.test(c)).forEach(c=>box.classList.remove(c));[...box.classList].filter(c=>/^master-(welcome|landscape|harvest|roots|document|territory)$/.test(c)).forEach(c=>box.classList.remove(c))}
  function front(m,l){return `<div class="master-skin-title"><span class="master-skin-kicker">${esc(l?.concept||'PIEZA LOCAL')}</span><h2>${esc(m.title||m.name||'Pieza de Chañar')}</h2>${m.subtitle?`<p>${esc(m.subtitle)}</p>`:''}</div><div class="master-fact-plaque"><span>${esc(m.factLabel||'DATO LOCAL')}</span><b>${esc(m.fact||'')}</b></div>`}
  function reverse(m,l){const body=m.body||m.promise||'';return `<div class="master-reverse-head"><span>${esc(m.collectionName||'Colección local')}</span><b>${esc(m.name||'Pieza de Chañar')}</b></div><div class="master-reverse-body"><p>${esc(body)}</p><p class="master-reverse-fact"><strong>${esc(m.factLabel||'DATO')}</strong>${esc(m.fact||'')}</p>${l?.reverseLaw?`<p class="master-reverse-law"><strong>LECTURA</strong>${esc(l.reverseLaw)}</p>`:''}</div><div class="master-reverse-source">${esc(m.source||'')}</div>`}
  function clear(){
    const box=$('#canvasPreview');if(!box)return;
    /* Nunca borra la pieza soberana .piece. Solo limpia una capa master explícita. */
    box.querySelectorAll('.master-product-skin,.master-product-preview-overlay,.master-badge,.master-seal,.master-mark,.master-stamp,.master-decoration,.product-template-stamp,.product-template-structure').forEach(n=>n.remove());
    box.classList.remove('master-show-reverse');
    $('#btnMasterFlip')?.remove();
  }
  function apply(){
    const box=$('#canvasPreview'),m=master();
    /* Si no existe una orden master explícita, no tocar absolutamente nada. */
    if(!box||!m)return false;
    const r=recipe(m);if(!r)return false;
    /* Nunca sustituimos el .piece central. Solo decoramos un host master ya existente. */
    let shell=box.querySelector('.master-product-skin');
    if(!shell) shell=ensure(box);
    removeLegacy(box);cleanClasses(box);
    shell.innerHTML=`<div class="master-front">${front(m,law(m))}<div class="master-photo-stage" data-role="master-photo-stage"></div></div><div class="master-reverse" aria-hidden="true">${reverse(m,law(m))}</div>`;
    box.classList.add('master-product-preview','master-product-'+r.product,'master-'+r.family);
    box.dataset.masterId=m.id;box.dataset.masterFormat=r.format;
    let toggle=$('#btnMasterFlip');
    if(!toggle){toggle=document.createElement('button');toggle.id='btnMasterFlip';toggle.type='button';toggle.className='master-flip';box.closest('.preview-panel')?.querySelector('.preview-head')?.appendChild(toggle)}
    toggle.textContent='↻ Ver reverso';
    toggle.onclick=()=>{const rev=box.classList.toggle('master-show-reverse');toggle.textContent=rev?'↻ Ver frente':'↻ Ver reverso'};
    if(typeof state!=='undefined'){const s=physical(r.product);state.factoryMeta={...(state.factoryMeta||{}),masterVisual:{version:10,locked:true,isolated:true,recipe:r,format:r.format,widthMm:s?.widthMm,heightMm:s?.heightMm,ratio:s?`${s.widthMm}/${s.heightMm}`:null,reverse:true,identity:'decorative-only',decorations:true}}}
    window.FabricaOutputContract?.applyPreviewGeometry?.();
    return true;
  }
  function boot(){
    /* INTENCIONALMENTE VACÍO: ningún temporizador/evento puede competir con el motor central. */
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaMasterVisuals={version:10,locked:true,isolated:true,apply,clear,recipes:RECIPES,products:['postal','ficha','guide','infographic'],automatic:false};
})();
