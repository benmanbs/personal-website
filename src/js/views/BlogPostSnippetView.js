/**
 * @author bshai date 10/12/15.
 */
define([
    'marionette',
    'underscore'
], function (
    Marionette,
    _
) {
    'use strict';

    return Marionette.ItemView.extend({
        template: _.template('<%= numChars%>:<%= content%>'),

        templateHelpers: function() {
            return _.extend({
                numChars: this.options.numChars
            }, this.model.toJSON());
        }
    })

});