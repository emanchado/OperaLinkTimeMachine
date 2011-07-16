var sys = require('sys'),
    fs = require("fs"),
    v = require("valentine");
var OAuth = require('./lib/node-oauth').OAuth;

var oa = new OAuth("https://auth.opera.com/service/oauth/request_token",
                   "https://auth.opera.com/service/oauth/access_token",
                   "xQHqX5TehBRdcZK11x1AspwxT3Eu8Ip8",
                   "IQ9JhHo402UBJ3yx6vbDZwA1G0j9FL9K",
                   "1.0",
                   "oob",
                   "HMAC-SHA1");

fs.readFile("access_token.txt", "ascii", function(error, file) {
    if (error) {
        sys.puts("Couldn't read file access_token.txt - " + error);

        oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
            if (error) {
                for (var i in error) {
                    sys.puts(i + ' :' + error[i]);
                }
            }
            else {
                sys.puts('Request token: ' + oauth_token)
                sys.puts('Request token secret: ' + oauth_token_secret)
                sys.puts('requestoken results: ' + sys.inspect(results))
                sys.puts("Requesting access token...")

                sys.print('Visit the following website\n');
                sys.print('https://auth.opera.com/service/oauth/authorize?oauth_token='+oauth_token + '\n');
                sys.print('Enter verifier>');

                stream = process.openStdin();
                stream.setEncoding('ascii');
                listener = stream.addListener('data', function(verifier) {
                    // Chop the final newline
                    verifier = verifier.substr(0, verifier.length - 1);

                    oa.getOAuthAccessToken(oauth_token, oauth_token_secret, verifier, function(error2, oauth_access_token, oauth_access_token_secret, results2) {
                        if (error2) {
                            for (var i in error2) {
                                sys.puts(i + ' :' + error2[i]);
                            }
                        }
                        sys.puts('Access token: ' + oauth_access_token);
                        sys.puts('Access token secret: ' + oauth_access_token_secret);
                        sys.puts('accesstoken results: ' + sys.inspect(results2));
                        sys.puts("Requesting access token...");
                        getSpeedDial(oauth_access_token, oauth_access_token_secret);
                    });
                });
            }
        })
    } else {
        var token, secret;
        var array = file.split(/ /);
        token = array[0];
        secret = array[1];
        if (secret.indexOf("\n") !== -1) {
            secret = secret.substr(0, secret.length - 1);
        }
        sys.puts("token = " + token);
        sys.puts("secret = " + secret);

        getSpeedDial(token, secret);
    }
});


function getSpeedDial(access_token, access_token_secret) {
    var data= "";
    oa.getProtectedResource("https://link.api.opera.com/rest/speeddial/children", "GET", access_token, access_token_secret,  function (error, data, response) {
        sys.puts(data);
        var itemList = JSON.parse(data);
        sys.puts("There are " + itemList.length + " items");

        v.each(itemList, function(i) {
            sys.puts(i.item_type + " - " + i.id);
        });
    });
}
