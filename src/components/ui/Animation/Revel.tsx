import React from "react";
import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";

interface RevelProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

const revelVariants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};
// const slideVarients = {
//   hidden: {
//     left: 0,
//   },
//   visible: {
//     left: "100%",
//   },
// };

const Revel: React.FC<RevelProps> = ({
  children,
  className,
  delay = 0,
  duration = 1,
}) => {
  return (
    <div className={cn("relative w-fit overflow-hidden", className)}>
      <motion.div
        variants={revelVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration, delay }}
        className="-z-10"
      >
        {children}
      </motion.div>
      {/* <motion.div
        variants={slideVarients}
        initial="hidden"
        whileInView={"visible"}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="absolute top-0 left-0 bottom-0 right-0 bg-[#00ffc8] z-20"
      /> */}
    </div>
  );
};

export default Revel;
