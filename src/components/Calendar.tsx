import { useState } from "react";
import { EventProvider } from "../contexts/EventContext";
import Navigation from "./Navigation";
import Month from "./Month";
import { AddEventModal } from "./AddEventModal";
import { EditEventModal } from "./EditEventModal";
import { useUI } from "../contexts/UIContext";

export function Calendar() {
  const {
    selectedDate,
    setSelectedDate,
    selectedEventId,
    setSelectedEventId,
    isAddEventModalOpen,
    setIsAddEventModalOpen,
    isEditEventModalOpen,
    setIsEditEventModalOpen,
  } = useUI(); // Get these from context

  const [currentMonth, setCurrentMonth] = useState(new Date());

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
        <Month currentMonth={currentMonth} />
        {isAddEventModalOpen && selectedDate && (
          <AddEventModal onClose={handleCloseAddEventModal} />
        )}
        {isEditEventModalOpen && selectedDate && selectedEventId && (
          <EditEventModal onClose={handleCloseEditEventModal} />
        )}
      </div>
    </EventProvider>
  );
}

// TODO:
// *** DONE *** 1: Delete events
// *** DONE *** 2: Store events to local storage
// *** DONE *** 3: Style everything 1:1 to requirements
// BONUS: Refactor code, check whats missing from course (effects, hooks, etc).
// 4: Overflow modal
// 5: Open/Closing animation for modal
