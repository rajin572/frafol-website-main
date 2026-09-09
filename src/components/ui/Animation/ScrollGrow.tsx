import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";

const useScrollGrow = () => {
  const componentRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: componentRef,
    offset: ["0 1", "1.2 1"],
  });

  const scaleValues = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacityValues = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  const style = {
    scale: scaleValues,
    opacity: opacityValues,
  };

  return { componentRef, style };
};

export default useScrollGrow;
