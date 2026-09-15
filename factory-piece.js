/* FÁBRICA CHAÑAR — CAPA PIEZA v4
   CURADURÍA UNIVERSAL.
   Las fotografías pueden cambiar sin dejar textos huérfanos o demasiado específicos.
   La imagen aporta el tema; la estructura editorial aporta el sentido.
   La fabricación sigue siendo precisa, repetible y profesional.
*/
(function(){
  const UNIVERSAL={
    postal:{kicker:'MIRAR · GUARDAR',title:'Una mirada de Chañar',subtitle:'Un pequeño recuerdo de un lugar, una escena o un momento del territorio.',body:'Una pieza para mirar con calma y conservar una parte de San Patricio del Chañar.',friendly:'Una pieza pequeña para guardar una mirada del territorio.'},
    ficha:{kicker:'CONOCER · COMPRENDER',title:'Historia de un lugar',subtitle:'Una mirada breve para conocer mejor un espacio, una escena o una historia local.',body:'La imagen abre la historia; el texto aporta contexto y ayuda a entender por qué este lugar forma parte del territorio.',friendly:'Una pequeña historia para volver a mirar el territorio.'},
    guide:{kicker:'RECORRER · DESCUBRIR',title:'Mirar el territorio',subtitle:'Una guía sencilla para observar, recorrer y descubrir con otros ojos.',body:'Cada imagen puede ser un punto de partida. La guía ordena la mirada y propone una forma simple de acercarse al lugar.',items:['Punto de partida','Qué mirar','Qué descubrir','Qué recordar','Cómo seguir'],friendly:'Una guía breve para recorrer y descubrir.'},
    infographic:{kicker:'CONECTAR · ENTENDER',title:'Chañar en una mirada',headline:'UNA IDEA LOCAL · UNA RELACIÓN CLARA · UNA MIRADA HUMANA',body:'La imagen aporta el contexto visual y la composición ordena la información para comprender una relación del territorio de forma rápida y clara.',friendly:'Una idea local convertida en una imagen clara.'}
  };
  function product(){return typeof state!=='undefined'?(state.type||state.centralProduct||'postal'):'postal'}
  function current(){return UNIVERSAL[product()]||UNIVERSAL.postal}
  function style(){if(typeof state==='undefined')return'patagonia';const t=typeof TEMPLATES!=='undefined'?TEMPLATES.find(x=>x.id===state.templateId):null;return t?.style||'patagonia'}
  function setText(el,text){if(el&&text)el.textContent=text}
  function normalizePiece(){
    const box=document.querySelector('#canvasPreview');if(!box||typeof state==='undefined')return;
    const p=product(),u=current(),piece=box.querySelector('.piece');if(!piece)return;
    setText(piece.querySelector('.piece-kicker'),u.kicker);setText(piece.querySelector('h3'),u.title);setText(piece.querySelector('.piece-subtitle'),u.subtitle);setText(piece.querySelector('.piece-headline'),u.headline||'');
    const paragraphs=piece.querySelectorAll('.piece-content p');if(paragraphs.length)setText(paragraphs[0],u.body);
    if(p==='guide'){const list=piece.querySelector('.piece-content ul');if(list){list.innerHTML='';u.items.forEach(item=>{const li=document.createElement('li');li.textContent=item;list.appendChild(li)})}}
    piece.querySelectorAll('.piece-meta,.piece-source,.piece-credit').forEach(el=>{const text=(el.textContent||'').trim().toLowerCase();if(text.includes('dato real')||text.includes('fecha local')||text.includes('identidad')||text.includes('territorio'))el.textContent='CONTEXTO LOCAL · REVISAR FUENTE'});
    const existing=state.factoryMeta?.friendlyLine,phrase=existing||u.friendly;
    state.factoryMeta={...(state.factoryMeta||{}),friendlyLine:phrase,localPiece:true,pieceLanguageVersion:4,editorialMode:'universal-photo-independent',editorialRule:'La fotografía puede cambiar sin exigir reescritura específica del producto.'};
    const info=box.querySelector('.factory-curation-info');if(info){info.querySelector('.factory-friendly-line')?.remove();const line=document.createElement('span');line.className='factory-friendly-line';line.textContent=phrase;info.appendChild(line)}
    box.classList.toggle('piece-postal',p==='postal');box.classList.toggle('piece-vino',style()==='vino'||style()==='vendimia'||style()==='cava');
  }
  function apply(){setTimeout(normalizePiece,0)}
  function syncPreview(){if(typeof renderPreview==='function')renderPreview();window.FabricaCuration?.refresh?.();setTimeout(normalizePiece,60)}
  function ownPhotoControl(){
    const form=document.querySelector('#editorForm');if(!form||form.querySelector('.factory-own-photo'))return;
    const wrap=document.createElement('div');wrap.className='factory-own-photo';wrap.innerHTML='<div class="factory-own-photo-copy"><strong>Tu foto, si querés</strong><span>La opción más segura para una pieza comercial y la más cercana a la idea de taller.</span></div><label class="factory-photo-button">Elegir foto<input class="factory-photo-input" type="file" accept="image/*"></label><button type="button" class="factory-photo-clear" hidden>Quitar</button>';
    form.appendChild(wrap);const input=wrap.querySelector('.factory-photo-input'),clear=wrap.querySelector('.factory-photo-clear');
    input.addEventListener('change',e=>{const file=e.target.files?.[0];if(!file)return;if(file.size>8*1024*1024){status('La foto supera 8 MB. Elegí una más liviana.');return}const reader=new FileReader();reader.onload=()=>{if(typeof state==='undefined')return;state.image=reader.result;state.photoId=null;clear.hidden=false;syncPreview();status('Foto propia cargada. La Fábrica la conservará al cambiar de pieza.')};reader.readAsDataURL(file)});
    clear.addEventListener('click',()=>{if(typeof state==='undefined')return;state.image=null;state.photoId=null;input.value='';clear.hidden=true;syncPreview();status('Foto quitada. La Fábrica volvió a su banco visual.')});
  }
  function boot(){const refresh=()=>{ownPhotoControl();setTimeout(apply,30)};['fabrica:ready','fabrica:working'].forEach(ev=>document.addEventListener(ev,refresh));['btnGenerate','btnSave'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>setTimeout(refresh,100)));const form=document.querySelector('#editorForm');if(form)new MutationObserver(()=>ownPhotoControl()).observe(form,{childList:true});refresh()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaPiece={version:4,phrases:UNIVERSAL,refresh:apply,universal:UNIVERSAL};
})();
