import React, { useState } from 'react';
import './../css/Tracklog.css'
import { Stepper, Step, StepLabel, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const TrackLog = () => {
  const customerName = 'Elvis Presley'; // Change this to the specific customer name you want to filter by

  const sampleOrders = [
    {
      orderID: '1',
      customerName: 'Elvis Presley',
      totalPrice: '312.44',
      orderDate: '16 Mar, 2019',
      expectedArrival: '01/12/19',
      trackingNumber: '234094567242423422898',
      processed: true,
      shipped: true,
      enRoute: true,
      arrived: false,
      dateProcessed: '2024-06-16T09:00:00',
      dateShipped: '2024-09-17T10:00:00',
      dateEnRoute: '2024-09-18T11:00:00',
      dateArrived: '2024-09-19T12:00:00',
    },
    {
      orderID: '2',
      customerName: 'Paul McCartney',
      totalPrice: '866.99',
      orderDate: '16 Mar, 2019',
      expectedArrival: '02/12/19',
      trackingNumber: '234094567242423422899',
      processed: true,
      shipped: true,
      enRoute: true,
      arrived: false,
      dateProcessed: '2019-03-16T09:00:00',
      dateShipped: '2019-03-17T10:00:00',
      dateEnRoute: '2019-03-18T11:00:00',
      dateArrived: null,
    },
    // Add more sample orders as needed
  ];

  const [orders] = useState(sampleOrders.filter(order => order.customerName === customerName));
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewStatus = (order) => {
    setSelectedOrder(order);
  };

  const renderTags = (order) => {
    const tags = [];
    if (order.processed) tags.push({ label: 'Ordered', date: order.dateProcessed });
    if (order.shipped) tags.push({ label: 'Created', date: order.dateShipped });
    if (order.enRoute) tags.push({ label: 'Recieved', date: order.dateEnRoute });
    if (order.arrived) tags.push({ label: 'Finished', date: order.dateArrived });

    return tags.map((tag, index) => (
      <Paper key={index} className="tag-container">
        <div className="tag-label">{tag.label}</div>
        <div className="tag-date">{new Date(tag.date).toLocaleString()}</div>
      </Paper>
    ));
  };

  return (
    <div>
      <h2>Order Tracking</h2>
      {selectedOrder && (
        <Paper className="root">
          <Typography variant="h5">Order #{selectedOrder.orderID}</Typography>
          <Typography variant="body1">Expected Arrival: {selectedOrder.expectedArrival}</Typography>
          <Typography variant="body1">Tracking Number: {selectedOrder.trackingNumber}</Typography>
          <Stepper alternativeLabel className="stepper">
            <Step completed={selectedOrder.processed}>
              <StepLabel>Ordered</StepLabel>
            </Step>
            <Step completed={selectedOrder.shipped}>
              <StepLabel>Created</StepLabel>
            </Step>
            <Step completed={selectedOrder.enRoute}>
              <StepLabel>Recieved</StepLabel>
            </Step>
            <Step completed={selectedOrder.arrived}>
              <StepLabel>Finished</StepLabel>
            </Step>
          </Stepper>
          <div className="tags-container">
            {renderTags(selectedOrder)}
          </div>
          <div align='right'>
            <Button variant="contained" color="primary" onClick={() => setSelectedOrder(null)} className="button">
              Back to Orders
            </Button>
          </div>
        </Paper>
      )}

      <TableContainer component={Paper} className="table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Order ID</TableCell>
              <TableCell align='center'>Customer Name</TableCell>
              <TableCell align='center'>Total Price</TableCell>
              <TableCell align='center'>Order Date</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderID}>
                <TableCell align='center'>{order.orderID}</TableCell>
                <TableCell align='center'>{order.customerName}</TableCell>
                <TableCell align='center'>{order.totalPrice}</TableCell>
                <TableCell align='center'>{order.orderDate}</TableCell>
                <TableCell align='center'>
                  <Button variant="contained" color="primary" onClick={() => handleViewStatus(order)} className="button">
                    View Status
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TrackLog;
