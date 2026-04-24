# Restaurant Explorer

Restaurant Explorer is a portfolio React SPA focused on one narrow task: help a user compare a few restaurants quickly, then drill into menus, dishes, reviews, and a demo cart flow.

The project is intentionally small, but it is organized like a real client application:
- route-based page composition
- RTK Query for server state
- Redux slice state for the cart
- small React contexts for theme and demo user session
- local Express mock API for repeatable development and testing

## Product Goal

The landing list is designed as a decision surface, not just a navigation list. A user can:
- compare restaurants by cuisine, menu size, and review volume
- filter the list by cuisine
- inspect one restaurant in more detail
- browse the menu and individual dishes
- sign in as a demo user and create or edit one review
- add dishes to a demo cart

## Tech Stack

- React 19
- Vite
- React Router
- Redux Toolkit
- RTK Query
- CSS Modules
- Vitest + React Testing Library
- Express mock API

## Architecture

`src/`
- application shell, routes, pages, and UI components
- server-state access through RTK Query in `src/redux/services/api.js`
- cart state in `src/redux/entities/cart/slice.js`
- theme and demo-user state in small context providers

`simple_api/`
- local Express API
- in-memory mock dataset
- review validation rules and Node test coverage

### Main decisions

- RTK Query handles API calls and invalidation instead of ad hoc `useEffect` fetch logic.
- Cart state stays in Redux because it is cross-page client state.
- Theme and demo-user session stay in context because they are simple UI concerns.
- The mock API keeps the project deterministic and easy to review locally.

## Local Development

### 1. Install dependencies

```bash
npm install
npm install --prefix simple_api
```

### 2. Configure the API base URL if needed

The frontend reads `VITE_API_BASE_URL`.

Default local value:

```bash
http://localhost:3001/api
```

To override it, create `.env.local` in the project root:

```bash
VITE_API_BASE_URL=http://localhost:3001/api
```

A tracked example is available in `.env.example`.

### 3. Start the app

Start frontend and mock API together:

```bash
npm run dev:all
```

Or run them separately:

```bash
npm run server
npm run dev
```

Expected local addresses:
- frontend: `http://localhost:5173`
- API: `http://localhost:3001`

## Scripts

- `npm run dev` starts Vite
- `npm run dev:all` starts Vite and the mock API together
- `npm run server` starts the mock API
- `npm run lint` runs ESLint across frontend, tooling, and mock API files
- `npm run test` runs Node API tests and frontend Vitest tests
- `npm run build` creates a production build
- `npm run build:pages` creates a GitHub Pages build with a static demo data seed
- `npm run preview` serves the production build locally

## Testing and Verification

The repository includes three levels of verification:

- API rule tests in `simple_api/api/*.test.js`
- React UI regression tests with Vitest and React Testing Library
- GitHub Actions matrix verification on Windows, macOS, and Linux

CI currently checks:
- dependency installation
- lint
- tests
- production build
- `dev:all` startup smoke test

## GitHub Pages Deployment

The repository includes a dedicated GitHub Pages workflow in
`.github/workflows/deploy-pages.yml`.

For this repository, GitHub Pages should be configured in:
- `Settings -> Pages`
- `Build and deployment -> Source -> GitHub Actions`

Important detail:
- GitHub Pages cannot run the local Express API from `simple_api/`
- the Pages build uses a static seed exported from the mock dataset and a browser-side demo API backed by `localStorage`
- create and update review actions still work on the deployed site, but they persist only in the browser that submitted them
- the home page includes a loading-state toggle that turns the simulated demo latency on or off for portfolio review

For this repository, the published site URL will be:

```text
https://maksnikulnikov.github.io/react_2025/
```

## API Overview

The frontend expects the following local endpoints:

- `GET /api/restaurants`
- `GET /api/restaurant/:restaurantId`
- `GET /api/dishes?restaurantId=:restaurantId`
- `GET /api/dish/:dishId`
- `GET /api/reviews?restaurantId=:restaurantId`
- `POST /api/review/:restaurantId`
- `PATCH /api/review/:reviewId`
- `GET /api/users`

## Notes

- Review changes are stored in memory and reset when the mock API restarts.
- GitHub Pages builds use a browser-side demo API seeded from the same mock data.
- The home page can enable or disable simulated request latency to make skeleton states obvious during review.
- The project is optimized for architecture clarity and reviewability, not backend persistence.
- `middle-plus-plan.md` is a local working note and is intentionally not part of the repository.
