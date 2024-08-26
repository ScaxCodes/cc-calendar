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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <div className="m-auto flex h-screen max-w-[1500px] flex-col rounded-md border border-red-500">
      <Navigation
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <Month currentMonth={currentMonth} setSelectedDate={setSelectedDate} />
      {selectedDate && (
        <AddEventModal
          selectedDate={selectedDate}
          onClose={() => setSelectedDate(null)}
        />
      )}
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

function Month({
  currentMonth,
  setSelectedDate,
}: {
  currentMonth: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
}) {
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

  const handleAddEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    const date = event.currentTarget.parentElement?.getAttribute("data-date");
    if (date) {
      // Triggers the modal opening logic
      setSelectedDate(date);
    }
  };

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
              className={`group relative rounded border p-4 text-center ${backgroundClass} ${opacityClass}`}
              data-date={format(day, "P")}
            >
              {/* Render headers for the first row of the calendar */}
              <div>{index <= 6 && format(day, "EEE").toUpperCase()}</div>

              <button
                onClick={handleAddEvent}
                className="absolute right-0 top-0 m-1 hidden h-6 w-6 rounded-full bg-blue-500 text-white hover:bg-blue-600 group-hover:block"
              >
                +
              </button>
              <div>{format(day, "d")}</div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

function AddEventModal({
  selectedDate,
  onClose,
}: {
  selectedDate: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="rounded bg-white p-4">
        <h2 className="text-lg font-semibold">Add Event on {selectedDate}</h2>
        <button onClick={onClose} className="mt-4 text-blue-500">
          Close
        </button>
      </div>
    </div>
  );
}

function EventDetailsModal() {
  return "";
}

function ViewMoreModal() {
  return "";
}
