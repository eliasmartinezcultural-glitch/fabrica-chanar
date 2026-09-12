/* FÁBRICA CHAÑAR — FOTO MAESTRA v5
   UNA sola responsabilidad: colocar la fotografía en su escenario.
   No agrega etiquetas técnicas al frente. La procedencia vive en el reverso.
*/
(function(){
  const $=s=>document.querySelector(s);
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  function meta(){return typeof state!=='undefined'?(state.factoryMeta||{}):{}}
  function current(){return meta().masterProduct||null}
  function product(id){return window.FabricaMasterProducts?.find?.(id)||null}
  function asset(id){return window.FabricaAssets?.find?.(id)||null}
  function selectedAssetId(){return meta().photoSelection?.asset||meta().photoId||null}
  function apply(){
    const box=$('#canvasPreview'),mp=current(); if(!box||!mp)return;
    const m=product(mp.id); if(!m)return;
    const skin=box.querySelector('.master-product-skin');
    const front=skin?.querySelector('.master-front');
    if(!skin||!front)return;
    front.querySelector('.master-photo-stage')?.remove();
    const selected=asset(selectedAssetId());
    const fallback=asset(mp.photo||m.photo);
    const a=selected||fallback;
    const src=typeof state!=='undefined'&&state.image?state.image:(a?.photo||null);
    const stage=document.createElement('div');
    stage.className='master-photo-stage';
    stage.setAttribute('aria-label','Fotografía de la pieza');
    stage.innerHTML=src
      ? `<img src="${esc(src)}" alt="${esc(m.name)}" loading="eager" decoding="async" referrerpolicy="no-referrer">`
      : `<div class="photo-missing"><b>FOTO NO DISPONIBLE</b><span>La pieza conserva su estructura hasta incorporar una imagen válida.</span></div>`;
    front.prepend(stage);
    box.classList.add('master-photo-directed');
    box.classList.toggle('master-photo-missing',!src);
    box.querySelectorAll('.original-art-svg').forEach(el=>{el.hidden=!!src;});
    const img=stage.querySelector('img');
    if(img){
      img.style.objectPosition=meta().photoSelection?.position||m.photoPosition||'50% 50%';
      img.addEventListener('load',()=>{box.classList.add('master-photo-loaded');box.classList.remove('master-photo-missing');stage.classList.remove('photo-load-error');},{once:true});
      img.addEventListener('error',()=>{box.classList.remove('master-photo-loaded');box.classList.add('master-photo-missing');stage.classList.add('photo-load-error');img.remove();stage.insertAdjacentHTML('afterbegin','<div class="photo-missing"><b>FOTO NO DISPONIBLE</b><span>Conservar la referencia y solicitar el original/autorización.</span></div>');},{once:true});
    }
    state.factoryMeta={...(state.factoryMeta||{}),photoDirection:{version:5,id:selectedAssetId()||m.photo,focus:m.photoFocus||meta().photoSelection?.focus,crop:m.photoCrop||meta().photoSelection?.crop,position:meta().photoSelection?.position||m.photoPosition,role:m.photoRole||meta().photoSelection?.role,source:m.photoSource||a?.source,rights:m.rights||meta().photoSelection?.rights,license:m.photoLicense||a?.license||'',author:m.photoAuthor||a?.author||''},photoRender:{version:5,stage:true,layerOrder:'photo-stage > content > seal',src:!!src,asset:selectedAssetId()||m.photo,loaded:!!img?.complete&&!!img?.naturalWidth},commercialRights:['own','usable','licensed','authorized'].includes(m.rights||meta().photoSelection?.rights)};
  }
  function hook(){const api=window.FabricaMasterVisuals;if(!api||api.__photoHooked)return false;const original=api.apply;api.apply=function(){const out=original.apply(this,arguments);setTimeout(apply,0);return out};api.__photoHooked=true;return true}
  function schedule(delay=0){setTimeout(()=>{hook();apply()},delay)}
  function boot(){hook();['fabrica:ready','fabrica:masters-ready','fabrica:working','fabrica:series-ready'].forEach(ev=>document.addEventListener(ev,()=>schedule(80)));document.getElementById('btnGenerate')?.addEventListener('click',()=>schedule(180));document.getElementById('centralProduce')?.addEventListener('click',()=>schedule(420));document.getElementById('btnSave')?.addEventListener('click',()=>schedule(220));schedule(900)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaMasterPhotoLayer={version:5,apply,hook};
})();
