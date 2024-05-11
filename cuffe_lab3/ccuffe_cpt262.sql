-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 23, 2024 at 07:31 PM
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
-- Database: `ccuffe_cpt262`
--

-- --------------------------------------------------------

--
-- Table structure for table `cartinfo`
--

CREATE TABLE `cartinfo` (
  `dbcartid` int(11) NOT NULL,
  `dbcartemp` int(11) NOT NULL,
  `dbcartcust` int(11) NOT NULL,
  `dbcartdate` datetime NOT NULL,
  `dbcartdailyid` int(11) NOT NULL,
  `dbcartpickup` int(11) NOT NULL,
  `dbcartmade` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cartinfo`
--

INSERT INTO `cartinfo` (`dbcartid`, `dbcartemp`, `dbcartcust`, `dbcartdate`, `dbcartdailyid`, `dbcartpickup`, `dbcartmade`) VALUES
(54, 22, 23, '2022-02-16 08:34:37', 2, 0, 0),
(53, 19, 23, '2022-02-16 08:33:08', 1, 0, 0),
(55, 17, 0, '2024-02-26 20:17:01', 1, 0, 0),
(56, 17, 0, '2024-02-28 07:31:09', 1, 0, 0),
(57, 17, 0, '2024-02-28 07:31:09', 2, 0, 0),
(58, 17, 0, '2024-02-28 07:31:09', 3, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `customerrewards`
--

CREATE TABLE `customerrewards` (
  `dbcustrewardsid` int(11) NOT NULL,
  `dbcustrewardsname` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `customerrewards`
--

INSERT INTO `customerrewards` (`dbcustrewardsid`, `dbcustrewardsname`) VALUES
(1, 'Silver'),
(2, 'Gold'),
(3, 'Platinum');

-- --------------------------------------------------------

--
-- Table structure for table `customertable`
--

CREATE TABLE `customertable` (
  `dbcustomerid` int(11) NOT NULL,
  `dbcustomername` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `dbcustomeraddress` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `dbcustomerzip` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `dbcustomercredit` decimal(6,2) NOT NULL,
  `dbcustomeremail` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `dbcustomermember` tinyint(4) NOT NULL,
  `dbcustomerrewards` int(11) NOT NULL,
  `dbcustomerpassword` varchar(150) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `customertable`
--

INSERT INTO `customertable` (`dbcustomerid`, `dbcustomername`, `dbcustomeraddress`, `dbcustomerzip`, `dbcustomercredit`, `dbcustomeremail`, `dbcustomermember`, `dbcustomerrewards`, `dbcustomerpassword`) VALUES
(78, 'Another Test112', '4456 Test Blvd', '12345', 9999.99, 'another_test1@gmail.com', 0, 2, ''),
(19, 'Test Test1', '1234 Misc Lane2', '29566', 150.00, 'test_test1@gmail.com', 0, 2, ''),
(20, 'One More Test1', '2347 Test Row', '29582', 9999.99, 'one_more_test1@gmail.com', 0, 1, ''),
(21, 'TestCust', '1234 Testing Lane', '123456', 2000.00, 'test@customer.com', 1, 2, ''),
(22, 'Customer Joe', '1234 Customer Lane', '123456', 2000.00, 'customer@joe.com', 1, 2, ''),
(23, '1', '1', '1', 1.00, '1@1.com', 1, 1, ''),
(25, 'Test User', '1234 Cherry Lane', '29582', 2500.00, 'user@user.com', 1, 2, '$2b$10$oKKNrl./JPBUgS2Qalcqtuqq/ZsM0pQ99iMt2M.dVWH3/t1ZY356G'),
(26, '5', '5', '5', 5.00, '5@5.com', 1, 2, '$2b$10$udedBoxIatTjF0V28k4RBuWdAD4Ah0mT4038LKmGi/Sex0CQ5ua/y');

-- --------------------------------------------------------

--
-- Table structure for table `employeetable`
--

CREATE TABLE `employeetable` (
  `dbemployeekey` int(11) NOT NULL,
  `dbemployeeid` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `dbemployeename` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `dbemployeeemail` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `dbemployeephone` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `dbemployeesalary` double(6,2) NOT NULL,
  `dbemployeemailer` tinyint(1) NOT NULL,
  `dbemployeetype` tinyint(4) NOT NULL,
  `dbemployeepassword` varchar(150) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `employeetable`
--

INSERT INTO `employeetable` (`dbemployeekey`, `dbemployeeid`, `dbemployeename`, `dbemployeeemail`, `dbemployeephone`, `dbemployeesalary`, `dbemployeemailer`, `dbemployeetype`, `dbemployeepassword`) VALUES
(1, '1', '1', '1', '1', 1.00, 0, 1, ''),
(11, '8', '8', '1@1.com', '8', 8.00, 0, 2, ''),
(17, '864029', 'Test Emp1', 'test@test.com', '5041112394', 4500.00, 0, 1, '$2b$10$LO..JII1eiMejJ3DV.Si0OCxcPaUO3QEmqjXIc1KXsPAy4jVyOAFe'),
(13, '567279', 'EmpTest2', 'emptesttest@gmail.com', '1234567890', 9999.99, 0, 1, ''),
(14, '78978589', 'EmpTest12', 'emptesttest@gmail.com', '1234567890', 9999.99, 1, 2, ''),
(15, '234789', 'Employee Test', 'test@employee.com', '8435551489', 2000.00, 1, 1, ''),
(16, '12', '1', '1@1.com', '1', 1.00, 1, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `employeetypes`
--

CREATE TABLE `employeetypes` (
  `dbemptypeid` int(11) NOT NULL,
  `dbemptypename` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `employeetypes`
--

INSERT INTO `employeetypes` (`dbemptypeid`, `dbemptypename`) VALUES
(1, 'Manager'),
(2, 'Staff');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cartinfo`
--
ALTER TABLE `cartinfo`
  ADD PRIMARY KEY (`dbcartid`);

--
-- Indexes for table `customerrewards`
--
ALTER TABLE `customerrewards`
  ADD PRIMARY KEY (`dbcustrewardsid`);

--
-- Indexes for table `customertable`
--
ALTER TABLE `customertable`
  ADD PRIMARY KEY (`dbcustomerid`);

--
-- Indexes for table `employeetable`
--
ALTER TABLE `employeetable`
  ADD PRIMARY KEY (`dbemployeekey`);

--
-- Indexes for table `employeetypes`
--
ALTER TABLE `employeetypes`
  ADD PRIMARY KEY (`dbemptypeid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cartinfo`
--
ALTER TABLE `cartinfo`
  MODIFY `dbcartid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `customerrewards`
--
ALTER TABLE `customerrewards`
  MODIFY `dbcustrewardsid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customertable`
--
ALTER TABLE `customertable`
  MODIFY `dbcustomerid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `employeetable`
--
ALTER TABLE `employeetable`
  MODIFY `dbemployeekey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `employeetypes`
--
ALTER TABLE `employeetypes`
  MODIFY `dbemptypeid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
