/* FÁBRICA CHAÑAR — SELECTOR AUTOMÁTICO DE MATERIA PRIMA v1
   Puente quirúrgico: no reemplaza el motor ni crea otra interfaz.
   Toma el producto elegido, encuentra la mejor materia registrada y la entrega
   a la fabricación maestra cuando existe una pieza maestra compatible.
*/
(function(){
  const originals={produce:null};
  function materials(){return window.FabricaRawMaterials?.items||[]}
  function masterFor(product){
    const masters=window.FabricaMasterProducts?.products||[];
    const list=materials().filter(x=>x.product===product).sort((a,b)=>b.priority-a.priority);
    return list.map(x=>masters.find(m=>m.id===x.master)).find(Boolean)||null;
  }
  function select(product){
    const list=materials().filter(x=>x.product===product).sort((a,b)=>{
      const sa=window.FabricaRawMaterials?.materialScore?.(a)||0;
      const sb=window.FabricaRawMaterials?.materialScore?.(b)||0;
      return (sb+b.priority)-(sa+a.priority);
    });
    const material=list[0]||null;
    const master=material?window.FabricaMasterProducts?.find?.(material.master):null;
    return {material,master,score:window.FabricaRawMaterials?.materialScore?.(material)||0,candidates:list.length};
  }
  function attach(material,master){
    if(typeof state==='undefined')return;
    const id=window.FabricaOcarinaSystem?.buildIdentity?.({collection:master?.collection||material?.collection||'TERR',number:master?.number||1})||{};
    state.factoryMeta={...(state.factoryMeta||{}),rawMaterial:{version:1,masterId:material?.master||'',theme:material?.theme||'',score:window.FabricaRawMaterials?.materialScore?.(material)||0,photo:material?.photo||null,facts:material?.facts||[],microstory:material?.microstory||'',sources:material?.sources||[],credit:material?.credit||''},...id,materialSelection:'automatic'};
  }
  function install(){
    if(!window.FabricaEngine||originals.produce)return;
    originals.produce=window.FabricaEngine.produce;
    window.FabricaEngine.produce=async function(options={}){
      const type=options.type||state?.type||'postal';
      const selected=select(type);
      const result=await originals.produce.call(this,options);
      if(selected.material){
        const master=selected.master;
        if(master&&window.FabricaMasterFactory?.applyMaster){
          window.FabricaMasterFactory.applyMaster(master);
        }
        attach(selected.material,master);
        renderPreview?.();
      }
      return {...result,rawMaterial:selected.material,selectedMaster:selected.master,materialScore:selected.score};
    };
    window.FabricaEngine.selectMaterial=select;
    window.FabricaEngine.materials=materials;
    window.FabricaEngine.materialSelectorVersion=1;
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(install,700));
  window.FabricaMaterialSelector={version:1,select,masterFor,attach,install};
})();
