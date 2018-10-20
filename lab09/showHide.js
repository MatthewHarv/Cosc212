/**
 * Show/Hide movie details on the Classic Cinema site using jQuery
 * Version: 2
 */

/**
 * Module pattern for Show/Hide functions
 */
var ShowHide = (function () {
    "use strict";
    
    var pub = {};

    function showHideDetails(){
        window.console.log('initing events');
        $('h3').click(function() {
            $(this).siblings().toggle(1000, 'swing');
        });
    }

    pub.setup = showHideDetails;

    return pub;

}());

$(document).ready(ShowHide.setup);