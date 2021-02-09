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

app.use("/api", function(req, res, next) {
    // Check if method is "POST"
    if (req.method !== "POST") {
        res.statusCode = 405; // Method not allowed
        res.setHeader("Allow", "POST");
        res.setHeader("Content-Length", 0);
        res.end();
        return;
    }
    
    // Get Request Body
    const body = await getRequestBody(req);
    console.log(body);
    
    // Proceed further with Request body
    ...
});

// Create node.js HTTP server and listen on port
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
