import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "../button/Button";
import styles from "./modal.module.css";

const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

const getFocusableElements = (container) => {
  if (!container) {
    return [];
  }

  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));
};

export const Modal = ({ triggerLabel, dialogLabel, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const modalRoot = document.getElementById("modal");
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const triggerButtonRef = useRef(null);
  const resolvedDialogLabel = dialogLabel ?? triggerLabel;

  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    const dialogElement = dialogRef.current;
    const triggerElement = triggerButtonRef.current;
    const initialFocusTarget =
      closeButtonRef.current ||
      getFocusableElements(dialogElement)[0] ||
      dialogElement;

    initialFocusTarget?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements(dialogElement);

      if (!focusableElements.length) {
        event.preventDefault();
        dialogElement?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      triggerElement?.focus();
    };
  }, [isVisible]);

  const modalContent = (
    <div
      className={styles.modalBackdrop}
      onClick={closeModal}
      role="presentation"
    >
      <div
        className={styles.modalContent}
        onClick={(event) => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={resolvedDialogLabel}
        tabIndex={-1}
      >
        <button
          className={styles.closeButton}
          type="button"
          onClick={closeModal}
          aria-label="Close modal"
          ref={closeButtonRef}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );

  return (
    <>
      <Button
        onClick={openModal}
        name={triggerLabel}
        buttonRef={triggerButtonRef}
      />
      {isVisible
        ? modalRoot
          ? createPortal(modalContent, modalRoot)
          : modalContent
        : null}
    </>
  );
};
