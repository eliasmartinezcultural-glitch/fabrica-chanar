/* FÁBRICA CHAÑAR — DIRECCIÓN DE PRODUCTO v1
   Seis productos maestros: la pieza se trata como objeto editorial, no como tarjeta web.
   El sistema agrega jerarquía, código de colección, dato, sello y reverso sin pedir trabajo extra.
*/
(function(){
  const RECIPES={
    'mp-puerta-chanar':{family:'welcome',format:'POSTAL 10×15',paper:'algodón cálido',photo:'hero',title:'grande',fact:'badge',seal:'redondo',reverse:'mini-historia'},
    'mp-vinedos-estepa':{family:'landscape',format:'POSTAL 10×15',paper:'papel natural',photo:'wide',title:'editorial',fact:'number',seal:'oval',reverse:'paisaje'},
    'mp-tiempo-cosecha':{family:'harvest',format:'POSTAL 10×15',paper:'papel cálido',photo:'full',title:'display',fact:'ribbon',seal:'stamp',reverse:'cosecha'},
    'mp-fiestas-raices':{family:'roots',format:'POSTAL 10×15',paper:'fibra suave',photo:'full',title:'display',fact:'badge',seal:'stamp',reverse:'raices'},
    'mp-pequenas-historias':{family:'document',format:'FICHA 10×15',paper:'archivo',photo:'portrait',title:'documental',fact:'caption',seal:'archive',reverse:'fuente'},
    'mp-pedacitos-territorio':{family:'territory',format:'GUÍA 10×15',paper:'natural',photo:'wide',title:'editorial',fact:'map',seal:'route',reverse:'recorrido'}
  };
  const $=s=>document.querySelector(s);
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  function master(){const id=typeof state!=='undefined'?state.factoryMeta?.masterProduct?.id:null;return id?(window.FabricaMasterProducts?.find?.(id)||window.FabricaMasterProducts?.products?.find(x=>x.id===id)):null}
  function recipe(m){return RECIPES[m?.id]||null}
  function ensure(){const box=$('#canvasPreview');if(!box)return null;let shell=box.querySelector('.master-product-skin');if(!shell){shell=document.createElement('div');shell.className='master-product-skin';box.appendChild(shell)}return shell}
  function reverseText(m){const r=recipe(m);const d=typeof state!=='undefined'?state.data||{}:{};const p=m?.promise||'';const fact=m?.fact||'';return `<div class="master-reverse-head"><span>${esc(m?.collectionName||'Colección local')}</span><b>${esc(m?.name||'Pieza de Chañar')}</b></div><div class="master-reverse-body"><p>${esc(p)}</p><p class="master-reverse-fact"><strong>${esc(m?.factLabel||'DATO')}</strong>${esc(fact)}</p><div class="master-reverse-meta"><span>FÁBRICA CHAÑAR</span><span>${esc(m?.role||'pieza editorial')}</span><span>${esc(r?.format||'edición local')}</span></div></div><div class="master-reverse-source">Fuente editorial: ${esc(m?.source||'')}</div>`}
  function front(m){const r=recipe(m);if(!r)return '';const meta=typeof state!=='undefined'?state.factoryMeta||{}:{};const prov=meta.provenance||{};return `<div class="master-skin-top"><span class="master-collection-code">${esc(m.collectionName||'Colección local')} · ${String(m.number).padStart(2,'0')}</span><span class="master-format">${esc(r.format)}</span></div><div class="master-skin-frame"><div class="master-skin-edition">EDICIÓN LOCAL</div><div class="master-skin-seal">${esc(m.seal||'PIEZA DE CHAÑAR')}</div></div><div class="master-fact-plaque"><span>${esc(m.factLabel||'DATO LOCAL')}</span><b>${esc(m.fact||'')}</b></div><div class="master-skin-bottom"><span>FÁBRICA CHAÑAR · OCARINA</span><span>${esc(prov.territory||'San Patricio del Chañar, Neuquén')}</span></div>`}
  function apply(){const m=master();const box=$('#canvasPreview');if(!m||!box)return;const r=recipe(m);const shell=ensure();if(!shell)return;box.classList.add('master-product-preview','master-'+r.family);shell.innerHTML=`<div class="master-front">${front(m)}</div><div class="master-reverse" aria-hidden="true">${reverseText(m)}</div>`;box.dataset.masterId=m.id;box.dataset.masterFormat=r.format;box.classList.remove('master-show-reverse');
    let toggle=$('#btnMasterFlip');if(!toggle){toggle=document.createElement('button');toggle.id='btnMasterFlip';toggle.type='button';toggle.className='master-flip';toggle.textContent='↻ Ver reverso';const host=box.closest('.preview-panel')?.querySelector('.preview-head');host?.appendChild(toggle)}
    toggle.onclick=()=>{const rev=box.classList.toggle('master-show-reverse');toggle.textContent=rev?'↻ Ver frente':'↻ Ver reverso'};
    if(typeof state!=='undefined')state.factoryMeta={...(state.factoryMeta||{}),masterVisual:{version:1,recipe:r,format:r.format,reverse:true,object:'editorial-souvenir'}};
  }
  function boot(){['fabrica:ready','fabrica:series-ready','fabrica:masters-ready'].forEach(ev=>document.addEventListener(ev,()=>setTimeout(apply,60)));['btnGenerate','btnSave'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>setTimeout(apply,120)));setTimeout(apply,500)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaMasterVisuals={version:1,recipes:RECIPES,apply};
})();
