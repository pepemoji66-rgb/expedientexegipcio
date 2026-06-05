-- Script de inicialización de la base de datos para el Templo de los Enigmas (egipto_db)
-- Puedes ejecutar este script directamente en tu consola de Aiven o tu cliente de base de datos preferido.

CREATE TABLE IF NOT EXISTS `audios` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `titulo` VARCHAR(255) NOT NULL,
  `url` VARCHAR(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `contenido_inicio` (
  `clave` VARCHAR(100) PRIMARY KEY,
  `contenido` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `imagenes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `titulo` VARCHAR(255) NOT NULL,
  `url` VARCHAR(500) NOT NULL,
  `orden` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `noticias` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `titulo` VARCHAR(255) NOT NULL,
  `resumen` TEXT NOT NULL,
  `url_enlace` VARCHAR(500),
  `url_imagen` VARCHAR(500)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `ciudad` VARCHAR(100),
  `edad` INT,
  `sexo` VARCHAR(10),
  `password` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `videos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `titulo` VARCHAR(255) NOT NULL,
  `url` VARCHAR(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `monumentos_360` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(255) NOT NULL,
  `titulo` VARCHAR(255) NOT NULL,
  `descripcion` TEXT,
  `url_mapa` VARCHAR(500)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar contenidos iniciales de prueba para evitar que la home se vea vacía
INSERT INTO `contenido_inicio` (`clave`, `contenido`) VALUES 
('sobre_mi', 'Soy un apasionado de los misterios, los enigmas de la historia y especialmente de las pirámides, uno de los mayores secretos de la humanidad.')
ON DUPLICATE KEY UPDATE `contenido`=VALUES(`contenido`);
