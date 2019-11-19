<<?php
  include('configuration.php');

  $connection = mysqli_connect($db_host,$db_username,$db_password,$db_schema);
  if (!$connection) {
      echo "Error: Unable to connect to MySQL." . PHP_EOL;
      echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
      echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
  exit;
  }
  $query = "INSERT INTO $_GET['nombre'] VALUES ()";
  $result = mysqli_query($connection,$query);

 ?>
