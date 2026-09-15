/* FÁBRICA CHAÑAR — INFRAESTRUCTURA FÍSICA DE GENERACIÓN v1
   Una única geometría para PREVIEW + generación.
   Escala de referencia: 1 CSS px = 1 px a 96 dpi para el tamaño físico relativo.
   21 cm (infografía) = 794 px de ancho de referencia.
*/
(function(){
  const SPECS={
    postal:{name:'Postal',key:'10x15',widthMm:100,heightMm:150,widthPx:378,heightPx:567},
    ficha:{name:'Ficha cultural',key:'12x18',widthMm:120,heightMm:180,widthPx:454,heightPx:680},
    guide:{name:'Guía breve',key:'15x21',widthMm:150,heightMm:210,widthPx:567,heightPx:794},
    infographic:{name:'Infografía',key:'21x29.7',widthMm:210,heightMm:297,widthPx:794,heightPx:1123}
  };
  const TYPES=Object.keys(SPECS);
  const $=s=>document.querySelector(s);
  function type(){
    const s=typeof state!=='undefined'?state:{};
    const t=s.centralProduct||s.type;
    if(TYPES.includes(t))return t;
    const el=$('#canvasPreview [data-product-template]');
    const d=el?.dataset.productTemplate;
    return TYPES.includes(d)?d:'postal';
  }
  function target(){
    const box=$('#canvasPreview');
    if(!box)return null;
    return box.querySelector('.master-product-preview,.piece,[data-product-template]')||box.firstElementChild;
  }
  function apply(){
    const el=target(); if(!el)return false;
    const p=type(),s=SPECS[p];
    el.classList.remove(...TYPES.map(x=>'physical-'+x));
    el.classList.add('physical-'+p);
    el.dataset.physicalFormat=s.key;
    el.dataset.physicalProduct=p;
    el.dataset.physicalWidthMm=String(s.widthMm);
    el.dataset.physicalHeightMm=String(s.heightMm);
    el.style.setProperty('--factory-physical-width',s.widthPx+'px');
    el.style.setProperty('--factory-physical-height',s.heightPx+'px');
    el.style.setProperty('--factory-physical-width-mm',s.widthMm+'mm');
    el.style.setProperty('--factory-physical-height-mm',s.heightMm+'mm');
    el.style.setProperty('--factory-physical-ratio',String(s.widthMm/s.heightMm));
    if(typeof state!=='undefined')state.factoryMeta={...(state.factoryMeta||{}),physicalRender:{version:1,product:p,format:s.key,widthMm:s.widthMm,heightMm:s.heightMm,previewWidthPx:s.widthPx,previewHeightPx:s.heightPx}};
    return true;
  }
  function boot(){
    const box=$('#canvasPreview');
    if(!box)return setTimeout(boot,250);
    const refresh=()=>{setTimeout(apply,0)};
    ['fabrica:working','fabrica:ready','fabrica:masters-ready','fabrica:series-ready'].forEach(ev=>document.addEventListener(ev,refresh));
    document.getElementById('centralProduce')?.addEventListener('click',()=>setTimeout(apply,300));
    document.getElementById('btnGenerate')?.addEventListener('click',()=>setTimeout(apply,300));
    new MutationObserver(refresh).observe(box,{childList:true,subtree:true});
    apply();
    setTimeout(apply,200);setTimeout(apply,800);setTimeout(apply,1600);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaPhysicalRenderer={version:1,specs:SPECS,type,target,apply};
})();
