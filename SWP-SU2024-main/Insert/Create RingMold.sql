CREATE TABLE RingMold (
    RingMoldId INT PRIMARY KEY IDENTITY(1,1),
    Material VARCHAR(50) NOT NULL,
    Size DECIMAL(3,1) NOT NULL,
    CaratWeight DECIMAL(4,2) NOT NULL,
    Gender VARCHAR(6) NOT NULL,
    RingType VARCHAR(10) NOT NULL,
    BasePrice DECIMAL(15,2) NOT NULL
);

ALTER TABLE RingMold
ADD CONSTRAINT CHK_Gender CHECK (Gender IN ('Male', 'Female'));

ALTER TABLE RingMold
ADD CONSTRAINT CHK_RingType CHECK (RingType IN ('Jewelry', 'Engagement'));
