var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["^/$"] = requestHandlers.start;
handle["^/start"] = requestHandlers.start;
handle["^/get_request_token"] = requestHandlers.getRequestToken;
handle["^/authorise"] = requestHandlers.authorise;
handle["^/backup/list"] = requestHandlers.backupList;
handle["^/backup/diff"] = requestHandlers.backupDiff;
handle["^/backup/info"] = requestHandlers.backupDiffInfo;
handle["^/static/.+"] = "*static*";
handle["^/favicon.ico"] = "*static*";

server.start(router.route, handle);
