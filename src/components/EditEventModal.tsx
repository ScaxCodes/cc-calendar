import { useEffect, useRef, useState } from "react";
import { useEvents, EventForm } from "../contexts/EventContext";
import { useUI } from "../contexts/UIContext";
import { convertDateForModal } from "../utils/convertDateForModal";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { awaitAnimationBeforeClosing } from "../utils/awaitAnimationBeforeClosing";

export function EditEventModal({ onClose }: { onClose: () => void }) {
  const { events, editEvent, deleteEvent } = useEvents();
  const { selectedDate, selectedEventId } = useUI();
  if (selectedDate === null)
    throw new Error("No valid date string available for modal functionality!");

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

  // New state to control animation
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  // Trigger animation after mounting the component
  useEffect(() => {
    setIsAnimatingIn(true);
  }, []);

  // Enable ESC key to close the modal (accessability)
  useEscapeKey(() => awaitAnimationBeforeClosing(setIsAnimatingIn, onClose));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const editedEvent: EventForm = {
      id: selectedEvent.id,
      name: nameRef.current?.value || "",
      allDay,
      startTime: allDay ? "" : startTimeRef.current?.value || "",
      endTime: allDay ? "" : endTimeRef.current?.value || "",
      color: selectedColor,
    };

    editEvent(selectedDate, editedEvent);
    awaitAnimationBeforeClosing(setIsAnimatingIn, onClose);
  };

  // For form validation only
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  function handleDelete() {
    awaitAnimationBeforeClosing(setIsAnimatingIn, onClose);
    deleteEvent(selectedDate, selectedEventId);
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div
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
              awaitAnimationBeforeClosing(setIsAnimatingIn, onClose)
            }
          >
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Event Name */}
          <div className="mb-4">
            <label className="text-modal-form-label text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              ref={nameRef}
              className="w-full rounded border p-2"
              required
            />
          </div>

          {/* All Day? */}
          <div className="mb-4 flex">
            <input
              type="checkbox"
              checked={allDay}
              onChange={() => setAllDay((prev) => !prev)}
            />
            <label className="text-modal-form-label ml-2 text-sm font-medium">
              All Day?
            </label>
          </div>

          {/* Start Time */}
          <div className="mb-4 flex justify-between gap-2">
            <div className="w-full">
              <label className="text-modal-form-label block text-sm font-medium">
                Start Time
              </label>
              <input
                type="time"
                ref={startTimeRef}
                className="w-full rounded border p-2"
                disabled={allDay}
                required={!allDay}
                onChange={handleStartTimeChange}
              />
            </div>
            {/* End Time */}
            <div className="w-full">
              <label className="text-modal-form-label block text-sm font-medium">
                End Time
              </label>
              <input
                type="time"
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
            <label className="text-modal-form-label text-sm font-medium">
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
                  className={`bg-custom-red block h-8 w-8 rounded-sm ${
                    selectedColor === "red" ? "opacity-100" : "opacity-50"
                  }`}
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
                  className={`bg-custom-green block h-8 w-8 rounded-sm ${
                    selectedColor === "green" ? "opacity-100" : "opacity-50"
                  }`}
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
                  className={`bg-custom-blue block h-8 w-8 rounded-sm ${
                    selectedColor === "blue" ? "opacity-100" : "opacity-50"
                  }`}
                ></span>
              </label>
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="border-add-button-border bg-add-button-bg text-add-button-text hover:bg-add-button-bg-hover w-full rounded border py-2"
            >
              Edit
            </button>
            {/* Delete Button */}
            <button
              className="border-delete-button-border bg-delete-button-bg text-delete-button-text hover:bg-delete-button-bg-hover w-full rounded border py-2"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
