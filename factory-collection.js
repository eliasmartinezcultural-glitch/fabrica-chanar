/* FÁBRICA CHAÑAR — COLECCIONES EDITORIALES v4
   Ley de producción de alto valor:
   cada serie debe sentirse pensada, curada y armada como una pequeña edición.
   El volumen nunca manda sobre la calidad.
   v4: una misma colección no puede iniciar dos fabricaciones concurrentes;
   cada pieza sigue pasando por el motor único, el selector cerrado y el
   guardado antes de permitir fabricar la siguiente.
*/
(function(){
  const COLLECTIONS=[
    {id:'recuerdito',name:'Un recuerdito de Chañar',emoji:'💛',mood:'cercano',types:['postal','ficha','infographic'],styles:['patagonia','vino','fiesta','arte'],sequence:['p-ingreso','p-vinedos','p-pelon']},
    {id:'territorio',name:'Pedacitos de territorio',emoji:'🌿',mood:'territorial',types:['postal','ficha','guide'],styles:['patagonia','cava'],sequence:['p-ingreso','g-identidad','f-sch']},
    {id:'vino',name:'Vino y paisaje',emoji:'🍇',mood:'sereno',types:['postal','ficha','guide','infographic'],styles:['vino','cava','vendimia'],sequence:['p-vinedos','f-mal','g-vino']},
    {id:'raices',name:'Fiestas y raíces',emoji:'🎉',mood:'festivo',types:['postal','guide','infographic'],styles:['fiesta','vendimia'],sequence:['p-pelon','g-fiesta','i-pelon']},
    {id:'cultura',name:'Pequeñas historias',emoji:'✦',mood:'cultural',types:['ficha','postal','infographic'],styles:['arte','patagonia'],sequence:['p-chical','f-chical','i-chical']}
  ];
  const PHRASES={
    recuerdito:['Un pequeño recuerdo de San Patricio del Chañar.','Para guardar un pedacito de este lugar.','Un recuerdito para volver a mirar.'],
    territorio:['Un pedacito de territorio para guardar.','Mirá despacio: acá también vive Chañar.','Una pequeña mirada sobre este lugar.'],
    vino:['Entre viñedos, estepa y agua.','Una mirada al paisaje del vino.','Un pedacito del paisaje vitivinícola chañarense.'],
    raices:['Fiesta, trabajo y raíces.','Una celebración de lo nuestro.','Un pedacito de Chañar en fiesta.'],
    cultura:['Una pequeña historia de este lugar.','Historias, personas y territorio.','Una mirada local para guardar.']
  };
  const ROLES=['apertura','desarrollo','cierre'];
  const busy=new Set();
  const $=s=>document.querySelector(s);
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  function find(id){return COLLECTIONS.find(c=>c.id===id)||COLLECTIONS[0]}
  function eligible(c){
    const templates=typeof TEMPLATES==='undefined'?[]:TEMPLATES;
    return templates.filter(t=>c.types.includes(t.product)&&c.styles.includes(t.style));
  }
  function curatedTemplates(c,count){
    const pool=eligible(c), byId=id=>pool.find(t=>t.id===id);
    const ordered=c.sequence.map(byId).filter(Boolean);
    const extras=pool.filter(t=>!ordered.some(x=>x.id===t.id));
    return [...ordered,...extras].slice(0,Math.min(Math.max(count,1),5));
  }
  function renderChooser(){
    const host=$('#collectionGrid'); if(!host)return;
    host.innerHTML=COLLECTIONS.map(c=>`<button class="collection-card" type="button" data-collection="${c.id}"><b>${c.emoji}</b><strong>${c.name}</strong><span>Serie curada · ${c.mood}</span></button>`).join('');
    host.querySelectorAll('[data-collection]').forEach(b=>b.addEventListener('click',()=>produceSeries(b.dataset.collection,3)));
  }
  async function snapshotSeriesPiece(c,t,part,total,seriesId){
    if(typeof validate==='function'&&!validate())return null;
    return {
      id:`${seriesId}-${String(part).padStart(2,'0')}-${t.id}`,
      type:state.type,templateId:state.templateId,data:{...state.data},
      image:state.image&&typeof compressImage==='function'?await compressImage(state.image):state.image||null,
      photoId:state.photoId,created:new Date().toISOString(),
      factoryMeta:{...(state.factoryMeta||{}),collection:{id:c.id,name:c.name,part,total,seriesId,role:ROLES[part-1]||'pieza',seriesMode:true,editorial:true}}
    };
  }
  async function produceSeries(id,count=3){
    if(busy.has(id))return [];
    const c=find(id), total=Math.min(Math.max(count,1),5), templates=curatedTemplates(c,total), results=[];
    const button=$(`[data-collection="${id}"]`);
    busy.add(id);button?.classList.add('is-working');button?.setAttribute('aria-busy','true');
    if(typeof FabricaEngine==='undefined'||typeof state==='undefined'){busy.delete(id);button?.classList.remove('is-working');button?.removeAttribute('aria-busy');return []}
    const seriesId=`SERIE-${c.id.toUpperCase()}-${Date.now()}`;
    const before=state.image||null;
    const saved=[];
    try{
      for(let i=0;i<templates.length;i++){
        const t=templates[i];
        const result=await FabricaEngine.produce({type:t.product,templateId:t.id});
        if(!result?.ok){
          status(`${c.emoji} La serie se detuvo en la pieza ${i+1}: ${result?.reason||'fabricación no disponible'}.`);
          break;
        }
        if(before)state.image=before;
        state.factoryMeta=state.factoryMeta||{};
        state.factoryMeta.collection={id:c.id,name:c.name,part:i+1,total,seriesId,role:ROLES[i]||'pieza',seriesMode:true,editorial:true};
        state.factoryMeta.friendlyLine=PHRASES[c.id][i]||PHRASES[c.id][PHRASES[c.id].length-1];
        renderProducts();renderTemplates();renderForm();renderPreview();
        const item=await snapshotSeriesPiece(c,t,i+1,total,seriesId);
        if(item){
          saved.push(item);results.push({id:t.id,type:t.product,title:t.title,part:i+1,role:ROLES[i]||'pieza',closedCatalogSlot:item.factoryMeta?.closedCatalog?.[t.product]?.slot||null});
          if(typeof setLibrary==='function'){
            const current=typeof library==='function'?library():[];
            setLibrary([item,...current.filter(old=>old.id!==item.id)].slice(0,18));
          }
        }
        await wait(220);
      }
      document.dispatchEvent(new CustomEvent('fabrica:series-ready',{detail:{collection:c,results,saved:saved.length,seriesId}}));
      status(`${c.emoji} Serie curada y guardada: ${saved.length} piezas. La Fábrica armó apertura, desarrollo y cierre.`);
      document.querySelector('.preview-panel')?.scrollIntoView({behavior:'smooth',block:'start'});
      return results;
    }catch(error){
      console.error(error);
      status(`${c.emoji} La serie quedó parcialmente guardada (${saved.length} piezas). La Fábrica no siguió fabricando para no bajar el estándar.`);
      return results;
    }finally{
      busy.delete(id);button?.classList.remove('is-working');button?.removeAttribute('aria-busy');
    }
  }
  window.FabricaCollections={version:4,collections:COLLECTIONS,produceSeries,phrases:PHRASES,renderChooser};
  document.addEventListener('DOMContentLoaded',()=>setTimeout(renderChooser,220));
})();
