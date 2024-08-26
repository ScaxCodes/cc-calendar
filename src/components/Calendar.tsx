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
    <div className="m-auto flex h-screen max-w-[1500px] flex-col rounded-md border border-red-500">
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
    <nav className="my-4 ml-4 flex items-center gap-4">
      <button
        onClick={() => setCurrentMonth(new Date())}
        className="rounded-md border px-4 py-1 hover:bg-gray-400"
      >
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
    <main className="flex flex-1 flex-col p-4">
      <div className="grid flex-1 grid-cols-7 gap-2">
        {days.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isInPast = isBefore(day, today) && !isToday(day);

          const backgroundClass = isCurrentMonth ? "bg-white" : "bg-gray-200";
          const opacityClass = isInPast ? "opacity-50" : "opacity-100";

          return (
            <div
              key={index}
              className={`rounded border p-4 ${backgroundClass} ${opacityClass}`}
            >
              <div>{index <= 6 && format(day, "EEE").toUpperCase()}</div>
              <div>{format(day, "d")}</div>
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
