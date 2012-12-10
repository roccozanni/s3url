S3Url
=============

A small command line tool to generate signed S3 url for the EU WEST 1 region

Install
-------

    npm install s3url

Usage
-------

The usage is very straightforward

    s3tool --expires 30 resource_url

where resource_url is an url in the following form

    /<bucket>/<key>

and "expires" is the number of seconds the url will be available. For example if the bucket is "foo" and the key is "bar/baz", the command will be:

    s3tool --expires 30 /foo/bar/baz

Authentication
-------

You can supply authentication credentials in two ways:

* command line parameters
* environment variables

In the first option, you can pass the parameters --key and --secret to the command line and provide credentials. For example:

    s3tool --key THISISTHEKEY --secret THISISTHESECRET resource_url

In the second options, just export two environment variables containing the key and the secret:

    export S3URL_KEY="THISISTHEKEY"
    export S3URL_SECRET="THISISTHESECRET"
    s3tool --expires 30 resource_url