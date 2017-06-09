const router = require('express').Router();
const axios = require('axios')
const Secrets = require('../secrets.js')

router.get('/', function(req, res, next){
  console.log('hit')
  res.sendFile('index.html', {root: './views'})
})

// router.post('/airports', function(req, res, next){
//   const allAirportsInUS = `https://www.air-port-codes.com/api/v1/autocomplete`
//   let term = req.body.term
//   console.log('THIS IS A body', req)
//   ajax({
//           url: "https://www.air-port-codes.com/api/v1/multi",
//           jsonp: "callback",
//           dataType: "jsonp",
//           data: {
//             term: request.term,
//             limit: 7,
//             size: 3,
//             key: "f4b7fbcc1f",
//             secret: '0c58995989872e8' // necessary for local use
// },
// })
//   .then((data) => {
//     console.log(data)
//   })
// .catch((error) => console.log(error))
// })

module.exports = router;
