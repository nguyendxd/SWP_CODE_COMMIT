import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, TextField, Checkbox, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useAuth } from './authcontext';
import PaginationControlled from './pagination';
import { routes } from '../routes';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const StyledCard = styled(Card)({
    border: '1px solid #ddd',
    boxShadow: 'none',
    borderRadius: '5px',
    position: 'relative',
    maxWidth: '100%',
});

const StyledCardMedia = styled(CardMedia)({
    height: 200,
    backgroundColor: '#001',
});

const StyledCardContent = styled(CardContent)({
    textAlign: 'center',
    paddingBottom: '16px !important',
});

const PriceTypography = styled(Typography)({
    fontWeight: 'bold',
    marginTop: '8px',
    color: '#ffa500',
});

const ProductName = styled(Typography)({
    marginTop: '8px',
    fontWeight: 'bold',
});

const shapeOptions = ['Round', 'Princess', 'Emerald', 'Asscher', 'Cushion', 'Marquise', 'Radiant', 'Oval', 'Pear', 'Heart'];
const cutOptions = ['Ideal', 'Excellent', 'Very Good', 'Good'];
const colorOptions = ['D', 'E', 'F', 'G', 'H', 'I', 'J'];
const clarityOptions = ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2'];
const caratWeightOptions = [0.2, 1.0, 3.6, 3.9, 4.1, 4.5, 5.0, 5.2, 5.3, 5.4];
const originOptions = ['South Africa', 'Russia', 'Canada', 'Botswana'];

const ProductCard = ({ products }) => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [wishlist, setWishlist] = useState([]);
    const [productType, setProductType] = useState(1); // Default to Diamonds
    const [filters, setFilters] = useState({
        price: '',
        carat: '',
        cut: '',
        shape: '',
        clarity: '',
        color: '',
        origin: '',
    });

    useEffect(() => {
        if (user) {
            const userId = jwtDecode(user.token).unique_name;
            fetchWishlist(userId);
        }
    }, [user]);

    useEffect(() => {
        switch (location.pathname) {
            case routes.diamondList:
                setProductType(1);
                break;
            case routes.engagementRings:
            case routes.necklace:
                setProductType(2);
                break;
            default:
                setProductType(1);
                break;
        }
    }, [location.pathname]);

    const fetchWishlist = async (userId) => {
        try {
            const customerId = await fetchCustomerId(userId);
            const response = await fetch(`https://localhost:7251/api/Wishlists/Customer/${customerId}`);
            if (response.ok) {
                const wishlistData = await response.json();
                setWishlist(wishlistData.wishlistItems.map(item => item.productId));
            }
        } catch (error) {
            console.error('Failed to fetch wishlist:', error);
        }
    };

    const fetchCustomerId = async (userId) => {
        const response = await fetch(`https://localhost:7251/api/customers/user/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch customer details');
        }
        const customer = await response.json();
        return customer.customerId; 
    };

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSelectProduct = async (product, selectedSize) => {
        if (!user) {
            navigate('/login');
        } else {
            try {
                const userId = jwtDecode(user.token).unique_name;
                const customerId = await fetchCustomerId(userId);

                // Check if the product is already in the wishlist
                if (wishlist.includes(product.productId)) {
                    console.log('Product already in wishlist');
                    return;
                }

                // Add the product to the wishlist
                const response = await fetch('https://localhost:7251/api/WishlistItems', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        CustomerId: customerId,
                        ProductId: product.productId,
                        AddedDate: new Date().toISOString() // Use the current date
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to add item to wishlist');
                }

                const addedItem = await response.json();
                setWishlist(prevWishlist => [...prevWishlist, product.productId]);
                console.log('Added item to wishlist:', addedItem);

                alert('Product added to wishlist');
            } catch (error) {
                console.error('Error selecting product:', error);
            }
        }
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        // Add more filter conditions based on selected filters
    );

    const paginatedData = filteredProducts.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const totalPage = Math.ceil(filteredProducts.length / itemsPerPage);

    const renderDiamondFilters = () => (
        <>
            <FormControl variant="outlined" style={{ marginRight: 16, marginBottom: 16 }}>
                <InputLabel>Price</InputLabel>
                <Select
                    value={filters.price}
                    onChange={handleFilterChange}
                    label="Price"
                    name="price"
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="low-to-high">Low to High</MenuItem>
                    <MenuItem value="high-to-low">High to Low</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined" style={{ marginRight: 16, marginBottom: 16 }}>
                <InputLabel>Carat</InputLabel>
                <Select
                    value={filters.carat}
                    onChange={handleFilterChange}
                    label="Carat"
                    name="carat"
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {caratWeightOptions.map(carat => (
                        <MenuItem key={carat} value={carat}>{carat}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="outlined" style={{ marginRight: 16, marginBottom: 16 }}>
                <InputLabel>Cut</InputLabel>
                <Select
                    value={filters.cut}
                    onChange={handleFilterChange}
                    label="Cut"
                    name="cut"
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {cutOptions.map(cut => (
                        <MenuItem key={cut} value={cut}>{cut}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="outlined" style={{ marginRight: 16, marginBottom: 16 }}>
                <InputLabel>Shape</InputLabel>
                <Select
                    value={filters.shape}
                    onChange={handleFilterChange}
                    label="Shape"
                    name="shape"
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {shapeOptions.map(shape => (
                        <MenuItem key={shape} value={shape}>{shape}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="outlined" style={{ marginRight: 16, marginBottom: 16 }}>
                <InputLabel>Clarity</InputLabel>
                <Select
                    value={filters.clarity}
                    onChange={handleFilterChange}
                    label="Clarity"
                    name="clarity"
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {clarityOptions.map(clarity => (
                        <MenuItem key={clarity} value={clarity}>{clarity}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="outlined" style={{ marginRight: 16, marginBottom: 16 }}>
                <InputLabel>Color</InputLabel>
                <Select
                    value={filters.color}
                    onChange={handleFilterChange}
                    label="Color"
                    name="color"
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {colorOptions.map(color => (
                        <MenuItem key={color} value={color}>{color}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="outlined" style={{ marginRight: 16, marginBottom: 16 }}>
                <InputLabel>Origin</InputLabel>
                <Select
                    value={filters.origin}
                    onChange={handleFilterChange}
                    label="Origin"
                    name="origin"
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {originOptions.map(origin => (
                        <MenuItem key={origin} value={origin}>{origin}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );

    const renderOtherProductFilters = () => (
        <>
            {/* Add filters for other product types here */}
        </>
    );

    return (
        <div>
            {/* {productType === 1 ? renderDiamondFilters() : renderOtherProductFilters()} */}
            <TextField
                label="Search by name"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearch}
                style={{ marginBottom: "20px", display: 'flex', justifyContent: 'left', width: '15%' }}
            />
            <Grid container spacing={3}>
                {paginatedData.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.productId}>
                        <StyledCard>
                            <Link key={product.name} to={`${routes.detail}/${product.productId}`}>
                                <StyledCardMedia
                                    image={product.image1}
                                    title={product.productName}
                                    style={{
                                        height: '300px',
                                    }}
                                />
                                <StyledCardContent>
                                    <ProductName variant="body2" color="textSecondary" component="p">
                                        {product.productName}
                                    </ProductName>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        N/a
                                    </Typography>
                                    <PriceTypography variant="h6" component="p" style={{ color: 'black' }}>
                                        Price: {product.price} ₫
                                    </PriceTypography>
                                </StyledCardContent>
                            </Link>
                            <div style={{ display: 'flex', alignItems: 'left' }}>
                                <Checkbox
                                    icon={<FavoriteBorder />}
                                    checkedIcon={<Favorite sx={{ color: 'red' }} />}
                                    checked={wishlist.includes(product.productId)}
                                    onChange={() => handleSelectProduct(product, null)} 
                                />
                            </div>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
            <div style={{ paddingTop: '30px', display: 'flex', justifyContent: 'center' }}>
                <PaginationControlled
                    count={totalPage}
                    page={page}
                    onChange={handleChangePage}
                />
            </div>
        </div>
    );
};

export default ProductCard;
