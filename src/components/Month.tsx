import { useEffect, useRef, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isBefore,
  isToday,
  differenceInDays,
} from "date-fns";
import Events from "./Events";
import { useEvents } from "../contexts/EventContext";
import { useUI } from "../contexts/UIContext";
import MoreEventsButton from "./MoreEventsButton";

// Constants for size-calculation of day-cell for dynamic "+X More" button
const PADDING_CONTAINER = 8;
const DAY_NUMBER_HEIGHT = 24;
const EVENT_HEIGHT = 32;
const MORE_BUTTON_HEIGHT = 16;

export function Month({ currentMonth }: { currentMonth: Date }) {
  // Get days of the month
  const today = new Date();
  const startDate = startOfMonth(currentMonth);
  const endDate = endOfMonth(currentMonth);
  const startGrid = startOfWeek(startDate);
  const endGrid = endOfWeek(endDate);

  const days = [];
  let day = startGrid;
  while (day <= endGrid) {
    days.push(day);
    day = addDays(day, 1);
  }

  // Calculate number of weeks to display
  const start = startOfWeek(startOfMonth(currentMonth));
  const end = endOfWeek(endOfMonth(currentMonth));
  const totalDays = differenceInDays(end, start);
  const weeks = Math.ceil(totalDays / 7);

  const {
    setSelectedDate,
    setIsAddEventModalOpen,
    SetAmountEventsToRender,
    SetAmountEventsToRenderForHeader,
    SetAmountEventsToRenderIfButtonVisible,
    SetAmountEventsToRenderIfButtonVisibleForHeader,
  } = useUI(); // Get these from context
  const { events } = useEvents();

  // Create a ref for each day cell
  const dayDivRefs = useRef<Array<HTMLDivElement | null>>([]);

  const calculateFittingEvents = () => {
    if (dayDivRefs.current[0]?.clientHeight === undefined) return;
    const height = dayDivRefs.current[0]?.clientHeight;

    const availableSpaceForEvents =
      height - PADDING_CONTAINER - DAY_NUMBER_HEIGHT;
    SetAmountEventsToRender(Math.floor(availableSpaceForEvents / EVENT_HEIGHT));
    SetAmountEventsToRenderForHeader(
      Math.floor((availableSpaceForEvents - 16) / EVENT_HEIGHT),
    );
    SetAmountEventsToRenderIfButtonVisible(
      Math.floor((availableSpaceForEvents - MORE_BUTTON_HEIGHT) / EVENT_HEIGHT),
    );
    SetAmountEventsToRenderIfButtonVisibleForHeader(
      Math.floor(
        (availableSpaceForEvents - MORE_BUTTON_HEIGHT - 16) / EVENT_HEIGHT,
      ),
    );
  };

  // Check on mount, on events change, and on window resize
  useEffect(() => {
    calculateFittingEvents();

    window.addEventListener("resize", calculateFittingEvents); // Add resize listener

    return () => {
      window.removeEventListener("resize", calculateFittingEvents); // Cleanup listener
    };
  }, [events]);

  // EXPORT TO OWN COMPONENT
  const handleAddEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    const date = event.currentTarget.parentElement?.getAttribute("data-date");
    if (date) {
      setSelectedDate(date); // Use context instead of props
      setIsAddEventModalOpen(true); // Use context instead of props
    }
  };

  return (
    <main className="flex flex-1 flex-col p-4">
      <div className="grid flex-1 auto-rows-fr grid-cols-7">
        {days.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isInPast = isBefore(day, today) && !isToday(day);

          const backgroundClass = isCurrentMonth
            ? "bg-white"
            : "bg-custom-grey";
          const opacityClass = isInPast ? "opacity-50" : "opacity-100";
          const todayHighlightClass = isToday(day)
            ? "bg-todays-day m-auto h-6 w-6 rounded-full text-white flex justify-center items-center"
            : "m-auto h-6 w-6 flex justify-center items-center";

          const dayISO = format(day, "yyyy-MM-dd");
          const eventsForDay = events[dayISO];

          return (
            <div
              ref={(el) => (dayDivRefs.current[index] = el)} // Assign a unique ref for each cell
              key={index}
              className={`group relative flex flex-col items-center border p-1 text-center ${backgroundClass} ${opacityClass} overflow-hidden`}
              style={{ height: `calc((100vh - 98px) / ${weeks})` }}
              data-date={dayISO}
            >
              <DayName index={index} day={day} />
              <AddEventButton handleAddEvent={handleAddEvent} />
              <DayNumber todayHighlightClass={todayHighlightClass} day={day} />

              {eventsForDay && (
                <Events eventsForDay={eventsForDay} isHeaderCell={index <= 6} />
              )}
              {/* Dynamic spacer between events and more-events-button */}
              <div className="flex-1"></div>
              {eventsForDay && (
                <MoreEventsButton
                  eventsForDay={eventsForDay}
                  isHeaderCell={index <= 6}
                />
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}

function DayName({ index, day }: { index: number; day: Date }) {
  return (
    <div className="text-week-name text-xs">
      {index <= 6 && format(day, "EEE").toUpperCase()}
    </div>
  );
}

function DayNumber({
  todayHighlightClass,
  day,
}: {
  todayHighlightClass:
    | "bg-todays-day m-auto h-6 w-6 rounded-full text-white flex justify-center items-center"
    | "m-auto h-6 w-6 flex justify-center items-center";
  day: Date;
}) {
  return (
    <div className={`mb-1 ${todayHighlightClass} text-sm`}>
      {format(day, "d")}
    </div>
  );
}

// EXPORT TO OWN COMPONENT
function AddEventButton({
  handleAddEvent,
}: {
  handleAddEvent: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      onClick={handleAddEvent}
      className="hover:bg-today-button-bg-hover absolute right-0 top-0 m-1 hidden h-5 w-5 items-center justify-center rounded-full group-hover:flex"
    >
      +
    </button>
  );
}
