<?php
include('database.php');
$db=$connection;

$departmentId = $_POST['departmentId'];
$departmentName = $_POST['departmentName'];
$departmentLocation = $_POST['departmentLocationId'];

$stmt = $db->prepare("UPDATE department SET name = ?, locationID = ? WHERE id = ?");
$stmt->bind_param('sii', $departmentName, $departmentLocation,  $departmentId);
$stmt->execute();

//Select user object and return to front end
$getUpdatedDepartmentQuery = $db->prepare("SELECT d.id, d.name, l.name as location FROM department d LEFT JOIN location l ON d.locationID = l.id WHERE d.id = ?");
$getUpdatedDepartmentQuery->bind_param('i', $departmentId);
$getUpdatedDepartmentQuery->execute();

$getUpdatedDepartmentQueryResult = $getUpdatedDepartmentQuery->get_result();
$updatedDepaertment = $getUpdatedDepartmentQueryResult->fetch_assoc();
	
if (!$updatedDepaertment) {

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
$output['data'] = $updatedDepaertment;

mysqli_close($db);

echo json_encode($output);

?>