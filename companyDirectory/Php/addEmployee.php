<?php
include('database.php');
$db=$connection;

$id = $_POST['id'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$department = $_POST['department'];
$email = $_POST['email'];
$departmentId = null;
$jobTitle = " ";

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

$stmt = $db->prepare("INSERT into personnel (id, firstName, lastName, jobTitle, email, departmentID) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param('issssi', $id, $firstName, $lastName, $jobTitle, $email, $departmentId);
$stmt->execute();

mysqli_close($db);
?>