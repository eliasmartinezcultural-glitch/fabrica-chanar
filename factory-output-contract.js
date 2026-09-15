/* FÁBRICA CHAÑAR — SALIDA FÍSICA CERRADA v2
   La salida se adapta al formato físico real de cada familia.
   El formato no se toma del tamaño de pantalla ni del papel por defecto del navegador.
*/
(function(){
  const SPECS={
    postal:{key:'10x15',name:'Postal',widthMm:100,heightMm:150,dpi:300},
    ficha:{key:'12x18',name:'Ficha cultural',widthMm:120,heightMm:180,dpi:300},
    guide:{key:'15x21',name:'Guía breve',widthMm:150,heightMm:210,dpi:300},
    infographic:{key:'21x29.7',name:'Infografía',widthMm:210,heightMm:297,dpi:300}
  };
  const PX=(mm,dpi)=>Math.round(mm/25.4*dpi);
  function currentType(){
    if(typeof state!=='undefined'&&state?.centralProduct&&SPECS[state.centralProduct])return state.centralProduct;
    if(typeof state!=='undefined'&&state?.type&&SPECS[state.type])return state.type;
    const preview=document.querySelector('#canvasPreview .master-product-preview');
    if(preview){const hit=[...preview.classList].find(c=>c.indexOf('master-product-')===0);if(hit)return hit.replace('master-product-','')}
    return 'postal';
  }
  function spec(){return SPECS[currentType()]||SPECS.postal}
  function target(){return document.querySelector('#canvasPreview .master-product-preview')||document.querySelector('#canvasPreview > *')||document.querySelector('.master-product-preview')}
  function setStatus(text){const el=document.querySelector('#status')||document.querySelector('#centralStatus');if(el)el.textContent=text}
  function installPrintStyle(s){
    let style=document.getElementById('factoryOutputPrintStyle');
    if(!style){style=document.createElement('style');style.id='factoryOutputPrintStyle';document.head.appendChild(style)}
    style.textContent=`@page{size:${s.widthMm}mm ${s.heightMm}mm;margin:0!important}html,body{margin:0!important;padding:0!important}@media print{body>*{display:none!important}.factory-print-stage{display:block!important;position:fixed!important;left:0!important;top:0!important;width:${s.widthMm}mm!important;height:${s.heightMm}mm!important;margin:0!important;padding:0!important;background:#fff!important;overflow:hidden!important}.factory-print-stage>*{width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;margin:0!important;box-shadow:none!important;border:0!important}}`;
  }
  function printPdf(){
    const el=target(),s=spec();
    if(!el){setStatus('No hay una pieza válida para exportar.');return}
    installPrintStyle(s);
    const stage=document.createElement('div');stage.className='factory-print-stage';stage.style.display='none';
    const clone=el.cloneNode(true);clone.removeAttribute('id');stage.appendChild(clone);document.body.appendChild(stage);
    setStatus(`PDF preparado: ${s.name} · ${s.widthMm} × ${s.heightMm} mm. Imprimir a escala 100 % / tamaño real.`);
    const cleanup=()=>{stage.remove();window.removeEventListener('afterprint',cleanup)};window.addEventListener('afterprint',cleanup);
    setTimeout(()=>window.print(),80);
  }
  async function raster(kind){
    const el=target(),s=spec();
    if(!el||typeof window.html2canvas!=='function'){setStatus('No se pudo preparar la imagen.');return}
    const width=PX(s.widthMm,s.dpi),height=PX(s.heightMm,s.dpi);
    const clone=el.cloneNode(true);clone.removeAttribute('id');
    Object.assign(clone.style,{width:width+'px',height:height+'px',maxWidth:'none',maxHeight:'none',aspectRatio:'auto',position:'fixed',left:'-100000px',top:'0',margin:'0',boxSizing:'border-box'});
    document.body.appendChild(clone);
    try{
      const canvas=await window.html2canvas(clone,{width,height,scale:1,useCORS:true,allowTaint:false,backgroundColor:'#ffffff',logging:false,imageTimeout:15000});
      const mime=kind==='jpg'?'image/jpeg':'image/png',quality=kind==='jpg'?0.94:1;
      const a=document.createElement('a');a.download=`fabrica-chanar-${s.key}-${Date.now()}.${kind==='jpg'?'jpg':'png'}`;a.href=canvas.toDataURL(mime,quality);a.click();
      setStatus(`${kind.toUpperCase()} generado en ${s.name}: ${s.widthMm} × ${s.heightMm} mm · ${width} × ${height} px a ${s.dpi} dpi.`);
    }catch(err){console.error(err);setStatus('No se pudo exportar la pieza sin alterar su formato.')}finally{clone.remove()}
  }
  function bind(){
    const png=document.querySelector('#btnPng'),jpg=document.querySelector('#btnJpg'),pdf=document.querySelector('#btnPrint');
    if(png&&!png.dataset.factoryOutputBound){png.dataset.factoryOutputBound='1';png.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();raster('png')},true)}
    if(jpg&&!jpg.dataset.factoryOutputBound){jpg.dataset.factoryOutputBound='1';jpg.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();raster('jpg')},true)}
    if(pdf&&!pdf.dataset.factoryOutputBound){pdf.dataset.factoryOutputBound='1';pdf.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();printPdf()},true)}
  }
  function boot(){bind();setTimeout(bind,600);setTimeout(bind,1800)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaOutputContract={version:2,specs:SPECS,spec,currentType,getTarget:target,printPdf,raster};
})();
