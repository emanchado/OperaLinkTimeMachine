var http = require("http");

function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";

        request.setEncoding("utf8");
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
        });
        request.addListener("end", function() {
            route(handle, request, response, postData);
        });
    }

    var port = 8888;
    http.createServer(onRequest).listen(port);
    console.log("Server listening on http://localhost:" + port + "/");
}

exports.start = start;
