var request = require('supertest');
    app = require('../app.js');


describe('/GET /', function(){
	it('should render page with external api',function(done){
		request(app)
		.get('/')
		.expect(200);
		done();
	});
});