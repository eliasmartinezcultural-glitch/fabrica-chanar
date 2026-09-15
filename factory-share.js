/* FÁBRICA CHAÑAR — COMPARTIR v1
   El frente sigue siendo la pieza editorial. Este módulo crea una salida digital vertical
   compuesta por frente + dorso coleccionable, pensada para WhatsApp y redes.
*/
(function(){
  const PRODUCTS={
    postal:{name:'POSTAL',ratio:2/3,accent:'#a95135',paper:'#f4ead9'},
    ficha:{name:'FICHA CULTURAL',ratio:2/3,accent:'#65714b',paper:'#e9e4d7'},
    guide:{name:'GUÍA BREVE',ratio:5/7,accent:'#2f6970',paper:'#e4ece8'},
    infographic:{name:'INFOGRAFÍA',ratio:210/297,accent:'#315d73',paper:'#e4e9ed'}
  };
  const $=s=>document.querySelector(s);
  function product(){try{if(typeof state!=='undefined'&&state.type)return state.type}catch{}return $('.piece')?.dataset?.product||'postal'}
  function title(){try{if(typeof state!=='undefined'){const d=state.data||{};return d.title||d.name||state.templateId||'Pieza de Chañar'}}catch{}return $('.piece h3')?.textContent?.trim()||'Pieza de Chañar'}
  function meta(){try{if(typeof state!=='undefined'){const d=state.data||{};return d.source||d.location||''}}catch{}return ''}
  function slug(v){return String(v||'pieza-chanar').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60)}
  function backNode(p){
    const cfg=PRODUCTS[p]||PRODUCTS.postal;
    const node=document.createElement('section');node.className='factory-share-back';
    node.style.cssText=`width:1080px;height:${Math.round(1080/cfg.ratio)}px;box-sizing:border-box;background:${cfg.paper};color:#24221e;border:2px solid ${cfg.accent};position:relative;overflow:hidden;padding:82px 82px 74px;font-family:Georgia,serif;display:flex;flex-direction:column;justify-content:space-between;`;
    node.innerHTML=`<div style="position:absolute;inset:24px;border:1px solid ${cfg.accent};opacity:.55;pointer-events:none"></div><div style="position:relative;z-index:2;text-align:center"><div style="font-size:26px;letter-spacing:.32em;color:${cfg.accent};font-family:Arial,sans-serif">✦ OCARINA PRODUCCIONES ✦</div><div style="margin-top:22px;font-size:16px;letter-spacing:.22em;font-family:Arial,sans-serif">FÁBRICA CHAÑAR · PIEZA COLECCIONABLE</div></div><div style="position:relative;z-index:2;text-align:center;padding:20px 40px"><div style="font-size:20px;letter-spacing:.18em;color:${cfg.accent};font-family:Arial,sans-serif">${cfg.name}</div><h2 style="margin:28px 0 16px;font-size:58px;line-height:1.02;font-weight:400">${title()}</h2><p style="margin:0 auto;max-width:760px;font-size:23px;line-height:1.55">Historias, personas y territorio. Una pieza producida para mirar, guardar y compartir.</p></div><div style="position:relative;z-index:2;text-align:center"><div style="display:inline-flex;width:150px;height:150px;border:3px solid ${cfg.accent};border-radius:50%;align-items:center;justify-content:center;box-shadow:inset 0 0 0 8px ${cfg.paper},inset 0 0 0 10px ${cfg.accent};transform:rotate(-7deg);font-family:Arial,sans-serif"><span style="font-size:17px;line-height:1.25;letter-spacing:.08em">CHAÑAR<br><small style="font-size:10px">PIEZA CURADA</small><br><i style="font-size:24px;font-family:cursive">Ocarina</i></span></div><div style="margin-top:28px;font-size:17px;letter-spacing:.14em;font-family:Arial,sans-serif">PRODUCCIÓN · OCARINA · CHAÑAR</div><div style="margin-top:12px;font-size:15px;opacity:.72">${meta()}</div></div>`;
    return node;
  }
  async function capture(node,options){if(typeof html2canvas!=='function')throw new Error('html2canvas no disponible');return html2canvas(node,{backgroundColor:null,useCORS:true: true,allowTaint:false,scale:2,logging:false,...options})}
  function canvasToBlob(canvas,type='image/png',quality=.94){return new Promise(resolve=>canvas.toBlob(resolve,type,quality))}
  async function buildShareBlob(){
    const front=$('#canvasPreview .piece');if(!front)throw new Error('No hay una pieza fabricada para compartir.');
    const p=product(),cfg=PRODUCTS[p]||PRODUCTS.postal;
    const frontCanvas=await html2canvas(front,{backgroundColor:null,useCORS:true,allowTaint:false,scale:2,logging:false});
    const back=backNode(p);back.style.position='fixed';back.style.left='-20000px';back.style.top='0';back.style.zIndex='-1';document.body.appendChild(back);
    let backCanvas;try{backCanvas=await html2canvas(back,{backgroundColor:null,useCORS:true,allowTaint:false,scale:2,logging:false})}finally{back.remove()}
    const gap=48*2,totalW=Math.max(frontCanvas.width,backCanvas.width),totalH=frontCanvas.height+gap+backCanvas.height;
    const out=document.createElement('canvas');out.width=totalW;out.height=totalH;const ctx=out.getContext('2d');ctx.fillStyle=cfg.paper;ctx.fillRect(0,0,totalW,totalH);ctx.drawImage(frontCanvas,(totalW-frontCanvas.width)/2,0);ctx.fillStyle=cfg.accent;ctx.fillRect(0,frontCanvas.height,totalW,gap);ctx.drawImage(backCanvas,(totalW-backCanvas.width)/2,frontCanvas.height+gap);return out;
  }
  async function share(){
    const b=$('#btnShare');if(b)b.disabled=true;
    try{
      const canvas=await buildShareBlob();const blob=await canvasToBlob(canvas,'image/png');if(!blob)throw new Error('No se pudo preparar la imagen.');
      const file=new File([blob],`${slug(title())}-ocarina.png`,{type:'image/png'});
      const text=`${title()} · Fábrica Chañar · Ocarina Producciones`;
      if(navigator.share){
        try{if(!navigator.canShare||navigator.canShare({files:[file]})){await navigator.share({title:title(),text,files:[file]});return}}catch(err){if(err?.name==='AbortError')return}
        try{await navigator.share({title:title(),text});return}catch{}
      }
      const wa='https://wa.me/?text='+encodeURIComponent(text+' — pieza coleccionable lista para compartir.');window.open(wa,'_blank','noopener,noreferrer');
    }catch(err){console.error(err);const wa='https://wa.me/?text='+encodeURIComponent(`${title()} · Fábrica Chañar · Ocarina Producciones`);window.open(wa,'_blank','noopener,noreferrer')}
    finally{if(b)b.disabled=false}
  }
  function boot(){
    const b=$('#btnShare');if(!b||b.dataset.shareBound)return;b.dataset.shareBound='1';b.addEventListener('click',share);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.FabricaShare={version:1,share,buildShareBlob,backNode};
})();
