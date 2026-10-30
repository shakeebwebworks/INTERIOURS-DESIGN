import { useState } from "react";

// Lazy-loaded image that shows a tidy placeholder if the file is missing.
// Give it a key={src} where the src can change, so the failed state resets.
export default function SmartImage({ src, alt, className = "", ...rest }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className={`img-placeholder ${className}`.trim()} role="img" aria-label={alt}>
        <i className="bi bi-image" aria-hidden="true" />
        <span>Project photo</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}