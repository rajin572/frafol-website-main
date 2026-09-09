"use client";

import Container from "@/components/ui/Container";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "NOTHING WAS FOUND";

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const typeSpeed = isDeleting ? 50 : 120;
    const pauseComplete = 1500;

    if (!isDeleting && currentIndex < fullText.length) {
      timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);
      }, typeSpeed);
    } else if (!isDeleting && currentIndex === fullText.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseComplete);
    } else if (isDeleting && currentIndex > 0) {
      timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex - 1));
        setCurrentIndex((prev) => prev - 1);
      }, typeSpeed);
    } else if (isDeleting && currentIndex === 0) {
      timer = setTimeout(() => {
        setIsDeleting(false);
      }, pauseComplete);
    }

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, fullText]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatingElements = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="relative flex justify-center items-center flex-col text-center min-h-screen m-auto text-base-color bg-gradient-to-r from-gray-200 via-white to-gray-100 overflow-hidden">
      {floatingElements.map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-3 h-3 bg-secondary-color/8 rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, Math.random() * 15 - 7.5, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      <Container>
        <motion.div
          className="flex flex-col justify-center items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="relative" variants={itemVariants}>
            <motion.h1
              className="text-[150px] font-extrabold text-secondary-color tracking-widest"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              404
            </motion.h1>

            <motion.div
              className="bg-primary-color border border-secondary-color text-secondary-color px-2 text-sm rounded absolute"
              style={{ top: "75%", left: "45%" }}
              animate={{
                rotate: [12, 14, 12],
                x: [-50, -48, -50],
                y: [-50, -52, -50],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              Page Not Found
            </motion.div>
          </motion.div>

          <motion.h3
            className="text-xl md:text-2xl lg:text-3xl mb-5 font-bold min-h-[2.5rem] flex items-center justify-center"
            variants={itemVariants}
          >
            <motion.span
              className="text-secondary-color inline-block mr-2"
              animate={{
                rotateX: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut",
              }}
            >
              OOPS!
            </motion.span>
            <span className="inline-block relative">
              <motion.span
                key={displayText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
              >
                {displayText}
              </motion.span>
              <motion.span
                className="inline-block w-0.5 h-6 bg-secondary-color ml-1 absolute"
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </span>
          </motion.h3>

          <motion.p
            className="text-base lg:text-xl font-semibold"
            variants={itemVariants}
            animate={{ scale: [0.9, 1] }}
            transition={{ duration: 5, ease: "easeInOut" }}
          >
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </motion.p>

          <motion.div className="mt-5" variants={itemVariants}>
            <Link href="/">
              <motion.button
                type="button"
                whileHover={{
                  scale: 1.03,
                  y: -2,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileTap={{
                  scale: 0.97,
                  y: 0,
                  transition: { duration: 0.1 },
                }}
                className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-lg group hover:text-primary-color cursor-pointer"
              >
                <motion.span
                  className="absolute w-0 group-hover:w-full h-full bg-secondary-color rounded-lg -z-10 left-0 top-0 transition-all duration-700 ease-in-out"
                  layoutId="bg"
                />
                Back To Home
                <svg
                  className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                  viewBox="0 0 16 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    className="fill-gray-800 group-hover:fill-gray-800"
                  ></path>
                </svg>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-20 w-6 h-6 border-2 border-secondary-color/20 rounded-full"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{
          rotate: { duration: 12, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-4 h-4 bg-secondary-color/15 rounded-full"
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-10 w-8 h-0.5 bg-secondary-color/15 rounded"
        animate={{ scaleX: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default NotFoundPage;
