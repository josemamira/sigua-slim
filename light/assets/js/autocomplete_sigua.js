
	    var servidor = 'http://localhost'; // desarrollo
	    //var servidor = 'http://www.sigua.ua.es'; // producción
	    // PARA PRODUCCIÓN UTILIZAR CORS
	    
		var personasBH = new Bloodhound({
			//datumTokenizer: Bloodhound.tokenizers.obj.whitespace('nombrecompleto'),
			datumTokenizer: function(d) {
				return Bloodhound.tokenizers.whitespace(d.nombrecompleto);
			},
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			remote: {
				url: servidor+'/apirest/pub/persona/all/filtro/%QUERY',	
				ajax: {
					beforeSend: function (jqXhr, settings) { $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin"); },
					complete: function (jqXHR, status) { $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search"); }
				  }			
			},
			limit: 10
		});	
	
		var estanciasBH = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('codigo'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			remote: {
				url: servidor+'/apirest/pub/estancia/edificio/util/%QUERY',
				ajax: {
					beforeSend: function (jqXhr, settings) { $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin"); },
					complete: function (jqXHR, status) { $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search"); }
				}	
			},
			limit: 10
		});				

		var denominacionesBH = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('codigo'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			remote: {
				url: servidor+'/apirest/pub/estancia/edificio/denominacion/%QUERY',		
			}
			,limit: 10
		});	

		var aulasBH = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('codigo'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			remote: {
				url: servidor+'/apirest/pub/aulas/filtro/%QUERY',
				ajax: {
					  beforeSend: function (jqXhr, settings) { $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin"); },
					  complete: function (jqXHR, status) { $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search"); }
				}									
			},
			limit: 10
		});	
		
		personasBH.initialize();
		estanciasBH.initialize();
		denominacionesBH.initialize();
		aulasBH.initialize();

	//$('#superBusquedas .form-control').typeahead({
    $("#searchbox").typeahead({
		   hint: true,
		   minLength: 2,
		   highlight: true
		},
		{
			name: 'personas',
			displayKey: 'codigo',
			source: personasBH.ttAdapter(),
		    templates: {
				header: '<h4 class="typeahead-header"><i class="fa fa-user"  style="color: black"> Personas</i></h4>',
				empty: ['<div class="empty-message">','Sin resultado','</div>'].join('\n'),
				suggestion: Handlebars.compile('<small><strong>{{status}}{{nombrecompleto}}</strong> - {{message}}{{nombre_departamentosigua}}</small><span class="badge pull-right">{{codigo}}</span>')
			  }
		},
	
		{
			name: 'estancias',
			displayKey: 'codigo',
			source: estanciasBH.ttAdapter(),
		    templates: {
				header: '<h4 class="typeahead-header"><i class="fa fa-square-o"  style="color: black"> Estancias</i></h4>',
				empty: ['<div class="empty-message">','Sin resultado','</div>'].join('\n'),
				suggestion: Handlebars.compile('<small><p><strong>{{nombre_actividad}}</strong> - {{nombre_departamentosigua}}</small><span class="badge pull-right">{{codigo}}</span>')
			}
		}		
		,
		{
			name: 'denominaciones',
			displayKey: 'codigo',
			source: denominacionesBH.ttAdapter(),
			templates: {
				header: '<h4 class="typeahead-header"><i class="fa fa-font" style="color: black"> Denominaciones</i></h4>',
				empty: ['<div class="empty-message">','Sin resultado','</div>'].join('\n'),
				suggestion: Handlebars.compile('<small><strong>{{denominacion}}</strong> - {{nombre_departamentosigua}}</small><span class="badge pull-right">{{codigo}}</span>')
			}
		},
		{
			name: 'aulas',
			displayKey: 'codigo',
			source: aulasBH.ttAdapter(),
			templates: {
				header: '<h4 class="typeahead-header"><i class="fa fa-book" style="color: black"> Aulas</i></h4>',
				empty: ['<div class="empty-message">','Sin resultdo','</div>'].join('\n'),
				suggestion: Handlebars.compile('<small><strong>{{denominacion}}</strong> - {{nombre_departamentosigua}}</small><span class="badge pull-right">{{codigo}}</span>')
			}
		}
	);
	
	// $("#searchbox").typeahead.bind('typeahead:select', function(ev, suggestion) {
$('#searchbox').bind('typeahead:selected', function(obj, datum, name) { 
	enlace =  "<a href='"+servidor+"/index.html?id="+ datum.codigo+"' class='btn btn-primary btn-xs active' role='button'><i class='fa fa-link'></i> &nbsp;Enlace</a>";
	/*cabecera = 	"<h3>"+ datum.codigo +" "+"<a href='http://www.twitter.com/home?status=Ubicación en SIGUA "+servidor+"/index.html?id="+ datum.codigo +"' target='_blank'><img src='https://lh5.googleusercontent.com/-xZVxH6CsUaQ/UefWwgi8o3I/AAAAAAAAEdk/reo5XS6z8-8/s32-no/twitter.png'</a>&nbsp;"+
							"<a href='https://www.facebook.com/sharer/sharer.php?u="+servidor+"/index.html?id="+ datum.codigo +"' target='_blank'><img  src='https://lh3.googleusercontent.com/-H8xMuAxM-bE/UefWwJr2vwI/AAAAAAAAEdY/N5I41q19KMk/s32-no/facebook.png'></a>&nbsp;"+
							"<a href='https://plus.google.com/share?url="+servidor+"/index.html?id="+ datum.codigo +"' target='_blank'><img src='https://lh5.googleusercontent.com/-5Q7Sj0SXhOA/UefWwcrnZ-I/AAAAAAAAEdg/auK3wqGCbZE/s32-no/googleplus.png'></a></h3>"+
							"<table class='table table-condensed'>";*/
	if (name == 'estancias') {
		//{"codigo":"0037PB016","nombre_actividad":"Aula de teoría","lon":"-0.511428512123622","lat":"38.3827424631501","superficie":"113.25","nombre_departamentosigua":"GESTIÓN DE ESPACIOS"}
		msg = 	"<tr class='sucess'><td><small>Actividad</small></td><td>"+ datum.nombre_actividad +"</td></tr>"+
				"<tr class='active'><td><small>Unidad/dpto</small></td><td>"+ datum.nombre_departamentosigua +"</td></tr>"+
				"<tr class='sucess'><td><small>Superficie</small></td><td>"+ datum.superficie +" m&sup2;</td></tr></table>"+enlace;
	} else if (name == 'personas') {
		//{"id":"66969","plaza":"TECNICO/A","categoria":"PAS","id_departamentosigua":"02.90","codigo":"0037P1013","nombrecompleto":"JOSE MANUEL MIRA MARTINEZ","nombre_departamentosigua":"VICERRECTORADO DE CAMPUS Y SOSTENIBILIDA"}
		msg = 	"<tr class='sucess'><td><small>Nombre</small></td><td>"+ datum.nombrecompleto+"</td></tr>"+
				"<tr class='active'><td><small>Plaza</small></td><td>"+ datum.plaza +" ("+ datum.categoria+")</td></tr>"+
				"<tr class='sucess'><td><small>Unidad/dpto</small></td><td>"+ datum.nombre_departamentosigua +"</td></tr></table>"+enlace;
	} else if (name == 'denominaciones') {
		//{"codigo":"0037PB007","nombre_actividad":"Administración","lon":"-0.511159441812312","lat":"38.3824560932035","superficie":"21.77","nombre_departamentosigua":"BIBLIOTECA UNIVERSITARIA","denominacion":"Despacho Subdirección Bca. Geografía"}
		msg = 	"<tr class='sucess'><td><small>Denominaci&oacute;n</small></td><td>"+ datum.denominacion+")</td></tr>"+
				"<tr class='active'><td><small>Unidad/dpto</small></td><td>"+ datum.nombre_departamentosigua +"</td></tr>"+
				"<tr class='sucess'><td><small>Superficie</small></td><td>"+ datum.superficie +" m&sup2;</td></tr></table>"+enlace;
	} else if (name == 'aulas') {
		//{"codigo":"0042PB003","id_actividad":1,"nombre_actividad":"Aula de teoría","superficie":"45.03","lon":"-0.508301695494437","lat":"38.3823354446125","geojson":"{\"type\":\"MultiPolygon\",\"coordinates\":[[[[-0.50834363548351,38.3823703674061],[-0.508292274723747,38.3823829253868],[-0.508259755530424,38.3823005218189],[-0.508264563767387,38.3822993461803],[-0.508275710134338,38.3822966208355],[-0.508311116235914,38.3822879638506],[-0.50834363548351,38.3823703674061]]]]}","id_departamentosigua":"07.018","nombre_departamentosigua":"GESTIÓN DE ESPACIOS","denominacion":"A3/0001","ubicaciones":null}				
		msg = 	"<tr class='sucess'><td><small>Denominaci&oacute;n</small></td><td>"+ datum.denominacion+")</td></tr>"+
				"<tr class='active'><td><small>Unidad/dpto</small></td><td>"+ datum.nombre_departamentosigua +"</td></tr>"+
				"<tr class='sucess'><td><small>Actividad</small></td><td>"+ datum.nombre_actividad +"</td></tr>"+
				"<tr class='active'><td><small>Superficie</small></td><td>"+ datum.superficie +" m&sup2;</td></tr></table>"+enlace;
	}	
	console.log(JSON.stringify(datum));		
				
/*						    
        console.log(JSON.stringify(obj)); // object
        // outputs, e.g., {"type":"typeahead:selected","timeStamp":1371822938628,"jQuery19105037956037711017":true,"isTrigger":true,"namespace":"","namespace_re":null,"target":{"jQuery19105037956037711017":46},"delegateTarget":{"jQuery19105037956037711017":46},"currentTarget":
        console.log(JSON.stringify(datum));
         // outputs:  {"id":"66771","plaza":"PROFESOR/A TITULAR DE UNIVERSIDAD","categoria":"PDI","id_departamentosigua":"B173","codigo":"0019P2017","nombrecompleto":"ALFREDO RAMON MORTE","nombre_departamentosigua":"ANAL. GEOGRAF. REGIONAL Y GEOGRAFIA FISI"}
        console.log(JSON.stringify(name)); // outputs, e.g., "personas"        
   
 console.log(JSON.stringify(name));     */
 //alert(datum.codigo);
        
        
        
        
        
        
        
        
        popupEstanciaForm(datum.codigo,msg)

});




