/*************************************************/
/* Test bench for certain zipcodes that  don't return
   correctly from the reverse.geocode api
**************************************************/

'use strict';

const geocode = require('geocoder');
const _ = require('lodash');

geocode.reverseGeocode(36.7525391, -75.9796989,(err, result) => {
	if (err) { console.error(err)}
		let zips = result.results[0].address_components;
		let newzips = _.reduce(zips, (all,item,index) => {
			if (item.types[0] == 'postal_code') {
				all.push(item.short_name);
			}
			return all;
		},[]);
		console.log('zips',newzips);
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