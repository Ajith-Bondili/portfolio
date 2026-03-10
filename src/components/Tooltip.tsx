import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number; placeBelow: boolean }>({
    top: 0,
    left: 0,
    placeBelow: false,
  });
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const spaceAbove = rect.top;
    const placeBelow = spaceAbove < 48;
    const gap = 8;

    setPosition({
      top: placeBelow ? rect.bottom + gap : rect.top - gap,
      left: rect.left + rect.width / 2,
      placeBelow,
    });
  }, []);

  // Auto-hide tooltip on mobile after a delay
  useEffect(() => {
    if (isHovered) {
      const timer = setTimeout(() => {
        setIsHovered(false);
      }, 3000); // Hide after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isHovered]);

  useEffect(() => {
    if (!isHovered) return;

    updatePosition();

    const onViewportChange = () => updatePosition();
    window.addEventListener("resize", onViewportChange);
    window.addEventListener("scroll", onViewportChange, true);

    return () => {
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("scroll", onViewportChange, true);
    };
  }, [isHovered, updatePosition]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    // Small delay to allow the tooltip to be seen
    setTimeout(() => setIsHovered(false), 2000);
  };

  // Hide tooltip when clicking/tapping outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsHovered(false);
    };

    if (isHovered) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isHovered]);

  return (
    <div
      ref={triggerRef}
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
      {isHovered && (
        createPortal(
          <div
            className={`app-tooltip ${position.placeBelow ? "app-tooltip-below" : "app-tooltip-above"}`}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {text}
          </div>,
          document.body,
        )
      )}
    </div>
  );
};

export default Tooltip;
