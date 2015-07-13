// DataContainer.js

define(["jquery", "backbone"],

    function ($, Backbone) {
        var DataContainer = Backbone.Model.extend({
            initialize: function () {

                this.data = 0.0;
                this.history = [null, null, null];
            },
            prepareData: function () {

                if( this.data > 0.0 ) {
 
                    this.history.push(this.data);
                    this.history.shift();

                    this.data = 0.0; 

                }
                console.log("data In: " + this.data);

                console.log("data Count: " + this.getHistoryCount());


            },

            addData: function( dataIn ) {

                if( dataIn > 0.0 ) {

                    this.data = dataIn; 

                }
              

            },
            removeData: function() {

                this.data = this.history.pop();

                this.history.unshift(null);

            },
            clearData: function() {

                this.data = 0.0;
                this.history = [null, null, null];
            },

            rollBackPlusOrMinusResult: function() {

                this.data = this.history[1];

                console.log("roll back" + this.data)
            },

            preparePlusOrMinus: function(dataIn) {

                this.history = [null, this.data, null];

            },

            processPlus: function(dataIn) {

                this.history.pop();
                this.history.push(dataIn);

                this.data = this.history[1] + this.history[2];
            },

            processMinus: function(dataIn) {

                this.history.pop();
                this.history.push(dataIn);

                this.data = this.history[1] - this.history[2];
            },



            getHistoryCount: function() {
                var count = 0;
                for (var i = 0; i < this.history.length; i++) {
                    if (this.history[i]) {
                        count++;
                    }
                }
                return count;
            }


        });

        return DataContainer;
    }

);