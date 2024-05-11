-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 23, 2024 at 07:30 PM
-- Server version: 5.7.23-23
-- PHP Version: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ccuffe_capstone`
--

-- --------------------------------------------------------

--
-- Table structure for table `brandstable`
--

CREATE TABLE `brandstable` (
  `dbbrandkey` int(10) NOT NULL,
  `dbbrandname` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `dbbranddescription` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `brandstable`
--

INSERT INTO `brandstable` (`dbbrandkey`, `dbbrandname`, `dbbranddescription`) VALUES
(1, 'Asics', ''),
(2, 'Callaway', ''),
(3, 'TaylorMade', ''),
(4, 'Titleist', '');

-- --------------------------------------------------------

--
-- Table structure for table `playerstable`
--

CREATE TABLE `playerstable` (
  `dbplayerkey` int(11) NOT NULL,
  `dbplayerid` int(50) NOT NULL,
  `dbplayerlname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `dbplayerfname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `dbplayeremail` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `dbplayerphone` varchar(18) COLLATE utf8_unicode_ci NOT NULL,
  `dbplayeraddress1` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `dbplayeraddress2` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dbplayerstate` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `dbplayercity` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `dbplayerzip` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `dbplayerrewards` tinyint(1) NOT NULL,
  `dbplayerpassword` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `playerstable`
--

INSERT INTO `playerstable` (`dbplayerkey`, `dbplayerid`, `dbplayerlname`, `dbplayerfname`, `dbplayeremail`, `dbplayerphone`, `dbplayeraddress1`, `dbplayeraddress2`, `dbplayerstate`, `dbplayercity`, `dbplayerzip`, `dbplayerrewards`, `dbplayerpassword`) VALUES
(1, 12345, 'Jarvis', 'Seth', 'sjarvis24@gmail.com', '5041238324', '1400 Edwards Mill Rd', '', 'NC', 'Raleigh', '27607', 1, ''),
(2, 1234, 'Skjei', 'Brady', 'bskjei76@gmail.com', '5047781928', '1400 Edwards Mill Rd', '', 'NC', 'Raleigh', '27607', 2, ''),
(4, 198203, 'Graves', 'Ryan', 'rgraves27@gmail.com', '4439951234', '6570 Deep Creek Parkway', '', 'MD', 'Elkridge', '21075', 3, ''),
(5, 479162, 'Gallagher', 'Brendan', 'brendangallagher11@gmail.com', '+15147238910', '5205 Riverneck Drive', '', 'NY', 'Rochester', '14602', 6, ''),
(6, 0, 'd', 'd', 'd@d.com', 'd', 'd', 'd', 'DE', 'd', 'd', 3, ''),
(7, 1, 'eee', 'deee', 'd@d.com', 'd', 'd', 'd', 'DE', 'd', 'd', 3, ''),
(8, 0, 'd', 'd', 'd@d.com', 'd', 'd', 'd', 'DE', 'd', 'd', 3, ''),
(9, 0, 'deee', 'd', 'd@d.com', 'd', 'd', 'd', 'DE', 'd', 'd', 3, ''),
(10, 1234568, 'Stein', 'Steve', 's.stein28@gmail.com', '8431237389', '4627 Watercrest Way', '', 'SC', 'Little River', '29566', 3, ''),
(15, 7242003, 'Cuffe', 'Cecilia', 'player@user.com', '8438777686', '4274 Graystone Court', '', 'SC', 'Myrtle Beach', '29582', 2, '$2b$10$DgOCI3vFWkL0hvsO8sA3a.tqrnM/NKuf.q5hVThSnKTtNR/YP.due'),
(16, 1238129389, 'Souder', 'Nellie', 'n_souder@gmail.com', '2401231234', '1234 Test', '', 'MD', 'Columbia', '21075', 3, '$2b$10$VQ8WNLloRIvwCsQWW7Bar.jHcFG/HVJ1aFWly9BUmtc8W.E6rpT6a');

-- --------------------------------------------------------

--
-- Table structure for table `productcategorytable`
--

CREATE TABLE `productcategorytable` (
  `dbproductcategorykey` int(10) NOT NULL,
  `dbproductcategoryname` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `dbproductcategorydescription` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `productcategorytable`
--

INSERT INTO `productcategorytable` (`dbproductcategorykey`, `dbproductcategoryname`, `dbproductcategorydescription`) VALUES
(1, 'Apparel', 'Hats, shoes, shirts, and pants.'),
(2, 'Clubs', 'Golf clubs');

-- --------------------------------------------------------

--
-- Table structure for table `productstable`
--

CREATE TABLE `productstable` (
  `dbproductkey` int(11) NOT NULL,
  `dbproductname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `dbproductbrand` int(11) NOT NULL,
  `dbproductmodel` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `dbproductdescription` text COLLATE utf8_unicode_ci NOT NULL,
  `dbproductcolor` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `dbproductcategory` int(11) NOT NULL,
  `dbproductprice` decimal(10,2) NOT NULL,
  `dbproductstock` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `productstable`
--

INSERT INTO `productstable` (`dbproductkey`, `dbproductname`, `dbproductbrand`, `dbproductmodel`, `dbproductdescription`, `dbproductcolor`, `dbproductcategory`, `dbproductprice`, `dbproductstock`) VALUES
(1, 'X-Tech Golf Glove', 2, 'Women\'s Medium', 'Golf gloves', 'Blue and white', 1, 17.99, 50),
(4, 'Stealth 21', 3, 'Driver', 'Carbon Twist FaceCarbon Reinforced Composite Ring', 'Red', 2, 350.99, 115),
(5, 'e', 1, 'e', 'e11', 'e', 1, 1.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `purchasedetailstable`
--

CREATE TABLE `purchasedetailstable` (
  `dbpurchasedetailkey` int(9) NOT NULL,
  `dbpurchasedetailpurchase` int(11) NOT NULL,
  `dbpurchasedetailitem` int(11) NOT NULL,
  `dbpurchasedetailitemcount` int(11) NOT NULL,
  `dbpurchasedetailitemprice` double(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchasestable`
--

CREATE TABLE `purchasestable` (
  `dbpurchasekey` int(9) NOT NULL,
  `dbpurchaseplayer` int(11) NOT NULL,
  `dbpurchaseuser` int(11) DEFAULT NULL,
  `dbpurchasedate` date NOT NULL,
  `dbpurchasetime` time NOT NULL,
  `dbpurchasestatus` varchar(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `purchasestable`
--

INSERT INTO `purchasestable` (`dbpurchasekey`, `dbpurchaseplayer`, `dbpurchaseuser`, `dbpurchasedate`, `dbpurchasetime`, `dbpurchasestatus`) VALUES
(1, 3, 3, '2024-04-12', '16:45:00', '2'),
(2, 0, NULL, '2024-04-17', '00:00:00', ''),
(3, 0, NULL, '2024-04-17', '00:00:00', ''),
(4, 2, 3, '2024-04-11', '00:00:00', '1'),
(5, 2, 3, '2024-04-10', '00:00:00', '1'),
(6, 2, 3, '2024-04-10', '00:00:00', '1'),
(7, 2, 3, '2024-04-09', '18:41:00', '1'),
(8, 4, 3, '2024-04-25', '11:29:00', '1');

-- --------------------------------------------------------

--
-- Table structure for table `reservationstable`
--

CREATE TABLE `reservationstable` (
  `dbreservationkey` int(9) NOT NULL,
  `dbreservationplayer` int(11) DEFAULT NULL,
  `dbreservationuser` int(11) NOT NULL,
  `dbreservationdate` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `dbreservationtime` int(1) NOT NULL,
  `dbreservationgroup` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `reservationstable`
--

INSERT INTO `reservationstable` (`dbreservationkey`, `dbreservationplayer`, `dbreservationuser`, `dbreservationdate`, `dbreservationtime`, `dbreservationgroup`) VALUES
(4, 5, 1, '2024-03-26', 11, 3),
(5, 3, 2, '2024-03-28', 7, 2),
(6, 3, 5, '2024-03-12', 18, 2),
(7, 4, 3, '2024-03-28', 2, 3),
(8, 4, 3, '2024-04-23', 13, 3),
(9, 3, 2, '2024-04-23', 13, 3),
(10, 2, 3, '2024-04-25', 17, 3),
(11, 5, 3, '', 6, 4),
(12, 3, 4, '2024-04-17', 2, 1),
(13, 4, 3, '2024-04-23', 7, 3);

-- --------------------------------------------------------

--
-- Table structure for table `reservationstimestable`
--

CREATE TABLE `reservationstimestable` (
  `dbreservationstimeskey` int(2) NOT NULL,
  `dbreservationstimestime` time NOT NULL,
  `dbreservationstimeduration` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `reservationstimestable`
--

INSERT INTO `reservationstimestable` (`dbreservationstimeskey`, `dbreservationstimestime`, `dbreservationstimeduration`) VALUES
(1, '08:00:00', '8:00AM - 8:08AM'),
(2, '08:08:00', '8:08AM - 8:16AM'),
(3, '08:16:00', '8:16AM - 8:24AM'),
(4, '08:24:00', '8:24AM - 8:32AM'),
(5, '08:32:00', '8:32AM - 8:40AM'),
(6, '08:40:00', '8:40AM - 8:48AM'),
(7, '08:48:00', '8:48AM - 8:56AM'),
(8, '08:56:00', '8:56AM - 9:04AM'),
(9, '09:04:00', '9:04AM - 9:12AM'),
(10, '09:12:00', '9:12AM - 9:20AM'),
(11, '09:20:00', '9:20AM - 9:28AM'),
(12, '09:28:00', '9:28AM - 9:36AM'),
(13, '09:36:00', '9:36AM - 9:44AM'),
(14, '09:44:00', '9:44AM - 9:52AM'),
(15, '09:52:00', '9:52AM - 10:00AM'),
(16, '10:00:00', '10:00AM - 10:08AM'),
(17, '10:08:00', '10:08AM - 10:16AM'),
(18, '10:16:00', '10:16AM - 10:24AM'),
(19, '10:24:00', '10:24AM - 10:32AM'),
(20, '10:32:00', '10:32AM - 10:40AM'),
(21, '10:40:00', '10:40AM - 10:48AM'),
(22, '10:48:00', '10:48AM - 10:56AM'),
(23, '10:56:00', '10:56AM - 11:04AM'),
(24, '11:04:00', '11:04AM - 11:12AM'),
(25, '11:12:00', '11:12AM - 11:20AM'),
(26, '11:20:00', '11:20AM - 11:28AM'),
(27, '11:28:00', '11:28AM - 11:36AM'),
(28, '11:36:00', '11:36AM - 11:44AM'),
(29, '11:44:00', '11:44AM - 11:52AM'),
(30, '11:52:00', '11:52AM - 12:00PM'),
(31, '12:00:00', '12:00PM - 12:08PM'),
(32, '12:08:00', '12:08PM - 12:16PM'),
(33, '12:16:00', '12:16PM - 12:24PM'),
(34, '12:24:00', '12:24PM - 12:32PM'),
(35, '12:32:00', '12:32PM - 12:40PM'),
(36, '12:40:00', '12:40PM - 12:48PM'),
(37, '12:48:00', '12:48PM - 12:56PM'),
(38, '12:56:00', '12:56PM - 1:04PM'),
(39, '13:04:00', '1:04PM - 1:12PM'),
(40, '13:12:00', '1:12PM - 1:20PM'),
(41, '13:20:00', '1:20PM - 1:28PM'),
(42, '13:28:00', '1:28PM - 1:36PM'),
(43, '13:36:00', '1:36PM - 1:44PM'),
(44, '13:44:00', '1:44PM - 1:52PM'),
(45, '13:52:00', '1:52PM - 2:00PM'),
(46, '14:00:00', '2:00PM - 2:08PM'),
(47, '14:08:00', '2:08PM - 2:16PM'),
(48, '14:16:00', '2:16PM - 2:24PM'),
(49, '14:24:00', '2:24PM - 2:32PM'),
(50, '14:32:00', '2:32PM - 2:40PM'),
(51, '14:40:00', '2:40PM - 2:48PM'),
(52, '14:48:00', '2:48PM - 2:56PM'),
(53, '14:56:00', '2:56PM - 3:04PM'),
(54, '15:04:00', '3:04PM - 3:12PM'),
(55, '15:12:00', '3:12PM - 3:20PM'),
(56, '15:20:00', '3:20PM - 3:28PM'),
(57, '15:28:00', '3:28PM - 3:36PM'),
(58, '15:36:00', '3:36PM - 3:44PM'),
(59, '15:44:00', '3:44PM - 3:52PM'),
(60, '15:52:00', '3:52PM - 4:00PM');

-- --------------------------------------------------------

--
-- Table structure for table `rewardstable`
--

CREATE TABLE `rewardstable` (
  `dbrewardskey` int(11) NOT NULL,
  `dbrewardsdescription` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `rewardstable`
--

INSERT INTO `rewardstable` (`dbrewardskey`, `dbrewardsdescription`) VALUES
(1, 'Monthly'),
(2, 'Annual'),
(3, 'Winter'),
(4, 'Spring'),
(5, 'Summer'),
(6, 'Semi-Annual');

-- --------------------------------------------------------

--
-- Table structure for table `statusestable`
--

CREATE TABLE `statusestable` (
  `dbstatuskey` tinyint(1) NOT NULL,
  `dbstatusdescription` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `statusestable`
--

INSERT INTO `statusestable` (`dbstatuskey`, `dbstatusdescription`) VALUES
(1, 'Open'),
(2, 'Closed');

-- --------------------------------------------------------

--
-- Table structure for table `usercategorytable`
--

CREATE TABLE `usercategorytable` (
  `dbusercategoryid` int(3) NOT NULL,
  `dbusercategorydescription` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `dbusercategorypermissions` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `usercategorytable`
--

INSERT INTO `usercategorytable` (`dbusercategoryid`, `dbusercategorydescription`, `dbusercategorypermissions`) VALUES
(1, 'Manager', 'Everything'),
(2, 'Front Desk', 'Only reservations'),
(3, 'Assistant', 'All searches');

-- --------------------------------------------------------

--
-- Table structure for table `usertable`
--

CREATE TABLE `usertable` (
  `dbuserkey` int(11) NOT NULL,
  `dbuserid` int(11) NOT NULL,
  `dbuserlname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `dbuserfname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `dbuseremail` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `dbuserphone` varchar(18) COLLATE utf8_unicode_ci NOT NULL,
  `dbuseraddress1` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `dbuseraddress2` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dbuserstate` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `dbusercity` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `dbuserzip` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `dbuserpassword` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `dbusercategory` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `usertable`
--

INSERT INTO `usertable` (`dbuserkey`, `dbuserid`, `dbuserlname`, `dbuserfname`, `dbuseremail`, `dbuserphone`, `dbuseraddress1`, `dbuseraddress2`, `dbuserstate`, `dbusercity`, `dbuserzip`, `dbuserpassword`, `dbusercategory`) VALUES
(1, 123456, 'lasdfajslkf', 'fasdfjksalfj', 'email@email.com', '1234567890', 'a1sdjfk', 'a2asdjfkla', 'AL', 'cadsjkfl', '123456', '$2b$10$UFjKxkw3H3oO.nmuAkUCrOqCibvzmLQb7NaP63AIuN3vfoLUTosNS', 2),
(2, 654321, 'ladslkfaskl', 'Test', 'email@test.com', '1234567890', 'asdjfkalsdjfl', 'ajskdlfjadsklf', 'FL', 'Tallahassee', '12345', '$2b$10$REkw1S5R98nWdnCeR8hZa.hIZm9cL2K5Qa7FV5bS8p/JnaybFv6wa', 1),
(3, 193820, 'Griffith', 'Stephen', 's_griffith@gmail.com', '8435551930', '2349 Waterfront Way', '', 'SC', 'Little River', '29566', '$2b$10$kFPDY4IGPmFEbcad1toPbexPt4uTExRVafDcrZSRT71d1/jV3vs9y', 2),
(4, 0, 'd', 'd', 'd', 'd', 'd', 'd', 'DE', 'd', 'd', '$2b$10$MRIEaxhVSKOAQVk17P7e.egFm2i8fBQrjUlt3A3BmoHQxUnngjmL.', 2),
(5, 123910, 'Staffmember1', 'Stanley', 'user@user.com', '8437172929', '1239 Whistle Court', '', 'SC', 'Little River', '29566', '$2b$10$7fnvkEJDJefjZUiIiRisUek5dR7OCh39IBH0ES.xWhKiE1X4neeNm', 1),
(6, 123910, 'Staffmember', 'Stanley', 'user@user.com', '8437172929', '1239 Whistle Court', '', 'SC', 'Little River', '29566', '$2b$10$VJc1MLkSO0tnYRzQ6qg27.BvHKjBRMOIsbXRmeqTwn4n7Wa6/UKBG', 1),
(7, 1234567, 'Assistant', 'Ashley', 'ashley_assistant@tctg.com', '8435551729', '1920 Heather Glen Way', '', 'SC', 'Little River', '29566', '$2b$10$qL95oNhT3Ekri1dArKOqLulDz5pI3QCiO3CrGn5PLfT3uIHjYfp3K', 3),
(8, 111111, 'eeeeeee22', 'eeeeee', 'e@e.com', 'eeeeeee', 'eeeeee', 'eeeeee', 'AL', 'e', 'eeeee', '$2b$10$013FMqMnZmrMc75ocfpJiOortJYGShE.0QApWcmcPjc1oCp4bIVAa', 3),
(9, 1111111, 'ttttttt', 'ttttttt', 'y@y.com', 'ttttrtt', 'ttttttt', 'ttttttt', 'TN', 'y', 'ttttt', '$2b$10$wmLHl2gMAY7m3YfLV5pqWOahgSc5C9Df.81BQ5D3IqBaZAFEdx0Ue', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brandstable`
--
ALTER TABLE `brandstable`
  ADD PRIMARY KEY (`dbbrandkey`);

--
-- Indexes for table `playerstable`
--
ALTER TABLE `playerstable`
  ADD PRIMARY KEY (`dbplayerkey`);

--
-- Indexes for table `productcategorytable`
--
ALTER TABLE `productcategorytable`
  ADD PRIMARY KEY (`dbproductcategorykey`);

--
-- Indexes for table `productstable`
--
ALTER TABLE `productstable`
  ADD PRIMARY KEY (`dbproductkey`);

--
-- Indexes for table `purchasedetailstable`
--
ALTER TABLE `purchasedetailstable`
  ADD PRIMARY KEY (`dbpurchasedetailkey`);

--
-- Indexes for table `purchasestable`
--
ALTER TABLE `purchasestable`
  ADD PRIMARY KEY (`dbpurchasekey`);

--
-- Indexes for table `reservationstable`
--
ALTER TABLE `reservationstable`
  ADD PRIMARY KEY (`dbreservationkey`);

--
-- Indexes for table `reservationstimestable`
--
ALTER TABLE `reservationstimestable`
  ADD PRIMARY KEY (`dbreservationstimeskey`);

--
-- Indexes for table `rewardstable`
--
ALTER TABLE `rewardstable`
  ADD PRIMARY KEY (`dbrewardskey`);

--
-- Indexes for table `statusestable`
--
ALTER TABLE `statusestable`
  ADD PRIMARY KEY (`dbstatuskey`);

--
-- Indexes for table `usercategorytable`
--
ALTER TABLE `usercategorytable`
  ADD PRIMARY KEY (`dbusercategoryid`);

--
-- Indexes for table `usertable`
--
ALTER TABLE `usertable`
  ADD PRIMARY KEY (`dbuserkey`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brandstable`
--
ALTER TABLE `brandstable`
  MODIFY `dbbrandkey` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `playerstable`
--
ALTER TABLE `playerstable`
  MODIFY `dbplayerkey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `productcategorytable`
--
ALTER TABLE `productcategorytable`
  MODIFY `dbproductcategorykey` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `productstable`
--
ALTER TABLE `productstable`
  MODIFY `dbproductkey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `purchasedetailstable`
--
ALTER TABLE `purchasedetailstable`
  MODIFY `dbpurchasedetailkey` int(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchasestable`
--
ALTER TABLE `purchasestable`
  MODIFY `dbpurchasekey` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `reservationstable`
--
ALTER TABLE `reservationstable`
  MODIFY `dbreservationkey` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `reservationstimestable`
--
ALTER TABLE `reservationstimestable`
  MODIFY `dbreservationstimeskey` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `rewardstable`
--
ALTER TABLE `rewardstable`
  MODIFY `dbrewardskey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `statusestable`
--
ALTER TABLE `statusestable`
  MODIFY `dbstatuskey` tinyint(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usercategorytable`
--
ALTER TABLE `usercategorytable`
  MODIFY `dbusercategoryid` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `usertable`
--
ALTER TABLE `usertable`
  MODIFY `dbuserkey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
