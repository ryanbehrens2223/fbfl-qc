import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Card, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

function DraftInfo() {
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState('All Positions');
    const [selectedAdpType, setSelectedAdpType] = useState('halfPPR');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const fetchPlayers = async () => {
        const positionParam = selectedPosition === 'All Positions' ? '' : selectedPosition;
        const adpUrl = `https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLADP?adpType=${selectedAdpType}&position=${positionParam}`;
        const projectionsUrl = `https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLProjections?week=season&archiveSeason=2024&twoPointConversions=2&passYards=.04&passAttempts=-.5&passTD=4&passCompletions=1&passInterceptions=-2&pointsPerReception=1&receptions=1&carries=.2&rushYards=.1&rushTD=6&fumbles=-2&receivingYards=.1&receivingTD=6&targets=.1&fgMade=3&fgMissed=-1&xpMade=1&xpMissed=-1`;

        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
                'x-rapidapi-host': 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com'
            }
        };

        try {
            const [adpResponse, projectionsResponse] = await Promise.all([
                fetch(adpUrl, options),
                fetch(projectionsUrl, options)
            ]);

            const adpData = await adpResponse.json();
            const projectionsData = await projectionsResponse.json();

            console.log('ADP Data:', adpData);
            console.log('Projections Data:', projectionsData);

            if (adpData.statusCode === 200 && projectionsData.statusCode === 200) {
                const playerProjections = projectionsData.body.playerProjections;

                // Convert the object to an array
                const playerProjectionsArray = Object.values(playerProjections);

                const mergedData = adpData.body.adpList.map(player => {
                    const projection = playerProjectionsArray.find(proj => proj.playerID === player.playerID);
                    return { ...player, ...projection };
                });

                const updatedMergedData = mergedData.map(player => {
                    let fantasyPoints;
                    if (selectedAdpType === 'halfPPR') {
                        fantasyPoints = player.fantasyPointsHalfPPR;
                    } else if (selectedAdpType === 'standard') {
                        fantasyPoints = player.fantasyPointsStandard;
                    } else {
                        fantasyPoints = player.fantasyPointsDefault;
                    }
                    return { ...player, fantasyPoints };
                });

                console.log('Updated Merged Data:', updatedMergedData);

                setPlayers(updatedMergedData);
                setLoading(false);
            } else {
                console.error('Error fetching data:', adpData, projectionsData);
                setLoading(false); // Stop loading if there's an error
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false); // Stop loading if there's an error
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, [selectedPosition, selectedAdpType]);

    const handlePositionChange = (event) => {
        setSelectedPosition(event.target.value);
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedPlayers = React.useMemo(() => {
        let sortablePlayers = [...players];
        if (sortConfig.key !== null) {
            sortablePlayers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortablePlayers;
    }, [players, sortConfig]);

    const filteredPlayers = selectedPosition === 'All Positions'
        ? sortedPlayers
        : sortedPlayers.filter(player => player.posADP && player.posADP.startsWith(selectedPosition));

    console.log('Players:', players);
    console.log('Filtered Players:', filteredPlayers);

    if (loading) {
        return <CircularProgress />;
    }

    const renderSortArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />;
        }
        return null;
    };

    return (
        <Card variant="outlined" style={{ padding: '1rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>
                Draft Information
            </Typography>
            <Select value={selectedAdpType} onChange={(event) => setSelectedAdpType(event.target.value)} style={{ marginBottom: '1rem' }}>
                <MenuItem value="halfPPR">Half PPR</MenuItem>
                <MenuItem value="standard">Standard</MenuItem>
                <MenuItem value="PPR">PPR</MenuItem>
            </Select>
            <Select value={selectedPosition} onChange={handlePositionChange} style={{ marginBottom: '1rem' }}>
                <MenuItem value="All Positions">All Positions</MenuItem>
                <MenuItem value="QB">Quarterback</MenuItem>
                <MenuItem value="RB">Running Back</MenuItem>
                <MenuItem value="WR">Wide Receiver</MenuItem>
                <MenuItem value="TE">Tight End</MenuItem>
            </Select>
            <Table style={{ display: 'block' }}>
                <TableHead style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
                    <TableRow>
                        <TableCell onClick={() => handleSort('longName')} style={{ width: '14%' }}>
                            Player Name {renderSortArrow('longName')}
                        </TableCell>
                        <TableCell onClick={() => handleSort('posADP')} style={{ width: '5%' }}>
                            Position ADP {renderSortArrow('posADP')}
                        </TableCell>
                        <TableCell onClick={() => handleSort('overallADP')} style={{ width: '5%' }}>
                            ADP {renderSortArrow('overallADP')}
                        </TableCell>
                        <TableCell onClick={() => handleSort('fantasyPoints')} style={{ width: '5%' }}>
                            Fantasy Points {renderSortArrow('fantasyPoints')}
                        </TableCell>
                        <TableCell onClick={() => handleSort('carries')} style={{ width: '5%' }}>
                            Carries {renderSortArrow('carries')}
                        </TableCell>
                        <TableCell onClick={() => handleSort('rushYds')} style={{ width: '5%' }}>
                            Rush Yards {renderSortArrow('rushYds')}
                        </TableCell>
                        <TableCell onClick={() => handleSort('rushTD')} style={{ width: '5%' }}>
                            Rush TD {renderSortArrow('rushTD')}
                        </TableCell>
                        <TableCell onClick={() => handleSort('passAttempts')} style={{ width: '5%' }}>
                            Pass Atts {renderSortArrow('passAttempts')}
                        </TableCell>
                        <TableCell onClick={() => handleSort('passCompletions')} style={{ width: '5%' }}>
                            Pass Comp {renderSortArrow('passCompletions')}
                        </TableCell>
                        <TableCell onClick={() => handleSort('passYds')} style={{ width: '5%' }}>
                            Pass Yards {renderSortArrow('passYds')}
                        </TableCell>
                        <TableCell onClick={() => handleSort('passTD')} style={{ width: '5%' }}>
                            Pass TD {renderSortArrow('passTD')}
                        </TableCell>
                        
                        <TableCell onClick={() => handleSort('passInterceptions')} style={{ width: '5%' }}>
                            Int {renderSortArrow('passInterceptions')}
                        </TableCell>
                        <TableCell onClick={() => handleSort('receptions')} style={{ width: '5%' }}>
                            Recs {renderSortArrow('receptions')}
                        </TableCell>
                        <TableCell onClick={() => handleSort('targets')} style={{ width: '5%' }}>
                            Targets {renderSortArrow('targets')}
                        </TableCell>
                        <TableCell onClick={() => handleSort('recYds')} style={{ width: '5%' }}>
                            Rec Yards {renderSortArrow('recYds')}
                        </TableCell>
                        <TableCell onClick={() => handleSort('receivingTD')} style={{ width: '5%' }}>
                            Rec TD {renderSortArrow('receivingTD')}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{ display: 'block', maxHeight: '400px', overflow: 'auto' }}>
                    {filteredPlayers.length > 0 ? (
                        filteredPlayers.map((player, index) => (
                            <TableRow key={player.playerID || index} style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
                                <TableCell style={{ width: '14%' }}>{player.longName}</TableCell>
                                <TableCell style={{ width: '5%' }}>{player.posADP}</TableCell>
                                <TableCell style={{ width: '5%' }}>{player.overallADP}</TableCell>
                                <TableCell style={{ width: '5%' }}>{player.fantasyPointsDefault?.[selectedAdpType]}</TableCell>
                                <TableCell style={{ width: '5%' }}>{player.Rushing?.carries ?? 'N/A'}</TableCell>
                                <TableCell style={{ width: '5%' }}>{player.Rushing?.rushYds ?? 'N/A'}</TableCell>
                                <TableCell style={{ width: '5%' }}>{player.Rushing?.rushTD ?? 'N/A'}</TableCell>
                                <TableCell style={{ width: '5%' }}>{player.Passing?.passAttempts ?? 'N/A'}</TableCell>
                                <TableCell style={{ width: '5%' }}>{player.Passing?.passCompletions ?? 'N/A'}</TableCell>
                                <TableCell style={{ width: '5%' }}>{player.Passing?.passYds ?? 'N/A'}</TableCell>
                                <TableCell style={{ width: '5%' }}>{player.Passing?.passTD ?? 'N/A'}</TableCell>
                                <TableCell style={{ width: '5%' }}>{player.Passing?.int ?? 'N/A'}</TableCell>
                                <TableCell style={{ width: '5%' }}>{player.Receiving?.receptions ?? 'N/A'}</TableCell>
                                <TableCell style={{ width: '5%' }}>{player.Receiving?.targets ?? 'N/A'}</TableCell>
                                <TableCell style={{ width: '5%' }}>{player.Receiving?.recYds ?? 'N/A'}</TableCell>
                                <TableCell style={{ width: '5%' }}>{player.Receiving?.recTD ?? 'N/A'}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8}>No players found</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    );
};

export default DraftInfo;