import React from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#1f1f1f",
    border: "none",
    overflow: "auto",
    display: "flex",
  },
  overlay: {
    backgroundColor: "rgba(8, 8, 8, 0.2)",
  },
};
export default function GenericModal({ children, isOpen, hide }) {
  return (
    <Modal style={customStyles} isOpen={isOpen} ariaHideApp={false}>
      <div className="w-full h-full">{children}</div>
    </Modal>
  );
}
