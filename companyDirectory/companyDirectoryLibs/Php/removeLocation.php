<?php
include('database.php');
$db=$connection;

$locationId = $_POST['locationId'];

$stmt = $db->prepare("DELETE FROM location WHERE location.id = ?");
$stmt->bind_param('i', $locationId);
$stmt->execute();

mysqli_close($db);
?>