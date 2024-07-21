import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Switch, FormControlLabel, Typography, Link, Box
} from '@mui/material';
import DashboardNav from './DashboardNav';
import SiteNav from './../../staffsite/StaffNav';
import { useAuth } from '../../authcontext';
import axios from 'axios';
import { routes } from '../../../routes';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [orderLogOpen, setOrderLogOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [orderLog, setOrderLog] = useState({});
  const [datePaid, setDatePaid] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://localhost:7251/api/Orders');
      setOrders(response.data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(`https://localhost:7251/api/Orders/${orderId}`);
      setOrderDetails(response.data.orderDetails);
      setSelectedOrder(orderId);
      setOpen(true);
    } catch (err) {
      console.error('Error fetching order details:', err);
    }
  };

  const fetchOrderLog = async (orderId) => {
    try {
      const response = await axios.get(`https://localhost:7251/api/OrderLogs/order/${orderId}`);
      setOrderLog(response.data);
      setOrderLogOpen(true);
    } catch (err) {
      console.error('Error fetching order log:', err);
    }
  };

  const fetchPaymentDetails = async (orderId) => {
    try {
      const paymentResponse = await fetch(`https://localhost:7251/api/Payment/order/${orderId}`);
      if (!paymentResponse.ok) {
        throw new Error('Failed to fetch payment details');
      }
      const paymentData = await paymentResponse.json();
      setPaymentDetails(paymentData);

      const orderLogResponse = await fetch(`https://localhost:7251/api/OrderLogs/order/${orderId}`);
      if (!orderLogResponse.ok) {
        throw new Error('Failed to fetch order log');
      }
      const orderLogData = await orderLogResponse.json();
      setOrderLog(orderLogData);
      if (orderLogData.phase4) {
        setDatePaid(new Date(orderLogData.timePhase4).toISOString().split('T')[0]);
      } else {
        setDatePaid('');
      }

      setPaymentOpen(true);
    } catch (err) {
      console.error('Error fetching payment details or order log:', err);
    }
  };

  const handleViewDetails = (orderId) => {
    fetchOrderDetails(orderId);
  };

  const handleClose = () => {
    setOpen(false);
    setPaymentOpen(false);
    setOrderLogOpen(false);
  };

  const handlePayment = (order) => {
    fetchPaymentDetails(order.orderId);
  };

  const handlePaymentSubmit = async () => {
    try {
      await axios.put(`https://localhost:7251/api/Payments/${paymentDetails.id}`, { datePaid });
      setPaymentOpen(false);
    } catch (err) {
      console.error('Error updating payment details:', err);
    }
  };

  const handleOrderLog = (order) => {
    fetchOrderLog(order.orderId);
  };

  const togglePhase = async (phase, timePhase, orderId) => {
    const currentDateTime = new Date().toISOString();
    try {
      await axios.put(`https://localhost:7251/api/OrderLogs/${orderLog.logID}`, {
        statusType: phase
      });
      setOrderLog((prevLog) => ({
        ...prevLog,
        [phase]: !prevLog[phase],
        [timePhase]: prevLog[phase] ? "" : currentDateTime
      }));

      if (phase === 'phase4' && !orderLog.phase4) {
        await axios.post('https://localhost:7251/api/Warranties', {
          OrderId: orderId,
          WarrantyEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
          StoreRepresentativeSignature: 'Luxel Jewel House'
        });
        console.log('Warranty created for order:', orderId);
      }
    } catch (err) {
      console.error('Error updating order log or creating warranty:', err);
    }
  };

  const handleSaveOrderLog = () => {
    console.log('Order log saved:', orderLog);
    setOrderLogOpen(false);
  };

  return (
    <div className='container-fluid'>
      <div>
        {user && user.roleId === 3 ? <SiteNav /> : <DashboardNav />}
      </div>

      <div className='container-fluid-2'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">OrderID</TableCell>
                <TableCell align="center">CustomerID</TableCell>
                <TableCell align="center">Total Price ($)</TableCell>
                <TableCell align="center">Order Date</TableCell>
                <TableCell align="center">Order DetailID</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row) => (
                <TableRow key={row.orderId}>
                  <TableCell align="center">{row.orderId}</TableCell>
                  <TableCell align="center">{row.customerId}</TableCell>
                  <TableCell align="center">{row.totalPrice ? row.totalPrice.toFixed(2) : 'N/A'}</TableCell>
                  <TableCell align="center">{new Date(row.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    {row.orderDetails && row.orderDetails.length > 0 ? (
                      row.orderDetails.map((detail) => (
                        <div key={detail.orderDetailId}>
                          {detail.productName} ({detail.quantity})
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
                      onClick={() => handleViewDetails(row.orderId)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handlePayment(row)}
                      style={{ marginLeft: '10px' }}
                    >
                      Payment
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleOrderLog(row)}
                      style={{ marginLeft: '10px', backgroundColor: 'black' }}
                    >
                      Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

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
              <p>Total: ${paymentDetails.total}</p>
              <p>Deposit: ${paymentDetails.deposit}</p>
              <p>Amount Paid: ${paymentDetails.amountPaid}</p>
              {orderLog.phase4 && (
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
              )}
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

      <Dialog open={orderLogOpen} onClose={handleClose}>
        <DialogTitle>Order Log</DialogTitle>
        <DialogContent>
          <Box>
            <FormControlLabel
              control={<Switch checked={orderLog.phase1} onChange={() => togglePhase('phase1', 'timePhase1', orderLog.logID)} />}
              label="Ordered"
            />
            {orderLog.phase1 && <Typography variant="body2">Time Phase 1: {orderLog.timePhase1}</Typography>}
          </Box>
          <Box>
            <FormControlLabel
              control={<Switch checked={orderLog.phase2} onChange={() => togglePhase('phase2', 'timePhase2', orderLog.logID)} />}
              label="Created"
            />
            {orderLog.phase2 &&<Typography variant="body2">Time Phase 2: {orderLog.timePhase2}</Typography>}
          </Box>
          <Box>
            <FormControlLabel
              control={<Switch checked={orderLog.phase3} onChange={() => togglePhase('phase3', 'timePhase3', orderLog.logID)} />}
              label="Received"
            />
             {orderLog.phase3 &&<Typography variant="body2">Time Phase 3: {orderLog.timePhase3}</Typography>}
          </Box>
          <Box>
            <FormControlLabel
              control={<Switch checked={orderLog.phase4} onChange={() => togglePhase('phase4', 'timePhase4', orderLog.logID)} />}
              label="Finished"
            />
             {orderLog.phase4 &&<Typography variant="body2">Time Phase 4: {orderLog.timePhase4}</Typography>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSaveOrderLog} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderPage;
