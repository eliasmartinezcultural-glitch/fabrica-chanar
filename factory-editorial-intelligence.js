/* FÁBRICA CHAÑAR — INTELIGENCIA EDITORIAL LOCAL v1
   No inventa contenido. Selecciona información real ya investigada y la deja disponible
   para que cada producto pueda profundizar sin llenar de texto la pieza.
*/
(function(){
  function bank(){return window.FabricaEditorialBank||null}
  function tagsFor(type,style){
    if(type==='postal')return style==='vino'?['vino','paisaje']:style==='fiesta'?['fiesta','rural']:['historia','identidad','territorio'];
    if(type==='ficha')return style==='arte'?['cultura','chical']:['historia','territorio','produccion'];
    if(type==='guide')return ['territorio','agua','vino','naturaleza'];
    return style==='vino'?['vino','historia-productiva']:style==='fiesta'?['fiesta','fruta']:['territorio','agricultura','naturaleza'];
  }
  function enrich(){
    if(typeof state==='undefined')return;
    const b=bank();if(!b)return;
    const type=state.type||'postal',style=state.factoryMeta?.style?.mood||'';
    const tags=tagsFor(type,style),facts=b.forTags(tags).slice(0,8);
    const infographic=b.infographics.find(x=>x.family===style)||b.infographics[0];
    state.factoryMeta={...(state.factoryMeta||{}),editorialIntelligence:{version:1,product:type,selectedTags:tags,facts:facts.map(f=>({id:f.id,title:f.title,value:f.value,detail:f.detail,source:f.source,url:f.url})),infographicSuggestion:infographic?{id:infographic.id,title:infographic.title,diagram:infographic.diagram,facts:infographic.facts}:null,print:b.print,photoDirective:b.photoDirectives[type]||b.photoDirectives.postal}};
  }
  function boot(){document.addEventListener('fabrica:working',()=>setTimeout(enrich,0));document.addEventListener('fabrica:ready',()=>setTimeout(enrich,0));setTimeout(enrich,1200)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaEditorialIntelligence={version:1,enrich};
})();