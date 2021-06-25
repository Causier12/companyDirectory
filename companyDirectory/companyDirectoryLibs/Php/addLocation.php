<?php
include('database.php');
$db=$connection;

$locationName = $_POST['locationName'];


$stmt = $db->prepare("INSERT into `location` (`name`) VALUES (?)");
$stmt->bind_param('s', $locationName);
$stmt->execute();

$lastId = $stmt->insert_id;

$getLocationQuery = $db->prepare("SELECT * FROM location WHERE location.id = ?");
$getLocationQuery->bind_param('i', $lastId);
$getLocationQuery->execute();

$getLocationQueryResult = $getLocationQuery->get_result();
$location = $getLocationQueryResult->fetch_assoc();
	
if (!$location) {

    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query failed";	
    $output['data'] = [];

    mysqli_close($db);

    echo json_encode($output); 

    exit;

}

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['data'] = $location;

mysqli_close($db);

echo json_encode($output); 
?>