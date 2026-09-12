/* FÁBRICA CHAÑAR — REALIZACIÓN EDITORIAL CERRADA v1
   4 productos · 10 matrices por producto · 40 realizaciones.
   Este archivo no agrega productos ni fotos: convierte cada slot cerrado
   en una decisión editorial concreta. Los hechos provienen de las maestras.
*/
(function(){
  const M=()=>window.FabricaMasterProducts?.products||[];
  const byPhoto=id=>M().find(x=>x.photo===id)||M()[0];
  const C={
    postal:[
      ['Llegar también es parte del lugar','San Patricio del Chañar','La llegada, el paisaje y una fecha para guardar.'],
      ['Donde el vino encuentra la estepa','Viñedos y estepa','Oasis productivo y paisaje patagónico en una sola mirada.'],
      ['Una puerta hacia el valle','San Patricio del Chañar','Una imagen de acceso convertida en recuerdo territorial.'],
      ['El oficio también construye paisaje','Vino y territorio','Arquitectura, producción y memoria material.'],
      ['Tiempo de cosecha','Vendimia Neuquina','Manos, racimos y trabajo: la escena productiva en movimiento.'],
      ['Cuando llega la vendimia','Vino y paisaje','Una temporada se reconoce también por su paisaje.'],
      ['La cosecha, de cerca','Trabajo rural','Un gesto concreto cuenta más que una explicación larga.'],
      ['Fiestas y raíces','San Patricio del Chañar','Producción, vida rural y encuentro comunitario.'],
      ['El vino también tiene arquitectura','Bodegas del Chañar','Un detalle de oficio puede convertirse en memoria.'],
      ['Una pequeña historia contemporánea','El Chical','Vino, cultura y territorio en una escena actual.']
    ],
    ficha:[
      ['Bodega El Chical','Cultura y turismo','Una bodega urbana que suma una propuesta cultural y turística a la escena vitivinícola local.'],
      ['Un paisaje productivo','Vino y territorio','Las hileras de viñedos permiten leer el oasis productivo dentro del paisaje patagónico.'],
      ['Viñedos y estepa','Territorio','El contraste entre producción y estepa es parte de la identidad visual del lugar.'],
      ['Arquitectura del vino','Oficio','Una construcción también puede contar cómo una actividad productiva ocupa el territorio.'],
      ['Una bodega, una historia','Producción','El espacio productivo funciona también como memoria de una actividad local.'],
      ['El trabajo de la vendimia','Trabajo rural','La cosecha pone en primer plano personas, herramientas y una temporada concreta.'],
      ['Paisaje de temporada','Producción','La vendimia transforma temporalmente la escena productiva.'],
      ['El gesto de cosechar','Trabajo','Un detalle de la acción permite mirar el proceso antes de hablar del resultado.'],
      ['Fiesta y raíces productivas','Cultura popular','La Fiesta del Pelón conecta producción, trabajador rural y comunidad.'],
      ['La entrada como identidad','Localidad','Un acceso puede funcionar como signo de pertenencia y reconocimiento territorial.']
    ],
    guide:[
      ['Empezar por la llegada','Punto de partida','Comenzá por reconocer el territorio antes de buscar un atractivo aislado.'],
      ['Mirar las líneas del paisaje','Viñedos y estepa','Observá cómo las hileras organizan la mirada y aparecen frente a la estepa.'],
      ['Reconocer el paisaje productivo','Bodegas','Antes de planificar una visita, verificá condiciones, horarios y accesos actuales.'],
      ['Leer la arquitectura','Oficio y vino','Mirá cómo los espacios productivos construyen identidad además de cumplir una función.'],
      ['Seguir la temporada','Vendimia','La cosecha permite observar el trabajo y la producción en un momento concreto.'],
      ['Mirar el paisaje en movimiento','Vendimia','La estación modifica colores, actividad y presencia humana en el territorio.'],
      ['Acercarse al trabajo','Cosecha','Una herramienta, una mano o un racimo pueden revelar cómo ocurre el proceso.'],
      ['Encontrar la comunidad','Fiestas y raíces','Las celebraciones permiten mirar producción, cultura y encuentro como una misma escena.'],
      ['Descubrir el oficio','Bodegas','Arquitectura, materiales y trabajo ayudan a leer una bodega más allá del vino.'],
      ['Buscar cultura contemporánea','El Chical','Una propuesta actual puede ser otra puerta para conocer el territorio.']
    ],
    infographic:[
      ['Una llegada también comunica','IDENTIDAD','LUGAR → RECONOCIMIENTO → MEMORIA'],
      ['Oasis y estepa','TERRITORIO','AGUA + RIEGO + PRODUCCIÓN ↔ ESTEPA'],
      ['Producción y paisaje','TERRITORIO','VIÑEDOS → PAISAJE PRODUCTIVO → IDENTIDAD'],
      ['Espacio y oficio','ARQUITECTURA','LUGAR → TRABAJO → PRODUCCIÓN'],
      ['Manos y cosecha','TRABAJO','PERSONA → ACCIÓN → PRODUCCIÓN'],
      ['La temporada cambia la escena','TIEMPO','ESTACIÓN → TRABAJO → PAISAJE'],
      ['De la cosecha al vino','PROCESO','COSECHA → TRANSFORMACIÓN → PRODUCTO'],
      ['Fiesta y ruralidad','RAÍCES','PRODUCCIÓN ↔ COMUNIDAD ↔ CULTURA'],
      ['La bodega como lugar','OFICIO','ARQUITECTURA ↔ TRABAJO ↔ IDENTIDAD'],
      ['Vino y cultura','CULTURA','PRODUCCIÓN ↔ EXPERIENCIA ↔ TERRITORIO']
    ]
  };
  const catalog=()=>window.FabricaClosedCatalog?.catalog||{};
  const realizations={};
  Object.keys(C).forEach(product=>{
    realizations[product]=C[product].map((x,i)=>{
      const slot=catalog()[product]?.[i];
      const master=byPhoto(slot?.photo);
      return {slot:i+1,product,photo:slot?.photo||null,master:slot?.master||master?.id||null,direction:slot?.direction||'',execution:slot?.execution||'',headline:x[0],subline:x[1],body:x[2],fact:master?.fact||'',factLabel:master?.factLabel||'DATO LOCAL',source:master?.source||'',sourceUrl:master?.sourceUrl||'',photoSource:master?.photoSource||'',photoUrl:master?.photoUrl||'',rights:master?.rights||'reference',photoAuthor:master?.photoAuthor||'',photoLicense:master?.photoLicense||'',reverse:master?.body||x[2],status:master?.rights==='reference'?'PROTOTIPO · RESOLVER DERECHOS':'APTO PARA PROTOTIPO Y USO SEGÚN LICENCIA'};
    });
  });
  function get(product,slot){return realizations[product]?.[Math.max(1,Number(slot||1))-1]||null}
  function summary(){return {products:4,perProduct:10,total:40,closed:true,editorialRealizations:true,rightsSeparated:true}}
  window.FabricaEditorialRealizations={version:1,realizations,get,summary};
})();
