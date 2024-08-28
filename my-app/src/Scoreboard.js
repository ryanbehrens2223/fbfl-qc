import React, { useState, useEffect } from 'react';
import { Container, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import Match from './Match';

const url = 'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLBoxScore?gameID=20240810_CHI%40BUF&playByPlay=true&fantasyPoints=true&twoPointConversions=2&passYards=.04&passAttempts=0&passTD=4&passCompletions=0&passInterceptions=-2&pointsPerReception=.5&carries=.2&rushYards=.1&rushTD=6&fumbles=-2&receivingYards=.1&receivingTD=6&targets=0&defTD=6&fgMade=3&fgMissed=-3&xpMade=1&xpMissed=-1';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
    'x-rapidapi-host': 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com'
  }
};

async function fetchMatchups() {
  try {
    const response = await axios.request({ url, ...options });
    // Ensure the response data is an array
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

const Scoreboard = () => {
  const [matchups, setMatchups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMatchups = async () => {
      const data = await fetchMatchups();
      setMatchups(data);
      setLoading(false);
    };

    getMatchups();

    // Calculate time difference until the game starts
    const currentDate = new Date();
    const gameDate = new Date('2024-01-07T00:00:00Z'); // Adjust the time as needed
    const timeDifference = gameDate.getTime() - currentDate.getTime();

    if (timeDifference > 0) {
      // Set a timeout to start polling when the game starts
      const timeoutId = setTimeout(() => {
        // Polling for live updates every 30 seconds
        const intervalId = setInterval(getMatchups, 30000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
      }, timeDifference);

      // Cleanup timeout on component unmount
      return () => clearTimeout(timeoutId);
    } else {
      // If the game has already started, start polling immediately
      const intervalId = setInterval(getMatchups, 30000);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        Scoreboard
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Match</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(matchups) && matchups.length > 0 ? (
              matchups.map((match, index) => (
                <Match key={index} match={match} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No matchups available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Scoreboard;