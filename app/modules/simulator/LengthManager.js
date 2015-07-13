// LengthManager.js

define(["jquery", "modules/simulator/FuncManager"],

    function($, FuncManager) {
        var LengthManager = FuncManager.extend({
            initialize: function() {
                this.data = 0.0;
                this.history = [null, null, null];
                this.state = 'NORMAL';
                this.subState = 'NORMAL';
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
                        //TODO 
                        displayUtil.updateLine3(this.data);
                        displayUtil.updateLine4(this.data + this.history[1]);
                        this.data = this.data + this.history[1];
                        this.history = [this.data, this.data - this.history[1], this.history[1]];
                        this.onStateChange('PLUSRESULT');
                        break;
                    case "MINUS":
                        //TODO 
                        displayUtil.updateLine3(this.data);
                        displayUtil.updateLine4(this.history[1] - this.data);
                        this.data = this.data - this.history[1];
                        this.history = [this.data, this.history[1] - this.data, this.history[1]];
                        this.onStateChange('MINUSRESULT');
                        break;
                    case "NORMAL":
                        displayUtil.updateLine4(this.data);
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
                        this.updateLengthHistory(this.history);
                        displayUtil.updateLine4('--.---');
                        this.onStateChange('NORMAL');
                        break;
                    case "PLUS":
                        //TODO 
                        this.history = [null,this.data, null];
                        this.updateLengthHistory(this.history);
                        displayUtil.updateLine4('--.---');
                        break;
                    case "MINUS":
                        //TODO 
                        this.history = [null,this.data, null];
                        this.updateLengthHistory(this.history);
                        displayUtil.updateLine4('--.---');
                        break;
                    case "NORMAL":
                        if (this.data) {
                            this.history.unshift(this.data);
                            this.history.pop();
                        }
                        this.updateLengthHistory(this.history);
                        displayUtil.updateLine4('--.---');
                        this.onStateChange('NORMAL');
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

                if (this.laserState === 'ON') {
                    this.trigger('turnOffLaser');
                    if (this.state === "NORMAL") this.onStateChange('NORMALRESULT');
                } else {
                    switch (this.state) {
                        case "PLUS":
                        case "MINUS":
                            this.history = [null, null, null];
                            this.data = 0.0;
                            displayUtil.updateLine4('--.---');
                            this.onStateChange('NORMAL');
                            break;
                        case "PLUSRESULT":
                            this.history = [null, this.history[2], null];
                            this.data = 0.0;
                            displayUtil.updateLine2(this.history[2]);
                            displayUtil.updateLine3('--.---');
                            displayUtil.updateLine4('--.---');
                            this.onStateChange('PLUS');
                            break;
                        case "MINUSRESULT":
                            this.history = [null, this.history[2], null];
                            this.data = 0.0;
                            displayUtil.updateLine2(this.history[2]);
                            displayUtil.updateLine3('--.---');
                            displayUtil.updateLine4('--.---');
                            this.onStateChange('MINUS');
                            break;
                        case "NORMAL":
                        case "NORMALRESULT":
                            this.data = this.history.shift();
                            this.history.push(null);
                            if (this.data) {
                                displayUtil.updateLine4(this.data);
                            } else {
                                this.data = 0.0;
                                displayUtil.updateLine4('--.---');
                            }

                            this.onStateChange('NORMAL');
                    }
                    this.updateLengthHistory(this.history);
                }
            },
            onHistory: function() {

            },
            onStateChange: function(targetState) {
                var historyCount = this.getHistoryCount(this.history);
                this.state = targetState;
                switch (targetState) {
                    case "PLUS":
                        //TODO 
                        displayUtil.updateScreenClass('length-state-5');
                        break;
                    case "MINUS":
                        //TODO 
                        displayUtil.updateScreenClass('length-state-6');
                        break;
                    case "NORMAL":
                        if (historyCount === 0) displayUtil.updateScreenClass('length-state-1');
                        if (historyCount === 1) displayUtil.updateScreenClass('length-state-2');
                        if (historyCount === 2) displayUtil.updateScreenClass('length-state-3');
                        if (historyCount === 3) displayUtil.updateScreenClass('length-state-4');
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
                if (history[0]) displayUtil.updateLine3(history[0]);
                if (history[1]) displayUtil.updateLine2(history[1]);
                if (history[2]) displayUtil.updateLine1(history[2]);
            }

        });

        return LengthManager;
    }

);