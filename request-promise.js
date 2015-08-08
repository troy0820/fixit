var request = require('request');
	promise = require('bluebird');
	_ = require('lodash');

promise.promisifyAll(request);

request.getAsync("https://seeclickfix.com/api/v2/issues?place_url=hampton&state=VA&per_page=20&page=1")
		.spread(function(res,body) { //callback signature is (err, res, body) so we need to use spread instead of then
			var data = JSON.parse(body).issues;
			return data;
		}).then(function(data) {
			console.log('\n I got the data to this point \n',data);
			var lat = _.pluck(data,'lat');
			return lat;
		}).then(function(lat) {
			console.log('these are the lats', lat);
		});



