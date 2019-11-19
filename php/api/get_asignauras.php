<<?php
  include('configuration.php');
  
  $query = "SELECT * FROM Asignatura";
  $result = mysqli_query($connection,$query);
  header('Content-Type: application/json');
  echo json_encode($test);

  mysqli_close($connection);
 ?>
