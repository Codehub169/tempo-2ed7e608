#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.

echo "==> HopeHarbor Donation Platform Setup & Launch Script <=="

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Navigate to the project root directory (where this script is located)
cd "$SCRIPT_DIR"

echo "
>>> [1/4] Installing backend dependencies..."
if [ -d "backend" ]; then
  cd backend
  npm install
  cd ..
  echo "✅ Backend dependencies installed."
else
  echo "❌ Error: 'backend' directory not found. Please ensure backend setup is complete."
  exit 1
fi

echo "
>>> [2/4] Installing frontend dependencies..."
if [ -d "frontend" ]; then
  cd frontend
  npm install
  cd ..
  echo "✅ Frontend dependencies installed."
else
  echo "❌ Error: 'frontend' directory not found. Please ensure frontend setup is complete."
  exit 1
fi

echo "
>>> [3/4] Building frontend application..."
if [ -d "frontend" ]; then
  cd frontend
  npm run build # This will create the dist folder
  cd ..
  echo "✅ Frontend application built successfully. Output in frontend/dist/"
else
  echo "❌ Error: 'frontend' directory not found. Cannot build frontend."
  exit 1
fi

# The backend server (server.js) must be configured to:
# 1. Serve static files from '../frontend/dist'
# 2. Listen on the port specified by the PORT environment variable, defaulting to 9000.
# 3. Handle API routes.
# 4. Include a catch-all route to serve 'index.html' for client-side routing.
echo "
>>> [4/4] Starting application..."
echo "Frontend will be served by the backend on http://localhost:9000"
if [ -f "backend/server.js" ]; then
  cd backend
  # The backend's package.json start script should be 'node server.js'
  # Ensure PORT is set for the backend server; defaults to 9000 if not set in server.js
  npm start
else
  echo "❌ Error: 'backend/server.js' not found. Cannot start application."
  exit 1
fi

echo "
==> Application startup process initiated. <=="
