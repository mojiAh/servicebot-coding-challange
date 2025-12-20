# ServiceBot Coding Challenge

This project is a full-stack application built as part of a coding challenge.

It demonstrates clean backend architecture, API design, and a simple, intuitive frontend for exploring relationships between Bots, Workers, and Logs.

## Overview

The application allows users to:

- View the list of bots
- View the list of workers for a bot
- View the list of logs for a bot
- View the list of logs for a worker associated with a bot

## Tech Stack

### Backend

- Node.js
- Express
- TypeScript
- Data source: local JSON files (provided in the challenge)

### Frontend

- React
- TypeScript
- Fetch API
- CSS (no UI framework)

## Project Structure

```
├── backend
│ ├── data          # Provided JSON datasets
│ ├── models        # (Bot, Worker, Log)
│ ├── repositories  # Repository interfaces + JSON implementations
│ ├── usecases      # Application use cases (read operations)
│ ├── http
│ │ ├── routes      # Express routers
│ │ ├── app.ts
│ │ └── server.ts
│ └── package.json
│
├── frontend
│ ├── src
│ │ ├── components    # UI components
│ │ ├── types         # Shared frontend types
│ │ ├── hooks         # custom hooks
│ │ ├── api
│ │ ├── App.tsx
│ │ └── main.tsx
│ └── package.json
│
└── README.md
```

## Backend Design Notes

- Repository pattern is used to abstract data access.
- JSON-backed repositories implement repository interfaces.
- Use cases encapsulate application logic and are intentionally kept thin.
- Express routes are implemented as router factories with dependency injection.
- API is read-only as per challenge requirements.
- Invalid identifiers currently return empty arrays.

### API Endpoints

```
GET /bots
GET /bots/:botId/workers
GET /bots/:botId/logs
GET /bots/:botId/workers/:workerId/logs
```

---

## Frontend UX & Design

- Single-page dashboard layout with three side-by-side panels:
  - Bots
  - Workers
  - Logs
- No routing — interaction is driven by selection state.
- Clear visual hierarchy:
  - Bot selection affects Workers and Logs
  - Worker selection filters Logs only
- Tables use fixed layouts with truncation and custom tooltips for long values.
- Designed as an admin/monitoring interface, prioritizing clarity over navigation.
- Data fetching logic is encapsulated in reusable hooks (`useBots`, `useWorkers`, `useLogs`) with a simple in-memory cache to avoid unnecessary refetching.

---

## Running the Project

### Backend

```bash
cd backend
npm install
npm run dev

# The backend runs on:

# http://localhost:3000
```

## Frontend

```bash
cd frontend
npm install
npm run dev

# The frontend runs on:

# http://localhost:5173
```

## Trade-offs & Known Limitations

Given the scope and time constraints of this challenge, a few known trade-offs were made. These are noted here to make design intent explicit.

### API Validation & Error Handling

- The API currently returns empty arrays for some invalid identifiers (e.g. non-existent `botId` or `workerId`).
- In a production system, these cases would return proper HTTP errors (e.g. `404 Not Found`) to clearly distinguish between:
  - “resource exists but has no related data”
  - “resource does not exist”
- This behavior was kept intentionally simple for the challenge and is documented in the use cases.

### Pagination & Large Datasets

- Log endpoints currently return all matching logs at once.
- For large datasets, pagination or cursor-based APIs would be introduced (e.g. `limit`, `offset`, or time-based cursors).
- Sorting (e.g. by creation date) would also be made explicit and configurable.

### Frontend Data Fetching

- Data fetching is centralized via a small `fetchJson` helper to avoid duplication and keep error handling consistent.
- Reusable custom hooks (`useBots`, `useWorkers`, `useLogs`) encapsulate loading, error, and data-fetching logic.
- A simple in-memory cache (based on `Map`) is used to avoid unnecessary refetching during a session.
- Cache invalidation, persistence, and background refresh strategies were intentionally omitted to keep the implementation lightweight and dependency-free.

### Environment Configuration

- API URLs are currently hard-coded for local development.
- In a production setup, environment variables (e.g. `VITE_API_URL`) would be used for configuration.

### Persistence Layer

- Data is loaded from static JSON files and kept in memory.
- Repository interfaces were introduced to allow replacing JSON-backed implementations with database-backed ones without changing application logic.
