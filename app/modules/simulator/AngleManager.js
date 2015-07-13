// LengthManager.js

define(["jquery", "modules/simulator/FuncManager"],

    function($, FuncManager) {
        var AngleManager = FuncManager.extend({
            initialize: function() {
                this.data = 0.0;
                this.angle = 0.0;
                this.state = 'NORMAL';
                
            },

            onData: function() {
                this.data = Math.round(10 * Math.random() * 1000) / 1000;
                console.log('[AngleManager] data in...' + this.data);
                window.removeEventListener('deviceorientation', this.handleOrientation);
                displayUtil.updateScreenClass('triangel-state-2');
                displayUtil.updateLine2(this.data);
                displayUtil.updateLine3(this.data);
                displayUtil.updateLine4(this.data);

            },
            onLaserReady: function() {
                window.removeEventListener('deviceorientation', this.handleOrientation);
                window.addEventListener('deviceorientation', this.handleOrientation);
                displayUtil.updateScreenClass('triangel-state-1');
                displayUtil.updateLine2();
                displayUtil.updateLine3();
                displayUtil.updateLine4();
            },
            handleOrientation: function(event) {
                if(event.beta) { this.angle = event.beta; } 
                else { this.angle = 0.0; }
                displayUtil.updateAngle(this.angle);
            }

        });

        return AngleManager;
    }

);