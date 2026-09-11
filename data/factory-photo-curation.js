/* FÁBRICA CHAÑAR — CURADURÍA FOTOGRÁFICA EXCLUSIVA v1
   Selección de materia prima encontrada en búsqueda web intensiva.
   Regla: solo material con licencia explícita se marca usable/commercialSafe.
   Las referencias periodísticas quedan separadas y NO habilitan venta.
*/
(function(){
  const FACTORY_PHOTO_CURATED=[
    {
      id:'fp-01', master:'mp-puerta-chanar', asset:'acceso-chanar', priority:1,
      role:'hero', status:'usable', commercialSafe:true,
      title:'Ingreso a San Patricio del Chañar',
      author:'Cartago TV', license:'CC BY 3.0',
      source:'Wikimedia Commons',
      sourceUrl:'https://commons.wikimedia.org/wiki/File:San_Patricio_del_Chañar.png',
      directUrl:'https://commons.wikimedia.org/wiki/Special:FilePath/San_Patricio_del_Chañar.png',
      editorialUse:'Maestra 1 · bienvenida. El cartel debe ser reconocible y la ruta/entorno deben conservar sensación de llegada.',
      credit:'Foto: Cartago TV · CC BY 3.0 · Wikimedia Commons'
    },
    {
      id:'fp-02', master:'mp-pedacitos-territorio', asset:'dique-chanar-01', priority:1,
      role:'hero', status:'usable', commercialSafe:true,
      title:'Dique Compensador El Chañar · paisaje',
      author:'psanetti', license:'CC BY-SA 3.0',
      source:'Wikimedia Commons / Panoramio',
      sourceUrl:'https://commons.wikimedia.org/wiki/File:Dique_Compensador_Chañar,_Neuquen_-_panoramio.jpg',
      directUrl:'https://commons.wikimedia.org/wiki/Special:FilePath/Dique_Compensador_Cha%C3%B1ar%2C_Neuquen_-_panoramio.jpg',
      editorialUse:'Maestra 6 · apertura territorial. Agua como estructura del territorio, no como paisaje decorativo.',
      credit:'Foto: psanetti · CC BY-SA 3.0 · Wikimedia Commons'
    },
    {
      id:'fp-03', master:'mp-pedacitos-territorio', asset:'dique-chanar-02', priority:2,
      role:'alternate', status:'usable', commercialSafe:true,
      title:'Dique Compensador El Chañar · vista 2',
      author:'psanetti', license:'CC BY-SA 3.0',
      source:'Wikimedia Commons / Panoramio',
      sourceUrl:'https://commons.wikimedia.org/wiki/File:Dique_Compensador_Chañar,_Neuquen_-_panoramio_(1).jpg',
      directUrl:'https://commons.wikimedia.org/wiki/Special:FilePath/Dique_Compensador_Cha%C3%B1ar%2C_Neuquen_-_panoramio_(1).jpg',
      editorialUse:'Alternativa para la guía. Buscar profundidad y contraste agua-estepa.',
      credit:'Foto: psanetti · CC BY-SA 3.0 · Wikimedia Commons'
    },
    {
      id:'fp-04', master:'mp-pedacitos-territorio', asset:'dique-chanar-03', priority:3,
      role:'alternate', status:'usable', commercialSafe:true,
      title:'Dique Compensador El Chañar · vista 3',
      author:'psanetti', license:'CC BY-SA 3.0',
      source:'Wikimedia Commons / Panoramio',
      sourceUrl:'https://commons.wikimedia.org/wiki/File:Dique_Compensador_Chañar,_Neuquen_-_panoramio_(2).jpg',
      directUrl:'https://commons.wikimedia.org/wiki/Special:FilePath/Dique_Compensador_Cha%C3%B1ar%2C_Neuquen_-_panoramio_(2).jpg',
      editorialUse:'Alternativa para la guía. Elegir solo si aporta una lectura territorial distinta a la foto hero.',
      credit:'Foto: psanetti · CC BY-SA 3.0 · Wikimedia Commons'
    },
    {
      id:'fp-r01', master:'mp-vinedos-estepa', asset:'malma2', priority:1,
      role:'reference', status:'reference', commercialSafe:false,
      title:'Viñedos de San Patricio del Chañar',
      source:'Neuquén Informa',
      sourceUrl:'https://www.neuqueninforma.gob.ar/noticias/2024/10/21/246534-buscan-desarrollar-un-circuito-de-bodegas-gastronomia-y-hoteles',
      editorialUse:'Prototipo editorial únicamente. Sustituir por fotografía propia/autoriza antes de venta.',
      credit:'Foto de referencia: Neuquén Informa · derechos pendientes'
    },
    {
      id:'fp-r02', master:'mp-tiempo-cosecha', asset:'vendimia1', priority:1,
      role:'reference', status:'reference', commercialSafe:false,
      title:'Vendimia · trabajo de cosecha',
      source:'LM Neuquén',
      sourceUrl:'https://www.lmneuquen.com/neuquen/en-17-fotos-la-vendimia-neuquina-se-lucio-bodega-malma-n1231663',
      editorialUse:'Prototipo editorial únicamente. Sustituir por fotografía propia/autoriza antes de venta.',
      credit:'Foto de referencia: LM Neuquén · derechos pendientes'
    },
    {
      id:'fp-r03', master:'mp-fiestas-raices', asset:'pelon', priority:1,
      role:'reference', status:'reference', commercialSafe:false,
      title:'Fiesta Provincial del Pelón 2026',
      source:'Neuquén Informa',
      sourceUrl:'https://www.neuqueninforma.gob.ar/noticias/2026/02/10/255111-san-patricio-del-chanar-se-prepara-para-la-fiesta-del-pelon',
      editorialUse:'Prototipo editorial únicamente. Sustituir por fotografía propia/autoriza antes de venta.',
      credit:'Foto de referencia: Neuquén Informa · derechos pendientes'
    },
    {
      id:'fp-r04', master:'mp-pequenas-historias', asset:'chical', priority:1,
      role:'reference', status:'reference', commercialSafe:false,
      title:'Bodega El Chical',
      source:'Neuquén Informa',
      sourceUrl:'https://www.neuqueninforma.gob.ar/noticias/2026/04/03/255930-el-chical-se-suma-a-la-oferta-vitivinicola-de-san-patricio-del-chanar',
      editorialUse:'Prototipo editorial únicamente. Sustituir por fotografía propia/autoriza antes de venta.',
      credit:'Foto de referencia: Neuquén Informa · derechos pendientes'
    }
  ];
  window.FabricaPhotoCuration={version:1,items:FACTORY_PHOTO_CURATED,forMaster:id=>FACTORY_PHOTO_CURATED.filter(x=>x.master===id),usable:FACTORY_PHOTO_CURATED.filter(x=>x.commercialSafe)};
})();
