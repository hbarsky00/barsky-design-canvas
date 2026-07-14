import React, { useEffect, useRef, useState } from "react";

interface Win98WindowProps {
  title: string;
  icon?: React.ReactNode;
  onClose: () => void;
  initialX?: number;
  initialY?: number;
  width?: number;
  children: React.ReactNode;
  zIndex?: number;
  onFocus?: () => void;
}

/**
 * Reusable Win98-style draggable window. Uses the same raise/sunk bevel classes
 * defined inside Win98Hero (.win98 scope), so it must be rendered inside that scope.
 */
const Win98Window: React.FC<Win98WindowProps> = ({
  title,
  icon = "■",
  onClose,
  initialX = 80,
  initialY = 80,
  width = 320,
  children,
  zIndex = 50,
  onFocus,
}) => {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [minimized, setMinimized] = useState(false);
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  // Center on small screens
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 640) {
      setPos({ x: Math.max(8, (window.innerWidth - width) / 2), y: 60 });
    }
  }, [width]);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    onFocus?.();
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setPos({
      x: Math.max(0, e.clientX - drag.current.dx),
      y: Math.max(0, e.clientY - drag.current.dy),
    });
  };
  const onPointerUp = (e: React.PointerEvent) => {
    drag.current = null;
    try { (e.target as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
  };

  return (
    <div
      className="raise absolute"
      style={{ left: pos.x, top: pos.y, width, zIndex }}
      onMouseDown={onFocus}
    >
      <div
        className="flex items-center justify-between px-1 py-[3px] text-white text-xs font-bold select-none cursor-move"
        style={{ background: "#000080" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="flex items-center gap-1">
          <div className="raise-thin w-[14px] h-[14px] flex items-center justify-center text-[9px] text-black">
            {icon}
          </div>
          <span>{title}</span>
        </div>
        <div className="flex gap-[2px]">
          <button
            onClick={(e) => { e.stopPropagation(); setMinimized((v) => !v); }}
            className="raise w-4 h-[14px] flex items-center justify-center text-[9px] font-bold text-black leading-none"
            aria-label="Minimize"
          >_</button>
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className="raise w-4 h-[14px] flex items-center justify-center text-[9px] font-bold text-black leading-none"
            aria-label="Maximize"
          >□</button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="raise w-4 h-[14px] flex items-center justify-center text-[9px] font-bold text-black leading-none"
            aria-label="Close"
          >✕</button>
        </div>
      </div>
      {!minimized && <div className="p-2">{children}</div>}
    </div>
  );
};

export default Win98Window;
