# Airport to Airport Distance Calculation

Create a web app that calculates the distance (in nautical miles) between two airports. The app should autocomplete the airports and should feature all airports in the U.S. only. Bonus: plot the trip on Google maps. If you are using npm, please do not include your node_modules folder and make sure that all your requirements are in package.json.

# Documentation

## Installation

1. Run `npm install`.
2. Run `npm start` .
3. Go to `localhost:3001` to access the website.

## Technologies
* Javascript
* Node.js
* Express.js
* Air-port-codes API
* Jquery
* Google Map API


## Code Walk-Through

This airport to airport distance calcuation is created with the help of `Air-port-codes API`, `Google Map API` and `JQuery`. The app is using `Express.js` to run the server and `Javascript`, `Html` and `CSS` for everything else.

### Server

`App.js` file contains most of the backend codes. We are running on port 3001 of the localhost server and then redirecting all of the routes to `/server/index.js`:

```
let port = 3001;
app.listen(port, () => {
  console.log('The server is listening closely on port', port);
});

app.use('/', require('./server/index.js'))
```

In the `index.js` file, we are rendering the index.html:

```
router.get('/', (req, res, next) => {
  res.sendFile('index.html', {root: './views'})
})
```

### Javascript

The autocomplete functionality and the ability to search airports is power by `Air-port-codes API`. In order to get this to work, I needed to bring in the `air-port-codes-api-min.js` file from their documentation.

Next I broke up the codes into three files:

`airport.js`: This file contains the API call when performing a search on an airport. Since the API call includes airports all over the world, I modified it to only show results from United States.

```
apca.onSuccess = function (data) {
  var listAry = [],
    thisAirport;
  if (data.status) { // success
    for (var i = 0, len = data.airports.length; i < len; i++) {
      thisAirport = data.airports[i];
      //set this condition to filter only for United States airports
      if (thisAirport.country.name === 'United States') listAry.push(itemObj(thisAirport, true));
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
//error handling
apca.onError = function (data) {
  response();
  console.log(data.message);
};
},
```

The following code will display the autocomplete search results when you are typing (min of 3 letters to activate the autocomplete function).

```
// this is necessary to allow html entities to display properly in the jqueryUI labels
  $(this).autocomplete(dataObj).data('ui-autocomplete')._renderItem = function (ul, item) {
    return $('<li></li>').data('item.autocomplete', item).html(item.label).appendTo(ul);
  };
```

Once you select the specific airport, it will do another API call to retrieve all the information for that airport. This will provide the latitude and longitude that we will need to calculate the distance.

```
select: function (event, ui) {
    //get the information of the selected airport from the API
    let $name = $(this)['0'].name
    let $thisAirport = $(this)
    apcs = new apc('single', {
      key: 'YOUR API KEY',
      secret: 'YOUR SECRET KEY', // Your API Secret Key: use this if you are not connecting from a web server
      limit: 3
    });
    //making the API call with the airport code.
    apcs.request(ui.item.code)

    //error handler
    apcs.onError = function (data) {
      console.log(data.message);
    };
    //if successful run the function.
    apcs.onSuccess = function (data) {
      //attaching data.airport to the dom
      $thisAirport.data(data.airport)
    };
  }
}
  ```

`maps.js`: This file contains the map functionalities using Google Map API. There are three parts to this code.

The first is inializing the map with a default parameter:
```
let map;
function initMap(airport1, airport2) {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: { lat: 37.0902, lng: -95.7129 },
  });
}
```

There is also a function to draw the path between two airports:
```
unction drawPath(airport1, airport2) {
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
```

The third function is to set the bound of the google map so that we can adjust the view of the google map.

```
function setBound(location) {
  let coordinates = location
  let bounds = new google.maps.LatLngBounds();
  for (let i = 0; i < coordinates.length; i++) {
    bounds.extend(coordinates[i]);
  }
  return bounds;
}
```
