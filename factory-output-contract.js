/* FÁBRICA CHAÑAR — SALIDA FÍSICA CERRADA v1
   La salida se adapta al formato físico real de cada familia.
   No modifica el runtime de producción: gobierna únicamente PNG/JPG/PDF/impresión.
*/
(function(){
  const SPECS={
    postal:{key:'10x15',name:'Postal',widthMm:100,heightMm:150,dpi:300},
    ficha:{key:'12x18',name:'Ficha cultural',widthMm:120,heightMm:180,dpi:300},
    guide:{key:'15x21',name:'Guía breve',widthMm:150,heightMm:210,dpi:300},
    infographic:{key:'21x29.7',name:'Infografía',widthMm:210,heightMm:297,dpi:300}
  };
  const PX=(mm,dpi)=>Math.round(mm/25.4*dpi);
  function type(){
    return (window.state?.type)||window.FabricaCentral?.products?.[window.FabricaCentral?.active]?.id||document.body.dataset.product||'postal';
  }
  function spec(){
    const id=window.state?.centralProduct||window.state?.type||'postal';
    return SPECS[id]||SPECS.postal;
  }
  function target(){
    return document.querySelector('#canvasPreview .master-product-preview')||document.querySelector('#canvasPreview > *')||document.querySelector('.master-product-preview');
  }
  function setStatus(text){
    const el=document.querySelector('#status')||document.querySelector('#centralStatus');
    if(el)el.textContent=text;
  }
  function installPrintStyle(s){
    let style=document.getElementById('factoryOutputPrintStyle');
    if(!style){style=document.createElement('style');style.id='factoryOutputPrintStyle';document.head.appendChild(style)}
    style.textContent=`@page{size:${s.widthMm}mm ${s.heightMm}mm;margin:0}html,body{margin:0!important;padding:0!important;background:#fff!important}@media print{body>*{display:none!important}.factory-print-stage{display:block!important;position:fixed!important;left:0!important;top:0!important;width:${s.widthMm}mm!important;height:${s.heightMm}mm!important;margin:0!important;padding:0!important;background:#fff!important;overflow:hidden!important}.factory-print-stage>*{width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;margin:0!important;box-shadow:none!important;border:0!important}}`;
  }
  function printPdf(){
    const el=target(),s=spec();
    if(!el){setStatus('No hay una pieza válida para exportar.');return}
    installPrintStyle(s);
    const stage=document.createElement('div');
    stage.className='factory-print-stage';
    stage.style.display='none';
    const clone=el.cloneNode(true);
    clone.removeAttribute('id');
    stage.appendChild(clone);
    document.body.appendChild(stage);
    document.body.classList.add('factory-output-printing');
    setStatus(`PDF preparado en ${s.widthMm} × ${s.heightMm} mm. En la ventana de impresión elegí escala 100 % / tamaño real.`);
    const cleanup=()=>{stage.remove();document.body.classList.remove('factory-output-printing');window.removeEventListener('afterprint',cleanup)};
    window.addEventListener('afterprint',cleanup);
    setTimeout(()=>window.print(),80);
  }
  async function raster(kind){
    const el=target(),s=spec();
    if(!el||typeof window.html2canvas!=='function'){setStatus('No se pudo preparar la imagen.');return}
    const width=PX(s.widthMm,s.dpi),height=PX(s.heightMm,s.dpi);
    const clone=el.cloneNode(true);
    clone.removeAttribute('id');
    clone.style.width=width+'px';clone.style.height=height+'px';clone.style.maxWidth='none';clone.style.maxHeight='none';clone.style.aspectRatio='auto';clone.style.position='fixed';clone.style.left='-100000px';clone.style.top='0';clone.style.margin='0';clone.style.boxSizing='border-box';
    document.body.appendChild(clone);
    try{
      const canvas=await window.html2canvas(clone,{width,height,scale:1,useCORS:true,allowTaint:false,backgroundColor:'#ffffff',logging:false,imageTimeout:15000});
      const mime=kind==='jpg'?'image/jpeg':'image/png';
      const quality=kind==='jpg'?0.94:1;
      const a=document.createElement('a');
      a.download=`fabrica-chanar-${s.key}-${Date.now()}.${kind==='jpg'?'jpg':'png'}`;
      a.href=canvas.toDataURL(mime,quality);a.click();
      setStatus(`${kind.toUpperCase()} generado en proporción ${s.widthMm} × ${s.heightMm} mm (${width} × ${height} px a ${s.dpi} dpi).`);
    }catch(err){console.error(err);setStatus('No se pudo exportar la imagen sin alterar el formato físico.');}
    finally{clone.remove()}
  }
  function bind(){
    const png=document.querySelector('#btnPng'),jpg=document.querySelector('#btnJpg'),pdf=document.querySelector('#btnPrint');
    if(png&&!png.dataset.factoryOutputBound){png.dataset.factoryOutputBound='1';png.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();raster('png')},true)}
    if(jpg&&!jpg.dataset.factoryOutputBound){jpg.dataset.factoryOutputBound='1';jpg.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();raster('jpg')},true)}
    if(pdf&&!pdf.dataset.factoryOutputBound){pdf.dataset.factoryOutputBound='1';pdf.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();printPdf()},true)}
  }
  function boot(){bind();setTimeout(bind,600);setTimeout(bind,1800);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaOutputContract={version:1,specs:SPECS,spec,getTarget:target,printPdf,raster};
})();
