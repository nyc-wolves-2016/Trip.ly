// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {
  $('.container').on('click', '#add-trip', function(event) {

    event.preventDefault();
    var url = $(this).attr('action');

    $.ajax({
      method: 'GET',
      url: url
    }).done(function(response){
      $('.greeting').after(response);
      $('#add-trip').remove();
    });
  });

  $('.container').on('click', '#edit-trip', function(event) {
    event.preventDefault();
    var url = $(this).attr('action');

    $.ajax({
      method: 'GET',
      url: url
    }).done(function(response){
      debugger;

      $('.greeting').after(response);
      $('#edit-trip').remove();
    });
  });
});
