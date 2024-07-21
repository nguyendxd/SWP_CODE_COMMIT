import React, { useState, useEffect } from 'react';
import {
    Container,
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
    Tabs,
    Tab,
    AppBar,
    IconButton,
    TextField,
    MenuItem
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DashboardNav from './DashboardNav';
import { useAuth } from '../../authcontext';
import StaffNav from './../../staffsite/StaffNav';
import './MoldManage.css'; // Import the CSS file

const MoldManage = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [moldData, setMoldData] = useState([]);
    const [priceTableData, setPriceTableData] = useState([]);
    const [editingItem, setEditingItem] = useState({
        material: '',
        size: '',
        caratWeight: '',
        ringMoldId: '',
        necklaceMoldId: '',
        gender: '',
        ringType: ''
    });
    const [calculatedPrice, setCalculatedPrice] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleOpen = (item) => {
        setEditingItem(item ? { ...item } : {
            material: '',
            size: '',
            caratWeight: '',
            gender: '',
            ringType: ''
        });
        setOpen(true);
    };

    const handleClose = () => {
        setEditingItem({
            material: '',
            size: '',
            caratWeight: '',
            gender: '',
            ringType: ''
        });
        setCalculatedPrice(0);
        setOpen(false);
    };

    const fetchMolds = async () => {
        try {
            const response = await fetch(tabIndex === 0 ? 'https://localhost:7251/api/RingMold' : 'https://localhost:7251/api/NecklaceMold');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMoldData(data);
        } catch (error) {
            console.log('Error fetching molds', error);
        }
    };

    const fetchPriceTable = async () => {
        try {
            const response = await fetch(tabIndex === 0 ? 'hhttps://localhost:7251/api/RingPriceTable' : 'https://localhost:7251/api/NecklacePriceTable');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPriceTableData(data);
        } catch (error) {
            console.log('Error fetching price table', error);
        }
    };

    const calculatePrice = async () => {
        const selectedMaterial = editingItem.material;
        const selectedSize = editingItem.size;
        const selectedCaratWeight = editingItem.caratWeight;

        try {
            const response = await fetch(
                `https://localhost:7251/api/${tabIndex === 0 ? 'RingPriceTable' : 'NecklacePriceTable'}/${selectedMaterial}/${selectedSize}/${selectedCaratWeight}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCalculatedPrice(data.basePrice);
        } catch (error) {
            console.log('Error fetching price', error);
            setCalculatedPrice(0);
        }
    };

    useEffect(() => {
        fetchMolds();
        fetchPriceTable();
    }, [tabIndex]);

    useEffect(() => {
        if (editingItem.material && editingItem.size && editingItem.caratWeight) {
            calculatePrice();
        }
    }, [editingItem]);

    const handleFinalSave = async () => {
        try {
            let newMold;
            const apiUrl = tabIndex === 0 ? 'https://localhost:7251/api/RingMold' : 'https://localhost:7251/api/NecklaceMold';

            const moldIdField = tabIndex === 0 ? 'ringMoldId' : 'necklaceMoldId';
            const moldId = editingItem[moldIdField];

            const updatedItem = { ...editingItem, basePrice: calculatedPrice };

            if (moldId) {
                // Update existing mold
                await fetch(`${apiUrl}/${moldId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedItem)
                });
                newMold = updatedItem;
            } else {
                // Create new mold
                const { [moldIdField]: omit, ...newMoldData } = updatedItem; // Omit moldIdField for creation
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newMoldData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error creating mold:', errorData);
                    throw new Error('Failed to create mold');
                }

                newMold = await response.json();
            }

            fetchMolds();
            handleClose();
        } catch (error) {
            console.log('Error saving mold', error);
        }
    };

    const handleDelete = async (id) => {
        console.log('Deleting mold with id:', id); // Debug log

        try {
            const apiUrl = tabIndex === 0 ? `https://localhost:7251/api/RingMold/${id}` : `https://localhost:7251/api/NecklaceMold/${id}`;

            const response = await fetch(apiUrl, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Failed to delete mold with id ${id}`);
            }
            console.log(`Mold with id ${id} deleted successfully.`);

            fetchMolds();
        } catch (error) {
            console.log('Error deleting mold', error);
        }
    };

    const { user } = useAuth();

    return (
        <div>
            <div>
                {user && user.roleId === 3 ? (
                    <StaffNav />
                ) : (
                    <DashboardNav />
                )}
            </div>
            <div className='container-fluid'>
                <div className='cate' position="static">
                    <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
                        <Tab label="Ring Molds" />
                        <Tab label="Necklace Molds" />
                    </Tabs>
                </div>

                <TableContainer component={Paper} className="table-container">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Mold ID</TableCell>
                                <TableCell align="center">Material</TableCell>
                                <TableCell align="center">Size</TableCell>
                                <TableCell align="center">Carat Weight</TableCell>
                                {tabIndex === 0 && <TableCell align="center">Gender</TableCell>}
                                {tabIndex === 0 && <TableCell align="center">Ring Type</TableCell>}
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {moldData.map((mold) => (
                                <TableRow key={tabIndex === 0 ? mold.ringMoldId : mold.necklaceMoldId}>
                                    <TableCell align="center">{tabIndex === 0 ? mold.ringMoldId : mold.necklaceMoldId}</TableCell>
                                    <TableCell align="center">{mold.material}</TableCell>
                                    <TableCell align="center">{mold.size}</TableCell>
                                    <TableCell align="center">{mold.caratWeight}</TableCell>
                                    {tabIndex === 0 && <TableCell align="center">{mold.gender}</TableCell>}
                                    {tabIndex === 0 && <TableCell align="center">{mold.ringType}</TableCell>}
                                    <TableCell align="center">{mold.basePrice}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleOpen(mold)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(tabIndex === 0 ? mold.ringMoldId : mold.necklaceMoldId)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div className="add-mold-button">
                    <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
                        Add {tabIndex === 0 ? 'Ring Mold' : 'Necklace Mold'}
                    </Button>
                </div>

                {/* Mold Detail Popup */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{editingItem?.ringMoldId || editingItem?.necklaceMoldId ? 'Edit Mold' : 'Add Mold'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            select
                            margin="dense"
                            label="Material"
                            fullWidth
                            value={editingItem?.material || ''}
                            onChange={(e) => setEditingItem({ ...editingItem, material: e.target.value })}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value="" disabled></option>
                            {[...new Set(priceTableData.map(item => item.material))].map((material) => (
                                <option key={material} value={material}>
                                    {material}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            select
                            margin="dense"
                            label="Size"
                            fullWidth
                            value={editingItem?.size || ''}
                            onChange={(e) => setEditingItem({ ...editingItem, size: e.target.value })}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value="" disabled></option>
                            {[...new Set(priceTableData.map(item => tabIndex === 0 ? item.size : item.length))].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </TextField>
                        {tabIndex === 0 && (
                            <>
                                <TextField
                                    select
                                    margin="dense"
                                    label="Gender"
                                    fullWidth
                                    value={editingItem?.gender || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, gender: e.target.value })}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="" disabled></option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </TextField>
                                <TextField
                                    select
                                    margin="dense"
                                    label="Ring Type"
                                    fullWidth
                                    value={editingItem?.ringType || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, ringType: e.target.value })}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="" disabled></option>
                                    <option value="Jewelry">Jewelry</option>
                                    <option value="Engagement">Engagement</option>
                                </TextField>
                            </>
                        )}
                        <TextField
                            select
                            margin="dense"
                            label="Carat Weight"
                            fullWidth
                            value={editingItem?.caratWeight || ''}
                            onChange={(e) => setEditingItem({ ...editingItem, caratWeight: e.target.value })}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value="" disabled></option>
                            {[...new Set(priceTableData.map(item => item.caratWeight))].map((caratWeight) => (
                                <option key={caratWeight} value={caratWeight}>
                                    {caratWeight}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            margin="dense"
                            label="Calculated Price"
                            type="number"
                            fullWidth
                            value={calculatedPrice}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleFinalSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default MoldManage;
