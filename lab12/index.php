<!DOCTYPE html>
<?php
$scriptList = array(
    'jquery-3.2.1.min.js',
    'carousel.js'
);
include('protect/header.php'); ?>

        <div id="main">
            <p>
                Welcome to Classic Cinema, your online store for classic film.
            </p>
			<div id="carousel">
			<li><a href="classic.php"><img src="images/Metropolis.jpg" alt="Metropolis">Classic Films</a>	
                <!-- Content generated by J avaScript in carousel.js -->
            </div>
        </div>

       <?php include ("protect/footer.php"); ?>

    </body>
</html>