<?php
    include('configuration.php');

    $dml= "INSERT INTO Asignatura (id_asignatura, nombre, Horas, id_areas) 
            VALUES ('$_GET["id_asignatura"]','$_GET["nombre"]','$_GET["Horas"]','$_GET["id_areas"]');

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $dml . "<br>" . mysqli_error($conn);
    }    
?>
  