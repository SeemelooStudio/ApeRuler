// KeypadHandler.js

define(["jquery", "backbone", "models/LengthManager"],

    function ($, Backbone, LengthManager) {
        var KeypadHandler = Backbone.Model.extend({

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

            	//LENGTH, AREA, VOLUME, ANGLE, LIM_PRE, LIM_ONGOING

                this.state = "LENGTH";
                this.laserState = "OFF";

                this.funcManager = new LengthManager();

            },
            enqueue: function( btnCmd ) {
            	
            	console.log('Enqueue command: ' + btnCmd)
            	console.log('Current state: ' + this.state)
            },
            onStateChange: function (targetState) {

            	switch(targetState) {

            		case "LENGTH": 
            		default:
            		this.funcManager = new LengthManager(); 
            		break;

            		case "AREA":
            		//TODO 
            		break;
            		case "VOLUME":
            		//TODO 
            		break;
            		case "AREA":
            		//TODO 
            		break;
            		case "ANGLE":
            		//TODO 
            		break;
            		case "LIM_PRE":
            		//TODO 
            		break;
            		case "LIM_ONGOING":
            		//TODO 
            		break;
            	}

            },
            onMeasure: function() {

            	if(this.laserState == "OFF") {

            		this.laserState = "ON"

            		this.funcManager.onLaserReady();
            	}
            	else {

            		this.funcManager.onData();


            		this.laserState = "OFF";
            	}

            },

            // turn on Laser
            turnOnLaser: function() {

            	this.laserState = "ON"
            }

            

        });

        return KeypadHandler;
    }

);