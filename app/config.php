<?php
class Conexion
{
    public static function __dbConexion()
    {
        try {
            $con = new PDO("mysql:host=localhost;dbname=db_crudweb_roles", "charlie", "Charlie86*");
            return $con;
            //echo "Conectado";
        } catch (\Throwable $th) {
            die($th->getMessage());
        }
    }
}
//Conexion::__dbConexion();