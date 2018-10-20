/**
 * Show/Hide movie details on the Classic Cinema site using jQuery
 */

/**
 * Module pattern for Show/Hide functions
 */
var ShowHide = (function () {

    var pub = {};

    function showHideDetails(){
        window.console.log('initing events');
        $('h3').click(function() {
            $(this).siblings().toggle();
        });
    }

    pub.setup = showHideDetails

    return pub;

}());

$(document).ready(ShowHide.setup);