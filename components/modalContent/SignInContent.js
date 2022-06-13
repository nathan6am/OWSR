import React, { useState, useCallback, useRef, useEffect } from "react";

//components
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ClipLoader } from "react-spinners";
import { FaDiscord, FaSteam } from "react-icons/fa";

//hooks
import { useRouter } from "next/router";
import { useCurrentUser } from "@/hooks/useCurrentUser";

//util
import { fetcher } from "@/lib/fetcher";
import {
  showSignUp,
  showCompleteProfile,
  showLinkSteam,
} from "@/lib/util/navigateModal";

export default function SignInContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  //Fetch current user to check if session already exists
  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();

  // Handle Redirects if user profile is incomplete or user is already logged in
  useEffect(() => {
    if (isValidating) return;
    if (user && !user.registered) {
      showCompleteProfile(router);
    } else if (user && user.registered && !user.linked) {
      showLinkSteam(router);
    } else if (user && user.registered && user.linked) {
      router.replace("/dashboard");
    }
  }, [user, router, isValidating]);

  //Attempt login via credentials
  const onSubmit = useCallback(
    async (values) => {
      setLoading(true);
      try {
        const response = await fetcher("/api/auth/credentials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });
        if (!response.user) {
          setLoginFailed(true);
        } else {
          setLoginFailed(false);
          //Automatically update the cached user upon success response
          mutate({ user: response.user }, false);
        }
      } catch (e) {
        setLoginFailed(true);
      } finally {
        setLoading(false);
      }
    },
    [mutate]
  );

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
        onSubmit={onSubmit}
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
              className={`input-field ${
                loginFailed ? "ring ring-red-700" : ""
              }`}
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
              placeholder="Password"
              className={`input-field ${
                loginFailed ? "ring ring-red-700" : ""
              }`}
            />
            {loginFailed ? (
              <p className="font-bold text-red-500">
                Email or Password is incorrect.
              </p>
            ) : null}
            <button
              type="submit"
              className=" px-5 w-[50%] py-2 my-3 mx-3 text-white bg-red-700 flex justify-center  items-center hover:bg-red-500/[0.8] rounded-md"
            >
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
        <Link href="/api/auth/steam">
          <button className="btn-social bg-white/[0.2] hover:bg-white/[0.3]">
            <FaSteam size="20px" className="mr-2" />
            Sign In With Steam
          </button>
        </Link>
      </div>
      <p className="text-center text-red-700 mt-6 mb-1">
        Don't have an account?{" "}
      </p>
      <button
        onClick={() => {
          showSignUp(router);
        }}
        className="text-white hover:text-red-600 hover:underline cursor-pointer text-center text-lg"
        role="button"
      >
        SIGN UP NOW
      </button>
    </>
  );
}
