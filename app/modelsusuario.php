<?php
require_once "config.php";
class Modelsusuario extends Conexion
{
    public static function __listadoRol()
    {
        try {
            $sql = "call procedure_list_roles";
            $query = Conexion::__dbConexion()->prepare($sql);
            $query->execute();
            return $query->fetchAll(PDO::FETCH_OBJ);
        } catch (\Throwable $th) {
            die($th->getMessage());
        }
    }

    public static function __datoRepetidoroles($nombre)
    {
        try {
            $sql = "call procedure_datarepeat_roles(:nombres)";
            $query = Conexion::__dbConexion()->prepare($sql);
            $query->bindParam(":nombres", $nombre, PDO::PARAM_STR);
            $query->execute();
            return $query->fetchAll();
        } catch (\Throwable $th) {
            die($th->getMessage());
        }
    }

    public static function __guardarRoles($data)
    {
        try {
            $sql = "call procedure_insert_roles(:nombres)";
            $query = Conexion::__dbConexion()->prepare($sql);
            $query->bindParam(":nombres", $data['nombres'], PDO::PARAM_STR);
            return $query->execute();
        } catch (\Throwable $th) {
            die($th->getMessage());
        }
    }
    public static function __eliminarRol($id)
    {
        try {
            $sql = "call procedure_delete_roles(:id)";
            $query = Conexion::__dbConexion()->prepare($sql);
            $query->bindParam(":id", $id, PDO::PARAM_INT);
            $query->execute();
            return $query->fetchAll();
        } catch (\Throwable $th) {
            die($th->getMessage());
        }
    }
    /*------------------*/
    public static function __guardarUsuario($data)
    {
        try {
            $sql = "call procedure_insert_usuarios(:nombres,:email,:id_rol)";
            $query = Conexion::__dbConexion()->prepare($sql);
            $query->bindParam(":nombres", $data['nombres'], PDO::PARAM_STR);
            $query->bindParam(":email", $data['email'], PDO::PARAM_STR);
            $query->bindParam(":id_rol", $data['id_rol'], PDO::PARAM_INT);
            return $query->execute();
        } catch (\Throwable $th) {
            die($th->getMessage());
        }
    }

    public static function __modificarUsuario($data)
    {
        try {
            $sql = "call procedure_update_usuarios(:nombres,:email,:id_rol,:id_usuarios)";
            $query = Conexion::__dbConexion()->prepare($sql);
            $query->bindParam(":nombres", $data['nombres'], PDO::PARAM_STR);
            $query->bindParam(":email", $data['email'], PDO::PARAM_STR);
            $query->bindParam(":id_rol", $data['id_rol'], PDO::PARAM_INT);
            $query->bindParam(":id_usuarios", $data['id_usuarios'], PDO::PARAM_INT);
            return $query->execute();
        } catch (\Throwable $th) {
            die($th->getMessage());
        }
    }


    public static function __listadoUsuario()
    {
        try {
            $sql = "call procedure_list_usuarios";
            $query = Conexion::__dbConexion()->prepare($sql);
            $query->execute();
            return $query->fetchAll(PDO::FETCH_OBJ);
        } catch (\Throwable $th) {
            die($th->getMessage());
        }
    }

    public static function __obtenerUsuarioID($id)
    {
        try {
            $sql = "call procedure_id_usuarios(:id)";
            $query = Conexion::__dbConexion()->prepare($sql);
            $query->bindParam(":id", $id, PDO::PARAM_INT);
            $query->execute();
            return $query->fetchAll();
        } catch (\Throwable $th) {
            die($th->getMessage());
        }
    }

    public static function __eliminarUsuario($id)
    {
        try {
            $sql = "call procedure_delete_usuarios(:id)";
            $query = Conexion::__dbConexion()->prepare($sql);
            $query->bindParam(":id", $id, PDO::PARAM_INT);
            $query->execute();
            return $query->fetchAll();
        } catch (\Throwable $th) {
            die($th->getMessage());
        }
    }
}
