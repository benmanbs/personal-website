/**
 * @author bshai date 10/12/15.
 */
define([
    'backbone'
], function (
    Backbone
) {
    'use strict';

    return Backbone.View.extend({

        initialize: function(options) {
            this.template = options.template || function() {return "";};
        },

        render: function() {
            this.$el.html(this.template());
            return this;
        }
    });

});