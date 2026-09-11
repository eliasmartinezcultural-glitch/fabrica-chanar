/* FÁBRICA CHAÑAR — MOTOR AUTÓNOMO v3
   La complejidad vive adentro. Cada producto tiene una identidad, un contrato y un sello de procedencia.
*/
(function(){
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const clean=v=>typeof v==='string'?v.trim():'';
  const photoBy=id=>typeof PHOTO_BANK!=='undefined'?PHOTO_BANK.find(p=>p.id===id):null;
  const usablePhoto=t=>photoBy(t?.photo)?.kind==='usable';
  const candidatesFor=type=>(typeof TEMPLATES==='undefined'?[]:TEMPLATES.filter(t=>t.product===type));

  /* Contratos editoriales: no se muestran al usuario. Son las reglas de calidad de la Fábrica. */
  const PRODUCT_CONTRACTS={
    postal:{
      identity:'recuerdo visual',
      promise:'una pieza breve, emotiva y coleccionable',
      needs:['title','subtitle','body'],
      rejects:['texto largo','datos dudosos'],
      outputs:['png','jpg','print'],
      seal:'HECHO EN CHAÑAR',
      sealNote:'Una pieza nacida de este territorio'
    },
    ficha:{
      identity:'pequeña pieza documental',
      promise:'informar sin parecer un formulario',
      needs:['title','category','body','location'],
      rejects:['afirmaciones no verificadas','direcciones inventadas'],
      outputs:['png','jpg','print'],
      seal:'FICHA CHAÑARENSE',
      sealNote:'Territorio · memoria · identidad'
    },
    guide:{
      identity:'acompañante de recorrido',
      promise:'convertir información en una experiencia sencilla',
      needs:['title','intro','items'],
      rejects:['horarios inventados','recomendaciones presentadas como confirmadas'],
      outputs:['png','jpg','print'],
      seal:'PARA RECORRER',
      sealNote:'Una guía breve del territorio'
    },
    infographic:{
      identity:'dato visual',
      promise:'hacer comprensible una idea en pocos segundos',
      needs:['title','headline','body'],
      rejects:['estadísticas sin fuente','precisión falsa'],
      outputs:['png','jpg','print'],
      seal:'MIRADA LOCAL',
      sealNote:'Información convertida en imagen'
    }
  };

  const STYLE_VALUES={
    patagonia:{mood:'territorio',accent:'cielo',badge:'✦ CHAñAR'},
    vino:{mood:'vino y paisaje',accent:'uva',badge:'🍇 CHAñAR · VINO'},
    cava:{mood:'oficio y detalle',accent:'tierra',badge:'◉ OFICIO LOCAL'},
    vendimia:{mood:'celebración',accent:'cosecha',badge:'✺ TIEMPO DE COSECHA'},
    fiesta:{mood:'fiesta y raíces',accent:'fruta',badge:'♥ RAÍCES CHAÑARENSES'},
    arte:{mood:'cultura contemporánea',accent:'coral',badge:'✦ CULTURA LOCAL'}
  };

  function scoreTemplate(t,{ownPhoto=false}={}){
    let score=0;
    const contract=PRODUCT_CONTRACTS[t?.product];
    if(ownPhoto)score+=18;
    if(usablePhoto(t))score+=100;
    if(clean(t?.title))score+=15;
    if(contract)score+=8;
    if(clean(t?.subtitle)||clean(t?.intro)||clean(t?.headline))score+=8;
    if(clean(t?.body))score+=8;
    if(t?.product==='guide'&&clean(t?.items))score+=8;
    if(t?.product==='ficha'&&clean(t?.category)&&clean(t?.location))score+=8;
    if(STYLE_VALUES[t?.style])score+=4;
    return score;
  }

  function choose(type,ownPhoto=false){
    return candidatesFor(type).slice().sort((a,b)=>scoreTemplate(b,{ownPhoto})-scoreTemplate(a,{ownPhoto}))[0]||null;
  }

  function fill(t){
    if(!t)return null;
    return {title:t.title||'',subtitle:t.subtitle||'',body:t.body||'',category:t.category||'',location:t.location||'',source:t.source||'',headline:t.headline||'',intro:t.intro||'',items:t.items||''};
  }

  function contract(type){return PRODUCT_CONTRACTS[type]||PRODUCT_CONTRACTS.postal}

  function validate(type,t){
    const c=contract(type), d=fill(t), missing=c.needs.filter(k=>!clean(d[k]));
    const photo=photoBy(t?.photo);
    return {
      ok:missing.length===0,
      missing,
      photoKind:photo?.kind||null,
      hasSafePhoto:photo?.kind==='usable',
      contract:c,
      style:STYLE_VALUES[t?.style]||STYLE_VALUES.patagonia
    };
  }

  function plan(preferredType){
    const own=!!(typeof state!=='undefined'&&state.image);
    const types=['postal','ficha','guide','infographic'];
    const type=types.includes(preferredType)?preferredType:types[Math.floor(Math.random()*types.length)];
    let template=choose(type,own);
    let check=validate(type,template);
    /* Si una plantilla no cumple, buscar otra antes de molestar a Elías. */
    if(!check.ok){
      const alternative=candidatesFor(type).find(t=>validate(type,t).ok);
      if(alternative){template=alternative;check=validate(type,template)}
    }
    const commercialReady=!!(own||check.hasSafePhoto);
    return {
      type,template,ownPhoto:own,commercialReady,
      needsPhoto:!own&&!check.hasSafePhoto,
      quality:check.ok?'curated':'needs-attention',
      contract:check.contract,
      style:check.style,
      missing:check.missing,
      badge:check.style.badge
    };
  }

  async function produce(options={}){
    if(typeof state==='undefined')return {ok:false,reason:'state unavailable'};
    const previousImage=state.image||null;
    const p=plan(options.type);
    if(!p.template)return {ok:false,reason:'no template'};

    state.type=p.type;
    applyTemplate(p.template,{keepImage:!!previousImage});
    state.image=previousImage;
    if(!previousImage)state.photoId=p.template.photo||null;

    /* Metadatos internos: el render puede usarlos sin exponer configuración. */
    state.factoryMeta={
      version:3,
      curated:true,
      product:p.type,
      identity:p.contract.identity,
      promise:p.contract.promise,
      seal:p.contract.seal,
      sealNote:p.contract.sealNote,
      badge:p.badge,
      style:p.style,
      commercialReady:p.commercialReady
    };

    renderProducts();renderTemplates();renderForm();renderPreview();
    document.dispatchEvent(new CustomEvent('fabrica:working',{detail:{message:p.ownPhoto?'La Fábrica está trabajando con tu foto…':'La Fábrica está curando una pieza para vos…'}}));
    await sleep(360);
    renderPreview();
    document.dispatchEvent(new CustomEvent('fabrica:ready',{detail:{message:p.commercialReady?'Lista ✨ Pieza curada y preparada para descargar.':'Lista para revisar ✨ Para uso comercial, cargá una foto propia o una imagen con licencia reutilizable.'}}));
    return {ok:true,...p};
  }

  function inspect(){
    const p=plan(typeof state!=='undefined'?state.type:null);
    return {version:3,type:state?.type,template:p.template?.id||null,photoKind:photoBy(state?.photoId)?.kind||null,commercialReady:p.commercialReady,needsPhoto:p.needsPhoto,quality:p.quality,seal:p.contract.seal};
  }

  window.FabricaEngine={version:3,plan,produce,inspect,choose,fill,validate,contracts:PRODUCT_CONTRACTS};
})();