/* FÁBRICA CHAÑAR — FABRICACIÓN MAESTRA v8
   Edición comercial: seis piezas maestras listas para curar, comparar y guardar.
   Las fotografías de referencia se pueden usar para PROTOTIPAR; nunca se marcan como
   comercialmente habilitadas hasta tener licencia, autorización o una foto propia.
*/
(function(){
  const EDITION_REV=8,$=s=>document.querySelector(s),wait=ms=>new Promise(r=>setTimeout(r,ms));
  const products=()=>window.FabricaMasterProducts?.products||[];
  const photo=id=>(typeof PHOTO_BANK!=='undefined'?PHOTO_BANK:[]).find(p=>p.id===id)||null;
  const commercialReady=m=>!!m&&(m.commercialVisual==='original-graphic'||['own','usable','licensed','authorized'].includes(m.rights));
  const rightsNote=m=>commercialReady(m)
    ?'Material apto según licencia o autorización registrada.'
    :'Prototipo editorial: fotografía de referencia; no habilita venta hasta resolver derechos.';

  function applyMaster(m){
    const t=(typeof TEMPLATES!=='undefined'?TEMPLATES:[]).find(x=>x.id===m.template);
    if(!t||typeof state==='undefined')return false;
    state.type=t.product;state.templateId=t.id;state.photoId=m.photo;state.image=null;
    state.data={title:m.title||t.title||'',subtitle:m.subtitle||t.subtitle||'',body:m.body||t.body||'',category:m.category||t.category||'',location:m.location||t.location||'',intro:m.intro||t.intro||'',items:m.items||t.items||'',headline:m.headline||t.headline||''};
    state.factoryMeta={masterProduct:{id:m.id,number:m.number,name:m.name,collection:m.collectionName,role:m.role,promise:m.promise},provenance:{territory:'San Patricio del Chañar, Neuquén',fact:m.fact,factLabel:m.factLabel,source:m.source,sourceUrl:m.sourceUrl,photo:m.photo,photoSource:m.photoSource,photoUrl:m.photoUrl,photoAuthor:m.photoAuthor||'',photoLicense:m.photoLicense||'',rights:m.rights},seal:m.seal,commercialVisual:m.commercialVisual,commercialRights:commercialReady(m),rightsNote:rightsNote(m),editionRevision:EDITION_REV};
    renderProducts?.();renderTemplates?.();renderForm?.();renderPreview?.();window.FabricaArtDirection?.apply?.();window.FabricaMasterVisuals?.apply?.();return true;
  }

  function snapshot(m){
    const p=photo(m.photo),safe=commercialReady(m);
    return{id:`MASTER-${m.number}`,type:state.type,templateId:state.templateId,data:{...state.data},image:state.image||null,photoId:m.photo,created:new Date().toISOString(),master:true,factoryMeta:{...(state.factoryMeta||{}),masterProduct:{...(state.factoryMeta?.masterProduct||{}),masterId:m.id,unit:true},provenance:{...(state.factoryMeta?.provenance||{}),photoName:p?.name||m.photo,photoRights:p?.kind||m.rights},commercialRights:safe,rightsNote:rightsNote(m),editionRevision:EDITION_REV}};
  }

  function validateMaster(m){
    if(!m.title||!m.fact||!m.source)return'Falta contenido editorial obligatorio';
    if(!m.template)return'Falta plantilla';
    if(!m.photo)return'Falta fotografía o dirección visual';
    return null;
  }

  async function saveMaster(m){
    const problem=validateMaster(m);if(problem)return null;
    const item=snapshot(m),old=typeof library==='function'?library():[],filtered=old.filter(x=>x?.factoryMeta?.masterProduct?.id!==m.id);
    setLibrary?.([item,...filtered].slice(0,18));return item;
  }

  function capture(){if(typeof state==='undefined')return null;return{type:state.type,templateId:state.templateId,data:{...(state.data||{})},image:state.image||null,photoId:state.photoId||null,factoryMeta:{...(state.factoryMeta||{})}}}
  function restore(s){if(!s||typeof state==='undefined')return;Object.assign(state,s);renderProducts?.();renderTemplates?.();renderForm?.();renderPreview?.();window.FabricaMasterVisuals?.apply?.()}

  async function manufactureAll(opts={}){
    const list=products();if(!list.length)return{made:[],errors:['No hay productos maestros']};
    if(manufactureAll.running)return manufactureAll.running;
    manufactureAll.running=(async()=>{
      const saved=capture(),button=$('#btnManufactureMasters');button?.classList.add('is-working');button?.setAttribute('disabled','disabled');
      const statusEl=$('#masterStatus'),made=[],errors=[];
      try{
        for(let i=0;i<list.length;i++){
          const m=list[i],problem=validateMaster(m);
          if(problem){errors.push(`${m.name}: ${problem}`);continue}
          if(statusEl)statusEl.textContent=`Fabricando ${i+1}/${list.length} · ${m.name}`;
          if(!applyMaster(m)){errors.push(`${m.name}: no se pudo montar`);continue}
          await wait(90);const item=await saveMaster(m);
          if(item)made.push(item);else errors.push(`${m.name}: no se pudo guardar`);
        }
        document.dispatchEvent(new CustomEvent('fabrica:masters-ready',{detail:{products:list,made,errors,editionRevision:EDITION_REV}}));
        if(statusEl)statusEl.textContent=errors.length?`⚠ ${made.length}/${list.length} fabricadas · ${errors.length} requieren revisión.`:`✓ EDICIÓN 01 · ${made.length}/${list.length} piezas fabricadas y guardadas.`;
        updateMasterCards();if(!opts.silent)$('#libraryPanel')?.scrollIntoView({behavior:'smooth',block:'start'});return{made,errors};
      }finally{restore(saved);button?.classList.remove('is-working');button?.removeAttribute('disabled');manufactureAll.running=null}
    })();return manufactureAll.running;
  }

  function render(){
    if($('#masterProductsPanel'))return;const anchor=$('#collectionStudio')||$('.controls');if(!anchor)return;
    const sec=document.createElement('section');sec.id='masterProductsPanel';sec.className='master-products-panel';
    sec.innerHTML=`<div class="master-head"><div><p class="eyebrow">EDICIÓN COMERCIAL 01 · PRODUCTOS MAESTROS</p><h2>Seis piezas para producir y vender</h2><p>La Fábrica las fabrica, guarda y separa automáticamente prototipo editorial de pieza comercial.</p></div><button id="btnManufactureMasters" class="master-production" type="button">⚡ FABRICAR EDICIÓN 01</button></div><div id="masterGrid" class="master-grid">${products().map(m=>`<article class="master-card" data-master-id="${m.id}"><div class="master-number">${String(m.number).padStart(2,'0')}</div><div class="master-copy"><b>${m.name}</b><span>${m.product} · ${m.collectionName}</span><small>${m.factLabel}: ${m.fact}</small></div><div class="master-proof">✦ foto dirigida · fuente registrada · derechos separados</div></article>`).join('')}</div><div id="masterStatus" class="master-status">Producción de fondo lista.</div>`;
    anchor.parentNode.insertBefore(sec,anchor.nextSibling);sec.querySelector('#btnManufactureMasters').onclick=()=>manufactureAll();
  }

  function updateMasterCards(){
    const lib=typeof library==='function'?library():[];
    document.querySelectorAll('.master-card').forEach(c=>{const id=c.dataset.masterId;const item=lib.find(x=>x?.master===true&&x?.factoryMeta?.masterProduct?.id===id&&x?.factoryMeta?.editionRevision===EDITION_REV);c.classList.toggle('is-made',!!item);c.classList.toggle('is-commercial',!!item?.factoryMeta?.commercialRights);c.title=item?.factoryMeta?.commercialRights?'Lista para revisión comercial':'Prototipo guardado · resolver derechos de fotografía antes de vender'});
  }

  function boot(){
    render();updateMasterCards();
    const ids=new Set(products().map(m=>m.id));
    const current=typeof library==='function'?library().filter(x=>x?.master===true&&ids.has(x?.factoryMeta?.masterProduct?.id)&&x?.factoryMeta?.editionRevision===EDITION_REV):[];
    if(current.length<ids.size)setTimeout(()=>manufactureAll({silent:true}),900);
  }
  window.FabricaMasterFactory={version:8,editionRevision:EDITION_REV,manufactureAll,applyMaster,products,commercialReady,validateMaster,rightsNote};
  document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,320));
})();
