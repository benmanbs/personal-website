/**
 * @author bshai date 10/12/15.
 */
define([
    'marionette',
    'underscore',
    'moment',

    'text!templates/blogPostSnippet.html'
], function (
    Marionette,
    _,
    moment,

    template
) {
    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),

        className: 'blog-snippet',

        templateHelpers: function() {
            return _.extend({}, this.model.toJSON(), {
                content: this.model.get('content').substr(0, this.model.get('content').lastIndexOf(' ', this.options.numChars)),
                date: moment(this.model.get('date')).format('MMMM Do, YYYY')
            });
        }
    })

});