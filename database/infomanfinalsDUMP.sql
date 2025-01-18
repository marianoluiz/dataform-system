-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: pdsdb
-- ------------------------------------------------------
-- Server version	8.0.40

CREATE DATABASE finalsinfoman; -- Creation of DB
use finalsinfoman;


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
-- Table structure for table `contact_info`
--

DROP TABLE IF EXISTS `contact_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_info` (
  `contact_id` int NOT NULL,
  `p_id` int DEFAULT NULL,
  `res_house_no` varchar(50) DEFAULT NULL,
  `res_house_street` varchar(50) DEFAULT NULL,
  `res_village` varchar(50) DEFAULT NULL,
  `res_bgy` varchar(50) DEFAULT NULL,
  `res_citymun` varchar(50) DEFAULT NULL,
  `res_prov` varchar(50) DEFAULT NULL,
  `res_zipcode` varchar(5) DEFAULT NULL,
  `perm_house_no` varchar(50) DEFAULT NULL,
  `perm_house_street` varchar(50) DEFAULT NULL,
  `perm_village` varchar(50) DEFAULT NULL,
  `perm_bgy` varchar(50) DEFAULT NULL,
  `perm_citymun` varchar(50) DEFAULT NULL,
  `perm_prov` varchar(50) DEFAULT NULL,
  `perm_zipcode` varchar(5) DEFAULT NULL,
  `tel_no` varchar(20) DEFAULT NULL,
  `mobile_no` varchar(20) DEFAULT NULL,
  `email_address` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`contact_id`),
  UNIQUE KEY `tel_no_UNIQUE` (`tel_no`),
  UNIQUE KEY `mobile_no_UNIQUE` (`mobile_no`),
  UNIQUE KEY `email_address_UNIQUE` (`email_address`),
  KEY `fk3_p_id_idx` (`p_id`),
  CONSTRAINT `fk3_p_id` FOREIGN KEY (`p_id`) REFERENCES `personal_info` (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_info`
--

LOCK TABLES `contact_info` WRITE;
/*!40000 ALTER TABLE `contact_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `family_background`
--

DROP TABLE IF EXISTS `family_background`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `family_background` (
  `fam_bg_id` int NOT NULL,
  `p_id` int DEFAULT NULL,
  `spouse_lname` varchar(50) DEFAULT NULL,
  `spouse_fname` varchar(50) DEFAULT NULL,
  `spouse_mname` varchar(50) DEFAULT NULL,
  `spouse_occupation` varchar(50) DEFAULT NULL,
  `spouse_employer` varchar(50) DEFAULT NULL,
  `spouse_emp_address` varchar(50) DEFAULT NULL,
  `father_lname` varchar(50) NOT NULL,
  `father_fname` varchar(50) NOT NULL,
  `father_mname` varchar(50) DEFAULT NULL,
  `mother_mn_lname` varchar(50) NOT NULL,
  `mother_mn_fname` varchar(50) NOT NULL,
  `mother_mn_mname` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`fam_bg_id`),
  KEY `p_id_idx` (`p_id`),
  CONSTRAINT `fk1_p_id` FOREIGN KEY (`p_id`) REFERENCES `personal_info` (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `family_background`
--

LOCK TABLES `family_background` WRITE;
/*!40000 ALTER TABLE `family_background` DISABLE KEYS */;
/*!40000 ALTER TABLE `family_background` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `family_children`
--

DROP TABLE IF EXISTS `family_children`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `family_children` (
  `fam_ch_id` int NOT NULL,
  `p_id` int DEFAULT NULL,
  `child_fullname` varchar(75) DEFAULT NULL,
  `child_dob` date DEFAULT NULL,
  PRIMARY KEY (`fam_ch_id`),
  KEY `p_id_idx` (`p_id`),
  CONSTRAINT `fk2_p_id` FOREIGN KEY (`p_id`) REFERENCES `personal_info` (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `family_children`
--

LOCK TABLES `family_children` WRITE;
/*!40000 ALTER TABLE `family_children` DISABLE KEYS */;
/*!40000 ALTER TABLE `family_children` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_info`
--

DROP TABLE IF EXISTS `personal_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_info` (
  `p_id` int NOT NULL,
  `sex_id` int DEFAULT NULL,
  `cstat_id` int DEFAULT NULL,
  `cit_id` int DEFAULT NULL,
  `cit_acq_id` int DEFAULT NULL,
  `l_name` varchar(50) NOT NULL,
  `f_name` varchar(50) NOT NULL,
  `m_name` varchar(50) DEFAULT NULL,
  `dob` date NOT NULL,
  `pob` varchar(50) NOT NULL,
  `height` int DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `blood_type` varchar(50) DEFAULT NULL,
  `gsis_no` varchar(50) DEFAULT NULL,
  `pagibig_id` varchar(50) DEFAULT NULL,
  `philhealth_id` varchar(50) DEFAULT NULL,
  `sss_no` varchar(50) DEFAULT NULL,
  `tin` varchar(50) DEFAULT NULL,
  `agency_empno` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`p_id`),
  UNIQUE KEY `gsis_no_UNIQUE` (`gsis_no`),
  UNIQUE KEY `pagibig_id_UNIQUE` (`pagibig_id`),
  UNIQUE KEY `philhealth_id_UNIQUE` (`philhealth_id`),
  UNIQUE KEY `sss_no_UNIQUE` (`sss_no`),
  UNIQUE KEY `tin_UNIQUE` (`tin`),
  UNIQUE KEY `agency_empno_UNIQUE` (`agency_empno`),
  KEY `sex_id_idx` (`sex_id`),
  KEY `cstat_id_idx` (`cstat_id`),
  KEY `cit_id_idx` (`cit_id`),
  KEY `cit_acq_id_idx` (`cit_acq_id`),
  CONSTRAINT `cit_acq_id` FOREIGN KEY (`cit_acq_id`) REFERENCES `ref_cit_acq` (`cit_acq_id`),
  CONSTRAINT `cit_id` FOREIGN KEY (`cit_id`) REFERENCES `ref_citizenship` (`cit_id`),
  CONSTRAINT `cstat_id` FOREIGN KEY (`cstat_id`) REFERENCES `ref_civilstatus` (`cstat_id`),
  CONSTRAINT `sex_id` FOREIGN KEY (`sex_id`) REFERENCES `ref_sex` (`sex_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_info`
--

LOCK TABLES `personal_info` WRITE;
/*!40000 ALTER TABLE `personal_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ref_cit_acq`
--

DROP TABLE IF EXISTS `ref_cit_acq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_cit_acq` (
  `cit_acq_id` int NOT NULL,
  `cit_acq_desc` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cit_acq_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ref_cit_acq`
--

LOCK TABLES `ref_cit_acq` WRITE;
/*!40000 ALTER TABLE `ref_cit_acq` DISABLE KEYS */;
/*!40000 ALTER TABLE `ref_cit_acq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ref_citizenship`
--

DROP TABLE IF EXISTS `ref_citizenship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_citizenship` (
  `cit_id` int NOT NULL,
  `cit_desc` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ref_citizenship`
--

LOCK TABLES `ref_citizenship` WRITE;
/*!40000 ALTER TABLE `ref_citizenship` DISABLE KEYS */;
/*!40000 ALTER TABLE `ref_citizenship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ref_civilstatus`
--

DROP TABLE IF EXISTS `ref_civilstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_civilstatus` (
  `cstat_id` int NOT NULL,
  `cstat_desc` varchar(50) NOT NULL,
  PRIMARY KEY (`cstat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ref_civilstatus`
--

LOCK TABLES `ref_civilstatus` WRITE;
/*!40000 ALTER TABLE `ref_civilstatus` DISABLE KEYS */;
/*!40000 ALTER TABLE `ref_civilstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ref_sex`
--

DROP TABLE IF EXISTS `ref_sex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_sex` (
  `sex_id` int NOT NULL,
  `sex_desc` varchar(6) NOT NULL,
  PRIMARY KEY (`sex_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ref_sex`
--

LOCK TABLES `ref_sex` WRITE;
/*!40000 ALTER TABLE `ref_sex` DISABLE KEYS */;
/*!40000 ALTER TABLE `ref_sex` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-05  1:21:03
