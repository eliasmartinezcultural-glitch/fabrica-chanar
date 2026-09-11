/* Microinteracción: no agrega controles; hace visible el trabajo de la Fábrica. */
(function(){
  function readyForProduction(){
    if(typeof state==='undefined') return false;
    const d=state.data||{};
    if(!String(d.title||'').trim()) return false;
    return !!String(state.type==='guide'?(d.intro||d.items):(d.body||d.headline)||'').trim();
  }
  function set(mode,message){
    const panel=document.querySelector('.preview-panel');
    const status=document.querySelector('#status');
    if(panel){panel.classList.remove('factory-working','factory-ready');panel.classList.add('factory-'+mode)}
    if(status&&message)status.textContent=message;
  }
  function boot(){
    const button=document.querySelector('#btnGenerate');
    if(!button||button.dataset.motionReady)return;
    button.dataset.motionReady='1';
    button.addEventListener('click',function(){
      if(!readyForProduction())return;
      set('working','La Fábrica está trabajando…');
      window.setTimeout(function(){set('ready','Lista ✨ Mirala, descargala o hacé otra.')},620);
    },true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
