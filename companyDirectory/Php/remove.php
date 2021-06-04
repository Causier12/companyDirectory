<?php
include('database.php');
$db=$connection;

$id = $_POST['id'];

$stmt = $db->prepare("DELETE from personnel WHERE (id = ?)");
$stmt->bind_param('i', $id);
$stmt->execute();

mysqli_close($db);
?>