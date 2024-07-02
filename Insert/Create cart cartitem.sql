-- Create Cart table
CREATE TABLE Cart (
  CartID INT PRIMARY KEY IDENTITY(1,1),
  UserID INT,
  CreatedAt DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Create CartItem table
CREATE TABLE CartItem (
  CartItemID INT PRIMARY KEY IDENTITY(1,1),
  CartID INT,
  ProductID INT,
  Quantity INT,
  Price DECIMAL(10, 2),
  FOREIGN KEY (CartID) REFERENCES Cart(CartID),
  FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);
