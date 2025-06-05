import express from 'express';
import {
  getAllCauses,
  getCauseById,
  addDonation,
  addContactMessage
} from './db.js';

const router = express.Router();

// Get all causes
router.get('/causes', async (req, res) => {
  try {
    const causes = await getAllCauses();
    res.json(causes);
  } catch (err) {
    console.error('Error fetching causes:', err);
    res.status(500).json({ error: 'Failed to fetch causes' });
  }
});

// Get a single cause by ID
router.get('/causes/:id', async (req, res) => {
  const idParam = req.params.id;
  const id = parseInt(idParam, 10);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid cause ID format. ID must be a positive number.' });
  }

  try {
    const cause = await getCauseById(id);
    if (cause) {
      res.json(cause);
    } else {
      res.status(404).json({ error: 'Cause not found' });
    }
  } catch (err) {
    console.error(`Error fetching cause ${idParam}:`, err);
    res.status(500).json({ error: 'Failed to fetch cause' });
  }
});

// Submit a donation
router.post('/donations', async (req, res) => {
  const { causeId, donorName, donorEmail, amount } = req.body;

  // Validate required fields for donor information
  if (!donorName || !donorEmail) {
    return res.status(400).json({ error: 'Invalid donation data. Required fields: donorName, donorEmail.' });
  }
  
  // Validate amount
  if (amount === undefined || amount === null || amount === '') {
     return res.status(400).json({ error: 'Invalid donation data. Required field: amount.' });
  }
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ error: 'Donation amount must be a positive number.' });
  }

  let validCauseId = null;
  // Check if causeId is meaningfully provided (not undefined, null, or empty string)
  if (causeId !== undefined && causeId !== null && causeId !== '') {
    const parsedId = parseInt(causeId, 10);
    if (isNaN(parsedId) || parsedId <= 0) {
      return res.status(400).json({ error: 'Invalid causeId. Must be a positive number if provided.' });
    }
    validCauseId = parsedId;
  }

  try {
    // If causeId is provided (i.e., validCauseId is not null), check if it exists
    if (validCauseId !== null) {
      const cause = await getCauseById(validCauseId);
      if (!cause) {
        return res.status(404).json({ error: `Cause with ID ${validCauseId} not found.` });
      }
    }

    const result = await addDonation({ 
      causeId: validCauseId, 
      donorName,
      donorEmail,
      amount: numericAmount 
    });
    res.status(201).json({ message: 'Donation successful', donationId: result.id });
  } catch (err) {
    console.error('Error submitting donation:', err);
    res.status(500).json({ error: 'Failed to submit donation' });
  }
});

// Submit a contact message
router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Invalid contact data. Required fields: name, email, message.' });
  }

  // Basic email validation regex - Corrected: removed extra backslash before dot.
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  try {
    const result = await addContactMessage({ name, email, subject: subject || '', message });
    res.status(201).json({ message: 'Contact message received', contactId: result.id });
  } catch (err) {
    console.error('Error submitting contact message:', err);
    res.status(500).json({ error: 'Failed to submit contact message' });
  }
});

export default router;
