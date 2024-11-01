import { useEffect, useRef, useState } from "react";

export function useHeaderHeight() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (headerRef.current) {
      // Get the CSS of the header element
      const style = window.getComputedStyle(headerRef.current);

      // Parse the margin values
      const marginTop = parseFloat(style.marginTop);
      const marginBottom = parseFloat(style.marginBottom);

      // Calculate the total height
      setHeaderHeight(
        headerRef.current.clientHeight + marginTop + marginBottom,
      );
    }
  });

  return { headerHeight, headerRef };
}
