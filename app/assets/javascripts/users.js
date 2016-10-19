// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {
  $('.off-canvas-content').on('click', '#add-trip', function(event) {
    event.preventDefault();
      $('#new_trip_form').removeClass('hidden');
      $('#add-trip').addClass('hidden');
  });
});


function initAutocomplete() {
  var autocomplete = new google.maps.places.Autocomplete(
           (document.getElementById('trip_city')),
           {types: ['geocode']});
}
