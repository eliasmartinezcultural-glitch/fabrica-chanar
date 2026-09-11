/* FÁBRICA CHAÑAR — PREVISUALIZACIÓN COMPLETA v1
   Capa de presentación final sobre el motor existente.
   La previsualización debe mostrar el objeto, no una idea del objeto.
*/
(function(){
  const PRODUCTS={
    postal:{name:'POSTAL',format:'POSTAL 10×15',concept:'RECUERDO VISUAL'},
    ficha:{name:'FICHA CULTURAL',format:'FICHA 10×15',concept:'DOCUMENTO LOCAL'},
    guide:{name:'GUÍA BREVE',format:'GUÍA 10×15',concept:'PARA RECORRER'},
    infographic:{name:'INFOGRAFÍA',format:'INFOGRAFÍA VERTICAL',concept:'MIRADA LOCAL'}
  };
  const $=s=>document.querySelector(s), esc=v=>String(v??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[c]));
  function stateMeta(){return typeof state!=='undefined'?state.factoryMeta||{}:{};}
  function material(){return stateMeta().rawMaterial||null;}
  function master(){const id=material()?.masterId;return id?window.FabricaMasterProducts?.find?.(id):null;}
  function selectedProduct(){return typeof state!=='undefined'?(state.centralProduct||state.type||'postal'):'postal';}
  function ensureSourceImage(){
    const meta=stateMeta(),src=typeof state!=='undefined'?state.image:null,box=$('#canvasPreview');
    const photo=box?.querySelector('.master-directed-photo');
    if(!photo||!src)return;
    let img=photo.querySelector('img');
    if(!img){img=document.createElement('img');photo.prepend(img);}
    if(img.src!==src)img.src=src;
    img.alt=master()?.name||'Fotografía local';
    const pos=meta.photoSelection?.position||master()?.photoPosition;
    if(pos)img.style.objectPosition=pos;
    photo.classList.remove('photo-load-error');
    box.classList.remove('master-photo-missing');
  }
  function apply(){
    const m=material(),mp=master(),box=$('#canvasPreview'),product=selectedProduct();
    if(!box||!m||!mp||!PRODUCTS[product]||!window.FabricaMasterVisuals?.apply)return false;
    state.factoryMeta={...(state.factoryMeta||{}),masterProduct:{...mp,requestedProduct:product,photo:m.photo?.asset||mp.photo}};
    window.FabricaMasterVisuals.apply();
    box.classList.remove('preview-product-postal','preview-product-ficha','preview-product-guide','preview-product-infographic');
    box.classList.add('preview-product-'+product,'preview-complete');
    const p=PRODUCTS[product];
    const format=box.querySelector('.master-format');if(format)format.textContent=p.format;
    const kicker=box.querySelector('.master-skin-kicker');if(kicker)kicker.textContent=p.concept;
    const skin=box.querySelector('.master-product-skin');if(skin)skin.dataset.product=product;
    ensureSourceImage();
    state.factoryMeta.preview={version:1,complete:true,product,masterId:mp.id,photoId:state.photoId||null,front:true,reverseAvailable:true,format:p.format};
    return true;
  }
  function schedule(){setTimeout(apply,80);setTimeout(apply,240);setTimeout(apply,600);}
  function boot(){
    ['fabrica:ready','fabrica:working'].forEach(ev=>document.addEventListener(ev,schedule));
    document.getElementById('btnSave')?.addEventListener('click',schedule);
    document.getElementById('centralProduce')?.addEventListener('click',()=>setTimeout(schedule,350));
    setTimeout(schedule,900);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaCompletePreview={version:1,apply,products:PRODUCTS};
})();
