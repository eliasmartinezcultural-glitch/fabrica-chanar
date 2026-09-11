const PRODUCTS={
  postal:{name:'Postal',desc:'Regalo, recuerdo o pieza turística',fields:[['title','Título','input','Ej. El Chañar, tierra de historias'],['subtitle','Bajada','input','Una frase breve y evocadora'],['body','Texto','textarea','Texto breve, cálido y verificable'],['source','Fuente','input','Fuente o archivo'],['credit','Crédito de imagen','input','Autor / licencia'],['image','Imagen','file','']]},
  ficha:{name:'Ficha local',desc:'Lugar, persona, patrimonio o experiencia',fields:[['title','Nombre','input','Ej. El río Neuquén'],['category','Tipo','select','Lugar|Persona|Institución|Comercio|Patrimonio|Historia|Turismo|Cultura|Rural|Naturaleza'],['body','Descripción','textarea','Información breve, humana y verificable'],['location','Ubicación','input','Ubicación verificada'],['source','Fuente','input','Fuente o archivo'],['image','Imagen','file','']]},
  guide:{name:'Guía',desc:'Pequeña guía para descubrir Chañar',fields:[['title','Título','input','Ej. Un día entre viñedos y chacras'],['intro','Introducción','textarea','Invitación al recorrido'],['items','Contenido','textarea','Un punto por línea'],['source','Fuentes','textarea','Fuentes utilizadas'],['image','Imagen de portada','file','']]},
  infographic:{name:'Infografía',desc:'Datos, historia, calendario o identidad',fields:[['title','Título','input','Tema'],['headline','Dato principal','input','Dato comprobado'],['body','Contenido','textarea','Información clara y atractiva'],['source','Fuente','input','Fuente verificable'],['image','Imagen','file','']]}
};

const TEMPLATES=[
  {id:'postal-paisaje',product:'postal',name:'Postal del lugar',tag:'Turismo',data:{title:'San Patricio del Chañar',subtitle:'Donde el valle se encuentra con la estepa',body:'Una postal para guardar, regalar o compartir. Historia, paisaje y territorio en una sola pieza.'}},
  {id:'postal-recuerdo',product:'postal',name:'Recuerdo de Chañar',tag:'Regalo',data:{title:'Recuerdo de San Patricio del Chañar',subtitle:'Historias, personas y territorio',body:'Una pequeña pieza para llevarse una memoria del lugar.'}},
  {id:'postal-vino',product:'postal',name:'Postal del vino',tag:'Enoturismo',data:{title:'El vino del valle',subtitle:'Viñedos, chacras y paisaje patagónico',body:'El Chañar forma parte de una ruta donde la producción, la gastronomía y el paisaje se encuentran.'}},
  {id:'ficha-rio',product:'ficha',name:'Río Neuquén',tag:'Naturaleza',data:{title:'Río Neuquén',category:'Naturaleza',body:'El río es parte esencial del paisaje y de la historia productiva de San Patricio del Chañar.',location:'San Patricio del Chañar'}},
  {id:'ficha-vinedos',product:'ficha',name:'Viñedos',tag:'Turismo',data:{title:'Viñedos del Chañar',category:'Turismo',body:'Paisaje productivo donde la vid, las chacras y la estepa construyen una identidad reconocible.',location:'Zona rural de San Patricio del Chañar'}},
  {id:'ficha-chacras',product:'ficha',name:'Las chacras',tag:'Cultura',data:{title:'Las chacras',category:'Rural',body:'El oasis de riego transformó el paisaje y dejó una cultura productiva propia: frutas, trabajo, caminos y familias.',location:'San Patricio del Chañar'}},
  {id:'guide-dia',product:'guide',name:'Un día en Chañar',tag:'Turismo',data:{title:'Un día para descubrir Chañar',intro:'Una propuesta sencilla para mirar el lugar con otros ojos.',items:'Recorrer la zona de chacras\nConocer el paisaje del río Neuquén\nDescubrir la cultura vitivinícola\nProbar gastronomía regional\nGuardar una postal del viaje'}},
  {id:'guide-vino',product:'guide',name:'Ruta del vino',tag:'Enoturismo',data:{title:'Pequeña guía del vino del Chañar',intro:'Una puerta de entrada al paisaje vitivinícola neuquino.',items:'Viñedos\nBodegas\nVisitas y degustaciones\nGastronomía regional\nHistoria productiva'}},
  {id:'info-identidad',product:'infographic',name:'Identidad local',tag:'Cultura',data:{title:'San Patricio del Chañar en 5 ideas',headline:'Territorio + agua + chacras + vino + historias',body:'Una identidad construida entre el río Neuquén, el oasis de riego, la producción frutícola, la vitivinicultura y la memoria de sus habitantes.'}},
  {id:'info-paisaje',product:'infographic',name:'Paisaje productivo',tag:'Territorio',data:{title:'Cómo se construyó este paisaje',headline:'Agua que transforma territorio',body:'Río, riego, chacras, caminos, viñedos y estepa forman un paisaje cultural que también puede contarse como experiencia turística.'}},
  {id:'info-historia',product:'infographic',name:'Historia breve',tag:'Historia',data:{title:'Chañar: una historia para contar',headline:'Del territorio al pueblo',body:'Una pieza breve para ordenar fechas, lugares, personas y transformaciones sin convertir la historia local en un texto aburrido.'}},
  {id:'info-patrimonio',product:'infographic',name:'Patrimonio vivo',tag:'Patrimonio',data:{title:'Patrimonio que todavía vive',headline:'No todo patrimonio está detrás de una vitrina',body:'Caminos, chacras, relatos, fiestas, oficios, recetas, edificios y paisajes también forman parte de la memoria local.'}}
];

const PHOTOS=[
  {id:'sign',name:'Ingreso a San Patricio del Chañar',kind:'CC BY 3.0',author:'Cartago TV',url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/San%20Patricio%20del%20Cha%C3%B1ar.png',source:'https://commons.wikimedia.org/wiki/File:San_Patricio_del_Chañar.png'},
  {id:'dique',name:'Dique Compensador Chañar',kind:'CC BY-SA 3.0',author:'psanetti',url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Dique%20Compensador%20Chañar%2C%20Neuquen%20-%20panoramio.jpg',source:'https://commons.wikimedia.org/wiki/File:Dique_Compensador_Chañar,_Neuquen_-_panoramio.jpg'},
  {id:'dique1',name:'Dique Compensador Chañar · vista 2',kind:'CC BY-SA 3.0',author:'psanetti',url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Dique%20Compensador%20Chañar%2C%20Neuquen%20-%20panoramio%20%281%29.jpg',source:'https://commons.wikimedia.org/wiki/File:Dique_Compensador_Chañar,_Neuquen_-_panoramio_(1).jpg'},
  {id:'dique2',name:'Dique Compensador Chañar · vista 3',kind:'CC BY-SA 3.0',author:'psanetti',url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Dique%20Compensador%20Chañar%2C%20Neuquen%20-%20panoramio%20%282%29.jpg',source:'https://commons.wikimedia.org/wiki/File:Dique_Compensador_Chañar,_Neuquen_-_panoramio_(2).jpg'},
  {id:'tourism',name:'Emprendimientos turísticos',kind:'Fuente pública',author:'Neuquén Informa',url:null,source:'https://www.neuqueninforma.gob.ar/noticias/2025/04/07/248734-visita-a-emprendedores-turisticos-en-san-patricio-del-chanar'},
  {id:'camping',name:'Río y camping',kind:'Fuente pública',author:'Neuquén Informa',url:null,source:'https://www.neuqueninforma.gob.ar/noticias/2025/01/13/247652-habilitaron-camping-en-san-patricio-del-chanar'},
  {id:'vino',name:'Paisaje vitivinícola',kind:'Fuente pública',author:'Turismo Neuquén',url:null,source:'https://turismo.neuquen.gob.ar/que-hacer-donde-vive-el-vino/'},
  {id:'fotos',name:'Galería de San Patricio del Chañar',kind:'Galería pública',author:'Ruta0',url:null,source:'https://www.ruta0.com/san-patricio-del-chanar/fotos/'},
  {id:'flickr',name:'Fotografías públicas del lugar',kind:'Galería pública',author:'De Rutas y Destinos',url:null,source:'https://www.derutasydestinos.com/fotografias-San-Patricio-del-Cha%C3%B1ar--Neuquen.html'},
  {id:'viaje',name:'Fotos de recorridos',kind:'Galería pública',author:'Wikiloc',url:null,source:'https://es.wikiloc.com/rutas-coche/san-patricio-del-chanar-neuquen-78838494'}
];

const KEY='fabrica-chanar-simple-v1';
const $=s=>document.querySelector(s); const clean=v=>typeof v==='string'?v.trim():'';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
let state={type:'postal',data:{},image:null,imageCredit:''};
function library(){try{const x=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(x)?x:[]}catch{return[]}}
function setLibrary(items){localStorage.setItem(KEY,JSON.stringify(items.slice(0,100)));updateLibraryCount()}
function updateLibraryCount(){const n=library().length;$('#libraryCount').textContent=n}
function renderProducts(){
  $('#productGrid').innerHTML=Object.entries(PRODUCTS).map(([id,p])=>`<button type="button" class="product-btn ${id===state.type?'active':''}" data-product="${id}"><strong>${p.name}</strong><small>${p.desc}</small></button>`).join('');
  document.querySelectorAll('[data-product]').forEach(b=>b.onclick=()=>{state={type:b.dataset.product,data:{},image:null,imageCredit:''};renderProducts();renderForm();renderPreview();setStatus('Producto seleccionado.')});
}
function renderTemplates(){
  $('#templateGrid').innerHTML=TEMPLATES.map(t=>`<button class="template-card" data-template="${t.id}"><span>${esc(t.tag)}</span><strong>${esc(t.name)}</strong><small>${esc(PRODUCTS[t.product].name)}</small></button>`).join('');
  document.querySelectorAll('[data-template]').forEach(b=>b.onclick=()=>applyTemplate(b.dataset.template));
}
function applyTemplate(id){const t=TEMPLATES.find(x=>x.id===id);if(!t)return;state={type:t.product,data:{...t.data},image:state.image,imageCredit:state.imageCredit};renderProducts();renderForm();renderPreview();setStatus(`Plantilla «${t.name}» cargada. Podés producirla tal cual o tocar el texto.`)}
function renderPhotoBank(){
  $('#photoBank').innerHTML=PHOTOS.map(p=>`<article class="photo-card">${p.url?`<img src="${p.url}" alt="${esc(p.name)}" loading="lazy">`:`<div class="photo-placeholder"><span>↗</span><small>Fuente pública</small></div>`}<div class="photo-info"><strong>${esc(p.name)}</strong><small>${esc(p.kind)} · ${esc(p.author)}</small><div><button data-photo="${p.id}" ${p.url?'':'disabled'}>Usar</button><a href="${p.source}" target="_blank" rel="noopener">Fuente</a></div></div></article>`).join('');
  document.querySelectorAll('[data-photo]').forEach(b=>b.onclick=()=>usePhoto(b.dataset.photo));
}
function usePhoto(id){const p=PHOTOS.find(x=>x.id===id);if(!p?.url)return;state.image=p.url;state.imageCredit=`${p.author} · ${p.kind}`;renderForm();renderPreview();setStatus(`Imagen seleccionada: ${p.name}.`)}
function renderForm(){
  const p=PRODUCTS[state.type];
  $('#editorForm').innerHTML=p.fields.map(([key,label,kind,ph])=>{
    if(kind==='file')return `<div class="field"><label>${label}</label><input id="field-${key}" type="file" accept="image/*"><div class="hint">También podés elegir una imagen del banco visual.</div></div>`;
    if(kind==='select')return `<div class="field"><label for="field-${key}">${label}</label><select id="field-${key}"><option value="">Elegir…</option>${ph.split('|').map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}</select></div>`;
    return `<div class="field"><label for="field-${key}">${label}</label>${kind==='textarea'?`<textarea id="field-${key}" placeholder="${esc(ph)}"></textarea>`:`<input id="field-${key}" placeholder="${esc(ph)}">`}</div>`;
  }).join('');
  $('#editorForm').querySelectorAll('input:not([type=file]),textarea,select').forEach(el=>{const key=el.id.replace('field-','');el.value=state.data[key]??'';el.oninput=()=>{state.data[key]=el.value;renderPreview()}});
  const file=$('#field-image'); if(file)file.onchange=e=>{const f=e.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=()=>{state.image=r.result;state.imageCredit=f.name;renderPreview()};r.readAsDataURL(f)};
}
function bodyHTML(){const d=state.data;if(state.type==='guide')return `<ul>${(d.items||'').split(/\r?\n/).filter(clean).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;return `<p>${esc(d.body||d.intro||d.headline||'Completá el contenido para comenzar.')}</p>`}
function renderPreview(){
  const d=state.data; const image=state.image?`<img src="${state.image}" alt="Imagen de la pieza">`:''; const category=state.type==='ficha'&&d.category?`<div class="piece-meta">${esc(d.category)}${d.location?` · ${esc(d.location)}`:''}</div>`:'';
  $('#canvasPreview').innerHTML=`<article class="piece ${state.type}"><div class="piece-image">${image}<div class="piece-overlay">${esc(d.subtitle||'OCARINA · CHAÑAR')}</div></div><div class="piece-content"><div class="piece-kicker">OCARINA PRODUCCIONES · ${esc(PRODUCTS[state.type].name).toUpperCase()}</div><h3>${esc(d.title||'Título de la pieza')}</h3>${d.subtitle&&state.type!=='postal'?`<div class="piece-subtitle">${esc(d.subtitle)}</div>`:''}${d.headline?`<div class="piece-headline">${esc(d.headline)}</div>`:''}${category}${bodyHTML()}${d.source?`<div class="piece-source"><strong>Fuente:</strong> ${esc(d.source)}</div>`:''}${state.imageCredit?`<div class="piece-credit">Imagen: ${esc(state.imageCredit)}</div>`:''}<div class="piece-brand">Fábrica Chañar · Ocarina Producciones</div></div></article>`;
}
function validate(){const d=state.data;if(!clean(d.title)){setStatus('Falta el título.');return false}const text=state.type==='guide'?clean(d.intro)||clean(d.items):clean(d.body)||clean(d.headline);if(!text){setStatus('Falta contenido.');return false}if(state.type==='ficha'&&!clean(d.category)){setStatus('Elegí el tipo de ficha.');return false}return true}
function setStatus(msg){$('#status').textContent=msg||''}
function save(){if(!validate())return;const item={id:'pieza-'+Date.now(),type:state.type,data:{...state.data},image:state.image,imageCredit:state.imageCredit,created:new Date().toISOString()};setLibrary([item,...library()]);setStatus('Pieza guardada en la biblioteca local.')}
function openLibrary(){const arr=library();$('#libraryList').innerHTML=arr.length?arr.map(x=>`<div class="library-card"><div><strong>${esc(x.data?.title||PRODUCTS[x.type]?.name)}</strong><small>${esc(PRODUCTS[x.type]?.name||x.type)} · ${new Date(x.created).toLocaleDateString('es-AR')}</small></div><div class="library-buttons"><button data-open="${x.id}">Abrir</button><button data-delete="${x.id}">Eliminar</button></div></div>`).join(''):'<p class="empty">Todavía no guardaste ninguna pieza.</p>';$('#libraryPanel').classList.remove('hidden');$('#libraryList').querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>{const x=library().find(y=>y.id===b.dataset.open);if(!x)return;state={type:x.type,data:x.data||{},image:x.image||null,imageCredit:x.imageCredit||''};renderProducts();renderForm();renderPreview();$('#libraryPanel').classList.add('hidden');setStatus('Pieza abierta.')});$('#libraryList').querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>{setLibrary(library().filter(x=>x.id!==b.dataset.delete));openLibrary()})}
async function exportImage(kind){if(!validate())return;if(typeof html2canvas!=='function'){setStatus('No está disponible el motor de exportación.');return}setStatus('Preparando descarga…');try{const canvas=await html2canvas($('#canvasPreview'),{scale:2,useCORS:true,backgroundColor:'#f4efe5'});const a=document.createElement('a');a.download=`fabrica-chanar-${Date.now()}.${kind}`;a.href=canvas.toDataURL(kind==='jpg'?'image/jpeg':'image/png',.94);a.click();setStatus(`Descargado: ${kind.toUpperCase()}.`)}catch(e){setStatus('No se pudo exportar esta pieza. Probá PDF / imprimir.')}}
$('#btnGenerate').onclick=()=>{if(validate()){renderPreview();setStatus('Lista. Ahora podés descargarla.')}};
$('#btnSave').onclick=save; $('#btnPng').onclick=()=>exportImage('png'); $('#btnJpg').onclick=()=>exportImage('jpg'); $('#btnPrint').onclick=()=>{if(validate())window.print()}; $('#btnLibrary').onclick=openLibrary; $('#btnCloseLibrary').onclick=()=>$('#libraryPanel').classList.add('hidden');
renderProducts();renderTemplates();renderPhotoBank();renderForm();renderPreview();updateLibraryCount();