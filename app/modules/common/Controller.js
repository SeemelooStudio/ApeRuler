define(['backbone', 'marionette','modules/simulator/SimulatorView','modules/simulator/StateController'],
    function (Backbone, Marionette, SimulatorView, StateController) {

        return Marionette.Controller.extend({
            initialize: function (options) {

            },
            simulator: function() {
                var simulator = new SimulatorView({ model: StateController });
            }
        });
    });