use Diamond_Shop_V4

-- Create Wishlist table
CREATE TABLE Wishlist (
    WishlistID INT PRIMARY KEY IDENTITY(1,1),
    CustomerID INT,
    CreatedDate DATE NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);
GO

-- Create WishlistItems table
CREATE TABLE WishlistItems (
    WishlistItemID INT PRIMARY KEY IDENTITY(1,1),
    WishlistID INT,
    ProductID INT,
    AddedDate DATE NOT NULL,
    FOREIGN KEY (WishlistID) REFERENCES Wishlist(WishlistID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);
GO
