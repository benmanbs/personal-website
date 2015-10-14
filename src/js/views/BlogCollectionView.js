/**
 * The view for the list of posts.
 *
 * Renders a given number of blog posts.
 *
 * @author bshai date 10/12/15.
 */
define([
    'marionette',
    'backbone',
    './BlogPostSnippetView'
], function (
    Marionette,
    Backbone,
    BlogPostSnippetView
) {
    'use strict';

    return Marionette.CollectionView.extend({
        childView: BlogPostSnippetView,

        initialize: function(options) {
            this.pageNum = options.pageNum;
            this.collection = options.collection;
        },

        childViewOptions: function(model, index) {
            var numChars = index == 0 && this.pageNum == 1 ? 1000 : 400;
            return {
                numChars: numChars
            }
        }
    });

});