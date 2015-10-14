/**
 * @author bshai date 10/12/15.
 */
define([
    'marionette',
    'underscore',
    'moment',
    'text!templates/blogPost.html'
], function (
    Marionette,
    _,
    moment,
    template
) {
    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),

        templateHelpers: function() {
            return _.extend({}, this.model.toJSON(), {
                date: moment(this.model.get('date')).format('MMMM Do, YYYY')
            })
        }

    });

});