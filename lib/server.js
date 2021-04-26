/*
*Server related task
*
*/
// Dependencies
const http = require("http");
const https = require("https");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require("./config");
const fs = require("fs");
const handlers = require("./handlers");
const helpers = require("./helpers");
var path = require('path');
var util = require('util');
var debug = util.debuglog('server');

// Instantiate the  server module object
var server = {};

// Instantiate the HTTP server
server.httpServer = http.createServer(function(req, res) {
    server.unifiedServer(req, res)   
});

//Instantiate the HTTPS server
server.httpsServerOptions = {
   "key": fs.readFileSync("./https/key.pem"),
   "cert": fs.readFileSync("./https/cert.pem")
};

server.httpsServer = https.createServer(server.httpsServerOptions, function(req, res) {
    server.unifiedServer(req, res)   
});

//All the server logic for both http and https server
server.unifiedServer = function(req, res) {
    // Get the url and parse it
    var parsedUrl = url.parse(req.url, true);

    // Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g,"");

    // Get the Query string as an object
    var queryStringObject = parsedUrl.query;
    //Get the HTTP Method
    var method = req.method.toLowerCase();

    // Get Header
    var headers = req.headers;

    //Get the payload,if any
    var decoder = new StringDecoder('utf-8');
    var buffer = "";
    req.on("data", function(data) {
        buffer += decoder.write(data);
    });

    req.on("end", function(){
        buffer += decoder.end();

   //Chose the handler the req shud go to.If none go to notFound handler
   var chosenHandler = typeof(server.router[trimmedPath]) !== "undefined" ? server.router[trimmedPath] :handlers.notFound;
   
   // if the request is within the public directory,use the public handler instead
   chosenHandler = trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler;  
   //construct the data object to send the data
   var data = {
    "trimmedPath" : trimmedPath,
    "queryStringObject" : queryStringObject,
    "method" : method,
    "headers": headers,
    "payload" : helpers.parseJsonToObject(buffer)
   };

   //Route the request to the handle specified in the router
   chosenHandler(data, function(statusCode,payload,contentType) {
    statusCode = typeof(statusCode) == "number" ? statusCode : 200;

    // Determine the type of response (fallback to JSON)
    contentType = typeof(contentType) == "string" ? contentType : "json";

     // Return response-parts that are content specific
     var payloadString = '';
     if (contentType == 'json') {
       res.setHeader("Content-Type", "application/json");
       payload = typeof(payload) == "object" ? payload : {};
       payloadString = JSON.stringify(payload);
     }
     if (contentType == 'html') {
         res.setHeader("Content-Type", "text/html");
         payloadString = typeof(payload) == 'string' ? payload : '';
     }
     if (contentType == 'favicon') {
        res.setHeader("Content-Type", "image/x-icon");
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
     }
    if (contentType == 'css') {
       res.setHeader("Content-Type", "text/css");
       payloadString = typeof(payload) !== 'undefined' ? payload : '';
    }
   if (contentType == 'jpg') {
       res.setHeader("Content-Type", "image/jpg");
       payloadString = typeof(payload) !== 'undefined' ? payload : '';
    }
    if (contentType == 'plain') {
       res.setHeader("Content-Type", "text/plain");
       payloadString = typeof(payload) !== 'undefined' ? payload : '';
    }


    
     res.writeHead(statusCode);
     res.end(payloadString);

    });
});
}

//Define a request router
server.router = {
    '': handlers.index,
    'api/users': handlers.users,
    'api/tokens': handlers.tokens,
    'api/menu': handlers.menu,
    'api/cart': handlers.cart,
    'api/order': handlers.order,
    'emailUser': handlers.emailUser,
    'menus/all': handlers.menuList,
    'account/edit': handlers.accountEdit,
    'account/create': handlers.accountCreate,
    'account/deleted': handlers.accountDeleted,
    'session/create': handlers.sessionCreate,
    'session/deleted': handlers.sessionDeleted,
    'menus/cart': handlers.carts,
    'favicon/ico': handlers.favicons,
    'public': handlers.public
};

// Init Script
server.init = function() {
    // Start the HTTP server
    server.httpServer.listen(config.httpPort, function() {
       console.log("Server is listening on port " +config.httpPort);
});
    //Start the HTTPS server
    server.httpsServer.listen(config.httpsPort, function() {
        console.log("Server is listening on port " +config.httpsPort);
});
}

module.exports = server;
