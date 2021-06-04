<?php
include('database.php');
$db=$connection;

$id = $_POST['id'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$department = $_POST['department'];
$departmentId = null;

if($department == "Human Resources"){
    $departmentId = 1;
} else if($department == "Sales"){
    $departmentId = 2;
} else if($department == "Marketing"){
    $departmentId = 3;
} else if($department == "Legal"){
    $departmentId = 4;
} else if($department == "Services"){
    $departmentId = 5;
} else if($department == "Research and Development"){
    $departmentId = 6;
} else if($department == "Product Management"){
    $departmentId = 7;
} else if($department == "Training"){
    $departmentId = 8;
} else if($department == "Support"){
    $departmentId = 9;
} else if($department == "Engineering"){
    $departmentId = 10;
} else if($department == "Accounting"){
    $departmentId = 11;
} else if($department == "Business Development"){
    $departmentId = 12;
}

$stmt = $db->prepare("UPDATE personnel
SET lastName = ?, 
email = ?, 
departmentID = ? WHERE (id = ?)");
$stmt->bind_param('ssii',  $lastName, $email, $departmentId, $id);
$stmt->execute();

mysqli_close($db);
?>