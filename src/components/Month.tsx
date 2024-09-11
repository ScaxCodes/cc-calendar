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

export default function Month({ currentMonth }: { currentMonth: Date }) {
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

  const { setSelectedDate, setIsAddEventModalOpen } = useUI(); // Get these from context
  const { events } = useEvents();

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
            ? "bg-todays-day m-auto h-6 w-6 rounded-full text-white"
            : "";

          const dayISO = format(day, "yyyy-MM-dd");
          const eventsForDay = events[dayISO];

          return (
            <div
              key={index}
              className={`group relative border p-1 text-center ${backgroundClass} ${opacityClass} overflow-hidden`}
              style={{ height: `calc((100vh - 98px) / ${weeks})` }}
              data-date={dayISO}
            >
              <DayName index={index} day={day} />
              <AddEventButton handleAddEvent={handleAddEvent} />
              <DayNumber todayHighlightClass={todayHighlightClass} day={day} />

              {eventsForDay && <Events eventsForDay={eventsForDay} />}
            </div>
          );
        })}
      </div>
    </main>
  );
}

function DayName({ index, day }: { index: number; day: Date }) {
  return (
    <div className="text-week-name">
      {index <= 6 && format(day, "EEE").toUpperCase()}
    </div>
  );
}

function DayNumber({
  todayHighlightClass,
  day,
}: {
  todayHighlightClass:
    | "bg-todays-day m-auto h-6 w-6 rounded-full text-white"
    | "";
  day: Date;
}) {
  return (
    <div className={`mb-1 ${todayHighlightClass}`}>{format(day, "d")}</div>
  );
}

function AddEventButton({
  handleAddEvent,
}: {
  handleAddEvent: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      onClick={handleAddEvent}
      className="absolute right-0 top-0 m-1 hidden h-6 w-6 rounded-full bg-blue-500 text-white hover:bg-blue-600 group-hover:block"
    >
      +
    </button>
  );
}
