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
import { AddEventButton } from "./AddEventButton";
import { DayName } from "./DayName";
import { DayNumber } from "./DayNumber";
import { useEventRendering } from "../hooks/useEventRendering";
import { useDayCellHeights } from "../hooks/useDayCellHeights";


export function Month({
  currentMonth,
  headerHeight,
}: {
  currentMonth: Date;
  headerHeight: number;
}) {
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
    setSelectedEventId,
    setIsMoreEventsModalOpen,
  } = useUI();
  const { events } = useEvents();
  const { heights, refs } = useDayCellHeights(); // Use the custom hook

  // Create a ref for a single day cell to measure
  const renderLimits = useEventRendering(refs.dayCell);

  function handleAddEvent(event: React.MouseEvent<HTMLButtonElement>) {
    const date = event.currentTarget.parentElement?.getAttribute("data-date");
    if (date) {
      setSelectedDate(date);
    }
  }

  function handleEditEvent(
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) {
    const date = event.currentTarget.parentElement?.getAttribute("data-date");
    if (date) {
      setSelectedDate(date);
      setSelectedEventId(id);
    }
  }

  function handleOpenMoreEventsModal(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    const date = event.currentTarget.parentElement?.getAttribute("data-date");
    if (date) {
      setSelectedDate(date);
      setIsMoreEventsModalOpen(true);
    }
  }

  return (
    <main className="flex flex-1 flex-col">
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
              ref={index === 0 ? refs.dayCell : null} // Only need to measure one cell
              key={index}
              className={`group relative flex flex-col items-center border p-1 text-center ${backgroundClass} ${opacityClass} min-h-[100px] overflow-hidden`}
              style={{
                height: `calc((100vh - ${headerHeight}px) / ${weeks})`,
              }}
              data-date={dayISO}
            >
              <DayName index={index} day={day} dayNameRef={refs.dayName} />
              <AddEventButton onClick={handleAddEvent} />
              <DayNumber todayHighlightClass={todayHighlightClass} day={day} dayNumberRef={refs.dayNumber} />
              {eventsForDay && (
                <Events
                  eventsForDay={eventsForDay}
                  isHeaderCell={index <= 6}
                  onClick={handleEditEvent}
                  renderLimits={renderLimits}
                  eventRef={refs.event}
                />
              )}
              {/* Dynamic-growing-spacer between events and more-events-button */}
              <div className="flex-1"></div>
              {eventsForDay && (
                <MoreEventsButton
                  eventsForDay={eventsForDay}
                  isHeaderCell={index <= 6}
                  onClick={handleOpenMoreEventsModal}
                  renderLimits={renderLimits}
                  moreButtonRef={refs.moreButton}
                />
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
