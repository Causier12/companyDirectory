<?php
include('database.php');
$db=$connection;

$departmentId = $_POST['departmentId'];

$stmt = $db->prepare("DELETE FROM department, personnel USING department LEFT JOIN personnel on department.id = personnel.departmentID WHERE department.id = ?");
$stmt->bind_param('i', $departmentId);
$stmt->execute();

mysqli_close($db);
?>