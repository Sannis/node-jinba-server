/*!
 * Copyright by Oleg Efimov
 * and other node-jinba-server contributors
 *
 * See contributors list in README
 *
 * See license text in LICENSE file
 */

var http = require("http");
var util = require('util');

function sendJinbaRequest(jinbaRequest) {
  var requestData = (jinbaRequest instanceof Array) ? JSON.stringify(jinbaRequest) : jinbaRequest;

  var requestOptions = {
    hostname: '127.0.0.1',
    port: 3000,
    method: 'POST',
    headers: {
      'Content-Type': 'application/jinba',
      'Content-Length': requestData.length
    }
  };

  var request = http.request(requestOptions, function(response) {
    console.log('STATUS: ' + response.statusCode);
    console.log('HEADERS: ' + JSON.stringify(response.headers));

    var responseText = '';

    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      responseText += chunk;
    });
    response.on('end', function () {
      console.log('RESULT: ' + responseText);
      console.log('INSPECT: ' + util.inspect(JSON.parse(responseText), {depth: 10}));

      console.log("");
      console.log("");
    });
  });

  request.write(requestData);
  request.end();
}

var jinba_request_not_array = "{}";
sendJinbaRequest(jinba_request_not_array);

var jinba_request_wrong_request_value = [
  {
    "name": "/",
    "value": -1
  }
];
sendJinbaRequest(jinba_request_wrong_request_value);

var jinba_request_no_required_request_fields = [{}];
sendJinbaRequest(jinba_request_no_required_request_fields);

var jinba_request_good = [
  {
    "name": "/",
    "value": 481,
    "tags": [
      {"name": "app_label", "value": "example"}
    ],
    "measurements": [
      {"name": "script-load", "value": 94},
      {"name": "app_init", "value": 0},
      {"name": "dns", "value": 0},
      {"name": "connect", "value": 0},
      {"name": "wait", "value": 14},
      {"name": "photo_load", "value": 84},
      {"name": "on_load", "value": 471},
      {"name": "response", "value": 5},
      {"name": "dom_loading", "value": 366},
      {"name": "dom_interactive", "value": 1},
      {"name": "dom_loaded", "value": 1},
      {"name": "ttfb", "value": 14},
      {"name": "backend", "value": 19},
      {"name": "dom_ready", "value": 386},
      {"name": "usable", "value": 387}]
  }
];
sendJinbaRequest(jinba_request_good);
