import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, InputLabel, Button, Typography } from '@mui/material';

const SizeSelection = ({ productId, onSizeSelected, productType, material, caratWeight, mainDiamondId, secondaryDiamondId, secondaryDiamondCount, processingPrice, exchangeRate }) => {
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        let response;
        if (productType === 2) {
          response = await fetch(`https://localhost:7251/api/RingPriceTable/${material}/${caratWeight}/sizes`);
        } else if (productType === 3) {
          response = await fetch(`https://localhost:7251/api/NecklacePriceTable/${material}/${caratWeight}/lengths`);
        }
        if (!response.ok) {
          throw new Error('Failed to fetch sizes');
        }
        const data = await response.json();
        setSizes(data);
      } catch (error) {
        setError('Failed to fetch sizes');
        console.error('Error fetching sizes:', error);
      }
    };

    fetchSizes();
  }, [material, caratWeight, productType]);

  const handleSizeChange = (event) => {
    const size = event.target.value;
    setSelectedSize(size);
  };

  const handleSubmit = async () => {
    const size = selectedSize;
    if (size) {
      try {
        const response = await fetch('https://localhost:7251/api/Products/CalculatePrice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productType: productType,
            material: material,
            size: size.toString(),
            caratWeight: caratWeight,
            mainDiamondId: mainDiamondId,
            secondaryDiamondId: secondaryDiamondId,
            secondaryDiamondCount: secondaryDiamondCount,
            processingPrice: processingPrice,
            exchangeRate: exchangeRate,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch price');
        }
        const data = await response.json();
        if (typeof data === 'object' && data !== null && 'type' in data) {
          throw new Error('Error calculating price: ' + data.title);
        }
        onSizeSelected(size, data);
      } catch (error) {
        setError('Failed to fetch price');
        console.error('Error fetching price:', error);
      }
    } else {
      alert('Please select a size');
    }
  };

  return (
    <div>
      <FormControl variant="outlined" style={{ minWidth: 120 }}>
        <InputLabel>{productType === 2 ? 'Size' : 'Length'}</InputLabel>
        <Select value={selectedSize} onChange={handleSizeChange} displayEmpty>
          {sizes.map((size) => (
            <MenuItem key={size} value={size}>{size}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginLeft: 16 }}>
        Confirm {productType === 2 ? 'Size' : 'Length'}
      </Button>
    </div>
  );
};

export default SizeSelection;
