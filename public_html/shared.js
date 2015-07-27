//For data that must be shared between the application and the server

(function(exports){
    exports.APP_PORT = 8001;

    //For test
    exports.appServerHost = function()
    {
        return 'http://localhost:' + exports.APP_PORT;
    };
})(typeof exports === 'undefined' ? this['shared']={} : exports);