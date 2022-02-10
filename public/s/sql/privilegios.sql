/**
 * Author:  neury-dev
 * Created: 30 dic. 2021
 */

/* Crear usuario
--------------------------------------------------------------------------------*/
CREATE USER 'nombre'@'localhost' IDENTIFIED BY 'contraseña';

/* Eliminar usuario
--------------------------------------------------------------------------------*/
DROP USER nombre;

/* Revocar permisos de usuario
--------------------------------------------------------------------------------*/
SHOW GRANTS FOR 'nombre'@'localhost';

/* Revocar permisos de usuario
--------------------------------------------------------------------------------*/
REVOKE INSERT ON *.* FROM 'nombre'@'localhost';
REVOKE INSERT ON oking.Contacto FROM 'nombre'@'localhost';

/* Otorgar permisos usuario

- global privileges
- OR database privileges
- OR table privileges
- OR column privileges
- OR routine privileges

Ejecutar dentro de la DB, si es para la DB o sino 
dentro de la tabla que se quieren otorgar los permisos 
--------------------------------------------------------------------------------*/

GRANT ALL ON *.* TO 'nombre'@'localhost';

GRANT SELECT,INSERT,UPDATE,DELETE ON basededatos.* TO 'nombre'@'localhost';

GRANT SELECT ON basededatos.tabla TO 'nombre'@'localhost';
GRANT INSERT ON basededatos.tabla TO 'nombre'@'localhost';
GRANT SELECT ON basededatos.tabla TO 'nombre'@'localhost';
GRANT UPDATE ON basededatos.tabla TO 'nombre'@'localhost';
GRANT DELETE ON basededatos.tabla TO 'nombre'@'localhost';
GRANT FILE ON basededatos.tabla TO 'nombre'@'localhost';
