import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "../button/Button";
import styles from "./modal.module.css";

export const Modal = ({ triggerLabel, dialogLabel, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const modalRoot = document.getElementById("modal");
  const resolvedDialogLabel = dialogLabel ?? triggerLabel;

  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
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
        role="dialog"
        aria-modal="true"
        aria-label={resolvedDialogLabel}
      >
        <button
          className={styles.closeButton}
          type="button"
          onClick={closeModal}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );

  return (
    <>
      <Button onClick={openModal} name={triggerLabel} />
      {isVisible
        ? modalRoot
          ? createPortal(modalContent, modalRoot)
          : modalContent
        : null}
    </>
  );
};
