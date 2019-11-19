<?php
  include('configuration.php');

  $query = "SELECT * FROM Asignatura";
  $result = mysqli_query($connection,$query);
  header('Content-Type: application/json');
  echo json_encode($result);

  mysqli_close($connection);
 ?>
