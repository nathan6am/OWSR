import React from "react";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
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
    backgroundColor: "rgba(8, 8, 8, 0.4)",
  },
};
export default function GenericModal({
  children,
  isOpen,
  hide,
  onAfterClose,
  onAfterOpen,
  closeButtonShown,
}) {
  return (
    <Modal
      onAfterClose={onAfterClose}
      onAfterOpen={onAfterOpen}
      style={customStyles}
      isOpen={isOpen}
      ariaHideApp={false}
    >
      {closeButtonShown && (
        <button
          onClick={hide}
          className="absolute top-2 right-2 p-1 rounded-full bg-dark-400 hover:bg-dark-500 z-50"
        >
          <MdClose className="text-xl" />
        </button>
      )}

      <div className="w-full h-full relative">{children}</div>
    </Modal>
  );
}
