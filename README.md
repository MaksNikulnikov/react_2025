# Restaurant Explorer

Restaurant Explorer is a portfolio React application for browsing restaurants, opening menu and dish pages, reading reviews, and interacting with a demo cart. The project is built as a small SPA with client-side routing, RTK Query data loading, and a local mock API.

## Stack

- React 19
- Vite
- React Router
- Redux Toolkit
- RTK Query
- CSS Modules
- Express mock API

## Features

- restaurant list page
- nested routes for menu and reviews
- separate dish page
- demo cart with quantity controls
- review creation and update flow
- loading skeletons for key screens
- theme toggle and basic modal flow

## Project Structure

- `src/` contains the client application
- `simple_api/` contains the local Express API with mock data
- `public/` contains static assets such as the favicon

## Getting Started

### 1. Install dependencies

Install frontend dependencies in the project root:

```bash
npm install
```

Install API dependencies in `simple_api`:

```bash
cd simple_api
npm install
```

### 2. Optional local configuration

The frontend reads the API base URL from `VITE_API_BASE_URL`.

For local development, the default value is:

```bash
http://localhost:3001/api
```

If you want to change it, create `.env.local` in the project root and set:

```bash
VITE_API_BASE_URL=http://localhost:3001/api
```

A tracked example is available in `.env.example`.

### 3. Start the app

Fastest option from the project root:

```bash
npm run dev:all
```

This starts both the Vite frontend and the local mock API.

### 4. Start services separately

Start the mock API:

```bash
npm run server
```

The API runs on `http://localhost:3001`.

In a second terminal, start the frontend:

```bash
npm run dev
```

By default, Vite starts the app on `http://localhost:5173`.

## Available Scripts

- `npm run dev` starts the Vite dev server
- `npm run dev:all` starts the frontend and local API together
- `npm run build` creates a production build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint across the frontend, tooling files, and mock API
- `npm run test` runs the current automated checks for review validation rules
- `npm run server` starts the local mock API

## API Overview

The frontend expects a local API at `http://localhost:3001/api` unless `VITE_API_BASE_URL` overrides it.

Main endpoints:

- `GET /api/restaurants`
- `GET /api/restaurant/:restaurantId`
- `GET /api/dishes?restaurantId=:restaurantId`
- `GET /api/dish/:dishId`
- `GET /api/reviews?restaurantId=:restaurantId`
- `POST /api/review/:restaurantId`
- `PATCH /api/review/:reviewId`
- `GET /api/users`

## Notes

- The API uses mock data stored locally in `simple_api/api/mock.js`.
- Review changes are stored in memory and reset after restarting the API server.
- A small automated test suite covers the review validation rules in `simple_api/api/review-rules.test.js`.
- This repository is focused on frontend architecture and state flow rather than backend persistence.
