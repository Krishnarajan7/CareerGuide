# Backend Setup Instructions

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn

## Setup Steps

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Data Setup**
   - The API loads colleges from the CSV at `backend/data/colleges.csv` on startup.
   - No database is required.

3. **Start the API**
   ```bash
   npm run dev
   # or
   npm start
   ```

4. **Start the Server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

- `GET /` - Health check
- `GET /api/colleges` - Get all colleges with optional filters
- `GET /api/colleges/search` - Search colleges
- `GET /api/colleges/:id` - Get college by ID

## Notes
- On startup, the server logs how many records were loaded from the CSV.
- Endpoints filter in-memory data; updates to the CSV require a server restart.
