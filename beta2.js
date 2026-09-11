/* FÁBRICA CHAÑAR — experiencia simplificada v7 */
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
  function makeDetails(title,cls){const d=document.createElement('details');d.className=cls;const s=document.createElement('summary');s.textContent=title;d.appendChild(s);return d}
  function injectInterfaceCSS(){
    if(document.getElementById('fabrica-simplified-ui'))return;
    const style=document.createElement('style');style.id='fabrica-simplified-ui';style.textContent=`
      .beta-mode:before,.beta-mode:after,.beta-mode .controls:before,.beta-mode .hero:before,.beta-mode .hero:after,.beta-mode .preview-panel:before,.beta-mode .preview-wrap:before,.beta-mode .preview-wrap:after{display:none!important}
      .beta-mode .hero{padding-top:22px;padding-bottom:28px}
      .beta-mode .hero h1{text-shadow:none}
      .beta-mode .hero-rule span,.beta-mode .hero-rule strong{box-shadow:none}
      .beta-series-details,.beta-advanced-details{margin:10px 0 14px;border:2px solid #e4eef0;border-radius:18px;background:rgba(255,255,255,.78);overflow:hidden}
      .beta-series-details>summary,.beta-advanced-details>summary{list-style:none;cursor:pointer;padding:12px 14px;font:900 11px/1.2 "Trebuchet MS",Inter,sans-serif;letter-spacing:.04em;color:#486875;background:#f7fcfd}
      .beta-series-details>summary::-webkit-details-marker,.beta-advanced-details>summary::-webkit-details-marker{display:none}
      .beta-series-details[open]>summary,.beta-advanced-details[open]>summary{border-bottom:1px solid #e1ecee;background:#eef9fb}
      .beta-series-details>.collection-studio{margin:0;border:0;border-radius:0;box-shadow:none;background:transparent;padding:14px}
      .beta-advanced-details{margin-top:12px}
      .beta-advanced-details>.step:first-child{margin-top:14px}
      .beta-advanced-details>.actions{margin:14px}
      .beta-advanced-details>.status{margin:0 14px 12px}
      .factory-studio{margin-bottom:10px}
      @media(max-width:700px){.beta-series-details>summary,.beta-advanced-details>summary{padding:13px}.beta-advanced-details>.actions{display:flex}}
    `;document.head.appendChild(style);
  }
  function simplifyControls(){
    const controls=document.querySelector('.controls');if(!controls||controls.dataset.simplified)return;
    const studio=document.querySelector('.factory-studio'),collection=document.querySelector('#collectionStudio'),statusEl=document.querySelector('#status');
    if(collection&&!collection.closest('details')){const d=makeDetails('🍇 Hacer una serie curada','beta-series-details');collection.parentNode.insertBefore(d,collection);d.appendChild(collection)}
    const advanced=makeDetails('⚙ Más opciones','beta-advanced-details');
    const nodes=[...controls.children].filter(el=>{if(el===studio||el===advanced||el.classList.contains('collection-studio'))return false;if(el.id==='status'||el.classList.contains('beta-series-details'))return false;return true});
    nodes.forEach(el=>advanced.appendChild(el));
    controls.appendChild(advanced);
    if(statusEl)controls.insertBefore(statusEl,advanced);
    controls.dataset.simplified='1';
  }
  function boot(){
    document.body.classList.add('beta-mode');injectInterfaceCSS();
    document.addEventListener('fabrica:working',e=>setFactoryState('working',e.detail?.message||'La Fábrica está trabajando…'));
    document.addEventListener('fabrica:ready',e=>setFactoryState('ready',e.detail?.message||'Lista ✨ Mirala, descargala o hacé otra.'));
    ['btnPng','btnJpg','btnPrint'].forEach(id=>{const b=document.getElementById(id);if(!b)return;b.addEventListener('click',function(e){if(!safeCurrentPhoto()){e.preventDefault();e.stopImmediatePropagation();status('Para descargar esta pieza, usá una foto propia o una imagen con licencia reutilizable.');setFactoryState('working','La Fábrica protegió la salida porque la imagen actual no está habilitada para uso comercial.');return}setFactoryState('ready','Pieza lista para descargar ✨')},true)});
    setTimeout(simplifyControls,260);
    setTimeout(()=>{if(typeof renderProducts==='function')renderProducts();if(typeof renderTemplates==='function')renderTemplates();if(typeof renderForm==='function')renderForm();if(typeof renderPreview==='function')renderPreview();setTimeout(simplifyControls,100)},120);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
