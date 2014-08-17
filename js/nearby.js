function findNearby() {
  var locObj = findLocation();
  console.log(locObj);
  var lat = locObj[0];
  var long = locObj[1];
  var loc = lat + "," + long;

  var htmlNearby = "";
  /*var nearbyURL= "https://maps.googleapis.com/maps/api/place/textsearch/json?location="+loc+"
  &radius=20000&query=coffee&key=AIzaSyBaAXNCfhGjkv1QSJIl9veY2-l8WN2uPaA";

  $.ajax({
    url:nearbyURL,
    dataType:json,
    success: function(x) {
      $.each(x.results) {
        htmlNearby += '<p class="name">' + this.name + '<p>' + '<p class="address">'
                        + formatted_address + '<p>';
      }

      $("#resultsLoc").html(htmlNearby);
    }
  });*/
}
findNearby();
