/* FÁBRICA CHAÑAR — CAPA FOTOGRÁFICA MAESTRA v1
   La fábrica decide la foto; la dirección decide cómo mirarla.
   Nunca estira. Recorta, orienta y deja aire donde el texto necesita respirar.
*/
(function(){
  const $=s=>document.querySelector(s);
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  function current(){return typeof state!=='undefined'?state.factoryMeta?.masterProduct:null}
  function product(id){return window.FabricaMasterProducts?.find?.(id)||null}
  function asset(id){return window.FabricaAssets?.find?.(id)||null}
  function apply(){
    const box=$('#canvasPreview'),mp=current();
    if(!box||!mp)return;
    const m=product(mp.id);if(!m)return;
    const skin=box.querySelector('.master-product-skin');if(!skin)return;
    skin.querySelector('.master-directed-photo')?.remove();
    const a=asset(m.photo);
    const src=a?.photo;
    const usePhoto=!!src;
    const photo=document.createElement('div');
    photo.className='master-directed-photo';
    photo.innerHTML=usePhoto
      ? `<img src="${esc(src)}" alt="${esc(m.name)}" loading="eager" decoding="async"><span class="photo-credit-chip">${esc(m.photoSource||a?.source||'Fuente fotográfica')} · ${esc(m.rights||a?.license||'referencia')}</span><span class="photo-crop-note">ENCUADRE · ${esc(m.photoFocus||'protagonista local')}</span>`
      : `<div class="photo-missing"><b>FOTO A INCORPORAR</b><span>${esc(m.photoFocus||'Buscar imagen local autorizada')}</span></div>`;
    const front=skin.querySelector('.master-front');
    front?.prepend(photo);
    if(!usePhoto){box.classList.add('master-photo-missing')}else box.classList.remove('master-photo-missing');
    const img=photo.querySelector('img');
    if(img){img.style.objectPosition=m.photoPosition||'50% 50%';img.onerror=()=>{photo.classList.add('photo-load-error');photo.querySelector('img')?.remove();photo.insertAdjacentHTML('afterbegin','<div class="photo-missing"><b>FOTO NO DISPONIBLE</b><span>Conservar referencia y solicitar original/autorización.</span></div>')}}
    box.classList.add('master-photo-directed');
    state.factoryMeta={...(state.factoryMeta||{}),photoDirection:{version:1,id:m.photo,focus:m.photoFocus,crop:m.photoCrop,position:m.photoPosition,role:m.photoRole,source:m.photoSource,rights:m.rights,license:m.photoLicense||a?.license||'',author:m.photoAuthor||a?.author||''},commercialRights:['own','usable','licensed','authorized'].includes(m.rights)};
  }
  function boot(){['fabrica:ready','fabrica:masters-ready'].forEach(ev=>document.addEventListener(ev,()=>setTimeout(apply,100)));document.getElementById('btnGenerate')?.addEventListener('click',()=>setTimeout(apply,220));document.getElementById('btnSave')?.addEventListener('click',()=>setTimeout(apply,220));setTimeout(apply,900)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaMasterPhotoLayer={version:1,apply};
})();