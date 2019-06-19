<?php
include('db.php');

if(isset($_POST['title'])){
    $title=$_POST['title'];
    $description=$_POST['description'];
    
    $query= "INSERT INTO task(title,description) VALUES('$title','$description')";
    $result=mysqli_query($conexion,$query);
       if(!$result){
        echo $result;
        die("Error al Insertar");
       }
           echo 'Guardado Existosamente';
}
?>