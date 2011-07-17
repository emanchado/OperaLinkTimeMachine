var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var parsedUrl = url.parse(request.url);
        var pathname = parsedUrl.pathname;
        if (parsedUrl.query) {
            console.log("Request for " + pathname + "?" + parsedUrl.query);
        } else {
            console.log("Request for " + pathname);
        }

        request.setEncoding("utf8");
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
        });
        request.addListener("end", function() {
            route(handle, pathname, response, postData);
        });
    }

    var port = 8888;
    http.createServer(onRequest).listen(port);
    console.log("Server listening on http://localhost:" + port + "/");
}

exports.start = start;
