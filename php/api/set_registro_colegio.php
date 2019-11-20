<?php
    include('configuration.php');

    $dml= "INSERT INTO `COLUNCOL`.`Registro_Colegio` (``) 
            VALUES ('')";

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $dml . "<br>" . mysqli_error($conn);
    }    
?>