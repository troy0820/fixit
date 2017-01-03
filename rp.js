(function() {
	'use strict';
})();

const rp = require('request-promise');
const  _ = require('lodash');
const geocode = require('geocoder');
const url = 'https://seeclickfix.com/api/v2/issues?place_url=portsmouth&state=VA&per_page=20&page=1';

rp(url)
   .then(function(body) {
	const list = JSON.parse(body).issues;
	const lat = _.pluck(list, 'lat');
	const lng = _.pluck(list, 'lng');
	const latLng = { //make an object to return to next async func.
		lat: lat,
		lng: lng
	};
	console.log('lats \n' + latLng.lat + '\n longs \n' + latLng.lng);
	return latLng;
   })
   .then (function(latLng) {
	const getzips = function(lat, lng) {
		return new Promise(function(resolve, reject) {
			geocode.reverseGeocode(lat, lng, function(err, data) {
				if (err) { reject(err); }
				const zips = data.results[0].address_components;
				const newzips = _.reduce(zips,function(all,item) {
					if (item.types[0] == 'postal_code') {
						all.push(item.short_name);
					}
					return all;
				},[]);
				resolve(newzips);
			});
		});
	};
	Promise.all(latLng.lat.map(function(_,index) {
		return getzips(latLng.lat[index],latLng.lng[index]);
	})
		).then(function(data) {
			const zips = _.union(_.flatten(data));
			console.log('These are the zip codes',zips.toString().replace(/\,/g,' '));
		});
	})
 .catch(console.error);
