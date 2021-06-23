<?php
include('database.php');
$db=$connection;

$departmentId = $_POST['departmentId'];

$dependencies = $db->prepare("SELECT count(id) as pc FROM personnel WHERE departmentID = ?");
$dependencies->bind_param("i", $departmentId);
$dependencies->execute();

$getDependencies = $dependencies->get_result();
$depaertmentDependencies = $getDependencies->fetch_assoc();

if (!$depaertmentDependencies) {

    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query failed";	
    $output['data'] = [];

    mysqli_close($db);

    echo json_encode($output); 

    exit;

} else if ($depaertmentDependencies['pc'] === 0){
    $stmt = $db->prepare("DELETE FROM department WHERE department.id = ?");
    $stmt->bind_param('i', $departmentId);
    $stmt->execute();
    
    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['data'] = $depaertmentDependencies;

    echo json_encode($output);
    
    mysqli_close($db);
    
    exit;
}

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['data'] = $depaertmentDependencies;

    echo json_encode($output);

mysqli_close($db);
?>