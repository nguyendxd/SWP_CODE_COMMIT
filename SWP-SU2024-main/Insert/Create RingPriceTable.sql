CREATE TABLE RingPriceTable (
    Material VARCHAR(50),
    Size DECIMAL(3,1),
    CaratWeight DECIMAL(4,2),
    BasePrice DECIMAL(10,2),
    PRIMARY KEY (Material, Size, CaratWeight)
);