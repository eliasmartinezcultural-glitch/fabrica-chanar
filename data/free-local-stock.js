/* FÁBRICA CHAÑAR — STOCK LIBRE LOCAL v1
   Material territorial encontrado en Wikimedia Commons con licencia explícita.
   CC BY / CC BY-SA: apto para reutilización comercial si se cumplen atribución
   y, cuando corresponda, ShareAlike. No confundir con fotos periodísticas.
*/
(function(){
  const FREE_LOCAL_STOCK=[
    {id:'dique-chanar-01',name:'Dique Compensador El Chañar · paisaje',photo:'https://commons.wikimedia.org/wiki/Special:FilePath/Dique_Compensador_Cha%C3%B1ar%2C_Neuquen_-_panoramio.jpg',source:'Wikimedia Commons · Panoramio',url:'https://commons.wikimedia.org/wiki/File:Dique_Compensador_Chañar,_Neuquen_-_panoramio.jpg',kind:'usable',license:'CC BY-SA 3.0',author:'psanetti',categories:['territorio','agua','paisaje']},
    {id:'dique-chanar-02',name:'Dique Compensador El Chañar · vista 2',photo:'https://commons.wikimedia.org/wiki/Special:FilePath/Dique_Compensador_Cha%C3%B1ar%2C_Neuquen_-_panoramio_(1).jpg',source:'Wikimedia Commons · Panoramio',url:'https://commons.wikimedia.org/wiki/File:Dique_Compensador_Chañar,_Neuquen_-_panoramio_(1).jpg',kind:'usable',license:'CC BY-SA 3.0',author:'psanetti',categories:['territorio','agua','paisaje']},
    {id:'dique-chanar-03',name:'Dique Compensador El Chañar · vista 3',photo:'https://commons.wikimedia.org/wiki/Special:FilePath/Dique_Compensador_Cha%C3%B1ar%2C_Neuquen_-_panoramio_(2).jpg',source:'Wikimedia Commons · Panoramio',url:'https://commons.wikimedia.org/wiki/File:Dique_Compensador_Chañar,_Neuquen_-_panoramio_(2).jpg',kind:'usable',license:'CC BY-SA 3.0',author:'psanetti',categories:['territorio','agua','paisaje']}
  ];
  if(typeof PHOTO_BANK!=='undefined')FREE_LOCAL_STOCK.forEach(item=>{if(!PHOTO_BANK.some(p=>p.id===item.id))PHOTO_BANK.push(item)});
  window.FabricaFreeLocalStock={version:1,items:FREE_LOCAL_STOCK};
})();
