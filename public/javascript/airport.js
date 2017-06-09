$( document ).ready(function() {
  //autocomplete
  $(function() {
    $( '.autocomplete' ).each(function () {
        let apca = new apc('autocomplete', {
            key : '2b19bd2446',
            secret : 'bc4ed20725a3d97', // Your API Secret Key: use this if you are not connecting from a web server
            limit : 7
        });

        let dataObj = {
            source: function( request, response ) {
                // make the request
                apca.request( request.term );

                // this builds each line of the autocomplete
                itemObj = function (airport, isChild) {
                  console.log('airport', airport)
                  console.log('isChild', isChild)
                    let label;
                    if (isChild) { // format children labels
                        label = '&rdsh;' + airport.iata + ' - ' + airport.name;
                    } else { // format labels
                        label = airport.city;
                        if (airport.state.abbr) {
                            label += ', ' + airport.state.abbr;
                        }
                        label += ', ' + airport.country.name;
                        label += ' (' + airport.iata + ' - ' + airport.name + ')';
                    }
                    return {
                        label: label,
                        value: airport.iata + ' - ' + airport.name,
                        code: airport.iata
                    };
                };

                // this deals with the successful response data
                apca.onSuccess = function (data) {
                  console.log(data)
                if (data.status) {
                   response( $.map( data.airports, function( item ) {
                if (item.country.name === "United States") {
                  return {
                    label: item.name + ' (' + item.iata + ')',
                    value: item.iata,
                    code: item.iata
                  }
                }
              }));
                    } else { // no results
                        response();
                    }
                };
                apca.onError = function (data) {
                    response();
                    console.log(data.message);
                };
            },
            select: function( event, ui ) {
                // do something for click event
                console.log(ui.item.code);
            }
        }

        // this is necessary to allow html entities to display properly in the jqueryUI labels
        $(this).autocomplete(dataObj).data("ui-autocomplete")._renderItem = function( ul, item) {
            return $('<li></li>').data('item.autocomplete', item ).html( item.label ).appendTo( ul );
        };
    });
});
});

