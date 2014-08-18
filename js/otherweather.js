var pos;
function findLocation() {
    /*Geolocation supported*/
    if (navigator.geolocation) {
        /*timeout before defaulting to IP location detection */
        var geo_timeout = setTimeout(function () {
            loading_Disp('HTML5 Geolocation timeout. Resorting to IP based location');
            pos = resort_IP();
        }, 300000);

        /* get position */
        watchID = navigator.geolocation.watchPosition(function(position) {
            clearTimeout(geo_timeout);
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            pos = [latitude, longitude];
        },

        //ERROR
        function (error) {
            clearTimeout(geo_timeout);
            switch(error.code) {
              case error.PERMISSION_DENIED:
                  loading_Disp('Denied geolocation request. Attempting IP based location');
                  pos = resort_IP();
                  break;

              case error.POSITION_UNAVAILABLE:
                  loading_Disp('Position detection unavailable. Attempting IP Based location');
                  pos = resort_IP();
                  break;

              case error.TIMEOUT:
                  loading_Disp('Location detection timeout. Attempting IP based location');
                  pos = resort_IP();
                  break;

              default:
                  loading_Disp('Unknown error');
                  pos = resort_IP();
          }
        },

        //OPTIONS
        {enableHighAccuracy: true, maximumAge:600000, timeout:120000});
    }

    /*Geolocation not supported - resort to IP */
    else {
        loading_Disp('HTML5 geolocation unavailable. Resorting to IP based location');
        pos = resort_IP();
    }
}

/*IP location */
function resort_IP() {
  $.ajax({
    url: '//freegeoip.net/json/',
    type: 'POST',
    dataType: 'jsonp',
    success: function(location) {
      if (location.latitude != "undefined" && location.longitude != "undefined") {
        return [location.latitude, location.longitude];
      } else {
        loading_Disp('IP based geolocation Error');
        return "";
      }
    }
  });
}


findLocation();