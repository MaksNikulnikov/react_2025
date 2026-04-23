import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserContextProvider } from "../user-context/UserContextProvider";
import { UserSession } from "./UserSession";
import { useGetUsersQuery } from "../../redux/services/api";
import { cartSlice } from "../../redux/entities/cart/slice";

vi.mock("../../redux/services/api", () => ({
  useGetUsersQuery: vi.fn(),
}));

const users = [
  { id: "u-1", name: "Antoine" },
  { id: "u-2", name: "Lucia" },
];

const createStore = (preloadedCart = {}) =>
  configureStore({
    reducer: {
      [cartSlice.name]: cartSlice.reducer,
    },
    preloadedState: {
      cart: preloadedCart,
    },
  });

describe("UserSession", () => {
  beforeEach(() => {
    useGetUsersQuery.mockReturnValue({
      data: users,
      isLoading: false,
      isError: false,
    });
  });

  it("lets the user select and clear a demo session", async () => {
    const user = userEvent.setup();
    const store = createStore({ dishOne: 2 });

    render(
      <Provider store={store}>
        <UserContextProvider>
          <UserSession />
        </UserContextProvider>
      </Provider>,
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Demo user" }),
      "u-1",
    );

    expect(screen.getByText("Demo user: Antoine")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign out" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Sign out" }));

    expect(screen.getByText("Choose a demo user")).toBeInTheDocument();
    expect(store.getState().cart).toEqual({});
  });
});
