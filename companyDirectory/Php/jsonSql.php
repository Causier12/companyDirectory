<?php
    //open connection to mysql db
    $connection = mysqli_connect("haydencausier.co.uk.mysql", "haydencausier_co_ukcompanydirectory", "PassWord", "haydencausier_co_ukcompanydirectory") or die("Error " . mysqli_error($connection));
    //fetch table rows from mysql db
    $sql = "SELECT * FROM personnel";
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
    //create an array
    $employeeArray = array();
    while($row = mysqli_fetch_assoc($result)){
        $employeeArray[] = $row;
    }

    echo json_encode($employeeArray);
    //close the db connection
    mysqli_close($connection);
?>