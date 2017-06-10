//This will initiate the google map api.
let map;
 function initMap (airport1, airport2) {
         map = new google.maps.Map(document.getElementById('map'), {
          zoom: 5,
          center: {lat: 37.0902, lng: -95.7129},
        });
 }

//This will draw a path between two airports.
  function drawPath(airport1, airport2) {
    let airport1path = new google.maps.LatLng(airport1.lat, airport1.lng)
    let airport2path = new google.maps.LatLng(airport2.lat, airport2.lng)
    //creating the paths and storing it.
    const paths = new google.maps.Polyline({
      geodesic: true,
      path: [airport1path, airport2path],
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    //creating the bound between two airports
    let bounds = setBound([airport1path, airport2path]);
    //set the paths on the map
    paths.setMap(map);
    //fix the view of the map based on the bounds
    map.fitBounds(bounds)
    return paths;
}

let marks = {}
function makeMarker(location, name) {
  console.log(location)
  let myLatlng = new google.maps.LatLng(+location.latitude, +location.longitude);
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
  marks[name] = marker;
  console.log(marks)


  // To add the marker to the map, call setMap();
  // marker.setMap(map);
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

function setMarker(){
  console.log('marks',marks)
  for(let i in marks) {
  marks[i].setMap(map)
}
}
