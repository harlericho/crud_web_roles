<?php
require_once "modelsusuario.php";

echo Modelsusuario::__eliminarUsuario($_POST['idEliminar']);
