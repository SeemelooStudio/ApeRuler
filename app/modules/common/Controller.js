define(['backbone', 'marionette','modules/welcome/WelcomeView','models/KeypadHandler'],
    function (Backbone, Marionette, WelcomeView, KeypadHandler) {


		var keypadHandler;

        return Marionette.Controller.extend({
            initialize: function (options) {

            },
            welcome: function() {
      			keypadHandler = new KeypadHandler();
                var welcome = new WelcomeView({ model: keypadHandler });
            }
        });
    });