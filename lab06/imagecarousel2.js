var movieList;
var movieIndex;

function nextCategory() {
    "use strict";
    document.getElementById("imgCarousal").innerHTML = movieList[movieIndex].makeHTML();
    movieIndex += 1;
    if (movieIndex > (movieList.length - 1)) {
        movieIndex = 0;
    }
}
function MovieCategory(title, image, page) {
    "use strict";
    this.title = title;
    this.image = image;
    this.page = page;
    this.makeHTML = function () {
        return "<figure><a href='" + page + "'><img src='" + image + "'><figcaption>" + title + "</figcaption></a></figure>";
    };
}


function setup() {
    "use strict";
    movieList = [];
    movieList.push(new MovieCategory("Classics", "images/Metropolis.jpg", "classic.html"));
    movieList.push(new MovieCategory("Science Fiction and Horror", "images/Plan_9_from_Outer_Space.jpg", "scifi.html"));
    movieList.push(new MovieCategory("Alfred Hitchcock", "images/Vertigo.jpg", "hitchcock.html"));
    movieIndex = 0;
    nextCategory();
    setInterval(nextCategory, 3000);

}






if (document.getElementById) {
    window.onload = setup;
}

