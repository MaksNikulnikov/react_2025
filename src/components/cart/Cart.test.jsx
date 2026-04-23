import { render, screen, within } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Cart } from "./Cart";
import { cartSlice } from "../../redux/entities/cart/slice";
import {
  useGetDishesByRestaurantIdQuery,
  useGetRestaurantsQuery,
} from "../../redux/services/api";

vi.mock("../../redux/services/api", () => ({
  useGetRestaurantsQuery: vi.fn(),
  useGetDishesByRestaurantIdQuery: vi.fn(),
}));

const restaurants = [
  {
    id: "rest-1",
    name: "Masala Berlin",
    description: "Indian kitchen",
    menu: ["dish-1", "dish-2"],
  },
  {
    id: "rest-2",
    name: "Vapiano",
    description: "Italian kitchen",
    menu: ["dish-3"],
  },
];

const dishesByRestaurant = {
  "rest-1": [
    {
      id: "dish-1",
      name: "Chicken tikka masala",
      price: 12,
      ingredients: ["chicken", "rice"],
    },
    {
      id: "dish-2",
      name: "Naan",
      price: 3,
      ingredients: ["bread"],
    },
  ],
  "rest-2": [
    {
      id: "dish-3",
      name: "House Pizza",
      price: 10,
      ingredients: ["bread", "cheese", "tomatoes"],
    },
  ],
};

const createStore = (preloadedCart) =>
  configureStore({
    reducer: {
      [cartSlice.name]: cartSlice.reducer,
    },
    preloadedState: {
      cart: preloadedCart,
    },
  });

describe("Cart", () => {
  beforeEach(() => {
    useGetRestaurantsQuery.mockReturnValue({
      data: restaurants,
      isLoading: false,
      isError: false,
    });

    useGetDishesByRestaurantIdQuery.mockImplementation((restaurantId) => ({
      data: dishesByRestaurant[restaurantId] || [],
      isLoading: false,
      isError: false,
    }));
  });

  it("groups cart items by restaurant and shows section subtotals", () => {
    const store = createStore({
      "dish-1": 2,
      "dish-2": 1,
      "dish-3": 1,
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );

    expect(screen.getByText("Your order")).toBeInTheDocument();
    expect(screen.getByText("4 items from 2 restaurants.")).toBeInTheDocument();
    expect(screen.getByText("Masala Berlin")).toBeInTheDocument();
    expect(screen.getByText("Vapiano")).toBeInTheDocument();
    expect(screen.getByText("Chicken tikka masala")).toBeInTheDocument();
    expect(screen.getByText("Naan")).toBeInTheDocument();
    expect(screen.getByText("House Pizza")).toBeInTheDocument();

    const masalaSection = screen.getByText("Masala Berlin").closest("section");
    const vapianoSection = screen.getByText("Vapiano").closest("section");

    expect(within(masalaSection).getByText("$27")).toBeInTheDocument();
    expect(within(vapianoSection).getAllByText("$10")).toHaveLength(2);
  });
});
