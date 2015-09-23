(function() {
	'use strict';
})();

var rp = require('request-promise');
    _ = require('lodash');
    Promise = require('bluebird');
    geocode = require('geocoder');
    url = "https://seeclickfix.com/api/v2/issues?place_url=hampton&state=VA&per_page=20&page=1";

rp(url)
   .then(function(body) {
		var list = JSON.parse(body).issues;
		    lat = _.pluck(list, 'lat');
		    lng = _.pluck(list, 'lng');
		
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
      				if (err) { reject(err); }			
			 	 		var result = data.results[0].address_components[6].short_name;
		      	 			resolve(result);
							});
		   				});
		   			};
		   	
		Promise.all(lat_lng.lat.map(function(_,index) {      
   			return getzips(lat_lng.lat[index],lat_lng.lng[index]);
   				})
		   	).then(function(data) {
		   		var zips = _.union(data);
		   		 console.log('These are the zip codes',zips.toString());
		   	});		   	
   		})
   		 .finally(function() {
   			console.log('We are finally done here');   		
   	
  })
   	.catch(console.error);


   		