<?php
include('configuration.php');

$query = "SELECT * FROM Estudiante";
$result = mysqli_query($connection, $query);

$estudiantes = array();

while ($row = mysqli_fetch_array($result)) {
    $id_est= $row['id_persona'];
    $fecha_nacimiento = $row['fecha_nacimiento'];
    $id_reportemedico = $row['id_reportemedico'];
    $id_curso = $row['id_curso'];

    $estudiantes[] = array('id_persona' => $id_persona, 'fecha_nacimiento' => $fecha_nacimiento,
             'id_reportemedico' => $id_reportemedico, 'id_curso' => $id_curso);
}

$close = mysqli_close($connection)
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");

$json_string = json_encode($estudiantes);
echo $json_string;
?>