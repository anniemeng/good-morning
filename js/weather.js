function convert_temp(kelvin) {
  return Math.round(kelvin - 273.15);
}

function geoLocationError(msg){
    $('.status').addClass('error');
    $('.status').html("<div class='errorMsg'>" + msg + "</div>");
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
                 if (errorThrown) {
                   geoLocationError('Sorry, Ajax Error! ' + errorThrown);
                 } else {
                   geoLocationError('Sorry, Unknown Ajax Error!');
                 }
        }

    });

}
