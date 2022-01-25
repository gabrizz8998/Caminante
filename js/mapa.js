var map;
var grosor=document.getElementById("grosor");
grosor.addEventListener("change",function(){
    valor.innerHTML=grosor.value;
},false);

let permite=false;
var zoom=document.getElementById("zoom");
zoom.addEventListener("change",function(){
    valor_zoom.innerHTML=zoom.value;
    let valor=parseInt(zoom.value)
   map.setZoom(valor);
},false);


// 

var array_marcadores=new Array();

// Si no se permite la posicion en el navegador el centro del mapa sera el punto en estas coordenadas
var latitud = 41.67097948393865;
var longitud = -3.6769259916763985;

let contador=0;
//
let latitud_inicial;
let longitud_inicial;
navigator.geolocation.getCurrentPosition(pos => {
    array_marcadores=new Array();
    latitud_inicial = pos.coords.latitude;
    longitud_inicial = pos.coords.longitude;  
    inicio();
    permite=true;
});

function inicio()
{
    let centro;
    if(longitud_inicial==null){
        centro=new google.maps.LatLng(latitud,longitud);
    }else{
        centro=new google.maps.LatLng(latitud_inicial,longitud_inicial);
    }
    array_marcadores.push(centro);
    map = new google.maps.Map(
    document.getElementById('map_canvas'), {
        
    // En el mapa se visualiza el mapa correspondiente a esta latitud, longitud
        center: centro,//latitud,longitud),//
       // center: new google.maps.LatLng(41.6685198,-3.6886618),//latitud,longitud),//
    zoom: 18, // zoom del mapa
    draggableCursor: 'auto', // forma del cursor
    draggingCursor: 'crosshair',
    mapTypeId: google.maps.MapTypeId.SATELLITE // tipo de mama
});


marker = new google.maps.Marker({
    position: centro,
    map: map,
    nombre: 'Pepino'
});


google.maps.event.addListener(map, 'click', function (event) {
    map.setCenter(event.latLng);
    marker = new google.maps.Marker({
        position: event.latLng,
        map: map,
        nombre: 'Pepino'
    });
    array_marcadores.push(event.latLng);
    Trazar_onclick();
});
}

if(longitud_inicial==null){
    inicio();
}

function Trazar_onclick() {
    if(array_marcadores.length>1){
        let puntos_linea=[array_marcadores[contador],array_marcadores[contador+1]];
        var linea = new google.maps.Polyline({
            path: puntos_linea,
            geodesic: true,
            strokeColor: color.value,
            strokeOpacity: 1.0,
            strokeWeight: grosor.value
           });
           linea.setMap(map);
           contador++;
        }
}

let intervalo = setInterval(cogerPosicion, 5000);

function cogerPosicion(){
    let centro;
    if(permite){
        
    
    navigator.geolocation.getCurrentPosition(pos => {
        latitud = pos.coords.latitude;
        longitud = pos.coords.longitude;
        centro=new google.maps.LatLng(latitud,longitud);
        dibujarMarker(centro);
        array_marcadores.push(centro);
        Trazar_onclick();
    });
    
}
       
}

function dibujarMarker(LatLng){
    map.setCenter(LatLng);
    marker = new google.maps.Marker({
        position: LatLng,
        map: map,
        nombre: 'Pepino'
    });
}

function reiniciar(){
    latitud_inicial = 41.67097948393865;
    longitud_inicial = -3.6769259916763985;
    array_marcadores=new Array();
    contador=0;
    navigator.geolocation.getCurrentPosition(pos => {
        array_marcadores=new Array();
        latitud_inicial = pos.coords.latitude;
        longitud_inicial = pos.coords.longitude;

        inicio();
    });
}