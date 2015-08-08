var request = require('request');
	promise = require('bluebird');


promise.promisifyAll(request);

request.getAsync("https://seeclickfix.com/api/v2/issues?place_url=hampton&state=VA&per_page=20&page=1")
		.spread(function(res,body) { //callback signature is (err, res, body) so we need to use spread instead of then
			var data = JSON.parse(body).metadata;
			return data;
		}).then(function(data) {
			console.log('\n I got the data to this point \n',data);
		});



