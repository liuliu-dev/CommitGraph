import { useEffect } from "react";

export function useOnClickOutside(
  excludingRef: React.MutableRefObject<HTMLElement | null>,
  action: () => void,
): void {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        excludingRef.current &&
        !excludingRef.current.contains(e.target as Node)
      ) {
        action();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [excludingRef, action]);
}
