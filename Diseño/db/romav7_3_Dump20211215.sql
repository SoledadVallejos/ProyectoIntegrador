CREATE DATABASE  IF NOT EXISTS `roma3.0_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `roma3.0_db`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: roma3.0_db
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `orderId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `productId` (`productId`),
  KEY `orderId` (`orderId`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  CONSTRAINT `carts_ibfk_3` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,1,1,10,1,'2021-11-11 00:00:00',NULL);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Hombre','Para el caballero','2021-11-13 01:52:05',NULL,NULL),(2,'Mujer','Para la dama','2021-11-13 01:52:05',NULL,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
INSERT INTO `features` VALUES (1,'verano primavera',NULL,'2021-11-13 01:52:05',NULL,NULL),(2,'otoño invierno',NULL,'2021-11-13 01:52:05',NULL,NULL);
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file` varchar(255) DEFAULT 'default.png',
  `productId` int DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `images_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=305 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'banner-1.jpg',NULL,NULL,'2021-11-13 01:52:05',NULL,NULL),(2,'banner-2.jpg',NULL,NULL,'2021-11-13 01:52:05',NULL,NULL),(3,'banner-3.jpg',NULL,NULL,'2021-11-13 01:52:05',NULL,NULL),(20,'ropa-hombre.jpg',NULL,1,'2021-11-11 00:00:00',NULL,NULL),(21,'ropa-mujer.jpg',NULL,2,'2021-11-11 00:00:00',NULL,NULL),(216,'splideImages-2021-12-11-51-1639194681767-.jpg',120,NULL,'2021-12-11 03:51:22','2021-12-11 03:51:22',NULL),(218,'splideImages-2021-12-11-51-1639208815125-.jpg',1,NULL,'2021-12-11 07:46:55','2021-12-11 07:46:55',NULL),(222,'splideImages-2021-12-11-700-1639276308925-.jpg',3,NULL,'2021-12-12 02:31:49','2021-12-12 02:31:49',NULL),(223,'splideImages-2021-12-11-700-1639276308928-.jpg',3,NULL,'2021-12-12 02:31:49','2021-12-12 02:31:49',NULL),(228,'splideImages-2021-12-11-928-1639316749515-.jpg',4,NULL,'2021-12-12 13:45:49','2021-12-12 13:45:49',NULL),(229,'splideImages-2021-12-11-928-1639316749520-.jpg',4,NULL,'2021-12-12 13:45:49','2021-12-12 13:45:49',NULL),(240,'splideImages-2021-12-13-195-1639436296319-.jpg',136,NULL,'2021-12-13 22:58:16','2021-12-13 22:58:16',NULL),(248,'splideImages-2021-12-14-280-1639484706537-.png',138,NULL,'2021-12-14 12:25:06','2021-12-14 12:25:06',NULL),(251,'splideImages-2021-12-14-360-1639487784947-.png',140,NULL,'2021-12-14 13:16:26','2021-12-14 13:16:26',NULL),(255,'splideImages-2021-12-14-409-1639490877648-.png',144,NULL,'2021-12-14 14:07:57','2021-12-14 14:07:57',NULL),(256,'splideImages-2021-12-14-331-1639491316893-.png',145,NULL,'2021-12-14 14:15:17','2021-12-14 14:15:17',NULL),(257,'splideImages-2021-12-14-686-1639491533653-.png',146,NULL,'2021-12-14 14:18:54','2021-12-14 14:18:54',NULL),(258,'splideImages-2021-12-14-845-1639492099656-.png',147,NULL,'2021-12-14 14:28:20','2021-12-14 14:28:20',NULL),(259,'splideImages-2021-12-14-845-1639492144193-.png',148,NULL,'2021-12-14 14:29:04','2021-12-14 14:29:04',NULL),(261,'splideImages-2021-12-14-939-1639494626796-.png',150,NULL,'2021-12-14 15:10:27','2021-12-14 15:10:27',NULL),(262,'splideImages-2021-12-14-939-1639494638843-.png',151,NULL,'2021-12-14 15:10:38','2021-12-14 15:10:38',NULL),(264,'splideImages-2021-12-14-308-1639494984046-.jpg',153,NULL,'2021-12-14 15:16:24','2021-12-14 15:16:24',NULL),(266,'splideImages-2021-12-14-924-1639495790381-.jpg',155,NULL,'2021-12-14 15:29:50','2021-12-14 15:29:50',NULL),(274,'splideImages-2021-12-14-607-1639531094364-.png',139,NULL,'2021-12-15 01:18:14','2021-12-15 01:18:14',NULL),(285,'splideImages-2021-12-15-389-1639542636419-.jpg',154,NULL,'2021-12-15 04:30:36','2021-12-15 04:30:36',NULL),(286,'splideImages-2021-12-15-389-1639542636424-.jpg',154,NULL,'2021-12-15 04:30:36','2021-12-15 04:30:36',NULL),(287,'splideImages-2021-12-15-389-1639542636525-.png',154,NULL,'2021-12-15 04:30:36','2021-12-15 04:30:36',NULL),(291,'splideImages-2021-12-15-139-1639544119745-.jpg',149,NULL,'2021-12-15 04:55:20','2021-12-15 04:55:20',NULL),(292,'splideImages-2021-12-15-139-1639544119748-.jpg',149,NULL,'2021-12-15 04:55:20','2021-12-15 04:55:20',NULL),(293,'splideImages-2021-12-15-139-1639544119782-.png',149,NULL,'2021-12-15 04:55:20','2021-12-15 04:55:20',NULL),(295,'splideImages-2021-12-15-792-1639544894816-.png',160,NULL,'2021-12-15 05:08:15','2021-12-15 05:08:15',NULL),(296,'splideImages-2021-12-15-792-1639544894919-.png',160,NULL,'2021-12-15 05:08:15','2021-12-15 05:08:15',NULL),(300,'splideImages-2021-12-15-792-1639544978018-.jpg',159,NULL,'2021-12-15 05:09:38','2021-12-15 05:09:38',NULL),(301,'splideImages-2021-12-15-792-1639544978020-.jpg',159,NULL,'2021-12-15 05:09:38','2021-12-15 05:09:38',NULL),(302,'splideImages-2021-12-15-792-1639544978050-.png',159,NULL,'2021-12-15 05:09:38','2021-12-15 05:09:38',NULL),(303,'splideImages-2021-12-15-792-1639545161587-.png',157,NULL,'2021-12-15 05:12:41','2021-12-15 05:12:41',NULL),(304,'splideImages-2021-12-15-792-1639545161620-.png',157,NULL,'2021-12-15 05:12:41','2021-12-15 05:12:41',NULL);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'pendiente',1,'2021-01-01 00:00:00',NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_features`
--

DROP TABLE IF EXISTS `product_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int DEFAULT NULL,
  `featureId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  KEY `featureId` (`featureId`),
  CONSTRAINT `product_features_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  CONSTRAINT `product_features_ibfk_2` FOREIGN KEY (`featureId`) REFERENCES `features` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_features`
--

LOCK TABLES `product_features` WRITE;
/*!40000 ALTER TABLE `product_features` DISABLE KEYS */;
INSERT INTO `product_features` VALUES (1,1,1,'2021-10-10 00:00:00',NULL);
/*!40000 ALTER TABLE `product_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `size` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL,
  `price` int NOT NULL,
  `discount` int DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `sectionId` int DEFAULT '9',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  KEY `sectionId` (`sectionId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`sectionId`) REFERENCES `sections` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Polera Roja','Polera de mujer Roma','M','Rojo',3950,30,2,4,'2021-11-13 01:52:05','2021-12-11 07:46:55',NULL),(3,'Polera Negra','Polera de mujer Roma','L','Negro',4444,0,2,3,'2021-11-13 01:52:05','2021-12-12 02:31:48',NULL),(4,'Polera Beige','Polera de mujer Roma. Oferta','L','Beige',5555,15,2,3,'2021-11-13 01:52:05','2021-12-12 13:45:49',NULL),(120,'111111','111111 Imágenes del producto Imágenes del producto Imágenes del producto Imágenes del producto','S','Negro',11111111,11,1,1,'2021-12-11 00:50:42','2021-12-11 03:51:21',NULL),(136,'Se puede hacer pero no hay tiempo!!','Seguramente hay mejores maneras.','XL','Negro',232323,12,2,9,'2021-12-13 22:26:59','2021-12-13 22:58:16',NULL),(138,'finalizando...','esta es una descripcion con errores de ortografia','S','Negro',120,12,1,4,'2021-12-14 12:16:43','2021-12-14 12:25:06',NULL),(139,'prueba 3','aaaaaaaaaaaaaaaaaaaaaaaaaaaa','M','Rojo',1322312,33,1,3,'2021-12-14 12:36:36','2021-12-15 01:18:14',NULL),(140,'safasa','asdjfklasjdkfljasdklfjklsfjñlasjfasjfñlajsdñfljasklfjs','L','Beige',1222,44,1,4,'2021-12-14 13:16:25','2021-12-14 13:16:25',NULL),(144,'adfas','asjfkljasfkljañlsjfñaljklsajfkljsldfkjañl','S','Negro',3132,37,1,9,'2021-12-14 14:07:57','2021-12-14 14:07:57',NULL),(145,'1afas','asdfoasdfjslkjdflkasjdñlfkjasñlkfjasjfa','L','Blanco',1321321,70,1,3,'2021-12-14 14:15:17','2021-12-14 14:15:17',NULL),(146,'1afas','asdfoasdfjslkjdflkasjdñlfkjasñlkfjasjfa','L','Blanco',1321321,5,1,3,'2021-12-14 14:18:53','2021-12-14 14:18:53',NULL),(147,'1afas','asdfoasdfjslkjdflkasjdñlfkjasñlkfjasjfa','L','Blanco',1321321,55,1,3,'2021-12-14 14:28:19','2021-12-14 14:28:19',NULL),(148,'1afas','asdfoasdfjslkjdflkasjdñlfkjasñlkfjasjfa','L','Blanco',1321321,70,1,3,'2021-12-14 14:29:04','2021-12-14 14:29:04',NULL),(149,'WW343','KALSDJFLAJSDFLKJALAJLSFJLASDJFLAS','XL','Blanco',444,12,2,1,'2021-12-14 15:08:18','2021-12-15 04:55:19',NULL),(150,'asfas','asdjflasjfjslkfjklasjfklsjklfjkasjflkasjñl','XL','Blanco',3343,0,1,9,'2021-12-14 15:10:26','2021-12-14 15:10:26',NULL),(151,'asfas','asdjflasjfjslkfjklasjfklsjklfjkasjflkasjñl','XL','Blanco',3343,1,1,9,'2021-12-14 15:10:38','2021-12-14 15:10:38',NULL),(153,'AFASFA','SJFKLASJFKLJASKLFJLASJFLAJSKLFJS','XL','Blanco',121232,3,1,9,'2021-12-14 15:16:24','2021-12-14 15:16:24',NULL),(154,'prueba de imágenes preview','ESTA es una prueba de edicion usando validacion front (preview image)','S','Rojo',7777,0,2,3,'2021-12-14 15:27:12','2021-12-15 04:30:36',NULL),(155,'asdas','akdlsfjljsfkljasfñlajlksjañl','L','Beige',132323,0,1,9,'2021-12-14 15:29:50','2021-12-14 15:29:50',NULL),(157,'holiiiiis','skfjaskldfjasñlkfjsfkasjfklasjfkljasñ','XL','Blanco',9999,12,1,2,'2021-12-14 22:48:41','2021-12-15 05:12:41',NULL),(159,'holaaaa','asdfkljasdklfjslafjlsfjlkjasflasjalsdfjklsfñ','XL','Blanco',3132,0,1,1,'2021-12-15 04:46:04','2021-12-15 05:09:38',NULL),(160,'FAFDSAF','SAFSDFSLDKJFKLSJAFKLSJAFLAASDFA','S','Beige',123232,0,1,3,'2021-12-15 04:57:43','2021-12-15 05:08:15',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols`
--

DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rols` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'user','2021-02-02 00:00:00',NULL,NULL),(2,'admin','2021-02-02 00:00:00',NULL,NULL);
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section_images`
--

DROP TABLE IF EXISTS `section_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sectionId` int DEFAULT NULL,
  `imageId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sectionId` (`sectionId`),
  KEY `imageId` (`imageId`),
  CONSTRAINT `section_images_ibfk_1` FOREIGN KEY (`sectionId`) REFERENCES `sections` (`id`),
  CONSTRAINT `section_images_ibfk_2` FOREIGN KEY (`imageId`) REFERENCES `images` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section_images`
--

LOCK TABLES `section_images` WRITE;
/*!40000 ALTER TABLE `section_images` DISABLE KEYS */;
INSERT INTO `section_images` VALUES (1,1,1,'2021-10-10 00:00:00',NULL),(2,1,2,'2021-02-02 00:00:00',NULL),(3,1,3,'2021-02-02 00:00:00',NULL);
/*!40000 ALTER TABLE `section_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT 'Todos los productos',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
INSERT INTO `sections` VALUES (1,'Banner','2021-11-13 01:52:05',NULL,NULL),(2,'Mas vendidos','2021-11-13 01:52:05',NULL,NULL),(3,'Promoción','2021-11-13 01:52:05',NULL,NULL),(4,'Liquidación','2021-11-13 01:52:05',NULL,NULL),(5,'Ofertas','2021-10-10 00:00:00',NULL,NULL),(6,'Sugeridos','2021-10-10 00:00:00',NULL,NULL),(7,'Relacionados','2021-10-10 00:00:00',NULL,NULL),(8,'Últimos vistos','2021-10-10 00:00:00',NULL,NULL),(9,'Todos los productos','2021-10-10 00:00:00',NULL,NULL);
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20211104203000-create-category.js'),('20211104203010-create-section.js'),('20211104203020-create-product.js'),('20211104203030-create-rol.js'),('20211104203040-create-user.js'),('20211104203050-create-image.js'),('20211104203060-create-feature.js'),('20211104203070-create-product-feature.js'),('20211104203080-create-order.js'),('20211104203090-create-cart.js'),('20211104203099-create-section-image.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `avatar` varchar(255) DEFAULT 'default.png',
  `rolId` int DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rolId` (`rolId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Batman','Chirola','BB@pum.com','1234567','Sudaca','de',1,'2021-10-10 00:00:00',NULL,NULL),(3,'admin','uno','admin@roma.com','$2a$10$pPpKW12Fg4Yg6WV3EBf6KO0GR76cG1qKtrj.aIaj6uKIDExyisg5a','Argentina','1638921147049_img.jpg',2,'2021-12-07 23:52:27','2021-12-07 23:52:27',NULL),(7,'roma1','uno','admin@roma.com','$2a$10$NV689XiEzaNqDKOH.1Dc9uDoU8iJ7GKNPI1XwuCmcT15RIAll1Kyq','Brasil','default.png',1,'2021-12-09 18:32:34','2021-12-09 18:32:34',NULL),(8,'','','admin@roma.com','$2a$10$.3UwNJJPjLmCDe5CdglHdOUre20y.kc.5/eJ.Z9NmvH8KBVgk1UyK','Argentina','1639074778250_img.mwb',1,'2021-12-09 18:32:58','2021-12-09 18:32:58',NULL),(9,'','','','$2a$10$FxSC2.z6ODKkaEr5h51HIeJQUYpE0okJPkq0nXYEs.kHRykCzGrTm','','default.png',1,'2021-12-10 23:38:20','2021-12-10 23:38:20',NULL),(10,'','','admin@roma.com','$2a$10$O7CVvRJJHNQPKuCqxeZRNOzT5ft2mYYybJZJDBYlj5zjWdPcmAWBG','','default.png',1,'2021-12-11 02:40:17','2021-12-11 02:40:17',NULL),(11,'2232','','admin@roma.com','$2a$10$ZFoAN7t6RbNKUHDDWca01OZGsOBcq1Ceoec3uIdbkNG24qJUYZ7f.','','default.png',1,'2021-12-11 02:40:52','2021-12-11 02:40:52',NULL),(12,'daniel','asada','admin@roma.com','$2a$10$sWU.QpbzYhF/ncwmpvtCquVpm6Vc/ZjH8WlvsS.konhVBV4JKH7kC','Bolivia','1639191959657_img.jpg',1,'2021-12-11 03:06:00','2021-12-11 03:06:00',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-15  2:18:25
