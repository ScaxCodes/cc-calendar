import { useState } from "react";
import { EventProvider } from "../contexts/EventContext";
import Navigation from "./Navigation";
import Month from "./Month";
import { AddEventModal } from "./AddEventModal";
import { EditEventModal } from "./EditEventModal";
import { useUI } from "../contexts/UIContext";
import { MoreEventsModal } from "./MoreEventsModal";

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
    isMoreEventsModalOpen,
    setIsMoreEventsModalOpen,
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

  function handleCloseMoreEventsModal() {
    setSelectedDate(null);
    setIsMoreEventsModalOpen(false);
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
        {isMoreEventsModalOpen && selectedDate && (
          <MoreEventsModal onClose={handleCloseMoreEventsModal} />
        )}
      </div>
    </EventProvider>
  );
}

// TODO:
// *** DONE *** 1: Delete events
// *** DONE *** 2: Store events to local storage
// *** DONE *** 3: Style everything 1:1 to requirements
// *** DONE *** BONUS: Refactor code, check whats missing from course (effects, hooks, etc).
// *** DONE *** LOGIC: The startTime must be before the endTime and is required if allDay is not checked.
// 4: Overflow modal
// 5: Open/Closing animation for modal
// BONUS: Duplication and DRY Principle: Check if there's any duplicated logic that can be abstracted into reusable hooks or utility functions.
// Like ADD/EDIT Modal
// BONUS: Code Consistency: Maintain consistency in coding styles (e.g., naming conventions, file structure) across the entire project. Check if it's aligned with your team's style guide.
// Declaring functions with function syntax, not const
// BONUS: Add Tailwind classes for same styling of events in daycell and in viewmore-modal
