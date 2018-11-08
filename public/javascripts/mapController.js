var map, infoWindow, pos, id;
var markers = [];

function initMap() {
    map = document.getElementById('map');
    if (typeof (map) !== 'undefined' && map != null) {
        map = new google.maps.Map(map, {
            zoom: 10,
            center: {
                lat: -99.17182,
                lng: 19.3979
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
        });

        infoWindow = new google.maps.InfoWindow;

        actualPosition();
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
    if (modalName === "poolFire") {
        var dotColor = "blue-dot.png";
    } else if (modalName === "fireBall") {
        var dotColor = "red-dot.png"
    } else if (modalName === "tntExplosion") {
        var dotColor = "yellow-dot.png"
    }
    //create mark for user coordinates
    var vMarker = new google.maps.Marker({
        position: new google.maps.LatLng(pos.lat, pos.lng),
        draggable: true,
        icon: "http://maps.google.com/mapfiles/ms/icons/" + dotColor,
        animation: google.maps.Animation.DROP
    });

    // adds a listener to the marker
    // gets the coords when drag event ends
    // then updates the input with the new coords
    if ($("#dragOnOff").prop("checked")) {
        google.maps.event.addListener(vMarker, 'dragend', function (evt) {
            // Set coordinates
            pos = {
                lat: evt.latLng.lat(),
                lng: evt.latLng.lng()
            };
            map.panTo(evt.latLng);
        });
    }

    // centers the map on markers coords
    map.setCenter(vMarker.position);

    // adds the marker on the map
    vMarker.setMap(map);

    id = vMarker.__gm_id;

    markers.push(vMarker);


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
        if (modalName === "poolFire") {
            $('#poolFireEvent').modal('show')
            // Set coordinates to modal
            $("#pfLngPF").val(pos.lng);
            $("#pfLatPF").val(pos.lat);

        }
        if (modalName === "fireBall") {
            $('#fireBallEvent').modal('show')
            $("#latFb").val(pos.lat);
            $("#lngFb").val(pos.lng);
        }
        if (modalName === "tntExplosion") {
            $('#tntExplosionEvent').modal('show')
            $("#latTnt").val(pos.lat);
            $("#lngTnt").val(pos.lng);
        }


    });

    map.addListener("click", function (e) {
        if (menuDisplayed) {
            menuBox.style.display = "none";
        }
    });
}

function actualPosition() {
    if (navigator.geolocation) {
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