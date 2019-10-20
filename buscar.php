<?php 
include('db.php');

 $buscar= $_POST['buscar'];
 $user= $_POST['user'];

 if(!empty($buscar)){
     $query ="SELECT *FROM task WHERE title LIKE '$buscar%' AND user = '$user'" ;
     $response = mysqli_query($conexion,$query);
     if(!$response){
         die('Error de Consulta'. mysqli_error('$conexion'));
     }
     $json = array();
     while($row = mysqli_fetch_array($response)){
         $json[]=array('title' => $row['title'],'description' => $row['description'],'date' => $row['date']);
     }
     $jsonstring = json_encode($json);
     echo $jsonstring;
 }
?>