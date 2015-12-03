var request = require('supertest');
    app = require('../app.js');
    assert = require('assert'); 
    

describe('plain ol\' get index', function(){
	it('should render page with external api',function(done){
		request(app)
		.get('/')
		.expect(200,done);
	});
});

describe('page redirect', function(){
	it('should redirect to newport-news/:id',function(done){
		request(app)
		.get('/newport-news')
		.expect(302, done);

	});
});

describe('page redirect', function(){
	it('should redirect to another page', function(done) {
		request(app)
		.get('/hampton/')
		.expect(302,done);
	});
});

describe('render some html',function(){
	it('should render some html ', function(done){
	request(app)
    	.get('/')
    	.end(function(err, result) {
        assert(result.text.indexOf("</html>") > 0);
        done();
    	});
	});
});

