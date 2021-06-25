<?php

$executionStartTime = microtime(true);

include('database.php');
$db=$connection;

$locationId = $_POST['locationId'];

$stmt = $db->prepare("DELETE FROM location WHERE location.id = ?");
$stmt->bind_param('i', $locationId);
$stmt->execute();

$getDependencies = $stmt->get_result();
$locationDependencies = $getDependencies->fetch_assoc();

if (!$locationDependencies) {

    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query failed";	
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];

    mysqli_close($db);

    echo json_encode($output); 

    exit;

}

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = $locationDependencies;

    echo json_encode($output);

mysqli_close($db);
?>