const PRODUCTS={
  postal:{name:'Postal',desc:'Una pieza breve y visual',fields:[
    ['title','Título','input','Ej. La chacra de los abuelos'],
    ['subtitle','Bajada','input','Una frase breve'],
    ['body','Texto','textarea','Texto breve y verificable'],
    ['source','Fuente','input','Archivo, institución, entrevista o enlace'],
    ['credit','Crédito de imagen','input','Autor / archivo / propia'],
    ['image','Imagen','file','']
  ]},
  ficha:{name:'Ficha local',desc:'Un lugar, persona, institución o hecho',fields:[
    ['title','Nombre','input','Ej. Biblioteca Popular'],
    ['category','Tipo','select','Lugar|Persona|Institución|Comercio|Patrimonio|Historia|Turismo|Cultura|Rural|Naturaleza'],
    ['body','Descripción','textarea','Información breve y verificable'],
    ['location','Ubicación','input','Solo si está verificada'],
    ['source','Fuente','input','Archivo, institución, entrevista o enlace'],
    ['image','Imagen','file','']
  ]},
  guide:{name:'Guía',desc:'Información práctica ordenada',fields:[
    ['title','Título','input','Ej. Guía de un paseo'],
    ['intro','Introducción','textarea','Qué encontrará el lector'],
    ['items','Contenido','textarea','Un punto por línea'],
    ['source','Fuentes','textarea','Fuentes utilizadas'],
    ['image','Imagen de portada','file','']
  ]},
  infographic:{name:'Infografía',desc:'Datos, calendario, cronología o material educativo',fields:[
    ['title','Título','input','Tema'],
    ['headline','Dato principal','input','Dato comprobado'],
    ['body','Contenido','textarea','Información y aclaraciones'],
    ['source','Fuente','input','Fuente verificable'],
    ['image','Imagen','file','']
  ]}
};

const KEY='fabrica-chanar-simple-v1';
const $=s=>document.querySelector(s);
const clean=v=>typeof v==='string'?v.trim():'';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
let state={type:'ficha',data:{},image:null};

function library(){try{const x=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(x)?x:[]}catch{return[]}}
function setLibrary(items){localStorage.setItem(KEY,JSON.stringify(items.slice(0,100)));updateLibraryCount()}
function updateLibraryCount(){const n=library().length;$('#libraryCount').textContent=n}

function renderProducts(){
  $('#productGrid').innerHTML=Object.entries(PRODUCTS).map(([id,p])=>`<button type="button" class="product-btn ${id===state.type?'active':''}" data-product="${id}"><strong>${p.name}</strong><small>${p.desc}</small></button>`).join('');
  document.querySelectorAll('[data-product]').forEach(b=>b.onclick=()=>{state={type:b.dataset.product,data:{},image:null};renderForm();renderPreview();setStatus('Producto seleccionado.');renderProducts()});
}

function renderForm(){
  const p=PRODUCTS[state.type];
  $('#editorForm').innerHTML=p.fields.map(([key,label,kind,ph])=>{
    if(kind==='file')return `<div class="field"><label>${label}</label><input id="field-${key}" type="file" accept="image/*"><div class="hint">La imagen se usa solo para esta pieza.</div></div>`;
    if(kind==='select')return `<div class="field"><label for="field-${key}">${label}</label><select id="field-${key}">${ph.split('|').map(x=>`<option>${esc(x)}</option>`).join('')}</select></div>`;
    return `<div class="field"><label for="field-${key}">${label}</label>${kind==='textarea'?`<textarea id="field-${key}" placeholder="${esc(ph)}"></textarea>`:`<input id="field-${key}" placeholder="${esc(ph)}">`}</div>`;
  }).join('');
  $('#editorForm').querySelectorAll('input:not([type=file]),textarea,select').forEach(el=>{
    const key=el.id.replace('field-','');el.value=state.data[key]??'';
    el.oninput=()=>{state.data[key]=el.value;renderPreview()};
  });
  const file=$('#field-image');
  if(file)file.onchange=e=>{const f=e.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=()=>{state.image=r.result;renderPreview()};r.readAsDataURL(f)};
}

function bodyHTML(){
  const d=state.data;
  if(state.type==='guide')return `<ul>${(d.items||'').split(/\r?\n/).filter(clean).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
  return `<p>${esc(d.body||d.intro||d.headline||'Completá el contenido para comenzar.')}</p>`;
}

function renderPreview(){
  const d=state.data;
  const image=state.image?`<img src="${state.image}" alt="Imagen de la pieza">`:'';
  const category=state.type==='ficha'&&d.category?`<div class="piece-meta">${esc(d.category)}${d.location?` · ${esc(d.location)}`:''}</div>`:'';
  $('#canvasPreview').innerHTML=`<article class="piece ${state.type}">
    <div class="piece-image">${image}</div>
    <div class="piece-content">
      <div class="piece-kicker">OCARINA PRODUCCIONES · ${esc(PRODUCTS[state.type].name).toUpperCase()}</div>
      <h3>${esc(d.title||'Título de la pieza')}</h3>
      ${d.subtitle?`<div class="piece-subtitle">${esc(d.subtitle)}</div>`:''}
      ${d.headline?`<div class="piece-headline">${esc(d.headline)}</div>`:''}
      ${category}
      ${bodyHTML()}
      ${d.source?`<div class="piece-source"><strong>Fuente:</strong> ${esc(d.source)}</div>`:'<div class="piece-source pending"><strong>Fuente:</strong> pendiente</div>'}
      ${d.credit?`<div class="piece-credit">Imagen: ${esc(d.credit)}</div>`:''}
      <div class="piece-brand">Fábrica Chañar · pieza de producción</div>
    </div>
  </article>`;
}

function validate(){
  const d=state.data;
  if(!clean(d.title)){setStatus('Falta el título.');return false}
  const text=state.type==='guide'?clean(d.intro)||clean(d.items):clean(d.body)||clean(d.headline);
  if(!text){setStatus('Falta contenido.');return false}
  return true;
}
function setStatus(msg){$('#status').textContent=msg||''}

function save(){
  if(!validate())return;
  const item={id:'pieza-'+Date.now(),type:state.type,data:{...state.data},image:state.image,created:new Date().toISOString()};
  setLibrary([item,...library()]);setStatus('Pieza guardada en la biblioteca local.');
}
function openLibrary(){
  const arr=library();
  $('#libraryList').innerHTML=arr.length?arr.map(x=>`<div class="library-card"><div><strong>${esc(x.data?.title||PRODUCTS[x.type]?.name)}</strong><small>${esc(PRODUCTS[x.type]?.name||x.type)} · ${new Date(x.created).toLocaleDateString('es-AR')}</small></div><div class="library-buttons"><button data-open="${x.id}">Abrir</button><button data-delete="${x.id}">Eliminar</button></div></div>`).join(''):'<p class="empty">Todavía no guardaste ninguna pieza.</p>';
  $('#libraryPanel').classList.remove('hidden');
  $('#libraryList').querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>{const x=library().find(y=>y.id===b.dataset.open);if(!x)return;state={type:x.type,data:x.data||{},image:x.image||null};renderProducts();renderForm();renderPreview();$('#libraryPanel').classList.add('hidden');setStatus('Pieza abierta.')});
  $('#libraryList').querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>{setLibrary(library().filter(x=>x.id!==b.dataset.delete));openLibrary()});
}
async function exportImage(kind){
  if(!validate())return;
  if(typeof html2canvas!=='function'){setStatus('No está disponible el motor de exportación.');return}
  const canvas=await html2canvas($('#canvasPreview'),{scale:2,useCORS:true,backgroundColor:'#f4f0e7'});
  const a=document.createElement('a');a.download=`fabrica-chanar-${Date.now()}.${kind}`;a.href=canvas.toDataURL(kind==='jpg'?'image/jpeg':'image/png',.94);a.click();setStatus(`Pieza exportada como ${kind.toUpperCase()}.`)
}

$('#btnGenerate').onclick=()=>{if(validate()){renderPreview();setStatus('Pieza generada. Revisala antes de guardar o entregar.')}};
$('#btnSave').onclick=save;
$('#btnPng').onclick=()=>exportImage('png');
$('#btnJpg').onclick=()=>exportImage('jpg');
$('#btnPrint').onclick=()=>{if(validate())window.print()};
$('#btnLibrary').onclick=openLibrary;
$('#btnCloseLibrary').onclick=()=>$('#libraryPanel').classList.add('hidden');

renderProducts();renderForm();renderPreview();updateLibraryCount();
