// LengthManager.js

define(["jquery", "backbone"],

    function ($, Backbone) {
        var LengthManager = Backbone.Model.extend({

            defaults: {
                // "Tags":[],
                // "Tags1":[],
                // "Tags2":[],
                // "Tags3":[],
                // "Tags4":[],
                // "Tags5":[],
                // "Tags6":[],
                // "IsOwner":false,
                // "NoTag": true,
                // "IsSubscribe":false,
                // "hasSuggestTag":false
            },
            initialize: function () {

            	//NORMAL, AREA, VOLUME, ANGLE, LIM_PRE, LIM_ONGOING

                this.data = "0.0";

            },

            onData: function() {

                this.data = Math.round(10 * Math.random()*1000)/1000;
                console.log('[LengthManager] data in...' + this.data)


                //TODO  output data to screen
            },

            onLaserReady: function() {

                console.log('[LengthManager] laser is ready...')

                //TODO  output state to screen
            },

            onPlus: function() {

            },
            onMinus: function() {

            },
            onPower: function() {

            },
            onHistory: function() {

            }

            

        });

        return LengthManager;
    }

);