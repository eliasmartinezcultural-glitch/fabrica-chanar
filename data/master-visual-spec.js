/* FÁBRICA CHAÑAR — ESPECIFICACIÓN EDITORIAL DE LAS 6 PIEZAS v1
   Las imágenes de medios/profesionales pueden usarse como referencia editorial.
   El sistema debe conservar SIEMPRE autor/fuente/licencia/permiso y distinguir
   referencia de material habilitado para comercialización.
*/
const MASTER_VISUAL_SPEC={
  version:1,
  photoPolicy:{
    mode:'editorial-reference-allowed',
    rule:'Se permite investigar y diseñar usando fotos publicadas por medios o profesionales; no se presume permiso comercial.',
    credit:'Toda foto no propia debe conservar autor, medio/fuente, URL y licencia o estado de permiso.',
    states:['own','authorized','licensed','reference']
  },
  products:{
    'mp-puerta-chanar':{
      share:'60% fotografía · 25% título/aire · 15% dato/sello',
      hero:'La entrada/signo/puerta que identifique inequívocamente San Patricio del Chañar.',
      crop:'Vertical 10:15; priorizar cielo/espacio para respirar título; evitar cortar texto del cartel.',
      typography:'Nombre local grande, sobrio; subtítulo pequeño; fecha como dato secundario.',
      front:'Imagen protagonista + título + pequeño sello de bienvenida.',
      reverse:'Mini historia de fundación + procedencia fotográfica + código de colección.',
      search:['cartel ingreso San Patricio del Chañar','entrada San Patricio del Chañar fotografía','San Patricio del Chañar paisaje ingreso']
    },
    'mp-vinedos-estepa':{
      share:'65% paisaje · 20% título · 15% dato',
      hero:'Contraste visual entre viñedo verde, líneas de cultivo, bardas/estepa y cielo.',
      crop:'Horizontal dominante dentro de postal vertical; usar diagonales de hileras como composición.',
      typography:'Título editorial en 2 líneas; dato de 1.700+ ha como pequeño elemento documental, no protagonista.',
      front:'Paisaje casi sin intervenir + título superpuesto en zona limpia + microdato.',
      reverse:'Explicación breve del oasis productivo + fuente oficial + crédito de foto.',
      search:['viñedos San Patricio del Chañar fotografía','bodegas Chañar viñedos Neuquén','estepa viñedos Chañar foto']
    },
    'mp-tiempo-cosecha':{
      share:'70% escena de vendimia · 18% título · 12% sello/dato',
      hero:'Manos, racimos, cajas, cosecha o una escena humana real; evitar foto genérica de botella.',
      crop:'Preferir acción y profundidad; dejar una zona limpia para título.',
      typography:'Título grande y cálido; fecha/edición pequeña si corresponde.',
      front:'Fotografía emocional primero; texto mínimo.',
      reverse:'Pequeña crónica de la vendimia + bodegas locales mencionadas + crédito.',
      search:['vendimia San Patricio del Chañar 2026 fotos','cosecha uva Chañar Neuquén fotografía','vendimia neuquina Chañar fotógrafo']
    },
    'mp-fiestas-raices':{
      share:'65% personas/fiesta · 20% título · 15% identidad',
      hero:'Trabajador rural, comunidad, desfile, escenario o actividad productiva; buscar humanidad.',
      crop:'No recortar rostros ni manos; usar grupo/acción como centro.',
      typography:'Título con carácter popular pero elegante; sello RAÍCES LOCALES.',
      front:'Una escena humana fuerte, no collage.',
      reverse:'Qué representa la Fiesta del Pelón + homenaje al trabajador rural + fuente/autor.',
      search:['Fiesta Provincial del Pelón 2026 fotos','Fiesta del Pelón San Patricio del Chañar fotógrafo','trabajador rural Chañar fiesta fotografía']
    },
    'mp-pequenas-historias':{
      share:'55% fotografía documental · 30% ficha editorial · 15% fuente',
      hero:'Detalle arquitectónico, interior, objeto, barrica, patio o persona vinculada a El Chical.',
      crop:'Más documental que publicitario; buscar textura y detalle.',
      typography:'Sistema de ficha: título, categoría, pequeña historia y dato.',
      front:'Imagen + identificación clara; apariencia de tarjeta de archivo contemporáneo.',
      reverse:'Fuente oficial, contexto, autor de imagen y nota de procedencia.',
      search:['El Chical San Patricio del Chañar fotos','Bodega El Chical Chañar fotografía','El Chical Neuquén fotógrafo']
    },
    'mp-pedacitos-territorio':{
      share:'60% paisaje · 25% recorrido/mapa · 15% sello',
      hero:'Agua, río, canales, chacras, bardas o caminos que expliquen territorio; no solamente una bodega.',
      crop:'Panorámica con profundidad; líneas del paisaje deben conducir la mirada.',
      typography:'Título de guía; cinco elementos territoriales como microleyenda.',
      front:'Paisaje + pequeñas marcas funcionales, sin mapa falso.',
      reverse:'Recorrido conceptual río→riego→producción→vino→estepa + fuente CFI + crédito.',
      search:['Dique Compensador Chañar fotografía','río Neuquén San Patricio del Chañar foto','canales riego Chañar fotografía','bardas Chañar Neuquén paisaje']
    }
  }
};
window.FabricaMasterVisualSpec=MASTER_VISUAL_SPEC;
