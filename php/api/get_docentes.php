<?php
include('configuration.php');

$query = "SELECT * FROM Docente";
$result = mysqli_query($connection, $query);

$docentes = array();

while ($row = mysqli_fetch_array($result)) {
    $id_persona = $row['id_persona'];
    $nivel_de_est = $row['nivel_de_est'];
    $esp = $row['especialidad'];
    $rol = $row['rol'];

    $docentes[] = array('id_persona' => $id_persona, 'nivel_de_est' => $nivel_de_est,
             'especialidad' => $esp, 'rol' => $rol);
}

$close = mysqli_close($connection)
or die("Ha sucedido un error inexperado en la desconexion de la base de datos");

$json_string = json_encode($docentes);
echo $json_string;
?>