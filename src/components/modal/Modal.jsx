import { useEffect, useState } from "react";
import { Button } from "../button/Button";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

export const Modal = ({ buttonName, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const modalRoot = document.getElementById("modal");

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsVisible(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isVisible]);

  const modalContent = (
    <div
      className={styles.modalBackdrop}
      onClick={() => setIsVisible(false)}
      role="presentation"
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={buttonName}
      >
        <button
          className={styles.closeButton}
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="Close modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );

  return (
    <>
      <Button onClick={() => setIsVisible(!isVisible)} name={buttonName} />
      {isVisible
        ? modalRoot
          ? createPortal(modalContent, modalRoot)
          : modalContent
        : null}
    </>
  );
};
