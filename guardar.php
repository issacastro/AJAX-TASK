<?php
include('db.php');

if(isset($_POST['title'])){
    $title=$_POST['title'];
    $description=$_POST['description'];
    $user=$_POST['user'];
    $query= "INSERT INTO task(title,description,user) VALUES('$title','$description','$user')";
    $result=mysqli_query($conexion,$query);
       if(!$result){
        echo $result;
        die("Error al Insertar");
       }
           echo 'Guardado Existosamente';
}
?>