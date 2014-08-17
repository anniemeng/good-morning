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
            return [lat, long];
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
        get_weather(location.latitude, location.longitude);
        return [location.latitude, location.longitude];
      } else {
        loading_Disp('IP based geolocation Error');
      }
    }
  });
}

function convert_temp(kelvin) {
  return Math.round(kelvin - 273.15);
}

function geoLocationError(msg){
    $('.status').addClass('error');
    $('.status').html("<div class='errorMsg'>" + msg + "</div>");
}

function loading_Disp(msg){
    $('.status').addClass('loading');
    $('.status').html("<div class='loadingMsg'>" + msg + "</div>");
}

/*retrieve weather from openweathermap*/
function get_weather(lat, long) {
    var lat = lat;
    var long = long;

    /*-- open weather map request URL format */
    owm_url="http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&cnt=3&type=accurate&callback=?";

    /*AJAX jsonp request */
    $.ajax({
        url: owm_url,
        dataType: "jsonp",
        timeout: 5000,
        success: function (result) {
            if (result !== ""){
              var city = result.name;
              var country = result.sys.country;
              var condition = result.weather[0].description;
              var current = convert_temp(result.main.temp);
              var high = convert_temp(result.main.temp_max);
              var low = convert_temp(result.main.temp_min);

              $('.location').html(city + ', ' + country);
              $('.condition').html(condition);
              $('.temp').html("Current: " + current + ' &degC'
                               + '<br>' + "High: " + high + ' &degC'
                               + '<br>' + "Low: " + low + ' &degC');

              /*clear watch and overlay*/
              navigator.geolocation.clearWatch(watchID);
              $('.status').empty();

            } else{

                /* if ajax suceeded but the data throws error node
                *    we enter this if we find the error node in the ajax result values
                *    if the weather is not available in your location we will end up here
                */

                if (result.response.error.description){
                        geoLocationError('Sorry Weather not available ' + result.response.error.description);
                    }
                    else if(result.response.error.type){
                        geoLocationError('Sorry Weather not available ' + result.response.error.type);
                    }
                    else
                    {
                        geoLocationError('Sorry Weather not available');
                    }

                }
            },

        /* The Ajax call OOB error */
        error: function (parsedjson, textStatus, errorThrown) {
             if (errorThrown){
                geoLocationError('Sorry, Ajax Error! ' + errorThrown);
                //console.log("parsedJson:" + JSON.stringify(parsedjson));
                console.log("errorStatus:" + textStatus);
                console.log("errorThrown:" + errorThrown);}
            else{
                geoLocationError('Sorry, Unknown Ajax Error!');
            }
        }

    });

}


function startCall() {

}
findLocation();