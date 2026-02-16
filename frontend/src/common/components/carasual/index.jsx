"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/utils";

export default function BaseCarousel({
  children,
  className,
}) {
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const el = containerRef.current;
      console.log(el.scrollWidth , el.clientWidth)
      if (!el) return;

      setIsOverflowing(el.scrollWidth > el.clientWidth);
    };

    checkOverflow();

  }, [children]);

  



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
        <p>
            is overflowing
        </p>
        </>
      )}
    </div>
  );
}
