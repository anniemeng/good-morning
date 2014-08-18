var map;
var infowindow;

function findNearby(lat, long) {
  var loc = new google.maps.LatLng(lat,long);

  map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: loc,
      zoom: 15
    });

  var request = {
    location: loc,
    radius: 20000,
    query: 'coffee'
  };

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var htmlNearby ="";
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
        htmlNearby += '<p class="name">' + results[i].name + '<p>' + '<p class="address">'
                        + results[i].formatted_address + '<p>';

    }
    $("#resultsLoc").html(htmlNearby);
  }
}


function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}


