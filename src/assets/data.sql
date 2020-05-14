CREATE TABLE IF NOT EXISTS `medicamentos` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT ,
  `descripcion` varchar(255),
  `created_at` datetime,
  `updated_at` datetime
);
INSERT OR IGNORE INTO `medicamentos` (`id`, `descripcion`, `created_at`, `updated_at`) VALUES
	(1, 'parecetamol', '2020-04-24 10:50:47', '0000-00-00 00:00:00'),
	(2, 'ibuprofeno', '2020-04-24 10:51:01', '2020-04-24 10:51:02'),
	(3, 'dioxidol', '2020-04-24 10:52:27', '2020-04-24 10:52:28');

CREATE TABLE IF NOT EXISTS `alergia` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nombre` varchar(255),
  `gravedad` varchar(255),
  `categoria` varchar(255),
  `notas` varchar(255),
  `fecha_diagnostico` datetime,
  `mascota_id` integer,
  `submitted` integer
);
CREATE TABLE IF NOT EXISTS `cirugia` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `tipo_cirugia` varchar(255),
  `fecha` datetime,
  `nombre` varchar(255),
  `precio` integer,
  `observaciones` varchar(255),
  `notas` varchar(255),
  `mascota_id` int(11),
  `submitted` integer
);
CREATE TABLE IF NOT EXISTS `comida_mascota` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `notas` varchar(255),
  `fecha_comida` datetime,
  `cantidad` integer,
  `medida` varchar(255),
  `recordatorio` integer,
  `hora_recordatorio` varchar(255),
  `suministro_id` integer,
  `mascota_id` integer,
  `submitted` integer
);
CREATE TABLE IF NOT EXISTS `grupo_mantenimientos` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `descripcion` varchar(255),
  `created_at` datetime,
  `updated_at` datetime
);
INSERT OR IGNORE INTO `grupo_mantenimientos` (`id`, `descripcion`, `created_at`, `updated_at`) VALUES
	(1, 'Higiene', '2020-04-08 16:00:18', '2020-04-08 16:00:19'),
	(2, 'Limpieza', '2020-04-21 18:33:11', '2020-04-21 18:33:12');

CREATE TABLE IF NOT EXISTS `mantenimientos` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `descripcion` varchar(255) ,
  `created_at` datetime,
  `updated_at` datetime,
  `grupo_id` integer
);
INSERT OR IGNORE INTO `mantenimientos` (`id`, `descripcion`, `created_at`, `updated_at`, `grupo_id`) VALUES
	(1, 'Baños', '2020-04-08 16:00:29', '2020-04-08 16:00:29', 1),
	(2, 'Uñas', '2020-04-20 21:37:52', '2020-04-20 21:37:53', 1),
	(3, 'Pelo', '2020-04-20 21:38:49', '2020-04-20 21:38:50', 1),
	(4, 'Oidos', '2020-04-20 21:39:04', '2020-04-20 21:39:05', 1),
	(5, 'Dientes', '2020-04-20 21:39:17', '2020-04-20 21:39:21', 1),
	(6, 'Plato de Comida', '2020-04-21 19:10:11', '2020-04-21 19:10:12', 2),
	(7, 'Cama', '2020-04-21 19:10:26', '2020-04-21 19:10:34', 2),
	(8, 'Juguetes', '2020-04-21 19:10:49', '2020-04-21 19:10:50', 2),
	(9, 'Plato de Agua', '2020-04-21 19:11:02', '2020-04-21 19:11:03', 2),
	(10, 'Correa y Collar', '2020-04-21 19:11:20', '2020-04-21 19:11:21', 2);

CREATE TABLE IF NOT EXISTS `mantenimiento_mascota` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `notas` varchar(255),
  `fecha_mantenimiento` datetime,
  `recordatorio` integer,
  `realizado` integer,
  `proximo` datetime,
  `num_prog` integer,
  `intervalo_prog` varchar(255),
  `programado` integer,
  `created_at` datetime,
  `updated_at` datetime,
  `mascota_id` integer,
  `mantenimiento_id` integer,
  `submitted` integer
);
CREATE TABLE IF NOT EXISTS `mascota` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nombre` varchar(255),
  `caracteristicas` varchar(255),
  `fecha_nacimiento` date,
  `color` varchar(255),
  `mes_aprox` integer,
  `year_aprox` integer,
  `created_at` datetime,
  `updated_at` datetime,
  `user_id` integer,
  `tipo_id` integer,
  `unidad_id` integer,
  `photo_uri` varchar(255),
  `submitted` integer
);
CREATE TABLE IF NOT EXISTS `medicamento_mascota` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `notas` varchar(255),
  `fecha_medicamento` datetime,
  `recordatorio` integer,
  `realizado` integer,
  `created_at` datetime,
  `updated_at` datetime,
  `mascota_id` integer,
  `medicamento_id` integer,
  `submitted` integer
);
CREATE TABLE IF NOT EXISTS `medicion_mascota` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `notas` varchar(255),
  `valor` integer,
  `fecha_medicion` datetime,
  `created_at` datetime,
  `updated_at` datetime,
  `medicion_id` integer,
  `mascota_id` integer,
  `unidad_id` integer,
  `submitted` integer
);
CREATE TABLE IF NOT EXISTS `patologia` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nombre` varchar(255),
  `gravedad` varchar(255),
  `acciones` varchar(255),
  `notas` varchar(255),
  `fecha` datetime,
  `created_at` datetime,
  `updated_at` datetime,
  `mascota_id` integer,
  `submitted` integer
);
CREATE TABLE IF NOT EXISTS `prueba_diagnosticos` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `notas` varchar(255) DEFAULT NULL,
  `fecha_prueba` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `mascota_id` int(11) DEFAULT NULL,
  `submitted` integer
);
CREATE TABLE IF NOT EXISTS `suministros` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `descripcion` varchar(255),
  `created_at` datetime,
  `updated_at` datetime
);
INSERT OR IGNORE INTO `suministros` (`id`, `descripcion`, `created_at`, `updated_at`) VALUES
	(1, 'dog Chow', '2020-04-28 11:56:47', '2020-04-28 11:56:48');
CREATE TABLE IF NOT EXISTS `test_diagnosticos` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `descripcion` varchar(255),
  `created_at` datetime,
  `updated_at` datetime
);
INSERT OR IGNORE INTO `test_diagnosticos` (`id`, `descripcion`, `created_at`, `updated_at`) VALUES
	(1, 'Adenovirus', '2020-04-28 18:51:12', '2020-04-27 18:51:13'),
	(2, 'Anaplasmosis', '2020-04-27 18:51:30', '2020-04-27 18:51:31'),
	(3, 'Coronavirus', '2020-04-27 18:51:41', '2020-04-27 18:51:42');

CREATE TABLE IF NOT EXISTS `test_diag_mascota` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `notas` varchar(255),
  `resultado` varchar(255),
  `fecha_test` datetime,
  `created_at` datetime,
  `updated_at` datetime,
  `diagnostico_id` integer,
  `mascota_id` integer,
  `submitted` integer
);

CREATE TABLE IF NOT EXISTS `test_geneticos` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `descripcion` varchar(255),
  `created_at` datetime,
  `updated_at` datetime
);

INSERT OR IGNORE INTO `test_geneticos` (`id`, `descripcion`, `created_at`, `updated_at`) VALUES
	(1, 'Canine Cystinuria', '2020-04-27 19:26:03', '2020-04-27 19:26:04'),
	(2, 'Canine Fucosidosis', '2020-04-27 19:26:20', '2020-04-27 19:26:21');

CREATE TABLE IF NOT EXISTS `test_gen_mascota` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `notas` varchar(255),
  `resultado` varchar(255),
  `fecha_test` datetime,
  `created_at` datetime,
  `updated_at` datetime,
  `genetico_id` integer,
  `mascota_id` integer,
  `submitted` integer
);

CREATE TABLE IF NOT EXISTS `test_numericos` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `descripcion` varchar(255),
  `created_at` datetime,
  `updated_at` datetime
);

INSERT or IGNORE INTO `test_numericos` (`id`, `descripcion`, `created_at`, `updated_at`) VALUES
	(1, 'ACTH Stimulation Test', '2020-04-27 20:24:25', '2020-04-27 20:24:26'),
	(2, 'Albumin', '2020-04-27 20:24:35', '2020-04-27 20:24:36'),
	(3, 'Amylase (serum)', '2020-04-27 20:24:54', '2020-04-27 20:24:55');

CREATE TABLE IF NOT EXISTS `test_num_mascota` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `notas` varchar(255),
  `valor` integer,
  `margen_bajo` integer,
  `margen_alto` integer,
  `fecha_test` datetime,
  `created_at` datetime,
  `updated_at` datetime,
  `numerico_id` integer,
  `unidad_id` integer,
  `mascota_id` integer,
  `submitted` integer
);

CREATE TABLE IF NOT EXISTS `tipo_mascota` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
);

INSERT OR IGNORE INTO `tipo_mascota` (`id`, `descripcion`, `created_at`, `updated_at`) VALUES
	(1, 'Perro', '2020-04-15 21:25:45', '2020-04-15 21:25:44'),
	(2, 'Gato', '2020-04-16 20:55:22', '2020-04-16 20:55:23'),
	(3, 'Hamster', '2020-04-16 20:55:29', '2020-04-16 20:55:32');

CREATE TABLE IF NOT EXISTS `tipo_medicions` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `descripcion` varchar(255),
  `created_at` datetime,
  `updated_at` datetime
);
INSERT OR IGNORE INTO `tipo_medicions` (`id`, `descripcion`, `created_at`, `updated_at`) VALUES
	(1, 'Peso', '2020-04-23 22:40:36', '2020-04-23 22:40:37'),
	(2, 'Temperatura', '2020-04-23 22:40:47', '2020-04-23 22:40:47'),
	(3, 'Altura', '2020-04-23 22:40:55', '2020-04-23 22:40:56'),
	(4, 'Test Numerico', '2020-04-27 19:55:51', '2020-04-27 19:55:52');

CREATE TABLE IF NOT EXISTS `unidad_medidas` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `unidad` varchar(255),
  `created_at` datetime,
  `updated_at` datetime,
  `medida_id` integer
);
INSERT OR IGNORE INTO `unidad_medidas` (`id`, `unidad`, `created_at`, `updated_at`, `medida_id`) VALUES
	(1, 'Kg', '2020-04-23 22:41:31', '2020-04-23 22:41:31', 1),
	(2, 'Lb', '2020-04-23 22:41:40', '2020-04-23 22:41:40', 1),
	(3, 'mt', '2020-04-23 22:41:58', '2020-04-23 22:41:58', 3),
	(4, 'Pulg', '2020-04-23 22:42:07', '2020-04-23 22:42:08', 3),
	(5, 'F°', '2020-04-23 22:43:00', '2020-04-23 22:43:01', 2),
	(6, 'C°', '2020-04-23 22:43:11', '2020-04-23 22:43:12', 2),
	(7, '%', '2020-04-27 19:56:20', '2020-04-27 19:56:21', 4),
	(8, '% of WBCs', '2020-04-27 19:56:36', '2020-04-27 19:56:37', 4),
	(9, 'Centigrade', '2020-04-27 19:56:55', '2020-04-27 19:56:56', 4);

CREATE TABLE IF NOT EXISTS `vacunas` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `descripcion` varchar(255),
  `created_at` datetime,
  `updated_at` datetime
);

INSERT OR IGNORE INTO `vacunas` (`id`, `descripcion`, `created_at`, `updated_at`) VALUES
	(1, 'peste bubonica', '2020-04-22 11:40:03', '2020-04-22 11:40:04'),
	(2, 'rabia canina', '2020-04-22 11:40:14', '2020-04-22 11:40:15');

CREATE TABLE IF NOT EXISTS `vacunas_mascota` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `notas` varchar(255),
  `fecha_vacuna` datetime,
  `recordatorio` integer,
  `realizado` integer,
  `created_at` datetime,
  `updated_at` datetime,
  `mascota_id` integer,
  `vacuna_id` integer,
  `medicamento_id` integer,
  `submitted` integer
);