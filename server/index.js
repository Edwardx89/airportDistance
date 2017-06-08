const router = require('express').Router();
const axios = require('axios')
const Secrets = require('../secrets.js')

router.get('/', function(req, res, next){
  console.log('hit')
  res.sendFile('index.html', {root: './views'})
})

router.get('/airport', function(req, res, next){
  const allAirportsInUS = `https://iatacodes.org/api/v6/airports?api_key=c1a15798-b182-4008-bfea-6e2cc9b9d543&country=US`
  let airports = ''
  axios.get('https://iatacodes.org/api/v6/airports?api_key=c1a15798-b182-4008-bfea-6e2cc9b9d543&country=US`')
.catch((error) => console.log(error))
})

module.exports = router;
