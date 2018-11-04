    var map, infoWindow, pos, id;
    var markers = [];

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 20,
            center: {
                lat: -34.397,
                lng: 150.644
            },
            // mapTypeId: google.maps.MapTypeId.SATELLITE
        });

        infoWindow = new google.maps.InfoWindow;

        actualPosition()

    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    //Funcion ADD EVENT QUE ACTIVA DEL BOTON DEL MODAL
    function addEvent(varName) {
        // Cambio de color del Pin para diferentes eventos
        if($('#poolFireEvent').is(':visible')) {
            var dotColor = "blue-dot.png";
            var iconEvent = "'fa fa-fire'";
        } else if ($('#fireBallEvent').is(':visible')) {
            var dotColor = "red-dot.png"
            var iconEvent = "'fa fa-sun-o'";
        } else if ($('#tntExplosionEvent').is(':visible')) {
            var dotColor = "yellow-dot.png"
            var iconEvent = "'fa fa-stop-circle-o'";
        }
        // crea un Mark en las coordenadas del ususario
        var vMarker = new google.maps.Marker({
            position: new google.maps.LatLng(pos.lat, pos.lng),
            draggable: true,
            icon: "http://maps.google.com/mapfiles/ms/icons/"+dotColor,
            animation: google.maps.Animation.DROP
        });

        //Agregar html
        $(".sidebar-menu ul").append("<li>\n" +
            "            <a href='#'>\n" +
            "              <i class="+iconEvent+" aria-hidden='true'></i>\n" +
            "              <span>"+ varName +"</span>\n" +
            "            </a>\n" +
            "          </li>");

        // adds a listener to the marker
        // gets the coords when drag event ends
        // then updates the input with the new coords
        google.maps.event.addListener(vMarker, 'dragend', function (evt) {
            $("#txtLat").val(evt.latLng.lat().toFixed(6));
            $("#txtLng").val(evt.latLng.lng().toFixed(6));

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
                // Mandamos las coordenadas al partial
                $("#latTnt").val(pos.lat);
                $("#lngTnt").val(pos.lng);
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

    // DRAW CIRCLES CLASS
class drawCircles {
    constructor(lat, lng, radio01, radio02, radio03) {
        this.lat = lat;
        this.lng = lng;
        this.radio01 = radio01;
        this.radio02 = radio02;
        this.radio03 = radio03;
    }

    draw() {
        var latLng = {
            lat: this.lat,
            lng: this.lng
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 20,
            center: latLng,
        });
        map.setTilt(0); //Al acercarse el mapa no se pone en 45ª
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            draggable: true
        });
        var circle01 = new google.maps.Circle({
            strokeOpacity: 1,
            strokeWeight: 1,
            fillColor: "red",
            fillOpacity: .8,
            map: map,
            draggable: true,
            radius: this.radio01
        })
    
        var circle02 = new google.maps.Circle({
            strokeOpacity: 0.5,
            strokeWeight: 1,
            position: myLatLng,
            fillColor: "yellow",
            fillOpacity: .5,
            map: map,
            draggable: true,
            radius: this.radio02
        })

        var circle03 = new google.maps.Circle({
            strokeOpacity: 0.5,
            strokeWeight: 1,
            position: myLatLng,
            fillColor: "green",
            fillOpacity: .5,
            map: map,
            draggable: true,
            radius: this.radio03
        })
    // Bind circles 
        circle01.bindTo("center", marker, "position");
        circle02.bindTo("center", marker, "position");
        circle03.bindTo("center", marker, "position");
    }
}