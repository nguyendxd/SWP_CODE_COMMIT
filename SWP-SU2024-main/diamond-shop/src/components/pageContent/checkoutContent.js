import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Grid, Typography, Paper, Dialog, DialogContent, DialogActions } from '@mui/material';
import { useAuth } from '../authcontext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../routes';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { jwtDecode } from 'jwt-decode';

const stripePromise = loadStripe('pk_test_51PSbFdKR5DFR0i2ROV0LuBgiZKkYE5emvJqy7LfRqjaLC4XyWTXw7KR4LRMxgpKFZhd6SwH5d8FAPJSvWHJHSqZn009MaycEOo'); // Replace with your actual publishable key

const CheckoutForm = ({ handleClose, handlePaymentSuccess, deposit }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error(error);
        } else {
            handlePaymentSuccess(paymentMethod.id, deposit);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement options={{ style: { base: { fontSize: '18px' } } }} />
            <Button type="submit" disabled={!stripe} variant="contained" fullWidth style={{ marginTop: '20px' }}>
                Pay ${deposit}
            </Button>
        </form>
    );
};

const OrderComponent = () => {
    const [order, setOrder] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [productData, setProductData] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        email: '',
        address: ''
    });
    const [orderId, setOrderId] = useState(null);
    const [open, setOpen] = useState(false);
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const fetchOrderDetails = async (orderId) => {
        try {
            const response = await fetch(`https://localhost:7251/api/Orders/${orderId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch order details');
            }
            const data = await response.json();
            setOrder(data);
            console.log(order);
            setOrderDetails(data.orderDetails || []);
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
        if (user && user.token) {
            const params = new URLSearchParams(location.search);
            const fetchedOrderId = params.get('orderId');
            setOrderId(fetchedOrderId);

            fetchOrderDetails(fetchedOrderId);
            fetchProductData();

            const decodedToken = jwtDecode(user.token);
            const userId = decodedToken.unique_name;
            fetchCustomerInfo(userId);
        } else {
            console.error('User or token is missing', user);
        }
    }, [user]);

    const findProductImage = (productId) => {
        const product = productData.find((p) => p.productId === productId);
        return product ? product.image1 : '/path/to/default.jpg';
    };

    const handlePlaceOrder = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePaymentSuccess = async (paymentMethodId, deposit) => {
        const total = calculateTotalAmount();
        const amountPaid = total - deposit;

        try {
            const response = await fetch('https://localhost:7251/api/Payment/complete-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderId,
                    deposit,
                    amountPaid,
                    total
                })
            });

            if (response.ok) {
                await updateOrderLogPhase1(orderId); // Update OrderLog Phase1
                await sendPaymentConfirmationEmail();
                setOpen(false);
                navigate(`${routes.checkoutcomplete}?orderId=${orderId}`);
            } else {
                console.error('Failed to complete payment');
            }
        } catch (error) {
            console.error('Error completing payment:', error);
        }
    };

    const updateOrderLogPhase1 = async (orderId) => {
        try {
            const response = await fetch(`https://localhost:7251/api/OrderLogs/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ statusType: 'phase1' })
            });

            if (!response.ok) {
                throw new Error('Failed to update order log');
            }
        } catch (error) {
            console.error('Error updating order log:', error);
        }
    };

    const sendPaymentConfirmationEmail = async () => {
        try {
            const response = await fetch('https://localhost:7251/api/Email/send-payment-confirmation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: customerInfo.email,
                    orderId,
                    customerName: customerInfo.name,
                    orderDetails,
                    totalAmount: total,
                    deposit: calculateTotalDeposit(),
                    amountPaid: total - calculateTotalDeposit()
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send payment confirmation email');
            }
        } catch (error) {
            console.error('Error sending payment confirmation email:', error);
        }
    };

    const calculateTotalAmount = () => {
        return orderDetails.reduce((acc, detail) => acc + detail.productPrice * detail.quantity, 0);
    };

    
    const calculateDiscountPercentage = () => {
        const totalAmount = calculateTotalAmount();
        const discountPercentage = ((totalAmount - order.totalPrice) / totalAmount) * 100;
        return discountPercentage;
    };


    const roundUpToTenThousand = (value) => {
        return Math.ceil(value / 10000) * 10000;
    };

    const total = roundUpToTenThousand(order.totalPrice);

    const calculateTotalDeposit = () => {
        const total = order.totalPrice
        return roundUpToTenThousand((total * 0.20));
    };

    const totalAmount = calculateTotalAmount();
    const totalDeposit = calculateTotalDeposit();

    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            <Link to={routes.homePage}><h6>‹ Home Page</h6></Link>
            <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center' }}>Secure Checkout</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                        <Typography variant="h6">Order Details</Typography>
                        {orderDetails.length > 0 ? (
                            orderDetails.map((detail) => (
                                <Grid container spacing={2} key={detail.orderDetailId} style={{ marginBottom: '10px' }}>
                                    <Grid item xs={3}>
                                        <img src={findProductImage(detail.productId)} alt={detail.productName} style={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="subtitle1">{detail.productName}</Typography>
                                        <Typography variant="subtitle2">Price: ${detail.productPrice}</Typography>
                                        <Typography variant="subtitle2">Quantity: {detail.quantity}</Typography>
                                    </Grid>
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="subtitle2">No order details found.</Typography>
                        )}
                        <Typography variant="subtitle1">Total: ${total} </Typography>
                        {calculateDiscountPercentage() > 0 && (<Typography variant="subtitle2">Discount: {calculateDiscountPercentage().toFixed(2)}%</Typography>)}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                        <Typography variant="h6">Customer Information</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Full Name"
                                    variant="outlined"
                                    fullWidth
                                    name="name"
                                    value={customerInfo.name}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Phone"
                                    variant="outlined"
                                    fullWidth
                                    name="phone"
                                    value={customerInfo.phone}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    name="email"
                                    value={customerInfo.email}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Address"
                                    variant="outlined"
                                    fullWidth
                                    name="address"
                                    value={customerInfo.address}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Typography variant="h6" style={{ marginTop: '20px' }}>Payment Information</Typography>
                        <Typography variant="subtitle2">Deposit (20%): ${totalDeposit}</Typography>
                        {/* <Typography variant="subtitle2">Amount to be Paid: ${totalAmount - totalDeposit}</Typography> */}
                    </Paper>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'black' } }}
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </Button>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm handleClose={handleClose} handlePaymentSuccess={handlePaymentSuccess} deposit={totalDeposit} />
                    </Elements>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default OrderComponent;
