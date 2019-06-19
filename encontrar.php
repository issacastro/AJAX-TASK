<?php 
include('db.php');
$buscar=$_POST['buscar'];

if(!empty($buscar)){

    $query ="SELECT * FROM task WHERE title ='$buscar' OR id='$buscar'" ;
    $request = mysqli_query($conexion,$query);
    if(!$request){
        die('Fallo en la Consulta');
        echo 'No se Encontro el Resultado';
    }
    $json = array();
     while($row = mysqli_fetch_array($request)){
         $json[]=array('id' => $row['id'],'title' => $row['title'],'description' => $row['description'],'date' => $row['date']);
     }
     $jsonstring = json_encode($json);
     echo $jsonstring;
         
}



?>