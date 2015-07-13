require(['backbone', 'marionette', 'modules/common/util','modules/simulator/DisplayUtil', 'modules/common/Router', 'modules/common/Controller','modules/main/MainView'], function (Backbone,Marionette, Util, DisplayUtil, Router, Controller, MainView) {
    window.util = Util;
    window.displayUtil = DisplayUtil;
	window.app = new Marionette.Application();
    app.appRouter = new Router({controller: new Controller()});
    app.rootView = new MainView();
    app.start();
    Backbone.history.start({ pushState: true, root: '/' });

});