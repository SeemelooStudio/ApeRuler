// KeypadHandler.js

define(["jquery", "backbone", "modules/simulator/LengthManager","modules/simulator/AreaManager","modules/simulator/VolumnManager","modules/simulator/AngleManager"],

    function($, Backbone, LengthManager, AreaManager, VolumnManager, AngleManager) {
        var StateController = Backbone.Model.extend({
            defaults: {

            },
            initialize: function() {

                //LENGTH, AREA, VOLUME, ANGLE, LIM_PRE, LIM_ONGOING
                this.state = "LENGTH";
                this.laserState = "OFF";

                this.types = ["AREA", "VOLUMN", "LENGTH"];
                this.methods = ["ANGLE", "LENGTH"];


                this.funcManager = new LengthManager();

            },
            enqueue: function(btnCmd) {

                console.log('Enqueue command: ' + btnCmd);
                console.log('Current state: ' + this.state);

                switch (btnCmd) {
                    case "PLUS":
                        this.funcManager.onPlus();
                        this.turnOnLaser();
                        break;
                    case "MINUS":
                        this.funcManager.onMinus();
                        this.turnOnLaser();
                        break;
                    case "POWER":
                        this.funcManager.onPower();
                        break;
                    default:
                        break;
                }
            },
            onStateChange: function(targetState) {

                this.state = targetState;

                switch (targetState) {
                    case "VOLUMN":
                        this.funcManager = new VolumnManager();
                        this.turnOnLaser();
                        break;
                    case "AREA":
                        this.funcManager = new AreaManager();
                        this.turnOnLaser();
                        break;
                    case "ANGLE":
                        this.funcManager = new AngleManager();
                        this.turnOnLaser();
                        break;
                    case "LIM_PRE":
                        //TODO 
                        break;
                    case "LIM_ONGOING":
                        //TODO 
                        break;
                    case "LENGTH":
                        this.funcManager = new LengthManager();
                        break;
                }

                console.log('OnStateChange: ' + targetState);
                console.log('Current state: ' + this.state);

            },
            onMeasure: function() {

                if (this.laserState == "OFF") {
                    this.turnOnLaser();
                } else {

                    this.funcManager.onData();
                    this.turnOffLaser();
                }

            },
            // turn on Laser
            turnOnLaser: function() {
                displayUtil.turnOnLaser();
                this.laserState = "ON";
                this.funcManager.onLaserReady();
            },
            turnOffLaser: function() {
                displayUtil.turnOffLaser();
                this.laserState = "OFF";
            },
            onTypeChange: function() {
                var targetState = util.findNextItem(this.state, this.types);
                this.onStateChange(targetState);
            },
            onMethodChange: function() {
                var targetState = util.findNextItem(this.state, this.methods);
                this.onStateChange(targetState);
            },
            onChangeBase: function() {
                displayUtil.changeBase();
            },
            onPowerOff: function() {
                displayUtil.updateScreenClass('power-off');
            }


        });

        return new StateController();
    }

);