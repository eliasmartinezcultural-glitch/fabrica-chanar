/* FÁBRICA CHAÑAR — LENGUAJE EDITORIAL BLOQUEADO v5
   El texto pertenece al producto. La fotografía solo aporta imagen.
   No se permiten titulares, datos ni microhistorias dependientes de una foto.
*/
(function(){
  const UNIVERSAL=Object.freeze({
    postal:Object.freeze({kicker:'MIRAR · GUARDAR',title:'Una mirada de Chañar',subtitle:'Un pequeño recuerdo de un lugar, una escena o un momento del territorio.',body:'Una pieza para mirar con calma y conservar una parte del territorio.',friendly:'Una pieza pequeña para guardar una mirada del territorio.'}),
    ficha:Object.freeze({kicker:'CONOCER · COMPRENDER',title:'Historia de un lugar',subtitle:'Una mirada breve para conocer mejor un espacio, una escena o una historia local.',body:'La imagen abre la historia; el texto aporta contexto y ayuda a comprender el valor de lo que vemos.',friendly:'Una pequeña historia para volver a mirar el territorio.'}),
    guide:Object.freeze({kicker:'RECORRER · DESCUBRIR',title:'Mirar el territorio',subtitle:'Una guía sencilla para observar, recorrer y descubrir con otros ojos.',body:'Cada imagen puede ser un punto de partida. La guía ordena la mirada y propone una forma simple de acercarse al lugar.',items:Object.freeze(['Punto de partida','Qué mirar','Qué descubrir','Qué recordar','Cómo seguir']),friendly:'Una guía breve para recorrer y descubrir.'}),
    infographic:Object.freeze({kicker:'CONECTAR · ENTENDER',title:'Chañar en una mirada',headline:'UNA IDEA LOCAL · UNA RELACIÓN CLARA · UNA MIRADA HUMANA',body:'La imagen aporta el contexto visual y la composición ordena la información para comprender una relación del territorio de forma rápida y clara.',friendly:'Una idea local convertida en una imagen clara.'})
  });
  const product=()=>typeof state!=='undefined'?(state.type||state.centralProduct||'postal'):'postal';
  const current=()=>UNIVERSAL[product()]||UNIVERSAL.postal;
  function text(el,value){if(el)el.textContent=value||''}
  function addSeal(box,p){
    box.querySelectorAll('.factory-art-seal').forEach(x=>x.remove());
    const seal=document.createElement('div');seal.className='factory-art-seal factory-art-seal-'+p;
    seal.innerHTML='<span class="factory-art-seal-star">✦</span><b>CHAÑAR</b><small>PIEZA CURADA</small><em>OCARINA</em>';
    box.appendChild(seal);
  }
  function normalize(){
    const box=document.querySelector('#canvasPreview'),piece=box?.querySelector('.piece');if(!box||!piece||typeof state==='undefined')return;
    const p=product(),u=current();
    text(piece.querySelector('.piece-kicker'),u.kicker);text(piece.querySelector('h3'),u.title);text(piece.querySelector('.piece-subtitle'),u.subtitle);text(piece.querySelector('.piece-headline'),u.headline||'');
    const para=piece.querySelector('.piece-content p');if(para)text(para,u.body);
    if(p==='guide'){const list=piece.querySelector('.piece-content ul');if(list){list.replaceChildren(...u.items.map(item=>{const li=document.createElement('li');li.textContent=item;return li}))}}
    piece.querySelectorAll('.piece-meta,.piece-source,.piece-credit').forEach(el=>{el.textContent='CONTEXTO LOCAL · REVISAR FUENTE'});
    state.factoryMeta={...(state.factoryMeta||{}),pieceLanguageVersion:5,editorialMode:'universal-locked',editorialRule:'Texto fijo por producto; la fotografía es intercambiable y no modifica el lenguaje editorial.',textContractLocked:true};
    addSeal(box,p);
  }
  function apply(){setTimeout(normalize,0)}
  function boot(){
    ['fabrica:ready','fabrica:working','fabrica:series-ready'].forEach(ev=>document.addEventListener(ev,apply));
    ['btnGenerate','btnSave'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>setTimeout(apply,100)));
    apply();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaPiece={version:5,locked:true,phrases:UNIVERSAL,refresh:apply,universal:UNIVERSAL};
})();
