import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Footer from '../footer';
import ProductCard from '../productCard';
import '../../css/engagementRings.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CustomLeftArrow, CustomRightArrow } from '../customeArrow';
import CustomToolbar from '../customToolBar';
import CarouselComponent from '../carouselComponent ';
import { useLocation } from 'react-router-dom';

const EngagementRingsContent = () => {
  const [productData, setProductData] = useState([]);
  const location = useLocation();

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
      setProductData([]);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const backgroundBanner = {
    backgroundImage: `url(../assets/images/engagement-ring-banner.png)`,
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
  const query =new URLSearchParams(location.search);
  const ringTypeFilter = query.get('ringType') || 'Engagement';
  const genderFilter = query.get('gender') || '';

  const ringType = productData.filter(product => {
    const isRingTypeMatch = product.ringMold && product.ringMold.ringType === ringTypeFilter;
    const isGenderMatch = genderFilter ? product.ringMold && product.ringMold.gender === genderFilter : true;
    return isRingTypeMatch && isGenderMatch;
  });

  return (
    <div className='container'>
      <Container style={{ maxWidth: '1800px' }} className="custom-container">
        <div style={backgroundBanner} className='banner-content'>
          <p style={{ color: 'black', position: 'absolute', bottom: '60%', right: '10%', fontFamily:'Arsenal SC', fontSize:'40px'}}>
            "ENGAGEMENT RINGS"
          </p>
        </div>
        <div style={{ backgroundColor: 'white' }} className='explore-diamond-banner'>
          <div style={{ backgroundColor: '#fafafa' }}>
            <h3>Explore Engagement Rings</h3>
            <p style={{ display: 'flex', justifyContent: 'center', fontFamily: 'initial', fontSize: '110%' }}>
              From completed designs to custom engagement rings,
              we have the perfect ring to help you pop the question.
              Explore some of our most popular styles below.
            </p>

            <div className='scroll-bar'>
              <Carousel
                responsive={responsive}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                itemClass="carousel-item-padding-40-px"
              >
                {ringType.map(ring => (
                  <div key={ring.productId} className='ER-items'>
                    <img src={ring.image1} alt={ring.productName} />
                    <p>{ring.productName}</p>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div style={{ padding: '40px' }} className='product-card'>
            <ProductCard products={ringType} />
          </div>
          <CarouselComponent />
        </div>
        <hr style={{ width: '100%' }}></hr>
      </Container>
      <Footer />
    </div>
  );
}

export default EngagementRingsContent;
