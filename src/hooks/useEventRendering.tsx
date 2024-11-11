import { useState, useLayoutEffect } from 'react';

const PADDING_CONTAINER = 8;
const BORDER_CONTAINER = 2;
const DAY_NAME_HEIGHT = 16;
const DAY_NUMBER_HEIGHT = 24 + 4;
const EVENT_HEIGHT = 32;
const MORE_BUTTON_HEIGHT = 16;

export function useEventRendering(dayRef: React.RefObject<HTMLDivElement>) {
  const [renderLimits, setRenderLimits] = useState({
    normal: 0,
    header: 0,
    withButton: 0,
    headerWithButton: 0
  });

  useLayoutEffect(() => {
    function calculateFittingEvents() {
      if (!dayRef.current) return;
      const height = dayRef.current.clientHeight;

      const availableSpaceForEvents =
        height - BORDER_CONTAINER - PADDING_CONTAINER - DAY_NUMBER_HEIGHT;

      setRenderLimits({
        normal: Math.floor(availableSpaceForEvents / EVENT_HEIGHT),
        header: Math.floor((availableSpaceForEvents - DAY_NAME_HEIGHT) / EVENT_HEIGHT),
        withButton: Math.floor((availableSpaceForEvents - MORE_BUTTON_HEIGHT) / EVENT_HEIGHT),
        headerWithButton: Math.floor(
          (availableSpaceForEvents - MORE_BUTTON_HEIGHT - DAY_NAME_HEIGHT) / EVENT_HEIGHT
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
  }, []);

  return renderLimits;
} 