var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('lodash');
var geocode = require('geocoder');
var async = require('async');

router.get('/', function(req, res) {
   var url = "https://seeclickfix.com/api/v2/issues?place_url=hampton&state=VA&per_page=20&page=1";
   request(url, function(err, response, body) {
   	if (err) {
   		console.error(err);
   	}
   	 var list = JSON.parse(body).issues;
  	 var metadata = JSON.parse(body).metadata;
   	 var per_page = metadata.pagination.per_page;
   	 var city = 'hampton';
   	 var pages = list.length;
  	 var lat = _.pluck(list,'lat');
   	 var lng = _.pluck(list, 'lng');
	   var start = 0;
   	 var summary = _.pluck(list, 'summary');
     	 var address = _.pluck(list, 'address');


async.parallel(lat.map(function(_, index) {
  return function(callback) { //return immediately to make array of async tasks. 
    geocode.reverseGeocode(lat[index], lng[index], function(err, data) {
      if (err) {
        return callback(err);
      }

      var result = (data.results[0].address_components[6].short_name);
      console.log('result', result);
      callback(null, result);
    });
  };
}), function(err, results) { //final callback
  if (err) {
    console.log('This is an error');
  }
  var zips = _.union(results);
  console.log('These are the zips ' + zips);

    	
   res.render('index', { title: 'Hampton', list: list, 
      lat:lat, lng:lng, 
      summary:summary, per_page:pages, 
      start:start,pages:pages, city:city, 
      address:address,zips:zips});   
 });

    });
});

router.get('/:city', function(req, res) {
  var city = req.params.city;

  res.redirect('/' + city + '/1');

});

router.get('/:city/:id',function(req,res) {
	var city = req.params.city;
  var id = req.params.id;
  if (city == 'hampton') {
    res.redirect('/');
  }
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
    var address = _.pluck(list, 'address');
    var start = 0;
    var next_page = 2;
    console.log('This is how many pages ', pages);
    if (id <= pages) {
      start = per_page * (id-1);

    }
    if(id < pages) {
      next_page = (Number(id)+1);
    }

    if (city == 'newport-news') {
      title = "newport news";
    } else if (city == 'virginia-beach') { 
      title = "virginia beach";
    } else if(city == 'hampton') {
      title = 'hampton';
    } else {
    title = city;
    }
    res.render('index', { title: title, list: list, lat:lat, lng:lng, summary:summary, per_page:per_page, pages:pages, 
    start:start, city:city, next_page:next_page, address: address });
    });
});

router.post('/',function(req,res){
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
