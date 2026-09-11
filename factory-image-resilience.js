/* FÁBRICA CHAÑAR — RESILIENCIA VISUAL v1
   La interfaz nunca queda en blanco porque una foto externa no responde.
   La foto puede seguir siendo referencia; el producto puede seguir previsualizándose.
*/
(function(){
  const $=s=>document.querySelector(s);
  const palette={patagonia:['#dbe9e6','#c7b487','#6e816f'],vino:['#e6d7c7','#8b5364','#695342'],cava:['#ded2bd','#8d7357','#57493f'],vendimia:['#efbd69','#a64d35','#63362f'],fiesta:['#f0d2a2','#a9563d','#526d67'],arte:['#ded3c5','#936a4f','#4c3d37']};
  function svgFallback(style,label){const p=palette[style]||palette.patagonia;const safe=String(label||'CHAÑAR').replace(/[&<>]/g,'');return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700"><rect width="1000" height="700" fill="'+p[0]+'"/><path d="M0 390 Q180 290 360 390 T720 370 T1000 350 V700 H0Z" fill="'+p[1]+'"/><path d="M0 510 Q180 440 350 510 T700 500 T1000 470 V700 H0Z" fill="'+p[2]+'"/><circle cx="810" cy="130" r="70" fill="#f3df9b" opacity=".85"/><g fill="none" stroke="#315d65" stroke-width="7" opacity=".8"><path d="M90 540 Q260 450 420 540"/><path d="M180 580 Q360 470 540 570"/><path d="M300 610 Q500 480 700 580"/></g><text x="500" y="110" text-anchor="middle" font-family="Georgia,serif" font-size="34" font-weight="700" fill="#30271f">'+safe+'</text><text x="500" y="650" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" letter-spacing="5" fill="#fffaf0">FÁBRICA CHAÑAR · VISUAL DE RESPALDO</text></svg>');}
  function styleOf(){return window.state?.style||window.state?.factoryMeta?.style||window.currentTemplate?.()?.style||'patagonia'}
  function repairImages(root){
    if(!root)return;
    root.querySelectorAll('img').forEach(img=>{
      if(img.dataset.resilience==='1')return;
      img.dataset.resilience='1';
      img.loading='eager';
      img.addEventListener('error',()=>{
        if(img.dataset.fallbackDone)return;
        img.dataset.fallbackDone='1';
        const label=window.state?.data?.title||window.state?.factoryMeta?.masterProduct?.name||'San Patricio del Chañar';
        img.src=svgFallback(styleOf(),label);
        img.classList.add('factory-image-fallback');
      },{once:true});
      if(img.complete&&img.naturalWidth===0){img.dispatchEvent(new Event('error'))}
    });
  }
  function ensurePreview(root){
    if(!root)return;
    repairImages(root);
    if(root.classList.contains('master-product-preview'))return;
    const hasVisual=root.querySelector('img,svg,.piece-card,.preview-card,.postal-card,.ficha-card,.guide-card,.infographic-card');
    if(hasVisual)return;
    root.classList.add('factory-preview-fallback');
    root.style.setProperty('--factory-fallback-image','url("'+svgFallback(styleOf(),window.state?.data?.title||'San Patricio del Chañar')+'")');
  }
  function hook(){
    const preview=$('#canvasPreview');
    if(!preview)return setTimeout(hook,250);
    const obs=new MutationObserver(()=>setTimeout(()=>ensurePreview(preview),20));obs.observe(preview,{childList:true,subtree:true,attributes:true,attributeFilter:['src','class']});
    document.addEventListener('fabrica:ready',()=>setTimeout(()=>ensurePreview(preview),50));
    document.addEventListener('fabrica:masters-ready',()=>setTimeout(()=>ensurePreview(preview),80));
    document.addEventListener('fabrica:working',()=>preview.classList.remove('factory-preview-fallback'));
    setTimeout(()=>ensurePreview(preview),300);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',hook);else hook();
  window.FabricaImageResilience={version:1,repairImages,ensurePreview};
})();
