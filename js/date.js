$(window).ready(function() {
  $("#date").html(moment().format('dddd MMMM Do, YYYY'));
  $("#time").html(moment().format('h:mm:ss A'));


  //update time
  var time = function () {
    $("#time").html(moment().format('h:mm:ss A'));
  };
  setInterval(time, 1000);

  //set width
  var w = $(window).width();
  $("#top").css("width", w);

  $(window).resize(function() {
    var w = $(window).width();
    $("#top").css("width", w);
  });

});