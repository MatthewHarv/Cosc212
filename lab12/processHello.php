<?php

/**
 * Simple function that processes a form
 * @param $get
 */
function displayForm($get){
    $formOK = false;
    //html snippet for form
    $formHTML = '<form action="processHello.php" method="GET" enctype="application/x-www-form-urlencoded">
                    <input type="text" name="user">
                    <input type="submit" name="submit" value="submit">
                </form>';

    if (strlen(trim($get['user'])) > 0) {
        if (isValidUserName($get['user'])) {
            $formOK = true;
            echo "<p>Hello ".htmlentities($get['user'])."</p>";
        }
    }
    if(!$formOK) {
        echo "<p>User name '".htmlentities($get['user'])."' is not valid</p>";
        echo $formHTML;
    }
}

/**
 * @param $str string to check if valid username
 * @return int value determining if input $str is valid
 */
function isValidUserName($str) {
    $pattern = '/^[A-Za-z0-9_]+$/';
    return preg_match($pattern, $str);
}

// Execute script and call appropriate functions
if (!isset($_GET['user'])) {
    header("Location: helloForm.html");
    die();
} else {
    displayForm($_GET);
}
