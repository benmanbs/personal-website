/**
 * This is the main router for the site. It will contain
 * all the menu items, and all the templates that fill
 * in the content for them.
 *
 * @author bshai date 10/12/15.
 */
define([
    // Libs
    'backbone',
    'underscore',

    // Views
    './views/SiteView',
    './views/BasicView',

    // Templates
    'text!templates/pages/home.html',
    'text!templates/pages/about.html',
    'text!templates/pages/contact.html',
    'text!templates/pages/projects.html',
    'text!templates/pages/resume.html'
], function (
    // Libs
    Backbone,
    _,

    // Views
    SiteView,
    BasicView,

    // Templates
    homeTemplate,
    aboutTemplate,
    contactTemplate,
    projectsTemplate,
    resumeTemplate
) {
    'use strict';

    return Backbone.Router.extend({

        routes: {
            'about': 'about',
            'contact': 'contact',
            'projects': 'projects',
            'resume': 'resume',
            'blog': 'blog',
            'blog/:id': 'blogPost',
            '': 'home'
        },

        /**
         * The homepage of the website.
         */
        home: function() {
            this.showBasicView(homeTemplate);
        },

        /**
         * The contact page of the website.
         */
        contact: function() {
            this.showBasicView(contactTemplate);
        },

        /**
         * The about me page of the website.
         */
        about: function() {
            this.showBasicView(aboutTemplate);
        },

        /**
         * The projects page of the website.
         */
        projects: function() {
            this.showBasicView(projectsTemplate);
        },

        /**
         * The resume page of the website.
         */
        resume: function() {
            this.showBasicView(resumeTemplate);
        },

        /**
         * The blog page of the website.
         */
        blog: function() {
            this.showBasicView("I'm the blog!");
        },

        /**
         * The blog page of the website.
         */
        blogPost: function(id) {
            this.showBasicView("Requested blog post: " + id);
        },

        showBasicView: function(template) {
            var homeView = new BasicView({template: _.template(template)});
            this.view.getRegion('content').show(homeView);
        },

        initialize: function() {
            this.view = new SiteView();
            this.view.render();
        }
    });

});