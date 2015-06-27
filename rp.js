var rp = require('request-promise');
var _ = require('lodash');
var Promise = require('bluebird');
var geocode = require('geocoder');

rp("https://seeclickfix.com/api/v2/issues?place_url=hampton&state=VA&per_page=20&page=1")
   .then(function(body) {
		var list = JSON.parse(body).issues;
		var lat = _.pluck(list, 'lat');
		var lng = _.pluck(list, 'lng');
		
		var lat_lng = { //make an object to return to next async func.
			lat: lat,
			lng: lng
		};

		return lat_lng;
   })
   	.then(function(lat_lng) {
   	
   		console.log('these are the lats \n' + lat_lng.lat + '\n and longs \n' + lat_lng.lng);
     
  })
   	.finally(function(){
   		console.log('We are finally done here :D');   		
  })
   	.catch(console.error);

   	
   	var getzips = function(lat, lng) {
   		return new Promise(function(resolve, reject) {
   			geocode.reverseGeocode(lat, lng, function(err, data) {
      			if (err) { reject(err);}			
			 	 var result = (data.results[0].address_components[6].short_name);
		      		console.log('result', result);
		      		resolve(result);
		   				 	});
		   				});
		   			}
   	getzips(40.730885,-73.997383)
   	.then(function(data) {
   		console.log('This is the city son!!!',data);
   	});