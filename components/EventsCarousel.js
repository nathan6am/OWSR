import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
export default function EventsCarousel({ events }) {
  const animation = useAnimation();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      animation.start("show");
    }
    if (!inView) {
      animation.start("hidden");
    }
  }, [inView]);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.3,
      },
    },
  };
  const child = {
    hidden: {
      x: "-5rem",
      opacity: 0,
      transition: {
        type: "spring",
        duration: 0.2,
      },
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        bounce: 0.2,
      },
    },
  };
  const header = {
    hidden: {
      y: "1rem",
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        bounce: 0.2,
        delay: 0.3,
      },
    },
  };
  return (
    <div className="container py-10">
      <h1 className="text-center">Events</h1>

      <div ref={ref} className="flex flex-col justify-center items-center">
        <motion.ol
          variants={container}
          animate={animation}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 w-full pt-10 "
        >
          {events.slice(0, 3).map((event, idx) => {
            return (
              <motion.li
                key={idx}
                id={event._id}
                variants={child}
                className="flex"
              >
                <EventCard event={event} />
              </motion.li>
            );
          })}
        </motion.ol>
        <Link href="/events">
          <button className="px-10 py-4 my-10 w-[180px] text-lg flex flex-row items-center justify-center text-white text-center my-3 bg-red-700 hover:bg-red-500 rounded-md w-200">
            See More
          </button>
        </Link>
      </div>
    </div>
  );
}
