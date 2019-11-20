<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
  header("Allow: GET, POST, OPTIONS, PUT, DELETE");
  header('Content-Type: application/json');

  $db_host = 'coluncol_db_1';
  $db_username = 'coluncol';
  $db_password = 'coluncolpass';
  $db_schema = 'COLUNCOL';
  date_default_timezone_set("America/Bogota");

  $connection = mysqli_connect($db_host,$db_username,$db_password,$db_schema);
  if (!$connection) {
      echo "Error: Unable to connect to MySQL." . PHP_EOL;
      echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
      echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
  exit;
  }

  /*$test = ['hola'];
  header('Content-Type: application/json');
  echo json_encode($test);*/
?>
