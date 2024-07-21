CREATE TABLE NecklaceMold (
    NecklaceMoldId INT PRIMARY KEY IDENTITY(1,1),
    Material VARCHAR(50) NOT NULL,
    Length INT NOT NULL,
    CaratWeight DECIMAL(3,2) NOT NULL,
    BasePrice DECIMAL(15,2) NOT NULL
);
