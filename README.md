# Job Application Tracker — Web App

A Next.js web application for tracking job applications. Also serves as the API backend for the [companion mobile app](https://github.com/KwabenaSark/zeepay-task2.git).

**Live:** [https://boisterous-sunshine-346924.netlify.app](https://boisterous-sunshine-346924.netlify.app)

- Nelify only allows users to **read data**, run locally for CRUD functionality 

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (React) |
| API | Next.js API Routes — `/api/items` |
| HTTP Client | Axios |
| Data Store | `data.json` |

---

## Project Structure

```
/
├── pages/          # All page components (Next.js file-based routing)
├── api/            # API route handlers (GET, POST, DELETE /api/items)
├── data.json       # Flat-file data store
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API

The web app exposes a simple REST API consumed by both the web UI and the mobile app.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/items` | Fetch all applications |
| `POST` | `/api/items` | Add a new application |
| `DELETE` | `/api/items` | Delete an application by id |

---

## Notes

- Data is persisted in `data.json`. This works locally but **will not persist on Netlify** since serverless functions run in a *read-only filesystem*. For production persistence, swap `data.json` for a database (Supabase, MongoDB Atlas, or Upstash Redis).
- The mobile app points to this server via `EXPO_PUBLIC_API_REMOTE_URL` — make sure this app is running before starting the mobile client.