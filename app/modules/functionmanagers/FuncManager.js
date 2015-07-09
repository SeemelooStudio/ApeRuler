define(['jquery'], function($) {

    function FunctionManager(options) {
        var tryGetFunction = function(func) {
            if (func) {
                return func;
            } else {
                return function() {};
            }
        };

        var tryGetArray = function(array) {
            if (array&&array.length>0) {
                return array;
            } else {
                return ['defaultState'];
            }
        };

        this.OnClear = tryGetFunction(options.OnClear);
        this.OnData = tryGetFunction(options.OnData);
        this.stateClassList = tryGetArray(options.stateClassList);

        this.currentStateIndex=0;

        this.SetCssClass = function() {
            var classesStr = this.stateClassList.join(' ');
            $('#screen').removeClass(classesStr).addClass(this.getCurrentStateClass());
        };
        this.getCurrentStateClass = function() {
            return this.stateClassList[this.currentStateIndex];
        };
        this.OnProceedToNextState = function(){
            this.currentStateIndex = Math.min(this.currentStateIndex.length-1, this.currentStateIndex+1);
            this.SetCssClass();
        };
        this.OnProceedToPrevState = function() {
            this.currentStateIndex = Math.max(t0, this.currentStateIndex-1);
            this.SetCssClass();
        };
    }

    return FunctionManager;

});