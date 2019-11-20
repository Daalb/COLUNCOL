<?php
    include('configuration.php');

    $dml= "INSERT INTO Area (id_area, nombre, id_director, id_colegio) 
            VALUES ('$GET["id_area"]','$GET["nombre"]','$GET["id_director"]','$GET["id_colegio"]')";

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $dml . "<br>" . mysqli_error($conn);
    }    
?>