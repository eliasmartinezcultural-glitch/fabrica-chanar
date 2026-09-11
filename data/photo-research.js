/* FÁBRICA CHAÑAR — MAPA DE INVESTIGACIÓN FOTOGRÁFICA v1
   Fuentes locales para decidir qué imágenes buscar o pedir.
   Regla: social/web pública = referencia editorial hasta verificar licencia o permiso.
*/
const PHOTO_RESEARCH=[
  {id:'commons-local',role:'identidad',source:'Wikimedia Commons',url:'https://commons.wikimedia.org/wiki/Category:San_Patricio_del_Chañar',rights:'verified-sparse',note:'La categoría local contiene actualmente una sola imagen; no conviene forzarla como banco infinito.'},
  {id:'commons-dique',role:'territorio',source:'Wikimedia Commons',url:'https://commons.wikimedia.org/wiki/File:Dique_Compensador_Chañar,_Neuquen_-_panoramio.jpg',rights:'CC BY-SA 3.0',note:'Tres vistas verificadas del Dique Compensador El Chañar, autor psanetti.'},
  {id:'flickr-chanar',role:'paisaje-produccion',source:'Flickr',url:'https://www.flickr.com/photos/tags/cha%C3%B1ar/',rights:'verify-per-photo',note:'Aparecen fotografías vinculadas a viñedos, chacras y espacios de San Patricio del Chañar; no asumir licencia por estar publicadas.'},
  {id:'flickr-balneario',role:'rio-verano',source:'Flickr',url:'https://www.flickr.com/photos/146299323%40N07/33524223494',rights:'verify-per-photo',note:'Balneario San Patricio del Chañar; útil para futuras piezas de río y encuentro.'},
  {id:'flickr-vino',role:'vino',source:'Flickr',url:'https://www.flickr.com/photos/wineandsommelier/11674867305/',rights:'verify-per-photo',note:'Registro histórico de vino producido en San Patricio del Chañar; sirve como referencia visual/documental, no como foto comercial sin permiso.'},
  {id:'flickr-cosecha',role:'cosecha',source:'Flickr',url:'https://www.flickr.com/photos/wineandsommelier/5203944407',rights:'verify-per-photo',note:'Registro histórico de Bodega del Fin del Mundo; útil para estudiar botella, etiqueta y memoria vitivinícola.'},
  {id:'press-lm-vendimia',role:'vendimia',source:'LM Neuquén',url:'https://www.lmneuquen.com/neuquen/en-17-fotos-la-vendimia-neuquina-se-lucio-bodega-malma-n1231663',rights:'reference',note:'Buen banco de referencia para encuadres de vendimia, paisaje y encuentro.'},
  {id:'press-lm-vendimia-2024',role:'vendimia',source:'LM Neuquén',url:'https://www.lmneuquen.com/neuquen/en-22-fotos-el-cierre-todo-color-la-vendimia-neuquina-n1101553',rights:'reference',note:'Referencia de composición y color de la Vendimia Neuquina.'},
  {id:'tripadvisor-local',role:'turismo',source:'Tripadvisor',url:'https://www.tripadvisor.com.ar/LocationPhotos-g3750325-San_Patricio_del_Chanar_Province_of_Neuquen-Patagonia.html',rights:'user-generated-verify',note:'Gran volumen de fotos locales; solo usar con autorización individual o licencia comprobada.'},
  {id:'routes-destinations',role:'paisaje',source:'De Rutas y Destinos',url:'https://www.derutasydestinos.com/fotografias-San-Patricio-del-Cha%C3%B1ar--Neuquen.html',rights:'user-generated-verify',note:'Agrega referencias de Flickr geolocalizadas alrededor de San Patricio del Chañar.'},
  {id:'official-neuquen',role:'vino-fiesta',source:'Neuquén Informa',url:'https://www.neuqueninforma.gob.ar/',rights:'reference',note:'Fuente principal para localizar escenas recientes de vendimia, bodegas, Fiesta del Pelón y actividades locales.'}
];
window.FabricaPhotoResearch={version:1,sources:PHOTO_RESEARCH};
