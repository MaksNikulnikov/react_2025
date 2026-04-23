import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL, IS_GITHUB_PAGES_DEMO_API } from "../../config/api";
import { createPagesBaseQuery } from "./pages-base-query";

const baseQuery = IS_GITHUB_PAGES_DEMO_API
  ? createPagesBaseQuery()
  : fetchBaseQuery({
      baseUrl: API_BASE_URL,
    });

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Restaurant", "Dish", "Review", "User"],
  endpoints: (builder) => ({
    getRestaurants: builder.query({
      query: () => "/restaurants/",
      providesTags: ["Restaurant"],
    }),
    getRestaurantById: builder.query({
      query: (restaurantId) => `/restaurant/${restaurantId}`,
      providesTags: (result, error, id) => [{ type: "Restaurant", id }],
    }),

    getDishesByRestaurantId: builder.query({
      query: (restaurantId) => `/dishes?restaurantId=${restaurantId}`,
      providesTags: ["Dish"],
    }),
    getDishById: builder.query({
      query: (dishId) => `/dish/${dishId}`,
      providesTags: (result, error, id) => [{ type: "Dish", id }],
    }),

    getReviewsByRestaurantId: builder.query({
      query: (restaurantId) => `/reviews?restaurantId=${restaurantId}`,
      providesTags: (result, error, restaurantId) => [
        { type: "Review", id: "LIST" },
        { type: "Restaurant", id: restaurantId },
      ],
    }),
    createReview: builder.mutation({
      query: ({ restaurantId, body }) => ({
        url: `/review/${restaurantId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { restaurantId }) => [
        { type: "Review", id: "LIST" },
        { type: "Restaurant", id: restaurantId },
      ],
    }),
    updateReview: builder.mutation({
      query: ({ reviewId, body }) => ({
        url: `/review/${reviewId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { reviewId }) => [
        { type: "Review", id: reviewId },
        { type: "Review", id: "LIST" },
      ],
    }),

    getUsers: builder.query({
      query: () => "/users/",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetRestaurantsQuery,
  useGetRestaurantByIdQuery,
  useGetDishesByRestaurantIdQuery,
  useGetDishByIdQuery,
  useGetReviewsByRestaurantIdQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useGetUsersQuery,
} = api;
