import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Slider, Button, FormControl, Select, MenuItem, Box, InputLabel } from '@mui/material';

const DiamondFilter = () => {
    const [shape, setShape] = useState('');
    const [millimetre, setMillimetre] = useState([0, 0]);
    const [carat, setCarat] = useState([0, 0]);
    const [color, setColor] = useState([0, 10]);
    const [clarity, setClarity] = useState([0, 10]);
    const [cut, setCut] = useState([0, 10]);
    const [price, setPrice] = useState([0, 100]);

    const handleShapeChange = (event) => setShape(event.target.value);
    const handleMillimetreChange = (event, newValue) => setMillimetre(newValue);
    const handleCaratChange = (event, newValue) => setCarat(newValue);
    const handleColorChange = (event, newValue) => setColor(newValue);
    const handleClarityChange = (event, newValue) => setClarity(newValue);
    const handleCutChange = (event, newValue) => setCut(newValue);
    const handlePriceChange = (event, newValue) => setPrice(newValue);

    return (
        <Container maxWidth="xl" style={{ backgroundColor: 'white', padding: '2%' }}>
            <Typography variant="h6" gutterBottom>
                Tìm kiếm ngay viên kim cương thiên nhiên kiểm định GIA hoàn hảo dành riêng cho bạn!
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                    <FormControl fullWidth>
                        <InputLabel>Shape (Hình dạng)</InputLabel>
                        <Select value={shape} onChange={handleShapeChange}>
                            <MenuItem value=""><em>Tất cả</em></MenuItem>
                            <MenuItem value="round">Round</MenuItem>
                            <MenuItem value="oval">Oval</MenuItem>
                            <MenuItem value="princess">Princess</MenuItem>
                            <MenuItem value="emerald">Emerald</MenuItem>
                            <MenuItem value="asscher">Asscher</MenuItem>
                            <MenuItem value="marquise">Marquise</MenuItem>
                            <MenuItem value="cushion">Cushion</MenuItem>
                            <MenuItem value="radiant">Radiant</MenuItem>
                            <MenuItem value="pear">Pear</MenuItem>
                            <MenuItem value="heart">Heart</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Typography gutterBottom>Millimetre (Kích thước)</Typography>
                    <Box display="flex" alignItems="center">
                        <TextField
                            variant="outlined"
                            value={millimetre[0]}
                            onChange={(e) => setMillimetre([Number(e.target.value), millimetre[1]])}
                            style={{ marginRight: '8px' }}
                        />
                        <Typography>-</Typography>
                        <TextField
                            variant="outlined"
                            value={millimetre[1]}
                            onChange={(e) => setMillimetre([millimetre[0], Number(e.target.value)])}
                            style={{ marginLeft: '8px' }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Typography gutterBottom>Carat (Trọng lượng)</Typography>
                    <Box display="flex" alignItems="center">
                        <TextField
                            variant="outlined"
                            value={carat[0]}
                            onChange={(e) => setCarat([Number(e.target.value), carat[1]])}
                            style={{ marginRight: '8px' }}
                        />
                        <Typography>-</Typography>
                        <TextField
                            variant="outlined"
                            value={carat[1]}
                            onChange={(e) => setCarat([carat[0], Number(e.target.value)])}
                            style={{ marginLeft: '8px' }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Typography gutterBottom>Color (Màu sắc)</Typography>
                    <Slider value={color} onChange={handleColorChange} valueLabelDisplay="auto" max={10} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Typography gutterBottom>Clarity (Độ sạch)</Typography>
                    <Slider value={clarity} onChange={handleClarityChange} valueLabelDisplay="auto" max={10} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Typography gutterBottom>Cut (Cắt)</Typography>
                    <Slider value={cut} onChange={handleCutChange} valueLabelDisplay="auto" max={10} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Typography gutterBottom>Price (Giá tiền)</Typography>
                    <Slider value={price} onChange={handlePriceChange} valueLabelDisplay="auto" max={100} />
                </Grid>
                <Grid item xs={12}>
                    <Box mt={2}>
                        <Button variant="contained" style={{ backgroundColor: '#8d6e63' }}>Xem ngay 977 viên kim cương</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default DiamondFilter;
