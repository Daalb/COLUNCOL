<?php
include('configuration.php');
header('Content-Type: application/json');

$query = "SELECT * FROM Persona";
$result = mysqli_query($connection, $query);

$array = array();

while ($row = mysqli_fetch_array($result)) {
    $id = $row['id_persona'];
    $nombre = $row['nombre1'];

    $array[] = array('id_persona' => $id, 'nombre1' => $nombre);
}

$close = mysqli_close($connection)
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");

$json_string = json_encode($array);
echo $json_string;
