import React, { useState, useEffect } from 'react';
import { fetchPoints } from '../components/pointsService';
import { Button, Typography, TextField } from '@mui/material';

const PointsDisplay = ({ customerId, onPointsApplied }) => {
    const [points, setPoints] = useState(0);
    const [pointsToApply, setPointsToApply] = useState(0); // State to store the points to be applied
    const [remainingPoints, setRemainingPoints] = useState(0); // State to track remaining points after applying

    useEffect(() => {
        const loadPoints = async () => {
            try {
                const data = await fetchPoints(customerId);
                setPoints(data.points);
                setRemainingPoints(data.points);
            } catch (error) {
                console.error('Error fetching points:', error);
                alert('Failed to fetch points. Please check the console for more details.');
            }
        };

        loadPoints();
    }, [customerId]);

    const handleApplyPoints = () => {
        if (pointsToApply > remainingPoints) {
            alert('You cannot apply more points than you have.');
            return;
        }

        const newRemainingPoints = remainingPoints - pointsToApply;
        setRemainingPoints(newRemainingPoints);
        onPointsApplied(pointsToApply);
        alert(`Applied ${pointsToApply} points. Remaining points: ${newRemainingPoints}`);
    };

    const handleApplyAllPoints = () => {
        setPointsToApply(remainingPoints);
    };

    const handleResetPoints = () => {
        setPointsToApply(0);
        setRemainingPoints(points);
        onPointsApplied(0); // Reset the applied points to 0
    };

    return (
        <div className="points-display">
            <Typography variant="h6">Your Points: {remainingPoints}</Typography>
            <TextField
                label="Points to Apply"
                type="number"
                value={pointsToApply}
                onChange={(e) => setPointsToApply(parseInt(e.target.value) || 0)}
                InputProps={{ inputProps: { min: 0, max: remainingPoints } }}
                style={{ marginTop: '10px' }}
            />
            <Button onClick={handleApplyPoints} variant="contained" style={{ marginTop: '10px' }}>
                Apply Points
            </Button>
            <Button onClick={handleApplyAllPoints} variant="outlined" style={{ marginTop: '10px', marginLeft: '10px' }}>
                Apply All Points
            </Button>
            <Button onClick={handleResetPoints} variant="text" style={{ marginTop: '10px', marginLeft: '10px' }}>
                Reset
            </Button>
        </div>
    );
};

export default PointsDisplay;
