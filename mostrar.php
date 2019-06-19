<?php
include('db.php');

$query= "SELECT * FROM task";
$result= mysqli_query($conexion,$query);
if(!$result){
    die('Fallo en la consulta'). mysqli_error($conexion);
}
$json = array();
while($row = mysqli_fetch_array($result)){
    $json[]=array('id' => $row['id'],'title' => $row['title'],'description' => $row['description'],'date' => $row['date']);
}
$jsonstring = json_encode($json);
echo $jsonstring;
?>