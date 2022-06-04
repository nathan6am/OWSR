import React, { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";
import { FaDiscord, FaSteam } from "react-icons/fa";
import { fetcher } from "../../lib/fetcher";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { showSignIn } from "../../lib/util/navigateModal";

export default function CompleteProfileContent() {
  const [countryCode, setCountryCode] = useState("");

  return (
    <>
      <img
        className="mx-auto my-4 sm:my-8"
        src="/images/logo.png"
        width={200}
      ></img>
      <h1 className="text-red-700 text-center text-xl mb-3">
        Complete Your Profile
      </h1>
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
            <label htmlFor="name" className="input-label">
              Full Name:
            </label>
            <Field
              id="name"
              name="name"
              placeholder="Enter your full name"
              type="text"
              className="input-field"
            />
            <label htmlFor="password" className="input-label">
              Country
            </label>
            <Field
              id="country"
              name="country"
              placeholder="Country"
              type="text"
              className="input-field"
            />
            <button className="py-3 px-5 w-[50%] my-3 mx-3 text-white bg-red-700 hover:bg-red-500/[0.8] rounded-md">
              Continue
            </button>
          </div>
        </Form>
      </Formik>
      {/* <p className="text-center text-red-700 mt-6 mb-1">
        Already have an account?{" "}
      </p>
      <a
        onClick={() => {
          showSignIn(router);
        }}
        className="text-white hover:text-red-600 hover:underline cursor-pointer text-center text-lg "
      >
        SIGN IN
      </a> */}
    </>
  );
}

function LinkSteamContent() {
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
        <Link href="/api/auth/withsteam">
          <button className="btn-social bg-white/[0.2] hover:bg-white/[0.3]">
            <FaSteam size="20px" className="mr-2" />
            Sign Up With Steam
          </button>
        </Link>
      </div>
      <p className="text-center text-red-700 mt-6 mb-1">
        Already have an account?{" "}
      </p>
      <a
        onClick={() => {
          showSignIn(router);
        }}
        className="text-white hover:text-red-600 hover:underline cursor-pointer text-center text-lg "
      >
        SIGN IN
      </a>
    </>
  );
}
