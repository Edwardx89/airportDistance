//This will initiate the google map api.
let map;
 function initMap (airport1, airport2) {
         map = new google.maps.Map(document.getElementById('map'), {
          zoom: 5,
          center: {lat: 37.0902, lng: -95.7129},
        });
 }

  function drawPath(airport1, airport2) {
    const paths = new google.maps.Polyline({
      geodesic: true,
      path: [new google.maps.LatLng(airport1.lat, airport1.lng), new google.maps.LatLng(airport2.lat, airport2.lng)],
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    let bounds = setBound([new google.maps.LatLng(airport1.lat, airport1.lng), new google.maps.LatLng(airport2.lat, airport2.lng)])
    paths.setMap(map);
    map.fitBounds(bounds)
    // path.push(event.)
    return paths;
}

function makeMarker(location) {
  console.log(location)
  let myLatlng = new google.maps.LatLng(+location.lat, +location.lng);
  let mapOptions = {
    zoom: 4,
    center: myLatlng
  }
  let map = new google.maps.Map(document.getElementById("map"), mapOptions);

  let marker = new google.maps.Marker({
    position: myLatlng,
    title: location.name,
    animation: google.maps.Animation.DROP,
  });

  // To add the marker to the map, call setMap();
  marker.setMap(map);
}

function setBound(location) {
  console.log(location)
  let coordinates = location
  let bounds = new google.maps.LatLngBounds();
  for (let i = 0; i < coordinates.length; i++) {
    bounds.extend(coordinates[i]);
  }
  return bounds;
}
