/* FÁBRICA CHAÑAR — SELECTOR AUTOMÁTICO DE MATERIA PRIMA v3
   Producto soberano + materia prima efectiva + autodiagnóstico.
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
  function assetFor(material){
    const id=material?.photo?.asset;
    return id?window.FabricaAssets?.find?.(id)||null:null;
  }
  function attach(selection,product){
    if(typeof state==='undefined'||!selection?.material)return;
    const material=selection.material,master=selection.master,asset=assetFor(material);
    const id=window.FabricaOcarinaSystem?.buildIdentity?.({collection:material.collection||master?.collection||'territorio',number:master?.number||1})||{};
    const fact=material.facts?.[0]||null;
    state.factoryMeta={...(state.factoryMeta||{}),
      rawMaterial:{version:3,masterId:material.master||'',theme:material.theme||'',score:selection.score,fit:selection.fit,sourceType:selection.sourceType,photo:material.photo||null,facts:material.facts||[],microstory:material.microstory||'',sources:material.sources||[],credit:material.credit||''},
      ...id,
      productMaterialFit:{product,fit:selection.fit,selectionReason:selection.sourceType},
      photoSelection:{asset:material.photo?.asset||null,role:material.photo?.role||'',focus:material.photo?.focus||'',crop:material.photo?.crop||'',rights:material.photo?.rights||'unknown',commercialSafe:material.photo?.commercialSafe===true},
      selectedFact:fact,
      materialSelection:'automatic',
      materialPhotoApplied:false
    };
    /* La materia prima no queda solo en metadata: pasa a ser la imagen efectiva. */
    if(asset?.photo){
      state.photoId=asset.id;
      state.image=asset.photo;
      state.factoryMeta.photoId=asset.id;
      state.factoryMeta.materialPhotoApplied=true;
      state.factoryMeta.materialPhotoSource=asset.source||'';
      state.factoryMeta.materialPhotoCredit=material.credit||asset.author||'';
    }
  }
  function install(){
    if(!window.FabricaEngine||originals.produce)return;
    originals.produce=window.FabricaEngine.produce;
    window.FabricaEngine.produce=async function(options={}){
      const type=options.type||state?.type||'postal';
      const selected=select(type);
      const result=await originals.produce.call(this,options);
      if(selected.material){
        attach(selected,type);
        if(typeof renderPreview==='function')renderPreview();
      }
      return {...result,rawMaterial:selected.material,selectedMaster:selected.master,materialScore:selected.score,materialFit:selected.fit,materialSourceType:selected.sourceType};
    };
    window.FabricaEngine.selectMaterial=select;
    window.FabricaEngine.materials=materials;
    window.FabricaEngine.materialSelectorVersion=3;
  }
  function selfTest(){
    const products=['postal','ficha','guide','infographic'];
    const results=products.map(product=>{
      const s=select(product);
      return {product,master:s.master?.id||null,fit:s.fit,score:s.score,photo:s.material?.photo?.asset||null,commercialSafe:s.material?.photo?.commercialSafe===true,pass:!!s.material&&s.fit>0&&!!s.material.photo?.asset};
    });
    const ok=results.every(x=>x.pass);
    return {version:3,ok,results,rule:'producto soberano → materia compatible → foto/dato/fuente → composición'};
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(install,700));
  window.FabricaMaterialSelector={version:3,select,masterFor,attach,install,selfTest};
})();
