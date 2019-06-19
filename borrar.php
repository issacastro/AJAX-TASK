<?php
include('db.php');

if(isset($_POST['id'])){
    $id=$_POST['id'];
    $query= "DELETE FROM task WHERE id = $id";
    $result=mysqli_query($conexion,$query);
       if(!$result){
        echo $result;
        die("Error al Borrar");
       }
           echo 'Borrado Existosamente';
}
?>