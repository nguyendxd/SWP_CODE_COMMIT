CREATE TABLE Certificates (
    CertificateId INT IDENTITY(1,1) PRIMARY KEY,
    DiamondId INT NOT NULL,
    ReportDate DATE,
    ReportNumber VARCHAR(50),
    ClarityCharacteristics VARCHAR(100),
    Inscription VARCHAR(100),
    Comments VARCHAR(255),
    FOREIGN KEY (DiamondId) REFERENCES Diamond(DiamondID)
);


ALTER TABLE [Diamond_Shop_V4].[dbo].[Diamond]
DROP COLUMN [Certificate];
