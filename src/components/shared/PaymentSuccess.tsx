"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

const PaymentSuccess = () => {
  const router = useRouter();

  const generateConfetti = () => {
    const confettiCount = 100;
    const colors = ["#ad2b08 ", "#262621", "#ffb31f"];

    return Array.from({ length: confettiCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 100,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
    }));
  };

  const handleTrackOrder = () => {
    router.push("/");
  };

  const buttonVariants = {
    hover: {
      scale: 1.03,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.97,
      transition: { duration: 0.1 },
    },
  };

  const circleVariants = {
    hidden: {
      scale: 0,
    },
    visible: {
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const checkVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center p-4 sm:p-6 ">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {generateConfetti().map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-2 h-8"
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              backgroundColor: piece.color,
              borderRadius: "1px",
              transformOrigin: "center",
            }}
            initial={{
              y: "-10vh",
              x: `${piece.x}%`,
              rotate: 0,
              opacity: 1,
              scale: piece.scale,
            }}
            animate={{
              y: "100vh",
              x: `${piece.x + (Math.random() * 10 - 5)}%`,
              rotate: piece.rotation,
              opacity: 0,
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              delay: piece.delay,
              ease: [0.1, 0.4, 0.6, 1],
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg overflow-hidden border border-secondary-color/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center p-8">
          {/* Success Checkmark */}
          <motion.div
            className="w-24 h-24 relative flex items-center justify-center"
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="absolute w-24 h-24 bg-secondary-color/10 rounded-full"
              variants={circleVariants}
            />
            <svg
              width="70"
              height="70"
              viewBox="0 0 70 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10"
            >
              <motion.path
                d="M20 35L30 45L50 25"
                stroke="#ad2b08 "
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={checkVariants}
              />
            </svg>
          </motion.div>

          {/* Title and Subtitle */}
          <motion.h1
            className="text-2xl sm:text-3xl font-semibold text-secondary-color mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {/* Payment Successful! */}
            Platba bola úspešná!
          </motion.h1>

          {/* Payment Details */}
          {/* <motion.div
            className="w-full mt-8 p-6 bg-secondary-color/5 rounded-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-medium text-secondary-color">
                Order Summary
              </h3>
              <div className="text-xl font-semibold text-secondary-color">
                {paymentData.amount}
              </div>
            </div>

            <div className="space-y-4">
              {detailItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: item.delay, duration: 0.3 }}
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div className="flex flex-col">
                    <span className="text-sm text-[#262621]">{item.label}</span>
                    <span className="text-sm font-medium text-secondary-color">
                      {item.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div> */}

          {/* Action Buttons */}
          <div className="w-full mt-8 space-y-4">
            <motion.button
              className="w-full py-3 px-6 bg-secondary-color hover:bg-secondary-color/90 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
              onClick={handleTrackOrder}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.3 }}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span>{/* Continue */} Pokračovať</span>
              <FaArrowRight size={18} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="mt-6 text-center text-sm text-[#262621]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <p>
          {/* Need help? Contact */} Potrebujete pomoc? Kontaktujte{" "}
          <span className="font-semibold text-secondary-color">
            cvak@frafol.sk
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
