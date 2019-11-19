<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
  header("Allow: GET, POST, OPTIONS, PUT, DELETE");

  $db_host = 'coluncol_db_1';
  $db_username = 'coluncol';
  $db_password = 'coluncolpass';
  $db_schema = 'COLUNCOL';
  date_default_timezone_set("America/Bogota");

  /*$test = ['hola'];
  header('Content-Type: application/json');
  echo json_encode($test);*/
?>
