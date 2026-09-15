/* FÁBRICA CHAÑAR — SELECTOR DE MATERIA PRIMA v13
   CATÁLOGO CERRADO, PRODUCCIÓN ABIERTA.

   Las 10 matrices por familia son DISEÑOS BASE reutilizables, no cupones
   de producción. La Biblioteca y el historial pueden registrar piezas sin
   consumir ni bloquear una matriz editorial.
*/
(function(){
  const originals={produce:null};
  const PRODUCTS=['postal','ficha','guide','infographic'];
  const validProducts=new Set(PRODUCTS);
  const LEDGER_KEY='fabrica-chanar-production-ledger-v2';
  let producing=false,batchLock=false,batchToken=null;
  const pendingSlots={};
  function materials(){return window.FabricaRawMaterials?.items||[]}
  function catalog(){return window.FabricaClosedCatalog||null}
  function editorials(){return window.FabricaEditorialRealizations||null}
  function masterFor(material){return material?.master&&window.FabricaMasterProducts?.find?.(material.master)||null}
  function materialForMaster(masterId){return materials().find(m=>m.master===masterId)||null}
  function fitFor(material,product){return Number(material?.productFit?.[product]||0)}
  function savedItems(){try{return typeof library==='function'?library():[]}catch{return[]}}
  function readLedger(){try{const x=JSON.parse(localStorage.getItem(LEDGER_KEY)||'{}');return x&&typeof x==='object'?x:{}}catch{return{}}}
  function writeLedger(ledger){try{localStorage.setItem(LEDGER_KEY,JSON.stringify(ledger));return true}catch{return false}}
  function ensureLedger(ledger){PRODUCTS.forEach(p=>{if(!ledger[p]||typeof ledger[p]!=='object')ledger[p]={count:0,lastSlot:0,history:[]};ledger[p].count=Number(ledger[p].count||0);ledger[p].lastSlot=Number(ledger[p].lastSlot||0);ledger[p].history=Array.isArray(ledger[p].history)?ledger[p].history:[]});return ledger}
  function productionInfo(product){const ledger=ensureLedger(readLedger());const x=ledger[product]||{count:0,lastSlot:0,history:[]};return{count:x.count,lastSlot:x.lastSlot,history:x.history.slice(-50)}}
  function nextSlot(product){const closed=catalog()?.forProduct?.(product)||[];if(!closed.length)return null;const info=productionInfo(product);const idx=closed.findIndex(r=>Number(r.slot)===Number(info.lastSlot));return closed[(idx+1+closed.length)%closed.length]||closed[0]}
  function pendingFor(product){return new Set(pendingSlots[product]||[])}
  function reserve(product,slot){const n=Number(slot||0);if(!validProducts.has(product)||n<1)return false;pendingSlots[product]=Array.isArray(pendingSlots[product])?pendingSlots[product]:[];if(!pendingSlots[product].includes(n))pendingSlots[product].push(n);return true}
  function release(product,slot){const n=Number(slot||0),list=pendingSlots[product]||[];pendingSlots[product]=list.filter(x=>Number(x)!==n);return true}
  function commit(product,slot){
    if(!validProducts.has(product))return false;
    const n=Number(slot||0),closed=catalog()?.forProduct?.(product)||[];
    if(n<1||!closed.some(row=>Number(row.slot)===n))return false;
    const ledger=ensureLedger(readLedger()),entry=ledger[product];
    entry.count+=1;entry.lastSlot=n;entry.history.push({slot:n,at:new Date().toISOString()});entry.history=entry.history.slice(-200);
    const ok=writeLedger(ledger);
    if(ok){release(product,n);if(typeof state!=='undefined'&&state.factoryMeta?.closedCatalog?.[product]?.slot===n){state.factoryMeta.closedCatalog[product].committed=true;state.factoryMeta.productionCursor={...(state.factoryMeta.productionCursor||{}),committed:true,count:entry.count,lastSlot:n,remaining:'abierto'}}}
    return ok;
  }
  function select(product){
    const safeProduct=validProducts.has(product)?product:'postal',closed=catalog()?.forProduct?.(safeProduct)||[];
    if(!closed.length)return{product:safeProduct,slot:null,closedOptions:0,material:null,master:null,editorial:null,score:0,fit:0,sourceType:'open-production',photoAsset:null,exhausted:true,usedSlots:[],pendingSlots:[],productionCount:0};
    const next=nextSlot(safeProduct),pending=pendingFor(safeProduct),info=productionInfo(safeProduct);
    const editorial=editorials()?.get?.(safeProduct,next.slot)||null,material=materialForMaster(next.master),master=material?masterFor(material):null;
    return{product:safeProduct,slot:next.slot,closedOptions:closed.length,material,master,editorial,score:material?(window.FabricaRawMaterials?.materialScore?.(material,safeProduct)||0):0,fit:material?fitFor(material,safeProduct):0,sourceType:'open-production',photoAsset:next.photo,exhausted:false,usedSlots:[],pendingSlots:[...pending].sort((a,b)=>a-b),productionCount:info.count,lastSlot:info.lastSlot};
  }
  function assetForId(id){return id?window.FabricaAssets?.find?.(id)||null:null}
  function rightsFor(asset,editorial,material){const kind=asset?.kind||editorial?.rights||material?.photo?.rights||'unknown',commercialSafe=asset?.kind==='usable'||asset?.kind==='own'||asset?.kind==='authorized'||asset?.kind==='licensed'||material?.photo?.commercialSafe===true;return{kind,commercialSafe}}
  function attach(selection,product){
    if(typeof state==='undefined'||!selection?.material)return;
    const previousOwnImage=typeof state.image==='string'&&state.image.startsWith('data:image/'),material=selection.material,master=selection.master,editorial=selection.editorial,asset=assetForId(selection.photoAsset)||assetForId(material?.photo?.asset),id=window.FabricaOcarinaSystem?.buildIdentity?.({collection:material.collection||master?.collection||'territorio',number:master?.number||1})||{},fact=editorial?.fact||material.facts?.[0]||null,previous=state.factoryMeta?.closedCatalog||{},rights=rightsFor(asset,editorial,material),info=productionInfo(product);
    state.factoryMeta={...(state.factoryMeta||{}),rawMaterial:{version:13,masterId:material.master||'',theme:material.theme||'',score:selection.score,fit:selection.fit,sourceType:selection.sourceType,photo:material.photo||null,facts:material.facts||[],microstory:material.microstory||'',sources:material.sources||[],credit:material.credit||''},masterProduct:{version:1,id:master?.id||material.master||'',number:master?.number||null,collection:master?.collection||material.collection||'',template:master?.template||'',name:master?.name||''},...id,productMaterialFit:{product,fit:selection.fit,selectionReason:selection.sourceType},closedCatalog:{...previous,[product]:{slot:selection.slot,total:selection.closedOptions,reusable:true,photo:selection.photoAsset,master:master?.id||selection.material?.master||null,direction:catalog()?.get?.(product,selection.slot)?.direction||'',execution:catalog()?.get?.(product,selection.slot)?.execution||'',committed:false}},editorialRealization:{version:1,slot:selection.slot,product,headline:editorial?.headline||'',subline:editorial?.subline||'',body:editorial?.body||'',fact,factLabel:editorial?.factLabel||'',source:editorial?.source||'',sourceUrl:editorial?.sourceUrl||'',photoSource:editorial?.photoSource||'',photoUrl:editorial?.photoUrl||'',rights:editorial?.rights||'reference',reverse:editorial?.reverse||'',status:editorial?.status||'PROTOTIPO'},photoSelection:{asset:asset?.id||selection.photoAsset||null,role:material.photo?.role||'editorial',focus:catalog()?.get?.(product,selection.slot)?.direction||material.photo?.focus||'',crop:material.photo?.crop||'',rights:rights.kind,commercialSafe:previousOwnImage||rights.commercialSafe,source:asset?.source||editorial?.photoSource||'',credit:asset?.author||material.credit||''},selectedFact:fact,materialSelection:'closed-catalog-reusable',materialPhotoApplied:false,productionCursor:{version:2,product,slot:selection.slot,totalMatrices:selection.closedOptions,reusableMatrices:true,productionCount:info.count+1,lastSlot:selection.slot,policy:'las matrices editoriales son reutilizables; cada fabricación recibe un nuevo registro de producción y nunca agota la familia'}};
    state.factoryMeta.photoProvenance={version:1,asset:asset?.id||selection.photoAsset||'',source:asset?.source||editorial?.photoSource||'',url:asset?.url||editorial?.photoUrl||'',author:asset?.author||material?.photo?.author||material?.credit||'',license:asset?.license||material?.photo?.license||'',rights:rights.kind,commercialSafe:previousOwnImage||rights.commercialSafe};
    if(asset?.photo){state.photoId=asset.id;state.factoryMeta.photoId=asset.id;state.factoryMeta.materialPhotoSource=asset.source||'';state.factoryMeta.materialPhotoCredit=asset.author||material.credit||'';state.factoryMeta.photoSelection.src=asset.photo;state.factoryMeta.photoSelection.source=asset.source||editorial?.photoSource||'';state.factoryMeta.photoSelection.credit=asset.author||material.credit||'';if(previousOwnImage){state.factoryMeta.materialPhotoApplied=false;state.factoryMeta.photoMode='own'}else{state.image=rights.commercialSafe?asset.photo:null;state.factoryMeta.materialPhotoApplied=!!rights.commercialSafe;state.factoryMeta.photoMode=rights.commercialSafe?'safe-asset':'reference-only'}}else if(previousOwnImage){state.factoryMeta.photoMode='own';state.factoryMeta.materialPhotoApplied=false}
    renderPreview?.();window.FabricaMasterVisuals?.apply?.();
  }
  function beginBatch(){if(producing||batchLock)return null;batchLock=true;batchToken=`batch-${Date.now()}-${Math.random().toString(36).slice(2,10)}`;return batchToken}
  function endBatch(token){if(!batchLock)return true;if(token&&token===batchToken){batchLock=false;batchToken=null;return true}return false}
  function isBusy(){return producing||batchLock}
  function install(){
    if(!window.FabricaEngine||originals.produce)return;
    originals.produce=window.FabricaEngine.produce;
    window.FabricaEngine.produce=async function(options={}){
      const ownsBatch=!!(batchLock&&options._batchToken&&options._batchToken===batchToken);
      if(producing||(batchLock&&!ownsBatch))return{ok:false,reason:'production-busy'};
      producing=true;let reserved=false,selected=null;
      try{
        const type=validProducts.has(options.type||state?.type)?(options.type||state?.type):'postal';
        selected=select(type);
        if(selected.exhausted)return{ok:false,reason:'no-materials-available',type,closedCatalogOptions:selected.closedOptions,productionCount:selected.productionCount};
        reserve(type,selected.slot);reserved=true;
        const result=await originals.produce.call(this,options);
        if(result?.ok===false){release(type,selected.slot);reserved=false;return{...result,closedCatalogSlot:selected.slot,closedCatalogOptions:selected.closedOptions,closedCatalogExhausted:false,productionOpen:true}};
        if(selected.material){attach(selected,type);if(typeof renderPreview==='function')renderPreview()}
        return{...result,rawMaterial:selected.material,selectedMaster:selected.master,masterProduct:selected.master,editorialRealization:selected.editorial,materialScore:selected.score,materialFit:selected.fit,materialSourceType:selected.sourceType,closedCatalogSlot:selected.slot,closedCatalogOptions:selected.closedOptions,closedCatalogPhoto:selected.photoAsset,photoCommercialSafe:state.factoryMeta?.photoSelection?.commercialSafe===true,closedCatalogExhausted:false,productionOpen:true,productionCount:selected.productionCount+1,pendingSlot:selected.slot};
      }catch(error){if(reserved)release(type,selected?.slot);throw error}finally{producing=false}
    };
    window.FabricaEngine.selectMaterial=select;window.FabricaEngine.materials=materials;window.FabricaEngine.materialSelectorVersion=13;
  }
  function selfTest(){const results=PRODUCTS.map(product=>{const c=catalog()?.forProduct?.(product)||[],s=select(product),e=editorials()?.realizations?.[product]||[];return{product,template:catalog()?.products?.[product]?.template||product,options:c.length,editorialOptions:e.length,master:s.master?.id||null,photo:s.photoAsset,exhausted:false,productionCount:s.productionCount,remaining:'abierto',pass:c.length===10&&e.length===10&&!!s.material&&!!s.photoAsset&&!!s.editorial}});return{version:13,ok:results.every(x=>x.pass),results,summary:catalog()?.summary?.()||null,editorialSummary:editorials()?.summary?.()||null,ledgerKey:LEDGER_KEY,rule:'4 familias × 10 matrices editoriales reutilizables; producción abierta; cada fabricación genera un nuevo registro; la Biblioteca no limita la fabricación'}}
  document.addEventListener('DOMContentLoaded',()=>setTimeout(install,700));
  window.FabricaMaterialSelector={version:13,select,masterFor,attach,install,selfTest,commit,beginBatch,endBatch,isBusy,reservedSlots:product=>[...(pendingSlots[product]||[])],productionInfo,ledgerKey:LEDGER_KEY};
})();
