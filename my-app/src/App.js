import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import DraftInfo from './DraftInfo';
import Lineup from './Lineup';
import Scoreboard from './Scoreboard';
import Home from './Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <Container style={{ flex: '1' }}>
            <Routes>
              <Route path="/" exact component={Home} />
              <Route path="/lineup" component={Lineup} />
              <Route path="/scoreboard" component={Scoreboard} />
              <Route path="/draft-info" component={DraftInfo} />
            </Routes>
          </Container>
          <Footer style={{ flexShrink: '0' }} />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;