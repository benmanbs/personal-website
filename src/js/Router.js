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
    'jquery',

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
    $,

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
            this._showBasicView(homeTemplate, 'home', 'Home');
        },

        /**
         * The about me page of the website.
         */
        about: function() {
            this._showBasicView(aboutTemplate, 'about', 'About Me');
        },

        /**
         * The projects page of the website.
         */
        projects: function() {
            this._showBasicView(projectsTemplate, 'projects', 'Projects');
        },

        /**
         * The resume page of the website.
         */
        resume: function() {
            this._showBasicView(resumeTemplate, 'resume', 'Resume');
        },

        /**
         * The blog page of the website.
         */
        blog: function(page) {
            page = page || 1;
            var collection = _.values(blogCollection);
            this._showView(new BlogListView({collection: collection, pageNum: page}), 'blog', 'Blog');
        },

        /**
         * The blog page of the website.
         */
        blogPost: function(id) {
            this._showView(new BlogPostView({model: new Backbone.Model(blogCollection[id])}), 'blog', blogCollection[id].title, true);
        },
        
        _showBasicView: function(template, menu, title) {
            var homeView = new BasicView({template: _.template(template)});
            this._showView(homeView, menu, title);
        },

        _showView: function (view, menu, title, titleFirst) {
            $('#menu li').removeClass('current');
            $('#menu li.' + menu).addClass('current');
            window.scrollTo(0, 0);
            document.title = titleFirst ? title + " | Benjamin Shai" : "Benjamin Shai | " + title;
            this.view.getRegion('content').show(view);
        },

        initialize: function() {
            this.view = new SiteView();
            this.view.render();
        }
    });

});