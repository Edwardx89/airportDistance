const router = require('express').Router();
const axios = require('axios')
const Secrets = require('../secrets.js')

router.get('/', function(req, res, next){
  console.log('hit')
  res.sendFile('index.html', {root: './views'})
})


module.exports = router;
