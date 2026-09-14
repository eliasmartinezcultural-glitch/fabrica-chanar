/* FÁBRICA CHAÑAR — CAPA EDITORIAL Y DE ESTABILIDAD V4.4
   Regla: un solo motor de producción (v3-production.js).
   Esta capa NO crea otro runtime: solo aporta contenido editorial, fuentes y
   restricciones visuales para impedir solapamientos y desbordes.
*/
(()=>{'use strict';
const SOURCES={
  agroturismo:'https://www.neuqueninforma.gob.ar/noticias/2026/02/20/255259-la-provincia-se-fortalece-con-sus-chacras-bodegas-y-estancias',
  pelon:'https://www.neuqueninforma.gob.ar/noticias/2026/02/10/255111-san-patricio-del-chanar-se-prepara-para-la-fiesta-del-pelon',
  sabores:'https://www.neuqueninforma.gob.ar/amp/noticias/2026/07/10/260413-san-patricio-del-chanar-realizara-la-primera-feria-regional-de-turismo-sabores-y-amigos',
  chical:'https://www.neuqueninforma.gob.ar/noticias/2026/04/03/255930-el-chical-se-suma-a-la-oferta-vitivinicola-de-san-patricio-del-chanar',
  schroeder:'https://www.neuqueninforma.gob.ar/noticias/2026/05/23/258207-bodega-familia-schroeder-celebra-con-una-propuesta-de-enoturismo-sabores-patrios-y-musica-en-vivo'
};
const BANK={
 ingreso:{title:'San Patricio del Chañar',subtitle:'Territorio productivo y cultural',body:'Producción, paisaje, cultura y vida local forman parte de una misma identidad territorial.',cat:'TERRITORIO',source:'Curaduría territorial de Fábrica Chañar'},
 malma:{title:'Bodega Familia Malma',subtitle:'Viticultura y enoturismo local',body:'Malma integra el corredor vitivinícola de San Patricio del Chañar y sus propuestas de enoturismo.',cat:'PRODUCCIÓN · ENOTURISMO',source:SOURCES.agroturismo},
 vinedos:{title:'Viñedos del Chañar',subtitle:'Paisaje productivo',body:'Los viñedos son una expresión visible de la actividad vitivinícola que caracteriza a San Patricio del Chañar.',cat:'PAISAJE · PRODUCCIÓN',source:SOURCES.agroturismo},
 schroeder:{title:'Familia Schroeder',subtitle:'Viticultura, gastronomía y enoturismo',body:'Familia Schroeder forma parte del corredor vitivinícola local y desarrolla propuestas que vinculan vino, gastronomía y experiencias.',cat:'PRODUCCIÓN · TURISMO',source:SOURCES.schroeder},
 'vendimia-schroeder':{title:'Vendimia en el Chañar',subtitle:'Cosecha, trabajo y territorio',body:'La vendimia permite contar el trabajo de la cosecha y el carácter vitivinícola de San Patricio del Chañar.',cat:'VENDIMIA · TERRITORIO',source:'Curaduría editorial · referencia oficial provincial'},
 'fiesta-pelon':{title:'Fiesta Provincial del Pelón',subtitle:'Trabajo rural, cultura y encuentro',body:'La Fiesta Provincial del Pelón homenajea al trabajador rural y pone en valor raíces productivas y culturales de la localidad.',cat:'CULTURA · PRODUCCIÓN',source:SOURCES.pelon},
 patritti:{title:'Bodega Patritti',subtitle:'Una historia vitivinícola del Chañar',body:'Patritti integra la historia vitivinícola de San Patricio del Chañar y su desarrollo como espacio productivo y enoturístico.',cat:'PRODUCCIÓN · VITIVINICULTURA',source:SOURCES.agroturismo},
 'el-chical':{title:'El Chical',subtitle:'Bodega urbana y espacio cultural',body:'El Chical se incorporó en 2026 a la oferta vitivinícola local como bodega urbana, espacio cultural y atractivo turístico.',cat:'VINO · CULTURA · TURISMO',source:SOURCES.chical},
 'vendimia-schroeder-2':{title:'Vendimia en San Patricio del Chañar',subtitle:'Una identidad vitivinícola',body:'Viticultura, vendimia, bodegas y enoturismo permiten contar una parte central de la identidad productiva y turística local.',cat:'INFOGRAFÍA · PRODUCCIÓN',source:SOURCES.agroturismo}
};
const MAX={title:54,subtitle:78,body:180,category:42};
function clip(s,n){s=String(s||'').trim();return s.length>n?s.slice(0,n-1).trimEnd()+'…':s}
function fill(id,value,force){const e=document.getElementById(id);if(!e)return;e.value=clip(value,MAX[id]||220);if(force||!e.dataset.auto)e.dataset.auto='1';e.dispatchEvent(new Event('input',{bubbles:true}))}
function apply(force=false){const b=document.querySelector('#photos .photo.active');const p=BANK[b?.dataset?.photo||''];if(!p)return;fill('title',p.title,force);fill('subtitle',p.subtitle,force);fill('body',p.body,force);fill('category',p.cat,force);const box=document.getElementById('smartSource');if(box){box.innerHTML=`<b>Ficha editorial preelaborada</b><br><span>${p.source}</span>${String(p.source).startsWith('http')?`<br><a href="${p.source}" target="_blank" rel="noopener noreferrer">Fuente de respaldo</a>`:''}`}}
function installCSS(){if(document.getElementById('fabricaLockCSS'))return;const style=document.createElement('style');style.id='fabricaLockCSS';style.textContent=`
/* LOCK V4.4 — estructura */
html,body{max-width:100%;overflow-x:hidden}
.wrap{width:100%;max-width:1280px;margin-inline:auto}
.grid{display:grid;grid-template-columns:minmax(300px,390px) minmax(0,1fr);gap:14px;align-items:start;min-width:0}
.grid>aside,.grid>section{min-width:0;max-width:100%;overflow:hidden}
.controls{min-width:0}
.products,.photos,.actions,.pilot-grid,.curated-grid{min-width:0;max-width:100%}
.product,.pilot-card,.curated-card,.btn{max-width:100%;min-width:0;overflow:hidden}
.product b,.pilot-card b,.curated-card b{display:block;overflow-wrap:anywhere;word-break:break-word}
.stage{width:100%;min-width:0;max-width:100%;overflow:auto;display:grid;place-items:center;contain:layout paint}
.piece{flex:none;max-width:none;min-width:0;overflow:hidden;isolation:isolate}
.piece .image{flex:none;min-height:0;overflow:hidden}
.piece .body{min-width:0;min-height:0;overflow:hidden}
.piece h1,.piece .subtitle,.piece .copy,.piece .tag{max-width:100%;overflow-wrap:anywhere;word-break:break-word}
.piece h1{max-height:4.2em;overflow:hidden}
.piece .subtitle{max-height:3.2em;overflow:hidden}
.piece .copy{max-height:7.2em;overflow:hidden}
.piece .seal{position:relative;z-index:2;min-width:0;overflow:hidden;flex:none}
.piece .seal span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.prototype-mark{max-width:45%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
/* layouts con texto sobre imagen: área segura única */
.layout-wide .body,.layout-widecard .body,.layout-wideguide .body{max-height:54%;overflow:hidden}
.layout-wide .image,.layout-widecard .image,.layout-wideguide .image{min-height:100%}
.layout-event .body,.layout-product .body,.layout-split .body,.layout-card .body,.layout-paper .body,.layout-guide .body,.layout-info .body,.layout-process .body,.layout-data .body{overflow:hidden}
/* colección curada */
.curated{min-width:0;overflow:hidden}
.curated-head{min-width:0}
.curated-head>div:first-child{min-width:0}
.curated-count{flex:0 0 68px}
.curated-grid{align-items:stretch}
.curated-card{min-height:125px}
.curated-seal{max-width:58%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
/* fuente editorial: una sola caja, nunca invade la pieza */
.smart-source{position:relative;z-index:1;max-width:100%;overflow:hidden;overflow-wrap:anywhere}
.smart-source span{overflow-wrap:anywhere}
.smart-source a{word-break:break-all}
.smart-status{max-width:100%;overflow:hidden;overflow-wrap:anywhere}
/* controles */
.field input,.field textarea{max-width:100%;min-width:0}
.upload{max-width:100%}.upload input{max-width:100%}
@media(max-width:900px){.grid{grid-template-columns:1fr}.stage{min-height:520px}.controls{width:100%}}
@media(max-width:520px){.wrap{padding-inline:8px}.grid{gap:10px}.stage{padding:8px}.piece.vertical{width:360px;height:450px}.piece.square{width:400px;height:400px}.piece.horizontal{width:560px;height:350px}.piece.print{width:300px;height:425px}.curated-grid,.pilot-grid{grid-template-columns:1fr}.curated-head{gap:8px}.curated-count{flex-basis:58px;min-width:58px}}
`;document.head.appendChild(style)}
function inject(){installCSS();const meta=document.getElementById('photoMeta');if(meta&&!document.getElementById('smartSource')){const d=document.createElement('div');d.id='smartSource';d.className='smart-source';meta.insertAdjacentElement('afterend',d)}const actions=document.querySelector('.actions');if(actions&&!document.getElementById('smartStatus')){const s=document.createElement('div');s.id='smartStatus';s.className='smart-status';s.textContent='Contenido y diseño preelaborados · cambiá solo lo imprescindible.';actions.insertAdjacentElement('afterend',s)}document.addEventListener('click',e=>{if(e.target.closest('[data-template], [data-photo]'))setTimeout(()=>apply(true),50)});setTimeout(()=>apply(false),120)}
window.FABRICA_EDITORIAL_BANK=BANK;window.FABRICA_EDITORIAL_SOURCES=SOURCES;window.FABRICA_LOCK={version:'4.4',status:'LOCKED',rule:'un solo motor + capas editoriales sin duplicar runtime',limits:MAX};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',inject);else inject();
})();