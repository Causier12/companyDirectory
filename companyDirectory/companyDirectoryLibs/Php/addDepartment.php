<?php
include('database.php');
$db=$connection;

$departmentName = $_POST['departmentName'];
$locationId = $_POST['locationId'];


$stmt = $db->prepare("INSERT into department (`name`, locationID) VALUES (?, ?)");
$stmt->bind_param('si', $departmentName, $locationId);
$stmt->execute();

$lastId = $stmt->insert_id;

//Select user object and return to front end
$getDepartmentQuery = $db->prepare("SELECT d.id, d.name, l.name as location FROM department d LEFT JOIN location l ON d.locationID = l.id WHERE d.id = ?");
$getDepartmentQuery->bind_param('i', $lastId);
$getDepartmentQuery->execute();

$getDepartmentQueryResult = $getDepartmentQuery->get_result();
$department = $getDepartmentQueryResult->fetch_assoc();
	
if (!$department) {

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
$output['data'] = $department;

mysqli_close($db);

echo json_encode($output); 

?>