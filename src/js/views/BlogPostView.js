/**
 * @author bshai date 10/12/15.
 */
define([
    'marionette',
    'underscore',
    'text!templates/blogPost.html'
], function (
    Marionette,
    _,
    template
) {
    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template)

    });

});