var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('lodash');

router.get('/', function(req, res) {
 var url = "https://seeclickfix.com/api/v2/issues?place_url=hampton-city&state=VA";
 request(url, function(err, response, body) {
 	if(err){
 		console.error(err);
 	}
 	var list = JSON.parse(body).issues;
 	var lat = _.pluck(list,'lat');
 	var lng = _.pluck(list, 'lng');
 	var summary = _.pluck(list, 'summary');
 	var address = _.pluck(list, 'address');
 	res.render('index', { title: 'Fix it | Hampton Roads', list: list, lat:lat, lng:lng, summary:summary, status:status, address:address });
});


});

module.exports = router;
