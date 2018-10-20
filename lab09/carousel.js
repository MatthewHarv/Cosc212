/**
 * Image Carousel for the front page of the Classic Cinema site.
 *
 */

/**
 * Module pattern for Carousel functions
 */
var Carousel = (function () {
    "use strict";

    var movieList, movieIndex, pub;

    // Public interface
    pub = {};

    /**
     * Constructor function for MovieCategory objects
     *
     * These objects represent movie categories as shown on the front page.
     * Note that as a constructor this function does not return a value.
     * Instead it should be called using the form: new MovieCategory(...);
     *
     * Note also that this version differs slightly from that given in the labs.
	 * A closure is used to hide the internal state. 
	 * 
     * @param title The title of the category to display
     * @param image The image to display for the category
     * @param page The category page to link to
     */
    function MovieCategory(title, image, page) {
        var title_ = title;
        var image_ = image;
        var page_ = page;

        this.makeHTML = function () {
            var html;
            html = "<a href='" + page_ + "'id=a"+">";
            html += "<img src='" + image_ + "'id=img"+">";
            html += "<br>" + title_;
            html += "</img>";
            html += "</a>";
            return html;
        };
    }

    /**
     * Update the carousel to the next category
     */
    function nextCategory() {
        var carousel;
        carousel = $('#carousel');
        $(carousel).html(movieList[movieIndex].makeHTML());
        $('#img').fadeIn();
        $('#img').animate({height: '300px', opacity: '0.4'}, "slow");
        $('#img').animate({width: '300px', opacity: '0.8'}, "slow");
        $('#img').animate({height: '100px', opacity: '0.4'}, "slow");
        $('#img').animate({width: '100px', opacity: '0.8'}, "slow");
        $('#img').animate({transform: 'rotate('+360+')' }, "slow");

        $('#img').fadeOut();
        movieIndex += 1;
        if (movieIndex >= movieList.length) {
            movieIndex = 0;
        }
    }
    /**
     * Setup function for the carousel
     *
     * Creates a list of MovieCategory objects, and starts the timer
     */
    pub.setup = function () {

        movieList = [];
        movieList.push(new MovieCategory("Classics", "images/Metropolis.jpg", "classic.html"));
        movieList.push(new MovieCategory("Science Fiction and Horror", "images/Plan_9_from_Outer_Space.jpg", "scifi.html"));
        movieList.push(new MovieCategory("Alfred Hitchcock", "images/Vertigo.jpg", "hitchcock.html"));
        movieIndex = 0;
        nextCategory();
        setInterval(nextCategory, 3000);
    };

    // Expose public interface
    return pub;
}());

$(document).ready(Carousel.setup);