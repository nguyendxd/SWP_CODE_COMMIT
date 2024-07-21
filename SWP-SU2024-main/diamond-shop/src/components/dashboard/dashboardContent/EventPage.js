import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    AppBar,
    Tabs,
    Tab,
    IconButton,
    TextField
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import StaffNav from '../../staffsite/StaffNav';
import DashboardNav from './DashboardNav';
import { useAuth } from '../../authcontext';
import './EventPage.css';

// Event Form Component
const EventForm = ({ item, setItem }) => (
    <DialogContent>
        <TextField
            margin="dense"
            label="Event Name"
            type="text"
            fullWidth
            value={item?.eventName || ''}
            onChange={(e) => setItem({ ...item, eventName: e.target.value })}
        />
        <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={item?.date || ''}
            onChange={(e) => setItem({ ...item, date: e.target.value })}
        />
        <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={item?.description || ''}
            onChange={(e) => setItem({ ...item, description: e.target.value })}
        />
    </DialogContent>
);

// Event Item Form Component
const EventItemForm = ({ item, setItem }) => (
    <DialogContent>
        <TextField
            margin="dense"
            label="Event Id"
            type="number"
            fullWidth
            value={item?.eventId || ''}
            onChange={(e) => setItem({ ...item, eventId: e.target.value })}
        />
        <TextField
            margin="dense"
            label="Product Id"
            type="number"
            fullWidth
            value={item?.productId || ''}
            onChange={(e) => setItem({ ...item, productId: e.target.value })}
        />
        <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={item?.date || ''}
            onChange={(e) => setItem({ ...item, date: e.target.value })}
        />
        <TextField
            margin="dense"
            label="Discount"
            type="number"
            fullWidth
            value={item?.discount || ''}
            onChange={(e) => setItem({ ...item, discount: e.target.value })}
        />
    </DialogContent>
);

const EventPage = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [newItem, setNewItem] = useState({});
    const [events, setEvents] = useState([]);
    const [eventItems, setEventItems] = useState([]);
    const { user } = useAuth();

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleAddOpen = () => {
        setNewItem({});
        setAddOpen(true);
    };

    const handleEditOpen = (item) => {
        setEditingItem(item);
        setEditOpen(true);
    };

    const handleAddClose = () => {
        setNewItem({});
        setAddOpen(false);
    };

    const handleEditClose = () => {
        setEditingItem(null);
        setEditOpen(false);
    };

    const fetchEvents = async () => {
        try {
            const response = await fetch('https://localhost:7251/api/events');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.log('Error fetching events', error);
        }
    };

    const fetchEventItems = async () => {
        try {
            const response = await fetch('https://localhost:7251/api/EventItems');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setEventItems(data);
        } catch (error) {
            console.log('Error fetching event items', error);
        }
    };

    useEffect(() => {
        fetchEvents();
        fetchEventItems();
    }, []);

    const handleAddSave = async () => {
        try {
            const url = tabIndex === 0 ? 'https://localhost:7251/api/events' : 'https://localhost:7251/api/EventItems';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            tabIndex === 0 ? fetchEvents() : fetchEventItems();
            handleAddClose();
        } catch (error) {
            console.log('Error saving item', error);
        }
    };

    const handleEditSave = async () => {
        if (!editingItem || (tabIndex === 0 && editingItem.eventID === undefined) || (tabIndex === 1 && editingItem.eventItemID === undefined)) {
            console.error('Invalid editing item:', editingItem);
            return;
        }

        try {
            const url = tabIndex === 0
                ? `https://localhost:7251/api/events/${editingItem.eventID}`
                : `https://localhost:7251/api/EventItems/${editingItem.eventItemID}`;
            console.log('Edit URL:', url);
            console.log('Editing Item:', editingItem);

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editingItem)
            });
            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Error Response:', errorResponse);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            tabIndex === 0 ? fetchEvents() : fetchEventItems();
            handleEditClose();
        } catch (error) {
            console.log('Error saving item', error);
        }
    };

    const handleDelete = async (id) => {
        if (id === undefined || id === null) {
            console.error('Invalid id:', id);
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) {
            return;
        }

        try {
            const url = tabIndex === 0 ? `https://localhost:7251/api/EventItems/${id}` : `https://localhost:7251/api/EventItems/${id}`;
            const response = await fetch(url, {
                method: 'DELETE'
            });
            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Error Response:', errorResponse);
                throw new Error(`Failed to delete ${tabIndex === 0 ? 'event' : 'event item'} with id ${id}`);
            }
            tabIndex === 0 ? fetchEvents() : fetchEventItems();
        } catch (error) {
            console.log('Error deleting item', error);
        }
    };

    return (
        <div className="event-page">
            <div>
                {user && user.roleId === 3 ? (
                    <StaffNav />
                ) : (
                    <DashboardNav />
                )}
            </div>

            <AppBar position="static">
                <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
                    <Tab label="Events" />
                    <Tab label="Event Items" />
                </Tabs>
            </AppBar>

            {tabIndex === 0 && (
                <TableContainer component={Paper} className="table-container">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Event ID</TableCell>
                                <TableCell align="center">Event Name</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.eventID}>
                                    <TableCell align="center">{event.eventID}</TableCell>
                                    <TableCell align="center">{event.eventName}</TableCell>
                                    <TableCell align="center">{event.date}</TableCell>
                                    <TableCell align="center">{event.description}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleEditOpen(event)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(event.eventID)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {tabIndex === 1 && (
                <TableContainer component={Paper} className="table-container">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Event Item ID</TableCell>
                                <TableCell align="center">Event ID</TableCell>
                                <TableCell align="center">Product ID</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Discount</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {eventItems.map((eventItem) => (
                                <TableRow key={eventItem.eventItemID}>
                                    <TableCell align="center">{eventItem.eventItemID}</TableCell>
                                    <TableCell align="center">{eventItem.eventID}</TableCell>
                                    <TableCell align="center">{eventItem.productID}</TableCell>
                                    <TableCell align="center">{eventItem.date}</TableCell>
                                    <TableCell align="center">{eventItem.discount}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleEditOpen(eventItem)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(eventItem.eventItemID)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <div className="add-event-button">
                <Button variant="contained" color="primary" onClick={handleAddOpen}>
                    Add {tabIndex === 0 ? 'Event' : 'Event Item'}
                </Button>
            </div>

            {/* Add Dialog */}
            <Dialog open={addOpen} onClose={handleAddClose}>
                <DialogTitle>Add {tabIndex === 0 ? 'Event' : 'Event Item'}</DialogTitle>
                {tabIndex === 0 ? (
                    <EventForm item={newItem} setItem={setNewItem} />
                ) : (
                    <EventItemForm item={newItem} setItem={setNewItem} />
                )}
                <DialogActions>
                    <Button onClick={handleAddClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={editOpen} onClose={handleEditClose}>
                <DialogTitle>Edit {tabIndex === 0 ? 'Event' : 'Event Item'}</DialogTitle>
                {tabIndex === 0 ? (
                    <EventForm item={editingItem} setItem={setEditingItem} />
                ) : (
                    <EventItemForm item={editingItem} setItem={setEditingItem} />
                )}
                <DialogActions>
                    <Button onClick={handleEditClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EventPage;
