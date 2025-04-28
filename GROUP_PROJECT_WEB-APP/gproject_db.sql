-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2025 at 04:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gproject_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

CREATE TABLE `links` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `link` varchar(2083) NOT NULL,
  `visit` int(11) DEFAULT 0,
  `lastvisit` varchar(99) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `links`
--

INSERT INTO `links` (`id`, `userId`, `name`, `link`, `visit`, `lastvisit`) VALUES
(25, 1, 'fb', 'https://web.facebook.com/reel/1446352360077686', 11, '04/17/2025'),
(28, 1, 'ttk', 'https://www.tiktok.com/foryou', 5, '04/17/2025'),
(31, 1, 'Tiktok-q', 'https://www.tiktok.com/@philosophy.pulse/video/7482833232908537110', 3, '04/17/2025'),
(32, 1, 'gg', 'https://www.tiktok.com/en/', 1, '04/17/2025'),
(38, 3, 'sasa', 'https://www.tiktok.com/', 2, '04/20/2025'),
(41, 3, 'fds', 'https://www.tiktok.com/@ramon_x71/video/7477305284352953618?is_from_webapp=1&sender_device=pc', 5, '04/26/2025');

-- --------------------------------------------------------

--
-- Table structure for table `quotes`
--

CREATE TABLE `quotes` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(99) DEFAULT NULL,
  `content` text NOT NULL,
  `dcreate` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quotes`
--

INSERT INTO `quotes` (`id`, `userId`, `title`, `content`, `dcreate`) VALUES
(74, 3, 'Haleluyahh', 'fuck you!', '04/17/2025'),
(78, 3, 'dsa', 'sdadsadsada', '04/17/2025'),
(108, 3, '\'lolo', '\"olol\"', '04/17/2025'),
(109, 3, 'Peter Drucker\'s', '\"The best way to predict the future is to create it.\"', '04/17/2025'),
(111, 3, 'fdsf', 'fdsfds', '04/18/2025'),
(112, 1, '=>Hi', '\"dhsajgdhjsagdhsagdhgsadhgsahdgash shdjkashdjksahdjsahdjkashdjksa sadhjkadhjkashdjakshdjkashdjksahdjksahdjkas.\"', '04/19/2025'),
(113, 3, 'Ey', 'Hgsahdgsahgdhsagddhjashdjakshdjsad', '04/20/2025');

-- --------------------------------------------------------

--
-- Table structure for table `todos`
--

CREATE TABLE `todos` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `descript` text DEFAULT NULL,
  `dueDate` varchar(99) NOT NULL,
  `status` varchar(99) NOT NULL,
  `dcreated` varchar(99) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `todos`
--

INSERT INTO `todos` (`id`, `userId`, `title`, `descript`, `dueDate`, `status`, `dcreated`) VALUES
(4, 3, 'Hi', 'do loop ', '04/29/2025', 'inprogress', '04/20/2025'),
(6, 3, 'Read', '', '04/29/2025', 'inprogress', '04/20/2025'),
(7, 3, 'dsad', 'dsadsa', '04/20/2025', 'completed', '04/20/2025'),
(8, 3, 'Helle', '', '04/30/2025', 'inprogress', '04/20/2025'),
(9, 3, 'Assignment', 'fcl pg.23', '04/25/2025', 'inprogress', '04/20/2025'),
(10, 3, 'Hehhehehe', '', '08/24/2025', 'inprogress', '04/20/2025'),
(14, 3, 'Assignment Java', 'Do grading system with mark and show all average per semesters and per exams!!', '04/21/2025', 'inprogress', '04/21/2025'),
(15, 3, 'Ass. Java', 'Do Student grading system where to store all grade per subject, average per semesters, marking and deanlisters qualify!!', '04/23/2025', 'inprogress', '04/21/2025'),
(16, 1, 'Hi', 'sasaasasa', '04/21/2025', 'completed', '04/21/2025'),
(17, 3, 'Hi', '', '04/21/2025', 'inprogress', '04/21/2025'),
(23, 3, 'Ass. Java', 'Do Student grading system where to store all grade per subject, average per semesters, marking and deanlisters qualify!!', '04/22/2025', 'completed', '04/22/2025'),
(24, 3, 'Hi HELLO', 'fuck youuu!!', '04/22/2025', 'completed', '04/22/2025'),
(25, 3, 'Added', '', '04/22/2025', 'inprogress', '04/22/2025'),
(27, 1, 'Haaaa!!', '', '04/22/2025', 'inprogress', '04/22/2025'),
(29, 3, 'TT past due!!1', '', '04/23/2025', 'inprogress', '04/23/2025'),
(30, 3, 'Ok lang po', '', '04/23/2025', 'inprogress', '04/23/2025'),
(31, 3, 'knock knock', '', '04/24/2025', 'inprogress', '04/23/2025');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(99) NOT NULL,
  `password` varchar(99) NOT NULL,
  `pfp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `pfp`) VALUES
(1, 'asd', 'asd', NULL),
(2, 'ds', 'ds', NULL),
(3, 'dito', 'dito', 0),
(4, 'aads', 'asd', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `links`
--
ALTER TABLE `links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `todos`
--
ALTER TABLE `todos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `links`
--
ALTER TABLE `links`
  ADD CONSTRAINT `links_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `quotes`
--
ALTER TABLE `quotes`
  ADD CONSTRAINT `quotes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `todos`
--
ALTER TABLE `todos`
  ADD CONSTRAINT `todos_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
