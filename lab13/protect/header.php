<?php
$currentPage = basename($_SERVER['PHP_SELF']);
?>
<head>
    <title>Classic Cinema</title>
    <link rel="stylesheet" href="style.css">
    <meta charset="utf-8">
    <?php
    if (isset($scriptList) && is_array($scriptList)) {
        foreach ($scriptList as $script) {
            echo "<script src='$script'></script>";
        }
    }
    ?>
</head>

<body>

<header>
    <h1>Classic Cinema</h1>
</header>

<div id="user">
    <div id="login">
        <form id="loginForm">
            <label for="loginUser">Username: </label>
            <input type="text" name="loginUser" id="loginUser">
            <label for="loginPassword">Password: </label>
            <input type="password" name="loginPassword" id="loginPassword">
            <input type="submit" id="loginSubmit" value="Login">
        </form>
    </div>

    <div id="logout">
        <p>Welcome, <span id="logoutUser"></span></p>
        <form id="logoutForm">
            <input type="submit" id="logoutSubmit" value="Logout">
        </form>
    </div>
</div>

<nav>

    <ul>
        <?php
        $navList = array(
            "Home" => "index.php",
            "Classics" => "classic.php",
            "Science Fiction and Horror" => "scifi.php",
            "Alfred Hitchcock" => "hitchcock.php",
            "Checkout" => "checkout.php"
        );
        foreach ($navList as $text => $href){
            if($href === basename($_SERVER['PHP_SELF']) ){
                echo "<li>$text";
            } else {
                echo "<li> <a href='$href'>$text</a>";
            }

        }
        ?>
    </ul>
</nav>

