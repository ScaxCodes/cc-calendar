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
    isMoreEventsModalOpen,
    setIsMoreEventsModalOpen,
  } = useUI();

  const [currentMonth, setCurrentMonth] = useState(new Date());

  function handleCloseAddEventModal() {
    setSelectedDate("");
  }

  function handleCloseEditEventModal() {
    // Handle edge-case when edit-modal is opened via more-events-modal
    if (!isMoreEventsModalOpen) setSelectedDate("");
    setSelectedEventId("");
  }

  function handleCloseMoreEventsModal() {
    setSelectedDate("");
    setIsMoreEventsModalOpen(false);
  }

  return (
    <EventProvider>
      <div className="m-auto flex h-screen max-w-[1500px] flex-col text-default">
        <Navigation
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />
        <Month currentMonth={currentMonth} />
        {selectedDate && !selectedEventId && !isMoreEventsModalOpen && (
          <AddEventModal onClose={handleCloseAddEventModal} />
        )}
        {selectedEventId && (
          <EditEventModal onClose={handleCloseEditEventModal} />
        )}
        {isMoreEventsModalOpen && selectedDate && (
          <MoreEventsModal onClose={handleCloseMoreEventsModal} />
        )}
      </div>
    </EventProvider>
  );
}
