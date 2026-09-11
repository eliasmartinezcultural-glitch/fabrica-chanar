/* FÁBRICA CHAÑAR — CAPA PIEZA v1
   Convierte cada salida en un pequeño recuerdo local sin agregar complejidad al usuario.
   Todo texto es editorial; no declara artesanía física, certificación ni exclusividad.
*/
(function(){
  const PHRASES={
    postal:[
      'Un recuerdito de San Patricio del Chañar.',
      'Para llevarte un pedacito de Chañar.',
      'Un pequeño recuerdo de este rincón del valle.',
      'Hecho con cariño desde San Patricio del Chañar.',
      'Para guardar un pedacito de este lugar.'
    ],
    ficha:[
      'Para conocer un poquito más de Chañar.',
      'Una pequeña historia de este lugar.',
      'Un pedacito de territorio para volver a mirar.'
    ],
    guide:[
      'Andá despacio. Mirá. Disfrutá Chañar.',
      'Un paseo para mirar el territorio con otros ojos.',
      'Para recorrer, descubrir y llevarte un recuerdo.'
    ],
    infographic:[
      'Un dato, una historia, un pedacito de Chañar.',
      'Pequeñas cosas que también cuentan este lugar.',
      'Una mirada local para guardar y compartir.'
    ]
  };
  const STYLE_PHRASES={
    patagonia:'Desde el territorio.',
    vino:'Entre viñedos y estepa.',
    cava:'Entre oficio, paisaje y memoria.',
    vendimia:'Tiempo de cosecha, tiempo de encuentro.',
    fiesta:'De fiesta y raíces chañarenses.',
    arte:'Una mirada hecha desde acá.'
  };
  const pick=(arr)=>arr[Math.floor(Math.random()*arr.length)];
  function product(){return typeof state!=='undefined'?(state.type||'postal'):'postal'}
  function style(){
    if(typeof state==='undefined')return'patagonia';
    const t=typeof TEMPLATES!=='undefined'?TEMPLATES.find(x=>x.id===state.templateId):null;
    return t?.style||'patagonia';
  }
  function apply(){
    const box=document.querySelector('#canvasPreview');if(!box)return;
    const p=product(),s=style();
    const phrase=(state.factoryMeta?.friendlyLine)||pick(PHRASES[p]||PHRASES.postal);
    state.factoryMeta={...(state.factoryMeta||{}),friendlyLine:phrase,localPiece:true,pieceLanguageVersion:1};

    let info=box.querySelector('.factory-curation-info');
    if(info){
      info.querySelector('.factory-friendly-line')?.remove();
      const line=document.createElement('span');
      line.className='factory-friendly-line';
      line.textContent=phrase;
      info.appendChild(line);
    }

    const seal=box.querySelector('.factory-curation-seal');
    if(seal && p==='postal'){
      const small=seal.querySelector('small');
      if(small)small.textContent='Un recuerdito pensado para guardar';
    }

    box.querySelector('.factory-piece-note')?.remove();
    const note=document.createElement('div');
    note.className='factory-piece-note';
    note.innerHTML='<span>✦</span><span>'+phrase+'</span>';
    box.appendChild(note);

    box.classList.toggle('piece-postal',p==='postal');
    box.classList.toggle('piece-vino',s==='vino'||s==='vendimia'||s==='cava');
  }
  function ownPhotoControl(){
    const form=document.querySelector('#editorForm');
    if(!form || form.querySelector('.factory-own-photo'))return;
    const wrap=document.createElement('div');wrap.className='factory-own-photo';
    wrap.innerHTML='<div class="factory-own-photo-copy"><strong>Tu foto, si querés</strong><span>La opción más segura para una pieza comercial y la más cercana a la idea de taller.</span></div><label class="factory-photo-button">Elegir foto<input class="factory-photo-input" type="file" accept="image/*"></label><button type="button" class="factory-photo-clear" hidden>Quitar</button>';
    form.appendChild(wrap);
    const input=wrap.querySelector('.factory-photo-input');
    const clear=wrap.querySelector('.factory-photo-clear');
    input.addEventListener('change',e=>{
      const file=e.target.files?.[0];if(!file)return;
      const reader=new FileReader();
      reader.onload=()=>{
        if(typeof state==='undefined')return;
        state.image=reader.result;state.photoId=null;
        clear.hidden=false;
        if(typeof renderPreview==='function')renderPreview();
        const st=document.querySelector('#status');if(st)st.textContent='Foto propia cargada. La Fábrica la conservará al cambiar de pieza.';
        setTimeout(apply,40);
      };
      reader.readAsDataURL(file);
    });
    clear.addEventListener('click',()=>{
      if(typeof state==='undefined')return;
      state.image=null;state.photoId=null;input.value='';clear.hidden=true;
      if(typeof renderPreview==='function')renderPreview();
      setTimeout(apply,40);
    });
  }
  function boot(){
    const refresh=()=>{ownPhotoControl();setTimeout(apply,30)};
    ['fabrica:ready','fabrica:working'].forEach(ev=>document.addEventListener(ev,refresh));
    document.getElementById('btnGenerate')?.addEventListener('click',()=>setTimeout(refresh,100));
    document.getElementById('btnSave')?.addEventListener('click',()=>setTimeout(refresh,100));
    const form=document.querySelector('#editorForm');
    if(form)new MutationObserver(()=>ownPhotoControl()).observe(form,{childList:true});
    refresh();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaPiece={version:1,phrases:PHRASES,stylePhrases:STYLE_PHRASES,refresh:apply};
})();
