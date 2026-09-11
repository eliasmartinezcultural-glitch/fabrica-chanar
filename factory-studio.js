/* FÁBRICA CHAÑAR — TALLER RÁPIDO v1
   Nueva capa: reduce la interfaz a decisiones humanas simples.
   La lógica editorial sigue viviendo en los motores internos.
*/
(function(){
  const COLLECTIONS=[
    {id:'territorio',label:'🌿 Territorio',styles:['patagonia'],types:['postal','ficha','infographic'],hint:'paisaje · río · chacras'},
    {id:'vino',label:'🍇 Vino y paisaje',styles:['vino','cava'],types:['postal','guide','infographic'],hint:'viñedos · bodegas · estepa'},
    {id:'cosecha',label:'🌾 Tiempo de cosecha',styles:['vendimia'],types:['postal','guide','infographic'],hint:'vendimia · trabajo · encuentro'},
    {id:'raices',label:'🎉 Fiestas y raíces',styles:['fiesta'],types:['postal','guide','ficha'],hint:'fiestas · comunidad · producción'},
    {id:'cultura',label:'✦ Cultura local',styles:['arte'],types:['postal','ficha','infographic'],hint:'lugares · historias · miradas'},
    {id:'recuerdo',label:'💛 Un recuerdito',styles:['patagonia','vino','fiesta','arte'],types:['postal'],hint:'para guardar · regalar · llevar'}
  ];
  const $=s=>document.querySelector(s);
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  function random(arr){return arr[Math.floor(Math.random()*arr.length)]}
  function templatesFor(c){return (typeof TEMPLATES==='undefined'?[]:TEMPLATES).filter(t=>c.styles.includes(t.style)&&c.types.includes(t.product))}
  async function make(c){
    const list=templatesFor(c); if(!list.length){if(window.FabricaEngine) return FabricaEngine.produce({type:random(c.types)});return}
    const own=typeof state!=='undefined'&&!!state.image;
    const ranked=list.slice().sort((a,b)=>{
      const safe=x=>typeof PHOTO_BANK!=='undefined'&&PHOTO_BANK.find(p=>p.id===x.photo)?.kind==='usable';
      return (safe(b.photo)?20:0)+(own?10:0)-((safe(a.photo)?20:0)+(own?10:0));
    });
    const t=random(ranked.slice(0,Math.min(3,ranked.length)));
    if(typeof state==='undefined'||typeof applyTemplate!=='function'){return}
    const previousImage=state.image||null;
    state.type=t.product; state.templateId=t.id;
    applyTemplate(t,{keepImage:!!previousImage});
    state.image=previousImage;
    if(!previousImage)state.photoId=t.photo||null;
    if(typeof FabricaEngine!=='undefined'){
      const p=FabricaEngine.plan(t.product);
      state.factoryMeta={version:4,curated:true,quickWorkshop:true,product:t.product,collection:c.id,commercialReady:!!(previousImage||p.commercialReady)};
    }
    renderProducts?.();renderTemplates?.();renderForm?.();renderPreview?.();
    document.dispatchEvent(new CustomEvent('fabrica:working',{detail:{message:'El taller está preparando tu pieza…'}}));
    await wait(320); renderPreview?.();
    document.dispatchEvent(new CustomEvent('fabrica:ready',{detail:{message:(previousImage||t.photo==='ingreso')?'Lista ✨ Mirala, guardala o hacé otra.':'Lista para revisar ✨ Para uso comercial, usá una foto propia o una imagen con licencia reutilizable.'}}));
  }
  function boot(){
    const controls=$('.controls'); if(!controls||$('.factory-studio'))return;
    const box=document.createElement('section'); box.className='factory-studio';
    box.innerHTML='<div class="factory-studio-head"><div><span class="factory-studio-kicker">TALLER RÁPIDO</span><h3>Elegí una idea y la Fábrica la convierte en pieza.</h3></div><button type="button" class="factory-studio-random">✨ Hacé una por mí</button></div><div class="factory-studio-grid"></div><p class="factory-studio-foot">Sin filtros ni configuraciones. La Fábrica decide plantilla, composición y tono.</p>';
    controls.insertBefore(box,controls.firstChild);
    const grid=box.querySelector('.factory-studio-grid');
    COLLECTIONS.forEach(c=>{const b=document.createElement('button');b.type='button';b.className='factory-studio-card';b.innerHTML='<strong>'+c.label+'</strong><span>'+c.hint+'</span>';b.addEventListener('click',()=>make(c));grid.appendChild(b)});
    box.querySelector('.factory-studio-random').addEventListener('click',async()=>{const c=random(COLLECTIONS);await make(c);document.querySelector('.preview-panel')?.scrollIntoView({behavior:'smooth',block:'start'})});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaStudio={version:1,collections:COLLECTIONS,make};
})();
