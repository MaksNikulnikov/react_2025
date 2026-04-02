import { useState } from "react";
import { Button } from "../button/Button";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

export const Modal = ({ buttonName, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setIsVisible(!isVisible)} name={buttonName} />
      {isVisible &&
        createPortal(
          <div
            className={styles.modal_backdrop}
            onClick={() => setIsVisible(false)}
          >
            <div
              className={styles.modal_content}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </div>,
          document.getElementById("modal"),
        )}
    </>
  );
};
