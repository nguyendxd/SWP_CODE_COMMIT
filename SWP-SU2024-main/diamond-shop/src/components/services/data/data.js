export const orders = [
    { OrderID: 'OD001', CustomerID: 'C001', TotalPrice: 5009.00, OrderDate: '2023-06-01' },
    { OrderID: 'OD002', CustomerID: 'C002', TotalPrice: 7500.00, OrderDate: '2023-06-02' },
    { OrderID: 'OD003', CustomerID: 'C003', TotalPrice: 10250.00, OrderDate: '2023-06-03' },
    { OrderID: 'OD004', CustomerID: 'C004', TotalPrice: 3050.00, OrderDate: '2023-06-04' },
    { OrderID: 'OD005', CustomerID: 'C005', TotalPrice: 9000.00, OrderDate: '2023-06-05' }
];

export const orderDetails = [
    { OrderDetailID: 'ODD001', OrderID: 'OD001', ProductID: 'P001', ProductName: 'Ring A', ProductPrice: 2500.00, Quantity: 2 },
    { OrderDetailID: 'ODD002', OrderID: 'OD001', ProductID: 'P002', ProductName: 'Necklace A', ProductPrice: 50.00, Quantity: 1 },
    { OrderDetailID: 'ODD003', OrderID: 'OD002', ProductID: 'P003', ProductName: 'Earrings A', ProductPrice: 2500.00, Quantity: 3 },
    { OrderDetailID: 'ODD004', OrderID: 'OD003', ProductID: 'P004', ProductName: 'Bracelet A', ProductPrice: 2050.00, Quantity: 5 },
    { OrderDetailID: 'ODD005', OrderID: 'OD004', ProductID: 'P005', ProductName: 'Ring B', ProductPrice: 3050.00, Quantity: 1 },
    { OrderDetailID: 'ODD006', OrderID: 'OD005', ProductID: 'P006', ProductName: 'Necklace B', ProductPrice: 4500.00, Quantity: 2 }
];

export const payments = [
    { PaymentID: 'PAY001', OrderID: 'OD001', Deposit: 1000.00, AmountPaid: 4009.00, Total: 5009.00, DatePaid: '2023-06-01' },
    { PaymentID: 'PAY002', OrderID: 'OD002', Deposit: 2000.00, AmountPaid: 5500.00, Total: 7500.00, DatePaid: '2023-06-02' },
    { PaymentID: 'PAY003', OrderID: 'OD003', Deposit: 3000.00, AmountPaid: 7250.00, Total: 10250.00, DatePaid: '2023-06-03' },
    { PaymentID: 'PAY004', OrderID: 'OD004', Deposit: 1000.00, AmountPaid: 2050.00, Total: 3050.00, DatePaid: '2023-06-04' },
    { PaymentID: 'PAY005', OrderID: 'OD005', Deposit: 2500.00, AmountPaid: 6500.00, Total: 9000.00, DatePaid: '2023-06-05' }
];

const products = [
    { ProductID: 'P001', ProductName: 'Ring A', ProductType: 'Ring', Type: 'Gold', Size: '7', Description: 'Gold ring with diamond', Price: 2500.00, Quantity: 10, DiamondID: 'D001', Image1: 'ring_a1.jpg', Image2: 'ring_a2.jpg' },
    { ProductID: 'P002', ProductName: 'Necklace A', ProductType: 'Necklace', Type: 'Silver', Size: 'M', Description: 'Silver necklace with sapphire', Price: 50.00, Quantity: 50, DiamondID: 'D002', Image1: 'necklace_a1.jpg', Image2: 'necklace_a2.jpg' },
    { ProductID: 'P003', ProductName: 'Earrings A', ProductType: 'Earrings', Type: 'Platinum', Size: 'Small', Description: 'Platinum earrings with ruby', Price: 2500.00, Quantity: 20, DiamondID: 'D003', Image1: 'earrings_a1.jpg', Image2: 'earrings_a2.jpg' },
    { ProductID: 'P004', ProductName: 'Bracelet A', ProductType: 'Bracelet', Type: 'Gold', Size: 'M', Description: 'Gold bracelet with emerald', Price: 2050.00, Quantity: 15, DiamondID: 'D004', Image1: 'bracelet_a1.jpg', Image2: 'bracelet_a2.jpg' },
    { ProductID: 'P005', ProductName: 'Ring B', ProductType: 'Ring', Type: 'Silver', Size: '8', Description: 'Silver ring with topaz', Price: 3050.00, Quantity: 8, DiamondID: 'D005', Image1: 'ring_b1.jpg', Image2: 'ring_b2.jpg' },
    { ProductID: 'P006', ProductName: 'Necklace B', ProductType: 'Necklace', Type: 'Platinum', Size: 'L', Description: 'Platinum necklace with diamond', Price: 4500.00, Quantity: 12, DiamondID: 'D006', Image1: 'necklace_b1.jpg', Image2: 'necklace_b2.jpg' }
];

const productTypes = [
    { ProductTypeID: 'T001', ProductTypeName: 'Ring' },
    { ProductTypeID: 'T002', ProductTypeName: 'Necklace' },
    { ProductTypeID: 'T003', ProductTypeName: 'Earrings' },
    { ProductTypeID: 'T004', ProductTypeName: 'Bracelet' }
];

const diamonds = [
    { DiamondID: 'D001', Shape: 'Round', Cut: 'Excellent', Color: 'D', Clarity: 'VVS1', CaratWeight: 1.2, Fluorescence: 'None', LengthWidthRatio: 1.0, Depth: 61.5, Table: 57, Symmetry: 'Excellent', Girdle: 'Medium', Measurements: '6.8x6.8x4.2', Certificate: 'GIA' },
    { DiamondID: 'D002', Shape: 'Princess', Cut: 'Very Good', Color: 'E', Clarity: 'VS1', CaratWeight: 1.5, Fluorescence: 'Faint', LengthWidthRatio: 1.02, Depth: 64.0, Table: 72, Symmetry: 'Very Good', Girdle: 'Slightly Thick', Measurements: '5.5x5.5x3.5', Certificate: 'IGI' },
    { DiamondID: 'D003', Shape: 'Oval', Cut: 'Good', Color: 'F', Clarity: 'SI1', CaratWeight: 1.0, Fluorescence: 'Medium', LengthWidthRatio: 1.5, Depth: 62.0, Table: 53, Symmetry: 'Good', Girdle: 'Thick', Measurements: '7.0x5.0x3.2', Certificate: 'AGS' },
    { DiamondID: 'D004', Shape: 'Cushion', Cut: 'Fair', Color: 'G', Clarity: 'I1', CaratWeight: 2.0, Fluorescence: 'Strong', LengthWidthRatio: 1.1, Depth: 66.0, Table: 58, Symmetry: 'Fair', Girdle: 'Very Thick', Measurements: '8.0x8.0x5.3', Certificate: 'HRD' },
    { DiamondID: 'D005', Shape: 'Emerald', Cut: 'Poor', Color: 'H', Clarity: 'SI2', CaratWeight: 0.8, Fluorescence: 'None', LengthWidthRatio: 1.3, Depth: 63.0, Table: 60, Symmetry: 'Poor', Girdle: 'Thin', Measurements: '6.0x4.6x3.0', Certificate: 'GIA' },
    { DiamondID: 'D006', Shape: 'Heart', Cut: 'Excellent', Color: 'I', Clarity: 'VS2', CaratWeight: 1.8, Fluorescence: 'Strong', LengthWidthRatio: 1.0, Depth: 61.8, Table: 56, Symmetry: 'Excellent', Girdle: 'Medium to Thick', Measurements: '7.5x7.5x4.6', Certificate: 'IGI' }
];
