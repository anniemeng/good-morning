function loading_Disp(msg){
    $('.status').addClass('loading');
    $('.status').html("<div class='loadingMsg'>" + msg + "</div>");
}

function findLocation() {
    /*initialize*/
    $('.status').removeClass('loaded','error');
    $('.status').empty();
    loading_Disp('Retrieving weather data...allow geolocation');

    /*Geolocation supported*/
    if (navigator.geolocation) {
        /*timeout before defaulting to IP location detection */
        var geo_timeout = setTimeout(function () {
            loading_Disp('HTML5 Geolocation timeout. Resorting to IP based location');
            resort_IP();
        }, 300000);

        /* get position */
        watchID = navigator.geolocation.watchPosition(function(position) {
            //SUCCESS
            clearTimeout(geo_timeout);
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            get_weather(lat, long);
            findNearby(lat,long);
        },

        //ERROR
        function (error) {
            clearTimeout(geo_timeout);
            switch(error.code) {
              case error.PERMISSION_DENIED:
                  loading_Disp('Denied geolocation request. Attempting IP based location');
                  resort_IP();
                  break;

              case error.POSITION_UNAVAILABLE:
                  loading_Disp('Position detection unavailable. Attempting IP Based location');
                  resort_IP();
                  break;

              case error.TIMEOUT:
                  loading_Disp('Location detection timeout. Attempting IP based location');
                  resort_IP();
                  break;

              default:
                  loading_Disp('Unknown error');
                  resort_IP();
          }
        },

        //OPTIONS
        {enableHighAccuracy: true, maximumAge:600000, timeout:120000});
    }

    /*Geolocation not supported - resort to IP */
    else {
        loading_Disp('HTML5 geolocation unavailable. Resorting to IP based location');
        resort_IP();
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
        var lat = location.latitude;
        var long = location.longitude;
        get_weather(lat, long);
        findNearby(lat, long);
      } else {
        loading_Disp('IP based geolocation Error');
      }
    }
  });
}

findLocation();