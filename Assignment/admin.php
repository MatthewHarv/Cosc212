<?php
session_start();
?>

<?php
$scriptList = array(
    'js/jquery-3.2.1.min.js',
	'js/Library.js',
	'js/LilIndex.js',
	'js/lilLibrary.js',
	'js/newLibraryValidator.js',
	'https://unpkg.com/leaflet@1.1.0/dist/leaflet.js'

);
include('protected/header.php'); ?>
<nav>
    <ul>
        <li><a href="index.php">Home</a></li>
        <li><a>Admin</a></li>
    </ul>
</nav>

<p>Welcome to the Administrator's section. Here you can edit existing libraries or add new libraries.</p>
<div id="map" style="height: 400px;"></div>

<form novalidate action="validateForm.php" method="post">
                <fieldset>
                    <legend>Add Library</legend>
                    <p>
                        <label for="addFormLat">Latitude:</label>
                        <input type="text" name="addFormLat" id="addFormLat" <?php
if (isset($_SESSION['addFormLat'])) {
$name = $_SESSION['addFormLat'];
echo "value='$name'";
}
?> >
                    </p>
					<p>
                        <label for="addFormLon">Longitude:</label>
                        <input type="text" name="addFormLon" id="addFormLon"<?php
if (isset($_SESSION['addFormLon'])) {
$name = $_SESSION['addFormLon'];
echo "value='$name'";
}
?> >
                    </p>
					<p>
                        <label for="addCapacity">Capacity:</label>
                        <input type="text" name="addCapacity" id="addCapacity"<?php
if (isset($_SESSION['addCapacity'])) {
$name = $_SESSION['addCapacity'];
echo "value='$name'";
}
?> >
                    </p>
					<p>
                        <label for="addAddress">Address:</label>
                        <input type="text" name="addAddress" id="addAddress"<?php
if (isset($_SESSION['addAddress'])) {
$name = $_SESSION['addAddress'];
echo "value='$name'";
}
?> >
                    </p>
					<input type="submit">
                </fieldset>
             
            </form>

			
			<form novalidate action="validateForm.php" method="post">
                <fieldset>
                    <legend>Edit Library</legend>
					<p>
                        <label for="editID">ID:</label>
                        <input type="text" name="editID" id="editID"<?php
if (isset($_SESSION['editID'])) {
$name = $_SESSION['editID'];
echo "value='$name'";
}
?> >
                    </p>
                    <p>
                        <label for="editFormLat">Latitude:</label>
                        <input type="text" name="editFormLat" id="editFormLat"<?php
if (isset($_SESSION['editFormLat'])) {
$name = $_SESSION['editFormLat'];
echo "value='$name'";
}
?> >
                    </p>
					<p>
                        <label for="editFormLon">Longitude:</label>
                        <input type="text" name="editFormLon" id="editFormLon"<?php
if (isset($_SESSION['editFormLon'])) {
$name = $_SESSION['editFormLon'];
echo "value='$name'";
}
?> >
                    </p>
					<p>
                        <label for="editCapacity">Capacity:</label>
                        <input type="text" name="editCapacity" id="editCapacity"<?php
if (isset($_SESSION['editCapacity'])) {
$name = $_SESSION['editCapacity'];
echo "value='$name'";
}
?> >
                    </p>
					<p>
                        <label for="editAddress">Address:</label>
                        <input type="text" name="editAddress" id="editAddress"<?php
if (isset($_SESSION['editAddress'])) {
$name = $_SESSION['editAddress'];
echo "value='$name'";
}
?> >
                    </p>
					<input type="submit">
                </fieldset>
             
            </form>
			<form novalidate action="validateForm.php" method="post">
                <fieldset>
                    <legend>Add Book</legend>
					<p>
                        <label for="addBookID">ID:</label>
                        <input type="text" name="addBookID" id="addBookID"<?php
if (isset($_SESSION['addBookID'])) {
$name = $_SESSION['addBookID'];
echo "value='$name'";
}
?> >
                    </p>
                    <p>
                        <label for="addBookTitle">Book Title:</label>
                        <input type="text" name="addBookTitle" id="addBookTitle"<?php
if (isset($_SESSION['addBookTitle'])) {
$name = $_SESSION['addBookTitle'];
echo "value='$name'";
}
?> >
                    </p>
					<p>
                        <label for="addBookAuthor">Book Author:</label>
                        <input type="text" name="addBookAuthor" id="addBookAuthor"<?php
if (isset($_SESSION['addBookAuthor'])) {
$name = $_SESSION['addBookAuthor'];
echo "value='$name'";
}
?> >
                    </p>
					<p>
                        <label for="addBookYear">Book Year:</label>
                        <input type="text" name="addBookYear" id="addBookYear"<?php
if (isset($_SESSION['addBookYear'])) {
$name = $_SESSION['addBookYear'];
echo "value='$name'";
}
?> >
                    </p>
					
					<input type="submit">
                </fieldset>
             
            </form>
			<form novalidate action="validateForm.php" method="post">
                <fieldset>
                    <legend>Delete Book</legend>
					<p>
                        <label for="delBookID">ID:</label>
                        <input type="text" name="delBookID" id="delBookID"<?php
if (isset($_SESSION['delBookID'])) {
$name = $_SESSION['delBookID'];
echo "value='$name'";
}
?> >
                    </p>
                    <p>
                        <label for="delBookTitle">Book Title:</label>
                        <input type="text" name="delBookTitle" id="delBookTitle"<?php
if (isset($_SESSION['delBookTitle'])) {
$name = $_SESSION['delBookTitle'];
echo "value='$name'";
}
?> >
                    </p>

					
					<input type="submit">
                </fieldset>
             
            </form>
			
</body>
<?php include ("protected/footer.php"); ?>
</html>