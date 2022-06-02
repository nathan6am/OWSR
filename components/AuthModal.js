import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "react-modal";
import { hideAuthModal, showAuthModal } from "../redux/actioncreators";
import { ClipLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import {
  FaDiscord,
  FaYoutube,
  FaTwitch,
  FaFacebook,
  FaSteam,
} from "react-icons/fa";
import { MdCancel, MdClose } from "react-icons/md";

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
  const isOpen = useSelector((state) => state.authModal.isOpen);
  const page = useSelector((state) => state.authModal.page);
  const dispatch = useDispatch();

  return (
    <Modal style={customStyles} isOpen={isOpen}>
      <MdCancel
        className="modal-close-btn text-white/[0.8] hover:text-red-500/[0.8]"
        onClick={() => {
          dispatch(hideAuthModal());
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
    default:
      return <SignInContent />;
  }
}
function SignInContent() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <img
        className="mx-auto my-4 sm:my-8"
        src="/images/logo.png"
        width={200}
      ></img>
      <h1 className="text-red-700 text-center text-xl mb-3">SIGN IN</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          console.log(loading);
          await new Promise((r) => setTimeout(r, 1000));
          setLoading(false);
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <div className="flex flex-col justify-center items-center">
            <label
              htmlFor="email"
              className="text-red-700 align-left text-left w-full mb-1"
            >
              Email:
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="input-field"
            />

            <label
              htmlFor="password"
              className="text-red-700 align-left text-left w-full  mb-1"
            >
              Password:
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="●●●●●●●●●"
              className="input-field"
            />
            <button className=" px-5 w-[50%] py-2 my-3 mx-3 text-white bg-red-700 flex justify-center  items-center hover:bg-red-500/[0.8] rounded-md">
              {!loading ? (
                <div className="text-center my-1">Sign In</div>
              ) : (
                <ClipLoader color="white" size="32px" />
              )}
            </button>
          </div>
        </Form>
      </Formik>
      <p className="text-white/[0.8] text-center text-lg m-3">OR</p>
      <hr className="mx-10 mb-3"></hr>
      <div className="flex flex-col items-center w-full">
        <button className="btn-social bg-discord-200 hover:bg-discord-100 ">
          <FaDiscord size="20px" className="mr-2" />
          Sign In With Discord
        </button>
      </div>
      <div className="flex flex-col items-center w-full">
        <button className="btn-social bg-white/[0.2] hover:bg-white/[0.3]">
          <FaSteam size="20px" className="mr-2" />
          Sign In With Steam
        </button>
      </div>
      <p className="text-center text-red-700 mt-6 mb-1">
        Don't have an account?{" "}
      </p>
      <a
        onClick={() => {
          dispatch(showAuthModal("sign-up"));
        }}
        className="text-white hover:text-red-600 hover:underline cursor-pointer text-center text-lg "
      >
        SIGN UP NOW
      </a>
    </>
  );
}

function SignUpContent() {
  const dispatch = useDispatch();
  return (
    <>
      <img
        className="mx-auto my-4 sm:my-8"
        src="/images/logo.png"
        width={200}
      ></img>
      <h1 className="text-red-700 text-center text-xl mb-3">SIGN UP</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <div className="flex flex-col justify-center items-center">
            <label htmlFor="email" className="input-label">
              Email:
            </label>
            <Field
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              className="input-field"
            />

            <label htmlFor="password" className="input-label">
              Password:
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="●●●●●●●●●"
              className="input-field"
            />
            <label htmlFor="confirmPassword" className="input-label">
              Confirm Password:
            </label>
            <Field
              id="confirmPassword"
              name="confirmPassword"
              type="confirmPassword"
              placeholder="●●●●●●●●●"
              className="input-field"
            />
            <button className="py-3 px-5 w-[50%] my-3 mx-3 text-white bg-red-700 hover:bg-red-500/[0.8] rounded-md">
              Continue
            </button>
          </div>
        </Form>
      </Formik>
      <p className="text-white/[0.8] text-center text-lg m-3">OR</p>
      <hr className="mx-10 mb-3"></hr>
      <div className="flex flex-col items-center w-full">
        <button className="btn-social bg-discord-200 hover:bg-discord-100">
          <FaDiscord size="20px" className="mr-2" />
          Sign Up With Discord
        </button>
      </div>
      <div className="flex flex-col items-center w-full">
        <button className="btn-social bg-white/[0.2] hover:bg-white/[0.3]">
          <FaSteam size="20px" className="mr-2" />
          Sign Up With Steam
        </button>
      </div>
      <p className="text-center text-red-700 mt-6 mb-1">
        Already have an account?{" "}
      </p>
      <a
        onClick={() => {
          dispatch(showAuthModal("sign-in"));
        }}
        className="text-white hover:text-red-600 hover:underline cursor-pointer text-center text-lg "
      >
        SIGN IN
      </a>
    </>
  );
}
