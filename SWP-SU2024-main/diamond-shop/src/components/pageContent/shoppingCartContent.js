import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Divider, Grid } from '@mui/material';
import { routes } from '../../routes';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authcontext';
import { jwtDecode } from 'jwt-decode';
import PointsDisplay from '../PointDisplay';

const ShoppingCartContent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [pointsApplied, setPointsApplied] = useState(0);
  const [totalAfterPoints, setTotalAfterPoints] = useState(0);
  const [customerId, setCustomerId] = useState(null);
  const depositPercentage = 20; // 20% deposit
  const { user } = useAuth();
  const navigate = useNavigate();

  const decodedToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.unique_name;  // Adjust this to match your token's structure
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCustomerId = async () => {
      if (user && user.token) {
        try {
          const userId = decodedToken(user.token);
          const customerResponse = await fetch(`https://localhost:7251/api/Customers/User/${userId}`);
          if (!customerResponse.ok) {
            throw new Error('Failed to fetch customer data');
          }
          const customerData = await customerResponse.json();
          setCustomerId(customerData.customerId);
        } catch (error) {
          console.error('Error fetching customer ID:', error);
        }
      }
    };

    const fetchCartItems = async () => {
      if (user && user.token) {
        try {
          const userId = decodedToken(user.token);
          const response = await fetch(`https://localhost:7251/api/Cart/User/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch cart items');
          }
          const data = await response.json();
          setCartItems(data.cartItems); // Ensure the correct path to cartItems in the response
          updateTotalAfterPoints(data.cartItems, pointsApplied); // Update total after points initially
        } catch (error) {
          console.error(error);
        }
      } else {
        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        setCartItems(cart);
        updateTotalAfterPoints(cart, pointsApplied); // Update total after points initially
      }
    };

    fetchCustomerId();
    fetchCartItems();
  }, [user]);

  const handleRemoveItem = async (index, cartItemId) => {
    if (user && cartItemId) {
      try {
        const response = await fetch(`https://localhost:7251/api/CartItem/${cartItemId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to remove item from cart');
        }

        const updatedCart = cartItems.filter((item, i) => i !== index);
        setCartItems(updatedCart);
        updateTotalAfterPoints(updatedCart, pointsApplied); 

        if (updatedCart.length === 0) {
          const userId = decodedToken(user.token);
          const cartResponse = await fetch(`https://localhost:7251/api/Cart/User/${userId}/Count`);
          if (cartResponse.ok) {
            const itemCount = await cartResponse.json();
            if (itemCount === 0) {
              const cart = await fetch(`https://localhost:7251/api/Cart/User/${userId}`).then(res => res.json());
              await fetch(`https://localhost:7251/api/Cart/${cart.cartID}`, {
                method: 'DELETE',
              });
            }
          }
        }
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    } else {
      console.error('User or cartItemId does not exist', user, cartItemId);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const calculateTotalDeposit = () => {
    return cartItems.reduce((total, item) => total + (item.price * depositPercentage / 100), 0);
  };

  const handlePointsApplied = (points) => {
    setPointsApplied(points);
    updateTotalAfterPoints(cartItems, points); // Update total after points whenever points are applied
  };

  const roundUpToTenThousand = (value) => {
    return Math.ceil(value / 10000) * 10000;
  };

  const updateTotalAfterPoints = (items, points) => {
    const total = items.reduce((total, item) => total + item.price, 0);
    const discount = points * 0.0005;
    const discountedTotal = total * (1 - discount);
    setTotalAfterPoints(roundUpToTenThousand(discountedTotal));
  };

  const depositDiscount = () => {
    const discount = parseFloat(totalAfterPoints) * (depositPercentage / 100);
    return roundUpToTenThousand(discount);
  };

  const handleCheckout = async () => {
    if (!user) {
      navigate(routes.login);
      return;
    }

    try {
      const userId = decodedToken(user.token);
      const order = {
        userId: userId,
        totalPrice: parseFloat(totalAfterPoints),
        orderDate: new Date().toISOString(),
        usePoints: pointsApplied > 0, // Indicate if points were used
        pointsToUse: pointsApplied, // Number of points used for the discount
        orderDetails: cartItems.map(item => ({
          productId: item.product.productId,
          productName: item.product.productName,
          productPrice: item.price,
          quantity: item.quantity
        }))
      };

      const response = await fetch('https://localhost:7251/api/Orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const createdOrder = await response.json();

      const orderLog = {
        orderID: createdOrder.orderId,
        phase1: false,
        phase2: false,
        phase3: false,
        phase4: false,
        timePhase1: new Date().toISOString(),
        timePhase2: new Date().toISOString(),
        timePhase3: new Date().toISOString(),
        timePhase4: new Date().toISOString()
      };

      const logResponse = await fetch('https://localhost:7251/api/OrderLogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderLog),
      });

      if (!logResponse.ok) {
        throw new Error('Failed to create order log');
      }

      setCartItems([]);
      alert('Order created successfully!');
      navigate(`${routes.checkout}?orderId=${createdOrder.orderId}`);
    } catch (error) {
      console.error(error);
      alert('Failed to create order');
    }
  };


  return (
    <Box sx={{ padding: 4, maxWidth: '1200px', margin: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <Link to={routes.homePage} style={{ fontSize: '80%', color: 'black' }} underline="hover">
          <ArrowBackIosIcon style={{ width: '3%', height: '3%' }} />
          CONTINUE SHOPPING
        </Link>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography variant="h6">MY CART ({cartItems.length} ITEM{cartItems.length !== 1 ? 'S' : ''})</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'start' }}>
        <Box sx={{ flex: 1, paddingRight: '2%' }}>
          {cartItems.map((item, index) => (
            <Paper key={index} sx={{ padding: 2, marginBottom: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <img
                    src={item.product.image1}
                    alt={item.product.productName}
                    style={{ maxWidth: '100%' }}
                  />
                </Grid>
                <Grid item xs={10} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1">
                      {item.product.productName}
                    </Typography>
                    <Link onClick={() => handleRemoveItem(index, item.cartItemID)} style={{ fontSize: '80%', color: 'black' }} underline="hover">
                      REMOVE
                    </Link>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    ${item.price.toFixed(2)}
                    <br />
                    Deposit: ${(item.price * depositPercentage / 100).toFixed(2)} (20%)
                    <br />
                    {item.product.productType === 2 && (
                      <>
                        Ring Size: {item.product.size}
                        <br />
                      </>
                    )}
                    {item.product.productType === 3 && (
                      <>
                        Necklace Length: {item.product.size}
                        <br />
                      </>
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Box>
        <Box>
          <Paper sx={{ padding: 2, maxWidth: 400, marginLeft: 'auto' }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>SUMMARY</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
              <Typography variant="body1">Subtotal</Typography>
              <Typography variant="body1">${calculateTotal()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <Typography variant="h6">Deposit</Typography>
              <Typography variant="h6">${calculateTotalDeposit()}</Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>

            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <Typography variant="h6">After Points Discount</Typography>
              <Typography variant="h6">${totalAfterPoints}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <Typography variant="h6">Deposit After</Typography>
              <Typography variant="h6">${depositDiscount()}</Typography>
            </Box>
            {customerId && (
              <PointsDisplay customerId={customerId} onPointsApplied={handlePointsApplied} />
            )}
            <Button
              variant="contained"
              fullWidth
              sx={{ marginBottom: 1, backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'darkgray' } }}
              onClick={handleCheckout}
            >
              CHECKOUT
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ShoppingCartContent;
