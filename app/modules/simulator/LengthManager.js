// LengthManager.js

define(["jquery", "modules/simulator/FuncManager", "modules/simulator/DataContainer"],

    function($, FuncManager, DataContainer) {
        var LengthManager = FuncManager.extend({
            initialize: function() {
                this.tmpData = 0.0;
                // this.history = [null, null, null];
                this.state = 'NORMAL';
                this.laserState = "OFF";
                this.dataContainer = new DataContainer();
            },
            onEnter: function() {
                this.onStateChange('NORMAL');
            },
            onData: function() {
                this.tmpData = Math.round(10 * Math.random() * 1000) / 1000;
                console.log('[LengthManager] data in...' + this.tmpData);
                switch (this.state) {
                    case "PLUS":
                        this.onStateChange('PLUSRESULT');
                        break;
                    case "MINUS":
                        this.onStateChange('MINUSRESULT');
                        break;
                    case "NORMAL":
                        this.onStateChange('NORMALRESULT');
                        break;
                    default:
                        break;
                }
            },

            onLaserReady: function() {
                console.log('[LengthManager] laser is ready...');
                this.laserState = "ON";

                //TODO  output state to screen
                switch (this.state) {
                    case "NORMALRESULT":
                    case "PLUSRESULT":
                    case "MINUSRESULT":
                        this.onStateChange('NORMAL');
                        break;
                    default:
                        break;
                }
            },

            onPlus: function() {
                this.onStateChange('PLUS');
                this.trigger('turnOnLaser');
            },
            onMinus: function() {
                this.onStateChange('MINUS');
                this.trigger('turnOnLaser');
            },
            onPower: function() {
                var historyCount = 0;
                if (this.laserState === 'ON') {
                    this.trigger('turnOffLaser');

                } else {
                    switch (this.state) {
                        case "PLUS":
                        case "MINUS":
                            // this.history = [null, null, null];
                            // this.data = 0.0;
                            this.dataContainer.clearData();
                            this.onStateChange('NORMAL');
                            break;
                        case "PLUSRESULT":
                            // this.data = this.history[0];

                            this.dataContainer.rollBackPlusOrMinusResult();
                            this.onStateChange('PLUS');
                            break;
                        case "MINUSRESULT":
                            // this.data = this.history[0];
                            this.dataContainer.rollBackPlusOrMinusResult();
                            this.onStateChange('MINUS');
                            break;
                        case "NORMAL":
                            // this.data = this.history.pop();
                            // this.history.unshift(null);
                            this.dataContainer.removeData();
                            // this.onStateChange('NORMAL');
                            // this.onStateChange('NORMALRESULT');

                        var historyCount = this.dataContainer.getHistoryCount();


                        if (historyCount === 0) displayUtil.updateScreenClass('length-state-1');
                        if (historyCount === 1) displayUtil.updateScreenClass('length-state-2');
                        if (historyCount === 2) displayUtil.updateScreenClass('length-state-3');
                        if (historyCount === 3) displayUtil.updateScreenClass('length-state-4');
                        this.updateLengthHistory(this.dataContainer.history);
                        displayUtil.updateLine4(this.dataContainer.data);

                            break;
                        case "NORMALRESULT":
                            // this.data = this.history.pop();
                            // this.history.unshift(null);
                            // this.data = this.history.pop();
                            // this.history.unshift(null);
                            this.dataContainer.removeData();
                            // this.onStateChange('NORMAL');
                            // this.onStateChange('NORMALRESULT');

                        var historyCount = this.dataContainer.getHistoryCount();


                        if (historyCount === 0) displayUtil.updateScreenClass('length-state-1');
                        if (historyCount === 1) displayUtil.updateScreenClass('length-state-2');
                        if (historyCount === 2) displayUtil.updateScreenClass('length-state-3');
                        if (historyCount === 3) displayUtil.updateScreenClass('length-state-4');
                        this.updateLengthHistory(this.dataContainer.history);
                        displayUtil.updateLine4(this.dataContainer.data);
                        // displayUtil.updateLine4('--.---');


                        // this.dataContainer.addData(this.tmpData);




                        break;

                    }
                }

            },
            onHistory: function() {

            },
            onStateChange: function(targetState) {

                this.state = targetState;
                switch (targetState) {
                    case "PLUS":
                        //TODO 
                        displayUtil.updateScreenClass('length-state-5');
                        // this.history = [null, this.data, null];
                        this.dataContainer.preparePlusOrMinus(this.tmpData);
                        console.log(this.dataContainer.history);
                        this.updateLengthHistory(this.dataContainer.history);
                        displayUtil.updateLine4('--.---');
                        break;
                    case "MINUS":
                        //TODO 
                        displayUtil.updateScreenClass('length-state-6');
                        // this.history = [null, this.data, null];

                        this.dataContainer.preparePlusOrMinus(this.tmpData);
                        this.updateLengthHistory(this.dataContainer.history);
                        displayUtil.updateLine4('--.---');
                        break;
                    case "NORMAL":

                        this.dataContainer.prepareData();


                        var historyCount = this.dataContainer.getHistoryCount();

                        if (historyCount === 0) displayUtil.updateScreenClass('length-state-1');
                        if (historyCount === 1) displayUtil.updateScreenClass('length-state-2');
                        if (historyCount === 2) displayUtil.updateScreenClass('length-state-3');
                        if (historyCount === 3) displayUtil.updateScreenClass('length-state-4');
                        this.updateLengthHistory(this.dataContainer.history);
                        displayUtil.updateLine4('--.---');
                        break;
                    case "NORMALRESULT":
                        // this.history.push(this.data);
                        // this.history.shift();

                        this.dataContainer.addData(this.tmpData);

                        displayUtil.updateLine4(this.dataContainer.data);

                        break;

                    case "PLUSRESULT":
                        // this.history.pop();
                        // this.history.push(this.data);
                        // this.data = this.history[1] + this.history[2];

                        this.dataContainer.processPlus(this.tmpData);
                        this.updateLengthHistory(this.dataContainer.history);
                        displayUtil.updateLine4(this.dataContainer.data);

                        // this.history.shift();
                        // this.history.push(this.data);
                        break;
                    case "MINUSRESULT":
                        // this.history.pop();
                        // this.history.push(this.data);
                        // this.data = this.history[1] - this.history[2];
                        this.dataContainer.processMinus(this.tmpData);
                        this.updateLengthHistory(this.dataContainer.history);
                        displayUtil.updateLine4(this.dataContainer.data);

                        // this.history.shift();
                        // this.history.push(this.data);
                        break;
                }

                console.log('OnStateChange @ LengthManager: ' + targetState);
                console.log('Current state @ LengthManager: ' + this.state);

            },
            // getHistoryCount: function(history) {
            //     var count = 0;
            //     for (var i = 0; i < history.length; i++) {
            //         if (history[i]) {
            //             count++;
            //         }
            //     }
            //     return count;
            // },
            updateLengthHistory: function(history) {
                displayUtil.updateLine1(history[0]);
                displayUtil.updateLine2(history[1]);
                displayUtil.updateLine3(history[2]);
            }

        });

        return LengthManager;
    }

);