/*************************************************/
/* Test bench for certain zipcodes that  don't return
   correctly from the reverse.geocode api
**************************************************/

var geocode = require('geocoder');
var _ = require('lodash');
//list of coords will be better 
geocode.reverseGeocode(36.9440524794697, -76.2692382467653, function(err, result){
	if (err) { 
		console.error(err);
	}
		console.log('result', result.results[0].address_components[6].short_name);
	
})