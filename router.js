var fs  = require("fs"),
    url = require("url");

function route(handle, request, response, postData) {
    var parsedUrl = url.parse(request.url);
    var pathname = parsedUrl.pathname;
    if (parsedUrl.query) {
        console.log("Request for " + pathname + "?" + parsedUrl.query);
    } else {
        console.log("Request for " + pathname);
    }

    var found = 0;
    for (var i in handle) {
        if (! pathname.match(i))
            continue;

        if (typeof handle[i] === 'function') {
            found = 1;
            handle[i](request, response, postData);
        } else if (handle[i] === '*static*') {
            found = 1;
            var path = pathname.replace(/\.\./g, '');
            fs.readFile("." + path, "binary", function(error, file) {
                if (error) {
                    response.writeHead(404, {"Content-Type": "text/plain"});
                    response.write("404 Not found for path " + path);
                    response.end();
                } else {
                    response.writeHead(200);
                    response.write(file);
                    response.end();
                }
            });
        }
    }

    if (! found) {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;
