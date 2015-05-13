var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('lodash');

router.get('/', function(req, res) {
   var url = "https://seeclickfix.com/api/v2/issues?place_url=hampton-city&state=VA&per_page=10&page=1";
   request(url, function(err, response, body) {
   	if(err){
   		console.error(err);
   	}
   	var list = JSON.parse(body).issues;
  	var metadata = JSON.parse(body).metadata;
    var per_page = metadata.pagination.per_page;
    var pages = list.length;
   	var lat = _.pluck(list,'lat');
   	var lng = _.pluck(list, 'lng');
    var start = 0;
    var summary = _.pluck(list, 'summary');
   	res.render('index', { title: 'Hampton', list: list, lat:lat, lng:lng, summary:summary, per_page:pages, start:start,pages:pages});
    });
});

router.get('/:city', function(req, res) {
 var city = req.params.city;
 var url = "https://seeclickfix.com/api/v2/issues?place_url="+ city +"&state=VA&per_page=20&page=1";
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
  
  if (city == 'newport-news') {
    city = "newport news";
  } else if (city == 'virginia-beach') { 
    city = "virginia beach";
  }
  else {
  city = city.split('-');
  city = city[0];
  }
  res.render('index', { title: city, list: list, lat:lat, lng:lng, summary:summary, per_page:per_page });
  });
});

router.get('/:city/:id',function(req,res) {
	var city = req.params.city;
  var id = req.params.id;
  var url = "https://seeclickfix.com/api/v2/issues?place_url="+ city +"&state=VA&per_page=20&page=" + id;
 
   request(url, function(err, response, body) {
    if(err) {
      console.error(err);
    }
    var list = JSON.parse(body).issues;
    var metadata = JSON.parse(body).metadata;
    var per_page = metadata.pagination.per_page;
    var pages = metadata.pagination.pages;
    var lat = _.pluck(list,'lat');
    var lng = _.pluck(list, 'lng');
    var summary = _.pluck(list, 'summary');
    var start = 0;
    
    if (id < pages) {
      start = per_page * (id-1);
    }

    if (city == 'newport-news') {
      city = "newport news";
    } else if (city == 'virginia-beach') { 
      city = "virginia beach";
    }
    else {
    city = city.split('-');
    city = city[0];
    }
    res.render('index', { title: city, list: list, lat:lat, lng:lng, summary:summary, per_page:per_page, pages:pages, start:start });
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
