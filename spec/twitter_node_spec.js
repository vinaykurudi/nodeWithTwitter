var request = require("request");
var twitterApp = require("../server.js");
var querystring = require('querystring');
var base_url = "http://localhost:3000/"

describe("when Twitter feed application runs", function(){

    describe("GET /",function(){
        it("returns status code 200", function(done) {
            request.get(base_url, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("Should returns twitter data with status Code 200", function(done) {
            let url = base_url+"api/search/tweets";
            request.get(url, function(error, response, body) {
               expect(response.statusCode).toBe(200);
               done();
            });
        });

        it("Should returns twitter data ", function(done) {
            let url = base_url+"api/search/tweets?query=india";
           /* let queryString = querystring.stringify({
                query: '#india'
            });*/
            
            request.get(url, function(error, response, body) {
                expect(response).not.toBe(null);
                expect(response.body).not.toBe(null);
                expect(response.body).toContain("statuses");
                twitterApp.closeServer();
                done();
            });
        });
    });
    
});