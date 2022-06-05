import Head from "next/head";
import Image from "next/image";
import dbConnect from "../lib/db/dbConnect";
import Event from "../lib/models/Event";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { FaDiscord, FaYoutube, FaTwitch, FaFacebook } from "react-icons/fa";
import GetStartedSection from "../components/GetStartedSection";
import EventsCarousel from "../components/EventsCarousel";
import { showSignIn, showSignUp } from "../lib/util/navigateModal";
export default function Home({ events }) {
  const router = useRouter();
  const ready = router.ready;
  useEffect(() => {
    if (ready) {
      console.log(router.query);
    }
  }, [ready]);
  return (
    <div
      className="w-full flex flex-col bg-fixed bg-cover"
      style={{ backgroundImage: "url(/images/bg.jpg)" }}
    >
      <Hero />
      <section className="flex bg-dark-200">
        <GetStartedSection />
      </section>
      <section className="flex flex-col bg-transparent w-full h-[500px]">
        <h1 className="text-center">About</h1>
      </section>
      <section className="bg-dark-300 flex">
        <EventsCarousel events={events} />
      </section>
    </div>
  );
}

function Hero() {
  return (
    <div
      className="w-full flex justify-center min-h-screen items-around relative "
      style={{
        backgroundImage: "url(/images/hero.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="pt-[75px] flex-col justify-center flex items-center">
        <h1 className="text-white text-center text-light text-xl sm:text-2xl md:text-4xl">
          OPEN WHEEL SIM RACING
        </h1>
        <h1 className="text-white text-center text-4xl sm:text-6xl lg:text-9xl my-5">
          Prove Your Pace.
        </h1>
        <p className="text-center text-white md:text-lg my-5">
          Competetive online open wheel racing events and championships for
          Assetto Corsa, iRacing, and more!
        </p>
        <div className="flex flex-col justify-center my-5">
          <button
            onClick={() => {
              showSignUp(router);
            }}
            className="md:px-5 px-4 md:py-4 py-3 text-lg flex flex-row items-center justify-center text-white text-center my-3 bg-red-700 hover:bg-red-500 rounded-md "
          >
            Go Racing!
          </button>
          <button className="px-4 py-3 text-lg flex flex-row items-center my-3 mx-5 text-white bg-discord-200 hover:bg-discord-100 rounded-md">
            <FaDiscord className="mr-2" />
            Join the Discord
          </button>
        </div>
        <div className="h-20" />
        <div className="flex flex-col md:flex-row ">
          <div className="w-[300px] mx-3 flex justify-center items-center">
            <img
              className="opacity-75 w-full h-auto block"
              src="/images/AC-logo.png"
            />
          </div>
          <div className="w-[300px] mx-3 flex justify-center items-center">
            <img
              className="opacity-75 w-full h-auto block"
              src="/images/iracing_top-01.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  // Fetch data from external API
  try {
    const events = await Event.find().lean();
    if (events) {
      return { props: { events: JSON.parse(JSON.stringify(events)) } };
    } else {
      return { props: { events: [] } };
    }
  } catch (error) {
    throw new Error(error.message);
  }

  // Pass data to the page via props
}
