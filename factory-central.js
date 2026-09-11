/* FÁBRICA CHAÑAR — NÚCLEO CENTRAL v5
   Una sola mecánica visible: elegir producto → fabricar → revisar.
   Los motores antiguos siguen disponibles internamente, pero nunca compiten con este flujo.
*/
(function(){
  const PRODUCTS={
    postal:{icon:'▣',name:'Postal',desc:'Recuerdo visual, breve y coleccionable.',hint:'Imagen · emoción · dato · sello'},
    ficha:{icon:'▤',name:'Ficha cultural',desc:'Pieza documental sobre un lugar o historia.',hint:'Contexto · categoría · lugar'},
    guide:{icon:'⌁',name:'Guía breve',desc:'Pieza útil para recorrer y descubrir.',hint:'Apertura · recorrido · hitos'},
    infographic:{icon:'◈',name:'Infografía',desc:'Idea o dato local convertido en imagen.',hint:'Titular · dato · síntesis'}
  };
  const FORMATS={
    print:{name:'Impresión',size:'A5 · 148 × 210 mm'},
    vertical:{name:'Digital vertical',size:'1080 × 1350'},
    square:{name:'Cuadrada',size:'1200 × 1200'},
    horizontal:{name:'Horizontal',size:'1600 × 1000'}
  };
  let active='postal',format='auto';
  const $=s=>document.querySelector(s);
  function contract(id){return window.FabricaEngine?.contracts?.[id]||{identity:'pieza editorial',defaultFormat:'print',formats:['print']};}
  function productHTML(){
    return Object.entries(PRODUCTS).map(([id,p])=>{
      const c=contract(id);
      const fmt=c.defaultFormat==='vertical'?'4:5':c.defaultFormat==='print'?'A5':'editorial';
      return `<button class="central-product ${id===active?'is-active':''}" data-product="${id}" type="button" aria-pressed="${id===active}">
        <span class="central-product-icon">${p.icon}</span>
        <span class="central-product-copy"><strong>${p.name}</strong><small>${p.desc}</small><em>${p.hint}</em><i>${fmt}</i></span>
        <span class="central-check">✓</span>
      </button>`;
    }).join('');
  }
  function formatOptions(){
    const allowed=contract(active).formats||Object.keys(FORMATS);
    return `<option value="auto">Automático · recomendado</option>${allowed.map(id=>{
      const f=FORMATS[id];return f?`<option value="${id}">${f.name} · ${f.size}</option>`:'';
    }).join('')}`;
  }
  function render(){
    const controls=$('.controls');if(!controls)return;
    controls.querySelector('.central-shell')?.remove();
    const shell=document.createElement('section');
    shell.className='central-shell';
    shell.innerHTML=`
      <div class="central-intro"><span class="central-kicker">NÚCLEO DE PRODUCCIÓN</span><h2>¿Qué querés fabricar?</h2><p>Elegí una pieza. La Fábrica resuelve contenido, imagen, composición, color, textura, dato, reverso, procedencia y salida.</p></div>
      <div class="central-products">${productHTML()}</div>
      <div class="central-selected" id="centralSelected"></div>
      <div class="central-action-row"><button id="centralProduce" class="central-produce" type="button">✦ Fabricar ${PRODUCTS[active].name}</button><span id="centralStatus" class="central-mini">Elegí un producto y fabricá.</span></div>
      <details class="central-options"><summary>⚙ Más opciones</summary><div class="central-option-grid">
        <label>Formato<select id="centralFormat">${formatOptions()}</select></label>
        <div><span class="central-label">Dirección visual</span><div class="central-auto">Automática según producto + tema + imagen</div></div>
        <div><span class="central-label">Curaduría</span><div class="central-auto">Local · documental · fuentes · derechos</div></div>
        <div><span class="central-label">Salida</span><div class="central-auto">PNG · JPG · PDF / impresión</div></div>
      </div></details>
      <details class="central-series"><summary>🍇 Fabricar una serie</summary><div class="central-series-body"><p>Series pequeñas, coherentes y guardadas automáticamente.</p><div id="centralCollections"></div></div></details>`;
    controls.prepend(shell);
    ['#productGrid','#templateGrid','#editorForm','.actions','#collectionStudio','.step','#status'].forEach(sel=>controls.querySelectorAll(sel).forEach(el=>el.classList.add('central-legacy-hidden')));
    bind(shell);updateSelected(shell);renderCollections(shell);
  }
  function updateSelected(shell){
    const el=shell?.querySelector('#centralSelected');if(!el)return;
    const c=contract(active);
    el.innerHTML=`<span class="central-selected-name">${PRODUCTS[active].name}</span><span class="central-selected-copy"><b>${c.identity||'pieza editorial'}</b><small>${c.layout||'Dirección editorial automática'}</small></span>`;
  }
  function setActive(id){
    if(!PRODUCTS[id])return;
    active=id;format='auto';
    document.querySelectorAll('.central-product').forEach(b=>{const on=b.dataset.product===id;b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',String(on));});
    const b=$('#centralProduce');if(b)b.textContent='✦ Fabricar '+PRODUCTS[id].name;
    const select=$('#centralFormat');if(select)select.innerHTML=formatOptions();
    updateSelected(document.querySelector('.central-shell'));
  }
  async function produce(){
    const b=$('#centralProduce'),s=$('#centralStatus');
    if(b)b.disabled=true;if(s)s.textContent='La Fábrica está trabajando…';
    try{
      const allowed=contract(active).formats||[];
      const requested=format==='auto'||!allowed.includes(format)?undefined:format;
      const result=await window.FabricaEngine?.produce?.({type:active,format:requested});
      if(result?.ok){
        if(typeof state!=='undefined'){
          state.centralProduct=active;
          state.centralFormat=result.contract?.defaultFormat||requested||'print';
        }
        document.getElementById('btnSave')?.click();
        if(s)s.textContent='Lista y guardada ✨ Revisá, descargá o fabricá otra.';
        if(window.matchMedia?.('(max-width:760px)').matches) document.querySelector('.preview-panel')?.scrollIntoView({behavior:'smooth',block:'start'});
      }else if(s)s.textContent='No se pudo fabricar una pieza válida.';
    }catch(err){console.error(err);if(s)s.textContent='Hubo un problema. No se guardó una pieza incompleta.'}
    if(b)b.disabled=false;
  }
  function bind(shell){
    shell.querySelectorAll('.central-product').forEach(b=>b.addEventListener('click',()=>setActive(b.dataset.product)));
    shell.querySelector('#centralProduce')?.addEventListener('click',produce);
    shell.querySelector('#centralFormat')?.addEventListener('change',e=>{
      format=e.target.value;
      if(typeof state!=='undefined')state.centralFormat=format;
    });
  }
  function renderCollections(shell){
    const el=shell?.querySelector('#centralCollections');if(!el)return;
    const cols=[['recuerdito','Un recuerdito de Chañar'],['territorio','Pedacitos de territorio'],['vino','Vino y paisaje'],['raices','Fiestas y raíces'],['cultura','Pequeñas historias']];
    el.innerHTML=cols.map(([id,name])=>`<button type="button" class="central-collection" data-collection="${id}"><strong>${name}</strong><small>3 piezas · misma curaduría · guardado automático</small></button>`).join('');
    el.querySelectorAll('button').forEach(b=>b.addEventListener('click',async()=>{
      const s=$('#centralStatus');if(s)s.textContent='Fabricando serie…';
      try{await window.FabricaCollection?.produceSeries?.(b.dataset.collection,3);if(s)s.textContent='Serie lista y guardada ✨';}
      catch(e){console.error(e);if(s)s.textContent='La serie no pudo completarse.';}
    }));
  }
  function boot(){
    if(document.body.dataset.centralFactory)return;
    document.body.dataset.centralFactory='1';
    setTimeout(()=>{render();setTimeout(()=>window.renderPreview?.(),100)},350);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaCentral={version:5,products:PRODUCTS,formats:FORMATS,produce,setActive};
})();
