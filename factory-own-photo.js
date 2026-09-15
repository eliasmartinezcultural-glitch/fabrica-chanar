/* FÁBRICA CHAÑAR — FOTO PROPIA v1
   Carga local, privada y liviana. Nunca sube la imagen a un servidor.
*/
(function(){
  const MAX_EDGE=1400, QUALITY=.78;
  const $=s=>document.querySelector(s);
  const status=t=>{const a=$('#status'),b=$('#centralStatus');if(a)a.textContent=t;if(b)b.textContent=t};
  function compress(file){return new Promise((resolve,reject)=>{
    if(!file||!file.type.startsWith('image/')) return reject(new Error('invalid-image'));
    const url=URL.createObjectURL(file),img=new Image();
    img.onload=()=>{try{
      const scale=Math.min(1,MAX_EDGE/Math.max(img.naturalWidth,img.naturalHeight));
      const w=Math.max(1,Math.round(img.naturalWidth*scale)),h=Math.max(1,Math.round(img.naturalHeight*scale));
      const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);
      const data=c.toDataURL('image/jpeg',QUALITY);URL.revokeObjectURL(url);resolve(data);
    }catch(e){URL.revokeObjectURL(url);reject(e)}};
    img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('decode-error'))};img.src=url;
  })}
  function render(){
    const host=$('#ownPhotoControl');if(!host)return;
    const has=typeof state!=='undefined'&&!!state.image;
    host.innerHTML=`<div class="own-photo-head"><div><span class="central-label">Fotografía propia</span><small>Opcional · la imagen queda en este dispositivo</small></div>${has?'<button id="clearOwnPhoto" type="button" class="own-photo-clear">Quitar</button>':''}</div><label class="own-photo-drop" for="ownPhotoInput"><input id="ownPhotoInput" type="file" accept="image/jpeg,image/png,image/webp,image/avif"><span class="own-photo-icon">＋</span><b>${has?'Reemplazar fotografía':'Agregar fotografía'}</b><small>JPG, PNG, WEBP o AVIF · se optimiza automáticamente</small></label><div class="own-photo-rights">✓ Foto propia = prioridad editorial · no se publica ni se sube desde esta herramienta.</div>`;
    $('#ownPhotoInput')?.addEventListener('change',async e=>{const f=e.target.files?.[0];if(!f)return;status('Optimizando fotografía…');try{const data=await compress(f);if(typeof state!=='undefined'){state.image=data;state.photoId=null;state.factoryMeta={...(state.factoryMeta||{}),ownPhoto:{version:1,active:true,name:f.name,type:f.type,bytes:f.size,localOnly:true,rights:'own'}};window.renderPreview?.();window.FabricaMasterPhotoLayer?.apply?.();}render();status('Fotografía propia lista. Ahora podés fabricar la pieza.')}catch(err){console.error(err);status('No se pudo leer esa imagen. Probá con JPG, PNG o WEBP.')}});
    $('#clearOwnPhoto')?.addEventListener('click',()=>{if(typeof state!=='undefined'){state.image=null;state.photoId='ingreso';state.factoryMeta={...(state.factoryMeta||{}),ownPhoto:null};window.renderPreview?.();window.FabricaMasterPhotoLayer?.apply?.()}render();status('Fotografía propia quitada. La Fábrica volverá a usar su selección editorial.')});
  }
  function boot(){if($('#ownPhotoControl')){render();return}const shell=$('.central-shell');if(!shell)return;const box=document.createElement('div');box.id='ownPhotoControl';box.className='own-photo-control';const options=shell.querySelector('.central-options');if(options)options.before(box);else shell.appendChild(box);render()}
  function schedule(){setTimeout(boot,500);setTimeout(boot,1500)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
  document.addEventListener('fabrica:ready',()=>setTimeout(boot,100));
  window.FabricaOwnPhoto={version:1,render};
})();
