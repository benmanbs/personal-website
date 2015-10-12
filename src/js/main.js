/**
 * @author bshai date 10/12/15.
 */
requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.1.4.min',
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min',
        text: 'lib/text',
        marionette: 'lib/backbone.marionette.min'
    }
});

require([
    'backbone',
    './Router'
], function(
    Backbone,
    Router
) {
    // Create our Application
    var app = new Marionette.Application();

    // Start history when our application is ready
    app.on('start', function() {
        new Router();
        Backbone.history.start();
    });

    app.start();
});