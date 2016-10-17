// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require react
//= require react_ujs
//= require components
//= require_tree .

$(function(){ $(document).foundation(); });

$(document).ready(function() {
  var location = $("#weather").find('p').text();
  $.simpleWeather({
    woeid: '', //2357536
    location: location,
    unit: 'f',
    success: function(weather) {
      html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul class="heading"><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li class="heading">'+weather.alt.temp+'&deg;C</li></ul>';

      for(var i=0;i<6;i++) {
        html += '<ul class="test"><li class="test">'+weather.forecast[i].day+'</li>';
        html += '<li>'+weather.forecast[i].high+'F</li>';
        html += '<li>'+weather.forecast[i].low+'F</li>';
        html += '<li><img src="'+weather.forecast[i].thumbnail+'"></li></ul>';

      }

      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});
