/*************************************************/
/* Test bench for certain zipcodes that  don't return
   correctly from the reverse.geocode api
**************************************************/

var geocode = require('geocoder');
var _ = require('lodash');
//list of coords will be better 
//may have to filter response through filter and find 'postal_code'
geocode.reverseGeocode(36.821169, -76.3939686, function(err, result){
	if (err) { 
		console.error(err);
	}
		var zips = result.results[0].address_components;

		var newzips = _.reduce(zips,function(all,item, index) {
				if(item.types[0] == 'postal_code') {
					all.push(item.short_name);
					}
				return all;
		},[])
	console.log('all', newzips.toString());
})