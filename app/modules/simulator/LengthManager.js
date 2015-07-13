// LengthManager.js

define(["jquery", "modules/simulator/FuncManager"],

    function($, FuncManager) {
        var LengthManager = FuncManager.extend({
            initialize: function() {
                this.data = 0.0;
                this.history = [null, null, null];
                this.state = 'NORMAL';
                this.laserState = "OFF";
            },
            onEnter: function() {
                this.onStateChange('NORMAL');
            },
            onData: function() {
                this.data = Math.round(10 * Math.random() * 1000) / 1000;
                console.log('[LengthManager] data in...' + this.data);
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
                            this.history = [null, null, null];
                            this.data = 0.0;
                            this.onStateChange('NORMAL');
                            break;
                        case "PLUSRESULT":
                            this.data = this.history[0];
                            this.onStateChange('PLUS');
                            break;
                        case "MINUSRESULT":
                            this.data = this.history[0];
                            this.onStateChange('MINUS');
                            break;
                        case "NORMAL":
                            this.data = this.history.pop();
                            this.history.unshift(null);
                            historyCount = this.getHistoryCount(this.history);
                            if (historyCount === 0) displayUtil.updateScreenClass('length-state-1');
                            if (historyCount === 1) displayUtil.updateScreenClass('length-state-2');
                            if (historyCount === 2) displayUtil.updateScreenClass('length-state-3');
                            if (historyCount === 3) displayUtil.updateScreenClass('length-state-4');
                            this.updateLengthHistory(this.history);
                            this.onStateChange('NORMALRESULT');
                            break;
                        case "NORMALRESULT":
                            this.data = this.history.pop();
                            this.history.unshift(null);
                            historyCount = this.getHistoryCount(this.history);
                            if (historyCount === 0) displayUtil.updateScreenClass('length-state-1');
                            if (historyCount === 1) displayUtil.updateScreenClass('length-state-2');
                            if (historyCount === 2) displayUtil.updateScreenClass('length-state-3');
                            if (historyCount === 3) displayUtil.updateScreenClass('length-state-4');
                            this.updateLengthHistory(this.history);
                            displayUtil.updateLine4(this.data);
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
                        this.history = [null, this.data, null];
                        console.log(this.history);
                        this.updateLengthHistory(this.history);
                        displayUtil.updateLine4('--.---');
                        break;
                    case "MINUS":
                        //TODO 
                        displayUtil.updateScreenClass('length-state-6');
                        this.history = [null, this.data, null];
                        this.updateLengthHistory(this.history);
                        displayUtil.updateLine4('--.---');
                        break;
                    case "NORMAL":
                        if (this.data) {
                            this.history.push(this.data);
                            this.history.shift();
                        }
                        var historyCount = this.getHistoryCount(this.history);
                        if (historyCount === 0) displayUtil.updateScreenClass('length-state-1');
                        if (historyCount === 1) displayUtil.updateScreenClass('length-state-2');
                        if (historyCount === 2) displayUtil.updateScreenClass('length-state-3');
                        if (historyCount === 3) displayUtil.updateScreenClass('length-state-4');
                        this.updateLengthHistory(this.history);
                        displayUtil.updateLine4('--.---');
                        break;
                    case "NORMALRESULT":
                        displayUtil.updateLine4(this.data);
                        break;

                    case "PLUSRESULT":
                        this.history.pop();
                        this.history.push(this.data);
                        this.data = this.history[1] + this.history[2];
                        this.updateLengthHistory(this.history);
                        displayUtil.updateLine4(this.data);

                        this.history.shift();
                        this.history.push(this.data);
                        break;
                    case "MINUSRESULT":
                        this.history.pop();
                        this.history.push(this.data);
                        this.data = this.history[1] - this.history[2];
                        this.updateLengthHistory(this.history);
                        displayUtil.updateLine4(this.data);

                        this.history.shift();
                        this.history.push(this.data);
                        break;
                }

                console.log('OnStateChange @ LengthManager: ' + targetState);
                console.log('Current state @ LengthManager: ' + this.state);

            },
            getHistoryCount: function(history) {
                var count = 0;
                for (var i = 0; i < history.length; i++) {
                    if (history[i]) {
                        count++;
                    }
                }
                return count;
            },
            updateLengthHistory: function(history) {
                displayUtil.updateLine1(history[0]);
                displayUtil.updateLine2(history[1]);
                displayUtil.updateLine3(history[2]);
            }

        });

        return LengthManager;
    }

);