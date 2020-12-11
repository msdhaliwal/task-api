const router = require("express").Router();

router.get('/', (req, res)=>{
	res.send('Welcome to API')
})
router.use('/task', require('./task'))

module.exports = router;
