// MXN-Body-Parser - Asynchronous HTTP request body parser
// Copyright (c) 2021 Ilya Zimnovich

// Querystring
const querystring = require("querystring");

// Body processing. Used some ideas from
// - https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
// - https://stackoverflow.com/questions/19539391/how-to-get-data-out-of-a-node-js-http-get-request
function getRequestBody(req) {
    return new Promise(function(resolve, reject) {
        let body = "";

        // If you are not dealing with binary data - use request.setEncoding method
        // which causes the stream emit strings interpreted with the given encoding
        // and handles multi-byte characters properly.
        req.setEncoding("utf8");

        req.on("error", function(error) {
            reject(error);
        });

        req.on("data", function(data) {
            body += data;
            if (body.length > 1e6) { // Flood attack or a faulty client
                req.connection.destroy();
                reject(new Error("Body length is too long"));
            }
        });

        req.on("end", function() {
            // Format output
            let result;
            try {
                const contentType = req.headers["content-type"];
                switch (contentType) {
                    case "application/json":
                        result = JSON.parse(body);
                        break;
                    case "application/x-www-form-urlencoded":
                        result = querystring.parse(body);
                        break;
                    case "text/plain":
                    default:
                        result = body;
                }
            }
            catch(error) {
                reject(error);
            }

            resolve(result);
        });
    });
}

module.exports = getRequestBody;
