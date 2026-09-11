/* FÁBRICA CHAÑAR — MOTOR AUTÓNOMO
   Regla: la complejidad vive adentro. La interfaz no necesita aprenderla.
*/
(function(){
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const clean=v=>typeof v==='string'?v.trim():'';
  const usablePhoto=t=>typeof PHOTO_BANK!=='undefined'&&PHOTO_BANK.find(p=>p.id===t?.photo&&p.kind==='usable');
  const candidatesFor=type=>(typeof TEMPLATES==='undefined'?[]:TEMPLATES.filter(t=>t.product===type));

  function scoreTemplate(t,{ownPhoto=false}={}){
    let score=0;
    if(ownPhoto) score+=2;
    if(usablePhoto(t)) score+=100;
    if(clean(t.title)) score+=10;
    if(t.product==='guide'&&clean(t.items))score+=4;
    if(t.product==='infographic'&&clean(t.headline))score+=4;
    if(t.product==='ficha'&&clean(t.category))score+=3;
    return score;
  }

  function choose(type,ownPhoto=false){
    return candidatesFor(type).sort((a,b)=>scoreTemplate(b,{ownPhoto})-scoreTemplate(a,{ownPhoto}))[0]||null;
  }

  function fill(t){
    if(!t)return null;
    return {title:t.title||'',subtitle:t.subtitle||'',body:t.body||'',category:t.category||'',location:t.location||'',source:t.source||'',headline:t.headline||'',intro:t.intro||'',items:t.items||''};
  }

  function plan(preferredType){
    const own=!!(typeof state!=='undefined'&&state.image);
    const types=['postal','ficha','guide','infographic'];
    const type=types.includes(preferredType)?preferredType:types[Math.floor(Math.random()*types.length)];
    const template=choose(type,own);
    return {type,template,ownPhoto:own,commercialReady:own||!!usablePhoto(template),needsPhoto:!own&&!usablePhoto(template)};
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

    renderProducts();renderTemplates();renderForm();renderPreview();
    document.dispatchEvent(new CustomEvent('fabrica:working',{detail:{message:p.ownPhoto?'La Fábrica está trabajando con tu foto…':'La Fábrica está eligiendo una pieza segura…'}}));
    await sleep(360);
    renderPreview();
    document.dispatchEvent(new CustomEvent('fabrica:ready',{detail:{message:p.commercialReady?'Lista ✨ Pieza preparada para descargar.':'Lista para revisar ✨ Para uso comercial, cargá una foto propia o una imagen con licencia reutilizable.'}}));
    return {ok:true,...p};
  }

  function inspect(){
    const p=plan(state?.type);
    return {type:state?.type,template:p.template?.id||null,photoKind:currentPhoto()?.kind||null,commercialReady:p.commercialReady,needsPhoto:p.needsPhoto};
  }

  window.FabricaEngine={plan,produce,inspect,choose,fill};
})();
