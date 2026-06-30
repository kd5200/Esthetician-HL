import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import BookLink from "./BookLink";

const STORAGE_KEY = "hl-promo-dismissed";

export const PROMO = {
  tag: "New Client Offer",
  title: "First-time clients receive a complimentary customized facial",
  body: "In exchange for content creation — share your experience and help others discover the value of professional, clinical skincare.",
};

export default function PromoModal() {
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);

  const dismiss = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = window.setTimeout(() => setOpen(true), reduceMotion ? 0 : 900);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, dismiss]);

  const backdropMotion = reduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.25 },
      };

  const panelMotion = reduceMotion
    ? { initial: false, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 24, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 16, scale: 0.98 },
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <AnimatePresence>
      {open ? (
        <div className="promo-modal-root">
          <motion.button
            type="button"
            className="promo-modal-backdrop"
            aria-label="Close offer"
            onClick={dismiss}
            {...backdropMotion}
          />
          <motion.div
            ref={dialogRef}
            className="promo-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            tabIndex={-1}
            {...panelMotion}
          >
            <button
              type="button"
              className="promo-modal-close"
              aria-label="Close"
              onClick={dismiss}
            >
              ×
            </button>
            <p className="promo-tag">{PROMO.tag}</p>
            <h2 id={titleId}>{PROMO.title}</h2>
            <p id={descId}>{PROMO.body}</p>
            <div className="promo-modal-actions">
              <BookLink className="btn btn-primary" onClick={dismiss}>
                Book Your Visit
              </BookLink>
              <button type="button" className="btn btn-outline" onClick={dismiss}>
                Maybe later
              </button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
