/* FÁBRICA CHAÑAR — LENGUAJE EDITORIAL Y SELLOS v6
   Texto universal bloqueado por producto. La fotografía es intercambiable.
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
  function installArtCSS(){
    if(document.getElementById('factory-art-seal-system'))return;
    const s=document.createElement('style');s.id='factory-art-seal-system';s.textContent=`
      .factory-art-seal{position:absolute;z-index:24;right:18px;bottom:18px;width:74px;height:74px;border:1.5px solid currentColor;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;line-height:1;transform:rotate(-8deg);opacity:.9;pointer-events:none;font-family:Manrope,system-ui,sans-serif;box-shadow:inset 0 0 0 3px rgba(255,250,238,.45),inset 0 0 0 4px currentColor;background:rgba(247,240,227,.72)}
      .factory-art-seal-star{font-size:14px;margin-bottom:3px}.factory-art-seal b{font-size:10px;letter-spacing:.16em}.factory-art-seal small{font-size:6px;letter-spacing:.12em;margin-top:4px}.factory-art-seal em{font:600 9px Caveat,cursive;margin-top:4px}.factory-art-seal-postal{color:#a95135}.factory-art-seal-ficha{color:#65714b;transform:rotate(5deg)}.factory-art-seal-guide{color:#2f6970;transform:rotate(-4deg)}.factory-art-seal-infographic{color:#315d73;transform:rotate(3deg)}
      .piece-image img{width:100%!important;height:100%!important;object-fit:cover!important;object-position:center center!important;display:block!important}.piece.postal .piece-image img{object-position:50% 45%!important}.piece.ficha .piece-image img{object-position:50% 40%!important}.piece.guide .piece-image img{object-position:50% 42%!important}.piece.infographic .piece-image img{object-position:50% 38%!important}
      .piece-image{overflow:hidden!important}.piece-image img{image-rendering:auto!important}
      .piece.postal .factory-art-seal{bottom:16px;right:16px}.piece.ficha .factory-art-seal{bottom:17px;right:17px}.piece.guide .factory-art-seal{bottom:18px;right:18px}.piece.infographic .factory-art-seal{bottom:19px;right:19px}
    `;document.head.appendChild(s);
  }
  function addSeal(box,p){box.querySelectorAll('.factory-art-seal').forEach(x=>x.remove());const seal=document.createElement('div');seal.className='factory-art-seal factory-art-seal-'+p;seal.innerHTML='<span class="factory-art-seal-star">✦</span><b>CHAÑAR</b><small>PIEZA CURADA</small><em>OCARINA</em>';box.appendChild(seal)}
  function normalize(){
    const box=document.querySelector('#canvasPreview'),piece=box?.querySelector('.piece');if(!box||!piece||typeof state==='undefined')return;
    const p=product(),u=current();
    text(piece.querySelector('.piece-kicker'),u.kicker);text(piece.querySelector('h3'),u.title);text(piece.querySelector('.piece-subtitle'),u.subtitle);text(piece.querySelector('.piece-headline'),u.headline||'');
    const para=piece.querySelector('.piece-content p');if(para)text(para,u.body);
    if(p==='guide'){const list=piece.querySelector('.piece-content ul');if(list)list.replaceChildren(...u.items.map(item=>{const li=document.createElement('li');li.textContent=item;return li}))}
    piece.querySelectorAll('.piece-meta,.piece-source,.piece-credit').forEach(el=>{el.textContent='CONTEXTO LOCAL · REVISAR FUENTE'});
    state.factoryMeta={...(state.factoryMeta||{}),pieceLanguageVersion:6,editorialMode:'universal-locked',editorialRule:'Texto fijo por producto; la fotografía es intercambiable y no modifica el lenguaje editorial.',textContractLocked:true,artDirectionVersion:6,sealSystem:'chañar-curated'};
    addSeal(box,p);
  }
  function apply(){installArtCSS();setTimeout(normalize,0)}
  function boot(){['fabrica:ready','fabrica:working','fabrica:series-ready'].forEach(ev=>document.addEventListener(ev,apply));['btnGenerate','btnSave'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>setTimeout(apply,100)));apply()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaPiece={version:6,locked:true,phrases:UNIVERSAL,refresh:apply,universal:UNIVERSAL,artDirection:6};
})();
