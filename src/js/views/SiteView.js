/**
 * @author bshai date 10/12/15.
 */
define([
    'marionette',
    'underscore',
    'text!../templates/site.html'
], function (
    Marionette,
    _,
    siteTemplate
) {
    'use strict';

    return Marionette.LayoutView.extend({
        el: "body",

        template: _.template(siteTemplate),

        regions: {
            content: '#content'
        }
    });

});