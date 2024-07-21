import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Rating, TextField, Button } from '@mui/material';
import DashboardNav from './DashboardNav';

const FeedbackPage = () => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [filteredFeedbackData, setFilteredFeedbackData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productId, setProductId] = useState('');

    useEffect(() => {
        const fetchAllFeedback = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://localhost:7251/api/Feedback`);
                if (response.ok) {
                    const data = await response.json();
                    setFeedbackData(data);
                    setFilteredFeedbackData(data);
                } else {
                    console.error("Failed to fetch feedback data");
                }
            } catch (error) {
                console.error("Error fetching feedback data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllFeedback();
    }, []);

    const handleFetchFeedback = () => {
        if (productId) {
            const filteredData = feedbackData.filter(feedback => feedback.productId === parseInt(productId));
            setFilteredFeedbackData(filteredData);
        } else {
            setFilteredFeedbackData(feedbackData);
        }
    };

    return (
        <div>
            <DashboardNav />
            <Container className='container'>
                <TextField
                    label="Product ID"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    type="number"
                    margin="normal"
                />
                <Button className='feedback-button' variant="contained" color="primary" onClick={handleFetchFeedback}>
                    Fetch Feedback
                </Button>

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">FeedbackID</TableCell>
                                    <TableCell align="center">ProductId</TableCell>
                                    <TableCell align="center">UserName</TableCell>
                                    <TableCell align="center">Comment</TableCell>
                                    <TableCell align="center">Rating</TableCell>
                                    <TableCell align="center">FeedbackDate</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredFeedbackData.map((row) => (
                                    <TableRow key={row.feedbackId}>
                                        <TableCell align="center">{row.feedbackId}</TableCell>
                                        <TableCell align="center">{row.productId}</TableCell>
                                        <TableCell align="center">{row.userName}</TableCell>
                                        <TableCell align="center">{row.feedbackText}</TableCell>
                                        <TableCell align="center">
                                            <Rating name="read-only" value={row.rating} readOnly />
                                        </TableCell>
                                        <TableCell align="center">{new Date(row.feedbackDate).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>
        </div>
    );
};

export default FeedbackPage;
