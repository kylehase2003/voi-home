import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const CustomCursor = () => {
  const isMobile = useIsMobile();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Don't set up listeners on mobile
    if (isMobile) return;

    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorType = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // When hovering an iframe (e.g. Google Maps), mouse events stop firing once the cursor
      // enters the iframe document, so our custom cursor "freezes".
      // Hide custom cursor there and let the native cursor show.
      const hoveringIframe = target?.tagName === "IFRAME" || target?.closest("iframe") !== null;
      setIsHidden(hoveringIframe);

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "LABEL" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest("[role=\"button\"]") !== null ||
        target.hasAttribute("onclick") ||
        target.style.cursor === "pointer";

      setIsPointer(isClickable);
    };

    window.addEventListener("mousemove", updateCursorPosition);
    window.addEventListener("mouseover", updateCursorType);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      window.removeEventListener("mouseover", updateCursorType);
    };
  }, [isMobile]);

  // Don't render on mobile devices
  if (isMobile || isHidden) {
    return null;
  }

  return (
    <>
      {/* Outer circle */}
      <div
        className="custom-cursor-circle pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <div className="w-8 h-8 border-2 border-gold rounded-full" />
      </div>

      {/* Inner dot */}
      <div
        className="custom-cursor-dot pointer-events-none fixed z-[9999]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-1.5 h-1.5 bg-gold rounded-full" />
      </div>
    </>
  );
};

export default CustomCursor;

