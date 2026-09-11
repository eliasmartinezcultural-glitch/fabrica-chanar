/* FÁBRICA CHAÑAR BETA — sale-safe one-screen production mode + taller mágico */
(function(){
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  function currentPhoto(){
    if(typeof state==='undefined') return null;
    if(state.image) return {kind:'own'};
    if(typeof PHOTO_BANK!=='undefined') return PHOTO_BANK.find(p=>p.id===state.photoId)||null;
    return null;
  }
  function setFactoryState(mode,message){
    const panel=document.querySelector('.preview-panel');
    const statusEl=document.querySelector('#status');
    if(panel){panel.classList.remove('factory-working','factory-ready');if(mode)panel.classList.add('factory-'+mode);}
    if(statusEl){statusEl.classList.toggle('factory-message',!!message);if(message)statusEl.textContent=message;}
  }
  async function animateProduction(message){
    setFactoryState('working',message||'La Fábrica está preparando tu pieza…');
    await wait(520);
    if(typeof renderPreview==='function')renderPreview();
    await wait(80);
    setFactoryState('ready','Lista ✨ Mirala, descargala o hacé otra.');
  }
  function boot(){
    document.body.classList.add('beta-mode');
    const controls=document.querySelector('.controls');
    if(!controls || document.querySelector('.beta-surprise')) return;

    const surprise=document.createElement('button');
    surprise.type='button'; surprise.className='beta-surprise';
    surprise.textContent='✦ SORPRÉNDEME — CREAR POR MÍ';
    const grid=document.querySelector('#productGrid'); controls.insertBefore(surprise,grid);

    const upload=document.createElement('label');
    upload.className='beta-upload';
    upload.innerHTML='<span>▣ USAR MI FOTO</span><input id="betaPhoto" type="file" accept="image/jpeg,image/png,image/webp" hidden>';
    controls.insertBefore(upload,grid);
    const note=document.createElement('div'); note.className='beta-note';
    note.textContent='La Fábrica decide. Con una foto propia, la pieza queda lista para uso comercial.';
    controls.appendChild(note);

    document.querySelector('#betaPhoto').addEventListener('change',function(e){
      const file=e.target.files&&e.target.files[0]; if(!file)return;
      if(file.size>8*1024*1024){status('La foto supera 8 MB. Elegí una más liviana.');return;}
      const reader=new FileReader();
      reader.onload=function(){
        if(typeof state!=='undefined'){state.image=reader.result;state.photoId=null;}
        if(typeof renderPreview==='function')renderPreview();
        setFactoryState('ready','Foto propia lista ✨ Ahora la Fábrica puede trabajar con ella.');
        document.querySelector('.preview-panel')?.scrollIntoView({behavior:'smooth',block:'start'});
      };
      reader.readAsDataURL(file);
    });

    surprise.addEventListener('click',async function(){
      const products=['postal','ficha','guide','infographic'];
      const type=products[Math.floor(Math.random()*products.length)];
      const ownImage=typeof state!=='undefined'?state.image:null;
      if(typeof state!=='undefined')state={type:type,data:{},image:ownImage||null,photoId:null};
      if(typeof renderProducts==='function')renderProducts();
      if(typeof renderTemplates==='function')renderTemplates();
      const candidates=(typeof TEMPLATES!=='undefined'?TEMPLATES:[]).filter(t=>t.product===type&&t.photo);
      if(candidates.length&&typeof state!=='undefined'){
        const candidatesWithUsablePhoto=candidates.filter(t=>typeof PHOTO_BANK!=='undefined'&&PHOTO_BANK.some(x=>x.id===t.photo&&x.kind==='usable'));
        const pool=candidatesWithUsablePhoto.length?candidatesWithUsablePhoto:candidates;
        const t=pool[Math.floor(Math.random()*pool.length)];
        state.data={};
        if(!ownImage)state.photoId=t.photo;
        if(typeof renderEditor==='function')renderEditor();
        if(typeof renderPreview==='function')renderPreview();
        await animateProduction(ownImage?'La Fábrica está creando una pieza con tu foto…':'La Fábrica está eligiendo una idea para vos…');
      }
      document.querySelector('.preview-panel')?.scrollIntoView({behavior:'smooth',block:'start'});
    });

    const generate=document.getElementById('btnGenerate');
    if(generate){
      generate.addEventListener('click',function(){
        generate.classList.add('factory-again');
        setFactoryState('working','La Fábrica está trabajando…');
        setTimeout(function(){
          setFactoryState('ready','Lista ✨ Mirala, descargala o hacé otra.');
        },650);
      },true);
    }

    ['btnPng','btnJpg','btnPrint'].forEach(id=>{
      const b=document.getElementById(id);if(!b)return;
      b.addEventListener('click',function(e){
        const p=currentPhoto();
        if(p&&p.kind==='reference'&&!(typeof state!=='undefined'&&state.image)){
          e.preventDefault();e.stopImmediatePropagation();
          if(typeof status==='function')status('Esta foto es referencia. Cargá una foto propia o elegí una imagen con licencia reutilizable.');
        }else{
          setFactoryState('ready','Pieza descargable ✨');
        }
      },true);
    });

    setTimeout(function(){
      if(typeof renderProducts==='function')renderProducts();
      if(typeof renderTemplates==='function')renderTemplates();
      if(typeof renderEditor==='function')renderEditor();
      if(typeof renderPreview==='function')renderPreview();
    },120);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
