const API_URL = 'https://localhost:7251/api/CustomerPoints';

// Fetch points for a specific customer
export const fetchPoints = async (customerId) => {
    try {
        const response = await fetch(`${API_URL}/${customerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch points. Status: ${response.status}, StatusText: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in fetchPoints:', error);
        throw error;
    }
};

// Add points to a specific customer
export const addPoints = async (customerId, points) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ CustomerId: customerId, Points: points })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to add points. Status: ${response.status}, StatusText: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in addPoints:', error);
        throw error;
    }
};

// Update points for a specific customer
export const updatePoints = async (customerId, points) => {
    try {
        const response = await fetch(`${API_URL}/${customerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ CustomerId: customerId, Points: points })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update points. Status: ${response.status}, StatusText: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in updatePoints:', error);
        throw error;
    }
};

// Delete points for a specific customer
export const deletePoints = async (customerId) => {
    try {
        const response = await fetch(`${API_URL}/${customerId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to delete points. Status: ${response.status}, StatusText: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in deletePoints:', error);
        throw error;
    }
};
