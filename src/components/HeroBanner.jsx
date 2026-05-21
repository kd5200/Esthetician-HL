import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

const CLIPS = [
  {
    src: '/videos/collage-glow.mp4',
    poster: '/images/hero-banner.jpg',
    label: 'Facial massage at the studio',
    objectPosition: 'center 30%',
  },
  {
    src: '/videos/collage-face-closeup.mp4',
    poster: '/images/hero-banner.jpg',
    label: 'Glowing skin close-up',
    objectPosition: 'center center',
  },
  {
    src: '/videos/collage-treatment.mp4',
    poster: '/images/hero-banner.jpg',
    label: 'Custom facial treatment',
    objectPosition: 'center 35%',
  },
  {
    src: '/videos/collage-relax.mp4',
    poster: '/images/hero-banner.jpg',
    label: 'Relaxing spa facial',
    objectPosition: 'center 40%',
  },
];

const SLIDE_DURATION_MS = 7000;
const panelEase = [0.22, 1, 0.36, 1];

const panelVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: panelEase,
      staggerChildren: 0.12,
      delayChildren: 0.35,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: panelEase },
  },
};

function CarouselSlide({ clip, isActive, reduceMotion }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion || !isActive) return;

    const play = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    if (video.readyState >= 2) {
      play();
    } else {
      video.addEventListener('loadeddata', play, { once: true });
    }

    return () => {
      video.pause();
    };
  }, [isActive, reduceMotion, clip.src]);

  return (
    <div className="hero-carousel__media">
      {reduceMotion ? (
        <img
          className="hero-carousel__poster"
          src={clip.poster}
          alt={clip.label}
          style={{ objectPosition: clip.objectPosition }}
        />
      ) : (
        <motion.video
          ref={videoRef}
          className="hero-carousel__video"
          muted
          loop
          playsInline
          preload={isActive ? 'auto' : 'metadata'}
          poster={clip.poster}
          aria-label={clip.label}
          style={{ objectPosition: clip.objectPosition }}
          animate={isActive ? { scale: [1, 1.06, 1] } : { scale: 1 }}
          transition={
            isActive
              ? { duration: SLIDE_DURATION_MS / 1000, ease: 'linear' }
              : undefined
          }
        >
          <source src={clip.src} type="video/mp4" />
        </motion.video>
      )}
    </div>
  );
}

export default function HeroBanner() {
  const reduceMotion = useReducedMotion();
  const bannerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start start', 'end start'],
  });
  const carouselY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const goTo = useCallback((index) => {
    setActiveIndex((index + CLIPS.length) % CLIPS.length);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % CLIPS.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + CLIPS.length) % CLIPS.length);
  }, []);

  useEffect(() => {
    if (reduceMotion || paused) return;

    const timer = window.setInterval(goNext, SLIDE_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [goNext, paused, reduceMotion]);

  useEffect(() => {
    const onVisibility = () => {
      setPaused(document.hidden);
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <section className="hero" id="top">
      <div
        className="hero-banner"
        ref={bannerRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          className="hero-carousel"
          style={reduceMotion ? undefined : { y: carouselY }}
          aria-live="polite"
          aria-roledescription="carousel"
          aria-label="Spa treatment highlights"
        >
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={CLIPS[activeIndex].src}
              className="hero-carousel__slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: panelEase }}
            >
              <CarouselSlide
                clip={CLIPS[activeIndex]}
                isActive
                reduceMotion={reduceMotion}
              />
            </motion.div>
          </AnimatePresence>

          {!reduceMotion && (
            <>
              <div className="hero-carousel__dots" role="tablist" aria-label="Choose slide">
                {CLIPS.map((clip, index) => (
                  <button
                    key={clip.src}
                    type="button"
                    role="tab"
                    className={`hero-carousel__dot${index === activeIndex ? ' is-active' : ''}`}
                    aria-label={`Show clip ${index + 1}: ${clip.label}`}
                    aria-selected={index === activeIndex}
                    onClick={() => goTo(index)}
                  />
                ))}
              </div>

              <div className="hero-carousel__arrows" aria-hidden="false">
                <button
                  type="button"
                  className="hero-carousel__arrow hero-carousel__arrow--prev"
                  aria-label="Previous clip"
                  onClick={goPrev}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="hero-carousel__arrow hero-carousel__arrow--next"
                  aria-label="Next clip"
                  onClick={goNext}
                >
                  ›
                </button>
              </div>
            </>
          )}
        </motion.div>

        <div className="hero-banner__overlay" aria-hidden="true" />

        <motion.div
          className="hero-panel"
          variants={panelVariants}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
        >
          <motion.p className="hero-welcome" variants={itemVariants}>
            Welcome to
          </motion.p>
          <motion.h1 variants={itemVariants}>
            Hey there, <em>glow-getter!</em>
          </motion.h1>
          <motion.p className="lede" variants={itemVariants}>
            We all have skin issues. Let&apos;s fix that. Personalized facials
            and skincare rituals designed around your skin, your goals, and the
            version of you that feels most confident.
          </motion.p>
          <motion.div variants={itemVariants}>
            <a href="#book" className="btn btn-hero">
              Book Your Service <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
