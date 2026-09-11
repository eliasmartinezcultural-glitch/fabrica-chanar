/* FÁBRICA CHAÑAR BETA — sale-safe one-screen production mode */
(function(){
  function currentPhoto(){
    if(typeof state==='undefined') return null;
    if(state.image) return {kind:'own'};
    if(typeof PHOTO_BANK!=='undefined') return PHOTO_BANK.find(p=>p.id===state.photoId)||null;
    return null;
  }
  function boot(){
    document.body.classList.add('beta-mode');
    const controls=document.querySelector('.controls');
    if(!controls || document.querySelector('.beta-surprise')) return;
    const surprise=document.createElement('button'); surprise.type='button'; surprise.className='beta-surprise'; surprise.textContent='✦ SORPRÉNDEME — CREAR POR MÍ';
    const grid=document.querySelector('#productGrid'); controls.insertBefore(surprise,grid);
    const upload=document.createElement('label'); upload.className='beta-upload'; upload.innerHTML='<span>▣ USAR MI FOTO</span><input id="betaPhoto" type="file" accept="image/jpeg,image/png,image/webp" hidden>'; controls.insertBefore(upload,grid);
    const note=document.createElement('div'); note.className='beta-note'; note.textContent='La Fábrica decide. Con una foto propia, la pieza queda lista para uso comercial.'; controls.appendChild(note);
    document.querySelector('#betaPhoto').addEventListener('change',function(e){
      const file=e.target.files&&e.target.files[0]; if(!file)return; if(file.size>8*1024*1024){status('La foto supera 8 MB. Elegí una más liviana.');return;}
      const reader=new FileReader(); reader.onload=function(){ if(typeof state!=='undefined'){state.image=reader.result;state.photoId=null;} if(typeof renderPreview==='function')renderPreview(); if(typeof status==='function')status('Foto propia cargada · lista para producir'); document.querySelector('.preview-panel')?.scrollIntoView({behavior:'smooth',block:'start'}); }; reader.readAsDataURL(file);
    });
    surprise.addEventListener('click',function(){
      const products=['postal','ficha','guide','infographic']; const type=products[Math.floor(Math.random()*products.length)]; if(typeof state!=='undefined')state={type:type,data:{},image:null,photoId:null};
      if(typeof renderProducts==='function')renderProducts(); if(typeof renderTemplates==='function')renderTemplates();
      const candidates=(typeof TEMPLATES!=='undefined'?TEMPLATES:[]).filter(t=>t.product===type&&t.photo); if(candidates.length&&typeof state!=='undefined'){
        const usable=candidates.filter(t=>{const p=PHOTO_BANK.find(x=>x.id===t.photo);return p&&p.kind==='usable'}); const pool=usable.length?usable:candidates; const t=pool[Math.floor(Math.random()*pool.length)]; state.data={};state.photoId=t.photo;
        if(typeof renderEditor==='function')renderEditor(); if(typeof renderPreview==='function')renderPreview(); if(typeof status==='function')status((usable.length?'Lista · ':'Vista previa · ')+t.name);
      }
      document.querySelector('.preview-panel')?.scrollIntoView({behavior:'smooth',block:'start'});
    });
    ['btnPng','btnJpg','btnPrint'].forEach(id=>{const b=document.getElementById(id);if(!b)return;b.addEventListener('click',function(e){const p=currentPhoto();if(p&&p.kind==='reference'&&!(typeof state!=='undefined'&&state.image)){e.preventDefault();e.stopImmediatePropagation();if(typeof status==='function')status('Esta foto es referencia. Cargá una foto propia o elegí una imagen con licencia reutilizable.');}},true);});
    setTimeout(function(){if(typeof renderProducts==='function')renderProducts();if(typeof renderTemplates==='function')renderTemplates();if(typeof renderEditor==='function')renderEditor();if(typeof renderPreview==='function')renderPreview();},120);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
