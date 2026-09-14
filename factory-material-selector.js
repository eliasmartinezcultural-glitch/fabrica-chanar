/* FÁBRICA CHAÑAR — SELECTOR CERRADO v7
   4 productos soberanos · 10 fotos por producto · 40 matrices.
   v7: una foto propia del usuario nunca es reemplazada por el material editorial
   seleccionado; el material queda como referencia/proveniencia separada.
*/
(function(){
  const originals={produce:null};
  const PRODUCTS=['postal','ficha','guide','infographic'];
  function materials(){return window.FabricaRawMaterials?.items||[]}
  function catalog(){return window.FabricaClosedCatalog||null}
  function editorials(){return window.FabricaEditorialRealizations||null}
  function masterFor(material){return material?.master&&window.FabricaMasterProducts?.find?.(material.master)||null}
  function materialForMaster(masterId){return materials().find(m=>m.master===masterId)||null}
  function fitFor(material,product){return Number(material?.productFit?.[product]||0)}
  function select(product){
    const closed=catalog()?.forProduct?.(product)||[];
    const current=typeof state!=='undefined'?(Number(state.factoryMeta?.closedCatalog?.[product]?.slot||0)):0;
    const slot=closed[current%Math.max(1,closed.length)]||null;
    const editorial=slot?editorials()?.get?.(product,slot.slot):null;
    const material=slot?materialForMaster(slot.master):null;
    const master=material?masterFor(material):null;
    return {product,slot:slot?.slot||1,closedOptions:closed.length,material,master,editorial,score:material?(window.FabricaRawMaterials?.materialScore?.(material,product)||0):0,fit:material?fitFor(material,product):0,sourceType:'closed-catalog',photoAsset:slot?.photo||null};
  }
  function assetForId(id){return id?window.FabricaAssets?.find?.(id)||null:null}
  function rightsFor(asset,editorial,material){
    const kind=asset?.kind||editorial?.rights||material?.photo?.rights||'unknown';
    const commercialSafe=asset?.kind==='usable'||asset?.kind==='own'||asset?.kind==='authorized'||asset?.kind==='licensed'||material?.photo?.commercialSafe===true;
    return {kind,commercialSafe};
  }
  function attach(selection,product){
    if(typeof state==='undefined'||!selection?.material)return;
    const previousOwnImage=typeof state.image==='string'&&state.image.startsWith('data:image/');
    const material=selection.material,master=selection.master,editorial=selection.editorial,asset=assetForId(selection.photoAsset)||assetForId(material?.photo?.asset);
    const id=window.FabricaOcarinaSystem?.buildIdentity?.({collection:material.collection||master?.collection||'territorio',number:master?.number||1})||{};
    const fact=editorial?.fact||material.facts?.[0]||null;
    const previous=state.factoryMeta?.closedCatalog||{};
    const rights=rightsFor(asset,editorial,material);
    state.factoryMeta={...(state.factoryMeta||{}),
      rawMaterial:{version:7,masterId:material.master||'',theme:material.theme||'',score:selection.score,fit:selection.fit,sourceType:selection.sourceType,photo:material.photo||null,facts:material.facts||[],microstory:material.microstory||'',sources:material.sources||[],credit:material.credit||''},
      masterProduct:{version:1,id:master?.id||material.master||'',number:master?.number||null,collection:master?.collection||material.collection||'',template:master?.template||'',name:master?.name||''},
      ...id,
      productMaterialFit:{product,fit:selection.fit,selectionReason:selection.sourceType},
      closedCatalog:{...previous,[product]:{slot:selection.slot,total:selection.closedOptions,photo:selection.photoAsset,master:master?.id||selection.material?.master||null,direction:selection.slot&&catalog()?.get?.(product,selection.slot)?.direction||'',execution:catalog()?.get?.(product,selection.slot)?.execution||null}},
      editorialRealization:{version:1,slot:selection.slot,product,headline:editorial?.headline||'',subline:editorial?.subline||'',body:editorial?.body||'',fact,factLabel:editorial?.factLabel||'',source:editorial?.source||'',sourceUrl:editorial?.sourceUrl||'',photoSource:editorial?.photoSource||'',photoUrl:editorial?.photoUrl||'',rights:editorial?.rights||'reference',reverse:editorial?.reverse||'',status:editorial?.status||'PROTOTIPO'},
      photoSelection:{asset:asset?.id||selection.photoAsset||null,role:material.photo?.role||'editorial',focus:catalog()?.get?.(product,selection.slot)?.direction||material.photo?.focus||'',crop:material.photo?.crop||'',rights:rights.kind,commercialSafe:previousOwnImage||rights.commercialSafe,source:asset?.source||editorial?.photoSource||'',credit:asset?.author||material.credit||''},
      selectedFact:fact,
      materialSelection:'closed-catalog',
      materialPhotoApplied:false
    };
    state.factoryMeta.photoProvenance={version:1,asset:asset?.id||selection.photoAsset||null,source:asset?.source||editorial?.photoSource||'',url:asset?.url||editorial?.photoUrl||'',author:asset?.author||material?.photo?.author||material?.credit||'',license:asset?.license||material?.photo?.license||'',rights:rights.kind,commercialSafe:previousOwnImage||rights.commercialSafe};
    if(asset?.photo){
      state.photoId=asset.id;
      state.factoryMeta.photoId=asset.id;
      state.factoryMeta.materialPhotoSource=asset.source||'';
      state.factoryMeta.materialPhotoCredit=asset.author||material.credit||'';
      state.factoryMeta.photoSelection.src=asset.photo;
      state.factoryMeta.photoSelection.source=asset.source||editorial?.photoSource||'';
      state.factoryMeta.photoSelection.credit=asset.author||material.credit||'';
      /* A user-uploaded photo has priority over the closed catalog's material image. */
      if(previousOwnImage){
        state.factoryMeta.materialPhotoApplied=false;
        state.factoryMeta.photoMode='own';
      }else{
        state.image=rights.commercialSafe?asset.photo:null;
        state.factoryMeta.materialPhotoApplied=!!rights.commercialSafe;
        state.factoryMeta.photoMode=rights.commercialSafe?'safe-asset':'reference-only';
      }
    }else if(previousOwnImage){
      state.factoryMeta.photoMode='own';
      state.factoryMeta.materialPhotoApplied=false;
    }
    if(closedOptionsReady(product))state.factoryMeta.closedCatalogComplete=true;
    renderPreview?.();
    window.FabricaMasterVisuals?.apply?.();
  }
  function closedOptionsReady(product){const c=catalog()?.forProduct?.(product)||[];return c.length===10}
  function install(){
    if(!window.FabricaEngine||originals.produce)return;
    originals.produce=window.FabricaEngine.produce;
    window.FabricaEngine.produce=async function(options={}){
      const type=options.type||state?.type||'postal';
      const selected=select(type);
      const result=await originals.produce.call(this,options);
      if(selected.material){attach(selected,type);if(typeof renderPreview==='function')renderPreview();}
      return {...result,rawMaterial:selected.material,selectedMaster:selected.master,masterProduct:selected.master,editorialRealization:selected.editorial,materialScore:selected.score,materialFit:selected.fit,materialSourceType:selected.sourceType,closedCatalogSlot:selected.slot,closedCatalogOptions:selected.closedOptions,closedCatalogPhoto:selected.photoAsset,photoCommercialSafe:state.factoryMeta?.photoSelection?.commercialSafe===true};
    };
    window.FabricaEngine.selectMaterial=select;
    window.FabricaEngine.materials=materials;
    window.FabricaEngine.materialSelectorVersion=7;
  }
  function selfTest(){
    const results=PRODUCTS.map(product=>{const c=catalog()?.forProduct?.(product)||[];const s=select(product);const e=editorials()?.realizations?.[product]||[];return {product,template:catalog()?.products?.[product]?.template||product,options:c.length,editorialOptions:e.length,master:s.master?.id||null,photo:s.photoAsset,pass:c.length===10&&e.length===10&&!!s.material&&!!s.photoAsset&&!!s.editorial};});
    return {version:7,ok:results.every(x=>x.pass),results,summary:catalog()?.summary?.()||null,editorialSummary:editorials()?.summary?.()||null,rule:'4 plantillas × 10 fotos = 40 matrices cerradas y realizadas'};
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(install,700));
  window.FabricaMaterialSelector={version:7,select,masterFor,attach,install,selfTest};
})();
