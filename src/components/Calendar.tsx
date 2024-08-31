import { useState } from "react";
import { EventProvider } from "../contexts/EventContext";
import Navigation from "./Navigation";
import Month from "./Month";
import { AddEventModal } from "./AddEventModal";

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <EventProvider>
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
      </div>
    </EventProvider>
  );
}
