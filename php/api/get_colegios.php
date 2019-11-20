<?php
    include('configuration.php');

    $query = "SELECT * FROM Colegio";
    $result = mysqli_query($connection, $query);

    $colegios = array();

    while ($row = mysqli_fetch_array($result)) {
        $id = $row['id_colegio'];
        $nom = $row['nombre'];
        $sg = $row['siglas'];
        $web = $row['pag_web'];
        $correo = $row['correo'];

        $colegios[] = array('id_colegio' => $id, 'nombre' => $nom, 'siglas' => $sg, 'pag_web' =>
        $web, 'correo' => $correo);
    }

    $close = mysqli_close($connection)
    or die("Ha sucedido un error inexperado en la desconexion de la base de datos");
    $json_string = json_encode($colegios);
    echo $json_string;
?>
