var fs = require("file-system");
var fetchModule = require("fetch");

module.exports = function (test) {

    if(test === undefined) test = false;

    var handleErrors = function (response) {
        if (!response.ok) {
            if(test) console.log(JSON.stringify(response, null, 2));
        }
        return response;
    }

    var exports = {};

    exports.post = function (uri, json, success, fail) {
        if(test){
            console.log('ABOUT TO SEND REQUEST TO URI:'+ uri + ' || METHOD: POST');
        }
        return fetchModule.fetch(uri, {
            method: "POST",
            body: JSON.stringify(json),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(function (response) {
            handleErrors(response);
            if(fail !== undefined) fail();
        })
        .then(function(response) {
            if(test){
                console.log('GOT A RESPONSE FROM URI:'+ uri + ' || METHOD: POST');
                console.log(response._bodyText);
            }
            response = JSON.parse(response._bodyText);
            success(response);
        });
    }

    return exports;
};
