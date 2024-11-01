import { useState } from "react";
import { EventProvider } from "../contexts/EventContext";
import { useUI } from "../contexts/UIContext";
import { Navigation } from "./Navigation";
import { Month } from "./Month";
import { AddEventModal } from "./AddEventModal";
import { EditEventModal } from "./EditEventModal";
import { MoreEventsModal } from "./MoreEventsModal";
import { useHeaderHeight } from "../hooks/useHeaderHeight";

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
  const { headerHeight, headerRef } = useHeaderHeight(); // Use the custom hook

  function handleCloseAddEventModal() {
    setSelectedDate(null);
  }

  function handleCloseEditEventModal() {
    // Handle edge-case when edit-modal is opened via more-events-modal
    if (!isMoreEventsModalOpen) setSelectedDate(null);
    setSelectedEventId(null);
  }

  function handleCloseMoreEventsModal() {
    setSelectedDate(null);
    setIsMoreEventsModalOpen(false);
  }

  return (
    <EventProvider>
      <div className="m-auto flex h-screen max-w-[1500px] flex-col text-default">
        <Navigation
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          headerRef={headerRef}
        />
        <Month currentMonth={currentMonth} headerHeight={headerHeight} />
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
