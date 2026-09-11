/* FÁBRICA CHAÑAR — COLECCIONES EDITORIALES v1
   La máquina piensa en series, no en piezas aisladas.
   Objetivo: mucha preestructura + mínima intervención de Elías.
*/
(function(){
  const COLLECTIONS=[
    {id:'recuerdito',name:'Un recuerdito de Chañar',emoji:'💛',mood:'cercano',types:['postal','ficha','infographic'],styles:['patagonia','vino','fiesta','arte']},
    {id:'territorio',name:'Pedacitos de territorio',emoji:'🌿',mood:'territorial',types:['postal','ficha','guide'],styles:['patagonia','cava']},
    {id:'vino',name:'Vino y paisaje',emoji:'🍇',mood:'sereno',types:['postal','ficha','guide','infographic'],styles:['vino','cava','vendimia']},
    {id:'raices',name:'Fiestas y raíces',emoji:'🎉',mood:'festivo',types:['postal','guide','infographic'],styles:['fiesta','vendimia']},
    {id:'cultura',name:'Pequeñas historias',emoji:'✦',mood:'cultural',types:['ficha','postal','infographic'],styles:['arte','patagonia']}
  ];
  const PHRASES={
    recuerdito:['Un pequeño recuerdo de San Patricio del Chañar.','Para guardar un pedacito de este lugar.','Un recuerdito para volver a mirar.','Pequeñas cosas que también cuentan Chañar.'],
    territorio:['Un pedacito de territorio para guardar.','Mirá despacio: acá también vive Chañar.','Una pequeña mirada sobre este lugar.','Para llevarte un pedacito del valle.'],
    vino:['Entre viñedos, estepa y agua.','Una mirada al paisaje del vino.','Donde el valle se encuentra con la estepa.','Un pedacito del paisaje vitivinícola chañarense.'],
    raices:['Fiesta, trabajo y raíces.','Una celebración de lo nuestro.','Pequeñas tradiciones que siguen contando.','Un pedacito de Chañar en fiesta.'],
    cultura:['Una pequeña historia de este lugar.','Historias, personas y territorio.','Una mirada local para guardar.','Lo cotidiano también cuenta.']
  };
  const $=s=>document.querySelector(s);
  const pick=a=>a[Math.floor(Math.random()*a.length)];
  function find(id){return COLLECTIONS.find(c=>c.id===id)||COLLECTIONS[0]}
  function eligible(c){
    const templates=typeof TEMPLATES==='undefined'?[]:TEMPLATES;
    return templates.filter(t=>c.types.includes(t.product)&&c.styles.includes(t.style));
  }
  function choose(c,used){
    const pool=eligible(c); if(!pool.length)return null;
    const fresh=pool.filter(t=>!used.includes(t.id));
    return pick(fresh.length?fresh:pool);
  }
  function renderChooser(){
    const host=$('#collectionGrid'); if(!host)return;
    host.innerHTML=COLLECTIONS.map(c=>`<button class="collection-card" type="button" data-collection="${c.id}"><b>${c.emoji}</b><strong>${c.name}</strong><span>Serie ${c.mood}</span></button>`).join('');
    host.querySelectorAll('[data-collection]').forEach(b=>b.addEventListener('click',()=>produceSeries(b.dataset.collection,3)));
  }
  async function produceSeries(id,count=3){
    const c=find(id), used=[], results=[];
    const button=$(`[data-collection="${id}"]`);
    button?.classList.add('is-working');
    if(typeof FabricaEngine==='undefined'||typeof state==='undefined')return;
    for(let i=0;i<Math.min(Math.max(count,1),5);i++){
      const t=choose(c,used); if(!t)break; used.push(t.id);
      const before=state.image||null;
      state.type=t.product; state.templateId=t.id; applyTemplate(t,{keepImage:!!before}); state.image=before;
      if(!before)state.photoId=t.photo||null;
      state.factoryMeta=state.factoryMeta||{};
      state.factoryMeta.collection={id:c.id,name:c.name,part:i+1,total:Math.min(count,5),seriesMode:true};
      state.factoryMeta.friendlyLine=pick(PHRASES[c.id]);
      renderProducts();renderTemplates();renderForm();renderPreview();
      results.push({id:t.id,type:t.product,title:t.title});
      await new Promise(r=>setTimeout(r,180));
    }
    button?.classList.remove('is-working');
    document.dispatchEvent(new CustomEvent('fabrica:series-ready',{detail:{collection:c,results}}));
    status(`${c.emoji} Serie preparada: ${results.length} piezas. La última quedó lista para mirar o guardar.`);
    document.querySelector('.preview-panel')?.scrollIntoView({behavior:'smooth',block:'start'});
    return results;
  }
  window.FabricaCollections={version:1,collections:COLLECTIONS,produceSeries,phrases:PHRASES,renderChooser};
  document.addEventListener('DOMContentLoaded',()=>setTimeout(renderChooser,220));
})();