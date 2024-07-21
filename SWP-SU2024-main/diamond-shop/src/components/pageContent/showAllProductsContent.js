import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Footer from '../footer';
import ProductCard from '../productCard';
import '../../css/showAllProducts.css'; // Import your new CSS file
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CustomLeftArrow, CustomRightArrow } from '../customeArrow';
import CustomToolbar from '../customToolBar';
import CarouselComponent from '../carouselComponent ';
import { useLocation } from 'react-router-dom';

const ShowAllProductsContent = () => {
  const [productData, setProductData] = useState([]);
  const location = useLocation();

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://localhost:7251/api/Products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProductData(data); // Directly set the response if it is an array
    } catch (error) {
      console.log('Error fetching products', error);
      setProductData([]);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  // Get the search query from the URL
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get('query') || '';

  // Filter products based on the search term
  const filteredProducts = searchTerm
    ? productData.filter(product => 
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : productData;

  const backgroundBanner = {
    backgroundImage: `url(../assets/images/all-products-banner.png)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '70vh',
    position: 'relative',
  };

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
    <div className='container'>
      <Container style={{ maxWidth: '1800px' }} className="custom-container">
        <div style={backgroundBanner} className='banner-content'>
          <p style={{ color: 'black', position: 'absolute', bottom: '60%', right: '10%', fontFamily:'Arsenal SC', fontSize:'40px'}}>
            "ALL PRODUCTS"
          </p>
        </div>
        <div style={{ backgroundColor: 'white' }} className='explore-products-banner'>
          <div style={{ backgroundColor: '#fafafa' }}>
            <h3>Explore Our Products</h3>
            <p style={{ display: 'flex', justifyContent: 'center', fontFamily: 'initial', fontSize: '110%' }}>
              Discover a wide variety of products ranging from diamonds to exquisite jewelry pieces. Explore our collection below.
            </p>

            <div className='scroll-bar'>
              <Carousel
                responsive={responsive}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                itemClass="carousel-item-padding-40-px"
              >
                {filteredProducts.map(product => (
                  <div key={product.productId} className='product-items'>
                    <img src={product.image1} alt={product.productName} />
                    <p>{product.productName}</p>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div style={{ padding: '40px' }} className='product-card'>
            <ProductCard products={filteredProducts} />
          </div>
          <CarouselComponent />
        </div>
        <hr style={{ width: '100%' }}></hr>
      </Container>
      <Footer />
    </div>
  );
}

export default ShowAllProductsContent;
