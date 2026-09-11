/* FÁBRICA CHAÑAR — BANCO DE RECURSOS v2
   Regla: referencia pública != permiso comercial.
*/
(function(){
  const PHOTO_BANK=window.PHOTO_BANK||[];
  const RIGHTS={own:{label:'Propia / autorizada',safe:true},usable:{label:'Reutilizable',safe:true},reference:{label:'Referencia · no asumir permiso',safe:false}};
  const CATEGORIES=['territorio','vino','vendimia','fiesta','rural','cultura','turismo','agua','frutales','arquitectura'];
  const SOURCES=[
    {name:'Banco propio / autorizado',note:'Primera opción comercial.',url:''},
    {name:'Wikimedia Commons',note:'Comprobar licencia del archivo elegido.',url:'https://commons.wikimedia.org/'},
    {name:'Unsplash',note:'Comprobar licencia y condiciones vigentes.',url:'https://unsplash.com/'},
    {name:'Pexels',note:'Comprobar licencia y condiciones vigentes.',url:'https://www.pexels.com/'},
    {name:'Pixabay',note:'Comprobar licencia y condiciones vigentes.',url:'https://pixabay.com/'},
    {name:'Openverse',note:'Revisar la licencia individual de cada obra.',url:'https://openverse.org/'},
    {name:'Wikimedia · Chañar',note:'Buscar material territorial y revisar licencia por archivo.',url:'https://commons.wikimedia.org/wiki/Category:San_Patricio_del_Chañar'}
  ];
  function guess(p){const s=(p.name+' '+p.source).toLowerCase();const map={territorio:['ingreso','paisaje','territorio'],vino:['bodega','viñedo','vino'],vendimia:['vendimia','cosecha'],fiesta:['fiesta','pelón'],rural:['rural','campo'],cultura:['cultura','chical'],turismo:['turismo','bodega'],agua:['río','agua','riego'],frutales:['frut','pelón'],arquitectura:['cava','bodega','arquitectura']};return CATEGORIES.filter(c=>map[c]?.some(k=>s.includes(k)))}
  function resources(){return PHOTO_BANK.map(p=>({...p,type:p.kind||'reference',rights:RIGHTS[p.kind]||RIGHTS.reference,categories:guess(p)}))}
  function commercial(){return resources().filter(x=>x.rights.safe)}
  function references(){return resources().filter(x=>!x.rights.safe)}
  function find(id){return resources().find(x=>x.id===id)||null}
  function status(id){return find(id)?.rights.label||'Sin ficha de derechos'}
  function render(target){const host=typeof target==='string'?document.querySelector(target):target;if(!host)return;const all=resources();host.innerHTML='<div class="asset-bank-head"><div><small>BANCO DE RECURSOS</small><strong>Fotos, imágenes y fuentes</strong><p>Elegimos material local primero y separamos lo que se puede usar comercialmente de lo que solo sirve para inspirar o documentar.</p></div><span class="asset-count">'+commercial().length+' utilizables · '+references().length+' referencias</span></div><div class="asset-bank-grid">'+all.map(x=>'<article class="asset-card '+(x.rights.safe?'asset-safe':'asset-ref')+'"><div class="asset-thumb" style="background-image:url('+JSON.stringify(x.photo)+')"></div><div class="asset-card-body"><strong>'+esc(x.name)+'</strong><small>'+esc(x.source)+'</small><span class="asset-rights">'+(x.rights.safe?'✓ ':'○ ')+esc(x.rights.label)+'</span><a href="'+esc(x.url)+'" target="_blank" rel="noopener">Ver fuente</a></div></article>').join('')+'</div><div class="asset-source-guide"><strong>Fuentes para ampliar el stock</strong><div>'+SOURCES.map(s=>'<span><b>'+esc(s.name)+'</b> · '+esc(s.note)+(s.url?` <a href="${esc(s.url)}" target="_blank" rel="noopener">abrir</a>`:'')+'</span>').join('')+'</div></div>'}
  function esc(v){return String(v??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[c]))}
  window.FabricaAssets={version:2,resources,commercial,references,find,status,render,categories:CATEGORIES,sources:SOURCES};
})();
