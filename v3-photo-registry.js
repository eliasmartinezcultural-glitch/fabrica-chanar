/* FÁBRICA CHAÑAR V3 — CANONICAL PHOTO REGISTRY
   Single source for the V3 production bank. No dependency on index.html.
*/
(() => {
  'use strict';
  const raw = [
    ['ingreso','Ingreso al Chañar','territorio','https://upload.wikimedia.org/wikipedia/commons/7/7c/San_Patricio_del-Chañar.png'],
    ['malma1','Bodega Malma','produccion','https://cdn3.neuqueninforma.com.ar/s3i233/2026/04/neuqueninforma/images/02/53/48/2534897_44c7a411b0610cee0f3caadf94c192c0659b7cf906b8fd348ff333c167d8386d/md.webp'],
    ['malma2','Viñedos','produccion','https://cdn3.neuqueninforma.com.ar/s3i233/2026/03/neuqueninforma/images/02/50/79/2507944_37f1255f9cb90154c0a7d5bb0ee381ec1562e2a9766060cdde64c25847cff399/md.webp'],
    ['schroeder','Familia Schroeder','produccion','https://cdn3.neuqueninforma.com.ar/s3i233/2026/05/neuqueninforma/images/02/60/80/2608075_b6e8c378041672dbf2677b9ee78c9439bb3d94f327daf9b4dbfc075026972466/md.webp'],
    ['vendimia','Vendimia','produccion','https://media.lmneuquen.com/p/a2f924baa6348644ddf491cccc557daf/adjuntos/195/imagenes/007/862/0007862762/770x0/smart/vendimia-neuquina-bodega-familia-schroeder-2jpg.jpg'],
    ['pelon','Fiesta del Pelón','cultura','https://cdn3.neuqueninforma.com.ar/s3i233/2026/02/neuqueninforma/images/02/46/85/2468533_ca0d33fe34eccb73798b3e345507cbe5e948e43ad493d13687c77b8d5d056647/md.webp'],
    ['patritti','Bodega Patritti','produccion','https://cdn3.neuqueninforma.com.ar/s3i233/2025/05/neuqueninforma/images/01/90/01/1900116_ac7cdd2a248ad971ee0239f6b670059b164f7441f18de0245255d25238462f8f/md.webp'],
    ['chical','El Chical','territorio','https://cdn3.neuqueninforma.com.ar/s3i233/2026/04/neuqueninforma/images/02/53/49/2534972_19d21c6907d942f3c8e5e59f2356ba7d32b586f1cd4f9b692394beb92839893f/md.webp'],
    ['vendimia2','Paisaje de vendimia','produccion','https://media.lmcipolletti.com/p/7430df314d0a690a568dea239cc2598b/adjuntos/195/imagenes/007/862/0007862747/1170x658/smart/vendimia-neuquina-bodega-familia-schroeder-10jpg.jpg'],
    ['malma3','Vendimia Schroeder','produccion','https://media.lmcipolletti.com/p/b72988b7dce9b3c84ff2df3945645c8b/adjuntos/195/imagenes/007/862/0007862753/1170x658/smart/vendimia-neuquina-bodega-familia-schroeder-16jpg.jpg'],
    ['ref01','Paisaje abierto','territorio','https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85'],
    ['ref02','Camino rural','rural','https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=85'],
    ['ref03','Montaña y cielo','territorio','https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85'],
    ['ref04','Campo al amanecer','rural','https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=85'],
    ['ref05','Viñedo','produccion','https://images.unsplash.com/photo-1464638681273-096b9d9a5fdb?auto=format&fit=crop&w=1200&q=85'],
    ['ref06','Filas de cultivo','produccion','https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=85'],
    ['ref07','Cosecha','produccion','https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=85'],
    ['ref08','Trabajo rural','rural','https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=85'],
    ['ref09','Árbol y paisaje','territorio','https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85'],
    ['ref10','Agua y paisaje','territorio','https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1200&q=85'],
    ['ref11','Casa de campo','rural','https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85'],
    ['ref12','Arquitectura rural','patrimonio','https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85'],
    ['ref13','Persona en territorio','personas','https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=85'],
    ['ref14','Retrato exterior','personas','https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85'],
    ['ref15','Manos y oficio','personas','https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85'],
    ['ref16','Mercado local','cultura','https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=85'],
    ['ref17','Fiesta y comunidad','cultura','https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85'],
    ['ref18','Plaza','cultura','https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=85'],
    ['ref19','Iglesia y pueblo','patrimonio','https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85'],
    ['ref20','Camino entre árboles','territorio','https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85'],
    ['ref21','Horizonte','territorio','https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85'],
    ['ref22','Paisaje seco','territorio','https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85&sat=-15'],
    ['ref23','Sendero','rural','https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85&fm=jpg'],
    ['ref24','Tierra cultivada','produccion','https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1200&q=85'],
    ['ref25','Bodega interior','produccion','https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85'],
    ['ref26','Botellas y producción','produccion','https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=1200&q=85'],
    ['ref27','Mesa de trabajo','personas','https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85'],
    ['ref28','Herramientas','rural','https://images.unsplash.com/photo-1581147036324-c17ac41d8f0d?auto=format&fit=crop&w=1200&q=85'],
    ['ref29','Fruta y cosecha','produccion','https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=85&sat=-8'],
    ['ref30','Paisaje final','territorio','https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85&con=1']
  ];
  window.FABRICA_V3_PHOTOS = Object.freeze(raw.map((p,i)=>Object.freeze({id:p[0],title:p[1],category:p[2],url:p[3],license:i<10?'reference':'unknown',source:i<10?'registro heredado V2 — verificar derechos':'imagen de referencia — verificar licencia',focal:'50% 50%',scale:1,note:'No usar comercialmente sin derechos verificados.'})));
})();
