var server = require('webserver').create(),
	system = require('system'),
	fs     = require('fs'),
	port   = system.env.PORT || 8888;

var service = server.listen(port, function(request, response) {

	if(request.method == 'POST' && request.post.url){
		var url = request.post.url;

		request_page(url, function(properties){
			response.statusCode = 200;
			response.setHeader('Content-Type', 'text/html; charset=utf-8');
			response.write(properties)
			response.close();
		})

	} else {
		response.statusCode = 200;
		response.setHeader('Content-Type', 'text/html; charset=utf-8');
		response.write(fs.read('index.html'));
		response.close();
	}

});

if(service) console.log("server started - http://localhost:" + server.port);

function request_page(url, callback){

	var page = new WebPage();
	page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36';
	page.settings.resourceTimeout=10000

	page.onLoadStarted = function () {
		console.log('loading:' + url);
	};

	page.onLoadFinished = function (status) {
		console.log('loaded:' + url);

		setTimeout(function(){
			callback(page.content);
			page.close();
		},100)		
	};

	page.open(url);
}
