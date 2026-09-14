/* FÁBRICA CHAÑAR — AUDITORÍA PROFUNDA v5
   Audita el contrato vigente de producción y no exige módulos eliminados.
   Verifica catálogo, realización editorial, materia prima, fotografía,
   composición, identidad, derechos y geometría básica.
   v5: una fotografía propia cuenta como materia válida aunque no sea
   un asset del catálogo cerrado.
*/
(function(){
  const PRODUCTS={postal:{formats:['print','vertical','square']},ficha:{formats:['print','vertical','square']},guide:{formats:['print','vertical','horizontal']},infographic:{formats:['vertical','square','print']}};
  const $=s=>document.querySelector(s); const text=s=>($(s)?.textContent||'').trim();
  const rect=s=>{const el=$(s);return el?.getBoundingClientRect?.()||null};
  const overlap=(a,b)=>{if(!a||!b)return 0;const x=Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left));const y=Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));const area=x*y;const base=Math.min(a.width*a.height,b.width*b.height);return base?area/base:0};
  function catalogAudit(){
    const c=window.FabricaClosedCatalog; const assets=window.FabricaAssets; const editorial=window.FabricaEditorialRealizations; const out=[];
    Object.keys(PRODUCTS).forEach(product=>{
      const rows=c?.forProduct?.(product)||[],eds=editorial?.realizations?.[product]||[]; const ids=rows.map(x=>x.photo); const missing=rows.filter(x=>!assets?.find?.(x.photo));
      out.push({product,count:rows.length,uniquePhotos:new Set(ids).size,editorialCount:eds.length,missingAssets:missing.map(x=>x.photo),masters:rows.filter(x=>!x.master).map(x=>x.slot),directions:rows.filter(x=>!x.direction).map(x=>x.slot),execution:rows.filter(x=>!x.execution).map(x=>x.slot),editorialMissing:eds.map((x,i)=>!x.headline||!x.body||!x.source?i+1:null).filter(Boolean),pass:rows.length===10&&new Set(ids).size===10&&eds.length===10&&!missing.length&&!rows.some(x=>!x.master||!x.direction||!x.execution)&&eds.every(x=>x.headline&&x.body&&x.source)});
    });
    const total=out.reduce((n,x)=>n+x.count,0),editorialTotal=out.reduce((n,x)=>n+x.editorialCount,0);return {version:5,products:out,totalMatrices:total,totalEditorialRealizations:editorialTotal,pass:out.length===4&&total===40&&editorialTotal===40&&out.every(x=>x.pass),rule:'4 productos × 10 fotos = 40 matrices editoriales realizadas'};
  }
  function run(){
    const box=$('#canvasPreview'),meta=typeof state!=='undefined'?(state.factoryMeta||{}):{},product=state?.centralProduct||state?.type||'postal',checks=[];
    const add=(id,ok,detail)=>checks.push({id,ok:Boolean(ok),detail}); const ca=catalogAudit();
    const hasCurrentPreview=!!box?.querySelector('.master-product-skin,.piece');
    const hasCurrentFront=!!box?.querySelector('.master-front,.piece');
    const hasCurrentReverse=!!box?.querySelector('.master-reverse,.factory-quality-reverse');
    const ownPhoto=typeof state?.image==='string'&&state.image.startsWith('data:image/');
    add('catalog-closed',ca.pass,`${ca.totalMatrices}/40 matrices; ${ca.totalEditorialRealizations}/40 realizaciones editoriales.`);
    add('canvas',!!box,'Lienzo presente.'); add('product',!!PRODUCTS[product],product); add('preview-mounted',hasCurrentPreview,'Vista previa montada.'); add('front',hasCurrentFront,'Frente montado.'); add('reverse',hasCurrentReverse,'Reverso disponible.');
    const editorial=meta.editorialRealization; add('editorial-slot',!!editorial?.slot&&editorial.product===product,'Realización editorial del slot aplicada.'); add('editorial-content',!!editorial?.headline&&!!editorial?.body&&!!editorial?.source,'Titular, cuerpo y fuente presentes.');
    const img=box?.querySelector('.master-photo-stage img,.piece-image img,#previewImg'); add('photo-stage',!!box?.querySelector('.master-photo-stage,.piece-image,.image'),'Escenario fotográfico presente.'); add('photo-node',!!img,'Fotografía montada.'); add('photo-loaded',!!img&&img.complete&&img.naturalWidth>0,img?`${img.naturalWidth}×${img.naturalHeight}px`:'sin imagen');
    add('photo-coverage',!!img&&img.getBoundingClientRect().width>=box.getBoundingClientRect().width*.45&&img.getBoundingClientRect().height>=box.getBoundingClientRect().height*.25,'La fotografía ocupa una superficie editorial real.');
    add('title',text('.master-skin-title h2')||text('.piece-content h3')||text('#previewTitle'),'Título presente.'); add('fact',text('.master-fact-plaque b')||text('.piece-headline')||text('#previewBody'),'Dato/contenido central presente.'); add('collection',text('.master-collection-code')||text('.piece-kicker'),'Identidad editorial presente.'); add('seal',text('.master-skin-seal')||text('.seal'),'Sello/identificación presente.'); add('origin',text('.master-skin-bottom')||text('.piece-brand'),'Marca/origen presente.');
    add('photo-rights',!!meta.photoSelection?.rights||!!meta.provenance?.rights||!!meta.provenance?.photoRights||ownPhoto,'Derechos/procedencia registrados o foto propia declarada.');
    add('photo-selection',ownPhoto||!!meta.photoSelection?.asset&&meta.photoSelection?.commercialSafe===true&&meta.materialPhotoApplied===true,'Materia prima fotográfica válida: propia o asset comercialmente seguro.');
    add('identity',!!meta.pieceCode&&!!meta.collectionName&&!!meta.makerSeal,'Identidad Ocarina completa.');
    add('photo-render',meta.photoRender?.stage===true&&typeof meta.photoRender?.layerOrder==='string','Diagnóstico fotográfico registrado.'); add('no-placeholder',!box?.querySelector('.photo-missing'),'Sin marcador de foto faltante.'); add('no-abstract-over-photo',!!img||!box?.querySelector('.original-art-svg'),'Arte conceptual no compite con fotografía.');
    const title=rect('.master-skin-title')||rect('.piece-content h3'),fact=rect('.master-fact-plaque')||rect('.piece-content .copy'),seal=rect('.master-skin-seal')||rect('.seal'),credit=rect('.photo-credit-chip')||rect('.piece-source'); add('title-fact-overlap',overlap(title,fact)<.25,`solapamiento ${Math.round(overlap(title,fact)*100)}%`); add('fact-seal-overlap',overlap(fact,seal)<.25,`solapamiento ${Math.round(overlap(fact,seal)*100)}%`); add('credit-seal-overlap',overlap(credit,seal)<.2,`solapamiento ${Math.round(overlap(credit,seal)*100)}%`);
    const critical=['catalog-closed','canvas','product','preview-mounted','front','reverse','editorial-slot','editorial-content','photo-stage','photo-node','photo-loaded','title','fact','collection','seal','origin','photo-rights','photo-selection','identity','photo-render','no-placeholder'];
    const passed=checks.filter(x=>x.ok).length,criticalPass=critical.every(id=>checks.find(x=>x.id===id)?.ok),result={version:5,product,passed,total:checks.length,score:Math.round(passed/checks.length*100),criticalPass,ready:criticalPass&&checks.filter(x=>!x.ok).length<=3,checks,catalog:ca,masterId:meta.rawMaterial?.masterId||null,photoId:meta.photoId||null,commercialRights:meta.commercialRights===true||ownPhoto};
    if(typeof state!=='undefined')state.factoryMeta={...(state.factoryMeta||{}),previewAudit:result,previewQualityGate:result.ready}; return result;
  }
  function schedule(){setTimeout(run,100);setTimeout(run,500);setTimeout(run,1000)}
  function boot(){['fabrica:working','fabrica:ready','fabrica:masters-ready'].forEach(ev=>document.addEventListener(ev,schedule));document.getElementById('centralProduce')?.addEventListener('click',()=>setTimeout(run,900));setTimeout(run,1200)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot(); window.FabricaPreviewAudit={version:5,run,catalogAudit,products:PRODUCTS};
})();