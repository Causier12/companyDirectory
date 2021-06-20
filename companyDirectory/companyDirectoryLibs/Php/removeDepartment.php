<?php
include('database.php');
$db=$connection;

$departmentId = $_POST['departmentId'];

$stmt = $db->prepare("DELETE FROM department WHERE department.id = ?");
$stmt->bind_param('i', $departmentId);
$stmt->execute();

mysqli_close($db);
?>