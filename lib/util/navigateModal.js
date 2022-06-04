export function showSignIn(router) {
  router.replace(
    {
      pathname: router.pathname,
      query: {
        auth: "sign-in",
      },
    },
    undefined,
    {
      shallow: true,
    }
  );
}
export function hideAuth(router) {
  delete router.query.auth;
  router.replace(
    {
      pathname: router.pathname,
    },
    undefined,
    {
      shallow: true,
    }
  );
}

export function showSignUp(router) {
  router.replace(
    {
      pathname: router.pathname,
      query: {
        auth: "sign-up",
      },
    },
    undefined,
    {
      shallow: true,
    }
  );
}
export function showCompleteProfile(router) {
  router.replace(
    {
      pathname: router.pathname,
      query: {
        auth: "complete-profile",
      },
    },
    undefined,
    {
      shallow: true,
    }
  );
}
