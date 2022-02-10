-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 04-01-2022 a las 10:50:04
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `javascript`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Login`
--

CREATE TABLE `Login` (
  `id` int(11) NOT NULL,
  `correo` text COLLATE utf8_unicode_ci NOT NULL,
  `codigo` text COLLATE utf8_unicode_ci NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `Login`
--

INSERT INTO `Login` (`id`, `correo`, `codigo`, `fecha`) VALUES
(1, 'neury@email.com', 'neury', '2022-01-03 18:28:58'),
(2, 'eleasar@email.com', 'neury', '2022-01-03 14:41:53'),
(3, 'aguasvivas@email.com', '$2a$08$6x1pN9b8FYet9KsYIhC0huv3/cws.7Yjqeh8qKN.rQ63p.2HzHf2S', '2022-01-03 23:58:35'),
(4, 'lorenzo@email.com', 'neury', '2022-01-04 01:39:35');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Login`
--
ALTER TABLE `Login`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Login`
--
ALTER TABLE `Login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
