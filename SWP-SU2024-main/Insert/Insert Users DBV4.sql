use Diamond_Shop_V4

SET IDENTITY_INSERT Roles On;

INSERT INTO Roles (RoleID, RoleName) VALUES 
(1, 'Admin'),
(2, 'Manager'),
(3, 'Sales Staff'),
(4, 'Design Staff'),
(5, 'Customer');
GO

SET IDENTITY_INSERT Roles OFF;


INSERT INTO Users (UserID, Username, Password, Email, RoleID) VALUES 
(1, 'admin', 'admin', 'admin@example.com', 1),
(2, 'manager', 'manager', 'manager@example.com', 2),
(3, 'sales', 'sales', 'sales@example.com', 3),
(4, 'design', 'design', 'design@example.com', 4),
(5, 'customer', 'customer', 'customer@example.com', 5);
GO

SET IDENTITY_INSERT Users ON;

INSERT INTO Users (UserID, Username, Password, Email, RoleID, Name, PhoneNumber, Address, Sex, DateOfBirth) VALUES
(1, 'admin', 'admin', 'admin@example.com', 1, 'Admin Name', '123-456-7890', 'Admin Address', 'M', '1980-01-01'),
(2, 'manager', 'manager', 'manager@example.com', 2, 'Manager Name', '123-456-7891', 'Manager Address', 'F', '1985-02-01'),
(3, 'sales', 'sales', 'sales@example.com', 3, 'Sales Name', '123-456-7892', 'Sales Address', 'M', '1990-03-01'),
(4, 'design', 'design', 'design@example.com', 4, 'Design Name', '123-456-7893', 'Design Address', 'N', '1992-04-01'),
(5, 'customer', 'customer', 'customer@example.com', 5, 'Customer Name', '123-456-7894', 'Customer Address', 'F', '1995-05-01');

SET IDENTITY_INSERT Users OFF;
