/* FÁBRICA CHAÑAR — BANCO DE RECURSOS v1
   Una sola puerta para fotos, fuentes, derechos, motivos y recursos propios.
   Regla: referencia pública != permiso comercial.
*/
(function(){
  const PHOTO_BANK=window.PHOTO_BANK||[];
  const TYPE={
    own:{label:'Propia / autorizada',safe:true},
    usable:{label:'Reutilizable',safe:true},
    reference:{label:'Referencia',safe:false}
  };
  const CATEGORIES=['territorio','vino','vendimia','fiesta','rural','cultura','turismo','agua','frutales','arquitectura'];
  function resources(){return PHOTO_BANK.map(p=>({...p,type:p.kind||'reference',rights:TYPE[p.kind]||TYPE.reference,categories:guess(p)}))}
  function guess(p){const s=(p.name+' '+p.source).toLowerCase();return CATEGORIES.filter(c=>({territorio:['ingreso','paisaje','territorio'],vino:['bodega','viñedo','vino'],vendimia:['vendimia','cosecha'],fiesta:['fiesta','pelón'],rural:['rural','campo'],cultura:['cultura','chical'],turismo:['turismo','bodega'],agua:['río','agua','riego'],frutales:['frut','pelón'],arquitectura:['cava','bodega','arquitectura']})[c]?.some(k=>s.includes(k)))}
  function commercial(){return resources().filter(x=>x.rights.safe)}
  function references(){return resources().filter(x=>!x.rights.safe)}
  function find(id){return resources().find(x=>x.id===id)||null}
  function status(id){const x=find(id);return x?x.rights.label:'Sin ficha de derechos'}
  function render(target){
    const host=typeof target==='string'?document.querySelector(target):target;if(!host)return;
    const all=resources();
    host.innerHTML='<div class="asset-bank-head"><div><small>BANCO DE RECURSOS</small><strong>Fotos, fuentes y derechos</strong><p>La Fábrica separa material reutilizable de material usado solo como referencia.</p></div><span class="asset-count">'+commercial().length+' utilizables · '+references().length+' referencias</span></div><div class="asset-bank-grid">'+all.map(x=>'<article class="asset-card '+(x.rights.safe?'asset-safe':'asset-ref')+'"><div class="asset-thumb" style="background-image:url('+JSON.stringify(x.photo)+')"></div><div class="asset-card-body"><strong>'+esc(x.name)+'</strong><small>'+esc(x.source)+'</small><span class="asset-rights">'+(x.rights.safe?'✓ ':'○ ')+esc(x.rights.label)+'</span><a href="'+esc(x.url)+'" target="_blank" rel="noopener">Ver fuente</a></div></article>').join('')+'</div>';
  }
  function esc(v){return String(v??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[c]))}
  window.FabricaAssets={version:1,resources,commercial,references,find,status,render,categories:CATEGORIES};
})();
