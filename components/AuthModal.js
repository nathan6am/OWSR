import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";
import { hideAuth } from "../lib/util/navigateModal";
import { MdCancel } from "react-icons/md";
import SignUpContent from "./modalContent/SignUpContent";
import SignInContent from "./modalContent/SignInContent";
import CompleteProfileContent from "./modalContent/CompleteProfileContent";
import LinkSteamContent from "./modalContent/LinkSteamContent";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useRouter } from "next/router";
import CancelDialog from "./modalContent/CancelDialog";
import { fetcher } from "../lib/fetcher";
import LinkFailedContent from "./modalContent/LinkFailedContent";
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
    backgroundColor: "rgba(8, 8, 8, 0.8)",
  },
};

export default function AuthModal() {
  const router = useRouter();
  const { data: { user } = {}, mutate } = useCurrentUser();
  const [dialogOpen, setDialogOpen] = useState(false);

  //Deletes incomplete profile from database and hides the modal
  const onCancel = useCallback(async () => {
    try {
      await fetcher("/api/users/me", {
        method: "DELETE",
      });
      setTimeout(() => {
        setDialogOpen(false);
      }, 500);
      mutate({ user: null });
      hideAuth(router);
    } catch (e) {
      console.error(e.message);
    }
  }, [mutate]);

  //Modal content set with router "auth" query
  const page = router.query?.auth;

  //Toggle modal open with contextual routing, modal will appear only if query.auth exists
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    if (!router.query || !router.query.auth) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  });

  return (
    <>
      <Modal style={customStyles} isOpen={modalOpen} ariaHideApp={false}>
        <CancelDialog
          isOpen={dialogOpen}
          setIsOpen={setDialogOpen}
          onCancel={onCancel}
          title="Cancel Account Setup"
          message="Are you sure you want to cancel setting up your account? All progress will be lost."
        />
        <MdCancel
          className="modal-close-btn text-white/[0.8] hover:text-red-500/[0.8]"
          onClick={() => {
            if (user) {
              setDialogOpen(true);
            } else {
              hideAuth(router);
            }
          }}
        />
        <div className="flex w-full flex-col min-w-[280px] md:min-w-[400px] lg:min-w-[500px] p-5 md:px-10 lg:px-[6rem] py-5 ">
          <Content page={page} />
        </div>
      </Modal>
    </>
  );
}

function Content({ page }) {
  switch (page) {
    case "sign-in":
      return <SignInContent />;
    case "sign-up":
      return <SignUpContent />;
    case "complete-profile":
      return <CompleteProfileContent />;
    case "link-steam":
      return <LinkSteamContent />;
    case "link-steam-failed":
      return <LinkFailedContent />;
    default:
      return <SignInContent />;
  }
}
