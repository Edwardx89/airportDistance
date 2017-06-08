const allAirportsInUS = `https://iatacodes.org/api/v6/airports.jsonp?api_key=c1a15798-b182-4008-bfea-6e2cc9b9d543&country=US`
let airports = ''

axios.get(allAirportsInUS)
.then( (data) => {
  console.log(data)
  airports = data
});

