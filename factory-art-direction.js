/* FÁBRICA CHAÑAR — DIRECCIÓN ARTÍSTICA v1
   La Fábrica no improvisa el aspecto de una pieza: cada familia tiene una receta visual.
   Las decisiones viven adentro para que Elías vea solamente una pieza terminada.
*/
(function(){
  const RECIPES={
    postal:{layout:'imagen protagonista',density:'aireada',texture:'papel-suave',motifs:['hoja','estrella','sello'],frame:'marco editorial'},
    ficha:{layout:'documental ilustrada',density:'media',texture:'fibra-papel',motifs:['archivo','ramita','punto'],frame:'ficha coleccionable'},
    guide:{layout:'álbum de recorrido',density:'media',texture:'papel-natural',motifs:['camino','hoja','sol'],frame:'cuaderno'},
    infographic:{layout:'cartel de datos',density:'alta',texture:'papel-granulado',motifs:['punto','estrella','flecha'],frame:'lámina'}
  };
  const STYLE={
    patagonia:{palette:['#f5eee0','#305a68','#c69b5a'],motifs:['montaña','hoja','estrella']},
    vino:{palette:['#f4eadc','#6f3f55','#b88752'],motifs:['hoja de vid','uva','línea']},
    cava:{palette:['#f2e8d8','#76553b','#b9a078'],motifs:['barrica','ramita','sello']},
    vendimia:{palette:['#f7ead7','#8e3d28','#c79246'],motifs:['uva','espiga','sol']},
    fiesta:{palette:['#fff0dc','#b94d38','#e3a52a'],motifs:['estrella','fruta','guirnalda']},
    arte:{palette:['#f4e8e4','#7d4b68','#d49a6a'],motifs:['trazo','estrella','flor']}
  };
  function styleKey(){const t=typeof state!=='undefined'&&typeof TEMPLATES!=='undefined'?TEMPLATES.find(x=>x.id===state.templateId):null;return t?.style||'patagonia'}
  function recipe(){return RECIPES[typeof state!=='undefined'?state.type:'postal']||RECIPES.postal}
  function apply(){
    const box=document.querySelector('#canvasPreview');if(!box)return;
    const sk=styleKey(),r=recipe(),s=STYLE[sk]||STYLE.patagonia;
    box.classList.add('factory-art-directed','art-'+sk,'art-layout-'+r.layout.replace(/[^a-z]+/gi,'-'));
    box.style.setProperty('--art-paper',s.palette[0]);box.style.setProperty('--art-accent',s.palette[1]);box.style.setProperty('--art-gold',s.palette[2]);
    box.querySelector('.factory-art-layer')?.remove();
    const layer=document.createElement('div');layer.className='factory-art-layer';
    layer.innerHTML='<span class="art-doodle art-doodle-a">'+s.motifs[0]+'</span><span class="art-doodle art-doodle-b">✦</span><span class="art-doodle art-doodle-c">'+s.motifs[1]+'</span><span class="art-paper-note">EDICIÓN LOCAL · '+r.layout.toUpperCase()+'</span>';
    box.appendChild(layer);
    if(typeof state!=='undefined')state.factoryMeta={...(state.factoryMeta||{}),artDirection:{version:1,recipe:r,style:sk,palette:s.palette,motifs:s.motifs}};
  }
  function boot(){
    ['fabrica:ready','fabrica:working','fabrica:series-ready'].forEach(ev=>document.addEventListener(ev,()=>setTimeout(apply,35)));
    ['btnGenerate','btnSave','btnPng','btnJpg','btnPrint'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>setTimeout(apply,80)));
    setTimeout(apply,300);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaArtDirection={version:1,recipes:RECIPES,styles:STYLE,apply};
})();
