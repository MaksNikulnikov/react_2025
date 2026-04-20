# Mock API

This folder contains the local Express API used by the frontend during development.

## Endpoints

### Restaurants

1. `GET /api/restaurants` returns all restaurants.
2. `GET /api/restaurant/:restaurantId` returns one restaurant by id.

### Dishes

1. `GET /api/dishes?restaurantId=:restaurantId` returns dishes for a specific restaurant.
2. `GET /api/dish/:dishId` returns one dish by id.

### Reviews

1. `GET /api/reviews?restaurantId=:restaurantId` returns reviews for a specific restaurant.
2. `POST /api/review/:restaurantId` creates a new review for a restaurant.
3. `PATCH /api/review/:reviewId` updates an existing review.

### Users

1. `GET /api/users` returns all users.

## Notes

- Data is stored in local mock files.
- Created and updated reviews are kept in memory and reset after a server restart.
