// FuncManager.js

define(["jquery", "backbone"],

    function ($, Backbone) {
        var FuncManager = Backbone.Model.extend({

            defaults: {

            },
            initialize: function () {
                this.data = "0.0";

            },

            onData: function() {
            },

            onLaserReady: function() {

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
            }

        });

        return FuncManager;
    }

);