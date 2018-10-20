<?php
$currentPage = basename($_SERVER['PHP_SELF']);
?>

    <?php
    if (isset($scriptList) && is_array($scriptList)) {
        foreach ($scriptList as $script) {
            echo "<script src='$script'></script>";
        }
    }
    ?>

<head>
    <meta charset="utf-8">
    <title>Lilliput Libraries (Dunedin,NZ): Home</title>
    <link rel="stylesheet" href="style.css">

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.1.0/dist/leaflet.css"
          integrity="sha512-wcw6ts8Anuw10Mzh9Ytw4pylW8+NAD4ch3lqm9lzAsTxg0GFeJgoAtxuCLREZSC5lUXdVyo/7yfsqFjQ4S+aKw=="
          crossorigin="" />


</head>
<body style="text-align:center">
<div id="content">
 <h1>COSC212 Assignment</h1>