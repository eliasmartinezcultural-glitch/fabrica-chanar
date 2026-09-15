/* FÁBRICA CHAÑAR — CONTRATO FÍSICO ÚNICO v7
   ÚNICA FUENTE DE DIMENSIONES.
   PRODUCTO → CONTRATO → PREVIEW → PNG/JPG/PDF.
   Este módulo NO renderiza ni reemplaza piezas. Solo aplica geometría y exportación.
   v7: eliminado el observador del preview; evita que infraestructura de geometría
   compita con el renderer/editorial runtime.
*/
(function(){
  const SPECS={
    postal:{key:'10x15',name:'Postal',widthMm:100,heightMm:150,dpi:300,previewWidthPx:380},
    ficha:{key:'12x18',name:'Ficha cultural',widthMm:120,heightMm:180,dpi:300,previewWidthPx:455},
    guide:{key:'15x21',name:'Guía breve',widthMm:150,heightMm:210,dpi:300,previewWidthPx:567},
    infographic:{key:'21x29.7',name:'Infografía',widthMm:210,heightMm:297,dpi:300,previewWidthPx:794}
  };
  const PX=(mm,dpi)=>Math.round(mm/25.4*dpi);
  const specForType=type=>SPECS[type]||SPECS.postal;
  function currentType(){
    if(typeof state!=='undefined'&&state?.centralProduct&&SPECS[state.centralProduct])return state.centralProduct;
    if(typeof state!=='undefined'&&state?.type&&SPECS[state.type])return state.type;
    const preview=document.querySelector('#canvasPreview .master-product-preview');
    if(preview){const hit=[...preview.classList].find(c=>/^master-product-(postal|ficha|guide|infographic)$/.test(c));if(hit)return hit.replace('master-product-','')}
    return 'postal';
  }
  function spec(){return specForType(currentType())}
  function target(){return document.querySelector('#canvasPreview .master-product-preview')||document.querySelector('#canvasPreview .piece')||document.querySelector('#canvasPreview [data-product-template]')||document.querySelector('#canvasPreview > *')}
  function applyPreviewGeometry(){
    const el=target();if(!el)return false;
    const s=spec(),previewHeight=Math.round(s.previewWidthPx*(s.heightMm/s.widthMm));
    el.dataset.physicalFormat=s.key;el.dataset.physicalProduct=currentType();el.dataset.physicalWidthMm=String(s.widthMm);el.dataset.physicalHeightMm=String(s.heightMm);el.dataset.physicalDpi=String(s.dpi);el.dataset.physicalPreviewWidthPx=String(s.previewWidthPx);el.dataset.physicalPreviewHeightPx=String(previewHeight);
    el.style.setProperty('--factory-physical-width',s.previewWidthPx+'px');el.style.setProperty('--factory-physical-height',previewHeight+'px');el.style.setProperty('--factory-physical-width-mm',s.widthMm+'mm');el.style.setProperty('--factory-physical-height-mm',s.heightMm+'mm');el.style.setProperty('--factory-physical-ratio',String(s.widthMm/s.heightMm));
    return true;
  }
  function setStatus(text){const el=document.querySelector('#status')||document.querySelector('#centralStatus');if(el)el.textContent=text}
  function installPrintStyle(s){let style=document.getElementById('factoryOutputPrintStyle');if(!style){style=document.createElement('style');style.id='factoryOutputPrintStyle';document.head.appendChild(style)}style.textContent=`@page{size:${s.widthMm}mm ${s.heightMm}mm;margin:0!important}html,body{margin:0!important;padding:0!important}@media print{body>*{display:none!important}.factory-print-stage{display:block!important;position:fixed!important;left:0!important;top:0!important;width:${s.widthMm}mm!important;height:${s.heightMm}mm!important;margin:0!important;padding:0!important;background:#fff!important;overflow:hidden!important}.factory-print-stage>*{width:${s.widthMm}mm!important;height:${s.heightMm}mm!important;max-width:none!important;max-height:none!important;margin:0!important;box-shadow:none!important;border:0!important;transform:none!important}}`}
  function printPdf(){const el=target(),s=spec();if(!el){setStatus('No hay una pieza válida para exportar.');return}applyPreviewGeometry();installPrintStyle(s);const stage=document.createElement('div');stage.className='factory-print-stage';stage.style.display='none';const clone=el.cloneNode(true);clone.removeAttribute('id');clone.style.width=s.widthMm+'mm';clone.style.height=s.heightMm+'mm';clone.style.maxWidth='none';clone.style.maxHeight='none';clone.style.aspectRatio='auto';stage.appendChild(clone);document.body.appendChild(stage);setStatus(`PDF preparado: ${s.name} · ${s.widthMm} × ${s.heightMm} mm. Elegí tamaño real / escala 100 %.`);const cleanup=()=>{stage.remove();window.removeEventListener('afterprint',cleanup)};window.addEventListener('afterprint',cleanup);setTimeout(()=>window.print(),80)}
  async function raster(kind){const el=target(),s=spec();if(!el||typeof window.html2canvas!=='function'){setStatus('No se pudo preparar la imagen.');return}applyPreviewGeometry();const width=PX(s.widthMm,s.dpi),height=PX(s.heightMm,s.dpi);const clone=el.cloneNode(true);clone.removeAttribute('id');Object.assign(clone.style,{width:width+'px',height:height+'px',maxWidth:'none',maxHeight:'none',aspectRatio:'auto',position:'fixed',left:'-100000px',top:'0',margin:'0',boxSizing:'border-box'});document.body.appendChild(clone);try{const canvas=await window.html2canvas(clone,{width,height,scale:1,useCORS:true,allowTaint:false,backgroundColor:'#ffffff',logging:false,imageTimeout:15000});const mime=kind==='jpg'?'image/jpeg':'image/png',quality=kind==='jpg'?0.94:1;const a=document.createElement('a');a.download=`fabrica-chanar-${s.key}-${Date.now()}.${kind==='jpg'?'jpg':'png'}`;a.href=canvas.toDataURL(mime,quality);a.click();setStatus(`${kind.toUpperCase()} generado: ${s.name} · ${s.widthMm} × ${s.heightMm} mm · ${width} × ${height} px a ${s.dpi} dpi.`)}catch(err){console.error(err);setStatus('No se pudo exportar la pieza sin alterar su formato.')}finally{clone.remove()}}
  function bind(){const png=document.querySelector('#btnPng'),jpg=document.querySelector('#btnJpg'),pdf=document.querySelector('#btnPrint');if(png&&!png.dataset.factoryOutputBound){png.dataset.factoryOutputBound='1';png.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();raster('png')},true)}if(jpg&&!jpg.dataset.factoryOutputBound){jpg.dataset.factoryOutputBound='1';jpg.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();raster('jpg')},true)}if(pdf&&!pdf.dataset.factoryOutputBound){pdf.dataset.factoryOutputBound='1';pdf.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();printPdf()},true)}}
  function boot(){bind();const settle=()=>applyPreviewGeometry();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',settle);else settle();[250,700,1600,2600].forEach(ms=>setTimeout(()=>{bind();applyPreviewGeometry()},ms));document.addEventListener('fabrica:ready',()=>setTimeout(applyPreviewGeometry,80));document.addEventListener('fabrica:working',()=>setTimeout(applyPreviewGeometry,120));}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaOutputContract={version:7,specs:SPECS,spec,specForType,currentType,applyPreviewGeometry,getTarget:target,printPdf,raster,px:PX};
})();