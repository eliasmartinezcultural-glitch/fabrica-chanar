/* FÁBRICA CHAÑAR — CATÁLOGO CERRADO v2
   CONTRATO DE PRODUCCIÓN
   4 plantillas base · 10 opciones fotográficas por producto · 40 matrices.
   El catálogo es FINITO. No se agregan familias ni variantes sin decisión explícita.
   Cada opción define foto, dirección y forma de realización para su producto.
*/
(function(){
  const PRODUCTS={
    postal:{template:'postal',name:'Postal',question:'¿La veo y quiero tenerla?',defaultFormat:'print'},
    ficha:{template:'ficha',name:'Ficha cultural',question:'¿Aprendo algo que antes no sabía?',defaultFormat:'print'},
    guide:{template:'guide',name:'Guía breve',question:'¿Esto realmente me sirve para recorrer Chañar?',defaultFormat:'print'},
    infographic:{template:'infographic',name:'Infografía',question:'¿Entiendo una relación local en pocos segundos?',defaultFormat:'vertical'}
  };
  const PHOTO={
    ingreso:'mp-puerta-chanar',malma1:'mp-vinedos-estepa',malma2:'mp-vinedos-estepa',schroeder:'mp-vinedos-estepa',
    vendimia1:'mp-tiempo-cosecha',vendimia2:'mp-tiempo-cosecha',malma3:'mp-tiempo-cosecha',
    pelon:'mp-fiestas-raices',patritti:'mp-vinedos-estepa',chical:'mp-pequenas-historias'
  };
  const BASE={
    postal:[
      ['ingreso','llegada · identidad territorial','foto protagonista · título de destino · fecha breve · sello'],
      ['malma2','hileras · estepa · profundidad','líneas de fuga · título corto · dato · sello'],
      ['malma1','acceso · paisaje productivo','umbral visual · título · lugar · dato · sello'],
      ['schroeder','arquitectura · oficio · vino','detalle arquitectónico · título · microdato · sello'],
      ['vendimia1','manos · racimos · acción','acción humana · título · dato · sello'],
      ['vendimia2','vendimia · paisaje · trabajo','escena amplia · título · dato · sello'],
      ['malma3','cosecha · movimiento · detalle','gesto/acción · título · microdato · sello'],
      ['pelon','persona · encuentro · raíces','una escena humana · título · identidad · sello'],
      ['patritti','bodega · oficio · detalle','detalle material · título · dato · sello'],
      ['chical','cultura · espacio · contemporaneidad','espacio protagonista · título · microhistoria · sello']
    ],
    ficha:[
      ['chical','qué es · cultura · lugar','qué es → dónde → historia → dato → procedencia'],
      ['malma1','bodega · producción · ubicación','qué es → dónde → contexto → dato → fuente'],
      ['malma2','paisaje productivo · viñedos','qué vemos → dónde → por qué importa → dato'],
      ['schroeder','arquitectura · oficio · vino','qué es → rasgo → contexto → fuente'],
      ['patritti','producción · memoria empresarial','qué es → dónde → historia → dato'],
      ['vendimia1','trabajo · vendimia · personas','qué ocurre → quiénes → contexto → fuente'],
      ['vendimia2','paisaje · producción · temporada','qué vemos → cuándo → contexto → dato'],
      ['malma3','cosecha · proceso · detalle','qué ocurre → por qué importa → fuente'],
      ['pelon','fiesta · raíces productivas','qué es → quiénes → sentido → fuente'],
      ['ingreso','identidad · acceso · localidad','qué es → dónde → cuándo → dato']
    ],
    guide:[
      ['ingreso','entrada · orientación territorial','ENTRADA → qué mirar primero → punto de partida'],
      ['malma2','viñedos · paisaje · profundidad','HITO 01 → líneas del paisaje → qué observar'],
      ['malma1','bodega · acceso · producción','HITO 02 → bodega → verificar visita/horarios'],
      ['schroeder','arquitectura · vino · recorrido','HITO 03 → espacio → detalle de oficio'],
      ['vendimia1','trabajo · vendimia · temporada','HITO 04 → manos → proceso productivo'],
      ['vendimia2','paisaje · cosecha · estación','HITO 05 → paisaje → temporada'],
      ['malma3','cosecha · movimiento · trabajo','HITO 06 → acción → detalle'],
      ['pelon','fiesta · comunidad · raíces','HITO 07 → comunidad → expresión cultural'],
      ['patritti','bodega · oficio · memoria','HITO 08 → oficio → arquitectura'],
      ['chical','cultura · vino · contemporaneidad','HITO 09 → espacio cultural → actualidad']
    ],
    infographic:[
      ['ingreso','IDEA · identidad · llegada','IDEA → lugar → dato central → evidencia → fuente'],
      ['malma2','RELACIÓN · oasis + estepa','OASIS ↔ ESTEPA → contraste → evidencia → fuente'],
      ['malma1','RELACIÓN · producción + paisaje','PRODUCCIÓN ↔ TERRITORIO → dato → fuente'],
      ['schroeder','RELACIÓN · arquitectura + vino','ESPACIO ↔ OFICIO → evidencia → fuente'],
      ['vendimia1','RELACIÓN · trabajo + cosecha','MANOS ↔ PRODUCCIÓN → dato → fuente'],
      ['vendimia2','RELACIÓN · temporada + paisaje','ESTACIÓN ↔ TERRITORIO → evidencia → fuente'],
      ['malma3','RELACIÓN · proceso + producto','COSECHA ↔ VINO → secuencia → fuente'],
      ['pelon','RELACIÓN · fiesta + ruralidad','FIESTA ↔ RAÍCES → evidencia → fuente'],
      ['patritti','RELACIÓN · bodega + oficio','OFICIO ↔ LUGAR → dato → fuente'],
      ['chical','RELACIÓN · vino + cultura','VINO ↔ CULTURA → evidencia → fuente']
    ]
  };
  function make(product,rows){return rows.map((r,i)=>({slot:i+1,product,photo:r[0],master:PHOTO[r[0]],direction:r[1],execution:r[2]}));}
  const catalog={};
  Object.keys(PRODUCTS).forEach(p=>catalog[p]=make(p,BASE[p]));
  function forProduct(product){return catalog[product]||[]}
  function get(product,slot){const list=forProduct(product);if(!list.length)return null;return list[Math.min(list.length-1,Math.max(1,Number(slot||1))-1)]||null}
  function summary(){return {products:4,photosPerProduct:10,totalMatrices:40,closed:true,uniquePhotos:10,rule:'4 plantillas base · 10 opciones fotográficas por producto · 40 matrices cerradas'}}
  window.FabricaClosedCatalog={version:2,products:PRODUCTS,photos:Object.keys(PHOTO).map(id=>({id,master:PHOTO[id]})),catalog,forProduct,get,summary};
})();
