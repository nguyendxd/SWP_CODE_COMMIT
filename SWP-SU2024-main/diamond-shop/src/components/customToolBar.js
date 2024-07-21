import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, Slider, Stack, Button, TextField, Grid } from '@mui/material';

const CustomToolbar = ({ onFilterChange, onSortChange }) => {
  const [filter, setFilter] = useState({
    shape: '',
    color: '',
    clarity: '',
    cut: '',
    priceRange: [0, 5000000],
    caratRange: [0, 8],
  });
  const [sort, setSort] = useState('');

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
    onFilterChange({ ...filter, [name]: value });
  };

  const handlePriceChange = (event, newValue) => {
    setFilter({
      ...filter,
      priceRange: newValue,
    });
    onFilterChange({ ...filter, priceRange: newValue });
  };

  const handleCaratChange = (event, newValue) => {
    setFilter({
      ...filter,
      caratRange: newValue,
    });
    onFilterChange({ ...filter, caratRange: newValue });
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    onSortChange(event.target.value);
  };

  return (
    <Box display="flex" flexDirection="column" p={2} gap={2} sx={{ color: 'black' }}>
      <Typography variant="h6" align="center" sx={{ color: 'black' }}>
        Find the perfect GIA-certified natural diamond right for you!
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant={filter.shape === '' ? 'contained' : 'outlined'}
          onClick={() => handleFilterChange({ target: { name: 'shape', value: '' } })}
          sx={{ color: filter.shape === '' ? 'white' : 'gray', backgroundColor: filter.shape === '' ? 'black' : 'white', borderColor: 'gray' }}
        >
          Tất cả
        </Button>
        <Button><img src="/path/to/round-icon.png" alt="Round" /></Button>
        <Button><img src="/path/to/princess-icon.png" alt="Princess" /></Button>
        <Button><img src="/path/to/cushion-icon.png" alt="Cushion" /></Button>
        <Button><img src="/path/to/emerald-icon.png" alt="Emerald" /></Button>
        <Button><img src="/path/to/oval-icon.png" alt="Oval" /></Button>
        <Button><img src="/path/to/radiant-icon.png" alt="Radiant" /></Button>
        <Button><img src="/path/to/asscher-icon.png" alt="Asscher" /></Button>
        <Button><img src="/path/to/marquise-icon.png" alt="Marquise" /></Button>
        <Button><img src="/path/to/heart-icon.png" alt="Heart" /></Button>
        <Button><img src="/path/to/pear-icon.png" alt="Pear" /></Button>
      </Stack>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2}>
          <Typography sx={{ color: 'black' }}>Color</Typography>
        </Grid>
        <Grid item xs={4}>
          <Slider
            value={filter.color}
            onChange={handleFilterChange}
            name="color"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={10}
            valueLabelFormat={(value) => ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'][value]}
            sx={{ color: '#757575' }}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ color: 'black' }}>Clarity</Typography>
        </Grid>
        <Grid item xs={4}>
          <Slider
            value={filter.clarity}
            onChange={handleFilterChange}
            name="clarity"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={8}
            valueLabelFormat={(value) => ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1'][value]}
            sx={{ color: '#757575' }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2}>
          <Typography sx={{ color: 'black' }}>Cut</Typography>
        </Grid>
        <Grid item xs={4}>
          <Slider
            value={filter.cut}
            onChange={handleFilterChange}
            name="cut"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={3}
            valueLabelFormat={(value) => ['Excellent', 'Very Good', 'Good', 'Fair'][value]}
            sx={{ color: '#757575' }}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ color: 'black' }}>Price Range</Typography>
        </Grid>
        <Grid item xs={4}>
          <Slider
            value={filter.priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={5000000}
            sx={{ color: '#757575' }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2}>
          <Typography sx={{ color: 'black' }}>Carat Range</Typography>
        </Grid>
        <Grid item xs={4}>
          <Slider
            value={filter.caratRange}
            onChange={handleCaratChange}
            valueLabelDisplay="auto"
            min={0}
            max={8}
            sx={{ color: '#757575' }}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ color: 'black' }}>Millimetre</Typography>
        </Grid>
        <Grid item xs={4}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <TextField
              label="Từ"
              variant="outlined"
              type="number"
              sx={{
                '& .MuiInputLabel-root': { color: '#757575' }, // Label color
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#757575' }, // Default border color
                  '&:hover fieldset': { borderColor: 'black' }, // Border color on hover
                  '&.Mui-focused fieldset': { borderColor: 'black' }, // Border color when focused
                },
                '& .MuiInputLabel-root.Mui-focused': { color: 'black' }, // Label color when focused
              }}
            />
            <TextField
              label="Đến"
              variant="outlined"
              type="number"
              sx={{
                '& .MuiInputLabel-root': { color: 'gray' }, // Label color
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'gray' }, // Default border color
                  '&:hover fieldset': { borderColor: 'black' }, // Border color on hover
                  '&.Mui-focused fieldset': { borderColor: 'black' }, // Border color when focused
                },
                '& .MuiInputLabel-root.Mui-focused': { color: 'black' }, // Label color when focused
              }}
            />
          </Stack>

        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2}>
          <Typography sx={{ color: 'black' }}>Sort By</Typography>
        </Grid>
        <Grid item xs={2}>
          <FormControl sx={{ width: '200px', paddingLeft: '0', color: 'gray' }}>
            <Select
              value={sort}
              onChange={handleSortChange}
              displayEmpty
              sx={{ color: '#757575' }}
            >
              <MenuItem value=""><em>No Sort</em></MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="caratWeight">Carat Weight</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
<div style={{display:'flex', justifyContent:'center'}}>
      <Button
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: 'black',
          color: 'white',
          width: '20%',
          '&:hover': {
            backgroundColor: '#757575',
            color: 'white',
          },
        }}
      >
        Xem ngay 977 viên kim cương
      </Button>
      </div>
    </Box>
  );
};

export default CustomToolbar;
