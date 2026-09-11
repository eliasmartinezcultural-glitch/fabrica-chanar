/* FÁBRICA CHAÑAR — MAPA DE INVESTIGACIÓN FOTOGRÁFICA v2
   Fuentes locales para decidir qué imágenes buscar o pedir.
   Regla: social/web pública = referencia editorial hasta verificar licencia o permiso.
*/
const PHOTO_RESEARCH=[
  {id:'commons-local',roles:['identidad'],source:'Wikimedia Commons',url:'https://commons.wikimedia.org/wiki/Category:San_Patricio_del_Chañar',rights:'verified-sparse',note:'La categoría local contiene actualmente una sola imagen; no conviene forzarla como banco infinito.'},
  {id:'commons-dique',roles:['territorio','agua','paisaje'],source:'Wikimedia Commons',url:'https://commons.wikimedia.org/wiki/File:Dique_Compensador_Chañar,_Neuquen_-_panoramio.jpg',rights:'CC BY-SA 3.0',author:'psanetti',note:'Tres vistas verificadas del Dique Compensador El Chañar.'},
  {id:'flickr-chanar',roles:['paisaje','produccion'],source:'Flickr',url:'https://www.flickr.com/photos/tags/cha%C3%B1ar/',rights:'verify-per-photo',note:'Buscar viñedos, chacras, caminos y paisaje local. No asumir licencia.'},
  {id:'flickr-balneario',roles:['rio','verano','comunidad'],source:'Flickr',url:'https://www.flickr.com/photos/146299323%40N07/33524223494',rights:'verify-per-photo',note:'Balneario San Patricio del Chañar; referencia para río y encuentro.'},
  {id:'flickr-vino',roles:['vino','memoria'],source:'Flickr',url:'https://www.flickr.com/photos/wineandsommelier/11674867305/',rights:'verify-per-photo',note:'Registro histórico relacionado con vino producido en San Patricio del Chañar.'},
  {id:'flickr-cosecha',roles:['vendimia','vino'],source:'Flickr',url:'https://www.flickr.com/photos/wineandsommelier/5203944407',rights:'verify-per-photo',note:'Registro histórico de Bodega del Fin del Mundo; referencia de memoria vitivinícola.'},
  {id:'press-lm-vendimia',roles:['vendimia','vino','paisaje'],source:'LM Neuquén',url:'https://www.lmneuquen.com/neuquen/en-17-fotos-la-vendimia-neuquina-se-lucio-bodega-malma-n1231663',rights:'reference',note:'Banco de referencia para encuadres de vendimia, paisaje y encuentro.'},
  {id:'press-lm-vendimia-2024',roles:['vendimia','fiesta'],source:'LM Neuquén',url:'https://www.lmneuquen.com/neuquen/en-22-fotos-el-cierre-todo-color-la-vendimia-neuquina-n1101553',rights:'reference',note:'Referencia de composición y color de la Vendimia Neuquina.'},
  {id:'tripadvisor-local',roles:['turismo','paisaje'],source:'Tripadvisor',url:'https://www.tripadvisor.com.ar/LocationPhotos-g3750325-San_Patricio_del_Chanar_Province_of_Neuquen-Patagonia.html',rights:'user-generated-verify',note:'Volumen de fotos locales; usar solo con autorización individual o licencia comprobada.'},
  {id:'routes-destinations',roles:['paisaje','turismo'],source:'De Rutas y Destinos',url:'https://www.derutasydestinos.com/fotografias-San-Patricio-del-Cha%C3%B1ar--Neuquen.html',rights:'user-generated-verify',note:'Referencias geolocalizadas de Flickr alrededor de San Patricio del Chañar.'},
  {id:'official-neuquen',roles:['vino','fiesta','pelon','chical','vendimia'],source:'Neuquén Informa',url:'https://www.neuqueninforma.gob.ar/',rights:'reference',note:'Fuente principal para localizar escenas recientes de vendimia, bodegas, Fiesta del Pelón y actividades locales.'},
  {id:'social-instagram',roles:['vendimia','fiesta','bodega','cultura'],source:'Instagram / fotógrafos y cuentas locales',url:'',rights:'permission-required',note:'Buscar fotógrafos locales, bodegas, municipio, fiestas e instituciones. Pedir permiso escrito antes de usar comercialmente.'},
  {id:'social-facebook',roles:['fiesta','comunidad','rural'],source:'Facebook / instituciones y medios locales',url:'',rights:'permission-required',note:'Útil para localizar imágenes de fiestas y comunidad. La publicación pública no equivale a licencia.'},
  {id:'own-commissioned',roles:['all'],source:'Ocarina / fotógrafos colaboradores',url:'',rights:'authorized',note:'Objetivo prioritario: conseguir originales o autorización comercial para convertir las mejores referencias en producto vendible.'}
];
window.FabricaPhotoResearch={version:2,sources:PHOTO_RESEARCH};
