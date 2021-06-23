<?php
    //open connection to mysql db
    $connection = mysqli_connect("haydencausier.co.uk.mysql", "haydencausier_co_ukcompanydirectory", "SpiderM@n123", "haydencausier_co_ukcompanydirectory") or die("Error " . mysqli_error($connection));
    //fetch table rows from mysql db
    $sql = "SELECT d.id, d.name, l.name as location FROM department d LEFT JOIN location l ON (d.locationID = l.id)";
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
    //create an array
    $departmentArray = array();
    while($row = mysqli_fetch_assoc($result)){
        $departmentArray[] = $row;
    }

    echo json_encode($departmentArray);
    //close the db connection
    mysqli_close($connection);
?>