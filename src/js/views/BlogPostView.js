/**
 * @author bshai date 10/12/15.
 */
define([
    // Libs
    'marionette',
    'underscore',
    'moment',

    // Collections
    '../blogCollection',// Collections
    './BlogListView',

    'text!templates/blogPost.html'
], function (
    // Libs
    Marionette,
    _,
    moment,

    // Collections
    blogCollection,// Collections
    BlogListView,

    template
) {
    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),

        className: 'blog-post',

        templateHelpers: function() {
            var pageNum = this._getPageNum();

            return _.extend({}, this.model.toJSON(), {
                date: moment(this.model.get('date')).format('MMMM Do, YYYY'),
                page: pageNum
            })
        },

        _getPageNum: function() {
            var collection = _.values(blogCollection);

            collection.sort(function(a, b) {
                return b.date - a.date;
            });
            var self = this;

            return Math.floor(collection.indexOf(_.find(collection, function(model) {return model.url === self.model.get('url')})) / BlogListView.NUM_PER_PAGE) + 1;
        }

    });

});