/* FÁBRICA CHAÑAR — CAPA FOTOGRÁFICA MAESTRA v3
   La foto real es la capa protagonista de la previsualización.
   El arte abstracto queda como respaldo conceptual, no como una capa opaca
   que tape la fotografía seleccionada por la materia prima.
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
    const box=$('#canvasPreview'),mp=current();
    if(!box||!mp)return;
    const m=product(mp.id);if(!m)return;
    const skin=box.querySelector('.master-product-skin');if(!skin)return;

    skin.querySelector('.master-directed-photo')?.remove();

    /* La materia prima efectiva manda. El fallback mantiene compatibilidad
       con las seis maestras cuando no hay selección explícita. */
    const selected=asset(selectedAssetId());
    const fallback=asset(mp.photo||m.photo);
    const a=selected||fallback;
    const src=typeof state!=='undefined'&&state.image?state.image:(a?.photo||null);

    const photo=document.createElement('div');
    photo.className='master-directed-photo';
    photo.setAttribute('aria-label',m.name||'Fotografía local');
    photo.innerHTML=src
      ? `<img src="${esc(src)}" alt="${esc(m.name)}" loading="eager" decoding="async" referrerpolicy="no-referrer"><span class="photo-credit-chip">${esc(m.photoSource||a?.source||'Fuente fotográfica')} · ${esc(m.rights||a?.license||'referencia')}</span><span class="photo-crop-note">ENCUADRE · ${esc(m.photoFocus||meta().photoSelection?.focus||'protagonista local')}</span>`
      : `<div class="photo-missing"><b>FOTO A INCORPORAR</b><span>${esc(m.photoFocus||'Buscar imagen local autorizada')}</span></div>`;

    skin.querySelector('.master-front')?.prepend(photo);

    /* La fotografía sustituye visualmente al SVG conceptual. No deben competir. */
    box.classList.add('master-photo-directed');
    box.classList.toggle('master-photo-missing',!src);
    box.querySelectorAll('.original-art-svg').forEach(el=>{el.hidden=!!src;});

    const img=photo.querySelector('img');
    if(img){
      img.style.objectPosition=meta().photoSelection?.position||m.photoPosition||'50% 50%';
      img.addEventListener('load',()=>{
        box.classList.add('master-photo-loaded');
        box.classList.remove('master-photo-missing');
        photo.classList.remove('photo-load-error');
      },{once:true});
      img.addEventListener('error',()=>{
        box.classList.remove('master-photo-loaded');
        box.classList.add('master-photo-missing');
        photo.classList.add('photo-load-error');
        img.remove();
        box.querySelectorAll('.original-art-svg').forEach(el=>{el.hidden=true;});
        photo.insertAdjacentHTML('afterbegin','<div class="photo-missing"><b>FOTO NO DISPONIBLE</b><span>Conservar referencia y solicitar original/autorización.</span></div>');
      },{once:true});
    }

    state.factoryMeta={...(state.factoryMeta||{}),
      photoDirection:{
        version:3,
        id:selectedAssetId()||m.photo,
        focus:m.photoFocus||meta().photoSelection?.focus,
        crop:m.photoCrop||meta().photoSelection?.crop,
        position:meta().photoSelection?.position||m.photoPosition,
        role:m.photoRole||meta().photoSelection?.role,
        source:m.photoSource||a?.source,
        rights:m.rights||meta().photoSelection?.rights,
        license:m.photoLicense||a?.license||'',
        author:m.photoAuthor||a?.author||''
      },
      commercialRights:['own','usable','licensed','authorized'].includes(m.rights||meta().photoSelection?.rights)
    };
  }
  function hook(){
    const api=window.FabricaMasterVisuals;if(!api||api.__photoHooked)return false;
    const original=api.apply;
    api.apply=function(){const out=original.apply(this,arguments);setTimeout(apply,0);return out};
    api.__photoHooked=true;
    return true;
  }
  function schedule(delay=0){setTimeout(()=>{hook();apply()},delay)}
  function boot(){
    hook();
    ['fabrica:ready','fabrica:masters-ready','fabrica:working'].forEach(ev=>document.addEventListener(ev,()=>schedule(80)));
    document.getElementById('btnGenerate')?.addEventListener('click',()=>schedule(180));
    document.getElementById('centralProduce')?.addEventListener('click',()=>schedule(420));
    document.getElementById('btnSave')?.addEventListener('click',()=>schedule(220));
    schedule(900);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaMasterPhotoLayer={version:3,apply,hook};
})();