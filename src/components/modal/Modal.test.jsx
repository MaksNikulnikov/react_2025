import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Modal } from "./Modal";

const createModalRoot = () => {
  const modalRoot = document.createElement("div");
  modalRoot.id = "modal";
  document.body.append(modalRoot);
};

describe("Modal", () => {
  it("opens and closes through the close button and Escape", async () => {
    createModalRoot();
    const user = userEvent.setup();

    render(
      <Modal triggerLabel="Cart" dialogLabel="Cart contents">
        <div>Cart body</div>
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "Cart" }));

    expect(
      screen.getByRole("dialog", { name: "Cart contents" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Cart body")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close modal" }));

    expect(
      screen.queryByRole("dialog", { name: "Cart contents" }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Cart" }));
    fireEvent.keyDown(window, { key: "Escape" });

    expect(
      screen.queryByRole("dialog", { name: "Cart contents" }),
    ).not.toBeInTheDocument();
  });
});
