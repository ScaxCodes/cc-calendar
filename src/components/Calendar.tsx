import { useState } from "react";
import { EventProvider } from "../contexts/EventContext";
import { useUI } from "../contexts/UIContext";
import { Navigation } from "./Navigation";
import { Month } from "./Month";
import { AddEventModal } from "./AddEventModal";
import { EditEventModal } from "./EditEventModal";
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
  } = useUI();

  const [currentMonth, setCurrentMonth] = useState(new Date());

  function handleCloseAddEventModal() {
    setSelectedDate(null);
    setIsAddEventModalOpen(false);
  }

  function handleCloseEditEventModal() {
    // Handle edge-case when edit-modal is opened via more-events-modal
    if (!isMoreEventsModalOpen) setSelectedDate(null);
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
