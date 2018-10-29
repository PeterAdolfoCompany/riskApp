    var map, infoWindow, pos;

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

        


    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    //Funcion ADD EVENT QUE ACTIVA DEL BOTON ADD EVENT DEL MENU LATERAL
    function addEvent() {
        // crea un Mark en las coordenadas dadas
        var vMarker = new google.maps.Marker({
            position: new google.maps.LatLng(pos.lat, pos.lng),
            draggable: true
        });

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

        vMarker.addListener("rightclick", function(e) {
            for (prop in e) {
              if (e[prop] instanceof MouseEvent) {
                mouseEvt = e[prop];
                var left = mouseEvt.clientX;
                var top = mouseEvt.clientY;
        
                menuBox = document.getElementById("menu");
                menuBox.style.left = left + "px";
                menuBox.style.top = top + "px";
                menuBox.style.display = "block";
        
                mouseEvt.preventDefault();
        
                menuDisplayed = true;
              }
            }
        
          });
          map.addListener("click", function(e) {
            if (menuDisplayed == true) {
              menuBox.style.display = "none";
            }
          });
    }

    //TRAE LA POSICION ACTUAL LIGADA AL BOTON ACTUAL POSITION
    function actualPosition() {
        // Try HTML5 geolocation ----------------------
        if (navigator.geolocation) {
            console.log("Soporta geolocalizacion")
            navigator.geolocation.getCurrentPosition(function (position) {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                // infoWindow.setPosition(pos);
                // infoWindow.setContent('Location found.');
                // infoWindow.open(map);
                map.setCenter(pos);
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
        // Geolocation Browser end-------------------

    }

    // initMap()