//Distance formula to calculate nautical miles
function distance(lat1, lng1, lat2, lng2) {
  let radlat1 = Math.PI * lat1 / 180; //convert lat to radians
  let radlat2 = Math.PI * lat2 / 180; //convert lat to radians
  let theta = lng1 - lng2; // change in lon
  let radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  return (dist * 0.8684);
}

function reset() {
  $('#multi-form').each(function () {
    this.reset();
  });
}

$(function () {
  let $value;
  let path;
  //this will run the distance function to calculate the miles when the submit button is clicked.
  $('form').submit(function (e) {
    e.preventDefault();
    //resetting any old data
    if ($value) $value.detach();
    if (path) path.setMap(null);
    let lat1 = +$('#airport1').data().latitude;
    let lng1 = +$('#airport1').data().longitude;
    let lat2 = +$('#airport2').data().latitude;
    let lng2 = +$('#airport2').data().longitude;
    let $airport1 = $('#airport1').data();
    let $airport2 = $('#airport2').data();
    let airport1 = {
      lat: lat1,
      lng: lng1,
    };
    let airport2 = {
      lat: lat2,
      lng: lng2,
    };
    let miles = Math.round((distance(lat1, lng1, lat2, lng2)) * 100) / 100;
    //draw path polyline
    path = drawPath(airport1, airport2);
    //show response
    $('.response').append(`<div class="miles"><h3>${$airport1.name} to ${$airport2.name} = ${+miles} Nautical Miles </h3></div>`);
    $value = $('.miles');
    //reset the form after submit
    reset();
  });
});

