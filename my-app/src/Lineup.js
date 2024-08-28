import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import './css/Lineup.css'; // Ensure this path is correct

function Lineup() {
  const [players, setPlayers] = useState([]);

  const fetchPlayers = async () => {
    const url = 'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLPlayerList';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
        'x-rapidapi-host': 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com'
      }
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.statusCode === 200) {
        // Filter players based on positions
        const filteredPlayers = data.body.filter(player => player.pos === 'QB' || player.pos === 'RB' || player.pos === 'WR' || player.pos === 'TE' || player.pos === 'K');
        setPlayers(filteredPlayers);
      } else {
        console.error('Error fetching data:', data);
      }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return; // Check for valid drop

    const items = Array.from(players);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPlayers(items);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1">Randoms</Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="players">
          {(provided) => (
            <Table {...provided.droppableProps} ref={provided.innerRef}>
              <TableHead>
                <TableRow>
                  <TableCell>Player</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Team</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Height</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Experience</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {players.map((player, index) => (
                  <Draggable key={player.espnID} draggableId={player.espnID} index={index}>
                    {(provided) => (
                      <TableRow ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <TableCell>
                          <img src={player.espnHeadshot} alt={player.espnName} width={50} height={50} />
                          <a href={player.espnLink} target="_blank" rel="noopener noreferrer">{player.espnName}</a>
                        </TableCell>
                        <TableCell>{player.pos}</TableCell>
                        <TableCell>{player.team}</TableCell>
                        <TableCell>{player.age}</TableCell>
                        <TableCell>{player.height}</TableCell>
                        <TableCell>{player.weight}</TableCell>
                        <TableCell>{player.exp}</TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            </Table>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}

export default Lineup;