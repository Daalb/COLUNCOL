<?php
  include('configuration.php');
  header('Content-Type: application/json');

  $query = "SELECT * FROM Area";
  $result = mysqli_query($connection,$query);

  $areas = array();

  while($row = mysqli_fetch_array($result)) 
  { 
      $id=$row['id_area'];
      $nombre=$row['nombre'];
      $director=$row['id_director'];
      $colegio=$row['id_colegio'];

      $areas[] = array('id_area'=> $id, 'nombre'=> $nombre, 'id_director'=> $director, 'id_colegio'=> $colegio);

  }

  $close = mysqli_close($conexion) 
  or die("Ha sucedido un error inexperado en la desconexion de la base de datos");
    
  $json_string = json_encode($asignauras);
  echo $json_string;
 ?>
