"use client";

import { useState } from "react";
import { LuBookOpen } from "react-icons/lu";

interface BookCoverProps {
  src: string;
  alt: string;
  className?: string;
}

export default function BookCover({
  src,
  alt,
  className = "",
}: BookCoverProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-base-300 text-base-content/40 ${className}`}
      >
        <LuBookOpen className="h-10 w-10" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
