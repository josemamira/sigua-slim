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


// Control de plantas (PB/P1/P2/P3/P4/PS)
$('input[name="planta"]').change(function () {   
	var mapLevel = map.getZoom();
	if (mapLevel > 18) {
		var planta = $('input[name=planta]:checked').val();//alert(planta);
		var layerTema = eval(planta + "_D_" + "BASICO");
		var layerLabel = eval(planta + "_T_" + "CODIGO");
		var layerIconos = eval(planta + "_ICONOS");

		$("input[name='planta']").each(function() {
            // plantas
            if ($(this).is(':checked')) {
				map.addLayer(eval(layerTema));
				map.addLayer(eval(layerLabel));
				map.addLayer(eval(layerIconos));
			} 
			// para los no checked
			else {
				map.removeLayer( eval($(this).val() + "_D_BASICO") );
				map.removeLayer( eval($(this).val() + "_T_CODIGO") );
				map.removeLayer( eval($(this).val() + "_ICONOS") );
			}
        });
	} //else { alert("edificios no aparecen hasta zoom 19. Actualmente es "+ mapLevel); }
});



/**
 * Funcion para cambiar de planta desde un codigo sigua dado
 */
	function cambiaPlanta(planta) {
		//alert(planta);
		$(eval(planta)).trigger("click"); // cambia la botonera a la planta que se le pasa
		//var tema =  $('input[name=tema]:checked').val(); //alert("tema: "+ tema);
		//var label = $('input[name=label]:checked').val(); //alert("label: "+ label);
		//var iconos =  $('input[name=iconos]:checked').val();
		//var panos =  $('input[name=panos]:checked').val();
		var layerTema = eval(planta + "_D_" + "BASICO");
		var layerLabel = eval(planta + "_T_" + "CODIGO");
		var layerIconos = eval(planta + "_ICONOS");
		
		$("input[name='planta']").each(function() {
            // plantas
            if ($(this).is(':checked')) {
				map.addLayer(eval(layerTema));
				map.addLayer(eval(layerLabel));
				map.addLayer(eval(layerIconos));				
			} 
			// para los no checked
			else {			
				//map.removeLayer( eval($(this).val() + "_D_TEMA") );
				map.removeLayer( eval($(this).val() + "_D_BASICO") );
				//map.removeLayer( eval($(this).val() + "_T_DENO") );
				map.removeLayer( eval($(this).val() + "_T_CODIGO") );
				map.removeLayer( eval($(this).val() + "_ICONOS") );	
				//map.removeLayer( eval($(this).val() + "_PANO") );			
			}
        });		
	}


/*
 * **************************************
 * Esta función tiene como objetivo hacer un zoom a una estancia, y obtener un popup con sus datos
 * *************************************
*/

function popupEstancia(codigo) {
	if (codigo == '0000PB997') {
		elModal ='<div class="modal fade" id="myModal"  tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">Mensaje de error</h4></div><div class="modal-body"><p>Ubicación desconocida en Sigua.</p></div></div></div></div>';
		$(elModal).appendTo("body");
		$('#myModal').modal('show');
		alert('Ubicaci&oacute;n desconocida');
	} else {
		$.getJSON(servidor+'/apirest/pub/estancia/cuenta/'+codigo, function(data) {
			j=data.length;//alert('total: '+j);		
			$.each(data, function (i, item) {$('.modal').modal('hide');
				var cuenta = item.cuenta; //alert(cuenta);
				if (eval(cuenta) >= 1) {
					var miPlanta = codigo.substr(4, 2);
					var rootURL = servidor+'/apirest/pub/estancia/'+codigo; 
					$.getJSON(rootURL,{} ,function(data) {
						$("#enlace").html( "<a href='"+servidor+"/index.html?id="+ data.features[0].properties.codigo +"' target='_blank'>http://www.sigua.ua.es/index.html?id="+ data.features[0].properties.codigo +"</a>" );
						var popupContent =
							"<h3>"+ data.features[0].properties.codigo +" "+
							"<a href='http://www.twitter.com/home?status=Ubicación en SIGUA "+servidor+"/index.html?id="+ data.features[0].properties.codigo +"' target='_blank'><img src='https://lh5.googleusercontent.com/-xZVxH6CsUaQ/UefWwgi8o3I/AAAAAAAAEdk/reo5XS6z8-8/s32-no/twitter.png'</a>&nbsp;"+
							"<a href='https://www.facebook.com/sharer/sharer.php?u="+servidor+"/index.html?id="+ data.features[0].properties.codigo +"' target='_blank'><img  src='https://lh3.googleusercontent.com/-H8xMuAxM-bE/UefWwJr2vwI/AAAAAAAAEdY/N5I41q19KMk/s32-no/facebook.png'></a>&nbsp;"+
							"<a href='https://plus.google.com/share?url="+servidor+"/index.html?id="+ data.features[0].properties.codigo +"' target='_blank'><img src='https://lh5.googleusercontent.com/-5Q7Sj0SXhOA/UefWwcrnZ-I/AAAAAAAAEdg/auK3wqGCbZE/s32-no/googleplus.png'></a></h3>"+
							"<table class='table table-condensed'>"+
							"<tr class='sucess'><td><small>Actividad</small></td><td>"+ data.features[0].properties.nombre_actividad +"</td></tr>"+
							"<tr class='active'><td><small>Unidad/dpto</small></td><td>"+ data.features[0].properties.nombre_departamentosigua +"</td></tr>";
						if (data.features[0].properties.denominacion == null) {
							popupContent += "<tr class='sucess'><td><small>Denominacion</small></td><td><i>sin denominación</i></td></tr>"
						} else { 
							popupContent += "<tr class='sucess'><td><small>Denominacion</small></td><td>"+data.features[0].properties.denominacion+"</td></tr>";
						}
						popupContent +="<tr class='active'><td><small>Superficie</small></td><td>"+ data.features[0].properties.superficie +" m&sup2;</td></tr>";
						// ocupantes	
						if ( data.features[0].properties.ubicaciones == null ){
							popupContent += "<tr class='sucess'><td><small>Ocupantes</small></td><td>Sin ocupantes</td></tr></table>"+
											"<button  class='btn btn-primary btn-xs active' data-toggle='modal' data-target='#modalEnlace'><i class='fa fa-link'></i>&nbsp; Enlace</button>";
						} else {
							// sí hay personas
							var ubicacionesArr = data.features[0].properties.ubicaciones.substr(1);
							ubicacionesArr = ubicacionesArr.substr(0,ubicacionesArr.length - 1);// quitar {} en {23218,33986}
							ubicacionesArr = ubicacionesArr.split(",");// convierte el texto en un array de ubicaciones
							popupContent +="<tr class='sucess'><td><small>Ocupantes</small></td><td>"+ubicacionesArr.length+"</td></tr></table>"+
											"<button type='button' id='botonPersonas' class='btn btn-primary btn-xs active' "+
											"onclick=\"popup._close(); infoPersonas('"+data.features[0].properties.codigo+"'); \"><i class='fa fa-user' style='color: white'>&nbsp; Ver personas</button>&nbsp;"+
											"<button  class='btn btn-primary btn-xs active' data-toggle='modal' data-target='#modalEnlace'><i class='fa fa-link'></i>&nbsp; Enlace</button>"
						}		
						var newLon = data.features[0].properties.lon;
						var newLat = data.features[0].properties.lat;
						var miMarker = L.marker([newLat, newLon]).addTo(map);
						// crea un círculo para bounds, pero no lo dibuja
						var circle = L.circle([newLat, newLon], 50);
						var bounds = circle.getBounds();	
						map.fitBounds(bounds);	
						
						miMarker.bindPopup(popupContent ).openPopup();  
					});
					//alert(codigoURL);
					cambiaPlanta(miPlanta);
					//Eliminar modal
					$('.modal').modal('hide');
				} 
			})
		})
	}
	
} 









/*
 * **************************************
 * Esta función tiene como objetivo hacer un zoom a una estancia, y obtener un popup con sus datos
 * Procede de las búsquedas  de formulario
 * *************************************
*/

function popupEstanciaForm(codigo,msg) {
	$.getJSON(servidor+'/apirest/pub/estancia/cuenta/'+codigo, function(data) {
		j=data.length;//alert('total: '+j);		
		$.each(data, function (i, item) {$('.modal').modal('hide');
			var cuenta = item.cuenta; //alert(cuenta);
			if (eval(cuenta) >= 1) {
				var miPlanta = codigo.substr(4, 2);
				var rootURL = servidor+'/apirest/pub/estancia/'+codigo; 
				$.getJSON(rootURL,{} ,function(data) {
					cabecera = 	"<h3>"+ codigo +" "+"<a href='http://www.twitter.com/home?status=Ubicación en SIGUA "+servidor+"/index.html?id="+ codigo +"' target='_blank'><img src='https://lh5.googleusercontent.com/-xZVxH6CsUaQ/UefWwgi8o3I/AAAAAAAAEdk/reo5XS6z8-8/s32-no/twitter.png'</a>&nbsp;"+
							"<a href='http://www.openstreetmap.org/?mlat="+data.features[0].properties.lat+"&mlon="+data.features[0].properties.lon+"#map=18/"+data.features[0].properties.lat+"/"+data.features[0].properties.lon+"' target='_blank'><img  src='assets/img/logo_osm.png' width='32'></a>&nbsp;"+						
							"<a href='http://maps.google.com/maps?q="+data.features[0].properties.lat+","+data.features[0].properties.lon+"' target='_blank'><img  src='assets/img/logo_gmaps.png' width='32'></a>&nbsp;"+						
							"<a href='https://www.facebook.com/sharer/sharer.php?u="+servidor+"/index.html?id="+ codigo +"' target='_blank'><img  src='https://lh3.googleusercontent.com/-H8xMuAxM-bE/UefWwJr2vwI/AAAAAAAAEdY/N5I41q19KMk/s32-no/facebook.png'></a>&nbsp;"+
							"<a href='https://plus.google.com/share?url="+servidor+"/index.html?id="+ codigo +"' target='_blank'><img src='https://lh5.googleusercontent.com/-5Q7Sj0SXhOA/UefWwcrnZ-I/AAAAAAAAEdg/auK3wqGCbZE/s32-no/googleplus.png'></a></h3>"+
							"<table class='table table-condensed'>";

					var popupContent = cabecera + msg;		
					var newLon = data.features[0].properties.lon;
					var newLat = data.features[0].properties.lat;
					var miMarker = L.marker([newLat, newLon]).addTo(map);
					// crea un círculo para bounds, pero no lo dibuja
					var circle = L.circle([newLat, newLon], 50);
					var bounds = circle.getBounds();	
					map.fitBounds(bounds);	
					
					miMarker.bindPopup(popupContent ).openPopup();  
				});
				//alert(codigoURL);
				cambiaPlanta(miPlanta);
				//Eliminar modal
				$('.modal').modal('hide');
			} 
		})
	})
	
} 







/*
 ************************
 * EVENTO INFO
 ************************   
 */ 
// Evento click para info
var popup = L.popup();

function infoMapa(e) {
	
	// peticion rest
	var planta = $('input:radio[name=planta]:checked').val();
	var lat = e.latlng.lat; //alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
    var lon = e.latlng.lng; 
	var rootURL = servidor+'/apirest/pub/estancia/coordenada/'+planta+'/'+lon+'/'+lat; 	
	$.getJSON(rootURL,{} ,function(data) {	
		
	  if (data.features.length == 0) { // si no ha encontrado nada
		  //alerta('No tenemos información en esta posición y planta.');
		  //alert('sin información');  
	  } else { // si hay una estancia
		$("#enlace").html( "<a href='"+servidor+"/index.html?id="+ data.features[0].properties.codigo +"' target='_blank'>"+servidor+"/index.html?id="+ data.features[0].properties.codigo +"</a>" );
				var popupContent =
				"<h3>"+ data.features[0].properties.codigo +"</h3>"+
				"<a href='http://www.openstreetmap.org/?mlat="+lat+"&mlon="+lon+"#map=18/"+lat+"/"+lon+"' target='_blank'><img  src='assets/img/logo_osm.png' width='32'></a>&nbsp;"+						
				"<a href='http://maps.google.com/maps?q="+lat+","+lon+"' target='_blank'><img  src='assets/img/logo_gmaps.png' width='32'></a>&nbsp;"+						
				"<a href='http://www.twitter.com/home?status=Ubicación en SIGUA http://www.sigua.ua.es/index.html?id="+ data.features[0].properties.codigo +"' target='_blank'><img src='https://lh5.googleusercontent.com/-xZVxH6CsUaQ/UefWwgi8o3I/AAAAAAAAEdk/reo5XS6z8-8/s32-no/twitter.png'></a>&nbsp;"+
				"<a href='https://www.facebook.com/sharer/sharer.php?s=100&p[title]=SIGUA - Ubicación&p[url]=http://www.sigua.ua.es/index.html?id="+ data.features[0].properties.codigo +"' &p[summary]=Ubicación en SIGUA&p[images][0]=http://iig.ua.es/es/geomatica/imagenes/-gestadm/twitter_medi.png' target='_blank'><img  src='https://lh3.googleusercontent.com/-H8xMuAxM-bE/UefWwJr2vwI/AAAAAAAAEdY/N5I41q19KMk/s32-no/facebook.png'></a>&nbsp;"+
				"<a href='https://plus.google.com/share?url=http://www.sigua.ua.es/index.html?id="+ data.features[0].properties.codigo +"' target='_blank'><img src='https://lh5.googleusercontent.com/-5Q7Sj0SXhOA/UefWwcrnZ-I/AAAAAAAAEdg/auK3wqGCbZE/s32-no/googleplus.png'></a></h3>"+
				"<table class='table table-condensed'>"+
				"<tr class='sucess'><td><small>Actividad</small></td><td>"+ data.features[0].properties.nombre_actividad +"</td></tr>"+
				"<tr class='active'><td><small>Unidad/dpto</small></td><td>"+ data.features[0].properties.nombre_departamentosigua +"</td></tr>";
				if (data.features[0].properties.denominacion == null) {
					popupContent += "<tr class='sucess'><td><small>Denominacion</small></td><td><i>sin denominación</i></td></tr>"
				} else { 
					popupContent += "<tr class='sucess'><td><small>Denominacion</small></td><td>"+data.features[0].properties.denominacion+"</td></tr>";
				}
				popupContent +="<tr class='active'><td><small>Superficie</small></td><td>"+ data.features[0].properties.superficie +" m²</td></tr>";
				// ocupantes	
				if ( data.features[0].properties.ubicaciones == null ){ // sin
					// some_variable is either null or undefined
					popupContent += "<tr class='sucess'><td><small>Ocupantes</small></td><td>Sin ocupantes</td></tr></table>"+
									//"<button  class='btn btn-primary btn-xs active' data-toggle='modal' data-target='#modalEnlace'><i class='fa fa-link'></i>&nbsp; Enlace</button>&nbsp;"+
									"<button type='button' id='botonEstancia' class='btn btn-primary btn-xs active' "+
									"onclick=\"popup._close(); showFichaEst('"+data.features[0].properties.codigo+"'); \"><i class='fa fa-bolt'></i>&nbsp;Seleccionar estancia</button>&nbsp;";

				} else {
					// sí hay personas
					var ubicacionesArr = data.features[0].properties.ubicaciones.substr(1);
					ubicacionesArr = ubicacionesArr.substr(0,ubicacionesArr.length - 1);// quitar {} en {23218,33986}
					ubicacionesArr = ubicacionesArr.split(",");// convierte el texto en un array de ubicaciones
					//ubicacionesArr = ubicacionesArr.length // cuenta de ubicaciones. Elementos en array	
					popupContent +="<tr class='sucess'><td><small>Ocupantes</small></td><td>"+ubicacionesArr.length+"</td></tr></table>"+
								//"<button type='button' id='botonPersonas' class='btn btn-primary btn-xs active' "+
								//"onclick=\"popup._close(); infoPersonas('"+data.features[0].properties.codigo+"'); \"><i class='fa fa-user'></i>&nbsp;Ver personas</button>&nbsp;"+
								//"<button  class='btn btn-primary btn-xs active' data-toggle='modal' data-target='#modalEnlace'><i class='fa fa-link'></i>&nbsp; Enlace</button>&nbsp;"+
								"<button type='button' id='botonEstancia' class='btn btn-primary btn-xs active' "+
								"onclick=\"popup._close(); showFichaEst('"+data.features[0].properties.codigo+"'); \"><i class='fa fa-bolt'></i>&nbsp;Seleccionar estancia</button>&nbsp;";
				}
			
		//}
		
		popup
         .setLatLng(e.latlng)
         .setContent(popupContent)
         .openOn(map); 
	  }
	});      
}
map.on('click', infoMapa);

function showFichaEst( codigo ) {
	alert("hola, has seleccionado la estancia con " + codigo + "\nHaz lo que quieras con él");
}

$('#icoAyuda').popover();
/*
$('#icoAyuda').popover();
/*$('#icoAyuda').popover({
    offset: 50,
    placement: 'right'
});

$("#icoAyuda").data('popover').tip().css("z-index", 1060);*/
