import { motion, useReducedMotion } from 'framer-motion';
import { cardHover, ease, fadeUp, staggerContainer, viewport } from '../motion/presets';

export default function MotionStagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.06,
  once = true,
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewport, once }}
      variants={staggerContainer(stagger, delayChildren)}
    >
      {children}
    </motion.div>
  );
}

export function MotionCard({ children, className }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      whileHover={{
        y: cardHover.hover.y,
        borderColor: 'rgba(232, 213, 196, 0.9)',
      }}
      transition={{ duration: 0.35, ease }}
    >
      {children}
    </motion.div>
  );
}

export function MotionLine({ children, className, as: Component = 'div' }) {
  const reduceMotion = useReducedMotion();

  const motionTags = {
    div: motion.div,
    p: motion.p,
    h2: motion.h2,
    h3: motion.h3,
    ul: motion.ul,
  };
  const MotionTag = motionTags[Component] || motion.div;

  if (reduceMotion) {
    const Tag = Component;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={fadeUp}>
      {children}
    </MotionTag>
  );
}
