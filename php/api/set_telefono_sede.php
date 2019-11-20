<?php
    include('configuration.php');

    $dml= "INSERT INTO Telefono_Sede (id_telofono, num_telefono, tipo, id_colegio, num_sede) 
            VALUES ('')";

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $dml . "<br>" . mysqli_error($conn);
    }    
?>