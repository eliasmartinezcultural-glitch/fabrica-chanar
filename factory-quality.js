/* FÁBRICA CHAÑAR — SISTEMA DE CALIDAD EDITORIAL v1
   Capa quirúrgica sobre V2.
   No crea otra fábrica: fija medidas, jerarquía, tipografía, fotografía,
   sellos, reversos, procedencia y criterios de salida.
*/
(function(){
  const DPI=300;
  const mmPx=mm=>Math.round((mm/25.4)*DPI);
  const OUTPUTS={
    '10x15':{label:'10 × 15 cm',mm:[100,150],px:[mmPx(100),mmPx(150)],bleed:3,trimSafe:5},
    a5:{label:'A5 · 148 × 210 mm',mm:[148,210],px:[1748,2480],bleed:3,trimSafe:5},
    vertical:{label:'1080 × 1350 px · 4:5',mm:null,px:[1080,1350],bleed:0,trimSafe:0},
    square:{label:'1200 × 1200 px · 1:1',mm:null,px:[1200,1200],bleed:0,trimSafe:0},
    horizontal:{label:'1600 × 1000 px · 8:5',mm:null,px:[1600,1000],bleed:0,trimSafe:0}
  };
  const QUALITY={
    postal:{output:'10x15',paper:'natural',imageWeight:60,titleWeight:25,infoWeight:15,titleSize:'22–34 pt',bodySize:'9.5–11 pt',seal:'36 × 12 mm',safeMargin:'5 mm',photoRole:'protagonista',reverse:['mini historia','dato','procedencia','crédito']},
    ficha:{output:'10x15',paper:'archive',imageWeight:42,titleWeight:23,infoWeight:35,titleSize:'18–28 pt',bodySize:'9–10.5 pt',seal:'32 × 11 mm',safeMargin:'5 mm',photoRole:'documental',reverse:['contexto','categoría','lugar','fuente','procedencia','crédito']},
    guide:{output:'10x15',paper:'natural',imageWeight:48,titleWeight:22,infoWeight:30,titleSize:'18–27 pt',bodySize:'9–10 pt',seal:'34 × 11 mm',safeMargin:'5 mm',photoRole:'apertura/recorrido',reverse:['fuentes','fecha de consulta','advertencia de actualidad','procedencia']},
    infographic:{output:'a5',paper:'grain',imageWeight:45,titleWeight:30,infoWeight:25,titleSize:'24–38 pt',bodySize:'10–12 pt',seal:'32 × 11 mm',safeMargin:'5 mm',photoRole:'apoyo visual',reverse:['metodología','fuente','fecha de consulta']}
  };
  const TYPE={display:'Georgia, "Times New Roman", serif',sans:'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',mono:'ui-monospace, SFMono-Regular, Consolas, monospace'};
  const PHOTO_RULES={minSourcePx:{'10x15':[1181,1772],a5:[1748,2480],vertical:[1080,1350],square:[1200,1200],horizontal:[1600,1000]},avoid:['pixelación visible','horizonte torcido sin intención','rostros cortados','texto ilegible en señalética','marcas de agua','recorte que deforme personas u objetos'],treatment:'contraste moderado · saturación contenida · negros no empastados · temperatura coherente con la colección',crop:'cover con foco editorial; nunca estirar'};
  const SOURCING={own:{commercial:true,label:'Foto propia'},usable:{commercial:true,label:'Reutilización autorizada/licenciada'},licensed:{commercial:true,label:'Licenciada'},authorized:{commercial:true,label:'Autorizada'},reference:{commercial:false,label:'Referencia editorial'},unknown:{commercial:false,label:'Procedencia pendiente'}};
  const $=s=>document.querySelector(s);
  function product(){return typeof state!=='undefined'?(state.type||'postal'):'postal'}
  function format(){return typeof state!=='undefined'?(state.factoryMeta?.format||QUALITY[product()]?.output||'10x15'):'10x15'}
  function spec(){return QUALITY[product()]||QUALITY.postal}
  function output(){return OUTPUTS[format()]||OUTPUTS['10x15']}
  function currentPhoto(){if(typeof state==='undefined')return null;if(state.image)return{kind:'own',rights:'own',source:'Foto cargada por el usuario'};const bank=typeof PHOTO_BANK!=='undefined'?PHOTO_BANK:[];return bank.find(p=>p.id===state.photoId)||null}
  function photoAudit(){const p=currentPhoto(),need=PHOTO_RULES.minSourcePx[format()]||PHOTO_RULES.minSourcePx['10x15'];const kind=p?.kind||p?.rights||'unknown',rights=SOURCING[kind]||SOURCING.unknown;return{present:!!p,kind,commercial:!!rights.commercial,source:p?.source||p?.credit||p?.url||null,minPixels:need,rule:PHOTO_RULES}}
  function applyTokens(){const box=$('#canvasPreview');if(!box)return;const q=spec(),o=output();box.classList.add('factory-quality-v1','quality-'+product(),'quality-format-'+format());box.style.setProperty('--fq-display',TYPE.display);box.style.setProperty('--fq-sans',TYPE.sans);box.style.setProperty('--fq-mono',TYPE.mono);box.style.setProperty('--fq-safe',q.safeMargin);box.style.setProperty('--fq-image',q.imageWeight+'%');box.style.setProperty('--fq-title',q.titleWeight+'%');box.style.setProperty('--fq-info',q.infoWeight+'%');box.style.setProperty('--fq-seal',q.seal);box.style.setProperty('--fq-width',o.px[0]+'px');box.style.setProperty('--fq-height',o.px[1]+'px');box.dataset.qualityVersion='1';box.dataset.physicalSize=o.label}
  function audit(){const q=spec(),o=output(),p=photoAudit(),meta=typeof state!=='undefined'?(state.factoryMeta||{}):{};return{version:1,product:product(),format:format(),output:o,quality:q,typography:TYPE,photo:p,sources:{photo:p.source||'pendiente',text:meta.source||'pendiente',provenance:meta.provenance||'pendiente'},checks:{format:!!o,title:true,photo:p.present,source:true,rights:p.commercial||p.kind==='reference'},commercialReady:!!meta.commercialRights||p.commercial}}
  function stampMeta(){if(typeof state==='undefined')return;const a=audit();state.factoryMeta={...(state.factoryMeta||{}),quality:{version:1,product:a.product,format:a.format,physicalSize:a.output.label,px:a.output.px,dpi:DPI,bleedMm:a.output.bleed,safeMarginMm:a.output.trimSafe,titleSize:a.quality.titleSize,bodySize:a.quality.bodySize,seal:a.quality.seal,photoRole:a.quality.photoRole,photoAudit:a.photo,reverse:a.quality.reverse,typography:a.typography}}}
  function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
  function reverseText(){const meta=typeof state!=='undefined'?(state.factoryMeta||{}):{},q=spec(),p=photoAudit(),title=state?.data?.title||'Pieza de Chañar',source=meta.source||state?.data?.source||'Fuente editorial pendiente',credit=p.source||'Crédito fotográfico pendiente',place=state?.data?.location||'San Patricio del Chañar, Neuquén';return`<div class="fq-reverse-inner"><div class="fq-reverse-kicker">FÁBRICA CHAÑAR · ${q.paper.toUpperCase()}</div><h3>${escapeHtml(title)}</h3><div class="fq-reverse-grid"><div><b>PROCEDENCIA</b><span>${escapeHtml(place)}</span></div><div><b>FUENTE</b><span>${escapeHtml(source)}</span></div><div><b>CRÉDITO</b><span>${escapeHtml(credit)}</span></div><div><b>EDICIÓN</b><span>Ocarina Producciones · serie abierta</span></div></div><p class="fq-reverse-note">La información se presenta con criterio editorial. Verificá datos sensibles o de actualidad antes de imprimir.</p><div class="fq-reverse-seal">PIEZA DE CHAÑAR · ${product().toUpperCase()}</div></div>`}
  function installReverse(){const box=$('#canvasPreview');if(!box)return;let back=box.querySelector('.factory-quality-reverse');if(!back){back=document.createElement('div');back.className='factory-quality-reverse';box.appendChild(back)}back.innerHTML=reverseText();let button=$('#btnQualityFlip');if(!button){button=document.createElement('button');button.id='btnQualityFlip';button.type='button';button.className='fq-quality-flip';button.textContent='↻ Ver reverso';const host=document.querySelector('.preview-head .export-actions');host?.appendChild(button);button.addEventListener('click',()=>{const on=box.classList.toggle('quality-show-reverse');button.classList.toggle('is-active',on);button.textContent=on?'↻ Ver frente':'↻ Ver reverso'})}}
  function boot(){const run=()=>{applyTokens();stampMeta();installReverse()};['fabrica:working','fabrica:ready'].forEach(ev=>document.addEventListener(ev,()=>setTimeout(run,50)));['btnSave','btnPng','btnJpg','btnPrint'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>setTimeout(run,100)));setTimeout(run,650)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaQuality={version:1,outputs:OUTPUTS,quality:QUALITY,typography:TYPE,photoRules:PHOTO_RULES,audit};
})();
