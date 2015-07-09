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
            id: 'welcomeWrapper'
        });
    });