import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ReviewsPage } from "./ReviewsPage";
import {
  useGetReviewsByRestaurantIdQuery,
  useGetUsersQuery,
} from "../../redux/services/api";
import { useUser } from "../../components/user-context/use-user";

vi.mock("../../redux/services/api", () => ({
  useGetReviewsByRestaurantIdQuery: vi.fn(),
  useGetUsersQuery: vi.fn(),
}));

vi.mock("../../components/user-context/use-user", () => ({
  useUser: vi.fn(),
}));

describe("ReviewsPage", () => {
  beforeEach(() => {
    useUser.mockReturnValue({
      isLogged: true,
      userId: "user-1",
    });

    useGetUsersQuery.mockReturnValue({
      data: [{ id: "user-1", name: "Antoine" }],
      isLoading: false,
      isError: false,
    });

    useGetReviewsByRestaurantIdQuery.mockReturnValue({
      data: [
        {
          id: "review-1",
          userId: "user-1",
          text: "Good for lunch",
          rating: 5,
        },
      ],
      isLoading: false,
      isError: false,
    });
  });

  it("hides the create form when the signed-in user already has a review", () => {
    render(
      <MemoryRouter initialEntries={["/restaurant/rest-1/reviews"]}>
        <Routes>
          <Route path="/restaurant/:restaurantId/reviews" element={<ReviewsPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByText("You already reviewed this restaurant."),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Submit review" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit review" })).toBeInTheDocument();
  });
});
