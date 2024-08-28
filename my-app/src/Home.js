import React from 'react';
import { Box, Container, Button, Typography, Card, CardContent } from '@mui/material';
import './css/Home.css'; // Ensure this path is correct

function Home() {
  const handleClick = (link) => {
    window.location.href = link;
  };

  return (
    <Box className="home">
      <Box className="hero" py={4}>
        <Container className="hero-content">
          <header>
            <Typography variant="h1" style={{ fontSize: '6rem', color: 'gold', textAlign: 'center', marginTop: '0' }}>
              Welcome to FBFL
            </Typography>
            <Typography variant="h2" style={{ fontSize: '4rem', color: 'blue' }}>
              Your ultimate fantasy football league
            </Typography>
          </header>
        </Container>
      </Box>
      <Box className="intro" py={4}>
        <Container>
          <Typography variant="h2">About Us</Typography>
          <Typography>
            The Fantasy Football League (FBFL) is dedicated to providing the best fantasy football experience. Join us to compete, strategize, and enjoy the game of football like never before.
          </Typography>
        </Container>
      </Box>
      <Box className="features" py={3}>
        <Container>
          <Typography variant="h3">Opi & the Bear Links</Typography>
          <Button onClick={() => handleClick('https://docs.google.com/forms/d/e/1FAIpQLSdpgxN78MdkCgcxI0PzkUQU6sLpfeQyKHzUQ3UpNlKXXJrFBQ/viewform')} style={{ color: 'white' }}>
              Post Draft Survey
            </Button>
          <Box className="feature" py={2}>
            <Typography variant="h3">FBFL Links</Typography>
            <Button onClick={() => handleClick('https://rbear17.wixsite.com/fbfl/2024-draft-information')} style={{ color: 'white' }}>
              2024 Draft Information
            </Button>
            <Typography>
              Go to this link to view what to expect in the upcoming 2024 FBFL draft.
            </Typography>
          </Box>
          <Box className="feature" py={2}>
            <Button onClick={() => handleClick('https://rbear17.wixsite.com/fbfl/meeting-minutes')} style={{ color: 'white' }}>
              FBFL Meeting Minutes
            </Button>
            <Typography>
              Create or join a custom league with your friends and family.
            </Typography>
          </Box>
          <Box className="feature" py={2}>
            <Typography variant="h3">Player Stats</Typography>
            <Button onClick={() => handleClick('/draft-info')} style={{ color: 'white' }}>
              Fantasy Stats
            </Button>
            <Typography>
              Access player statistics and analytics to make informed decisions.
            </Typography>
          </Box>
          <Card>
            <CardContent>
              <Typography variant="h3">New Feature</Typography>
              <Button onClick={() => handleClick('https://rbear17.wixsite.com/fbfl/2024-draft-information')} style={{ color: 'white' }}>
              2024 Draft Information
            </Button>
              <Typography>
                This is a new feature that you can showcase using a Material UI Card component.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
