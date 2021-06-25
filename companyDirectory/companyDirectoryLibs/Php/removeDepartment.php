<?php

$executionStartTime = microtime(true);

include('database.php');
$db=$connection;

$departmentId = $_POST['departmentId'];

$stmt = $db->prepare("DELETE FROM department WHERE department.id = ?");
$stmt->bind_param('i', $departmentId);
$stmt->execute();

$department = $stmt->get_result();
$deletedDepartment = $department->fetch_assoc();

if (!$deletedDepartment) {

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
    $output['data'] = $deletedDepartment;

    echo json_encode($output);

mysqli_close($db);
?>