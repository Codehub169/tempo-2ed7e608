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
  try {
    const cause = await getCauseById(req.params.id);
    if (cause) {
      res.json(cause);
    } else {
      res.status(404).json({ error: 'Cause not found' });
    }
  } catch (err) {
    console.error(`Error fetching cause ${req.params.id}:`, err);
    res.status(500).json({ error: 'Failed to fetch cause' });
  }
});

// Submit a donation
router.post('/donations', async (req, res) => {
  const { causeId, donorName, donorEmail, amount } = req.body;
  if (!donorName || !donorEmail || !amount || (causeId && isNaN(parseInt(causeId, 10))) || isNaN(parseFloat(amount))) {
    return res.status(400).json({ error: 'Invalid donation data. Required fields: donorName, donorEmail, amount. causeId must be a number if provided.' });
  }
  if (parseFloat(amount) <= 0) {
    return res.status(400).json({ error: 'Donation amount must be positive.' });
  }

  try {
    // Ensure causeId is null if not provided or invalid, rather than potentially 0 or NaN
    const validCauseId = causeId ? parseInt(causeId, 10) : null;

    // If causeId is provided, check if it exists
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
      amount: parseFloat(amount) 
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

  // Basic email validation regex
  const emailRegex = /^[^
	]+@[^
	]+\.[^
	]+$/;
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
