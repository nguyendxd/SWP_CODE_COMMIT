use Diamond_Shop_V4
-- Enable IDENTITY_INSERT for the Diamond table
SET IDENTITY_INSERT [Diamond_Shop_V4].[dbo].[Diamond] ON;

-- Insert 10 records into Diamond table with explicit IDs
INSERT INTO [Diamond_Shop_V4].[dbo].[Diamond] 
([DiamondID], [Shape], [Cut], [Color], [Clarity], [CaratWeight], [Fluorescence], [LengthWidthRatio], [Depth], [Tables], [Symmetry], [Girdle], [Measurements], [Certificate])
VALUES 
(1, 'Round', 'Excellent', 'D', 'IF', 1.0, 'None', 1.0, 62.5, 55, 'Excellent', 'Medium', '6.5x6.5x4.0', 'GIA123456'),
(2, 'Princess', 'Very Good', 'E', 'VVS1', 1.2, 'None', 1.0, 64.0, 56, 'Very Good', 'Thick', '5.5x5.5x3.5', 'GIA654321'),
(3, 'Oval', 'Good', 'F', 'VS1', 1.1, 'None', 1.0, 63.0, 54, 'Good', 'Thin', '6.0x4.0x3.0', 'GIA789012'),
(4, 'Marquise', 'Fair', 'G', 'VS2', 1.3, 'None', 1.0, 65.0, 53, 'Fair', 'Very Thin', '8.0x4.0x2.5', 'GIA210987'),
(5, 'Pear', 'Excellent', 'H', 'SI1', 1.5, 'None', 1.0, 61.0, 57, 'Excellent', 'Slightly Thick', '7.0x5.0x3.0', 'GIA345678'),
(6, 'Cushion', 'Very Good', 'I', 'SI2', 1.4, 'None', 1.0, 60.0, 58, 'Very Good', 'Thick', '5.0x5.0x3.5', 'GIA876543'),
(7, 'Emerald', 'Good', 'J', 'I1', 1.6, 'None', 1.0, 62.0, 52, 'Good', 'Thin', '7.5x5.5x3.0', 'GIA123789'),
(8, 'Asscher', 'Fair', 'D', 'I2', 1.7, 'None', 1.0, 64.0, 51, 'Fair', 'Very Thin', '6.0x6.0x4.0', 'GIA321987'),
(9, 'Radiant', 'Excellent', 'E', 'IF', 1.8, 'None', 1.0, 61.5, 56, 'Excellent', 'Medium', '6.5x6.5x4.5', 'GIA456789'),
(10, 'Heart', 'Very Good', 'F', 'VVS1', 2.0, 'None', 1.0, 60.5, 55, 'Very Good', 'Thick', '6.0x6.0x3.5', 'GIA654987');

-- Disable IDENTITY_INSERT for the Diamond table
SET IDENTITY_INSERT [Diamond_Shop_V4].[dbo].[Diamond] OFF;


SET IDENTITY_INSERT [Diamond_Shop_V4].[dbo].[Product] ON;

-- Insert 10 diamond products
INSERT INTO [Diamond_Shop_V4].[dbo].[Product]
([ProductID], [ProductName], [ProductType], [Type], [Size], [Description], [Price], [Quantity], [DiamondID], [Image1], [Image2], [Image3])
VALUES
(1, 'Diamond 1', 1, NULL, NULL, 'High-quality diamond', 5000.00, 10, 1, 'diamond1.jpg', NULL, NULL),
(2, 'Diamond 2', 1, NULL, NULL, 'High-quality diamond', 6000.00, 8, 2, 'diamond2.jpg', NULL, NULL),
(3, 'Diamond 3', 1, NULL, NULL, 'High-quality diamond', 7000.00, 6, 3, 'diamond3.jpg', NULL, NULL),
(4, 'Diamond 4', 1, NULL, NULL, 'High-quality diamond', 8000.00, 5, 4, 'diamond4.jpg', NULL, NULL),
(5, 'Diamond 5', 1, NULL, NULL, 'High-quality diamond', 9000.00, 4, 5, 'diamond5.jpg', NULL, NULL),
(6, 'Diamond 6', 1, NULL, NULL, 'High-quality diamond', 10000.00, 3, 6, 'diamond6.jpg', NULL, NULL),
(7, 'Diamond 7', 1, NULL, NULL, 'High-quality diamond', 11000.00, 2, 7, 'diamond7.jpg', NULL, NULL),
(8, 'Diamond 8', 1, NULL, NULL, 'High-quality diamond', 12000.00, 1, 8, 'diamond8.jpg', NULL, NULL),
(9, 'Diamond 9', 1, NULL, NULL, 'High-quality diamond', 13000.00, 1, 9, 'diamond9.jpg', NULL, NULL),
(10, 'Diamond 10', 1, NULL, NULL, 'High-quality diamond', 14000.00, 1, 10, 'diamond10.jpg', NULL, NULL);

-- Insert 10 ring products
INSERT INTO [Diamond_Shop_V4].[dbo].[Product]
([ProductID], [ProductName], [ProductType], [Type], [Size], [Description], [Price], [Quantity], [DiamondID], [Image1], [Image2], [Image3])
VALUES
(11, 'Ring 1', 2, 'Ring', '6', 'Beautiful diamond ring', 1500.00, 10, NULL, 'ring1.jpg', NULL, NULL),
(12, 'Ring 2', 2, 'Ring', '7', 'Beautiful diamond ring', 1600.00, 9, NULL, 'ring2.jpg', NULL, NULL),
(13, 'Ring 3', 2, 'Ring', '8', 'Beautiful diamond ring', 1700.00, 8, NULL, 'ring3.jpg', NULL, NULL),
(14, 'Ring 4', 2, 'Ring', '9', 'Beautiful diamond ring', 1800.00, 7, NULL, 'ring4.jpg', NULL, NULL),
(15, 'Ring 5', 2, 'Ring', '10', 'Beautiful diamond ring', 1900.00, 6, NULL, 'ring5.jpg', NULL, NULL),
(16, 'Ring 6', 2, 'Ring', '6', 'Beautiful diamond ring', 2000.00, 5, NULL, 'ring6.jpg', NULL, NULL),
(17, 'Ring 7', 2, 'Ring', '7', 'Beautiful diamond ring', 2100.00, 4, NULL, 'ring7.jpg', NULL, NULL),
(18, 'Ring 8', 2, 'Ring', '8', 'Beautiful diamond ring', 2200.00, 3, NULL, 'ring8.jpg', NULL, NULL),
(19, 'Ring 9', 2, 'Ring', '9', 'Beautiful diamond ring', 2300.00, 2, NULL, 'ring9.jpg', NULL, NULL),
(20, 'Ring 10', 2, 'Ring', '10', 'Beautiful diamond ring', 2400.00, 1, NULL, 'ring10.jpg', NULL, NULL);

-- Insert 10 necklace products
INSERT INTO [Diamond_Shop_V4].[dbo].[Product]
([ProductID], [ProductName], [ProductType], [Type], [Size], [Description], [Price], [Quantity], [DiamondID], [Image1], [Image2], [Image3])
VALUES
(21, 'Necklace 1', 3, 'Necklace', '18 inches', 'Elegant diamond necklace', 2500.00, 10, NULL, 'necklace1.jpg', NULL, NULL),
(22, 'Necklace 2', 3, 'Necklace', '18 inches', 'Elegant diamond necklace', 2600.00, 9, NULL, 'necklace2.jpg', NULL, NULL),
(23, 'Necklace 3', 3, 'Necklace', '18 inches', 'Elegant diamond necklace', 2700.00, 8, NULL, 'necklace3.jpg', NULL, NULL),
(24, 'Necklace 4', 3, 'Necklace', '18 inches', 'Elegant diamond necklace', 2800.00, 7, NULL, 'necklace4.jpg', NULL, NULL),
(25, 'Necklace 5', 3, 'Necklace', '18 inches', 'Elegant diamond necklace', 2900.00, 6, NULL, 'necklace5.jpg', NULL, NULL);

SET IDENTITY_INSERT [Diamond_Shop_V4].[dbo].[Product] OFF;