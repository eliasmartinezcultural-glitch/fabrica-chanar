/* FÁBRICA CHAÑAR — TALLER RÁPIDO v2
   Una decisión humana simple: elegir una idea.
   La Fábrica produce, prepara y guarda la pieza automáticamente.
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
  const random=arr=>arr[Math.floor(Math.random()*arr.length)];
  function templatesFor(c){return (typeof TEMPLATES==='undefined'?[]:TEMPLATES).filter(t=>c.styles.includes(t.style)&&c.types.includes(t.product))}
  async function make(c){
    const list=templatesFor(c);if(!list.length){status('La Fábrica todavía no tiene una pieza adecuada para esa idea.');return}
    const own=typeof state!=='undefined'&&!!state.image;
    const safe=t=>typeof PHOTO_BANK!=='undefined'&&PHOTO_BANK.find(p=>p.id===t.photo)?.kind==='usable';
    const ranked=list.slice().sort((a,b)=>(safe(b)?20:0)-(safe(a)?20:0));
    const t=random(ranked.slice(0,Math.min(3,ranked.length)));
    if(typeof state==='undefined'||typeof applyTemplate!=='function')return;
    const previousImage=state.image||null;
    state.type=t.product;state.templateId=t.id;
    applyTemplate(t,{keepImage:!!previousImage});
    state.image=previousImage;
    if(!previousImage)state.photoId=t.photo||null;
    if(typeof FabricaEngine!=='undefined'){
      const p=FabricaEngine.plan(t.product);
      state.factoryMeta={version:4,curated:true,quickWorkshop:true,product:t.product,collection:c.id,commercialReady:!!(previousImage||p.commercialReady)};
    }
    renderProducts?.();renderTemplates?.();renderForm?.();renderPreview?.();
    document.dispatchEvent(new CustomEvent('fabrica:working',{detail:{message:'La Fábrica está preparando tu pieza…'}}));
    await wait(320);
    renderPreview?.();
    document.dispatchEvent(new CustomEvent('fabrica:ready',{detail:{message:(previousImage||safe(t))?'Lista ✨ La Fábrica la guardó en tu biblioteca.':'Lista ✨ Guardada. Para venderla, revisá o reemplazá la foto.'}}));
    if(typeof document!=='undefined')document.getElementById('btnSave')?.click();
    document.querySelector('.preview-panel')?.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function boot(){
    const controls=$('.controls');if(!controls||$('.factory-studio'))return;
    const box=document.createElement('section');box.className='factory-studio';
    box.innerHTML='<div class="factory-studio-head"><div><span class="factory-studio-kicker">TALLER RÁPIDO</span><h3>Elegí una idea. La Fábrica hace el resto.</h3></div><button type="button" class="factory-studio-random">✨ Hacé una por mí</button></div><div class="factory-studio-grid"></div><p class="factory-studio-foot">Produce, cura y guarda una pieza sin que tengas que diseñarla paso a paso.</p>';
    controls.insertBefore(box,controls.firstChild);
    const grid=box.querySelector('.factory-studio-grid');
    COLLECTIONS.forEach(c=>{const b=document.createElement('button');b.type='button';b.className='factory-studio-card';b.innerHTML='<strong>'+c.label+'</strong><span>'+c.hint+'</span>';b.addEventListener('click',()=>make(c));grid.appendChild(b)});
    box.querySelector('.factory-studio-random').addEventListener('click',async()=>{await make(random(COLLECTIONS))});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaStudio={version:2,collections:COLLECTIONS,make};
})();
