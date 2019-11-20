<?php
    include('configuration.php');

    $dml= "INSERT INTO Docente (id_persona, nivel_de_est, especialidad, rol) 
            VALUES ('$_GET["id_persona"]','$_GET["nivel_de_est"]','$_GET["especialidad"]','$_GET["rol"]');

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $dml . "<br>" . mysqli_error($conn);
    }    
?>