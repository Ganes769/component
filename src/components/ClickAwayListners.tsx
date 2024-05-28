import React, { useEffect, useRef, useCallback } from "react";

interface ClickAwayListenerProps {
  children: React.ReactNode;
  onClickAway: (event: Event) => void;
  onPositionChange: () => void;
}

const ClickAwayListener: React.FC<ClickAwayListenerProps> = ({
  children,
  onClickAway,
  onPositionChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: Event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClickAway(event);
      }
    },
    [onClickAway]
  );

  useEffect(() => {
    onPositionChange();
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return <div ref={containerRef}>{children}</div>;
};

export default ClickAwayListener;
