import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ModalComponent = ({ shouldShow, onRequestClose, children }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onRequestClose();
    }, 300);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal-background")) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onRequestClose]);

  if (!shouldShow && !isClosing) {
    return null;
  }

  return (
    <div
      className={`modal-background ${
        isClosing ? "modal-bg-out" : "modal-bg-in"
      }`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`modal-content ${
          isClosing ? "modal-close" : "modal-appear"
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          className="modal-close-button"
          onClick={handleClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

ModalComponent.propTypes = {
  shouldShow: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ModalComponent;
