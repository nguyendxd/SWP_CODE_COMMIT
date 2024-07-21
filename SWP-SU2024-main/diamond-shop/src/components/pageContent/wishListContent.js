import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button, IconButton, Grid, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { jwtDecode } from 'jwt-decode';
import pic from '../../constant/ThreeStone_ER.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authcontext';
import { routes } from '../../routes';

const Wishlist = () => {
    const [wishlistItems, setWishListItems] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    const decodedToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            console.log(decoded);
            return decoded.unique_name;
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
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

    useEffect(() => {
        const fetchWishListItems = async () => {
            if (user && user.token) {
                try {
                    const userId = decodedToken(user.token);
                    const customerId = await fetchCustomerId(userId);

                    const response = await fetch(`https://localhost:7251/api/Wishlists/Customer/${customerId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch wishlist items');
                    }
                    const data = await response.json();
                    console.log('Wishlist Data:', data);
                    setWishListItems(data.wishlistItems || []);
                } catch (error) {
                    console.error(error);
                }
            } else {
                const wishlist = JSON.parse(sessionStorage.getItem('wishlist')) || [];
                setWishListItems(wishlist);
            }
        };

        fetchWishListItems();
    }, [user]);

    const handleRemoveItem = async (index, wishlistItemId) => {
        console.log('Removing item:', index, wishlistItemId);

        if (user && wishlistItemId) {
            try {
                const response = await fetch(`https://localhost:7251/api/WishlistItems/${wishlistItemId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to remove item from wishlist');
                }
                const updatedWishlist = wishlistItems.filter((item, i) => i !== index);
                setWishListItems(updatedWishlist);

                if (updatedWishlist.length === 0) {
                    const userId = decodedToken(user.token);
                    const customerId = await fetchCustomerId(userId);

                    const wishlistResponse = await fetch(`https://localhost:7251/api/Wishlists/Customer/${customerId}`);
                    if (wishlistResponse.ok) {
                        const itemCount = await wishlistResponse.json();
                        if (itemCount === 0) {
                            const wishlist = await fetch(`https://localhost:7251/api/Wishlists/Customer/${customerId}`).then(res => res.json());
                            await fetch(`https://localhost:7251/api/Wishlists/${wishlist.wishlistId}`, {
                                method: 'DELETE',
                            });
                        }
                    }
                }
            } catch (error) {
                console.error('Error removing item from wishlist:', error);
            }
        } else {
            console.error('User or wishlistItemId does not exist', user, wishlistItemId);
        }
    };

    const handleClearWishlist = async () => {
        try {
            const userId = decodedToken(user.token);
            const customerId = await fetchCustomerId(userId);

            const response = await fetch(`https://localhost:7251/api/Wishlists/Customer/${customerId}/clear`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to clear wishlist');
            }
            setWishListItems([]);
        } catch (error) {
            console.error('Error clearing wishlist:', error);
        }
    };

    return (
        <Box maxWidth="1200px" style={{ marginTop: '1%', backgroundColor: '', margin: 'auto' }}>
            <Box p={3}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">WISHLIST ({wishlistItems.length} ITEMS)</Typography>
                    <Button size="small" variant="text" sx={{ color: 'black' }} onClick={handleClearWishlist}>Clear Wishlist</Button>
                </div>
                <Grid style={{ marginTop: '1%' }} container spacing={2}>
                    {wishlistItems.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={item.wishlistItemId}>
                            <Card style={{ width: '80%', position: 'relative' }}>
                                <IconButton
                                    aria-label="remove"
                                    onClick={() => handleRemoveItem(index, item.wishlistItemId)}
                                    sx={{ position: 'absolute', right: 8, top: 8 }}
                                >
                                    <CloseIcon />
                                </IconButton>
                                <CardMedia
                                    style={{ maxWidth: '420px', width: '100%', height: 'auto' }}
                                    component="img"
                                    height="140"
                                    image={item.product.image1}
                                    alt={item.title}
                                />
                                <CardContent>
                                    <Typography style={{ fontSize: '90%' }} gutterBottom variant="h5" component="div">
                                        {item.product.productName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {item.product.productName}
                                    </Typography>
                                    <Typography variant="h6">${item.product.price}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Stack spacing={2} direction="row">
                                        <Link key={item.product.productName} to={`${routes.detail}/${item.product.productId}`}>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: 'black',
                                                    color: 'white',
                                                    '&:hover': {
                                                        backgroundColor: 'black',
                                                        color: 'white',
                                                        boxShadow: 'none',
                                                    },
                                                }}
                                            >
                                                View Item
                                            </Button>
                                        </Link>
                                    </Stack>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default Wishlist;
