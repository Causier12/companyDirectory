<?php
include('database.php');
$db=$connection;

$locationId = $_POST['locationId'];

$dependencies = $db->prepare("SELECT count(id) as pc FROM department WHERE locationID = ?");
$dependencies->bind_param("i", $locationId);
$dependencies->execute();

$getDependencies = $dependencies->get_result();
$locationDependencies = $getDependencies->fetch_assoc();

if (!$locationDependencies) {

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
    $output['data'] = $locationDependencies;

    echo json_encode($output);

mysqli_close($db);
?>