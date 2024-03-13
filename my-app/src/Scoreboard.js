import React, { useState, useEffect } from 'react';
// import Matchup from './Matchup';

// API calls and data fetching logic
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://api-football-v1.p.rapidapi.com/v3/timezone',
  headers: {
    'X-RapidAPI-Key': 'e3d676aa43mshf95b7dce89a4549p1e5d04jsn654e17bf57df',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}

const Scoreboard = () => {
  const [matchups, setMatchups] = useState([]);

  useEffect(() => {
    // Fetch initial matchups and scores
    fetchMatchups();
  }, []);

  const fetchMatchups = async () => {
    // Make API call to fetch live matchups
    const response = await axios.get('/api/live-matchups');
    setMatchups(response.data);
  };

  // Implement a websocket or polling mechanism to update scores

  return (
    <div className="scoreboard">
      {matchups.map((matchup) => (
        <Matchup key={matchup.id} matchup={matchup} />
      ))}
    </div>
  );
};

export default Scoreboard;
