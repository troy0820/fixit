var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('lodash');

router.get('/', function(req, res) {
 var url = "https://seeclickfix.com/api/v2/issues?place_url=virginia-beach&state=VA&per_page=10&page=1";
 request(url, function(err, response, body) {
 	if(err){
 		console.error(err);
 	}
 	var list = JSON.parse(body).issues;
	var metadata = JSON.parse(body).metadata;
  var per_page = metadata.pagination.per_page;
 	var lat = _.pluck(list,'lat');
 	var lng = _.pluck(list, 'lng');
 	var summary = _.pluck(list, 'summary');
 	res.render('index', { title: 'Fix it | Hampton', list: list, lat:lat, lng:lng, summary:summary, per_page:per_page });
  });
});

router.post('/',function(req,res){
  //req.body.city = city name from drop down
  var city = req.body.city;
  var url = "https://seeclickfix.com/api/v2/issues?place_url=" + city + "&state=VA"; //insert city in this link
  request(url, function(err, response, body) {
    if(err){
      console.error(err);
    }
    var list = JSON.parse(body).issues;
    var lat = _.pluck(list,'lat');
    var lng = _.pluck(list, 'lng');
    var summary = _.pluck(list, 'summary');
    res.render('index', { title: city, list:list, lat:lat, lng:lng, summary:summary });
  });


});

module.exports = router;
