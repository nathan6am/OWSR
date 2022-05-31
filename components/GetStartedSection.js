import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BsFillPersonPlusFill, BsCalendarWeekFill } from "react-icons/bs";
import { GiSteeringWheel } from "react-icons/gi";
import { MdNavigateNext, MdKeyboardArrowDown } from "react-icons/md";
import { FaScroll, FaTrophy } from "react-icons/fa";
export default function GetStartedSection() {
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
      y: "3rem",
      opacity: 0,
      transition: {
        type: "spring",
        duration: 0,
      },
    },
    show: {
      y: 0,
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
      fontSize: "50px",
      transition: {
        type: "spring",
        duration: 0.8,
        bounce: 0.2,
        delay: 0.3,
      },
    },
  };
  const opacityOnly = {
    show: { opacity: 1, transition: { type: "ease-in-out", duration: 0.8 } },
    hidden: { opacity: 0 },
  };

  const animation = useAnimation();

  const { ref, inView } = useInView({ threshold: 0.1 });
  useEffect(() => {
    if (inView) {
      animation.start("show");
    }
    if (!inView) {
      animation.start("hidden");
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className=" w-screen px-3 md:px-5 xl:px-10 py-10 flex flex-col"
    >
      <motion.div
        variants={header}
        animate={animation}
        className="text-white text-2xl text-center "
      >
        <h1>Get Started</h1>
      </motion.div>
      <motion.ol
        variants={container}
        animate={animation}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 container mt-10"
      >
        <motion.li variants={child} className="flex-1 relative my-5">
          <MdNavigateNext
            size="40px"
            color="#ffffff"
            className="hidden md:block absolute ml-3 right-[-20px] top-[50%]"
          />
          <MdKeyboardArrowDown
            size="40px"
            color="#ffffff"
            className="md:hidden absolute ml-3 right-[50%] bottom-[-20px]"
          />
          <div className="flex flex-col p-5 w-full text-red-500 text-center justify-center items-center cursor-pointer group ">
            <BsFillPersonPlusFill
              size="90px"
              className="group-hover:scale-110 transition-all ease-in-out duration-[500]"
            />

            <p className="text-white text-left md:mx-5 lg:mx-10 my-3 group-hover:text-red-300">
              Sign Up and create your OWSR profile on our website and join the
              Discord server for more info, news, and support.
            </p>
          </div>
        </motion.li>
        <motion.li variants={child} className="flex-1 relative my-5">
          <MdNavigateNext
            size="40px"
            color="#ffffff"
            className="hidden xl:block absolute ml-3 right-[-20px] top-[50%]"
          />
          <MdKeyboardArrowDown
            size="40px"
            color="#ffffff"
            className="md:hidden absolute ml-3 right-[50%] bottom-[-20px]"
          />
          <div className="flex flex-col p-5 w-full text-red-500 text-center justify-center items-center ">
            <FaTrophy size="80px" />
            <p className="text-white text-left md:mx-5 lg:mx-10 my-3">
              Explore our weekly races, championship series, specials events,
              hotlap challenges, and more opened-wheeled racing action.
            </p>
          </div>
        </motion.li>
        <motion.li variants={child} className="flex-1 relative my-5">
          <MdNavigateNext
            size="40px"
            color="#ffffff"
            className="absolute hidden md:block ml-3 right-[-20px] top-[50%]"
          />
          <MdKeyboardArrowDown
            size="40px"
            color="#ffffff"
            className="md:hidden absolute ml-3 right-[50%] bottom-[-20px]"
          />
          <div className="flex flex-col p-5 w-full text-red-500 text-center justify-center items-center ">
            <FaScroll size="80px" />
            <p className="text-white text-left md:mx-5 lg:mx-10 my-3">
              Take a look at our rules and FAQs. OWSR's rules and moderation aim
              to provide competetive, clean, and fair racing
            </p>
          </div>
        </motion.li>
        <motion.li variants={child} className="flex-1 my-5">
          <div className="flex flex-col p-5 w-full text-red-500 text-center justify-center items-center ">
            <GiSteeringWheel size="80px" />
            <p className="text-white text-left md:mx-5 lg:mx-10 my-3">
              Take a look at our rules and FAQs. OWSR's rules and moderation aim
              to provide competetive, clean, and fair racing
            </p>
          </div>
        </motion.li>
      </motion.ol>
      <motion.div
        variants={opacityOnly}
        animate={animation}
        className="flex flex-col justify-center items-center"
      >
        <button className="px-10 py-4 text-lg flex flex-row items-center justify-center text-white text-center my-3 bg-red-700 hover:bg-red-500 rounded-md w-200">
          Join for Free
        </button>
      </motion.div>
    </div>
  );
}
