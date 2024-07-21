import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Navbar from '../navBar';
import Footer from '../footer';
import ProductCard from '../productCard';
import { CustomLeftArrow, CustomRightArrow } from '../customeArrow';
import CustomToolbar from '../customToolBar';
import CarouselComponent from '../carouselComponent ';
import './ViewEventPage.css';

const ViewEventPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`https://localhost:7251/api/Events/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEvent(data);
            } catch (error) {
                console.error('Error fetching event data:', error);
                setEvent(null);
            }
        };

        fetchEvent();
    }, [id]);

    if (!event) {
        return <div>Loading...</div>;
    }

    const eventEndDate = new Date(event.date);
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className="container">
            <Navbar />
            <Container style={{ maxWidth: '1800px' }} className="custom-container">
                <Box className="event-details" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px', textAlign: 'center', color: 'white' }}>
                    <Typography variant="h1">{event.eventName}</Typography>
                    <Typography variant="h6">End Date: {eventEndDate.toLocaleDateString()}</Typography>
                    <Typography variant="body1">{event.description}</Typography>
                </Box>
                <Box className="discounted-products" style={{ marginTop: '20px' }}>
                    <Typography variant="h2">Discounted Products</Typography>
                    <Carousel
                        responsive={responsive}
                        customLeftArrow={<CustomLeftArrow />}
                        customRightArrow={<CustomRightArrow />}
                        itemClass="carousel-item-padding-40-px"
                    >
                        {event.eventItems && event.eventItems.map((item) => {
                            
                            return (
                                <div key={item.productId} className="ER-items">
                                    <img src={item.product.image1} alt={item.product.productName} />
                                    <p>{item.product.productName}</p>
                                    
                                </div>
                            );
                        })}
                    </Carousel>
                </Box>
                <CustomToolbar />
                <div style={{ padding: '40px' }} className="product-card">
                    <ProductCard products={event.eventItems.map(item => ({
                        ...item.product,
                        discountedPrice: item.product.Price
                    }))} />
                </div>
                <CarouselComponent />
                <hr style={{ width: '100%' }} />
            </Container>
            <Footer />
        </div>
    );
};

export default ViewEventPage;
