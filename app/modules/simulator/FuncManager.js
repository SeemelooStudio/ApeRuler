// FuncManager.js

define(["jquery", "backbone"],

    function ($, Backbone) {
        var FuncManager = Backbone.Model.extend({
            initialize: function () {
                this.data = "0.0";
                this.laserState = "OFF";
            },
            onData: function() {
            },

            onLaserReady: function() {
                this.laserState = "OFF";
            },
            onPlus: function() {

            },
            onMinus: function() {

            },
            onPower: function() {

            },
            onHistory: function() {

            },
            onEnter: function() {

            },
            onExit: function() {

            },
            onLaserOff:function() {
                this.laserState = "OFF";
            }

        });

        return FuncManager;
    }

);