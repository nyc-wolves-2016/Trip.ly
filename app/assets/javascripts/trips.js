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
              if( typeof(data.status) != 'undefined' ){ 
                var errorObject = data;
              
                return; 
              }
              response( $.map( data.geonames, function( item ) {
                return {
                  label: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryCode,
                  value: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryCode,
                }
              }));
            },
          });
      },
      minLength: 2,
      });
    });
});
