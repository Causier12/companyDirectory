<?php
include('database.php');
$db=$connection;

$locationId = $_POST['locationId'];

$stmt = $db->prepare("DELETE location, department, personnel FROM location LEFT JOIN department ON location.id = department.locationID LEFT JOIN personnel ON department.id = personnel.departmentID
WHERE location.id = ?");
$stmt->bind_param('i', $locationId);
$stmt->execute();

mysqli_close($db);
?>