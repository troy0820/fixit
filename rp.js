"use strict";

var rp = require('request-promise');
var _ = require('lodash');
var Promise = require('bluebird');
var geocode = require('geocoder');
var zips = [];
var url = "https://seeclickfix.com/api/v2/issues?place_url=hampton&state=VA&per_page=20&page=1";
rp(url)
   .then(function(body) {
		var list = JSON.parse(body).issues;
		var lat = _.pluck(list, 'lat');
		var lng = _.pluck(list, 'lng');
		
		var lat_lng = { //make an object to return to next async func.
			lat: lat,
			lng: lng
		};
		console.log('lats \n' + lat_lng.lat + '\n longs \n' + lat_lng.lng); 

		return lat_lng;
   })
   	.then(function(lat_lng) {
   		var getzips = function(lat, lng) {
   		return new Promise(function(resolve, reject) {
   			geocode.reverseGeocode(lat, lng, function(err, data) {
      			if (err) { reject(err);}			
			 	 var result = data.results[0].address_components[6].short_name;
		      		console.log('result', result);
					zips.push(result);
		      		resolve(result);
		      		resolve(zips);
		      		zips = _.union(zips);
		      		console.log('zip codes',zips);
		   				 	});
		   				});
		   			}

		   	
		   		 lat_lng.lat.map(function(_,index) {      
   					return getzips(lat_lng.lat[index],lat_lng.lng[index])

				});		   	
   	})
   	.finally(function(){
   		console.log('We are finally done here ');   		
   	
  })
   	.catch(console.error);


   		