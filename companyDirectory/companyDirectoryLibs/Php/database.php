<?php
    //open connection to mysql db
    $hostname = "haydencausier.co.uk.mysql";
    $username = "haydencausier_co_ukcompanydirectory";
    $password = "SpiderM@n123";
    $databaseName = "haydencausier_co_ukcompanydirectory";

    $connection = mysqli_connect($hostname, $username, $password, $databaseName);
    
    if(!$connection){
        die("Unable to Connect to Database: " . mysqli_connect_error());
    }
?>