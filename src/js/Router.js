/**
 * This is the main router for the site. It will contain
 * all the menu items, and all the templates that fill
 * in the content for them.
 *
 * TODO get rid of hashes in URLS
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
    './views/BlogListView',
    './views/BlogPostView',

    // Collections
    './blogCollection',

    // Templates
    'text!templates/pages/home.html',
    'text!templates/pages/about.html',
    'text!templates/pages/projects.html',
    'text!templates/pages/resume.html'
], function (
    // Libs
    Backbone,
    _,

    // Views
    SiteView,
    BasicView,
    BlogListView,
    BlogPostView,

    // Collections
    blogCollection,

    // Templates
    homeTemplate,
    aboutTemplate,
    projectsTemplate,
    resumeTemplate
) {
    'use strict';

    return Backbone.Router.extend({

        routes: {
            'about': 'about',
            'projects': 'projects',
            'resume': 'resume',
            'blog': 'blog',
            'blog/:page': 'blog',
            'blog/posts/:id': 'blogPost',
            '': 'home'
        },

        /**
         * The homepage of the website.
         */
        home: function() {
            this._showBasicView(homeTemplate);
        },

        /**
         * The about me page of the website.
         */
        about: function() {
            this._showBasicView(aboutTemplate);
        },

        /**
         * The projects page of the website.
         */
        projects: function() {
            this._showBasicView(projectsTemplate);
        },

        /**
         * The resume page of the website.
         */
        resume: function() {
            this._showBasicView(resumeTemplate);
        },

        /**
         * The blog page of the website.
         */
        blog: function(page) {
            page = page || 1;
            window.scrollTo(0, 0);
            var collection = _.values(blogCollection);
            this._showView(new BlogListView({collection: collection, pageNum: page}));
        },

        /**
         * The blog page of the website.
         */
        blogPost: function(id) {
            this._showView(new BlogPostView({model: new Backbone.Model(blogCollection[id])}));
        },
        
        _showBasicView: function(template) {
            var homeView = new BasicView({template: _.template(template)});
            this._showView(homeView);
        },

        _showView: function (view) {
            this.view.getRegion('content').show(view);
        },

        initialize: function() {
            this.view = new SiteView();
            this.view.render();
        }
    });

});