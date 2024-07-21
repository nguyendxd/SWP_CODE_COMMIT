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
    Tabs,
    Tab,
    IconButton,
    TextField
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DashboardNav from './DashboardNav';
import { useAuth } from '../../authcontext';
import StaffNav from './../../staffsite/StaffNav';
import './ProductManage.css';

const ProductManage = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [productData, setProductData] = useState([]);
    const [diamondData, setDiamondData] = useState([]);
    const [ringMoldData, setRingMoldData] = useState([]);
    const [necklaceMoldData, setNecklaceMoldData] = useState([]);
    const [price, setPrice] = useState(0);

    const initialJewelryState = {
        productName: '',
        productType: '',
        material: '',
        size: '',
        description: '',
        price: '',
        quantity: 0,
        image1: '',
        image2: '',
        image3: '',
        ringMoldId: '',
        necklaceMoldId: '',
        processingPrice: '',
        exchangeRate: '',
        mainDiamondId: '',
        secondaryDiamondId: '',
        secondaryDiamondCount: 0,
        diamondPrice: 0,
        secondaryDiamondPrice: 0
    };

    const initialDiamondState = {
        productName: '',
        description: '',
        shape: '',
        cut: '',
        color: '',
        clarity: '',
        caratWeight: '',
        fluorescence: '',
        lengthWidthRatio: '',
        depth: '',
        tables: '',
        symmetry: '',
        girdle: '',
        measurements: '',
        origin: '',
        image1: '',
        image2: '',
        image3: '',
        quantity: 0
    };

    const [editingItem, setEditingItem] = useState(initialJewelryState);

    const shapeOptions = ['Round', 'Princess', 'Emerald', 'Asscher', 'Cushion', 'Marquise', 'Radiant', 'Oval', 'Pear', 'Heart'];
    const cutOptions = ['Ideal', 'Excellent', 'Very Good', 'Good'];
    const colorOptions = ['D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const clarityOptions = ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2'];
    const fluorescenceOptions = ['None', 'Faint', 'Medium', 'Strong'];
    const caratWeightOptions = [0.2, 1.0, 3.6, 3.9, 4.1, 4.5, 5.0, 5.2, 5.3, 5.4];
    const lengthWidthRatioOptions = [1.0, 1.1, 1.2, 1.3, 1.4];
    const depthOptions = [60, 61, 62, 63, 64, 65];
    const tablesOptions = [53, 54, 55, 56, 57];
    const symmetryOptions = ['Excellent', 'Very Good', 'Good', 'Fair'];
    const girdleOptions = ['Thin', 'Medium', 'Slightly Thick', 'Thick'];
    const originOptions = ['South Africa', 'Russia', 'Canada', 'Botswana']

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleOpen = (item) => {
        if (tabIndex === 1) {
            if (item) {
                const diamond = diamondData.find(d => d.diamondId === item.mainDiamondId) || {};
                setEditingItem({ ...initialDiamondState, ...item, ...diamond, quantity: item.quantity || 0 });
            } else {
                setEditingItem(initialDiamondState);
            }
        } else {
            if (item) {
                const moldData = item.productType === 2 ? ringMoldData : necklaceMoldData;
                const moldIdKey = item.productType === 2 ? 'ringMoldId' : 'necklaceMoldId';
                const mold = moldData.find(m => m[moldIdKey] === item[moldIdKey]);
                if (mold) {
                    setEditingItem({ ...initialJewelryState, ...item, [moldIdKey]: item[moldIdKey], material: mold.material, size: mold.size });
                } else {
                    setEditingItem({ ...initialJewelryState, ...item, [moldIdKey]: item[moldIdKey] });
                }
            } else {
                setEditingItem(initialJewelryState);
            }
        }
        setOpen(true);
    };

    const handleClose = () => {
        setEditingItem(tabIndex === 0 ? initialJewelryState : initialDiamondState);
        setPrice(0);
        setOpen(false);
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://localhost:7251/api/Products');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProductData(data);
        } catch (error) {
            console.log('Error fetching products', error);
        }
    };

    const fetchDiamonds = async () => {
        try {
            const response = await fetch('https://localhost:7251/api/Diamonds');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDiamondData(data);
        } catch (error) {
            console.log('Error fetching diamonds', error);
        }
    };

    const fetchRingMolds = async () => {
        try {
            const response = await fetch('https://localhost:7251/api/RingMold');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched ring molds:', data);
            setRingMoldData(data);
        } catch (error) {
            console.log('Error fetching ring molds', error);
        }
    };
    
    const fetchNecklaceMolds = async () => {
        try {
            const response = await fetch('https://localhost:7251/api/NecklaceMold');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched necklace molds:', data);
            setNecklaceMoldData(data);
        } catch (error) {
            console.log('Error fetching necklace molds', error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchDiamonds();
        fetchRingMolds();
        fetchNecklaceMolds();
    }, []);

    const handleFinalSave = async () => {
        try {
            const itemToSave = {
                ...editingItem,
                price: parseFloat(price),
                ringMoldId: editingItem.ringMoldId || null,
                necklaceMoldId: editingItem.necklaceMoldId || null,
                mainDiamondId: editingItem.mainDiamondId || null,
                secondaryDiamondId: editingItem.secondaryDiamondId || null,
                secondaryDiamondCount: editingItem.secondaryDiamondCount || 0
            };
    
            let newProduct;
            if (tabIndex === 0) { // Jewelry
                if (editingItem.productId) {
                    const response = await fetch(`https://localhost:7251/api/Products/${editingItem.productId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(itemToSave)
                    });
    
                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error('Error updating product:', errorData);
                        throw new Error('Failed to update product');
                    }
    
                    // newProduct = await response.json();
                } else {
                    const response = await fetch('https://localhost:7251/api/Products', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(itemToSave)
                    });
    
                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error('Error creating product:', errorData);
                        throw new Error('Failed to create product');
                    }
    
                    newProduct = await response.json();
                }
                await fetchProducts();
            } else { // Diamonds
                if (editingItem.diamondId) {
                    const diamondResponse = await fetch(`https://localhost:7251/api/Diamonds/${editingItem.diamondId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(editingItem)
                    });
    
                    if (!diamondResponse.ok) {
                        const errorData = await diamondResponse.json();
                        console.error('Error updating diamond:', errorData);
                        throw new Error('Failed to update diamond');
                    }
    
                    const diamondPriceResponse = await fetch(`https://localhost:7251/api/DiamondPrice?carat=${editingItem.caratWeight}&color=${editingItem.color}&clarity=${editingItem.clarity}&cut=${editingItem.cut}`);
                    if (!diamondPriceResponse.ok) {
                        const errorData = await diamondPriceResponse.json();
                        console.error('Error fetching diamond price:', errorData);
                        throw new Error('Failed to fetch diamond price');
                    }
    
                    const diamondPriceData = await diamondPriceResponse.json();
                    const diamondPrice = diamondPriceData || 0;
                    console.log(diamondPrice);
    
                    const productUpdateResponse = await fetch(`https://localhost:7251/api/Products/${editingItem.productId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            productId: editingItem.productId,
                            productName: editingItem.productName,
                            productType: 1,
                            description: editingItem.description,
                            price: diamondPrice,
                            mainDiamondId: editingItem.diamondId,
                            quantity: editingItem.quantity,
                            image1: editingItem.image1,
                            image2: editingItem.image2,
                            image3: editingItem.image3,
                        })
                    });
    
                    if (!productUpdateResponse.ok) {
                        const errorData = await productUpdateResponse.json();
                        console.error('Error updating product:', errorData);
                        throw new Error('Failed to update product');
                    }
    

                } else {
                    const newDiamondResponse = await fetch('https://localhost:7251/api/Diamonds', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(editingItem)
                    });
    
                    if (!newDiamondResponse.ok) {
                        const errorData = await newDiamondResponse.json();
                        console.error('Error creating diamond:', errorData);
                        throw new Error('Failed to create diamond');
                    }
    
                    const newDiamond = await newDiamondResponse.json();
    
                    const diamondPriceResponse = await fetch(`https://localhost:7251/api/DiamondPrice?carat=${newDiamond.caratWeight}&color=${newDiamond.color}&clarity=${newDiamond.clarity}&cut=${newDiamond.cut}`);
                    if (!diamondPriceResponse.ok) {
                        const errorData = await diamondPriceResponse.json();
                        console.error('Error fetching diamond price:', errorData);
                        throw new Error('Failed to fetch diamond price');
                    }
    
                    const diamondPriceData = await diamondPriceResponse.json();
                    const diamondPrice = diamondPriceData.price || 0;
                    console.log(diamondPrice);
    
                    const productResponse = await fetch('https://localhost:7251/api/Products', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            productName: editingItem.productName,
                            productType: 1,
                            description: editingItem.description,
                            price: diamondPrice,
                            mainDiamondId: newDiamond.diamondId,
                            quantity: editingItem.quantity,
                            image1: editingItem.image1,
                            image2: editingItem.image2,
                            image3: editingItem.image3,
                        })
                    });
    
                    if (!productResponse.ok) {
                        const errorData = await productResponse.json();
                        console.error('Error creating product:', errorData);
                        throw new Error('Failed to create product');
                    }
    
                    newProduct = await productResponse.json();
                }
                await fetchDiamonds();
                await fetchProducts();
            }
    
            handleClose();
        } catch (error) {
            console.log('Error saving item', error);
        }
    };

    const handleDelete = async (id) => {
        console.log('Deleting item with id:', id);

        try {
            if (tabIndex === 0) { // Jewelry
                const response = await fetch(`https://localhost:7251/api/Products/${id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error(`Failed to delete product with id ${id}`);
                }
                console.log(`Product with id ${id} deleted successfully.`);
            } else { // Diamonds
                const product = productData.find(p => p.mainDiamondId === id);
                if (product) {
                    const productResponse = await fetch(`https://localhost:7251/api/Products/${product.productId}`, {
                        method: 'DELETE',
                    });
                    if (!productResponse.ok) {
                        throw new Error(`Failed to delete product with id ${product.productId}`);
                    }
                    console.log(`Product with id ${product.productId} deleted successfully.`);
                }

                const diamondResponse = await fetch(`https://localhost:7251/api/Diamonds/${id}`, {
                    method: 'DELETE',
                });
                if (!diamondResponse.ok) {
                    throw new Error(`Failed to delete diamond with id ${id}`);
                }
                console.log(`Diamond with id ${id} deleted successfully.`);
            }
            fetchProducts();
            fetchDiamonds();
        } catch (error) {
            console.log('Error deleting item', error);
        }
    };

    const renderMoldDropdown = () => {
        if (!editingItem || !editingItem.productType) {
            console.log('No product type selected');
            return null;
        }
    
        const isRing = Number(editingItem.productType) === 2;  // Use Number() to ensure correct type comparison
        const moldData = isRing ? ringMoldData : necklaceMoldData;
        const moldIdKey = isRing ? 'ringMoldId' : 'necklaceMoldId';
    
        console.log(`Product type: ${editingItem.productType}`);
        console.log(`Is ring: ${isRing}`);
        console.log('Mold data:', moldData);
    
        return (
            <TextField
                select
                margin="dense"
                label={isRing ? "Ring Mold" : "Necklace Mold"}
                fullWidth
                value={editingItem[moldIdKey] || ''}
                onChange={(e) => {
                    const selectedMold = moldData.find(m => m[moldIdKey].toString() === e.target.value.toString());
                    if (selectedMold) {
                        setEditingItem((prev) => ({
                            ...prev,
                            [moldIdKey]: e.target.value,
                            material: selectedMold.material,
                            size: selectedMold.size.toString()  // Ensure size is a string
                        }));
                    } else {
                        console.error('Selected mold not found in moldData:', e.target.value);
                        setEditingItem((prev) => ({
                            ...prev,
                            [moldIdKey]: '',
                            material: '',
                            size: '',
                            price: 0
                        }));
                    }
                }}
                SelectProps={{
                    native: true,
                }}
            >
                <option value="" disabled>Select a mold</option>
                {moldData.map((mold) => (
                    <option key={mold[moldIdKey]} value={mold[moldIdKey]}>
                        {mold[moldIdKey]}
                    </option>
                ))}
            </TextField>
        );
    };
    

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        console.log(`Changing field: ${name} Value: ${value}`);
    
        setEditingItem((prev) => {
            const updatedItem = {
                ...prev,
                [name]: name === 'size' ? value.toString() : value || null  // Convert size to string and handle null for other fields
            };
    
            if (name === 'productType') {
                console.log(`Product type changed: ${value}`);
                updatedItem.productType = Number(value); // Ensure productType is a number
                updatedItem.ringMoldId = null;
                updatedItem.necklaceMoldId = null;
                updatedItem.material = '';
                updatedItem.size = '';
                updatedItem.price = '';
                updatedItem.mainDiamondId = '';
                updatedItem.secondaryDiamondId = '';
                updatedItem.secondaryDiamondCount = 0;
            }
    
            return updatedItem;
        });
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
                        <Tab label="Jewelry" />
                        <Tab label="Diamonds" />
                    </Tabs>
                </div>

                {tabIndex === 0 && (
                    <TableContainer component={Paper} className="table-container">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Product ID</TableCell>
                                    <TableCell align="center">Product Name</TableCell>
                                    <TableCell align="center">Product Type</TableCell>
                                    <TableCell align="center">Material</TableCell>
                                    <TableCell align="center">Size</TableCell>
                                    <TableCell align="center">Description</TableCell>
                                    <TableCell align="center">Main Diamond ID</TableCell>
                                    <TableCell align="center">Secondary Diamond ID</TableCell>
                                    <TableCell align="center">Secondary Diamond Count</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                    <TableCell align="center">Image 1</TableCell>
                                    <TableCell align="center">Image 2</TableCell>
                                    <TableCell align="center">Image 3</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productData.filter(product => product.productType !== 1).map((product) => (
                                    <TableRow key={product.productId}>
                                        <TableCell align="center">{product.productId}</TableCell>
                                        <TableCell align="center">{product.productName}</TableCell>
                                        <TableCell align="center">{product.productType}</TableCell>
                                        <TableCell align="center">{product.material}</TableCell>
                                        <TableCell align="center">{product.size}</TableCell>
                                        <TableCell align="center">{product.description}</TableCell>
                                        <TableCell align="center">{product.mainDiamondId}</TableCell>
                                        <TableCell align="center">{product.secondaryDiamondId}</TableCell>
                                        <TableCell align="center">{product.secondaryDiamondCount}</TableCell>
                                        <TableCell align="center">{product.quantity}</TableCell>
                                        <TableCell align="center">{product.price}</TableCell>
                                        <TableCell align="center">
                                            <img src={product.image1} alt="Product Image 1" />
                                        </TableCell>
                                        <TableCell align="center">
                                            <img src={product.image2} alt="Product Image 2" />
                                        </TableCell>
                                        <TableCell align="center">
                                            <img src={product.image3} alt="Product Image 3" />
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleOpen(product)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(product.productId)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                {tabIndex === 1 && (
                    <TableContainer component={Paper} className="table-container">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Product ID</TableCell>
                                    <TableCell align="center">Product Name</TableCell>
                                    <TableCell align="center">Description</TableCell>
                                    <TableCell align="center">Shape</TableCell>
                                    <TableCell align="center">Origin</TableCell>
                                    <TableCell align="center">Cut</TableCell>
                                    <TableCell align="center">Color</TableCell>
                                    <TableCell align="center">Clarity</TableCell>
                                    <TableCell align="center">Carat Weight</TableCell>
                                    <TableCell align="center">Fluorescence</TableCell>
                                    <TableCell align="center">Length Width Ratio</TableCell>
                                    <TableCell align="center">Depth</TableCell>
                                    <TableCell align="center">Tables</TableCell>
                                    <TableCell align="center">Symmetry</TableCell>
                                    <TableCell align="center">Girdle</TableCell>
                                    <TableCell align="center">Measurements</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                    <TableCell align="center">Image 1</TableCell>
                                    <TableCell align="center">Image 2</TableCell>
                                    <TableCell align="center">Image 3</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productData.filter(product => product.productType === 1).map((product) => {
                                    const diamond = diamondData.find(d => d.diamondId === product.mainDiamondId) || {};
                                    return (
                                        <TableRow key={product.productId}>
                                            <TableCell align="center">{product.productId}</TableCell>
                                            <TableCell align="center">{product.productName}</TableCell>
                                            <TableCell align="center">{product.description}</TableCell>
                                            <TableCell align="center">{diamond.shape}</TableCell>
                                            <TableCell align="center">{diamond.origin}</TableCell>
                                            <TableCell align="center">{diamond.cut}</TableCell>
                                            <TableCell align="center">{diamond.color}</TableCell>
                                            <TableCell align="center">{diamond.clarity}</TableCell>
                                            <TableCell align="center">{diamond.caratWeight}</TableCell>
                                            <TableCell align="center">{diamond.fluorescence}</TableCell>
                                            <TableCell align="center">{diamond.lengthWidthRatio}</TableCell>
                                            <TableCell align="center">{diamond.depth}</TableCell>
                                            <TableCell align="center">{diamond.tables}</TableCell>
                                            <TableCell align="center">{diamond.symmetry}</TableCell>
                                            <TableCell align="center">{diamond.girdle}</TableCell>
                                            <TableCell align="center">{diamond.measurements}</TableCell>
                                            <TableCell align="center">{product.price}</TableCell>
                                            <TableCell align="center">
                                                <img src={product.image1} alt="Diamond Image 1" />
                                            </TableCell>
                                            <TableCell align="center">
                                                <img src={product.image2} alt="Diamond Image 2" />
                                            </TableCell>
                                            <TableCell align="center">
                                                <img src={product.image3} alt="Diamond Image 3" />
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton onClick={() => handleOpen(product)}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(product.mainDiamondId)}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                <div className="add-product-button">
                    <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
                        Add {tabIndex === 0 ? 'Jewelry' : 'Diamond'}
                    </Button>
                </div>

                {/* Product Detail Popup */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{editingItem?.productId ? 'Edit Item' : 'Add Item'}</DialogTitle>
                    <DialogContent>
                        {tabIndex === 0 && (
                            <>
                                <TextField
                                    margin="dense"
                                    label="Product Name"
                                    type="text"
                                    fullWidth
                                    value={editingItem?.productName || ''}
                                    onChange={handleChange}
                                    name="productName"
                                />
                                <TextField
                                    select
                                    margin="dense"
                                    label="Product Type"
                                    fullWidth
                                    value={editingItem?.productType || ''}
                                    onChange={handleChange}
                                    name="productType"
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="" disabled></option>
                                    <option value="2">Ring</option>
                                    <option value="3">Necklace</option>
                                </TextField>
                                {renderMoldDropdown()}
                                <TextField
                                    margin="dense"
                                    label="Material"
                                    type="text"
                                    fullWidth
                                    value={editingItem?.material || ''}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    margin="dense"
                                    label="Size"
                                    type="text"
                                    fullWidth
                                    value={editingItem?.size || ''}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    margin="dense"
                                    label="Description"
                                    type="text"
                                    fullWidth
                                    value={editingItem?.description || ''}
                                    onChange={handleChange}
                                    name="description"
                                />
                                <TextField
                                    select
                                    margin="dense"
                                    label="Main Diamond ID"
                                    fullWidth
                                    value={editingItem?.mainDiamondId || ''}
                                    onChange={handleChange}
                                    name="mainDiamondId"
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="" disabled></option>
                                    {diamondData.map((diamond) => (
                                        <option key={diamond.diamondId} value={diamond.diamondId}>
                                            {diamond.diamondId}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    margin="dense"
                                    label="Secondary Diamond ID"
                                    fullWidth
                                    value={editingItem?.secondaryDiamondId || ''}
                                    onChange={handleChange}
                                    name="secondaryDiamondId"
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="" disabled></option>
                                    {diamondData.map((diamond) => (
                                        <option key={diamond.diamondId} value={diamond.diamondId}>
                                            {diamond.diamondId}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    margin="dense"
                                    label="Secondary Diamond Count"
                                    type="number"
                                    fullWidth
                                    value={editingItem?.secondaryDiamondCount || ''}
                                    onChange={handleChange}
                                    name="secondaryDiamondCount"
                                />
                                <TextField
                                    margin="dense"
                                    label="Processing Price"
                                    type="number"
                                    fullWidth
                                    value={editingItem?.processingPrice || ''}
                                    onChange={handleChange}
                                    name="processingPrice"
                                />
                                <TextField
                                    margin="dense"
                                    label="Exchange Rate"
                                    type="number"
                                    fullWidth
                                    value={editingItem?.exchangeRate || ''}
                                    onChange={handleChange}
                                    name="exchangeRate"
                                />
                                <TextField
                                    margin="dense"
                                    label="Quantity"
                                    type="number"
                                    fullWidth
                                    value={editingItem?.quantity || ''}
                                    onChange={handleChange}
                                    name="quantity"
                                />
                                <TextField
                                    margin="dense"
                                    label="Image 1"
                                    type="text"
                                    fullWidth
                                    value={editingItem?.image1 || ''}
                                    onChange={handleChange}
                                    name="image1"
                                />
                                <TextField
                                    margin="dense"
                                    label="Image 2"
                                    type="text"
                                    fullWidth
                                    value={editingItem?.image2 || ''}
                                    onChange={handleChange}
                                    name="image2"
                                />
                                <TextField
                                    margin="dense"
                                    label="Image 3"
                                    type="text"
                                    fullWidth
                                    value={editingItem?.image3 || ''}
                                    onChange={handleChange}
                                    name="image3"
                                />
                            </>
                        )}
                        {tabIndex === 1 && (
                            <>
                                <TextField
                                    margin="dense"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    value={editingItem?.productName || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, productName: e.target.value })}
                                />
                                <TextField
                                    margin="dense"
                                    label="Description"
                                    type="text"
                                    fullWidth
                                    value={editingItem?.description || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                />
                                <TextField
                                    select
                                    margin="dense"
                                    label="Shape"
                                    fullWidth
                                    value={editingItem?.shape || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, shape: e.target.value })}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="" disabled></option>
                                    {shapeOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    margin="dense"
                                    label="Origin"
                                    fullWidth
                                    value={editingItem?.origin || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, origin: e.target.value })}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="" disabled></option>
                                    {originOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    margin="dense"
                                    label="Cut"
                                    fullWidth
                                    value={editingItem?.cut || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, cut: e.target.value })}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="" disabled></option>
                                    {cutOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    margin="dense"
                                    label="Color"
                                    fullWidth
                                    value={editingItem?.color || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="" disabled></option>
                                    {colorOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    margin="dense"
                                    label="Clarity"
                                    fullWidth
                                    value={editingItem?.clarity || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, clarity: e.target.value })}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="" disabled></option>
                                    {clarityOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    margin="dense"
                                    label="Carat Weight"
                                    fullWidth
                                    value={editingItem?.caratWeight || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, caratWeight: parseFloat(e.target.value) })}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="" disabled></option>
                                    {caratWeightOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    margin="dense"
                                    label="Fluorescence"
                                    fullWidth
                                    value={editingItem?.fluorescence || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, fluorescence: e.target.value })}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="" disabled></option>
                                    {fluorescenceOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    margin="dense"
                                    label="Length Width Ratio"
                                    fullWidth
                                    value={editingItem?.lengthWidthRatio || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, lengthWidthRatio: parseFloat(e.target.value) })}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="" disabled></option>
                                    {lengthWidthRatioOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    margin="dense"
                                    label="Depth"
                                    fullWidth
                                    value={editingItem?.depth || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, depth: parseFloat(e.target.value) })}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="" disabled></option>
                                    {depthOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    margin="dense"
                                    label="Tables"
                                    fullWidth
                                    value={editingItem?.tables || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, tables: parseFloat(e.target.value) })}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="" disabled></option>
                                    {tablesOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    margin="dense"
                                    label="Symmetry"
                                    fullWidth
                                    value={editingItem?.symmetry || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, symmetry: e.target.value })}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="" disabled></option>
                                    {symmetryOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    margin="dense"
                                    label="Girdle"
                                    fullWidth
                                    value={editingItem?.girdle || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, girdle: e.target.value })}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="" disabled></option>
                                    {girdleOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    margin="dense"
                                    label="Measurements"
                                    type="text"
                                    fullWidth
                                    value={editingItem?.measurements || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, measurements: e.target.value })}
                                />
                                <TextField
                                    margin="dense"
                                    label="Quantity"
                                    type="number"
                                    fullWidth
                                    value={editingItem?.quantity || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, quantity: parseInt(e.target.value, 10) })}
                                />
                                <TextField
                                    margin="dense"
                                    label="Image 1"
                                    type="text"
                                    fullWidth
                                    value={editingItem?.image1 || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, image1: e.target.value })}
                                />
                                <TextField
                                    margin="dense"
                                    label="Image 2"
                                    type="text"
                                    fullWidth
                                    value={editingItem?.image2 || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, image2: e.target.value })}
                                />
                                <TextField
                                    margin="dense"
                                    label="Image 3"
                                    type="text"
                                    fullWidth
                                    value={editingItem?.image3 || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, image3: e.target.value })}
                                />
                            </>
                        )}
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

export default ProductManage;
