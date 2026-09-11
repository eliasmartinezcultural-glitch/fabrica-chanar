/* FÁBRICA CHAÑAR — SISTEMA OCARINA v1
   ADN editorial universal.
   No reemplaza las leyes de producto: las gobierna por encima.

   LEY MADRE:
   TODO LO QUE SALE DE FÁBRICA DEBE PARECER ELEGIDO, NO GENERADO.

   La fábrica automatiza la ejecución; Ocarina conserva criterio, territorio,
   materia, procedencia y valor cultural.
*/
(function(){
  const OC={
    version:1,
    identity:'Ocarina Producciones · turismo y cultura',
    origin:'San Patricio del Chañar, Neuquén',
    universalLaws:[
      'ARTESANAL: cada pieza debe contener una decisión visual reconocible.',
      'CUIDADO: ningún detalle técnico o editorial puede quedar sin revisar.',
      'VALOR: cada elemento informa, emociona, orienta, documenta o aumenta el valor de objeto.',
      'TERRITORIO: la pieza debe pertenecer a un lugar real y reconocible.',
      'CONTEMPORÁNEO: artesanal no significa antiguo, vintage ni rústico artificial.',
      'SILENCIO: si un elemento no aporta, desaparece.',
      'PROCEDENCIA: foto, dato, autor y fuente deben poder rastrearse.',
      'COLECCIONABILIDAD: una pieza aislada debe funcionar y una serie debe invitar a continuar.',
      'COMPRA HONESTA: se puede aumentar deseo y percepción de valor, nunca inventar escasez, autoridad o exclusividad.',
      'CASI CERO ELIAS: la fábrica decide dentro de las leyes; Elías solamente elige producto y, cuando corresponda, aprueba o vende.'
    ],
    palette:{
      neutrals:{paper:'#F3EBDD',bone:'#E8DDCC',ink:'#242624',softInk:'#5E5B52'},
      territory:{river:'#315F67',deep:'#244952',sky:'#7D9BA0'},
      earth:{sand:'#C9AD82',earth:'#8A6849',clay:'#A95B43'},
      production:{vine:'#6D3F55',sage:'#69765E',harvest:'#C39445'},
      culture:{coral:'#A84F3C',gold:'#D4A14A'},
      law:'Una pieza usa 1 color dominante + 1 acento + neutrales. El resto se deriva de fotografía y contexto.'
    },
    typography:{
      display:{family:'Georgia, Times New Roman, serif',role:'títulos, nombres de lugares, frases cortas'},
      sans:{family:'Inter, Segoe UI, Arial, sans-serif',role:'datos, cuerpo, fuentes, instrucciones'},
      utility:{family:'ui-monospace, SFMono-Regular, Consolas, monospace',role:'códigos, numeración, archivo'},
      law:'Máximo 2 familias tipográficas visibles por pieza; la tercera solo puede aparecer como microdato técnico.'
    },
    materiality:{
      textures:['papel natural','fibra fina','grano editorial','pincelada única','línea de tinta','pequeña marca manual'],
      maxVisibleTextures:1,
      intensity:'2–8%',
      forbidden:['grunge','suciedad falsa','papel envejecido artificial','ruido digital','marcos ornamentales pesados','filtros vintage evidentes'],
      law:'La textura se descubre de cerca; nunca debe competir con fotografía, título o dato.'
    },
    composition:{
      protagonist:'60%',
      content:'30%',
      identity:'10%',
      law:'La proporción es orientativa. Nunca se fuerza una pieza para cumplir números si destruye la composición.',
      air:'Toda pieza necesita al menos una zona de descanso visual real.'
    },
    seals:{
      maker:'FÁBRICA CHAÑAR · OCARINA PRODUCCIONES',
      collections:{TERR:'TERRITORIO',VINO:'VINO Y PAISAJE',OFIC:'OFICIOS DEL VINO',COSE:'TIEMPO DE COSECHA',RAIZ:'FIESTAS Y RAÍCES',CULT:'CULTURA LOCAL'},
      law:'Máximo un sello principal + una identificación secundaria. Nunca una pared de sellos.'
    },
    collection:{
      numbering:'01/06',
      codeFormat:'OC-{collection}-{number}',
      example:'OC-TERR-01',
      editionMode:'serie abierta',
      collectorLine:'Parte de una colección de piezas de Chañar',
      law:'La numeración crea continuidad, no escasez falsa. Serie abierta siempre significa disponibilidad potencial futura.',
      required:['collection','pieceNumber','pieceCode','makerSeal','origin','editionMode']
    },
    valueSignals:{
      required:['nombre de pieza','colección','número','procedencia','dato','crédito/fuente','sello'],
      optional:['nota del autor','microhistoria','fecha de edición','papel/formato','familia temática'],
      purchaseTriggers:[
        'reconocimiento inmediato del lugar',
        'dato pequeño que justifica conservar',
        'numeración que invita a completar la colección',
        'sello que funciona como firma de taller',
        'procedencia que genera confianza',
        'reverso que convierte la compra en descubrimiento',
        'fotografía que funciona como objeto aun sin texto',
        'formato que cabe en mano, regalo, biblioteca o marco'
      ],
      forbidden:['escasez inventada','edición limitada ficticia','contador falso','urgencia artificial','testimonios inventados','premios inexistentes','autoridad institucional no concedida']
    },
    photoLaw:{
      role:'materia prima principal',
      preferredRights:['own','authorized','licensed','usable'],
      referenceRights:'reference',
      commercialSafe:'Solo own/authorized/licensed/usable con registro explícito.',
      selectionOrder:['identidad territorial','calidad técnica','composición','luz','capacidad de contar algo','derechos'],
      cropLaw:'recortar para mejorar lectura; nunca estirar, deformar ni destruir el elemento que prueba la historia.',
      creditLaw:'Toda fotografía ajena conserva fuente y autor en el registro; el crédito aparece donde corresponda sin ensuciar el frente.'
    },
    rawMaterials:{
      categories:['photo','fact','source','texture','palette','type','seal','collection','microstory'],
      photo:{minWidthForPrint:1748,minHeightForPrint:2480,preferLandscapeFor:'postal',preferDocumentaryFor:'ficha'},
      fact:{mustHaveSource:true,mustHaveDateWhenTimeSensitive:true,maxClaimsPerSmallPiece:2},
      source:{requiredFor:['fact','history','guide','statistic']},
      texture:{maxPerPiece:1},
      law:'La fábrica puede combinar materias primas registradas; nunca inventarlas para completar un diseño.'
    },
    zeroInteraction:{
      userActions:[
        'elegir producto',
        'opcionalmente elegir colección/tema si la fábrica no puede inferirlo',
        'fabricar',
        'revisar resultado',
        'guardar o exportar'
      ],
      automaticDecisions:[
        'selección de materia prima',
        'foto y recorte',
        'paleta',
        'jerarquía tipográfica',
        'dato disponible',
        'sello y numeración',
        'reverso',
        'fuentes y créditos',
        'validación de derechos',
        'formato compatible'
      ],
      escalation:'Si falta una materia prima crítica, la fábrica debe pedir UNA decisión concreta; nunca abrir un editor complejo.'
    },
    products:{
      postal:{buyReason:'guardar un lugar o momento',dominant:'fotografía',collectorCue:'número + colección',frontLaw:'imagen primero',reverseLaw:'microhistoria + dato + procedencia'},
      ficha:{buyReason:'llevarse un pequeño conocimiento',dominant:'historia/documento',collectorCue:'código de archivo + colección',frontLaw:'documento primero',reverseLaw:'contexto ampliado + fuente'},
      guide:{buyReason:'llevar una utilidad para recorrer',dominant:'recorrido',collectorCue:'código de ruta + colección',frontLaw:'orientación primero',reverseLaw:'fuentes + fecha + actualidad'},
      infographic:{buyReason:'entender una idea local',dominant:'dato/relación',collectorCue:'código de lámina + colección',frontLaw:'dato primero',reverseLaw:'metodología + fuente + limitación'}
    }
  };

  function materialValue(piece={}){
    const checks={
      photo:!!piece.image,
      fact:!!piece.fact,
      source:!!piece.source,
      collection:!!piece.collection,
      number:!!piece.pieceNumber,
      seal:!!piece.seal,
      provenance:!!piece.provenance
    };
    const score=Object.values(checks).filter(Boolean).length;
    return {score,max:7,checks,ready:score>=6};
  }

  function buildIdentity(meta={}){
    const collection=meta.collection||'TERR';
    const number=String(meta.number||1).padStart(2,'0');
    return {
      collection,
      number,
      pieceCode:`OC-${collection}-${number}`,
      collectionName:OC.seals.collections[collection]||collection,
      makerSeal:OC.seals.maker,
      origin:OC.origin,
      editionMode:OC.collection.editionMode,
      collectorLine:OC.collection.collectorLine
    };
  }

  window.FabricaOcarinaSystem={version:1,...OC,materialValue,buildIdentity};
})();
