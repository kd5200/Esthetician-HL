import { motion, useReducedMotion } from 'framer-motion';
import { ease, fadeDown, fadeLeft, fadeRight, fadeUp, scaleIn, viewport } from '../motion/presets';

const variants = {
  up: fadeUp,
  down: fadeDown,
  left: fadeLeft,
  right: fadeRight,
  scale: scaleIn,
};

export default function MotionReveal({
  children,
  className,
  as = motion.div,
  variant = 'up',
  delay = 0,
  once = true,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const Component = as;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const selected = variants[variant] || fadeUp;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewport, once }}
      variants={{
        hidden: selected.hidden,
        visible: {
          ...selected.visible,
          transition: {
            ...selected.visible.transition,
            delay,
          },
        },
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
