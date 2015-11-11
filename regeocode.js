/*************************************************/
/* Test bench for certain zipcodes that  don't return
   correctly from the reverse.geocode api
**************************************************/

var geocode = require('geocoder');
var _ = require('lodash');
//list of coords will be better 
geocode.reverseGeocode(36.8923638688899, -76.3887108205164, function(err, result){
	if (err) { 
		console.error(err);
	}
		console.log('result', result.results[0].address_components[5].long_name);
	
})