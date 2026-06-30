import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Photo from "./Photo";

const SLIDE_DURATION_MS = 6000;

export default function StudioCarousel({ clips, fallback }) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef(null);
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index) => setActiveIndex((index + clips.length) % clips.length),
    [clips.length],
  );

  const goNext = useCallback(
    () => setActiveIndex((i) => (i + 1) % clips.length),
    [clips.length],
  );

  const goPrev = useCallback(
    () => setActiveIndex((i) => (i - 1 + clips.length) % clips.length),
    [clips.length],
  );

  const touchStartX = useRef(null);

  const onTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event) => {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX == null) return;

    const deltaX = (event.changedTouches[0]?.clientX ?? startX) - startX;
    if (Math.abs(deltaX) < 40) return;
    if (deltaX < 0) goNext();
    else goPrev();
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !visible || paused) return;
    const timer = window.setInterval(goNext, SLIDE_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [goNext, paused, reduceMotion, visible]);

  useEffect(() => {
    if (reduceMotion) return;

    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex && visible) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex, reduceMotion, visible]);

  if (reduceMotion) {
    const clip = clips[0];
    return (
      <Photo
        src={null}
        fallback={fallback}
        alt={clip?.alt ?? "Studio treatment"}
      />
    );
  }

  return (
    <div
      ref={rootRef}
      className="studio-carousel"
      aria-roledescription="carousel"
      aria-label="Studio treatment highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {clips.map((clip, index) => (
        <div
          key={clip.src}
          className={`studio-carousel__slide${index === activeIndex ? " is-active" : ""}`}
          aria-hidden={index !== activeIndex}
        >
          <video
            ref={(node) => {
              videoRefs.current[index] = node;
            }}
            src={clip.src}
            muted
            loop
            playsInline
            preload={index === activeIndex ? "auto" : "metadata"}
            aria-label={clip.alt}
            style={{ objectPosition: clip.objectPosition ?? "center center" }}
          >
            <source src={clip.src} type={clip.type || "video/mp4"} />
          </video>
        </div>
      ))}

      <div className="studio-carousel__dots" role="tablist" aria-label="Choose clip">
        {clips.map((clip, index) => (
          <button
            key={clip.src}
            type="button"
            role="tab"
            className={`studio-carousel__dot${index === activeIndex ? " is-active" : ""}`}
            aria-label={`Show clip ${index + 1}: ${clip.label || clip.alt}`}
            aria-selected={index === activeIndex}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
