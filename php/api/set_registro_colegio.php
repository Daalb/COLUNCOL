<?php
    include('configuration.php');

    $dml= "INSERT INTO Registro_Colegio (id_colegio, id_curso, id_persona_docente, id_asignatura) 
            VALUES ('')";

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $dml . "<br>" . mysqli_error($conn);
    }    
?>