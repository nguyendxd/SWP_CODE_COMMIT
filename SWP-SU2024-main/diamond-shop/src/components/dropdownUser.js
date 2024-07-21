import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Typography, ListItemIcon } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from './authcontext';
import { Link } from 'react-router-dom';
import { routes } from '../routes';

const DropdownMenuUser = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { logout } = useAuth();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleClose();
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                <AccountCircleIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem disabled>
                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        My Account
                    </Typography>
                </MenuItem>
                <Link to='/userinfo/hoso' style={{textDecoration:'none'}}>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <PersonIcon fontSize="small" />
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    Log out
                </MenuItem>
            </Menu>
        </div>
    );
};

export default DropdownMenuUser;
