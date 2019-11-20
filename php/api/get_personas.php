<?php
include('configuration.php');

$query = "SELECT * FROM Persona";
$result = mysqli_query($connection, $query);

$array = array();

while ($row = mysqli_fetch_array($result)) {
    $id = $row['id_persona'];
    $nombre1 = $row['nombre1'];
    $nombre2 = $row['nombre2'];
    $apell1 = $row['apellido1'];
    $apellido2 = $row['apellido2'];
    $sexo = $row['sexo'];

    $array[] = array('id_persona' => $id, 'nombre1' => $nombre1, 'nombre2' => $nombre2,
    'apellido1' => $apell1, 'apellido2' => $apellido2, 'sexo' => $sexo);
}

$close = mysqli_close($connection)
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");

$json_string = json_encode($array);
echo $json_string;

?>