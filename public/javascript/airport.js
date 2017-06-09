$( document ).ready(function() {
  //autocomplete
  $(function() {
    $( '.autocomplete' ).each(function (x) {
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
                    let label;
                    if (isChild) { // format children labels to show all airports
                        label = '&rdsh;' + airport.iata + ' - ' + airport.name;
                    } else { // format labels
                      console.log('hit else')
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
                  var listAry = [],
                    thisAirport;
                  if (data.status) { // success
                    for (var i = 0, len = data.airports.length; i < len; i++) {
                      thisAirport = data.airports[i];
                      if(thisAirport.country.name === 'United States') listAry.push(itemObj(thisAirport, true));
                      if (thisAirport.children && thisAirport.country.name === 'United States') {
                        for (var j = 0, jLen = thisAirport.children.length; j < jLen; j++) {
                          listAry.push(itemObj(thisAirport.children[j], true));
                        }
                      }
                    }
                    response(listAry);
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
                // Will console log the code of the airport selected
                console.log(ui.item.code);
                let $thisAirport = $(this)
                apcs = new apc('single', {
                  key: '2b19bd2446',
                  secret: 'bc4ed20725a3d97', // Your API Secret Key: use this if you are not connecting from a web server
                  limit: 3
                });
                apcs.request(ui.item.code)

                apcs.onError = function (data) {
                  console.log(data.message);
                };
                apcs.onSuccess = function (data) {
                  //attaching data.airport to the dom
                  $thisAirport.data(data.airport)
                };
            }
        }

        // this is necessary to allow html entities to display properly in the jqueryUI labels
        $(this).autocomplete(dataObj).data("ui-autocomplete")._renderItem = function( ul, item) {
            return $('<li></li>').data('item.autocomplete', item ).html( item.label ).appendTo( ul );
        };
    });
});
});

