-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.17-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for db_crudweb_roles
CREATE DATABASE IF NOT EXISTS `db_crudweb_roles` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `db_crudweb_roles`;

-- Dumping structure for procedure db_crudweb_roles.procedure_datarepeat_roles
DELIMITER //
CREATE PROCEDURE `procedure_datarepeat_roles`(
IN cadena varchar(45)
)
BEGIN
select * from roles where nombres=cadena;
END//
DELIMITER ;

-- Dumping structure for procedure db_crudweb_roles.procedure_delete_roles
DELIMITER //
CREATE PROCEDURE `procedure_delete_roles`(
IN id_rol int(11)
)
BEGIN
update roles set estado = 'I' where id_roles=id_rol;
END//
DELIMITER ;

-- Dumping structure for procedure db_crudweb_roles.procedure_delete_usuarios
DELIMITER //
CREATE PROCEDURE `procedure_delete_usuarios`(
IN id_usu int(11)
)
BEGIN
update usuarios set estado = 'I' where id_usuarios=id_usu;
END//
DELIMITER ;

-- Dumping structure for procedure db_crudweb_roles.procedure_id_usuarios
DELIMITER //
CREATE PROCEDURE `procedure_id_usuarios`(IN id_usuario int(11))
BEGIN
select u.id_usuarios,u.nombres,u.email,r.nombres as roles,r.id_roles from usuarios as u
join roles as r on u.id_rol=r.id_roles
where u.id_usuarios=id_usuario;
END//
DELIMITER ;

-- Dumping structure for procedure db_crudweb_roles.procedure_insert_roles
DELIMITER //
CREATE PROCEDURE `procedure_insert_roles`(
IN nombre varchar(45)
)
BEGIN
insert into roles (nombres) values(nombre);
END//
DELIMITER ;

-- Dumping structure for procedure db_crudweb_roles.procedure_insert_usuarios
DELIMITER //
CREATE PROCEDURE `procedure_insert_usuarios`(
IN nombres varchar(45), IN email varchar(45), in id_rol int(11))
BEGIN
insert into usuarios(nombres,email,id_rol) values(nombres,email,id_rol);
END//
DELIMITER ;

-- Dumping structure for procedure db_crudweb_roles.procedure_list_roles
DELIMITER //
CREATE PROCEDURE `procedure_list_roles`()
BEGIN
select r.id_roles, r.nombres from roles as r
where r.estado='A';
END//
DELIMITER ;

-- Dumping structure for procedure db_crudweb_roles.procedure_list_usuarios
DELIMITER //
CREATE PROCEDURE `procedure_list_usuarios`()
BEGIN
select u.id_usuarios, u.nombres,u.email,r.nombres as roles from usuarios as u
join roles as r on u.id_rol=r.id_roles
where u.estado='A';
END//
DELIMITER ;

-- Dumping structure for procedure db_crudweb_roles.procedure_rol
DELIMITER //
CREATE PROCEDURE `procedure_rol`()
BEGIN
select r.id_roles, r.nombres from roles as r;
END//
DELIMITER ;

-- Dumping structure for procedure db_crudweb_roles.procedure_update_usuarios
DELIMITER //
CREATE PROCEDURE `procedure_update_usuarios`(
in nombresusu varchar(45), in emailusu varchar(45), in id_rolusu int(11), in id_usu int(11)
)
BEGIN
update usuarios set nombres=nombresusu, email=emailusu, id_rol=id_rolusu
where id_usuarios=id_usu;
END//
DELIMITER ;

-- Dumping structure for table db_crudweb_roles.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id_roles` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(45) NOT NULL,
  `fecha_c` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` char(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_roles`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table db_crudweb_roles.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuarios` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `fecha_c` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` char(1) NOT NULL DEFAULT 'A',
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`id_usuarios`),
  KEY `fk_usuarios_1_idx` (`id_rol`),
  CONSTRAINT `fk_usuarios_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_roles`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
