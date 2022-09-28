import React, { useState, useEffect } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Loading from "@/components/Loading";
import { showSignIn, showSignUp } from "@/lib/util/navigateModal";
import { useRouter } from "next/router";
import TeamColors from "@/components/TeamColors";
export default function InvitePage({ tokenKey, session }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [validating, setValidating] = useState(true);
  const [token, setToken] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const {
    data: { user } = {},
    mutate: mutateUser,
    isValidating: userIsValidating,
  } = useCurrentUser();
  const { data, mutate, isValidating, error } = useSWR(
    `/api/validate-invite/${tokenKey}`,
    fetcher
  );
  useEffect(() => {
    if (!data && !error) {
      setValidating(true);
    } else {
      if (data && data.success) {
        setToken(data.data);
        setIsValid(true);
        setValidating(false);
      } else {
        setIsValid(false);
        setValidating(false);
      }
    }
  }, [data, userIsValidating, isValidating]);

  useEffect(() => {
    if (user && user.registered) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [user]);

  return (
    <div className="flex w-full h-full justify-center items-center pb-20">
      {validating ? (
        <Loading />
      ) : (
        <div className="bg-dark-500/[0.3] backdrop-blur-md max-w-[800px] w-full mx-4 h-fit rounded-lg p-8">
          {isValid ? (
            <div className="flex flex-col items-center h-full">
              <p className="text-white/[0.7]">
                {token.creator.name} has invited you to join the team:
              </p>
              <div className="flex flex-row items-center my-20">
                <TeamColors colors={token.teamRef.colors} />
                <p className="text-xl">{token.teamRef.name}</p>
              </div>
              {authenticated ? (
                <button className="px-4 py-2 bg-green-600 hover:bg-green-400 rounded-md">
                  Join Team
                </button>
              ) : (
                <button
                  className="text-red-500 hover:text-red-400 underline text-lg"
                  onClick={() => {
                    showSignIn(router);
                  }}
                >
                  Sign In to Continue
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center h-full">
              <h2 className="text-red-500 text-xl">
                <strong>Error:</strong> Invalid or Expired Link
              </h2>
              <div className="flex h-full w-full items-center justify-center py-20">
                <p>
                  {`We're sorry, this invite link is either invalid or has
                  expired. You may now close the page.`}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

InvitePage.layout = "Invite";

InvitePage.getInitialProps = async ({ query }) => {
  const { token } = query;
  return {
    tokenKey: token,
  };
};
