<?php

$executionStartTime = microtime(true);

include('database.php');
$db=$connection;

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];

$stmt = $db->prepare("DELETE from personnel WHERE (firstName = ? && lastName = ?)");
$stmt->bind_param('ss', $firstName, $lastName);
$stmt->execute();

$deleteEmployee = $stmt->get_result();
$deletedEmployee = $deleteEmployee->fetch_assoc();

if (!$deletedEmployee) {

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
    $output['data'] = $deletedEmployee;

    echo json_encode($output);

mysqli_close($db);
?>