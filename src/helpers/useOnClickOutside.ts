import { useEffect } from "react";

export function useOnClickOutside(
  excludingRef: React.MutableRefObject<any>,
  action: () => void,
): void {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (excludingRef.current && !excludingRef.current.contains(e.target)) {
        action();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [excludingRef, action]);
}
