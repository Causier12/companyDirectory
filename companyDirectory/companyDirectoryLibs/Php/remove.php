<?php
include('database.php');
$db=$connection;

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];

$stmt = $db->prepare("DELETE from personnel WHERE (firstName = ? && lastName = ?)");
$stmt->bind_param('ss', $firstName, $lastName);
$stmt->execute();

mysqli_close($db);
?>