import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaDiscord, FaYoutube, FaTwitch, FaFacebook } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/router";
import { showSignIn } from "../lib/util/navigateModal";

//TODO: Responsive menu
export default function Navbar() {
  const [navScroll, setNavScroll] = useState(false);
  const navRef = useRef();
  navRef.current = navScroll;
  useEffect(() => {
    if (location && location.pathname === "/") {
      setNavScroll(false);
      const handleScroll = () => {
        const show = window.scrollY > 50;
        if (navRef.current !== show) {
          setNavScroll(show);
        }
      };
      document.addEventListener("scroll", handleScroll);
      return () => {
        document.removeEventListener("scroll", handleScroll);
      };
    } else {
      setNavScroll("show");
    }
  }, []);
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const router = useRouter();

  return (
    <>
      <nav
        className={`relative flex min-h-[85px] flex-wrap items-center justify-between px-2 py-5 ${
          navScroll || router.pathname !== "/"
            ? "bg-elevation-100"
            : "bg-elevation-100 lg:bg-transparent"
        } mb-3 transition-all ease-in-out duration-300`}
      >
        <div className="container px-2 xl:px-5">
          <div className="flex flex-row items-center justify-between ">
            <button
              className="lg:hidden text-white hover:opacity-75 absolute top-7 left-7"
              onClick={() => {
                setNavbarOpen(!navbarOpen);
              }}
            >
              <GiHamburgerMenu size={30} />
            </button>
            <div
              className={`${
                navbarOpen ? "flex" : "hidden lg:flex"
              } lg:flex-row flex-col items-center mt-[60px] lg:mt-0`}
            >
              <div className="hidden lg:flex">
                <Link href="/">
                  <img
                    className="mr-6 xl:mr-10"
                    alt="OWSR"
                    src="/images/logo.png"
                    style={{ height: 50 }}
                  />
                </Link>
              </div>
              <ul
                className={`${
                  navbarOpen ? "flex" : "hidden lg:flex"
                }  flex-col lg:flex-row lg:items-center uppercase`}
              >
                <li
                  className={`my-1 ${
                    router.pathname === "/" ? "text-red-700 font-lg mx-2 border-bottom" : "nav-li"
                  }`}
                >
                  <Link href="/">Home</Link>
                </li>
                <li
                  className={` my-1 ${
                    router.pathname.startsWith("/events")
                      ? "text-red-700 font-lg mx-2 border-bottom"
                      : "nav-li"
                  }`}
                >
                  <Link href="/events">Events</Link>
                </li>
                <li
                  className={` my-1 ${
                    router.pathname.startsWith("/championships")
                      ? "text-red-700 font-lg mx-2 border-bottom"
                      : "nav-li"
                  }`}
                >
                  <Link href="/championships">Championships</Link>
                </li>
                <li
                  className={` my-1 ${
                    router.pathname.startsWith("/results")
                      ? "text-red-700 font-lg mx-2 border-bottom"
                      : "nav-li"
                  }`}
                >
                  <Link href="/results">Results</Link>
                </li>
                <li
                  className={` my-1 ${
                    router.pathname.startsWith("/about")
                      ? "text-red-700 font-lg mx-2 border-bottom"
                      : "nav-li"
                  }`}
                >
                  <Link href="/about">About</Link>
                </li>
                <button
                  className="lg:hidden  my-4 mx-2 text-red-700 px-4 py-3 uppercase rounded-md border border-red-700 hover:border-red-700 hover:text-white hover:bg-red-500/[0.5]"
                  onClick={() => {
                    showSignIn(router);
                  }}
                >
                  Sign In
                </button>
              </ul>
            </div>
            <div className="flex flex-row items-center">
              <ul className="hidden lg:flex flex-row items-center mr-4">
                <li className="text-white p-2 xl:p-3 opacity-75 hover:bg-discord-200 hover:opacity-100">
                  <a>
                    <FaDiscord size="25px" />
                  </a>
                </li>
                <li className="text-white  p-2 xl:p-3 opacity-75 hover:bg-youtube hover:opacity-100">
                  <a>
                    <FaYoutube size="25px" />
                  </a>
                </li>
                <li className="text-white p-2 xl:p-3 opacity-75 hover:bg-twitch hover:opacity-100">
                  <a>
                    <FaTwitch size="21px" />
                  </a>
                </li>
                <li className="text-white p-2 xl:p-3 opacity-75 hover:bg-facebook hover:opacity-100 ">
                  <a>
                    <FaFacebook size="21px" />
                  </a>
                </li>
              </ul>
              <button
                className="hidden lg:inline-block text-red-700 px-4 py-3 uppercase rounded-md border border-red-700 hover:border-red-700 hover:text-white hover:bg-red-500/[0.5]"
                onClick={() => {
                  showSignIn(router);
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
