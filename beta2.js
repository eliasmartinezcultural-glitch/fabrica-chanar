/* FÁBRICA CHAÑAR — PUENTE DE PRODUCCIÓN v10
   Exportar permite prototipos; vender exige derechos comerciales.
*/
(function(){
  function setFactoryState(mode,message){
    const panel=document.querySelector('.preview-panel'),el=document.querySelector('#status');
    if(panel){panel.classList.remove('factory-working','factory-ready');if(mode)panel.classList.add('factory-'+mode)}
    if(el&&message)el.textContent=message;
  }
  function commercialCurrent(){
    if(typeof state==='undefined')return false;
    const meta=state.factoryMeta||{};
    if(meta.commercialRights===true||meta.commercialReady===true)return true;
    const rights=meta.provenance?.rights||meta.rights;
    if(['own','usable','licensed','authorized'].includes(rights))return true;
    const p=typeof PHOTO_BANK!=='undefined'?PHOTO_BANK.find(x=>x.id===state.photoId):null;
    return ['usable','licensed','authorized'].includes(p?.kind)||['own','licensed','authorized'].includes(p?.rights);
  }
  function prototypeCurrent(){
    if(typeof state==='undefined')return false;
    return !!(state.factoryMeta?.curated||state.factoryMeta?.masterProduct||state.templateId);
  }
  function guardDownload(e){
    if(commercialCurrent()){
      setFactoryState('ready','Pieza lista para descargar y revisar comercialmente.');
      return true;
    }
    if(prototypeCurrent()){
      setFactoryState('ready','Prototipo exportable. La fotografía externa no queda habilitada para venta hasta resolver sus derechos.');
      return true;
    }
    e.preventDefault();e.stopImmediatePropagation();
    setFactoryState('working','La Fábrica no exportó una pieza incompleta.');
    return false;
  }
  function boot(){
    document.body.classList.add('beta-mode');
    document.addEventListener('fabrica:working',e=>setFactoryState('working',e.detail?.message||'La Fábrica está trabajando…'));
    document.addEventListener('fabrica:ready',e=>setFactoryState('ready',e.detail?.message||'Lista ✨ Revisá, guardá o fabricá otra.'));
    ['btnPng','btnJpg','btnPrint'].forEach(id=>{const b=document.getElementById(id);if(b)b.addEventListener('click',guardDownload,true)});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaBeta={version:10,commercialCurrent,prototypeCurrent};
})();
