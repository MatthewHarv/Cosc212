function showHideDetails() {
    "use strict";
    var paragraphs;
    var p;
    var img;
    img = this.parentNode.getElementsByTagName("img");
    paragraphs = this.parentNode.getElementsByTagName("p");

    for (p = 0; p < paragraphs.length; p += 1) {
        if (paragraphs[p].style.display === "none") {
            paragraphs[p].style.display = "block";
            img[0].style.display = "block";
        } else {
            img[0].style.display = "none";
            paragraphs[p].style.display = "none";
        }
    }
}

function setup() {
    "use strict";
    var films;
    var f;
    var title;
    films = document.getElementsByClassName("film");
    for (f = 0; f < films.length; f += 1) {
        title = films[f].getElementsByTagName("h3")[0];
        title.onclick = showHideDetails;
        title.style.cursor = "pointer";
    }

}

if (document.getElementById) {
    window.onload = setup;
}