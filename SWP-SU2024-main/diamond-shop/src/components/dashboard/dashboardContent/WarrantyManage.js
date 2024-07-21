import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Tabs,
    Tab,
} from '@mui/material';
import DashboardNav from './DashboardNav';
import StaffNav from './../../staffsite/StaffNav';
import { useAuth } from '../../authcontext';
import './WarrantyManage.css';

const WarrantyManage = () => {
    const [warranties, setWarranties] = useState([]);
    const [orders, setOrders] = useState([]);
    const [showWarrantyModal, setShowWarrantyModal] = useState(false);
    const [showViewWarrantyModal, setShowViewWarrantyModal] = useState(false);
    const [selectedWarranty, setSelectedWarranty] = useState(null);
    const [selectedProductIndex, setSelectedProductIndex] = useState(0);
    const { user } = useAuth();
    const [warrantyDetails, setWarrantyDetails] = useState({
        orderId: '',
        warrantyEndDate: '',
        storeRepresentativeSignature: ''
    });

    const fetchWarranties = async () => {
        try {
            const response = await fetch('https://localhost:7251/api/Warranties');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched Warranties:', data);
            setWarranties(data);
        } catch (error) {
            console.log('Error fetching warranties', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch('https://localhost:7251/api/Orders');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched Orders:', data);
            setOrders(data);
        } catch (error) {
            console.log('Error fetching orders', error);
        }
    };

    const handleWarrantyDetailChange = (e) => {
        const { name, value } = e.target;
        setWarrantyDetails({ ...warrantyDetails, [name]: value });
    };

    const handleSaveWarranty = async () => {
        try {
            const method = selectedWarranty ? 'PUT' : 'POST';
            const url = selectedWarranty
                ? `https://localhost:7251/api/Warranties/${selectedWarranty.warrantyId}`
                : 'https://localhost:7251/api/Warranties';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    warrantyId: selectedWarranty ? selectedWarranty.warrantyId : 0,
                    ...warrantyDetails
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save warranty');
            }

            fetchWarranties(); // Refresh warranties list
            setShowWarrantyModal(false);
            setSelectedWarranty(null);
        } catch (error) {
            console.error('Error saving warranty', error);
        }
    };

    const handleEditWarranty = (warranty) => {
        setSelectedWarranty(warranty);
        setWarrantyDetails({
            orderId: warranty.orderId,
            warrantyEndDate: warranty.warrantyEndDate,
            storeRepresentativeSignature: warranty.storeRepresentativeSignature
        });
        setShowWarrantyModal(true);
    };

    const handleDeleteWarranty = async (warrantyId) => {
        try {
            const response = await fetch(`https://localhost:7251/api/Warranties/${warrantyId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete warranty');
            }
            fetchWarranties(); // Refresh warranties list
        } catch (error) {
            console.error('Error deleting warranty', error);
        }
    };

    const handleViewWarranty = (warranty) => {
        console.log("Viewing warranty:", warranty);
        if (warranty && warranty.order && warranty.order.orderDetails) {
            console.log("Order details:", warranty.order.orderDetails);
            setSelectedWarranty(warranty);
            setSelectedProductIndex(0); // Reset to the first product
            setShowViewWarrantyModal(true);
        } else {
            console.error("Warranty or order details are undefined");
        }
    };

    const handleChangeTab = (event, newValue) => {
        setSelectedProductIndex(newValue);
    };

    useEffect(() => {
        fetchWarranties();
        fetchOrders();
    }, []);

    return (
        <div>
            {user && user.roleId === 3 ? <StaffNav /> : <DashboardNav />}
            <div className='container-fluid'>

                <TableContainer component={Paper} className="table-container">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Warranty ID</TableCell>
                                <TableCell align="center">Order ID</TableCell>
                                <TableCell align="center">Purchase Date</TableCell>
                                <TableCell align="center">Warranty End Date</TableCell>
                                <TableCell align="center">Store Representative Signature</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {warranties.map((warranty) => (
                                <TableRow key={warranty.warrantyId}>
                                    <TableCell align="center">{warranty.warrantyId}</TableCell>
                                    <TableCell align="center">{warranty.orderId}</TableCell>
                                    <TableCell align="center">{new Date(warranty.purchaseDate).toLocaleDateString()}</TableCell>
                                    <TableCell align="center">{new Date(warranty.warrantyEndDate).toLocaleDateString()}</TableCell>
                                    <TableCell align="center">{warranty.storeRepresentativeSignature}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" color="primary" onClick={() => handleEditWarranty(warranty)}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="secondary" onClick={() => handleDeleteWarranty(warranty.warrantyId)}>
                                            Delete
                                        </Button>
                                        <Button variant="contained" onClick={() => handleViewWarranty(warranty)}>
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={showWarrantyModal} onClose={() => setShowWarrantyModal(false)} maxWidth="md" fullWidth>
                    <DialogTitle>{selectedWarranty ? 'Edit Warranty' : 'Create Warranty'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Order ID"
                            type="text"
                            fullWidth
                            name="orderId"
                            value={warrantyDetails.orderId}
                            onChange={handleWarrantyDetailChange}
                            select
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value=""></option>
                            {orders.map(order => (
                                <option key={order.orderId} value={order.orderId}>
                                    {order.orderId}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            margin="dense"
                            label="Warranty End Date"
                            type="date"
                            fullWidth
                            name="warrantyEndDate"
                            value={warrantyDetails.warrantyEndDate}
                            onChange={handleWarrantyDetailChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            margin="dense"
                            label="Store Representative Signature"
                            type="text"
                            fullWidth
                            name="storeRepresentativeSignature"
                            value={warrantyDetails.storeRepresentativeSignature}
                            onChange={handleWarrantyDetailChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowWarrantyModal(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSaveWarranty} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={showViewWarrantyModal} onClose={() => setShowViewWarrantyModal(false)} maxWidth="md" fullWidth>
                    <DialogTitle>View Warranty</DialogTitle>
                    <DialogContent>
                        {selectedWarranty && selectedWarranty.order && selectedWarranty.order.orderDetails ? (
                            <div className="container">
                                <div className="header">
                                    <img style={{ height: '60px', width: '60px' }} src="https://firebasestorage.googleapis.com/v0/b/swp-diamond-shop.appspot.com/o/Logo%2Flogo.png?alt=media&token=8a9ecb45-7def-4bbd-803e-9c9296858aad" alt="Luxe Jewel House" />
                                    <h1>Luxe Jewel House</h1>
                                    <p>Diamond Warranty Certificate</p>
                                </div>
                                <Tabs value={selectedProductIndex} onChange={handleChangeTab}>
                                    {selectedWarranty.order.orderDetails.map((detail, index) => (
                                        <Tab label={detail.productName} key={index} />
                                    ))}
                                </Tabs>
                                {selectedWarranty.order.orderDetails.map((detail, index) => (
                                    <div key={index} role="tabpanel" hidden={selectedProductIndex !== index}>
                                        {selectedProductIndex === index && (
                                            <div>
                                                <div className="form-group">
                                                    <label>Warranty ID</label>
                                                    <input type="text" value={selectedWarranty.warrantyId} readOnly />
                                                </div>
                                                <div className="form-group">
                                                    <label>Customer Name</label>
                                                    <input type="text" value={selectedWarranty.order.customer.name} readOnly />
                                                </div>
                                                <div className="form-group">
                                                    <label>Phone Number</label>
                                                    <input type="text" value={selectedWarranty.order.customer.phoneNumber} readOnly />
                                                </div>
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input type="text" value={selectedWarranty.order.customer.email} readOnly />
                                                </div>
                                                <div className="form-group">
                                                    <label>Address</label>
                                                    <input type="text" value={selectedWarranty.order.customer.address} readOnly />
                                                </div>
                                                <div className="form-group">
                                                    <label>Product ID</label>
                                                    <input type="text" value={detail.productId} readOnly />
                                                </div>
                                                <div className="form-group">
                                                    <label>Product Name</label>
                                                    <input type="text" value={detail.productName} readOnly />
                                                </div>
                                                <div className="form-group">
                                                    <label>Shape</label>
                                                    <input type="text" value={detail.shape} readOnly />
                                                </div>
                                                <div className="form-group">
                                                    <label>Cut</label>
                                                    <input type="text" value={detail.cut} readOnly />
                                                </div>
                                                <div className="form-group">
                                                    <label>Color</label>
                                                    <input type="text" value={detail.color} readOnly />
                                                </div>
                                                <div className="form-group">
                                                    <label>Clarity</label>
                                                    <input type="text" value={detail.clarity} readOnly />
                                                </div>
                                                <div className="form-group">
                                                    <label>Carat Weight</label>
                                                    <input type="text" value={detail.caratWeight} readOnly />
                                                </div>
                                                <div className="form-group">
                                                    <label>Certificate</label>
                                                    <input type="text" value={detail.certificateId} readOnly />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div class="form-group">
                                    <table class="warranty-table">
                                        <thead>
                                            <tr>
                                                <th>Warranty Content</th>
                                                <th>Free</th>
                                                <th>Chargeable</th>
                                                <th>Not Covered</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Resize ring (excluding special designs)</td>
                                                <td>X</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Cleaning</td>
                                                <td>X</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Polishing and plating</td>
                                                <td>X</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Stones under 2mm</td>
                                                <td>X</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Stones over 2mm</td>
                                                <td></td>
                                                <td>X</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Minor scratches due to impact</td>
                                                <td></td>
                                                <td>X</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Damage due to external forces, heat deformation, chemical corrosion</td>
                                                <td></td>
                                                <td></td>
                                                <td>X</td>
                                            </tr>
                                            <tr>
                                                <td>Main stone falling out</td>
                                                <td></td>
                                                <td></td>
                                                <td>X</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="footer">
                                    <p>&copy; 2024 Luxe Jewel House. All Rights Reserved.</p>
                                </div>
                            </div>
                        ) : (
                            <p>No warranty details available.</p>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowViewWarrantyModal(false)} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        </div>
    );
};

export default WarrantyManage;
