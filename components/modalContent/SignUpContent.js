import React, { useState, useCallback, useEffect } from "react";

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
import { showSignIn, showCompleteProfile } from "@/lib/util/navigateModal";

export default function SignUpContent() {
  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();
  const router = useRouter();

  // Handle Redirects if user profile is incomplete or user is already logged in
  useEffect(() => {
    if (isValidating) return;
    if (user && !user.registered) {
      showCompleteProfile(router);
    } else if (user && user.registered && !user.linked) {
      console.log("show link steam");
    } else if (user && user.registered && user.linked) {
      router.replace("/dashboard");
    }
  }, [user, router, isValidating]);
  const [loading, setLoading] = useState(false);

  const [signUpFailed, setSignUpFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = useCallback(
    async (values) => {
      setLoading(true);
      try {
        const response = await fetcher("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });
        if (!response.user) {
          setSignUpFailed(true);
          console.log(typeof response.error);
          setErrorMessage(JSON.stringify(response.error.message));
        } else {
          setSignUpFailed(false);
          mutate({ user: response.user }, false);
          showCompleteProfile(router);
        }
      } catch (e) {
        setErrorMessage(e.message);
        console.log(e.message);
        setSignUpFailed(true);
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
      <h1 className="text-red-700 text-center text-xl mb-3">SIGN UP</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={onSubmit}
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
              placeholder="Choose a password"
              className="input-field"
            />
            <label htmlFor="confirmPassword" className="input-label">
              Confirm Password:
            </label>
            <Field
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              className="input-field"
            />
            <p className="text-red-700 w-full text-left font-bold">
              {errorMessage}
            </p>
            <button
              type="submit"
              className=" px-5 w-[50%] py-2 my-3 mx-3 text-white bg-red-700 flex justify-center  items-center hover:bg-red-500/[0.8] rounded-md"
            >
              {!loading ? (
                <div className="text-center my-1">Continue</div>
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
      <button
        onClick={(e) => {
          showSignIn(router);
        }}
        className="text-white hover:text-red-600 hover:underline cursor-pointer text-center text-lg "
      >
        SIGN IN
      </button>
    </>
  );
}
