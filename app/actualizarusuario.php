<?php
require_once "modelsusuario.php";
$arrayName = array(
    'id_usuarios' => $_POST['id'],
    'nombres' => strtoupper($_POST['nombre']),
    'email' => strtolower($_POST['email']),
    'id_rol' => $_POST['rol'],
);
echo Modelsusuario::__modificarUsuario($arrayName);
