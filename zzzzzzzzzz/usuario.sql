/**
 * Author:  neury-dev
 * Created: 6 feb. 2022
 */
CREATE USER 'usuario'@'localhost' IDENTIFIED VIA mysql_native_password USING '***';
GRANT SELECT, INSERT, UPDATE, DELETE ON *.* TO 'usuario'@'localhost' 
REQUIRE NONE WITH GRANT OPTION MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 1;
GRANT ALL PRIVILEGES ON `javascript`.* TO 'usuario'@'localhost'; 
