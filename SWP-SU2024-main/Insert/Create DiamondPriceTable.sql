CREATE TABLE DiamondPriceTable (
    Carat DECIMAL(10, 2) NOT NULL,
    Color NVARCHAR(50) NOT NULL,
    Clarity NVARCHAR(50) NOT NULL,
    Cut NVARCHAR(50) NOT NULL,
    Price DECIMAL(18, 2) NOT NULL,
    PRIMARY KEY (Carat, Color, Clarity, Cut)
);
