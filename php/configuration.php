<?php
    $db_host = 'webservice_db_1';
    $db_username = 'root';
    $db_password = 'password';
    $db_schema = 'universidad';
    date_default_timezone_set("America/Bogota");

    $test = ['hola'];
    header('Content-Type: application/json');
    echo json_encode($test);

?>
