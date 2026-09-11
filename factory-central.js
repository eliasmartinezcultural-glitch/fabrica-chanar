/* FÁBRICA CHAÑAR — NÚCLEO CENTRAL v1
   Regla: elegir producto → la Fábrica decide → previsualizar → guardar.
   Todo lo demás queda detrás de "Más opciones".
*/
(function(){
  const PRODUCTS={
    postal:{icon:'▣',name:'Postal',desc:'Una pieza para guardar, regalar o compartir.',hint:'Imagen protagonista + título + dato breve'},
    ficha:{icon:'▤',name:'Ficha cultural',desc:'Una pieza documental sobre un lugar, historia u objeto.',hint:'Imagen + contexto + dato + procedencia'},
    guide:{icon:'⌁',name:'Guía breve',desc:'Una pieza útil para recorrer, conocer o recomendar.',hint:'Apertura + recorrido + puntos clave'},
    infographic:{icon:'◈',name:'Infografía',desc:'Una pieza visual para entender una idea local.',hint:'Dato + jerarquía + síntesis territorial'}
  };
  const FORMATS={
    vertical:{name:'Vertical',size:'1080 × 1350',ratio:'4:5'},
    square:{name:'Cuadrada',size:'1200 × 1200',ratio:'1:1'},
    horizontal:{name:'Horizontal',size:'1600 × 1000',ratio:'8:5'},
    print:{name:'Impresión',size:'A5 · 148 × 210 mm',ratio:'A5'}
  };
  let active='postal';
  let format='vertical';
  const $=s=>document.querySelector(s);
  function productHTML(){return Object.entries(PRODUCTS).map(([id,p])=>`<button class="central-product ${id===active?'is-active':''}" data-product="${id}" type="button"><span class="central-product-icon">${p.icon}</span><span class="central-product-copy"><strong>${p.name}</strong><small>${p.desc}</small><em>${p.hint}</em></span><span class="central-check">✓</span></button>`).join('')}
  function render(){
    const controls=$('.controls');if(!controls)return;
    const old=controls.querySelector('.central-shell');if(old)old.remove();
    const shell=document.createElement('section');shell.className='central-shell';
    shell.innerHTML=`
      <div class="central-intro"><span class="central-kicker">NÚCLEO DE PRODUCCIÓN</span><h2>¿Qué querés fabricar?</h2><p>Elegí solamente el tipo de pieza. La Fábrica se ocupa de imagen, texto, composición, color, datos, sello y reverso.</p></div>
      <div class="central-products">${productHTML()}</div>
      <div class="central-action-row"><button id="centralProduce" class="central-produce" type="button">✦ Fabricar ${PRODUCTS[active].name}</button><span id="centralStatus" class="central-mini">Una decisión. Todo lo demás automático.</span></div>
      <details class="central-options"><summary>⚙ Más opciones</summary>
        <div class="central-option-grid">
          <label>Formato<select id="centralFormat">${Object.entries(FORMATS).map(([id,f])=>`<option value="${id}" ${id===format?'selected':''}>${f.name} · ${f.size}</option>`).join('')}</select></label>
          <div><span class="central-label">Dirección visual</span><div class="central-auto">Automática · según producto, tema y foto</div></div>
          <div><span class="central-label">Curaduría</span><div class="central-auto">Automática · selección local + fuentes + jerarquía</div></div>
          <div><span class="central-label">Salida</span><div class="central-auto">PNG · JPG · PDF / impresión</div></div>
        </div>
      </details>
      <details class="central-series"><summary>🍇 Fabricar una serie</summary><div class="central-series-body"><p>Elegí un tema y la Fábrica arma hasta 5 piezas coherentes.</p><div id="centralCollections"></div></div></details>`;
    const first=controls.querySelector('.step');if(first)first.before(shell);else controls.prepend(shell);
    // Hide legacy manual controls; they remain available only through the central options if needed later.
    ['#productGrid','#templateGrid','#editorForm','.actions','#collectionStudio'].forEach(sel=>{const el=controls.querySelector(sel);if(el)el.classList.add('central-legacy-hidden')});
    bind(shell); renderCollections(shell);
  }
  function setActive(id){active=id;document.querySelectorAll('.central-product').forEach(b=>b.classList.toggle('is-active',b.dataset.product===id));const b=$('#centralProduce');if(b)b.textContent='✦ Fabricar '+PRODUCTS[id].name;}
  async function produce(){
    const b=$('#centralProduce'),s=$('#centralStatus');if(b)b.disabled=true;if(s)s.textContent='La Fábrica está trabajando…';
    try{
      if(typeof window.FabricaEngine?.produce==='function'){
        const result=await window.FabricaEngine.produce({type:active});
        if(result?.ok){state.centralProduct=active;state.centralFormat=format;state.factoryMeta={...(state.factoryMeta||{}),format,formatSpec:FORMATS[format],centralFlow:true};if(typeof renderPreview==='function')renderPreview();if(typeof window.FabricaMasterVisuals?.apply==='function')window.FabricaMasterVisuals.apply();if(s)s.textContent='Lista ✨ Revisá, guardá o fabricá otra.';}
        else if(s)s.textContent='La Fábrica necesita una plantilla válida para este producto.';
      }else if(s)s.textContent='El motor todavía no terminó de cargar.';
    }catch(err){console.error(err);if(s)s.textContent='Hubo un problema de fabricación. La Fábrica quedó protegida.';}
    if(b)b.disabled=false;
  }
  function bind(shell){
    shell.querySelectorAll('.central-product').forEach(b=>b.addEventListener('click',()=>{setActive(b.dataset.product);produce()}));
    shell.querySelector('#centralProduce')?.addEventListener('click',produce);
    shell.querySelector('#centralFormat')?.addEventListener('change',e=>{format=e.target.value;if(typeof state!=='undefined'){state.centralFormat=format;state.factoryMeta={...(state.factoryMeta||{}),format,formatSpec:FORMATS[format]};if(typeof renderPreview==='function')renderPreview();}});
  }
  function renderCollections(shell){
    const el=shell.querySelector('#centralCollections');if(!el)return;
    const cols=[['recuerdito','Un recuerdito de Chañar'],['territorio','Pedacitos de territorio'],['vino','Vino y paisaje'],['raices','Fiestas y raíces'],['cultura','Pequeñas historias']];
    el.innerHTML=cols.map(([id,name])=>`<button type="button" class="central-collection" data-collection="${id}"><strong>${name}</strong><small>Hasta 5 piezas · curaduría automática</small></button>`).join('');
    el.querySelectorAll('button').forEach(b=>b.addEventListener('click',async()=>{const s=$('#centralStatus');if(s)s.textContent='Fabricando una pequeña serie…';try{await window.FabricaCollection?.produceSeries?.(b.dataset.collection,3);if(s)s.textContent='Serie lista ✨ Revisá la Biblioteca.';}catch(e){console.error(e);if(s)s.textContent='La serie no pudo completarse.';}}));
  }
  function boot(){
    if(document.body.dataset.centralFactory)return;document.body.dataset.centralFactory='1';
    setTimeout(()=>{render();setTimeout(()=>{if(typeof renderPreview==='function')renderPreview();},80)},450);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaCentral={version:1,products:PRODUCTS,formats:FORMATS,produce,setActive};
})();
