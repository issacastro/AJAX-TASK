<?php
include('db.php');

if(isset($_POST['id'])){
    $id= $_POST['id'];
    $title=$_POST['title'];
    $description=$_POST['description'];
    
    $query= "UPDATE task SET title= '$title', description='$description' WHERE id='$id'";
    $result=mysqli_query($conexion,$query);
       if(!$result){
        echo $result;
        die('Error al Editar');
       }
           echo 'Editado Existosamente';
}
?>