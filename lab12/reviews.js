var Reviews = (function () {
   'use strict';

    //Public API object
    var pub = {};
    function parseReviews(data, target) {
        var html = '';
        if( $(data).find('review')[0] ) {
            $(target).html('');
            $(data).find('review').each(function () {
                var rating = $(this).find('rating')[0].textContent;
                var usr = $(this).find('user')[0].textContent;
                html += '<dl><dt>' + usr + ':'+'</dt><dd>' + rating + '</dd></dl>';
            });
          $(target).html(html);
        } else {
            $(target).html('<p>No reviews</p>');
        }
    }
    function imgUrlToXmlUrl(url) {
        window.console.log(url);
        var lines = url.match(/([/][\w]+\.[jpg]+)/)[0];
        lines = lines.replace('.jpg', '.xml');
        return lines;
    }


    function showReviews(){
        /*jshint -W040*/
        var target = $(this).parent().find('.review')[0];
        var url = $(this).parent().find('img')[0].src;
        /*jshint +W040*/
        $.ajax({
            type: 'GET',
            url: 'data'+ imgUrlToXmlUrl(url),
            cache: false,
            success: function (data) {
                parseReviews(data, target);
            }
        }).fail(function () {
            $(target).html('<p>No reviews</p>');
        });
    }


    function setup() {
        $('.showReviews').click(showReviews);
    }

    pub.setup = function () {
        setup();
    };

    return pub;
}());

$(document).ready(Reviews.setup);