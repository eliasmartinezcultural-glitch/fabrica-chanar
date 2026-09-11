/* FÁBRICA CHAÑAR — CURADURÍA DE PIEZAS v3
   Principio: no vendemos diseños genéricos. Producimos PIEZAS DE CHAÑAR.
   La tecnología automatiza; la identidad nace de la selección, el relato y la curaduría.
   Nunca se declara "limitada", "certificada", "única" u "original" sin una condición real que lo respalde.
*/
(function(){
  const LABELS={
    postal:{label:'PIEZA DE CHAÑAR',note:'Un recuerdo pensado para guardar'},
    ficha:{label:'PIEZA DE CHAÑAR',note:'Territorio · memoria · identidad'},
    guide:{label:'PIEZA DE CHAÑAR',note:'Una mirada local para recorrer'},
    infographic:{label:'PIEZA DE CHAÑAR',note:'Información convertida en imagen'}
  };
  const STYLE_RIBBON={
    patagonia:'CHAÑAR · TERRITORIO',vino:'CHAÑAR · VINO Y PAISAJE',cava:'CHAÑAR · OFICIO Y DETALLE',
    vendimia:'CHAÑAR · TIEMPO DE COSECHA',fiesta:'CHAÑAR · FIESTA Y RAÍCES',arte:'CHAÑAR · CULTURA LOCAL'
  };
  const COLLECTIONS={
    patagonia:{name:'Colección Territorio',code:'TERR'},vino:{name:'Colección Vino y Paisaje',code:'VINO'},
    cava:{name:'Colección Oficios del Vino',code:'OFIC'},vendimia:{name:'Colección Tiempo de Cosecha',code:'COSE'},
    fiesta:{name:'Colección Fiestas y Raíces',code:'RAIZ'},arte:{name:'Colección Cultura Local',code:'CULT'}
  };
  const productWords={postal:'postal',ficha:'ficha',guide:'guía',infographic:'infografía'};

  function styleKey(){
    if(typeof state==='undefined')return'patagonia';
    const t=typeof TEMPLATES!=='undefined'?TEMPLATES.find(x=>x.id===state.templateId):null;
    return t?.style||'patagonia';
  }
  function stableCode(){
    const raw=(typeof state!=='undefined'?(state.templateId||state.type||'pieza'):'pieza')+'-'+styleKey();
    let h=0;for(let i=0;i<raw.length;i++)h=((h<<5)-h+raw.charCodeAt(i))|0;
    return String(Math.abs(h)%10000).padStart(4,'0');
  }
  function buildMeta(){
    const product=typeof state!=='undefined'?(state.type||'postal'):'postal';
    const sk=styleKey();
    const col=COLLECTIONS[sk]||COLLECTIONS.patagonia;
    const meta=typeof state!=='undefined'?(state.factoryMeta||{}):{};
    return {
      ...meta, product, styleKey:sk, collection:col.name, collectionCode:col.code,
      pieceCode:col.code+'-'+stableCode(), origin:'San Patricio del Chañar, Neuquén',
      maker:'Fábrica Chañar · Ocarina Producciones', makerLine:'Diseñada y curada localmente',
      workshopLine:'Taller creativo de San Patricio del Chañar',
      provenance:'Procedencia territorial documentada',
      authenticity:'Sello editorial de procedencia; no es una certificación oficial',
      editionMode:'serie abierta', collectorLine:'Parte de una colección de piezas del territorio'
    };
  }
  function decorate(){
    const box=document.querySelector('#canvasPreview');if(!box||typeof state==='undefined')return;
    const meta=buildMeta();state.factoryMeta=meta;
    box.classList.add('factory-curated','product-'+meta.product,'style-'+meta.styleKey);
    ['factory-curation-seal','factory-curation-ribbon','factory-curation-info','factory-collection-mark','factory-workshop-mark'].forEach(c=>box.querySelector('.'+c)?.remove());

    const ribbon=document.createElement('div');ribbon.className='factory-curation-ribbon';
    ribbon.textContent=STYLE_RIBBON[meta.styleKey]||'CHAÑAR · CURADURÍA LOCAL';

    const seal=document.createElement('div');seal.className='factory-curation-seal';
    seal.innerHTML='<span class="seal-dot">✦</span><span>'+LABELS[meta.product].label+'<small>'+LABELS[meta.product].note+'</small></span>';

    const info=document.createElement('div');info.className='factory-curation-info';
    info.innerHTML='<strong>'+meta.collection+'</strong><span>'+meta.collectorLine+'</span><span>'+meta.makerLine+' · '+meta.origin+'</span>';

    const mark=document.createElement('div');mark.className='factory-collection-mark';
    mark.textContent=meta.pieceCode+' · '+productWords[meta.product];

    const workshop=document.createElement('div');workshop.className='factory-workshop-mark';
    workshop.innerHTML='<b>FÁBRICA CHAÑAR</b><span>'+meta.workshopLine+'</span><small>PIEZA CURADA LOCALMENTE</small>';

    box.appendChild(ribbon);box.appendChild(seal);box.appendChild(info);box.appendChild(mark);box.appendChild(workshop);
  }
  function boot(){
    document.addEventListener('fabrica:ready',()=>setTimeout(decorate,20));
    document.addEventListener('fabrica:working',()=>setTimeout(decorate,20));
    ['btnGenerate','btnSave','btnPng','btnJpg','btnPrint'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>setTimeout(decorate,80)));
    setInterval(decorate,900);setTimeout(decorate,250);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
