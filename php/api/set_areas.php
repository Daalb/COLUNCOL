<?php
    include('configuration.php');

    $dml= "INSERT INTO Area (id_area, nombre, id_director, id_colegio) 
            VALUES ('')";

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $dml . "<br>" . mysqli_error($conn);
    }    
?>