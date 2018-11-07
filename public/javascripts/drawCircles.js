// DRAW CIRCLES CLASS
class DrawCircles {
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
      // var map = new google.maps.Map(document.getElementById('map'), {
      //     zoom: 20,
      //     center: latLng,
      // });
      // map.setTilt(0); //Al acercarse el mapa no se pone en 45ª
      // var marker = new google.maps.Marker({
      //     position: latLng,
      //     map: map,
      //     draggable: true
      // });
      var circle01 = new google.maps.Circle({
          strokeOpacity: 1,
          strokeWeight: 1,
          position: latLng,
          fillColor: "red",
          fillOpacity: .8,
          map: map,
          draggable: true,
          radius: this.radio01
      })

      var circle02 = new google.maps.Circle({
          strokeOpacity: 0.5,
          strokeWeight: 1,
          position: latLng,
          fillColor: "yellow",
          fillOpacity: .5,
          map: map,
          draggable: true,
          radius: this.radio02
      })

      var circle03 = new google.maps.Circle({
          strokeOpacity: 0.5,
          strokeWeight: 1,
          position: latLng,
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

