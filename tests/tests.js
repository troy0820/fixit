var request = require('supertest');
    app = require('../app.js');
    assert = require('assert'); 

describe('/GET /', function(){
	it('should render page with external api',function(done){
		request(app)
		.get('/')
		.expect(200);
		done();
	});
});

describe('/Redirect', function(){
	it('should redirect',function(done){
		request(app)
		.get('/newport-news')
		.expect(302, done)

	});
});


describe('render html',function(){
	it('should render some html ', function(done){
	request(app)
    	.get('/')
    	.end(function(err, result) {
        	assert(result.text.indexOf("</html>") > 0)//statusCode, 200);
        done();
    });
		
	})
})