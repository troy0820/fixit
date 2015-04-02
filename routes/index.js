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
 	res.render('index', { title: 'Fix it | Hampton', list: list, lat:lat, lng:lng, summary:summary });
  });
});

router.post('/',function(req,res){
  //req.body.city = city name from drop down
  var url = "https://seeclickfix.com/api/v2/issues?place_url=hampton-city&state=VA"; //insert city in this link
  request(url, function(err, response, body) {
    if(err){
      console.error(err);
    }
    var list = JSON.parse(body).issues;
    var lat = _.pluck(list,'lat');
    var lng = _.pluck(list, 'lng');
    var summary = _.pluck(list, 'summary');
    res.render('index', { title:'New City', list:list, lat:lat, lng:lng, summary:summary });
  });


});

module.exports = router;
