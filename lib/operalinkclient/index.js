var OAuth = require('../node-oauth').OAuth;

var oa = new OAuth("https://auth.opera.com/service/oauth/request_token",
                   "https://auth.opera.com/service/oauth/access_token",
                   "xQHqX5TehBRdcZK11x1AspwxT3Eu8Ip8",
                   "IQ9JhHo402UBJ3yx6vbDZwA1G0j9FL9K",
                   "1.0",
                   "oob",
                   "HMAC-SHA1");

exports.oauthClient = oa;
