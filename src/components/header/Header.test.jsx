import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, it, vi } from "vitest";
import { Header } from "./Header";
import { cartSlice } from "../../redux/entities/cart/slice";

vi.mock("../theme-context/use-theme", () => ({
  useTheme: () => ({
    toggleTheme: vi.fn(),
    themeLabel: "Light mode",
  }),
}));

vi.mock("../user-session/UserSession", () => ({
  UserSession: () => <div>Session controls</div>,
}));

vi.mock("../modal/Modal", () => ({
  Modal: ({ triggerLabel }) => <div>{triggerLabel}</div>,
}));

describe("Header", () => {
  it("shows the total cart quantity in the cart trigger", () => {
    const store = configureStore({
      reducer: {
        [cartSlice.name]: cartSlice.reducer,
      },
      preloadedState: {
        cart: {
          dishOne: 2,
          dishTwo: 1,
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Cart (3)")).toBeInTheDocument();
  });
});
