<?php
    //open connection to mysql db
    $connection = mysqli_connect("haydencausier.co.uk.mysql", "haydencausier_co_ukcompanydirectory", "SpiderM@n123", "haydencausier_co_ukcompanydirectory") or die("Error " . mysqli_error($connection));
    //fetch table rows from mysql db
    $sql = "SELECT * FROM `location`";
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
    //create an array
    $locationArray = array();
    while($row = mysqli_fetch_assoc($result)){
        $locationArray[] = $row;
    }

    echo json_encode($locationArray);
    //close the db connection
    mysqli_close($connection);
?>