/* FÁBRICA CHAÑAR — CURADURÍA VISUAL
   No agrega controles. Eleva automáticamente cada pieza terminada.
*/
(function(){
  const LABELS={
    postal:{label:'HECHO EN CHAÑAR',note:'Una pieza nacida de este territorio'},
    ficha:{label:'FICHA CHAÑARENSE',note:'Territorio · memoria · identidad'},
    guide:{label:'PARA RECORRER',note:'Una guía breve del territorio'},
    infographic:{label:'MIRADA LOCAL',note:'Información convertida en imagen'}
  };
  const STYLE_RIBBON={
    patagonia:'CHAÑAR · TERRITORIO',vino:'CHAÑAR · VINO Y PAISAJE',cava:'CHAÑAR · OFICIO Y DETALLE',vendimia:'CHAÑAR · TIEMPO DE COSECHA',fiesta:'CHAÑAR · FIESTA Y RAÍCES',arte:'CHAÑAR · CULTURA LOCAL'
  };
  function decorate(){
    const box=document.querySelector('#canvasPreview');
    if(!box||typeof state==='undefined')return;
    const meta=state.factoryMeta||{};
    const product=meta.product||state.type||'postal';
    const style=(meta.style&&meta.style.mood)?null:(state.templateId&&typeof TEMPLATES!=='undefined'?TEMPLATES.find(t=>t.id===state.templateId)?.style:null);
    const styleKey=style||'patagonia';
    const label=meta.seal||LABELS[product]?.label||'HECHO EN CHAÑAR';
    const note=meta.sealNote||LABELS[product]?.note||'Una pieza nacida de este territorio';
    box.classList.add('factory-curated','product-'+product,'style-'+styleKey);
    box.querySelector('.factory-curation-seal')?.remove();
    box.querySelector('.factory-curation-ribbon')?.remove();
    const ribbon=document.createElement('div');
    ribbon.className='factory-curation-ribbon';
    ribbon.textContent=STYLE_RIBBON[styleKey]||'CHAÑAR · CURADURÍA LOCAL';
    const seal=document.createElement('div');
    seal.className='factory-curation-seal';
    seal.innerHTML='<span class="seal-dot">✦</span><span>'+label+'<small>'+note+'</small></span>';
    box.appendChild(ribbon);box.appendChild(seal);
  }
  function boot(){
    document.addEventListener('fabrica:ready',()=>setTimeout(decorate,20));
    document.addEventListener('fabrica:working',()=>setTimeout(decorate,20));
    ['btnGenerate','btnSave','btnPng','btnJpg','btnPrint'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>setTimeout(decorate,80)));
    setInterval(decorate,900);
    setTimeout(decorate,250);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
