var map, infoWindow, pos, id;
var markers = [];

function initMap() {
    map = document.getElementById('map');
    if (typeof (map) !== 'undefined' && map != null) {
        map = new google.maps.Map(map, {
            zoom: 20,
            center: {
                lat: -34.397,
                lng: 150.644
            },
        });

        infoWindow = new google.maps.InfoWindow;

        actualPosition();
        const drawRadios = new DrawCircles(
            parseFloat($("#latTnt1").val()),
            parseFloat($("#lngTnt1").val()),
            parseFloat($("#radioTnt01").val()),
            parseFloat($("#radioTnt02").val()),
            parseFloat($("#radioTnt03").val())
        );
        drawRadios.draw()
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

//ADD MARKER TO MAP
function addEvent(modalName) {
    // Cambio de color del Pin para diferentes eventos
    if (modalName == "poolFire") {
        var dotColor = "blue-dot.png";
    } else if (modalName == "fireBall") {
        var dotColor = "red-dot.png"
    } else if (modalName == "tntExplosion") {
        var dotColor = "yellow-dot.png"
    }
    // crea un Mark en las coordenadas del ususario
    var vMarker = new google.maps.Marker({
        position: new google.maps.LatLng(pos.lat, pos.lng),
        draggable: true,
        icon: "http://maps.google.com/mapfiles/ms/icons/" + dotColor,
        animation: google.maps.Animation.DROP
    });

    //Agregar html
    // $(".sidebar-menu ul").append("<li>\n" +
    //     "            <a href='#'>\n" +
    //     "              <i class=" + iconEvent + " aria-hidden='true'></i>\n" +
    //     "              <span>" + varName + "</span>\n" +
    //     "            </a>\n" +
    //     "          </li>");

    // adds a listener to the marker
    // gets the coords when drag event ends
    // then updates the input with the new coords
    google.maps.event.addListener(vMarker, 'dragend', function (evt) {
        // $("#txtLat").val(evt.latLng.lat().toFixed(6));
        // $("#txtLng").val(evt.latLng.lng().toFixed(6));
        // Mandamos las coordenadas al partial
        $("#latTnt").val(evt.latLng.lat());
        $("#lngTnt").val(evt.latLng.lng());

        console.log("Coord lat: ", evt.latLng.lat())

        map.panTo(evt.latLng);
    });

    // centers the map on markers coords
    map.setCenter(vMarker.position);

    // adds the marker on the map
    vMarker.setMap(map);

    id = vMarker.__gm_id;

    markers.push(vMarker);
    console.log(markers);
    console.log(id);


    vMarker.addListener("rightclick", function (e) {
        for (prop in e) {
            if (e[prop] instanceof MouseEvent) {
                mouseEvt = e[prop];
                var left = mouseEvt.clientX;
                var top = mouseEvt.clientY;

                menuBox = document.getElementById("menuev");
                menuBox.style.left = left + "px";
                menuBox.style.top = top + "px";
                menuBox.style.display = "block";

                mouseEvt.preventDefault();

                menuDisplayed = true;
            }
        }
    });

    // SHOW MODAL
    vMarker.addListener('dblclick', function (e) {
        if (modalName == "poolFire") {
            $('#poolFireEvent').modal('show')
        }
        if (modalName == "fireBall") {
            $('#fireBallEvent').modal('show')
        }
        if (modalName == "tntExplosion") {
            $('#tntExplosionEvent').modal('show')
        }

    });

    map.addListener("click", function (e) {
        if (menuDisplayed == true) {
            menuBox.style.display = "none";
        }
    });

}

//TRAE LA POSICION ACTUAL LIGADA AL BOTON ACTUAL POSITION
function actualPosition() {

    if (navigator.geolocation) {
        console.log("Soporta geolocalizacion")
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError("No soporta geolocalizacion");
    }

}

// FUNCION QUE BORRA TODOS LOS MARKERS.
function deleteMarker() {
    setMapOnAll(null);
    markers = [];
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}