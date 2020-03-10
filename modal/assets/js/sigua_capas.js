/**
* Define las capas tileadas de SIGUA para utilizarse con LeafletJS
**/


		// CAPAS
		var servidor = "http://www.sigua.ua.es";
		var servidorTiles = "http://www.sigua.ua.es";
		var siguaUrl= servidor+'/cgi-bin/siguawms';
		var siguaAttrib='Datos mapa &copy; <a href="'+servidorTiles+'">SIGUA</a>';
		var FormatImg = 'image/png';
		var ZoomMin = 5;
		var ZoomMax= 21;
		var ZoomMin = 5;
		var ZoomMax= 21;
		// Capas base
		var BASE = L.tileLayer(servidorTiles+'/cache/tms/1.0.0/BASE/webmercator_mod/{z}/{x}/{y}.png', {
			 tms: true,
			 transparent: true,
			 maxZoom: ZoomMax,
			 minZoom: ZoomMin,
			 unloadInvisibleTiles: true,
			 attribution: siguaAttrib,
		});

		var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});

 		var map = L.map("map", {
		  //drawControl: true,
		  zoom: 15,
		  center: [38.38442,-0.5152],
		  layers: [BASE]
		});  

/* Lanza el modal */
$('#miMapaModal').on('show.bs.modal', function(){
  	setTimeout(function() {
   	map.invalidateSize();
  	}, 10);
  
  	var varCodigo=document.getElementById("elCodigo").getAttribute('data-value');
  	var numcar = varCodigo.length;  
  	if(  varCodigo != "" ) { 
  		// Si es un codigo sigua 
  		if (numcar == 9) {
  			var miPlantaURL = varCodigo.substr(4, 2);
  			var miEdificio = varCodigo.substr(0,4);
  			var rootURL = servidor+'/api/pub/estancia/'+varCodigo;
  			$.getJSON(rootURL,{} ,function(data) {	
  				var lng = data.features[0].properties.lon;
  				var lat = data.features[0].properties.lat;
  				var miMarker = L.marker([lat, lng]).addTo(map);
				var circle = L.circle([lat, lng], 10);
				var bounds = circle.getBounds();	
				map.fitBounds(bounds);
				cambiaPlanta(miPlantaURL);	
			});				
  		}
  		// Es un edificio y planta (ej 0007P2) 
  		else if (numcar == 6) {
  			var rootURL = servidor+'/api/pub/edificio/'+varCodigo.substr(0,4);
  			$.getJSON(rootURL,{} ,function(data) {	
  				cambiaPlanta(varCodigo.substr(4, 2));
  				selEdi(data[0].bbox);
  			});  
  		}		
  		// Es un edificio 
  		else if (numcar == 4) {
  			//alert("Es un edificio");
  			var rootURL = servidor+'/api/pub/edificio/'+varCodigo;
  			$.getJSON(rootURL,{} ,function(data) {	
  				//Por defecto se posiciona en la PB 				
  				cambiaPlanta("PB");
  				selEdi(data[0].bbox);
  			}); 		
  		}
	}
	// no se ha indicado ningún codigo en el botón   
   else { 
  		//alert("no existe"); 		
  }
});	
		

		
		// create the tile layer with correct attribution
		var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		var osmAttrib='Map data © OpenStreetMap contributors';
		var MinZoomTextos = 19;	
		var MinZoomIconos = 20;
		var MinZoomPlantas = 19;
	
		// Capas básica o temática


		var PB_D_BASICO = L.tileLayer(servidorTiles+'/cache/tms/1.0.0/PB_D_BASICO/webmercator_mod/{z}/{x}/{y}.png', {
			 tms: true,
			 transparent: true,
			 unloadInvisibleTiles: true,
			 maxZoom: ZoomMax,
			 minZoom: MinZoomPlantas,
			 attribution: siguaAttrib,
		});
		PB_D_BASICO.addTo(map);	

	    // Textos
		var PB_T_CODIGO = L.tileLayer(servidorTiles+'/cache/tms/1.0.0/PB_T_CODIGO/webmercator_mod/{z}/{x}/{y}.png', {
			 tms: true,
			 transparent: true,
			 unloadInvisibleTiles: true,
			 maxZoom: ZoomMax,
			 minZoom: MinZoomPlantas,
			 attribution: siguaAttrib,
		});
		PB_T_CODIGO.addTo(map);				
		// Iconos
		var PB_ICONOS = L.tileLayer(servidorTiles+'/cache/tms/1.0.0/PB_ICONOS/webmercator_mod/{z}/{x}/{y}.png', {
			 tms: true,
			 transparent: true,
			 unloadInvisibleTiles: true,
			 maxZoom: ZoomMax,
			 minZoom: MinZoomIconos,
			 attribution: siguaAttrib,
		});

		PB_ICONOS.addTo(map);				

		// P1
		var P1_D_BASICO = L.tileLayer(servidorTiles+'/cache/tms/1.0.0/P1_D_BASICO/webmercator_mod/{z}/{x}/{y}.png', {
			 tms: true,
			 transparent: true,
			 unloadInvisibleTiles: true,
			 maxZoom: ZoomMax,
			 minZoom: MinZoomPlantas,
			 attribution: siguaAttrib,
		});	

	    // Textos
		var P1_T_CODIGO = L.tileLayer(servidorTiles+'/cache/tms/1.0.0/P1_T_CODIGO/webmercator_mod/{z}/{x}/{y}.png', {
			 tms: true,
			 transparent: true,
			 unloadInvisibleTiles: true,
			 maxZoom: ZoomMax,
			 minZoom: MinZoomPlantas,
			 attribution: siguaAttrib,
		});
		
		// Iconos
		var P1_ICONOS = L.tileLayer(servidorTiles+'/cache/tms/1.0.0/P1_ICONOS/webmercator_mod/{z}/{x}/{y}.png', {
			 tms: true,
			 transparent: true,
			 unloadInvisibleTiles: true,
			 maxZoom: ZoomMax,
			 minZoom: MinZoomIconos,
			 attribution: siguaAttrib,
		});

		// P2
		var P2_D_BASICO = L.tileLayer(servidorTiles+'/cache/tms/1.0.0/P2_D_BASICO/webmercator_mod/{z}/{x}/{y}.png', {
			 tms: true,
			 transparent: true,
			 unloadInvisibleTiles: true,
			 maxZoom: ZoomMax,
			 minZoom: MinZoomPlantas,
			 attribution: siguaAttrib,
		});	

	    // Textos
		var P2_T_CODIGO = L.tileLayer(servidorTiles+'/cache/tms/1.0.0/P2_T_CODIGO/webmercator_mod/{z}/{x}/{y}.png', {
			 tms: true,
			 transparent: true,
			 unloadInvisibleTiles: true,
			 maxZoom: ZoomMax,
			 minZoom: MinZoomPlantas,
			 attribution: siguaAttrib,
		});
		
		// Iconos
		var P2_ICONOS = L.tileLayer(servidorTiles+'/cache/tms/1.0.0/P2_ICONOS/webmercator_mod/{z}/{x}/{y}.png', {
			 tms: true,
			 transparent: true,
			 unloadInvisibleTiles: true,
			 maxZoom: ZoomMax,
			 minZoom: MinZoomIconos,
			 attribution: siguaAttrib,
		});		
		
			
		// P3
		var P3_D_BASICO = L.tileLayer(servidorTiles+'/cache/tms/1.0.0/P3_D_BASICO/webmercator_mod/{z}/{x}/{y}.png', {
			 tms: true,
			 transparent: true,
			 unloadInvisibleTiles: true,
			 maxZoom: ZoomMax,
			 minZoom: MinZoomPlantas,
			 attribution: siguaAttrib,
		});	

	    // Textos
		var P3_T_CODIGO = L.tileLayer(servidorTiles+'/cache/tms/1.0.0/P3_T_CODIGO/webmercator_mod/{z}/{x}/{y}.png', {
			 tms: true,
			 transparent: true,
			 unloadInvisibleTiles: true,
			 maxZoom: ZoomMax,
			 minZoom: MinZoomPlantas,
			 attribution: siguaAttrib,
		});
		
		// Iconos
		var P3_ICONOS = L.tileLayer(servidorTiles+'/cache/tms/1.0.0/P3_ICONOS/webmercator_mod/{z}/{x}/{y}.png', {
			 tms: true,
			 transparent: true,
			 unloadInvisibleTiles: true,
			 maxZoom: ZoomMax,
			 minZoom: MinZoomIconos,
			 attribution: siguaAttrib,
		});


		// P4
		var P4_D_BASICO = L.tileLayer(servidorTiles+'/cache/tms/1.0.0/P4_D_BASICO/webmercator_mod/{z}/{x}/{y}.png', {
			 tms: true,
			 transparent: true,
			 unloadInvisibleTiles: true,
			 maxZoom: ZoomMax,
			 minZoom: MinZoomPlantas,
			 attribution: siguaAttrib,
		});	

	    // Textos
		var P4_T_CODIGO = L.tileLayer(servidorTiles+'/cache/tms/1.0.0/P4_T_CODIGO/webmercator_mod/{z}/{x}/{y}.png', {
			 tms: true,
			 transparent: true,
			 unloadInvisibleTiles: true,
			 maxZoom: ZoomMax,
			 minZoom: MinZoomPlantas,
			 attribution: siguaAttrib,
		});
		
		// Iconos
		var P4_ICONOS = L.tileLayer(servidorTiles+'/cache/tms/1.0.0/P4_ICONOS/webmercator_mod/{z}/{x}/{y}.png', {
			 tms: true,
			 transparent: true,
			 unloadInvisibleTiles: true,
			 maxZoom: ZoomMax,
			 minZoom: MinZoomIconos,
			 attribution: siguaAttrib,
		});		
				

		// PS
		var PS_D_BASICO = L.tileLayer(servidorTiles+'/cache/tms/1.0.0/PS_D_BASICO/webmercator_mod/{z}/{x}/{y}.png', {
			 tms: true,
			 transparent: true,
			 unloadInvisibleTiles: true,
			 maxZoom: ZoomMax,
			 minZoom: MinZoomPlantas,
			 attribution: siguaAttrib,
		});	

	    // Textos
		var PS_T_CODIGO = L.tileLayer(servidorTiles+'/cache/tms/1.0.0/PS_T_CODIGO/webmercator_mod/{z}/{x}/{y}.png', {
			 tms: true,
			 transparent: true,
			 unloadInvisibleTiles: true,
			 maxZoom: ZoomMax,
			 minZoom: MinZoomPlantas,
			 attribution: siguaAttrib,
		});
		
		// Iconos
		var PS_ICONOS = L.tileLayer(servidorTiles+'/cache/tms/1.0.0/PS_ICONOS/webmercator_mod/{z}/{x}/{y}.png', {
			 tms: true,
			 transparent: true,
			 unloadInvisibleTiles: true,
			 maxZoom: ZoomMax,
			 minZoom: MinZoomIconos,
			 attribution: siguaAttrib,
		});		
		
/* Función para hacer zoom a un edificio obtenido del listado de edificios */
	function selEdi(bbox) {		
		//alert('tu bbox es ' + bbox );		
		var bboxArr =  bbox.split(",");// convierte el texto xmin,ymin,xmax,ymax en un array
		var SW = L.latLng(parseFloat(bboxArr[1]), parseFloat(bboxArr[0])),
		NE = L.latLng(parseFloat(bboxArr[3]), parseFloat(bboxArr[2])),
		bounds = L.latLngBounds(SW,NE);         
		map.fitBounds(bounds);
	}
