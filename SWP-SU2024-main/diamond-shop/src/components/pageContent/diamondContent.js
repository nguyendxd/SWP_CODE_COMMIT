import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Container, Typography, IconButton, MenuItem, Menu, Select } from '@mui/material';
import Footer from '../footer';
import ProductCard from '../productCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CustomLeftArrow, CustomRightArrow } from '../customeArrow';
import CustomToolbar from '../customToolBar';
import CarouselComponent from '../carouselComponent ';
import diamondBanner from '../../constant/diamondBanner.png'
import DiamondFilter from '../diamondFilter';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const DiamondsContent = () => {
  const [productData, setProductData] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState(null);
  const [sortCriteria, setSortCriteria] = useState(null);
  const query = useQuery();
  const shape = query.get('shape');

  const fetchProducts = async () => {
    try {
      console.log('Fetching products and diamonds...');
      const productResponse = await fetch('https://localhost:7251/api/Products');
      const diamondResponse = await fetch('https://localhost:7251/api/Diamonds');
      
      if (!productResponse.ok || !diamondResponse.ok) {
        throw new Error(`HTTP error! status: ${productResponse.status} ${diamondResponse.status}`);
      }
      
      const products = await productResponse.json();
      const diamonds = await diamondResponse.json();
      
      console.log('Products fetched:', products);
      console.log('Diamonds fetched:', diamonds);
      
      // Combine the data based on DiamondID
      const combinedData = products.map(product => {
        const diamond = diamonds.find(diamond => diamond.diamondId === product.mainDiamondId);
        if (diamond) {
          return { ...product, ...diamond };
        }
        return product;
      });

      console.log('Combined data:', combinedData);

      setProductData(combinedData); 
    } catch (error) {
      console.log('Error fetching products', error);
      setProductData([]);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const applyFilters = (data) => {
    if (!filterCriteria) return data;

    return data.filter(product => {
      // Apply filter criteria here, e.g., by color, clarity, etc.
      // Example:
      if (filterCriteria.color && product.color !== filterCriteria.color) {
        return false;
      }
      // Add other filter conditions as needed
      return true;
    });
  };

  const applySort = (data) => {
    if (!sortCriteria) return data;

    return data.slice().sort((a, b) => {
      // Apply sorting criteria here, e.g., by price, carat weight, etc.
      // Example:
      if (sortCriteria === 'price') {
        return a.price - b.price;
      } else if (sortCriteria === 'caratWeight') {
        return a.caratWeight - b.caratWeight;
      }
      // Add other sorting conditions as needed
      return 0;
    });
  };

  const handleFilterChange = (criteria) => {
    setFilterCriteria(criteria);
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const backgroundBanner = {
    backgroundImage: `url(${diamondBanner})`,
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

  let filteredDiamonds = productData;
  if (shape) {
    filteredDiamonds = filteredDiamonds.filter(product => product.productType === 1 && product.shape === shape);
  } else {
    filteredDiamonds = filteredDiamonds.filter(product => product.productType === 1);
  }
  
  filteredDiamonds = applyFilters(filteredDiamonds);
  filteredDiamonds = applySort(filteredDiamonds);

  console.log('Filtered diamonds:', filteredDiamonds);

  return (
    <div className='container'>
      <Container style={{ maxWidth: '1800px' }} className="custom-container">
        <div style={backgroundBanner} className='banner-content'>
          <p style={{ color: 'black', position: 'absolute', bottom: '60%', right: '10%' }}>
            "DIAMONDS"
          </p>
        </div>
        
        <div style={{ backgroundColor: 'white' }} className='explore-diamond-banner'>
          <div style={{ backgroundColor: '#fafafa' }}>
            <h3>Explore Diamonds</h3>
            <p style={{ display: 'flex', justifyContent: 'center', fontFamily: 'initial', fontSize: '110%' }}>
              From loose diamonds to custom diamond jewelry,
              we have the perfect diamond to suit your needs.
              Explore some of our most popular styles below.
            </p>

            <div className='scroll-bar'>
              <Carousel
                responsive={responsive}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                itemClass="carousel-item-padding-40-px"
              >
                {filteredDiamonds.map(diamond => (
                  <div key={diamond.productId} className='diamond-items'>
                    <img src={diamond.image1} alt={diamond.productName} />
                    <p>{diamond.productName}</p>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          {/* <CustomToolbar onFilterChange={handleFilterChange} onSortChange={handleSortChange} /> */}
          <div style={{ padding: '40px' }} className='product-card'>
            <ProductCard products={filteredDiamonds} />
          </div>
          <CarouselComponent />
        </div>
        <hr style={{ width: '100%' }}></hr>
        {/* <DiamondFilter/> */}
      </Container>
      <Footer />
    </div>
  );
}

export default DiamondsContent;
