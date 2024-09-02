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
} from "date-fns";
import Events from "./Events";
import { useEvents } from "../contexts/EventContext";

export default function Month({
  currentMonth,
  setSelectedDate,
  setSelectedEventId,
  setIsAddEventModalOpen,
  setIsEditEventModalOpen,
}: {
  currentMonth: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedEventId: React.Dispatch<React.SetStateAction<string | null>>;
  setIsAddEventModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditEventModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const today = new Date();
  const startDate = startOfMonth(currentMonth);
  const endDate = endOfMonth(currentMonth);
  const startGrid = startOfWeek(startDate);
  const endGrid = endOfWeek(endDate);

  const { events } = useEvents();

  const days = [];
  let day = startGrid;
  while (day <= endGrid) {
    days.push(day);
    day = addDays(day, 1);
  }

  const handleAddEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    const date = event.currentTarget.parentElement?.getAttribute("data-date");
    if (date) {
      setSelectedDate(date);
      setIsAddEventModalOpen(true);
    }
  };

  return (
    <main className="flex flex-1 flex-col px-4">
      <div className="grid flex-1 auto-rows-fr grid-cols-7">
        {days.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isInPast = isBefore(day, today) && !isToday(day);

          const backgroundClass = isCurrentMonth
            ? "bg-white"
            : "bg-custom-grey";
          const opacityClass = isInPast ? "opacity-50" : "opacity-100";
          const todayHighlightClass = isToday(day)
            ? "bg-todays-day m-auto h-5 w-5 rounded-full text-white"
            : "";

          const dayISO = format(day, "yyyy-MM-dd");
          const eventsForDay = events[dayISO];

          return (
            <div
              key={index}
              className={`group relative border border-[#CCC] p-1 text-center ${backgroundClass} ${opacityClass}`}
              data-date={dayISO}
            >
              <div className="text-week-name text-sm">
                {index <= 6 && format(day, "EEE").toUpperCase()}
              </div>
              <button
                onClick={handleAddEvent}
                className="absolute right-0 top-0 m-1 hidden h-6 w-6 rounded-full bg-blue-500 text-white hover:bg-blue-600 group-hover:block"
              >
                +
              </button>
              <div className={`mb-1 ${todayHighlightClass} text-sm`}>
                {format(day, "d")}
              </div>
              {eventsForDay && (
                <Events
                  eventsForDay={eventsForDay}
                  setSelectedDate={setSelectedDate}
                  setSelectedEventId={setSelectedEventId}
                  setIsEditEventModalOpen={setIsEditEventModalOpen}
                />
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
