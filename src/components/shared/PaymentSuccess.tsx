"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

type ConfettiPiece = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  delay: number;
  drift: number;
  duration: number;
};

const generateConfetti = (): ConfettiPiece[] => {
  const confettiCount = 100;
  const colors = ["#ad2b08", "#262621", "#ffb31f"];

  return Array.from({ length: confettiCount }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10 - Math.random() * 100,
    rotation: Math.random() * 360,
    scale: 0.5 + Math.random() * 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 0.5,
    drift: Math.random() * 10 - 5,
    duration: 3 + Math.random() * 4,
  }));
};

const PaymentSuccess = () => {
  const router = useRouter();

  // Random confetti is created after mount: random values during the server render would differ
  // from the browser's and cause a hydration mismatch.
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  useEffect(() => {
    setConfetti(generateConfetti());
  }, []);

  const handleTrackOrder = () => {
    router.push("/");
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
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
        ease: "easeOut" as const,
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
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div className="min-h-[80vh] bg-[#FFFFFF] flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {confetti.map((piece) => (
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
              x: `${piece.x + piece.drift}%`,
              rotate: piece.rotation,
              opacity: 0,
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: [0.1, 0.4, 0.6, 1],
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg overflow-hidden border border-base-color/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center p-8 sm:p-10">
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
                stroke="#ad2b08"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={checkVariants}
              />
            </svg>
          </motion.div>

          {/* Title and Subtitle */}
          <motion.h1
            className="text-2xl sm:text-3xl font-bold tracking-tight text-secondary-color mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {/* Payment Successful! */}
            Platba bola úspešná!
          </motion.h1>

          {/* Action Buttons */}
          <div className="w-full mt-8 space-y-4">
            <motion.button
              className="w-full py-3.5 px-6 bg-secondary-color hover:bg-secondary-color/90 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              onClick={handleTrackOrder}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.3 }}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span>{/* Continue */} Pokračovať</span>
              <FaArrowRight size={16} />
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
          <a href="mailto:cvak@frafol.sk" className="font-semibold text-secondary-color hover:underline">
            cvak@frafol.sk
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
