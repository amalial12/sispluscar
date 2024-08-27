-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-07-2024 a las 16:32:33
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pluscar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auto`
--

CREATE TABLE `auto` (
  `numa` int(11) NOT NULL,
  `placa` varchar(10) NOT NULL,
  `chas` varchar(15) NOT NULL,
  `mode` varchar(5) NOT NULL,
  `des` text NOT NULL,
  `stda` varchar(3) NOT NULL,
  `num` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `auto`
--

INSERT INTO `auto` (`numa`, `placa`, `chas`, `mode`, `des`, `stda`, `num`) VALUES
(5, 'JNA-785', 'JNA65465465464', '1980', 'Toyota corola', 'act', 1),
(6, 'WAD-784', 'WAD468749867', '2023', 'Corola color blanco', 'act', 3),
(7, 'JUA-999', 'JUA46584654645', '2000', 'Toyota corola color negro', 'act', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rent`
--

CREATE TABLE `rent` (
  `numr` int(11) NOT NULL,
  `num` int(11) NOT NULL,
  `numa` int(11) NOT NULL,
  `fechs` varchar(20) NOT NULL,
  `feche` varchar(20) NOT NULL,
  `stdr` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rent`
--

INSERT INTO `rent` (`numr`, `num`, `numa`, `fechs`, `feche`, `stdr`) VALUES
(1, 7, 6, '2024-07-12T22:00', '', 'pro'),
(2, 4, 5, '2024-07-12T21:00', '', 'pro'),
(3, 6, 7, '2024-07-13T10:00', '', 'pro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `num` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `ap` varchar(50) NOT NULL,
  `ci` varchar(15) NOT NULL,
  `pwd` varchar(50) NOT NULL,
  `std` varchar(3) NOT NULL,
  `carg` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`num`, `nom`, `ap`, `ci`, `pwd`, `std`, `carg`) VALUES
(1, 'juan', 'quispe', '111', '123', 'act', 'cli'),
(2, 'Carlos', 'Ticona', '222', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'act', 'cli'),
(3, 'Wadalupe', 'Cortez', '333', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'act', 'adm'),
(4, 'Carla', 'Patiño', '777', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'act', 'cli'),
(6, 'Kiko', 'Mesa', '661', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'act', 'oper'),
(7, 'RUBEN', 'AGUIRRE', '748', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'act', 'cli');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `auto`
--
ALTER TABLE `auto`
  ADD PRIMARY KEY (`numa`),
  ADD UNIQUE KEY `placa` (`placa`),
  ADD UNIQUE KEY `chas` (`chas`),
  ADD KEY `num` (`num`);

--
-- Indices de la tabla `rent`
--
ALTER TABLE `rent`
  ADD PRIMARY KEY (`numr`),
  ADD KEY `num` (`num`),
  ADD KEY `numa` (`numa`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`num`),
  ADD UNIQUE KEY `ci` (`ci`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `auto`
--
ALTER TABLE `auto`
  MODIFY `numa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `rent`
--
ALTER TABLE `rent`
  MODIFY `numr` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `num` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `auto`
--
ALTER TABLE `auto`
  ADD CONSTRAINT `auto_ibfk_1` FOREIGN KEY (`num`) REFERENCES `user` (`num`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `rent`
--
ALTER TABLE `rent`
  ADD CONSTRAINT `rent_ibfk_1` FOREIGN KEY (`num`) REFERENCES `user` (`num`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rent_ibfk_2` FOREIGN KEY (`numa`) REFERENCES `auto` (`numa`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
