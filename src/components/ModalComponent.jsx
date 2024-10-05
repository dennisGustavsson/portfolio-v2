import { useEffect } from "react";
import PropTypes from "prop-types";

const ModalComponent = ({ shouldShow, onRequestClose, children }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onRequestClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onRequestClose]);

  if (!shouldShow) {
    return null;
  }

  return (
    <div
      className="modal-background"
      onClick={onRequestClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          className="modal-close-button"
          onClick={onRequestClose}
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
