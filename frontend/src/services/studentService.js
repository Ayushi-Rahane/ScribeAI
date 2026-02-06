import API_BASE_URL from '../config/api';

/**
 * Student Service
 * Handles all student-related API calls
 */

class StudentService {
    /**
     * Get student profile
     * @returns {Promise<Object>} Student profile data
     */
    async getProfile() {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_BASE_URL}/students/profile`, {
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
     * Update student profile
     * @param {Object} updates - Fields to update
     * @returns {Promise<Object>} Updated student profile
     */
    async updateProfile(updates) {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_BASE_URL}/students/profile`, {
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
     * Get student's requests
     * @returns {Promise<Array>} List of student's requests
     */
    async getRequests() {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_BASE_URL}/students/requests`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch requests');
        }

        return data;
    }

    /**
     * Get student's request history
     * @returns {Promise<Array>} List of completed/cancelled requests
     */
    async getHistory() {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_BASE_URL}/students/history`, {
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

export default new StudentService();
