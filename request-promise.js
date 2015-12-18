(function(){
  			"use strict";
})();
var request = require("request");
promise = require("bluebird");
_ = require("lodash");
geocode = require("geocoder");
promise.promisifyAll(request);

request.getAsync("https://seeclickfix.com/api/v2/issues?place_url=virginia-beach&state=VA&per_page=10&page=1")
		.spread(function(res,body) { //callback signature is (err, res, body) so we need to use spread instead of then
			var data = JSON.parse(body).issues;
			return data;
		}).then(function(data) {
			var lat = _.pluck(data,"lat");
		    					lng = _.pluck(data,"lng");
		    					lat_lng = {
		    					lat:lat,
		    					lng:lng
		    };
			return lat_lng;
		}).then(function(lat_lng) {
			console.log("these are the lats \n", lat_lng.lat,  "\n these are the longs \n",lat_lng.lng);
		})
		.then(function() { 

//how to promisify geocode 	
			promise.promisifyAll(geocode);

			var getzips = function(lat,lng) {
				return new promise(function(resolve, reject) {
					geocode.reverseGeocodeAsync(lat,lng)
		  .then(function(data) {
		  					var zips = data.results[0].address_components;
		  					var newzips = _.reduce(zips,function(all,item, index) {
			if(item.types[0] == "postal_code") {
				all.push(item.short_name);
			}
			return all;
		},[]);
		  					resolve(newzips);
		  });
				})
		 .catch(function(err) {
		  					console.log(err);
		  });
			};

			promise.all(lat_lng.lat.map(function(_,index) {
				return getzips(lat_lng.lat[index],lat_lng.lng[index]);
			})
		).then(function(data) {
			var zipcodes = _.uniq(_.flatten(data));
			console.log("\n zipcodes:(uniqued):\n",zipcodes.join(' '));
		});
		});




