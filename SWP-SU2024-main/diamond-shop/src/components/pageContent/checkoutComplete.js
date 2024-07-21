import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Grid, Divider, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../routes';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuth } from '../authcontext';
import { jwtDecode } from 'jwt-decode';

const MyComponent = () => {
    return <CheckCircleIcon style={{ color: 'green' }} />;
};

const OrderConfirmation = () => {
    const [order, setOrder] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [productData, setProductData] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        email: '',
        address: ''
    });

    const { user } = useAuth();
    const location = useLocation();

    const fetchOrderDetails = async (orderId) => {
        try {
            const response = await fetch(`https://localhost:7251/api/Orders/${orderId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch order details');
            }
            const data = await response.json();
            setOrder(data);
            setOrderDetails(data.orderDetails || []);
            console.log('Fetched order details:', data.orderDetails);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    const fetchProductData = async () => {
        try {
            const response = await fetch('https://localhost:7251/api/Products');
            if (!response.ok) {
                throw new Error('Failed to fetch product data');
            }
            const data = await response.json();
            setProductData(data || []);
            console.log('Fetched product data:', data);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    const fetchCustomerInfo = async (userId) => {
        try {
            const response = await fetch(`https://localhost:7251/api/Customers/User/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch customer info');
            }
            const data = await response.json();
            setCustomerInfo({
                name: data.name,
                phone: data.phoneNumber,
                email: data.email,
                address: data.address
            });
        } catch (error) {
            console.error('Error fetching customer info:', error);
        }
    };

    useEffect(() => {
        console.log('Current user:', user);

        if (user && user.token) {
            const params = new URLSearchParams(location.search);
            const orderId = params.get('orderId');
            console.log('Order ID from URL:', orderId);

            fetchOrderDetails(orderId);
            fetchProductData();

            const decodedToken = jwtDecode(user.token);
            console.log('Decoded token:', decodedToken);
            const userId = decodedToken.unique_name; // Adjusted to use unique_name
            fetchCustomerInfo(userId);
        } else {
            console.error('User or token is missing', user);
        }
    }, [user]);

    const findProductImage = (productId) => {
        const product = productData.find((p) => p.productId === productId);
        return product ? product.image1 : '/path/to/default.jpg';
    };

    const calculateTotal = () => {
        return orderDetails.reduce((total, item) => total + item.productPrice * item.quantity, 0).toFixed(2);
    };

    const calculateDiscountPercentage = () => {
        const totalAmount = calculateTotal();
        const discountPercentage = ((totalAmount - order.totalPrice) / totalAmount) * 100;
        return discountPercentage;
    };

    const roundUpToTenThousand = (value) => {
        return Math.ceil(value / 10000) * 10000;
    };

    const total = roundUpToTenThousand(order.totalPrice);



    const params = new URLSearchParams(location.search);
    const orderId = params.get('orderId');

    return (
        <Container maxWidth="1440px" style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <Link to={routes.homePage}>
                    <h4 style={{ fontSize: '1.2rem' }}>Home Page </h4>
                </Link>
                <h4 style={{ fontSize: '1.2rem' }}>/ Your order has been received</h4>
            </div>

            <div style={{ width: '100%' }}>
                <Box style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Typography
                        variant="h5"
                        color="success.main"
                        style={{
                            backgroundColor: '#E8F5E9',
                            padding: '10px',
                            fontSize: '1.7rem',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <CheckCircleIcon style={{ marginRight: '8px' }} />
                        ORDER SUCCESS
                    </Typography>
                </Box>
                <Box>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <div style={{ paddingRight: '5%' }}>
                            <Paper elevation={4} style={{ padding: '20px' }}>
                                <Grid container spacing={3}>
                                    {orderDetails && orderDetails.length > 0 ? (
                                        orderDetails.map((detail) => (
                                            <Grid item xs={12} key={detail.orderDetailId}>
                                                <Typography variant="h6">INFORMATION LINE #{orderId}</Typography>
                                                <Box style={{ display: 'flex', marginBottom: '2%', marginTop: '2%' }}>
                                                    <img src={findProductImage(detail.productId)} alt={detail.productName} style={{ width: '100px', height: 'fit-content', marginRight: '10px' }} />
                                                    <Box>
                                                        <Typography variant="subtitle1" style={{ fontSize: '1.5rem' }}>Product: {detail.productName}</Typography>
                                                        <Typography variant="body2" style={{ fontSize: '1.2rem' }}>Code: {detail.productId}</Typography>
                                                        <Typography variant="body2" style={{ fontSize: '1.2rem' }}>Unit price: {detail.productPrice}</Typography>
                                                        <Typography variant="body2" style={{ fontSize: '1.2rem' }}>Quantity: {detail.quantity}</Typography>
                                                    </Box>
                                                </Box>
                                                <Divider />
                                            </Grid>
                                        ))
                                    ) : (
                                        <Typography variant="subtitle2">No order details found.</Typography>
                                    )}
                                    <Grid item xs={12}>
                                        <Box style={{ marginTop: '10px', textAlign: 'left' }}>
                                            <Typography variant="h6" color="error" style={{ fontSize: '1.5rem' }}>Total payment: ${total}</Typography>
                                            {calculateDiscountPercentage() > 0 && (<Typography variant="subtitle2">Discount: {calculateDiscountPercentage().toFixed(2)}%</Typography>)}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </div>

                        <Paper elevation={3} style={{ padding: '20px' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" style={{ fontSize: '1.5rem' }}>RECEIVER'S INFORMATION</Typography>
                                    <Box style={{ marginBottom: '10px' }}>
                                        <Typography variant="body2" style={{ fontSize: '1.2rem' }}><strong>Receiver:</strong> {customerInfo.name}</Typography>
                                        <Typography variant="body2" style={{ fontSize: '1.2rem' }}><strong>Phone number:</strong> {customerInfo.phone}</Typography>
                                    </Box>
                                    <Divider />

                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </Box>
            </div>
        </Container>
    );
};

export default OrderConfirmation;
