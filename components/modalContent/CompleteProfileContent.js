import React, { useState, useCallback, useRef, useEffect } from "react";

//components
import { Formik, Form, Field } from "formik";
import { ClipLoader } from "react-spinners";
import CountrySelect from "../UI/CountrySelect";

//hooks
import { useRouter } from "next/router";
import { useCurrentUser } from "@/hooks/useCurrentUser";

//util
import { fetcher } from "@/lib/fetcher";
import { showSignIn, showLinkSteam } from "@/lib/util/navigateModal";

export default function CompleteProfileContent() {
  const router = useRouter();
  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();

  // Handle Redirects if user profile is incomplete or user is already logged in
  useEffect(() => {
    if (isValidating) return;
    if (!user) {
      //show[page] functions take router as arg to append query to url for contextual routing of modal
      showSignIn(router);
    } else if (user && user.registered && !user.linked) {
      showLinkSteam(router);
    } else if (user && user.registered && user.linked) {
      router.replace("/dashboard");
    }
  }, [user, router, isValidating]);

  const [countryCode, setCountryCode] = useState("");
  const [loading, setLoading] = useState(false);

  //Update user profile via auth/me api route and redirect to link steam
  const onSubmit = useCallback(
    async (values) => {
      setLoading(true);
      try {
        const response = await fetcher("/api/users/me", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            country: countryCode,
          }),
        });
        if (!response.user) {
          console.log("no user in response");
        } else {
          mutate({ user: response.user }, false);
          if (response.user.registered && response.user.linked) {
            router.replace("/dashboard");
          } else {
            showLinkSteam(router);
          }
        }
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    },
    [mutate, countryCode]
  );

  return (
    <div className="min-h-[600px]">
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
          name: "",
        }}
        onSubmit={onSubmit}
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
            <CountrySelect
              className="w-full mb-3"
              onChange={(option) => {
                setCountryCode(option.value);
              }}
            />
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
    </div>
  );
}
