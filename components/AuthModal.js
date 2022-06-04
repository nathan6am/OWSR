import React, { useState, useEffect, useCallback } from "react";
import ReactFlagsSelect from "react-flags-select";
import ReactDOM from "react-dom";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "react-modal";
import { hideAuth, showSignIn } from "../lib/util/navigateModal";
import { FaDiscord, FaSteam } from "react-icons/fa";
import { MdCancel, MdClose } from "react-icons/md";
import SignUpContent from "./modalContent/SignUpContent";
import SignInContent from "./modalContent/SignInContent";
import CompleteProfileContent from "./modalContent/CompleteProfileContent";
import { useRouter } from "next/router";

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
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const page = router.query.auth;
  useEffect(() => {
    if (page) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [page, router]);
  return (
    <Modal style={customStyles} isOpen={isOpen} ariaHideApp={false}>
      <MdCancel
        className="modal-close-btn text-white/[0.8] hover:text-red-500/[0.8]"
        onClick={() => {
          hideAuth(router);
        }}
      />
      <div className="flex w-full flex-col min-w-[280px] md:min-w-[400px] lg:min-w-[500px] p-5 md:px-10 lg:px-[6rem] py-5 ">
        <Content page={page} />
      </div>
    </Modal>
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
    default:
      return <SignInContent />;
  }
}
