import { useEffect, useRef, useState } from "react";
import { useEvents, EventForm } from "../contexts/EventContext";
import { useUI } from "../contexts/UIContext";
import { convertDateForModal } from "../utils/convertDateForModal";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { awaitAnimationBeforeClosing } from "../utils/awaitAnimationBeforeClosing";
import FocusTrap from "focus-trap-react";

export function EditEventModal({ onClose }: { onClose: () => void }) {
  const { events, editEvent, deleteEvent } = useEvents();
  const { selectedDate, selectedEventId } = useUI();
  if (selectedDate === null) return;

  // Default value [] needed for empty fade-out-modal after deletion of an event
  const [selectedEvent] =
    events[selectedDate]?.filter((event) => event.id === selectedEventId) || [];

  // Using useRef for fields that don't need to trigger re-renders
  const nameRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

  // State for fields that require reactivity
  // Default values needed for empty fade-out-modal after deletion of an event
  const [allDay, setAllDay] = useState(selectedEvent?.allDay ?? false);
  const [selectedColor, setSelectedColor] = useState(
    selectedEvent?.color ?? "red",
  );
  // Additional state to track start time for form validation
  const [startTime, setStartTime] = useState(selectedEvent?.startTime ?? "");

  // Populate form with event data to edit
  // Default values needed for empty fade-out-modal after deletion of an event
  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.value = selectedEvent?.name ?? "";
    }
    if (startTimeRef.current) {
      startTimeRef.current.value = selectedEvent?.startTime ?? "";
    }
    if (endTimeRef.current) {
      endTimeRef.current.value = selectedEvent?.endTime ?? "";
    }
  }, [selectedEvent]);

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const editedEvent: EventForm = {
      id: selectedEvent.id,
      name: nameRef.current?.value || "",
      allDay,
      startTime: allDay ? "" : startTimeRef.current?.value || "",
      endTime: allDay ? "" : endTimeRef.current?.value || "",
      color: selectedColor,
    };

    if (selectedDate !== null) editEvent(selectedDate, editedEvent);
    awaitAnimationBeforeClosing(modalRef, setIsAnimatingIn, onClose);
  }

  // For form validation only
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStartTime(e.target.value);

  function handleDelete() {
    awaitAnimationBeforeClosing(modalRef, setIsAnimatingIn, onClose);
    if (selectedDate !== null && selectedEventId !== null)
      deleteEvent(selectedDate, selectedEventId);
  }

  return (
    <FocusTrap>
      <div className="fixed inset-0 z-10 flex items-center justify-center">
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
            <h2 className="text-xl font-semibold">Edit Event</h2>
            <span className="text-modal-date-header">
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
          <form onSubmit={handleSubmit}>
            {/* Event Name */}
            <div className="mb-4">
              <label
                className="text-sm font-medium text-modal-form-label"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                ref={nameRef}
                className="w-full rounded border p-2"
                required
                autoFocus
              />
            </div>

            {/* All Day? */}
            <div className="mb-4 flex">
              <input
                type="checkbox"
                id="all-day"
                checked={allDay}
                onChange={() => setAllDay((prev) => !prev)}
              />
              <label
                className="ml-2 text-sm font-medium text-modal-form-label"
                htmlFor="all-day"
              >
                All Day?
              </label>
            </div>

            {/* Start Time */}
            <div className="mb-4 flex justify-between gap-2">
              <div className="w-full">
                <label
                  className="block text-sm font-medium text-modal-form-label"
                  htmlFor="start-time"
                >
                  Start Time
                </label>
                <input
                  type="time"
                  id="start-time"
                  ref={startTimeRef}
                  className="w-full rounded border p-2"
                  disabled={allDay}
                  required={!allDay}
                  onChange={handleStartTimeChange}
                />
              </div>
              {/* End Time */}
              <div className="w-full">
                <label
                  className="block text-sm font-medium text-modal-form-label"
                  htmlFor="end-time"
                >
                  End Time
                </label>
                <input
                  type="time"
                  id="end-time"
                  ref={endTimeRef}
                  className="w-full rounded border p-2"
                  disabled={allDay}
                  required={!allDay}
                  min={startTime || ""}
                />
              </div>
            </div>

            {/* Color */}
            <div className="mb-4">
              <label className="text-sm font-medium text-modal-form-label">
                Color
              </label>
              <div className="flex items-center gap-4">
                {/* Red Square */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    value="red"
                    checked={selectedColor === "red"}
                    onChange={() => setSelectedColor("red")}
                    className="hidden"
                  />
                  <span
                    tabIndex={0}
                    className={`block h-8 w-8 rounded-sm bg-custom-red ${
                      selectedColor === "red" ? "opacity-100" : "opacity-50"
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === " ") {
                        setSelectedColor("red");
                      }
                    }}
                  ></span>
                </label>
                {/* Green Square */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    value="green"
                    checked={selectedColor === "green"}
                    onChange={() => setSelectedColor("green")}
                    className="hidden"
                  />
                  <span
                    tabIndex={0}
                    className={`block h-8 w-8 rounded-sm bg-custom-green ${
                      selectedColor === "green" ? "opacity-100" : "opacity-50"
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === " ") {
                        setSelectedColor("green");
                      }
                    }}
                  ></span>
                </label>
                {/* Blue Square */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    value="blue"
                    checked={selectedColor === "blue"}
                    onChange={() => setSelectedColor("blue")}
                    className="hidden"
                  />
                  <span
                    tabIndex={0}
                    className={`block h-8 w-8 rounded-sm bg-custom-blue ${
                      selectedColor === "blue" ? "opacity-100" : "opacity-50"
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === " ") {
                        setSelectedColor("blue");
                      }
                    }}
                  ></span>
                </label>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex gap-2">
              <button
                type="submit"
                className="w-full rounded border border-add-button-border bg-add-button-bg py-2 text-add-button-text hover:bg-add-button-bg-hover"
              >
                Edit
              </button>
              {/* Delete Button */}
              <button
                className="w-full rounded border border-delete-button-border bg-delete-button-bg py-2 text-delete-button-text hover:bg-delete-button-bg-hover"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </FocusTrap>
  );
}
