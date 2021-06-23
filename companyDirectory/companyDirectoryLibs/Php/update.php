<?php
include('database.php');
$db=$connection;

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$departmentId = $_POST['departmentId'];

$stmt = $db->prepare("UPDATE personnel SET lastName = ?, email = ?, departmentID = ? WHERE firstName = ?");
$stmt->bind_param('ssis',  $lastName, $email, $departmentId, $firstName);
$stmt->execute();

//Select user object and return to front end
$getUpdatedUserQuery = $db->prepare("SELECT p.departmentID, p.lastName, p.firstName, p.email, p.id, d.name as department, l.name as location FROM personnel p LEFT JOIN department d ON d.id = p.departmentID LEFT JOIN location l ON l.id = d.locationID WHERE p.firstName = ?");
$getUpdatedUserQuery->bind_param('s', $firstName);
$getUpdatedUserQuery->execute();

$getUpdatedUserQueryResult = $getUpdatedUserQuery->get_result();
$updatedUser = $getUpdatedUserQueryResult->fetch_assoc();
	
if (!$updatedUser) {

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
$output['data'] = $updatedUser;

mysqli_close($db);

echo json_encode($output);

?>