/*

SQLyog Ultimate v8.55 
MySQL - 5.5.36 : Database - recruitment

*********************************************************************

*/



/*!40101 SET NAMES utf8 */;



/*!40101 SET SQL_MODE=''*/;



/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`recruitment` /*!40100 DEFAULT CHARACTER SET latin1 */;



USE `recruitment`;



/*Table structure for table `tbl_forgot_pass` */



DROP TABLE IF EXISTS `tbl_forgot_pass`;



CREATE TABLE `tbl_forgot_pass` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) NOT NULL,
  `TOKEN` varchar(40) NOT NULL,
  `TIME` int(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;



/*Data for the table `tbl_forgot_pass` */



/*Table structure for table `tbl_user` */



DROP TABLE IF EXISTS `tbl_user`;



CREATE TABLE `tbl_user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_NAME` varchar(50) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `PASSWORD` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=latin1;



/*Data for the table `tbl_user` */



insert  into `tbl_user`(`ID`,`USER_NAME`,`EMAIL`,`PASSWORD`) values (84,'yoosuf','pp.yoosuf@gmail.com','e10adc3949ba59abbe56e057f20f883e'),(85,'nishad','pp.nishad@gmail.com','e10adc3949ba59abbe56e057f20f883e');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

