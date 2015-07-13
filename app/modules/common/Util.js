define(function(require, exports, module) {

    exports.getUrlParamMap = function() {
        if (!location.search) return {};
        var params = {};
        var fragments = location.search.substr(1).split('&');
        for (var i = 0; i < fragments.length; i++) {
            var pairs = fragments[i].split('=');
            params[pairs[0]] = pairs[1];
        }
        return params;

    };

    exports.toJSONString = function(jsonObj) {
        try {
            return JSON.stringify(jsonObj);
        } catch (e) {
            console.log(e.message);
            console.log(e.description);
            return null;
        }
    };

    exports.parseJSON = function(jsonStr) {
        try {
            return JSON.parse(jsonStr);
        } catch (e) {
            console.log("[JSON]:" + e.message);
            console.log("[JSON]:" + e.description);
            return null;
        }
    };

    exports.navigationTo = function(url) {
        var timeout = setTimeout(function() {
            window.location.href = url;
        }, 0);
    };


    exports.supportLocalStorage = function() {
        var mod = 'modernizr';
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    };

    exports.clearLocalStorage = function() {
        if (util.supportLocalStorage()) localStorage.clear();
    };

    exports.findNextItem = function(currentItem, list) {
        var result = list[0];
        for( var i = 0; i < list.length - 1; i++ ) {
            if ( list[i] == currentItem ) {
                result = list[i+1];
            }
        }

        return result;
    };


});