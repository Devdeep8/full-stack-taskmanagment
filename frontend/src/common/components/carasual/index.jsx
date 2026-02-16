"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/utils";

export default function BaseCarousel({
  children,
  className,
  slideAmount = 300,
}) {
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const el = containerRef.current;
      if (!el) return;

      setIsOverflowing(el.scrollWidth > el.clientWidth);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [children]);

  const scrollNext = () => {
    containerRef.current.scrollBy({
      left: slideAmount,
      behavior: "smooth",
    });
  };

  const scrollPrev = () => {
    containerRef.current.scrollBy({
      left: -slideAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={cn("relative ", className)}>
      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="flex gap-4 carousel overflow-x-auto  scroll-smooth "
      >
        {children}
      </div>

      {/* Buttons only if overflow */}
      {isOverflowing && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
          >
            ‹
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
