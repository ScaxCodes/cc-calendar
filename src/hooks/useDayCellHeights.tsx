import { useEffect, useRef, useMemo } from "react";

type RefKeys = "dayName" | "dayNumber" | "event" | "moreButton" | "dayCell";

export function useDayCellHeights() {
  // Create refs first
  const dayNameRef = useRef(0);
  const dayNumberRef = useRef(0);
  const eventRef = useRef(0);
  const moreButtonRef = useRef(0);
  const dayCellPaddingAndBorderRef = useRef(0);

  const dayNameElementRef = useRef<HTMLDivElement | null>(null);
  const dayNumberElementRef = useRef<HTMLDivElement | null>(null);
  const eventElementRef = useRef<HTMLButtonElement | null>(null);
  const moreButtonElementRef = useRef<HTMLButtonElement | null>(null);
  const dayCellElementRef = useRef<HTMLDivElement>(null);

  // Then memoize the objects that contain them
  const heights = useMemo(() => ({
    dayName: dayNameRef,
    dayNumber: dayNumberRef,
    event: eventRef,
    moreButton: moreButtonRef,
    dayCellPaddingAndBorder: dayCellPaddingAndBorderRef,
  }), []);

  const refs = useMemo(() => ({
    dayName: dayNameElementRef,
    dayNumber: dayNumberElementRef,
    event: eventElementRef,
    moreButton: moreButtonElementRef,
    dayCell: dayCellElementRef,
  }), []);

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
  }, [
    refs.dayName.current?.clientHeight,
    refs.dayNumber.current?.clientHeight,
    refs.event.current?.clientHeight,
    refs.moreButton.current?.clientHeight,
    heights,
    refs
  ]);

  return { heights, refs };
}
