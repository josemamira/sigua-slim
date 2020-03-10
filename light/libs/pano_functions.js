	// Show hide floors buttons. Mostrar ocultar botonera de plantas
	map.on('zoomend', function() {
		var mapLevel = map.getZoom();
		if (mapLevel > 18) {
			$("#plantas").removeClass().addClass("btn-group show");
		}
		else
		{
			$("#plantas").removeClass().addClass("btn-group hide");
		}

	});


	// Change floor 
	$('input[name="planta"]').change(function () {
		var planta = $('input[name=planta]:checked').val();
		loadUrl(planta)

	});


	// Change to  floor page with associated geojson
	function loadUrl(planta)
	{
		// Set path to URL
		window.location = "./panorama_"+planta+".html";
		return false;
	}

	
	// icon
	var panoIcon = L.icon({
		iconUrl: '../img/pano.png',
		//shadowUrl: 'leaf-shadow.png',
		iconSize:     [32, 32], // size of the icon
		//shadowSize:   [50, 64], // size of the shadow
		iconAnchor:   [16,16], // point of the icon which will correspond to marker's location
		//shadowAnchor: [4, 62],  // the same for the shadow
		popupAnchor:  [0,0] // point from which the popup should open relative to the iconAnchor
	});


	// sidebar
	var sidebar = L.control.sidebar('sidebar', {
		position: 'left'
	});

	map.addControl(sidebar);
	// Show sidebar
	sidebar.show();



 	var featureGroup = L.featureGroup().addTo(map);
    
		// Cuenta Github
	   var github = new Github({
	     token: "e1a3e3c781bcbab22c58bb04d0ff1554e293a2d0",
	     auth: "oauth"
	   });
	   var username = 'labgeo';
	   var reponame = 'pano-geojson';

   var repo = github.getRepo(username, reponame); 
 
 
   var myGeoJsonLayer;
   repo.read('master', file, function(err, data) {
		miJson = $.parseJSON(data);
		console.log("cuenta: " + miJson.features.length );
		myGeoJsonLayer = L.geoJson(miJson, {
			pointToLayer: function (feature, latlng) {
				return L.marker(latlng, {icon: panoIcon });
			},
			onEachFeature: onEachFeature
		});
	});  
    
   // Draw control
   var drawControl = new L.Control.Draw({
		draw: {
			position: 'topleft',
			rectangle: false,
			polygon: false,
			polyline: false,
			circle: false
			//,edit:false,remove:false
		},
		edit: { featureGroup: featureGroup, edit:false,remove:false }
	});
	map.addControl(drawControl);
	

/*	map.on('zoomend', function() {
		var mapLevel = map.getZoom();
		if (mapLevel > 18) {

		   drawControl = new L.Control.Draw({
				draw: {
					position: 'topleft',
					rectangle: false,
					polygon: false,
					polyline: false,
					circle: false					
				},
				edit: { featureGroup: featureGroup, edit:false,remove:false }
			});
		}
		else
		{

		   drawControl = new L.Control.Draw({
				draw: false,
				edit: { featureGroup: featureGroup, edit:false,remove:false }
			});
		}
	});
*/
	

	// Digitalizacion
	map.on('draw:created', function (e) {
		var type = e.layerType,
			layer = e.layer;
		var shape = layer.toGeoJSON();	
		// atributos
		shape.properties.author ='Jose';
		shape.properties.name = $('#formTexto').val();
		shape.properties.file = $('#formFileImageGithub').val();
		shape.properties.date = timeStamp();
		var lon = shape.geometry.coordinates[0];
		var lat = shape.geometry.coordinates[1];
		// Obtener codigo sigua del click
		//var servidor = "http://localhost";
		var planta = $('input:radio[name=planta]:checked').val();
		//var planta = "PB";
		var rootURL = servidor+'/apirest/pub/estancia/coordenada/'+planta+'/'+lon+'/'+lat; 	
		$.getJSON(rootURL,{} ,function(data) {
			//elCodigoSigua = data.features[0].properties.codigo;
			console.log(data.features.length);// Obtiene el nº de elementos
			if (data.features.length == 0) { // si no ha encontrado nada
				alert('No tenemos información en esta posición y planta.');		  
				return 'sin codigo';
			} else { // si hay una estancia
				var codigo = data.features[0].properties.codigo;
				shape.properties.code = codigo;		
				// Añadir elemento digitalizado a la layer
				myGeoJsonLayer.addData(shape);
				// Ver toda la capa featureGroup en json con los elementos digitalizados incluidos
				//alert(JSON.stringify(featureGroup.toGeoJSON() ) ) ;
				updateGeoJsonGithub( JSON.stringify(featureGroup.toGeoJSON()) );
					
			}
		});	


	});

	map.on('draw:edited', function (e) {
		var layers = e.layers;
		var countOfEditedLayers = 0;
		layers.eachLayer(function(layer) {
			countOfEditedLayers++;
		});
		console.log("Edited " + countOfEditedLayers + " layers");
	});


	function onEachFeature(feature, layer) {
		featureGroup.addLayer(layer);
		layer.on({
			click: showPano
		});
	}


	// Load panorama in modal 
	function showPano(e) {
		var layer = e.target;
		$('#tituloModal').html( layer.feature.properties.name);
		
		// imagen
		var rutaImagen =  'photos/'+layer.feature.properties.file;
		repo.read('master', rutaImagen, function(err, data) 
		{			
			$('#contenido').html('<div class="cycle" style="background:url(\''+ data +'\');height:330px"></div>');
			$('.cycle').cyclotron();
			$('#myModal').modal('toggle');	
		}); 
		
	}

	// Show timeStamp
	function timeStamp() {
		// Create a date object with the current time
		var now = new Date();
	 	// Create an array with the current month, day and time
		var date = [  now.getDate(), now.getMonth() + 1, now.getFullYear() ];
	 	// Create an array with the current hour, minute and second
		var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
	 	// Determine AM or PM suffix based on the hour
		var suffix = ( time[0] < 12 ) ? "AM" : "PM";
	 	// Convert hour from military time
		time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
	 	// If hour is 0, set it to 12
		time[0] = time[0] || 12;
	 	// If seconds and minutes are less than 10, add a zero
		for ( var i = 1; i < 3; i++ ) {
			if ( time[i] < 10 ) {
				time[i] = "0" + time[i];
			}
		}
	 	// Return the formatted string
		return date.join("/") + " " + time.join(":") + " " + suffix;
	}
		

	// Read image from file
	function readImage(input) {
	    if ( input.files && input.files[0] ) {
	        var FR= new FileReader();
	        FR.onload = function(e) {
	             $('#img').attr( "src", e.target.result );
	             $('#img').removeClass().addClass("show");
	             $('#base').text( e.target.result );
	             console.log(this.width);
	             console.log(this.height);
	        };       
	        FR.readAsDataURL( input.files[0] );
	    }
	}

	// Event on change image
	$("#panoFile").change(function(){
	    readImage( this );
	    // mostrar boton "subir imagen a github"
	    $('#buttonSubirImagenGithub').removeClass().addClass("show");	
	    $('#formFileImageGithub').removeClass().addClass("show");	
	});
	
	// Upload image in base64 to repository
	function subirImagenGithub(img64) {
		fileName = 'pano_'+ Date.now() +'.jpg';
		fileNameFull = 'photos/'+fileName;
		repo.write('master', fileNameFull , img64, 'Added new pano photo', function(err) {});
		// guardar nombre del fichero en una caja oculta para recuperarla luego  $('#formLat').text(lat);
		$('#formFileImageGithub').val(fileName);
		// mostrar boton guardar
		$('#botonAddFeature').removeClass().addClass("show");
		// ocultar sidebar
		sidebar.hide();
	}
	
	// Retrieve the image file value include in Github. Recupera el valor del fichero de imagen incluido en github
	function getFileName() {
		return $('#formFileImageGithub').val();
	}
	
	// Update Geojson in Github
	function updateGeoJsonGithub(geojsonText) {
		// Borrar fichero geojson 
		//repo.remove('master', file, function(err) {});
		// Crearlo con nuevo contenido
		repo.write('master', file, geojsonText, 'Added new feature to existing GeoJSON', function(err) {});
		alert("Added new feature");
		// Borrar cajas img y descripcion y mostrar sidebar
		$("#formTexto").val("");
		$("#formFileImageGithub").val("");
		sidebar.show();				
	}
