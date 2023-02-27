-- MySQL (x86_64)
--
-- Host: localhost    Database: foodbox
-- ------------------------------------------------------
-- Port: 3306

CREATE DATABASE IF NOT EXISTS foodbox;
USE foodbox;

-- Drop tables --
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS cuisines;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS userRoles;
DROP TABLE IF EXISTS products;

-- ########   TABLES WITH NO FOREIGN KEYS ###### --
--
-- Table: cuisines
--
CREATE TABLE cuisines
(
cuisineid bigint NOT NULL AUTO_INCREMENT,
cuisineName varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
PRIMARY KEY (cuisineid)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table: tags
--
CREATE TABLE tags
(
tag_Id bigint NOT NULL AUTO_INCREMENT,
tagname varchar(255) NOT NULL COLLATE utf8mb4_unicode_ci,
productcount int DEFAULT 0,
PRIMARY KEY (tag_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table: userRoles
--
CREATE TABLE userRoles
(
roleid bigint NOT NULL AUTO_INCREMENT,
roletype varchar(50) COLLATE utf8mb4_unicode_ci,
PRIMARY KEY (roleid)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table: products
--
CREATE TABLE products
(
	productId bigint NOT NULL AUTO_INCREMENT,
	productImageUrl varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	productName varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	price decimal(19,2) DEFAULT NULL,
	calories int NOT NULL DEFAULT 0,
	rating float NOT NULL DEFAULT 0,
	numOfReviews float NOT NULL DEFAULT 0,
	description longtext DEFAULT NULL,
	tags tinyblob DEFAULT NULL,
	cuisines tinyblob DEFAULT NULL,
	dateCreated datetime(6) default NULL,
	PRIMARY KEY (productId)	
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ########   TABLES WITH FOREIGN KEYS ###### --

--
-- Table: users
--
CREATE TABLE users
(
userid bigint NOT NULL AUTO_INCREMENT,
roleid bigint,
firstname varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
lastname varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
username varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
email varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
password varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
phoneNumber varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
address varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
dateCreated timestamp default NULL,
PRIMARY KEY (userid),
FOREIGN KEY (roleid) REFERENCES userroles(roleid)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
