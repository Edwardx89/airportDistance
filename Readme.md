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

App.js file contains most of the backend codes. We are running on port 3001 of the localhost server and then redirecting all of the routes to `/server/index.js`:

```let port = 3001;
app.listen(port, () => {
  console.log('The server is listening closely on port', port);
});

app.use('/', require('./server/index.js'))
```


