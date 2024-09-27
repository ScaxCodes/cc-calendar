import { useEffect, useState } from "react";
import { useEvents } from "../contexts/EventContext";
import { useUI } from "../contexts/UIContext";
import { convertDateForModal } from "../utils/convertDateForModal";
import { sortEvents } from "../utils/sortEvents";

export function MoreEventsModal({ onClose }: { onClose: () => void }) {
  const { selectedDate, setSelectedEventId, setIsEditEventModalOpen } = useUI();
  const { events } = useEvents();

  if (selectedDate === null) {
    throw new Error("Could not get a valid date for selecting events");
  }
  const eventsForDay = events[selectedDate];
  const eventsForDaySorted = sortEvents(eventsForDay);

  // New state to control animation
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  // Trigger animation after mounting the component
  useEffect(() => {
    setIsAnimatingIn(true);
  }, []);

  // To ensure we await the fade-out animation before we hide the modal
  function onCloseWrapper() {
    setIsAnimatingIn(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }

  const handleEditEvent = (id: string) => {
    setSelectedEventId(id);
    setIsEditEventModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center">
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${isAnimatingIn ? "opacity-50" : "opacity-0"}`}
      ></div>
      <div
        className={`w-96 transform rounded bg-white p-6 shadow-lg transition-transform duration-300 ${
          isAnimatingIn ? "scale-100" : "scale-0"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-modal-date-header text-2xl">
            {convertDateForModal(selectedDate)}
          </span>
          <button onClick={onCloseWrapper} className="text-3xl">
            &#215;
          </button>
        </div>
        <div>
          {eventsForDaySorted.map((singleEvent) => {
            return (
              <button
                key={singleEvent.id}
                onClick={() => handleEditEvent(singleEvent.id)}
                className="mb-2 w-full overflow-hidden whitespace-nowrap text-left"
              >
                <div className="flex items-center">
                  {singleEvent.allDay ? (
                    <div
                      className={`w-full rounded px-1 text-white bg-custom-${singleEvent.color}`}
                    >
                      {singleEvent.name}
                    </div>
                  ) : (
                    <>
                      <div
                        className={`bg-custom-${singleEvent.color} mr-3 h-3 w-3 shrink-0 rounded-full`}
                      />
                      <div className="text-timed-event mr-1">
                        {singleEvent.startTime}
                      </div>
                      <div>{singleEvent.name}</div>
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
