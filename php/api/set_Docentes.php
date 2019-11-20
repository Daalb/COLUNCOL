<?php
    include('configuration.php');

    $dml= "INSERT INTO Docente (id_persona, nivel_de-est, especialidad, rol) 
            VALUES ('')";

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $dml . "<br>" . mysqli_error($conn);
    }    
?>