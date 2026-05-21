import { motion, useReducedMotion } from 'framer-motion';
import { ease, staggerContainer, viewport } from '../motion/presets';

const lineVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

export default function MotionSectionHead({
  className = 'section-head',
  eyebrow,
  title,
  subtitle,
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {title && <h2>{title}</h2>}
        {subtitle && <p className="section-sub">{subtitle}</p>}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.14, 0.04)}
    >
      {eyebrow && (
        <motion.p className="eyebrow" variants={lineVariant}>
          {eyebrow}
        </motion.p>
      )}
      {title && (
        <motion.h2 variants={lineVariant}>{title}</motion.h2>
      )}
      {subtitle && (
        <motion.p className="section-sub" variants={lineVariant}>
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
