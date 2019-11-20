<?php
include('configuration.php');

$query = "SELECT * FROM Registro_Colegio";
$result = mysqli_query($connection, $query);

$colegios = array();

while ($row = mysqli_fetch_array($result)) {
    $id = $row['id_Registro'];
    $estado = $row['estado'];
    $f_asig = $row['fecha_asig'];
    $f_fin = $row['fecha_fin'];
    $renovacion = $row['renovacion'];

    $colegios[] = array('id_registro' => $id, 'estado' => $estado, 'fecha_asig' => $f_asig, 'fecha_fin' => $f_fin, 'renovacion' => $renovacion);
}

$close = mysqli_close($connection)
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");

$json_string = json_encode($colegios);
echo $json_string;
