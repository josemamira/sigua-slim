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

$('#myModal').on('show.bs.modal', function(){
  setTimeout(function() {
    map.invalidateSize();
  }, 10);
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
		

