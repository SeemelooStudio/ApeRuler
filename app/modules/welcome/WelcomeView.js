define(['backbone', 'marionette', 'mustache', 'jquery', 'text!modules/welcome/welcome.html', 'iscroll'],
    function(Backbone, Marionette, Mustache, $, template) {

        return Marionette.ItemView.extend({
            template: function(serialized_model) {
                return Mustache.render(template, serialized_model);
            },
            ui: {

            },
            events: {

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
                "tap #measure": "clickMeasure"
            },
            clickPlus: function(ev) {
                var self = this;
                ev.preventDefault();
                ev.stopPropagation();
                this.model.enqueue("PLUS");
            },
            clickMinus: function(ev) {
                var self = this;
                ev.preventDefault();
                ev.stopPropagation();
                this.model.enqueue("MINUS");
            },
            clickPower: function(ev) {
                var self = this;
                ev.preventDefault();
                ev.stopPropagation();
                this.model.enqueue("POWER");
            },
            clickHistory: function(ev) {
                var self = this;
                ev.preventDefault();
                ev.stopPropagation();
                this.model.enqueue("HISTORY");
            },
            clickMeasure: function(ev) {
                var self = this;
                ev.preventDefault();
                ev.stopPropagation();
                this.model.onMeasure();
            },
            id: 'welcomeWrapper'
        });
    });