/* FÁBRICA CHAÑAR — experiencia simplificada v5
   Regla: las decisiones frecuentes quedan visibles; lo técnico queda plegado.
   El motor interno sigue trabajando igual, pero la interfaz deja de duplicar caminos.
*/
(function(){
  function setFactoryState(mode,message){
    const panel=document.querySelector('.preview-panel'),el=document.querySelector('#status');
    if(panel){panel.classList.remove('factory-working','factory-ready');if(mode)panel.classList.add('factory-'+mode)}
    if(el){el.classList.toggle('factory-message',!!message);if(message)el.textContent=message}
  }
  function safeCurrentPhoto(){
    if(typeof state==='undefined')return false;
    if(state.image)return true;
    const p=typeof PHOTO_BANK!=='undefined'?PHOTO_BANK.find(x=>x.id===state.photoId):null;
    return p?.kind==='usable';
  }
  function makeDetails(title,cls){
    const d=document.createElement('details');d.className=cls;
    const s=document.createElement('summary');s.textContent=title;d.appendChild(s);return d;
  }
  function simplifyControls(){
    const controls=document.querySelector('.controls');if(!controls||controls.dataset.simplified)return;
    controls.dataset.simplified='1';
    const studio=document.querySelector('.factory-studio');
    const collection=document.querySelector('#collectionStudio');
    if(collection&&!collection.closest('details')){
      const d=makeDetails('🍇 Hacer una serie curada','beta-series-details');
      collection.parentNode.insertBefore(d,collection);d.appendChild(collection);
    }
    const advanced=makeDetails('⚙ Más opciones','beta-advanced-details');
    const nodes=[...controls.children].filter(el=>{
      if(el===studio||el===advanced)return false;
      if(el.classList.contains('collection-studio'))return false;
      if(el.id==='status')return false;
      if(el.matches('.factory-studio'))return false;
      return true;
    });
    nodes.forEach(el=>advanced.appendChild(el));
    controls.appendChild(advanced);
  }
  function boot(){
    document.body.classList.add('beta-mode');
    document.addEventListener('fabrica:working',e=>setFactoryState('working',e.detail?.message||'La Fábrica está trabajando…'));
    document.addEventListener('fabrica:ready',e=>setFactoryState('ready',e.detail?.message||'Lista ✨ Mirala, descargala o hacé otra.'));
    ['btnPng','btnJpg','btnPrint'].forEach(id=>{
      const b=document.getElementById(id);if(!b)return;
      b.addEventListener('click',function(e){
        if(!safeCurrentPhoto()){
          e.preventDefault();e.stopImmediatePropagation();
          status('Para descargar esta pieza, usá una foto propia o una imagen con licencia reutilizable.');
          setFactoryState('working','La Fábrica protegió la salida porque la imagen actual no está habilitada para uso comercial.');
          return;
        }
        setFactoryState('ready','Pieza lista para descargar ✨');
      },true);
    });
    setTimeout(simplifyControls,220);
    setTimeout(()=>{
      if(typeof renderProducts==='function')renderProducts();
      if(typeof renderTemplates==='function')renderTemplates();
      if(typeof renderForm==='function')renderForm();
      if(typeof renderPreview==='function')renderPreview();
      setTimeout(simplifyControls,80);
    },120);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
