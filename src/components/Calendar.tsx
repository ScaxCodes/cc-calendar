import { useState } from "react";
import { EventProvider } from "../contexts/EventContext";
import Navigation from "./Navigation";
import Month from "./Month";
import { AddEventModal } from "./AddEventModal";
import { EditEventModal } from "./EditEventModal";

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isAddEventModalOpen, setIsAddEventModalOpen] =
    useState<boolean>(false);
  const [isEditEventModalOpen, setIsEditEventModalOpen] =
    useState<boolean>(false);

  function handleCloseAddEventModal() {
    setSelectedDate(null);
    setIsAddEventModalOpen(false);
  }

  function handleCloseEditEventModal() {
    setSelectedDate(null);
    setSelectedEventId(null);
    setIsEditEventModalOpen(false);
  }

  return (
    <EventProvider>
      <div className="text-default m-auto flex h-screen max-w-[1500px] flex-col">
        <Navigation
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />
        <Month
          currentMonth={currentMonth}
          setSelectedDate={setSelectedDate}
          setSelectedEventId={setSelectedEventId}
          setIsAddEventModalOpen={setIsAddEventModalOpen}
          setIsEditEventModalOpen={setIsEditEventModalOpen}
        />
        {isAddEventModalOpen && selectedDate && (
          <AddEventModal
            selectedDate={selectedDate}
            onClose={handleCloseAddEventModal}
          />
        )}
        {isEditEventModalOpen && selectedDate && selectedEventId && (
          <EditEventModal
            selectedDate={selectedDate}
            selectedEventId={selectedEventId}
            onClose={handleCloseEditEventModal}
          />
        )}
      </div>
    </EventProvider>
  );
}

// TODO:
// *** DONE *** 1: Delete events
// *** DONE *** 2: Store events to local storage
// 3: Style everything 1:1 to requirements
// BONUS: Refactor code, check whats missing from course (effects, hooks, etc).
// 4: Overflow modal
// 5: Open/Closing animation for modal
