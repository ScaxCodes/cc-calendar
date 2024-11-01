import { useEffect, useRef, useState } from "react";
import { useEvents } from "../contexts/EventContext";
import { useUI } from "../contexts/UIContext";
import { convertDateForModal } from "../utils/convertDateForModal";
import { sortEvents } from "../utils/sortEvents";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { awaitAnimationBeforeClosing } from "../utils/awaitAnimationBeforeClosing";
import FocusTrap from "focus-trap-react";

export function MoreEventsModal({ onClose }: { onClose: () => void }) {
  const { selectedDate, setSelectedEventId } = useUI();
  const { events } = useEvents();
  if (selectedDate === null) return;

  const eventsForDay = events[selectedDate];
  const eventsForDaySorted = sortEvents(eventsForDay);

  // New state and ref to control animation
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  // Trigger animation after mounting the component
  useEffect(() => {
    setIsAnimatingIn(true);
  }, []);

  // Enable ESC key to close the modal (accessability)
  useEscapeKey(() =>
    awaitAnimationBeforeClosing(modalRef, setIsAnimatingIn, onClose),
  );

  function handleEditEvent(id: string) {
    setSelectedEventId(id);
  }

  return (
    <FocusTrap focusTrapOptions={{ initialFocus: ".event" }}>
      <div className="fixed inset-0 z-0 flex items-center justify-center">
        <div
          ref={modalRef}
          className={`fixed inset-0 bg-black transition-opacity duration-300 ${isAnimatingIn ? "opacity-50" : "opacity-0"}`}
        ></div>
        <div
          className={`w-96 transform rounded bg-white p-6 shadow-lg transition-transform duration-300 ${
            isAnimatingIn ? "scale-100" : "scale-0"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-2xl text-modal-date-header">
              {convertDateForModal(selectedDate)}
            </span>
            <button
              onClick={() =>
                awaitAnimationBeforeClosing(modalRef, setIsAnimatingIn, onClose)
              }
              className="flex h-8 w-8 items-center justify-center rounded-full text-3xl hover:bg-today-button-bg-hover"
            >
              &#215;
            </button>
          </div>
          <div>
            {eventsForDaySorted.map((singleEvent) => {
              return (
                <button
                  key={singleEvent.id}
                  onClick={() => handleEditEvent(singleEvent.id)}
                  className="event mb-2 w-full overflow-hidden whitespace-nowrap text-left"
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
                        <div className="mr-1 text-timed-event">
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
    </FocusTrap>
  );
}
