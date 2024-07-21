import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons({ text, width, height }) {
    return (
        <Stack spacing={2} direction="row">
            <Button style={{ borderColor: 'black', color:'black', width: width, height: height, fontSize: '15px', fontFamily:'initial' }}            
                variant="outlined">
                {text}
            </Button>
        </Stack>
    );
}

