import React from 'react';
import { TextField, DialogContent } from '@mui/material';

const EventItemForm = ({ editingItem, setEditingItem }) => (
    <DialogContent>
        <TextField
            margin="dense"
            label="Event ID"
            type="text"
            fullWidth
            value={editingItem?.eventId || ''}
            onChange={(e) => setEditingItem({ ...editingItem, eventId: e.target.value })}
        />
        <TextField
            margin="dense"
            label="Product ID"
            type="text"
            fullWidth
            value={editingItem?.productId || ''}
            onChange={(e) => setEditingItem({ ...editingItem, productId: e.target.value })}
        />
        <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={editingItem?.date || ''}
            onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
        />
    </DialogContent>
);

export default EventItemForm;
