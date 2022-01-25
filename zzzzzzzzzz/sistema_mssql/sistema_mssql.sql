/**
 * Author:  neury-dev
 * Created: Jan 24, 2022
 */

/* Base de datos
--------------------------------------------------------------------------------*/
CREATE DATABASE dba_mssql;

/* Tabla
--------------------------------------------------------------------------------*/
IF OBJECT_ID('dbo.dba_mssql', 'U') IS NOT NULL
    DROP TABLE dbo.dba_mssql;
GO

CREATE TABLE SistemaMSSQL(
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(255) NOT NULL,
    marca NVARCHAR(255) NOT NULL,
    precio DECIMAL(38, 2) NOT NULL,
    fecha DATETIME NOT NULL
)
GO

/* Insertar
--------------------------------------------------------------------------------*/
INSERT INTO dbo.SistemaMSSQL(nombre, marca, precio, fecha) VALUES('Nombre', 'Marca', 1.11, CURRENT_TIMESTAMP);
GO

/* Seleccionar
--------------------------------------------------------------------------------*/
SELECT * FROM SistemaMSSQL;
GO

/* Actualizar
--------------------------------------------------------------------------------*/
UPDATE SistemaMSSQL SET precio = 2.22 WHERE id = 3;
GO

/* Eliminar
--------------------------------------------------------------------------------*/
DELETE FROM SistemaMSSQL WHERE id = 2;
GO