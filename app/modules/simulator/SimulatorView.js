define(['backbone', 'marionette', 'mustache', 'jquery', 'text!modules/simulator/simulator.html', 'iscroll'],
    function(Backbone, Marionette, Mustache, $, template) {

        return Marionette.ItemView.extend({
            template: function(serialized_model) {
                return Mustache.render(template, serialized_model);
            },
            ui: {
                'laser':'#laser'
            },
            modelEvents: {
            },
            initialize: function() {
                app.rootView.updatePrimaryRegion(this);
            },
            onShow: function() {
                this.iscroll = new IScroll(this.$el[0]);

            },
            onDestroy: function() {
                this.stopListening();
            },
            events: {
                "tap #plus_btn": "clickPlus",
                "tap #minus_btn": "clickMinus",
                "tap #power_btn": "clickPower",
                "tap #history_btn": "clickHistory",
                "tap #measure": "clickMeasure",
                "press #plus_btn": "pressPlus",
                "press #minus_btn": "pressMinus",
                "press #history_btn":"pressHistory",
                "press #power_btn": "powerOff"
            },
            clickPlus: function(ev) {
                this.model.enqueue("PLUS");
            },
            clickMinus: function(ev) {
                this.model.enqueue("MINUS");
            },
            clickPower: function(ev) {
                this.model.enqueue("POWER");
            },
            clickHistory: function(ev) {
                this.model.enqueue("HISTORY");
            },
            clickMeasure: function(ev) {
                this.model.onMeasure();
            },
            pressPlus: function(ev) {
                this.model.onTypeChange();
            },
            pressMinus: function(ev) {
                this.model.onMethodChange();
            },
            pressHistory: function(ev) {
                this.model.onChangeBase();
            },
            powerOff: function(ev) {
                this.model.onPowerOff();
            },
            id: 'welcomeWrapper'
        });
    });