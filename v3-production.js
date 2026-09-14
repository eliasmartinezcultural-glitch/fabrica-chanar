/* FÁBRICA CHAÑAR — V3 PRODUCTION ENGINE
   This module is intentionally isolated from the legacy inline runtime.
   It defines the production contract used by the next consolidated UI layer.
*/
(() => {
  'use strict';

  const V3_FORMATS = Object.freeze({
    vertical:   { key:'vertical', label:'Digital vertical', width:1080, height:1350, cssClass:'vertical', mime:'image/png' },
    square:     { key:'square', label:'Cuadrada',         width:1200, height:1200, cssClass:'square',   mime:'image/png' },
    horizontal: { key:'horizontal', label:'Horizontal',    width:1600, height:1000, cssClass:'horizontal', mime:'image/png' },
    print:      { key:'print', label:'A5',                width:148,  height:210,  cssClass:'print',    mime:'application/pdf' }
  });

  const PHOTO_LICENSE = Object.freeze({
    OWN: 'own', LICENSED: 'licensed', CLIENT: 'client', REFERENCE: 'reference', UNKNOWN: 'unknown'
  });

  const STORAGE_KEY = 'fabrica-chanar-v3';
  const MAX_LIBRARY = 30;

  function clone(value){ return JSON.parse(JSON.stringify(value)); }
  function uid(prefix='piece'){ return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`; }
  function escapeHtml(value=''){ const d=document.createElement('div'); d.textContent=String(value); return d.innerHTML; }

  function normalizePhoto(photo, index){
    const p = Array.isArray(photo) ? photo : [];
    return {
      id: p[0] || `photo-${index+1}`,
      title: p[1] || `Fotografía ${index+1}`,
      category: p[2] || 'territorio',
      url: p[3] || '',
      license: p[4] || (index < 10 ? PHOTO_LICENSE.REFERENCE : PHOTO_LICENSE.UNKNOWN),
      source: p[5] || 'pendiente de verificación',
      focal: p[6] || '50% 50%',
      scale: Number(p[7] || 1),
      note: p[8] || ''
    };
  }

  function readLibrary(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
  }

  function writeLibrary(items){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_LIBRARY)));
  }

  function getPhotoRegistry(){
    if (Array.isArray(window.PHOTOS)) return window.PHOTOS.map(normalizePhoto);
    return [];
  }

  function getCurrentFormat(){
    const select = document.getElementById('format');
    return V3_FORMATS[select?.value] || V3_FORMATS.vertical;
  }

  function getState(){
    const photoId = window.selectedPhotoId || window.state?.photoId || '';
    const photo = getPhotoRegistry().find(p => p.id === photoId) || getPhotoRegistry()[0] || null;
    const f = getCurrentFormat();
    return {
      id: window.currentPieceId || uid(),
      product: window.state?.product || window.currentProduct || 'postal',
      title: document.getElementById('title')?.value || '',
      subtitle: document.getElementById('subtitle')?.value || '',
      body: document.getElementById('body')?.value || '',
      category: document.getElementById('category')?.value || '',
      format: f.key,
      photoId: photo?.id || '',
      photo: photo ? clone(photo) : null,
      updatedAt: new Date().toISOString(),
      engine: 'v3'
    };
  }

  function validateState(state){
    const errors=[];
    if(!state.title.trim()) errors.push('Falta título.');
    if(!state.body.trim()) errors.push('Falta texto.');
    if(!state.photo) errors.push('Falta fotografía.');
    if(state.photo && ![PHOTO_LICENSE.OWN,PHOTO_LICENSE.LICENSED,PHOTO_LICENSE.CLIENT].includes(state.photo.license))
      errors.push('La fotografía seleccionada no está marcada como propia/licenciada/cliente.');
    return errors;
  }

  function saveCurrent(){
    const state=getState();
    const errors=validateState(state);
    if(errors.length){
      document.getElementById('status').textContent = `No guardada: ${errors.join(' ')}`;
      return false;
    }
    const items=readLibrary().filter(x=>x.id!==state.id);
    items.unshift(state);
    writeLibrary(items);
    window.currentPieceId=state.id;
    if(typeof window.renderLibrary==='function') window.renderLibrary();
    if(typeof window.renderSales==='function') window.renderSales();
    const status=document.getElementById('status');
    if(status) status.textContent='Pieza guardada en Biblioteca V3.';
    return true;
  }

  function loadPiece(id){
    const state=readLibrary().find(x=>x.id===id);
    if(!state) return false;
    window.currentPieceId=state.id;
    if(document.getElementById('title')) document.getElementById('title').value=state.title||'';
    if(document.getElementById('subtitle')) document.getElementById('subtitle').value=state.subtitle||'';
    if(document.getElementById('body')) document.getElementById('body').value=state.body||'';
    if(document.getElementById('category')) document.getElementById('category').value=state.category||'';
    if(document.getElementById('format')) document.getElementById('format').value=state.format||'vertical';
    window.selectedPhotoId=state.photoId;
    if(typeof window.renderPreview==='function') window.renderPreview();
    if(typeof window.renderPhotos==='function') window.renderPhotos();
    const status=document.getElementById('status');
    if(status) status.textContent='Pieza recuperada.';
    return true;
  }

  function removePiece(id){
    writeLibrary(readLibrary().filter(x=>x.id!==id));
    if(typeof window.renderLibrary==='function') window.renderLibrary();
    if(typeof window.renderSales==='function') window.renderSales();
  }

  function applyFormatContract(){
    const f=getCurrentFormat();
    const piece=document.getElementById('piece');
    if(piece){ piece.classList.remove('vertical','square','horizontal','print'); piece.classList.add(f.cssClass); piece.dataset.exportWidth=f.width; piece.dataset.exportHeight=f.height; }
    const label=document.getElementById('formatLabel');
    if(label) label.textContent = f.key==='print' ? 'A5 · 148×210 mm · salida de impresión' : `${f.label} · ${f.width}×${f.height}px · salida exacta`;
  }

  async function waitForImages(root){
    const images=[...root.querySelectorAll('img')];
    await Promise.all(images.map(img=>img.complete ? Promise.resolve() : new Promise(resolve=>{img.addEventListener('load',resolve,{once:true});img.addEventListener('error',resolve,{once:true});}))));
  }

  async function exportRaster(kind){
    const f=getCurrentFormat();
    if(f.key==='print') return exportPrint();
    if(typeof window.html2canvas!=='function') throw new Error('Motor de exportación no disponible.');
    const piece=document.getElementById('piece');
    if(!piece) throw new Error('Vista de pieza no encontrada.');
    const old={width:piece.style.width,height:piece.style.height,aspectRatio:piece.style.aspectRatio};
    piece.style.width=`${f.width}px`;
    piece.style.height=`${f.height}px`;
    piece.style.aspectRatio='auto';
    await waitForImages(piece);
    const canvas=await window.html2canvas(piece,{scale:1,useCORS:true,allowTaint:false,backgroundColor:'#ffffff',width:f.width,height:f.height,windowWidth:f.width,windowHeight:f.height,logging:false});
    piece.style.width=old.width; piece.style.height=old.height; piece.style.aspectRatio=old.aspectRatio;
    const mime=kind==='jpg'?'image/jpeg':'image/png';
    const ext=kind==='jpg'?'jpg':'png';
    const a=document.createElement('a');
    a.download=`fabrica-chanar-${f.width}x${f.height}.${ext}`;
    a.href=canvas.toDataURL(mime,kind==='jpg'?0.94:1);
    a.click();
  }

  function exportPrint(){
    const piece=document.getElementById('piece');
    if(!piece) return;
    const clonePiece=piece.cloneNode(true);
    const w=window.open('','_blank','noopener,noreferrer');
    if(!w) throw new Error('El navegador bloqueó la ventana de impresión.');
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Fábrica Chañar · A5</title><style>@page{size:A5 portrait;margin:0}html,body{margin:0;padding:0;background:#fff}body{width:148mm;height:210mm}.piece{width:148mm!important;height:210mm!important;box-shadow:none!important}@media print{body{overflow:hidden}}</style></head><body></body></html>`);
    w.document.body.appendChild(clonePiece);
    w.document.close();
    setTimeout(()=>{w.focus();w.print();},250);
  }

  function wireV3(){
    if(window.__FABRICA_V3_WIRED) return;
    window.__FABRICA_V3_WIRED=true;
    window.FABRICA_V3={VERSION:'3.0.0',FORMATS:V3_FORMATS,PHOTO_LICENSE,STORAGE_KEY,MAX_LIBRARY,saveCurrent,loadPiece,removePiece,validateState,getState,exportRaster,exportPrint};

    const format=document.getElementById('format');
    if(format) format.addEventListener('change',()=>{applyFormatContract(); if(typeof window.renderPreview==='function') window.renderPreview();});
    const save=document.getElementById('save'); if(save) save.onclick=saveCurrent;
    const png=document.getElementById('png'); if(png) png.onclick=()=>exportRaster('png').catch(e=>alert(e.message));
    const jpg=document.getElementById('jpg'); if(jpg) jpg.onclick=()=>exportRaster('jpg').catch(e=>alert(e.message));
    const pdf=document.getElementById('pdf'); if(pdf) pdf.onclick=()=>exportPrint();
    applyFormatContract();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',wireV3,{once:true}); else wireV3();
})();
