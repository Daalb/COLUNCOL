<?php
    include('configuration.php');

    $dml= "INSERT INTO Colegio (id_colegio, nombre,siglas, pag_web, correo,id_registro) 
            VALUES ('')";

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $dml . "<br>" . mysqli_error($conn);
    }    
?>