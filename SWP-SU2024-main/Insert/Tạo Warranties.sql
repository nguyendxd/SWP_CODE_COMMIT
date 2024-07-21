CREATE TABLE Warranties (
    WarrantyId INT PRIMARY KEY IDENTITY(1,1),
    OrderId INT NOT NULL,
    PurchaseDate DATE NOT NULL,
    WarrantyEndDate DATE NOT NULL,
    StoreRepresentativeSignature NVARCHAR(255) NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId)
);