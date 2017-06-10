const router = require('express').Router();

//using this to render the html file.
router.get('/', (req, res, next) => {
  res.sendFile('index.html', {root: './views'})
})


module.exports = router;
