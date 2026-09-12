/* FÁBRICA CHAÑAR — CONTRATO VISUAL DE LAS 4 PLANTILLAS v1
   No crea productos. Solo aplica la identidad visual del producto elegido
   y añade la estructura mínima que cada familia necesita.
*/
(function(){
  const PRODUCTS=['postal','ficha','guide','infographic'];
  const $=s=>document.querySelector(s);
  function product(){return typeof state!=='undefined'?(state.centralProduct||state.type||'postal'):'postal'}
  function apply(){
    const box=$('#canvasPreview'),front=box?.querySelector('.master-front');if(!box||!front)return;
    const p=PRODUCTS.includes(product())?product():'postal';
    box.classList.remove(...PRODUCTS.map(x=>'master-product-'+x));box.classList.add('master-product-'+p);
    front.dataset.productTemplate=p;
    let stamp=front.querySelector('.product-template-stamp');
    if(!stamp){stamp=document.createElement('span');stamp.className='product-template-stamp';front.appendChild(stamp)}
    const labels={postal:'POSTAL · RECUERDO VISUAL',ficha:'FICHA · DOCUMENTO LOCAL',guide:'GUÍA · PARA RECORRER',infographic:'INFOGRAFÍA · PARA ENTENDER'};
    stamp.textContent=labels[p];
    state.factoryMeta={...(state.factoryMeta||{}),productTemplate:{version:1,id:p,label:labels[p],contract:'cerrado'}};
  }
  function boot(){['fabrica:ready','fabrica:working','fabrica:masters-ready','fabrica:series-ready'].forEach(ev=>document.addEventListener(ev,()=>setTimeout(apply,120)));document.getElementById('centralProduce')?.addEventListener('click',()=>setTimeout(apply,500));document.getElementById('btnGenerate')?.addEventListener('click',()=>setTimeout(apply,220));setTimeout(apply,1200)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaProductTemplate={version:1,apply,products:PRODUCTS};
})();
