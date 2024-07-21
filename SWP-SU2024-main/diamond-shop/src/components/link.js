/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const preventDefault = (event) => event.preventDefault();

export default function UnderlineLink({text}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        // justifyContent: 'center',
        typography: 'body1',
        fontFamily: '-moz-initial',
        '& > :not(style) ~ :not(style)': {
          ml: 2,
        },
      }}
      onClick={preventDefault}
    >
      <Link href="#" underline="always">
        {text}
      </Link>
    </Box>
  );
}
