/* FÁBRICA CHAÑAR — BANCO DE RECURSOS v3
   Regla: referencia pública != permiso comercial.
   v3 corrige el acceso al PHOTO_BANK global y conserva la ficha de derechos.
*/
(function(){
  const PHOTO_BANK_REF=typeof PHOTO_BANK!=='undefined'?PHOTO_BANK:[];
  const RIGHTS={own:{label:'Propia / autorizada',safe:true},usable:{label:'Reutilizable · revisar licencia',safe:true},reference:{label:'Referencia · no asumir permiso',safe:false}};
  const CATEGORIES=['territorio','vino','vendimia','fiesta','rural','cultura','turismo','agua','frutales','arquitectura','paisaje'];
  const SOURCES=[
    {name:'Banco propio / autorizado',note:'Primera opción comercial.',url:''},
    {name:'Wikimedia Commons',note:'Usar el archivo solo según su licencia concreta.',url:'https://commons.wikimedia.org/'},
    {name:'Unsplash',note:'Comprobar licencia y condiciones vigentes.',url:'https://unsplash.com/'},
    {name:'Pexels',note:'Comprobar licencia y condiciones vigentes.',url:'https://www.pexels.com/'},
    {name:'Pixabay',note:'Comprobar licencia y condiciones vigentes.',url:'https://pixabay.com/'},
    {name:'Openverse',note:'Revisar la licencia individual de cada obra.',url:'https://openverse.org/'},
    {name:'Wikimedia · San Patricio del Chañar',note:'Hay poco material local: priorizar archivos con licencia explícita.',url:'https://commons.wikimedia.org/wiki/Category:San_Patricio_del_Chañar'}
  ];
  function guess(p){
    if(Array.isArray(p.categories)&&p.categories.length)return p.categories;
    const s=(p.name+' '+p.source).toLowerCase();
    const map={territorio:['ingreso','paisaje','territorio'],vino:['bodega','viñedo','vino'],vendimia:['vendimia','cosecha'],fiesta:['fiesta','pelón'],rural:['rural','campo'],cultura:['cultura','chical'],turismo:['turismo','bodega'],agua:['río','agua','riego','dique'],frutales:['frut','pelón'],arquitectura:['cava','bodega','arquitectura'],paisaje:['paisaje','dique','viñedo']};
    return CATEGORIES.filter(c=>map[c]?.some(k=>s.includes(k)));
  }
  function resources(){return PHOTO_BANK_REF.map(p=>({...p,type:p.kind||'reference',rights:RIGHTS[p.kind]||RIGHTS.reference,categories:guess(p)}));}
  function commercial(){return resources().filter(x=>x.rights.safe)}
  function references(){return resources().filter(x=>!x.rights.safe)}
  function find(id){return resources().find(x=>x.id===id)||null}
  function status(id){return find(id)?.rights.label||'Sin ficha de derechos'}
  function render(target){
    const host=typeof target==='string'?document.querySelector(target):target;if(!host)return;
    const all=resources();
    host.innerHTML='<div class="asset-bank-head"><div><small>BANCO DE RECURSOS</small><strong>Fotos, imágenes y fuentes</strong><p>Material local primero. La Fábrica separa lo reutilizable de lo que solo sirve para documentar o inspirar.</p></div><span class="asset-count">'+commercial().length+' utilizables · '+references().length+' referencias</span></div><div class="asset-bank-grid">'+all.map(x=>'<article class="asset-card '+(x.rights.safe?'asset-safe':'asset-ref')+'"><div class="asset-thumb" style="background-image:url('+JSON.stringify(x.photo)+')"></div><div class="asset-card-body"><strong>'+esc(x.name)+'</strong><small>'+esc(x.source)+(x.license?' · '+esc(x.license):'')+'</small><span class="asset-rights">'+(x.rights.safe?'✓ ':'○ ')+esc(x.rights.label)+'</span>'+(x.author?'<small>Autor: '+esc(x.author)+'</small>':'')+'<a href="'+esc(x.url)+'" target="_blank" rel="noopener">Ver fuente y licencia</a></div></article>').join('')+'</div><div class="asset-source-guide"><strong>Fuentes para ampliar el stock</strong><div>'+SOURCES.map(s=>'<span><b>'+esc(s.name)+'</b> · '+esc(s.note)+(s.url?` <a href="${esc(s.url)}" target="_blank" rel="noopener">abrir</a>`:'')+'</span>').join('')+'</div></div>';
  }
  function esc(v){return String(v??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[c]))}
  window.FabricaAssets={version:3,resources,commercial,references,find,status,render,categories:CATEGORIES,sources:SOURCES};
})();
