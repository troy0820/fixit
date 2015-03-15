var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
 var url = "https://seeclickfix.com/api/v2/issues?place_url=hampton-city&state=VA";
 request(url, function(err, response, body) {
 	if(err){
 		console.error(err);
 	}
 	var list = JSON.parse(body).issues;
 	res.render('index', { title: 'Fix it | Hampton Roads', list: list });
});

  
});

module.exports = router;
