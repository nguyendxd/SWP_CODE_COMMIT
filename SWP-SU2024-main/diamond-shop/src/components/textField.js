import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({ width, height, label}) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField style={{width: width, height: height, color:'color', fontFamily:'initial'}}
       id="standard-basic" label={label} variant="standard" />
    </Box>
  );
}
