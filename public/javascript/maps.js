//This will initiate the google map api.
function initMap() {
  let location = {lat:40.7438246, lng: -73.9871985}
   let map = new google.maps.Map(document.getElementById('map'), {
          center: location,
          zoom: 17,
          mapTypeID: google.maps.MapTypeId.ROADMAP,
})
let marker = new google.maps.Marker({
  position: location,
  map: map
});
}
