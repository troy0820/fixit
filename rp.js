var rp = require('request-promise');
var _ = require('lodash');

rp("https://seeclickfix.com/api/v2/issues?place_url=hampton&state=VA&per_page=20&page=1")
   .then(function(body) {
		var list = JSON.parse(body).issues;
		var lat = _.pluck(list, 'lat');
		var lng = _.pluck(list, 'lng');
		var lat_lng = {
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
   	});