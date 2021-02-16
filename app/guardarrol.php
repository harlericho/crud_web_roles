<?php
require_once "modelsusuario.php";
$arrayName = array('nombres' => strtoupper($_POST['nombre']),);
if (Modelsusuario::__datoRepetidoroles(strtoupper($_POST['nombre']))) {
    echo 0;
} else {
    echo Modelsusuario::__guardarRoles($arrayName);
}
