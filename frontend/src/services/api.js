import axios from 'axios';

// Create an axios instance with a base URL.
// Vite proxies /api to http://localhost:3000 (backend) during development.
const apiClient = axios.create({
  baseURL: '/api', // All requests will be prefixed with /api
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetches a list of all available causes.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of cause objects.
 */
export const fetchCauses = async () => {
  try {
    const response = await apiClient.get('/causes');
    return response.data;
  } catch (error) {
    console.error('Error fetching causes:', error.response ? error.response.data : error.message);
    // In a real app, you might throw the error or return a specific error structure
    throw error; 
  }
};

/**
 * Fetches details for a specific cause by its ID.
 * @param {string|number} causeId The ID of the cause to fetch.
 * @returns {Promise<Object>} A promise that resolves to the cause object.
 */
export const fetchCauseById = async (causeId) => {
  try {
    const response = await apiClient.get(`/causes/${causeId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cause ${causeId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

/**
 * Submits a donation to the backend.
 * @param {Object} donationData The donation details (e.g., causeId, amount, donorInfo).
 * @returns {Promise<Object>} A promise that resolves to the server's response (e.g., confirmation).
 */
export const submitDonation = async (donationData) => {
  try {
    const response = await apiClient.post('/donations', donationData);
    return response.data;
  } catch (error) {
    console.error('Error submitting donation:', error.response ? error.response.data : error.message);
    throw error;
  }
};

/**
 * Submits a contact form message to the backend.
 * @param {Object} contactData The contact message details (e.g., name, email, message).
 * @returns {Promise<Object>} A promise that resolves to the server's response.
 */
export const submitContactForm = async (contactData) => {
  try {
    const response = await apiClient.post('/contact', contactData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default apiClient;
