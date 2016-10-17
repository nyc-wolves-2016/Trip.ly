// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function() {
  $('.container').on('click', '#new-trip', function(event) {
    event.preventDefault();
    var url = $(this).attr('action');

    $.ajax({
      method: 'GET',
      url: url
    }).done(function(response){
      console.log(response)
    });
  });

    // Autocomplete for cities input using geoNames API

    // $(document).on('keyup', "input", function(event) {
    //   event.preventDefault();
    //   debugger;
    //
    // })

    $(document).delegate("#trip_city", 'focus', function(event) {
      $(this).autocomplete({
        source: function( request, response ) {
          $.ajax({
            url: "http://ws.geonames.org/searchJSON",
            dataType: "jsonp",
            data: {
              style: "medium",
              maxRows: 10,
              featureClass: "P",
              continentCode: ["NA","SA","EU"],
              q: request.term,
              username: "demo"
            },
            success: function( data ) {
              if( typeof(data.status) != 'undefined' ){ //An error occured
                var errorObject = data;
                //Now we have access to errorObject.status, errorObject.status.message and so on
                //Let's do something with the error object
                return; //Stop parsing function
              }
              response( $.map( data.geonames, function( item ) {
                return {
                  label: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryCode,
                  // value: item.name +  ", " + item.countryCode,
                  value: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryCode,
                }
              }));
            },
          });
      },
      //Start Search after user types...
      minLength: 2,
      });
    });




});
