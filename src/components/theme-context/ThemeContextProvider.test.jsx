import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ThemeContextProvider } from "./ThemeContextProvider";
import { useTheme } from "./use-theme";

const STORAGE_KEY = "restaurant-explorer-theme";

const ThemeProbe = () => {
  const { theme, themeLabel, toggleTheme } = useTheme();

  return (
    <>
      <span>{theme}</span>
      <button type="button" onClick={toggleTheme}>
        {themeLabel}
      </button>
    </>
  );
};

describe("ThemeContextProvider", () => {
  it("restores the stored theme and persists changes", async () => {
    window.localStorage.setItem(STORAGE_KEY, "dark");
    const user = userEvent.setup();

    render(
      <ThemeContextProvider>
        <ThemeProbe />
      </ThemeContextProvider>,
    );

    expect(screen.getByText("dark")).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(document.documentElement.style.colorScheme).toBe("dark");

    await user.click(screen.getByRole("button", { name: "Dark mode" }));

    expect(screen.getByText("light")).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("light");
  });
});
