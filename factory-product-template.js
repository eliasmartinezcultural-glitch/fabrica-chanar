/* FÁBRICA CHAÑAR — PLANTILLAS COMERCIALES CERRADAS v4
   CUATRO PRODUCTOS / UNA ÚNICA SUPERFICIE / SIN ELEMENTOS SOBREIMPRESOS
*/
(function(){
  const PRODUCTS=['postal','ficha','guide','infographic'];
  const $=s=>document.querySelector(s);
  function product(){return typeof state!=='undefined'?(state.centralProduct||state.type||'postal'):'postal'}
  function slotData(p){const m=typeof state!=='undefined'?(state.factoryMeta||{}):{};const slot=m.closedCatalog?.[p]?.slot||1;return window.FabricaClosedCatalog?.get?.(p,slot)||null}
  function clean(front){front?.querySelectorAll('.product-template-stamp,.product-template-structure,.master-badge,.master-seal,.master-mark,.master-stamp,.master-decoration').forEach(n=>n.remove())}
  function apply(){
    const box=$('#canvasPreview'),front=box?.querySelector('.master-front');if(!box||!front)return;
    const p=PRODUCTS.includes(product())?product():'postal',slot=slotData(p);
    box.classList.remove(...PRODUCTS.map(x=>'master-product-'+x));
    box.classList.add('master-product-'+p);
    front.dataset.productTemplate=p;
    clean(front);
    if(typeof state!=='undefined')state.factoryMeta={...(state.factoryMeta||{}),productTemplate:{version:4,locked:true,id:p,label:p,contract:'cerrado',slot:slot?.slot||1,direction:slot?.direction||'',execution:slot?.execution||'',decorations:false}};
  }
  function boot(){['fabrica:ready','fabrica:working','fabrica:masters-ready','fabrica:series-ready'].forEach(ev=>document.addEventListener(ev,()=>setTimeout(apply,120)));document.getElementById('centralProduce')?.addEventListener('click',()=>setTimeout(apply,500));document.getElementById('btnGenerate')?.addEventListener('click',()=>setTimeout(apply,220));setTimeout(apply,1200)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaProductTemplate={version:4,locked:true,apply,products:PRODUCTS};
})();
