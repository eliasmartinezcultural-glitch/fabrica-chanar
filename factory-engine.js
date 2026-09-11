/* FÁBRICA CHAÑAR — MOTOR AUTÓNOMO v2
   Regla central: la complejidad vive adentro.
   Elías elige una intención; la Fábrica resuelve el resto.
*/
(function(){
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const clean=v=>typeof v==='string'?v.trim():'';
  const bank=()=>typeof PHOTO_BANK!=='undefined'?PHOTO_BANK:[];
  const templates=()=>typeof TEMPLATES!=='undefined'?TEMPLATES:[];
  const ownImage=()=>typeof state!=='undefined'&&!!state.image;
  const usablePhoto=t=>!!t&&!!bank().find(p=>p.id===t.photo&&p.kind==='usable');
  const photoById=id=>bank().find(p=>p.id===id)||null;
  const candidatesFor=type=>templates().filter(t=>t.product===type);

  /* Contratos internos: la interfaz nunca necesita mostrarlos. */
  const CONTRACTS={
    postal:{
      purpose:'Pieza breve de identidad, recuerdo o territorio.',
      required:['title','body'],
      optional:['subtitle','source'],
      accepts:['own','usable','reference'],
      outputs:['png','jpg','print'],
      commercialRule:'own-or-licensed',
      invention:'never',
      quality:{titleMin:3,contentMin:20}
    },
    ficha:{
      purpose:'Ficha informativa de un lugar, patrimonio, proyecto o experiencia.',
      required:['title','body'],
      optional:['category','location','source'],
      accepts:['own','usable','reference'],
      outputs:['png','jpg','print'],
      commercialRule:'own-or-licensed',
      invention:'never',
      quality:{titleMin:3,contentMin:30}
    },
    guide:{
      purpose:'Recorrido breve accionable y verificable.',
      required:['title','intro','items'],
      optional:['source'],
      accepts:['own','usable','reference'],
      outputs:['png','jpg','print'],
      commercialRule:'own-or-licensed',
      invention:'never',
      quality:{titleMin:3,contentMin:35}
    },
    infographic:{
      purpose:'Resumen visual de identidad, datos o territorio.',
      required:['title','headline','body'],
      optional:['source'],
      accepts:['own','usable','reference'],
      outputs:['png','jpg','print'],
      commercialRule:'own-or-licensed',
      invention:'never',
      quality:{titleMin:3,contentMin:25}
    }
  };

  function contract(type){return CONTRACTS[type]||CONTRACTS.postal}

  function templateCompleteness(t){
    if(!t)return 0;
    const c=contract(t.product);
    return c.required.reduce((n,k)=>n+(clean(t[k])?1:0),0)/c.required.length;
  }

  function scoreTemplate(t,{ownPhoto=false}={}){
    if(!t)return -Infinity;
    let score=0;
    const c=contract(t.product);
    score+=templateCompleteness(t)*40;
    if(ownPhoto)score+=15;
    if(usablePhoto(t))score+=100;
    if(clean(t.title))score+=10;
    if(t.product==='guide'&&clean(t.items))score+=8;
    if(t.product==='infographic'&&clean(t.headline))score+=8;
    if(t.product==='ficha'&&clean(t.category))score+=4;
    if(clean(t.source))score+=3;
    if(c.commercialRule==='own-or-licensed'&&!usablePhoto(t)&&!ownPhoto)score-=20;
    return score;
  }

  function choose(type,ownPhoto=false){
    const list=candidatesFor(type);
    return list.slice().sort((a,b)=>scoreTemplate(b,{ownPhoto})-scoreTemplate(a,{ownPhoto}))[0]||null;
  }

  function chooseBest(ownPhoto=false,preferredType){
    const types=['postal','ficha','guide','infographic'];
    const ordered=preferredType&&types.includes(preferredType)
      ?[preferredType,...types.filter(t=>t!==preferredType)]
      :types.slice().sort(()=>Math.random()-.5);
    let best=null;
    ordered.forEach(type=>{
      const t=choose(type,ownPhoto);
      if(!t)return;
      const candidate={type,template:t,score:scoreTemplate(t,{ownPhoto})};
      if(!best||candidate.score>best.score)best=candidate;
    });
    return best;
  }

  function fill(t){
    if(!t)return null;
    return {
      title:t.title||'',subtitle:t.subtitle||'',body:t.body||'',category:t.category||'',
      location:t.location||'',source:t.source||'',headline:t.headline||'',intro:t.intro||'',items:t.items||''
    };
  }

  function dataFromState(){return typeof state!=='undefined'?(state.data||{}):{}}

  function validateData(type,data){
    const c=contract(type);
    const missing=c.required.filter(k=>!clean(data[k]));
    const content=type==='guide'
      ?[data.intro,data.items].map(clean).join(' ')
      :type==='infographic'
        ?[data.headline,data.body].map(clean).join(' ')
        :clean(data.body);
    const min=c.quality.contentMin;
    const title=clean(data.title);
    return {
      ok:missing.length===0&&title.length>=c.quality.titleMin&&content.length>=min,
      missing,
      titleLength:title.length,
      contentLength:content.length
    };
  }

  function resolvePhoto(t,previousImage){
    if(previousImage)return {kind:'own',id:null,commercial:true,needs:false};
    const p=photoById(t&&t.photo);
    if(p&&p.kind==='usable')return {kind:'usable',id:p.id,commercial:true,needs:false};
    if(p&&p.kind==='reference')return {kind:'reference',id:p.id,commercial:false,needs:true};
    return {kind:null,id:null,commercial:false,needs:true};
  }

  function plan(preferredType){
    const own=ownImage();
    const picked=chooseBest(own,preferredType);
    if(!picked)return {type:null,template:null,ownPhoto:own,commercialReady:false,needsPhoto:true,reason:'no-template'};
    const photo=resolvePhoto(picked.template,ownImage()?state.image:null);
    const data=fill(picked.template);
    const validation=validateData(picked.type,data);
    return {
      type:picked.type,template:picked.template,ownPhoto:own,
      commercialReady:photo.commercial&&validation.ok,
      needsPhoto:photo.needs,
      photoKind:photo.kind,
      validation,
      contract:contract(picked.type),
      score:picked.score
    };
  }

  function snapshot(){
    return {
      type:state?.type||null,
      templateId:state?.templateId||null,
      photoKind:currentPhoto()?.kind||null,
      hasOwnPhoto:!!state?.image
    };
  }

  function setWorking(message){
    document.dispatchEvent(new CustomEvent('fabrica:working',{detail:{message}}));
  }
  function setReady(message,detail={}){
    document.dispatchEvent(new CustomEvent('fabrica:ready',{detail:{message,...detail}}));
  }

  function renderAll(){
    if(typeof renderProducts==='function')renderProducts();
    if(typeof renderTemplates==='function')renderTemplates();
    if(typeof renderForm==='function')renderForm();
    if(typeof renderPreview==='function')renderPreview();
  }

  function apply(t,previousImage){
    state.type=t.product;
    state.templateId=t.id;
    state.data=fill(t);
    state.image=previousImage||null;
    state.photoId=previousImage?null:(t.photo||null);
  }

  function gate(p){
    const v=p.validation;
    if(!v.ok)return {ok:false,reason:'content',message:'La Fábrica encontró una pieza incompleta y está buscando una mejor plantilla.'};
    if(p.needsPhoto&&!p.ownPhoto&&p.photoKind!=='usable'){
      return {ok:false,reason:'photo',message:'La pieza necesita una fotografía propia o una imagen con licencia reutilizable.'};
    }
    return {ok:true,reason:'ready',message:'Lista ✨ Pieza preparada.'};
  }

  async function produce(options={}){
    if(typeof state==='undefined')return {ok:false,reason:'state-unavailable'};
    const previousImage=state.image||null;
    setWorking(previousImage?'La Fábrica está trabajando con tu foto…':'La Fábrica está buscando la mejor combinación…');

    let p=plan(options.type);
    if(!p.template)return {ok:false,reason:'no-template'};

    /* Si la primera elección no es exportable sin foto, buscar otra antes de molestar a Elías. */
    if(!previousImage&&!p.commercialReady){
      const alternatives=['postal','guide','infographic'].filter(x=>x!==p.type);
      for(const type of alternatives){
        const alt=plan(type);
        if(alt.template&&alt.commercialReady){p=alt;break;}
      }
    }

    apply(p.template,previousImage);
    renderAll();
    await sleep(180);

    /* Segunda validación contra el estado real, después de aplicar la plantilla. */
    const realData=dataFromState();
    const realValidation=validateData(state.type,realData);
    p.validation=realValidation;
    p.commercialReady=realValidation.ok&&(!!previousImage||p.photoKind==='usable');
    const result=gate(p);

    if(!result.ok&&result.reason==='content'){
      const fallback=choose(p.type,!!previousImage);
      if(fallback&&fallback.id!==p.template.id){
        apply(fallback,previousImage);
        renderAll();
        p=plan(state.type);
        p.validation=validateData(state.type,dataFromState());
        p.commercialReady=p.validation.ok&&(!!previousImage||p.photoKind==='usable');
      }
    }

    await sleep(220);
    renderPreview();
    const finalPlan=plan(state.type);
    const finalGate=gate(finalPlan);
    const message=finalGate.ok
      ?'Lista ✨ Mirala, descargala o hacé otra.'
      :'Necesita una foto propia o con licencia reutilizable para una salida comercial.';
    setReady(message,{commercialReady:finalGate.ok,needsPhoto:finalGate.reason==='photo',snapshot:snapshot()});
    return {ok:true,...finalPlan,gate:finalGate};
  }

  function inspect(){
    const p=plan(state?.type);
    return {
      type:p.type,template:p.template?.id||null,photoKind:p.photoKind||null,
      commercialReady:p.commercialReady,needsPhoto:p.needsPhoto,
      validation:p.validation,contract:p.contract
    };
  }

  window.FabricaEngine={
    version:'2.0',contracts:CONTRACTS,plan,produce,inspect,choose,fill,validateData
  };
})();
