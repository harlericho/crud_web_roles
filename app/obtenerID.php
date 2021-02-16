<?php
require_once "modelsusuario.php";
foreach (Modelsusuario::__obtenerUsuarioID($_POST['id']) as $key => $value) {
    $datos = array(
        'id_usuarios' => $value['id_usuarios'] ,
        'nombres' => $value['nombres'] , 
        'email' => $value['email'] , 
        'id_roles' => $value['id_roles'] ,  );
}
echo json_encode($datos);
