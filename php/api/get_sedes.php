<?php
    include('configuration.php');

    $query = "SELECT * FROM Sede";
    $result = mysqli_query($connection, $query);

    $sedes = array();

    while ($row = mysqli_fetch_array($result)) {
        $id_colegio = $row['id_colegio'];
        $num_sede = $row['num_sede'];
        $ubcación_geo = $row['ubcación_geo'];

        $sedes[] = array('id_colegio' => $id_colegio, 'num_sede' => $num_sede,
                'ubcación_geo' => $ubcación_geo);
    }

    $close = mysqli_close($connection)
    or die("Ha sucedido un error inexperado en la desconexion de la base de datos");

    $json_string = json_encode($sedes);
    echo $json_string;
?>