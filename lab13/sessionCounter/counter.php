<?php
session_start();

$counter =1;
if (isset($_COOKIE['counter'])) {
    $counter = (int) $_COOKIE['counter'];
    $_SESSION['counter'] += 1;
}

$c = "counter";


/**
 * Set cookies using the setcookie() function
 *        name       value       expire        url */
setcookie('counter', $counter+1, time()+3600, '/');

echo "<p>You have been here $counter time(s) recently</p>";
echo "<p>You have been here $_SESSION[$c] time(s) recently</p>";
/**
 * Print the cookie associative array in a readable format
 */
print_r($_COOKIE);
print_r($_SESSION);