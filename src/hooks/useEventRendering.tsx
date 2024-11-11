import { useState, useLayoutEffect } from 'react';
import { RefObject } from 'react';

export function useEventRendering(
  dayRef: RefObject<HTMLDivElement>,
  heights: {
    dayName: RefObject<number>;
    dayNumber: RefObject<number>;
    event: RefObject<number>;
    moreButton: RefObject<number>;
    dayCellPaddingAndBorder: RefObject<number>;
  }
) {
  const [renderLimits, setRenderLimits] = useState({
    normal: 0,
    header: 0,
    withButton: 0,
    headerWithButton: 0
  });

  useLayoutEffect(() => {
    function calculateFittingEvents() {
      if (!dayRef.current) return;
      // Guard clause to check if any height refs are null
      if (
        heights.dayName.current == null ||
        heights.dayNumber.current == null ||
        heights.event.current == null ||
        heights.moreButton.current == null ||
        heights.dayCellPaddingAndBorder.current == null
      )
        return;
      
      const height = dayRef.current.clientHeight;

      const availableSpaceForEvents =
        height - heights.dayCellPaddingAndBorder.current - heights.dayNumber.current;

      setRenderLimits({
        normal: Math.floor(availableSpaceForEvents / heights.event.current),
        header: Math.floor((availableSpaceForEvents - heights.dayName.current) / heights.event.current),
        withButton: Math.floor((availableSpaceForEvents - heights.moreButton.current) / heights.event.current),
        headerWithButton: Math.floor(
          (availableSpaceForEvents - heights.moreButton.current - heights.dayName.current) / heights.event.current
        )
      });
    }

    // Initial calculation
    calculateFittingEvents();

    // Create ResizeObserver to watch for size changes
    const resizeObserver = new ResizeObserver(() => {
      calculateFittingEvents();
    });

    if (dayRef.current) {
      resizeObserver.observe(dayRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [heights.dayName.current, heights.dayNumber.current, heights.event.current, heights.moreButton.current, heights.dayCellPaddingAndBorder.current]);

  return renderLimits;
} 