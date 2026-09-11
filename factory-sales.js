/* FÁBRICA CHAÑAR — MODO VENTA v2
   Ley comercial del taller:
   no se vende volumen; se ofrece una selección curada de piezas listas.
   Una pieza solo aparece como "lista para ofrecer" cuando su imagen es propia/autorizada
   o reutilizable según la ficha visual de la Fábrica.
*/
(function(){
  const $=s=>document.querySelector(s);
  const esc=v=>String(v??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[c]));
  const PRODUCT_NAMES={postal:'Postal',ficha:'Ficha cultural',guide:'Guía breve',infographic:'Infografía'};
  const items=()=>typeof library==='function'?library():[];
  function saleReady(x){
    if(x?.image)return true;
    const p=typeof PHOTO_BANK!=='undefined'?PHOTO_BANK.find(y=>y.id===x?.photoId):null;
    return p?.kind==='usable';
  }
  function collectionOf(x){return x?.factoryMeta?.collection||{name:'Pieza suelta',id:'sueltas',part:null,total:null,role:null}}
  function group(){
    const map=new Map();
    items().forEach(x=>{const c=collectionOf(x);if(!map.has(c.id))map.set(c.id,{...c,pieces:[]});map.get(c.id).pieces.push(x)});
    return [...map.values()];
  }
  function statusLabel(x){return saleReady(x)?'<span class="sale-ready">✓ LISTA PARA OFRECER</span>':'<span class="sale-check">○ REVISAR FOTO</span>'}
  function open(){const panel=$('#salesPanel');if(!panel)return;render();panel.classList.remove('hidden');panel.scrollIntoView({behavior:'smooth',block:'start'})}
  function close(){$('#salesPanel')?.classList.add('hidden')}
  function render(){
    const host=$('#salesList');if(!host)return;
    const all=items(),groups=group(),ready=all.filter(saleReady).length;
    const summary=$('#salesSummary');if(summary)summary.innerHTML=`<strong>${ready} de ${all.length}</strong> piezas listas para ofrecer · <span>${groups.length} colección${groups.length===1?'':'es'}</span>`;
    if(!groups.length){host.innerHTML='<div class="sales-empty"><b>La mesa está vacía.</b><p>Elegí una idea en el Taller Rápido. La Fábrica producirá y guardará las piezas automáticamente.</p></div>';return}
    host.innerHTML=groups.map(g=>`<section class="sale-collection"><header><div><small>COLECCIÓN</small><h3>${esc(g.name)}</h3><p>${g.pieces.length} piezas · ${esc(g.id==='sueltas'?'selección abierta':'serie editorial')}</p></div><button type="button" class="sale-copy" data-copy-collection="${esc(g.id)}">Copiar presentación</button></header><div class="sale-grid">${g.pieces.map((x,i)=>`<article class="sale-card"><div class="sale-card-top"><span>${String(i+1).padStart(2,'0')}</span>${statusLabel(x)}</div><h4>${esc(x.data?.title||PRODUCT_NAMES[x.type]||'Pieza de Chañar')}</h4><p>${esc(PRODUCT_NAMES[x.type]||x.type)}${x.factoryMeta?.collection?.role?` · ${esc(x.factoryMeta.collection.role)}`:''}</p><small>${esc(x.factoryMeta?.friendlyLine||'Pieza pensada y curada localmente.')}</small><div class="sale-card-actions"><button type="button" data-open-sale="${esc(x.id)}">Ver pieza</button><button type="button" data-copy-piece="${esc(x.id)}">Copiar texto</button></div></article>`).join('')}</div></section>`).join('');
    host.querySelectorAll('[data-open-sale]').forEach(b=>b.onclick=()=>openPiece(b.dataset.openSale));
    host.querySelectorAll('[data-copy-piece]').forEach(b=>b.onclick=()=>copyPiece(b.dataset.copyPiece));
    host.querySelectorAll('[data-copy-collection]').forEach(b=>b.onclick=()=>copyCollection(b.dataset.copyCollection));
  }
  function openPiece(id){
    const x=items().find(y=>y.id===id);if(!x||typeof state==='undefined')return;
    Object.assign(state,{type:x.type,templateId:x.templateId||TEMPLATES.find(t=>t.product===x.type)?.id,data:{...(x.data||{})},image:x.image||null,photoId:x.photoId||null,factoryMeta:{...(x.factoryMeta||{})}});
    renderProducts?.();renderTemplates?.();renderForm?.();renderPreview?.();close();status('Pieza recuperada. Podés verla, descargarla o seguir editándola.');document.querySelector('.preview-panel')?.scrollIntoView({behavior:'smooth',block:'start'});
  }
  async function copy(text,ok){try{await navigator.clipboard.writeText(text);status(ok||'Copiado ✨')}catch{status('No pude copiar automáticamente. Podés usar el texto visible de la pieza.')}}
  function copyPiece(id){const x=items().find(y=>y.id===id);if(!x)return;const c=collectionOf(x);copy(`${x.data?.title||'Pieza de Chañar'}\n${PRODUCT_NAMES[x.type]||x.type}\n${c.name||''}\n${x.factoryMeta?.friendlyLine||'Pieza de Chañar, pensada y curada localmente.'}`,'Presentación copiada ✨')}
  function copyCollection(id){const g=group().find(y=>y.id===id);if(!g)return;copy(`${g.name}\n\n${g.pieces.map((x,i)=>`${i+1}. ${x.data?.title||'Pieza de Chañar'} · ${PRODUCT_NAMES[x.type]||x.type}`).join('\n')}\n\nPiezas de Chañar · Ocarina Producciones`,'Presentación de colección copiada ✨')}
  function init(){
    $('#btnSales')?.addEventListener('click',open);
    $('#btnCloseSales')?.addEventListener('click',close);
    document.addEventListener('fabrica:series-ready',render);
    document.addEventListener('fabrica:ready',()=>{if(!$('#salesPanel')?.classList.contains('hidden'))render()});
    updateLibraryCount?.();
  }
  window.FabricaSales={version:2,open,close,render,saleReady};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
