var server = require('webserver').create(),
	system = require('system'),
	fs = require('fs'),
	port = system.env.PORT || 23156;

var service = server.listen(port, function(request, response) {

	if (request.method == 'POST' && request.post.url) {
		var url = request.post.url;
		var formdata = request.post.formdata;
		
		if (formdata != undefined) {
			post_page(url, formdata, function(properties) {
				response.statusCode = 200;
				response.setHeader('Content-Type', 'text/html; charset=utf-8');
				response.write(properties)
				response.close();
			})
		} else {
			request_page(url, function(properties) {
				response.statusCode = 200;
				response.setHeader('Content-Type', 'text/html; charset=utf-8');
				response.write(properties)
				response.close();
			})
		}

	} else {
		response.statusCode = 200;
		response.setHeader('Content-Type', 'text/html; charset=utf-8');
		response.write(fs.read('index.html'));
		response.close();
	}

});

if (service) console.log("server started - http://localhost:" + server.port);

function request_page(url, callback) {

	var page = new WebPage();
	page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36';
	page.settings.resourceTimeout = 10000

	page.onLoadStarted = function() {
		console.log('loading:' + url);
	};

	page.onLoadFinished = function(status) {
		console.log('loaded:' + url);

		setTimeout(function() {
			callback(page.content);
			page.close();
		}, 2000) //时间太短的话会出现渲染不出来的情况
	};

	page.open(url);
}

function post_page(url, fdata, callback) {
	console.log("post page")
	var page = new WebPage();
	page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36';
	page.settings.resourceTimeout = 10000

	page.onLoadStarted = function() {
		console.log('loading:' + url);
	};

	page.onLoadFinished = function(status) {
		console.log('loaded:' + url);

		setTimeout(function() {
			callback(page.content);
			page.close();
		}, 2000) //时间太短的话会出现渲染不出来的情况
	};

	// page.open(url, 'post', data);
	page.open(url,'post',fdata)
}
