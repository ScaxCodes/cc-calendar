import { useEffect, useRef } from "react";

type RefKeys = "dayName" | "dayNumber" | "event" | "moreButton" | "dayCell";

export function useDayCellHeights() {
  const heights = {
    dayName: useRef(0),
    dayNumber: useRef(0),
    event: useRef(0),
    moreButton: useRef(0),
    dayCellPaddingAndBorder: useRef(0),
  };

  const refs = {
    dayName: useRef<HTMLDivElement | null>(null),
    dayNumber: useRef<HTMLDivElement | null>(null),
    event: useRef<HTMLButtonElement | null>(null),
    moreButton: useRef<HTMLButtonElement | null>(null),
    dayCell: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    (Object.keys(refs) as RefKeys[]).forEach((key) => {
      if (key === "dayCell") return; // Skip the "dayCell" array

      if (refs[key].current) {
        // Get the CSS of the element
        const style = window.getComputedStyle(refs[key].current);

        // Parse the margin values
        const marginTop = parseFloat(style.marginTop);
        const marginBottom = parseFloat(style.marginBottom);

        // Calculate the total height
        heights[key].current =
          refs[key].current.clientHeight + marginTop + marginBottom;
      }
    });

    if (refs.dayCell.current) {
      const style = window.getComputedStyle(refs.dayCell.current);

      const borderTop = parseFloat(style.borderTopWidth);
      const borderBottom = parseFloat(style.borderBottomWidth);
      const paddingTop = parseFloat(style.paddingTop);
      const paddingBottom = parseFloat(style.paddingBottom);

      heights.dayCellPaddingAndBorder.current =
        borderTop + borderBottom + paddingTop + paddingBottom;
    }
    console.log("Elements Heights: ", heights);
  }, [
    refs.dayName.current?.clientHeight,
    refs.dayNumber.current?.clientHeight,
    refs.event.current?.clientHeight,
    refs.moreButton.current?.clientHeight,
  ]);

  return { heights, refs };
}
