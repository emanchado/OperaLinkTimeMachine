var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/get_request_token"] = requestHandlers.getRequestToken;
handle["/authorise"] = requestHandlers.authorise;

server.start(router.route, handle);
