/**
 * @author bshai date 10/12/15.
 */
define([
    'marionette',
    'backbone',
    'underscore',
    './BlogCollectionView',
    'text!templates/blogList.html'
], function (
    Marionette,
    Backbone,
    _,
    BlogCollectionView,
    template
) {
    'use strict';

    var BlogListView = Marionette.LayoutView.extend({
        template: _.template(template),

        className: 'blog-posts',

        regions: {
            posts: '.posts'
        },

        templateHelpers: function() {
            return {
                page: this.pageNum,
                showPrev: this.pageNum != 1,
                showNext: (this.pageNum) * BlogListView.NUM_PER_PAGE < this.unfilteredCollection.length
            }
        },

        onRender: function() {
            var postsView = new BlogCollectionView({
                collection: this.collection,
                pageNum: this.pageNum
            });
            this.getRegion('posts').show(postsView);
        },

        initialize: function(options) {
            this.pageNum = parseInt(options.pageNum);
            this.unfilteredCollection = options.collection;

            if(this.pageNum > Math.ceil(this.unfilteredCollection.length / BlogListView.NUM_PER_PAGE)) {
                this.pageNum = 1;
            }

            // sort the collection by date descending
            this.unfilteredCollection.sort(function(a, b) {
                return b.date - a.date;
            });

            // get the correct slice of collection
            this.collection = new Backbone.Collection(this.unfilteredCollection.slice((this.pageNum - 1) * BlogListView.NUM_PER_PAGE, (this.pageNum) * BlogListView.NUM_PER_PAGE));
        }
    }, {
        NUM_PER_PAGE: 5
    });

    return BlogListView;

});