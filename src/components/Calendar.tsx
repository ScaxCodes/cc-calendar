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

type EventsByDate = {
  [date: string]: EventForm[]; // The key is a string representing the date
};

import { useState } from "react";
import { EventForm, AddEventModal } from "./AddEventModal";

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<EventsByDate>({});

  // Only for debugging
  console.log("Event state after re-render: ", events);

  function handleSubmitEvent(date: string, eventForm: EventForm) {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [date]: prevEvents[date] ? [...prevEvents[date], eventForm] : [eventForm],
    }));
  }

  return (
    <div className="m-auto flex h-screen max-w-[1500px] flex-col rounded-md border border-red-500">
      <Navigation
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <Month
        currentMonth={currentMonth}
        setSelectedDate={setSelectedDate}
        events={events}
      />
      {selectedDate && (
        <AddEventModal
          selectedDate={selectedDate}
          onSubmit={handleSubmitEvent}
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
  events,
}: {
  currentMonth: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
  events: EventsByDate;
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

          const dayISO = format(day, "yyyy-MM-dd");
          const eventsForDay = events[dayISO];

          return (
            <div
              key={index}
              className={`group relative rounded border p-4 text-center ${backgroundClass} ${opacityClass}`}
              data-date={dayISO}
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
              {eventsForDay && <Events eventsForDay={eventsForDay} />}
            </div>
          );
        })}
      </div>
    </main>
  );
}

// TODO #1: Events should be sorted with all day events first and then by start date.
// TODO #2: Style non-all-day-events differently

function Events({ eventsForDay }: { eventsForDay: EventForm[] }) {
  // Sort events: allDay events come first, followed by part-day events
  const eventsForDaySorted = eventsForDay.sort((a, b) => {
    return a.allDay === b.allDay ? 0 : a.allDay ? -1 : 1;
  });

  return (
    <>
      {eventsForDaySorted.map((singleEvent, index) => {
        if (singleEvent.allDay) {
          return (
            <div key={index} className={`bg-custom-${singleEvent.color}`}>
              {singleEvent.name}
            </div>
          );
        } else {
          return (
            <div className="flex items-center" key={index}>
              <div
                className={`bg-custom-${singleEvent.color} mr-3 h-3 w-3 rounded-full`}
              ></div>
              <div className="mr-1">{singleEvent.startTime}</div>
              <div>{singleEvent.name}</div>
            </div>
          );
        }
      })}
    </>
  );
}

function EventDetailsModal() {
  return "";
}

function ViewMoreModal() {
  return "";
}
