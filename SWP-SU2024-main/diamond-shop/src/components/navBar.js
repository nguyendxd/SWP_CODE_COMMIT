import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, TextField, InputAdornment } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../constant/logo.png';
import logotext from '../constant/logo_text.png';
import DropdownMenuUser from './dropdownUser';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../routes';
import { useAuth } from './authcontext';

import { jwtDecode } from 'jwt-decode';
import '../css/navBar.css';
import DropContentDiamond from './dropDownContent/dropContentDiamond';
import DropContentJewelry from './dropDownContent/dropContentJewelry';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DropContentEducation from './dropDownContent/dropContentEducation';

const Navbar = () => {
  const { user } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };


  const handleSearch = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      navigate(`${routes.allProducts}?query=${searchInput.trim()}`);
    }
  };
  
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <PhoneIcon />
          <Typography variant="body2">1-800-123-4567</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton color="inherit">
            {user ? <DropdownMenuUser /> : <Link to={routes.login}><AccountCircleIcon /></Link>}
          </IconButton>
          <Link to={routes.wishList}>
            <IconButton color="inherit">
              <FavoriteBorderIcon />
            </IconButton>
          </Link>
          <IconButton>
            {user ? (
              <Link to={routes.shoppingCart}>

                <ShoppingCartOutlinedIcon />

              </Link>
            ) : (
              <Link to={routes.login}>
                <ShoppingCartOutlinedIcon />
              </Link>
            )}
          </IconButton>
        </Box>
      </Toolbar>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <Link to={routes.homePage}>
            <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
            <img src={logotext} alt="Luxe Jewel House" style={{ height: '20px', marginRight: '10px' }} />
          </Link>
        </Box>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <div
            className="navbar-item"
            onMouseEnter={() => handleMouseEnter('diamond')}
            onMouseLeave={handleMouseLeave}
          >
            <Box key='Diamond' display="flex" alignItems="center" mx={2}>
              <button className="navbarDropdown-toggle">
                <Link to={routes.diamond}>
                  <Typography variant="body1">Diamond</Typography>
                </Link>
                <IconButton color="inherit" size="small">
                  <ExpandMoreIcon />
                </IconButton>
              </button>
              <div
                className="navbarDropdownWrapper"
                style={{ display: activeDropdown === 'diamond' ? 'block' : 'none' }}
              >
                <DropContentDiamond />
              </div>
            </Box>
          </div>
          <div
            className="navbar-item"
            onMouseEnter={() => handleMouseEnter('engagement')}
            onMouseLeave={handleMouseLeave}
          >
            <Box key='Engagement Rings' display="flex" alignItems="center" mx={2}>
              <button className="navbarDropdown-toggle">
                <Link to={routes.engagementRings}>
                  <Typography variant="body1">Rings</Typography>
                </Link>
                <IconButton color="inherit" size="small">
                  <ExpandMoreIcon />
                </IconButton>
              </button>
              <div
                className="navbarDropdownWrapper"
                style={{ display: activeDropdown === 'engagement' ? 'block' : 'none' }}
              >
                <DropContentJewelry />
              </div>
            </Box>
          </div>
          <div
            className="navbar-item"
            onMouseEnter={() => handleMouseEnter('necklaces')}
            onMouseLeave={handleMouseLeave}
          >
            <Box key='Necklaces' display="flex" alignItems="center" mx={2}>
              <button className="navbarDropdown-toggle">
                <Link to={routes.necklace}>
                  <Typography variant="body1">Necklaces</Typography>
                </Link>
                {/* <IconButton color="inherit" size="small">
                  <ExpandMoreIcon />
                </IconButton> */}
              </button>
              {/* <div
                className="navbarDropdownWrapper"
                style={{ display: activeDropdown === 'necklaces' ? 'block' : 'none' }}
              >
                <DropContentDiamond />
              </div> */}
            </Box>
          </div>
          <div
            className="navbar-item"
            onMouseEnter={() => handleMouseEnter('education')}
            onMouseLeave={handleMouseLeave}
          >
            <Box key='Education' display="flex" alignItems="center" mx={2}>
              <button className="navbarDropdown-toggle">
                <Link to={routes.ringSize}>
                  <Typography variant="body1">Education</Typography>
                </Link>
                <IconButton color="inherit" size="small">
                  <ExpandMoreIcon />
                </IconButton>
              </button>
              <div
                className="navbarDropdownWrapper"
                style={{ display: activeDropdown === 'education' ? 'block' : 'none' }}
              >
                <DropContentEducation />
              </div>
            </Box>
          </div>
          <div
            className="navbar-item"
          // onMouseEnter={() => handleMouseEnter('education')}
          // onMouseLeave={handleMouseLeave}
          >
            <Box key='diamondPrice' display="flex" alignItems="center" mx={2}>
              <button className="navbarDropdown-toggle">
                <Link to={routes.diamondPrice}>
                  <Typography variant="body1">Diamond Price List</Typography>
                </Link>
                {/* <IconButton color="inherit" size="small">
                  <ExpandMoreIcon />
                </IconButton> */}
              </button>
              {/* <div
                className="navbarDropdownWrapper"
                style={{ display: activeDropdown === 'education' ? 'block' : 'none' }}
              >
                <DropContentEducation />
              </div> */}
            </Box>
          </div>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <TextField
            variant="outlined"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon onClick={handleSearch} style={{ cursor: 'pointer' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'gray',
                  borderRadius: '35px',
                  width: '100%',
                },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' },
              },
              '& .MuiInputLabel-root.Mui-focused': { color: 'black' },
            }}
          />
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
