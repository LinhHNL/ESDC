-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2023 at 04:44 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `warehouse`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `Account_ID` int(11) NOT NULL,
  `Email` varchar(60) NOT NULL,
  `Password` varchar(60) DEFAULT NULL,
  `Status` int(11) DEFAULT 0 CHECK (`Status` in (0,1,2)),
  `Role_ID` int(11) NOT NULL,
  `Token_Login` varchar(60) NOT NULL,
  `Employee_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`Account_ID`, `Email`, `Password`, `Status`, `Role_ID`, `Token_Login`, `Employee_ID`) VALUES
(16, 'huynhnhatlinh1206@gmail.com', '$2b$10$E2iTRSwlOlrpwPrHlUW/Je68qNt/S2gYYzqInmOUGfDK7p1QvEwIG', 1, 1, 'SVX3L5sRMs6HniXa54dz5s7xQoidlW_1701385461308', 17),
(17, 'huynhnhatlinssssh1206@gmail.com', 'default-password', 0, 1, 'xLUIbBECl1NyYl6rZwya43qrWcFjHi_1700713750008', 18),
(18, 'huynhnhatlinh1212312306@gmail.com', 'default-password', 0, 1, 'yV08HnsuIzf7VyEoGXXe0w1DIkfn8b_1700718346807', 20),
(19, 'huynh12312312nhatlinh1206@gmail.com', 'default-password', 0, 1, 'JX5zJIz6zj6xV8F3YhLvJHVwY8BjR2_1700718564072', 21),
(20, 'huynh123123123123123nhatlinh1206@gmail.com', 'default-password', 0, 1, 'd7MgkyjWWHnHMS1lCyrJNBvIY8ohRp_1701385457509', 22),
(21, 'huynhnha123123123tlinh1206@gmail.com', 'default-password', 0, 1, '446TAcTg4yP27YTNLJaGrENI0yFEat_1701385445689', 23);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `Category_ID` int(11) NOT NULL,
  `Name` varchar(60) NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`Category_ID`, `Name`, `Description`) VALUES
(1, 'Áo', '0'),
(2, 'Quần ', 'Quần để mặc'),
(3, 'Giày ', '0'),
(4, 'Đồng Hồ', '0'),
(5, 'Ví ', '0'),
(6, 'Balo ', '0'),
(8, 'Mũ ', '0'),
(9, 'Túi Xách', '0'),
(10, 'Ling', 'Đẹp trai vl'),
(11, 'HÊHEE', 'Vl ảo ');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `Employee_ID` int(11) NOT NULL,
  `Name` varchar(60) NOT NULL,
  `BirthDay` date NOT NULL,
  `Salary` float NOT NULL,
  `Status` int(11) NOT NULL,
  `Position_ID` int(11) NOT NULL,
  `Email` varchar(60) NOT NULL,
  `Image` longtext NOT NULL,
  `Start_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`Employee_ID`, `Name`, `BirthDay`, `Salary`, `Status`, `Position_ID`, `Email`, `Image`, `Start_date`) VALUES
(17, 'John Doe', '1990-11-01', 50000, 1, 1, 'huynhnhatlinh1206@gmail.com', '/images/4e21b10f-57bd-4dbe-9f46-6bc8f123d9d7.jpg', '2023-11-23'),
(18, 'John Doe', '1990-01-02', 50000, 1, 1, 'huynsh1206@gmail.com', '/images/d9044036-8cd6-4bdc-a2cf-9ec5a0223d8b.jpg', '2023-11-23'),
(20, '123123', '2004-05-12', 123, 1, 1, 'huynhnhatlinh1212312306@gmail.com', '/images/69c53372-44d3-4ff7-817a-8d51b0ee0078.jpg', '2023-11-23'),
(21, '123123', '2003-05-12', 123, 1, 1, 'huynh12312312nhatlinh1206@gmail.com', '/images/7e2dd6fc-2fb3-4ddf-89d7-09cc8ed31aac.jpg', '2023-11-23'),
(22, '123123', '2003-05-12', 123, 1, 1, 'huynh123123123123123nhatlinh1206@gmail.com', '/images/3f50caaa-7234-4b7f-9f64-2f9ce4fe6886.jpg', '2023-11-23'),
(23, '123123', '2003-05-12', 123123, 1, 1, 'huynhnha123123123tlinh1206@gmail.com', '/images/122b26eb-701b-49be-9f88-593b6cd93176.jpg', '2023-12-01');

-- --------------------------------------------------------

--
-- Table structure for table `export`
--

CREATE TABLE `export` (
  `Export_ID` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `Employee_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `export`
--

INSERT INTO `export` (`Export_ID`, `date`, `Employee_ID`) VALUES
(2, '2023-11-25 10:46:04', 17),
(3, '2023-11-25 10:46:04', 17),
(4, '2023-11-25 10:46:04', 17),
(5, '2023-11-25 10:46:04', 17),
(6, '2023-11-25 10:46:04', 17),
(7, '2023-11-25 10:46:04', 17),
(8, '2023-11-25 10:46:04', 17),
(9, '2023-11-25 10:46:04', 17),
(10, '2023-11-25 10:46:04', 17),
(11, '2023-11-25 10:46:04', 17),
(12, '2023-11-25 10:46:04', 17),
(13, '2023-11-25 10:46:04', 17),
(14, '2023-12-01 05:24:49', 17),
(15, '2023-12-01 05:26:13', 17),
(16, '2023-12-01 05:36:10', 17);

-- --------------------------------------------------------

--
-- Table structure for table `export_details`
--

CREATE TABLE `export_details` (
  `Export_ID` int(11) NOT NULL,
  `Product_ID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Inventory_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `export_details`
--
DELIMITER $$
CREATE TRIGGER `update_Inventory_after_insert_export_details` AFTER INSERT ON `export_details` FOR EACH ROW BEGIN
  DECLARE calculated_bank FLOAT ;
  DECLARE calculated_capacity FLOAT ;
  
    SELECT Length * Width * Height INTO calculated_capacity
    FROM product
    WHERE Product_ID = NEW.Product_ID;

    SELECT Weight INTO calculated_bank
    FROM product
    WHERE Product_ID = NEW.Product_ID;
	

		
  UPDATE inventory
  SET Blank = Blank + calculated_bank*NEW.Quantity , capacity = capacity + calculated_capacity*NEW.Quantity
  WHERE Inventory_ID = NEW.Inventory_ID;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_Quantity_Product_After_export_details` AFTER INSERT ON `export_details` FOR EACH ROW BEGIN
    UPDATE product SET Quantity = Quantity - NEW.Quantity WHERE Product_ID = NEW.Product_ID;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `import`
--

CREATE TABLE `import` (
  `Import_ID` int(11) NOT NULL,
  `Employee_ID` int(11) NOT NULL,
  `Date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `import`
--

INSERT INTO `import` (`Import_ID`, `Employee_ID`, `Date`) VALUES
(1, 17, '2023-11-24 16:22:23'),
(2, 17, '2023-11-25 10:43:05'),
(3, 17, '2023-11-25 10:46:04'),
(4, 17, '2023-11-25 10:47:48'),
(5, 17, '2023-11-25 10:48:28'),
(6, 17, '2023-11-25 10:49:54'),
(7, 17, '2023-11-25 10:50:40'),
(8, 17, '2023-11-25 10:52:05'),
(9, 17, '2023-11-25 10:52:54'),
(10, 17, '2023-11-25 10:53:31'),
(11, 17, '2023-11-25 10:55:13'),
(12, 17, '2023-11-25 10:55:58'),
(13, 17, '2023-11-25 10:57:06'),
(14, 17, '2023-11-25 10:58:24'),
(15, 17, '2023-11-25 10:59:32'),
(16, 17, '2023-11-25 11:00:26'),
(17, 17, '2023-11-25 11:00:58'),
(18, 17, '2023-11-30 18:54:26'),
(19, 17, '2023-11-30 20:04:55'),
(20, 17, '2023-11-30 21:35:54'),
(21, 17, '2023-12-01 05:24:21');

-- --------------------------------------------------------

--
-- Table structure for table `import_details`
--

CREATE TABLE `import_details` (
  `Import_ID` int(11) NOT NULL,
  `Product_ID` int(11) NOT NULL,
  `Inventory_ID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `import_details`
--

INSERT INTO `import_details` (`Import_ID`, `Product_ID`, `Inventory_ID`, `Quantity`) VALUES
(1, 2, 1, 3),
(1, 4, 5, 1),
(1, 1, 7, 12312),
(1, 1, 11, 223),
(1, 1, 3, 223),
(15, 1, 2, 12),
(16, 1, 4, 12),
(16, 2, 4, 12),
(17, 2, 2, 12),
(17, 10, 5, 12),
(18, 4, 5, 12),
(20, 1, 2, 12),
(21, 1, 3, 12),
(21, 10, 4, 12);

--
-- Triggers `import_details`
--
DELIMITER $$
CREATE TRIGGER `insert_inventory_details_after_insert_import_details` AFTER INSERT ON `import_details` FOR EACH ROW BEGIN
    INSERT INTO `inventory_details`(`Product_ID`, `Inventory_ID`, `Quantity`, `Import_ID`) VALUES(NEW.Product_ID,NEW.Inventory_ID,NEW.Quantity,NEW.Import_ID);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_Inventory_after_insert_import_details` AFTER INSERT ON `import_details` FOR EACH ROW BEGIN
  DECLARE calculated_bank FLOAT ;
  DECLARE calculated_capacity FLOAT ;
  
    SELECT Length * Width * Height INTO calculated_capacity
    FROM product
    WHERE Product_ID = NEW.Product_ID;

    SELECT Weight INTO calculated_bank
    FROM product
    WHERE Product_ID = NEW.Product_ID;
	

		
  UPDATE inventory
  SET Blank = Blank - calculated_bank*NEW.Quantity , capacity = capacity - calculated_capacity*NEW.Quantity
  WHERE Inventory_ID = NEW.Inventory_ID;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_Quantity_Product_After_import_details` AFTER INSERT ON `import_details` FOR EACH ROW BEGIN
    UPDATE product SET Quantity = Quantity + NEW.Quantity WHERE Product_ID = NEW.Product_ID;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `Inventory_ID` int(11) NOT NULL,
  `Name` varchar(60) NOT NULL,
  `Max_Weight` float NOT NULL,
  `Height` float NOT NULL,
  `Width` float NOT NULL,
  `is_Full` tinyint(1) NOT NULL,
  `Blank` float NOT NULL,
  `Length` float NOT NULL,
  `capacity` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`Inventory_ID`, `Name`, `Max_Weight`, `Height`, `Width`, `is_Full`, `Blank`, `Length`, `capacity`) VALUES
(1, 'A101', 100, 600, 600, 0, 100, 600, 216000000),
(2, 'A102', 100, 600, 600, 0, 94, 600, 210240000),
(3, 'A103', 100, 600, 600, 0, 33.1, 600, 157462000),
(4, 'A104', 100, 600, 600, 0, 86.8, 600, 206911000),
(5, 'A105', 100, 600, 600, 0, 92.8, 600, 212671000),
(6, 'A201', 100, 600, 600, 0, 100, 600, 216000000),
(7, 'A202', 100, 600, 600, 0, 115, 600, 229125000),
(8, 'A203', 100, 600, 600, 0, 100, 600, 216000000),
(9, 'A204', 100, 600, 600, 0, 100, 600, 216000000),
(10, 'A205', 100, 600, 600, 0, 100, 600, 216000000),
(11, 'A301', 100, 600, 600, 0, 100, 600, 216000000),
(12, 'A302', 100, 600, 600, 0, 100, 600, 216000000),
(13, 'A303', 100, 600, 600, 0, 100, 600, 216000000),
(14, 'A304', 100, 600, 600, 0, 100, 600, 216000000),
(15, 'A305', 100, 600, 600, 0, 100, 600, 216000000),
(16, 'B101', 100, 600, 600, 0, 100, 600, 216000000),
(17, 'B102', 100, 600, 600, 0, 100, 600, 216000000),
(18, 'B103', 100, 600, 600, 0, 100, 600, 216000000),
(19, 'B104', 100, 600, 600, 0, 100, 600, 216000000),
(20, 'B105', 100, 600, 600, 0, 100, 600, 216000000),
(21, 'B201', 100, 600, 600, 0, 100, 600, 216000000),
(22, 'B202', 100, 600, 600, 0, 100, 600, 216000000),
(23, 'B203', 100, 600, 600, 0, 100, 600, 216000000),
(24, 'B204', 100, 600, 600, 0, 100, 600, 216000000),
(25, 'B205', 100, 600, 600, 0, 100, 600, 216000000),
(26, 'B301', 100, 600, 600, 0, 100, 600, 216000000),
(27, 'B302', 100, 600, 600, 0, 100, 600, 216000000),
(28, 'B303', 100, 600, 600, 0, 100, 600, 216000000),
(29, 'B304', 100, 600, 600, 0, 100, 600, 216000000),
(30, 'B305', 100, 600, 600, 0, 100, 600, 216000000),
(31, 'C101', 100, 600, 600, 0, 100, 600, 216000000),
(32, 'C102', 100, 600, 600, 0, 100, 600, 216000000),
(33, 'C103', 100, 600, 600, 0, 100, 600, 216000000),
(34, 'C104', 100, 600, 600, 0, 100, 600, 216000000),
(35, 'C105', 100, 600, 600, 0, 100, 600, 216000000),
(36, 'C201', 100, 600, 600, 0, 100, 600, 216000000),
(37, 'C202', 100, 600, 600, 0, 100, 600, 216000000),
(38, 'C203', 100, 600, 600, 0, 100, 600, 216000000),
(39, 'C204', 100, 600, 600, 0, 100, 600, 216000000),
(40, 'C205', 100, 600, 600, 0, 100, 600, 216000000),
(41, 'C301', 100, 600, 600, 0, 100, 600, 216000000),
(42, 'C302', 100, 600, 600, 0, 100, 600, 216000000),
(43, 'C303', 100, 600, 600, 0, 100, 600, 216000000),
(44, 'C304', 100, 600, 600, 0, 100, 600, 216000000),
(45, 'C305', 100, 600, 600, 0, 100, 600, 216000000),
(46, 'D101', 100, 600, 600, 0, 100, 600, 216000000),
(47, 'D102', 100, 600, 600, 0, 100, 600, 216000000),
(48, 'D103', 100, 600, 600, 0, 100, 600, 216000000),
(49, 'D104', 100, 600, 600, 0, 100, 600, 216000000),
(50, 'D105', 100, 600, 600, 0, 100, 600, 216000000),
(51, 'D201', 100, 600, 600, 0, 100, 600, 216000000),
(52, 'D202', 100, 600, 600, 0, 100, 600, 216000000),
(53, 'D203', 100, 600, 600, 0, 100, 600, 216000000),
(54, 'D204', 100, 600, 600, 0, 100, 600, 216000000),
(55, 'D205', 100, 600, 600, 0, 100, 600, 216000000),
(56, 'D301', 100, 600, 600, 0, 100, 600, 216000000),
(57, 'D302', 100, 600, 600, 0, 100, 600, 216000000),
(58, 'D303', 100, 600, 600, 0, 100, 600, 216000000),
(59, 'D304', 100, 600, 600, 0, 100, 600, 216000000),
(60, 'D305', 100, 600, 600, 0, 100, 600, 216000000);

-- --------------------------------------------------------

--
-- Table structure for table `inventory_details`
--

CREATE TABLE `inventory_details` (
  `Product_ID` int(11) NOT NULL,
  `Inventory_ID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Import_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_details`
--

INSERT INTO `inventory_details` (`Product_ID`, `Inventory_ID`, `Quantity`, `Import_ID`) VALUES
(2, 1, 3, 1),
(4, 5, 1, 1),
(1, 7, 12312, 1),
(1, 10, 1123, 1),
(1, 11, 223, 1),
(1, 3, 223, 1),
(1, 2, 12, 15),
(1, 4, 12, 16),
(2, 4, 12, 16),
(2, 2, 12, 17),
(10, 5, 12, 17),
(4, 5, 12, 18),
(1, 2, 12, 20),
(1, 3, 12, 21),
(10, 4, 12, 21);

--
-- Triggers `inventory_details`
--
DELIMITER $$
CREATE TRIGGER `before_update_inventory_details` BEFORE UPDATE ON `inventory_details` FOR EACH ROW BEGIN
    -- Kiểm tra xem Quantity mới có lớn hơn hoặc bằng 0 không
    IF NEW.Quantity < 0 THEN
        -- Nếu không, ngăn chặn thực hiện cập nhật và thông báo lỗi
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Quantity must be greater than or equal to 0';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `Position_ID` int(11) NOT NULL,
  `Name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`Position_ID`, `Name`) VALUES
(1, 'Quản Lý'),
(2, 'Nhân Viên');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `Product_ID` int(11) NOT NULL,
  `Name` varchar(60) NOT NULL,
  `Image` longtext NOT NULL,
  `Barcode` varchar(11) NOT NULL,
  `Weight` float NOT NULL,
  `SKU` varchar(11) NOT NULL,
  `Max_Quantity` int(11) NOT NULL,
  `Min_Quantity` int(11) NOT NULL,
  `Height` float NOT NULL,
  `Width` float NOT NULL,
  `Selling_Price` float NOT NULL,
  `Cost_Price` float NOT NULL,
  `Category_ID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Length` float NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`Product_ID`, `Name`, `Image`, `Barcode`, `Weight`, `SKU`, `Max_Quantity`, `Min_Quantity`, `Height`, `Width`, `Selling_Price`, `Cost_Price`, `Category_ID`, `Quantity`, `Length`, `Description`) VALUES
(1, 'Áo Polo 1', 'ao_polo_1.jpg', '12345678901', 0.3, 'AP001', 100, 10, 70, 50, 29.99, 15.99, 2, 446, 75, ''),
(2, 'Quần Jean 1', '', '98765432101', 0.5, 'QJ001', 80, 5, 80, 60, 39.99, 24.99, 1, 0, 100, 'Hehe'),
(3, 'Giày Sneaker 1', 'giay_sneaker_1.jpg', '65432178901', 2, 'GS001', 120, 15, 20, 10, 49.99, 29.99, 3, 80, 30, ''),
(4, 'Áo Polo 2', 'ao_polo_2.jpg', '12345678902', 0.6, 'AP002', 90, 15, 75, 55, 34.99, 19.99, 5, 40, 80, ''),
(5, 'Quần Jean 2', 'quan_jean_2.jpg', '98765432102', 0.7, 'QJ002', 70, 8, 85, 65, 44.99, 27.99, 4, 25, 95, ''),
(6, 'Giày Sneaker 2', 'giay_sneaker_2.jpg', '65432178902', 2.5, 'GS002', 110, 10, 25, 15, 54.99, 32.99, 6, 65, 40, ''),
(7, 'Áo Polo 3', 'ao_polo_3.jpg', '12345678903', 0.7, 'AP003', 120, 12, 72, 52, 27.99, 14.99, 2, 45, 70, ''),
(8, 'Quần Jean 3', 'quan_jean_3.jpg', '98765432103', 0.9, 'QJ003', 60, 6, 78, 58, 37.99, 22.99, 8, 35, 105, ''),
(9, 'Giày Sneaker 3', 'giay_sneaker_3.jpg', '65432178903', 3.5, 'GS003', 100, 18, 22, 12, 47.99, 28.99, 8, 75, 35, ''),
(10, 'Áo Polo 4', 'ao_polo_4.jpg', '12345678904', 0.6, 'AP004', 80, 10, 68, 48, 32.99, 17.99, 9, 84, 85, ''),
(11, 'Quần Jean 4', 'quan_jean_4.jpg', '98765432104', 0.7, 'QJ004', 90, 5, 90, 70, 42.99, 26.99, 8, 45, 110, ''),
(12, 'Giày Sneaker 4', 'giay_sneaker_4.jpg', '65432178904', 2.5, 'GS004', 80, 12, 18, 8, 52.99, 31.99, 2, 90, 50, ''),
(13, 'Áo Polo 5', 'ao_polo_5.jpg', '12345678905', 0.8, 'AP005', 110, 15, 78, 58, 38.99, 21.99, 8, 35, 95, ''),
(14, 'Quần Jean 5', 'quan_jean_5.jpg', '98765432105', 0.9, 'QJ005', 70, 8, 82, 62, 48.99, 29.99, 2, 20, 120, ''),
(15, 'Giày Sneaker 5', 'giay_sneaker_5.jpg', '65432178905', 0.7, 'GS005', 100, 10, 30, 20, 58.99, 35.99, 8, 50, 45, ''),
(16, 'Áo Polo 6', 'ao_polo_6.jpg', '12345678906', 0.6, 'AP006', 120, 12, 74, 54, 28.99, 15.99, 4, 40, 80, ''),
(17, 'Quần Jean 6', 'quan_jean_6.jpg', '98765432106', 0.8, 'QJ006', 80, 6, 88, 68, 38.99, 23.99, 8, 30, 100, ''),
(18, 'Giày Sneaker 6', 'giay_sneaker_6.jpg', '65432178906', 0.7, 'GS006', 90, 8, 24, 14, 48.99, 29.99, 9, 70, 60, ''),
(19, 'Huỳnh', '', '1312312', 12, '123312', 122, 123, 32, 23, 123, 123, 1, 0, 12, '123121'),
(20, 'Huỳnh', '/images/a001b2a1-370e-4ed8-bb10-79257d4967cf.jpg', '31231231231', 12, '2222', 122, 123, 32, 23, 123, 123, 1, 0, 12, ''),
(21, '123', '/images/6a4bd53e-4f10-41d9-92cc-635294b35531.jpg', '123', 123, '123', 123123, 123123, 123, 123, 123123, 123, 1, 0, 123, '123'),
(24, '123', '/images/c605c842-9ca7-4bed-9982-f66843df2af4.jpg', '12312312312', 123, '12312312312', 123, 123, 13, 123, 123, 123, 1, 0, 123, '123'),
(25, '123123123123', '/images/1191181a-c68b-4f0f-b366-2190c0b27dac.jpg', '12312323452', 2534, '23452345', 53452345, 3245234, 5234, 2534, 234, 2345230, 1, 0, 253424, '2534'),
(26, '423', '/images/3b16e460-99ff-433a-9f10-7e8ff32fb8b3.jpg', '23441235345', 54345, '23465756245', 234, 234, 234, 534, 234, 234234, 1, 0, 234, '345345345345'),
(27, 'fgsdgdf', '/images/d703169f-0869-40e3-a648-8670cfb902a5.jpg', '26454767567', 23423, '47867856785', 5, 2, 23423, 23, 3, 3, 1, 0, 234, '23');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `Role_ID` int(11) NOT NULL,
  `Name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`Role_ID`, `Name`) VALUES
(1, 'ADMIN'),
(2, 'USER');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`Account_ID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `Role_ID` (`Role_ID`),
  ADD KEY `Employee_ID` (`Employee_ID`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`Category_ID`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`Employee_ID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `Position_ID` (`Position_ID`);

--
-- Indexes for table `export`
--
ALTER TABLE `export`
  ADD PRIMARY KEY (`Export_ID`),
  ADD KEY `Employee_ID` (`Employee_ID`);

--
-- Indexes for table `export_details`
--
ALTER TABLE `export_details`
  ADD UNIQUE KEY `Export_ID` (`Export_ID`,`Product_ID`,`Quantity`,`Inventory_ID`),
  ADD KEY `Product_ID` (`Product_ID`),
  ADD KEY `Inventory_ID` (`Inventory_ID`);

--
-- Indexes for table `import`
--
ALTER TABLE `import`
  ADD PRIMARY KEY (`Import_ID`),
  ADD KEY `Employee_ID` (`Employee_ID`);

--
-- Indexes for table `import_details`
--
ALTER TABLE `import_details`
  ADD KEY `Import_ID` (`Import_ID`),
  ADD KEY `Inventory_ID` (`Inventory_ID`),
  ADD KEY `Product_ID` (`Product_ID`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`Inventory_ID`);

--
-- Indexes for table `inventory_details`
--
ALTER TABLE `inventory_details`
  ADD KEY `Import_ID` (`Import_ID`),
  ADD KEY `Inventory_ID` (`Inventory_ID`),
  ADD KEY `inventory_details_ibfk_3` (`Product_ID`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`Position_ID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`Product_ID`),
  ADD UNIQUE KEY `Barcode` (`Barcode`),
  ADD UNIQUE KEY `SKU` (`SKU`),
  ADD KEY `Category_ID` (`Category_ID`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`Role_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `Account_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `Category_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `Employee_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `export`
--
ALTER TABLE `export`
  MODIFY `Export_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `import`
--
ALTER TABLE `import`
  MODIFY `Import_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `Inventory_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `Product_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `account_ibfk_2` FOREIGN KEY (`Role_ID`) REFERENCES `role` (`Role_ID`),
  ADD CONSTRAINT `account_ibfk_3` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`);

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`Position_ID`) REFERENCES `position` (`Position_ID`);

--
-- Constraints for table `export`
--
ALTER TABLE `export`
  ADD CONSTRAINT `export_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`);

--
-- Constraints for table `export_details`
--
ALTER TABLE `export_details`
  ADD CONSTRAINT `export_details_ibfk_1` FOREIGN KEY (`Export_ID`) REFERENCES `export` (`Export_ID`),
  ADD CONSTRAINT `export_details_ibfk_2` FOREIGN KEY (`Product_ID`) REFERENCES `product` (`Product_ID`),
  ADD CONSTRAINT `export_details_ibfk_3` FOREIGN KEY (`Product_ID`) REFERENCES `product` (`Product_ID`),
  ADD CONSTRAINT `export_details_ibfk_4` FOREIGN KEY (`Inventory_ID`) REFERENCES `inventory` (`Inventory_ID`);

--
-- Constraints for table `import`
--
ALTER TABLE `import`
  ADD CONSTRAINT `import_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`);

--
-- Constraints for table `import_details`
--
ALTER TABLE `import_details`
  ADD CONSTRAINT `import_details_ibfk_1` FOREIGN KEY (`Import_ID`) REFERENCES `import` (`Import_ID`),
  ADD CONSTRAINT `import_details_ibfk_2` FOREIGN KEY (`Inventory_ID`) REFERENCES `inventory` (`Inventory_ID`),
  ADD CONSTRAINT `import_details_ibfk_3` FOREIGN KEY (`Product_ID`) REFERENCES `product` (`Product_ID`);

--
-- Constraints for table `inventory_details`
--
ALTER TABLE `inventory_details`
  ADD CONSTRAINT `inventory_details_ibfk_1` FOREIGN KEY (`Import_ID`) REFERENCES `import` (`Import_ID`),
  ADD CONSTRAINT `inventory_details_ibfk_2` FOREIGN KEY (`Inventory_ID`) REFERENCES `inventory` (`Inventory_ID`),
  ADD CONSTRAINT `inventory_details_ibfk_3` FOREIGN KEY (`Product_ID`) REFERENCES `product` (`Product_ID`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`Category_ID`) REFERENCES `category` (`Category_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
