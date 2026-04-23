import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef, useState } from "react";
import { describe, expect, it } from "vitest";
import { Button } from "../button/Button";
import { Modal } from "./Modal";

const createModalRoot = () => {
  const modalRoot = document.createElement("div");
  modalRoot.id = "modal";
  document.body.append(modalRoot);
};

describe("Modal", () => {
  it("traps focus inside the dialog and restores focus to the trigger", async () => {
    createModalRoot();
    const user = userEvent.setup();

    const ModalHost = () => {
      const [isOpen, setIsOpen] = useState(false);
      const triggerRef = useRef(null);

      return (
        <>
          <Button onClick={() => setIsOpen(true)} ref={triggerRef}>
            Cart
          </Button>
          <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            dialogLabel="Cart contents"
            returnFocusRef={triggerRef}
          >
            <button type="button">Checkout</button>
          </Modal>
        </>
      );
    };

    render(
      <ModalHost />,
    );

    const trigger = screen.getByRole("button", { name: "Cart" });

    await user.click(trigger);

    const closeButton = screen.getByRole("button", { name: "Close modal" });
    const checkoutButton = screen.getByRole("button", { name: "Checkout" });

    expect(screen.getByRole("dialog", { name: "Cart contents" })).toBeInTheDocument();
    expect(closeButton).toHaveFocus();

    await user.tab();
    expect(checkoutButton).toHaveFocus();

    await user.tab();
    expect(closeButton).toHaveFocus();

    await user.click(closeButton);

    expect(screen.queryByRole("dialog", { name: "Cart contents" })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();

    await user.click(trigger);
    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.queryByRole("dialog", { name: "Cart contents" })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
