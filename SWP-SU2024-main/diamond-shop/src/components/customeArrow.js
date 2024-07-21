import React from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CustomLeftArrow = ({ onClick }) => {
    return (
        <IconButton onClick={onClick} style={{ position: 'absolute', left: 0, zIndex: 10, color: 'black' }}>
            <ArrowBackIosIcon />
        </IconButton>
    );
};

const CustomRightArrow = ({ onClick }) => {
    return (
        <IconButton onClick={onClick} style={{ position: 'absolute', right: 0, zIndex: 10, color: 'black' }}>
            <ArrowForwardIosIcon />
        </IconButton>
    );
};

export { CustomLeftArrow, CustomRightArrow };
