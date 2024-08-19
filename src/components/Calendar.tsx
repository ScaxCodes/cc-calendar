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
  subMonths,
  addMonths,
} from "date-fns";

import { useState } from "react";

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  return (
    <div className="border border-red-500 rounded-md max-w-[1500px] m-auto">
      <Navigation
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <Month currentMonth={currentMonth} />
      <AddEventModal />
      <EventDetailsModal />
      <ViewMoreModal />
    </div>
  );
}

function Navigation({
  currentMonth,
  setCurrentMonth,
}: {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <nav className="flex items-center gap-4 my-4 ml-4">
      <button className="px-4 py-1 border rounded-md hover:bg-gray-400">
        Today
      </button>
      <button onClick={handlePreviousMonth}>&lt;</button>
      <button onClick={handleNextMonth}>&gt;</button>
      <span className="font-semibold">{format(currentMonth, "MMMM yyyy")}</span>
    </nav>
  );
}

function Month({ currentMonth }: { currentMonth: Date }) {
  const today = new Date();
  const startDate = startOfMonth(currentMonth);
  const endDate = endOfMonth(currentMonth);
  const startGrid = startOfWeek(startDate, { weekStartsOn: 0 });
  const endGrid = endOfWeek(endDate, { weekStartsOn: 0 });

  const days = [];
  let day = startGrid;
  while (day <= endGrid) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <main className="p-4">
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isInPast = isBefore(day, today) && !isToday(day);

          const backgroundClass = isCurrentMonth ? "bg-white" : "bg-gray-200";
          const opacityClass = isInPast ? "opacity-50" : "opacity-100";

          return (
            <div
              key={index}
              className={`p-4 border rounded ${backgroundClass} ${opacityClass}`}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>
    </main>
  );
}

function AddEventModal() {
  return "";
}

function EventDetailsModal() {
  return "";
}

function ViewMoreModal() {
  return "";
}
