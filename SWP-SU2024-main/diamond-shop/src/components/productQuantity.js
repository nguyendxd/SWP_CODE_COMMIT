// src/components/ProductQuantity.js
import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const ProductQuantity = () => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={decreaseQuantity}
                style={{ padding: '5px 10px', borderStyle: 'none', backgroundColor: 'white', fontSize: '100%' }}>
                <RemoveCircleIcon/>
            </button>
            <span style={{ margin: '0 10px' }}>{quantity}</span>
            <button onClick={increaseQuantity}
                style={{ padding: '5px 10px', borderStyle: 'none', backgroundColor: 'white', fontSize: '100%' }}>
                <AddCircleIcon/>
            </button>
        </div >
    );
};

export default ProductQuantity;
