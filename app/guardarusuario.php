<?php
require_once "modelsusuario.php";

$arrayName = array(
    'id_rol' => $_POST['rol'],
    'nombres' => strtoupper($_POST['nombre']),
    'email' => strtolower($_POST['email']),
);

echo Modelsusuario::__guardarUsuario($arrayName);
