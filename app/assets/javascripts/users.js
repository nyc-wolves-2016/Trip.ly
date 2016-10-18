// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {
  $('.off-canvas-content').on('click', '#add-trip', function(event) {

    event.preventDefault();
    var url = $(this).attr('action');

    $.ajax({
      method: 'GET',
      url: url
    }).done(function(response)
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
      $('.greeting').after(response);
      $('#edit-trip').remove();
      $('.trips-list').remove();
    });
  });
});


//
// $('.container').on('submit', '#new_trip', function(event) {
//
//   event.preventDefault();
//   var url = $(this).attr('action');
//
//   var city = $(event.target).find("input[name='trip[city]']").val();
//   var country = $(event.target).find("input[name='trip[country]']").val();
//   var start_date = $(event.target).find("input[name='trip[start_date]']").val();
//   var end_date = $(event.target).find("input[name='trip[end_date]']").val();
//   var data = {
//     city: city,
//     country: country,
//     start_date: start_date,
//     end_date: end_date
//   }

//   debugger;
//
//   $.ajax({
//     method: 'post',
//     url: url,
//     data: data
//   }).done(function(response){
//     debugger;
//     $('#new-trip').remove();
//     // $('#new-trip').trigger('reset');
//
//
//
//   });
// });
