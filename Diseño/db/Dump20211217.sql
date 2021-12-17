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
) ENGINE=InnoDB AUTO_INCREMENT=527 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'banner-1.jpg',NULL,NULL,'2021-11-13 01:52:05',NULL,NULL),(2,'banner-2.jpg',NULL,NULL,'2021-11-13 01:52:05',NULL,NULL),(3,'banner-3.jpg',NULL,NULL,'2021-11-13 01:52:05',NULL,NULL),(20,'ropa-hombre.jpg',NULL,1,'2021-11-11 00:00:00',NULL,NULL),(21,'ropa-mujer.jpg',NULL,2,'2021-11-11 00:00:00',NULL,NULL),(222,'splideImages-2021-12-11-700-1639276308925-.jpg',3,NULL,'2021-12-12 02:31:49','2021-12-12 02:31:49',NULL),(223,'splideImages-2021-12-11-700-1639276308928-.jpg',3,NULL,'2021-12-12 02:31:49','2021-12-12 02:31:49',NULL),(309,'splideImages-2021-12-15-987-1639580623968-.jpg',1,NULL,'2021-12-15 15:03:44','2021-12-15 15:03:44',NULL),(310,'splideImages-2021-12-15-987-1639580623979-.jpg',1,NULL,'2021-12-15 15:03:44','2021-12-15 15:03:44',NULL),(313,'splideImages-2021-12-15-987-1639581253436-.jpg',120,NULL,'2021-12-15 15:14:13','2021-12-15 15:14:13',NULL),(314,'splideImages-2021-12-15-987-1639581253478-.jpg',120,NULL,'2021-12-15 15:14:13','2021-12-15 15:14:13',NULL),(315,'splideImages-2021-12-15-628-1639586655430-.jpg',161,NULL,'2021-12-15 16:44:15','2021-12-15 16:44:15',NULL),(316,'splideImages-2021-12-15-628-1639586655436-.jpg',161,NULL,'2021-12-15 16:44:15','2021-12-15 16:44:15',NULL),(318,'splideImages-2021-12-15-213-1639589101533-.jpg',163,NULL,'2021-12-15 17:25:01','2021-12-15 17:25:01',NULL),(319,'splideImages-2021-12-15-155-1639589319335-.jpg',164,NULL,'2021-12-15 17:28:39','2021-12-15 17:28:39',NULL),(320,'splideImages-2021-12-15-155-1639589582292-.jpg',165,NULL,'2021-12-15 17:33:02','2021-12-15 17:33:02',NULL),(321,'splideImages-2021-12-15-514-1639608853101-.jpg',166,NULL,'2021-12-15 22:54:13','2021-12-15 22:54:13',NULL),(322,'splideImages-2021-12-15-514-1639608944436-.jpg',167,NULL,'2021-12-15 22:55:44','2021-12-15 22:55:44',NULL),(323,'splideImages-2021-12-15-514-1639609084625-.jpg',168,NULL,'2021-12-15 22:58:04','2021-12-15 22:58:04',NULL),(325,'splideImages-2021-12-15-501-1639609507555-.jpg',170,NULL,'2021-12-15 23:05:07','2021-12-15 23:05:07',NULL),(326,'splideImages-2021-12-15-501-1639609573100-.jpg',171,NULL,'2021-12-15 23:06:13','2021-12-15 23:06:13',NULL),(327,'splideImages-2021-12-15-501-1639609633337-.jpg',172,NULL,'2021-12-15 23:07:13','2021-12-15 23:07:13',NULL),(328,'splideImages-2021-12-15-501-1639609759756-.jpg',173,NULL,'2021-12-15 23:09:19','2021-12-15 23:09:19',NULL),(329,'splideImages-2021-12-15-501-1639609854219-.jpg',174,NULL,'2021-12-15 23:10:54','2021-12-15 23:10:54',NULL),(330,'splideImages-2021-12-15-501-1639610126345-.jpg',175,NULL,'2021-12-15 23:15:26','2021-12-15 23:15:26',NULL),(331,'splideImages-2021-12-15-501-1639610255533-.jpg',176,NULL,'2021-12-15 23:17:35','2021-12-15 23:17:35',NULL),(332,'splideImages-2021-12-15-501-1639611041583-.jpg',177,NULL,'2021-12-15 23:30:41','2021-12-15 23:30:41',NULL),(333,'splideImages-2021-12-15-501-1639611143409-.jpg',178,NULL,'2021-12-15 23:32:23','2021-12-15 23:32:23',NULL),(334,'splideImages-2021-12-15-501-1639611221715-.jpg',179,NULL,'2021-12-15 23:33:41','2021-12-15 23:33:41',NULL),(335,'splideImages-2021-12-15-501-1639611302999-.jpg',180,NULL,'2021-12-15 23:35:03','2021-12-15 23:35:03',NULL),(337,'splideImages-2021-12-15-501-1639611499733-.jpg',182,NULL,'2021-12-15 23:38:19','2021-12-15 23:38:19',NULL),(338,'splideImages-2021-12-15-501-1639611576653-.jpg',183,NULL,'2021-12-15 23:39:36','2021-12-15 23:39:36',NULL),(339,'splideImages-2021-12-15-501-1639611770548-.jpg',184,NULL,'2021-12-15 23:42:50','2021-12-15 23:42:50',NULL),(340,'splideImages-2021-12-15-397-1639612952184-.jpg',185,NULL,'2021-12-16 00:02:32','2021-12-16 00:02:32',NULL),(341,'splideImages-2021-12-15-397-1639613017171-.jpg',186,NULL,'2021-12-16 00:03:37','2021-12-16 00:03:37',NULL),(347,'splideImages-2021-12-15-397-1639613671699-.jpg',187,NULL,'2021-12-16 00:14:31','2021-12-16 00:14:31',NULL),(350,'splideImages-2021-12-15-397-1639613996666-.jpg',181,NULL,'2021-12-16 00:19:56','2021-12-16 00:19:56',NULL),(352,'splideImages-2021-12-15-64-1639619321352-.jpg',162,NULL,'2021-12-16 01:48:41','2021-12-16 01:48:41',NULL),(353,'splideImages-2021-12-15-64-1639619387816-.jpg',4,NULL,'2021-12-16 01:49:48','2021-12-16 01:49:48',NULL),(354,'splideImages-2021-12-16-812-1639630817600-.jpg',169,NULL,'2021-12-16 05:00:18','2021-12-16 05:00:18',NULL),(520,'splideImages-2021-12-17-626-1639731621613-.jpg',188,NULL,'2021-12-17 09:00:21','2021-12-17 09:00:21',NULL),(526,'splideImages-2021-12-17-626-1639732546107-.jpg',215,NULL,'2021-12-17 09:15:46','2021-12-17 09:15:46',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=216 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Polera Roja','Polera de mujer Roma','M','Rojo',3950,0,2,2,'2021-11-13 01:52:05','2021-12-15 15:03:44',NULL),(3,'Polera Negra','Polera de mujer Roma','L','Negro',4444,0,2,3,'2021-11-13 01:52:05','2021-12-12 02:31:48',NULL),(4,'Polera Beige','Polera de mujer Roma. Oferta','L','Beige',5555,0,2,4,'2021-11-13 01:52:05','2021-12-16 01:49:47',NULL),(120,'Polera blanca','Polera blanca de mujer. Para la dama. Elaborada en algodón y poliester. Abrigada y elegante!','L','Blanco',5700,10,2,5,'2021-12-11 00:50:42','2021-12-15 15:14:13',NULL),(161,'Vestido negro','Vestido negro para la dama. Confeccionado en seda fina. Vestido para eventos especiales.','M','Negro',17000,0,2,2,'2021-12-15 16:44:15','2021-12-15 16:44:15',NULL),(162,'Vestido rojo noche','Vestido rojo confeccionado en algodon.','L','Rojo',22000,0,2,3,'2021-12-15 17:23:21','2021-12-16 01:48:41',NULL),(163,'Vestido beige eventos','Vestido beige marca Ver. Excelente para eventos especiales.','XL','Beige',32000,0,2,4,'2021-12-15 17:25:01','2021-12-15 17:25:01',NULL),(164,'Vestido gris','Vestido gris fabricado en lycra 100%.','L','Negro',10000,10,2,5,'2021-12-15 17:28:39','2021-12-15 17:28:39',NULL),(165,'Vestido blanco','Vestido blanco en tela gasa.','S','Blanco',12000,0,2,2,'2021-12-15 17:33:02','2021-12-15 17:33:02',NULL),(166,'Corbata gris rayada','Corbata gris rayada. De seda','M','Negro',2700,0,1,2,'2021-12-15 22:54:13','2021-12-15 22:54:13',NULL),(167,'Corbata celeste','Corbata celeste polyester y algodón','XL','Blanco',4700,0,1,3,'2021-12-15 22:55:44','2021-12-15 22:55:44',NULL),(168,'Corbata negra','Corbata negra. A prueba de manchas','L','Negro',4300,20,1,5,'2021-12-15 22:58:04','2021-12-15 22:58:04',NULL),(169,'Corbata rayada','Corbata negra con rayas blancas','L','Negro',2600,40,1,4,'2021-12-15 23:03:05','2021-12-16 05:00:17',NULL),(170,'Conjunto corbata azul camisa negra','Camisa negra y de regalo una corbata!','L','Negro',12000,0,1,2,'2021-12-15 23:05:07','2021-12-15 23:05:07',NULL),(171,'Corbata gris seda','Corbata seda elegante para caballeros distinguidos!','L','Blanco',4700,0,1,3,'2021-12-15 23:06:13','2021-12-15 23:06:13',NULL),(172,'Corbata gris obscuro','Corbata gris oscuro para el trabajo','S','Negro',3500,10,1,5,'2021-12-15 23:07:13','2021-12-15 23:07:13',NULL),(173,'Corbata roja','Corbata roja para hombres audaces','M','Rojo',4000,30,1,4,'2021-12-15 23:09:19','2021-12-15 23:09:19',NULL),(174,'Elegante corbata gris','Elegante corbata gris claro. Seda. Para hombres distinguidos. Ejecutivo','L','Negro',7000,0,1,3,'2021-12-15 23:10:54','2021-12-15 23:10:54',NULL),(175,'Camisa blanca','Camisa blanca algodón original.','XL','Blanco',13000,0,1,2,'2021-12-15 23:15:26','2021-12-15 23:15:26',NULL),(176,'Chomba roja','Chomba roja cuello negro','L','Rojo',7800,0,1,3,'2021-12-15 23:17:35','2021-12-15 23:17:35',NULL),(177,'Conjunto saco pantalon','Conjunto saco pantalon negro. Casual informal. Camisa de regalo','XL','Negro',22700,10,1,5,'2021-12-15 23:30:41','2021-12-15 23:30:41',NULL),(178,'Saco cuadros marron','Saco a cuadros marron. Corbata de regalo','L','Negro',37000,0,1,3,'2021-12-15 23:32:23','2021-12-15 23:32:23',NULL),(179,'Saco negro','Saco informa negro. Poyester','S','Negro',16000,50,1,4,'2021-12-15 23:33:41','2021-12-15 23:33:41',NULL),(180,'Ambo gris','Elegante ambo gris en finisima seda para hombres exigentes. Camisa de regalo','L','Negro',37000,0,1,2,'2021-12-15 23:35:03','2021-12-15 23:35:03',NULL),(181,'Corbata estampada','Corbata para todo uso. Polyester. Blanco y negro','L','Blanco',6000,17,1,5,'2021-12-15 23:36:29','2021-12-16 00:19:56',NULL),(182,'Gafas obscuras original','Gafas oscuras con filtro uv.','L','Negro',5700,40,1,4,'2021-12-15 23:38:19','2021-12-15 23:38:19',NULL),(183,'Camisa blanca','Camisa casual. Confeccionada en algodón','M','Blanco',3700,0,1,2,'2021-12-15 23:39:36','2021-12-15 23:39:36',NULL),(184,'Remera gris','Remera gris marron. Algodon poliester.','L','Negro',4700,0,1,3,'2021-12-15 23:42:50','2021-12-15 23:42:50',NULL),(185,'Vestido negro mini ajustado','Vestido ajustado al cuerpo. Negro. Polyester','L','Negro',12000,0,2,2,'2021-12-16 00:02:32','2021-12-16 00:02:32',NULL),(186,'Vestido beige largo','Vestido para eventos especiales. Color beige largo hasta el suelo.','L','Beige',17000,0,2,3,'2021-12-16 00:03:37','2021-12-16 00:03:37',NULL),(187,'Vestido para adolescente','Vestido para adolescente. Color rosa. Largo medio.','S','Beige',17000,0,2,2,'2021-12-16 00:06:53','2021-12-16 00:14:31',NULL),(188,'Vestido floreado seda','Vestido negro blanco floreado. Liquidacion hasta agotar stock por cierre de temporada','XL','Blanco',15000,0,2,4,'2021-12-16 00:09:31','2021-12-17 09:00:21',NULL),(215,'fasfadf','dsfdasfdsafjlksdajflkjaskl','XL','Blanco',12121,67,1,2,'2021-12-17 08:26:59','2021-12-17 09:15:46',NULL);
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
INSERT INTO `sections` VALUES (1,'Banner','2021-11-13 01:52:05',NULL,NULL),(2,'Más vendidos','2021-11-13 01:52:05',NULL,NULL),(3,'Promoción','2021-11-13 01:52:05',NULL,NULL),(4,'Liquidación','2021-11-13 01:52:05',NULL,NULL),(5,'Ofertas','2021-10-10 00:00:00',NULL,NULL),(6,'Sugeridos','2021-10-10 00:00:00',NULL,NULL),(7,'Relacionados','2021-10-10 00:00:00',NULL,NULL),(8,'Últimos vistos','2021-10-10 00:00:00',NULL,NULL),(9,'Todos los productos','2021-10-10 00:00:00',NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Batman','Chirola','BB@pum.com','1234567','Sudaca','de',1,'2021-10-10 00:00:00',NULL,NULL),(3,'admin','uno','admin@roma.com','$2a$10$pPpKW12Fg4Yg6WV3EBf6KO0GR76cG1qKtrj.aIaj6uKIDExyisg5a','Argentina','1638921147049_img.jpg',2,'2021-12-07 23:52:27','2021-12-07 23:52:27',NULL),(7,'roma1','uno','admin@roma.com','$2a$10$NV689XiEzaNqDKOH.1Dc9uDoU8iJ7GKNPI1XwuCmcT15RIAll1Kyq','Brasil','default.png',1,'2021-12-09 18:32:34','2021-12-09 18:32:34',NULL),(8,'','','admin@roma.com','$2a$10$.3UwNJJPjLmCDe5CdglHdOUre20y.kc.5/eJ.Z9NmvH8KBVgk1UyK','Argentina','1639074778250_img.mwb',1,'2021-12-09 18:32:58','2021-12-09 18:32:58',NULL),(9,'','','','$2a$10$FxSC2.z6ODKkaEr5h51HIeJQUYpE0okJPkq0nXYEs.kHRykCzGrTm','','default.png',1,'2021-12-10 23:38:20','2021-12-10 23:38:20',NULL),(10,'','','admin@roma.com','$2a$10$O7CVvRJJHNQPKuCqxeZRNOzT5ft2mYYybJZJDBYlj5zjWdPcmAWBG','','default.png',1,'2021-12-11 02:40:17','2021-12-11 02:40:17',NULL),(11,'2232','','admin@roma.com','$2a$10$ZFoAN7t6RbNKUHDDWca01OZGsOBcq1Ceoec3uIdbkNG24qJUYZ7f.','','default.png',1,'2021-12-11 02:40:52','2021-12-11 02:40:52',NULL),(12,'daniel','asada','admin@roma.com','$2a$10$sWU.QpbzYhF/ncwmpvtCquVpm6Vc/ZjH8WlvsS.konhVBV4JKH7kC','Bolivia','1639191959657_img.jpg',1,'2021-12-11 03:06:00','2021-12-11 03:06:00',NULL),(13,'','','admin@roma.com','$2a$10$cT01MWopJfJC/SDkytqTuulXuze2fLU6A.7Q4JM706c5IJ3UIjc5O','','default.png',1,'2021-12-15 15:33:14','2021-12-15 15:33:14',NULL),(14,'','','admin@roma.com','$2a$10$ufdDHnflTyFTCKkU5wKNEeMmrrxpIksm4Yry9GEK9JvEvVNMRQdVS','','default.png',1,'2021-12-15 15:33:19','2021-12-15 15:33:19',NULL),(15,'ss','ss','admin@roma.com','$2a$10$lpKQ6UiMQB/8R/7AfbEAYuujbXfXYbKYYclljyFZLbpyjS.8q50/u','','default.png',1,'2021-12-15 15:36:19','2021-12-15 15:36:19',NULL),(16,'','','admin@roma.com','$2a$10$DAS5d0MDtjBfYcOf2Pdh4u3qZHggYWrpBRm6LM.TrfOPsg0U88eoW','','default.png',1,'2021-12-15 15:36:27','2021-12-15 15:36:27',NULL),(17,'','','admin@roma.com','$2a$10$aCyGrTMNTxT0taTKFZQUh.MlnETsql/jh1jgBGvp2/HxFGxyb5IJG','','default.png',1,'2021-12-15 15:36:37','2021-12-15 15:36:37',NULL),(18,'','','admin@roma.com','$2a$10$AeyZC28Ai6M8THBfxNotTuxE0gRmKNBjZOWJZdW6ptSM2B6OEIsLK','','default.png',1,'2021-12-15 15:40:14','2021-12-15 15:40:14',NULL),(19,'','','admin@roma.com','$2a$10$FK5s6.EN0lZDyoE1s1kPWOpVxaIuK3ESlkpKHqFZng6quIswWdOXq','','default.png',1,'2021-12-15 15:40:24','2021-12-15 15:40:24',NULL),(20,'a','','admin@roma.com','$2a$10$705TzDpRTXgJj90MGSOqTeXJB9GQIB2o4zkusZahUPCYopKXjhVyG','','default.png',1,'2021-12-15 15:40:30','2021-12-15 15:40:30',NULL),(21,'a','','admin@roma.com','$2a$10$SY/JidpWYdH8HjSSq4fxP.w84Hvd1pTjMzzVE204hoE6xW9Kof5h.','','default.png',1,'2021-12-15 15:40:40','2021-12-15 15:40:40',NULL),(22,'asdfas','','admin@roma.com','$2a$10$QQ9Pr7OiAilfYEczNQ8O/unJkNmioQTC39QS4jpMI9MawqwRXhxFK','','default.png',1,'2021-12-15 15:40:44','2021-12-15 15:40:44',NULL),(23,'','','admin@roma.com','$2a$10$EWTOI4ZQftWSIa24FO6IVuB1f2KJYuOzEaucKEXqhh2Htz9Tz//KG','','default.png',1,'2021-12-16 06:25:08','2021-12-16 06:25:08',NULL);
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

-- Dump completed on 2021-12-17  9:34:06
