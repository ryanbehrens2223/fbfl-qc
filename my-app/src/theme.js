// theme.js
import { createTheme } from '@mui/material/styles';
import { indigo, red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#2c387e',
      dark: '#2c387e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff3d00',
      main: red[500],
      dark: '#b2102f',
      contrastText: '#000',
    },
    navbar: {
      main: '#2c387e', // Custom background color for Navbar
    },
  },
});

export default theme;