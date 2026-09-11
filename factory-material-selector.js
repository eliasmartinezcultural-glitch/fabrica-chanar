/* FÁBRICA CHAÑAR — SELECTOR AUTOMÁTICO DE MATERIA PRIMA v2
   Integración quirúrgica: el producto elegido por Elías es soberano.
   La materia prima se selecciona y se inyecta en la fabricación, pero nunca
   cambia el tipo de producto ni abre una segunda máquina de producción.
*/
(function(){
  const originals={produce:null};
  function materials(){return window.FabricaRawMaterials?.items||[]}
  function masterFor(material){return material?.master&&window.FabricaMasterProducts?.find?.(material.master)||null}
  function fitFor(material,product){return Number(material?.productFit?.[product]||0)}
  function select(product){
    const candidates=materials().map(material=>{
      const score=(window.FabricaRawMaterials?.materialScore?.(material,product)||0)+fitFor(material,product)*2;
      return {material,master:masterFor(material),score,fit:fitFor(material,product),sourceType:material?.product===product?'exact-product-material':'compatible-source-material'};
    }).filter(x=>x.fit>0).sort((a,b)=>b.score-a.score || (b.material.priority||0)-(a.material.priority||0));
    const selected=candidates[0]||{material:null,master:null,score:0,fit:0,sourceType:'none'};
    return {...selected,candidates:candidates.length,product};
  }
  function attach(selection,product){
    if(typeof state==='undefined'||!selection?.material)return;
    const material=selection.material,master=selection.master;
    const id=window.FabricaOcarinaSystem?.buildIdentity?.({collection:material.collection||master?.collection||'territorio',number:master?.number||1})||{};
    const fact=material.facts?.[0]||null;
    state.factoryMeta={...(state.factoryMeta||{}),
      rawMaterial:{version:2,masterId:material.master||'',theme:material.theme||'',score:selection.score,fit:selection.fit,sourceType:selection.sourceType,photo:material.photo||null,facts:material.facts||[],microstory:material.microstory||'',sources:material.sources||[],credit:material.credit||''},
      ...id,
      productMaterialFit:{product,fit:selection.fit,selectionReason:selection.sourceType},
      photoSelection:{asset:material.photo?.asset||null,role:material.photo?.role||'',focus:material.photo?.focus||'',crop:material.photo?.crop||'',rights:material.photo?.rights||'unknown',commercialSafe:material.photo?.commercialSafe===true},
      selectedFact:fact,
      materialSelection:'automatic'
    };
    if(material.photo?.asset){state.photoId=material.photo.asset;state.factoryMeta.photoId=material.photo.asset;}
  }
  function install(){
    if(!window.FabricaEngine||originals.produce)return;
    originals.produce=window.FabricaEngine.produce;
    window.FabricaEngine.produce=async function(options={}){
      const type=options.type||state?.type||'postal';
      const selected=select(type);
      const result=await originals.produce.call(this,options);
      if(selected.material){
        /* Nunca aplicamos la maestra como producto: solo usamos sus materias. */
        attach(selected,type);
        if(typeof renderPreview==='function')renderPreview();
      }
      return {...result,rawMaterial:selected.material,selectedMaster:selected.master,materialScore:selected.score,materialFit:selected.fit,materialSourceType:selected.sourceType};
    };
    window.FabricaEngine.selectMaterial=select;
    window.FabricaEngine.materials=materials;
    window.FabricaEngine.materialSelectorVersion=2;
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(install,700));
  window.FabricaMaterialSelector={version:2,select,masterFor,attach,install};
})();
