<?php
include('database.php');
$db=$connection;

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$jobTitle = " ";
$departmentId = $_POST['departmentId']; 
$departmentId = +$departmentId;

$stmt = $db->prepare("INSERT into personnel (firstName, lastName, jobTitle, email, departmentID) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param('ssssi', $firstName, $lastName, $jobTitle, $email, $departmentId);
$stmt->execute();

$lastId = $stmt->insert_id;

//Select user object and return to front end
$getUserQuery = $db->prepare("SELECT p.departmentID, p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, l.name as location FROM personnel p LEFT JOIN department d ON d.id = p.departmentID LEFT JOIN location l ON l.id = d.locationID WHERE p.id = ?");
$getUserQuery->bind_param('i', $lastId);
$getUserQuery->execute();

$getUserQueryResult = $getUserQuery->get_result();
$user = $getUserQueryResult->fetch_assoc();
	
if (!$user) {

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
$output['data'] = $user;

mysqli_close($db);

echo json_encode($output); 
?>