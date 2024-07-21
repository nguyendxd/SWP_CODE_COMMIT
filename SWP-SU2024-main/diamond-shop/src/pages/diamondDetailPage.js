import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Table, TableBody, TableRow, TableCell, Box, MenuItem, Select, FormControl, Paper, Button } from '@mui/material';
import NavBar from '../components/navBar';
import SizeSelection from '../components/sizeSelection';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/authcontext';
import { jwtDecode } from 'jwt-decode';
import FeedbackComponent from '../components/feedback';
import '../css/diamondDetailPage.css';
import ReportIcon from '@mui/icons-material/Report';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Footer from '../components/footer';
import { routes } from '../routes';


const DiamondDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [expandedSection, setExpandedSection] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);
  const [mainDiamond, setMainDiamond] = useState(null);
  const [secondaryDiamond, setSecondaryDiamond] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://luxehouse.azurewebsites.net/api/Products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data.product);
        setFinalPrice(data.finalPrice);
        if (data.product.productType === 2) {
          setSelectedSize(data.product.size.split(',')[0]);
        }

        // Fetch main diamond details
        if (data.product.mainDiamondId) {
          const mainDiamondResponse = await fetch(`https://luxehouse.azurewebsites.net/api/Diamonds/${data.product.mainDiamondId}`);
          const mainDiamondData = await mainDiamondResponse.json();
          setMainDiamond(mainDiamondData);
        }

        // Fetch secondary diamond details
        if (data.product.secondaryDiamondId) {
          const secondaryDiamondResponse = await fetch(`https://luxehouse.azurewebsites.net/api/Diamonds/${data.product.secondaryDiamondId}`);
          const secondaryDiamondData = await secondaryDiamondResponse.json();
          setSecondaryDiamond(secondaryDiamondData);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSizeSelected = (size, price) => {
    setSelectedSize(size);
    setFinalPrice(price);
  };

  const handleToggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSelectProduct = async () => {
    if (!user) {
      navigate('/login');
    } else {
      try {
        const userId = parseInt(jwtDecode(user.token).unique_name);
        const sizeString = selectedSize.toString();

        const productResponse = await fetch('https://luxehouse.azurewebsites.net/api/Products/CreateOrGetProductWithSize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId: product.productId, size: sizeString }),
        });

        if (!productResponse.ok) {
          throw new Error('Failed to create or get product with size');
        }

        const rawProductResponse = await productResponse.text();
        console.log(`Raw Product Response: ${rawProductResponse}`);

        if (!rawProductResponse) {
          throw new Error('Empty response received from server');
        }

        const productWithSize = JSON.parse(rawProductResponse);

        let cartResponse = await fetch(`https://luxehouse.azurewebsites.net/api/Cart/User/${userId}`);
        let cart;
        if (cartResponse.ok) {
          cart = await cartResponse.json();
        } else if (cartResponse.status === 404) {
          cartResponse = await fetch('https://luxehouse.azurewebsites.net/api/Cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId }),
          });

          if (!cartResponse.ok) {
            throw new Error('Failed to create a cart');
          }

          cart = await cartResponse.json();
        } else {
          throw new Error('Failed to fetch or create a cart');
        }

        console.log(`Product Price: ${productWithSize.price}`); // Debug log

        const response = await fetch('https://luxehouse.azurewebsites.net/api/CartItem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cartID: cart.cartID,
            productID: productWithSize.productId,
            quantity: 1,
            price: productWithSize.price,
            size: sizeString,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add item to cart');
        }

        alert('Product added to cart');
      } catch (error) {
        console.error('Error selecting product:', error);
      }
    }
  };



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  const isDiamond = product.productType === 1;
  const isRing = product.productType === 2;
  const isNecklace = product.productType === 3;
  const depositPercentage = 20;
  const depositAmount = (finalPrice * depositPercentage) / 100;

  const getBackToGalleryLink = (productType) => {
    switch (productType) {
      case 1:
        return routes.diamond;
      case 2:
        return routes.engagementRings;
      case 3:
        return routes.necklace;
      default:
        return routes.homePage;
    }
  };

  return (
    <div>
      <NavBar />
      <Container className="custom-container">
        <div className="back-to-gallery">
          <Link to={getBackToGalleryLink(product.productType)}>&lt; Back To Gallery</Link>
        </div>
        <Grid container spacing={4} className="diamond-detail-section">
          <Grid item xs={12} md={6}>
            <div className="image-wrapper">
              <img src={product.image1} alt="Product" className="diamond-image" />
              <div className="rotate-instructions">CLICK & DRAG TO ROTATE</div>
            </div>
            <div className="image-gallery">
              <img src={product.image1} alt="Product Thumbnail" />
              <img src={product.image2} alt="Product Thumbnail" />
              <img src={product.image3} alt="Product Thumbnail" />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" style={{ marginBottom: '2rem' }} className="product-title">{product.productName}</Typography>

            <Typography variant="h5" className="price">Price: {finalPrice} <span className="product-price">VND</span></Typography>
            {isRing && (
              <Box display="flex" alignItems="center" mt={2}>
                <Typography variant="body2" style={{ marginRight: '8px' }}>Current Ring Size:</Typography>
                <SizeSelection
                  productId={id}
                  onSizeSelected={handleSizeSelected}
                  productType={product.productType}
                  material={product.material}
                  caratWeight={product.ringMold.caratWeight}
                  mainDiamondId={product.mainDiamondId}
                  secondaryDiamondId={product.secondaryDiamondId}
                  secondaryDiamondCount={product.secondaryDiamondCount}
                  processingPrice={product.processingPrice}
                  exchangeRate={product.exchangeRate}
                />
                <Link to={routes.ringSize} style={{ marginLeft: '16px', textDecoration: 'underline' }}>Ring Size Help</Link>
              </Box>
            )}
            {isNecklace && (
              <Box display="flex" alignItems="center" mt={2}>
                <Typography variant="body2" style={{ marginRight: '8px' }}>Current Necklace Length:</Typography>
                <SizeSelection
                  productId={id}
                  onSizeSelected={handleSizeSelected}
                  productType={product.productType}
                  material={product.material}
                  caratWeight={product.necklaceMold.caratWeight}
                  mainDiamondId={product.mainDiamondId}
                  secondaryDiamondId={product.secondaryDiamondId}
                  secondaryDiamondCount={product.secondaryDiamondCount}
                  processingPrice={product.processingPrice}
                  exchangeRate={product.exchangeRate}
                />
                <Link href="#" style={{ marginLeft: '16px', textDecoration: 'underline' }}>Necklace Length Help</Link>
              </Box>
            )}

            <Typography variant="h6" className="deposit" mt={2}>
              Deposit: {depositAmount.toFixed(2)} (20%)
            </Typography>
            <div className="button-group">
              <Button
                variant="contained"
                className="select-button"
                onClick={handleSelectProduct}
                style={{ backgroundColor: 'black', color: 'white' }}
                disabled={product.quantity === 0}
              >
                {product.quantity === 0 ? 'PRODUCT UNAVAILABLE' : `SELECT THIS ${isDiamond ? 'DIAMOND' : 'PRODUCT'}`}
              </Button>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} className="additional-info-section">
          <Grid item xs={12} md={6}>
            <Table className="product-specs-table">
              <TableBody>
                {isDiamond ? (
                  <>
                    <TableRow>
                      <TableCell>Shape</TableCell>
                      <TableCell className="spec-value">{product.mainDiamond.shape} </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Color</TableCell>
                      <TableCell className="spec-value">{product.mainDiamond.color} </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Clarity</TableCell>
                      <TableCell className="spec-value">{product.mainDiamond.clarity} </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Carat Weight</TableCell>
                      <TableCell className="spec-value">{product.mainDiamond.caratWeight} </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Fluorescence</TableCell>
                      <TableCell className="spec-value">{product.mainDiamond.fluorescence} </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Length/Width Ratio</TableCell>
                      <TableCell className="spec-value">{product.mainDiamond.lengthWidthRatio} </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Depth %</TableCell>
                      <TableCell className="spec-value">{product.mainDiamond.depth} </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Table %</TableCell>
                      <TableCell className="spec-value">{product.mainDiamond.tables} </TableCell>
                    </TableRow>
                    {expandedSection === 'additional' && (
                      <>
                        <TableRow>
                          <TableCell>Symmetry</TableCell>
                          <TableCell className="spec-value">{product.mainDiamond.symmetry}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Girdle</TableCell>
                          <TableCell className="spec-value">{product.mainDiamond.girdle} </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Measurements</TableCell>
                          <TableCell className="spec-value">{product.mainDiamond.measurements}</TableCell>
                        </TableRow>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <TableRow>
                      <TableCell>Material</TableCell>
                      <TableCell className="spec-value">{product.material || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Size</TableCell>
                      <TableCell className="spec-value">{selectedSize || product.size}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell className="spec-value">{product.description}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Secondary Diamond Count</TableCell>
                      <TableCell className="spec-value">{product.secondaryDiamondCount}</TableCell>
                    </TableRow>
                  </>
                )}
                <TableRow className="show-more" onClick={() => handleToggleSection('additional')}>
                  <TableCell colSpan={2}>
                    {expandedSection === 'additional' ? (
                      <>
                        <ExpandLessIcon />
                        <span className="show-more-text">Show Less</span>
                      </>
                    ) : (
                      <>
                        <ExpandMoreIcon />
                        <span className="show-more-text">Show More</span>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          {!isDiamond && (
            <Grid item xs={12} md={6}>
              <div className="additional-links">
                <div className="additional-link" onClick={() => handleToggleSection('gradingReport')}>
                  <Typography>GIA Grading Report</Typography>
                  {expandedSection === 'gradingReport' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </div>
                {expandedSection === 'gradingReport' && (
                  <div className="additional-content">
                    {mainDiamond && (
                      <>
                        <Typography variant="h6">Main Diamond</Typography>
                        <Table className="diamond-specs-table">
                          <TableBody>
                            <TableRow>
                              <TableCell>Shape</TableCell>
                              <TableCell className="spec-value">{mainDiamond.shape}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Carat Weight</TableCell>
                              <TableCell className="spec-value">{mainDiamond.caratWeight}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Color</TableCell>
                              <TableCell className="spec-value">{mainDiamond.color}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Clarity</TableCell>
                              <TableCell className="spec-value">{mainDiamond.clarity}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Cut</TableCell>
                              <TableCell className="spec-value">{mainDiamond.cut}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Fluorescence</TableCell>
                              <TableCell className="spec-value">{mainDiamond.fluorescence}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Symmetry</TableCell>
                              <TableCell className="spec-value">{mainDiamond.symmetry}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Girdle</TableCell>
                              <TableCell className="spec-value">{mainDiamond.girdle}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Depth %</TableCell>
                              <TableCell className="spec-value">{mainDiamond.depth}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Table %</TableCell>
                              <TableCell className="spec-value">{mainDiamond.tables}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Measurements</TableCell>
                              <TableCell className="spec-value">{mainDiamond.measurements}</TableCell>
                            </TableRow>

                          </TableBody>
                        </Table>
                      </>
                    )}
                    {secondaryDiamond && (
                      <>
                        <Typography variant="h6" style={{ marginTop: '16px' }}>Secondary Diamond</Typography>
                        <Table className="diamond-specs-table">
                          <TableBody>
                            <TableRow>
                              <TableCell>Shape</TableCell>
                              <TableCell className="spec-value">{secondaryDiamond.shape}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Carat Weight</TableCell>
                              <TableCell className="spec-value">{secondaryDiamond.caratWeight}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Color</TableCell>
                              <TableCell className="spec-value">{secondaryDiamond.color}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Clarity</TableCell>
                              <TableCell className="spec-value">{secondaryDiamond.clarity}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Cut</TableCell>
                              <TableCell className="spec-value">{secondaryDiamond.cut}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Fluorescence</TableCell>
                              <TableCell className="spec-value">{secondaryDiamond.fluorescence}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Symmetry</TableCell>
                              <TableCell className="spec-value">{secondaryDiamond.symmetry}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Girdle</TableCell>
                              <TableCell className="spec-value">{secondaryDiamond.girdle}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Depth %</TableCell>
                              <TableCell className="spec-value">{secondaryDiamond.depth}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Table %</TableCell>
                              <TableCell className="spec-value">{secondaryDiamond.tables}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Measurements</TableCell>
                              <TableCell className="spec-value">{secondaryDiamond.measurements}</TableCell>
                            </TableRow>

                          </TableBody>
                        </Table>
                      </>
                    )}
                  </div>
                )}
              </div>
            </Grid>
          )}
        </Grid>
        <div style={{ paddingTop: '5%' }}>
          <FeedbackComponent productId={id} />
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default DiamondDetailPage;


