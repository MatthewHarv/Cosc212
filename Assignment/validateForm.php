<?php
session_start();
?>
    <?php
require_once("protected/validationFunctions.php");


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
                <li><a href="index.php">Home</a></li>
                <li><a href="admin.php">Admin</a></li>
            </ul>
        </nav>

        <?php
 $formOK = true;

 $coordinatesvalid=true;

if(isset($_POST['addFormLat'])){
	$_SESSION['addFormLat']= $_POST['addFormLat'];
$_SESSION['addFormLon']= $_POST['addFormLon'];
$_SESSION['addCapacity']= $_POST['addCapacity'];
$_SESSION['addAddress']= $_POST['addAddress'];
	$addforlat=$_POST['addFormLat'];
	$addforlon=$_POST['addFormLon'];
	$addforcap=$_POST['addCapacity'];
	$addforadd=$_POST['addAddress'];

		if (strlen(trim($addforlat)) >0&& isPositiveOrNegativeDigits($addforlat)) {
			 $num=(int)$addforlat;
			 if($num>180 || $num<-180){
				 $formOK = false;
				 $coordinatesvalid=false;
				 echo "<p>Latitude must be between -180 and 180</p>";
		 } } else{
			 $coordinatesvalid=false;
		$formOK = false;
		echo "<p>Please Enter a valid Latitude number</p>";		
		}

		 if (strlen(trim($addforlon)) >0&& isPositiveOrNegativeDigits($addforlon)) {
			 $num=(int)$addforlon;
			 if($num>180 || $num<-180){
			 $coordinatesvalid=false;
				 $formOK = false;
				 echo "<p>Longitude must be between -180 and 180</p>";
		 } } else{
			 $coordinatesvalid=false;
		$formOK = false;
		echo "<p>Please Enter a valid Longitude number</p>";		
		}

if($coordinatesvalid){

	if(checkDistanceAndLongLat($addforlat, $addforlon)){
	} else{
		$formOK = false;
	}
}	

		 if (strlen(trim($addforcap)) >0&& isDigits($addforcap)) {	
		 } else{
		$formOK = false;
		echo "<p>Please Enter a valid capacity</p>";		
		}
		if (strlen(trim($addforadd)) > 0 && noSymbols($addforadd)) {
		} else{
	 	$formOK = false;
		echo "<p>Please enter a valid address </p>";		
		}
		
		/*
		Check if Coordinates are duplicated!!		
		*/
$libraryfilechecker = simplexml_load_file('libraries.xml');
foreach ($libraryfilechecker as $library) {
		foreach ($library->info as $info){
			$templat=$info->lat;
			$templon=$info->lng;
if($templat==$addforlat&&$templon==$addforlon){
	$formOK = false;
	echo "<p>Combination of coordinates already exists!</p>";	
			
		}
}
}
		
		
		
		
		if($formOK){
echo "<p>Thank you for adding library!!!!</p>";

$counter=0;
$libraryfile = simplexml_load_file('libraries.xml');
foreach ($libraryfile as $library) {
    $counter++;
}

$newLibrarySection = $libraryfile->addChild('library');
$newLibrarySection->addChild('id', $counter+1);
$newInfoSection = $newLibrarySection->addChild('info');
$newInfoSection->addChild('lat', $addforlat);
$newInfoSection->addChild('lng', $addforlon);
$newInfoSection->addChild('address', $addforadd);
$newInfoSection->addChild('capacity', $addforcap);
$newBookSection = $newLibrarySection->addChild('books');
$libraryfile->saveXML('libraries.xml');

$_SESSION = array();
session_destroy();

}	

}
if(isset($_POST['editFormLat'])){

	$_SESSION['editID']= $_POST['editID'];
$_SESSION['editFormLat']= $_POST['editFormLat'];
$_SESSION['editFormLon']= $_POST['editFormLon'];
$_SESSION['editCapacity']= $_POST['editCapacity'];
$_SESSION['editAddress']= $_POST['editAddress'];

	$editID=$_POST['editID'];
	$editFormLat=$_POST['editFormLat'];
	$editFormLon=$_POST['editFormLon'];
	$editCapacity=$_POST['editCapacity'];
	$editAddress=$_POST['editAddress'];
	$foundid=false;

		 if (strlen(trim($editID)) >0&& isDigits($editID)) {	

$libraryfile = simplexml_load_file('libraries.xml');
foreach ($libraryfile as $libraries) {
	if($libraries->id==$editID){
		$foundid=true;
	}
}
		 } else{
		$formOK = false;
		echo "<p>Please Enter a valid ID</p>";		
		}
if($foundid){
} else{
	$formOK = false;
	echo "<p>ID number was not found.</p>";
}

		if (strlen(trim($editFormLat)) >0&& isPositiveOrNegativeDigits($editFormLat)) {
			 $num=(int)$editFormLat;
			 if($num>180 || $num<-180){
				 $formOK = false;
				 $coordinatesvalid=false;
				 echo "<p>Latitude must be between -180 and 180</p>";
		 } } else{
			 $coordinatesvalid=false;
		$formOK = false;
		echo "<p>Please Enter a valid Latitude number</p>";		
		}

		 if (strlen(trim($editFormLon)) >0&& isPositiveOrNegativeDigits($editFormLon)) {
			 $num=(int)$editFormLon;
			 if($num>180 || $num<-180){
			 $coordinatesvalid=false;
				 $formOK = false;
				 echo "<p>Longitude must be between -180 and 180</p>";
		 } } else{
			 $coordinatesvalid=false;
		$formOK = false;
		echo "<p>Please Enter a valid Longitude number</p>";		
		}

if($coordinatesvalid){

	if(checkDistanceAndLongLat($editFormLat, $editFormLon)){
	} else{
		$formOK = false;
	}
}	

		 if (strlen(trim($editCapacity)) >0&& isDigits($editCapacity)) {	
		 } else{
		$formOK = false;
		echo "<p>Please Enter a valid capacity</p>";		
		}
		if (strlen(trim($editAddress)) > 0 && noSymbols($editAddress)) {
		} else{
	 	$formOK = false;
		echo "<p>Please enter a valid address </p>";		
		}
		/*
		Check if Coordinates are duplicated!!		
		*/
$libraryfilechecker = simplexml_load_file('libraries.xml');
foreach ($libraryfilechecker as $library) {
		foreach ($library->info as $info){
			$templat=$info->lat;
			$templon=$info->lng;
if($templat==$editFormLat&&$templon==$editFormLon){
	$formOK = false;
	echo "<p>Combination of coordinates already exists!</p>";	
			
		}
}
}

		if($formOK){
echo "<p>Library has been edited</p>";
$libraryfileedit = simplexml_load_file('libraries.xml');
foreach ($libraryfileedit as $libraries) {
	if($libraries->id==$editID){
		foreach ($libraries->info as $info){
			$info->lat=$editFormLat;
			$info->lng=$editFormLon;
			$info->capacity=$editCapacity;
			$info->address=$editAddress;
		}

	}
}
$libraryfileedit->saveXML('libraries.xml');

$_SESSION = array();
session_destroy();
		}
}

if(isset($_POST['addBookTitle'])){

	$formOK = true;

	$_SESSION['addBookID']= $_POST['addBookID'];
$_SESSION['addBookTitle']= $_POST['addBookTitle'];
$_SESSION['addBookAuthor']= $_POST['addBookAuthor'];
$_SESSION['addBookYear']= $_POST['addBookYear'];

	$addBookID=$_POST['addBookID'];
	$addBookTitle=$_POST['addBookTitle'];
	$addBookAuthor=$_POST['addBookAuthor'];
	$addBookYear=$_POST['addBookYear'];
		$foundid=false;

		 if (strlen(trim($addBookID)) >0&& isDigits($addBookID)) {	

$libraryfile = simplexml_load_file('libraries.xml');
foreach ($libraryfile as $libraries) {
	if($libraries->id==$addBookID){
		$foundid=true;
	}
}
if($foundid){
} else{
	$formOK = false;
	echo "<p>ID number was not found.</p>";
}
		 }  else{
		$formOK = false;
		echo "<p>Please Enter a valid ID</p>";		
		}
		

	 if (strlen(trim($addBookYear)) ==4&& isDigitsFour($addBookYear)) {	
		 } else{
		$formOK = false;
		echo "<p>Please Enter a valid year</p>";		
		}
		if (strlen(trim($addBookTitle)) > 0 && noSymbols($addBookTitle)) {
		} else{
	 	$formOK = false;
		echo "<p>Please enter a valid title </p>";		
		}
		if (strlen(trim($addBookAuthor)) > 0 && noSymbols($addBookAuthor)) {
		} else{
	 	$formOK = false;
		echo "<p>Please enter a valid author </p>";		
		}

		
		/**
		CHECK IF CAPACITY IS HIGH ENOUGH
		
		*/
		$counter=0;
			$libraryfileedit = simplexml_load_file('libraries.xml');
foreach ($libraryfileedit as $libraries) {
	if($libraries->id==$addBookID){
		foreach ($libraries->books as $books){
			foreach ($books->book as $book){
		
		$counter++;
				
			}
		}
	}
}
		$capacity=0;
		foreach ($libraryfileedit as $libraries) {
	if($libraries->id==$addBookID){
		foreach ($libraries->info as $info){
			$capacity=$info->capacity;
		}
	}
		}
		
		if($capacity<=$counter){
			echo "<p>Capacity is full, cannot add book </p>";
			$formOK = false;
		}
		
		
		if($formOK){

$libraryfileedit = simplexml_load_file('libraries.xml');
foreach ($libraryfileedit as $libraries) {
	if($libraries->id==$addBookID){
	
		foreach ($libraries->books as $books){
				$newBookSection = $books->addChild('book');
				$newBookSection->addChild('title', $addBookTitle);
				$newBookSection->addChild('author', $addBookAuthor);
				$newBookSection->addChild('year', $addBookYear);
		}
	}
}
$libraryfileedit->saveXML('libraries.xml');
echo "<p>Book Successfully added</p>";
$_SESSION = array();
session_destroy();
		}
}

if(isset($_POST['delBookTitle'])){

	$formOK = true;

	$_SESSION['delBookID']= $_POST['delBookID'];
$_SESSION['delBookTitle']= $_POST['delBookTitle'];

$delBookID=$_POST['delBookID'];
	$delBookTitle=$_POST['delBookTitle'];
		$foundid=false;

			 if (strlen(trim($delBookID)) >0&& isDigits($delBookID)) {

$libraryfile = simplexml_load_file('libraries.xml');
foreach ($libraryfile as $libraries) {
	if($libraries->id==$delBookID){
		$foundid=true;
	}
}
if($foundid){
} else{
	$formOK = false;
	echo "<p>ID number was not found.</p>";
}
			 }else{
		$formOK = false;
		echo "<p>Please Enter a valid ID</p>";		
		}

		if (strlen(trim($delBookTitle)) > 0 && noSymbols($delBookTitle)) {
		} else{
	 	$formOK = false;
		echo "<p>Please enter a valid title </p>";		
		}

if($formOK){
	$findTitle=false;
	$libraryfileedit = simplexml_load_file('libraries.xml');
foreach ($libraryfileedit as $libraries) {
	if($libraries->id==$delBookID){
		foreach ($libraries->books as $books){
			foreach ($books->book as $book){
				if($book->title==$delBookTitle){
					echo "<p>Deleted Book</p>";
					$findTitle=true;
					unset($book->title);
					unset($book->author);
					unset($book->year);
					unset($book[0][0]);
					break;
				}
		}
		}
	}
}
if($findTitle==false){
	echo "<p>Could not find given book in the library</p>";
} else{
$libraryfileedit->saveXML('libraries.xml');

$_SESSION = array();
session_destroy();
}

}
}

 ?>

            </html>