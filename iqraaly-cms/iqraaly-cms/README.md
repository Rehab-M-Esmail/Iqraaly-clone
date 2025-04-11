# Iqraaly CMS Module

This is the backend CMS module for the Iqraaly application. It handles podcast content management.

## Features
- Manage podcasts and episodes
- PostgreSQL database integration
- Basic RESTful APIs

## Setup Instructions

1. Clone the repository.

2. Install dependencies:
```bash
npm install
```

3. Create a PostgreSQL database called `iqraaly_db`.

4. Run the schema script:
```bash
psql -U postgres -d iqraaly_db -f schema.sql
```

5. Configure the environment:
Rename `.env.example` to `.env` and provide your PostgreSQL credentials.

6. Start the server:
```bash
npm start
```

The server will be running on `http://localhost:3000`.
