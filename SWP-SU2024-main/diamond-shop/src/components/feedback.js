import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { Box, Typography, Avatar, TextField, Button, Rating } from '@mui/material';
import { styled } from '@mui/system';
import { useAuth } from './authcontext';

const CommentBox = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '16px',
});

const CommentContent = styled(Box)({
  marginLeft: '8px',
  background: '#f5f5f5',
  borderRadius: '8px',
  padding: '8px',
  width: '100%',
});

const FeedbackComponent = ({ productId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [customerId, setCustomerId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`https://localhost:7251/api/Feedback/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched feedbacks:', data);
        setFeedbacks(data);
        setFeedbackCount(data.length);
        if (data.length > 0) {
          const totalRating = data.reduce((sum, feedback) => sum + feedback.rating, 0);
          setAverageRating(totalRating / data.length);
        } else {
          setAverageRating(0);
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedbacks();
  }, [productId]);

  useEffect(() => {
    const fetchCustomerDetails = async (userId) => {
      try {
        const response = await fetch(`https://localhost:7251/api/Customers/User/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCustomerId(data.customerId);
        setUserName(data.name); // Assuming your backend returns userName
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    if (user && user.token) {
      const decodedToken = jwtDecode(user.token);
      console.log('Decoded token:', decodedToken);
      const userId = decodedToken.unique_name; // Adjust based on the token structure
      fetchCustomerDetails(userId);
    }
  }, [user]);

  const handleFeedbackSubmit = async () => {
    const currentDate = new Date();
    const payload = {
      productId: parseInt(productId, 10),
      customerId,
      feedbackText: newFeedback,
      rating: newRating,
      feedbackDate: currentDate.toISOString().split('T')[0], // Only send the date part
      userName,
    };

    console.log('Submitting feedback with payload:', payload);

    try {
      const response = await fetch('https://localhost:7251/api/Feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        throw new Error(`Failed to submit feedback: ${errorData.title}`);
      }

      const addedFeedback = await response.json();
      setFeedbacks((prevFeedbacks) => {
        const updatedFeedbacks = [...prevFeedbacks, addedFeedback];
        setFeedbackCount(updatedFeedbacks.length);
        const totalRating = updatedFeedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
        setAverageRating(totalRating / updatedFeedbacks.length);
        return updatedFeedbacks;
      });
      setNewFeedback('');
      setNewRating(0);
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Feedback from customer about:
      </Typography>
      <Box display="flex" alignItems="center">
        <Typography style={{ paddingRight: '1%' }} variant="h4" color="#1a237e">
          {averageRating.toFixed(1)} / 5.0
        </Typography>
        <Rating value={averageRating} readOnly />
        <Typography style={{ paddingLeft: '3px' }} variant="body1">({feedbackCount} người đánh giá)</Typography>
      </Box>

      <Box mt={2}>
        {feedbacks.map((feedback) => (
          <CommentBox key={feedback.id}>
            <Avatar>{feedback.userName ? feedback.userName.charAt(0) : '?'}</Avatar>
            <CommentContent>
              <Typography variant="subtitle2">{feedback.userName || 'Unknown'}</Typography>
              <Typography variant="caption" color="textSecondary">{new Date(feedback.feedbackDate).toLocaleString()}</Typography>
              <Rating value={feedback.rating} readOnly size="small" />
              <Typography variant="body2">{feedback.feedbackText}</Typography>
            </CommentContent>
          </CommentBox>
        ))}
      </Box>

      <Box mt={2}>
        <TextField
          label="Nhận xét về sản phẩm"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
        />
        <Box mt={2}>
          <Rating
            name="simple-controlled"
            value={newRating}
            onChange={(e, newValue) => setNewRating(newValue)}
          />
          <Button variant="contained" color="primary" onClick={handleFeedbackSubmit} style={{ marginLeft: '16px' }}>
            Gửi
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FeedbackComponent;
