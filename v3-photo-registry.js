/* FÁBRICA CHAÑAR V3 — BANCO FOTOGRÁFICO TERRITORIAL
   Regla dura: toda entrada pertenece a San Patricio del Chañar.
   Una foto pendiente NO se presenta como foto válida ni se usa para exportación comercial.
*/
(() => {
  'use strict';
  const LOCAL = 'San Patricio del Chañar';
  const verified = [
    ['ingreso','Ingreso al Chañar','territorio','https://upload.wikimedia.org/wikipedia/commons/7/7c/San_Patricio_del-Chañar.png','reference','Wikimedia Commons — verificar licencia antes de uso comercial'],
    ['malma1','Bodega Malma','produccion','https://cdn3.neuqueninforma.com.ar/s3i233/2026/04/neuqueninforma/images/02/53/48/2534897_44c7a411b0610cee0f3caadf94c192c0659b7cf906b8fd348ff333c167d8386d/md.webp','reference','Neuquén Informa — imagen editorial, derechos a verificar'],
    ['malma2','Viñedos de San Patricio del Chañar','produccion','https://cdn3.neuqueninforma.com.ar/s3i233/2026/03/neuqueninforma/images/02/50/79/2507944_37f1255f9cb90154c0a7d5bb0ee381ec1562e2a9766060cdde64c25847cff399/md.webp','reference','Neuquén Informa — imagen editorial, derechos a verificar'],
    ['schroeder','Familia Schroeder','produccion','https://cdn3.neuqueninforma.com.ar/s3i233/2026/05/neuqueninforma/images/02/60/80/2608075_b6e8c378041672dbf2677b9ee78c9439bb3d94f327daf9b4dbfc075026972466/md.webp','reference','Neuquén Informa — imagen editorial, derechos a verificar'],
    ['vendimia','Vendimia en Bodega Familia Schroeder','produccion','https://media.lmneuquen.com/p/a2f924baa6348644ddf491cccc557daf/adjuntos/195/imagenes/007/862/0007862762/770x0/smart/vendimia-neuquina-bodega-familia-schroeder-2jpg.jpg','reference','LM Neuquén — imagen editorial, derechos a verificar'],
    ['pelon','Fiesta Provincial del Pelón','cultura','https://cdn3.neuqueninforma.com.ar/s3i233/2026/02/neuqueninforma/images/02/46/85/2468533_ca0d33fe34eccb73798b3e345507cbe5e948e43ad493d13687c77b8d5d056647/md.webp','reference','Neuquén Informa — Fiesta del Pelón 2026, derechos a verificar'],
    ['patritti','Bodega Patritti','produccion','https://cdn3.neuqueninforma.com.ar/s3i233/2025/05/neuqueninforma/images/01/90/01/1900116_ac7cdd2a248ad971ee0239f6b670059b164f7441f18de0245255d25238462f8f/md.webp','reference','Neuquén Informa — imagen editorial, derechos a verificar'],
    ['chical','El Chical','territorio','https://cdn3.neuqueninforma.com.ar/s3i233/2026/04/neuqueninforma/images/02/53/49/2534972_19d21c6907d942f3c8e5e59f2356ba7d32b586f1cd4f9b692394beb92839893f/md.webp','reference','Neuquén Informa — referencia territorial, derechos a verificar'],
    ['vendimia2','Vendimia en Familia Schroeder','produccion','https://media.lmcipolletti.com/p/7430df314d0a690a568dea239cc2598b/adjuntos/195/imagenes/007/862/0007862747/1170x658/smart/vendimia-neuquina-bodega-familia-schroeder-10jpg.jpg','reference','LM Cipolletti — imagen editorial, derechos a verificar'],
    ['vendimia3','Vendimia en Bodega Familia Schroeder','produccion','https://media.lmcipolletti.com/p/b72988b7dce9b3c84ff2df3945645c8b/adjuntos/195/imagenes/007/862/0007862753/1170x658/smart/vendimia-neuquina-bodega-familia-schroeder-16jpg.jpg','reference','LM Cipolletti — imagen editorial, derechos a verificar']
  ];
  const pending = [
    ['chacra-municipal','Chacra Municipal','rural'],
    ['balneario-municipal','Balneario y Camping Municipal','territorio'],
    ['predio-pelon','Predio Fiesta del Pelón','cultura'],
    ['estadio-municipal','Estadio Municipal Juan Bautista Jara','cultura'],
    ['epea3','EPEA Nº 3','educacion'],
    ['cfpa2','Centro de Formación Profesional Agropecuaria Nº 2','educacion'],
    ['bodegas-aicardi','Bodegas Aicardi','produccion'],
    ['valle-perdido','Valle Perdido Wine Resort','produccion'],
    ['bodega-malma','Bodega Familia Malma','produccion'],
    ['bodega-schroeder','Bodega Familia Schroeder','produccion'],
    ['bodega-patritti','Bodega Patritti','produccion'],
    ['pelon-fruta','Pelón y fruticultura local','produccion'],
    ['chacras','Chacras productivas del Chañar','rural'],
    ['vid','Viñedos del Chañar','produccion'],
    ['cosecha','Cosecha frutícola del Chañar','produccion'],
    ['trabajador-rural','Trabajador rural del Chañar','personas'],
    ['bendicion-frutos','Bendición de los frutos','cultura'],
    ['artesanos','Artesanos y emprendedores del Chañar','cultura'],
    ['feria-sabores','Feria Sabores y Amigos','cultura'],
    ['guiso-chanarense','Guiso Chañarense','gastronomia'],
    ['autos-antiguos','Exposición de autos antiguos','cultura'],
    ['orquesta-municipal','Orquesta Municipal','cultura'],
    ['artistas-locales','Artistas locales del Chañar','personas'],
    ['parajes','Parajes y caminos rurales del Chañar','territorio'],
    ['rural-norte','Zona rural norte del Chañar','territorio'],
    ['picadas','Picadas productivas del Chañar','territorio'],
    ['rio-neuquen','Entorno del río Neuquén en el Chañar','territorio'],
    ['produccion-fruticola','Producción frutícola local','produccion'],
    ['turismo-rural','Experiencias de turismo rural del Chañar','turismo'],
    ['vida-cotidiana','Vida cotidiana en San Patricio del Chañar','personas']
  ];
  const make = (p,i) => ({
    id:p[0], title:p[1], category:p[2], url:p[3]||'', license:p[4]||'pending',
    source:p[5]||'Pendiente: incorporar fotografía real del propio territorio.',
    location:LOCAL, territorialStatus:p[3]?'VERIFICAR_DERECHOS':'PENDIENTE_FOTO_LOCAL',
    focal:'50% 50%', scale:1,
    note:p[3]?'Pertenece al territorio; no usar comercialmente hasta verificar derechos.':'El tema es local y está documentado; falta una fotografía real del Chañar. No reemplazar con imagen genérica.'
  });
  const raw = [...verified.map((p,i)=>make(p,i)), ...pending.map((p,i)=>make(p,verified.length+i))];
  window.FABRICA_V3_PHOTOS = Object.freeze(raw.map(Object.freeze));
  window.FABRICA_V3_TERRITORY = Object.freeze({location:LOCAL,total:raw.length,verifiedTerritory:verified.length,pendingPhotos:pending.length});
})();
