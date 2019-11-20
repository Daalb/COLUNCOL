<?php
include('configuration.php');

$query = "SELECT * FROM Colegio";
$result = mysqli_query($connection, $query);

$colegios = array();

while ($row = mysqli_fetch_array($result)) {
    $id = $row['id_colegio'];
    $Nombre = $row['nombre'];
    $sg = $row['siglas'];
    $web = $row['pag_web'];
    $correo = $row['correo'];
    $registro = $row['id_registro'];

    $colegios[] = array('id_colegio' => $id, 'nombre' => $Nombre, 'siglas' => $sg, 'pag_web' => $web, 'correo' => $correo, 'id_registro' => $registro);
}

$close = mysqli_close($connection)
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");

$json_string = json_encode($colegios);
echo $json_string;
