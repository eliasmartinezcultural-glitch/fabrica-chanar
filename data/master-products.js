/* FÁBRICA CHAÑAR — PRODUCTOS MAESTROS v1
   Investigación editorial local: San Patricio del Chañar, Neuquén.
   Regla: el dato puede entrar a una pieza solo si tiene fuente identificable.
*/
const MASTER_PRODUCTS=[
  {
    id:'mp-puerta-chanar', number:1, collection:'recuerdito', template:'p-ingreso',
    name:'La puerta del Chañar', product:'postal', photo:'ingreso',
    promise:'Una pieza de bienvenida y pertenencia.',
    title:'San Patricio del Chañar', subtitle:'Una puerta al valle, al vino y a las historias del territorio.',
    body:'Una pequeña pieza para guardar la llegada, la identidad y el paisaje de San Patricio del Chañar.',
    fact:'San Patricio del Chañar integra el circuito vitivinícola de Neuquén y se encuentra vinculado a las rutas provinciales 7 y 151.',
    factLabel:'TERRITORIO',
    source:'Neuquén Informa · Ruta del Vino', sourceUrl:'https://www.neuqueninforma.gob.ar/noticias/2016/03/10/76876-la-ruta-del-vino-se-consolida-como-un-producto-turistico',
    photoSource:'Wikimedia Commons · archivo local', photoUrl:'https://commons.wikimedia.org/wiki/File:San_Patricio_del_Chañar.png', rights:'usable',
    collectionName:'Un recuerdito de Chañar', seal:'HECHO EN CHAÑAR', role:'bienvenida'
  },
  {
    id:'mp-vinedos-estepa', number:2, collection:'vino', template:'p-vinedos',
    name:'Viñedos y estepa', product:'postal', photo:'malma2',
    promise:'El paisaje productivo como recuerdo.',
    title:'Donde el vino encuentra la estepa', subtitle:'Viñedos, paisaje patagónico y agua de riego.',
    body:'Una mirada al contraste entre el oasis productivo y la estepa que rodea San Patricio del Chañar.',
    fact:'En 2024, autoridades locales señalaron una superficie de más de 1700 hectáreas de viñedos en la zona.',
    factLabel:'DATO REAL',
    source:'Neuquén Informa · circuito de bodegas y turismo', sourceUrl:'https://www.neuqueninforma.gob.ar/noticias/2024/10/21/246534-buscan-desarrollar-un-circuito-de-bodegas-gastronomia-y-hoteles',
    photoSource:'Neuquén Informa · Vendimia 2026', photoUrl:'https://www.neuqueninforma.gob.ar/noticias/2026/03/12/255578-vinos-musica-sinfonica-djs-y-arte-en-bodega-malma', rights:'reference',
    collectionName:'Vino y paisaje', seal:'MIRADA LOCAL', role:'paisaje'
  },
  {
    id:'mp-tiempo-cosecha', number:3, collection:'vino', template:'p-vendimia',
    name:'Tiempo de cosecha', product:'postal', photo:'vendimia1',
    promise:'La vendimia como escena de territorio.',
    title:'Tiempo de cosecha', subtitle:'El paisaje se llena de uvas, trabajo y encuentro.',
    body:'Una pieza sobre el momento en que producción, paisaje y cultura se encuentran en torno a la vendimia.',
    fact:'La Vendimia Neuquina 2026 reunió bodegas y emprendimientos vitivinícolas, entre ellos Familia Schroeder, Malma, Patritti, Aicardi y El Chical Patagónico de San Patricio del Chañar.',
    factLabel:'DATO REAL',
    source:'Neuquén Informa · El vino neuquino se posiciona con identidad propia', sourceUrl:'https://www.neuqueninforma.gob.ar/noticias/2026/05/08/257340-el-vino-neuquino-se-posiciona-con-identidad-propia',
    photoSource:'LM Neuquén · Vendimia', photoUrl:'https://www.lmneuquen.com/neuquen/san-patricio-del-chanar-celebro-el-exito-la-vendimia-neuquina-2025-n1180085', rights:'reference',
    collectionName:'Vino y paisaje', seal:'TIEMPO DE COSECHA', role:'vendimia'
  },
  {
    id:'mp-fiestas-raices', number:4, collection:'raices', template:'p-pelon',
    name:'Fiestas y raíces', product:'postal', photo:'pelon',
    promise:'Una pieza sobre producción, campo y comunidad.',
    title:'Fiestas y raíces', subtitle:'Producción, vida rural y encuentro.',
    body:'Una postal que reúne la dimensión productiva, rural y cultural de San Patricio del Chañar.',
    fact:'La Fiesta Provincial del Pelón es una celebración local vinculada a la producción, la cultura y las raíces rurales de San Patricio del Chañar.',
    factLabel:'IDENTIDAD',
    source:'Neuquén Informa · Fiesta del Pelón 2026', sourceUrl:'https://www.neuqueninforma.gob.ar/noticias/2026/02/10/255111-san-patricio-del-chanar-se-prepara-para-la-fiesta-del-pelon',
    photoSource:'Neuquén Informa · Fiesta Provincial del Pelón 2026', photoUrl:'https://www.neuqueninforma.gob.ar/noticias/2026/02/10/255111-san-patricio-del-chanar-se-prepara-para-la-fiesta-del-pelon', rights:'reference',
    collectionName:'Fiestas y raíces', seal:'RAÍCES LOCALES', role:'fiesta'
  },
  {
    id:'mp-pequenas-historias', number:5, collection:'cultura', template:'f-chical',
    name:'Pequeñas historias · El Chical', product:'ficha', photo:'chical',
    promise:'Una pequeña ficha documental que no parezca un formulario.',
    title:'Bodega El Chical', category:'Cultura y turismo',
    body:'Bodega urbana de San Patricio del Chañar que combina elaboración de vinos con una propuesta cultural y turística. El proyecto busca que el vino sea una excusa para generar encuentros, música y actividades para la comunidad.',
    location:'San Patricio del Chañar',
    fact:'El Chical fue inaugurado en 2026 como bodega urbana y espacio cultural de interés turístico. El nombre fue tomado de una referencia histórica sobre el origen de la palabra Chañar.',
    factLabel:'PEQUEÑA HISTORIA',
    source:'Neuquén Informa · El Chical 2026', sourceUrl:'https://www.neuqueninforma.gob.ar/noticias/2026/04/03/255930-el-chical-se-suma-a-la-oferta-vitivinicola-de-san-patricio-del-chanar',
    photoSource:'Neuquén Informa · El Chical 2026', photoUrl:'https://www.neuqueninforma.gob.ar/noticias/2026/04/03/255930-el-chical-se-suma-a-la-oferta-vitivinicola-de-san-patricio-del-chanar', rights:'reference',
    collectionName:'Pequeñas historias', seal:'FICHA CHAÑARENSE', role:'documental'
  },
  {
    id:'mp-pedacitos-territorio', number:6, collection:'territorio', template:'g-identidad',
    name:'Pedacitos de territorio', product:'guide', photo:'schroeder',
    promise:'Una guía breve para leer Chañar como territorio.',
    title:'Pedacitos de territorio',
    intro:'Una pequeña guía para mirar San Patricio del Chañar más allá de una sola postal.',
    items:'Río y riego\nChacras y producción\nViñedos y bodegas\nEstepa y bardas\nFiestas, trabajo y comunidad',
    body:'El paisaje local se entiende mejor cuando se miran juntos el agua, la producción, el vino, la estepa y la vida comunitaria.',
    fact:'La propuesta turística provincial presenta a San Patricio del Chañar como uno de los principales núcleos de la Ruta del Vino de la Patagonia.',
    factLabel:'TERRITORIO',
    source:'Neuquén Informa · recorridos de la provincia / Ruta del Vino', sourceUrl:'https://www.neuqueninforma.gob.ar/noticias/2018/01/07/113073-cinco-recorridos-para-descubrir-la-provincia-del-neuquen',
    photoSource:'Neuquén Informa · Familia Schroeder', photoUrl:'https://www.neuqueninforma.gob.ar/noticias/2026/05/23/258207-bodega-familia-schroeder-celebra-con-una-propuesta-de-enoturismo-sabores-patrios-y-musica-en-vivo', rights:'reference',
    collectionName:'Pedacitos de territorio', seal:'PARA RECORRER', role:'guía'
  }
];

window.FabricaMasterProducts={version:1,products:MASTER_PRODUCTS,find:id=>MASTER_PRODUCTS.find(x=>x.id===id),byNumber:n=>MASTER_PRODUCTS.find(x=>x.number===n)};
