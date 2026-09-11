/* FÁBRICA CHAÑAR BETA — one-screen production mode */
(function(){
  function boot(){
    document.body.classList.add('beta-mode');
    const controls=document.querySelector('.controls');
    if(!controls || document.querySelector('.beta-surprise')) return;
    const surprise=document.createElement('button');
    surprise.type='button';
    surprise.className='beta-surprise';
    surprise.textContent='✦ SORPRÉNDEME — CREAR POR MÍ';
    const grid=document.querySelector('#productGrid');
    controls.insertBefore(surprise,grid);
    const note=document.createElement('div');
    note.className='beta-note';
    note.textContent='La Fábrica elige motivo, plantilla, imagen y composición. Vos solo descargás.';
    controls.appendChild(note);
    surprise.addEventListener('click',function(){
      const products=['postal','ficha','guide','infographic'];
      const type=products[Math.floor(Math.random()*products.length)];
      if(typeof state!=='undefined') state={type:type,data:{},image:null,photoId:null};
      if(typeof renderProducts==='function')renderProducts();
      if(typeof renderTemplates==='function')renderTemplates();
      const candidates=(typeof TEMPLATES!=='undefined'?TEMPLATES:[]).filter(t=>t.product===type && t.photo);
      if(candidates.length && typeof state!=='undefined'){
        const t=candidates[Math.floor(Math.random()*candidates.length)];
        state.data={};state.photoId=t.photo;
        if(typeof renderEditor==='function')renderEditor();
        if(typeof renderPreview==='function')renderPreview();
        if(typeof status==='function')status('Lista · '+t.name+' · podés descargarla');
      }else if(typeof status==='function')status('Elegí un formato para comenzar');
      document.querySelector('.preview-panel')?.scrollIntoView({behavior:'smooth',block:'start'});
    });
    // Generate automatically on first visit: the beta should never open empty.
    setTimeout(function(){
      if(typeof renderProducts==='function')renderProducts();
      if(typeof renderTemplates==='function')renderTemplates();
      if(typeof renderEditor==='function')renderEditor();
      if(typeof renderPreview==='function')renderPreview();
    },120);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
