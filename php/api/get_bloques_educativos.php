<?php
include('configuration.php');

$query = "SELECT * FROM Bolques_Educativos";
$result = mysqli_query($connection, $query);

$Bloques_Educativos = array();

while ($row = mysqli_fetch_array($result)) {
    $id_slot = $row['id_slot'];
    $hora_inicio = $row['hora_inicio'];
    $hora_fin = $row['hora_fin'];
    $tipo = $row['tipo'];

    $Bloques_Educativos[] = array('id_slot' => $id_slot, 'hora_inicio' => $hora_inicio, 'hora_fin' => $hora_fin,
                         'tipo' => $tipo);
}

$close = mysqli_close($connection)
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");

$json_string = json_encode($Bloques_Educativos);
echo $json_string;

?>