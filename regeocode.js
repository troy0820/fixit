/*************************************************/
/* Test bench for certain zipcodes that  don't return
   correctly from the reverse.geocode api
**************************************************/

var geocode = require('geocoder');
var _ = require('lodash');
//list of coords will be better 
//may have to filter response through filter and find 'postal_code'
geocode.reverseGeocode(36.7525391, -75.9796989, function(err, result){
	if (err) { 
		console.error(err);
	}
		var zips = result.results[0].address_components;

		var newzips = _.reduce(zips,function(all,item, index) {
				if(item.types[0] == 'postal_code') {
					all.push(item.short_name);
					}
				return all;
		},[]);
	console.log('all', newzips.toString());
});

// async.parallel(lat.map(function(_, index) {
//   return function(callback) { //return immediately to make array of async tasks. 
//     geocode.reverseGeocode(lat[index], lng[index], function(err, data) {
//       if (err) {
//         return callback(err);
//       }

//       var result = (data.results[0].address_components[6].short_name);
//   //    console.log('result', result);
//       callback(null, result);
//     });
//   };
// }), function(err, results) { //final callback
//   if (err) {
//     console.log('This is an error');
//   }
//   var zips = _.union(results);
//  console.log('These are the zips ' + zips);