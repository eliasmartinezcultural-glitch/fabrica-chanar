/* FÁBRICA CHAÑAR — modo producción + taller mágico */
(function(){
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  function currentPhoto(){return typeof state!=='undefined'?(state.image?{kind:'own'}:(typeof PHOTO_BANK!=='undefined'?PHOTO_BANK.find(p=>p.id===state.photoId):null)):null}
  function setFactoryState(mode,message){const panel=document.querySelector('.preview-panel'),el=document.querySelector('#status');if(panel){panel.classList.remove('factory-working','factory-ready');if(mode)panel.classList.add('factory-'+mode)}if(el){el.classList.toggle('factory-message',!!message);if(message)el.textContent=message}}
  async function animateProduction(message){setFactoryState('working',message);await wait(360);if(typeof renderPreview==='function')renderPreview();await wait(90);setFactoryState('ready','Lista ✨ Mirala, descargala o hacé otra.')}
  function boot(){
    document.body.classList.add('beta-mode');
    const controls=document.querySelector('.controls');
    if(!controls||document.querySelector('.beta-surprise'))return;
    const surprise=document.createElement('button');surprise.type='button';surprise.className='beta-surprise';surprise.textContent='✦ SORPRÉNDEME — CREAR POR MÍ';controls.insertBefore(surprise,document.querySelector('#productGrid'));
    const upload=document.createElement('label');upload.className='beta-upload';upload.innerHTML='<span>▣ USAR MI FOTO</span><input id="betaPhoto" type="file" accept="image/jpeg,image/png,image/webp" hidden>';controls.insertBefore(upload,document.querySelector('#productGrid'));
    const note=document.createElement('div');note.className='beta-note';note.textContent='La Fábrica decide. Con una foto propia, la pieza queda lista para uso comercial.';controls.appendChild(note);
    document.querySelector('#betaPhoto').addEventListener('change',function(e){const file=e.target.files&&e.target.files[0];if(!file)return;if(file.size>8*1024*1024){status('La foto supera 8 MB. Elegí una más liviana.');return}const reader=new FileReader();reader.onload=function(){state.image=reader.result;state.photoId=null;renderPreview();setFactoryState('ready','Foto propia lista ✨ Ahora la Fábrica puede trabajar con ella.');document.querySelector('.preview-panel')?.scrollIntoView({behavior:'smooth',block:'start'})};reader.readAsDataURL(file)});
    surprise.addEventListener('click',async function(){if(typeof FabricaEngine==='undefined'){status('El motor automático todavía está cargando.');return}const result=await FabricaEngine.produce({});if(result.ok){await animateProduction(result.commercialReady?'La Fábrica está creando una pieza segura…':'La Fábrica está preparando una pieza…');document.querySelector('.preview-panel')?.scrollIntoView({behavior:'smooth',block:'start')}}});
    document.addEventListener('fabrica:working',e=>setFactoryState('working',e.detail?.message||'La Fábrica está trabajando…'));
    document.addEventListener('fabrica:ready',e=>setFactoryState('ready',e.detail?.message||'Lista ✨ Mirala, descargala o hacé otra.'));
    ['btnPng','btnJpg','btnPrint'].forEach(id=>{const b=document.getElementById(id);if(!b)return;b.addEventListener('click',function(e){const p=currentPhoto();if(p&&p.kind==='reference'&&!(state&&state.image)){e.preventDefault();e.stopImmediatePropagation();status('Esta foto es referencia. Cargá una foto propia o elegí una imagen con licencia reutilizable.')}else setFactoryState('ready','Pieza descargable ✨')},true)});
    setTimeout(()=>{if(typeof renderProducts==='function')renderProducts();if(typeof renderTemplates==='function')renderTemplates();if(typeof renderForm==='function')renderForm();if(typeof renderPreview==='function')renderPreview()},120);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();