// LengthManager.js

define(["jquery", "modules/simulator/FuncManager"],

    function($, FuncManager) {
        var AreaManager = FuncManager.extend({
            initialize: function() {
                this.data = 0.0;
                this.history = [];
                this.state = 'NORMAL';
            },

            onData: function() {
                this.data = Math.round(10 * Math.random() * 1000) / 1000;
                console.log('[AreaManager] data in...' + this.data);
                var historyCount = this.history.length;
                if (historyCount === 0) {
                    this.history.push(this.data);
                    displayUtil.updateLine2(this.data);
                    displayUtil.updateScreenClass('area-state-2');
                }
                if (historyCount===1) {
                    this.history.push(this.data);
                    displayUtil.updateLine3(this.data);
                    
                    this.data = this.history[0]*this.data;
                    this.history.push(this.data);
                    displayUtil.updateLine4(this.data);
                    displayUtil.updateScreenClass('area-state-3');
                }

            },
            onLaserReady: function() {
                var historyCount = this.history.length;
                console.log(historyCount);
                if (historyCount === 0 || historyCount >= 2) {
                    this.history = [];
                    displayUtil.updateScreenClass('area-state-1');
                    displayUtil.updateLine2('--.---');
                    displayUtil.updateLine3('--.---');
                    displayUtil.updateLine4('--.---');
                    displayUtil.updateLine4Sup(2);
                }
            }

        });

        return AreaManager;
    }

);