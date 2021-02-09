# mxn-body-parser

Asynchronous HTTP request body parser

## Install

```
$ npm install mxn-body-parser
```

## Usage

Example:

```js
// HTTP server
const http  = require("http");

// MXN Connect Framework and Middleware
const connect = require("mxn-connect");

// Instantiating the App
const app = connect();

// Create node.js http server and listen on port
const options = { };
const server = http.createServer(options, app).listen(3000, function() {
    console.log("MXN Connect server is running on port " + 3000);
});

server.on("error", function(error) {
    console.error("Error event handler called: " + error);
});
```

## License

This module is released under the MIT license.

## Related

- [mxn-connect](https://github.com/ZimNovich/mxn-connect) - High performance middleware framework based on connect
- [mxn-favicons](https://github.com/ZimNovich/mxn-favicons) - Serve site icons (favicon and apple-touch-icon) from any directory
