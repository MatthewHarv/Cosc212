/**
 * Created by nickmeek on 7/7/17.
 */

/* global LilLibrary */
/**
 * The bootstrap for the index page
 *
 * @return {obj} An object of public functions (just setup in this case)
 * */
var LilIndex = (function () {
    "use strict";
    var pub = {};

    /**
     * The startup calls
     * */
    pub.setup = function () {
        //using $.when ensures that the ajax call is complete before trying to manipulate the data
        $.when(LilLibrary.getXMLData()).then(function(){
            LilLibrary.addMap();
            LilLibrary.showTable();
        });
    };

    return pub;
}());

$(document).ready(LilIndex.setup);
