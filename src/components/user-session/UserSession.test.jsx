import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserContextProvider } from "../user-context/UserContextProvider";
import { UserSession } from "./UserSession";
import { useGetUsersQuery } from "../../redux/services/api";

vi.mock("../../redux/services/api", () => ({
  useGetUsersQuery: vi.fn(),
}));

const users = [
  { id: "u-1", name: "Antoine" },
  { id: "u-2", name: "Lucia" },
];

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

    render(
      <UserContextProvider>
        <UserSession />
      </UserContextProvider>,
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Demo user" }),
      "u-1",
    );

    expect(screen.getByText("Demo user: Antoine")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign out" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Sign out" }));

    expect(screen.getByText("Choose a demo user")).toBeInTheDocument();
  });
});
