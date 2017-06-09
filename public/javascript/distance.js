function distance(lat1, lon1, lat2, lon2) {
    let radlat1 = Math.PI * lat1/180 //convert lat to radians
    let radlat2 = Math.PI * lat2/180 //convert lat to radians
    let theta = lon1-lon2 // change in lon
    let radtheta = Math.PI * theta/180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    console.log(dist)
    return (dist * 0.8684)
}

$(function() {
  //this will run the distance function to calculate the miles when the submit button is clicked.
    $('form').submit(function (e) {
      e.preventDefault();
      let lat1 = +$('#airport1').data().latitude
      let lon1 = +$('#airport1').data().longitude
      let lat2 = +$('#airport2').data().latitude
      let lon2 = +$('#airport2').data().longitude
      console.log(distance(lat1, lon1, lat2, lon2))
})
})
