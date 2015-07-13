// KeypadHandler.js

define(["jquery", "backbone", "modules/simulator/LengthManager","modules/simulator/AreaManager","modules/simulator/VolumeManager","modules/simulator/AngleManager"],

    function($, Backbone, LengthManager, AreaManager, VolumeManager, AngleManager) {
        var StateController = Backbone.Model.extend({
            defaults: {

            },
            initialize: function() {

                //LENGTH, AREA, VOLUME, ANGLE, LIM_PRE, LIM_ONGOING
                this.state = "LENGTH";
                this.laserState = "OFF";

                this.types = ["AREA", "VOLUME", "LENGTH"];
                this.methods = ["ANGLE", "LENGTH"];

                this.managers = {
                    "LENGTH": new LengthManager(),
                    "AREA": new AreaManager(),
                    "VOLUME": new VolumeManager(),
                    "ANGLE": new AngleManager()
                }


            },
            enqueue: function(btnCmd) {

                console.log('Enqueue command: ' + btnCmd);
                console.log('Current state: ' + this.state);

                switch (btnCmd) {
                    case "PLUS":
                        this.funcManager.onPlus();
                        break;
                    case "MINUS":
                        this.funcManager.onMinus();
                        break;
                    case "POWER":
                        this.turnOffLaser();
                        this.funcManager.onPower();
                        break;
                    default:
                        break;
                }
            },
            onStateChange: function(targetState) {
                this.beforeStateChange();
                this.state = targetState;
                this.funcManager = this.managers[this.state];
                this.afterStateChange();
            },
            onMeasure: function() {
                if(!this.funcManager) this.onPowerOn();
                if (this.laserState == "OFF") {
                    this.turnOnLaser();
                } else {
                    this.turnOffLaser();
                    this.funcManager.onData();
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
                this.funcManager.onLaserOff();
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
                this.turnOffLaser();
                displayUtil.updateScreenClass('power-off');
            },
            onPowerOn: function() {
                this.onStateChange("LENGTH");
            },
            beforeStateChange: function() {
                console.log('Current state: ' + this.state);
                if(this.funcManager){
                    this.stopListening(this.funcManager);
                    this.funcManager.onExit();
                }
            },
            afterStateChange: function() {
                this.listenTo(this.funcManager, 'turnOnLaser', this.turnOnLaser);
                this.listenTo(this.funcManager, 'exit', this.exitCurrentState);
                if(this.funcManager){
                    this.funcManager.onEnter();
                }
                console.log('afterStateChange: ' + this.state);
            },
            exitCurrentState: function() {
                this.onStateChange('LENGTH');
            }
        });

        return new StateController();
    }

);