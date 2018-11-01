    var map, infoWindow, pos, id;
    var markers = [];

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 20,
            center: {
                lat: -34.397,
                lng: 150.644
            },
            mapTypeId: google.maps.MapTypeId.SATELLITE
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
        // crea un Mark en las coordenadas del ususario
        var vMarker = new google.maps.Marker({
            position: new google.maps.LatLng(pos.lat, pos.lng),
            draggable: true,
            animation: google.maps.Animation.DROP
        });

        //Agregar html
        $(".sidebar-menu ul").append("<li class='sidebar-dropdown'>\n" +
            "            <a href='#'>\n" +
            "              <i class='fa fa-tachometer-alt'></i>\n" +
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
    // initMap()