import API_BASE_URL from '../config/api';

/**
 * Volunteer Service
 * Handles all volunteer-related API calls
 */

class VolunteerService {
    /**
     * Get volunteer profile
     * @returns {Promise<Object>} Volunteer profile data
     */
    async getProfile() {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_BASE_URL}/volunteers/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch profile');
        }

        return data;
    }

    /**
     * Update volunteer profile
     * @param {Object} updates - Fields to update
     * @returns {Promise<Object>} Updated volunteer profile
     */
    async updateProfile(updates) {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_BASE_URL}/volunteers/profile`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update profile');
        }

        return data;
    }

    /**
     * Get incoming requests (available for volunteers to accept)
     * @returns {Promise<Array>} List of pending requests
     */
    async getIncomingRequests() {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_BASE_URL}/volunteers/incoming`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch incoming requests');
        }

        return data;
    }

    /**
     * Accept a scribe request
     * @param {string} requestId - ID of the request to accept
     * @returns {Promise<Object>} Updated request
     */
    async acceptRequest(requestId) {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_BASE_URL}/volunteers/accept/${requestId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to accept request');
        }

        return data;
    }

    /**
     * Get active assignments
     * @returns {Promise<Array>} List of accepted/in-progress assignments
     */
    async getActiveAssignments() {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_BASE_URL}/volunteers/active`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch active assignments');
        }

        return data;
    }

    /**
     * Get assignment history
     * @returns {Promise<Array>} List of completed assignments
     */
    async getHistory() {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_BASE_URL}/volunteers/history`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch history');
        }

        return data;
    }
}

export default new VolunteerService();
