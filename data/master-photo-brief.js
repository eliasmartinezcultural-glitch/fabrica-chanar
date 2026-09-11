/* FÁBRICA CHAÑAR — BRIEF FOTOGRÁFICO DE MATERIA PRIMA v1
   Etapa: producción de las seis piezas maestras.
   Objetivo: reemplazar progresivamente fotografías de referencia por material propio/ autorizado.
   Regla: primero la fotografía; después el diseño. No producir una pieza solo porque exista una imagen.
*/
const MASTER_PHOTO_BRIEF=[
  {
    masterId:'mp-puerta-chanar', number:1, name:'La puerta del Chañar', priority:'P1', visualLaw:'BIENVENIDA',
    heroNeed:'Una imagen que diga inmediatamente "llegué a Chañar".',
    idealShots:['cartel/ingreso real','ruta entrando al pueblo','primer plano del nombre San Patricio del Chañar','ingreso con cielo y paisaje','detalle territorial de bienvenida'],
    composition:'vertical; protagonista reconocible; dejar aire limpio para título; evitar cielo vacío excesivo',
    avoid:['foto turística genérica','cartel pequeño perdido en el cuadro','horizonte torcido','exceso de tránsito','texto incrustado en la foto'],
    bestTime:'mañana o tarde con luz lateral',
    target:'1 foto hero + 2 reservas'
  },
  {
    masterId:'mp-vinedos-estepa', number:2, name:'Viñedos y estepa', priority:'P1', visualLaw:'PAISAJE',
    heroNeed:'Mostrar el contraste entre oasis productivo y territorio árido.',
    idealShots:['hileras de viñedos con estepa al fondo','acequia/riego junto a viñedo','viñedo desde baja altura','bardas detrás de cultivos','camino entre hileras hacia horizonte'],
    composition:'buscar tres planos: primer plano productivo, medio oasis, fondo estepa/bardas/cielo; usar hileras como líneas de fuga',
    avoid:['solo hojas de vid','solo bodega','botellas como protagonista','paisaje sin escala','fondo totalmente plano'],
    bestTime:'amanecer o última tarde',
    target:'1 foto hero + 3 reservas'
  },
  {
    masterId:'mp-tiempo-cosecha', number:3, name:'Tiempo de cosecha', priority:'P1', visualLaw:'ENERGÍA',
    heroNeed:'Que se sienta el trabajo humano, no simplemente una foto de uvas.',
    idealShots:['manos cosechando','racimos en planta','caja de cosecha','trabajador entre hileras','herramienta + uva + manos','movimiento de vendimia'],
    composition:'acercamiento; gesto humano claro; fondo suficientemente limpio; conservar manos/herramienta cuando explican la acción',
    avoid:['persona posando mirando cámara','collage','escena demasiado lejana','uvas sin contexto','marcas comerciales dominantes'],
    bestTime:'durante actividad real de cosecha',
    target:'1 foto hero + 3 reservas'
  },
  {
    masterId:'mp-fiestas-raices', number:4, name:'Fiestas y raíces', priority:'P1', visualLaw:'MEMORIA POPULAR',
    heroNeed:'Una persona, gesto o escena que represente comunidad y raíz productiva.',
    idealShots:['trabajador rural','manos/oficio','familia o comunidad','escena criolla','artesano','encuentro durante fiesta'],
    composition:'una sola escena fuerte; sujeto humano dominante; fondo contextual pero subordinado',
    avoid:['escenario vacío','multitud sin protagonista','collage de actividades','cartelería ocupando la imagen','pose institucional'],
    bestTime:'actividad real, sin dirigir demasiado la escena',
    target:'1 foto hero + 3 reservas'
  },
  {
    masterId:'mp-pequenas-historias', number:5, name:'Pequeñas historias · El Chical', priority:'P1', visualLaw:'ARCHIVO',
    heroNeed:'Una fotografía que documente un lugar real y permita descubrir una pequeña historia.',
    idealShots:['fachada El Chical','interior con objetos de trabajo','detalle de elaboración','herramienta/oficio','persona trabajando','detalle arquitectónico con contexto'],
    composition:'más sobria; contexto suficiente para identificar el lugar; un detalle debe funcionar como segunda lectura',
    avoid:['foto publicitaria de producto','botella como único tema','exceso de saturación','encuadre de catálogo comercial'],
    bestTime:'luz suave/interior controlado',
    target:'1 foto hero + 3 reservas'
  },
  {
    masterId:'mp-pedacitos-territorio', number:6, name:'Pedacitos de territorio', priority:'P1', visualLaw:'SISTEMA TERRITORIAL',
    heroNeed:'Hacer visible que agua, producción, viñedos y estepa forman un mismo territorio.',
    idealShots:['río + margen productiva','acequia + chacra','canal + cultivos','viñedos + bardas','vista amplia con agua y horizonte','puente/infraestructura de riego'],
    composition:'profundidad espacial; agua o riego como estructura; conservar horizonte y escala; no reducirlo a paisaje decorativo',
    avoid:['paisaje sin elemento territorial','zoom excesivo','cielo dominante','agua sin relación con producción'],
    bestTime:'luz lateral; después de riego si genera reflejos/actividad',
    target:'1 foto hero + 3 reservas'
  }
];

const PHOTO_INTAKE_RULES={
  version:1,
  objective:'construir materia prima propia de alta calidad antes de multiplicar productos',
  priorityOrder:['P1 seis maestras','P2 reservas de cada maestra','P3 archivo general de Chañar'],
  minimumTechnical:['imagen nítida','horizonte razonablemente recto','sin filtros destructivos','máxima resolución disponible','sin texto agregado sobre la foto'],
  editorialTest:['¿hay protagonista?','¿se entiende el lugar?','¿hay profundidad o una segunda lectura?','¿deja espacio para diseño?','¿podría sostener una pieza impresa?'],
  rights:'own o authorized = apta para venta; reference/unknown = solo prototipo hasta resolver derechos',
  workflow:'capturar → seleccionar → identificar lugar/fecha/autor → registrar derechos → asignar maestra → probar composición → conservar originales'
};

window.FabricaMasterPhotoBrief={version:1,masters:MASTER_PHOTO_BRIEF,rules:PHOTO_INTAKE_RULES,find:id=>MASTER_PHOTO_BRIEF.find(x=>x.masterId===id)};
