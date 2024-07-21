import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import DashboardNav from './DashboardNav';
import { useAuth } from '../../authcontext';
import SiteNav from '../../staffsite/StaffNav';
import './RevenuePage.css'

const RevenuePage = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch(`https://localhost:7251/api/payment`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)

                    // Filter invoices based on Phase4 being true
                    const filteredInvoices = data.filter((invoice) => {
                        return invoice.order.orderLogs.some(log => log.phase4);
                    });

                    setInvoices(filteredInvoices);
                    
                } else {
                    console.error("Failed to fetch payment data");
                }
            } catch (error) {
                console.error("Error fetching payment data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const totalRevenue = invoices.reduce((acc, invoice) => acc + (invoice.total || 0), 0);

    const handleClickOpen = (invoice) => {
        setSelectedInvoice(invoice);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedInvoice(null);
    };

    const renderInvoiceDialog = (invoice) => {
        if (!invoice) return null;

        return (
            <div className="container-revenue">
                <div className="header">
                    <div>
                        <p>Order ID: {invoice.order.orderId}</p>
                        <p>Day Created: {new Date(invoice.order.dateCreated).toLocaleDateString()}</p>
                    </div>
                    <div className="logo">
                        <img src="https://firebasestorage.googleapis.com/v0/b/swp-diamond-shop.appspot.com/o/Logo%2Flogo.png?alt=media&token=8a9ecb45-7def-4bbd-803e-9c9296858aad" alt="Logo" />
                    </div>
                </div>
                <div className="thankyou">
                    <p>Thank you for choosing us</p>
                </div>
                <div className="order-details">
                    <h3>Order Details</h3>
                    {invoice.order.orderDetails.map((detail) => (
                        <div className="product" key={detail.productId}>
                            <p>Product ID: {detail.productId}</p>
                            <p>Product Name: {detail.productName}</p>
                            <p>Quantity: {detail.quantity}</p>
                            <p>Price: ${detail.productPrice}</p>
                        </div>
                    ))}
                </div>
                <table className="info-table">
                    <tr>
                        <td className="info-column">
                            <h3>Customer Information</h3>
                            <p>Name: {invoice.order.customer.user.name}</p>
                            <p>Email: {invoice.order.customer.user.email}</p>
                        </td>
                        <td className="info-column total-info">
                            <h3>Payment Information</h3>
                            <p>Total Price: ${invoice.total}</p>
                            <p>Deposit: ${invoice.deposit}</p>
                            <p>Amount Paid: ${invoice.amountPaid}</p>
                        </td>
                    </tr>
                </table>
            </div>
        );
    };

    return (
        <div>
            {user && user.roleId === 3 ? (
                <SiteNav />
            ) : (
                <DashboardNav />
            )}
            <Container className='container'>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Date</TableCell>
                                    <TableCell align="center">Order ID</TableCell>
                                    <TableCell align="center">Total ($)</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {invoices.map((invoice) => (
                                    <TableRow key={invoice.paymentId}>
                                        <TableCell align="center">{new Date(invoice.datePaid).toLocaleDateString()}</TableCell>
                                        <TableCell align="center">{invoice.paymentId}</TableCell>
                                        <TableCell align="center">{invoice.total}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleClickOpen(invoice)}
                                            >
                                                View Invoice
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={2} align="center">
                                        <strong>Total Revenue:</strong>
                                    </TableCell>
                                    <TableCell align="center" colSpan={2}>
                                        <strong>${totalRevenue}</strong>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                    <DialogTitle>Invoice Details</DialogTitle>
                    <DialogContent>
                        {renderInvoiceDialog(selectedInvoice)}
                    </DialogContent>
                </Dialog>
            </Container>
        </div>
    );
};

export default RevenuePage;
