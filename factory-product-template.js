/* FÁBRICA CHAÑAR — CONTRATO VISUAL DE LAS 4 PLANTILLAS v2
   Cuatro familias cerradas. Cada una tiene una función visual distinta.
*/
(function(){
  const PRODUCTS=['postal','ficha','guide','infographic'];
  const $=s=>document.querySelector(s);
  function product(){return typeof state!=='undefined'?(state.centralProduct||state.type||'postal'):'postal'}
  function slotData(p){const m=typeof state!=='undefined'?(state.factoryMeta||{}):{};const slot=m.closedCatalog?.[p]?.slot||1;return window.FabricaClosedCatalog?.get?.(p,slot)||null}
  function apply(){
    const box=$('#canvasPreview'),front=box?.querySelector('.master-front');if(!box||!front)return;
    const p=PRODUCTS.includes(product())?product():'postal',slot=slotData(p);
    box.classList.remove(...PRODUCTS.map(x=>'master-product-'+x));box.classList.add('master-product-'+p);front.dataset.productTemplate=p;
    let stamp=front.querySelector('.product-template-stamp');if(!stamp){stamp=document.createElement('span');stamp.className='product-template-stamp';front.appendChild(stamp)}
    const labels={postal:'POSTAL · RECUERDO VISUAL',ficha:'FICHA · DOCUMENTO LOCAL',guide:'GUÍA · PARA RECORRER',infographic:'INFOGRAFÍA · PARA ENTENDER'};stamp.textContent=labels[p];
    front.querySelector('.product-template-structure')?.remove();
    const structure=document.createElement('div');structure.className='product-template-structure';
    const data=slot?.direction||'';
    if(p==='postal')structure.innerHTML='<span>FOTO</span><b>TÍTULO</b><i>DATO</i>';
    if(p==='ficha')structure.innerHTML='<span>QUÉ ES</span><b>DÓNDE</b><i>DATO · FUENTE</i>';
    if(p==='guide')structure.innerHTML='<span>01 ENTRADA</span><b>02 HITO</b><i>03 DESCUBRIMIENTO</i>';
    if(p==='infographic')structure.innerHTML='<span>IDEA</span><b>↔ DATO</b><i>EVIDENCIA · FUENTE</i>';
    structure.setAttribute('aria-label',data);front.appendChild(structure);
    if(typeof state!=='undefined')state.factoryMeta={...(state.factoryMeta||{}),productTemplate:{version:2,id:p,label:labels[p],contract:'cerrado',slot:slot?.slot||1,direction:data,execution:slot?.execution||''}};
  }
  function boot(){['fabrica:ready','fabrica:working','fabrica:masters-ready','fabrica:series-ready'].forEach(ev=>document.addEventListener(ev,()=>setTimeout(apply,120)));document.getElementById('centralProduce')?.addEventListener('click',()=>setTimeout(apply,500));document.getElementById('btnGenerate')?.addEventListener('click',()=>setTimeout(apply,220));setTimeout(apply,1200)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaProductTemplate={version:2,apply,products:PRODUCTS};
})();
