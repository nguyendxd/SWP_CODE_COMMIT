import React from 'react';
import { TextField, DialogContent } from '@mui/material';

const EventForm = ({ editingItem, setEditingItem }) => (
    <DialogContent>
        <TextField
            margin="dense"
            label="Event Name"
            type="text"
            fullWidth
            value={editingItem?.eventName || ''}
            onChange={(e) => setEditingItem({ ...editingItem, eventName: e.target.value })}
        />
        <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={editingItem?.date || ''}
            onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
        />
        <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={editingItem?.description || ''}
            onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
        />
    </DialogContent>
);

export default EventForm;
