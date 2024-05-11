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
-- Database: `ccuffe_epic`
--

-- --------------------------------------------------------

--
-- Table structure for table `coursedetail`
--

CREATE TABLE `coursedetail` (
  `coursedetailid` int(11) NOT NULL,
  `coursedetailcourse` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `coursedetailcampus` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `coursedetailsemester` varchar(7) COLLATE utf8_unicode_ci NOT NULL,
  `coursedetailyear` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `coursedetailsection` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `coursedetailinstructor` int(11) NOT NULL,
  `coursedetailSLO` varchar(5) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `coursedetail`
--

INSERT INTO `coursedetail` (`coursedetailid`, `coursedetailcourse`, `coursedetailcampus`, `coursedetailsemester`, `coursedetailyear`, `coursedetailsection`, `coursedetailinstructor`, `coursedetailSLO`) VALUES
(1, '1', 'conway', 'fall', '2024', 'C01', 2, '3.2'),
(2, '1', 'grandstrand', 'spring', '2026', 'C03', 1, '1.75'),
(3, '2', 'conway', 'fall', '2024', '11111', 2, '4.7'),
(4, '1', 'conway', 'fall', '2024', '11111', 2, '5.2'),
(5, '1', 'conway', 'fall', '2024', '111', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `courseid` int(11) NOT NULL,
  `courseprefix` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `coursenumber` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `courseSLO` decimal(4,1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`courseid`, `courseprefix`, `coursenumber`, `courseSLO`) VALUES
(1, 'CPT', '101', 0.0),
(2, 'IST', '274', 0.0);

-- --------------------------------------------------------

--
-- Table structure for table `instructors`
--

CREATE TABLE `instructors` (
  `instructorid` int(11) NOT NULL,
  `instructorfname` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `instructorlname` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `instructoremail` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `instructors`
--

INSERT INTO `instructors` (`instructorid`, `instructorfname`, `instructorlname`, `instructoremail`) VALUES
(1, 'Test Facu', 'Test Facu', 'test_fac@hgtc.edu'),
(2, 'TestFirst', 'TestLast', 'first_last@hgtc.edu'),
(3, 'aaaaaa', 'aaaaaa', 'e@e.com'),
(4, 'q', 'q', 'qq@q.com');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userkey` int(11) NOT NULL,
  `useremail` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `userpassword` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userkey`, `useremail`, `userpassword`) VALUES
(1, 'test@test.com', '$2b$10$LO..JII1eiMejJ3DV.Si0OCxcPaUO3QEmqjXIc1KXsPAy4jVyOAFe');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `coursedetail`
--
ALTER TABLE `coursedetail`
  ADD PRIMARY KEY (`coursedetailid`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`courseid`);

--
-- Indexes for table `instructors`
--
ALTER TABLE `instructors`
  ADD PRIMARY KEY (`instructorid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userkey`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `coursedetail`
--
ALTER TABLE `coursedetail`
  MODIFY `coursedetailid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `courseid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `instructors`
--
ALTER TABLE `instructors`
  MODIFY `instructorid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userkey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
