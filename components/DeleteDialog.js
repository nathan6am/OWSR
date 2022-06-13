import React from "react";
import Modal from "react-modal/lib/components/Modal";
import { useCurrentUser } from "@/hooks/useCurrentUser";
const customDialogStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#ffffff",
    border: "none",
    overflow: "auto",
    display: "flex",
    maxWidth: "400px",
    padding: 0,
  },
  overlay: {
    backgroundColor: "rgba(8, 8, 8, 0.4)",
  },
};

export default function DeleteDialog({ isOpen, setIsOpen }) {
  const { data: { user } = {}, mutate } = useCurrentUser();

  //Deletes incomplete profile from database and hides the modal
  const onCancel = useCallback(async () => {
    try {
      await fetcher("/api/users/me", {
        method: "DELETE",
      });
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
      mutate({ user: null });
    } catch (e) {
      console.error(e.message);
    }
  }, [mutate]);
  return (
    <Modal style={customDialogStyles} isOpen={isOpen}>
      <div className="flex flex-1 flex-col">
        <h2 className="w-full bg-red-500 text-center py-3 text-lg border-b border-red-700">
          Delete your Account
        </h2>
        <div className="text-dark-100 py-8 px-8">
          Are your sure you want to delete your account? All data will be
          permanently removed
        </div>
        <div className="flex flex-row justify-end items-center px-5 bg-dark-900 border-t border-dark-700">
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="px-5 py-3 my-3 mr-3 rounded-md bg-dark-500 hover:bg-dark-600 text-sm"
          >
            No, Cancel
          </button>
          <button
            onClick={onCancel}
            className=" px-5 py-3 my-3 rounded-md bg-red-500 text-sm hover:bg-red-400"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
