<?php

$scriptList = array(
    'js/jquery-3.2.1.min.js',
	'js/Library.js',
	'js/LilIndex.js',
	'js/lilLibrary.js',
	'js/newLibraryValidator.js',
	'https://unpkg.com/leaflet@1.1.0/dist/leaflet.js'

);


/** 
 * Check to see if a string is composed entirely of the digits 0-9.
 * Note that this is different to checking if a string is numeric since
 * +/- signs and decimal points are not permitted.
 *
 * @param string $str The string to check.
 * @return True if $str is composed entirely of digits, false otherwise.
 */
function isDigits($str) {
  $pattern='/^[0-9]+$/';
  return preg_match($pattern, $str);
}
function isPositiveOrNegativeDigits($str) {
  $pattern='/^-?[0-9]\d*(\.\d+)?$/';
  return preg_match($pattern, $str);
}
function isDigitsFour($str){
	 $pattern='/^[1-9][0-9]{3}/';
	return preg_match($pattern, $str);
}


function noSymbols($str) {
  $pattern='/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/';
  return preg_match($pattern, $str);
}

function checkDistanceAndLongLat($addforlat, $addforlon){
	$lat1=(float)$addforlat;
	$lon1=(float)$addforlon;
	$lat2=-45.87418;
	$lon2=170.50366;	
	 $distance=distance($lat1,$lon1,$lat2,$lon2);
	 $distancerounded=round($distance,2);
	if($distance>50){
		echo "<p>The distance must be less than 50km from the octogon, currently $distancerounded km away</p>";
	}
	else{
		return true;
	}
	return false;
}
function distance($lat1,$lon1,$lat2,$lon2) {
    return 1.60934*(3958*3.1415926*sqrt(($lat2-$lat1)*($lat2-$lat1) + cos($lat2/57.29578)*cos($lat1/57.29578)*($lon2-$lon1)*($lon2-$lon1))/180); 
}

/**
 * Check to see if a string contains any content or not.
 * Leading and trailing whitespace are not considered to be 'content'.
 *
 * @param string $str The string to check.
 * @return True if $str is empty, false otherwise.
 */
function isEmpty($str) {
  return strlen(trim($str)) == 0;
}

/**
 * Check to see if a string looks like an email.
 * Email validation is actually fairly complex, so this is a thin wrapper
 * around a PHP filter function.
 *
 * @param string $str The string to check.
 * @return True if $str looks like a valid email address, false otherwise.
 */
function isEmail($str) {
  // There's a built in PHP tool that has a go at this
  return filter_var($str, FILTER_VALIDATE_EMAIL);
}

/**
 * Check to see if the length of a string is a given value, ignoring leading
 * and trailing whitespace.
 *
 * @param string $str The string to check.
 * @param integer $len The expected length of $str.
 * @return True if $str has length $len, false otherwise.
 */
function checkLength($str, $len) {
  return strlen(trim($str)) === $len;
}

 

function ordersXML($path) {
  return simplexml_load_file($path);
}

function displayOrder($orderXML) {

  foreach ($orderXML->order as $order) {
    echo "<h3>Order: </h3>";
    $name = $order->delivery->name;
    $email = $order->delivery->email;
    $address = $order->delivery->address;
    $city = $order->delivery->city;
    $postcode = $order->delivery->postcode;
    echo "<p>Name: $name</p>";
    echo "<p>Email: $email</p>";
    echo "<p>Address: $address</p>";
    echo "<p>City: $city</p>";
    echo "<p>Postcode: $postcode</p>";
    echo "<h4>Order Items: </h4>";
    foreach ($order->items->item as $item) {
      echo "<p>Item: $item->title</p>";
      echo "<p>Price: $item->price</p>";
    }
    echo "<hr>";
  }
}