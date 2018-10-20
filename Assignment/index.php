<?php
session_start();
$scriptList = array(
    'js/jquery-3.2.1.min.js',
	'js/Library.js',
	'js/LilIndex.js',
	'js/lilLibrary.js',
	'https://unpkg.com/leaflet@1.1.0/dist/leaflet.js'

);
include('protected/header.php'); ?>

<nav>
    <ul>
        <li><a>Home</a></li>
        <li><a href="admin.php">Admin</a></li>
    </ul>
</nav>

<p>Clicking the map where there is no marker will display the raw GeoJSON.</p>
<div id="map" style="height: 400px;"></div>

<div class="table" id="table"></div>
<div id="info"></div>

<div id="geojsonOutput"></div>
</body>
<?php include ("protected/footer.php"); ?>
</html>