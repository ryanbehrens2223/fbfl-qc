import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: theme.palette.primary.main, color: theme.palette.common.white, textAlign: 'center' }}>
      <Link href="https://rbear17.wixsite.com/fbfl" target="_blank" color="inherit">
        Visit FBFL
      </Link>
    </Box>
  );
};

export default Footer;