// LengthManager.js

define(["jquery", "modules/simulator/FuncManager"],

    function($, FuncManager) {
        var LengthManager = FuncManager.extend({
            initialize: function() {
                this.data = 0.0;
                this.history = [null, null, null];
                this.state = 'NORMAL';
            },
            onData: function() {

                this.data = Math.round(10 * Math.random() * 1000) / 1000;
                console.log('[LengthManager] data in...' + this.data);

                switch (this.state) {
                    case "PLUS":
                        //TODO 
                        displayUtil.updateLine3(this.data);
                        displayUtil.updateLine4(this.data + this.history[0]);
                        this.data = this.data + this.history[0];
                        break;
                    case "MINUS":
                        //TODO 
                        displayUtil.updateLine3(this.data);
                        displayUtil.updateLine4(this.history[0] - this.data);
                        this.data = this.data - this.history[0];
                        break;
                    case "NORMAL":
                        displayUtil.updateLine4(this.data);
                        break;
                }
            },

            onLaserReady: function() {

                console.log('[LengthManager] laser is ready...');
                //TODO  output state to screen
                switch (this.state) {
                    case "PLUS":
                        //TODO 
                        this.history = [this.data, null, null];
                        displayUtil.updateLine2(this.data);
                        this.data = 0.0;
                        displayUtil.updateLine3('--.---');
                        displayUtil.updateLine4('--.---');
                        break;
                    case "MINUS":
                        //TODO 
                        this.history = [this.data, null, null];
                        displayUtil.updateLine2(this.data);
                        this.data = 0.0;
                        displayUtil.updateLine3('--.---');
                        displayUtil.updateLine4('--.---');
                        break;
                    case "NORMAL":
                        displayUtil.updateLine4('--.---');
                        this.history.unshift(this.data);
                        this.history.pop();
                        this.updateLengthHistory(this.history);
                        this.onStateChange('NORMAL');
                        break;
                }

            },

            onPlus: function() {
                this.onStateChange('PLUS');
            },
            onMinus: function() {
                this.onStateChange('MINUS');
            },
            onPower: function() {
                displayUtil.updateLine4('--.---');
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