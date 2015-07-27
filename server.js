var http = require('http');
var util = require('util');
var shared = require('./public_html/shared.js');

console.log("WebMuse server.js is starting.");

//For test.
const validOrigin = "http://localhost:8000";

var server;

function handleRequest(request, response)
{
	if(requestHandlers[request.url])
	{
		console.log("Request for " + request.url);
		requestHandlers[request.url](request, response);
	}
	else
	{
		console.log("No request handler for " + request.url);
		response.statusCode = 404;
		response.write("INVALID");
		response.end();
	}
}

//attaches function to request on data to buffer data chunks, and then
//calls the given callback when the data has been received
function setDataListener(request, onData)
{
	var buffer = '';
	
	request.on('data', function(chunk){
		buffer += chunk;
	})
	
	request.on('end', function(){
		onData(buffer);
	});
}

//Map each URL to the appropriate request handler

var requestHandlers = {};
requestHandlers['/login'] = function(request, response)
{
	setDataListener(request, function(body){
		try{
			var data = JSON.parse(body);
			console.log(util.format("Login request for user %s, password %s.", data.user, data.pass));
			response.writeHead(200, {
				'Content-Type': 'text/plain',
				'Access-Control-Allow-Origin' : validOrigin
			});
			response.statusCode = 200;
			response.write(data.user[0] === 'a' ? "LOGIN OK" : "LOGIN FAIL");
			response.end();
		}catch(e){
			console.log("Invalid JSON for login: " + request.body); 
			response.statusCode = 400;
			response.write("MALFORMED REQUEST");
			response.end();
		}
	});
}

server = http.createServer(handleRequest);

server.listen(shared.APP_PORT, function(){

});