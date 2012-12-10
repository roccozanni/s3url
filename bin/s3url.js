#!/usr/bin/env node

var argv   = require('optimist').argv;
var crypto = require('crypto');
var url    = require('url');

var key     = argv.key || process.env['S3URL_KEY'];
var secret  = argv.secret || process.env['S3URL_SECRET'];
var expires = argv.expires || 30;

if (!key) {
    console.log("Missing --key option or S3URL_KEY environment variable");
    return;
}

if (!secret) {
    console.log("Missing --secret option or S3URL_SECRET environment variable");
    return;
}

var resource = argv['_'][0];

if (!resource) {
    console.log("Missing resource url in the format /<bucket>/<key>");
    return;
}

var date = new Date();
var now = date.getTime();
var expiry = parseInt(now / 1000, 10) + expires;

var string = ('GET\n\n\n' + expiry + '\n' + resource);
var signature = crypto.createHmac('sha1', secret).update(string).digest('base64');

console.log(url.format({
    protocol:   "https",
    host:       "s3-eu-west-1.amazonaws.com",
    pathname:   resource,
    search:     "AWSAccessKeyId=" + encodeURIComponent(key) + "&Expires=" + expiry + "&Signature=" + encodeURIComponent(signature)
}));