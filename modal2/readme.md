Mapa Sigua en modal
===================


Esta utilidad permite utilizar en Internet la cartografía de SIGUA (http://www.sigua.ua.es) utilizando el framework Bootstrap de Twitter.

Su funcionamiento es muy sencillo y permite navegar por el mapa de forma continua, pudiendo además obtener información puntual sobre las estancias, con estos datos:
> - Actividad
> - Departamento
> - Denominación
> - Superficie
> - Ocupantes
> - Enlaces a redes sociales (Twitter, Facebook, G+)
> - Enlaces a visores cartográficos web (OpenStreetMap y GMaps)

Para navegar entre las diferentes plantas se utiliza un **control de plantas** que permite cambiar de una planta a otra

----------


Información
-------------

La cartografía se visualiza en una ventana modal cuyo tamaño es persolizable mediante CSS 
```
#map { min-height: 350px;}
```
Este  visor utiliza tres  librerías Javascript que pueden referirse de forma local o remota:
> - **LeafletJS**: Pequeña pero potente utilidad para visualizar cartografía en la web
> - **Jquery**: Framework de sobra conocido para facilitar el uso de Javascript
> **Bootstrap:**Framework creado por Twitter para crear interfaces web con CSS. La versión utilizada es la 3.X

Opcionalmente se utiliza **Font Awesome** para dibujar iconos

La información de carácter puntual es obtenida utilizando el API RestFul de Sigua: http://web.ua.es/es/sigua/api-rest.html

Para crear un modal de Sigua utiliza esta plantilla
```
<div class="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> 
                <h4 class="modal-title">Título</h4>
            </div>
            <div class="modal-body" id="map"></div>
            <div class="modal-footer">
               <div class="btn-group hide" data-toggle="buttons" id="plantas">
                  <span class="badge">Plantas</span>
		 <label class="btn btn-default"> <input type="radio" name="planta" id="P1" value="P1"> P1  </label>
		 <label class="btn btn-default"> <input type="radio" name="planta" id="P3" value="P3"> P3  </label>
		 <label class="btn btn-default"> <input type="radio" name="planta" id="PS" value="PS"> PS  </label>
	  </div>                
        </div>            
      </div>
    </div>
 </div>
```

Personalización
-------------
Sí quieres extender la funcionalidad cuando se selecciona una estancia en el popup, dispones de una función llamada **showCodigo** que recibe como variable el código de estancia. Puedes utilizarlo para incorporarlo a  tu website. Este evento se dispara haciendo clic en el botón del popup.
```
function showCodigo( codigo ) {
	alert("Hola, has seleccionado la estancia con codigo " + codigo );
} 
```
