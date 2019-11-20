<?php
include('configuration.php');

$query = "SELECT * FROM Salon";
$result = mysqli_query($connection, $query);

$salones = array();

while ($row = mysqli_fetch_array($result)) {
    $id_salon = $row['id_salon'];
    $capacidad = $row['capacidad'];
    $id_colegio = $row['id_colegio'];

    $salones[] = array('id_salon' => $id_salon, 'capacidad' => $capacidad,
             'id_colegio' => $id_colegio);
}

$close = mysqli_close($connection)
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");

$json_string = json_encode($salones);
echo $json_string;
?>