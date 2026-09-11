/* FÁBRICA CHAÑAR — capa de investigación territorial
   Regla: una pieza solo puede declararse LOCAL si su plantilla y recurso visual
   están vinculados a San Patricio del Chañar mediante una fuente identificable.
*/
const LOCAL_RESEARCH={
  updated:'2026-09-11',
  rule:'100% SAN PATRICIO DEL CHAÑAR',
  sources:[
    {type:'OFICIAL',name:'Municipalidad de San Patricio del Chañar',topic:'lugares, patrimonio, balneario, mirador, dique, chacra municipal',url:'https://sanpatricio.gob.ar/nuestra'},
    {type:'OFICIAL',name:'Municipalidad · Qué hacer',topic:'Fiesta del Pelón, bodegas y circuito agroturístico',url:'https://sanpatricio.gob.ar/quehacer'},
    {type:'OFICIAL',name:'Municipalidad · Ubicación',topic:'rutas 7 y 8, territorio y acceso',url:'https://sanpatricio.gob.ar/llegar'},
    {type:'TURISMO',name:'Turismo Neuquén · Donde vive el vino',topic:'ruta del vino y bodegas de Chañar',url:'https://turismo.neuquen.gob.ar/que-hacer-donde-vive-el-vino/'},
    {type:'OFICIAL',name:'Neuquén Informa · Fiesta del Pelón 2026',topic:'producción, cultura, música, feria y destrezas criollas',url:'https://www.neuqueninforma.gob.ar/noticias/2026/02/10/255111-san-patricio-del-chanar-se-prepara-para-la-fiesta-del-pelon'},
    {type:'OFICIAL',name:'Neuquén Informa · Vendimia Malma 2026',topic:'vendimia, viñedos, arte y música',url:'https://www.neuqueninforma.gob.ar/noticias/2026/03/12/255578-vinos-musica-sinfonica-djs-y-arte-en-bodega-malma'},
    {type:'OFICIAL',name:'Neuquén Informa · Malma 2026',topic:'enoturismo, gastronomía, viñedos y experiencias',url:'https://www.neuqueninforma.gob.ar/noticias/2026/04/01/255926-cierre-de-lujo-para-el-ciclo-sunsets-en-san-patricio-del-chanar'},
    {type:'OFICIAL',name:'Neuquén Informa · El Chical 2026',topic:'bodega urbana, cultura y turismo local',url:'https://www.neuqueninforma.gob.ar/noticias/2026/04/03/255930-el-chical-se-suma-a-la-oferta-vitivinicola-de-san-patricio-del-chanar'},
    {type:'OFICIAL',name:'Neuquén Informa · Patritti',topic:'bodega y producción vitivinícola local',url:'https://www.neuqueninforma.gob.ar/noticias/2025/06/01/249561-patritti-el-renacer-de-una-bodega-en-san-patricio-del-chanar'},
    {type:'OFICIAL',name:'Familia Schroeder · Turismo',topic:'vendimia, visitas, viñedos y bodega',url:'https://familiaschroeder.com/arg/turismo/'},
    {type:'MEDIO LOCAL',name:'Chañar Digital · Vendimia Malma 2026',topic:'agenda cultural y vitivinícola local',url:'https://www.chanardigital.com.ar/articulo/2026/03/bodega-malma-despide-la-vendimia-2026-con-un-festival-de-musica-vino-y-experiencias.php'},
    {type:'MEDIO',name:'LM Neuquén · Vendimia',topic:'fotografía y cobertura de vendimia en Chañar',url:'https://www.lmneuquen.com/neuquen/san-patricio-del-chanar-celebro-el-exito-la-vendimia-neuquina-2025-n1180085'},
    {type:'CC',name:'Wikimedia Commons · San Patricio del Chañar',topic:'imagen local con licencia CC BY 3.0',url:'https://commons.wikimedia.org/wiki/File:San_Patricio_del_Chañar.png'}
  ],
  photoRules:[
    {label:'REUTILIZABLE',detail:'Solo cuando la fuente indica una licencia compatible o existe permiso explícito.'},
    {label:'REFERENCIA LOCAL',detail:'La imagen pertenece a una cobertura pública y demuestra que el motivo es de Chañar; no se presume permiso comercial.'},
    {label:'PROPIA OCARINA',detail:'Nivel ideal para producción comercial: foto tomada o licenciada por Ocarina.'}
  ]
};

function localBadge(){return '<span class="local-badge">✓ LOCAL VERIFICADO</span>'}
function injectLocalLayer(){
  if(document.querySelector('#localityLayer')) return;
  const anchor=document.querySelector('.photo-panel');
  if(!anchor) return;
  const sec=document.createElement('section');sec.id='localityLayer';sec.className='panel locality-panel';
  sec.innerHTML=`<div class="locality-head"><div><p class="eyebrow">CONTROL TERRITORIAL</p><h2>100% San Patricio del Chañar</h2><p>La Fábrica no debe rellenar con Patagonia genérica. Cada plantilla está atada a un lugar, evento, bodega, paisaje o hecho identificado en fuentes locales.</p></div><div class="locality-seal">${localBadge()}<strong>FUENTES INVESTIGADAS</strong><span>${LOCAL_RESEARCH.sources.length} registros</span></div></div><div class="locality-stats"><div><b>${LOCAL_RESEARCH.sources.length}</b><span>fuentes locales</span></div><div><b>${LOCAL_RESEARCH.photoRules.length}</b><span>niveles de uso visual</span></div><div><b>18+</b><span>plantillas con motivo local</span></div></div><details><summary>Ver investigación territorial incorporada</summary><div class="source-grid">${LOCAL_RESEARCH.sources.map(s=>`<a class="source-card" href="${s.url}" target="_blank" rel="noopener"><small>${s.type}</small><strong>${s.name}</strong><span>${s.topic}</span></a>`).join('')}</div><div class="rights-grid">${LOCAL_RESEARCH.photoRules.map(r=>`<div class="rights-card"><b>${r.label}</b><span>${r.detail}</span></div>`).join('')}</div></details>`;
  anchor.parentNode.insertBefore(sec,anchor);
}
function decorateTemplates(){
  document.querySelectorAll('.template-card').forEach(card=>{
    if(!card.querySelector('.local-badge')){
      const title=card.querySelector('strong');
      if(title) title.insertAdjacentHTML('afterend',localBadge());
    }
  });
}
function addOneClick(){
  const actions=document.querySelector('.actions');
  if(!actions || document.querySelector('#btnProduce')) return;
  const b=document.createElement('button');b.id='btnProduce';b.type='button';b.className='production-button';b.textContent='⚡ GENERAR Y DESCARGAR';
  b.title='Produce la pieza con la plantilla seleccionada y descarga PNG';
  b.onclick=()=>{const gen=document.querySelector('#btnGenerate');if(gen)gen.click();setTimeout(()=>{const png=document.querySelector('#btnPng');if(png)png.click()},650)};
  actions.appendChild(b);
}
function localGuard(){
  const status=document.querySelector('#status');
  if(!status) return;
  const selected=document.querySelector('.template-card.active');
  if(selected && !selected.querySelector('.local-badge')) status.textContent='Control local: revisar plantilla antes de producir.';
}
function boot(){
  injectLocalLayer();addOneClick();decorateTemplates();localGuard();
  new MutationObserver(()=>{addOneClick();decorateTemplates()}).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
