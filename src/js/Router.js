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
    './views/BlogListView',
    './views/BlogPostView',

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
    BlogListView,
    BlogPostView,

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
         * The contact page of the website.
         */
        contact: function() {
            this._showBasicView(contactTemplate);
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
            var collection = [
                {content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi arcu arcu, ornare sed malesuada aliquet, blandit nec mauris. Ut condimentum blandit lorem sed eleifend. Nam non libero nec neque luctus congue. Praesent non eleifend sem. Aenean molestie egestas pretium. Cras vitae ex ultrices, posuere odio nec, finibus risus. Nunc consequat massa a nunc imperdiet, at vulputate enim accumsan. Donec a nisl et ex viverra suscipit eget eu lorem. Sed sagittis risus commodo elit vulputate mollis.'},
                {content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi arcu arcu, ornare sed malesuada aliquet, blandit nec mauris. Ut condimentum blandit lorem sed eleifend. Nam non libero nec neque luctus congue. Praesent non eleifend sem. Aenean molestie egestas pretium. Cras vitae ex ultrices, posuere odio nec, finibus risus. Nunc consequat massa a nunc imperdiet, at vulputate enim accumsan. Donec a nisl et ex viverra suscipit eget eu lorem. Sed sagittis risus commodo elit vulputate mollis.'},
                {content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi arcu arcu, ornare sed malesuada aliquet, blandit nec mauris. Ut condimentum blandit lorem sed eleifend. Nam non libero nec neque luctus congue. Praesent non eleifend sem. Aenean molestie egestas pretium. Cras vitae ex ultrices, posuere odio nec, finibus risus. Nunc consequat massa a nunc imperdiet, at vulputate enim accumsan. Donec a nisl et ex viverra suscipit eget eu lorem. Sed sagittis risus commodo elit vulputate mollis.'},
                {content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi arcu arcu, ornare sed malesuada aliquet, blandit nec mauris. Ut condimentum blandit lorem sed eleifend. Nam non libero nec neque luctus congue. Praesent non eleifend sem. Aenean molestie egestas pretium. Cras vitae ex ultrices, posuere odio nec, finibus risus. Nunc consequat massa a nunc imperdiet, at vulputate enim accumsan. Donec a nisl et ex viverra suscipit eget eu lorem. Sed sagittis risus commodo elit vulputate mollis.'},
                {content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi arcu arcu, ornare sed malesuada aliquet, blandit nec mauris. Ut condimentum blandit lorem sed eleifend. Nam non libero nec neque luctus congue. Praesent non eleifend sem. Aenean molestie egestas pretium. Cras vitae ex ultrices, posuere odio nec, finibus risus. Nunc consequat massa a nunc imperdiet, at vulputate enim accumsan. Donec a nisl et ex viverra suscipit eget eu lorem. Sed sagittis risus commodo elit vulputate mollis.'},
                {content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi arcu arcu, ornare sed malesuada aliquet, blandit nec mauris. Ut condimentum blandit lorem sed eleifend. Nam non libero nec neque luctus congue. Praesent non eleifend sem. Aenean molestie egestas pretium. Cras vitae ex ultrices, posuere odio nec, finibus risus. Nunc consequat massa a nunc imperdiet, at vulputate enim accumsan. Donec a nisl et ex viverra suscipit eget eu lorem. Sed sagittis risus commodo elit vulputate mollis.'},
                {content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi arcu arcu, ornare sed malesuada aliquet, blandit nec mauris. Ut condimentum blandit lorem sed eleifend. Nam non libero nec neque luctus congue. Praesent non eleifend sem. Aenean molestie egestas pretium. Cras vitae ex ultrices, posuere odio nec, finibus risus. Nunc consequat massa a nunc imperdiet, at vulputate enim accumsan. Donec a nisl et ex viverra suscipit eget eu lorem. Sed sagittis risus commodo elit vulputate mollis.'},
                {content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi arcu arcu, ornare sed malesuada aliquet, blandit nec mauris. Ut condimentum blandit lorem sed eleifend. Nam non libero nec neque luctus congue. Praesent non eleifend sem. Aenean molestie egestas pretium. Cras vitae ex ultrices, posuere odio nec, finibus risus. Nunc consequat massa a nunc imperdiet, at vulputate enim accumsan. Donec a nisl et ex viverra suscipit eget eu lorem. Sed sagittis risus commodo elit vulputate mollis.'},
                {content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi arcu arcu, ornare sed malesuada aliquet, blandit nec mauris. Ut condimentum blandit lorem sed eleifend. Nam non libero nec neque luctus congue. Praesent non eleifend sem. Aenean molestie egestas pretium. Cras vitae ex ultrices, posuere odio nec, finibus risus. Nunc consequat massa a nunc imperdiet, at vulputate enim accumsan. Donec a nisl et ex viverra suscipit eget eu lorem. Sed sagittis risus commodo elit vulputate mollis.'},
                {content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi arcu arcu, ornare sed malesuada aliquet, blandit nec mauris. Ut condimentum blandit lorem sed eleifend. Nam non libero nec neque luctus congue. Praesent non eleifend sem. Aenean molestie egestas pretium. Cras vitae ex ultrices, posuere odio nec, finibus risus. Nunc consequat massa a nunc imperdiet, at vulputate enim accumsan. Donec a nisl et ex viverra suscipit eget eu lorem. Sed sagittis risus commodo elit vulputate mollis.'}
            ];
            this._showView(new BlogListView({collection: collection, pageNum: page}));
        },

        /**
         * The blog page of the website.
         */
        blogPost: function(id) {
            this._showView(new BlogPostView({model: new Backbone.Model({
                title: "Something",
                date: new Date(),
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi arcu arcu, ornare sed malesuada aliquet, blandit nec mauris. Ut condimentum blandit lorem sed eleifend. Nam non libero nec neque luctus congue. Praesent non eleifend sem. Aenean molestie egestas pretium. Cras vitae ex ultrices, posuere odio nec, finibus risus. Nunc consequat massa a nunc imperdiet, at vulputate enim accumsan. Donec a nisl et ex viverra suscipit eget eu lorem. Sed sagittis risus commodo elit vulputate mollis."
            })}));
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