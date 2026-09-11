/* FÁBRICA CHAÑAR — FABRICACIÓN MAESTRA v3
   Edición comercial 01: seis piezas fabricables y vendibles.
   La foto pública de referencia nunca se convierte en permiso comercial: cuando no hay licencia,
   la pieza cambia automáticamente a una ilustración editorial original de la Fábrica.
*/
(function(){
  const $=s=>document.querySelector(s);
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  function products(){return window.FabricaMasterProducts?.products||[]}
  function photo(id){return (typeof PHOTO_BANK!=='undefined'?PHOTO_BANK:[]).find(p=>p.id===id)||null}
  function commercialReady(m){return m?.commercialVisual==='original-graphic'||m?.rights==='own'||m?.rights==='usable'||m?.rights==='licensed'||m?.rights==='authorized'}
  function applyMaster(m){
    const t=(typeof TEMPLATES!=='undefined'?TEMPLATES:[]).find(x=>x.id===m.template);
    if(!t||typeof state==='undefined') return false;
    state.type=t.product; state.templateId=t.id; state.photoId=m.photo; state.image=null;
    state.data={...state.data,title:m.title||t.title,subtitle:m.subtitle||t.subtitle,body:m.body||t.body,category:m.category||t.category,location:m.location||t.location,intro:m.intro||t.intro,items:m.items||t.items,headline:m.headline||t.headline||'',fact:m.fact||'',factLabel:m.factLabel||'',source:m.source||'',sourceUrl:m.sourceUrl||''};
    state.factoryMeta={...(state.factoryMeta||{}),masterProduct:{id:m.id,number:m.number,name:m.name,collection:m.collectionName,role:m.role,promise:m.promise},
      provenance:{territory:'San Patricio del Chañar, Neuquén',fact:m.fact,factLabel:m.factLabel,source:m.source,sourceUrl:m.sourceUrl,photo:m.photo,photoSource:m.photoSource,photoUrl:m.photoUrl,photoAuthor:m.photoAuthor||'',photoLicense:m.photoLicense||'',rights:m.rights},
      seal:m.seal,commercialVisual:m.commercialVisual,commercialRights:commercialReady(m),rightsNote:m.commercialVisual==='original-graphic'?'Visual editorial original de Fábrica Chañar; la foto de referencia no forma parte del producto comercial.':'Imagen con estado de reutilización registrado.'};
    if(typeof renderProducts==='function')renderProducts();
    if(typeof renderTemplates==='function')renderTemplates();
    if(typeof renderForm==='function')renderForm();
    if(typeof renderPreview==='function')renderPreview();
    window.FabricaArtDirection?.apply?.();
    window.FabricaMasterVisuals?.apply?.();
    return true;
  }
  async function saveMaster(m){
    if(!commercialReady(m)) return null;
    if(typeof validate==='function'&&!validate()) return null;
    const p=photo(m.photo);
    const item={
      id:`MASTER-${m.number}-${Date.now()}`,
      type:state.type,templateId:state.templateId,data:{...state.data},image:state.image||null,photoId:m.photo,
      created:new Date().toISOString(),
      factoryMeta:{...(state.factoryMeta||{}),masterProduct:{...state.factoryMeta.masterProduct,masterId:m.id,unit:true},
        provenance:{...state.factoryMeta.provenance,photoName:p?.name||m.photo,photoRights:p?.kind||m.rights},commercialRights:true},
      master:true
    };
    const old=typeof library==='function'?library():[];
    const filtered=old.filter(x=>x?.factoryMeta?.masterProduct?.id!==m.id);
    if(typeof setLibrary==='function')setLibrary([item,...filtered].slice(0,18));
    return item;
  }
  async function manufactureAll(){
    const list=products(); if(!list.length)return;
    const button=$('#btnManufactureMasters'); button?.classList.add('is-working');
    const statusEl=$('#masterStatus');
    const made=[];
    try{
      for(let i=0;i<list.length;i++){
        const m=list[i];
        if(!applyMaster(m))continue;
        await wait(180);
        const item=await saveMaster(m);
        if(item)made.push(item);
        if(statusEl)statusEl.textContent=`Fabricando ${i+1}/${list.length} · ${m.name}`;
        await wait(120);
      }
      document.dispatchEvent(new CustomEvent('fabrica:masters-ready',{detail:{products:list,made}}));
      if(statusEl)statusEl.textContent=`✓ ${made.length}/${list.length} productos comerciales fabricados y guardados en Biblioteca.`;
      if(typeof status==='function')status(`✦ Edición 01 terminada: ${made.length} piezas comerciales listas para ofrecer.`);
      updateMasterCards();
      $('#libraryPanel')?.scrollIntoView({behavior:'smooth',block:'start'});
    }finally{button?.classList.remove('is-working')}
  }
  function render(){
    if($('#masterProductsPanel'))return;
    const anchor=$('#collectionStudio')||$('.controls'); if(!anchor)return;
    const sec=document.createElement('section');sec.id='masterProductsPanel';sec.className='master-products-panel';
    sec.innerHTML=`<div class="master-head"><div><p class="eyebrow">EDICIÓN COMERCIAL 01 · PRODUCTOS MAESTROS</p><h2>Seis piezas para producir y vender</h2><p>Seis objetos editoriales cerrados: dirección visual, dato real, fuente, procedencia, reverso, sello y control de derechos. Las fotos públicas de referencia se usan para investigar; nunca se venden sin licencia.</p></div><button id="btnManufactureMasters" class="master-production" type="button">⚡ FABRICAR 1 DE CADA UNO</button></div><div id="masterGrid" class="master-grid">${products().map(m=>`<article class="master-card" data-master-id="${m.id}"><div class="master-number">${String(m.number).padStart(2,'0')}</div><div class="master-copy"><b>${m.name}</b><span>${m.product} · ${m.collectionName}</span><small>${m.factLabel}: ${m.fact}</small></div><div class="master-proof">${m.commercialVisual==='original-graphic'?'✦ arte editorial original · foto externa solo de referencia':'✓ imagen con reutilización registrada'} · dato con fuente</div></article>`).join('')}</div><div id="masterStatus" class="master-status">Edición comercial cerrada · lista para fabricar.</div>`;
    anchor.parentNode.insertBefore(sec,anchor.nextSibling);
    sec.querySelector('#btnManufactureMasters').onclick=manufactureAll;
  }
  function updateMasterCards(){
    const lib=typeof library==='function'?library():[];
    document.querySelectorAll('.master-card').forEach(c=>{const id=c.dataset.masterId;if(lib.some(x=>x.factoryMeta?.masterProduct?.id===id&&x.factoryMeta?.commercialRights))c.classList.add('is-made')});
  }
  window.FabricaMasterFactory={version:3,manufactureAll,applyMaster,products};
  document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>{render();updateMasterCards()},320));
})();
