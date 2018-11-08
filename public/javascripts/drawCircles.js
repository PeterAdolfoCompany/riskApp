// DRAW CIRCLES CLASS
class DrawCircles {
  constructor(lat, lng, radio01, radio02, radio03, icon) {
    this.lat = lat;
    this.lng = lng;
    this.radio01 = radio01;
    this.radio02 = radio02;
    this.radio03 = radio03;
    this.icon = icon;
  }

  draw() {
    let latLng = {
      lat: this.lat,
      lng: this.lng
    };
    map.setCenter(latLng);
    map.setTilt(0);
    let marker = new google.maps.Marker({
      position: latLng,
      map: map,
      icon: this.icon,
      draggable: true
    });
    let circle01 = new google.maps.Circle({
      strokeOpacity: 1,
      strokeWeight: 1,
      position: latLng,
      fillColor: "red",
      fillOpacity: .8,
      map: map,
      draggable: true,
      radius: this.radio01
    });

    let circle02 = new google.maps.Circle({
      strokeOpacity: 0.5,
      strokeWeight: 1,
      position: latLng,
      fillColor: "yellow",
      fillOpacity: .5,
      map: map,
      draggable: true,
      radius: this.radio02
    });

    let circle03 = new google.maps.Circle({
      strokeOpacity: 0.5,
      strokeWeight: 1,
      position: latLng,
      fillColor: "green",
      fillOpacity: .5,
      map: map,
      draggable: true,
      radius: this.radio03
    });
    // map.fitBounds(circle03.getBounds());

    // Bind circles
    circle01.bindTo("center", marker, "position");
    circle02.bindTo("center", marker, "position");
    circle03.bindTo("center", marker, "position");
  }
}