export const ease = [0.22, 1, 0.36, 1];

export const viewport = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -80px 0px',
};

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease },
  },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0.06) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const cardHover = {
  rest: { y: 0, boxShadow: '0 4px 24px rgba(43, 35, 32, 0.06)' },
  hover: {
    y: -8,
    boxShadow: '0 16px 40px rgba(43, 35, 32, 0.12)',
    transition: { duration: 0.35, ease },
  },
};
