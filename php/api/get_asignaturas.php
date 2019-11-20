<?php
include('configuration.php');

$query = "SELECT * FROM Asignatura";
$result = mysqli_query($connection, $query);

$asignaturas = array();

while ($row = mysqli_fetch_array($result)) {
    $id = $row['id_asignatura'];
    $nombre = $row['nombre'];
    $horas = $row['Horas'];
    $area = $row['id_area'];

    $asignaturas[] = array('id_asignatura' => $id, 'nombre' => $nombre, 'Horas' => $horas, 'id_area' => $area);
}

$close = mysqli_close($connection)
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");

$json_string = json_encode($asignaturas);
echo $json_string;
?>