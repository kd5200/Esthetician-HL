import { useState } from "react";

/** Image with automatic fallback if the primary asset is missing. */
export default function Photo({ src, fallback, alt, className, loading = "lazy", style }) {
  const [current, setCurrent] = useState(src || fallback);

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      decoding="async"
      onError={() => {
        if (fallback && current !== fallback) setCurrent(fallback);
      }}
    />
  );
}
