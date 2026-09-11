/* FÁBRICA CHAÑAR — LEYES DE PRODUCTO v2
   CÉLULA DE DISEÑO EDITORIAL OCARINA

   Este archivo no es decoración: es contrato.
   La máquina puede variar contenido, fotografía y composición,
   pero nunca puede romper estas leyes sin una decisión editorial explícita.

   MANDAMIENTO UNIVERSAL
   MUY ARTESANAL · MUY CUIDADO · MUCHO VALOR · MUY CHAÑAR

   Ocarina Producciones trabaja desde TURISMO + CULTURA + TERRITORIO.
   La pieza debe poder sentirse como recuerdo, documento, guía u objeto cultural;
   nunca como una plantilla automática ni como una captura de pantalla.
*/
(function(){
  const BRAND={
    name:'Ocarina Producciones',
    workshop:'Fábrica Chañar',
    territory:'San Patricio del Chañar · Neuquén · Patagonia Argentina',
    editorial:'Turismo · Cultura · Territorio · Memoria',
    promise:'hacer piezas locales que merezcan ser guardadas',
    universal:'Muy artesanal, muy cuidado, aportando valor.',
    laws:[
      'La pieza debe tener una intención reconocible en tres segundos.',
      'La belleza nunca reemplaza la información; la información nunca destruye la belleza.',
      'Un protagonista por pieza: foto, dato, recorrido o historia.',
      'Toda decoración debe justificar su existencia.',
      'Lo local manda sobre lo genérico.',
      'La textura sugiere materia; no simula suciedad ni antigüedad falsa.',
      'El color organiza y emociona; no rellena.',
      'La tipografía tiene jerarquía; no busca llamar la atención por sí sola.',
      'El reverso agrega valor y procedencia; no es espacio sobrante.',
      'Una pieza puede ser imperfecta en su gesto, jamás descuidada en su ejecución.'
    ]
  };

  /* SISTEMA VISUAL COMÚN — OCARINA */
  const VISUAL={
    palette:{
      paper:'#F4EBDD',
      paperLight:'#FAF7F0',
      ink:'#202522',
      inkSoft:'#56605B',
      territory:'#315C66',
      river:'#567F83',
      earth:'#8A684D',
      sand:'#C6A36A',
      harvest:'#C48A3D',
      wine:'#713F50',
      fruit:'#A94D39',
      sage:'#66745F',
      clay:'#B96D4B',
      white:'#FFFDF8'
    },
    colorLaw:{
      rule:'1 color principal + 1 apoyo + neutrales. El acento nunca supera al protagonista.',
      maxDominant:0.70,
      maxAccent:0.18,
      neutralMin:0.22,
      saturation:'moderada; evitar colores fluorescentes y saturación digital extrema',
      gradient:'prohibido como recurso decorativo por defecto',
      black:'usar ink, no negro absoluto, salvo necesidad técnica',
      white:'usar paper/white; evitar blanco clínico como identidad dominante',
      contrast:'texto siempre con contraste fuerte; no colocar texto largo sobre fotografía compleja'
    },
    typography:{
      families:{
        display:'Georgia, Times New Roman, serif',
        text:'Inter, Segoe UI, Arial, sans-serif',
        utility:'ui-monospace, SFMono-Regular, Consolas, monospace'
      },
      roles:{
        title:'display; carácter cultural/editorial',
        subtitle:'text; respiración y contexto',
        body:'text; máxima legibilidad',
        label:'utility; datos, código, colección',
        seal:'text; contundente y breve'
      },
      scale:{
        display:'30–40 px digital / 22–34 pt impresión',
        h2:'20–28 px / 16–24 pt',
        h3:'15–19 px / 11–15 pt',
        body:'14–17 px / 9.5–11 pt',
        caption:'11–13 px / 7.5–9 pt',
        utility:'9–11 px / 6.5–8 pt'
      },
      law:'máximo dos familias tipográficas; máximo tres pesos visibles; nunca más de tres niveles principales de lectura en una cara',
      alignment:'preferencia por alineación izquierda; centrado solo cuando la pieza lo justifique',
      measure:'bloques de lectura cortos; evitar líneas excesivamente largas',
      forbidden:['tipografías infantiles','tipografías ornamentales para cuerpo','texto todo en mayúsculas para párrafos','efectos de texto','contorno/sombra decorativa']
    },
    grid:{
      base:'8 pt digital / 2 mm aproximados en impresión',
      margins:'seguras y generosas; nunca llenar hasta el borde sin intención',
      rhythm:'repetir módulos, no repetir diseños',
      printBleed:'3 mm',
      safeMargin:'5 mm mínimo; aumentar cuando el contenido sea crítico',
      rule:'la cuadrícula debe sostener la pieza y luego desaparecer visualmente'
    },
    photography:{
      law:'la fotografía es material editorial, no fondo decorativo',
      hierarchy:'una imagen fuerte > muchas imágenes medianas',
      crop:'recorte con intención; nunca deformar',
      treatment:'contraste moderado, saturación contenida, negros abiertos, temperatura coherente',
      human:'priorizar huella humana, territorio, oficio y escala real cuando aporten significado',
      forbidden:['filtros vintage automáticos','viñetas fuertes','HDR exagerado','collage por acumulación','watermarks visibles','imagen de baja resolución'],
      rights:'cada foto debe registrar origen, autor cuando se conozca y estado de derechos. Referencia no significa permiso comercial.'
    },
    texture:{
      principle:'la textura debe hacer sentir papel, fibra, tinta o materia; jamás competir con contenido',
      maxLayers:1,
      opacity:'3–8% normalmente; nunca visible como ruido',
      preferred:['fibra de papel','grano editorial fino','pequeña pincelada','regla/tinta seca'],
      forbidden:['papel viejo falso','grunge','manchas','ruido fotográfico','texturas repetitivas evidentes','textura detrás de texto largo']
    },
    lines:{
      principle:'las líneas son herramientas de orientación y ritmo',
      preferred:['regla fina','camino','flecha breve','subrayado editorial','separador'],
      weight:'1–2 px digital / 0.25–0.5 pt impresión',
      forbidden:['marcos gruesos','ornamento perimetral automático','líneas por todos lados']
    },
    seals:{
      universal:'FÁBRICA CHAÑAR · OCARINA PRODUCCIONES',
      productMax:1,
      collectionMax:1,
      position:'preferentemente zona baja; nunca tapar información ni fotografía clave',
      size:'pequeño, legible, reconocible; nunca protagonista',
      authenticity:'sello editorial de procedencia, no certificación oficial',
      law:'si hay dos sellos, uno debe ser funcional y el otro de colección; nunca dos sellos compitiendo'
    },
    data:{
      principle:'el dato convierte una imagen bonita en una pieza con valor cultural',
      hierarchy:'1 dato principal + hasta 2 datos de apoyo',
      verification:'dato verificable debe tener fuente registrada',
      date:'cuando el dato pueda cambiar, incluir fecha de consulta o período',
      uncertainty:'si una cifra es aproximada, se presenta como aproximada',
      forbidden:['números sin fuente','precisión falsa','estadísticas viejas presentadas como actuales','mezclar años sin aclararlo']
    },
    sources:{
      priority:['fuente oficial','archivo/institución','medio profesional','investigación académica','fuente secundaria fiable'],
      citation:'fuente completa o identificable en reverso/metadata; no sobrecargar el frente',
      photoCredit:'autor + medio/plataforma cuando corresponda',
      rights:'own / authorized / licensed / usable / reference',
      commercial:'solo own, authorized, licensed o usable permiten venta según registro de derechos'
    },
    materiality:{
      front:'frente emocional y claro',
      reverse:'reverso documental y coleccionable',
      paperFeel:'mate, cálido, natural',
      objectLaw:'la pieza debe parecer objeto editorial; no interfaz web impresa',
      finish:'sobrio; la calidad nace de proporción, papel, imagen, tipografía y contenido'
    },
    quality:{
      target:'parece hecho por una persona que eligió cada elemento',
      checks:['alineación','márgenes','jerarquía','legibilidad','resolución','fuente','crédito','derechos','coherencia cromática','coherencia de colección'],
      reject:'si la pieza parece automática, saturada, genérica o incompleta, no está terminada'
    }
  };

  const PRODUCTS={
    postal:{
      id:'postal',name:'Postal',family:'memoria',identity:'recuerdo visual',promise:'hacer que un lugar o momento de Chañar pueda guardarse como objeto',
      value:'memoria + identidad + belleza + dato breve',
      format:{preferred:'10x15',alternates:['vertical','square'],orientation:'vertical'},
      composition:{image:65,title:20,info:15,rule:'fotografía protagonista; título con aire; dato mínimo; sello discreto'},
      sizeLaw:'10×15 cm como formato maestro. Vertical 4:5 y cuadrado son adaptaciones, no nuevos lenguajes.',
      colorLaw:'neutro cálido dominante + un acento territorial/cultural; el color nunca invade la fotografía.',
      typographyLaw:'título display con carácter; datos en sans; máximo 2 familias.',
      textureLaw:'papel/fibra muy fina, casi perceptible solo al acercarse.',
      referenceLaw:'imagen local inequívoca; si es de referencia, queda bloqueada para venta.',
      dataLaw:'un dato breve que aumente el valor de recuerdo.',
      sealLaw:'un sello pequeño de colección; la postal nunca parece certificación.',
      core:['una imagen inolvidable','título de 2–5 palabras','una línea territorial','un dato verificable','sello de colección','numeración','crédito/procedencia en reverso'],
      front:{sequence:['imagen','título','territorio','dato','sello','número'],maxWords:28,headlineMaxLines:3},
      reverse:{sequence:['nombre de pieza','microhistoria 35–55 palabras','dato','procedencia','fuente','crédito','código de colección','marca Fábrica Chañar']},
      material:{paper:'papel cálido natural',texture:'fibra muy fina',ornament:'una línea o gesto de colección',finish:'mate'},
      photo:{role:'protagonista',ideal:'escena local inequívoca, profundidad, luz natural, gesto humano o paisaje con identidad',reject:['foto genérica','collage','foto pequeña rodeada de decoración','filtro vintage','recorte destructivo']},
      content:{formula:'LUGAR / EMOCIÓN / DATO',tone:'breve, evocador, concreto',avoid:['turismo genérico','adjetivos vacíos','párrafos','cinco datos']},
      artisan:{gesture:'ligero desplazamiento óptico respecto del centro geométrico cuando mejore la composición',never:['bordes decorativos gruesos','sombras fuertes','emojis','múltiples sellos']}
    },
    ficha:{
      id:'ficha',name:'Ficha cultural',family:'memoria',identity:'pieza documental',promise:'convertir una pequeña historia local en un objeto que enseña algo sin parecer formulario',
      value:'contexto + documentación + descubrimiento',
      format:{preferred:'10x15',alternates:['a5','vertical','square'],orientation:'vertical'},
      composition:{image:42,title:23,info:35,rule:'imagen documental + bloque editorial + dato'},
      sizeLaw:'10×15 para colección; A5 cuando el contenido documental necesite respirar.',
      colorLaw:'neutros de archivo + un acento cultural; contraste sobrio.',
      typographyLaw:'sans legible para información; display solo para identidad/título.',
      textureLaw:'grano seco de archivo contemporáneo; nunca envejecimiento falso.',
      referenceLaw:'la imagen debe documentar el objeto/historia; procedencia explícita.',
      dataLaw:'fecha, lugar, categoría y un hecho comprobable.',
      sealLaw:'sello de ficha/archivo pequeño; el dato manda.',
      core:['fotografía documental','título preciso','categoría','lugar','pequeña historia','dato o fecha','fuente','crédito','código de archivo'],
      front:{sequence:['imagen','título','categoría','lugar','microhistoria','dato'],maxWords:85,headlineMaxLines:3},
      reverse:{sequence:['contexto ampliado','qué mirar','fuente','fecha de consulta','imagen/crédito','procedencia','código de archivo']},
      material:{paper:'papel de archivo contemporáneo',texture:'grano fino y seco',ornament:'regla o marcador editorial',finish:'mate'},
      photo:{role:'documental',ideal:'objeto, arquitectura, interior, herramienta, persona o escena que pruebe que la historia existe',reject:['foto publicitaria','poses artificiales','objeto tapado','imagen sin relación']},
      content:{formula:'QUÉ ES / DÓNDE / POR QUÉ IMPORTA',tone:'claro, sobrio, curioso',avoid:['tono institucional','folleto turístico','afirmaciones no verificadas']},
      artisan:{gesture:'pequeñas irregularidades controladas de regla o sello',never:['marcos antiguos falsos','papel envejecido artificialmente','etiquetado excesivo']}
    },
    guide:{
      id:'guide',name:'Guía breve',family:'territorio',identity:'acompañante de recorrido',promise:'dar una utilidad real: ayudar a mirar, recorrer o comprender Chañar',
      value:'orientación + descubrimiento + contexto local',
      format:{preferred:'10x15',alternates:['vertical','horizontal','a5'],orientation:'vertical'},
      composition:{image:48,title:22,info:30,rule:'apertura visual + recorrido numerado + hitos'},
      sizeLaw:'10×15 para mini-recorridos; horizontal cuando el recorrido espacial lo exija; A5 para guía más densa.',
      colorLaw:'territorio + río + tierra; acentos de navegación, nunca arcoíris.',
      typographyLaw:'sans primero; números de recorrido grandes; display solo para título.',
      textureLaw:'papel de cuaderno/recorrido muy sutil.',
      referenceLaw:'todo recorrido, acceso, horario o servicio debe verificarse.',
      dataLaw:'3–5 hitos; cada hito aporta acción o comprensión.',
      sealLaw:'sello PARA RECORRER o colección; uno solo como protagonista secundario.',
      core:['puerta de entrada','3–5 hitos','orden de recorrido','microdatos útiles','fuente y fecha','advertencia de actualidad','procedencia','numeración'],
      front:{sequence:['imagen de apertura','título','intro','recorrido 01–05','cierre útil'],maxWords:110,headlineMaxLines:3},
      reverse:{sequence:['por qué este recorrido','fuentes','fecha de consulta','qué puede cambiar','procedencia','crédito','código de ruta']},
      material:{paper:'papel natural resistente',texture:'grano suave',ornament:'camino/flecha/punto funcional',finish:'cuaderno de recorrido'},
      photo:{role:'apertura/recorrido',ideal:'imagen que permita situarse espacial o emocionalmente',reject:['foto bonita sin utilidad','mapa genérico','rutas inventadas','accesos no comprobados']},
      content:{formula:'MIRÁ / ANDÁ / DESCUBRÍ',tone:'cercano, preciso, útil',avoid:['horarios no verificados','promesas de servicio','direcciones inventadas','listas interminables']},
      artisan:{gesture:'numeración con carácter gráfico, manteniendo cifras perfectamente legibles',never:['flechas por todas partes','mapa decorativo','apariencia de app']}
    },
    infographic:{
      id:'infographic',name:'Infografía',family:'comprensión',identity:'lámina de comprensión',promise:'hacer visible una relación, proceso o dato local en segundos',
      value:'comprensión + síntesis + evidencia',
      format:{preferred:'a5',alternates:['vertical','square','print'],orientation:'vertical'},
      composition:{image:35,title:30,info:35,rule:'un dato dominante + una relación visual clara + fuente'},
      sizeLaw:'A5 como lámina maestra; vertical 4:5 y cuadrado como adaptaciones digitales.',
      colorLaw:'neutro + 1 acento para dato principal + 1 apoyo; el color codifica categorías.',
      typographyLaw:'sans para cifras y lectura; display solo para titular.',
      textureLaw:'grano editorial mínimo; nunca textura detrás de cifras.',
      referenceLaw:'gráfico y dato deben poder rastrearse a fuente y fecha.',
      dataLaw:'una idea central; 1 dato dominante; 2–5 bloques de apoyo.',
      sealLaw:'sello MIRADA LOCAL pequeño; fuente visible y prioritaria.',
      core:['titular fuerte','dato central','2–5 bloques','relación visual','fuente','fecha','nota metodológica','sello'],
      front:{sequence:['titular','dato central','esquema','microdatos','fuente'],maxWords:65,headlineMaxLines:3},
      reverse:{sequence:['qué muestra','cómo se obtuvo','fuente','fecha','alcance/limitación','procedencia','código de lámina']},
      material:{paper:'papel ligeramente granulado',texture:'grano editorial fino',ornament:'punto/flecha/línea de relación',finish:'lámina para mirar y entender'},
      photo:{role:'apoyo visual',ideal:'foto que aporte escala, humanidad o territorio al dato',reject:['foto de relleno','estadística sin fecha','precisión falsa','decoración competitiva']},
      content:{formula:'UNA IDEA / UNA RELACIÓN / UNA EVIDENCIA',tone:'preciso, visual, humano',avoid:['datos sin fuente','dos ideas centrales','porcentajes ambiguos','gráficos ornamentales']},
      artisan:{gesture:'una línea editorial humana puede conectar bloques; cifras siempre limpias',never:['gráficos 3D','degradados decorativos','dashboard corporativo','icono por palabra']}
    }
  };

  const MASTERS={
    'mp-puerta-chanar':{product:'postal',number:1,collection:'TERR',name:'La puerta del Chañar',concept:'bienvenida',format:'10x15',imageShare:65,palette:['paper','territory','sand'],texture:'algodón cálido',seal:'PIEZA DE CHAÑAR · 01 / 06',fact:'21 MAYO 1973 · Fundación de San Patricio del Chañar.',frontLaw:'la llegada debe reconocerse antes de leer',reverseLaw:'mini historia de fundación + procedencia + crédito'},
    'mp-vinedos-estepa':{product:'postal',number:2,collection:'VINO',name:'Viñedos y estepa',concept:'paisaje',format:'10x15',imageShare:70,palette:['paper','sage','earth','river'],texture:'papel natural',seal:'VINO Y PAISAJE · 02 / 06',fact:'+1.700 ha · viñedos en 2024.',frontLaw:'las hileras conducen el ojo hacia oasis y estepa',reverseLaw:'agua → riego → viñedos → vino'},
    'mp-tiempo-cosecha':{product:'postal',number:3,collection:'COSE',name:'Tiempo de cosecha',concept:'energía',format:'10x15',imageShare:70,palette:['paper','wine','fruit','harvest'],texture:'papel cálido de grano fino',seal:'TIEMPO DE COSECHA · 03 / 06',fact:'VENDIMIA NEUQUINA · 2026',frontLaw:'la mano, la uva o la acción se sienten antes que el texto',reverseLaw:'microcrónica del trabajo y la temporada'},
    'mp-fiestas-raices':{product:'postal',number:4,collection:'RAIZ',name:'Fiestas y raíces',concept:'memoria popular',format:'10x15',imageShare:65,palette:['paper','fruit','harvest','territory'],texture:'fibra suave',seal:'FIESTAS Y RAÍCES · 04 / 06',fact:'36ª edición · Fiesta Provincial del Pelón · 2026.',frontLaw:'una persona o gesto sostiene toda la pieza',reverseLaw:'sentido de la fiesta + homenaje al trabajador rural + fuente'},
    'mp-pequenas-historias':{product:'ficha',number:5,collection:'CULT',name:'Pequeñas historias · El Chical',concept:'archivo vivo',format:'10x15',imageShare:52,palette:['paper','earth','wine','inkSoft'],texture:'archivo contemporáneo',seal:'PEQUEÑAS HISTORIAS · 05 / 06',fact:'EL CHICAL · 2026',frontLaw:'la imagen parece encontrada, no publicitada',reverseLaw:'registro documental contemporáneo con fuente y fecha'},
    'mp-pedacitos-territorio':{product:'guide',number:6,collection:'TERR',name:'Pedacitos de territorio',concept:'sistema territorial',format:'10x15',imageShare:60,palette:['paper','territory','earth','sand'],texture:'papel natural',seal:'TERRITORIO · 06 / 06',fact:'RÍO → RIEGO → CHACRAS → VIÑEDOS → ESTEPA',frontLaw:'el territorio se lee como sistema y no como postal aislada',reverseLaw:'secuencia territorial + fuentes + fecha'}
  };

  function get(id){return PRODUCTS[id]||null}
  function master(id){return MASTERS[id]||null}
  function evaluate(productId,payload={}){
    const p=get(productId);if(!p)return{ok:false,errors:['producto inexistente']};
    const errors=[],warnings=[];
    if(!payload.title)errors.push('falta título');
    if(!payload.source)errors.push('falta fuente');
    if(payload.imageRights&&!['own','usable','licensed','reference','authorized'].includes(payload.imageRights))errors.push('estado de derechos desconocido');
    if(productId==='infographic'&&!payload.fact)errors.push('falta dato central');
    if(productId==='guide'&&(!payload.items||payload.items.length<3))warnings.push('la guía necesita 3–5 hitos para tener utilidad');
    if(productId==='ficha'&&!payload.location)warnings.push('la ficha debe poder situarse en el territorio');
    return{ok:errors.length===0,errors,warnings,law:p};
  }

  window.FabricaProductLaws={version:2,brand:BRAND,visual:VISUAL,common:{...BRAND,...VISUAL},products:PRODUCTS,masters:MASTERS,get,master,evaluate};
})();
