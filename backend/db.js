import sqlite3 from 'sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_DIR = join(__dirname, 'database');
const DB_PATH = join(DB_DIR, 'donations.db');

let db;

function connectDb() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error('Error connecting to SQLite database:', err.message);
      throw err;
    }
    console.log('Connected to the SQLite database.');
  });
}

// Promisify database operations
function runAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) { // Use function keyword for this.lastID
      if (err) {
        console.error('Error running sql:', sql, params, err);
        reject(err);
      } else {
        resolve({ id: this.lastID, changes: this.changes });
      }
    });
  });
}

function getAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        console.error('Error running sql:', sql, params, err);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function allAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error('Error running sql:', sql, params, err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export async function initDb() {
  if (!db) connectDb();

  await runAsync(`
    CREATE TABLE IF NOT EXISTS causes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT,
      goalAmount REAL NOT NULL,
      raisedAmount REAL DEFAULT 0
    )
  `);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS donations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      causeId INTEGER,
      donorName TEXT NOT NULL,
      donorEmail TEXT NOT NULL,
      amount REAL NOT NULL,
      donationDate TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (causeId) REFERENCES causes(id)
    )
  `);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      submissionDate TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Seed sample causes if the table is empty
  const causes = await allAsync('SELECT * FROM causes');
  if (causes.length === 0) {
    const sampleCauses = [
      {
        title: 'Educate a Child',
        description: 'Provide access to quality education for underprivileged children, empowering them for a brighter future.',
        image: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1470&q=80',
        goalAmount: 10000,
        raisedAmount: 7500
      },
      {
        title: 'Protect Our Planet',
        description: 'Support initiatives focused on reforestation, wildlife conservation, and combating climate change.',
        image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1574&q=80',
        goalAmount: 20000,
        raisedAmount: 12000
      },
      {
        title: 'Clean Water for All',
        description: 'Help provide access to clean and safe drinking water for communities in need around the world.',
        image: 'https://images.unsplash.com/photo-1518398046578-8CCA57782e36?auto=format&fit=crop&w=1470&q=80',
        goalAmount: 5000,
        raisedAmount: 4500
      }
    ];
    for (const cause of sampleCauses) {
      await runAsync('INSERT INTO causes (title, description, image, goalAmount, raisedAmount) VALUES (?, ?, ?, ?, ?)', 
        [cause.title, cause.description, cause.image, cause.goalAmount, cause.raisedAmount]);
    }
    console.log('Sample causes seeded.');
  }
  console.log('Database tables checked/created.');
}

export async function getAllCauses() {
  if (!db) connectDb();
  return allAsync('SELECT * FROM causes');
}

export async function getCauseById(id) {
  if (!db) connectDb();
  return getAsync('SELECT * FROM causes WHERE id = ?', [id]);
}

export async function addDonation({ causeId, donorName, donorEmail, amount }) {
  if (!db) connectDb();
  // Use a transaction to ensure atomicity
  return new Promise((resolve, reject) => {
    db.serialize(async () => {
      try {
        await runAsync('BEGIN TRANSACTION');
        const result = await runAsync(
          'INSERT INTO donations (causeId, donorName, donorEmail, amount) VALUES (?, ?, ?, ?)',
          [causeId, donorName, donorEmail, amount]
        );
        if (causeId) { // Only update if causeId is provided (for general fund, it might be null)
          await runAsync(
            'UPDATE causes SET raisedAmount = raisedAmount + ? WHERE id = ?',
            [amount, causeId]
          );
        }
        await runAsync('COMMIT');
        resolve({ id: result.id });
      } catch (err) {
        await runAsync('ROLLBACK');
        console.error('Transaction failed:', err);
        reject(err);
      }
    });
  });
}

export async function addContactMessage({ name, email, subject, message }) {
  if (!db) connectDb();
  return runAsync(
    'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
    [name, email, subject, message]
  );
}

// Ensure DB connection on module load if needed, or on first call.
// connectDb(); // Optional: connect when module loads, or lazy connect on first operation.
