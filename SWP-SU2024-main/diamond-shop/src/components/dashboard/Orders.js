import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, TableContainer, TextField } from '@mui/material';
import Title from './Title';
import { routes } from '../../routes';
import axios from 'axios';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [datePaid, setDatePaid] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://localhost:7251/api/Orders');
      console.log('Orders Response:', response.data);
      setOrders(response.data || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err);
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(`https://localhost:7251/api/Orders/${orderId}`);
      console.log('Order Details Response:', response.data.orderDetails);
      setOrderDetails(response.data.orderDetails);
      setSelectedOrder(orderId);
      setOpen(true);
    } catch (err) {
      console.error('Error fetching order details:', err);
    }
  };

  const handleViewDetails = (orderId) => {
    fetchOrderDetails(orderId);
  };

  const handleClose = () => {
    setOpen(false);
    setPaymentOpen(false);
  };

  const handlePayment = (order) => {
    setPaymentDetails(order);
    setPaymentOpen(true);
  };

  const handlePaymentSubmit = () => {
    console.log('Payment Details:', paymentDetails);
    console.log('Date Paid:', datePaid);
    setPaymentOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching orders.</div>;

  return (
    <React.Fragment>
    
      <Container>
        <Title>Recent Orders</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">OrderID</TableCell>
              <TableCell align="center">CustomerID</TableCell>
              <TableCell align="center">Total Price ($)</TableCell>
              <TableCell align="center">Order Date</TableCell>
              <TableCell align="center">Order Details</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell align="center">{order.orderId}</TableCell>
                <TableCell align="center">{order.customerId}</TableCell>
                <TableCell align="center">{order.totalPrice ? order.totalPrice.toFixed(2) : 'N/A'}</TableCell>
                <TableCell align="center">{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                <TableCell align="center">
                  {order.orderDetails && order.orderDetails.length > 0 ? (
                    order.orderDetails.map((detail) => (
                      <div key={detail.orderDetailId}>
                        ID: {detail.orderDetailId} - {detail.productName} ({detail.quantity})
                      </div>
                    ))
                  ) : (
                    <div>No Details</div>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewDetails(order.orderId)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handlePayment(order)}
                    style={{ marginLeft: '10px' }}
                  >
                    Payment
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link color="primary" href={routes.orderPage} sx={{ mt: 3 }}>
          See more orders
        </Link>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Order Details</DialogTitle>
          <DialogContent>
            {selectedOrder && orderDetails.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Product Name</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="center">Price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderDetails.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{item.productName}</TableCell>
                        <TableCell align="center">{item.quantity}</TableCell>
                        <TableCell align="center">{item.productPrice}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2} align="right">Total Price</TableCell>
                      <TableCell align="center">
                        {orderDetails.reduce((acc, item) => acc + item.productPrice * item.quantity, 0).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography>Loading...</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={paymentOpen} onClose={handleClose}>
          <DialogTitle>Payment Details</DialogTitle>
          <DialogContent>
            {paymentDetails && (
              <div>
                <p>Order ID: {paymentDetails.orderId}</p>
                <p>Total: ${paymentDetails.totalPrice}</p>
                <TextField
                  label="Date Paid"
                  type="date"
                  value={datePaid}
                  onChange={(e) => setDatePaid(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button onClick={handlePaymentSubmit} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </React.Fragment>
  );
}
