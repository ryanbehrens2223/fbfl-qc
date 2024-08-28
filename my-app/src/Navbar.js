import React, { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Link, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import theme from './theme';
import Home from './Home';
import Lineup from './Lineup';
import Scoreboard from './Scoreboard';
import DraftInfo from './DraftInfo';
import FBFL_Logo from './img/FBFL_Logo.jpeg';

function Navbar() {
    const location = useLocation();
    const [value, setValue] = useState(location.pathname);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="navbar tabs" variant='fullWidth' sx={{ backgroundColor: theme.palette.navbar.main }}>
                            <Tab label={<><img src={FBFL_Logo} alt="Home" style={{ height: '30px', marginRight: '5px' }} /></>} value="/" href="https://www.rtsports.com/" target="_blank" sx={{ color: theme.palette.secondary.main, backgroundColor: theme.palette.navbar.main, '&.Mui-selected': { color: theme.palette.primary.light } }}/>
                            <Tab label="Home" value="/" component={Link} to="/" sx={{ color: theme.palette.secondary.main, backgroundColor: theme.palette.navbar.main, '&.Mui-selected': { color: theme.palette.primary.light } }}/>
                            <Tab label="Lineup" value="/lineup" component={Link} to="/lineup" sx={{ color: theme.palette.secondary.main, backgroundColor: theme.palette.navbar.main, '&.Mui-selected': { color: theme.palette.primary.light } }}/>
                            <Tab label="Scoreboard" value="/scoreboard" component={Link} to="/scoreboard" sx={{ color: theme.palette.secondary.main, backgroundColor: theme.palette.navbar.main, '&.Mui-selected': { color: theme.palette.primary.light } }}/>
                            <Tab label="Draft Info" value="/draft-info" component={Link} to="/draft-info" sx={{ color: theme.palette.secondary.main, backgroundColor: theme.palette.navbar.main, '&.Mui-selected': { color: theme.palette.primary.light } }}/>
                            
                        </TabList>
                    </Box>
                    <TabPanel value="/">
                        <Home />
                    </TabPanel>
                    <TabPanel value="/lineup" >
                        <Lineup />
                    </TabPanel>
                    <TabPanel value="/scoreboard" >
                        <Scoreboard />
                    </TabPanel>
                    <TabPanel value="/draft-info" >
                        <DraftInfo />
                    </TabPanel>
                    <TabPanel value="https://www.rtsports.com/">
                        <iframe src="https://www.rtsports.com/" title="RT Sports" style={{ width: '100%', height: '100vh', border: 'none' }}></iframe>
                    </TabPanel>
                </TabContext>
            </Box>
        </ThemeProvider>
    );
}

export default Navbar;