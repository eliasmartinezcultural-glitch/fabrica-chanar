/* FÁBRICA CHAÑAR — PUENTE DE EXPERIENCIA v9
   El núcleo central manda. Este archivo solo protege estado, exportación y mensajes.
   No mueve ni reordena controles: eso pertenece a factory-central.js.
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
    if(meta.commercialRights===true)return true;
    const rights=meta.provenance?.rights||meta.rights;
    if(['own','usable','licensed','authorized'].includes(rights))return true;
    const p=typeof PHOTO_BANK!=='undefined'?PHOTO_BANK.find(x=>x.id===state.photoId):null;
    return ['usable','licensed','authorized'].includes(p?.kind)||['own','licensed','authorized'].includes(p?.rights);
  }
  function guardDownload(e){
    if(!commercialCurrent()){
      e.preventDefault();e.stopImmediatePropagation();
      setFactoryState('working','La Fábrica protegió la salida: esta pieza necesita una imagen propia/licenciada o arte original comercial.');
      return false;
    }
    setFactoryState('ready','Pieza lista para descargar ✨');return true;
  }
  function boot(){
    document.body.classList.add('beta-mode');
    document.addEventListener('fabrica:working',e=>setFactoryState('working',e.detail?.message||'La Fábrica está trabajando…'));
    document.addEventListener('fabrica:ready',e=>setFactoryState('ready',e.detail?.message||'Lista ✨ Mirala, guardala o fabricá otra.'));
    ['btnPng','btnJpg','btnPrint'].forEach(id=>{const b=document.getElementById(id);if(b)b.addEventListener('click',guardDownload,true)});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaBeta={version:9,commercialCurrent};
})();