var querystring = require("querystring"),
    sys = require("sys"),
    fs = require("fs"),
    v = require("valentine"),
    operalinkclient = require("./lib/operalinkclient");

function start(response, postData) {
    console.log("Checking for an access token");

    fs.readFile("config.json", "ascii", function(error, file) {
        if (error) {
            response.writeHead(302, {"Location": "/get_request_token"});
            response.end();
        } else {
            var conf = JSON.parse(file);
            if (conf.auth !== undefined &&
                    conf.auth.accessToken !== undefined) {
                fs.readdir("repo", function(err, files) {
                    if (err) {
                        response.writeHead(500, {"Content-Type": "text/plain"});
                        response.write("Couldn't read directory 'repo'");
                        response.end();
                    }
                    response.writeHead(200, {"Content-Type": "text/plain"});
                    response.write("Configuration file loaded!\n");
                    response.write("token = " + conf.auth.accessToken + "\n");
                    response.write("secret = " + conf.auth.accessTokenSecret + "\n");
                    response.write("List of available backups:\n");
                    v.each(files, function(i) {
                        response.write("* " + i + "\n");
                    });
                    response.end();
                });
            } else {
                response.writeHead(302, {"Location": "/get_request_token"});
                response.end();
            }
        }
    });
}

function getRequestToken(response, postData) {
    console.log("Request handler 'getRequestToken' was called.");

    operalinkclient.oauthClient.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
        if (error) {
            for (var i in error) {
                sys.puts(i + ' :' + error[i]);
            }
        }
        else {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write("<!DOCTYPE html>\n");
            response.write("<html>\n");
            response.write("<head>\n");
            response.write("<title>Authorise token</title>\n");
            response.write("</head>\n");
            response.write("<body>\n");
            response.write("<p><a target=\"_blank\" href=\"https://auth.opera.com/service/oauth/authorize?oauth_token="+oauth_token+"\">Authorise the token</a> and type the verification code below:</p>\n");
            response.write("<form action=\"/authorise\" method=\"post\">\n");
            response.write("<input type=\"text\" name=\"verifier\" />\n");
            response.write("<input type=\"hidden\" name=\"request_token\" value=\"" + oauth_token + "\" />\n");
            response.write("<input type=\"hidden\" name=\"request_token_secret\" value=\"" + oauth_token_secret + "\" />\n");
            response.write("<input type=\"submit\" value=\"Verify\" />\n");
            response.write("</form>\n");
            response.write("</body>\n");
            response.write("</html>\n");
            response.end();
        }
    });
}

function authorise(response, postData) {
    params = querystring.parse(postData)
    operalinkclient.oauthClient.getOAuthAccessToken(params.request_token, params.request_token_secret, params.verifier, function(error2, oauth_token, oauth_token_secret, results2) {
        if (error2) {
            for (var i in error2) {
                sys.puts(i + ': ' + error2[i]);
            }
        }
        jsonConfig =
            JSON.stringify({'auth': {'accessToken': oauth_token,
                                     'accessTokenSecret': oauth_token_secret}});
        fs.writeFile('config.json', jsonConfig, function (err) {
            if (err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write("Couldn't write configuration file");
                response.end();
            }
            response.writeHead(302, {"Location": "/"});
            response.end();
        });
    });
}

exports.start = start;
exports.getRequestToken = getRequestToken;
exports.authorise = authorise;
