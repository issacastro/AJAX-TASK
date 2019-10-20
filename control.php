<?php

include('db.php');
if(isset($_POST['User']) && !empty($_POST['User'])) {
    $User=json_decode($_POST['User']);
    $usr= $User->{'username'};
    $pass = $User->{'Password'};
    $query = "SELECT * FROM usuarios WHERE user = '$usr'  AND password = '$pass' ";
    $response = mysqli_query($conexion,$query);
    if(!$response){
        die('Error de Consulta'. mysqli_error($conexion));
    }
    if($row = mysqli_fetch_array($response) >0){
        echo 'YES';
    }else{
        echo 'NO';
    }
    
        
}

?>