// function distance(lat1, lon1, lat2, lon2) {
//     let radlat1 = Math.PI * lat1/180 //convert lat to radians
//     let radlat2 = Math.PI * lat2/180 //convert lat to radians
//     let theta = lon1-lon2 // change in lon
//     let radtheta = Math.PI * theta/180
//     let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//     dist = Math.acos(dist)
//     dist = dist * 180/Math.PI
//     dist = dist * 60 * 1.1515
//     return (dist * 0.8684)

function distance(markers) {
  //return 0 if only user submits fewer than 2 locations
  if (markers.length < 2) {
    return 0;
  }
  let startPos = markers[0].getPosition();
  let endPos = markers[1].getPosition();
  let dist = google.maps
    .geometry
    .spherical
    .computeDistanceBetween(startPos, endPos);
  let kilometers = dist/1000;
  let nautMiles = kilometers/1.852;
  nautMiles = Number(Math.round(nautMiles +'e2') +'e-2');
  return nautMiles;
}
