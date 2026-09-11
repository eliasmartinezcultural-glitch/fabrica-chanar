/* FÁBRICA CHAÑAR — CATÁLOGO CERRADO v1
   Objetivo de esta etapa:
   4 productos base · 10 opciones fotográficas por producto · 40 matrices.
   No crear familias, productos ni variantes fuera de este catálogo sin decisión explícita.
*/
(function(){
  const PRODUCTS={
    postal:{template:'postal',name:'Postal',question:'¿La veo y quiero tenerla?',defaultFormat:'print'},
    ficha:{template:'ficha',name:'Ficha cultural',question:'¿Aprendo algo que antes no sabía?',defaultFormat:'print'},
    guide:{template:'guide',name:'Guía breve',question:'¿Esto realmente me sirve para recorrer Chañar?',defaultFormat:'print'},
    infographic:{template:'infographic',name:'Infografía',question:'¿Entiendo una relación local en pocos segundos?',defaultFormat:'vertical'}
  };
  const PHOTOS=[
    {id:'ingreso',direction:'llegada · identidad territorial',master:'mp-puerta-chanar'},
    {id:'malma1',direction:'acceso · paisaje productivo',master:'mp-vinedos-estepa'},
    {id:'malma2',direction:'hileras · estepa · profundidad',master:'mp-vinedos-estepa'},
    {id:'schroeder',direction:'oficio · arquitectura · vino',master:'mp-vinedos-estepa'},
    {id:'vendimia1',direction:'manos · racimos · acción',master:'mp-tiempo-cosecha'},
    {id:'vendimia2',direction:'vendimia · paisaje · trabajo',master:'mp-tiempo-cosecha'},
    {id:'malma3',direction:'cosecha · movimiento · detalle',master:'mp-tiempo-cosecha'},
    {id:'pelon',direction:'persona · encuentro · raíces',master:'mp-fiestas-raices'},
    {id:'patritti',direction:'bodega · oficio · detalle',master:'mp-vinedos-estepa'},
    {id:'chical',direction:'cultura · espacio · contemporaneidad',master:'mp-pequenas-historias'}
  ];
  const EXECUTION={
    postal:{image:'protagonista 60% · aire · título · dato · sello',reverse:'mini historia · dato · procedencia · crédito'},
    ficha:{image:'documental · contexto · ficha editorial · lugar · dato',reverse:'contexto · fuente · procedencia · crédito'},
    guide:{image:'apertura · recorrido numerado · hitos · cierre',reverse:'fuentes · fecha · actualidad · procedencia'},
    infographic:{image:'idea · dato central · relación visual · evidencia · fuente',reverse:'metodología · fuente · fecha'}
  };
  const catalog=Object.fromEntries(Object.keys(PRODUCTS).map(product=>[product,PHOTOS.map((p,i)=>({slot:i+1,product,photo:p.id,master:p.master,direction:p.direction,execution:EXECUTION[product]}))]));
  function forProduct(product){return catalog[product]||[]}
  function get(product,slot){const list=forProduct(product);return list[(Math.max(1,Number(slot||1))-1)%list.length]||null}
  function summary(){return {products:Object.keys(PRODUCTS).length,photosPerProduct:PHOTOS.length,totalMatrices:Object.keys(PRODUCTS).length*PHOTOS.length,closed:true,rule:'4 plantillas base · 10 fotos por producto · 40 matrices cerradas'}}
  window.FabricaClosedCatalog={version:1,products:PRODUCTS,photos:PHOTOS,catalog,execution:EXECUTION,forProduct,get,summary};
})();
