var imageList;
var imageIndex;
var carousal;
var imgHTML;

function nextImage() {
    "use strict";
    imageIndex += 1;
    if (imageIndex > (imageList.length - 1)) {
        imageIndex = 0;
    }
    imgHTML.src = imageList[imageIndex];
}

function setup() {
    "use strict";
    carousal = document.getElementById("imgCarousal");
    imgHTML = document.createElement("img");

    imageList = [];
    imageList.push("images/Metropolis.jpg");
    imageList.push("images/Plan_9_from_Outer_Space.jpg");
    imageList.push("images/Vertigo.jpg");
    imageIndex = 0;
    imgHTML.src = imageList[imageIndex];
    carousal.appendChild(imgHTML);
    setInterval(nextImage, 3000);

}

if (document.getElementById) {
    window.onload = setup;
}


/*
 <ul class="frontpage">
 <li><a href="classic.php"><img src="images/Metropolis.jpg" alt="Metropolis">Classic Films</a>
 <li><a href="scifi.html"><img src="images/Plan_9_from_Outer_Space.jpg" alt="Plan 9 from Outer Space">Science Fiction and Horror</a>
 <li><a href="hitchcock.php"><img src="images/The_Birds.jpg" alt="The Birds">Alfred Hitchcock</a>
 </ul>
 */
