/* FÁBRICA CHAÑAR — AUDITORÍA PROFUNDA v2
   Verifica producto, catálogo cerrado, materia prima, fotografía, capas,
   identidad, derechos y geometría básica. No inventa ni amplía catálogo.
*/
(function(){
  const PRODUCTS={postal:{formats:['print','vertical','square'],minWords:55},ficha:{formats:['print','vertical','square'],minWords:85},guide:{formats:['print','vertical','horizontal'],minWords:110},infographic:{formats:['vertical','square','print'],minWords:65}};
  const $=s=>document.querySelector(s); const text=s=>($(s)?.textContent||'').trim();
  const rect=s=>{const el=$(s);return el?.getBoundingClientRect?.()||null};
  const overlap=(a,b)=>{if(!a||!b)return 0;const x=Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left));const y=Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));const area=x*y;const base=Math.min(a.width*a.height,b.width*b.height);return base?area/base:0};
  function catalogAudit(){
    const c=window.FabricaClosedCatalog; const assets=window.FabricaAssets; const out=[];
    Object.keys(PRODUCTS).forEach(product=>{
      const rows=c?.forProduct?.(product)||[]; const ids=rows.map(x=>x.photo); const missing=rows.filter(x=>!assets?.find?.(x.photo));
      out.push({product,count:rows.length,uniquePhotos:new Set(ids).size,missingAssets:missing.map(x=>x.photo),masters:rows.filter(x=>!x.master).map(x=>x.slot),directions:rows.filter(x=>!x.direction).map(x=>x.slot),execution:rows.filter(x=>!x.execution).map(x=>x.slot),pass:rows.length===10&&new Set(ids).size===10&&!missing.length&&!rows.some(x=>!x.master||!x.direction||!x.execution)});
    });
    const total=out.reduce((n,x)=>n+x.count,0);return {version:2,products:out,totalMatrices:total,pass:out.length===4&&total===40&&out.every(x=>x.pass),rule:'4 productos × 10 fotos = 40 matrices'};
  }
  function run(){
    const box=$('#canvasPreview'),meta=typeof state!=='undefined'?(state.factoryMeta||{}):{},product=state?.centralProduct||state?.type||'postal',checks=[];
    const add=(id,ok,detail)=>checks.push({id,ok:Boolean(ok),detail});
    const ca=catalogAudit();
    add('catalog-closed',ca.pass,`${ca.totalMatrices}/40 matrices; 10 opciones por producto.`);
    add('canvas',!!box,'Lienzo presente.'); add('product',!!PRODUCTS[product],product); add('complete-class',!!box?.classList.contains('preview-complete'),'Preview completa activa.');
    add('product-template',box?.classList.contains('master-product-'+product),'Contrato visual de producto aplicado.');
    add('front',!!box?.querySelector('.master-front'),'Frente montado.'); add('reverse',!!box?.querySelector('.master-reverse'),'Reverso montado.');
    const img=box?.querySelector('.master-photo-stage img'); add('photo-stage',!!box?.querySelector('.master-photo-stage'),'Escenario fotográfico dedicado.'); add('photo-node',!!img,'Fotografía montada.'); add('photo-loaded',!!img&&img.complete&&img.naturalWidth>0,img?`${img.naturalWidth}×${img.naturalHeight}px`:'sin imagen');
    add('photo-coverage',!!img&&img.getBoundingClientRect().width>=box.getBoundingClientRect().width*.9&&img.getBoundingClientRect().height>=box.getBoundingClientRect().height*.45,'La fotografía ocupa una superficie editorial real.');
    add('title',text('.master-skin-title h2').length>0,'Título presente.'); add('fact',text('.master-fact-plaque b').length>0,'Dato central presente.'); add('collection',text('.master-collection-code').length>0,'Colección/número presente.'); add('seal',text('.master-skin-seal').length>0,'Sello presente.'); add('origin',text('.master-skin-bottom').length>0,'Marca/origen presente.');
    add('photo-rights',!!meta.photoSelection?.rights,'Derechos registrados.'); add('photo-selection',!!meta.photoSelection?.asset&&meta.materialPhotoApplied===true,'Materia prima fotográfica aplicada.'); add('identity',!!meta.pieceCode&&!!meta.collectionName&&!!meta.makerSeal,'Identidad Ocarina completa.');
    add('photo-render',meta.photoRender?.stage===true&&meta.photoRender?.layerOrder==='art > photo-stage > content > seal','Diagnóstico de capas correcto.'); add('no-placeholder',!box?.querySelector('.photo-missing'),'Sin marcador de foto faltante.');
    add('no-abstract-over-photo',!!img||!box?.querySelector('.original-art-svg'),'Arte abstracto no compite con la foto.');
    const title=rect('.master-skin-title'),fact=rect('.master-fact-plaque'),seal=rect('.master-skin-seal'),credit=rect('.photo-credit-chip');
    add('title-fact-overlap',overlap(title,fact)<.18,`solapamiento ${Math.round(overlap(title,fact)*100)}%`); add('fact-seal-overlap',overlap(fact,seal)<.18,`solapamiento ${Math.round(overlap(fact,seal)*100)}%`); add('credit-seal-overlap',overlap(credit,seal)<.12,`solapamiento ${Math.round(overlap(credit,seal)*100)}%`);
    const critical=['catalog-closed','canvas','product','complete-class','product-template','front','reverse','photo-stage','photo-node','photo-loaded','title','fact','collection','seal','origin','photo-rights','photo-selection','identity','photo-render','no-placeholder'];
    const passed=checks.filter(x=>x.ok).length,criticalPass=critical.every(id=>checks.find(x=>x.id===id)?.ok),result={version:2,product,passed,total:checks.length,score:Math.round(passed/checks.length*100),criticalPass,ready:criticalPass&&checks.filter(x=>!x.ok).length<=3,checks,catalog:ca,masterId:meta.rawMaterial?.masterId||null,photoId:meta.photoId||null,commercialRights:meta.commercialRights===true};
    if(typeof state!=='undefined')state.factoryMeta={...(state.factoryMeta||{}),previewAudit:result,previewQualityGate:result.ready};
    return result;
  }
  function schedule(){setTimeout(run,100);setTimeout(run,500);setTimeout(run,1000)}
  function boot(){['fabrica:working','fabrica:ready','fabrica:masters-ready'].forEach(ev=>document.addEventListener(ev,schedule));document.getElementById('centralProduce')?.addEventListener('click',()=>setTimeout(run,900));setTimeout(run,1200)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaPreviewAudit={version:2,run,catalogAudit,products:PRODUCTS};
})();
