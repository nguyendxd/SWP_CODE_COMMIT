delete from OrderDetails
delete from Feedback
delete from Product


EXEC sp_rename 'Product.Type', 'Material', 'COLUMN';
EXEC sp_rename 'Product.DiamondID', 'MainDiamondId', 'COLUMN';

ALTER TABLE Product
ADD
    SecondaryDiamondId INT NULL,
    MoldId INT NULL;

	ALTER TABLE Product
ADD CONSTRAINT FK_Product_MainDiamond FOREIGN KEY (MainDiamondId) REFERENCES Diamond(DiamondId);

ALTER TABLE Product
ADD CONSTRAINT FK_Product_SecondaryDiamond FOREIGN KEY (SecondaryDiamondId) REFERENCES Diamond(DiamondId);

ALTER TABLE Product
ADD CONSTRAINT FK_Product_RingMold FOREIGN KEY (MoldId) REFERENCES RingMold(RingMoldId);

ALTER TABLE Product
ADD CONSTRAINT FK_Product_NecklaceMold FOREIGN KEY (MoldId) REFERENCES NecklaceMold(NecklaceMoldId);

ALTER TABLE Product
ADD CONSTRAINT CHK_Product
CHECK (
    (ProductType = 1 AND Material IS NULL AND Size IS NULL AND MainDiamondId IS NOT NULL AND SecondaryDiamondId IS NULL AND MoldId IS NULL) OR
    ((ProductType = 2 OR ProductType = 3) AND Material IS NOT NULL AND Size IS NOT NULL AND MainDiamondId IS NOT NULL AND MoldId IS NOT NULL)
);
