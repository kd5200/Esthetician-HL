/**
 * Asset paths — drop files into the folders below and update paths here.
 *
 * photos/     → images/photos/
 * services/   → images/photos/services/
 * videos/     → videos/
 */

export const ASSETS = {
  hero: {
    fallbackPoster: "/images/hero-banner.jpg",
    clips: [
      {
        src: "/videos/collage-glow.mp4",
        type: "video/mp4",
        poster: "/images/hero-banner.jpg",
        label: "Facial massage at the studio",
        objectPosition: "center 30%",
      },
      {
        src: "/videos/collage-face-closeup.mp4",
        type: "video/mp4",
        poster: "/images/hero-banner.jpg",
        label: "Glowing skin close-up",
        objectPosition: "center center",
      },
      {
        src: "/videos/collage-treatment.mp4",
        type: "video/mp4",
        poster: "/images/hero-banner.jpg",
        label: "Custom facial treatment",
        objectPosition: "center 35%",
      },
      {
        src: "/videos/collage-relax.mp4",
        type: "video/mp4",
        poster: "/images/hero-banner.jpg",
        label: "Relaxing spa facial",
        objectPosition: "center 40%",
      },
    ],
  },
  /** Hajime studio clips — portrait carousel in the about section */
  studio: {
    fallback: "/images/about.svg",
    clips: [
      {
        src: "/videos/01519bcaf4d84c3aaded60e074f0c29b.mov",
        type: "video/mp4",
        label: "Facial treatment",
        alt: "Facial treatment at Hajime Lente Skin Studio",
        objectPosition: "center center",
      },
      {
        src: "/videos/bbae932e045642e7becd1cfbfe6cba9d.mov",
        type: "video/mp4",
        label: "Skincare session",
        alt: "Skincare session at the studio",
        objectPosition: "center center",
      },
      {
        src: "/videos/94126bf612ec4916b80caf9d7947bd7f.mov",
        type: "video/mp4",
        label: "Treatment close-up",
        alt: "Treatment close-up",
        objectPosition: "center center",
      },
      {
        src: "/videos/2ee9194f58604ad6ae01bc60541d2dc7.mov",
        type: "video/mp4",
        label: "Studio treatment",
        alt: "Treatment at Hajime Lente Skin Studio",
        objectPosition: "center center",
      },
    ],
  },
  about: {
    src: "/images/photos/about.jpg",
    fallback: "/images/about.svg",
    alt: "Inside the Hajime Lente Skin Studio",
  },
  services: {
    signature: { src: "/images/photos/services/signature.jpg", fallback: "/images/service-signature.svg" },
    dermaplaning: { src: "/images/photos/services/dermaplaning.jpg", fallback: "/images/service-age.svg" },
    nanoNeedling: { src: "/images/photos/services/nano-needling.jpg", fallback: "/images/service-hydration.svg" },
    chemicalPeel: { src: "/images/photos/services/chemical-peel.jpg", fallback: "/images/service-acne.svg" },
    backFacial: { src: "/images/photos/services/back-facial.jpg", fallback: "/images/service-back.svg" },
  },
};

/** Use real photo when present; SVG placeholder until assets are added. */
export function assetSrc({ src, fallback }) {
  return src || fallback;
}
