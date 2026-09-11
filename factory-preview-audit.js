/* FÁBRICA CHAÑAR — AUDITORÍA DE PREVISUALIZACIÓN v1
   Auditoría silenciosa de producto terminado.
   No fabrica ni rediseña: verifica que lo que se muestra sea realmente revisable.
*/
(function(){
  const PRODUCTS={
    postal:{label:'Postal',formats:['print','vertical','square']},
    ficha:{label:'Ficha cultural',formats:['print','vertical','square']},
    guide:{label:'Guía breve',formats:['print','vertical','horizontal']},
    infographic:{label:'Infografía',formats:['vertical','square','print']}
  };
  const $=s=>document.querySelector(s);
  const rect=s=>{const el=$(s);return el?.getBoundingClientRect?.()||null};
  const overlap=(a,b)=>{if(!a||!b)return 0;const x=Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left));const y=Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));const area=x*y;const base=Math.min(a.width*a.height,b.width*b.height);return base?area/base:0};
  const text=s=>($(s)?.textContent||'').trim();
  function run(){
    const box=$('#canvasPreview'),meta=typeof state!=='undefined'?(state.factoryMeta||{}):{},product=state?.centralProduct||state?.type||'postal';
    const checks=[];const add=(id,ok,detail)=>checks.push({id,ok:Boolean(ok),detail});
    add('canvas',!!box,'El lienzo existe.');
    add('product',!!PRODUCTS[product],PRODUCTS[product]?.label||product);
    add('complete-class',!!box?.classList.contains('preview-complete'),'Capa de previsualización completa activa.');
    add('front',!!box?.querySelector('.master-front'),'Frente montado.');
    add('reverse',!!box?.querySelector('.master-reverse'),'Reverso montado.');
    const img=box?.querySelector('.master-directed-photo img');
    add('photo-node',!!img,'Fotografía real montada.');
    add('photo-loaded',!!img&&img.complete&&img.naturalWidth>0, img?`${img.naturalWidth}×${img.naturalHeight}px`:'Sin imagen');
    add('photo-coverage',!!img&&img.getBoundingClientRect().width>=box.getBoundingClientRect().width*.9&&img.getBoundingClientRect().height>=box.getBoundingClientRect().height*.9,'La foto cubre el lienzo sin quedar reducida a un elemento decorativo.');
    add('title',text('.master-skin-title h2').length>0,'Título presente.');
    add('fact',text('.master-fact-plaque b').length>0,'Dato presente.');
    add('collection',text('.master-collection-code').length>0,'Colección/número presente.');
    add('seal',text('.master-skin-seal').length>0,'Sello presente.');
    add('origin',text('.master-skin-bottom').length>0,'Procedencia/marca presente.');
    add('photo-rights',!!meta.photoSelection?.rights,'Derechos de fotografía registrados.');
    add('photo-selection',!!meta.photoSelection?.asset&&meta.materialPhotoApplied===true,'Selección automática de materia prima aplicada.');
    add('identity',!!meta.pieceCode&&!!meta.collectionName&&!!meta.makerSeal,'Identidad Ocarina completa.');
    add('no-placeholder',!box?.querySelector('.photo-missing'),'No hay marcador de foto faltante.');
    add('no-abstract-over-photo',!!img||!box?.querySelector('.original-art-svg'),'El arte abstracto queda solo como fallback.');
    const title=rect('.master-skin-title'),fact=rect('.master-fact-plaque'),seal=rect('.master-skin-seal'),credit=rect('.photo-credit-chip');
    add('title-fact-overlap',overlap(title,fact)<.18,`solapamiento ${Math.round(overlap(title,fact)*100)}%`);
    add('fact-seal-overlap',overlap(fact,seal)<.18,`solapamiento ${Math.round(overlap(fact,seal)*100)}%`);
    add('credit-seal-overlap',overlap(credit,seal)<.12,`solapamiento ${Math.round(overlap(credit,seal)*100)}%`);
    const frontVisible=box?.querySelector('.master-front')?.getBoundingClientRect?.().height>0;
    const reverseVisible=box?.classList.contains('master-show-reverse')&&box?.querySelector('.master-reverse')?.getBoundingClientRect?.().height>0;
    add('front-state',frontVisible||reverseVisible,'Hay una cara visible del producto.');
    const passed=checks.filter(x=>x.ok).length,critical=['canvas','product','complete-class','front','reverse','photo-node','photo-loaded','title','fact','collection','seal','origin','photo-rights','photo-selection','identity','no-placeholder'].every(id=>checks.find(x=>x.id===id)?.ok);
    const result={version:1,product,passed,total:checks.length,score:Math.round(passed/checks.length*100),criticalPass:critical,ready:critical&&checks.filter(x=>!x.ok).length<=3,checks,masterId:meta.rawMaterial?.masterId||null,photoId:meta.photoId||null,commercialRights:meta.commercialRights===true};
    if(typeof state!=='undefined')state.factoryMeta={...(state.factoryMeta||{}),previewAudit:result,previewQualityGate:result.ready};
    return result;
  }
  function schedule(){setTimeout(run,100);setTimeout(run,500);setTimeout(run,1000)}
  function boot(){['fabrica:working','fabrica:ready'].forEach(ev=>document.addEventListener(ev,schedule));document.getElementById('centralProduce')?.addEventListener('click',()=>setTimeout(run,700));setTimeout(run,1200)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaPreviewAudit={version:1,run,products:PRODUCTS};
})();
