<?php
    include('configuration.php');

    $dml= "INSERT INTO Salon (id_salon, capacidad, id_coelgio) 
            VALUES ('$_GET["id_salon"]', '$_GET["capacidad"]'. '$_GET["id_colegio"]')";

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $dml . "<br>" . mysqli_error($conn);
    }    
?>