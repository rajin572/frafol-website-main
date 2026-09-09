import * as motion from "motion/react-client";

const AnimatedUnderline = ({ className = "" }) => {
  return (
    <div>
      <motion.p
        className={`w-20 h-1 rounded-full bg-secondary-color ${className}`}
        initial={{ x: -25 }}
        animate={{ x: 25 }}
        transition={{
          delay: 1.5,
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      ></motion.p>
    </div>
  );
};

export default AnimatedUnderline;
