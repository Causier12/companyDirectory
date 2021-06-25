<?php
include('database.php');
$db=$connection;

$departmentId = $_POST['departmentId'];

$dependencies = $db->prepare("SELECT count(id) as pc FROM personnel WHERE departmentID = ?");
$dependencies->bind_param("i", $departmentId);
$dependencies->execute();

$getDependencies = $dependencies->get_result();
$departmentDependencies = $getDependencies->fetch_assoc();

if (!$departmentDependencies) {

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
    $output['data'] = $departmentDependencies;

    echo json_encode($output);

mysqli_close($db);
?>