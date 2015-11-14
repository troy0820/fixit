/*************************************************/
/* Test bench for certain zipcodes that  don't return
   correctly from the reverse.geocode api
**************************************************/

var geocode = require('geocoder');
var _ = require('lodash');
//list of coords will be better 
geocode.reverseGeocode(36.8361511244855, -76.2994304496789, function(err, result){
	if (err) { 
		console.error(err);
	}
		console.log('result', result.results[0].address_components);
	
})